import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Scale, 
  ExternalLink, 
  ShieldCheck, 
  Info,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Landmark
} from 'lucide-react';
import { Card } from '@/components/ui/card';

interface VpfVsPpfComparisonProps {
  calculatorId: string;
}

export const VpfVsPpfComparison: React.FC<VpfVsPpfComparisonProps> = ({ calculatorId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => {
    setIsOpen((prev) => !prev);
  };

  const panelId = `vpf-ppf-panel-${calculatorId}`;
  const buttonId = `vpf-ppf-button-${calculatorId}`;

  const comparisonRows = [
    {
      feature: 'Core Nature & Scheme Type',
      vpf: 'Voluntary retirement savings extension linked to an existing EPF account for organized sector employees.',
      ppf: 'Sovereign statutory savings scheme established by the Central Government for all resident citizens.',
    },
    {
      feature: 'Eligibility Criteria',
      vpf: 'Exclusively salaried employees in EPFO-registered organizations with active EPF accounts.',
      ppf: 'Any Indian resident citizen (salaried, self-employed, professionals, students, or minors via guardians). Excludes NRIs and HUFs.',
    },
    {
      feature: 'Contribution Limits',
      vpf: 'Voluntary contributions up to 100% of Basic Pay + Dearness Allowance (over mandatory 12% EPF). Employer has no matching obligation for voluntary component.',
      ppf: 'Minimum ₹500/financial year; strictly capped at ₹1,50,000/financial year across a maximum of 12 installments.',
    },
    {
      feature: 'Interest Rates & Returns',
      vpf: '8.25% p.a. (Notified by EPFO for FY 2023-24 / FY 2024-25; Groww historical reference noted 8.5%). Subject to annual EPFO Gazette notification.',
      ppf: '7.1% p.a. compounded annually (Ministry of Finance quarterly notification). Check latest official quarterly announcement.',
    },
    {
      feature: 'Tenure & Maturity Period',
      vpf: 'Matures at final retirement or employment resignation. Fully portable across organizations via Universal Account Number (UAN).',
      ppf: 'Mandatory 15-year statutory lock-in from the end of the opening fiscal year. Extendable in blocks of 5 years indefinitely with or without further contributions.',
    },
    {
      feature: 'Premature Withdrawals & Liquidity',
      vpf: 'Allowed only under specific statutory conditions: medical emergencies, residential construction/purchase, self/child marriage, or unemployment exceeding 2 months.',
      ppf: 'Partial withdrawals permitted starting from the 7th financial year (capped at 50% of eligible balance). Loan facility available between 3rd and 6th financial year.',
    },
    {
      feature: 'Income Tax Treatment',
      vpf: 'Contributions qualify under Section 80C up to ₹1.5 Lakh. Important tax note: Under Finance Act 2021, interest earned on employee PF contributions (EPF + VPF) exceeding ₹2.5 Lakh/year is taxable at applicable slab rates.',
      ppf: 'Strict EEE (Exempt-Exempt-Exempt) status. Deposits deductible up to ₹1.5 Lakh under Section 80C (Old Tax Regime); interest and entire maturity proceeds remain 100% tax-exempt.',
    },
    {
      feature: 'Sovereign Guarantee',
      vpf: 'Backed by EPFO statutory board under Government of India labor regulations.',
      ppf: 'Direct sovereign guarantee provided directly by the Government of India Ministry of Finance.',
    },
  ];

  return (
    <div className="w-full mt-6 space-y-4">
      {/* Expand / Collapse Button */}
      <div className="flex justify-start">
        <button
          type="button"
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={togglePanel}
          className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white dark:bg-slate-900 text-blue-600 dark:text-cyan-400 border border-blue-200 dark:border-cyan-900/60 shadow-xs hover:bg-blue-50/70 dark:hover:bg-slate-800 hover:border-blue-300 dark:hover:border-cyan-700 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
        >
          <Scale className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0" />
          <span>VPF vs PPF Comparison</span>
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-slate-400 transition-transform" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400 transition-transform" />
          )}
        </button>
      </div>

      {/* Expandable Information Panel */}
      {isOpen && (
        <Card
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          className="border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/95 shadow-md rounded-2xl p-5 sm:p-7 space-y-6 animate-in fade-in-50 duration-200"
        >
          {/* Header Summary */}
          <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-5">
            <div className="flex items-center gap-2 text-blue-600 dark:text-cyan-400">
              <ShieldCheck className="w-5 h-5 shrink-0" />
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                VPF vs PPF: Comprehensive Side-by-Side Analysis
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Both the Voluntary Provident Fund (VPF) and Public Provident Fund (PPF) are premier fixed-income, capital-protected investment avenues in India. While VPF functions as an employee-driven voluntary extension of the statutory EPF system, PPF is a standalone government-backed instrument open to all resident Indian citizens.
            </p>
          </div>

          {/* Desktop & Tablet Comparison Table */}
          <div className="hidden md:block overflow-x-auto rounded-xl border border-slate-200/80 dark:border-slate-800">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border-b border-slate-200/80 dark:border-slate-700">
                  <th className="py-3 px-4 font-bold w-1/4">Key Parameters</th>
                  <th className="py-3 px-4 font-bold w-3/8 text-blue-700 dark:text-cyan-300">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-4 h-4" />
                      <span>Voluntary Provident Fund (VPF)</span>
                    </div>
                  </th>
                  <th className="py-3 px-4 font-bold w-3/8 text-emerald-700 dark:text-emerald-300">
                    <div className="flex items-center gap-1.5">
                      <Landmark className="w-4 h-4" />
                      <span>Public Provident Fund (PPF)</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 leading-relaxed">
                {comparisonRows.map((row, idx) => (
                  <tr 
                    key={idx} 
                    className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="py-3 px-4 font-semibold text-slate-900 dark:text-slate-100 bg-slate-50/30 dark:bg-slate-900/40">
                      {row.feature}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                      {row.vpf}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                      {row.ppf}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Responsive Stacked Card Layout */}
          <div className="block md:hidden space-y-4">
            {comparisonRows.map((row, idx) => (
              <div 
                key={idx} 
                className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-2.5 text-xs"
              >
                <div className="font-bold text-slate-900 dark:text-white text-sm border-b border-slate-200 dark:border-slate-700 pb-1.5">
                  {row.feature}
                </div>
                <div className="space-y-1">
                  <span className="font-semibold text-blue-700 dark:text-cyan-300 block">
                    VPF (Voluntary Provident Fund):
                  </span>
                  <p className="text-slate-600 dark:text-slate-300 leading-normal pl-2 border-l-2 border-blue-400 dark:border-cyan-500">
                    {row.vpf}
                  </p>
                </div>
                <div className="space-y-1 pt-1">
                  <span className="font-semibold text-emerald-700 dark:text-emerald-300 block">
                    PPF (Public Provident Fund):
                  </span>
                  <p className="text-slate-600 dark:text-slate-300 leading-normal pl-2 border-l-2 border-emerald-400 dark:border-emerald-500">
                    {row.ppf}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Decision Matrix: What Factors to Consider */}
          <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-slate-800/60 border border-blue-100 dark:border-slate-700/80 space-y-3 text-xs sm:text-sm">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0" />
              <span>Which Scheme Should You Choose? Key Decision Factors</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <div className="space-y-1">
                <strong className="text-slate-900 dark:text-slate-100 block">1. Employment Status:</strong>
                If you are a salaried employee with an active EPF account, VPF offers a convenient automated salary deduction and typically a higher sovereign-backed interest rate than PPF. Self-employed individuals, freelancers, and homemakers must choose PPF.
              </div>
              <div className="space-y-1">
                <strong className="text-slate-900 dark:text-slate-100 block">2. Contribution Volume:</strong>
                PPF imposes a strict ₹1.5 Lakh annual ceiling. If you have significant surplus monthly income beyond ₹1.5 Lakh/year that you wish to allocate to risk-free debt, VPF allows up to 100% of basic pay.
              </div>
              <div className="space-y-1">
                <strong className="text-slate-900 dark:text-slate-100 block">3. Tax Thresholds:</strong>
                PPF remains 100% tax-free under EEE. For VPF, any interest on employee contributions exceeding ₹2.5 Lakh annually is taxable at your marginal slab rate.
              </div>
              <div className="space-y-1">
                <strong className="text-slate-900 dark:text-slate-100 block">4. Liquidity & Time Horizon:</strong>
                PPF has a disciplined 15-year statutory lock-in with loan availability and partial withdrawals after 6 completed years. VPF is tied to employment tenure and retirement, accessible early only under specified hardship grounds.
              </div>
            </div>
          </div>

          {/* Reference & Disclaimer Footer */}
          <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
              <Info className="w-3.5 h-3.5 shrink-0" />
              <span>Reference source & research:</span>
              <a
                href="https://groww.in/p/savings-schemes/vpf-vs-ppf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-600 dark:text-cyan-400 hover:underline font-semibold"
                aria-label="Read full VPF vs PPF comparison on Groww (opens in new tab)"
              >
                <span>Read full comparison on Groww</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="text-[11px] text-slate-400 dark:text-slate-500 italic max-w-xl">
              <span className="font-semibold not-italic">Disclaimer:</span> This comparison is prepared solely for educational and informational purposes and does not constitute personalized financial, tax, or investment advice. Interest rates and statutory guidelines are revised periodically by EPFO and the Ministry of Finance; please verify current notifications before investing.
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
