const fs = require('fs');
const { jsPDF } = require('jspdf');

const { registerReportFonts } = require('../src/components/tax-calculator/utils/reportFont.ts');

const logoBuf = fs.readFileSync('public/images/finance-brunch-logo-nobg.png');
const FINANCE_BRUNCH_LOGO_RAW = logoBuf.toString('base64');
const LOGO_ASPECT_RATIO = 891 / 280;

function formatReportCurrency(amount, symbol = '₹') {
  if (isNaN(amount) || !isFinite(amount)) return `${symbol}0`;
  const rounded = Math.round(amount);
  if (rounded < 0) {
    return `-${symbol}${Math.abs(rounded).toLocaleString('en-IN')}`;
  }
  return `${symbol}${rounded.toLocaleString('en-IN')}`;
}

function formatReportPercent(rate) {
  if (isNaN(rate) || !isFinite(rate)) return '0.00%';
  return `${rate.toFixed(2)}%`;
}

const doc = new jsPDF({
  orientation: 'portrait',
  unit: 'mm',
  format: 'a4',
  compress: false,
});

registerReportFonts(doc);

const currency = '₹';
const pageWidth = 210;
const margin = 14;
const contentWidth = pageWidth - margin * 2; // 182mm

// 1. Top-Right Logo: width 42mm, height = 42 / LOGO_ASPECT_RATIO (~13.2mm)
const logoWidth = 42;
const logoHeight = logoWidth / LOGO_ASPECT_RATIO;
const logoX = pageWidth - margin - logoWidth;
const logoY = 10;

doc.addImage(FINANCE_BRUNCH_LOGO_RAW, 'PNG', logoX, logoY, logoWidth, logoHeight);

// 2. Left Header
doc.setFont('ReportFont', 'bold');
doc.setFontSize(9);
doc.setTextColor(2, 132, 199);
doc.text('FINANCE BRUNCH ADVISORY', margin, 15);

doc.setFont('ReportFont', 'bold');
doc.setFontSize(16);
doc.setTextColor(15, 23, 42);
doc.text('Income Tax Calculation Report', margin, 23);

doc.setFont('ReportFont', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(100, 116, 139);
doc.text('Financial Year: 2024-2025  |  AY 2025-2026  |  Generated: 16 October 2026', margin, 29);

// Divider Line
doc.setDrawColor(2, 132, 199);
doc.setLineWidth(0.6);
doc.line(margin, 34, pageWidth - margin, 34);

let currentY = 40;

// 3. Profile & Summary Cards (Side by Side)
const colWidth = (contentWidth - 6) / 2; // 88mm
const boxHeight = 44;

// Box 1: Profile
doc.setFillColor(248, 250, 252);
doc.setDrawColor(226, 232, 240);
doc.setLineWidth(0.3);
doc.roundedRect(margin, currentY, colWidth, boxHeight, 2, 2, 'FD');

doc.setFont('ReportFont', 'bold');
doc.setFontSize(10);
doc.setTextColor(30, 41, 59);
doc.text('Taxpayer Profile', margin + 5, currentY + 7);

doc.setFont('ReportFont', 'normal');
doc.setFontSize(8);
doc.setTextColor(100, 116, 139);
doc.text('Taxpayer Type:', margin + 5, currentY + 14);
doc.text('Country:', margin + 5, currentY + 20);
doc.text('Age Category:', margin + 5, currentY + 26);
doc.text('Regime Selected:', margin + 5, currentY + 32);
doc.text('Assessment Year:', margin + 5, currentY + 38);

doc.setFont('ReportFont', 'bold');
doc.setTextColor(15, 23, 42);
doc.text('Individual', margin + colWidth - 5, currentY + 14, { align: 'right' });
doc.text('INDIA', margin + colWidth - 5, currentY + 20, { align: 'right' });
doc.text('Below 60 Years', margin + colWidth - 5, currentY + 26, { align: 'right' });
doc.text('New Tax Regime', margin + colWidth - 5, currentY + 32, { align: 'right' });
doc.text('AY 2025-2026', margin + colWidth - 5, currentY + 38, { align: 'right' });

// Box 2: Financial Summary
const box2X = margin + colWidth + 6;
doc.setFillColor(248, 250, 252);
doc.roundedRect(box2X, currentY, colWidth, boxHeight, 2, 2, 'FD');

doc.setFont('ReportFont', 'bold');
doc.setFontSize(10);
doc.setTextColor(30, 41, 59);
doc.text('Financial Summary', box2X + 5, currentY + 7);

doc.setFont('ReportFont', 'normal');
doc.setFontSize(8);
doc.setTextColor(100, 116, 139);
doc.text('Gross Annual Income:', box2X + 5, currentY + 14);
doc.text('Deductions Claimed:', box2X + 5, currentY + 20);
doc.text('Net Taxable Income:', box2X + 5, currentY + 26);
doc.text('Total Tax Liability:', box2X + 5, currentY + 32);
doc.text('Effective Tax Rate:', box2X + 5, currentY + 38);

doc.setFont('ReportFont', 'bold');
doc.setTextColor(15, 23, 42);
doc.text(formatReportCurrency(500000, currency), box2X + colWidth - 5, currentY + 14, { align: 'right' });
doc.text(formatReportCurrency(50000, currency), box2X + colWidth - 5, currentY + 20, { align: 'right' });
doc.text(formatReportCurrency(450000, currency), box2X + colWidth - 5, currentY + 26, { align: 'right' });
doc.setTextColor(2, 132, 199);
doc.text(formatReportCurrency(0, currency), box2X + colWidth - 5, currentY + 32, { align: 'right' });
doc.text(formatReportPercent(0.00), box2X + colWidth - 5, currentY + 38, { align: 'right' });

currentY += boxHeight + 8;

// 4. Tax Calculation Breakdown Table
doc.setFont('ReportFont', 'bold');
doc.setFontSize(10.5);
doc.setTextColor(15, 23, 42);
doc.text('Tax Liability Breakdown', margin, currentY);
currentY += 4;

const colRuleX = margin + 115;
const colAmtX = margin + contentWidth - 5;

doc.setFillColor(241, 245, 249);
doc.rect(margin, currentY, contentWidth, 8, 'F');
doc.setFont('ReportFont', 'bold');
doc.setFontSize(8);
doc.setTextColor(51, 65, 85);
doc.text('Component / Tax Head', margin + 5, currentY + 5.2);
doc.text('Calculation Rule', colRuleX, currentY + 5.2, { align: 'right' });
doc.text(`Amount (${currency})`, colAmtX, currentY + 5.2, { align: 'right' });
currentY += 8;

const rows = [
  { name: 'Base Income Tax (Before Cess)', rule: 'Applicable slabs', val: formatReportCurrency(0, currency) },
  { name: 'Section 87A Tax Rebate', rule: 'Rebate benefit', val: `-${formatReportCurrency(0, currency)}` },
  { name: 'Health & Education Cess', rule: '4% on tax liability', val: formatReportCurrency(0, currency) },
  {
    name: 'Total Tax Liability',
    rule: `Effective Rate: ${formatReportPercent(0.00)}`,
    val: formatReportCurrency(0, currency),
    isTotal: true,
  },
];

rows.forEach((r) => {
  if (r.isTotal) {
    doc.setFillColor(239, 246, 255);
    doc.rect(margin, currentY, contentWidth, 8, 'F');
    doc.setFont('ReportFont', 'bold');
    doc.setTextColor(2, 132, 199);
  } else {
    doc.setFont('ReportFont', 'normal');
    doc.setTextColor(15, 23, 42);
  }

  doc.setFontSize(8);
  doc.text(r.name, margin + 5, currentY + 5.2);
  doc.text(r.rule, colRuleX, currentY + 5.2, { align: 'right' });
  doc.text(r.val, colAmtX, currentY + 5.2, { align: 'right' });

  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.2);
  doc.line(margin, currentY + 8, margin + contentWidth, currentY + 8);
  currentY += 8;
});

currentY += 6;

// 5. Old vs New Regime Comparison Box
doc.setFillColor(240, 253, 244);
doc.setDrawColor(187, 247, 208);
doc.setLineWidth(0.3);
doc.roundedRect(margin, currentY, contentWidth, 26, 2, 2, 'FD');

doc.setFont('ReportFont', 'bold');
doc.setFontSize(9.5);
doc.setTextColor(22, 101, 52);
doc.text('Old Regime vs New Regime Analysis', margin + 5, currentY + 6);

doc.setFont('ReportFont', 'normal');
doc.setFontSize(8);
doc.setTextColor(21, 128, 61);
doc.text(`Tax under New Regime: ${formatReportCurrency(0, currency)}`, margin + 5, currentY + 12.5);
doc.text(`Tax under Old Regime: ${formatReportCurrency(0, currency)}`, margin + 5, currentY + 18);

doc.setFont('ReportFont', 'bold');
doc.text(`Recommended: New Tax Regime (Estimated Tax Savings: ${formatReportCurrency(0, currency)})`, margin + 5, currentY + 23.5);

currentY += 32;

// 6. Disclaimer
doc.setFont('ReportFont', 'bold');
doc.setFontSize(7.5);
doc.setTextColor(100, 116, 139);
doc.text('Disclaimer:', margin, currentY);

doc.setFont('ReportFont', 'normal');
doc.setFontSize(7);
const disclaimerBody = 'This calculator provides estimates for informational purposes only and should not be considered professional tax advice. Actual tax liability may vary based on your individual circumstances and applicable tax rules. For an accurate assessment and personalized guidance, please consult a qualified Chartered Accountant or tax professional.';
const splitDisclaimer = doc.splitTextToSize(disclaimerBody, contentWidth);
doc.text(splitDisclaimer, margin, currentY + 4);

const pdfBuf = Buffer.from(doc.output('arraybuffer'));
fs.writeFileSync('scripts/Income_Tax_Calculation_Report_2024-2025.pdf', pdfBuf);
console.log('Successfully created Income_Tax_Calculation_Report_2024-2025.pdf:', pdfBuf.length, 'bytes');
