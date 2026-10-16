const fs = require('fs');
const path = require('path');

const regPath = 'C:\\Windows\\Fonts\\verdana.ttf';
const boldPath = 'C:\\Windows\\Fonts\\verdanab.ttf';

if (!fs.existsSync(regPath) || !fs.existsSync(boldPath)) {
  console.error('System fonts not found at:', regPath, boldPath);
  process.exit(1);
}

const regBase64 = fs.readFileSync(regPath).toString('base64');
const boldBase64 = fs.readFileSync(boldPath).toString('base64');

const tsContent = `/**
 * Finance Brunch - Embedded TrueType Fonts for jsPDF
 * Provides complete Unicode coverage including the Indian Rupee symbol (₹) U+20B9,
 * proper character kerning, and prevents character spacing glitches.
 */

export const REPORT_FONT_REGULAR_B64 = "${regBase64}";
export const REPORT_FONT_BOLD_B64 = "${boldBase64}";

export function registerReportFonts(doc: any): void {
  try {
    doc.addFileToVFS('ReportFont-Regular.ttf', REPORT_FONT_REGULAR_B64);
    doc.addFont('ReportFont-Regular.ttf', 'ReportFont', 'normal');
    doc.addFileToVFS('ReportFont-Bold.ttf', REPORT_FONT_BOLD_B64);
    doc.addFont('ReportFont-Bold.ttf', 'ReportFont', 'bold');
    doc.setFont('ReportFont', 'normal');
  } catch (err) {
    console.warn('Error registering Unicode fonts in jsPDF:', err);
  }
}
`;

const targetPath = path.resolve(__dirname, '../src/components/tax-calculator/utils/reportFont.ts');
fs.writeFileSync(targetPath, tsContent, 'utf8');
console.log('Successfully wrote font data to:', targetPath);
