import React from 'react';
import { AlertCircle } from 'lucide-react';
import { FINANCIAL_CALCULATOR_DISCLAIMER } from '@/utils/sipCalculator';

export const CalculatorDisclaimer: React.FC = () => {
  return (
    <div className="mt-8 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-start gap-2.5 leading-relaxed">
      <AlertCircle className="w-4 h-4 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
      <p>{FINANCIAL_CALCULATOR_DISCLAIMER}</p>
    </div>
  );
};
