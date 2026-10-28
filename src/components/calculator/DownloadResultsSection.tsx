import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, FileDown, Loader2, Sparkles, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  downloadCalculatorPdf,
  downloadCalculatorDocx,
  CalculatorExportData,
} from '@/utils/calculatorExportGenerator';

interface DownloadResultsSectionProps {
  getData: () => CalculatorExportData;
  className?: string;
}

export const DownloadResultsSection: React.FC<DownloadResultsSectionProps> = ({
  getData,
  className = '',
}) => {
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [isExportingDocx, setIsExportingDocx] = useState(false);
  const { toast } = useToast();

  const handleDownloadPdf = async () => {
    setIsExportingPdf(true);
    try {
      const data = getData();
      await downloadCalculatorPdf(data);
      toast({
        title: 'PDF Report Downloaded',
        description: `${data.calculatorTitle} report saved as PDF with full growth schedule.`,
      });
    } catch (err) {
      console.error('PDF export error:', err);
      toast({
        title: 'PDF Generation Failed',
        description: 'Unable to build PDF report. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handleDownloadDocx = async () => {
    setIsExportingDocx(true);
    try {
      const data = getData();
      await downloadCalculatorDocx(data);
      toast({
        title: 'Word Document Downloaded',
        description: `${data.calculatorTitle} report saved as an editable .docx file.`,
      });
    } catch (err) {
      console.error('Word export error:', err);
      toast({
        title: 'Word Export Failed',
        description: 'Unable to build Word (.docx) document. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsExportingDocx(false);
    }
  };

  return (
    <Card className={`rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 shadow-sm overflow-hidden ${className}`}>
      <CardContent className="p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-cyan-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Export</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Download Calculation Results
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
              Export your personalized calculation inputs, projected wealth metrics, and complete year-by-year investment growth schedule formatted for printing or sharing.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full sm:w-auto shrink-0">
            <Button
              onClick={handleDownloadPdf}
              disabled={isExportingPdf || isExportingDocx}
              size="sm"
              category="primary"
              rightIcon={isExportingPdf ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
              className="flex-1 sm:flex-none font-semibold shadow-sm"
            >
              {isExportingPdf ? 'Generating PDF...' : 'Download PDF'}
            </Button>

            <Button
              onClick={handleDownloadDocx}
              disabled={isExportingPdf || isExportingDocx}
              variant="outline"
              size="sm"
              className="flex-1 sm:flex-none border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-semibold transition-all"
            >
              {isExportingDocx ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Word...
                </>
              ) : (
                <>
                  <FileDown className="w-4 h-4 mr-2 text-blue-600 dark:text-cyan-400" />
                  Download Word (.docx)
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
