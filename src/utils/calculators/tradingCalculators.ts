/**
 * Finance Brunch — Stock Trading & Brokerage Mathematical Engines
 * 
 * 36. Brokerage Calculator (Equity Delivery, Intraday, Futures, Options with full statutory SEBI/STT/GST breakdown)
 * 37. Margin Calculator (SEBI Peak Margin Rules, Leverage & Exposure)
 * 38. MTF (Margin Trading Facility) Calculator (Funded Amount, Daily & Total Interest Cost, Breakeven)
 */

import { STATUTORY_TRADING_CHARGES } from './officialSchemeRates';

// --- 36. Brokerage Calculator ---
export interface BrokerageInputs {
  segment: 'equity_delivery' | 'equity_intraday' | 'equity_futures' | 'equity_options';
  buyPrice: number;
  sellPrice: number;
  quantity: number;
  brokeragePerOrder?: number; // defaults to standard ₹20 per executed order (or 0 for delivery)
}

export interface BrokerageResult {
  segment: string;
  buyTurnover: number;
  sellTurnover: number;
  totalTurnover: number;
  grossProfitLoss: number;
  charges: {
    brokerage: number;
    sttAmount: number;
    exchangeCharges: number;
    sebiCharges: number;
    stampDuty: number;
    gstAmount: number; // 18% on (brokerage + exchange + sebi)
    totalChargesAndTaxes: number;
  };
  netProfitLoss: number;
  breakevenPoints: number; // Price difference needed per share to cover all taxes and charges
}

export function calculateBrokerage(inputs: BrokerageInputs): BrokerageResult {
  const { segment, buyPrice, sellPrice, quantity } = inputs;
  const buyTurnover = buyPrice * quantity;
  const sellTurnover = sellPrice * quantity;
  const totalTurnover = buyTurnover + sellTurnover;
  const grossProfitLoss = sellTurnover - buyTurnover;

  let brokerage = 0;
  let sttRate = 0;
  let exchangeRate = 0;
  let sebiRate = 0;
  let stampDutyRate = 0;
  let sttOnSellOnly = false;

  const defaultBrokerage = inputs.brokeragePerOrder ?? 20;

  if (segment === 'equity_delivery') {
    brokerage = 0; // standard zero delivery brokerage model
    sttRate = STATUTORY_TRADING_CHARGES.equityDelivery.sttRate; // 0.1% on buy & sell
    exchangeRate = STATUTORY_TRADING_CHARGES.equityDelivery.exchangeRate;
    sebiRate = STATUTORY_TRADING_CHARGES.equityDelivery.sebiTurnoverRate;
    stampDutyRate = STATUTORY_TRADING_CHARGES.equityDelivery.stampDutyRate;
  } else if (segment === 'equity_intraday') {
    // ₹20 or 0.05% whichever is lower per trade
    const buyBrok = Math.min(defaultBrokerage, (buyTurnover * 0.05) / 100);
    const sellBrok = Math.min(defaultBrokerage, (sellTurnover * 0.05) / 100);
    brokerage = buyBrok + sellBrok;
    sttRate = STATUTORY_TRADING_CHARGES.equityIntraday.sttRate; // 0.025% on sell only
    sttOnSellOnly = true;
    exchangeRate = STATUTORY_TRADING_CHARGES.equityIntraday.exchangeRate;
    sebiRate = STATUTORY_TRADING_CHARGES.equityIntraday.sebiTurnoverRate;
    stampDutyRate = STATUTORY_TRADING_CHARGES.equityIntraday.stampDutyRate;
  } else if (segment === 'equity_futures') {
    brokerage = defaultBrokerage * 2; // buy + sell
    sttRate = STATUTORY_TRADING_CHARGES.equityFutures.sttRate; // 0.0125% on sell
    sttOnSellOnly = true;
    exchangeRate = STATUTORY_TRADING_CHARGES.equityFutures.exchangeRate;
    sebiRate = STATUTORY_TRADING_CHARGES.equityFutures.sebiTurnoverRate;
    stampDutyRate = STATUTORY_TRADING_CHARGES.equityFutures.stampDutyRate;
  } else {
    // Options
    brokerage = defaultBrokerage * 2;
    sttRate = STATUTORY_TRADING_CHARGES.equityOptions.sttRate;
    sttOnSellOnly = true;
    exchangeRate = STATUTORY_TRADING_CHARGES.equityOptions.exchangeRate;
    sebiRate = STATUTORY_TRADING_CHARGES.equityOptions.sebiTurnoverRate;
    stampDutyRate = STATUTORY_TRADING_CHARGES.equityOptions.stampDutyRate;
  }

  // Statutory Calculations
  const sttBase = sttOnSellOnly ? sellTurnover : totalTurnover;
  const sttAmount = Math.round((sttBase * sttRate) / 100);
  const exchangeCharges = (totalTurnover * exchangeRate) / 100;
  const sebiCharges = (totalTurnover * sebiRate) / 100;
  const stampDuty = Math.round((buyTurnover * stampDutyRate) / 100);

  // GST 18% on Brokerage + Exchange Charges + SEBI charges
  const gstTaxableServices = brokerage + exchangeCharges + sebiCharges;
  const gstAmount = (gstTaxableServices * 18) / 100;

  const totalChargesAndTaxes = brokerage + sttAmount + exchangeCharges + sebiCharges + stampDuty + gstAmount;
  const netProfitLoss = grossProfitLoss - totalChargesAndTaxes;
  const breakevenPoints = quantity > 0 ? totalChargesAndTaxes / quantity : 0;

  return {
    segment: segment.replace('_', ' ').toUpperCase(),
    buyTurnover: Math.round(buyTurnover * 100) / 100,
    sellTurnover: Math.round(sellTurnover * 100) / 100,
    totalTurnover: Math.round(totalTurnover * 100) / 100,
    grossProfitLoss: Math.round(grossProfitLoss * 100) / 100,
    charges: {
      brokerage: Math.round(brokerage * 100) / 100,
      sttAmount: Math.round(sttAmount * 100) / 100,
      exchangeCharges: Math.round(exchangeCharges * 100) / 100,
      sebiCharges: Math.round(sebiCharges * 100) / 100,
      stampDuty: Math.round(stampDuty * 100) / 100,
      gstAmount: Math.round(gstAmount * 100) / 100,
      totalChargesAndTaxes: Math.round(totalChargesAndTaxes * 100) / 100,
    },
    netProfitLoss: Math.round(netProfitLoss * 100) / 100,
    breakevenPoints: Math.round(breakevenPoints * 100) / 100,
  };
}

// --- 37. Margin Calculator ---
export interface MarginInputs {
  productType: 'mis_intraday' | 'cnc_delivery' | 'futures_fno';
  stockPrice: number;
  quantity: number;
  customLeverageMultiplier?: number;
}

export interface MarginResult {
  totalOrderValue: number;
  leverageMultiplier: number;
  marginRequired: number;
  exposureBenefit: number;
  marginPercentRequired: number;
  sebiComplianceNote: string;
}

export function calculateMargin(inputs: MarginInputs): MarginResult {
  const { productType, stockPrice, quantity, customLeverageMultiplier } = inputs;
  const totalOrderValue = stockPrice * quantity;

  let leverage = 1;
  let sebiNote = 'Under SEBI Peak Margin Norms, 100% upfront margin is required for cash delivery.';

  if (productType === 'mis_intraday') {
    // Under SEBI rules, max intraday equity leverage is capped at 5x (minimum 20% VAR+ELM margin)
    leverage = customLeverageMultiplier ?? 5;
    sebiNote = 'Maximum 5x leverage permitted under SEBI peak margin norms (minimum 20% upfront margin).';
  } else if (productType === 'futures_fno') {
    // Futures require exchange mandated SPAN + Exposure margin (approx 20-25%, ~4x-5x)
    leverage = customLeverageMultiplier ?? 4;
    sebiNote = 'Requires exchange-mandated SPAN + Exposure margin upfront.';
  } else {
    leverage = 1;
  }

  const marginRequired = totalOrderValue / leverage;
  const exposureBenefit = totalOrderValue - marginRequired;
  const marginPercentRequired = (marginRequired / totalOrderValue) * 100;

  return {
    totalOrderValue: Math.round(totalOrderValue * 100) / 100,
    leverageMultiplier: leverage,
    marginRequired: Math.round(marginRequired * 100) / 100,
    exposureBenefit: Math.round(exposureBenefit * 100) / 100,
    marginPercentRequired: Math.round(marginPercentRequired * 100) / 100,
    sebiComplianceNote: sebiNote,
  };
}

// --- 38. MTF (Margin Trading Facility) Calculator ---
export interface MTFInputs {
  totalStockPurchaseValue: number;
  investorMarginPercent: number; // typically 25% or 30%
  annualInterestRatePercent?: number; // broker funding rate, typically 12% to 18% p.a., default 14%
  holdingPeriodDays: number;
}

export interface MTFResult {
  totalStockValue: number;
  investorMarginAmount: number;
  brokerFundedAmount: number;
  dailyInterestCost: number;
  totalMTFInterestCost: number;
  totalCostOfTrade: number;
  breakevenStockReturnPercent: number;
}

export function calculateMTF(inputs: MTFInputs): MTFResult {
  const {
    totalStockPurchaseValue,
    investorMarginPercent,
    annualInterestRatePercent = 14,
    holdingPeriodDays,
  } = inputs;

  const marginDecimal = Math.min(90, Math.max(15, investorMarginPercent)) / 100;
  const investorMarginAmount = totalStockPurchaseValue * marginDecimal;
  const brokerFundedAmount = totalStockPurchaseValue - investorMarginAmount;

  // Daily interest = (Funded Amount × Annual Rate) / 365
  const dailyInterest = (brokerFundedAmount * (annualInterestRatePercent / 100)) / 365;
  const totalMTFInterest = dailyInterest * holdingPeriodDays;

  // Breakeven return % needed on the stock to cover the interest cost
  const breakevenStockReturnPercent = (totalMTFInterest / totalStockPurchaseValue) * 100;

  return {
    totalStockValue: Math.round(totalStockPurchaseValue),
    investorMarginAmount: Math.round(investorMarginAmount),
    brokerFundedAmount: Math.round(brokerFundedAmount),
    dailyInterestCost: Math.round(dailyInterest * 100) / 100,
    totalMTFInterestCost: Math.round(totalMTFInterest),
    totalCostOfTrade: Math.round(investorMarginAmount + totalMTFInterest),
    breakevenStockReturnPercent: Math.round(breakevenStockReturnPercent * 100) / 100,
  };
}

