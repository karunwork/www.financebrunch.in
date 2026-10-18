
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";
import { cn } from "@/lib/utils";
import TaxResults from "./TaxResults";
import TaxSavingTips from "./TaxSavingTips";
import { getCurrencySymbol } from "./utils/taxCalculations";
import CountrySelector, { CountryCode, StateCode } from "./CountrySelector";
import TaxpayerTypeSelector, { TaxpayerType } from "./TaxpayerTypeSelector";
import BasicDetailsForm from "./BasicDetailsForm";
import DeductionsForm from "./DeductionsForm";
import TaxFreeCountryInfo from "./TaxFreeCountryInfo";
import { TaxRegime, FinancialYear, DeductionsType } from "./utils/taxTypes";

const TaxCalculator: React.FC<{ className?: string }> = ({ className }) => {
  const [country, setCountry] = useState<CountryCode>("india");
  const [state, setState] = useState<StateCode>("default");
  const [taxpayerType, setTaxpayerType] = useState<TaxpayerType>("individual");
  const [income, setIncome] = useState<number>(0);
  const [age, setAge] = useState<string>("below60");
  const [regime, setRegime] = useState<TaxRegime>("new");
  const [financialYear, setFinancialYear] = useState<FinancialYear>("2024-2025");
  const [showResults, setShowResults] = useState<boolean>(false);
  const [showTips, setShowTips] = useState<boolean>(false);
  const [currencySymbol, setCurrencySymbol] = useState("₹");
  const [activeTab, setActiveTab] = useState<string>("basic-details");

  const [deductions, setDeductions] = useState<DeductionsType>({
    section80C: 0,
    section80D: 0,
    housingLoanInterest: 0,
    hra: 0,
    lta: 0,
    standardDeduction: 50000,
    nps: 0,
    section80E: 0,
    otherDeductions: 0,
  });
  const [calcSessionId, setCalcSessionId] = useState<number>(0);

  useEffect(() => {
    setCurrencySymbol(getCurrencySymbol(country));
  }, [country]);

  const handleCalculate = () => {
    console.log("Calculating tax for:", {
      income, 
      regime, 
      age, 
      financialYear, 
      taxpayerType,
      country, 
      state
    });
    
    // Increment calculation session ID to restart timer from zero on recalculate
    setCalcSessionId((prev) => prev + 1);

    // Always show results when calculation is triggered
    setShowResults(true);
    setShowTips(true);
    
    // Switch to results tab
    setActiveTab("results");
  };

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (raw === "") {
      setIncome(0);
      return;
    }
    const value = parseFloat(raw);
    if (isNaN(value)) return;
    setIncome(Math.max(0, Math.min(1000000000, value)));
  };

  const handleDeductionChange = (key: string, value: string) => {
    if (value === "") {
      setDeductions({ ...deductions, [key]: 0 });
      return;
    }
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return;
    setDeductions({
      ...deductions,
      [key]: Math.max(0, Math.min(1000000000, numValue))
    });
  };

  const handleCountryChange = (value: CountryCode) => {
    setCountry(value);
    
    // Reset to appropriate defaults for the selected country
    if (value !== "india") {
      setTaxpayerType("individual");
      setRegime("new"); // Most countries don't have a regime concept like India
    }
    
    // Reset state when country changes
    setState("default");
  };

  const handleStateChange = (value: StateCode) => {
    setState(value);
  };

  const handleTaxpayerTypeChange = (value: TaxpayerType) => {
    setTaxpayerType(value);
  };

  const goToDeductions = () => {
    setActiveTab("deductions");
  };

  const goToBasicDetails = () => {
    setActiveTab("basic-details");
  };

  // Auto-calculate on mount or when key values change
  useEffect(() => {
    if (income >= 0) {
      setShowResults(true);
      setShowTips(country === "india" && taxpayerType === "individual");
    }
  }, [income, regime, age, financialYear, taxpayerType, country, state]);

  // Force results to show after initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowResults(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className={cn("w-full border-t-4 border-t-blue-500", className)}>
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
        <div className="flex flex-row items-center gap-2">
          <Calculator className="h-6 w-6 text-blue-600" />
          <CardTitle>
            {country === "india" ? `Income Tax Calculator FY ${financialYear}` : `${country.toUpperCase()} Tax Calculator`}
          </CardTitle>
        </div>
        <CardDescription>
          Global tax calculation platform powered by our international team of tax experts
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="flex flex-col gap-4 mb-6">
          <CountrySelector 
            value={country} 
            onValueChange={handleCountryChange}
            stateValue={state}
            onStateValueChange={handleStateChange}
          />
          
          <TaxpayerTypeSelector 
            value={taxpayerType}
            onValueChange={handleTaxpayerTypeChange}
            countryCode={country}
          />
        </div>

        {country !== "uae" && country !== "qatar" ? (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger id="basic-details-tab" value="basic-details">Basic Details</TabsTrigger>
              <TabsTrigger id="deductions-tab" value="deductions" disabled={regime === "new" || taxpayerType !== "individual" || country !== "india"}>Deductions</TabsTrigger>
              <TabsTrigger id="results-tab" value="results">Results</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic-details" className="space-y-4">
              <BasicDetailsForm 
                country={country}
                taxpayerType={taxpayerType}
                financialYear={financialYear}
                setFinancialYear={setFinancialYear}
                regime={regime}
                setRegime={setRegime}
                age={age}
                setAge={setAge}
                income={income}
                handleIncomeChange={handleIncomeChange}
                handleCalculate={handleCalculate}
                setIncome={setIncome}
                goToDeductions={goToDeductions}
                currencySymbol={currencySymbol}
              />
            </TabsContent>
            
            <TabsContent value="deductions" className="space-y-4">
              <DeductionsForm 
                deductions={deductions}
                handleDeductionChange={handleDeductionChange}
                handleCalculate={handleCalculate}
                goToBasicDetails={goToBasicDetails}
              />
            </TabsContent>
            
            <TabsContent value="results" className="space-y-4">
              <TaxResults 
                key={`tax-results-${country}-${state}-${taxpayerType}-${income}-${regime}-${financialYear}-${calcSessionId}-${JSON.stringify(deductions)}`}
                income={income} 
                regime={regime} 
                age={age} 
                deductions={deductions} 
                financialYear={financialYear}
                taxpayerType={taxpayerType}
                country={country}
                state={state}
              />
              
              {showTips && country === "india" && taxpayerType === "individual" && (
                <TaxSavingTips 
                  income={income} 
                  deductions={deductions} 
                  regime={regime} 
                  taxpayerType={taxpayerType}
                />
              )}
            </TabsContent>
          </Tabs>
        ) : (
          <TaxFreeCountryInfo countryName={country === "uae" ? "United Arab Emirates" : "Qatar"} />
        )}
      </CardContent>
    </Card>
  );
};

export default TaxCalculator;
