import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  CheckSquare,
  Square,
  Printer,
  RotateCcw,
  Heart,
  Umbrella,
  ChevronDown,
  ChevronUp,
  FileCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  mandatory: boolean;
}

const HEALTH_CHECKLIST: ChecklistItem[] = [
  {
    id: 'h-1',
    title: 'Adequate Base Sum Insured (₹10L - ₹25L+)',
    description: 'Ensure base cover is enough to withstand major metro hospitalizations without relying entirely on an employer policy.',
    mandatory: true,
  },
  {
    id: 'h-2',
    title: 'Zero Room Rent Capping (No 1% Limit)',
    description: 'Verify the policy allows single private room without proportionate deduction across OT, doctor fees, and nursing bills.',
    mandatory: true,
  },
  {
    id: 'h-3',
    title: 'Local Cashless Hospital Network Density',
    description: 'Check that preferred top multi-specialty hospitals near your residence and workplace are on the insurer’s active cashless roster.',
    mandatory: true,
  },
  {
    id: 'h-4',
    title: 'Pre-Existing Disease (PED) Waiting Period ≤ 24-36 Months',
    description: 'Confirm the waiting period duration for declared conditions like hypertension, diabetes, or thyroid before coverage triggers.',
    mandatory: true,
  },
  {
    id: 'h-5',
    title: 'Specific Illness Waiting Period (1-2 Years)',
    description: 'Review the list of 2-year waiting diseases (cataracts, hernia, joint replacement, kidney stones) to prevent unexpected rejections.',
    mandatory: false,
  },
  {
    id: 'h-6',
    title: 'Zero Co-payment & No Disease Sub-limits',
    description: 'Ensure you are not forced to pay 10-20% out of pocket on every claim, and check that common procedures are not capped at arbitrary amounts.',
    mandatory: true,
  },
  {
    id: 'h-7',
    title: 'Non-Medical Consumables Add-On / Rider',
    description: 'Include a consumable protection rider so syringes, gloves, PPE kits, and administrative items (10-20% of bill) are covered.',
    mandatory: false,
  },
  {
    id: 'h-8',
    title: 'Pre (60 days) & Post (180 days) Hospitalization Expenses',
    description: 'Verify reimbursement eligibility for diagnostic tests, blood work, medications, and follow-up consultations around an admission.',
    mandatory: true,
  },
  {
    id: 'h-9',
    title: 'Automatic Restoration / Rebound Benefit',
    description: 'Check whether the sum insured refills if exhausted, and whether it restores for the same illness or only unrelated conditions.',
    mandatory: false,
  },
  {
    id: 'h-10',
    title: 'Lifetime Renewability & Transparent Incurred Claim Ratio',
    description: 'Confirm the policy can be renewed for life without age cutoff, and check the insurer’s Incurred Claim Ratio (aim for 70-85%).',
    mandatory: true,
  },
];

const TERM_CHECKLIST: ChecklistItem[] = [
  {
    id: 't-1',
    title: 'Comprehensive Sum Assured (15x - 20x Annual Expenses + Debts)',
    description: 'Calculate cover based on Human Life Value: replace living expenses, eliminate all debts (home loans), and fund future milestones.',
    mandatory: true,
  },
  {
    id: 't-2',
    title: 'Policy Duration Aligned to Retirement Age (Age 60-65)',
    description: 'Avoid paying 3x higher premiums for whole-life (till 85-99). Cover should last until your dependants are financially independent.',
    mandatory: true,
  },
  {
    id: 't-3',
    title: 'Affordable Regular Pay Structure',
    description: 'Opt for regular pay to keep yearly premiums modest and protect investment liquidity, rather than locking excessive money in limited pay.',
    mandatory: false,
  },
  {
    id: 't-4',
    title: '100% Honest Medical & Lifestyle Disclosures',
    description: 'Accurately report smoking/vaping status, alcohol consumption, past medical treatments, and family medical history on the proposal.',
    mandatory: true,
  },
  {
    id: 't-5',
    title: 'Disclosure of All Existing & Applied Life Policies',
    description: 'List every active life insurance policy across all insurers. Failure to disclose is a primary ground for claim contestation.',
    mandatory: true,
  },
  {
    id: 't-6',
    title: 'Waiver of Premium on Total & Permanent Disability Rider',
    description: 'Ensures that if an accident causes permanent disability, all future premiums are waived while life cover stays fully intact.',
    mandatory: false,
  },
  {
    id: 't-7',
    title: 'High Amount Settlement Ratio (ASR > 92%) & Claim Settlement (> 97%)',
    description: 'Verify that the insurer settles large-ticket claim sums reliably, not just high volumes of small micro-insurance policies.',
    mandatory: true,
  },
  {
    id: 't-8',
    title: 'Accurate Nominee Designation & MWP Act Consideration',
    description: 'Ensure correct legal name and relationship for nominee. Consider Married Women’s Property Act (MWPA) to protect payouts from creditors.',
    mandatory: true,
  },
];

export const InsuranceChecklists: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [healthExpanded, setHealthExpanded] = useState(true);
  const [termExpanded, setTermExpanded] = useState(true);

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const resetAll = () => {
    setCheckedItems({});
  };

  const handlePrint = () => {
    window.print();
  };

  const healthCheckedCount = HEALTH_CHECKLIST.filter(item => checkedItems[item.id]).length;
  const termCheckedCount = TERM_CHECKLIST.filter(item => checkedItems[item.id]).length;

  return (
    <section id="insurance-checklists" className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900/60 border-y border-slate-200/80 dark:border-slate-800">
      <div className="container px-4 md:px-6 mx-auto">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
          <Badge variant="outline" className="mb-3 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-cyan-400 border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/60">
            Interactive Due Diligence
          </Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Interactive Policy Pre-Purchase Checklists
          </h2>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Never sign an insurance application without auditing these essential criteria.
            Tick off each checkpoint as you review policy terms, or print the checklist for offline comparison.
          </p>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6 print:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium gap-1.5"
            >
              <Printer className="h-3.5 w-3.5 text-blue-600 dark:text-cyan-400" />
              <span>Print / Save Checklist</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetAll}
              className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white text-xs gap-1.5"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset Checks</span>
            </Button>
          </div>
        </div>

        {/* Checklists Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Health Insurance Checklist Panel */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden">
            <div className="p-6 md:p-7 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-blue-50/50 dark:bg-blue-950/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-cyan-400 flex items-center justify-center">
                  <Heart className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                    Health Insurance Checklist
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {healthCheckedCount} of {HEALTH_CHECKLIST.length} completed
                  </p>
                </div>
              </div>

              <button
                onClick={() => setHealthExpanded(!healthExpanded)}
                className="p-2 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-800 text-slate-500 transition-colors"
                aria-label={healthExpanded ? "Collapse health checklist" : "Expand health checklist"}
              >
                {healthExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
            </div>

            {/* Health Checklist Items */}
            {healthExpanded && (
              <div className="p-5 md:p-6 divide-y divide-slate-100 dark:divide-slate-800/80 space-y-4">
                {HEALTH_CHECKLIST.map(item => {
                  const isChecked = !!checkedItems[item.id];
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleCheck(item.id)}
                      className={cn(
                        "pt-4 first:pt-0 flex items-start gap-3 cursor-pointer group select-none transition-colors",
                        isChecked && "opacity-85"
                      )}
                    >
                      <button
                        type="button"
                        className="mt-0.5 text-blue-600 dark:text-cyan-400 focus:outline-none shrink-0"
                        aria-label={`Toggle check for ${item.title}`}
                      >
                        {isChecked ? (
                          <CheckSquare className="h-5 w-5 text-emerald-500" />
                        ) : (
                          <Square className="h-5 w-5 text-slate-400 group-hover:text-blue-500" />
                        )}
                      </button>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className={cn(
                            "text-sm font-semibold text-slate-900 dark:text-white transition-all",
                            isChecked && "line-through text-slate-500 dark:text-slate-400"
                          )}>
                            {item.title}
                          </p>
                          {item.mandatory && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300">
                              Crucial
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Term Insurance Checklist Panel */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden">
            <div className="p-6 md:p-7 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-indigo-50/50 dark:bg-indigo-950/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <Umbrella className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                    Term Life Insurance Checklist
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {termCheckedCount} of {TERM_CHECKLIST.length} completed
                  </p>
                </div>
              </div>

              <button
                onClick={() => setTermExpanded(!termExpanded)}
                className="p-2 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-800 text-slate-500 transition-colors"
                aria-label={termExpanded ? "Collapse term checklist" : "Expand term checklist"}
              >
                {termExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
            </div>

            {/* Term Checklist Items */}
            {termExpanded && (
              <div className="p-5 md:p-6 divide-y divide-slate-100 dark:divide-slate-800/80 space-y-4">
                {TERM_CHECKLIST.map(item => {
                  const isChecked = !!checkedItems[item.id];
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleCheck(item.id)}
                      className={cn(
                        "pt-4 first:pt-0 flex items-start gap-3 cursor-pointer group select-none transition-colors",
                        isChecked && "opacity-85"
                      )}
                    >
                      <button
                        type="button"
                        className="mt-0.5 text-indigo-600 dark:text-indigo-400 focus:outline-none shrink-0"
                        aria-label={`Toggle check for ${item.title}`}
                      >
                        {isChecked ? (
                          <CheckSquare className="h-5 w-5 text-emerald-500" />
                        ) : (
                          <Square className="h-5 w-5 text-slate-400 group-hover:text-indigo-500" />
                        )}
                      </button>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className={cn(
                            "text-sm font-semibold text-slate-900 dark:text-white transition-all",
                            isChecked && "line-through text-slate-500 dark:text-slate-400"
                          )}>
                            {item.title}
                          </p>
                          {item.mandatory && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300">
                              Crucial
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
