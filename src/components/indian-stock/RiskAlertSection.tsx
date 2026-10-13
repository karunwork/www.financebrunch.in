
import { AlertTriangle } from 'lucide-react';

export function RiskAlertSection() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-gradient-to-r from-amber-50 to-amber-100 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-5 shadow-md flex items-start gap-3">
        <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-1 animate-pulse" />
        <div>
          <p className="text-amber-800 dark:text-amber-400 font-semibold text-lg">Risk Disclosure</p>
          <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
            Investments in securities market are subject to market risk. Read all the related documents carefully before investing. Past performance is not indicative of future returns.
          </p>
        </div>
      </div>
    </div>
  );
}
