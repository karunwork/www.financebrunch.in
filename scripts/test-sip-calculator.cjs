/**
 * Regression & Unit Test Runner for Finance Brunch SIP Calculator
 * Tests Groww calculation convention matching:
 * - Effective monthly rate conversion: i = (1 + r)^(1/12) - 1
 * - Beginning-of-month contribution (annuity due): FV = P * [((1+i)^n - 1) / i] * (1+i)
 */

const assert = require('assert');

function calculateSIP(inputs) {
  const {
    monthlyInvestment,
    expectedAnnualReturn,
    investmentDurationYears,
    isStepUpEnabled = false,
    stepUpPercentage = 10,
  } = inputs;

  if (
    typeof monthlyInvestment !== 'number' ||
    isNaN(monthlyInvestment) ||
    monthlyInvestment < 0 ||
    typeof investmentDurationYears !== 'number' ||
    isNaN(investmentDurationYears) ||
    investmentDurationYears <= 0 ||
    typeof expectedAnnualReturn !== 'number' ||
    isNaN(expectedAnnualReturn) ||
    expectedAnnualReturn < 0 ||
    (isStepUpEnabled && (typeof stepUpPercentage !== 'number' || isNaN(stepUpPercentage) || stepUpPercentage < 0))
  ) {
    return {
      monthlyInvestment: Math.max(0, Number(monthlyInvestment) || 0),
      investmentDurationYears: Math.max(0, Number(investmentDurationYears) || 0),
      investmentDurationMonths: 0,
      expectedAnnualReturn: Math.max(0, Number(expectedAnnualReturn) || 0),
      totalInvested: 0,
      estimatedReturns: 0,
      futureValue: 0,
      isStepUpEnabled: Boolean(isStepUpEnabled),
      stepUpPercentage: Number(stepUpPercentage) || 0,
      yearlyBreakdown: [],
      isValid: false,
      validationError: 'Please provide valid non-negative numbers for all inputs.',
    };
  }

  const totalMonths = Math.round(investmentDurationYears * 12);
  if (totalMonths <= 0) {
    return {
      monthlyInvestment,
      investmentDurationYears,
      investmentDurationMonths: 0,
      expectedAnnualReturn,
      totalInvested: 0,
      estimatedReturns: 0,
      futureValue: 0,
      isStepUpEnabled,
      stepUpPercentage,
      yearlyBreakdown: [],
      isValid: false,
      validationError: 'Duration must be at least 1 month.',
    };
  }

  // Effective monthly return rate conversion matching Groww's convention:
  // i = (1 + expectedAnnualReturn / 100)^(1 / 12) - 1
  const monthlyRate = expectedAnnualReturn === 0
    ? 0
    : Math.pow(1 + expectedAnnualReturn / 100, 1 / 12) - 1;

  let totalInvested = 0;
  let currentBalance = 0;
  let currentYearInvested = 0;
  const yearlyBreakdown = [];

  for (let m = 1; m <= totalMonths; m++) {
    const yearIndex = Math.floor((m - 1) / 12);

    let monthlyContribution = monthlyInvestment;
    if (isStepUpEnabled && stepUpPercentage > 0) {
      monthlyContribution = monthlyInvestment * Math.pow(1 + stepUpPercentage / 100, yearIndex);
    }

    totalInvested += monthlyContribution;
    currentYearInvested += monthlyContribution;

    // Beginning-of-month contribution accumulation:
    if (monthlyRate === 0) {
      currentBalance += monthlyContribution;
    } else {
      currentBalance = (currentBalance + monthlyContribution) * (1 + monthlyRate);
    }

    const isYearBoundary = m % 12 === 0 || m === totalMonths;
    if (isYearBoundary) {
      const yearNumber = Math.ceil(m / 12);
      yearlyBreakdown.push({
        year: yearNumber,
        monthlyContribution,
        yearlyInvested: currentYearInvested,
        cumulativeInvested: totalInvested,
        futureValue: currentBalance,
        estimatedReturns: Math.max(0, currentBalance - totalInvested),
      });
      currentYearInvested = 0;
    }
  }

  const futureValue = currentBalance;
  const estimatedReturns = Math.max(0, futureValue - totalInvested);

  return {
    monthlyInvestment,
    investmentDurationYears,
    investmentDurationMonths: totalMonths,
    expectedAnnualReturn,
    totalInvested,
    estimatedReturns,
    futureValue,
    isStepUpEnabled,
    stepUpPercentage,
    yearlyBreakdown,
    isValid: true,
  };
}

console.log("=== RUNNING SIP CALCULATOR REGRESSION TESTS ===\n");

// Test 1: Zero return tests
console.log("TEST 1: Zero return (0% annual return)");
// 1a: 10 years, ₹5,000
const res1a = calculateSIP({
  monthlyInvestment: 5000,
  expectedAnnualReturn: 0,
  investmentDurationYears: 10,
});
assert.strictEqual(res1a.isValid, true);
assert.strictEqual(res1a.totalInvested, 600000, "10y: Total invested should be ₹6,00,000");
assert.strictEqual(res1a.futureValue, 600000, "10y: Future value should be ₹6,00,000");
assert.strictEqual(res1a.estimatedReturns, 0, "10y: Estimated returns should be ₹0");

// 1b: 25 years, ₹2,000 (300 months)
const res1b = calculateSIP({
  monthlyInvestment: 2000,
  expectedAnnualReturn: 0,
  investmentDurationYears: 25,
});
assert.strictEqual(res1b.isValid, true);
assert.strictEqual(res1b.investmentDurationMonths, 300);
assert.strictEqual(res1b.totalInvested, 600000, "25y: Total invested should be ₹6,00,000");
assert.strictEqual(res1b.futureValue, 600000, "25y: Future value should be ₹6,00,000");
assert.strictEqual(res1b.estimatedReturns, 0, "25y: Estimated returns should be ₹0");
console.log("✓ PASS: Zero return correctly outputs exact totalInvested, FV = totalInvested, estimatedReturns = 0.\n");

// Test 2: 12% annual return tests
console.log("TEST 2: 12% Annual Return Tests");
// 2a: 1 Year, ₹1,000/mo (Groww published benchmark: ₹12,766)
const res2a = calculateSIP({
  monthlyInvestment: 1000,
  expectedAnnualReturn: 12,
  investmentDurationYears: 1,
});
assert.strictEqual(res2a.isValid, true);
assert.strictEqual(res2a.totalInvested, 12000, "1y: Total invested should be ₹12,000");
const i12 = Math.pow(1.12, 1 / 12) - 1;
const expectedFV2a = 1000 * ((Math.pow(1 + i12, 12) - 1) / i12) * (1 + i12);
assert(Math.abs(res2a.futureValue - expectedFV2a) < 0.001, "FV must match Groww annuity due formula");
assert(Math.abs(res2a.futureValue - 12766.50) < 1, "FV should round to ₹12,766 as published on Groww");
console.log(`✓ PASS: 1-Year Groww published example matches: FV = ₹${res2a.futureValue.toFixed(2)} (Groww displays ~₹12,766).`);

// 2b: 10 Years, ₹5,000/mo
const res2b = calculateSIP({
  monthlyInvestment: 5000,
  expectedAnnualReturn: 12,
  investmentDurationYears: 10,
});
assert.strictEqual(res2b.isValid, true);
assert.strictEqual(res2b.totalInvested, 600000, "10y: Total invested should be ₹6,00,000");
const expectedFV2b = 5000 * ((Math.pow(1 + i12, 120) - 1) / i12) * (1 + i12);
assert(Math.abs(res2b.futureValue - expectedFV2b) < 0.001, "FV must match Groww annuity due formula");
assert(Math.abs(res2b.futureValue - 1120179.45) < 1, "FV should be approx ₹11.20 Lakh");
assert.strictEqual(res2b.yearlyBreakdown.length, 10, "Should have 10 years in breakdown");
assert(Math.abs(res2b.yearlyBreakdown[9].futureValue - res2b.futureValue) < 0.001, "Year 10 breakdown FV matches main result");
console.log(`✓ PASS: 10-Year 12% SIP matches: FV = ₹${res2b.futureValue.toFixed(2)}, Invested = ₹${res2b.totalInvested}, Returns = ₹${res2b.estimatedReturns.toFixed(2)}.`);

// 2c: 10 Years, ₹100/mo (Minimum SIP check)
const res2c = calculateSIP({
  monthlyInvestment: 100,
  expectedAnnualReturn: 12,
  investmentDurationYears: 10,
});
assert.strictEqual(res2c.isValid, true);
assert.strictEqual(res2c.totalInvested, 12000, "10y: Total invested should be ₹12,000");
const expectedFV2c = 100 * ((Math.pow(1 + i12, 120) - 1) / i12) * (1 + i12);
assert(Math.abs(res2c.futureValue - expectedFV2c) < 0.001, "FV must match Groww annuity due formula");
console.log(`✓ PASS: 10-Year ₹100/mo SIP matches: FV = ₹${res2c.futureValue.toFixed(2)}, Invested = ₹${res2c.totalInvested}.\n`);

// Test 3: 30% annual return and 25-Year Example (User's comparison case)
console.log("TEST 3: 30% Annual Return — 25 Years, ₹2,000 Monthly (300 contributions)");
const res3 = calculateSIP({
  monthlyInvestment: 2000,
  expectedAnnualReturn: 30,
  investmentDurationYears: 25,
});
assert.strictEqual(res3.isValid, true);
assert.strictEqual(res3.investmentDurationMonths, 300, "Total contributions must be 300");
assert.strictEqual(res3.totalInvested, 600000, "Total invested must be ₹6,00,000");

// Verification against Groww's formula:
const i30 = Math.pow(1 + 30 / 100, 1 / 12) - 1;
const expectedFV3 = 2000 * ((Math.pow(1 + i30, 300) - 1) / i30) * (1 + i30);
assert(Math.abs(res3.futureValue - expectedFV3) < 0.01, "FV matches Groww effective annuity due formula");

const fvCrores = res3.futureValue / 10000000;
const returnsCrores = res3.estimatedReturns / 10000000;
assert(Math.abs(fvCrores - 6.516) < 0.01, `FV should be ~₹6.52 Crore, got ₹${fvCrores.toFixed(2)} Crore`);
assert(Math.abs(returnsCrores - 6.456) < 0.01, `Returns should be ~₹6.46 Crore, got ₹${returnsCrores.toFixed(2)} Crore`);

// Comparison with old nominal formula to document discrepancy:
const r_old_nominal = 30 / 100 / 12;
const old_fv_eom = 2000 * ((Math.pow(1 + r_old_nominal, 300) - 1) / r_old_nominal);
const old_fv_crores = old_fv_eom / 10000000;
console.log(`  - Old Nominal Rate Formula (30%/12 = 2.5%/mo compounded) produced: ₹${old_fv_crores.toFixed(2)} Crore (~₹13.18 Cr).`);
console.log(`  - Groww Effective Rate Formula (i = 1.30^(1/12) - 1 = 2.2104%/mo) produces: ₹${fvCrores.toFixed(2)} Crore (~₹6.52 Cr).`);
console.log(`  - Verified Output: Invested = ₹${res3.totalInvested.toLocaleString('en-IN')}, FV = ₹${res3.futureValue.toFixed(2)} (₹${fvCrores.toFixed(2)} Cr), Returns = ₹${res3.estimatedReturns.toFixed(2)} (₹${returnsCrores.toFixed(2)} Cr).`);
console.log("✓ PASS: 25-Year ₹2,000/mo 30% SIP matches Groww's ~₹6.52 Crore convention!\n");

// Test 4: Step-up disabled matches regular SIP
console.log("TEST 4: Step-up disabled follows regular SIP");
const res4 = calculateSIP({
  monthlyInvestment: 2000,
  expectedAnnualReturn: 30,
  investmentDurationYears: 25,
  isStepUpEnabled: false,
  stepUpPercentage: 10,
});
assert.strictEqual(res4.futureValue, res3.futureValue, "When disabled, step-up matches regular SIP FV");
assert.strictEqual(res4.totalInvested, res3.totalInvested, "When disabled, step-up matches regular SIP invested");
console.log("✓ PASS: Step-up disabled produces identical results to regular SIP.\n");

// Test 5: Step-up enabled (10% annual step-up)
console.log("TEST 5: Step-up enabled (10% annual step-up)");
const res5 = calculateSIP({
  monthlyInvestment: 5000,
  expectedAnnualReturn: 12,
  investmentDurationYears: 10,
  isStepUpEnabled: true,
  stepUpPercentage: 10,
});
assert.strictEqual(res5.isValid, true);
assert(res5.totalInvested > res2b.totalInvested, "Step-up total invested should be greater than regular SIP");
assert(res5.futureValue > res2b.futureValue, "Step-up future value should be greater than regular SIP");
assert.strictEqual(res5.yearlyBreakdown[0].monthlyContribution, 5000, "Year 1 contribution should be ₹5,000");
assert(Math.abs(res5.yearlyBreakdown[1].monthlyContribution - 5500) < 0.01, "Year 2 contribution should be ₹5,500");
console.log(`✓ PASS: Step-up enabled produces Invested = ₹${res5.totalInvested.toFixed(2)}, FV = ₹${res5.futureValue.toFixed(2)}.\n`);

// Test 6: Invalid and edge-case inputs
console.log("TEST 6: Invalid and edge-case inputs");
const res6a = calculateSIP({ monthlyInvestment: -500, expectedAnnualReturn: 12, investmentDurationYears: 10 });
assert.strictEqual(res6a.isValid, false, "Negative monthly investment is rejected");

const res6b = calculateSIP({ monthlyInvestment: 5000, expectedAnnualReturn: 12, investmentDurationYears: 0 });
assert.strictEqual(res6b.isValid, false, "Zero duration is rejected");

const res6c = calculateSIP({ monthlyInvestment: NaN, expectedAnnualReturn: 12, investmentDurationYears: 10 });
assert.strictEqual(res6c.isValid, false, "NaN input is rejected gracefully");
assert(!isNaN(res6c.futureValue), "FV should not be NaN");

console.log("✓ PASS: Invalid inputs handled safely without NaN or crash.\n");

console.log("ALL SIP CALCULATOR REGRESSION TESTS PASSED SUCCESSFULLY! 🎉");
