/**
 * Finance Brunch — Tax, Salary & Employment Mathematical Engines
 * 
 * 30. Income Tax Calculator (FY 2024-25 / AY 2025-26 New vs Old Regime)
 * 31. HRA Calculator (House Rent Allowance u/s 10(13A))
 * 32. GST Calculator (Inclusive & Exclusive with CGST/SGST/IGST breakdown)
 * 33. Gratuity Calculator (Payment of Gratuity Act, 1972)
 * 34. TDS Calculator (Tax Deducted at Source across standard sections)
 * 35. Salary / CTC to In-Hand Calculator
 */

import { INCOME_TAX_CONFIG, GRATUITY_CONFIG } from './officialSchemeRates';

// --- 30. Income Tax Calculator ---
export interface IncomeTaxInputs {
  annualGrossIncome: number;
  financialYear?: '2024-25' | '2023-24';
  ageCategory?: 'regular' | 'senior' | 'superSenior'; // regular < 60, senior 60-80, superSenior > 80
  // Old regime deductions
  section80C?: number; // max ₹1.5L
  section80D?: number; // health insurance
  section80CCD1B?: number; // NPS additional ₹50k
  hraExemption?: number;
  homeLoanInterestSelfOccupied?: number; // Section 24(b) max ₹2L
  otherDeductions?: number;
}

export interface TaxRegimeBreakdown {
  grossIncome: number;
  standardDeduction: number;
  totalExemptionsDeductions: number;
  taxableIncome: number;
  slabTaxBeforeRebate: number;
  rebate87A: number;
  taxAfterRebate: number;
  cessAmount: number; // 4%
  totalTaxPayable: number;
  effectiveTaxRatePercent: number;
}

export interface IncomeTaxResult {
  financialYear: string;
  grossIncome: number;
  newRegime: TaxRegimeBreakdown;
  oldRegime: TaxRegimeBreakdown;
  recommendedRegime: 'new' | 'old';
  taxSavingsAmount: number;
}

export function calculateIncomeTax(inputs: IncomeTaxInputs): IncomeTaxResult {
  const {
    annualGrossIncome,
    financialYear = '2024-25',
    section80C = 0,
    section80D = 0,
    section80CCD1B = 0,
    hraExemption = 0,
    homeLoanInterestSelfOccupied = 0,
    otherDeductions = 0,
  } = inputs;

  // --- NEW REGIME (Union Budget 2024 / FY 2024-25) ---
  const newStdDeduction = INCOME_TAX_CONFIG.newRegime.standardDeduction;
  const newTaxable = Math.max(0, annualGrossIncome - newStdDeduction);

  let newSlabTax = 0;
  for (const slab of INCOME_TAX_CONFIG.newRegime.slabs) {
    if (newTaxable > slab.min) {
      const taxableInSlab = Math.min(newTaxable, slab.max) - slab.min;
      newSlabTax += (taxableInSlab * slab.rate) / 100;
    }
  }

  // 87A rebate for new regime: Income up to 7 Lakh pays 0 tax
  let newRebate87A = 0;
  if (newTaxable <= INCOME_TAX_CONFIG.newRegime.rebateLimit) {
    newRebate87A = newSlabTax;
  } else if (newTaxable <= 727770) {
    // Marginal relief under Section 87A
    const excessIncome = newTaxable - 700000;
    if (newSlabTax > excessIncome) {
      newRebate87A = newSlabTax - excessIncome;
    }
  }

  const newTaxAfterRebate = Math.max(0, newSlabTax - newRebate87A);
  const newCess = newTaxAfterRebate * 0.04;
  const newTotalTax = Math.round(newTaxAfterRebate + newCess);

  const newRegimeBreakdown: TaxRegimeBreakdown = {
    grossIncome: annualGrossIncome,
    standardDeduction: newStdDeduction,
    totalExemptionsDeductions: newStdDeduction,
    taxableIncome: newTaxable,
    slabTaxBeforeRebate: Math.round(newSlabTax),
    rebate87A: Math.round(newRebate87A),
    taxAfterRebate: Math.round(newTaxAfterRebate),
    cessAmount: Math.round(newCess),
    totalTaxPayable: newTotalTax,
    effectiveTaxRatePercent: annualGrossIncome > 0 ? Math.round((newTotalTax / annualGrossIncome) * 10000) / 100 : 0,
  };

  // --- OLD REGIME ---
  const oldStdDeduction = INCOME_TAX_CONFIG.oldRegime.standardDeduction;
  const capped80C = Math.min(150000, Math.max(0, section80C));
  const capped80D = Math.min(50000, Math.max(0, section80D));
  const capped80CCD1B = Math.min(50000, Math.max(0, section80CCD1B));
  const cappedHomeLoan = Math.min(200000, Math.max(0, homeLoanInterestSelfOccupied));
  const totalOldDeductions = oldStdDeduction + capped80C + capped80D + capped80CCD1B + hraExemption + cappedHomeLoan + otherDeductions;
  const oldTaxable = Math.max(0, annualGrossIncome - totalOldDeductions);

  let oldSlabTax = 0;
  for (const slab of INCOME_TAX_CONFIG.oldRegime.slabs) {
    if (oldTaxable > slab.min) {
      const taxableInSlab = Math.min(oldTaxable, slab.max) - slab.min;
      oldSlabTax += (taxableInSlab * slab.rate) / 100;
    }
  }

  let oldRebate87A = 0;
  if (oldTaxable <= INCOME_TAX_CONFIG.oldRegime.rebateLimit) {
    oldRebate87A = oldSlabTax;
  }
  const oldTaxAfterRebate = Math.max(0, oldSlabTax - oldRebate87A);
  const oldCess = oldTaxAfterRebate * 0.04;
  const oldTotalTax = Math.round(oldTaxAfterRebate + oldCess);

  const oldRegimeBreakdown: TaxRegimeBreakdown = {
    grossIncome: annualGrossIncome,
    standardDeduction: oldStdDeduction,
    totalExemptionsDeductions: totalOldDeductions,
    taxableIncome: oldTaxable,
    slabTaxBeforeRebate: Math.round(oldSlabTax),
    rebate87A: Math.round(oldRebate87A),
    taxAfterRebate: Math.round(oldTaxAfterRebate),
    cessAmount: Math.round(oldCess),
    totalTaxPayable: oldTotalTax,
    effectiveTaxRatePercent: annualGrossIncome > 0 ? Math.round((oldTotalTax / annualGrossIncome) * 10000) / 100 : 0,
  };

  const recommendedRegime = newTotalTax <= oldTotalTax ? 'new' : 'old';
  const taxSavingsAmount = Math.abs(newTotalTax - oldTotalTax);

  return {
    financialYear,
    grossIncome: annualGrossIncome,
    newRegime: newRegimeBreakdown,
    oldRegime: oldRegimeBreakdown,
    recommendedRegime,
    taxSavingsAmount,
  };
}

// --- 31. HRA (House Rent Allowance) Calculator ---
export interface HRAInputs {
  monthlyBasicSalary: number;
  monthlyDearnessAllowance?: number;
  monthlyHRAReceived: number;
  monthlyActualRentPaid: number;
  isMetroCity: boolean; // Metro: Delhi, Mumbai, Kolkata, Chennai (50%), Non-metro (40%)
}

export interface HRAResult {
  annualBasicPlusDA: number;
  annualHRAReceived: number;
  annualRentPaid: number;
  exemptionRule1ActualHRA: number;
  exemptionRule2RentMinusTenPercentBasic: number;
  exemptionRule3MetroFactorBasic: number;
  exemptHRAAmount: number;
  taxableHRAAmount: number;
}

export function calculateHRA(inputs: HRAInputs): HRAResult {
  const { monthlyBasicSalary, monthlyDearnessAllowance = 0, monthlyHRAReceived, monthlyActualRentPaid, isMetroCity } = inputs;

  const annualBasicPlusDA = (monthlyBasicSalary + monthlyDearnessAllowance) * 12;
  const annualHRAReceived = monthlyHRAReceived * 12;
  const annualRentPaid = monthlyActualRentPaid * 12;

  // Rule 1: Actual HRA received
  const rule1 = annualHRAReceived;

  // Rule 2: Rent paid excess of 10% of salary
  const rule2 = Math.max(0, annualRentPaid - 0.1 * annualBasicPlusDA);

  // Rule 3: 50% of salary for metros, 40% for non-metros
  const metroFactor = isMetroCity ? 0.5 : 0.4;
  const rule3 = annualBasicPlusDA * metroFactor;

  // Statutory exemption is minimum of the three
  const exemptHRAAmount = Math.min(rule1, rule2, rule3);
  const taxableHRAAmount = Math.max(0, annualHRAReceived - exemptHRAAmount);

  return {
    annualBasicPlusDA: Math.round(annualBasicPlusDA),
    annualHRAReceived: Math.round(annualHRAReceived),
    annualRentPaid: Math.round(annualRentPaid),
    exemptionRule1ActualHRA: Math.round(rule1),
    exemptionRule2RentMinusTenPercentBasic: Math.round(rule2),
    exemptionRule3MetroFactorBasic: Math.round(rule3),
    exemptHRAAmount: Math.round(exemptHRAAmount),
    taxableHRAAmount: Math.round(taxableHRAAmount),
  };
}

// --- 32. GST (Goods and Services Tax) Calculator ---
export interface GSTInputs {
  amount: number;
  gstRate: number; // 0, 5, 12, 18, 28
  mode: 'exclusive' | 'inclusive'; // exclusive = add GST to price; inclusive = price includes GST
  isInterstate?: boolean; // IGST vs CGST+SGST
}

export interface GSTResult {
  originalAmount: number;
  netBaseAmount: number;
  gstRate: number;
  totalGSTAmount: number;
  cgstAmount: number;
  sgstAmount: number;
  igstAmount: number;
  grossTotalAmount: number;
}

export function calculateGST(inputs: GSTInputs): GSTResult {
  const { amount, gstRate, mode, isInterstate = false } = inputs;
  const rate = Math.max(0, gstRate) / 100;

  let netBaseAmount = 0;
  let totalGSTAmount = 0;
  let grossTotalAmount = 0;

  if (mode === 'exclusive') {
    netBaseAmount = amount;
    totalGSTAmount = amount * rate;
    grossTotalAmount = netBaseAmount + totalGSTAmount;
  } else {
    // Inclusive: Amount is Gross
    grossTotalAmount = amount;
    netBaseAmount = amount / (1 + rate);
    totalGSTAmount = grossTotalAmount - netBaseAmount;
  }

  let cgstAmount = 0;
  let sgstAmount = 0;
  let igstAmount = 0;

  if (isInterstate) {
    igstAmount = totalGSTAmount;
  } else {
    cgstAmount = totalGSTAmount / 2;
    sgstAmount = totalGSTAmount / 2;
  }

  return {
    originalAmount: amount,
    netBaseAmount: Math.round(netBaseAmount * 100) / 100,
    gstRate,
    totalGSTAmount: Math.round(totalGSTAmount * 100) / 100,
    cgstAmount: Math.round(cgstAmount * 100) / 100,
    sgstAmount: Math.round(sgstAmount * 100) / 100,
    igstAmount: Math.round(igstAmount * 100) / 100,
    grossTotalAmount: Math.round(grossTotalAmount * 100) / 100,
  };
}

// --- 33. Gratuity Calculator ---
export interface GratuityInputs {
  lastDrawnMonthlyBasicPlusDA: number;
  yearsOfContinuousService: number; // in years
  isCoveredUnderGratuityAct?: boolean; // defaults to true
}

export interface GratuityResult {
  monthlyBasicSalary: number;
  tenureYears: number;
  isEligible: boolean; // minimum 5 years required by law
  calculatedGratuity: number;
  statutoryMaxCap: number; // ₹20 Lakh
  payableGratuity: number;
  formulaDescription: string;
}

export function calculateGratuity(inputs: GratuityInputs): GratuityResult {
  const { lastDrawnMonthlyBasicPlusDA, yearsOfContinuousService, isCoveredUnderGratuityAct = true } = inputs;
  const isEligible = yearsOfContinuousService >= 5;

  let calculatedGratuity = 0;
  let formulaDescription = '';

  if (isCoveredUnderGratuityAct) {
    // Formula under 1972 Act: (15 * Last Basic * Tenure) / 26
    calculatedGratuity = (15 * lastDrawnMonthlyBasicPlusDA * yearsOfContinuousService) / 26;
    formulaDescription = '(15 × Last Drawn Monthly Basic & DA × Service Years) ÷ 26 working days';
  } else {
    // Not covered under Act: (15 * Last Basic * Tenure) / 30
    calculatedGratuity = (15 * lastDrawnMonthlyBasicPlusDA * yearsOfContinuousService) / 30;
    formulaDescription = '(15 × Last Drawn Monthly Basic & DA × Service Years) ÷ 30 days';
  }

  const statutoryMaxCap = GRATUITY_CONFIG.statutoryMaxCap;
  const payableGratuity = isEligible ? Math.min(statutoryMaxCap, Math.round(calculatedGratuity)) : 0;

  return {
    monthlyBasicSalary: lastDrawnMonthlyBasicPlusDA,
    tenureYears: yearsOfContinuousService,
    isEligible,
    calculatedGratuity: Math.round(calculatedGratuity),
    statutoryMaxCap,
    payableGratuity,
    formulaDescription,
  };
}

// --- 34. TDS (Tax Deducted at Source) Calculator ---
export interface TDSInputs {
  paymentCategory: '194A_interest' | '194C_contractor' | '194J_professional' | '194I_rent_land' | '194H_brokerage';
  paymentAmount: number;
  isPanFurnished?: boolean; // if false, 20% flat u/s 206AA
}

export interface TDSResult {
  categoryCode: string;
  categoryDescription: string;
  thresholdLimit: number;
  standardTdsRate: number;
  appliedTdsRate: number;
  tdsAmount: number;
  netPayableAmount: number;
  isThresholdCrossed: boolean;
}

export const TDS_SECTIONS_CONFIG: Record<string, { desc: string; threshold: number; rate: number }> = {
  '194A_interest': { desc: 'Section 194A: Bank / NBFC Interest', threshold: 40000, rate: 10 },
  '194C_contractor': { desc: 'Section 194C: Payment to Contractors', threshold: 100000, rate: 2 },
  '194J_professional': { desc: 'Section 194J: Professional or Technical Fees', threshold: 30000, rate: 10 },
  '194I_rent_land': { desc: 'Section 194I: Rent of Land or Building', threshold: 240000, rate: 10 },
  '194H_brokerage': { desc: 'Section 194H: Commission or Brokerage', threshold: 15000, rate: 5 },
};

export function calculateTDS(inputs: TDSInputs): TDSResult {
  const { paymentCategory, paymentAmount, isPanFurnished = true } = inputs;
  const section = TDS_SECTIONS_CONFIG[paymentCategory] || TDS_SECTIONS_CONFIG['194J_professional'];

  const isThresholdCrossed = paymentAmount > section.threshold;
  let appliedRate = 0;

  if (!isPanFurnished) {
    // Section 206AA: Higher of specified rate or 20%
    appliedRate = 20;
  } else if (isThresholdCrossed) {
    appliedRate = section.rate;
  }

  const tdsAmount = (paymentAmount * appliedRate) / 100;
  const netPayable = paymentAmount - tdsAmount;

  return {
    categoryCode: paymentCategory.split('_')[0],
    categoryDescription: section.desc,
    thresholdLimit: section.threshold,
    standardTdsRate: section.rate,
    appliedTdsRate: appliedRate,
    tdsAmount: Math.round(tdsAmount),
    netPayableAmount: Math.round(netPayable),
    isThresholdCrossed,
  };
}

// --- 35. Salary / CTC to In-Hand Take-Home Calculator ---
export interface SalaryInputs {
  annualCTC: number;
  bonusOrVariablePay?: number;
  isProvidentFundOpted?: boolean; // defaults to true
  annualProfessionalTax?: number; // defaults to ₹2,400 standard
}

export interface SalaryResult {
  annualCTC: number;
  monthlyGrossSalary: number;
  annualGrossSalary: number;
  monthlyDeductions: {
    employeePF: number;
    professionalTax: number;
    estimatedTDS: number;
    total: number;
  };
  monthlyInHandSalary: number;
  annualInHandSalary: number;
  annualDeductionsTotal: number;
}

export function calculateSalary(inputs: SalaryInputs): SalaryResult {
  const { annualCTC, bonusOrVariablePay = 0, isProvidentFundOpted = true, annualProfessionalTax = 2400 } = inputs;

  // Standard corporate Indian structure:
  // CTC = Fixed Gross + Employer PF (if opted) + Gratuity (approx 4.81% of basic) + Variable
  const fixedPay = Math.max(0, annualCTC - bonusOrVariablePay);
  // Basic is typically 40% of fixed pay
  const annualBasic = fixedPay * 0.40;
  const monthlyBasic = annualBasic / 12;

  // Employee PF: 12% of basic
  const annualEmployeePF = isProvidentFundOpted ? annualBasic * 0.12 : 0;
  const monthlyEmployeePF = annualEmployeePF / 12;

  // Monthly Gross Salary before deductions
  const monthlyGrossSalary = fixedPay / 12;

  // Estimated Tax under New Regime FY 2024-25
  const taxResult = calculateIncomeTax({ annualGrossIncome: fixedPay });
  const annualTDS = taxResult.newRegime.totalTaxPayable;
  const monthlyTDS = annualTDS / 12;

  const monthlyPT = annualProfessionalTax / 12;
  const totalMonthlyDeductions = monthlyEmployeePF + monthlyPT + monthlyTDS;
  const monthlyInHand = Math.max(0, monthlyGrossSalary - totalMonthlyDeductions);

  return {
    annualCTC,
    monthlyGrossSalary: Math.round(monthlyGrossSalary),
    annualGrossSalary: Math.round(fixedPay),
    monthlyDeductions: {
      employeePF: Math.round(monthlyEmployeePF),
      professionalTax: Math.round(monthlyPT),
      estimatedTDS: Math.round(monthlyTDS),
      total: Math.round(totalMonthlyDeductions),
    },
    monthlyInHandSalary: Math.round(monthlyInHand),
    annualInHandSalary: Math.round(monthlyInHand * 12),
    annualDeductionsTotal: Math.round(totalMonthlyDeductions * 12),
  };
}

