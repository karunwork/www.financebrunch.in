import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { UserCheck, ArrowRight, ShieldCheck } from 'lucide-react';

interface TaxConsultationPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConnect: () => void;
}

export const TaxConsultationPopup: React.FC<TaxConsultationPopupProps> = ({
  open,
  onOpenChange,
  onConnect,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-md p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl"
        aria-describedby="tax-consultation-description"
      >
        <DialogHeader className="space-y-3 text-left">
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-cyan-950/60 border border-blue-100 dark:border-cyan-800/60 flex items-center justify-center text-blue-600 dark:text-cyan-400 mb-1">
            <UserCheck className="h-6 w-6" />
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Need Help Understanding Your Tax Results?
          </DialogTitle>
          <DialogDescription 
            id="tax-consultation-description" 
            className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed"
          >
            Connect with our tax specialists for personalized guidance, clarification of your calculation, and assistance with your tax-related queries.
          </DialogDescription>
        </DialogHeader>

        <div className="my-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 space-y-1">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
            <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Confidential & Certified Financial Advisory</span>
          </div>
          <p className="pl-6 text-slate-500 dark:text-slate-400">
            Get personalized assistance with tax regimes, deduction optimization, and planning for your financial year.
          </p>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2 pt-2 sm:space-x-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto order-2 sm:order-1 rounded-xl border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Maybe Later
          </Button>
          <Button
            type="button"
            onClick={onConnect}
            category="primary"
            rightIcon={<ArrowRight className="h-4 w-4" />}
            className="w-full sm:flex-1 order-1 sm:order-2 rounded-xl font-semibold shadow-md"
          >
            Connect with a Tax Specialist
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
