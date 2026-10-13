
import React, { useEffect } from 'react';
import { 
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface UnlistedSharesRiskPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: () => void;
  onReject: () => void;
}

export function UnlistedSharesRiskPopup({ 
  open, 
  onOpenChange, 
  onAccept, 
  onReject 
}: UnlistedSharesRiskPopupProps) {
  const isMobile = useIsMobile();
  
  // Only force the popup to stay open if it hasn't been accepted yet
  // This effect is causing issues with closing the dialog after clicking accept
  // We're modifying it to check for a specific case rather than blindly reopening
  useEffect(() => {
    // Don't try to reopen the dialog if it was deliberately closed via the accept button
    // Only force it open if it's closed by other means (like clicking outside)
    const shouldForceOpen = !open && !document.getElementById('risk-accepted-flag');
    if (shouldForceOpen) {
      onOpenChange(true);
    }
  }, [open, onOpenChange]);

  const handleAccept = () => {
    // Create a temporary flag to indicate the dialog was accepted
    const flag = document.createElement('div');
    flag.id = 'risk-accepted-flag';
    flag.style.display = 'none';
    document.body.appendChild(flag);
    
    // Call the accept callback first
    onAccept();
    
    // Then explicitly close the dialog
    onOpenChange(false);
    
    // Remove the flag after a short delay
    setTimeout(() => {
      document.getElementById('risk-accepted-flag')?.remove();
    }, 500);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className={`max-w-2xl ${isMobile ? 'h-[90vh]' : ''}`}>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center text-amber-700 dark:text-amber-500 text-xl">
            <AlertTriangle className="h-6 w-6 mr-2" />
            SEBI Risk Disclosure: Unlisted Shares
          </AlertDialogTitle>
          
          {/* Add AlertDialogDescription for accessibility */}
          <AlertDialogDescription className="sr-only">
            Important risk disclosure information for unlisted shares investments
          </AlertDialogDescription>
          
          <ScrollArea className={`${isMobile ? 'h-[60vh]' : 'max-h-[60vh]'} overflow-y-auto pr-4`}>
            <div className="space-y-4 text-base">
              <p className="font-medium">
                Before proceeding, please carefully read and acknowledge the following risk disclosures:
              </p>
              
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-4 space-y-3">
                <p>
                  1. <strong>Liquidity Risk:</strong> Unlisted shares have no established trading market, making it difficult to sell when needed.
                </p>
                
                <p>
                  2. <strong>Valuation Uncertainty:</strong> Without market-based price discovery, valuations may be subjective and potentially inflated.
                </p>
                
                <p>
                  3. <strong>Limited Disclosure:</strong> Unlisted companies are not subject to the same stringent disclosure requirements as listed companies.
                </p>
                
                <p>
                  4. <strong>Regulatory Protection:</strong> Investments in unlisted shares do not carry the same level of regulatory protection as listed securities.
                </p>
                
                <p>
                  5. <strong>Financial Risk:</strong> These investments should only be made with funds you can afford to lose entirely.
                </p>
              </div>
              
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <p className="font-medium mb-2">Financial Suitability:</p>
                <p>
                  Investment in unlisted shares is only suitable for investors who:
                </p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                  <li>Have high risk tolerance</li>
                  <li>Have substantial investment experience</li>
                  <li>Can sustain a complete loss of invested capital</li>
                  <li>Have conducted thorough independent research</li>
                  <li>Are investing only a small portion of their total portfolio</li>
                </ul>
              </div>
              
              <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="font-bold text-red-700 dark:text-red-400">
                  Disclaimer: Finance Brunch does not hold any responsibility for your investment decisions or potential losses. All investments are made at your own risk.
                </p>
              </div>
            </div>
          </ScrollArea>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-col sm:flex-row gap-3 mt-4">
          <AlertDialogCancel 
            onClick={onReject}
            className="flex items-center justify-center gap-2"
          >
            <XCircle className="h-4 w-4" />
            I'm not comfortable with these risks
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleAccept}
            className="bg-amber-600 hover:bg-amber-700 text-white flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="h-4 w-4" />
            I understand and accept the risks
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
