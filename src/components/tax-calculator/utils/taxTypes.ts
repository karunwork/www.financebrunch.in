
import { CountryCode, StateCode } from "../CountrySelector";
import { TaxpayerType } from "../TaxpayerTypeSelector";

export type TaxRegime = "old" | "new";
export type FinancialYear = "2024-2025" | "2025-2026";
export type DeductionsType = Record<string, number>;

export interface TaxSlab {
  min: number;
  max: number | null;
  rate: number;
}

export interface TaxBreakdown {
  taxableIncome: number;
  taxBeforeCess: number;
  cessAmount: number;
  totalTaxLiability: number;
  taxSlabs: Array<{
    income: number;
    rate: number;
    tax: number;
  }>;
  effectiveTaxRate: number;
  surcharge: number;
  rebate: number;
  stateTax?: number;
  federalTax?: number;
  currencySymbol: string;
}

// Add new types for international tax calculations
export interface TaxInput {
  countryId: string;
  income: number;
  deductions?: number;
  state?: string;
}

export interface TaxCalculationResult {
  totalTax: number;
  effectiveRate: number;
  taxBreakdown: Array<{
    description: string;
    amount: number;
  }>;
  netIncome: number;
  country: unknown;
  currency: string;
  currencySymbol: string;
  taxableIncome: number;
}
