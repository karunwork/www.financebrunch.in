
import React from 'react';
import { Timer, Scale, Info, Shield, XCircle } from 'lucide-react';

export function UnlistedSharesRisks() {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-100 dark:border-red-800 shadow-md">
      <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-red-700 dark:text-red-400">
        <XCircle className="h-6 w-6" />
        Risks
      </h3>
      
      <ul className="space-y-3">
        <li className="flex gap-3">
          <Timer className="h-5 w-5 text-red-600 dark:text-red-500 flex-shrink-0 mt-1" />
          <span>
            <strong>Limited Liquidity:</strong> Difficult to sell shares quickly, often requiring months to find buyers
          </span>
        </li>
        
        <li className="flex gap-3">
          <Scale className="h-5 w-5 text-red-600 dark:text-red-500 flex-shrink-0 mt-1" />
          <span>
            <strong>Valuation Uncertainty:</strong> Challenging to determine fair value without market-based price discovery
          </span>
        </li>
        
        <li className="flex gap-3">
          <Info className="h-5 w-5 text-red-600 dark:text-red-500 flex-shrink-0 mt-1" />
          <span>
            <strong>Limited Information:</strong> Restricted access to financial data and company performance metrics
          </span>
        </li>
        
        <li className="flex gap-3">
          <Shield className="h-5 w-5 text-red-600 dark:text-red-500 flex-shrink-0 mt-1" />
          <span>
            <strong>Regulatory Gaps:</strong> Less oversight compared to listed securities, increasing potential for fraud
          </span>
        </li>
      </ul>
    </div>
  );
}
