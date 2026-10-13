import React, { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  IndianRupee,
  TrendingUp,
  Calendar,
  PieChart as PieChartIcon,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Info,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import {
  calculateLumpsum,
  formatINR,
  formatCompactINR,
} from '@/utils/lumpsumCalculator';
import { CalculatorDisclaimer } from './CalculatorDisclaimer';

export default function LumpsumCalculator() {
  const [initialInvestment, setInitialInvestment] = useState<number>(100000);
  const [investmentInputStr, setInvestmentInputStr] = useState<string>('100000');

  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [returnInputStr, setReturnInputStr] = useState<string>('12');

  const [investmentDuration, setInvestmentDuration] = useState<number>(10);
  const [durationInputStr, setDurationInputStr] = useState<string>('10');

  const [chartView, setChartView] = useState<'donut' | 'growth'>('donut');
  const [isScheduleOpen, setIsScheduleOpen] = useState<boolean>(false);

  const [errors, setErrors] = useState<{ investment?: string; returnRate?: string; duration?: string }>({});

  const result = useMemo(() => {
    return calculateLumpsum({
      initialInvestment,
      expectedAnnualReturn: expectedReturn,
      investmentDurationYears: investmentDuration,
    });
  }, [initialInvestment, expectedReturn, investmentDuration]);

  const handleInvestmentChange = (valStr: string) => {
    setInvestmentInputStr(valStr);
    const cleaned = valStr.replace(/[^0-9]/g, '');
    const num = Number(cleaned);

    if (valStr.trim() === '') {
      setErrors((prev) => ({ ...prev, investment: 'Investment amount is required.' }));
      setInitialInvestment(0);
    } else if (isNaN(num) || num < 1000) {
      setErrors((prev) => ({ ...prev, investment: 'Minimum lumpsum investment is ₹1,000.' }));
      setInitialInvestment(num > 0 ? num : 0);
    } else if (num > 50000000) {
      setErrors((prev) => ({ ...prev, investment: 'Maximum investment supported is ₹5 Crore.' }));
      setInitialInvestment(50000000);
    } else {
      setErrors((prev) => ({ ...prev, investment: undefined }));
      setInitialInvestment(num);
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
    } else if (num < 1 || num > 40) {
      setErrors((prev) => ({ ...prev, duration: 'Duration must be between 1 and 40 years.' }));
      setInvestmentDuration(Math.min(40, Math.max(1, num)));
    } else {
      setErrors((prev) => ({ ...prev, duration: undefined }));
      setInvestmentDuration(num);
    }
  };

  const pieData = [
    { name: 'Initial Investment', value: result.totalInvested },
    { name: 'Estimated Returns', value: result.estimatedReturns },
  ];
  const PIE_COLORS = ['#2563EB', '#06B6D4'];

  const areaData = result.yearlyBreakdown.map((item) => ({
    name: `Yr ${item.year}`,
    Invested: item.invested,
    Returns: item.estimatedReturns,
    Total: item.futureValue,
  }));

  return (
    <div className="space-y-8">
      {/* 2-Column Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs Column (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm">
            <CardContent className="p-6 space-y-6">
              {/* Initial Investment */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="lumpsum-amount" className="text-sm font-semibold flex items-center gap-1.5">
                    <IndianRupee size={15} className="text-cyan-600 dark:text-cyan-400" />
                    Total Investment
                  </Label>
                  <div className="relative w-36">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 select-none">₹</span>
                    <Input
                      id="lumpsum-amount"
                      type="text"
                      value={initialInvestment === 0 ? '' : initialInvestment.toLocaleString('en-IN')}
                      onChange={(e) => handleInvestmentChange(e.target.value)}
                      className="pl-6 text-right font-mono text-sm h-9 border-slate-200 dark:border-slate-700"
                    />
                  </div>
                </div>
                <Slider
                  value={[initialInvestment]}
                  min={1000}
                  max={5000000}
                  step={5000}
                  onValueChange={(val) => {
                    setInitialInvestment(val[0]);
                    setInvestmentInputStr(val[0].toString());
                    setErrors((prev) => ({ ...prev, investment: undefined }));
                  }}
                  className="py-1"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>₹1,000</span>
                  <span>₹25 Lakh</span>
                  <span>₹50 Lakh</span>
                </div>
                {errors.investment && <p className="text-xs text-rose-500">{errors.investment}</p>}
              </div>

              {/* Expected Return */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="lumpsum-return" className="text-sm font-semibold flex items-center gap-1.5">
                    <TrendingUp size={15} className="text-cyan-600 dark:text-cyan-400" />
                    Expected Return Rate (p.a.)
                  </Label>
                  <div className="relative w-28">
                    <Input
                      id="lumpsum-return"
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
                  <Label htmlFor="lumpsum-duration" className="text-sm font-semibold flex items-center gap-1.5">
                    <Calendar size={15} className="text-cyan-600 dark:text-cyan-400" />
                    Time Period
                  </Label>
                  <div className="relative w-28">
                    <Input
                      id="lumpsum-duration"
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
        </div>

        {/* Right Results & Visualizations Column (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Key Metric Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm p-4">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-1">
                Invested Amount
              </span>
              <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-mono">
                {formatINR(result.totalInvested)}
              </p>
              <span className="text-[11px] text-slate-400 mt-1 block">One-time capital</span>
            </Card>

            <Card className="border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm p-4">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-1">
                Estimated Returns
              </span>
              <p className="text-xl sm:text-2xl font-bold text-cyan-600 dark:text-cyan-400 font-mono">
                {formatINR(result.estimatedReturns)}
              </p>
              <span className="text-[11px] text-slate-400 mt-1 block">
                {result.totalInvested > 0
                  ? `+${((result.estimatedReturns / result.totalInvested) * 100).toFixed(0)}% total gain`
                  : '0%'}
              </span>
            </Card>

            <Card className="border-cyan-500/30 dark:border-cyan-500/40 bg-gradient-to-br from-cyan-50/50 via-white to-blue-50/30 dark:from-slate-900 dark:to-cyan-950/30 shadow-sm p-4">
              <span className="text-xs font-semibold text-cyan-800 dark:text-cyan-300 block mb-1">
                Total Future Value
              </span>
              <p className="text-xl sm:text-2xl font-extrabold text-blue-700 dark:text-cyan-300 font-mono">
                {formatINR(result.futureValue)}
              </p>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
                After {result.investmentDurationYears} years
              </span>
            </Card>
          </div>

          {/* Visualization Section */}
          <Card className="border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {chartView === 'donut' ? 'Asset Breakdown' : 'Compounding Growth Curve'}
                </span>
              </div>
              <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setChartView('donut')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
                    chartView === 'donut'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <PieChartIcon size={13} />
                  Breakdown
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
                  <BarChart3 size={13} />
                  Growth Curve
                </button>
              </div>
            </div>

            <div className="p-6">
              {chartView === 'donut' ? (
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                  <div className="sm:col-span-7 h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={80}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {pieData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={PIE_COLORS[index]} />
                          ))}
                        </Pie>
                        <RechartsTooltip formatter={(val: number) => formatINR(val)} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="sm:col-span-5 space-y-3 text-xs">
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-blue-600" />
                        <span className="text-slate-600 dark:text-slate-300">Invested Capital</span>
                      </div>
                      <span className="font-mono font-semibold text-slate-900 dark:text-white">
                        {result.futureValue > 0
                          ? `${((result.totalInvested / result.futureValue) * 100).toFixed(0)}%`
                          : '100%'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-cyan-500" />
                        <span className="text-slate-600 dark:text-slate-300">Estimated Returns</span>
                      </div>
                      <span className="font-mono font-semibold text-cyan-600 dark:text-cyan-400">
                        {result.futureValue > 0
                          ? `${((result.estimatedReturns / result.futureValue) * 100).toFixed(0)}%`
                          : '0%'}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-60">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={areaData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="lumpsumGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#06B6D4" stopOpacity={0.4} />
                          <stop offset="100%" stopColor="#06B6D4" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                      <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                      <YAxis tickFormatter={(val) => formatCompactINR(val)} tick={{ fontSize: 11 }} />
                      <RechartsTooltip formatter={(val: number) => formatINR(val)} />
                      <Area type="monotone" dataKey="Total" stroke="#06B6D4" strokeWidth={2.5} fill="url(#lumpsumGrad)" name="Total Value" />
                      <Area type="monotone" dataKey="Invested" stroke="#2563EB" strokeWidth={1.5} fill="transparent" strokeDasharray="4 4" name="Invested Capital" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Year-by-Year Compounding Projection Table */}
      <div className="border border-slate-200/80 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900/60">
        <button
          type="button"
          onClick={() => setIsScheduleOpen(!isScheduleOpen)}
          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              Yearly Compounding Breakdown
            </span>
            <span className="text-xs text-slate-500 font-mono">({result.yearlyBreakdown.length} Years)</span>
          </div>
          {isScheduleOpen ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
        </button>

        {isScheduleOpen && (
          <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-800 overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                  <th className="py-2.5 font-semibold">Year</th>
                  <th className="py-2.5 font-semibold">Invested Capital</th>
                  <th className="py-2.5 font-semibold">Estimated Returns</th>
                  <th className="py-2.5 font-semibold text-right">Future Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
                {result.yearlyBreakdown.map((row) => (
                  <tr key={row.year} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                    <td className="py-2 font-medium text-slate-700 dark:text-slate-300">Year {row.year}</td>
                    <td className="py-2 text-slate-600 dark:text-slate-400">{formatINR(row.invested)}</td>
                    <td className="py-2 text-cyan-600 dark:text-cyan-400">+{formatINR(row.estimatedReturns)}</td>
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
          Lumpsum compounding assumes the entire principal is invested upfront and grows at an effective annual return rate of {expectedReturn}% over {investmentDuration} years. Returns compound continuously across the period without intermittent withdrawals or taxes deducted.
        </p>
      </div>

      {/* Required Financial Disclaimer */}
      <CalculatorDisclaimer />
    </div>
  );
}
