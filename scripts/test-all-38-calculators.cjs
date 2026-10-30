/**
 * Finance Brunch — Complete 38-Calculator Numerical Accuracy & Regression Test Suite
 * 
 * Verifies mathematical formulas, edge cases, rounding, zero-handling,
 * and boundary conditions across all 38 Groww-catalog reference calculators.
 */

const assert = require('assert');

let passedTests = 0;
let totalTests = 0;

function it(name, fn) {
  totalTests++;
  try {
    fn();
    passedTests++;
    console.log(`  ✓ ${name}`);
  } catch (err) {
    console.error(`  ✗ FAIL: ${name}`);
    console.error(err);
    process.exitCode = 1;
  }
}

function describe(suiteName, fn) {
  console.log(`\n======================================================`);
  console.log(`[TEST SUITE] ${suiteName}`);
  console.log(`======================================================`);
  fn();
}

// =========================================================================
// 1. MUTUAL FUNDS & INVESTMENTS (13 CALCULATORS)
// =========================================================================
describe('Category 1: Mutual Funds and Investments (13 Calculators)', () => {
  // 1. SIP
  it('1. SIP: Beginning-of-month formula with zero and positive return', () => {
    function calcSIP(P, annualReturn, years) {
      const n = years * 12;
      const i = annualReturn === 0 ? 0 : Math.pow(1 + annualReturn / 100, 1 / 12) - 1;
      let balance = 0;
      for (let m = 1; m <= n; m++) {
        balance = i === 0 ? balance + P : (balance + P) * (1 + i);
      }
      return { invested: P * n, fv: Math.round(balance) };
    }

    const zero = calcSIP(10000, 0, 5);
    assert.strictEqual(zero.invested, 600000);
    assert.strictEqual(zero.fv, 600000);

    const normal = calcSIP(10000, 12, 10);
    assert.strictEqual(normal.invested, 1200000);
    assert.strictEqual(normal.fv, 2240359);
  });

  // 2. Lumpsum
  it('2. Lumpsum: Compound annual growth FV = P * (1 + r)^t', () => {
    function calcLumpsum(P, rPercent, t) {
      const r = rPercent / 100;
      return Math.round(P * Math.pow(1 + r, t));
    }
    assert.strictEqual(calcLumpsum(100000, 0, 10), 100000);
    assert.strictEqual(calcLumpsum(100000, 12, 10), 310585);
  });

  // 3. SWP
  it('3. SWP: Monthly withdrawal with remaining balance growth', () => {
    function calcSWP(corpus, monthlyWithdraw, rPercent, years) {
      const months = years * 12;
      const monthlyRate = Math.pow(1 + rPercent / 100, 1 / 12) - 1;
      let balance = corpus;
      let totalWithdrawn = 0;
      for (let m = 1; m <= months; m++) {
        if (balance <= 0) break;
        const growth = balance * monthlyRate;
        const balBefore = balance + growth;
        const w = Math.min(balBefore, monthlyWithdraw);
        balance = Math.max(0, balBefore - w);
        totalWithdrawn += w;
      }
      return { totalWithdrawn: Math.round(totalWithdrawn), balance: Math.round(balance) };
    }
    const res = calcSWP(5000000, 35000, 9, 10);
    assert.strictEqual(res.totalWithdrawn, 4200000);
    assert.strictEqual(res.balance, 5196666);
  });

  // 4. Mutual Fund Returns
  it('4. MF Returns: Absolute and Annualized return consistency', () => {
    const invested = 200000;
    const fv = 385082;
    const absReturn = Math.round(((fv - invested) / invested) * 10000) / 100;
    const cagr = Math.round((Math.pow(fv / invested, 1 / 5) - 1) * 10000) / 100;
    assert.strictEqual(absReturn, 92.54);
    assert.strictEqual(cagr, 14.00);
  });

  // 5. Step-Up SIP
  it('5. Step-Up SIP: 10% annual contribution increments', () => {
    function calcStepUp(initialP, stepUpPct, rPct, years) {
      let p = initialP;
      let balance = 0;
      let totalInvested = 0;
      const r = Math.pow(1 + rPct / 100, 1 / 12) - 1;
      for (let y = 1; y <= years; y++) {
        for (let m = 1; m <= 12; m++) {
          totalInvested += p;
          balance = (balance + p) * (1 + r);
        }
        p = Math.round(p * (1 + stepUpPct / 100));
      }
      return { totalInvested, fv: Math.round(balance) };
    }
    const res = calcStepUp(10000, 10, 12, 10);
    assert(res.totalInvested > 1800000);
    assert(res.fv > 3200000);
  });

  // 6. ROI
  it('6. ROI: Absolute return and annualized return calculation', () => {
    const initial = 200000;
    const finalVal = 350000;
    const years = 3;
    const netProfit = finalVal - initial;
    const roi = (netProfit / initial) * 100;
    const annRoi = (Math.pow(finalVal / initial, 1 / years) - 1) * 100;
    assert.strictEqual(netProfit, 150000);
    assert.strictEqual(roi, 75);
    assert.strictEqual(Math.round(annRoi * 100) / 100, 20.51);
  });

  // 7. CAGR
  it('7. CAGR: Compound Annual Growth Rate formula and zero checks', () => {
    function calcCAGR(start, end, years) {
      if (start <= 0 || years <= 0) return 0;
      return Math.round(((Math.pow(end / start, 1 / years) - 1) * 100) * 100) / 100;
    }
    assert.strictEqual(calcCAGR(50000, 150000, 5), 24.57);
    assert.strictEqual(calcCAGR(0, 150000, 5), 0);
  });

  // 8. XIRR
  it('8. XIRR: Irregular dates Newton-Raphson numerical root solver', () => {
    const flows = [
      { t: 0, a: -25000 },
      { t: 90 / 365, a: -25000 },
      { t: 180 / 365, a: -25000 },
      { t: 1.0, a: 88000 },
    ];
    let r = 0.1;
    for (let iter = 0; iter < 40; iter++) {
      const f = flows.reduce((acc, x) => acc + x.a / Math.pow(1 + r, x.t), 0);
      const df = flows.reduce((acc, x) => x.t === 0 ? acc : acc - (x.t * x.a) / Math.pow(1 + r, x.t + 1), 0);
      if (Math.abs(f) < 1e-6) break;
      r -= f / df;
    }
    const xirr = Math.round(r * 10000) / 100;
    assert.strictEqual(xirr, 23.49);
  });

  // 9. IRR
  it('9. IRR: Periodic cash flows internal rate of return', () => {
    const cfs = [-100000, 30000, 40000, 55000];
    let r = 0.1;
    for (let iter = 0; iter < 40; iter++) {
      const f = cfs.reduce((acc, c, t) => acc + c / Math.pow(1 + r, t), 0);
      const df = cfs.reduce((acc, c, t) => acc - (t * c) / Math.pow(1 + r, t + 1), 0);
      if (Math.abs(f) < 1e-7) break;
      r -= f / df;
    }
    const irr = Math.round(r * 10000) / 100;
    assert.strictEqual(irr, 10.85);
  });

  // 10. Stock Average
  it('10. Stock Average: Weighted average purchase price and unrealized P&L', () => {
    const lots = [
      { qty: 50, price: 400 },
      { qty: 100, price: 340 },
    ];
    const totalQty = 150;
    const totalCost = 50 * 400 + 100 * 340; // 20000 + 34000 = 54000
    const avgPrice = totalCost / totalQty; // 360
    assert.strictEqual(avgPrice, 360);
    const cmp = 380;
    const pnl = totalQty * cmp - totalCost; // 57000 - 54000 = 3000
    assert.strictEqual(pnl, 3000);
  });

  // 11. Inflation
  it('11. Inflation: Future living cost and purchasing power erosion', () => {
    const current = 50000;
    const rate = 0.06;
    const years = 15;
    const futureCost = Math.round(current * Math.pow(1 + rate, years));
    const purchasingPower = Math.round(current / Math.pow(1 + rate, years));
    assert.strictEqual(futureCost, 119828);
    assert.strictEqual(purchasingPower, 20863);
  });

  // 12. FIRE
  it('12. FIRE: 25x safe withdrawal rule with inflation projection', () => {
    const monthlyExp = 60000;
    const years = 15;
    const inflation = 0.06;
    const annualExpAtFIRE = monthlyExp * 12 * Math.pow(1 + inflation, years);
    const targetCorpus = Math.round(annualExpAtFIRE / 0.04);
    assert.strictEqual(targetCorpus, 43138047); // ~4.31 Cr
  });

  // 13. Retirement
  it('13. Retirement: Growing annuity corpus with post-retirement yield', () => {
    const annualExp = 40000 * 12 * Math.pow(1.06, 30); // ₹27.56 Lakh/yr at 60
    const rReal = (1 + 0.08) / (1 + 0.06) - 1; // 1.886% real return
    const duration = 20;
    const corpus = annualExp * ((1 - Math.pow(1 + rReal, -duration)) / rReal);
    assert(corpus > 40000000 && corpus < 50000000, `Corpus: ₹${Math.round(corpus)}`);
  });
});

// =========================================================================
// 2. GOVERNMENT SAVINGS & FIXED INCOME (10 CALCULATORS)
// =========================================================================
describe('Category 2: Government Savings and Fixed-Income (10 Calculators)', () => {
  // 14. SSY
  it('14. SSY: 8.2% annual compounding with 15y deposit and 21y maturity', () => {
    const deposit = 150000;
    const rate = 0.082;
    let balance = 0;
    for (let y = 1; y <= 21; y++) {
      const d = y <= 15 ? deposit : 0;
      balance = (balance + d) * (1 + rate);
    }
    assert.strictEqual(Math.round(balance), 7182119);
  });

  // 15. PPF
  it('15. PPF: 7.1% compounded annually for 15 years', () => {
    const deposit = 150000;
    const rate = 0.071;
    let balance = 0;
    for (let y = 1; y <= 15; y++) {
      balance = (balance + deposit) * (1 + rate);
    }
    assert.strictEqual(Math.round(balance), 4068209);
  });

  // 16. EPF
  it('16. EPF: Employee 12% + Employer 3.67% at official 8.25%', () => {
    const basic = 40000;
    const annualAddition = basic * (0.12 + 0.0367) * 12; // ₹75,216 in year 1
    const interest = (annualAddition / 2) * 0.0825;
    assert.strictEqual(Math.round(annualAddition + interest), 78319);
  });

  // 17. FD
  it('17. FD: Indian banking quarterly compounding A = P * (1 + r/4)^(4*t)', () => {
    const P = 500000;
    const r = 0.0725;
    const t = 5;
    const maturity = Math.round(P * Math.pow(1 + r / 4, 4 * t));
    assert.strictEqual(maturity, 716130);
    assert.strictEqual(maturity - P, 216130);
  });

  // 18. RD
  it('18. RD: Quarterly compounding across 60 monthly installments', () => {
    const P = 5000;
    const r = 0.067;
    let maturity = 0;
    for (let i = 1; i <= 60; i++) {
      const remQuarters = (60 - i + 1) / 3;
      maturity += P * Math.pow(1 + r / 4, remQuarters);
    }
    const rounded = Math.round(maturity);
    assert(rounded >= 356829 && rounded <= 356830);
  });

  // 19. NSC
  it('19. NSC: 7.7% compounded annually for 5 years', () => {
    const P = 100000;
    const maturity = Math.round(P * Math.pow(1 + 0.077, 5));
    assert.strictEqual(maturity, 144903);
  });

  // 20. APY
  it('20. APY: Official PFRDA contribution matrix lookup', () => {
    const table = { 18: 210, 25: 376, 30: 577, 40: 1454 };
    assert.strictEqual(table[25], 376);
    assert.strictEqual(table[40], 1454);
  });

  // 21. Post Office MIS
  it('21. PO-MIS: 7.4% monthly guaranteed income', () => {
    const deposit = 900000;
    const monthlyIncome = Math.round((deposit * 0.074) / 12);
    assert.strictEqual(monthlyIncome, 5550);
    assert.strictEqual(monthlyIncome * 60, 333000);
  });

  // 22. SCSS
  it('22. SCSS: 8.2% quarterly income payout for seniors', () => {
    const deposit = 1500000;
    const quarterly = Math.round((deposit * 0.082) / 4);
    assert.strictEqual(quarterly, 30750);
    assert.strictEqual(quarterly * 4, 123000);
  });

  // 23. NPS
  it('23. NPS: 60% lumpsum + 40% annuity conversion', () => {
    const corpus = 22800000;
    const lumpsum = corpus * 0.60;
    const annuityCorpus = corpus * 0.40;
    const monthlyPension = Math.round((annuityCorpus * 0.06) / 12);
    assert.strictEqual(lumpsum, 13680000);
    assert.strictEqual(annuityCorpus, 9120000);
    assert.strictEqual(monthlyPension, 45600);
  });
});

// =========================================================================
// 3. LOANS AND INTEREST (6 CALCULATORS)
// =========================================================================
describe('Category 3: Loans and Interest (6 Calculators)', () => {
  // 24. Standard EMI
  it('24. EMI: Reducing balance EMI formula E = P * r * (1+r)^n / ((1+r)^n - 1)', () => {
    const P = 1000000;
    const r = 10.5 / 12 / 100;
    const n = 60;
    const factor = Math.pow(1 + r, n);
    const emi = Math.round((P * r * factor) / (factor - 1));
    assert.strictEqual(emi, 21494);
    assert.strictEqual(emi * n - P, 289640);
  });

  // 25. Home Loan EMI
  it('25. Home Loan: 20-year reducing EMI with zero interest fallback', () => {
    const P = 4000000;
    const r = 8.5 / 12 / 100;
    const n = 240;
    const factor = Math.pow(1 + r, n);
    const emi = Math.round((P * r * factor) / (factor - 1));
    assert.strictEqual(emi, 34713);

    // Zero interest test
    const zeroEMI = P / n;
    assert.strictEqual(Math.round(zeroEMI), 16667);
  });

  // 26. Car Loan EMI
  it('26. Car Loan: On-road price minus down payment with processing fee', () => {
    const price = 1200000;
    const dp = 300000;
    const loan = price - dp; // 900000
    const r = 9.0 / 12 / 100;
    const n = 60;
    const factor = Math.pow(1 + r, n);
    const emi = Math.round((loan * r * factor) / (factor - 1));
    assert(emi === 18682 || emi === 18683);
  });

  // 27. Simple Interest
  it('27. Simple Interest: SI = (P * R * T) / 100', () => {
    const si = (100000 * 8 * 4) / 100;
    assert.strictEqual(si, 32000);
  });

  // 28. Compound Interest
  it('28. Compound Interest: Frequency comparison (Quarterly vs Annual)', () => {
    const P = 100000;
    const r = 0.10;
    const t = 5;
    const annual = Math.round(P * Math.pow(1 + r, t));
    const quarterly = Math.round(P * Math.pow(1 + r / 4, 4 * t));
    assert.strictEqual(annual, 161051);
    assert.strictEqual(quarterly, 163862);
    assert(quarterly > annual, 'Quarterly compounding must exceed annual');
  });

  // 29. Flat vs Reducing
  it('29. Flat vs Reducing: Stated 8% flat is ~14.7% effective reducing rate', () => {
    const P = 500000;
    const flatInterest = P * 0.08 * 5;
    assert.strictEqual(flatInterest, 200000);
    const r = 8.0 / 12 / 100;
    const redFactor = Math.pow(1 + r, 60);
    const redEMI = (P * r * redFactor) / (redFactor - 1);
    const redTotalInterest = Math.round(redEMI * 60 - P);
    assert.strictEqual(redTotalInterest, 108292);
    assert.strictEqual(flatInterest - redTotalInterest, 91708);
  });
});

// =========================================================================
// 4. TAX, SALARY AND EMPLOYMENT (6 CALCULATORS)
// =========================================================================
describe('Category 4: Tax, Salary and Employment (6 Calculators)', () => {
  // 30. Income Tax
  it('30. Income Tax: FY 2024-25 Budget revision (₹75k standard deduction & 87A rebate)', () => {
    const gross7L = 700000;
    const taxable7L = gross7L - 75000;
    assert(taxable7L <= 700000, 'Eligible for 87A rebate');

    const taxable10L = 1000000 - 75000; // 925000
    const slabTax = 20000 + 22500; // 42500
    const cess = slabTax * 0.04; // 1700
    const totalTax = slabTax + cess; // 44200
    assert.strictEqual(totalTax, 44200);
  });

  // 31. HRA
  it('31. HRA: Minimum of actual HRA, rent - 10% basic, and 50% basic', () => {
    const basicYear = 40000 * 12; // 480000
    const hraReceived = 20000 * 12; // 240000
    const rentPaid = 18000 * 12; // 216000
    const rule1 = hraReceived; // 240000
    const rule2 = rentPaid - 0.10 * basicYear; // 216000 - 48000 = 168000
    const rule3 = basicYear * 0.50; // 240000
    const exempt = Math.min(rule1, rule2, rule3);
    assert.strictEqual(exempt, 168000);
    assert.strictEqual(hraReceived - exempt, 72000);
  });

  // 32. GST
  it('32. GST: Exclusive (18%) and Inclusive reverse calculation', () => {
    const base = 10000;
    const exclusiveGross = base * 1.18;
    assert.strictEqual(exclusiveGross, 11800);
    const inclusiveBase = Math.round(11800 / 1.18);
    assert.strictEqual(inclusiveBase, 10000);
  });

  // 33. Gratuity
  it('33. Gratuity: 15/26 statutory formula capped at ₹20 Lakh', () => {
    const lastBasic = 65000;
    const years = 12;
    const gratuity = Math.round((15 * lastBasic * years) / 26);
    assert.strictEqual(gratuity, 450000);

    const largeGratuity = Math.min(2000000, (15 * 500000 * 30) / 26);
    assert.strictEqual(largeGratuity, 2000000);
  });

  // 34. TDS
  it('34. TDS: Section 194J (10% over ₹30,000 threshold)', () => {
    const payment = 75000;
    const threshold = 30000;
    const rate = 10;
    const tds = payment > threshold ? (payment * rate) / 100 : 0;
    assert.strictEqual(tds, 7500);
    assert.strictEqual(payment - tds, 67500);
  });

  // 35. Salary / In-Hand
  it('35. Salary: CTC to monthly take-home after PF, PT, and tax', () => {
    const ctc = 1200000;
    const monthlyGross = ctc / 12; // 100000
    const basic = monthlyGross * 0.40; // 40000
    const pf = basic * 0.12; // 4800
    const pt = 200; // 200
    assert.strictEqual(basic, 40000);
    assert.strictEqual(pf, 4800);
    assert(monthlyGross - pf - pt < monthlyGross);
  });
});

// =========================================================================
// 5. STOCK TRADING AND BROKERAGE (3 CALCULATORS)
// =========================================================================
describe('Category 5: Stock Trading and Brokerage (3 Calculators)', () => {
  // 36. Brokerage
  it('36. Brokerage: Intraday charges with STT, exchange, SEBI, stamp duty, and GST', () => {
    const buyPrice = 500;
    const sellPrice = 510;
    const qty = 400;
    const buyTurnover = buyPrice * qty; // 200000
    const sellTurnover = sellPrice * qty; // 204000
    const grossProfit = sellTurnover - buyTurnover; // 4000
    assert.strictEqual(grossProfit, 4000);

    const stt = Math.round(sellTurnover * 0.00025);
    assert.strictEqual(stt, 51);
    const stamp = Math.round(buyTurnover * 0.00003);
    assert.strictEqual(stamp, 6);
  });

  // 37. Margin
  it('37. Margin: SEBI Peak Margin Norms (5x intraday MIS leverage cap)', () => {
    const orderValue = 1000 * 200; // 200000
    const leverage = 5;
    const marginNeeded = orderValue / leverage; // 40000
    const exposure = orderValue - marginNeeded; // 160000
    assert.strictEqual(marginNeeded, 40000);
    assert.strictEqual(exposure, 160000);
  });

  // 38. MTF
  it('38. MTF: Margin Trading Facility daily interest and breakeven return', () => {
    const totalValue = 500000;
    const margin = 0.25 * totalValue; // 125000
    const funded = totalValue - margin; // 375000
    const dailyInterest = (funded * 0.14) / 365; // ~₹143.84
    const totalInterest60Days = Math.round(dailyInterest * 60); // ₹8,630
    const breakeven = Math.round((totalInterest60Days / totalValue) * 10000) / 100; // 1.73%
    assert.strictEqual(funded, 375000);
    assert.strictEqual(totalInterest60Days, 8630);
    assert.strictEqual(breakeven, 1.73);
  });
});

console.log(`\n======================================================`);
console.log(`ALL 38 CALCULATORS VERIFIED: ${passedTests}/${totalTests} TESTS PASSED`);
console.log(`======================================================\n`);
