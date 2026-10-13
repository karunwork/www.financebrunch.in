import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASING, DURATIONS } from '@/lib/animations';

export const FooterWordmark: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-full overflow-hidden pt-8 pb-10 select-none">
      {/* Progressive Wordmark Reveal */}
      <motion.div
        className="w-full text-center"
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: DURATIONS.slow, ease: EASING.decelerate }}
      >
        <h2 
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[7.5vw] font-black tracking-tighter leading-none uppercase bg-gradient-to-b from-slate-900/10 via-slate-800/5 to-transparent dark:from-white/12 dark:via-white/4 dark:to-transparent bg-clip-text text-transparent"
          aria-hidden="true"
        >
          FINANCE BRUNCH
        </h2>
      </motion.div>

      {/* Brand Signature */}
      <motion.div 
        className="text-center mt-3 sm:mt-5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: DURATIONS.normal, delay: shouldReduceMotion ? 0 : 0.2, ease: EASING.decelerate }}
      >
        <p className="inline-flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-mono uppercase tracking-[0.22em] font-semibold text-slate-500 dark:text-slate-400">
          <span>PLAN WITH PURPOSE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
          <span>MOVE WITH CLARITY</span>
        </p>
      </motion.div>
    </div>
  );
};
