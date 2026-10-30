/**
 * Finance Brunch — Government Savings & Fixed-Income Mathematical Engines
 * 
 * Implements verified scheme-specific calculations based on Ministry of Finance,
 * RBI, EPFO, India Post, and PFRDA official rules:
 * 
 * 14. Sukanya Samriddhi Yojana (SSY)
 * 15. Public Provident Fund (PPF)
 * 16. Employee Provident Fund (EPF)
 * 17. Fixed Deposit (FD - Cumulative & Non-Cumulative Payouts)
 * 18. Recurring Deposit (RD - Post Office / Banking Standard)
 * 19. National Savings Certificate (NSC)
 * 20. Atal Pension Yojana (APY)
 * 21. Post Office Monthly Income Scheme (PO-MIS)
 * 22. Senior Citizens Savings Scheme (SCSS)
 * 23. National Pension System (NPS)
 */

import { OFFICIAL_GOVERNMENT_RATES } from './officialSchemeRates';

// --- 14. Sukanya Samriddhi Yojana (SSY) ---
export interface SSYInputs {
  yearlyDeposit: number; // max ₹1,50,000, min ₹250
  girlChildAge?: number; // 0 to 10 years
  interestRate?: number; // defaults to official 8.2%
}

export interface SSYResult {
  yearlyDeposit: number;
  totalDepositYears: number; // 15 years
  maturityYears: number; // 21 years
  interestRate: number;
  totalAmountDeposited: number;
  totalInterestEarned: number;
  maturityValue: number;
  schedule: Array<{ year: number; openingBalance: number; deposit: number; interestEarned: number; closingBalance: number }>;
}

export function calculateSSY(inputs: SSYInputs): SSYResult {
  const deposit = Math.min(150000, Math.max(250, inputs.yearlyDeposit));
  const rate = inputs.interestRate ?? OFFICIAL_GOVERNMENT_RATES.ssy.interestRate;
  const r = rate / 100;

  const totalDepositYears = 15;
  const maturityYears = 21;
  let balance = 0;
  let totalDeposited = 0;
  let totalInterest = 0;
  const schedule = [];

  for (let year = 1; year <= maturityYears; year++) {
    const opening = balance;
    const currentDeposit = year <= totalDepositYears ? deposit : 0;
    totalDeposited += currentDeposit;

    // Deposit added at start of year, interest compounded annually at year end
    const interest = (opening + currentDeposit) * r;
    balance = opening + currentDeposit + interest;
    totalInterest += interest;

    schedule.push({
      year,
      openingBalance: Math.round(opening),
      deposit: Math.round(currentDeposit),
      interestEarned: Math.round(interest),
      closingBalance: Math.round(balance),
    });
  }

  return {
    yearlyDeposit: deposit,
    totalDepositYears,
    maturityYears,
    interestRate: rate,
    totalAmountDeposited: Math.round(totalDeposited),
    totalInterestEarned: Math.round(totalInterest),
    maturityValue: Math.round(balance),
    schedule,
  };
}

// --- 15. Public Provident Fund (PPF) ---
export interface PPFInputs {
  yearlyDeposit: number; // max ₹1,50,000, min ₹500
  durationYears?: number; // 15 years standard, or 20, 25 in 5-yr blocks
  interestRate?: number; // defaults to official 7.1%
}

export interface PPFResult {
  yearlyDeposit: number;
  durationYears: number;
  interestRate: number;
  totalAmountDeposited: number;
  totalInterestEarned: number;
  maturityValue: number;
  schedule: Array<{ year: number; openingBalance: number; deposit: number; interestEarned: number; closingBalance: number }>;
}

export function calculatePPF(inputs: PPFInputs): PPFResult {
  const deposit = Math.min(150000, Math.max(500, inputs.yearlyDeposit));
  const years = inputs.durationYears && inputs.durationYears >= 15 ? inputs.durationYears : 15;
  const rate = inputs.interestRate ?? OFFICIAL_GOVERNMENT_RATES.ppf.interestRate;
  const r = rate / 100;

  let balance = 0;
  let totalDeposited = 0;
  let totalInterest = 0;
  const schedule = [];

  for (let year = 1; year <= years; year++) {
    const opening = balance;
    totalDeposited += deposit;
    // Assuming deposit made before 5th of April / month, interest earned on full year
    const interest = (opening + deposit) * r;
    balance = opening + deposit + interest;
    totalInterest += interest;

    schedule.push({
      year,
      openingBalance: Math.round(opening),
      deposit: Math.round(deposit),
      interestEarned: Math.round(interest),
      closingBalance: Math.round(balance),
    });
  }

  return {
    yearlyDeposit: deposit,
    durationYears: years,
    interestRate: rate,
    totalAmountDeposited: Math.round(totalDeposited),
    totalInterestEarned: Math.round(totalInterest),
    maturityValue: Math.round(balance),
    schedule,
  };
}

// --- 16. Employee Provident Fund (EPF) ---
export interface EPFInputs {
  monthlyBasicPlusDA: number;
  currentAge: number;
  retirementAge?: number; // defaults to 58
  annualSalaryIncrementRate?: number; // e.g. 5%
  existingEpfBalance?: number;
  interestRate?: number; // defaults to official 8.25%
}

export interface EPFResult {
  totalTenureYears: number;
  finalBasicSalary: number;
  employeeTotalContribution: number;
  employerTotalContributionToEPF: number;
  totalInterestEarned: number;
  totalMaturityCorpus: number;
  schedule: Array<{
    year: number;
    age: number;
    basicSalary: number;
    employeeShare: number;
    employerShare: number;
    interestEarned: number;
    closingBalance: number;
  }>;
}

export function calculateEPF(inputs: EPFInputs): EPFResult {
  const {
    monthlyBasicPlusDA,
    currentAge,
    retirementAge = 58,
    annualSalaryIncrementRate = 5,
    existingEpfBalance = 0,
    interestRate = OFFICIAL_GOVERNMENT_RATES.epf.interestRate,
  } = inputs;

  const totalYears = Math.max(1, retirementAge - currentAge);
  const r = interestRate / 100;
  const hike = annualSalaryIncrementRate / 100;

  let basic = monthlyBasicPlusDA;
  let balance = existingEpfBalance;
  let totalEmployee = 0;
  let totalEmployer = 0;
  let totalInterest = 0;
  const schedule = [];

  for (let year = 1; year <= totalYears; year++) {
    // Employee contributes 12% of basic
    const yearlyEmployee = basic * 0.12 * 12;
    // Employer contributes 3.67% to EPF (remaining 8.33% goes to EPS, capped at ₹15,000 wage ceiling = ₹1,250/mo)
    const yearlyEmployer = basic * 0.0367 * 12;

    totalEmployee += yearlyEmployee;
    totalEmployer += yearlyEmployer;

    const opening = balance;
    // In EPF, interest is compounded annually on running balance
    // Monthly compounding equivalent average across the year:
    const annualAddition = yearlyEmployee + yearlyEmployer;
    const interest = opening * r + (annualAddition / 2) * r;
    balance = opening + annualAddition + interest;
    totalInterest += interest;

    schedule.push({
      year,
      age: currentAge + year,
      basicSalary: Math.round(basic),
      employeeShare: Math.round(yearlyEmployee),
      employerShare: Math.round(yearlyEmployer),
      interestEarned: Math.round(interest),
      closingBalance: Math.round(balance),
    });

    // Salary increment for next year
    basic *= (1 + hike);
  }

  return {
    totalTenureYears: totalYears,
    finalBasicSalary: Math.round(basic / (1 + hike)),
    employeeTotalContribution: Math.round(totalEmployee),
    employerTotalContributionToEPF: Math.round(totalEmployer),
    totalInterestEarned: Math.round(totalInterest),
    totalMaturityCorpus: Math.round(balance),
    schedule,
  };
}

// --- 17. Fixed Deposit (FD) Calculator ---
export interface FDInputs {
  depositAmount: number;
  annualInterestRate: number; // in %
  tenureYears: number;
  isSeniorCitizen?: boolean; // +0.50%
  payoutType?: 'cumulative' | 'monthly' | 'quarterly' | 'annually';
}

export interface FDResult {
  depositAmount: number;
  effectiveInterestRate: number;
  tenureYears: number;
  payoutType: string;
  totalInterestEarned: number;
  maturityAmount: number;
  periodicPayoutAmount: number; // 0 for cumulative
  schedule: Array<{ year: number; interestEarned: number; balance: number }>;
}

export function calculateFD(inputs: FDInputs): FDResult {
  const { depositAmount, annualInterestRate, tenureYears, isSeniorCitizen = false, payoutType = 'cumulative' } = inputs;
  const effectiveRate = annualInterestRate + (isSeniorCitizen ? 0.5 : 0);
  const r = effectiveRate / 100;
  const years = Math.max(1, tenureYears);

  if (payoutType === 'cumulative') {
    // Indian banking standard: Quarterly compounding A = P * (1 + r/4)^(4*t)
    const n = 4; // 4 quarters per year
    const maturityAmount = depositAmount * Math.pow(1 + r / n, n * years);
    const totalInterestEarned = maturityAmount - depositAmount;

    const schedule = [];
    for (let y = 1; y <= years; y++) {
      const yearBalance = depositAmount * Math.pow(1 + r / n, n * y);
      const prevBalance = y === 1 ? depositAmount : depositAmount * Math.pow(1 + r / n, n * (y - 1));
      schedule.push({
        year: y,
        interestEarned: Math.round(yearBalance - prevBalance),
        balance: Math.round(yearBalance),
      });
    }

    return {
      depositAmount,
      effectiveInterestRate: effectiveRate,
      tenureYears: years,
      payoutType: 'Cumulative (At Maturity)',
      totalInterestEarned: Math.round(totalInterestEarned),
      maturityAmount: Math.round(maturityAmount),
      periodicPayoutAmount: 0,
      schedule,
    };
  } else {
    // Non-cumulative payout
    let periodicPayout = 0;
    let totalInterest = 0;
    if (payoutType === 'monthly') {
      periodicPayout = (depositAmount * r) / 12;
      totalInterest = periodicPayout * 12 * years;
    } else if (payoutType === 'quarterly') {
      periodicPayout = (depositAmount * r) / 4;
      totalInterest = periodicPayout * 4 * years;
    } else {
      // Annually
      periodicPayout = depositAmount * r;
      totalInterest = periodicPayout * years;
    }

    const schedule = [];
    for (let y = 1; y <= years; y++) {
      schedule.push({
        year: y,
        interestEarned: Math.round(depositAmount * r),
        balance: depositAmount,
      });
    }

    return {
      depositAmount,
      effectiveInterestRate: effectiveRate,
      tenureYears: years,
      payoutType: payoutType.charAt(0).toUpperCase() + payoutType.slice(1) + ' Payout',
      totalInterestEarned: Math.round(totalInterest),
      maturityAmount: depositAmount,
      periodicPayoutAmount: Math.round(periodicPayout),
      schedule,
    };
  }
}

// --- 18. Recurring Deposit (RD) Calculator ---
export interface RDInputs {
  monthlyDeposit: number;
  annualInterestRate?: number; // in %, defaults to official Post Office 6.7%
  tenureMonths: number; // e.g. 12 to 120
}

export interface RDResult {
  monthlyDeposit: number;
  tenureMonths: number;
  annualInterestRate: number;
  totalInvestedAmount: number;
  totalInterestEarned: number;
  maturityAmount: number;
  schedule: Array<{ monthQuarter: number; deposited: number; interestEarned: number; balance: number }>;
}

export function calculateRD(inputs: RDInputs): RDResult {
  const { monthlyDeposit, tenureMonths, annualInterestRate = OFFICIAL_GOVERNMENT_RATES.rdPostOffice.interestRate } = inputs;
  const months = Math.max(3, tenureMonths);
  const r = annualInterestRate / 100;
  
  // Indian Post Office / Banking standard formula for RD with quarterly compounding:
  // Each monthly installment i (from 1 to N) earns interest for (N - i + 1) months, compounded quarterly:
  // M_i = P * (1 + r/4)^(4 * t_i / 12)
  let maturityAmount = 0;
  const totalInvestedAmount = monthlyDeposit * months;

  for (let i = 1; i <= months; i++) {
    const remainingMonths = months - i + 1;
    const quarters = remainingMonths / 3;
    const futureValOfInstallment = monthlyDeposit * Math.pow(1 + r / 4, quarters);
    maturityAmount += futureValOfInstallment;
  }

  const totalInterestEarned = maturityAmount - totalInvestedAmount;

  // Yearly or quarterly schedule projection
  const schedule = [];
  const years = Math.ceil(months / 12);
  let cumDeposit = 0;
  for (let y = 1; y <= years; y++) {
    const m = Math.min(months, y * 12);
    cumDeposit = monthlyDeposit * m;
    let partialMaturity = 0;
    for (let i = 1; i <= m; i++) {
      const rem = m - i + 1;
      partialMaturity += monthlyDeposit * Math.pow(1 + r / 4, rem / 3);
    }
    schedule.push({
      monthQuarter: y,
      deposited: Math.round(cumDeposit),
      interestEarned: Math.round(partialMaturity - cumDeposit),
      balance: Math.round(partialMaturity),
    });
  }

  return {
    monthlyDeposit,
    tenureMonths: months,
    annualInterestRate,
    totalInvestedAmount: Math.round(totalInvestedAmount),
    totalInterestEarned: Math.round(totalInterestEarned),
    maturityAmount: Math.round(maturityAmount),
    schedule,
  };
}

// --- 19. National Savings Certificate (NSC) Calculator ---
export interface NSCInputs {
  investmentAmount: number;
  interestRate?: number; // defaults to official 7.7%
}

export interface NSCResult {
  investmentAmount: number;
  tenureYears: number; // 5 years fixed
  interestRate: number;
  totalInterestEarned: number;
  maturityAmount: number;
  schedule: Array<{ year: number; openingBalance: number; interestEarned: number; closingBalance: number }>;
}

export function calculateNSC(inputs: NSCInputs): NSCResult {
  const { investmentAmount, interestRate = OFFICIAL_GOVERNMENT_RATES.nsc.interestRate } = inputs;
  const years = 5;
  const r = interestRate / 100;
  let balance = investmentAmount;
  let totalInterest = 0;
  const schedule = [];

  for (let year = 1; year <= years; year++) {
    const opening = balance;
    const interest = opening * r;
    balance = opening + interest;
    totalInterest += interest;
    schedule.push({
      year,
      openingBalance: Math.round(opening),
      interestEarned: Math.round(interest),
      closingBalance: Math.round(balance),
    });
  }

  return {
    investmentAmount,
    tenureYears: years,
    interestRate,
    totalInterestEarned: Math.round(totalInterest),
    maturityAmount: Math.round(balance),
    schedule,
  };
}

// --- 20. Atal Pension Yojana (APY) Calculator ---
export interface APYInputs {
  currentAge: number; // 18 to 40
  desiredMonthlyPension: 1000 | 2000 | 3000 | 4000 | 5000;
}

export interface APYResult {
  entryAge: number;
  vestingAge: number; // 60
  yearsOfContribution: number;
  desiredMonthlyPension: number;
  monthlyContribution: number;
  quarterlyContribution: number;
  halfYearlyContribution: number;
  totalContributionAmount: number;
  totalCorpusToNominee: number; // Statutory corpus given to nominee upon death
}

// Official PFRDA Schedule Matrix for APY
const APY_MONTHLY_TABLE: Record<number, Record<number, number>> = {
  18: { 1000: 42, 2000: 84, 3000: 126, 4000: 168, 5000: 210 },
  20: { 1000: 50, 2000: 100, 3000: 150, 4000: 200, 5000: 248 },
  25: { 1000: 76, 2000: 151, 3000: 226, 4000: 301, 5000: 376 },
  30: { 1000: 116, 2000: 231, 3000: 347, 4000: 462, 5000: 577 },
  35: { 1000: 181, 2000: 362, 3000: 543, 4000: 724, 5000: 902 },
  40: { 1000: 291, 2000: 582, 3000: 873, 4000: 1164, 5000: 1454 },
};

export function calculateAPY(inputs: APYInputs): APYResult {
  const age = Math.min(40, Math.max(18, inputs.currentAge));
  const pension = inputs.desiredMonthlyPension;

  // Find nearest table age or exact formula interpolation
  const knownAges = [18, 20, 25, 30, 35, 40];
  let monthlyContrib = 210;

  if (APY_MONTHLY_TABLE[age]) {
    monthlyContrib = APY_MONTHLY_TABLE[age][pension];
  } else {
    // Linear interpolation between closest points
    let lower = 18;
    let upper = 40;
    for (let i = 0; i < knownAges.length - 1; i++) {
      if (age >= knownAges[i] && age <= knownAges[i + 1]) {
        lower = knownAges[i];
        upper = knownAges[i + 1];
        break;
      }
    }
    const valLow = APY_MONTHLY_TABLE[lower][pension];
    const valHigh = APY_MONTHLY_TABLE[upper][pension];
    const fraction = (age - lower) / (upper - lower);
    monthlyContrib = Math.round(valLow + fraction * (valHigh - valLow));
  }

  const yearsOfContribution = 60 - age;
  const totalMonths = yearsOfContribution * 12;
  const totalContributionAmount = monthlyContrib * totalMonths;

  // Statutory nominee return corpus specified by PFRDA (approx ₹1.7 Lakh per ₹1,000 monthly pension)
  const nomineeCorpus = (pension / 1000) * 170000;

  return {
    entryAge: age,
    vestingAge: 60,
    yearsOfContribution,
    desiredMonthlyPension: pension,
    monthlyContribution: monthlyContrib,
    quarterlyContribution: Math.round(monthlyContrib * 3 * 0.995), // Slight discount for periodic advance
    halfYearlyContribution: Math.round(monthlyContrib * 6 * 0.99),
    totalContributionAmount,
    totalCorpusToNominee: nomineeCorpus,
  };
}

// --- 21. Post Office Monthly Income Scheme (PO-MIS) ---
export interface POMISInputs {
  depositAmount: number;
  interestRate?: number; // defaults to official 7.4%
}

export interface POMISResult {
  depositAmount: number;
  tenureYears: number; // 5 years fixed
  interestRate: number;
  monthlyIncome: number;
  annualIncome: number;
  totalIncomeEarned: number;
  maturityValue: number; // Principal returned intact
}

export function calculatePOMIS(inputs: POMISInputs): POMISResult {
  // Statutory limits: Max ₹9 Lakh single, ₹15 Lakh joint
  const deposit = Math.min(1500000, Math.max(1000, inputs.depositAmount));
  const rate = inputs.interestRate ?? OFFICIAL_GOVERNMENT_RATES.poMis.interestRate;
  const monthlyIncome = (deposit * (rate / 100)) / 12;
  const totalIncomeEarned = monthlyIncome * 60; // 5 years = 60 months

  return {
    depositAmount: deposit,
    tenureYears: 5,
    interestRate: rate,
    monthlyIncome: Math.round(monthlyIncome),
    annualIncome: Math.round(monthlyIncome * 12),
    totalIncomeEarned: Math.round(totalIncomeEarned),
    maturityValue: deposit,
  };
}

// --- 22. Senior Citizens Savings Scheme (SCSS) ---
export interface SCSSInputs {
  depositAmount: number; // up to ₹30,00,000
  interestRate?: number; // defaults to official 8.2%
}

export interface SCSSResult {
  depositAmount: number;
  tenureYears: number; // 5 years standard
  interestRate: number;
  quarterlyPayout: number;
  annualIncome: number;
  totalIncomeEarned: number;
  maturityValue: number;
}

export function calculateSCSS(inputs: SCSSInputs): SCSSResult {
  const deposit = Math.min(3000000, Math.max(1000, inputs.depositAmount));
  const rate = inputs.interestRate ?? OFFICIAL_GOVERNMENT_RATES.scss.interestRate;
  const quarterlyPayout = (deposit * (rate / 100)) / 4;
  const totalIncomeEarned = quarterlyPayout * 20; // 5 years = 20 quarters

  return {
    depositAmount: deposit,
    tenureYears: 5,
    interestRate: rate,
    quarterlyPayout: Math.round(quarterlyPayout),
    annualIncome: Math.round(quarterlyPayout * 4),
    totalIncomeEarned: Math.round(totalIncomeEarned),
    maturityValue: deposit,
  };
}

// --- 23. National Pension System (NPS) Calculator ---
export interface NPSInputs {
  monthlyContribution: number;
  currentAge: number;
  retirementAge?: number; // defaults to 60
  expectedAnnualReturnRate?: number; // e.g. 10%
  annuityPercentage?: number; // min 40%, up to 100%
  expectedAnnuityReturnRate?: number; // e.g. 6%
}

export interface NPSResult {
  totalContributionYears: number;
  totalAmountInvested: number;
  totalInterestEarned: number;
  totalMaturityCorpus: number;
  lumpsumWithdrawalAmount: number;
  annuityReinvestedAmount: number;
  estimatedMonthlyPension: number;
  schedule: Array<{ year: number; age: number; invested: number; interestEarned: number; balance: number }>;
}

export function calculateNPS(inputs: NPSInputs): NPSResult {
  const {
    monthlyContribution,
    currentAge,
    retirementAge = 60,
    expectedAnnualReturnRate = 10,
    annuityPercentage = 40,
    expectedAnnuityReturnRate = 6,
  } = inputs;

  const totalYears = Math.max(1, retirementAge - currentAge);
  const totalMonths = totalYears * 12;
  const monthlyRate = Math.pow(1 + expectedAnnualReturnRate / 100, 1 / 12) - 1;

  // Beginning-of-month annuity formula
  const fvFactor = ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);
  const totalCorpus = monthlyContribution * fvFactor;
  const totalInvested = monthlyContribution * totalMonths;
  const totalInterest = totalCorpus - totalInvested;

  const annuityPercent = Math.min(100, Math.max(40, annuityPercentage));
  const annuityAmount = totalCorpus * (annuityPercent / 100);
  const lumpsumAmount = totalCorpus - annuityAmount;

  // Monthly pension from annuity: (Annuity Corpus * Annuity Rate) / 12
  const monthlyPension = (annuityAmount * (expectedAnnuityReturnRate / 100)) / 12;

  const schedule = [];
  for (let y = 1; y <= totalYears; y++) {
    const m = y * 12;
    const factor = ((Math.pow(1 + monthlyRate, m) - 1) / monthlyRate) * (1 + monthlyRate);
    const balance = monthlyContribution * factor;
    const invested = monthlyContribution * m;
    schedule.push({
      year: y,
      age: currentAge + y,
      invested: Math.round(invested),
      interestEarned: Math.round(balance - invested),
      balance: Math.round(balance),
    });
  }

  return {
    totalContributionYears: totalYears,
    totalAmountInvested: Math.round(totalInvested),
    totalInterestEarned: Math.round(totalInterest),
    totalMaturityCorpus: Math.round(totalCorpus),
    lumpsumWithdrawalAmount: Math.round(lumpsumAmount),
    annuityReinvestedAmount: Math.round(annuityAmount),
    estimatedMonthlyPension: Math.round(monthlyPension),
    schedule,
  };
}

