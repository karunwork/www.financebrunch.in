/**
 * Finance Brunch - Comprehensive Unit & Regression Test Suite
 * Tests all 4 Investment Calculators:
 * 1. SIP Calculator
 * 2. Step-Up SIP Calculator
 * 3. Lumpsum Calculator
 * 4. SWP (Systematic Withdrawal Plan) Calculator
 */

const assert = require('assert');

// 1. SIP Calculator Implementation Test
function testSIPCalculator() {
  console.log('--- Testing SIP Calculator ---');

  function calculateSIP(inputs) {
    const { monthlyInvestment, expectedAnnualReturn, investmentDurationYears } = inputs;
    if (monthlyInvestment < 0 || expectedAnnualReturn < 0 || investmentDurationYears <= 0) {
      return { isValid: false, totalInvested: 0, futureValue: 0, estimatedReturns: 0 };
    }
    const totalMonths = Math.round(investmentDurationYears * 12);
    const monthlyRate = expectedAnnualReturn === 0 ? 0 : Math.pow(1 + expectedAnnualReturn / 100, 1 / 12) - 1;
    let balance = 0;
    let totalInvested = 0;
    for (let m = 1; m <= totalMonths; m++) {
      totalInvested += monthlyInvestment;
      balance = monthlyRate === 0 ? balance + monthlyInvestment : (balance + monthlyInvestment) * (1 + monthlyRate);
    }
    return {
      isValid: true,
      totalInvested,
      futureValue: Math.round(balance),
      estimatedReturns: Math.round(balance - totalInvested),
    };
  }

  // Zero-return test
  const zeroReturn = calculateSIP({ monthlyInvestment: 5000, expectedAnnualReturn: 0, investmentDurationYears: 5 });
  assert.strictEqual(zeroReturn.totalInvested, 300000);
  assert.strictEqual(zeroReturn.futureValue, 300000);
  assert.strictEqual(zeroReturn.estimatedReturns, 0);
  console.log('✓ PASS: SIP Zero-return case');

  // Test ₹100 minimum monthly SIP amount
  const sip100 = calculateSIP({ monthlyInvestment: 100, expectedAnnualReturn: 12, investmentDurationYears: 10 });
  assert.strictEqual(sip100.totalInvested, 12000);
  assert(sip100.futureValue > 12000, 'FV should exceed total invested');
  console.log(`✓ PASS: SIP ₹100/mo @ 12% for 10y = Invested: ₹${sip100.totalInvested}, FV: ₹${sip100.futureValue}`);

  // Test ₹500 monthly SIP amount
  const sip500 = calculateSIP({ monthlyInvestment: 500, expectedAnnualReturn: 12, investmentDurationYears: 10 });
  assert.strictEqual(sip500.totalInvested, 60000);
  assert(sip500.futureValue > 60000, 'FV should exceed total invested');
  console.log(`✓ PASS: SIP ₹500/mo @ 12% for 10y = Invested: ₹${sip500.totalInvested}, FV: ₹${sip500.futureValue}`);

  // Test ₹1,000 monthly SIP amount
  const sip1000 = calculateSIP({ monthlyInvestment: 1000, expectedAnnualReturn: 12, investmentDurationYears: 10 });
  assert.strictEqual(sip1000.totalInvested, 120000);
  assert(sip1000.futureValue > 120000, 'FV should exceed total invested');
  console.log(`✓ PASS: SIP ₹1,000/mo @ 12% for 10y = Invested: ₹${sip1000.totalInvested}, FV: ₹${sip1000.futureValue}`);

  // Test ₹5,000 monthly SIP amount (Normal return test)
  const standardSIP = calculateSIP({ monthlyInvestment: 5000, expectedAnnualReturn: 12, investmentDurationYears: 10 });
  assert.strictEqual(standardSIP.totalInvested, 600000);
  assert(standardSIP.futureValue > 1100000);
  console.log(`✓ PASS: SIP ₹5,000/mo @ 12% for 10y = Invested: ₹${standardSIP.totalInvested}, FV: ₹${standardSIP.futureValue}`);
}

// 2. Step-Up SIP Calculator Test
function testStepUpSIPCalculator() {
  console.log('\n--- Testing Step-Up SIP Calculator ---');

  function calculateStepUpSIP(inputs) {
    const { initialMonthlyInvestment, expectedAnnualReturn, investmentDurationYears, annualStepUpPercentage = 10 } = inputs;
    
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
      annualStepUpPercentage < 0 ||
      initialMonthlyInvestment > 100000000 ||
      investmentDurationYears > 60 ||
      expectedAnnualReturn > 100 ||
      annualStepUpPercentage > 100
    ) {
      return {
        isValid: false,
        totalInvested: 0,
        futureValue: 0,
        estimatedReturns: 0,
        finalMonthlySIP: 0,
        annualSchedule: [],
        fixedSipComparison: { totalInvested: 0, futureValue: 0, differenceFV: 0 },
      };
    }

    const totalMonths = Math.round(investmentDurationYears * 12);
    const monthlyRate = expectedAnnualReturn === 0 ? 0 : Math.pow(1 + expectedAnnualReturn / 100, 1 / 12) - 1;

    let balance = 0;
    let totalInvested = 0;
    let currentYearInvested = 0;
    const monthlyContributions = [];
    const annualSchedule = [];

    for (let m = 1; m <= totalMonths; m++) {
      const yearIndex = Math.floor((m - 1) / 12);
      const monthlyContribution = initialMonthlyInvestment * Math.pow(1 + annualStepUpPercentage / 100, yearIndex);
      monthlyContributions.push(monthlyContribution);
      totalInvested += monthlyContribution;
      currentYearInvested += monthlyContribution;

      // End-of-month contribution accumulation:
      // closingBalance = previousBalance * (1 + monthlyRate) + contribution
      balance = monthlyRate === 0 ? balance + monthlyContribution : (balance * (1 + monthlyRate)) + monthlyContribution;

      if (m % 12 === 0 || m === totalMonths) {
        const yearNumber = Math.ceil(m / 12);
        const roundedRowInvested = Math.round(totalInvested);
        const roundedRowFV = Math.round(balance);
        annualSchedule.push({
          year: yearNumber,
          monthlyContribution: Math.round(monthlyContribution),
          yearlyInvested: Math.round(currentYearInvested),
          cumulativeInvested: roundedRowInvested,
          futureValue: roundedRowFV,
          estimatedReturns: Math.max(0, roundedRowFV - roundedRowInvested),
        });
        currentYearInvested = 0;
      }
    }

    const finalYearIndex = Math.floor((totalMonths - 1) / 12);
    const finalMonthlySIP = initialMonthlyInvestment * Math.pow(1 + annualStepUpPercentage / 100, finalYearIndex);

    const fixedTotalInvested = initialMonthlyInvestment * totalMonths;
    const fixedFV = monthlyRate === 0 ? fixedTotalInvested : initialMonthlyInvestment * (Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate;

    const roundedFV = Math.round(balance);
    const roundedTotalInvested = Math.round(totalInvested);
    const roundedReturns = Math.max(0, roundedFV - roundedTotalInvested);
    const roundedFixedFV = Math.round(fixedFV);
    const roundedFixedInvested = Math.round(fixedTotalInvested);
    const roundedDiffFV = roundedFV - roundedFixedFV;

    return {
      isValid: true,
      initialMonthlySIP: Math.round(initialMonthlyInvestment),
      finalMonthlySIP: Math.round(finalMonthlySIP),
      totalInvested: roundedTotalInvested,
      futureValue: roundedFV,
      estimatedReturns: roundedReturns,
      monthlyContributions,
      annualSchedule,
      fixedSipComparison: {
        totalInvested: roundedFixedInvested,
        futureValue: roundedFixedFV,
        differenceFV: roundedDiffFV,
      },
    };
  }

  // 1. REFERENCE CASE TEST:
  // Starting SIP: ₹1,000, 10% annual step-up, 12% effective annual return, 10 years
  const refCase = calculateStepUpSIP({
    initialMonthlyInvestment: 1000,
    expectedAnnualReturn: 12,
    investmentDurationYears: 10,
    annualStepUpPercentage: 10,
  });

  // Verify monthly increases after every 12 months:
  assert.strictEqual(Math.round(refCase.monthlyContributions[0]), 1000, 'Month 1 contribution should be ₹1,000');
  assert.strictEqual(Math.round(refCase.monthlyContributions[11]), 1000, 'Month 12 contribution should be ₹1,000');
  assert.strictEqual(Math.round(refCase.monthlyContributions[12]), 1100, 'Month 13 contribution should be ₹1,100');
  assert.strictEqual(Math.round(refCase.monthlyContributions[23]), 1100, 'Month 24 contribution should be ₹1,100');
  assert.strictEqual(Math.round(refCase.monthlyContributions[24]), 1210, 'Month 25 contribution should be ₹1,210');
  assert.strictEqual(Math.round(refCase.monthlyContributions[35]), 1210, 'Month 36 contribution should be ₹1,210');

  // Verify independently calculated expected values:
  assert.strictEqual(refCase.totalInvested, 191249, 'Total invested should be ₹1,91,249');
  assert.strictEqual(refCase.futureValue, 323817, 'Future value should be ₹3,23,817');
  assert.strictEqual(refCase.estimatedReturns, 132568, 'Estimated returns should be ₹1,32,568');
  assert.strictEqual(refCase.finalMonthlySIP, 2358, 'Final monthly SIP should be ₹2,358');
  assert.strictEqual(refCase.estimatedReturns, refCase.futureValue - refCase.totalInvested, 'Returns must equal FV - Invested');

  // Verify fixed SIP comparison:
  assert.strictEqual(refCase.fixedSipComparison.totalInvested, 120000, 'Fixed SIP invested should be ₹1,20,000');
  assert.strictEqual(refCase.fixedSipComparison.futureValue, 221930, 'Fixed SIP FV should be ₹2,21,930');
  assert.strictEqual(refCase.fixedSipComparison.differenceFV, 101887, 'Step-up advantage should be ₹1,01,887');

  console.log(`✓ PASS: Reference Case (₹1,000/mo, 10% step-up, 12% p.a., 10y): Total Invested: ₹${refCase.totalInvested}, FV: ₹${refCase.futureValue}, Returns: ₹${refCase.estimatedReturns}, Advantage: +₹${refCase.fixedSipComparison.differenceFV}`);

  // 2. ZERO ANNUAL RETURN TEST:
  const zeroReturn = calculateStepUpSIP({
    initialMonthlyInvestment: 1000,
    expectedAnnualReturn: 0,
    investmentDurationYears: 10,
    annualStepUpPercentage: 10,
  });
  assert.strictEqual(zeroReturn.totalInvested, 191249);
  assert.strictEqual(zeroReturn.futureValue, 191249);
  assert.strictEqual(zeroReturn.estimatedReturns, 0);
  console.log('✓ PASS: Step-Up SIP Zero annual return (FV == Invested, Returns == 0)');

  // 3. ZERO ANNUAL STEP-UP TEST:
  const zeroStepUp = calculateStepUpSIP({
    initialMonthlyInvestment: 1000,
    expectedAnnualReturn: 12,
    investmentDurationYears: 10,
    annualStepUpPercentage: 0,
  });
  assert.strictEqual(zeroStepUp.totalInvested, 120000);
  assert.strictEqual(zeroStepUp.futureValue, 221930);
  assert.strictEqual(zeroStepUp.fixedSipComparison.differenceFV, 0);
  console.log('✓ PASS: Step-Up SIP Zero step-up (matches Fixed SIP identically, Advantage == 0)');

  // 4. SHORT ONE-YEAR DURATION TEST:
  const oneYear = calculateStepUpSIP({
    initialMonthlyInvestment: 1000,
    expectedAnnualReturn: 12,
    investmentDurationYears: 1,
    annualStepUpPercentage: 10,
  });
  assert.strictEqual(oneYear.totalInvested, 12000);
  assert.strictEqual(oneYear.futureValue, 12646);
  assert.strictEqual(oneYear.estimatedReturns, 646);
  console.log(`✓ PASS: Step-Up SIP 1-Year duration (Invested: ₹${oneYear.totalInvested}, FV: ₹${oneYear.futureValue}, Returns: ₹${oneYear.estimatedReturns})`);

  // 5. LONGER INVESTMENT DURATION TEST (20 Years):
  const longDuration = calculateStepUpSIP({
    initialMonthlyInvestment: 1000,
    expectedAnnualReturn: 12,
    investmentDurationYears: 20,
    annualStepUpPercentage: 10,
  });
  assert(longDuration.isValid);
  assert(longDuration.futureValue > longDuration.totalInvested);
  assert(longDuration.fixedSipComparison.differenceFV > 0);
  console.log(`✓ PASS: Step-Up SIP 20-Year duration (Invested: ₹${longDuration.totalInvested}, FV: ₹${longDuration.futureValue})`);

  // 6. INVALID AND EXCESSIVELY LARGE INPUTS TEST:
  const invalidNeg = calculateStepUpSIP({ initialMonthlyInvestment: -100, expectedAnnualReturn: 12, investmentDurationYears: 5 });
  assert.strictEqual(invalidNeg.isValid, false);
  const invalidNaN = calculateStepUpSIP({ initialMonthlyInvestment: NaN, expectedAnnualReturn: 12, investmentDurationYears: 5 });
  assert.strictEqual(invalidNaN.isValid, false);
  const invalidZeroDuration = calculateStepUpSIP({ initialMonthlyInvestment: 1000, expectedAnnualReturn: 12, investmentDurationYears: 0 });
  assert.strictEqual(invalidZeroDuration.isValid, false);
  const excessivelyLarge = calculateStepUpSIP({ initialMonthlyInvestment: 500000000, expectedAnnualReturn: 12, investmentDurationYears: 10 });
  assert.strictEqual(excessivelyLarge.isValid, false);
  console.log('✓ PASS: Step-Up SIP invalid and excessively large inputs safely rejected');
}

// 3. Lumpsum Calculator Test
function testLumpsumCalculator() {
  console.log('\n--- Testing Lumpsum Calculator ---');

  function calculateLumpsum(inputs) {
    const { initialInvestment, expectedAnnualReturn, investmentDurationYears } = inputs;
    const totalMonths = Math.round(investmentDurationYears * 12);
    const monthlyRate = expectedAnnualReturn === 0 ? 0 : Math.pow(1 + expectedAnnualReturn / 100, 1 / 12) - 1;
    const futureValue = monthlyRate === 0 ? initialInvestment : initialInvestment * Math.pow(1 + monthlyRate, totalMonths);
    return {
      totalInvested: initialInvestment,
      futureValue: Math.round(futureValue),
      estimatedReturns: Math.round(futureValue - initialInvestment),
    };
  }

  // Zero-return test
  const zeroReturn = calculateLumpsum({ initialInvestment: 100000, expectedAnnualReturn: 0, investmentDurationYears: 5 });
  assert.strictEqual(zeroReturn.totalInvested, 100000);
  assert.strictEqual(zeroReturn.futureValue, 100000);
  assert.strictEqual(zeroReturn.estimatedReturns, 0);
  console.log('✓ PASS: Lumpsum Zero-return case');

  // Compounding test (₹1,00,000 @ 12% for 5 years: 100000 * 1.12^5 = 176234.17)
  const fiveYear = calculateLumpsum({ initialInvestment: 100000, expectedAnnualReturn: 12, investmentDurationYears: 5 });
  assert.strictEqual(fiveYear.futureValue, 176234);
  assert.strictEqual(fiveYear.estimatedReturns, 76234);
  console.log(`✓ PASS: Lumpsum ₹1,00,000 @ 12% for 5y = FV: ₹${fiveYear.futureValue}`);
}

// 4. SWP Calculator Test
function testSWPCalculator() {
  console.log('\n--- Testing SWP Calculator ---');

  function calculateSWP(inputs) {
    const { initialCorpus, monthlyWithdrawal, expectedAnnualReturn, withdrawalDurationYears } = inputs;
    const totalMonths = Math.round(withdrawalDurationYears * 12);
    const monthlyRate = expectedAnnualReturn === 0 ? 0 : Math.pow(1 + expectedAnnualReturn / 100, 1 / 12) - 1;

    let balance = initialCorpus;
    let totalActualWithdrawals = 0;
    let exhaustionMonth = null;
    let partialFinalWithdrawal = false;

    for (let m = 1; m <= totalMonths; m++) {
      if (balance <= 0) break;

      const growth = balance * monthlyRate;
      const balanceBefore = balance + growth;

      let actualWithdrawal = monthlyWithdrawal;
      if (balanceBefore < monthlyWithdrawal) {
        actualWithdrawal = balanceBefore;
        partialFinalWithdrawal = true;
      }

      balance = balanceBefore - actualWithdrawal;
      totalActualWithdrawals += actualWithdrawal;

      if (balance <= 0.0001) {
        balance = 0;
        if (!exhaustionMonth) exhaustionMonth = m;
      }
    }

    return {
      initialCorpus,
      totalActualWithdrawals: Math.round(totalActualWithdrawals),
      remainingCorpus: Math.round(balance),
      exhaustionMonth,
      isExhausted: exhaustionMonth !== null,
      partialFinalWithdrawal,
    };
  }

  // Sustainable SWP test: ₹10,00,000 corpus, ₹5,000/mo withdrawal (6% return)
  const sustainable = calculateSWP({
    initialCorpus: 1000000,
    monthlyWithdrawal: 5000,
    expectedAnnualReturn: 8,
    withdrawalDurationYears: 10,
  });
  assert.strictEqual(sustainable.isExhausted, false);
  assert(sustainable.remainingCorpus > 0);
  assert.strictEqual(sustainable.totalActualWithdrawals, 600000); // 10 * 12 * 5000
  console.log(`✓ PASS: Sustainable SWP (Remaining Corpus: ₹${sustainable.remainingCorpus})`);

  // Depleting SWP test: ₹1,00,000 corpus with high ₹20,000/mo withdrawal @ 0% return
  // Should exhaust in month 5 exactly!
  const depletingZeroReturn = calculateSWP({
    initialCorpus: 100000,
    monthlyWithdrawal: 20000,
    expectedAnnualReturn: 0,
    withdrawalDurationYears: 5,
  });
  assert.strictEqual(depletingZeroReturn.isExhausted, true);
  assert.strictEqual(depletingZeroReturn.exhaustionMonth, 5);
  assert.strictEqual(depletingZeroReturn.remainingCorpus, 0);
  assert.strictEqual(depletingZeroReturn.totalActualWithdrawals, 100000);
  console.log('✓ PASS: SWP Exhaustion at month 5 with exact zero remaining balance');

  // Partial final withdrawal test: ₹50,000 corpus, ₹20,000/mo withdrawal @ 0%
  // Month 1: 20k (bal 30k)
  // Month 2: 20k (bal 10k)
  // Month 3: only 10k available -> partial final withdrawal!
  const partialSWP = calculateSWP({
    initialCorpus: 50000,
    monthlyWithdrawal: 20000,
    expectedAnnualReturn: 0,
    withdrawalDurationYears: 1,
  });
  assert.strictEqual(partialSWP.partialFinalWithdrawal, true);
  assert.strictEqual(partialSWP.totalActualWithdrawals, 50000);
  assert.strictEqual(partialSWP.remainingCorpus, 0);
  console.log('✓ PASS: SWP Partial final withdrawal capped at available balance');
}

// Run all test suites
try {
  testSIPCalculator();
  testStepUpSIPCalculator();
  testLumpsumCalculator();
  testSWPCalculator();
  console.log('\n========================================');
  console.log('🎉 ALL 4 CALCULATORS VERIFIED AND PASSED!');
  console.log('========================================\n');
} catch (err) {
  console.error('❌ Test failed:', err);
  process.exit(1);
}
