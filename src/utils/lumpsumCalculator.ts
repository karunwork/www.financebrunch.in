/**
 * Finance Brunch - Lumpsum Calculator Utility
 *
 * Implements deterministic client-side lumpsum compounding calculations:
 * FV = P * (1 + i)^n
 * Where:
 *   P = Initial lumpsum investment amount
 *   i = Effective monthly rate: (1 + expectedAnnualReturn / 100)^(1 / 12) - 1
 *   n = Total number of compounding months (durationYears * 12)
 *
 * Handles zero return: FV = P, returns = 0.
 */

import { formatINR, formatCompactINR } from './sipCalculator';

export interface LumpsumCalculatorInputs {
  initialInvestment: number;
  expectedAnnualReturn: number;
  investmentDurationYears: number;
}

export interface LumpsumYearlyBreakdownItem {
  year: number;
  invested: number;
  futureValue: number;
  estimatedReturns: number;
}

export interface LumpsumCalculationResult {
  initialInvestment: number;
  expectedAnnualReturn: number;
  investmentDurationYears: number;
  totalInvested: number;
  estimatedReturns: number;
  futureValue: number;
  yearlyBreakdown: LumpsumYearlyBreakdownItem[];
  isValid: boolean;
  validationError?: string;
}

export function calculateLumpsum(inputs: LumpsumCalculatorInputs): LumpsumCalculationResult {
  const {
    initialInvestment,
    expectedAnnualReturn,
    investmentDurationYears,
  } = inputs;

  if (
    typeof initialInvestment !== 'number' ||
    isNaN(initialInvestment) ||
    initialInvestment < 0 ||
    typeof expectedAnnualReturn !== 'number' ||
    isNaN(expectedAnnualReturn) ||
    expectedAnnualReturn < 0 ||
    typeof investmentDurationYears !== 'number' ||
    isNaN(investmentDurationYears) ||
    investmentDurationYears <= 0
  ) {
    return {
      initialInvestment: Math.max(0, Number(initialInvestment) || 0),
      expectedAnnualReturn: Math.max(0, Number(expectedAnnualReturn) || 0),
      investmentDurationYears: Math.max(0, Number(investmentDurationYears) || 0),
      totalInvested: Math.max(0, Number(initialInvestment) || 0),
      estimatedReturns: 0,
      futureValue: Math.max(0, Number(initialInvestment) || 0),
      yearlyBreakdown: [],
      isValid: false,
      validationError: 'Please provide valid non-negative numbers for all inputs.',
    };
  }

  const totalMonths = Math.round(investmentDurationYears * 12);
  const monthlyRate = expectedAnnualReturn === 0
    ? 0
    : Math.pow(1 + expectedAnnualReturn / 100, 1 / 12) - 1;

  const futureValue = monthlyRate === 0
    ? initialInvestment
    : initialInvestment * Math.pow(1 + monthlyRate, totalMonths);

  const totalInvested = initialInvestment;
  const estimatedReturns = Math.max(0, futureValue - totalInvested);

  const yearlyBreakdown: LumpsumYearlyBreakdownItem[] = [];
  for (let y = 1; y <= investmentDurationYears; y++) {
    const monthsAtYear = y * 12;
    const fvAtYear = monthlyRate === 0
      ? initialInvestment
      : initialInvestment * Math.pow(1 + monthlyRate, monthsAtYear);

    yearlyBreakdown.push({
      year: y,
      invested: initialInvestment,
      futureValue: Math.round(fvAtYear),
      estimatedReturns: Math.round(Math.max(0, fvAtYear - initialInvestment)),
    });
  }

  return {
    initialInvestment,
    expectedAnnualReturn,
    investmentDurationYears,
    totalInvested: Math.round(totalInvested),
    estimatedReturns: Math.round(estimatedReturns),
    futureValue: Math.round(futureValue),
    yearlyBreakdown,
    isValid: true,
  };
}

export { formatINR, formatCompactINR };
