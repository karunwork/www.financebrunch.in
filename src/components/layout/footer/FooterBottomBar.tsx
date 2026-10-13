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
    <div className="pt-4">
      {/* Animated Bottom Cyan Divider */}
      <motion.div
        className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500/60 dark:via-cyan-400/50 to-transparent mb-8 origin-center"
        initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: DURATIONS.slow, ease: EASING.decelerate }}
      />

      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Dynamic Copyright & Brand */}
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 text-center md:text-left">
          © {currentYear} FinanceBrunch Strategies Pvt. Ltd. All rights reserved.
        </p>

        {/* Legal Links */}
        <div className="flex flex-wrap justify-center items-center gap-6 text-xs sm:text-sm">
          <Link
            to="/privacy-policy"
            className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-500 rounded"
          >
            Privacy Policy
          </Link>
          <span className="text-slate-300 dark:text-slate-700 select-none">•</span>
          <Link
            to="/terms-of-service"
            className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-500 rounded"
          >
            Terms of Service
          </Link>
          <span className="text-slate-300 dark:text-slate-700 select-none">•</span>
          <Link
            to="/disclaimer"
            className="text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-500 rounded"
          >
            Disclaimer
          </Link>
        </div>

        {/* Social Links */}
        <div className="flex items-center">
          <SocialLinks />
        </div>
      </div>

      {/* Compliance & Regulatory Credentials Footnote */}
      <div className="mt-8 pt-6 border-t border-slate-200/50 dark:border-slate-800/60 text-center space-y-2">
        <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
          CIN: U64990AP2025PTC118363
        </p>
        <p className="text-[11px] text-slate-400 dark:text-slate-500 max-w-4xl mx-auto leading-relaxed">
          Founded by SAIKARUN ARASADA. Our team consists of professionals with advanced certifications in financial planning from the Financial Planning Association (FPA), along with regulatory credentials including NISM certification, ARN registration, and IRDAI licensing, ensuring we deliver expert financial guidance compliant with industry standards.
        </p>
      </div>
    </div>
  );
};
