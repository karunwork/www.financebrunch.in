
import { TaxSlab } from './taxTypes';
import { findCountryById } from './taxSlabs';

// Helper to get tax rate from a tax slab based on income
const getTaxRateFromSlabs = (income: number, slabs: any[]) => {
  for (let i = slabs.length - 1; i >= 0; i--) {
    if (income >= slabs[i].min) {
      return {
        rate: slabs[i].rate,
        baseAmount: slabs[i].baseAmount || 0,
        amountOver: slabs[i].min,
      };
    }
  }
  return { rate: 0, baseAmount: 0, amountOver: 0 };
};

// Define a more specific type for country objects
interface CountryTaxData {
  id: string;
  name: string;
  currency: string;
  currencySymbol: string;
  region: string;
  slabs?: TaxSlab[];
  taxSlabs?: {
    below60: TaxSlab[];
    "60to80": TaxSlab[];
    above80: TaxSlab[];
  };
  stateSlabs?: Record<string, any[]>;
  flatRate?: number;
  isTaxFree: boolean;
}

// Define interfaces for the calculation result and input
export interface TaxCalculationResult {
  totalTax: number;
  effectiveRate: number;
  taxBreakdown: Array<{
    description: string;
    amount: number;
  }>;
  netIncome: number;
  country: any;
  currency: string;
  currencySymbol: string;
  taxableIncome: number;
}

export interface TaxInput {
  countryId: string;
  income: number;
  deductions?: number;
  state?: string;
}

const calculateInternationalTax = (input: TaxInput): TaxCalculationResult => {
  const { countryId, income, deductions = 0 } = input;
  
  // Find country details
  const country = findCountryById(countryId) as CountryTaxData;
  
  if (!country) {
    throw new Error(`Country not found: ${countryId}`);
  }
  
  // Handle tax-free countries
  if (country.isTaxFree) {
    return {
      totalTax: 0,
      effectiveRate: 0,
      taxBreakdown: [],
      netIncome: income,
      country: country,
      currency: country.currency,
      currencySymbol: country.currencySymbol || '$',
      taxableIncome: income - deductions,
    };
  }

  // For countries with tax slabs
  const taxableIncome = Math.max(0, income - deductions);
  
  // Get tax slabs - accounting for different data structures
  let countrySlabs: TaxSlab[] = [];
  
  // Handle different tax slab formats across countries
  if ('slabs' in country && Array.isArray(country.slabs)) {
    // Direct slabs array
    countrySlabs = country.slabs;
  } else if ('taxSlabs' in country && country.taxSlabs) {
    // Nested tax slabs with age categories
    countrySlabs = country.taxSlabs.below60 || [];
  }
  
  if (!countrySlabs || countrySlabs.length === 0) {
    // Flat tax rate countries or fallback
    const taxRate = ('flatRate' in country && typeof country.flatRate === 'number') ? country.flatRate : 0;
    const totalTax = taxableIncome * taxRate;
    
    return {
      totalTax,
      effectiveRate: totalTax > 0 ? (totalTax / taxableIncome) * 100 : 0,
      taxBreakdown: [
        {
          description: `Flat tax rate (${(taxRate * 100).toFixed(2)}%)`,
          amount: totalTax
        }
      ],
      netIncome: income - totalTax,
      country: country,
      currency: country.currency,
      currencySymbol: country.currencySymbol || '$',
      taxableIncome,
    };
  }
  
  // Progressive tax calculation
  const { rate, baseAmount, amountOver } = getTaxRateFromSlabs(taxableIncome, countrySlabs);
  const marginTax = (taxableIncome - amountOver) * (rate / 100); // Convert rate to decimal
  const totalTax = baseAmount + marginTax;
  
  return {
    totalTax,
    effectiveRate: totalTax > 0 ? (totalTax / taxableIncome) * 100 : 0,
    taxBreakdown: [
      {
        description: `Base tax up to ${country.currencySymbol}${amountOver.toLocaleString()}`,
        amount: baseAmount
      },
      {
        description: `Tax on income over ${country.currencySymbol}${amountOver.toLocaleString()} at ${rate.toFixed(2)}%`,
        amount: marginTax
      }
    ],
    netIncome: income - totalTax,
    country: country,
    currency: country.currency,
    currencySymbol: country.currencySymbol || '$',
    taxableIncome,
  };
};

export default calculateInternationalTax;
