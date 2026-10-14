import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { DURATIONS, EASING } from '@/lib/animations';

export const FooterWordmark: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Scroll-linked transforms for reversible animation timeline
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  // 1. Glass panel starts slightly smaller and more transparent, expanding smoothly into position
  const panelScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 1.01]);
  const panelOpacity = useTransform(scrollYProgress, [0, 0.3], [0.85, 1]);

  // 2. FINANCE & BRUNCH typography scales into position with subtle depth
  const wordmarkScale = useTransform(scrollYProgress, [0, 0.55, 1], [0.92, 1, 1.02]);
  const wordmarkY = useTransform(scrollYProgress, [0, 0.55, 1], [22, 0, -6]);

  // 3. FB Watermark moves at independent rate to create subtle multi-plane parallax
  const watermarkY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const watermarkScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.04]);

  // Sweep animation states
  const [isSweeping, setIsSweeping] = useState(false);
  const [sweepCount, setSweepCount] = useState(0);
  const [taglineRevealed, setTaglineRevealed] = useState(false);

  // Pointer lighting states
  const [mousePos, setMousePos] = useState({ x: 350, y: 150 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const isSweepingRef = useRef(false);
  const hasTriggeredInitialRef = useRef(false);
  const lastSweepEndRef = useRef(0);
  const sweepTimerRef = useRef<NodeJS.Timeout | null>(null);
  const taglineTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
      setIsTouchDevice(true);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || shouldReduceMotion || !panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Trigger horizontal blue/cyan light reflection sweep sequence
  const startSweep = useCallback(() => {
    if (isSweepingRef.current) return;
    isSweepingRef.current = true;
    setSweepCount((prev) => prev + 1);
    setIsSweeping(true);

    // Schedule tagline reveal after the wordmark sweep begins
    if (!taglineRevealed) {
      if (taglineTimerRef.current) clearTimeout(taglineTimerRef.current);
      taglineTimerRef.current = setTimeout(() => {
        setTaglineRevealed(true);
      }, 1600);
    }

    // Complete sweep lifecycle and reset state for replay
    if (sweepTimerRef.current) clearTimeout(sweepTimerRef.current);
    sweepTimerRef.current = setTimeout(() => {
      setIsSweeping(false);
      isSweepingRef.current = false;
      lastSweepEndRef.current = Date.now();
    }, 2050);
  }, [taglineRevealed]);

  // Viewport entry trigger
  useEffect(() => {
    if (shouldReduceMotion) {
      setTaglineRevealed(true);
      return;
    }

    const currentEl = containerRef.current;
    if (!currentEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasTriggeredInitialRef.current) {
          hasTriggeredInitialRef.current = true;
          startSweep();
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(currentEl);

    return () => {
      observer.disconnect();
    };
  }, [shouldReduceMotion, startSweep]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (sweepTimerRef.current) clearTimeout(sweepTimerRef.current);
      if (taglineTimerRef.current) clearTimeout(taglineTimerRef.current);
    };
  }, []);

  // Hover/Click replay handler with cooldown protection
  const handleReplay = useCallback(() => {
    if (shouldReduceMotion || isSweepingRef.current) return;
    if (Date.now() - lastSweepEndRef.current < 350) return;
    startSweep();
  }, [shouldReduceMotion, startSweep]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full overflow-hidden py-10 sm:py-14 select-none"
    >
      {/* A. Large Frosted Architectural Glass Panel Behind Wordmark */}
      <motion.div
        ref={panelRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => {
          setIsHovered(true);
          handleReplay();
        }}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleReplay}
        style={{
          scale: shouldReduceMotion ? 1 : panelScale,
          opacity: shouldReduceMotion ? 1 : panelOpacity,
        }}
        className="footer-architectural-glass relative w-full overflow-hidden px-4 sm:px-8 md:px-12 py-10 sm:py-14 lg:py-16 flex flex-col items-center justify-center cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-[2rem] sm:rounded-[2.5rem]"
        tabIndex={0}
        role="button"
        aria-label="Finance Brunch — Hover or activate to replay brand sweep animation"
        title="Finance Brunch — Hover to replay brand light reflection"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleReplay();
          }
        }}
      >
        {/* Top Architectural Inset Highlight Line */}
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/60 dark:via-cyan-300/50 to-transparent pointer-events-none z-20" />

        {/* Ambient Corner Lighting Glow Blooms */}
        <div 
          className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-cyan-400/10 dark:bg-cyan-400/20 blur-[100px] pointer-events-none z-0" 
          aria-hidden="true" 
        />
        <div 
          className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-blue-600/15 dark:bg-blue-600/25 blur-[110px] pointer-events-none z-0" 
          aria-hidden="true" 
        />

        {/* Desktop Pointer-Responsive Radial Glow */}
        {!isTouchDevice && !shouldReduceMotion && (
          <div
            className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.12), transparent 70%)`,
            }}
            aria-hidden="true"
          />
        )}

        {/* Faint Subtle Reflective Sheen Layer Across Glass Surface */}
        <div 
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] dark:via-cyan-400/[0.03] to-transparent pointer-events-none z-0"
          aria-hidden="true"
        />

        {/* Official FB Watermark Positioned Behind Wordmark with Appropriate Opacity & Parallax */}
        <motion.div
          aria-hidden="true"
          style={{
            y: shouldReduceMotion ? 0 : watermarkY,
            scale: shouldReduceMotion ? 1 : watermarkScale,
          }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
        >
          <img
            src="/images/fb-watermark.png"
            alt=""
            className="w-56 sm:w-80 md:w-[440px] lg:w-[560px] xl:w-[640px] max-w-[85%] h-auto object-contain opacity-[0.065] dark:opacity-[0.09] filter contrast-125 dark:brightness-125 pointer-events-none select-none transition-opacity duration-500"
            loading="eager"
            decoding="async"
          />
        </motion.div>

        {/* B & C. Enlarged FINANCE / BRUNCH Wordmark with Reflective Blue/Cyan Gradient */}
        <motion.div
          style={{
            scale: shouldReduceMotion ? 1 : wordmarkScale,
            y: shouldReduceMotion ? 0 : wordmarkY,
          }}
          className="relative z-10 w-full text-center flex flex-col items-center justify-center leading-none"
        >
          <h2
            className="flex flex-col items-center justify-center m-0 p-0 select-none w-full"
            aria-label="Finance Brunch"
          >
            {/* Line 1: FINANCE */}
            <div className="relative inline-block m-0 p-0 leading-[0.84]">
              {/* Glossy Blue/Cyan Reflective Gradient Base Text */}
              <span className="footer-wordmark-reflective block text-[clamp(3.5rem,13.5vw,11rem)] font-black tracking-[-0.04em] leading-[0.84]">
                FINANCE
              </span>

              {/* Horizontal Cinematic Light Band Sweep Overlay */}
              {isSweeping && !shouldReduceMotion && (
                <span
                  key={`sweep-finance-${sweepCount}`}
                  aria-hidden="true"
                  className="absolute inset-0 block text-[clamp(3.5rem,13.5vw,11rem)] font-black tracking-[-0.04em] leading-[0.84] pointer-events-none select-none wordmark-sweep-overlay animate-sweep-line1"
                >
                  FINANCE
                </span>
              )}
            </div>

            {/* Line 2: BRUNCH */}
            <div className="relative inline-block m-0 p-0 leading-[0.84] mt-1 sm:mt-2">
              {/* Glossy Blue/Cyan Reflective Gradient Base Text */}
              <span className="footer-wordmark-reflective block text-[clamp(3.5rem,13.5vw,11rem)] font-black tracking-[-0.04em] leading-[0.84]">
                BRUNCH
              </span>

              {/* Horizontal Cinematic Light Band Sweep Overlay */}
              {isSweeping && !shouldReduceMotion && (
                <span
                  key={`sweep-brunch-${sweepCount}`}
                  aria-hidden="true"
                  className="absolute inset-0 block text-[clamp(3.5rem,13.5vw,11rem)] font-black tracking-[-0.04em] leading-[0.84] pointer-events-none select-none wordmark-sweep-overlay animate-sweep-line2"
                >
                  BRUNCH
                </span>
              )}
            </div>
          </h2>
        </motion.div>

        {/* 6. Exact Tagline Treatment with Smooth Cyan Underline Draw */}
        <div className="relative z-10 text-center mt-6 sm:mt-8 flex flex-col items-center">
          <div className="relative inline-flex flex-col items-center">
            {/* Exact Required Tagline */}
            <p 
              className={`inline-flex items-center justify-center flex-wrap gap-x-1.5 text-xs sm:text-sm md:text-base font-semibold tracking-wider text-slate-700 dark:text-slate-300 pb-2 transition-opacity duration-700 ease-out ${
                taglineRevealed || shouldReduceMotion ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <span>Your Journey.</span>{' '}
              <span className="text-cyan-600 dark:text-cyan-400 font-bold">Your Goals.</span>{' '}
              <span className="text-blue-600 dark:text-blue-400 font-bold">Our Guidance.</span>
            </p>

            {/* 7. Thin Cyan-to-Blue Underline Illuminates Beneath Tagline */}
            <div
              aria-hidden="true"
              className={`h-[1.5px] w-full max-w-[280px] sm:max-w-[340px] md:max-w-[400px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent dark:via-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.8)] transition-all duration-700 ease-out origin-center pointer-events-none ${
                taglineRevealed || shouldReduceMotion
                  ? 'scale-x-100 opacity-100'
                  : 'scale-x-0 opacity-0'
              }`}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
