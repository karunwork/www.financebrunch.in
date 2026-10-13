/**
 * Finance Brunch - Step-Up SIP Calculator Utility
 *
 * Implements deterministic client-side Step-Up SIP calculations:
 * - The monthly contribution increases after every 12 monthly installments by annualStepUpPercentage.
 * - Effective monthly rate: i = (1 + expectedAnnualReturn / 100)^(1 / 12) - 1
 * - End-of-month contribution timing: balance = balance * (1 + i) + monthlyContribution
 * - Includes fixed SIP comparison with identical starting contribution and return assumptions.
 */

import { formatINR, formatCompactINR } from './sipCalculator';

export interface StepUpSIPCalculatorInputs {
  initialMonthlyInvestment: number;
  expectedAnnualReturn: number;
  investmentDurationYears: number;
  annualStepUpPercentage?: number;
}

export interface StepUpYearlyScheduleItem {
  year: number;
  monthlyContribution: number;
  yearlyInvested: number;
  cumulativeInvested: number;
  futureValue: number;
  estimatedReturns: number;
}

export interface StepUpSIPCalculationResult {
  initialMonthlySIP: number;
  finalMonthlySIP: number;
  investmentDurationYears: number;
  expectedAnnualReturn: number;
  annualStepUpPercentage: number;
  totalInvested: number;
  estimatedReturns: number;
  futureValue: number;
  annualSchedule: StepUpYearlyScheduleItem[];
  fixedSipComparison: {
    totalInvested: number;
    estimatedReturns: number;
    futureValue: number;
    differenceFV: number;
  };
  isValid: boolean;
  validationError?: string;
}

export function calculateStepUpSIP(inputs: StepUpSIPCalculatorInputs): StepUpSIPCalculationResult {
  const {
    initialMonthlyInvestment,
    expectedAnnualReturn,
    investmentDurationYears,
    annualStepUpPercentage = 10,
  } = inputs;

  if (
    typeof initialMonthlyInvestment !== 'number' ||
    isNaN(initialMonthlyInvestment) ||
    initialMonthlyInvestment < 0 ||
    typeof expectedAnnualReturn !== 'number' ||
    isNaN(expectedAnnualReturn) ||
    expectedAnnualReturn < 0 ||
    typeof investmentDurationYears !== 'number' ||
    isNaN(investmentDurationYears) ||
    investmentDurationYears <= 0 ||
    typeof annualStepUpPercentage !== 'number' ||
    isNaN(annualStepUpPercentage) ||
    annualStepUpPercentage < 0
  ) {
    return {
      initialMonthlySIP: Math.max(0, Number(initialMonthlyInvestment) || 0),
      finalMonthlySIP: Math.max(0, Number(initialMonthlyInvestment) || 0),
      investmentDurationYears: Math.max(0, Number(investmentDurationYears) || 0),
      expectedAnnualReturn: Math.max(0, Number(expectedAnnualReturn) || 0),
      annualStepUpPercentage: Math.max(0, Number(annualStepUpPercentage) || 0),
      totalInvested: 0,
      estimatedReturns: 0,
      futureValue: 0,
      annualSchedule: [],
      fixedSipComparison: {
        totalInvested: 0,
        estimatedReturns: 0,
        futureValue: 0,
        differenceFV: 0,
      },
      isValid: false,
      validationError: 'Please provide valid non-negative numbers for all inputs.',
    };
  }

  const totalMonths = Math.round(investmentDurationYears * 12);
  const monthlyRate = expectedAnnualReturn === 0
    ? 0
    : Math.pow(1 + expectedAnnualReturn / 100, 1 / 12) - 1;

  let stepUpBalance = 0;
  let stepUpTotalInvested = 0;
  let currentYearInvested = 0;
  const annualSchedule: StepUpYearlyScheduleItem[] = [];

  for (let m = 1; m <= totalMonths; m++) {
    const yearIndex = Math.floor((m - 1) / 12);
    const monthlyContribution = initialMonthlyInvestment * Math.pow(1 + annualStepUpPercentage / 100, yearIndex);

    stepUpTotalInvested += monthlyContribution;
    currentYearInvested += monthlyContribution;

    // End-of-month contribution accumulation:
    if (monthlyRate === 0) {
      stepUpBalance += monthlyContribution;
    } else {
      stepUpBalance = (stepUpBalance * (1 + monthlyRate)) + monthlyContribution;
    }

    if (m % 12 === 0 || m === totalMonths) {
      const yearNumber = Math.ceil(m / 12);
      annualSchedule.push({
        year: yearNumber,
        monthlyContribution: Math.round(monthlyContribution),
        yearlyInvested: Math.round(currentYearInvested),
        cumulativeInvested: Math.round(stepUpTotalInvested),
        futureValue: Math.round(stepUpBalance),
        estimatedReturns: Math.round(Math.max(0, stepUpBalance - stepUpTotalInvested)),
      });
      currentYearInvested = 0;
    }
  }

  // Final scheduled monthly SIP:
  const finalMonthlySIP = initialMonthlyInvestment * Math.pow(1 + annualStepUpPercentage / 100, investmentDurationYears - 1);

  // Fixed SIP calculation for identical starting parameters:
  const fixedTotalInvested = initialMonthlyInvestment * totalMonths;
  const fixedFutureValue = monthlyRate === 0
    ? fixedTotalInvested
    : initialMonthlyInvestment * (Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate;
  const fixedReturns = Math.max(0, fixedFutureValue - fixedTotalInvested);

  return {
    initialMonthlySIP: Math.round(initialMonthlyInvestment),
    finalMonthlySIP: Math.round(finalMonthlySIP),
    investmentDurationYears,
    expectedAnnualReturn,
    annualStepUpPercentage,
    totalInvested: Math.round(stepUpTotalInvested),
    estimatedReturns: Math.round(Math.max(0, stepUpBalance - stepUpTotalInvested)),
    futureValue: Math.round(stepUpBalance),
    annualSchedule,
    fixedSipComparison: {
      totalInvested: Math.round(fixedTotalInvested),
      estimatedReturns: Math.round(fixedReturns),
      futureValue: Math.round(fixedFutureValue),
      differenceFV: Math.round(stepUpBalance - fixedFutureValue),
    },
    isValid: true,
  };
}

export { formatINR, formatCompactINR };
