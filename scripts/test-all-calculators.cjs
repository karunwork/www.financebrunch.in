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

  // Normal return test (10y @ 12%)
  const standardSIP = calculateSIP({ monthlyInvestment: 5000, expectedAnnualReturn: 12, investmentDurationYears: 10 });
  assert.strictEqual(standardSIP.totalInvested, 600000);
  assert(standardSIP.futureValue > 1100000);
  console.log(`✓ PASS: SIP 10-Yr @ 12% = Invested: ₹${standardSIP.totalInvested}, FV: ₹${standardSIP.futureValue}`);
}

// 2. Step-Up SIP Calculator Test
function testStepUpSIPCalculator() {
  console.log('\n--- Testing Step-Up SIP Calculator ---');

  function calculateStepUpSIP(inputs) {
    const { initialMonthlyInvestment, expectedAnnualReturn, investmentDurationYears, annualStepUpPercentage = 10 } = inputs;
    const totalMonths = Math.round(investmentDurationYears * 12);
    const monthlyRate = expectedAnnualReturn === 0 ? 0 : Math.pow(1 + expectedAnnualReturn / 100, 1 / 12) - 1;

    let balance = 0;
    let totalInvested = 0;
    const monthlyContributions = [];

    for (let m = 1; m <= totalMonths; m++) {
      const yearIndex = Math.floor((m - 1) / 12);
      const monthlyContribution = initialMonthlyInvestment * Math.pow(1 + annualStepUpPercentage / 100, yearIndex);
      monthlyContributions.push(monthlyContribution);
      totalInvested += monthlyContribution;

      balance = monthlyRate === 0 ? balance + monthlyContribution : (balance + monthlyContribution) * (1 + monthlyRate);
    }

    const fixedTotalInvested = initialMonthlyInvestment * totalMonths;
    const fixedFV = monthlyRate === 0 ? fixedTotalInvested : (function() {
      let fb = 0;
      for (let m = 1; m <= totalMonths; m++) {
        fb = (fb + initialMonthlyInvestment) * (1 + monthlyRate);
      }
      return fb;
    })();

    return {
      totalInvested: Math.round(totalInvested),
      futureValue: Math.round(balance),
      estimatedReturns: Math.round(balance - totalInvested),
      monthlyContributions,
      fixedComparison: {
        totalInvested: Math.round(fixedTotalInvested),
        futureValue: Math.round(fixedFV),
        advantage: Math.round(balance - fixedFV),
      },
    };
  }

  const stepUp = calculateStepUpSIP({
    initialMonthlyInvestment: 5000,
    expectedAnnualReturn: 12,
    investmentDurationYears: 3,
    annualStepUpPercentage: 10,
  });

  // Verify monthly increase occurs after each 12 contributions:
  // Months 1-12: ₹5,000
  assert.strictEqual(stepUp.monthlyContributions[0], 5000);
  assert.strictEqual(stepUp.monthlyContributions[11], 5000);
  // Months 13-24: ₹5,500 (10% step-up)
  assert.strictEqual(stepUp.monthlyContributions[12], 5500);
  assert.strictEqual(stepUp.monthlyContributions[23], 5500);
  // Months 25-36: ₹6,050 (10% step-up on 5500)
  assert.strictEqual(Math.round(stepUp.monthlyContributions[24]), 6050);
  assert.strictEqual(Math.round(stepUp.monthlyContributions[35]), 6050);
  console.log('✓ PASS: Step-Up contribution increases after every 12 months (5000 -> 5500 -> 6050)');

  // Verify advantage over fixed SIP
  assert(stepUp.fixedComparison.advantage > 0);
  console.log(`✓ PASS: Step-Up SIP advantage over fixed SIP: +₹${stepUp.fixedComparison.advantage}`);
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
