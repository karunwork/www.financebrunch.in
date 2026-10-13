
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Calculator, DollarSign, Euro, IndianRupee, PoundSterling, Building2 } from "lucide-react";
import { TaxRegime, FinancialYear } from "./utils/taxTypes";
import { CountryCode, StateCode } from "./CountrySelector";
import { TaxpayerType } from "./TaxpayerTypeSelector";
import { Badge } from "@/components/ui/badge";

interface BasicDetailsFormProps {
  country: CountryCode;
  taxpayerType: TaxpayerType;
  financialYear: FinancialYear;
  setFinancialYear: (value: FinancialYear) => void;
  regime: TaxRegime;
  setRegime: (value: TaxRegime) => void;
  age: string;
  setAge: (value: string) => void;
  income: number;
  handleIncomeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCalculate: () => void;
  setIncome: (value: number) => void;
  goToDeductions: () => void;
  currencySymbol: string;
}

const BasicDetailsForm: React.FC<BasicDetailsFormProps> = ({
  country,
  taxpayerType,
  financialYear,
  setFinancialYear,
  regime,
  setRegime,
  age,
  setAge,
  income,
  handleIncomeChange,
  handleCalculate,
  setIncome,
  goToDeductions,
  currencySymbol
}) => {
  // Get the appropriate currency symbol based on country
  const getCurrencyIcon = () => {
    switch(country) {
      case "india":
        return <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />;
      case "uk":
        return <PoundSterling className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />;
      case "germany":
        return <Euro className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />;
      default:
        return <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-4">
      {country === "india" && (
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[250px]">
            <Label htmlFor="financial-year" className="mb-2 block">Financial Year</Label>
            <Select value={financialYear} onValueChange={(value: FinancialYear) => {
              setFinancialYear(value);
            }}>
              <SelectTrigger id="financial-year">
                <SelectValue placeholder="Select Financial Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024-2025">FY 2024-2025 (AY 2025-2026)</SelectItem>
                <SelectItem value="2025-2026">FY 2025-2026 (AY 2026-2027)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {taxpayerType === "individual" && (
            <div className="flex-1 min-w-[250px]">
              <Label htmlFor="tax-regime" className="mb-2 block">Tax Regime</Label>
              <Select value={regime} onValueChange={(value: TaxRegime) => {
                setRegime(value);
              }}>
                <SelectTrigger id="tax-regime">
                  <SelectValue placeholder="Select Tax Regime" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New Tax Regime (Default)</SelectItem>
                  <SelectItem value="old">Old Tax Regime</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      )}
      
      <div className="flex flex-wrap gap-4 mb-6">
        {taxpayerType === "individual" && country === "india" && (
          <div className="flex-1 min-w-[250px]">
            <Label htmlFor="age-category" className="mb-2 block">Age Category</Label>
            <Select value={age} onValueChange={(value) => {
              setAge(value);
            }}>
              <SelectTrigger id="age-category">
                <SelectValue placeholder="Select Age Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="below60">Below 60 years</SelectItem>
                <SelectItem value="60to80">60 - 80 years</SelectItem>
                <SelectItem value="above80">Above 80 years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        
        <div className="flex-1 min-w-[250px]">
          <Label htmlFor="income" className="mb-2 block">
            {taxpayerType === "individual" || taxpayerType === "nri" ? 
              `Annual Income (${currencySymbol})` : 
             taxpayerType === "professional" ? 
              `Professional Income (${currencySymbol})` : 
              `Business Income (${currencySymbol})`}
          </Label>
          <div className="relative">
            {getCurrencyIcon()}
            <Input
              id="income"
              type="number"
              min="0"
              placeholder={`Enter your ${taxpayerType === "individual" || taxpayerType === "nri" ? "annual" : "business"} income`}
              className="pl-10"
              value={income === 0 ? "" : income}
              onChange={handleIncomeChange}
            />
          </div>
        </div>
      </div>
      
      {taxpayerType !== "individual" && country === "india" && (
        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg mb-4">
          <p className="text-sm text-blue-800 dark:text-blue-300 flex items-center">
            <Building2 className="h-4 w-4 mr-2 flex-shrink-0" />
            {taxpayerType === "nri" ? "NRI taxation has specific rules based on your residential status and source of income." :
             taxpayerType === "startup" ? "Startups may qualify for tax benefits under Section 80IAC (Startup India)." :
             taxpayerType === "llp" ? "LLPs are taxed at a flat rate of 30% plus applicable surcharge and cess." :
             taxpayerType === "msme" ? "MSMEs can opt for presumptive taxation under Section 44AD (8% or 6% of turnover)." :
             taxpayerType === "company" ? "Companies can opt for regular taxation or Section 115BAA (22% flat rate)." :
             "Professionals can opt for presumptive taxation under Section 44ADA (50% of gross receipts up to ₹50 Lakhs)."}
          </p>
        </div>
      )}
      
      {country === "uae" || country === "qatar" ? (
        <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg mb-4 text-center">
          <Badge className="mb-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
            Tax-Free Country
          </Badge>
          <p className="text-sm text-green-800 dark:text-green-300">
            {country === "uae" ? "The UAE" : "Qatar"} is a tax-free country for individual income. There is no personal income tax.
          </p>
        </div>
      ) : regime === "new" && taxpayerType === "individual" && country === "india" ? (
        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg mb-4">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            The New Tax Regime offers simplified tax calculations with lower tax rates but without most deductions and exemptions.
          </p>
        </div>
      ) : taxpayerType === "individual" && country === "india" ? (
        <div className="bg-indigo-50 dark:bg-indigo-950/20 p-4 rounded-lg mb-4">
          <p className="text-sm text-indigo-800 dark:text-indigo-300">
            The Old Tax Regime allows various deductions and exemptions. Please provide details in the Deductions tab.
          </p>
        </div>
      ) : null}
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={() => setIncome(0)}>
          Reset
        </Button>
        
        {regime === "old" && taxpayerType === "individual" && country === "india" ? (
          <Button onClick={goToDeductions}>
            Next: Deductions <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleCalculate}>
            Calculate Tax <Calculator className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default BasicDetailsForm;
