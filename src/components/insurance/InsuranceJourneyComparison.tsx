import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, X, ShieldCheck, AlertTriangle, HelpCircle, FileCheck2, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface InsuranceJourneyComparisonProps {
  onWhatsApp: (service: 'Health Insurance' | 'Term Insurance') => void;
}

export const InsuranceJourneyComparison: React.FC<InsuranceJourneyComparisonProps> = ({ onWhatsApp }) => {
  const shouldReduceMotion = useReducedMotion();

  const comparisonRows = [
    {
      stage: 'Policy Selection',
      guided: {
        title: 'Needs-Based Analysis',
        detail:
          'Evaluates family liabilities, existing group/employer cover, living expenses, and life-stage risks to identify optimal coverage sum and structure.',
        status: 'positive',
      },
      selfDirected: {
        title: 'Algorithm/Price-Driven',
        detail:
          'Users are typically steered by default sorting (cheapest premium or highest portal commission) without personalized risk evaluation.',
        status: 'caution',
      },
    },
    {
      stage: 'Benefits & Exclusions Audit',
      guided: {
        title: 'Proactive Fine-Print Check',
        detail:
          'Room-rent caps, waiting periods, sub-limits, restoration rules, and consumable exclusions are thoroughly examined before recommending plans.',
        status: 'positive',
      },
      selfDirected: {
        title: 'Overlooked Restrictions',
        detail:
          'Critical conditions buried in lengthy policy wording documents are frequently missed, leading to surprise out-of-pocket bills during hospital claims.',
        status: 'caution',
      },
    },
    {
      stage: 'Proposal & Disclosures',
      guided: {
        title: 'Assisted Declarations',
        detail:
          'Step-by-step assistance with reporting medical history, tobacco/nicotine use, and active policies to ensure compliance under Section 45.',
        status: 'positive',
      },
      selfDirected: {
        title: 'High Risk of Inadvertent Omission',
        detail:
          'Rushing through online check-boxes can result in accidental omission of past medical history, the leading cause of disputed claims later.',
        status: 'caution',
      },
    },
    {
      stage: 'Medical Underwriting',
      guided: {
        title: 'Guided Test & Counter-Offer Support',
        detail:
          'Guidance on fasting/test requirements and impartial evaluation of insurer counter-offers (e.g. premium loadings or disease exclusions).',
        status: 'positive',
      },
      selfDirected: {
        title: 'Unassisted Negotiations',
        detail:
          'Applicants must independently interpret medical queries, premium load offers, or medical re-scheduling requirements without context.',
        status: 'caution',
      },
    },
    {
      stage: 'Policy Issuance & Audit',
      guided: {
        title: 'Verification of Policy Schedule',
        detail:
          'Manual audit of policy certificate, sum insured, endorsement clauses, nominee details, and waiting period endorsements to catch errors early.',
        status: 'positive',
      },
      selfDirected: {
        title: 'Automated PDF Delivery',
        detail:
          'Document is emailed automatically; clerical errors in name spelling, DOB, or nominee entries often go unnoticed until a claim is filed.',
        status: 'caution',
      },
    },
    {
      stage: 'Renewals & Claims Readiness',
      guided: {
        title: 'Annual Review & Claims Checklist',
        detail:
          'Periodic review of life-stage changes, guidance on hospital pre-authorization steps, and checklist of mandatory claim documentation.',
        status: 'positive',
      },
      selfDirected: {
        title: 'Reactive Self-Help',
        detail:
          'Must independently search insurer customer care portals or toll-free numbers during emergencies to understand submission requirements.',
        status: 'caution',
      },
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900/60 border-y border-slate-200/80 dark:border-slate-800">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <Badge variant="outline" className="mb-3 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-cyan-400 border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/60">
            Process Comparison
          </Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Guided Advisory vs. Self-Directed Purchase
          </h2>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Buying insurance without professional context can lead to costly blind spots.
            Here is a fair comparison of how a guided insurance journey compares with an unassisted self-directed process.
          </p>
        </div>

        {/* Comparison Table / Responsive Cards */}
        <div className="max-w-5xl mx-auto overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md">
          {/* Header Row (Desktop) */}
          <div className="hidden md:grid grid-cols-12 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white">
            <div className="col-span-3 p-5">Journey Stage</div>
            <div className="col-span-5 p-5 bg-blue-50/70 dark:bg-blue-950/40 text-blue-700 dark:text-cyan-400 border-x border-slate-200 dark:border-slate-700 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-cyan-500" />
              <span>With Finance Brunch Guidance</span>
            </div>
            <div className="col-span-4 p-5 text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-slate-400" />
              <span>Unassisted / Self-Directed Portal</span>
            </div>
          </div>

          {/* Table Body Rows */}
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {comparisonRows.map((row, idx) => (
              <motion.div
                key={idx}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="grid grid-cols-1 md:grid-cols-12 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
              >
                {/* Stage Title */}
                <div className="col-span-12 md:col-span-3 p-5 md:py-6 font-bold text-slate-900 dark:text-white flex items-center gap-2 bg-slate-50/40 dark:bg-slate-900/40 md:bg-transparent">
                  <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-cyan-400 shrink-0" />
                  <span>{row.stage}</span>
                </div>

                {/* Guided Approach */}
                <div className="col-span-12 md:col-span-5 p-5 md:py-6 bg-blue-50/30 dark:bg-blue-950/20 md:border-x border-slate-200 dark:border-slate-800">
                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                        {row.guided.title}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {row.guided.detail}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Self-Directed Approach */}
                <div className="col-span-12 md:col-span-4 p-5 md:py-6">
                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                      <AlertTriangle className="h-3 w-3" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-slate-700 dark:text-slate-300 mb-1">
                        {row.selfDirected.title}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        {row.selfDirected.detail}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Note on Claims Underwriting */}
        <p className="text-xs text-center text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mt-6">
          Note: Final claim settlement, premium pricing, and underwriting approval depend strictly on the respective insurance company and policy conditions. Guidance aims to minimize application errors and demystify policy terms.
        </p>
      </div>
    </section>
  );
};
