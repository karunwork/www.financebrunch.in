import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Download, Share2, Printer, ChevronDown, ChevronUp, FileText, Loader2, Info } from "lucide-react";
import { calculateTax, TaxBreakdown, compareTaxRegimes } from "./utils/taxCalculations";
import { TaxRegime, FinancialYear, DeductionsType } from "./utils/taxTypes";
import { TaxpayerType } from "./TaxpayerTypeSelector";
import { CountryCode, StateCode } from "./CountrySelector";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import {
  printTaxReport,
  downloadTaxReportPdf,
  downloadTaxReportDocx,
  shareTaxReport,
  getAssessmentYear,
  TaxReportData,
  TAX_CALCULATOR_DISCLAIMER_TEXT,
} from "./utils/taxReportGenerator";
import { TaxConsultationPopup } from "./TaxConsultationPopup";
import { formatCurrency as formatCurrencyValue } from "./utils/currencyUtils";

export interface TaxResultsProps {
  income: number;
  regime: TaxRegime;
  age: string;
  deductions: DeductionsType;
  financialYear: FinancialYear;
  taxpayerType: TaxpayerType;
  country: CountryCode;
  state?: StateCode;
}

const formatCurrency = (value: number, currencySymbol: string = "₹") => {
  return formatCurrencyValue(value, currencySymbol);
};

const TaxResults: React.FC<TaxResultsProps> = ({ 
  income, 
  regime, 
  age, 
  deductions, 
  financialYear,
  taxpayerType,
  country,
  state = "default"
}) => {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [taxResult, setTaxResult] = useState<TaxBreakdown | null>(null);
  const [calculationComplete, setCalculationComplete] = useState(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [consultationPopupOpen, setConsultationPopupOpen] = useState(false);
  const hasShownPopupRef = useRef(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Delayed consultation popup after remaining on results page for 60 seconds
  useEffect(() => {
    // Only start timer after a successful tax calculation when the results are displayed
    if (!taxResult || !calculationComplete) return;

    // Prevent duplicate popups within this calculation session
    if (hasShownPopupRef.current) return;

    const delayOverride = typeof window !== 'undefined'
      ? (window as Window & { __TAX_POPUP_DELAY_MS__?: number | string }).__TAX_POPUP_DELAY_MS__
      : undefined;
    const delayMs = delayOverride !== undefined
      ? Number(delayOverride)
      : 60000;

    const timer = setTimeout(() => {
      if (!hasShownPopupRef.current) {
        hasShownPopupRef.current = true;
        setConsultationPopupOpen(true);
      }
    }, delayMs);

    return () => {
      clearTimeout(timer);
    };
  }, [taxResult, calculationComplete]);

  const handleConnectTaxSpecialist = () => {
    setConsultationPopupOpen(false);
    navigate('/contact?service=Income+Tax+Filing');
  };

  const getReportData = (): TaxReportData => {
    return {
      income,
      regime,
      age,
      deductions,
      financialYear,
      assessmentYear: getAssessmentYear(financialYear),
      taxpayerType,
      country,
      state,
      taxResult: taxResult!,
      regimeComparison,
      generatedDateStr: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    };
  };

  const handlePrint = () => {
    if (!taxResult) return;
    try {
      const data = getReportData();
      printTaxReport(data);
      toast({
        title: "Print Preview Opened",
        description: "Tax report print dialog initiated. You can print or choose 'Save as PDF'.",
      });
    } catch (err) {
      console.error("Print error:", err);
      toast({
        title: "Print Failed",
        description: "Unable to generate print preview. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadPdf = async () => {
    if (!taxResult) return;
    setIsExporting(true);
    try {
      const data = getReportData();
      await downloadTaxReportPdf(data);
      toast({
        title: "PDF Downloaded",
        description: "Income Tax Calculation Report has been saved to your downloads.",
      });
    } catch (err) {
      console.error("PDF download error:", err);
      toast({
        title: "PDF Generation Failed",
        description: "An error occurred while creating the PDF report.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadDocx = async () => {
    if (!taxResult) return;
    setIsExporting(true);
    try {
      const data = getReportData();
      await downloadTaxReportDocx(data);
      toast({
        title: "Word Document Downloaded",
        description: "Income Tax Calculation Report has been saved as a .docx document.",
      });
    } catch (err) {
      console.error("DOCX download error:", err);
      toast({
        title: "Word Export Failed",
        description: "An error occurred while creating the Word document.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = async () => {
    if (!taxResult) return;
    try {
      const data = getReportData();
      const res = await shareTaxReport(data);
      if (res.method === 'clipboard') {
        toast({
          title: "Tax Summary Copied!",
          description: "Summary copied to clipboard. You can now paste and share it.",
        });
      } else if (res.shared) {
        toast({
          title: "Report Shared",
          description: "Tax calculation shared successfully.",
        });
      }
    } catch (err) {
      console.error("Share error:", err);
      toast({
        title: "Share Failed",
        description: "Unable to share tax summary.",
        variant: "destructive",
      });
    }
  };
  
  // Calculate tax on component mount and whenever key inputs change
  useEffect(() => {
    try {
      console.log("TaxResults: Calculating tax with params:", {
        income, regime, age, financialYear, taxpayerType, country, state
      });
      
      const result = calculateTax(
        income, 
        regime, 
        age, 
        financialYear, 
        deductions, 
        taxpayerType,
        country,
        state
      );
      
      console.log("TaxResults: Calculation completed:", result);
      setTaxResult(result);
      setCalculationComplete(true);
    } catch (error) {
      console.error("TaxResults: Error calculating tax:", error);
    }
  }, [income, regime, age, financialYear, JSON.stringify(deductions), taxpayerType, country, state]);
  
  // If calculation isn't complete or result is null, show loading state
  if (!calculationComplete || !taxResult) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Calculating Results...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-40 flex items-center justify-center">
            <div className="animate-pulse text-gray-500">
              Processing your tax calculation...
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const hasStateTax = taxResult.stateTax !== undefined && taxResult.stateTax > 0;
  
  // Get regime comparison results if applicable
  const regimeComparison = country === "india" && taxpayerType === "individual" ? 
    compareTaxRegimes(income, age, financialYear, deductions) : null;
  
  const pieChartData = [
    { name: 'Tax', value: taxResult.taxBeforeCess, color: '#3b82f6' },
  ];
  
  if (hasStateTax) {
    pieChartData.push({ name: 'State Tax', value: taxResult.stateTax || 0, color: '#6366f1' });
  }
  
  if (country === "india") {
    pieChartData.push({ name: 'Cess', value: taxResult.cessAmount, color: '#818cf8' });
  }
  
  // Ensure we have valid chart data
  const validPieChartData = pieChartData.filter(item => item.value > 0);
  
  const prepareSlabData = (taxSlabs: TaxBreakdown['taxSlabs']) => {
    if (!taxSlabs || taxSlabs.length === 0) {
      return [{ name: '0%', value: 0, tax: 0, color: '#3b82f6', rate: 0 }];
    }
    
    return taxSlabs.map((slab, index) => ({
      name: `${slab.rate}%`,
      value: slab.income,
      tax: slab.tax,
      color: `hsl(${210 + index * 20}, 80%, 60%)`,
      rate: slab.rate
    }));
  };
  
  const slabData = prepareSlabData(taxResult.taxSlabs);
  
  return (
    <div className="space-y-4">
      <Card className="w-full">
      <CardHeader className="pb-0">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
          <CardTitle>Tax Calculation Results</CardTitle>
          <div className="flex gap-2 items-center flex-wrap">
            <Button
              category="secondary"
              size="sm"
              className="text-xs"
              rightIcon={<Printer className="h-3 w-3" />}
              onClick={handlePrint}
              aria-label="Print Tax Calculation Report"
            >
              Print
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  category="primary"
                  size="sm"
                  className="text-xs"
                  disabled={isExporting}
                  rightIcon={
                    isExporting ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <ChevronDown className="h-3 w-3" />
                    )
                  }
                  aria-label="Download Tax Calculation Report"
                >
                  Download Report
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem
                  onClick={handleDownloadPdf}
                  className="cursor-pointer py-2 text-xs flex items-center"
                >
                  <FileText className="h-4 w-4 mr-2 text-rose-600" />
                  <div className="flex flex-col">
                    <span className="font-medium">Download as PDF</span>
                    <span className="text-[10px] text-muted-foreground">Printable document (.pdf)</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleDownloadDocx}
                  className="cursor-pointer py-2 text-xs flex items-center"
                >
                  <FileText className="h-4 w-4 mr-2 text-blue-600" />
                  <div className="flex flex-col">
                    <span className="font-medium">Download as Word (.docx)</span>
                    <span className="text-[10px] text-muted-foreground">Editable document (.docx)</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              category="calculator"
              size="sm"
              className="text-xs"
              rightIcon={<Share2 className="h-3 w-3" />}
              onClick={handleShare}
              aria-label="Share Tax Calculation Summary"
            >
              Share
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Tax Summary</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600 dark:text-gray-400">Gross Annual Income</span>
                <span className="font-medium">{formatCurrency(income, taxResult.currencySymbol)}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600 dark:text-gray-400">Taxable Income</span>
                <span className="font-medium">{formatCurrency(taxResult.taxableIncome, taxResult.currencySymbol)}</span>
              </div>
              
              {regimeComparison && (
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600 dark:text-gray-400">
                    Regime
                  </span>
                  <span className="font-medium">
                    {regime === "new" ? "New Tax Regime" : "Old Tax Regime"}
                  </span>
                </div>
              )}
              
              {taxpayerType !== "individual" && (
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600 dark:text-gray-400">
                    Taxpayer Type
                  </span>
                  <span className="font-medium">
                    {taxpayerType === "nri" ? "Non-Resident Indian (NRI)" :
                     taxpayerType === "startup" ? "Startup" :
                     "Professional/Freelancer"}
                  </span>
                </div>
              )}
              
              {country !== "india" && (
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600 dark:text-gray-400">
                    Location
                  </span>
                  <span className="font-medium">
                    {country.toUpperCase()}
                    {state !== "default" && ` - ${state.toUpperCase()}`}
                  </span>
                </div>
              )}
              
              {hasStateTax && (
                <>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600 dark:text-gray-400">Federal Tax</span>
                    <span className="font-medium">{formatCurrency(taxResult.federalTax || 0, taxResult.currencySymbol)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600 dark:text-gray-400">State/Provincial Tax</span>
                    <span className="font-medium">{formatCurrency(taxResult.stateTax || 0, taxResult.currencySymbol)}</span>
                  </div>
                </>
              )}
              
              {taxResult.rebate > 0 && (
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600 dark:text-gray-400">Rebate</span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    - {formatCurrency(taxResult.rebate, taxResult.currencySymbol)}
                  </span>
                </div>
              )}
              
              {taxResult.surcharge > 0 && (
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600 dark:text-gray-400">Surcharge</span>
                  <span className="font-medium">{formatCurrency(taxResult.surcharge, taxResult.currencySymbol)}</span>
                </div>
              )}
              
              {country === "india" && (
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600 dark:text-gray-400">Health & Education Cess (4%)</span>
                  <span className="font-medium">{formatCurrency(taxResult.cessAmount, taxResult.currencySymbol)}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center py-3 border-b-2 border-primary/70">
                <span className="font-semibold text-lg">Total Tax Liability</span>
                <span className="font-bold text-lg">
                  {formatCurrency(taxResult.totalTaxLiability, taxResult.currencySymbol)}
                </span>
              </div>
              
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600 dark:text-gray-400">Effective Tax Rate</span>
                <Badge variant="outline" className={
                  taxResult.effectiveTaxRate < 10 ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" :
                  taxResult.effectiveTaxRate < 20 ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" :
                  taxResult.effectiveTaxRate < 30 ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300" :
                  "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                }>
                  {taxResult.effectiveTaxRate.toFixed(2)}%
                </Badge>
              </div>
              
              {country === "india" && regimeComparison && (
                <div className="mt-6 p-4 rounded-md border bg-blue-50 dark:bg-blue-950/20">
                  <h4 className="font-medium mb-2">Tax Regime Comparison</h4>
                  <div className="flex justify-between mb-2">
                    <span>Old Regime Tax: {formatCurrency(regimeComparison.oldRegime.totalTaxLiability, taxResult.currencySymbol)}</span>
                    <span>New Regime Tax: {formatCurrency(regimeComparison.newRegime.totalTaxLiability, taxResult.currencySymbol)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Better option:</span>
                    <Badge className={regimeComparison.betterRegime === "new" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}>
                      {regimeComparison.betterRegime === "new" ? "New Regime" : "Old Regime"}
                    </Badge>
                    <span className="text-sm ml-1">
                      Saves {formatCurrency(regimeComparison.difference, taxResult.currencySymbol)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div>
            {taxResult.totalTaxLiability > 0 ? (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Tax Composition</h3>
                {validPieChartData.length > 0 ? (
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={validPieChartData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          innerRadius={40}
                          labelLine={true}
                          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                          dataKey="value"
                        >
                          {validPieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatCurrency(Number(value), taxResult.currencySymbol)} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-[200px] flex items-center justify-center">
                    <p className="text-gray-500">Not enough data to display chart</p>
                  </div>
                )}
                
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Tax Slab Breakdown</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setShowBreakdown(!showBreakdown)}
                      className="flex items-center text-sm"
                    >
                      {showBreakdown ? (
                        <>Hide Details <ChevronUp className="ml-1 h-4 w-4" /></>
                      ) : (
                        <>Show Details <ChevronDown className="ml-1 h-4 w-4" /></>
                      )}
                    </Button>
                  </div>
                  
                  {showBreakdown && (
                    <div className="space-y-4">
                      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-md p-3">
                        <div className="overflow-x-auto">
                          <table className="min-w-full text-sm">
                            <thead>
                              <tr className="border-b dark:border-gray-700">
                                <th className="text-left py-2 px-3">Income Slab</th>
                                <th className="text-right py-2 px-3">Rate</th>
                                <th className="text-right py-2 px-3">Amount</th>
                                <th className="text-right py-2 px-3">Tax</th>
                              </tr>
                            </thead>
                            <tbody>
                              {taxResult.taxSlabs.map((slab, index) => (
                                <tr key={index} className="border-b dark:border-gray-700">
                                  <td className="py-2 px-3">
                                    {slab.income > 0 ? formatCurrency(slab.income, taxResult.currencySymbol) : '0'}
                                  </td>
                                  <td className="text-right py-2 px-3">{slab.rate}%</td>
                                  <td className="text-right py-2 px-3">
                                    {formatCurrency(slab.income, taxResult.currencySymbol)}
                                  </td>
                                  <td className="text-right py-2 px-3">
                                    {formatCurrency(slab.tax, taxResult.currencySymbol)}
                                  </td>
                                </tr>
                              ))}
                              
                              {taxResult.rebate > 0 && (
                                <tr className="border-b dark:border-gray-700 bg-green-50 dark:bg-green-900/20">
                                  <td className="py-2 px-3 font-medium">Rebate</td>
                                  <td className="text-right py-2 px-3">-</td>
                                  <td className="text-right py-2 px-3">-</td>
                                  <td className="text-right py-2 px-3 text-green-600 dark:text-green-400">
                                    -{formatCurrency(taxResult.rebate, taxResult.currencySymbol)}
                                  </td>
                                </tr>
                              )}
                              
                              {taxResult.surcharge > 0 && (
                                <tr className="border-b dark:border-gray-700">
                                  <td className="py-2 px-3 font-medium">Surcharge</td>
                                  <td className="text-right py-2 px-3">-</td>
                                  <td className="text-right py-2 px-3">-</td>
                                  <td className="text-right py-2 px-3">
                                    {formatCurrency(taxResult.surcharge, taxResult.currencySymbol)}
                                  </td>
                                </tr>
                              )}
                              
                              {country === "india" && taxResult.cessAmount > 0 && (
                                <tr className="border-b dark:border-gray-700">
                                  <td className="py-2 px-3 font-medium">Health & Education Cess (4%)</td>
                                  <td className="text-right py-2 px-3">4%</td>
                                  <td className="text-right py-2 px-3">
                                    {formatCurrency(taxResult.taxBeforeCess, taxResult.currencySymbol)}
                                  </td>
                                  <td className="text-right py-2 px-3">
                                    {formatCurrency(taxResult.cessAmount, taxResult.currencySymbol)}
                                  </td>
                                </tr>
                              )}
                              
                              {hasStateTax && (
                                <tr className="border-b dark:border-gray-700 bg-blue-50 dark:bg-blue-900/20">
                                  <td className="py-2 px-3 font-medium">State/Provincial Tax</td>
                                  <td className="text-right py-2 px-3">Varies</td>
                                  <td className="text-right py-2 px-3">-</td>
                                  <td className="text-right py-2 px-3">
                                    {formatCurrency(taxResult.stateTax || 0, taxResult.currencySymbol)}
                                  </td>
                                </tr>
                              )}
                              
                              <tr className="font-semibold">
                                <td className="py-2 px-3">Total</td>
                                <td className="text-right py-2 px-3">-</td>
                                <td className="text-right py-2 px-3">-</td>
                                <td className="text-right py-2 px-3">
                                  {formatCurrency(taxResult.totalTaxLiability, taxResult.currencySymbol)}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      
                      {slabData.length > 0 && (
                        <div className="h-[250px] mt-6">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={slabData}>
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip 
                                formatter={(value, name) => [
                                  formatCurrency(Number(value), taxResult.currencySymbol), 
                                  name === "value" ? "Income" : "Tax"
                                ]} 
                              />
                              <Legend />
                              <Bar dataKey="value" name="Income" fill="#3b82f6" />
                              <Bar dataKey="tax" name="Tax" fill="#6366f1" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-6 text-center max-w-sm">
                  <Badge className="mb-4 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                    Tax-Free
                  </Badge>
                  <h3 className="text-xl font-semibold text-green-800 dark:text-green-300 mb-2">No Tax Liability</h3>
                  <p className="text-green-700 dark:text-green-400">
                    {taxResult.rebate > 0 ? 
                      `You qualify for a tax rebate under the ${regime === "new" ? "new" : "old"} tax regime.` : 
                      "Your income is within the tax-free limit."}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      </Card>

      {/* Permanent Disclaimer directly below Tax Calculation Results */}
      <div 
        id="tax-calculation-disclaimer" 
        className="flex items-start gap-2.5 p-3.5 sm:p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed"
      >
        <Info className="h-4 w-4 text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5" />
        <p>
          <strong className="text-slate-700 dark:text-slate-300 font-semibold">Disclaimer: </strong>{TAX_CALCULATOR_DISCLAIMER_TEXT}
        </p>
      </div>

      {/* Delayed consultation popup after remaining on results page for 60 seconds */}
      <TaxConsultationPopup 
        open={consultationPopupOpen}
        onOpenChange={setConsultationPopupOpen}
        onConnect={handleConnectTaxSpecialist}
      />
    </div>
  );
};

export default TaxResults;
