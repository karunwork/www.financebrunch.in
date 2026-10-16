import React, { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import {
  IndianRupee,
  TrendingUp,
  Calendar,
  ArrowDownRight,
  PieChart as PieChartIcon,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Info,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import {
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import {
  calculateSWP,
  formatINR,
  formatCompactINR,
  MAX_SWP_CORPUS,
  MIN_SWP_CORPUS,
  MAX_SWP_WITHDRAWAL,
  MIN_SWP_WITHDRAWAL,
  SWP_CORPUS_QUICK_PRESETS,
  SWP_WITHDRAWAL_QUICK_PRESETS,
} from '@/utils/swpCalculator';
import {
  valueToSliderPos,
  sliderPosToValue,
  SWP_CORPUS_SCALE,
  SWP_WITHDRAWAL_SCALE,
} from '@/utils/sliderScaleUtils';
import { CalculatorCTAButtons } from './CalculatorCTAButtons';
import { CalculatorDisclaimer } from './CalculatorDisclaimer';
import { VpfVsPpfComparison } from './VpfVsPpfComparison';
import { cn } from '@/lib/utils';

export default function SWPCalculator() {
  const [initialCorpus, setInitialCorpus] = useState<number>(1000000);
  const [corpusInputStr, setCorpusInputStr] = useState<string>('10,00,000');
  const [isCorpusFocused, setIsCorpusFocused] = useState<boolean>(false);

  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState<number>(6000);
  const [withdrawalInputStr, setWithdrawalInputStr] = useState<string>('6,000');
  const [isWithdrawalFocused, setIsWithdrawalFocused] = useState<boolean>(false);

  // Dual percentage entry state (% of initial corpus)
  const [withdrawalPercentage, setWithdrawalPercentage] = useState<number>(0.6);
  const [percentInputStr, setPercentInputStr] = useState<string>('0.6');
  const [isPercentFocused, setIsPercentFocused] = useState<boolean>(false);
  const [withdrawalMode, setWithdrawalMode] = useState<'rupee' | 'percent'>('rupee');

  const [expectedReturn, setExpectedReturn] = useState<number>(8);
  const [returnInputStr, setReturnInputStr] = useState<string>('8');

  const [withdrawalDuration, setWithdrawalDuration] = useState<number>(10);
  const [durationInputStr, setDurationInputStr] = useState<string>('10');

  const [isScheduleOpen, setIsScheduleOpen] = useState<boolean>(false);

  const [errors, setErrors] = useState<{
    corpus?: string;
    withdrawal?: string;
    returnRate?: string;
    duration?: string;
  }>({});

  const result = useMemo(() => {
    return calculateSWP({
      initialCorpus,
      monthlyWithdrawal,
      expectedAnnualReturn: expectedReturn,
      withdrawalDurationYears: withdrawalDuration,
    });
  }, [initialCorpus, monthlyWithdrawal, expectedReturn, withdrawalDuration]);

  const handleCorpusChange = (valStr: string) => {
    setCorpusInputStr(valStr);
    const cleaned = valStr.replace(/[^0-9]/g, '');
    const num = Number(cleaned);

    let effectiveCorpus = num;
    if (valStr.trim() === '') {
      setErrors((prev) => ({ ...prev, corpus: 'Initial corpus is required.' }));
      effectiveCorpus = 0;
      setInitialCorpus(0);
    } else if (isNaN(num) || num < 0) {
      setErrors((prev) => ({ ...prev, corpus: 'Please enter a valid positive number.' }));
      effectiveCorpus = 0;
      setInitialCorpus(0);
    } else if (num < MIN_SWP_CORPUS) {
      setErrors((prev) => ({ ...prev, corpus: `Minimum corpus is ₹${MIN_SWP_CORPUS.toLocaleString('en-IN')}.` }));
      setInitialCorpus(num > 0 ? num : 0);
    } else if (num > MAX_SWP_CORPUS) {
      setErrors((prev) => ({ ...prev, corpus: 'Maximum corpus supported is ₹100 Crore (₹1,00,00,00,000).' }));
      effectiveCorpus = MAX_SWP_CORPUS;
      setInitialCorpus(MAX_SWP_CORPUS);
    } else {
      setErrors((prev) => ({ ...prev, corpus: undefined }));
      setInitialCorpus(num);
    }

    // Synchronize withdrawal amount / percentage when corpus changes
    if (withdrawalMode === 'percent') {
      const newRupee = Math.round((effectiveCorpus * withdrawalPercentage) / 100);
      const clampedRupee = Math.min(MAX_SWP_WITHDRAWAL, Math.max(0, newRupee));
      setMonthlyWithdrawal(clampedRupee);
      setWithdrawalInputStr(clampedRupee > 0 ? clampedRupee.toLocaleString('en-IN') : '0');
    } else {
      const newPct = effectiveCorpus > 0 ? (monthlyWithdrawal / effectiveCorpus) * 100 : 0;
      setWithdrawalPercentage(newPct);
      setPercentInputStr(newPct > 0 ? (newPct < 0.1 ? newPct.toFixed(3) : newPct.toFixed(2)) : '0');
    }
  };

  const handleCorpusBlur = () => {
    setIsCorpusFocused(false);
    if (initialCorpus > MAX_SWP_CORPUS) {
      setInitialCorpus(MAX_SWP_CORPUS);
      setCorpusInputStr(MAX_SWP_CORPUS.toLocaleString('en-IN'));
      setErrors((prev) => ({ ...prev, corpus: undefined }));
    } else if (initialCorpus > 0) {
      setCorpusInputStr(initialCorpus.toLocaleString('en-IN'));
    }
  };

  const handleCorpusFocus = () => {
    setIsCorpusFocused(true);
    if (initialCorpus > 0) {
      setCorpusInputStr(initialCorpus.toString());
    }
  };

  const handleWithdrawalChange = (valStr: string) => {
    setWithdrawalMode('rupee');
    setWithdrawalInputStr(valStr);
    const cleaned = valStr.replace(/[^0-9]/g, '');
    const num = Number(cleaned);

    let effectiveRupee = num;
    if (valStr.trim() === '') {
      setErrors((prev) => ({ ...prev, withdrawal: 'Monthly withdrawal is required.' }));
      effectiveRupee = 0;
      setMonthlyWithdrawal(0);
    } else if (isNaN(num) || num < 0) {
      setErrors((prev) => ({ ...prev, withdrawal: 'Please enter a valid positive number.' }));
      effectiveRupee = 0;
      setMonthlyWithdrawal(0);
    } else if (num < MIN_SWP_WITHDRAWAL) {
      setErrors((prev) => ({ ...prev, withdrawal: `Minimum withdrawal is ₹${MIN_SWP_WITHDRAWAL.toLocaleString('en-IN')}.` }));
      setMonthlyWithdrawal(num > 0 ? num : 0);
    } else if (num > MAX_SWP_WITHDRAWAL) {
      setErrors((prev) => ({ ...prev, withdrawal: 'Maximum monthly withdrawal is ₹100 Crore (₹1,00,00,00,000).' }));
      effectiveRupee = MAX_SWP_WITHDRAWAL;
      setMonthlyWithdrawal(MAX_SWP_WITHDRAWAL);
    } else {
      setErrors((prev) => ({ ...prev, withdrawal: undefined }));
      setMonthlyWithdrawal(num);
    }

    const newPct = initialCorpus > 0 ? (effectiveRupee / initialCorpus) * 100 : 0;
    setWithdrawalPercentage(newPct);
    setPercentInputStr(newPct > 0 ? (newPct < 0.1 ? newPct.toFixed(3) : newPct.toFixed(2)) : '0');
  };

  const handleWithdrawalBlur = () => {
    setIsWithdrawalFocused(false);
    if (monthlyWithdrawal > MAX_SWP_WITHDRAWAL) {
      setMonthlyWithdrawal(MAX_SWP_WITHDRAWAL);
      setWithdrawalInputStr(MAX_SWP_WITHDRAWAL.toLocaleString('en-IN'));
      setErrors((prev) => ({ ...prev, withdrawal: undefined }));
    } else if (monthlyWithdrawal > 0) {
      setWithdrawalInputStr(monthlyWithdrawal.toLocaleString('en-IN'));
    }
  };

  const handleWithdrawalFocus = () => {
    setIsWithdrawalFocused(true);
    setWithdrawalMode('rupee');
    if (monthlyWithdrawal > 0) {
      setWithdrawalInputStr(monthlyWithdrawal.toString());
    }
  };

  const handlePercentageChange = (valStr: string) => {
    setWithdrawalMode('percent');
    setPercentInputStr(valStr);
    const num = parseFloat(valStr);

    if (valStr.trim() === '' || isNaN(num)) {
      setErrors((prev) => ({ ...prev, withdrawal: 'Withdrawal percentage is required.' }));
      setWithdrawalPercentage(0);
      setMonthlyWithdrawal(0);
      setWithdrawalInputStr('0');
    } else if (num < 0) {
      setErrors((prev) => ({ ...prev, withdrawal: 'Withdrawal percentage cannot be negative.' }));
      setWithdrawalPercentage(0);
      setMonthlyWithdrawal(0);
      setWithdrawalInputStr('0');
    } else if (num > 100) {
      setErrors((prev) => ({ ...prev, withdrawal: 'Withdrawal percentage cannot exceed 100% of initial corpus.' }));
      setWithdrawalPercentage(100);
      const calculatedRupee = Math.round((initialCorpus * 100) / 100);
      const effectiveRupee = Math.min(MAX_SWP_WITHDRAWAL, Math.max(0, calculatedRupee));
      setMonthlyWithdrawal(effectiveRupee);
      setWithdrawalInputStr(effectiveRupee.toLocaleString('en-IN'));
    } else {
      setErrors((prev) => ({ ...prev, withdrawal: undefined }));
      setWithdrawalPercentage(num);
      const calculatedRupee = Math.round((initialCorpus * num) / 100);
      const effectiveRupee = Math.min(MAX_SWP_WITHDRAWAL, Math.max(0, calculatedRupee));
      setMonthlyWithdrawal(effectiveRupee);
      setWithdrawalInputStr(effectiveRupee.toLocaleString('en-IN'));
    }
  };

  const handlePercentBlur = () => {
    setIsPercentFocused(false);
    if (withdrawalPercentage > 0) {
      setPercentInputStr(withdrawalPercentage < 0.1 ? withdrawalPercentage.toFixed(3) : withdrawalPercentage.toFixed(2));
    }
  };

  const handleReturnChange = (valStr: string) => {
    setReturnInputStr(valStr);
    const num = parseFloat(valStr);
    if (valStr.trim() === '' || isNaN(num)) {
      setErrors((prev) => ({ ...prev, returnRate: 'Return rate is required.' }));
      setExpectedReturn(0);
    } else if (num < 0 || num > 30) {
      setErrors((prev) => ({ ...prev, returnRate: 'Return rate must be between 0% and 30%.' }));
      setExpectedReturn(Math.min(30, Math.max(0, num)));
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
      setWithdrawalDuration(1);
    } else if (num < 1 || num > 35) {
      setErrors((prev) => ({ ...prev, duration: 'Duration must be between 1 and 35 years.' }));
      setWithdrawalDuration(Math.min(35, Math.max(1, num)));
    } else {
      setErrors((prev) => ({ ...prev, duration: undefined }));
      setWithdrawalDuration(num);
    }
  };

  const areaData = result.yearlySchedule.map((item) => ({
    name: `Yr ${item.year}`,
    Balance: item.closingBalance,
    CumulativeWithdrawals: item.cumulativeWithdrawals,
  }));

  return (
    <div className="space-y-8">
      {/* 2-Column Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs Column (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
            <CardContent className="p-6 space-y-6">
              {/* Total Corpus */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 min-w-0">
                  <Label htmlFor="swp-corpus" className="text-sm font-semibold flex items-center gap-1.5 shrink-0">
                    <IndianRupee size={15} className="text-cyan-600 dark:text-cyan-400" />
                    Total Investment Corpus
                  </Label>
                  <div className="relative min-w-[160px] sm:w-52 lg:w-56 max-w-full">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 select-none pointer-events-none">₹</span>
                    <Input
                      id="swp-corpus"
                      type="text"
                      value={corpusInputStr}
                      onChange={(e) => handleCorpusChange(e.target.value)}
                      onFocus={handleCorpusFocus}
                      onBlur={handleCorpusBlur}
                      className="pl-6 pr-3 text-right font-mono text-sm h-9 border-slate-200 dark:border-slate-700 w-full min-w-0"
                      style={{
                        fontSize: corpusInputStr.length > 13 ? '0.75rem' : corpusInputStr.length > 10 ? '0.8125rem' : '0.875rem',
                      }}
                      aria-label="Total Investment Corpus Amount in Rupees"
                    />
                    {initialCorpus >= 100000 && !isCorpusFocused && (
                      <span className="text-[11px] text-cyan-600 dark:text-cyan-400 font-semibold block text-right mt-0.5">
                        ({formatCompactINR(initialCorpus)})
                      </span>
                    )}
                  </div>
                </div>
                <Slider
                  value={[valueToSliderPos(initialCorpus, SWP_CORPUS_SCALE)]}
                  min={0}
                  max={100}
                  step={0.5}
                  onValueChange={(val) => {
                    const snapped = sliderPosToValue(val[0], SWP_CORPUS_SCALE);
                    setInitialCorpus(snapped);
                    setCorpusInputStr(snapped.toLocaleString('en-IN'));
                    setErrors((prev) => ({ ...prev, corpus: undefined }));

                    if (withdrawalMode === 'percent') {
                      const newRupee = Math.round((snapped * withdrawalPercentage) / 100);
                      const clampedRupee = Math.min(MAX_SWP_WITHDRAWAL, Math.max(0, newRupee));
                      setMonthlyWithdrawal(clampedRupee);
                      setWithdrawalInputStr(clampedRupee > 0 ? clampedRupee.toLocaleString('en-IN') : '0');
                    } else {
                      const newPct = snapped > 0 ? (monthlyWithdrawal / snapped) * 100 : 0;
                      setWithdrawalPercentage(newPct);
                      setPercentInputStr(newPct > 0 ? (newPct < 0.1 ? newPct.toFixed(3) : newPct.toFixed(2)) : '0');
                    }
                  }}
                  className="py-1 cursor-pointer"
                  aria-label="Total Investment Corpus Slider"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  {SWP_CORPUS_SCALE.labels.map((item, idx) => (
                    <span key={idx}>{item.label}</span>
                  ))}
                </div>

                {/* Quick preset buttons for Corpus */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {SWP_CORPUS_QUICK_PRESETS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => {
                        setInitialCorpus(preset);
                        setCorpusInputStr(preset.toLocaleString('en-IN'));
                        setErrors((prev) => ({ ...prev, corpus: undefined }));

                        if (withdrawalMode === 'percent') {
                          const newRupee = Math.round((preset * withdrawalPercentage) / 100);
                          const clampedRupee = Math.min(MAX_SWP_WITHDRAWAL, Math.max(0, newRupee));
                          setMonthlyWithdrawal(clampedRupee);
                          setWithdrawalInputStr(clampedRupee > 0 ? clampedRupee.toLocaleString('en-IN') : '0');
                        } else {
                          const newPct = preset > 0 ? (monthlyWithdrawal / preset) * 100 : 0;
                          setWithdrawalPercentage(newPct);
                          setPercentInputStr(newPct > 0 ? (newPct < 0.1 ? newPct.toFixed(3) : newPct.toFixed(2)) : '0');
                        }
                      }}
                      className={cn(
                        "px-2.5 py-1 text-xs rounded-lg font-medium transition-all duration-150 border",
                        initialCorpus === preset
                          ? "bg-cyan-600 text-white border-cyan-600 shadow-sm"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-400"
                      )}
                    >
                      {preset >= 100000 ? formatCompactINR(preset) : `₹${preset.toLocaleString('en-IN')}`}
                    </button>
                  ))}
                </div>
                {errors.corpus && <p className="text-xs text-rose-500">{errors.corpus}</p>}
              </div>

              {/* Monthly Withdrawal (Rupee & % of Initial Corpus Dual Entry) */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <Label htmlFor="swp-withdrawal" className="text-sm font-semibold flex items-center gap-1.5 shrink-0">
                    <ArrowDownRight size={15} className="text-cyan-600 dark:text-cyan-400" />
                    <span>Monthly Withdrawal</span>
                  </Label>
                  <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-xs font-medium border border-slate-200/80 dark:border-slate-700/60">
                    <button
                      type="button"
                      onClick={() => setWithdrawalMode('rupee')}
                      className={cn(
                        "px-2.5 py-1 rounded-md transition-all font-medium flex items-center gap-1",
                        withdrawalMode === 'rupee'
                          ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-cyan-300 shadow-xs"
                          : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                      )}
                    >
                      <span>₹ Rupee</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setWithdrawalMode('percent')}
                      className={cn(
                        "px-2.5 py-1 rounded-md transition-all font-medium flex items-center gap-1",
                        withdrawalMode === 'percent'
                          ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-cyan-300 shadow-xs"
                          : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                      )}
                    >
                      <span>% of Corpus</span>
                    </button>
                  </div>
                </div>

                {/* Side-by-Side Dual Editable Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Rupee Input */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center justify-between">
                      <span>Monthly Rupee Amount</span>
                      {withdrawalMode === 'rupee' && (
                        <span className="text-[10px] text-blue-600 dark:text-cyan-400 font-medium">Active</span>
                      )}
                    </span>
                    <div className="relative">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 select-none pointer-events-none">₹</span>
                      <Input
                        id="swp-withdrawal"
                        type="text"
                        value={withdrawalInputStr}
                        onChange={(e) => handleWithdrawalChange(e.target.value)}
                        onFocus={handleWithdrawalFocus}
                        onBlur={handleWithdrawalBlur}
                        className={cn(
                          "pl-6 pr-3 text-right font-mono text-sm h-9 border-slate-200 dark:border-slate-700 w-full min-w-0 transition-all",
                          withdrawalMode === 'rupee' && "ring-1 ring-blue-500/50 dark:ring-cyan-500/50"
                        )}
                        style={{
                          fontSize: withdrawalInputStr.length > 13 ? '0.75rem' : withdrawalInputStr.length > 10 ? '0.8125rem' : '0.875rem',
                        }}
                        aria-label="Monthly Withdrawal Amount in Rupees"
                      />
                    </div>
                    {monthlyWithdrawal >= 100000 && !isWithdrawalFocused && (
                      <span className="text-[11px] text-cyan-600 dark:text-cyan-400 font-semibold block text-right mt-0.5">
                        ({formatCompactINR(monthlyWithdrawal)})
                      </span>
                    )}
                  </div>

                  {/* Percentage Input */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center justify-between">
                      <span title="Monthly Withdrawal (% of Initial Corpus)">Monthly Withdrawal (% of Initial Corpus)</span>
                      {withdrawalMode === 'percent' && (
                        <span className="text-[10px] text-blue-600 dark:text-cyan-400 font-medium">Active</span>
                      )}
                    </span>
                    <div className="relative">
                      <Input
                        id="swp-withdrawal-pct"
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        value={percentInputStr}
                        onChange={(e) => handlePercentageChange(e.target.value)}
                        onFocus={() => { setIsPercentFocused(true); setWithdrawalMode('percent'); }}
                        onBlur={handlePercentBlur}
                        className={cn(
                          "pr-7 pl-3 text-right font-mono text-sm h-9 border-slate-200 dark:border-slate-700 w-full min-w-0 transition-all",
                          withdrawalMode === 'percent' && "ring-1 ring-blue-500/50 dark:ring-cyan-500/50"
                        )}
                        aria-label="Monthly Withdrawal (% of Initial Corpus)"
                      />
                      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 select-none pointer-events-none">%</span>
                    </div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block text-right truncate">
                      (= {formatINR(monthlyWithdrawal)}/mo)
                    </span>
                  </div>
                </div>

                {/* Educational clarification note */}
                <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/40 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                  <Info size={13} className="text-cyan-600 dark:text-cyan-400 shrink-0" />
                  <span>
                    Percentage is based on the initial corpus ({formatINR(initialCorpus)}), not the declining balance.
                  </span>
                </div>

                <Slider
                  value={[valueToSliderPos(monthlyWithdrawal, SWP_WITHDRAWAL_SCALE)]}
                  min={0}
                  max={100}
                  step={0.5}
                  onValueChange={(val) => {
                    const snapped = sliderPosToValue(val[0], SWP_WITHDRAWAL_SCALE);
                    setMonthlyWithdrawal(snapped);
                    setWithdrawalInputStr(snapped.toLocaleString('en-IN'));
                    setErrors((prev) => ({ ...prev, withdrawal: undefined }));

                    const newPct = initialCorpus > 0 ? (snapped / initialCorpus) * 100 : 0;
                    setWithdrawalPercentage(newPct);
                    setPercentInputStr(newPct > 0 ? (newPct < 0.1 ? newPct.toFixed(3) : newPct.toFixed(2)) : '0');
                  }}
                  className="py-1 cursor-pointer"
                  aria-label="Monthly Withdrawal Slider"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  {SWP_WITHDRAWAL_SCALE.labels.map((item, idx) => (
                    <span key={idx}>{item.label}</span>
                  ))}
                </div>

                {/* Quick preset buttons for Withdrawal */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {SWP_WITHDRAWAL_QUICK_PRESETS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => {
                        setMonthlyWithdrawal(preset);
                        setWithdrawalInputStr(preset.toLocaleString('en-IN'));
                        setErrors((prev) => ({ ...prev, withdrawal: undefined }));

                        const newPct = initialCorpus > 0 ? (preset / initialCorpus) * 100 : 0;
                        setWithdrawalPercentage(newPct);
                        setPercentInputStr(newPct > 0 ? (newPct < 0.1 ? newPct.toFixed(3) : newPct.toFixed(2)) : '0');
                      }}
                      className={cn(
                        "px-2.5 py-1 text-xs rounded-lg font-medium transition-all duration-150 border",
                        monthlyWithdrawal === preset
                          ? "bg-cyan-600 text-white border-cyan-600 shadow-sm"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-400"
                      )}
                    >
                      {preset >= 100000 ? formatCompactINR(preset) : `₹${preset.toLocaleString('en-IN')}`}
                    </button>
                  ))}
                </div>
                {errors.withdrawal && <p className="text-xs text-rose-500">{errors.withdrawal}</p>}
              </div>

              {/* Expected Return */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="swp-return" className="text-sm font-semibold flex items-center gap-1.5">
                    <TrendingUp size={15} className="text-cyan-600 dark:text-cyan-400" />
                    Expected Return Rate (p.a.)
                  </Label>
                  <div className="relative w-28">
                    <Input
                      id="swp-return"
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
                  max={20}
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
                  <span>10%</span>
                  <span>20%</span>
                </div>
                {errors.returnRate && <p className="text-xs text-rose-500">{errors.returnRate}</p>}
              </div>

              {/* Duration */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="swp-duration" className="text-sm font-semibold flex items-center gap-1.5">
                    <Calendar size={15} className="text-cyan-600 dark:text-cyan-400" />
                    Time Period
                  </Label>
                  <div className="relative w-28">
                    <Input
                      id="swp-duration"
                      type="number"
                      value={durationInputStr}
                      onChange={(e) => handleDurationChange(e.target.value)}
                      className="pr-8 text-right font-mono text-sm h-9 border-slate-200 dark:border-slate-700"
                    />
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 select-none">Yr</span>
                  </div>
                </div>
                <Slider
                  value={[withdrawalDuration]}
                  min={1}
                  max={35}
                  step={1}
                  onValueChange={(val) => {
                    setWithdrawalDuration(val[0]);
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

          {/* Sustainability Status Callout */}
          {result.isExhausted ? (
            <Card className="border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <p className="font-semibold text-amber-900 dark:text-amber-300">
                  Corpus Depleted Early (Year {result.exhaustionYear})
                </p>
                <p className="text-amber-700 dark:text-amber-400">
                  At ₹{monthlyWithdrawal.toLocaleString('en-IN')}/mo, the corpus is completely exhausted by month {result.exhaustionMonthNumber}. Consider reducing the monthly withdrawal or increasing return assumptions.
                </p>
              </div>
            </Card>
          ) : (
            <Card className="border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 p-4 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <p className="font-semibold text-emerald-900 dark:text-emerald-300">
                  Sustainable Withdrawal Schedule
                </p>
                <p className="text-emerald-700 dark:text-emerald-400">
                  Your corpus comfortably sustains all scheduled withdrawals for the entire {withdrawalDuration}-year period, leaving a remaining balance of {formatINR(result.remainingCorpus)}.
                </p>
              </div>
            </Card>
          )}
        </div>

        {/* Right Results & Visualizations Column (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Key Metric Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 min-w-0">
            <Card className="border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm p-3.5 min-w-0 overflow-hidden flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                  Initial Corpus
                </span>
                <p 
                  className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-mono tracking-tight break-words"
                  title={formatINR(result.initialCorpus)}
                >
                  {result.initialCorpus >= 10000000 
                    ? formatCompactINR(result.initialCorpus) 
                    : formatINR(result.initialCorpus)}
                </p>
                {result.initialCorpus >= 10000000 && (
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block truncate" title={formatINR(result.initialCorpus)}>
                    {formatINR(result.initialCorpus)}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-slate-400 block mt-1">Opening</span>
            </Card>

            <Card className="border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm p-3.5 min-w-0 overflow-hidden flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                  Total Withdrawn
                </span>
                <p 
                  className="text-lg sm:text-xl font-bold text-cyan-600 dark:text-cyan-400 font-mono tracking-tight break-words"
                  title={formatINR(result.totalActualWithdrawals)}
                >
                  {result.totalActualWithdrawals >= 10000000 
                    ? formatCompactINR(result.totalActualWithdrawals) 
                    : formatINR(result.totalActualWithdrawals)}
                </p>
                {result.totalActualWithdrawals >= 10000000 && (
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block truncate" title={formatINR(result.totalActualWithdrawals)}>
                    {formatINR(result.totalActualWithdrawals)}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-slate-400 block mt-1">Received cash flow</span>
            </Card>

            <Card className="border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm p-3.5 min-w-0 overflow-hidden flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                  Growth Earned
                </span>
                <p 
                  className="text-lg sm:text-xl font-bold text-emerald-600 dark:text-emerald-400 font-mono tracking-tight break-words"
                  title={formatINR(result.totalGrowthEarned)}
                >
                  {result.totalGrowthEarned >= 10000000 
                    ? formatCompactINR(result.totalGrowthEarned) 
                    : formatINR(result.totalGrowthEarned)}
                </p>
                {result.totalGrowthEarned >= 10000000 && (
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block truncate" title={formatINR(result.totalGrowthEarned)}>
                    +{formatINR(result.totalGrowthEarned)}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-slate-400 block mt-1">During tenure</span>
            </Card>

            <Card className="border-cyan-500/30 dark:border-cyan-500/40 bg-gradient-to-br from-cyan-50/50 via-white to-blue-50/30 dark:from-slate-900 dark:to-cyan-950/30 shadow-sm p-3.5 min-w-0 overflow-hidden flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-800 dark:text-cyan-300 block mb-1">
                  Remaining Corpus
                </span>
                <p 
                  className="text-lg sm:text-xl font-extrabold text-blue-700 dark:text-cyan-300 font-mono tracking-tight break-words"
                  title={formatINR(result.remainingCorpus)}
                >
                  {result.remainingCorpus >= 10000000 
                    ? formatCompactINR(result.remainingCorpus) 
                    : formatINR(result.remainingCorpus)}
                </p>
                {result.remainingCorpus >= 10000000 && (
                  <span className="text-[11px] font-mono text-slate-600 dark:text-slate-400 block truncate" title={formatINR(result.remainingCorpus)}>
                    {formatINR(result.remainingCorpus)}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-1">
                Closing balance
              </span>
            </Card>
          </div>

          {/* Action CTAs */}
          <CalculatorCTAButtons sourceCalculator="swp" />

          {/* Visualization Section */}
          <Card className="border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                Corpus Balance & Cumulative Withdrawals
              </span>
              <span className="text-xs font-mono text-slate-500">
                {withdrawalDuration} Years Projection
              </span>
            </div>

            <div className="p-6">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={areaData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="swpBalanceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#2563EB" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="#2563EB" stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="swpWithdrawalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#06B6D4" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="#06B6D4" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis tickFormatter={(val) => formatCompactINR(val)} tick={{ fontSize: 11 }} />
                    <RechartsTooltip formatter={(val: number) => formatINR(val)} />
                    <Area type="monotone" dataKey="Balance" stroke="#2563EB" strokeWidth={2.5} fill="url(#swpBalanceGrad)" name="Remaining Corpus" />
                    <Area type="monotone" dataKey="CumulativeWithdrawals" stroke="#06B6D4" strokeWidth={2} fill="url(#swpWithdrawalGrad)" name="Cumulative Cash Withdrawn" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Year-by-Year Withdrawal Schedule Table */}
      <div className="border border-slate-200/80 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900/60">
        <button
          type="button"
          onClick={() => setIsScheduleOpen(!isScheduleOpen)}
          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              Annual SWP Cash-Flow & Balance Schedule
            </span>
            <span className="text-xs text-slate-500 font-mono">({result.yearlySchedule.length} Years)</span>
          </div>
          {isScheduleOpen ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
        </button>

        {isScheduleOpen && (
          <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-800 overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                  <th className="py-2.5 font-semibold">Year</th>
                  <th className="py-2.5 font-semibold">Opening Balance</th>
                  <th className="py-2.5 font-semibold">Growth Earned</th>
                  <th className="py-2.5 font-semibold">Annual Withdrawn</th>
                  <th className="py-2.5 font-semibold text-right">Closing Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
                {result.yearlySchedule.map((row) => (
                  <tr key={row.year} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                    <td className="py-2 font-medium text-slate-700 dark:text-slate-300">Year {row.year}</td>
                    <td className="py-2 text-slate-600 dark:text-slate-400">{formatINR(row.openingBalance)}</td>
                    <td className="py-2 text-emerald-600 dark:text-emerald-400">+{formatINR(row.growthEarned)}</td>
                    <td className="py-2 text-cyan-600 dark:text-cyan-400">-{formatINR(row.annualWithdrawal)}</td>
                    <td className="py-2 text-right font-semibold text-slate-900 dark:text-white">
                      {row.closingBalance === 0 ? (
                        <span className="text-amber-600 dark:text-amber-400 font-sans font-medium text-[11px]">Exhausted</span>
                      ) : (
                        formatINR(row.closingBalance)
                      )}
                    </td>
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
          Each month, the remaining corpus earns interest at an effective monthly return rate equivalent to {expectedReturn}% per annum. The scheduled withdrawal of {formatINR(monthlyWithdrawal)} is then deducted at month-end. Withdrawals are capped at the remaining balance; once the corpus reaches zero, withdrawals cease.
        </p>
      </div>

      {/* Required Financial Disclaimer */}
      <CalculatorDisclaimer />

      {/* VPF vs PPF Educational Comparison Section */}
      <VpfVsPpfComparison calculatorId="swp" />
    </div>
  );
}
