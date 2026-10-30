/**
 * Finance Brunch — Loans & Interest Mathematical Engines
 * 
 * 24. Standard EMI Calculator (Equated Monthly Installment)
 * 25. Home Loan EMI Calculator (with Amortization & Prepayment)
 * 26. Car Loan EMI Calculator
 * 27. Simple Interest Calculator
 * 28. Compound Interest Calculator (Multiple compounding frequencies)
 * 29. Flat vs Reducing Interest Rate Comparison
 */

export interface AmortizationScheduleItem {
  period: number; // Month or Year
  openingBalance: number;
  emiPaid: number;
  principalComponent: number;
  interestComponent: number;
  closingBalance: number;
}

// --- 24. Standard EMI Calculator ---
export interface EMIInputs {
  loanAmount: number;
  annualInterestRate: number; // in %
  tenureYears?: number;
  tenureMonths?: number;
}

export interface EMIResult {
  loanAmount: number;
  annualInterestRate: number;
  tenureMonths: number;
  monthlyEMI: number;
  totalInterestPayable: number;
  totalPayment: number;
  interestToPrincipalRatioPercent: number;
  yearlySchedule: AmortizationScheduleItem[];
}

export function calculateEMI(inputs: EMIInputs): EMIResult {
  const { loanAmount, annualInterestRate } = inputs;
  const tenureMonths = inputs.tenureMonths ?? (inputs.tenureYears ? inputs.tenureYears * 12 : 60);
  const n = Math.max(1, tenureMonths);

  let monthlyEMI = 0;
  let totalInterest = 0;
  let totalPayment = 0;

  if (annualInterestRate === 0) {
    monthlyEMI = loanAmount / n;
    totalInterest = 0;
    totalPayment = loanAmount;
  } else {
    // r is monthly interest rate in decimal
    const r = annualInterestRate / 12 / 100;
    // Standard EMI Formula: E = P * r * (1 + r)^n / ((1 + r)^n - 1)
    const factor = Math.pow(1 + r, n);
    monthlyEMI = (loanAmount * r * factor) / (factor - 1);
    totalPayment = monthlyEMI * n;
    totalInterest = totalPayment - loanAmount;
  }

  // Generate Year-by-year Amortization Schedule
  const yearlySchedule: AmortizationScheduleItem[] = [];
  let balance = loanAmount;
  const r = annualInterestRate / 12 / 100;
  const totalYears = Math.ceil(n / 12);

  for (let y = 1; y <= totalYears; y++) {
    const openingYearBalance = balance;
    let yearPrincipal = 0;
    let yearInterest = 0;
    const monthsInYear = Math.min(12, n - (y - 1) * 12);

    for (let m = 1; m <= monthsInYear; m++) {
      if (balance <= 0) break;
      const monthInterest = annualInterestRate === 0 ? 0 : balance * r;
      const monthPrincipal = Math.min(balance, monthlyEMI - monthInterest);
      yearInterest += monthInterest;
      yearPrincipal += monthPrincipal;
      balance = Math.max(0, balance - monthPrincipal);
    }

    yearlySchedule.push({
      period: y,
      openingBalance: Math.round(openingYearBalance),
      emiPaid: Math.round(yearPrincipal + yearInterest),
      principalComponent: Math.round(yearPrincipal),
      interestComponent: Math.round(yearInterest),
      closingBalance: Math.round(balance),
    });
  }

  return {
    loanAmount,
    annualInterestRate,
    tenureMonths: n,
    monthlyEMI: Math.round(monthlyEMI),
    totalInterestPayable: Math.round(totalInterest),
    totalPayment: Math.round(totalPayment),
    interestToPrincipalRatioPercent: loanAmount > 0 ? Math.round((totalInterest / loanAmount) * 10000) / 100 : 0,
    yearlySchedule,
  };
}

// --- 25. Home Loan EMI Calculator ---
export interface HomeLoanInputs extends EMIInputs {
  annualPrepayment?: number; // extra lumpsum prepayment each year
}

export interface HomeLoanResult extends EMIResult {
  prepaymentTotalInterestSaved: number;
  tenureReducedMonths: number;
}

export function calculateHomeLoan(inputs: HomeLoanInputs): HomeLoanResult {
  const baseResult = calculateEMI(inputs);
  const { annualPrepayment = 0, loanAmount, annualInterestRate } = inputs;
  const n = baseResult.tenureMonths;
  const r = annualInterestRate / 12 / 100;
  const emi = baseResult.monthlyEMI;

  if (annualPrepayment <= 0 || annualInterestRate === 0) {
    return {
      ...baseResult,
      prepaymentTotalInterestSaved: 0,
      tenureReducedMonths: 0,
    };
  }

  // Simulate accelerated payoff with annual prepayment
  let balance = loanAmount;
  let monthsCount = 0;
  let totalInterestWithPrepay = 0;

  for (let m = 1; m <= n; m++) {
    if (balance <= 0) break;
    monthsCount++;
    const monthInterest = balance * r;
    let monthPrincipal = emi - monthInterest;
    totalInterestWithPrepay += monthInterest;
    balance -= monthPrincipal;

    // Apply annual prepayment at end of month 12, 24, 36...
    if (m % 12 === 0 && annualPrepayment > 0 && balance > 0) {
      const prepay = Math.min(balance, annualPrepayment);
      balance -= prepay;
    }
    if (balance <= 0) break;
  }

  const interestSaved = Math.max(0, baseResult.totalInterestPayable - totalInterestWithPrepay);
  const tenureReducedMonths = Math.max(0, n - monthsCount);

  return {
    ...baseResult,
    prepaymentTotalInterestSaved: Math.round(interestSaved),
    tenureReducedMonths,
  };
}

// --- 26. Car Loan EMI Calculator ---
export interface CarLoanInputs {
  vehicleOnRoadPrice: number;
  downPayment: number;
  annualInterestRate: number;
  tenureYears: number; // 1 to 7 years
  processingFeePercent?: number; // e.g. 1%
}

export interface CarLoanResult {
  vehiclePrice: number;
  downPayment: number;
  loanAmount: number;
  annualInterestRate: number;
  tenureYears: number;
  monthlyEMI: number;
  totalInterestPayable: number;
  processingFeeAmount: number;
  totalCostOfCar: number;
  yearlySchedule: AmortizationScheduleItem[];
}

export function calculateCarLoan(inputs: CarLoanInputs): CarLoanResult {
  const { vehicleOnRoadPrice, downPayment, annualInterestRate, tenureYears, processingFeePercent = 1 } = inputs;
  const loanAmount = Math.max(0, vehicleOnRoadPrice - downPayment);
  const emiRes = calculateEMI({
    loanAmount,
    annualInterestRate,
    tenureYears,
  });

  const processingFeeAmount = Math.round((loanAmount * processingFeePercent) / 100);
  const totalCostOfCar = downPayment + emiRes.totalPayment + processingFeeAmount;

  return {
    vehiclePrice: vehicleOnRoadPrice,
    downPayment,
    loanAmount,
    annualInterestRate,
    tenureYears,
    monthlyEMI: emiRes.monthlyEMI,
    totalInterestPayable: emiRes.totalInterestPayable,
    processingFeeAmount,
    totalCostOfCar: Math.round(totalCostOfCar),
    yearlySchedule: emiRes.yearlySchedule,
  };
}

// --- 27. Simple Interest Calculator ---
export interface SimpleInterestInputs {
  principalAmount: number;
  annualInterestRate: number; // in %
  timePeriodYears: number;
}

export interface SimpleInterestResult {
  principalAmount: number;
  annualInterestRate: number;
  timePeriodYears: number;
  totalInterest: number;
  totalAmount: number;
  schedule: Array<{ year: number; interestEarned: number; cumulativeAmount: number }>;
}

export function calculateSimpleInterest(inputs: SimpleInterestInputs): SimpleInterestResult {
  const { principalAmount, annualInterestRate, timePeriodYears } = inputs;
  // Formula: SI = (P * R * T) / 100
  const totalInterest = (principalAmount * annualInterestRate * timePeriodYears) / 100;
  const totalAmount = principalAmount + totalInterest;

  const schedule = [];
  const yearlyInterest = (principalAmount * annualInterestRate) / 100;
  for (let y = 1; y <= timePeriodYears; y++) {
    schedule.push({
      year: y,
      interestEarned: Math.round(yearlyInterest * y),
      cumulativeAmount: Math.round(principalAmount + yearlyInterest * y),
    });
  }

  return {
    principalAmount,
    annualInterestRate,
    timePeriodYears,
    totalInterest: Math.round(totalInterest),
    totalAmount: Math.round(totalAmount),
    schedule,
  };
}

// --- 28. Compound Interest Calculator ---
export interface CompoundInterestInputs {
  principalAmount: number;
  annualInterestRate: number; // in %
  timePeriodYears: number;
  compoundingFrequency: 'annually' | 'semi-annually' | 'quarterly' | 'monthly' | 'daily';
}

export interface CompoundInterestResult {
  principalAmount: number;
  annualInterestRate: number;
  timePeriodYears: number;
  compoundingFrequency: string;
  compoundInterestEarned: number;
  totalMaturityAmount: number;
  schedule: Array<{ year: number; openingBalance: number; interestEarned: number; closingBalance: number }>;
}

export function calculateCompoundInterest(inputs: CompoundInterestInputs): CompoundInterestResult {
  const { principalAmount, annualInterestRate, timePeriodYears, compoundingFrequency } = inputs;
  const freqMap: Record<string, number> = {
    annually: 1,
    'semi-annually': 2,
    quarterly: 4,
    monthly: 12,
    daily: 365,
  };
  const n = freqMap[compoundingFrequency] || 1;
  const r = annualInterestRate / 100;
  const t = Math.max(1, timePeriodYears);

  // Formula: A = P * (1 + r/n)^(n*t)
  const totalMaturityAmount = principalAmount * Math.pow(1 + r / n, n * t);
  const compoundInterestEarned = totalMaturityAmount - principalAmount;

  const schedule = [];
  let prevBalance = principalAmount;
  for (let y = 1; y <= t; y++) {
    const curBalance = principalAmount * Math.pow(1 + r / n, n * y);
    schedule.push({
      year: y,
      openingBalance: Math.round(prevBalance),
      interestEarned: Math.round(curBalance - prevBalance),
      closingBalance: Math.round(curBalance),
    });
    prevBalance = curBalance;
  }

  return {
    principalAmount,
    annualInterestRate,
    timePeriodYears: t,
    compoundingFrequency: compoundingFrequency.charAt(0).toUpperCase() + compoundingFrequency.slice(1),
    compoundInterestEarned: Math.round(compoundInterestEarned),
    totalMaturityAmount: Math.round(totalMaturityAmount),
    schedule,
  };
}

// --- 29. Flat vs Reducing Interest Rate Calculator ---
export interface FlatVsReducingInputs {
  loanAmount: number;
  interestRate: number; // in %
  tenureYears: number;
}

export interface FlatVsReducingResult {
  loanAmount: number;
  statedRate: number;
  tenureYears: number;
  flat: {
    monthlyEMI: number;
    totalInterest: number;
    totalPayment: number;
    effectiveReducingRatePercent: number;
  };
  reducing: {
    monthlyEMI: number;
    totalInterest: number;
    totalPayment: number;
    effectiveFlatRatePercent: number;
  };
  interestDifference: number; // How much more you pay with Flat rate
  monthlyEmiDifference: number;
}

export function calculateFlatVsReducing(inputs: FlatVsReducingInputs): FlatVsReducingResult {
  const { loanAmount, interestRate, tenureYears } = inputs;
  const months = tenureYears * 12;

  // 1. Flat Rate Calculation:
  // Interest is calculated on the entire initial principal for all years
  const flatTotalInterest = loanAmount * (interestRate / 100) * tenureYears;
  const flatTotalPayment = loanAmount + flatTotalInterest;
  const flatMonthlyEMI = flatTotalPayment / months;

  // Find effective reducing rate corresponding to this flat EMI (IRR method)
  // PV = loanAmount, PMT = flatMonthlyEMI, n = months -> solve for r
  let rGuess = (interestRate * 1.8) / 12 / 100;
  for (let i = 0; i < 40; i++) {
    const factor = Math.pow(1 + rGuess, months);
    const f = (loanAmount * rGuess * factor) / (factor - 1) - flatMonthlyEMI;
    const df = (loanAmount * (factor * (1 + months * rGuess) - 1)) / Math.pow(factor - 1, 2);
    if (Math.abs(f) < 1e-4) break;
    rGuess -= f / df;
  }
  const effectiveReducingRatePercent = Math.round(rGuess * 12 * 10000) / 100;

  // 2. Reducing Balance Calculation:
  const redRes = calculateEMI({
    loanAmount,
    annualInterestRate: interestRate,
    tenureYears,
  });
  const effectiveFlatRatePercent = Math.round((redRes.totalInterestPayable / (loanAmount * tenureYears)) * 10000) / 100;

  return {
    loanAmount,
    statedRate: interestRate,
    tenureYears,
    flat: {
      monthlyEMI: Math.round(flatMonthlyEMI),
      totalInterest: Math.round(flatTotalInterest),
      totalPayment: Math.round(flatTotalPayment),
      effectiveReducingRatePercent,
    },
    reducing: {
      monthlyEMI: redRes.monthlyEMI,
      totalInterest: redRes.totalInterestPayable,
      totalPayment: redRes.totalPayment,
      effectiveFlatRatePercent,
    },
    interestDifference: Math.round(flatTotalInterest - redRes.totalInterestPayable),
    monthlyEmiDifference: Math.round(flatMonthlyEMI - redRes.monthlyEMI),
  };
}

