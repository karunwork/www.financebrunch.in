import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { SocialLinks } from './SocialLinks';
import { EASING, DURATIONS } from '@/lib/animations';

interface FooterBottomBarProps {
  currentYear: number;
}

export const FooterBottomBar: React.FC<FooterBottomBarProps> = ({ currentYear }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="pt-2">
      {/* Animated Bottom Cyan Divider */}
      <motion.div
        className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-cyan-500/60 dark:via-cyan-400/50 to-transparent mb-8 origin-center"
        initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: DURATIONS.slow, ease: EASING.decelerate }}
      />

      {/* Connected Translucent Footer Surface */}
      <div className="rounded-2xl p-6 sm:p-8 bg-white/50 dark:bg-[#071124]/60 backdrop-blur-md border border-blue-100/80 dark:border-cyan-500/20 shadow-sm transition-all duration-300">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Dynamic Copyright & Brand */}
          <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 text-center md:text-left">
            © {currentYear} FinanceBrunch Strategies Pvt. Ltd. All rights reserved.
          </p>

          {/* Legal Links with Cyan Hover Accents */}
          <div className="flex flex-wrap justify-center items-center gap-5 sm:gap-6 text-xs sm:text-sm">
            <Link
              to="/privacy-policy"
              className="text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-500 rounded font-medium"
            >
              Privacy Policy
            </Link>
            <span className="text-cyan-500/40 select-none">•</span>
            <Link
              to="/terms-of-service"
              className="text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-500 rounded font-medium"
            >
              Terms of Service
            </Link>
            <span className="text-cyan-500/40 select-none">•</span>
            <Link
              to="/disclaimer"
              className="text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-500 rounded font-medium"
            >
              Disclaimer
            </Link>
          </div>

          {/* Refined Social Links with Hover Glow */}
          <div className="flex items-center">
            <SocialLinks />
          </div>
        </div>

        {/* Thin Subtle Cyan Separator */}
        <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />

        {/* Compliance & Regulatory Credentials Footnote */}
        <div className="text-center space-y-2">
          <p className="text-[11px] font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400 font-semibold">
            CIN: U64990AP2025PTC118363
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-4xl mx-auto leading-relaxed">
            Founded by SAIKARUN ARASADA. Our team consists of professionals with advanced certifications in financial planning from the Financial Planning Association (FPA), along with regulatory credentials including NISM certification, ARN registration, and IRDAI licensing, ensuring we deliver expert financial guidance compliant with industry standards.
          </p>
        </div>
      </div>
    </div>
  );
};
