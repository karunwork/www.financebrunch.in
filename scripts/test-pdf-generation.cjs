const fs = require('fs');
const { jsPDF } = require('jspdf');

// Load the embedded Verdana fonts
const regPath = 'C:\\Windows\\Fonts\\verdana.ttf';
const boldPath = 'C:\\Windows\\Fonts\\verdanab.ttf';

const regBase64 = fs.readFileSync(regPath).toString('base64');
const boldBase64 = fs.readFileSync(boldPath).toString('base64');

function generateTestPdf(scenarioName, sampleData) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: false, // uncompressed for inspection
  });

  // Register Unicode TrueType fonts
  doc.addFileToVFS('ReportFont-Regular.ttf', regBase64);
  doc.addFont('ReportFont-Regular.ttf', 'ReportFont', 'normal');
  doc.addFileToVFS('ReportFont-Bold.ttf', boldBase64);
  doc.addFont('ReportFont-Bold.ttf', 'ReportFont', 'bold');
  doc.setFont('ReportFont', 'normal');

  const pageWidth = 210;
  const margin = 14;
  const contentWidth = pageWidth - margin * 2; // 182mm
  const currency = sampleData.currencySymbol || '₹';

  // Formatters
  const fmtCurr = (val) => {
    if (isNaN(val) || !isFinite(val)) return `${currency}0`;
    const rounded = Math.round(val);
    if (rounded < 0) return `-${currency}${Math.abs(rounded).toLocaleString('en-IN')}`;
    return `${currency}${rounded.toLocaleString('en-IN')}`;
  };
  const fmtPct = (val) => {
    if (isNaN(val) || !isFinite(val)) return '0.00%';
    return `${val.toFixed(2)}%`;
  };

  // Header
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
  doc.text(`Financial Year: ${sampleData.financialYear}  |  ${sampleData.assessmentYear}  |  Generated: ${sampleData.generatedDateStr}`, margin, 29);

  // Top divider
  doc.setDrawColor(2, 132, 199);
  doc.setLineWidth(0.6);
  doc.line(margin, 34, pageWidth - margin, 34);

  let currentY = 40;

  // Profile & Financial Summary Cards
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
  doc.text(sampleData.taxpayerTypeLabel, margin + colWidth - 5, currentY + 14, { align: 'right' });
  doc.text(sampleData.countryLabel, margin + colWidth - 5, currentY + 20, { align: 'right' });
  doc.text(sampleData.ageLabel, margin + colWidth - 5, currentY + 26, { align: 'right' });
  doc.text(sampleData.regimeLabel, margin + colWidth - 5, currentY + 32, { align: 'right' });
  doc.text(sampleData.assessmentYear, margin + colWidth - 5, currentY + 38, { align: 'right' });

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
  doc.text(fmtCurr(sampleData.grossIncome), box2X + colWidth - 5, currentY + 14, { align: 'right' });
  doc.text(fmtCurr(sampleData.deductions), box2X + colWidth - 5, currentY + 20, { align: 'right' });
  doc.text(fmtCurr(sampleData.taxableIncome), box2X + colWidth - 5, currentY + 26, { align: 'right' });

  doc.setTextColor(2, 132, 199);
  doc.text(fmtCurr(sampleData.totalTax), box2X + colWidth - 5, currentY + 32, { align: 'right' });
  doc.text(fmtPct(sampleData.effectiveRate), box2X + colWidth - 5, currentY + 38, { align: 'right' });

  currentY += boxHeight + 8;

  // Tax Liability Breakdown Table
  doc.setFont('ReportFont', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Tax Liability Breakdown', margin, currentY);
  currentY += 4;

  // Table Header
  const colRuleX = margin + 92;
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

  // Rows
  sampleData.breakdownRows.forEach((r, idx) => {
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

  // Comparison Box
  if (sampleData.comparison) {
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
    doc.text(`Tax under New Regime: ${fmtCurr(sampleData.comparison.newTax)}`, margin + 5, currentY + 12.5);
    doc.text(`Tax under Old Regime: ${fmtCurr(sampleData.comparison.oldTax)}`, margin + 5, currentY + 18);

    doc.setFont('ReportFont', 'bold');
    doc.text(`Recommended: ${sampleData.comparison.better} (Estimated Tax Savings: ${fmtCurr(sampleData.comparison.savings)})`, margin + 5, currentY + 23.5);

    currentY += 32;
  }

  // Disclaimer
  doc.setFont('ReportFont', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('Disclaimer:', margin, currentY);

  doc.setFont('ReportFont', 'normal');
  doc.setFontSize(7);
  const disclaimerText = 'This calculator provides estimates for informational purposes only and should not be considered professional tax advice. Actual tax liability may vary based on your individual circumstances and applicable tax rules. For an accurate assessment and personalized guidance, please consult a qualified Chartered Accountant or tax professional.';
  const splitDisclaimer = doc.splitTextToSize(disclaimerText, contentWidth);
  doc.text(splitDisclaimer, margin, currentY + 4);

  const out = doc.output();
  const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
  fs.writeFileSync(`scripts/${scenarioName}.pdf`, pdfBuffer);
  console.log(`Generated ${scenarioName}.pdf: ${pdfBuffer.length} bytes`);

  // Verify no broken characters or spaces
  const hasSpacedChars = out.includes('( ¹)') || out.includes('1 5 , 0 0') || out.includes('5 , 0 0') || out.includes('0 . 0 0');
  console.log(`[${scenarioName}] Has unintended character spacing: ${hasSpacedChars}`);
  return { hasSpacedChars, pdfBuffer };
}

// Scenario 1: ₹5,00,000 Income with ₹50,000 Deductions (Test input from user prompt)
generateTestPdf('test_sample_5L', {
  financialYear: '2024-2025',
  assessmentYear: 'AY 2025-2026',
  generatedDateStr: '16 October 2026',
  currencySymbol: '₹',
  taxpayerTypeLabel: 'Individual',
  countryLabel: 'INDIA',
  ageLabel: 'Below 60 Years',
  regimeLabel: 'New Tax Regime',
  grossIncome: 500000,
  deductions: 50000,
  taxableIncome: 450000,
  totalTax: 0,
  effectiveRate: 0.00,
  breakdownRows: [
    { name: 'Base Income Tax (Before Cess)', rule: 'Applicable slabs', val: '₹0' },
    { name: 'Section 87A Tax Rebate', rule: 'Rebate benefit', val: '-₹0' },
    { name: 'Health & Education Cess', rule: '4% on tax liability', val: '₹0' },
    { name: 'Total Tax Liability', rule: 'Effective Rate: 0.00%', val: '₹0', isTotal: true },
  ],
  comparison: {
    newTax: 0,
    oldTax: 0,
    better: 'New Tax Regime',
    savings: 0,
  }
});

// Scenario 2: High Income ₹15,00,000 (To verify larger amounts and percentage formatting)
generateTestPdf('test_sample_15L', {
  financialYear: '2024-2025',
  assessmentYear: 'AY 2025-2026',
  generatedDateStr: '16 October 2026',
  currencySymbol: '₹',
  taxpayerTypeLabel: 'Individual',
  countryLabel: 'INDIA',
  ageLabel: 'Below 60 Years',
  regimeLabel: 'New Tax Regime',
  grossIncome: 1500000,
  deductions: 75000,
  taxableIncome: 1425000,
  totalTax: 135200,
  effectiveRate: 9.01,
  breakdownRows: [
    { name: 'Base Income Tax (Before Cess)', rule: 'Applicable slabs', val: '₹1,30,000' },
    { name: 'Health & Education Cess', rule: '4% on tax liability', val: '₹5,200' },
    { name: 'Total Tax Liability', rule: 'Effective Rate: 9.01%', val: '₹1,35,200', isTotal: true },
  ],
  comparison: {
    newTax: 135200,
    oldTax: 218400,
    better: 'New Tax Regime',
    savings: 83200,
  }
});
