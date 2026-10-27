import React from 'react';
import { ShieldAlert } from 'lucide-react';

interface MutualFundDisclaimerBannerProps {
  className?: string;
}

export const MutualFundDisclaimerBanner: React.FC<MutualFundDisclaimerBannerProps> = ({ className = '' }) => {
  return (
    <aside
      aria-label="Important Mutual Fund Disclaimer"
      className={`w-full mb-10 ${className}`}
    >
      <div className="relative overflow-hidden rounded-2xl border border-amber-300/80 dark:border-amber-500/30 bg-gradient-to-br from-amber-50/95 via-amber-50/60 to-yellow-50/70 dark:from-amber-950/30 dark:via-slate-900/95 dark:to-amber-950/20 p-5 sm:p-7 shadow-md shadow-amber-500/5 dark:shadow-[0_0_25px_-5px_rgba(245,158,11,0.12)] transition-shadow">
        {/* Subtle top gold accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500" />

        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
          {/* Shield Alert Icon */}
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-amber-100 dark:bg-amber-950/80 border border-amber-200/90 dark:border-amber-800/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
            <ShieldAlert className="h-6 w-6" aria-hidden="true" />
          </div>

          {/* Heading and Body */}
          <div className="flex-1 min-w-0 space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="text-lg sm:text-xl font-bold text-amber-950 dark:text-amber-100 tracking-tight">
                Important Mutual Fund Disclaimer
              </h2>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-300 bg-amber-100/90 dark:bg-amber-950/90 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800/60">
                Regulatory Notice
              </span>
            </div>

            <div className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>
                Mutual fund investments are subject to market risks. Please read all scheme-related documents carefully before investing. Past performance is not indicative of future returns. The value of investments may rise or fall, and returns are not guaranteed. Investors should consider their financial goals, investment horizon, and risk tolerance before making investment decisions.
              </p>
              <p>
                Finance Brunch provides financial information for educational purposes. Investment decisions should be made after reviewing the relevant scheme documents and, where appropriate, consulting a qualified financial professional.
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default MutualFundDisclaimerBanner;
