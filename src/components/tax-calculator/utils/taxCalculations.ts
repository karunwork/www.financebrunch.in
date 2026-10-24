
import { TaxRegime, FinancialYear, DeductionsType, TaxBreakdown } from "./taxTypes";
import { TaxpayerType } from "../TaxpayerTypeSelector";
import { CountryCode, StateCode } from "../CountrySelector";
import { getCurrencySymbol } from "./currencyUtils";
import { calculateIndianIncomeTax } from "./indianTaxCalculator";
import { calculateBusinessTax } from "./businessTaxCalculator";
import calculateInternationalTax from "./internationalTaxCalculator";

export { getCurrencySymbol };
export type { TaxBreakdown };

export interface RegimeComparisonResult {
  newRegime: TaxBreakdown;
  oldRegime: TaxBreakdown;
  difference: number;
  betterRegime: 'new' | 'old';
}

export const compareTaxRegimes = (
  income: number,
  age: string,
  financialYear: FinancialYear,
  deductions: DeductionsType
): RegimeComparisonResult => {
  const newRegimeTax = calculateIndianIncomeTax(income, "new", age, financialYear);
  const oldRegimeTax = calculateIndianIncomeTax(income, "old", age, financialYear, deductions);
  
  return {
    newRegime: newRegimeTax,
    oldRegime: oldRegimeTax,
    difference: Math.abs(newRegimeTax.totalTaxLiability - oldRegimeTax.totalTaxLiability),
    betterRegime: newRegimeTax.totalTaxLiability < oldRegimeTax.totalTaxLiability ? "new" : "old"
  };
};

export const calculateTax = (
  income: number,
  regime: TaxRegime,
  age: string,
  financialYear: FinancialYear,
  deductions: DeductionsType = {},
  taxpayerType: TaxpayerType = "individual",
  country: CountryCode = "india",
  state: StateCode = "default"
): TaxBreakdown => {
  console.log(`Starting tax calculation for ${country}, state: ${state}, income: ${income}`);
  
  try {
    let result: TaxBreakdown;
    
    if (country !== "india") {
      // Use the correctly imported international tax calculator
      const internationalResult = calculateInternationalTax({
        countryId: country,
        income,
        deductions: Object.values(deductions).reduce((sum, val) => sum + val, 0),
        state
      });
      
      // Convert the international result to match our TaxBreakdown interface
      result = {
        taxableIncome: internationalResult.taxableIncome,
        taxBeforeCess: internationalResult.totalTax,
        cessAmount: 0,
        totalTaxLiability: internationalResult.totalTax,
        taxSlabs: internationalResult.taxBreakdown.map(item => ({
          income: 0,
          rate: 0,
          tax: item.amount
        })),
        effectiveTaxRate: internationalResult.effectiveRate,
        surcharge: 0,
        rebate: 0,
        stateTax: 0,
        federalTax: 0,
        currencySymbol: internationalResult.currencySymbol
      };
    } else if (taxpayerType !== "individual") {
      result = calculateBusinessTax(income, taxpayerType, financialYear);
    } else {
      result = calculateIndianIncomeTax(income, regime, age, financialYear, deductions);
    }
    
    console.log(`Tax calculation completed successfully for ${country}, result:`, result);
    
    // Make sure we always have a valid tax slab even if empty
    if (!result.taxSlabs || result.taxSlabs.length === 0) {
      result.taxSlabs = [{ income: 0, rate: 0, tax: 0 }];
    }
    
    return result;
  } catch (error) {
    console.error("Error in tax calculation:", error);
    
    // Return a default error result with valid structure
    return {
      taxableIncome: income,
      taxBeforeCess: 0,
      cessAmount: 0,
      totalTaxLiability: 0,
      taxSlabs: [{ income: income || 0, rate: 0, tax: 0 }],
      effectiveTaxRate: 0,
      surcharge: 0,
      rebate: 0,
      stateTax: 0,
      federalTax: 0,
      currencySymbol: getCurrencySymbol(country)
    };
  }
};
