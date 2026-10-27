import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, PanInfo, useReducedMotion } from 'framer-motion';
import { useTheme } from '@/components/theme/theme-provider';

interface Point {
  x: number;
  y: number;
  ox: number;
  oy: number;
  fixed: boolean;
}

const DEFAULT_CONFIG = {
  gravity: 1250,
  damping: 0.94,
  iterations: 20,
  stretchMax: 28,
  stretchToggle: 20,
  maxVelocity: 22,
  sleepVelocity: 0.15,
};

// Generate SVG smooth quadratic bezier path through Verlet points
function pointsToSvgPath(pts: Point[]): string {
  if (!pts || pts.length < 2) return '';
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i].x + pts[i + 1].x) / 2;
    const my = (pts[i].y + pts[i + 1].y) / 2;
    d += ` Q ${pts[i].x.toFixed(1)} ${pts[i].y.toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`;
  }
  const last = pts.length - 1;
  d += ` L ${pts[last].x.toFixed(1)} ${pts[last].y.toFixed(1)}`;
  return d;
}

// Initialize 17 points with 11px segment length (16 * 11 = 176px total length)
function createInitialPoints(): Point[] {
  const pts: Point[] = [];
  for (let i = 0; i <= 16; i++) {
    const y = 11 * i;
    pts.push({
      x: 32,
      y,
      ox: 32,
      oy: y,
      fixed: i === 0,
    });
  }
  return pts;
}

// Crisp mechanical switch click using Web Audio API
function playTactileClick() {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.04);
  } catch {
    // AudioContext blocked or not supported; gracefully ignore
  }
}

export function PullCordThemeToggle() {
  const { theme, setTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  const [isDropping, setIsDropping] = useState(!shouldReduceMotion);
  const [hintVisible, setHintVisible] = useState(true);

  const pointsRef = useRef<Point[]>(createInitialPoints());
  const pathRef = useRef<SVGPathElement>(null);
  const knobRef = useRef<SVGGElement>(null);

  const isDraggingRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const hasToggledRef = useRef(false);
  const hasEnteredRef = useRef(false);

  const targetPosRef = useRef({ x: 32, y: 176 });
  const wakePhysicsRef = useRef<() => void>(() => {});
  const configRef = useRef(DEFAULT_CONFIG);

  // Toggle theme helper
  const handleToggleTheme = useCallback(() => {
    playTactileClick();
    const isDark = document.documentElement.classList.contains('dark') || theme === 'dark';
    const nextTheme = isDark ? 'light' : 'dark';
    setTheme(nextTheme);

    // Fade out hint after first interaction
    setHintVisible(false);
    try {
      localStorage.setItem('finance-brunch-cord-pulled', 'true');
    } catch {
      // ignore
    }
  }, [theme, setTheme]);

  // Click trigger (gives downward velocity impulse to swing)
  const triggerClick = useCallback(() => {
    handleToggleTheme();
    if (shouldReduceMotion) return;
    const pts = pointsRef.current;
    if (pts && pts.length > 0) {
      pts[pts.length - 1].oy -= 22;
      wakePhysicsRef.current();
    }
  }, [handleToggleTheme, shouldReduceMotion]);

  // Gentle wiggle after entrance
  const entranceWiggle = useCallback(() => {
    if (hasEnteredRef.current) return;
    hasEnteredRef.current = true;
    setIsDropping(false);
    if (shouldReduceMotion) return;
    const pts = pointsRef.current;
    if (pts && pts.length > 0) {
      pts[pts.length - 1].oy -= 13;
      pts[pts.length - 1].ox -= 6;
      wakePhysicsRef.current();
    }
  }, [shouldReduceMotion]);

  // Listen to external pull-cord trigger event (e.g. from navbar button)
  useEffect(() => {
    const handleCustomPull = () => {
      triggerClick();
    };
    window.addEventListener('financebrunch:pull-cord', handleCustomPull);
    return () => {
      window.removeEventListener('financebrunch:pull-cord', handleCustomPull);
    };
  }, [triggerClick]);

  // Initial check if user has previously pulled cord
  useEffect(() => {
    try {
      if (localStorage.getItem('finance-brunch-cord-pulled') === 'true') {
        setHintVisible(false);
      }
    } catch {
      // ignore
    }
  }, []);

  // Entrance wiggle timer
  useEffect(() => {
    if (shouldReduceMotion) return;
    const timer = window.setTimeout(entranceWiggle, 1700);
    return () => window.clearTimeout(timer);
  }, [entranceWiggle, shouldReduceMotion]);

  // Physics animation engine using Verlet integration
  useEffect(() => {
    const pts = pointsRef.current;
    const lastIdx = pts.length - 1;
    let animFrame = 0;
    let isRunning = false;
    let lastTime = 0;
    let prevDt = 0;

    const renderSvg = () => {
      if (pathRef.current) {
        pathRef.current.setAttribute('d', pointsToSvgPath(pts));
      }
      if (knobRef.current) {
        const dx = (pts[lastIdx].x - 32).toFixed(2);
        const dy = (pts[lastIdx].y - 176).toFixed(2);
        knobRef.current.setAttribute('transform', `translate(${dx} ${dy})`);
      }
    };

    const step = (time: number) => {
      const { gravity, damping, iterations, sleepVelocity } = configRef.current;
      const dt = lastTime ? Math.min(0.04, Math.max(0.004, (time - lastTime) / 1000)) : 1 / 60;
      lastTime = time;

      const drag = (prevDt > 0 ? dt / prevDt : 1) * Math.pow(damping, 60 * dt);
      const dtSq = dt * dt;

      pts[lastIdx].fixed = isDraggingRef.current;

      // 1. Verlet integration
      for (let i = 1; i < pts.length; i++) {
        const p = pts[i];
        if (p.fixed) continue;
        const vx = p.x - p.ox;
        const vy = p.y - p.oy;
        p.ox = p.x;
        p.oy = p.y;
        p.x += vx * drag;
        p.y += vy * drag + gravity * dtSq;
      }

      // Root point is fixed
      pts[0].x = 32;
      pts[0].y = 0;

      // Trailing point follows user pointer while dragging
      if (isDraggingRef.current) {
        pts[lastIdx].ox = pts[lastIdx].x;
        pts[lastIdx].oy = pts[lastIdx].y;
        pts[lastIdx].x = targetPosRef.current.x;
        pts[lastIdx].y = targetPosRef.current.y;
      }

      // 2. Relaxation constraints (segment distance = 11px)
      for (let iter = 0; iter < iterations; iter++) {
        for (let i = 0; i < lastIdx; i++) {
          const p1 = pts[i];
          const p2 = pts[i + 1];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.hypot(dx, dy) || 0.0001;
          const diff = ((11 - dist) / dist) * 0.5;
          const ox = dx * diff;
          const oy = dy * diff;

          if (!p1.fixed) {
            p1.x -= ox;
            p1.y -= oy;
          }
          if (!p2.fixed) {
            p2.x += ox;
            p2.y += oy;
          }
        }
      }

      prevDt = dt;
      renderSvg();

      // 3. Kinetic energy sleep detection
      let totalMovement = 0;
      for (let i = 1; i < pts.length; i++) {
        totalMovement += Math.abs(pts[i].x - pts[i].ox) + Math.abs(pts[i].y - pts[i].oy);
      }

      if (!isDraggingRef.current && totalMovement < sleepVelocity * dt * 60) {
        renderSvg();
        isRunning = false;
        return;
      }

      animFrame = requestAnimationFrame(step);
    };

    wakePhysicsRef.current = () => {
      if (!isRunning) {
        isRunning = true;
        lastTime = 0;
        prevDt = 0;
        animFrame = requestAnimationFrame(step);
      }
    };

    renderSvg();

    return () => {
      cancelAnimationFrame(animFrame);
    };
  }, []);

  const isDark = theme === 'dark';

  return (
    <>
      <div
        className="pullcord"
        style={{
          position: 'fixed',
          top: 'var(--pullcord-top, 0px)',
          right: 'var(--pullcord-right, 2.5rem)',
          zIndex: 'var(--pullcord-z, 70)',
          width: 64,
          height: 340,
          pointerEvents: 'none',
        }}
      >
        <div
          className={isDropping ? 'pullcord-inner pullcord-inner--drop' : 'pullcord-inner'}
          onAnimationEnd={(e) => {
            if (e.animationName === 'pullcord-drop') {
              entranceWiggle();
            }
          }}
        >
          <svg
            viewBox="0 0 64 340"
            width={64}
            height={340}
            aria-hidden="true"
            style={{ overflow: 'visible' }}
          >
            <defs>
              <linearGradient id="fb-pc-knob" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={isDark ? '#f8fafc' : '#ffffff'} />
                <stop offset="100%" stopColor={isDark ? '#cbd5e1' : '#e2e8f0'} />
              </linearGradient>
              <filter id="fb-pc-knob-sh" x="-70%" y="-70%" width="240%" height="240%">
                <feDropShadow dx="0" dy="1.4" stdDeviation="1.5" floodColor="rgba(0,0,0,0.35)" />
              </filter>
            </defs>

            {/* Simulated physics rope path */}
            <path
              ref={pathRef}
              d={pointsToSvgPath(createInitialPoints())}
              stroke="var(--pullcord-ink, rgba(120, 120, 120, 0.45))"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />

            {/* Hanging knob handle */}
            <g ref={knobRef}>
              <g filter="url(#fb-pc-knob-sh)">
                <circle
                  cx={32}
                  cy={176}
                  r={7}
                  fill="url(#fb-pc-knob)"
                  stroke={isDark ? 'rgba(59, 130, 246, 0.3)' : 'rgba(0,0,0,0.15)'}
                  strokeWidth={0.75}
                />
              </g>
            </g>
          </svg>

          {/* Interactive touch/pan button centered over the knob */}
          <motion.button
            type="button"
            className="pullcord-knob"
            aria-label="Pull cord to toggle light and dark mode"
            aria-pressed={isDark}
            title="Pull to toggle theme"
            onPanStart={
              shouldReduceMotion
                ? undefined
                : () => {
                    isDraggingRef.current = true;
                    hasDraggedRef.current = true;
                    hasToggledRef.current = false;
                    wakePhysicsRef.current();
                  }
            }
            onPan={
              shouldReduceMotion
                ? undefined
                : (_e, info: PanInfo) => {
                    const { stretchMax, stretchToggle } = configRef.current;
                    const offsetX = info.offset.x;
                    const offsetY = 176 + info.offset.y;
                    const dist = Math.hypot(offsetX, offsetY) || 0.0001;
                    const maxLen = 176 + stretchMax;
                    const scale = dist > maxLen ? maxLen / dist : 1;

                    targetPosRef.current = {
                      x: 32 + offsetX * scale,
                      y: offsetY * scale,
                    };

                    const threshold = Math.min(stretchToggle, stretchMax - 1);
                    if (!hasToggledRef.current && dist - 176 >= threshold) {
                      hasToggledRef.current = true;
                      handleToggleTheme();
                    }
                  }
            }
            onPanEnd={
              shouldReduceMotion
                ? undefined
                : () => {
                    const { maxVelocity } = configRef.current;
                    isDraggingRef.current = false;
                    const pts = pointsRef.current;
                    if (pts) {
                      const p = pts[pts.length - 1];
                      const vx = p.x - p.ox;
                      const vy = p.y - p.oy;
                      const vel = Math.hypot(vx, vy);
                      if (vel > maxVelocity) {
                        const scale = maxVelocity / vel;
                        p.ox = p.x - vx * scale;
                        p.oy = p.y - vy * scale;
                      }
                    }
                    wakePhysicsRef.current();
                    requestAnimationFrame(() => {
                      hasDraggedRef.current = false;
                    });
                  }
            }
            onClick={(e) => {
              if (!hasDraggedRef.current && e.detail !== 0) {
                triggerClick();
              }
            }}
            onKeyDown={(e) => {
              if ((e.key === 'Enter' || e.key === ' ') && !e.repeat) {
                e.preventDefault();
                triggerClick();
              }
            }}
            style={{
              position: 'absolute',
              left: 9,
              top: 153,
              width: 46,
              height: 46,
              padding: 0,
              border: 'none',
              background: 'transparent',
              cursor: 'grab',
              touchAction: 'none',
              pointerEvents: 'auto',
            }}
          />
        </div>
      </div>

      {/* Floating cursive invitation hint: "pull the cord!" with curved arrow */}
      {hintVisible && (
        <div
          className="cord-hint"
          aria-hidden="true"
          style={{
            position: 'fixed',
            top: 'calc(var(--pullcord-top, 0px) + 172px)',
            right: 'calc(var(--pullcord-right, 2.5rem) + 48px)',
            zIndex: 'calc(var(--pullcord-z, 70) - 1)',
          }}
        >
          <span className="cord-hint-text">
            pull the
            <br />
            cord!
          </span>
          <svg
            className="cord-hint-arrow"
            viewBox="16 11 59 68"
            width={44}
            height={50}
            aria-hidden="true"
          >
            <path
              d="M63.9304352,16.6935883c-0.7543335-0.2961426-1.5021973-0.5897217-2.2429199-0.8804922c-0.4156494-0.151001-0.8272705-0.3005371-1.2348022-0.4485474c-0.8189087-0.2849731-1.6208496-0.5641479-2.4039307-0.8366699c-3.142334-1.060791-6.0206909-1.8996582-8.4889526-2.4821777c-4.9364014-1.164978-8.2321777-1.3042603-8.7171021-0.1418457c-0.4849243,1.1624756,1.9327393,3.4066162,6.2335815,6.0951529c1.8245239,1.140564,4.0041504,2.3630371,6.4287109,3.6149292c-3.9299927,0.5129395-8.5645752,1.7341919-13.3596802,4.0892334c-2.4478149,1.2183838-4.8989258,2.7646484-7.2866211,4.5922241c-2.3288574,1.8961792-4.618042,4.0429077-6.6160278,6.5328979c-4.0496826,4.9500122-6.6275635,10.5092773-8.1968384,15.6245728c-1.5393066,5.1433716-2.2120972,9.887085-2.272583,13.8354492c-0.1154785,1.9729614,0.012085,3.7541504,0.1219482,5.3097534c0.0647583,0.777832,0.1106567,1.4995117,0.2159424,2.1618042c0.1115112,0.6623535,0.2285767,1.265686,0.350769,1.8070068c0.4889526,2.1658325,1.0587769,3.3349609,1.6884766,3.3342896c0.6296387-0.0006104,1.2607422-1.1640625,1.8604736-3.2163696c0.1498413-0.5132446,0.2977295-1.0822754,0.4429321-1.703186c0.1628418-0.6179199,0.3389282-1.2863159,0.5276489-2.0026855c0.3671875-1.4299927,0.6803589-3.0605469,1.182373-4.8129272c0.8353271-3.5391235,2.0805664-7.6299438,3.805542-11.9075317c1.7584839-4.2592163,4.09375-8.6965942,7.3496704-12.6729736c1.6064453-2.0076294,3.4013062-3.7537842,5.2017822-5.3754272c1.8607788-1.5527344,3.755249-2.9500122,5.6772461-4.1428223c3.8567505-2.3618164,7.7036743-4.0240479,11.0596924-5.2119751c0.1141968-0.0405884,0.2226563-0.0770874,0.3356323-0.1167603c-2.00354,2.4140625-3.7368164,4.677124-5.1082764,6.6715088c-2.8739014,4.1792603-4.1975708,7.2007446-3.2896729,8.0737915c0.9078369,0.8730469,3.8753052-0.5675049,7.9391479-3.602478c2.0318604-1.5174561,4.3378906-3.4335327,6.7976074-5.6582031c0.6096802-0.5618896,1.2340698-1.1373901,1.8716431-1.7250366c0.3148193-0.2980347,0.6328735-0.5991821,0.9540405-0.9032593c0.5633545-0.5615845,1.1321411-1.128479,1.7058105-1.7003784c2.5238647-2.5367432,5.1615601-5.2334595,7.8085938-7.9859619C70.7511749,19.4375458,67.2552032,18.0151825,63.9304352,16.6935883z"
              fill="currentColor"
            />
          </svg>
        </div>
      )}
    </>
  );
}

export default PullCordThemeToggle;
