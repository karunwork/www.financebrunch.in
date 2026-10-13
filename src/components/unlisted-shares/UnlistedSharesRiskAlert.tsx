
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

export function UnlistedSharesRiskAlert() {
  return (
    <Alert variant="default" className="border-amber-400/50 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-500/30">
      <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500" />
      <AlertTitle className="text-amber-800 dark:text-amber-400">Risk Disclaimer</AlertTitle>
      <AlertDescription className="text-amber-700 dark:text-amber-300">
        <p className="mb-2">
          Unlisted shares carry significant risks including liquidity constraints, valuation uncertainties, and limited regulatory oversight. 
          They are suitable only for investors with thorough research, high risk tolerance, and adequate financial capacity.
        </p>
        <p>
          Finance Brunch does not hold any responsibility for your investment decisions or potential losses. All investments are made at your own risk after conducting due diligence.
        </p>
      </AlertDescription>
    </Alert>
  );
}
