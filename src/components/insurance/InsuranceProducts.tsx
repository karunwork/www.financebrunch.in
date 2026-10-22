import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Heart,
  Umbrella,
  ShieldAlert,
  Building2,
  Clock,
  Ban,
  Percent,
  CheckCircle2,
  AlertTriangle,
  FileText,
  BadgeDollarSign,
  Receipt,
  Scale,
  Sparkles,
  ArrowRight,
  ChevronDown,
  Info,
  Layers,
  Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface InsuranceProductsProps {
  activeTab: 'health' | 'term';
  onTabChange: (tab: 'health' | 'term') => void;
  onWhatsApp: (service: 'Health Insurance' | 'Term Insurance') => void;
  onOpenEstimator?: () => void;
}

export const InsuranceProducts: React.FC<InsuranceProductsProps> = ({
  activeTab,
  onTabChange,
  onWhatsApp,
  onOpenEstimator,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [expandedPillar, setExpandedPillar] = useState<string | null>('room-rent');

  const togglePillar = (id: string) => {
    setExpandedPillar(prev => (prev === id ? null : id));
  };

  return (
    <section id="insurance-products" className="py-16 md:py-24 bg-white dark:bg-slate-950 transition-colors">
      <div className="container px-4 md:px-6 mx-auto">
        {/* Section Title & Subtitle */}
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
          <Badge variant="outline" className="mb-3 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/60">
            Product Deep-Dives
          </Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Master the Nuances of Core Protection
          </h2>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Insurance policies are contracts filled with critical conditions. We demystify what gets covered,
            what gets excluded, and how to evaluate plans beyond marketing brochures.
          </p>

          {/* Tab Selector Switcher */}
          <div className="inline-flex p-1.5 mt-8 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
            <button
              onClick={() => onTabChange('health')}
              className={cn(
                "flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm md:text-base transition-all duration-200",
                activeTab === 'health'
                  ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-cyan-400 shadow-md shadow-blue-500/10"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <Heart className="h-4 w-4" />
              <span>Health Insurance</span>
            </button>
            <button
              onClick={() => onTabChange('term')}
              className={cn(
                "flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm md:text-base transition-all duration-200",
                activeTab === 'term'
                  ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-md shadow-indigo-500/10"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <Umbrella className="h-4 w-4" />
              <span>Term Life Insurance</span>
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">
          {activeTab === 'health' ? (
            /* ──────────────── HEALTH INSURANCE SECTION ──────────────── */
            <motion.div
              key="health-tab"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12 max-w-6xl mx-auto"
            >
              {/* Product Overview Card */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-br from-blue-50/70 via-white to-cyan-50/40 dark:from-slate-900 dark:via-slate-900/90 dark:to-blue-950/40 p-6 sm:p-8 md:p-10 rounded-3xl border border-blue-100 dark:border-slate-800 shadow-sm">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
                    <ShieldAlert className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                    Essential Safeguard
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                    Health Insurance: What It Truly Covers & How It Works
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                    A comprehensive health policy guarantees that an unforeseen illness or accident does not wipe out your life savings.
                    Beyond standard inpatient hospital bills, modern policies cover daycare procedures, pre and post-hospitalization therapies,
                    organ donor expenses, and advanced treatments like robotic surgeries.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">Inpatient Care & ICU</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Doctor fees, nursing, surgery, and intensive care units.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">Pre & Post Hospitalization</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Medical tests 30-60 days before & medications up to 180 days after.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">Daycare Surgeries</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Treatments requiring less than 24 hours (cataract, chemo, dialysis).</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">AYUSH & Modern Tech</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Ayurvedic hospitalization and advanced robotic surgeries.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-white dark:bg-slate-800/80 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-md">
                  <h4 className="font-bold text-slate-900 dark:text-white text-base mb-3 flex items-center gap-2">
                    <Layers className="h-4 w-4 text-blue-500" />
                    Individual vs. Family Floater Coverage
                  </h4>
                  <div className="space-y-4 text-xs sm:text-sm">
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                      <p className="font-semibold text-blue-600 dark:text-blue-400 mb-1">Family Floater (Best for Young Families)</p>
                      <p className="text-slate-600 dark:text-slate-300">
                        A single shared sum insured (e.g. ₹25 Lakhs) covers self, spouse, and dependent children. Cost-effective because it is statistically rare for all members to need major hospitalization simultaneously.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                      <p className="font-semibold text-indigo-600 dark:text-indigo-400 mb-1">Individual Policy (Best for Senior Parents)</p>
                      <p className="text-slate-600 dark:text-slate-300">
                        Dedicated sum insured per individual. Never club senior parents (55+) into your family floater, as the premium is calculated based on the oldest member's age and claims will deplete the shared pool.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Critical Fine Print Decoded Accordion Grid */}
              <div>
                <div className="mb-6">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                    The 6 Fine-Print Clauses That Decide Your Claim Settlement
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Most claim disputes arise from these policy conditions. Here is what to inspect before buying.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {/* Item 1: Room Rent Capping */}
                  <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400/50 shadow-sm transition-all">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3.5">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1.5 flex items-center justify-between">
                      <span>Room Rent Limit & Proportionate Deduction</span>
                      <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      <strong>The Danger:</strong> If your policy caps room rent to 1% of sum insured (e.g. ₹5,000/day on ₹5L) and you pick a room costing ₹10,000/day, the insurer will apply a proportionate deduction across surgeon fees, nursing, and OT charges!
                    </p>
                    <div className="mt-3 inline-flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      ✓ Always choose: "No Room Rent Capping"
                    </div>
                  </div>

                  {/* Item 2: Waiting Periods */}
                  <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400/50 shadow-sm transition-all">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3.5">
                      <Clock className="h-5 w-5" />
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">
                      Waiting Periods
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      <strong>The Rule:</strong> 30-day initial moratorium (accidents covered from day 1). Specific diseases (hernia, cataract, joints) have 12-24 months wait. Pre-Existing Diseases (PED) require 24 to 36 months under IRDAI guidelines before coverage begins.
                    </p>
                    <div className="mt-3 inline-flex items-center text-xs font-semibold text-blue-600 dark:text-blue-400">
                      ✓ Look for: 24-month PED wait or reduction riders
                    </div>
                  </div>

                  {/* Item 3: Exclusions & Consumables */}
                  <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400/50 shadow-sm transition-all">
                    <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-3.5">
                      <Ban className="h-5 w-5" />
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">
                      Non-Medical Consumables
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      <strong>The Hidden Cost:</strong> Standard policies do not pay for PPE kits, syringes, gloves, cotton, and administrative charges. These items often make up 10% to 20% of an actual hospital invoice during surgeries or ICU stays.
                    </p>
                    <div className="mt-3 inline-flex items-center text-xs font-semibold text-rose-600 dark:text-rose-400">
                      ✓ Add-on: "Consumables Cover / Non-Medical Waiver"
                    </div>
                  </div>

                  {/* Item 4: Co-payments & Deductibles */}
                  <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400/50 shadow-sm transition-all">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3.5">
                      <Percent className="h-5 w-5" />
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">
                      Co-payment & Deductibles
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      <strong>Co-pay:</strong> You pay a fixed % (e.g. 10% or 20%) of the total bill. Common in senior citizen policies. 
                      <strong> Deductibles:</strong> You pay all expenses up to a threshold (e.g. ₹2L) before insurance kicks in (popular in Super Top-up plans).
                    </p>
                    <div className="mt-3 inline-flex items-center text-xs font-semibold text-purple-600 dark:text-purple-400">
                      ✓ Aim for: 0% Co-payment for members under 60
                    </div>
                  </div>

                  {/* Item 5: Sub-limits */}
                  <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400/50 shadow-sm transition-all">
                    <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-3.5">
                      <Scale className="h-5 w-5" />
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">
                      Disease-Specific Sub-limits
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      <strong>Watch Out:</strong> Some policies put monetary caps on treatments (e.g. Cataract capped at ₹40,000 per eye, Joint Replacement at ₹1,50,000). Even if your total cover is ₹20 Lakhs, the insurer pays only up to the sub-limit.
                    </p>
                    <div className="mt-3 inline-flex items-center text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                      ✓ Rule: Zero sub-limits on common procedures
                    </div>
                  </div>

                  {/* Item 6: Cashless vs Reimbursement */}
                  <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400/50 shadow-sm transition-all">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3.5">
                      <Receipt className="h-5 w-5" />
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">
                      Cashless vs. Reimbursement
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      <strong>Cashless:</strong> Pre-authorization at a network hospital means the insurer and hospital settle payments directly.
                      <strong> Reimbursement:</strong> Required at non-network hospitals where you pay upfront and submit original bills, discharge summary, and pharmacy slips.
                    </p>
                    <div className="mt-3 inline-flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      ✓ Check: Network hospitals near your home & workplace
                    </div>
                  </div>
                </div>
              </div>

              {/* How to Compare Premiums & Coverage */}
              <div className="p-6 md:p-8 rounded-2xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <h4 className="text-xl font-bold flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-cyan-400" />
                    The Cheapest Policy Is Often The Costliest When Hospitalized
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Policies with ultra-low premiums frequently hide 20% co-payments, 1% room rent limits, and restrictive hospital networks.
                    Finance Brunch helps you audit the genuine cost-to-benefit ratio before finalizing.
                  </p>
                </div>
                <Button
                  onClick={() => onWhatsApp('Health Insurance')}
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-6 rounded-xl shrink-0 gap-2 shadow-lg shadow-cyan-500/20"
                >
                  <Phone className="h-4 w-4" />
                  Discuss Health Options
                </Button>
              </div>
            </motion.div>
          ) : (
            /* ──────────────── TERM LIFE INSURANCE SECTION ──────────────── */
            <motion.div
              key="term-tab"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12 max-w-6xl mx-auto"
            >
              {/* Product Overview Card */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-br from-indigo-50/70 via-white to-blue-50/40 dark:from-slate-900 dark:via-slate-900/90 dark:to-indigo-950/40 p-6 sm:p-8 md:p-10 rounded-3xl border border-indigo-100 dark:border-slate-800 shadow-sm">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300">
                    <Umbrella className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                    Family Breadwinner Shield
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                    Term Life Insurance: Pure Protection for Dependants
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                    Unlike traditional endowment or money-back plans that offer meager returns and sub-par coverage,
                    pure term insurance focuses solely on high-value income replacement. If the unexpected happens,
                    your family receives a tax-free lump sum to pay off mortgages, maintain living standards, and achieve life milestones.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">Income Replacement</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Funds regular household expenses for 15-25 years.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">Debt Liquidation</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Clears home loans, car loans, and business liabilities.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">Children's Milestones</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Higher education corpus and career launch funds.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">Affordable Premiums</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">₹1 Crore cover starting at under ₹1,000/month for young adults.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-white dark:bg-slate-800/80 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-md">
                  <h4 className="font-bold text-slate-900 dark:text-white text-base mb-3 flex items-center gap-2">
                    <BadgeDollarSign className="h-4 w-4 text-indigo-500" />
                    How to Estimate an Appropriate Sum Assured
                  </h4>
                  <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    <p className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                      <strong>The Rule of Thumb:</strong> Aim for <strong>15x to 20x your annual income</strong> plus any outstanding liabilities (e.g. home loan) minus existing liquid savings.
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Example: If your family spends ₹6L/year and you have a ₹35L home loan with ₹10L savings:
                      <br />
                      Cover = (₹6L × 20) + ₹35L - ₹10L = <strong>₹1.45 Crore</strong>.
                    </p>
                    {onOpenEstimator && (
                      <Button
                        variant="outline"
                        onClick={onOpenEstimator}
                        className="w-full mt-2 border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 text-xs font-semibold"
                      >
                        Launch Interactive Needs Estimator →
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Key Factors When Comparing Term Plans */}
              <div>
                <div className="mb-6">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                    Key Factors to Evaluate When Comparing Term Plans
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Don’t pick an insurer solely based on celebrity advertising. Verify these structural metrics.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {/* Factor 1: CSR vs ASR */}
                  <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400/50 shadow-sm transition-all">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3.5">
                      <FileText className="h-5 w-5" />
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">
                      CSR & Amount Settlement Ratio
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      <strong>Claim Settlement Ratio (CSR):</strong> Percentage of claims settled out of total filed (aim for &gt;97%).
                      <strong> Amount Settlement Ratio (ASR):</strong> Value of rupees paid out vs total claims amount (aim for &gt;92%). A high CSR with a low ASR can indicate small claims get approved while big claims face scrutiny!
                    </p>
                  </div>

                  {/* Factor 2: Policy Duration & Whole Life Trap */}
                  <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400/50 shadow-sm transition-all">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3.5">
                      <Clock className="h-5 w-5" />
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">
                      Optimal Duration vs. Whole Life Trap
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      <strong>Target Retirement Age (60-65):</strong> Term insurance is meant to replace active income. By 60, kids are independent, loans are settled, and retirement assets exist.
                      Insuring till age 85 or 99 triples the premium cost for diminishing protection value.
                    </p>
                  </div>

                  {/* Factor 3: Payment Terms */}
                  <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400/50 shadow-sm transition-all">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3.5">
                      <Percent className="h-5 w-5" />
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">
                      Regular Pay vs. Limited Pay
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      <strong>Regular Pay:</strong> You pay premiums each year until policy expiry. This maintains maximum cash flow liquidity and accounts for inflation eroding real premium value.
                      <strong> Limited Pay:</strong> Pay in 5, 10, or 15 years. Higher upfront cost, only recommended if anticipating early career windfalls.
                    </p>
                  </div>

                  {/* Factor 4: Essential Riders */}
                  <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400/50 shadow-sm transition-all">
                    <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-3.5">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">
                      Critical Illness & Disability Riders
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      <strong>Waiver of Premium on Disability:</strong> Future premiums are waived if an accident causes permanent disability, keeping life cover active.
                      <strong> Critical Illness Rider:</strong> Provides a lump-sum upon diagnosis of major illnesses (cancer, heart attack) to replace lost income during recovery.
                    </p>
                  </div>

                  {/* Factor 5: Exclusions & Suicide Clause */}
                  <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400/50 shadow-sm transition-all">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3.5">
                      <Ban className="h-5 w-5" />
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">
                      Policy Exclusions
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Pure term insurance covers all natural and accidental deaths worldwide. Standard exclusions include suicide within the first 12 months, participation in criminal acts, unapproved adventure sports, and war casualties.
                    </p>
                  </div>

                  {/* Factor 6: Section 45 & Honest Disclosures */}
                  <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400/50 shadow-sm transition-all">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3.5">
                      <ShieldAlert className="h-5 w-5" />
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">
                      Section 45 & Disclosures
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      <strong>Top Cause of Rejection:</strong> Inadvertent or deliberate omission of smoking, tobacco, past surgeries, or existing policies.
                      Under Section 45 of the Insurance Act, after 3 continuous years, an insurer cannot reject a claim except on grounds of established fraud. Be 100% transparent on day one.
                    </p>
                  </div>
                </div>
              </div>

              {/* Consultation callout */}
              <div className="p-6 md:p-8 rounded-2xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <h4 className="text-xl font-bold flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-indigo-400" />
                    Protect Your Family Without Overpaying for Gimmicks
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Say no to Return-of-Premium (TROP) schemes that charge 2.5x higher premiums to return uninflated rupees 40 years later.
                    Finance Brunch guides you towards high-protection, cost-efficient pure term insurance.
                  </p>
                </div>
                <Button
                  onClick={() => onWhatsApp('Term Insurance')}
                  className="bg-indigo-500 hover:bg-indigo-400 text-white font-bold px-6 py-6 rounded-xl shrink-0 gap-2 shadow-lg shadow-indigo-500/20"
                >
                  <Phone className="h-4 w-4" />
                  Discuss Term Options
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
