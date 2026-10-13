import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASING } from '@/lib/animations';

interface MilestonePoint {
  x: number;
  y: number;
  step: string;
  label: string;
}

const MILESTONES: MilestonePoint[] = [
  { x: 140, y: 165, step: '01', label: 'Clarify Goals' },
  { x: 380, y: 130, step: '02', label: 'Strategic Plan' },
  { x: 640, y: 75, step: '03', label: 'Disciplined Growth' },
  { x: 920, y: 25, step: '04', label: 'Financial Freedom' },
];

export const FooterFinancialGrid: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  // Smooth bezier curve coordinates representing disciplined growth
  const pathD = "M 40 180 C 200 175, 300 145, 460 115 C 620 85, 780 45, 960 22";
  const areaD = `${pathD} L 960 210 L 40 210 Z`;

  return (
    <div 
      className="relative w-full overflow-hidden rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 backdrop-blur-sm p-4 sm:p-6 mb-12"
      aria-hidden="true"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(100,116,139,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,116,139,0.07)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(56,189,248,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.04)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Grid Header & Subtitle */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-semibold">
            YOUR FINANCIAL JOURNEY
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 italic">
          Every journey begins with a clearer decision.
        </p>
      </div>

      {/* Animated SVG Financial Graph */}
      <div className="relative w-full h-32 sm:h-40 pointer-events-none select-none">
        <svg 
          viewBox="0 0 1000 210" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Gradient along the graph line */}
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
              <stop offset="40%" stopColor="#2563EB" stopOpacity="0.8" />
              <stop offset="75%" stopColor="#06B6D4" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#22D3EE" stopOpacity="1" />
            </linearGradient>

            {/* Gradient area under the line */}
            <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.12" />
              <stop offset="60%" stopColor="#3B82F6" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>

            {/* Glow Filter */}
            <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Area Fill */}
          <motion.path
            d={areaD}
            fill="url(#areaGrad)"
            initial={shouldReduceMotion ? { opacity: 0.1 } : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASING.decelerate }}
          />

          {/* Graph Curve Line */}
          <motion.path
            d={pathD}
            stroke="url(#lineGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            initial={shouldReduceMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0.2 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: EASING.decelerate }}
          />

          {/* Glowing Milestone Data Points */}
          {MILESTONES.map((point, index) => (
            <g key={point.step}>
              {/* Outer Pulsing Halo */}
              <motion.circle
                cx={point.x}
                cy={point.y}
                r="10"
                fill="#22D3EE"
                fillOpacity="0.18"
                initial={shouldReduceMotion ? { opacity: 0.4 } : { scale: 0.8, opacity: 0 }}
                whileInView={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                viewport={{ once: true }}
                transition={
                  shouldReduceMotion 
                    ? { duration: 0.3 } 
                    : { duration: 3, repeat: Infinity, delay: index * 0.4, ease: "easeInOut" }
                }
              />
              
              {/* Inner Glowing Data Node */}
              <circle
                cx={point.x}
                cy={point.y}
                r="4.5"
                fill="#06B6D4"
                className="filter drop-shadow-[0_0_6px_rgba(6,182,212,0.9)]"
              />
              <circle
                cx={point.x}
                cy={point.y}
                r="1.8"
                fill="#FFFFFF"
              />

              {/* Text Tag */}
              <text
                x={point.x}
                y={point.y > 100 ? point.y + 24 : point.y - 14}
                textAnchor="middle"
                className="text-[10px] sm:text-[11px] font-mono fill-slate-500 dark:fill-slate-400 font-medium tracking-wide"
              >
                {point.step} · {point.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};
