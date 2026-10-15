/**
 * Finance Brunch - Mutual Fund Calculator Constants & Limits
 * Centralized configuration for all 4 calculators:
 * 1. SIP Calculator
 * 2. Step-Up SIP Calculator
 * 3. Lumpsum Calculator
 * 4. Systematic Withdrawal Plan (SWP) Calculator
 */

// Upper bound for currency inputs across all calculators: ₹100 Crore (₹1,00,00,00,000)
export const MAX_INVESTMENT_AMOUNT = 1000000000; // 100 Crore (1e9)
export const MAX_CALCULATION_SAFETY_LIMIT = 5000000000; // 500 Crore upper bound for extreme calculations

// SIP Calculator Limits
export const MIN_SIP_MONTHLY = 100;
export const MAX_SIP_MONTHLY = MAX_INVESTMENT_AMOUNT;
export const DEFAULT_SIP_MONTHLY = 5000;
export const SIP_QUICK_PRESETS = [500, 1000, 2500, 5000, 10000, 15000, 25000, 50000];

// Step-Up SIP Calculator Limits
export const MIN_STEPUP_MONTHLY = 100;
export const MAX_STEPUP_MONTHLY = MAX_INVESTMENT_AMOUNT;
export const DEFAULT_STEPUP_MONTHLY = 5000;
export const MIN_STEPUP_RATE = 1;
export const MAX_STEPUP_RATE = 50;
export const DEFAULT_STEPUP_RATE = 10;
export const STEPUP_QUICK_PRESETS = [500, 1000, 2500, 5000, 10000, 15000, 25000, 50000];

// Lumpsum Calculator Limits
export const MIN_LUMPSUM_AMOUNT = 1000;
export const MAX_LUMPSUM_AMOUNT = MAX_INVESTMENT_AMOUNT;
export const DEFAULT_LUMPSUM_AMOUNT = 100000;
export const LUMPSUM_QUICK_PRESETS = [10000, 25000, 50000, 100000, 250000, 500000, 1000000];

// SWP Calculator Limits
export const MIN_SWP_CORPUS = 10000;
export const MAX_SWP_CORPUS = MAX_INVESTMENT_AMOUNT;
export const DEFAULT_SWP_CORPUS = 1000000;
export const MIN_SWP_WITHDRAWAL = 500;
export const MAX_SWP_WITHDRAWAL = MAX_INVESTMENT_AMOUNT;
export const DEFAULT_SWP_WITHDRAWAL = 6000;

// Common Parameters
export const MIN_RETURN_RATE = 0;
export const MAX_RETURN_RATE = 35;
export const DEFAULT_RETURN_RATE = 12;

export const MIN_DURATION_YEARS = 1;
export const MAX_DURATION_YEARS = 40;
export const DEFAULT_DURATION_YEARS = 10;
