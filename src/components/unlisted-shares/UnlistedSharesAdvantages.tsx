
import React from 'react';
import { TrendingUp, Building, BarChart3, Award, CheckCircle2 } from 'lucide-react';

export function UnlistedSharesAdvantages() {
  return (
    <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-100 dark:border-green-800 shadow-md">
      <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-green-700 dark:text-green-400">
        <CheckCircle2 className="h-6 w-6" />
        Advantages
      </h3>
      
      <ul className="space-y-3">
        <li className="flex gap-3">
          <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-500 flex-shrink-0 mt-1" />
          <span>
            <strong>High Growth Potential:</strong> Early stage investments in rapidly growing Indian companies before valuation increases
          </span>
        </li>
        
        <li className="flex gap-3">
          <Building className="h-5 w-5 text-green-600 dark:text-green-500 flex-shrink-0 mt-1" />
          <span>
            <strong>Portfolio Diversification:</strong> Access to sectors and business models not available in public markets
          </span>
        </li>
        
        <li className="flex gap-3">
          <BarChart3 className="h-5 w-5 text-green-600 dark:text-green-500 flex-shrink-0 mt-1" />
          <span>
            <strong>Lower Volatility:</strong> Less subject to market sentiment and short-term fluctuations
          </span>
        </li>
        
        <li className="flex gap-3">
          <Award className="h-5 w-5 text-green-600 dark:text-green-500 flex-shrink-0 mt-1" />
          <span>
            <strong>Exclusive Opportunities:</strong> Access to companies with strong fundamentals before public listing
          </span>
        </li>
      </ul>
    </div>
  );
}
