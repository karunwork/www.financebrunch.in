
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertTriangle, Check, X } from 'lucide-react';

interface IndianStockRiskPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: () => void;
  onCancel?: () => void;
}

export function IndianStockRiskPopup({
  open,
  onOpenChange,
  onAccept,
  onCancel
}: IndianStockRiskPopupProps) {
  
  const handleAccept = () => {
    onAccept();
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    onOpenChange(false);
  };
  
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md border border-amber-200 dark:border-amber-800">
        <AlertDialogHeader>
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-500">
            <AlertTriangle className="h-5 w-5" />
            <AlertDialogTitle>Risk Acknowledgment Required</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="pt-4">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Before accessing the Indian Stock Market analysis information, please acknowledge and understand:
            </p>
            
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="bg-amber-100 dark:bg-amber-900/40 rounded-full p-0.5 text-amber-600 dark:text-amber-500 mt-0.5">
                  <AlertTriangle className="h-3.5 w-3.5" />
                </span>
                <span>Stock markets are subject to market risks.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-amber-100 dark:bg-amber-900/40 rounded-full p-0.5 text-amber-600 dark:text-amber-500 mt-0.5">
                  <AlertTriangle className="h-3.5 w-3.5" />
                </span>
                <span>Past performance is not indicative of future returns.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-amber-100 dark:bg-amber-900/40 rounded-full p-0.5 text-amber-600 dark:text-amber-500 mt-0.5">
                  <AlertTriangle className="h-3.5 w-3.5" />
                </span>
                <span>Investments can go down as well as up in value.</span>
              </li>
            </ul>
            
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              By clicking "Accept & Continue", you acknowledge that you have read and understood the above disclaimer.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="pt-2">
          <AlertDialogCancel className="border-amber-200 dark:border-amber-800 flex items-center gap-2" onClick={handleCancel}>
            <X className="h-4 w-4" />
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white flex items-center gap-2"
            onClick={handleAccept}
          >
            <Check className="h-4 w-4" />
            Accept & Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
