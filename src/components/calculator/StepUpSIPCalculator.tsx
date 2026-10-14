import React, { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import {
  IndianRupee,
  TrendingUp,
  Calendar,
  Layers,
  PieChart as PieChartIcon,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Info,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from 'recharts';
import {
  calculateStepUpSIP,
  formatINR,
  formatCompactINR,
} from '@/utils/stepUpSipCalculator';
import { CalculatorCTAButtons } from './CalculatorCTAButtons';
import { CalculatorDisclaimer } from './CalculatorDisclaimer';

export default function StepUpSIPCalculator() {
  const [initialMonthly, setInitialMonthly] = useState<number>(5000);
  const [monthlyInputStr, setMonthlyInputStr] = useState<string>('5000');

  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [returnInputStr, setReturnInputStr] = useState<string>('12');

  const [investmentDuration, setInvestmentDuration] = useState<number>(10);
  const [durationInputStr, setDurationInputStr] = useState<string>('10');

  const [stepUpPercentage, setStepUpPercentage] = useState<number>(10);
  const [stepUpInputStr, setStepUpInputStr] = useState<string>('10');

  const [chartView, setChartView] = useState<'schedule' | 'growth'>('schedule');
  const [isScheduleOpen, setIsScheduleOpen] = useState<boolean>(false);

  const [errors, setErrors] = useState<{
    monthly?: string;
    returnRate?: string;
    duration?: string;
    stepUp?: string;
  }>({});

  const result = useMemo(() => {
    return calculateStepUpSIP({
      initialMonthlyInvestment: initialMonthly,
      expectedAnnualReturn: expectedReturn,
      investmentDurationYears: investmentDuration,
      annualStepUpPercentage: stepUpPercentage,
    });
  }, [initialMonthly, expectedReturn, investmentDuration, stepUpPercentage]);

  const handleMonthlyChange = (valStr: string) => {
    setMonthlyInputStr(valStr);
    const cleaned = valStr.replace(/[^0-9]/g, '');
    const num = Number(cleaned);

    if (valStr.trim() === '') {
      setErrors((prev) => ({ ...prev, monthly: 'Monthly investment is required.' }));
      setInitialMonthly(0);
    } else if (isNaN(num) || num < 100) {
      setErrors((prev) => ({ ...prev, monthly: 'Minimum recommended monthly SIP is ₹100.' }));
      setInitialMonthly(num > 0 ? num : 0);
    } else if (num > 5000000) {
      setErrors((prev) => ({ ...prev, monthly: 'Maximum monthly SIP supported is ₹50 Lakh.' }));
      setInitialMonthly(5000000);
    } else {
      setErrors((prev) => ({ ...prev, monthly: undefined }));
      setInitialMonthly(num);
    }
  };

  const handleReturnChange = (valStr: string) => {
    setReturnInputStr(valStr);
    const num = parseFloat(valStr);
    if (valStr.trim() === '' || isNaN(num)) {
      setErrors((prev) => ({ ...prev, returnRate: 'Return rate is required.' }));
      setExpectedReturn(0);
    } else if (num < 0 || num > 35) {
      setErrors((prev) => ({ ...prev, returnRate: 'Return rate must be between 0% and 35%.' }));
      setExpectedReturn(Math.min(35, Math.max(0, num)));
    } else {
      setErrors((prev) => ({ ...prev, returnRate: undefined }));
      setExpectedReturn(num);
    }
  };

  const handleDurationChange = (valStr: string) => {
    setDurationInputStr(valStr);
    const num = parseInt(valStr, 10);
    if (valStr.trim() === '' || isNaN(num)) {
      setErrors((prev) => ({ ...prev, duration: 'Duration is required.' }));
      setInvestmentDuration(1);
    } else if (num < 1 || num > 35) {
      setErrors((prev) => ({ ...prev, duration: 'Duration must be between 1 and 35 years.' }));
      setInvestmentDuration(Math.min(35, Math.max(1, num)));
    } else {
      setErrors((prev) => ({ ...prev, duration: undefined }));
      setInvestmentDuration(num);
    }
  };

  const handleStepUpChange = (valStr: string) => {
    setStepUpInputStr(valStr);
    const num = parseFloat(valStr);
    if (valStr.trim() === '' || isNaN(num)) {
      setErrors((prev) => ({ ...prev, stepUp: 'Step-up rate is required.' }));
      setStepUpPercentage(0);
    } else if (num < 0 || num > 50) {
      setErrors((prev) => ({ ...prev, stepUp: 'Annual step-up must be between 0% and 50%.' }));
      setStepUpPercentage(Math.min(50, Math.max(0, num)));
    } else {
      setErrors((prev) => ({ ...prev, stepUp: undefined }));
      setStepUpPercentage(num);
    }
  };

  const scheduleBarData = result.annualSchedule.map((item) => ({
    name: `Yr ${item.year}`,
    MonthlySIP: item.monthlyContribution,
    YearlyInvested: item.yearlyInvested,
  }));

  const growthAreaData = result.annualSchedule.map((item) => ({
    name: `Yr ${item.year}`,
    Invested: item.cumulativeInvested,
    TotalValue: item.futureValue,
  }));

  return (
    <div className="space-y-8">
      {/* 2-Column Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs Column (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
            <CardContent className="p-6 space-y-6">
              {/* Initial Monthly Investment */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="stepup-monthly" className="text-sm font-semibold flex items-center gap-1.5">
                    <IndianRupee size={15} className="text-cyan-600 dark:text-cyan-400" />
                    Starting Monthly SIP
                  </Label>
                  <div className="relative w-36">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 select-none">₹</span>
                    <Input
                      id="stepup-monthly"
                      type="text"
                      value={initialMonthly === 0 ? '' : initialMonthly.toLocaleString('en-IN')}
                      onChange={(e) => handleMonthlyChange(e.target.value)}
                      className="pl-6 text-right font-mono text-sm h-9 border-slate-200 dark:border-slate-700"
                    />
                  </div>
                </div>
                <Slider
                  value={[initialMonthly]}
                  min={100}
                  max={200000}
                  step={100}
                  onValueChange={(val) => {
                    setInitialMonthly(val[0]);
                    setMonthlyInputStr(val[0].toString());
                    setErrors((prev) => ({ ...prev, monthly: undefined }));
                  }}
                  className="py-1"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>₹100</span>
                  <span>₹1 Lakh</span>
                  <span>₹2 Lakh</span>
                </div>
                {errors.monthly && <p className="text-xs text-rose-500">{errors.monthly}</p>}
              </div>

              {/* Annual Step-Up Percentage */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="stepup-rate" className="text-sm font-semibold flex items-center gap-1.5">
                    <Layers size={15} className="text-cyan-600 dark:text-cyan-400" />
                    Annual Step-Up Rate
                  </Label>
                  <div className="relative w-28">
                    <Input
                      id="stepup-rate"
                      type="number"
                      step="1"
                      value={stepUpInputStr}
                      onChange={(e) => handleStepUpChange(e.target.value)}
                      className="pr-6 text-right font-mono text-sm h-9 border-slate-200 dark:border-slate-700"
                    />
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 select-none">%</span>
                  </div>
                </div>
                <Slider
                  value={[stepUpPercentage]}
                  min={1}
                  max={30}
                  step={1}
                  onValueChange={(val) => {
                    setStepUpPercentage(val[0]);
                    setStepUpInputStr(val[0].toString());
                    setErrors((prev) => ({ ...prev, stepUp: undefined }));
                  }}
                  className="py-1"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>1%</span>
                  <span>10% (Default)</span>
                  <span>30%</span>
                </div>
                {errors.stepUp && <p className="text-xs text-rose-500">{errors.stepUp}</p>}
              </div>

              {/* Expected Return */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="stepup-return" className="text-sm font-semibold flex items-center gap-1.5">
                    <TrendingUp size={15} className="text-cyan-600 dark:text-cyan-400" />
                    Expected Return Rate (p.a.)
                  </Label>
                  <div className="relative w-28">
                    <Input
                      id="stepup-return"
                      type="number"
                      step="0.5"
                      value={returnInputStr}
                      onChange={(e) => handleReturnChange(e.target.value)}
                      className="pr-6 text-right font-mono text-sm h-9 border-slate-200 dark:border-slate-700"
                    />
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 select-none">%</span>
                  </div>
                </div>
                <Slider
                  value={[expectedReturn]}
                  min={1}
                  max={30}
                  step={0.5}
                  onValueChange={(val) => {
                    setExpectedReturn(val[0]);
                    setReturnInputStr(val[0].toString());
                    setErrors((prev) => ({ ...prev, returnRate: undefined }));
                  }}
                  className="py-1"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>1%</span>
                  <span>15%</span>
                  <span>30%</span>
                </div>
                {errors.returnRate && <p className="text-xs text-rose-500">{errors.returnRate}</p>}
              </div>

              {/* Duration */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="stepup-duration" className="text-sm font-semibold flex items-center gap-1.5">
                    <Calendar size={15} className="text-cyan-600 dark:text-cyan-400" />
                    Investment Duration
                  </Label>
                  <div className="relative w-28">
                    <Input
                      id="stepup-duration"
                      type="number"
                      value={durationInputStr}
                      onChange={(e) => handleDurationChange(e.target.value)}
                      className="pr-8 text-right font-mono text-sm h-9 border-slate-200 dark:border-slate-700"
                    />
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 select-none">Yr</span>
                  </div>
                </div>
                <Slider
                  value={[investmentDuration]}
                  min={1}
                  max={35}
                  step={1}
                  onValueChange={(val) => {
                    setInvestmentDuration(val[0]);
                    setDurationInputStr(val[0].toString());
                    setErrors((prev) => ({ ...prev, duration: undefined }));
                  }}
                  className="py-1"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>1 Year</span>
                  <span>15 Years</span>
                  <span>35 Years</span>
                </div>
                {errors.duration && <p className="text-xs text-rose-500">{errors.duration}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Fixed SIP Comparison Callout */}
          <Card className="border-blue-200/60 dark:border-blue-900/60 bg-blue-50/40 dark:bg-slate-900/40 p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 dark:text-cyan-300">
              <Sparkles size={14} className="text-cyan-500" />
              <span>Step-Up Advantage vs Fixed SIP</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              A regular fixed SIP of {formatINR(result.initialMonthlySIP)}/mo yields{' '}
              <strong className="text-slate-900 dark:text-white font-mono">{formatINR(result.fixedSipComparison.futureValue)}</strong>.
              Stepping up by {result.annualStepUpPercentage}% yearly adds an extra{' '}
              <strong className="text-emerald-600 dark:text-emerald-400 font-mono">+{formatINR(result.fixedSipComparison.differenceFV)}</strong> to your final wealth!
            </p>
          </Card>
        </div>

        {/* Right Results & Visualizations Column (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Key Metric Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <Card className="border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm p-3.5">
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block mb-1">
                Starting SIP
              </span>
              <p className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-mono">
                {formatINR(result.initialMonthlySIP)}
              </p>
              <span className="text-[10px] text-slate-400 block mt-0.5">Month 1</span>
            </Card>

            <Card className="border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm p-3.5">
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block mb-1">
                Final Monthly SIP
              </span>
              <p className="text-lg sm:text-xl font-bold text-cyan-600 dark:text-cyan-400 font-mono">
                {formatINR(result.finalMonthlySIP)}
              </p>
              <span className="text-[10px] text-slate-400 block mt-0.5">Year {result.investmentDurationYears}</span>
            </Card>

            <Card className="border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm p-3.5">
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block mb-1">
                Total Invested
              </span>
              <p className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-mono">
                {formatINR(result.totalInvested)}
              </p>
              <span className="text-[10px] text-slate-400 block mt-0.5">Cumulative</span>
            </Card>

            <Card className="border-cyan-500/30 dark:border-cyan-500/40 bg-gradient-to-br from-cyan-50/50 via-white to-blue-50/30 dark:from-slate-900 dark:to-cyan-950/30 shadow-sm p-3.5">
              <span className="text-[11px] font-semibold text-cyan-800 dark:text-cyan-300 block mb-1">
                Estimated FV
              </span>
              <p className="text-lg sm:text-xl font-extrabold text-blue-700 dark:text-cyan-300 font-mono">
                {formatINR(result.futureValue)}
              </p>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">
                +{formatINR(result.estimatedReturns)} return
              </span>
            </Card>
          </div>

          {/* Calculator Call-to-Action Buttons */}
          <CalculatorCTAButtons sourceCalculator="stepup" />

          {/* Visualization Section */}
          <Card className="border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                {chartView === 'schedule' ? 'Annual Step-Up SIP Progression' : 'Portfolio Compounding Growth'}
              </span>
              <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setChartView('schedule')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
                    chartView === 'schedule'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <BarChart3 size={13} />
                  SIP Schedule
                </button>
                <button
                  type="button"
                  onClick={() => setChartView('growth')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
                    chartView === 'growth'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <TrendingUp size={13} />
                  Growth Curve
                </button>
              </div>
            </div>

            <div className="p-6">
              {chartView === 'schedule' ? (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={scheduleBarData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                      <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                      <YAxis tickFormatter={(val) => formatCompactINR(val)} tick={{ fontSize: 11 }} />
                      <RechartsTooltip formatter={(val: number) => formatINR(val)} />
                      <Bar dataKey="MonthlySIP" name="Monthly Installment" fill="#06B6D4" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={growthAreaData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="stepUpGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#06B6D4" stopOpacity={0.4} />
                          <stop offset="100%" stopColor="#06B6D4" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                      <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                      <YAxis tickFormatter={(val) => formatCompactINR(val)} tick={{ fontSize: 11 }} />
                      <RechartsTooltip formatter={(val: number) => formatINR(val)} />
                      <Area type="monotone" dataKey="TotalValue" stroke="#06B6D4" strokeWidth={2.5} fill="url(#stepUpGrad)" name="Total Portfolio" />
                      <Area type="monotone" dataKey="Invested" stroke="#2563EB" strokeWidth={1.5} fill="transparent" strokeDasharray="4 4" name="Invested Capital" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Annual Contribution Schedule Table */}
      <div className="border border-slate-200/80 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900/60">
        <button
          type="button"
          onClick={() => setIsScheduleOpen(!isScheduleOpen)}
          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              Annual Step-Up Contribution & Growth Schedule
            </span>
            <span className="text-xs text-slate-500 font-mono">({result.annualSchedule.length} Years)</span>
          </div>
          {isScheduleOpen ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
        </button>

        {isScheduleOpen && (
          <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-800 overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                  <th className="py-2.5 font-semibold">Year</th>
                  <th className="py-2.5 font-semibold">Monthly SIP</th>
                  <th className="py-2.5 font-semibold">Yearly Invested</th>
                  <th className="py-2.5 font-semibold">Cumulative Invested</th>
                  <th className="py-2.5 font-semibold text-right">Future Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
                {result.annualSchedule.map((row) => (
                  <tr key={row.year} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                    <td className="py-2 font-medium text-slate-700 dark:text-slate-300">Year {row.year}</td>
                    <td className="py-2 text-cyan-600 dark:text-cyan-400 font-semibold">{formatINR(row.monthlyContribution)}</td>
                    <td className="py-2 text-slate-600 dark:text-slate-400">{formatINR(row.yearlyInvested)}</td>
                    <td className="py-2 text-slate-600 dark:text-slate-400">{formatINR(row.cumulativeInvested)}</td>
                    <td className="py-2 text-right font-semibold text-slate-900 dark:text-white">{formatINR(row.futureValue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Assumptions Explanation */}
      <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-slate-900/40 border border-blue-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1">
        <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <Info size={14} className="text-cyan-500" />
          Calculation Assumptions
        </div>
        <p>
          The monthly contribution starts at {formatINR(initialMonthly)} and automatically increases by {stepUpPercentage}% after every 12 monthly installments. Compounding is calculated at an effective annual return of {expectedReturn}% on end-of-month contributions across {investmentDuration} years.
        </p>
      </div>

      {/* Required Financial Disclaimer */}
      <CalculatorDisclaimer />
    </div>
  );
}
