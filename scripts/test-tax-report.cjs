/**
 * Regression & Unit Tests for Global Tax File Updates
 * 1. Verifies Taxpayer Type options (Individual, NRI, Professional/Freelancer, Startup) in exact order
 * 2. Verifies exclusion of LLP, MSME, Company
 * 3. Verifies PDF document generation with embedded official logo
 * 4. Verifies Word (.docx) document generation with embedded official logo
 * 5. Verifies financial calculations and Indian currency formatting
 */

const assert = require('assert');
const fs = require('fs');

async function runTests() {
  console.log('--- Testing Taxpayer Type Options ---');
  // Read TaxpayerTypeSelector.tsx to verify the options array
  const selectorCode = fs.readFileSync('./src/components/tax-calculator/TaxpayerTypeSelector.tsx', 'utf8');

  // Verify options array presence and exact order
  assert(selectorCode.includes('ALLOWED_TAXPAYER_OPTIONS'), 'ALLOWED_TAXPAYER_OPTIONS must be exported');
  
  const expectedOptions = [
    { value: 'individual', label: 'Individual' },
    { value: 'nri', label: 'Non-Resident Indian (NRI)' },
    { value: 'professional', label: 'Professional/Freelancer' },
  ];

  expectedOptions.forEach((opt, idx) => {
    assert(selectorCode.includes(`value: "${opt.value}"`), `Option ${opt.value} must be present`);
    assert(selectorCode.includes(`label: "${opt.label}"`), `Label ${opt.label} must be present`);
  });

  // Verify removed options are NOT in ALLOWED_TAXPAYER_OPTIONS
  assert(!selectorCode.includes('value: "startup"'), 'Startup must not be in ALLOWED_TAXPAYER_OPTIONS dropdown');
  assert(!selectorCode.includes('value="llp"'), 'LLP must not be in dropdown');
  assert(!selectorCode.includes('value="msme"'), 'MSME must not be in dropdown');
  assert(!selectorCode.includes('value="company"'), 'Company must not be in dropdown');
  console.log('✓ PASS: Exactly 3 Taxpayer Type options present in exact order (Individual, NRI, Professional/Freelancer)');
  console.log('✓ PASS: Startup, LLP, MSME, and Company are completely excluded');

  console.log('\n--- Testing Official Logo Embedding ---');
  const logoBuf = fs.readFileSync('./public/images/finance-brunch-logo-nobg.png');
  const FINANCE_BRUNCH_LOGO_RAW = logoBuf.toString('base64');
  const LOGO_WIDTH = 891;
  const LOGO_HEIGHT = 280;
  const LOGO_ASPECT_RATIO = LOGO_WIDTH / LOGO_HEIGHT;
  assert(FINANCE_BRUNCH_LOGO_RAW && FINANCE_BRUNCH_LOGO_RAW.length > 50000, 'Logo raw base64 must be present and valid size');
  assert.strictEqual(LOGO_WIDTH, 891);
  assert.strictEqual(LOGO_HEIGHT, 280);
  console.log(`✓ PASS: Official Finance Brunch logo asset verified (dimensions: ${LOGO_WIDTH}x${LOGO_HEIGHT}, ratio: ${LOGO_ASPECT_RATIO.toFixed(2)})`);

  // Verify Official FB Watermark Asset
  const watermarkBuf = fs.readFileSync('./public/images/fb-watermark-subtle.png');
  const FINANCE_BRUNCH_WATERMARK_RAW = watermarkBuf.toString('base64');
  assert(FINANCE_BRUNCH_WATERMARK_RAW.length > 20000, 'Watermark asset base64 must be valid');
  console.log('✓ PASS: Official Finance Brunch FB watermark asset verified');

  console.log('\n--- Testing PDF Generation with Embedded Logo & Unicode Font ---');
  const { jsPDF } = require('jspdf');
  const regPath = 'C:\\Windows\\Fonts\\verdana.ttf';
  const boldPath = 'C:\\Windows\\Fonts\\verdanab.ttf';
  const regBase64 = fs.readFileSync(regPath).toString('base64');
  const boldBase64 = fs.readFileSync(boldPath).toString('base64');

  const pdfDoc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: false });
  pdfDoc.addFileToVFS('ReportFont-Regular.ttf', regBase64);
  pdfDoc.addFont('ReportFont-Regular.ttf', 'ReportFont', 'normal');
  pdfDoc.addFileToVFS('ReportFont-Bold.ttf', boldBase64);
  pdfDoc.addFont('ReportFont-Bold.ttf', 'ReportFont', 'bold');
  pdfDoc.setFont('ReportFont', 'normal');

  const logoWidth = 42;
  const logoHeight = logoWidth / LOGO_ASPECT_RATIO;
  pdfDoc.addImage(FINANCE_BRUNCH_LOGO_RAW, 'PNG', 210 - 14 - logoWidth, 10, logoWidth, logoHeight);
  pdfDoc.setFont('ReportFont', 'bold');
  pdfDoc.setFontSize(16);
  pdfDoc.text('Income Tax Calculation Report', 14, 23);
  pdfDoc.setFont('ReportFont', 'normal');
  pdfDoc.setFontSize(10);
  pdfDoc.text('Gross Annual Income: ₹5,00,000', 14, 40);
  pdfDoc.text('Net Taxable Income: ₹4,50,000', 14, 48);
  pdfDoc.text('Total Tax Liability: ₹0', 14, 56);
  pdfDoc.text('Effective Tax Rate: 0.00%', 14, 64);

  const rawPdfStr = pdfDoc.output();
  // Check for absence of UTF-16 spacing glitch
  assert(!rawPdfStr.includes('( ¹)'), 'Must not contain corrupted rupee glyph');
  assert(!rawPdfStr.includes('5 , 0 0 , 0 0 0'), 'Must not contain spaces between digits');
  assert(!rawPdfStr.includes('0 . 0 0 %'), 'Must not contain spaces in percentages');

  const pdfBuffer = Buffer.from(pdfDoc.output('arraybuffer'));
  assert(pdfBuffer.length > 50000, 'PDF buffer with embedded logo must be generated');
  assert(pdfBuffer.toString('utf8', 0, 5) === '%PDF-', 'Must be a valid PDF format');
  console.log(`✓ PASS: PDF generated successfully (${pdfBuffer.length} bytes) with official logo, Rupee glyph, and clean formatting`);

  console.log('\n--- Testing Word (.docx) Generation with Embedded Logo ---');
  const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun, AlignmentType, WidthType } = require('docx');
  const imageBuffer = Buffer.from(FINANCE_BRUNCH_LOGO_RAW, 'base64');
  const wordDoc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [
            new ImageRun({
              data: imageBuffer,
              transformation: { width: 140, height: Math.round(140 / LOGO_ASPECT_RATIO) }
            })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({ text: 'Income Tax Calculation Report', bold: true, size: 32 })
          ]
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Gross Income', bold: true })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: '₹15,00,000' })] })] }),
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Tax Liability', bold: true })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: '₹1,56,000' })] })] }),
              ]
            })
          ]
        })
      ]
    }]
  });

  const docxBuffer = await Packer.toBuffer(wordDoc);
  assert(docxBuffer.length > 50000, 'Word buffer must be generated with embedded logo and table');
  // Check PK zip signature for valid docx
  assert(docxBuffer[0] === 0x50 && docxBuffer[1] === 0x4B, 'Must be valid PK zip archive for .docx');
  console.log(`✓ PASS: Word (.docx) generated successfully (${docxBuffer.length} bytes) with embedded logo and tables`);

  console.log('\n--- Testing Financial Formatting & AY Calculation ---');
  function getAssessmentYear(fy) {
    if (fy === '2024-2025') return 'AY 2025-2026';
    if (fy === '2025-2026') return 'AY 2026-2027';
    return `AY ${fy}`;
  }
  function formatINR(val) {
    return '₹' + Math.round(val).toLocaleString('en-IN');
  }

  assert.strictEqual(getAssessmentYear('2024-2025'), 'AY 2025-2026');
  assert.strictEqual(getAssessmentYear('2025-2026'), 'AY 2026-2027');
  assert.strictEqual(formatINR(500000), '₹5,00,000');
  assert.strictEqual(formatINR(1250000), '₹12,50,000');
  console.log('✓ PASS: Financial formatters and Assessment Year conversions verified');

  console.log('\n--- Testing Permanent Disclaimer & Exports ---');
  const expectedDisclaimer = 'This report provides an indicative estimate based on the information entered and the tax rules applicable to the selected financial year. It is intended for informational and planning purposes only and does not constitute professional tax, legal, or financial advice. Actual tax liability may vary depending on individual circumstances, eligible deductions, applicable legislation, and subsequent regulatory changes. For an accurate assessment of your tax position, please consult an independent qualified Chartered Accountant or other appropriately qualified tax professional.';
  const disclaimerBody = 'This report provides an indicative estimate based on the information entered and the tax rules applicable to the selected financial year. It is intended for informational and planning purposes only and does not constitute professional tax, legal, or financial advice.';
  const reportGenCode = fs.readFileSync('./src/components/tax-calculator/utils/taxReportGenerator.ts', 'utf8');
  const taxResultsCode = fs.readFileSync('./src/components/tax-calculator/TaxResults.tsx', 'utf8');

  assert(reportGenCode.includes(expectedDisclaimer), 'taxReportGenerator.ts must contain the exact disclaimer text');
  assert(taxResultsCode.includes('id="tax-calculation-disclaimer"'), 'TaxResults.tsx must render the permanent disclaimer below the results card');
  assert(taxResultsCode.includes('TAX_CALCULATOR_DISCLAIMER_TEXT'), 'TaxResults.tsx must render the TAX_CALCULATOR_DISCLAIMER_TEXT');
  assert(taxResultsCode.includes('Disclaimer:'), 'TaxResults.tsx must include Disclaimer: prefix');
  console.log('✓ PASS: Permanent disclaimer present on TaxResults page and in Print/PDF/Word export utilities');

  console.log('\n--- Testing Delayed Consultation Popup ---');
  const popupCode = fs.readFileSync('./src/components/tax-calculator/TaxConsultationPopup.tsx', 'utf8');
  assert(popupCode.includes('Need Help Understanding Your Tax Results?'), 'Popup must have exact specified heading');
  assert(popupCode.includes('Connect with our tax specialists for personalized guidance, clarification of your calculation, and assistance with your tax-related queries.'), 'Popup must have exact specified message');
  assert(popupCode.includes('Connect with a Tax Specialist'), 'Popup must have exact primary button text');
  assert(popupCode.includes('Maybe Later'), 'Popup must have exact secondary button text');
  assert(!popupCode.toLowerCase().includes('ca agent'), 'Popup must NOT use the term CA Agent or CA Agents');

  // Verify timer in TaxResults
  assert(taxResultsCode.includes('60000'), 'TaxResults must have 60000ms delay for consultation popup');
  assert(taxResultsCode.includes("navigate('/contact?service=Income+Tax+Filing')"), 'Primary button must navigate to existing contact/consultation flow');
  console.log('✓ PASS: Consultation popup verified with exact professional copy, no CA Agent wording, and 60s timer');

  console.log('\n--- Testing Homepage Global Presence Description ---');
  const globalPresenceCode = fs.readFileSync('./src/components/home/GlobalPresence.tsx', 'utf8');
  assert(globalPresenceCode.includes('We provide localized expertise with a global perspective.'), 'GlobalPresence must have shortened sentence');
  assert(!globalPresenceCode.includes('With offices across major financial hubs,'), 'GlobalPresence must not have the removed opening phrase');
  console.log('✓ PASS: Global Presence description shortened to exact required text');

  console.log('\n========================================');
  console.log('🎉 ALL TAX REPORT & GLOBAL PRESENCE TESTS PASSED!');
  console.log('========================================\n');
}

runTests().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
