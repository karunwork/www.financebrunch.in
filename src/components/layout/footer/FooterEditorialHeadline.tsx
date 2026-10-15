import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { EASING, DURATIONS } from '@/lib/animations';

export const FooterEditorialHeadline: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const line1Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: DURATIONS.normal,
        ease: EASING.decelerate,
      },
    },
  };

  const line2Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: DURATIONS.normal,
        delay: shouldReduceMotion ? 0 : 0.12,
        ease: EASING.decelerate,
      },
    },
  };

  return (
    <div className="mb-14">
      {/* Brand Logo & Eyebrow Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
        <Link 
          to="/" 
          className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md transition-opacity hover:opacity-90"
          aria-label="Finance Brunch Home"
        >
          <img
            src="/images/finance-brunch-logo-nobg.png"
            alt="Finance Brunch – Financial Advisory & Planning"
            className="h-11 sm:h-12 w-auto object-contain block dark:hidden"
            style={{ maxWidth: '190px' }}
          />
          <img
            src="/images/finance-brunch-logo-dark.png"
            alt="Finance Brunch – Financial Advisory & Planning"
            className="h-11 sm:h-12 w-auto object-contain hidden dark:block"
            style={{ maxWidth: '190px' }}
          />
        </Link>

        {/* Small Eyebrow Label */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/80 dark:bg-darkblue-950/70 border border-blue-200/60 dark:border-cyan-500/30 text-blue-700 dark:text-cyan-300 w-fit">
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
          <span className="text-[11px] font-mono tracking-widest font-semibold uppercase">
            THE FUTURE ISN'T LEFT TO CHANCE.
          </span>
        </div>
      </div>

      {/* Main Editorial Headline */}
      <div className="max-w-4xl">
        <motion.h2 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-slate-900 dark:text-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.span variants={line1Variants} className="block">
            Make money moves.
          </motion.span>
          <motion.span 
            variants={line2Variants} 
            className="block mt-1 sm:mt-2 bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 dark:from-blue-400 dark:via-sky-300 dark:to-cyan-300 bg-clip-text text-transparent pb-1"
          >
            With meaning.
          </motion.span>
        </motion.h2>

        {/* Supporting Editorial Text */}
        <motion.p
          className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: DURATIONS.normal, delay: shouldReduceMotion ? 0 : 0.25, ease: EASING.decelerate }}
        >
          Understand your options. Plan with purpose. Build towards the life you envision.
        </motion.p>
      </div>
    </div>
  );
};
