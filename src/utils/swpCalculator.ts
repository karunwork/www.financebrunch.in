/**
 * Finance Brunch - Systematic Withdrawal Plan (SWP) Calculator Utility
 *
 * Implements deterministic client-side SWP simulation:
 * 1. Start with initial corpus.
 * 2. Effective monthly rate: i = (1 + expectedAnnualReturn / 100)^(1 / 12) - 1.
 * 3. Each month:
 *    - Apply monthly return first: balanceBefore = balance * (1 + i).
 *    - Deduct scheduled withdrawal, capped at available balance:
 *      actualWithdrawal = Math.min(balanceBefore, monthlyWithdrawal).
 *    - Record actual withdrawal and closing balance: closing = balanceBefore - actualWithdrawal.
 *    - Stop counting once corpus is exhausted (closing === 0).
 * 4. Never allows balance to become negative.
 */

import { formatINR, formatCompactINR } from './sipCalculator';
import {
  MAX_INVESTMENT_AMOUNT,
  MAX_CALCULATION_SAFETY_LIMIT,
} from './calculatorConstants';
export {
  MAX_INVESTMENT_AMOUNT,
  MIN_SWP_CORPUS,
  MAX_SWP_CORPUS,
  DEFAULT_SWP_CORPUS,
  MIN_SWP_WITHDRAWAL,
  MAX_SWP_WITHDRAWAL,
  DEFAULT_SWP_WITHDRAWAL,
  SWP_CORPUS_QUICK_PRESETS,
  SWP_WITHDRAWAL_QUICK_PRESETS,
} from './calculatorConstants';

export interface SWPCalculatorInputs {
  initialCorpus: number;
  monthlyWithdrawal: number;
  expectedAnnualReturn: number;
  withdrawalDurationYears: number;
}

export interface SWPYearlyScheduleItem {
  year: number;
  openingBalance: number;
  growthEarned: number;
  annualWithdrawal: number;
  closingBalance: number;
  cumulativeWithdrawals: number;
}

export interface SWPCalculationResult {
  initialCorpus: number;
  scheduledMonthlyWithdrawal: number;
  expectedAnnualReturn: number;
  withdrawalDurationYears: number;
  totalActualWithdrawals: number;
  remainingCorpus: number;
  totalGrowthEarned: number;
  isExhausted: boolean;
  exhaustionMonthNumber: number | null;
  exhaustionYear: number | null;
  yearlySchedule: SWPYearlyScheduleItem[];
  isValid: boolean;
  validationError?: string;
}

export function calculateSWP(inputs: SWPCalculatorInputs): SWPCalculationResult {
  const {
    initialCorpus,
    monthlyWithdrawal,
    expectedAnnualReturn,
    withdrawalDurationYears,
  } = inputs;

  if (
    typeof initialCorpus !== 'number' ||
    isNaN(initialCorpus) ||
    initialCorpus < 0 ||
    typeof monthlyWithdrawal !== 'number' ||
    isNaN(monthlyWithdrawal) ||
    monthlyWithdrawal < 0 ||
    typeof expectedAnnualReturn !== 'number' ||
    isNaN(expectedAnnualReturn) ||
    expectedAnnualReturn < 0 ||
    typeof withdrawalDurationYears !== 'number' ||
    isNaN(withdrawalDurationYears) ||
    withdrawalDurationYears <= 0
  ) {
    return {
      initialCorpus: Math.max(0, Number(initialCorpus) || 0),
      scheduledMonthlyWithdrawal: Math.max(0, Number(monthlyWithdrawal) || 0),
      expectedAnnualReturn: Math.max(0, Number(expectedAnnualReturn) || 0),
      withdrawalDurationYears: Math.max(0, Number(withdrawalDurationYears) || 0),
      totalActualWithdrawals: 0,
      remainingCorpus: 0,
      totalGrowthEarned: 0,
      isExhausted: false,
      exhaustionMonthNumber: null,
      exhaustionYear: null,
      yearlySchedule: [],
      isValid: false,
      validationError: 'Please provide valid non-negative numbers for all inputs.',
    };
  }

  // Prevent calculation overflow for unrealistic extremes (strictly capped at ₹100 Crore)
  if (
    initialCorpus > MAX_INVESTMENT_AMOUNT ||
    monthlyWithdrawal > MAX_INVESTMENT_AMOUNT ||
    withdrawalDurationYears > 60 ||
    expectedAnnualReturn > 100
  ) {
    return {
      initialCorpus,
      scheduledMonthlyWithdrawal: monthlyWithdrawal,
      expectedAnnualReturn,
      withdrawalDurationYears,
      totalActualWithdrawals: 0,
      remainingCorpus: 0,
      totalGrowthEarned: 0,
      isExhausted: false,
      exhaustionMonthNumber: null,
      exhaustionYear: null,
      yearlySchedule: [],
      isValid: false,
      validationError: 'Input values exceed maximum supported limits (₹100 Crore).',
    };
  }

  const totalMonths = Math.round(withdrawalDurationYears * 12);
  const monthlyRate = expectedAnnualReturn === 0
    ? 0
    : Math.pow(1 + expectedAnnualReturn / 100, 1 / 12) - 1;

  let currentBalance = initialCorpus;
  let totalActualWithdrawals = 0;
  let totalGrowthEarned = 0;
  let exhaustionMonthNumber: number | null = null;

  const yearlySchedule: SWPYearlyScheduleItem[] = [];
  let currentYearOpening = currentBalance;
  let currentYearGrowth = 0;
  let currentYearWithdrawals = 0;

  for (let m = 1; m <= totalMonths; m++) {
    if (m % 12 === 1) {
      currentYearOpening = currentBalance;
      currentYearGrowth = 0;
      currentYearWithdrawals = 0;
    }

    if (currentBalance <= 0) {
      // Corpus is completely exhausted
      if (m % 12 === 0 || m === totalMonths) {
        const yearNumber = Math.ceil(m / 12);
        yearlySchedule.push({
          year: yearNumber,
          openingBalance: Math.round(currentYearOpening),
          growthEarned: Math.round(currentYearGrowth),
          annualWithdrawal: Math.round(currentYearWithdrawals),
          closingBalance: 0,
          cumulativeWithdrawals: Math.round(totalActualWithdrawals),
        });
      }
      continue;
    }

    // 1. Apply monthly return first
    const growthEarned = currentBalance * monthlyRate;
    const balanceBeforeWithdrawal = currentBalance + growthEarned;
    totalGrowthEarned += growthEarned;
    currentYearGrowth += growthEarned;

    // 2. Deduct scheduled withdrawal, capped at available balance
    const actualWithdrawal = Math.min(balanceBeforeWithdrawal, monthlyWithdrawal);
    const closingBalance = Math.max(0, balanceBeforeWithdrawal - actualWithdrawal);
    totalActualWithdrawals += actualWithdrawal;
    currentYearWithdrawals += actualWithdrawal;

    currentBalance = closingBalance;

    if (currentBalance === 0 && exhaustionMonthNumber === null) {
      exhaustionMonthNumber = m;
    }

    // Year boundary record
    if (m % 12 === 0 || m === totalMonths) {
      const yearNumber = Math.ceil(m / 12);
      yearlySchedule.push({
        year: yearNumber,
        openingBalance: Math.round(currentYearOpening),
        growthEarned: Math.round(currentYearGrowth),
        annualWithdrawal: Math.round(currentYearWithdrawals),
        closingBalance: Math.round(currentBalance),
        cumulativeWithdrawals: Math.round(totalActualWithdrawals),
      });
    }
  }

  const isExhausted = exhaustionMonthNumber !== null;
  const exhaustionYear = exhaustionMonthNumber
    ? parseFloat((exhaustionMonthNumber / 12).toFixed(1))
    : null;

  return {
    initialCorpus: Math.round(initialCorpus),
    scheduledMonthlyWithdrawal: Math.round(monthlyWithdrawal),
    expectedAnnualReturn,
    withdrawalDurationYears,
    totalActualWithdrawals: Math.round(totalActualWithdrawals),
    remainingCorpus: Math.round(currentBalance),
    totalGrowthEarned: Math.round(totalGrowthEarned),
    isExhausted,
    exhaustionMonthNumber,
    exhaustionYear,
    yearlySchedule,
    isValid: true,
  };
}

export { formatINR, formatCompactINR };
