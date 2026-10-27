import React, { useState, useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Calculator,
  BadgeDollarSign,
  Info,
  ShieldCheck,
  Phone,
  RotateCcw,
  Sparkles,
  ArrowRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';

interface InsuranceNeedsEstimatorProps {
  onWhatsApp: (service: 'Term Insurance', customMessage?: string) => void;
}

export const InsuranceNeedsEstimator: React.FC<InsuranceNeedsEstimatorProps> = ({ onWhatsApp }) => {
  const shouldReduceMotion = useReducedMotion();

  // Inputs
  const [annualExpenses, setAnnualExpenses] = useState<number>(600000); // 6 Lakhs
  const [replacementYears, setReplacementYears] = useState<number>(20); // 20 years
  const [outstandingLoans, setOutstandingLoans] = useState<number>(2500000); // 25 Lakhs
  const [futureGoals, setFutureGoals] = useState<number>(3000000); // 30 Lakhs
  const [existingCover, setExistingCover] = useState<number>(1000000); // 10 Lakhs
  const [availableAssets, setAvailableAssets] = useState<number>(1500000); // 15 Lakhs

  // Formatting helpers
  const formatINR = (val: number): string => {
    if (val >= 10000000) {
      const cr = val / 10000000;
      return `₹${cr.toFixed(2)} Cr`;
    }
    if (val >= 100000) {
      const lk = val / 100000;
      return `₹${lk.toFixed(2)} Lakh`;
    }
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Human Life Value Calculation (Needs Approach)
  const incomeReplacementTotal = annualExpenses * replacementYears;
  const totalFinancialLiabilities = incomeReplacementTotal + outstandingLoans + futureGoals;
  const totalExistingSafeguards = existingCover + availableAssets;
  const netTermCoverRequired = Math.max(0, totalFinancialLiabilities - totalExistingSafeguards);

  const resetEstimator = () => {
    setAnnualExpenses(600000);
    setReplacementYears(20);
    setOutstandingLoans(2500000);
    setFutureGoals(3000000);
    setExistingCover(1000000);
    setAvailableAssets(1500000);
  };

  const handleDiscussWithAdvisor = () => {
    const text = `Hi Finance Brunch Team, I calculated my indicative term insurance need on your planner. My estimated net cover requirement is ${formatINR(netTermCoverRequired)} (Annual expenses: ${formatINR(annualExpenses)}, Loans: ${formatINR(outstandingLoans)}, Future goals: ${formatINR(futureGoals)}). Could we connect to discuss suitable term options?`;
    onWhatsApp('Term Insurance', text);
  };

  return (
    <section id="insurance-estimator" className="py-16 md:py-24 bg-white dark:bg-slate-950 transition-colors">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <Badge variant="outline" className="mb-3 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-cyan-400 border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/60">
            Interactive Planning Tool
          </Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Term Insurance Needs Estimator
          </h2>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            How much life cover is enough? Use the established <strong>Needs-Based Human Life Value (HLV)</strong> method
            to calculate the exact capital your family would need to replace your income, retire all debts, and secure future milestones.
          </p>
        </div>

        {/* Estimator Card Container */}
        <div className="max-w-5xl mx-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/50 p-6 sm:p-8 md:p-10 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left 7 Cols: Interactive Input Controls */}
            <div className="lg:col-span-7 space-y-7">
              {/* Input 1: Annual Expenses */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="annual-expenses-slider" className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>Annual Family Living Expenses</span>
                  </label>
                  <span className="text-sm font-bold text-blue-600 dark:text-cyan-400">
                    {formatINR(annualExpenses)} / year
                  </span>
                </div>
                <Slider
                  id="annual-expenses-slider"
                  value={[annualExpenses]}
                  min={200000}
                  max={3000000}
                  step={50000}
                  onValueChange={val => setAnnualExpenses(val[0])}
                  className="py-2"
                  aria-label="Annual family living expenses"
                />
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Includes rent, groceries, school fees, utilities, and lifestyle spending.
                </p>
              </div>

              {/* Input 2: Replacement Years */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="replacement-years-slider" className="text-sm font-semibold text-slate-900 dark:text-white">
                    Years of Income Replacement
                  </label>
                  <span className="text-sm font-bold text-blue-600 dark:text-cyan-400">
                    {replacementYears} Years
                  </span>
                </div>
                <Slider
                  id="replacement-years-slider"
                  value={[replacementYears]}
                  min={10}
                  max={35}
                  step={1}
                  onValueChange={val => setReplacementYears(val[0])}
                  className="py-2"
                  aria-label="Years of income replacement"
                />
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Typically the number of years until your youngest child becomes financially independent or you reach retirement.
                </p>
              </div>

              {/* Input 3: Outstanding Debts */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="outstanding-loans-slider" className="text-sm font-semibold text-slate-900 dark:text-white">
                    Outstanding Loans & Liabilities
                  </label>
                  <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                    {formatINR(outstandingLoans)}
                  </span>
                </div>
                <Slider
                  id="outstanding-loans-slider"
                  value={[outstandingLoans]}
                  min={0}
                  max={15000000}
                  step={100000}
                  onValueChange={val => setOutstandingLoans(val[0])}
                  className="py-2"
                  aria-label="Outstanding loans and liabilities"
                />
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Home loans, personal loans, vehicle loans, and business guarantees that must be cleared.
                </p>
              </div>

              {/* Input 4: Future Goals */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="future-goals-slider" className="text-sm font-semibold text-slate-900 dark:text-white">
                    Future Dependant Goals
                  </label>
                  <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                    {formatINR(futureGoals)}
                  </span>
                </div>
                <Slider
                  id="future-goals-slider"
                  value={[futureGoals]}
                  min={0}
                  max={10000000}
                  step={100000}
                  onValueChange={val => setFutureGoals(val[0])}
                  className="py-2"
                  aria-label="Future dependant goals"
                />
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Children's higher education degrees, overseas tuition, and other earmarked milestones.
                </p>
              </div>

              {/* Input 5: Existing Safeguards (Cover & Assets) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200 dark:border-slate-800">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label htmlFor="existing-cover-slider" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Existing Life Cover
                    </label>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {formatINR(existingCover)}
                    </span>
                  </div>
                  <Slider
                    id="existing-cover-slider"
                    value={[existingCover]}
                    min={0}
                    max={10000000}
                    step={100000}
                    onValueChange={val => setExistingCover(val[0])}
                    aria-label="Existing life cover"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label htmlFor="available-assets-slider" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Liquid Investments
                    </label>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {formatINR(availableAssets)}
                    </span>
                  </div>
                  <Slider
                    id="available-assets-slider"
                    value={[availableAssets]}
                    min={0}
                    max={10000000}
                    step={100000}
                    onValueChange={val => setAvailableAssets(val[0])}
                    aria-label="Liquid investments"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetEstimator}
                  className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white gap-1"
                >
                  <RotateCcw className="h-3 w-3" />
                  Reset to Defaults
                </Button>
              </div>
            </div>

            {/* Right 5 Cols: Calculation Results Card */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-slate-900 to-blue-950 text-white border border-blue-500/30 shadow-xl relative overflow-hidden">
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                    Needs-Based Calculation
                  </span>
                  <p className="text-xs text-slate-400 mt-3 uppercase tracking-wider font-semibold">
                    Recommended Additional Life Cover
                  </p>
                  <motion.div
                    key={netTermCoverRequired}
                    initial={shouldReduceMotion ? false : { scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-white mt-1"
                  >
                    {formatINR(netTermCoverRequired)}
                  </motion.div>
                  <p className="text-xs text-slate-300 mt-1">
                    Sum assured needed to shield dependants from financial distress.
                  </p>
                </div>

                {/* Breakdown details */}
                <div className="space-y-2.5 pt-4 border-t border-slate-800 text-xs text-slate-300">
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Income Replacement ({replacementYears} yrs)</span>
                    <span className="font-semibold text-white">{formatINR(incomeReplacementTotal)}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Debt Liquidation</span>
                    <span className="font-semibold text-white">{formatINR(outstandingLoans)}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Dependant Milestones</span>
                    <span className="font-semibold text-white">{formatINR(futureGoals)}</span>
                  </div>
                  <div className="flex justify-between py-1 text-emerald-400 border-t border-slate-800/80 pt-2">
                    <span>Less: Existing Cover & Assets</span>
                    <span className="font-semibold">- {formatINR(totalExistingSafeguards)}</span>
                  </div>
                </div>

                {/* Educational Disclaimer */}
                <div className="p-3 rounded-xl bg-blue-900/30 border border-blue-400/20 text-[11px] text-slate-300 leading-relaxed flex items-start gap-2">
                  <Info className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Educational Estimate:</strong> This calculator provides an indicative projection using the Human Life Value framework.
                    Final underwriting approval, premium rates, and medical eligibility depend on the insurer's underwriting guidelines.
                  </span>
                </div>
              </div>

                <Button
                  size="lg"
                  category="insurance"
                  rightIcon={<Phone className="h-4 w-4" />}
                  onClick={handleDiscussWithAdvisor}
                  className="w-full font-bold rounded-xl shadow-lg text-sm"
                >
                  Discuss This Estimate with an Advisor
                </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
