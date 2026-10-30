/**
 * Finance Brunch — Official Government Scheme Rates & Statutory Constants
 * 
 * Centralized registry of interest rates, contribution limits, tax slabs, and statutory caps
 * compiled from official sources (Ministry of Finance, RBI, EPFO, CBDT, India Post, SEBI).
 * 
 * Effective Date: Q4 FY 2023-24 / FY 2024-25 (Current)
 */

export interface SchemeRateInfo {
  schemeName: string;
  interestRate: number; // in percent p.a.
  compoundingFrequency: 'monthly' | 'quarterly' | 'half-yearly' | 'annually' | 'at-maturity';
  payoutFrequency?: 'monthly' | 'quarterly' | 'at-maturity';
  effectiveDate: string;
  officialSource: string;
  minInvestment: number;
  maxInvestment: number | null; // null if no statutory upper limit
  tenureYears: number | null;
  taxSection?: string;
  notes: string;
}

export const OFFICIAL_GOVERNMENT_RATES: Record<string, SchemeRateInfo> = {
  ssy: {
    schemeName: 'Sukanya Samriddhi Yojana (SSY)',
    interestRate: 8.2,
    compoundingFrequency: 'annually',
    effectiveDate: 'Q4 FY 2023-24 & FY 2024-25 (1 Jan 2024 onwards)',
    officialSource: 'Ministry of Finance Notification F.No.1/4/2019-NS',
    minInvestment: 250,
    maxInvestment: 150000,
    tenureYears: 21, // 21 years from account opening (contributions for first 15 years)
    taxSection: 'Section 80C (EEE status)',
    notes: 'Max 2 accounts per family (for 2 girl children). Deposits permitted up to 15 years from account opening.',
  },
  ppf: {
    schemeName: 'Public Provident Fund (PPF)',
    interestRate: 7.1,
    compoundingFrequency: 'annually',
    effectiveDate: 'FY 2024-25 (Current)',
    officialSource: 'Ministry of Finance Notification F.No.1/4/2019-NS',
    minInvestment: 500,
    maxInvestment: 150000,
    tenureYears: 15,
    taxSection: 'Section 80C (EEE status)',
    notes: '15-year maturity, extendable in blocks of 5 years. Interest calculated monthly on lowest balance between 5th and last day of month.',
  },
  epf: {
    schemeName: 'Employees Provident Fund (EPF)',
    interestRate: 8.25,
    compoundingFrequency: 'annually',
    effectiveDate: 'FY 2023-24 & FY 2024-25 (CBT EPFO Notification)',
    officialSource: 'Employees Provident Fund Organisation (EPFO), Ministry of Labour & Employment',
    minInvestment: 1800,
    maxInvestment: null,
    tenureYears: null, // up to age 58
    taxSection: 'Section 80C',
    notes: 'Employee contributes 12% of basic + DA. Employer contributes 3.67% to EPF and 8.33% to EPS (capped at ₹15,000 basic = ₹1,250/mo).',
  },
  scss: {
    schemeName: 'Senior Citizens Savings Scheme (SCSS)',
    interestRate: 8.2,
    compoundingFrequency: 'quarterly',
    payoutFrequency: 'quarterly',
    effectiveDate: 'FY 2024-25 (Current)',
    officialSource: 'Ministry of Finance Notification F.No.1/4/2019-NS',
    minInvestment: 1000,
    maxInvestment: 3000000, // enhanced limit ₹30 Lakh
    tenureYears: 5,
    taxSection: 'Section 80C',
    notes: 'For citizens aged 60+ (or 55+ for voluntary retirees). Interest paid quarterly on 1st of April, July, October, January.',
  },
  poMis: {
    schemeName: 'Post Office Monthly Income Scheme (PO-MIS)',
    interestRate: 7.4,
    compoundingFrequency: 'monthly',
    payoutFrequency: 'monthly',
    effectiveDate: 'FY 2024-25 (Current)',
    officialSource: 'Department of Posts, Ministry of Communications',
    minInvestment: 1000,
    maxInvestment: 900000, // ₹9 Lakh single, ₹15 Lakh joint
    tenureYears: 5,
    notes: 'Single account limit: ₹9,00,000. Joint account limit: ₹15,00,000. Monthly interest payout directly credited to savings account.',
  },
  nsc: {
    schemeName: 'National Savings Certificate (NSC VIII Issue)',
    interestRate: 7.7,
    compoundingFrequency: 'annually',
    payoutFrequency: 'at-maturity',
    effectiveDate: 'FY 2024-25 (Current)',
    officialSource: 'Ministry of Finance Notification F.No.1/4/2019-NS',
    minInvestment: 1000,
    maxInvestment: null,
    tenureYears: 5,
    taxSection: 'Section 80C',
    notes: 'Compounded annually and paid at maturity. Interest for first 4 years deemed reinvested for 80C tax deduction.',
  },
  fdBankDefault: {
    schemeName: 'Bank Fixed Deposit (Benchmark)',
    interestRate: 7.0, // standard benchmark for 1-5 years
    compoundingFrequency: 'quarterly',
    effectiveDate: 'FY 2024-25 (Major Scheduled Commercial Banks benchmark)',
    officialSource: 'Reserve Bank of India (RBI) Bank Rates & Major Indian Scheduled Banks',
    minInvestment: 1000,
    maxInvestment: null,
    tenureYears: 5,
    notes: 'Quarterly compounding is the standard Indian banking norm. Senior citizens typically get 0.50% extra.',
  },
  rdPostOffice: {
    schemeName: '5-Year Post Office Recurring Deposit (RD)',
    interestRate: 6.7,
    compoundingFrequency: 'quarterly',
    effectiveDate: 'FY 2024-25 (Current)',
    officialSource: 'India Post / Ministry of Finance',
    minInvestment: 100,
    maxInvestment: null,
    tenureYears: 5,
    notes: 'Compounded quarterly. 60 monthly installments.',
  },
  apy: {
    schemeName: 'Atal Pension Yojana (APY)',
    interestRate: 8.0,
    compoundingFrequency: 'annually',
    effectiveDate: 'PFRDA / Ministry of Finance current schedule',
    officialSource: 'Pension Fund Regulatory and Development Authority (PFRDA)',
    minInvestment: 42,
    maxInvestment: 1454,
    tenureYears: null,
    notes: 'Guaranteed pension of ₹1,000, ₹2,000, ₹3,000, ₹4,000, or ₹5,000 per month from age 60 for subscribers joining between age 18 and 40.',
  },
  nps: {
    schemeName: 'National Pension System (NPS)',
    interestRate: 10.0, // expected market-linked return
    compoundingFrequency: 'annually',
    effectiveDate: 'PFRDA NPS Trust Historical Benchmark (8-12%)',
    officialSource: 'PFRDA / National Pension System Trust',
    minInvestment: 500,
    maxInvestment: null,
    tenureYears: null,
    taxSection: 'Section 80CCD(1) & 80CCD(1B) up to ₹50,000 additional',
    notes: 'At age 60, minimum 40% corpus must be utilized to purchase annuity. Up to 60% can be withdrawn tax-free as lumpsum.',
  },
};

/**
 * Statutory Income Tax Slabs FY 2024-25 (AY 2025-26)
 */
export const INCOME_TAX_CONFIG = {
  financialYear: 'FY 2024-25 (Assessment Year 2025-26)',
  newRegime: {
    standardDeduction: 75000, // Union Budget 2024 revision
    rebateLimit: 700000, // 87A rebate makes taxable income up to 7 Lakh zero tax (with marginal relief up to ₹7,27,770)
    maxRebate: 25000,
    slabs: [
      { min: 0, max: 300000, rate: 0 },
      { min: 300000, max: 700000, rate: 5 },
      { min: 700000, max: 1000000, rate: 10 },
      { min: 1000000, max: 1200000, rate: 15 },
      { min: 1200000, max: 1500000, rate: 20 },
      { min: 1500000, max: Infinity, rate: 30 },
    ],
  },
  oldRegime: {
    standardDeduction: 50000,
    rebateLimit: 500000, // 87A rebate for income up to 5 Lakh
    maxRebate: 12500,
    section80CLimit: 150000,
    section80DLimit: 25000, // 50,000 for senior citizens
    slabs: [
      { min: 0, max: 250000, rate: 0 },
      { min: 250000, max: 500000, rate: 5 },
      { min: 500000, max: 1000000, rate: 20 },
      { min: 1000000, max: Infinity, rate: 30 },
    ],
  },
  cessRate: 4, // 4% Health and Education Cess
};

/**
 * Statutory Gratuity Cap (Payment of Gratuity Act, 1972)
 */
export const GRATUITY_CONFIG = {
  statutoryMaxCap: 2000000, // ₹20 Lakh statutory cap
  coveredDaysFactor: 15 / 26,
  uncoveredDaysFactor: 15 / 30,
};

/**
 * Statutory Standard Brokerage and Statutory Charges (SEBI & Exchanges)
 */
export const STATUTORY_TRADING_CHARGES = {
  equityDelivery: {
    sttRate: 0.1, // 0.1% on buy and sell
    exchangeRate: 0.00325, // NSE/BSE ~0.00325%
    sebiTurnoverRate: 0.0001, // ₹10 per crore (0.0001%)
    stampDutyRate: 0.015, // 0.015% on buy only
    gstRate: 18, // 18% on (brokerage + exchange + sebi)
  },
  equityIntraday: {
    sttRate: 0.025, // 0.025% on sell only
    exchangeRate: 0.00325,
    sebiTurnoverRate: 0.0001,
    stampDutyRate: 0.003, // 0.003% on buy only
    gstRate: 18,
  },
  equityFutures: {
    sttRate: 0.0125, // 0.0125% on sell
    exchangeRate: 0.0019,
    sebiTurnoverRate: 0.0001,
    stampDutyRate: 0.002,
    gstRate: 18,
  },
  equityOptions: {
    sttRate: 0.0625, // 0.0625% on sell (premium value)
    exchangeRate: 0.05,
    sebiTurnoverRate: 0.0001,
    stampDutyRate: 0.003,
    gstRate: 18,
  },
};

