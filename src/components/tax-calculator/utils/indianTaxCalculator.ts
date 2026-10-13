
import { DeductionsType, FinancialYear, TaxBreakdown, TaxRegime } from "./taxTypes";
import { taxSlabs } from "./taxSlabs";
import { getCurrencySymbol } from "./currencyUtils";

export const calculateIndianIncomeTax = (
  income: number,
  regime: TaxRegime,
  age: string,
  financialYear: FinancialYear,
  deductions: DeductionsType = {}
): TaxBreakdown => {
  const slabKey = `${regime}-${financialYear}`;
  const applicableSlabs = taxSlabs[slabKey][age];
  
  let taxableIncome = income;
  
  if (regime === "old") {
    const totalDeductions = Object.values(deductions).reduce((sum, value) => sum + value, 0);
    taxableIncome = Math.max(0, income - totalDeductions);
  } else {
    taxableIncome = Math.max(0, income - 50000);
  }
  
  let taxBeforeCess = 0;
  const taxSlabBreakdown: Array<{ income: number; rate: number; tax: number }> = [];
  
  for (let i = 0; i < applicableSlabs.length; i++) {
    const slab = applicableSlabs[i];
    let slabIncome = 0;
    
    if (taxableIncome > slab.min) {
      if (slab.max === null) {
        slabIncome = taxableIncome - slab.min;
      } else {
        slabIncome = Math.min(taxableIncome, slab.max) - slab.min;
      }
      
      const slabTax = (slabIncome * slab.rate) / 100;
      taxBeforeCess += slabTax;
      
      if (slabIncome > 0) {
        taxSlabBreakdown.push({
          income: slabIncome,
          rate: slab.rate,
          tax: slabTax
        });
      }
    }
  }
  
  let rebate = 0;
  let rebateLimit;
  
  if (financialYear === "2025-2026") {
    rebateLimit = regime === "new" ? 1275000 : 500000;
  } else {
    rebateLimit = regime === "new" ? 700000 : 500000;
  }
  
  if (taxableIncome <= rebateLimit) {
    rebate = taxBeforeCess;
    taxBeforeCess = 0;
  }
  
  let surcharge = 0;
  if (taxableIncome > 5000000 && taxableIncome <= 10000000) {
    surcharge = taxBeforeCess * 0.1;
  } else if (taxableIncome > 10000000) {
    surcharge = taxBeforeCess * 0.15;
  }
  
  taxBeforeCess += surcharge;
  
  const cessAmount = taxBeforeCess * 0.04;
  
  const totalTaxLiability = taxBeforeCess + cessAmount;
  
  const effectiveTaxRate = income > 0 ? (totalTaxLiability / income) * 100 : 0;
  
  return {
    taxableIncome,
    taxBeforeCess,
    cessAmount,
    totalTaxLiability,
    taxSlabs: taxSlabBreakdown,
    effectiveTaxRate,
    surcharge,
    rebate,
    currencySymbol: getCurrencySymbol("india")
  };
};
