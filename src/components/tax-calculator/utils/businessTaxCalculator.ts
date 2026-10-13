
import { businessTaxSlabs } from "./taxSlabs";
import { FinancialYear, TaxBreakdown } from "./taxTypes";
import { TaxpayerType } from "../TaxpayerTypeSelector";
import { getCurrencySymbol } from "./currencyUtils";

export const calculateBusinessTax = (
  income: number,
  taxpayerType: TaxpayerType,
  financialYear: FinancialYear
): TaxBreakdown => {
  const slabKey = `${taxpayerType}-${financialYear}`;
  const applicableSlabs = businessTaxSlabs[slabKey];
  
  let taxableIncome = income;
  
  if (taxpayerType === "professional") {
    if (income <= 5000000) {
      taxableIncome = income * 0.5;
    } else {
      taxableIncome = income * 0.7;
    }
  } else if (taxpayerType === "msme") {
    taxableIncome = income * 0.9;
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
  
  let surcharge = 0;
  if (taxpayerType === "company" || taxpayerType === "llp") {
    if (taxableIncome > 10000000) {
      surcharge = taxBeforeCess * 0.12;
    }
  } else {
    if (taxableIncome > 5000000 && taxableIncome <= 10000000) {
      surcharge = taxBeforeCess * 0.1;
    } else if (taxableIncome > 10000000) {
      surcharge = taxBeforeCess * 0.15;
    }
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
    rebate: 0,
    currencySymbol: "₹"
  };
};
