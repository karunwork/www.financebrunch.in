import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { TrendingUp, Sparkles, Activity } from 'lucide-react';
import { EASING } from '@/lib/animations';

interface DataPoint {
  year: string;
  yearNum: number;
  fbValue: number;
  benchValue: number;
  highlight?: boolean;
}

const GRAPH_DATA: DataPoint[] = [
  { year: 'Year 1', yearNum: 1, fbValue: 0, benchValue: 0 },
  { year: 'Year 2', yearNum: 2, fbValue: 50, benchValue: 30 },
  { year: 'Year 3', yearNum: 3, fbValue: 80, benchValue: 40 },
  { year: 'Year 4', yearNum: 4, fbValue: 150, benchValue: 100 },
  { year: 'Year 5', yearNum: 5, fbValue: 220, benchValue: 180 },
  { year: 'Year 6', yearNum: 6, fbValue: 250, benchValue: 200 },
  { year: 'Year 7', yearNum: 7, fbValue: 350, benchValue: 280, highlight: true },
];

// SVG Coordinate System
const VIEW_WIDTH = 640;
const VIEW_HEIGHT = 340;
const PADDING_LEFT = 48;
const PADDING_RIGHT = 38;
const PADDING_TOP = 45;
const PADDING_BOTTOM = 55;

const CHART_WIDTH = VIEW_WIDTH - PADDING_LEFT - PADDING_RIGHT;
const CHART_HEIGHT = VIEW_HEIGHT - PADDING_TOP - PADDING_BOTTOM;
const BASELINE_Y = VIEW_HEIGHT - PADDING_BOTTOM;
const MAX_VALUE = 375;

// Coordinate mapping
function getSvgPoints(isFB: boolean) {
  const stepX = CHART_WIDTH / (GRAPH_DATA.length - 1);
  return GRAPH_DATA.map((d, i) => {
    const val = isFB ? d.fbValue : d.benchValue;
    const x = PADDING_LEFT + i * stepX;
    const y = BASELINE_Y - (val / MAX_VALUE) * CHART_HEIGHT;
    return { x, y, ...d };
  });
}

const fbPoints = getSvgPoints(true);
const benchPoints = getSvgPoints(false);

// Smooth cubic Bézier spline calculation
function getSmoothPath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return '';
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

function getAreaPath(points: { x: number; y: number }[]): string {
  const line = getSmoothPath(points);
  if (!line) return '';
  const first = points[0];
  const last = points[points.length - 1];
  return `${line} L ${last.x} ${BASELINE_Y} L ${first.x} ${BASELINE_Y} Z`;
}

const fbPath = getSmoothPath(fbPoints);
const fbArea = getAreaPath(fbPoints);
const benchPath = getSmoothPath(benchPoints);
const benchArea = getAreaPath(benchPoints);

export default function HeroFloatingGraph() {
  const shouldReduceMotion = useReducedMotion();
  const [selectedIndex, setSelectedIndex] = useState<number>(6); // Default to Year 7
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const selectedData = GRAPH_DATA[selectedIndex];
  const selectedFbPoint = fbPoints[selectedIndex];
  const selectedBenchPoint = benchPoints[selectedIndex];

  const gridLevels = [0, 100, 200, 300, 350];

  return (
    <div className="relative w-full max-w-lg lg:max-w-xl mx-auto select-none [perspective:1400px]">
      {/* 1. Futuristic Backlight Ambient Bloom (Soft Cyan & Electric Blue Atmosphere) */}
      <div 
        className="absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-tr from-cyan-500/20 via-blue-600/15 to-sky-400/10 dark:from-cyan-400/25 dark:via-blue-500/20 dark:to-teal-400/10 blur-3xl opacity-80 dark:opacity-90 pointer-events-none transition-all duration-500"
        aria-hidden="true"
      />

      {/* 2. 3D Floating Glass Plate Container */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 18, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: EASING.decelerate }}
        className="relative [transform-style:preserve-3d] transition-transform duration-500 ease-out hover:[transform:rotateX(0deg)_rotateY(0deg)_scale(1.01)] [transform:rotateX(2deg)_rotateY(-3deg)]"
      >
        {/* Layer 1: Outer Illuminated Glass Bevel with Cyan Glow Edges */}
        <div className="relative rounded-3xl p-1 bg-gradient-to-br from-white/70 via-cyan-400/30 to-blue-500/20 dark:from-white/20 dark:via-cyan-400/35 dark:to-blue-600/25 shadow-[0_20px_50px_-10px_rgba(6,182,212,0.22),0_10px_25px_-5px_rgba(37,99,235,0.12),inset_0_1px_2px_rgba(255,255,255,0.8)] dark:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.8),0_0_35px_rgba(6,182,212,0.25),inset_0_1px_1px_rgba(255,255,255,0.4)]">
          
          {/* Layer 2: Main Translucent Crystal Glass Surface */}
          <div className="relative rounded-[1.4rem] bg-white/40 dark:bg-[#071328]/55 backdrop-blur-2xl border border-white/60 dark:border-cyan-400/20 p-4 sm:p-6 overflow-hidden">
            
            {/* Subtle Diagonal Glass Refraction Highlight Across Face */}
            <div 
              className={`absolute inset-0 bg-gradient-to-br from-white/35 via-transparent to-cyan-500/5 dark:from-white/10 dark:via-transparent dark:to-cyan-400/5 pointer-events-none transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-75'}`}
              aria-hidden="true"
            />
            {/* Glowing Cyan Top Edge Highlight */}
            <div 
              className="absolute top-0 inset-x-8 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-75 dark:opacity-90 pointer-events-none"
              aria-hidden="true"
            />

            {/* Header: Minimalist Glass HUD Navigation */}
            <div className="relative z-10 flex items-center justify-between gap-3 mb-4 pb-3 border-b border-white/40 dark:border-white/10">
              <div className="flex items-center gap-2.5">
                {/* Cyan Neon Beacon Pulse */}
                <div className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-80"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500 dark:bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white tracking-wide">
                      CAPITAL TRAJECTORY
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 dark:bg-cyan-400/15 text-cyan-700 dark:text-cyan-300 border border-cyan-400/30">
                      7Y HORIZON
                    </span>
                  </div>
                </div>
              </div>

              {/* Luminous Floating Stat Capsule */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 dark:bg-cyan-400/15 border border-cyan-400/40 text-cyan-800 dark:text-cyan-200 text-xs font-semibold backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                <TrendingUp className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
                <span className="font-mono font-bold">+350% Net Alpha</span>
              </div>
            </div>

            {/* Dynamic Glass Tooltip / Metric Inspector Bar */}
            <div className="relative z-10 flex items-center justify-between bg-white/50 dark:bg-white/5 backdrop-blur-xl rounded-xl px-3.5 sm:px-4 py-2 mb-3 border border-white/70 dark:border-cyan-400/20 text-xs transition-all duration-300 shadow-xs">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="font-semibold text-gray-800 dark:text-gray-200 font-mono">
                  {selectedData.year}:
                </span>
                <span className="inline-flex items-center gap-1.5 font-bold text-blue-700 dark:text-cyan-300 drop-shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]"></span>
                  ₹{selectedData.fbValue}L
                </span>
                <span className="text-gray-400 dark:text-gray-600">/</span>
                <span className="inline-flex items-center gap-1.5 text-gray-600 dark:text-gray-300 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  ₹{selectedData.benchValue}L Base
                </span>
              </div>
              
              <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold text-cyan-700 dark:text-cyan-300 bg-cyan-400/10 dark:bg-cyan-400/15 px-2 py-0.5 rounded-md border border-cyan-400/25">
                <Sparkles className="h-3 w-3 text-cyan-500 dark:text-cyan-300" />
                <span>Spread: +{selectedData.fbValue - selectedData.benchValue}L</span>
              </div>
            </div>

            {/* SVG Visual Canvas */}
            <div 
              className="relative w-full aspect-[640/340] cursor-crosshair touch-manipulation"
              onMouseLeave={() => setIsHovered(false)}
            >
              <svg 
                viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`} 
                className="w-full h-full overflow-visible"
                aria-label="Translucent glass financial growth visualization comparison"
              >
                <defs>
                  {/* Neon Cyan to Blue Primary Glow Filter */}
                  <filter id="neonCyanGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  {/* Translucent Cyan Area Fill Gradient */}
                  <linearGradient id="translucentCyanArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.32" />
                    <stop offset="40%" stopColor="#0284C7" stopOpacity="0.14" />
                    <stop offset="85%" stopColor="#1E40AF" stopOpacity="0.03" />
                    <stop offset="100%" stopColor="#1E40AF" stopOpacity="0" />
                  </linearGradient>

                  {/* Translucent Benchmark Area Fill */}
                  <linearGradient id="translucentBenchArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.14" />
                    <stop offset="70%" stopColor="#047857" stopOpacity="0.02" />
                    <stop offset="100%" stopColor="#047857" stopOpacity="0" />
                  </linearGradient>

                  {/* Luminous Cyan to Vivid Blue Line Stroke Gradient */}
                  <linearGradient id="luminousCyanLine" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#22D3EE" />
                    <stop offset="45%" stopColor="#06B6D4" />
                    <stop offset="80%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#2563EB" />
                  </linearGradient>

                  {/* Benchmark Trajectory Gradient */}
                  <linearGradient id="benchmarkLine" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#34D399" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>

                {/* Ultra-Fine Etched Glass Grid Lines & Y-Axis Scale */}
                {gridLevels.map((level) => {
                  const y = BASELINE_Y - (level / MAX_VALUE) * CHART_HEIGHT;
                  return (
                    <g key={`glass-grid-${level}`}>
                      <line
                        x1={PADDING_LEFT}
                        y1={y}
                        x2={VIEW_WIDTH - PADDING_RIGHT}
                        y2={y}
                        stroke="currentColor"
                        strokeDasharray={level === 0 ? "none" : "2,6"}
                        className="text-gray-400/25 dark:text-cyan-200/15"
                        strokeWidth={level === 0 ? "1.5" : "1"}
                      />
                      <text
                        x={PADDING_LEFT - 12}
                        y={y + 3.5}
                        textAnchor="end"
                        className="fill-gray-600 dark:fill-gray-300 text-[10px] sm:text-[11px] font-mono font-medium select-none"
                      >
                        {level}
                      </text>
                    </g>
                  );
                })}

                {/* X-Axis Year Labels */}
                {GRAPH_DATA.map((d, i) => {
                  const x = PADDING_LEFT + i * (CHART_WIDTH / (GRAPH_DATA.length - 1));
                  const isCurrent = i === selectedIndex;
                  return (
                    <text
                      key={`glass-lbl-${d.year}`}
                      x={x}
                      y={BASELINE_Y + 24}
                      textAnchor="middle"
                      className={`text-[10px] sm:text-[11px] font-mono transition-all duration-200 select-none ${
                        isCurrent 
                          ? 'fill-cyan-600 dark:fill-cyan-300 font-bold' 
                          : 'fill-gray-600 dark:fill-gray-400 font-medium'
                      }`}
                    >
                      {d.year}
                    </text>
                  );
                })}

                {/* Secondary Benchmark Translucent Area Fill */}
                <motion.path
                  d={benchArea}
                  fill="url(#translucentBenchArea)"
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />

                {/* Primary Cyan Area Fill */}
                <motion.path
                  d={fbArea}
                  fill="url(#translucentCyanArea)"
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.3 }}
                />

                {/* Benchmark Secondary Trajectory */}
                <motion.path
                  d={benchPath}
                  fill="none"
                  stroke="url(#benchmarkLine)"
                  strokeWidth="2"
                  strokeDasharray="4,4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={0.65}
                  initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.4, ease: EASING.decelerate }}
                />

                {/* Primary Luminous Cyan-to-Blue Line with Neon Glow */}
                <motion.path
                  d={fbPath}
                  fill="none"
                  stroke="url(#luminousCyanLine)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#neonCyanGlow)"
                  initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: EASING.decelerate }}
                />

                {/* Active Laser Guide Crosshair */}
                <line
                  x1={selectedFbPoint.x}
                  y1={PADDING_TOP - 12}
                  x2={selectedFbPoint.x}
                  y2={BASELINE_Y}
                  stroke="#22D3EE"
                  strokeWidth="1.5"
                  strokeDasharray="2,3"
                  className="opacity-75 transition-all duration-200"
                />

                {/* Benchmark Data Points */}
                {benchPoints.map((pt, i) => {
                  const isSelected = i === selectedIndex;
                  return (
                    <circle
                      key={`bench-dot-${i}`}
                      cx={pt.x}
                      cy={pt.y}
                      r={isSelected ? "4.5" : "3"}
                      fill="#10B981"
                      stroke="#ffffff"
                      strokeWidth={isSelected ? "2" : "1"}
                      className="transition-all duration-200 opacity-80"
                    />
                  );
                })}

                {/* Primary Luminous Cyan Glowing Points */}
                {fbPoints.map((pt, i) => {
                  const isSelected = i === selectedIndex;
                  const isHighlight = pt.highlight;
                  return (
                    <g key={`fb-dot-${i}`}>
                      {/* Outer Cyan Halo for Selected or Summit Point */}
                      {(isSelected || isHighlight) && (
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={isSelected ? "12" : "9"}
                          fill="#06B6D4"
                          opacity={isSelected ? "0.35" : "0.22"}
                          className="animate-pulse"
                        />
                      )}
                      {/* Inner Brilliant Core Point */}
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isSelected ? "6" : "4.5"}
                        fill="#22D3EE"
                        stroke="#0B132B"
                        strokeWidth={isSelected ? "2.5" : "1.8"}
                        className="transition-all duration-200 shadow-[0_0_10px_#22d3ee]"
                      />
                    </g>
                  );
                })}

                {/* Terminal Milestone Floating Glass Chip At Year 7 Apex */}
                <g transform={`translate(${fbPoints[6].x - 68}, ${fbPoints[6].y - 32})`}>
                  <rect
                    width="66"
                    height="20"
                    rx="6"
                    fill="currentColor"
                    className="text-white/80 dark:text-[#07172E]/90"
                    stroke="#22D3EE"
                    strokeWidth="1"
                  />
                  <text
                    x="33"
                    y="14"
                    textAnchor="middle"
                    className="fill-cyan-700 dark:fill-cyan-300 font-mono text-[9px] font-bold"
                  >
                    +350% PEAK
                  </text>
                </g>

                {/* Transparent Interactive Scrub Columns */}
                {GRAPH_DATA.map((_, i) => {
                  const stepX = CHART_WIDTH / (GRAPH_DATA.length - 1);
                  const colWidth = stepX;
                  const colX = PADDING_LEFT + i * stepX - colWidth / 2;
                  return (
                    <rect
                      key={`glass-touch-${i}`}
                      x={colX}
                      y={PADDING_TOP}
                      width={colWidth}
                      height={CHART_HEIGHT + 35}
                      fill="transparent"
                      tabIndex={0}
                      role="button"
                      aria-label={`Inspect Year ${i + 1} financial growth data`}
                      onMouseEnter={() => {
                        setSelectedIndex(i);
                        setIsHovered(true);
                      }}
                      onTouchStart={() => {
                        setSelectedIndex(i);
                        setIsHovered(true);
                      }}
                      onFocus={() => {
                        setSelectedIndex(i);
                        setIsHovered(true);
                      }}
                      className="focus:outline-none"
                    />
                  );
                })}
              </svg>
            </div>

            {/* Glass HUD Legend */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-3 mt-1 border-t border-white/40 dark:border-white/10 text-xs">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-1 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]"></span>
                  <span className="font-semibold text-gray-800 dark:text-cyan-100 font-mono text-[11px]">
                    FB Alpha Strategy
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-1 rounded-full bg-emerald-500 opacity-70"></span>
                  <span className="text-gray-600 dark:text-gray-400 font-mono text-[11px]">
                    Index Baseline
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-700 dark:text-cyan-300 font-medium">
                <Activity className="h-3.5 w-3.5 text-cyan-500" />
                <span>Illuminated Portfolio Trajectory</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Floating Glass Lens Badges (Matching Translucent Glass Language) */}
        {/* Top-Right Translucent Glass Investment Lens */}
        <div 
          className="absolute -top-5 -right-5 w-18 sm:w-22 h-18 sm:h-22 p-3 bg-white/35 dark:bg-white/5 backdrop-blur-xl rounded-2xl flex items-center justify-center animate-float border border-white/70 dark:border-cyan-400/30 shadow-[0_12px_30px_rgba(6,182,212,0.18)] hover:scale-110 transition-all duration-300 cursor-pointer [transform:translateZ(35px)]"
          title="Diversified Asset Allocation Strategy"
        >
          <img 
            src="/images/investment-icon.svg" 
            alt="Investment Growth" 
            className="w-9 sm:w-11 h-9 sm:h-11 drop-shadow-[0_0_8px_rgba(6,182,212,0.4)] transition-transform duration-300 hover:rotate-6" 
          />
        </div>

        {/* Bottom-Left Translucent Glass Shield Lens */}
        <div 
          className="absolute -bottom-4 -left-4 w-16 sm:w-18 h-16 sm:h-18 p-2.5 bg-white/35 dark:bg-white/5 backdrop-blur-xl rounded-2xl flex items-center justify-center animate-float-reverse border border-white/70 dark:border-cyan-400/30 shadow-[0_12px_30px_rgba(6,182,212,0.18)] hover:scale-110 transition-all duration-300 cursor-pointer [transform:translateZ(30px)]"
          title="Capital Protection & Risk Governance"
        >
          <img 
            src="/images/shield-icon.svg" 
            alt="Capital Security" 
            className="w-7 sm:w-9 h-7 sm:h-9 drop-shadow-[0_0_8px_rgba(37,99,235,0.4)] transition-transform duration-300 hover:rotate-[-6deg]" 
          />
        </div>
      </motion.div>
    </div>
  );
}
