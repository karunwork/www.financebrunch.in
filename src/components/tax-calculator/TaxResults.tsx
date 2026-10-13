import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Download, Share2, Printer, ChevronDown, ChevronUp } from "lucide-react";
import { calculateTax, TaxBreakdown, compareTaxRegimes } from "./utils/taxCalculations";
import { TaxRegime, FinancialYear, DeductionsType } from "./utils/taxTypes";
import { TaxpayerType } from "./TaxpayerTypeSelector";
import { CountryCode, StateCode } from "./CountrySelector";
import { Button } from "@/components/ui/button";
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
    <Card className="w-full">
      <CardHeader className="pb-0">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
          <CardTitle>Tax Calculation Results</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-xs">
              <Printer className="h-3 w-3 mr-1" /> Print
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <Download className="h-3 w-3 mr-1" /> Download
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              <Share2 className="h-3 w-3 mr-1" /> Share
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
                    {taxpayerType === "nri" ? "Non-Resident Indian" :
                     taxpayerType === "startup" ? "Startup" :
                     taxpayerType === "llp" ? "Limited Liability Partnership" :
                     taxpayerType === "msme" ? "MSME" :
                     taxpayerType === "company" ? "Company" :
                     "Professional"}
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
  );
};

export default TaxResults;
