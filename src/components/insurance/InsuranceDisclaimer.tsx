import React from 'react';
import { AlertTriangle, Info, Scale, ShieldAlert } from 'lucide-react';

export const InsuranceDisclaimer: React.FC = () => {
  return (
    <section aria-label="Insurance regulatory disclaimer" className="bg-slate-100 dark:bg-slate-950 py-10 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
      <div className="container px-4 md:px-6 mx-auto max-w-5xl">
        <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            <ShieldAlert className="h-4 w-4 text-amber-500" />
            <span>Important Educational Disclosure & Regulatory Notice</span>
          </div>

          <div className="space-y-3 text-xs leading-relaxed">
            <p>
              <strong>Educational & Informational Nature:</strong> All information, calculations, estimators, comparison tables, and checklists provided on this page are prepared solely for general educational, financial literacy, and planning guidance purposes. They do not constitute an offer of insurance, legal underwriting advice, or a guarantee of coverage.
            </p>
            <p>
              <strong>Insurer Discretion & Policy Wordings:</strong> Insurance is the subject matter of solicitation. Policy terms, exclusions, premium rates, waiting periods, sub-limits, deductibles, and claim settlement outcomes are strictly governed by the official policy wording, sales brochure, and prospectus issued by the respective IRDAI-registered insurance company. Finance Brunch strongly advises all prospective policyholders to carefully read the complete policy wording, terms and conditions, and declaration documents prior to concluding a purchase.
            </p>
            <p>
              <strong>Underwriting & Claim Decisions:</strong> Final underwriting decisions—including policy issuance, premium loadings, medical tests, counter-offers, and claim approvals or rejections—are executed exclusively by the insurer under the provisions of the Insurance Act, 1938 and relevant IRDAI regulations. Finance Brunch provides objective educational analysis and advisory support to help you understand options, but does not exercise underwriting authority on behalf of insurers.
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
            <span>Finance Brunch • Financial Advisory, Wealth & Insurance Planning</span>
            <span>Registered Office: Financial District, Gachibowli, Hyderabad, Telangana 500032</span>
          </div>
        </div>
      </div>
    </section>
  );
};
