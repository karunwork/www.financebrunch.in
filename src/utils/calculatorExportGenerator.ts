/**
 * Finance Brunch - Comprehensive Calculator Export Generator (PDF & Word DOCX)
 * 
 * Supports SIP, Step-Up SIP, Lumpsum, and SWP calculators.
 * Exports dynamically generated client-side reports with:
 * - Official Finance Brunch logo at the top-right
 * - Report title, generation date, and financial metadata
 * - User inputs and assumptions summary
 * - Key results dashboard and metrics
 * - Complete year-by-year Investment Growth / SWP Schedule projection table
 * - Financial disclaimer
 * - Official Finance Brunch brand footer with verified contact information:
 *   (Finance Brunch | admin@financebrunch.in | +91 7842-494-981 | https://financebrunch.in)
 */

import { jsPDF } from 'jspdf';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  ImageRun,
  AlignmentType,
  WidthType,
  BorderStyle,
  ShadingType,
} from 'docx';
import {
  FINANCE_BRUNCH_LOGO_RAW,
  LOGO_ASPECT_RATIO,
} from '@/components/tax-calculator/utils/reportLogo';
import { registerReportFonts } from '@/components/tax-calculator/utils/reportFont';

export interface CalculatorExportRow {
  col1: string | number; // Year
  col2: string;          // Contribution / Opening Balance
  col3: string;          // Cumulative Invested / Growth Earned
  col4: string;          // Estimated Returns / Withdrawal
  col5: string;          // Portfolio Value / Closing Balance
}

export interface CalculatorExportData {
  calculatorType: 'sip' | 'stepup' | 'lumpsum' | 'swp';
  calculatorTitle: string;
  generatedDateStr: string;
  inputs: Array<{ label: string; value: string }>;
  summaryMetrics: Array<{ label: string; value: string; isHighlight?: boolean }>;
  growthSchedule: CalculatorExportRow[];
  scheduleHeaders: [string, string, string, string, string];
  notes?: string;
  disclaimer?: string;
}

const DEFAULT_CALCULATOR_DISCLAIMER =
  'These calculations are illustrative estimates based on the entered assumptions and cash-flow schedule. Actual investment returns and corpus longevity depend on market movements, fund performance, inflation, and tax regulations. This report does not constitute certified investment advice or a financial guarantee. Please consult a qualified SEBI/AMFI registered financial advisor before making investment decisions.';

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * 1. DOWNLOAD AS PDF (jsPDF with embedded official logo and unicode font)
 */
export async function downloadCalculatorPdf(data: CalculatorExportData) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  registerReportFonts(doc);

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 14;
  const contentWidth = pageWidth - margin * 2; // 182mm

  // Top-Right Official Logo
  const logoWidth = 42;
  const logoHeight = logoWidth / LOGO_ASPECT_RATIO;
  const logoX = pageWidth - margin - logoWidth;
  const logoY = 10;

  try {
    doc.addImage(FINANCE_BRUNCH_LOGO_RAW, 'PNG', logoX, logoY, logoWidth, logoHeight);
  } catch (err) {
    console.warn('Failed to embed logo into PDF, falling back to text:', err);
    doc.setFont('ReportFont', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(2, 132, 199);
    doc.text('FINANCE BRUNCH', logoX, logoY + 8);
  }

  // Header Title on Left
  doc.setFont('ReportFont', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(2, 132, 199);
  doc.text('FINANCE BRUNCH WEALTH PLANNING', margin, 15);

  doc.setFont('ReportFont', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(15, 23, 42);
  doc.text(data.calculatorTitle, margin, 23);

  doc.setFont('ReportFont', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  doc.text(`Report Generated: ${data.generatedDateStr}   |   Mode: Deterministic Compound Simulation`, margin, 29);

  // Divider Line
  doc.setDrawColor(2, 132, 199);
  doc.setLineWidth(0.6);
  doc.line(margin, 34, pageWidth - margin, 34);

  // Subtle Watermark in Background
  doc.setFont('ReportFont', 'bold');
  doc.setFontSize(54);
  doc.setTextColor(245, 248, 252);
  doc.text('FINANCE BRUNCH', pageWidth / 2, 160, { align: 'center', angle: 45 });

  let currentY = 40;

  // Inputs and Summary Dashboard Side-by-Side Cards
  const colWidth = (contentWidth - 6) / 2;
  const cardHeight = Math.max(38, Math.max(data.inputs.length, data.summaryMetrics.length) * 6.5 + 14);

  // Card 1: User Inputs & Assumptions
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, currentY, colWidth, cardHeight, 2, 2, 'FD');

  doc.setFont('ReportFont', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59);
  doc.text('Inputs & Assumptions', margin + 5, currentY + 7);

  let inputY = currentY + 14;
  data.inputs.forEach((item) => {
    doc.setFont('ReportFont', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(item.label, margin + 5, inputY);

    doc.setFont('ReportFont', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(item.value, margin + colWidth - 5, inputY, { align: 'right' });
    inputY += 6.5;
  });

  // Card 2: Calculation Results Dashboard
  const card2X = margin + colWidth + 6;
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(card2X, currentY, colWidth, cardHeight, 2, 2, 'FD');

  doc.setFont('ReportFont', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59);
  doc.text('Key Results & Metrics', card2X + 5, currentY + 7);

  let metricY = currentY + 14;
  data.summaryMetrics.forEach((item) => {
    doc.setFont('ReportFont', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(item.label, card2X + 5, metricY);

    doc.setFont('ReportFont', 'bold');
    if (item.isHighlight) {
      doc.setTextColor(2, 132, 199);
    } else {
      doc.setTextColor(15, 23, 42);
    }
    doc.text(item.value, card2X + colWidth - 5, metricY, { align: 'right' });
    metricY += 6.5;
  });

  currentY += cardHeight + 8;

  // Notes or Educational guidance (if provided)
  if (data.notes) {
    doc.setFillColor(239, 246, 255);
    doc.setDrawColor(191, 219, 254);
    doc.setLineWidth(0.3);
    const splitNotes = doc.splitTextToSize(data.notes, contentWidth - 10);
    const noteBoxHeight = splitNotes.length * 3.5 + 8;
    doc.roundedRect(margin, currentY, contentWidth, noteBoxHeight, 2, 2, 'FD');

    doc.setFont('ReportFont', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(30, 58, 138);
    doc.text(splitNotes, margin + 5, currentY + 5.5);

    currentY += noteBoxHeight + 6;
  }

  // Projection Table Header
  const printTableHeader = (yPos: number) => {
    doc.setFont('ReportFont', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text('Investment Growth & Projection Schedule', margin, yPos);

    const tableY = yPos + 4;
    doc.setFillColor(241, 245, 249);
    doc.rect(margin, tableY, contentWidth, 7.5, 'F');

    doc.setFont('ReportFont', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(51, 65, 85);

    const c1 = margin + 4;
    const c2 = margin + 48;
    const c3 = margin + 92;
    const c4 = margin + 138;
    const c5 = margin + contentWidth - 4;

    doc.text(data.scheduleHeaders[0], c1, tableY + 5);
    doc.text(data.scheduleHeaders[1], c2, tableY + 5, { align: 'right' });
    doc.text(data.scheduleHeaders[2], c3, tableY + 5, { align: 'right' });
    doc.text(data.scheduleHeaders[3], c4, tableY + 5, { align: 'right' });
    doc.text(data.scheduleHeaders[4], c5, tableY + 5, { align: 'right' });

    return tableY + 7.5;
  };

  currentY = printTableHeader(currentY);

  const c1 = margin + 4;
  const c2 = margin + 48;
  const c3 = margin + 92;
  const c4 = margin + 138;
  const c5 = margin + contentWidth - 4;

  data.growthSchedule.forEach((row, idx) => {
    // Check if new page is needed
    if (currentY + 12 > pageHeight - 32) {
      doc.addPage();
      currentY = printTableHeader(margin);
    }

    if (idx % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(margin, currentY, contentWidth, 6.5, 'F');
    }

    doc.setFont('ReportFont', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(15, 23, 42);

    doc.text(String(row.col1), c1, currentY + 4.5);
    doc.text(String(row.col2), c2, currentY + 4.5, { align: 'right' });
    doc.text(String(row.col3), c3, currentY + 4.5, { align: 'right' });
    doc.text(String(row.col4), c4, currentY + 4.5, { align: 'right' });

    doc.setFont('ReportFont', 'bold');
    doc.setTextColor(2, 132, 199);
    doc.text(String(row.col5), c5, currentY + 4.5, { align: 'right' });

    doc.setDrawColor(241, 245, 249);
    doc.setLineWidth(0.2);
    doc.line(margin, currentY + 6.5, margin + contentWidth, currentY + 6.5);

    currentY += 6.5;
  });

  currentY += 6;

  // Disclaimer & Brand Footer (check if space permits or add page)
  const disclaimerText = data.disclaimer || DEFAULT_CALCULATOR_DISCLAIMER;
  const splitDisclaimer = doc.splitTextToSize(disclaimerText, contentWidth);
  const neededBottomHeight = splitDisclaimer.length * 3.2 + 20;

  if (currentY + neededBottomHeight > pageHeight - margin) {
    doc.addPage();
    currentY = margin + 5;
  }

  // Disclaimer block
  doc.setFont('ReportFont', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('Important Disclaimer:', margin, currentY);

  doc.setFont('ReportFont', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(100, 116, 139);
  doc.text(splitDisclaimer, margin, currentY + 4);

  const footerY = currentY + splitDisclaimer.length * 3.2 + 6;

  // Divider Line
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.line(margin, footerY, margin + contentWidth, footerY);

  // Professional Finance Brunch Brand Footer
  doc.setFont('ReportFont', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text('Finance Brunch', margin, footerY + 5);

  doc.setFont('ReportFont', 'normal');
  doc.setFontSize(7.2);
  doc.setTextColor(100, 116, 139);
  doc.text('Email: admin@financebrunch.in   |   Phone: +91 7842-494-981   |   Website: https://financebrunch.in', margin + 26, footerY + 5);

  const safeTitle = data.calculatorTitle.replace(/[^a-zA-Z0-9_-]/g, '_');
  const blob = doc.output('blob');
  downloadBlob(blob, `${safeTitle}_Report.pdf`);
}

/**
 * 2. DOWNLOAD AS WORD (.docx)
 * Generates an authentic .docx file with Finance Brunch logo, formatted tables,
 * user metrics, projection schedule, disclaimer, and official brand footer.
 */
export async function downloadCalculatorDocx(data: CalculatorExportData) {
  const rawBytes = Uint8Array.from(atob(FINANCE_BRUNCH_LOGO_RAW), (c) => c.charCodeAt(0));

  // Build Inputs Table Rows
  const inputRows = [
    new TableRow({
      children: [
        new TableCell({
          width: { size: 50, type: WidthType.PERCENTAGE },
          shading: { type: ShadingType.CLEAR, fill: 'F1F5F9' },
          children: [new Paragraph({ children: [new TextRun({ text: 'Input Parameter', bold: true, size: 18 })] })],
        }),
        new TableCell({
          width: { size: 50, type: WidthType.PERCENTAGE },
          shading: { type: ShadingType.CLEAR, fill: 'F1F5F9' },
          children: [new Paragraph({ children: [new TextRun({ text: 'Value', bold: true, size: 18 })] })],
        }),
      ],
    }),
    ...data.inputs.map(
      (inp) =>
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: inp.label, size: 17 })] })],
            }),
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: inp.value, bold: true, size: 17 })] })],
            }),
          ],
        })
    ),
  ];

  // Build Summary Metrics Table Rows
  const metricRows = [
    new TableRow({
      children: [
        new TableCell({
          width: { size: 50, type: WidthType.PERCENTAGE },
          shading: { type: ShadingType.CLEAR, fill: 'F1F5F9' },
          children: [new Paragraph({ children: [new TextRun({ text: 'Result Metric', bold: true, size: 18 })] })],
        }),
        new TableCell({
          width: { size: 50, type: WidthType.PERCENTAGE },
          shading: { type: ShadingType.CLEAR, fill: 'F1F5F9' },
          children: [new Paragraph({ children: [new TextRun({ text: 'Projected Value', bold: true, size: 18 })] })],
        }),
      ],
    }),
    ...data.summaryMetrics.map(
      (m) =>
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: m.label, size: 17 })] })],
            }),
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: m.value,
                      bold: true,
                      size: 17,
                      color: m.isHighlight ? '0284c7' : '0f172a',
                    }),
                  ],
                }),
              ],
            }),
          ],
        })
    ),
  ];

  // Build Schedule Projection Table Rows
  const scheduleRows = [
    new TableRow({
      children: data.scheduleHeaders.map(
        (h) =>
          new TableCell({
            shading: { type: ShadingType.CLEAR, fill: 'F1F5F9' },
            children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, size: 17 })] })],
          })
      ),
    }),
    ...data.growthSchedule.map(
      (row, idx) =>
        new TableRow({
          children: [
            new TableCell({
              shading: idx % 2 === 1 ? { type: ShadingType.CLEAR, fill: 'F8FAFC' } : undefined,
              children: [new Paragraph({ children: [new TextRun({ text: String(row.col1), size: 16 })] })],
            }),
            new TableCell({
              shading: idx % 2 === 1 ? { type: ShadingType.CLEAR, fill: 'F8FAFC' } : undefined,
              children: [new Paragraph({ children: [new TextRun({ text: String(row.col2), size: 16 })] })],
            }),
            new TableCell({
              shading: idx % 2 === 1 ? { type: ShadingType.CLEAR, fill: 'F8FAFC' } : undefined,
              children: [new Paragraph({ children: [new TextRun({ text: String(row.col3), size: 16 })] })],
            }),
            new TableCell({
              shading: idx % 2 === 1 ? { type: ShadingType.CLEAR, fill: 'F8FAFC' } : undefined,
              children: [new Paragraph({ children: [new TextRun({ text: String(row.col4), size: 16 })] })],
            }),
            new TableCell({
              shading: idx % 2 === 1 ? { type: ShadingType.CLEAR, fill: 'F8FAFC' } : undefined,
              children: [new Paragraph({ children: [new TextRun({ text: String(row.col5), bold: true, color: '0284c7', size: 16 })] })],
            }),
          ],
        })
    ),
  ];

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1000, bottom: 1000, left: 1200, right: 1200 },
          },
        },
        children: [
          // Header Table with Title on Left, Logo on Right
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.SINGLE, size: 12, color: '0284c7' },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 68, type: WidthType.PERCENTAGE },
                    borders: {
                      top: { style: BorderStyle.NONE },
                      bottom: { style: BorderStyle.NONE },
                      left: { style: BorderStyle.NONE },
                      right: { style: BorderStyle.NONE },
                    },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: 'FINANCE BRUNCH WEALTH PLANNING',
                            bold: true,
                            size: 18,
                            color: '0284c7',
                          }),
                        ],
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: data.calculatorTitle,
                            bold: true,
                            size: 32,
                            color: '0f172a',
                          }),
                        ],
                        spacing: { before: 80, after: 60 },
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: `Report Generated: ${data.generatedDateStr}`,
                            size: 18,
                            color: '64748b',
                          }),
                        ],
                        spacing: { after: 120 },
                      }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 32, type: WidthType.PERCENTAGE },
                    borders: {
                      top: { style: BorderStyle.NONE },
                      bottom: { style: BorderStyle.NONE },
                      left: { style: BorderStyle.NONE },
                      right: { style: BorderStyle.NONE },
                    },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.RIGHT,
                        children: [
                          new ImageRun({
                            data: rawBytes,
                            transformation: {
                              width: 160,
                              height: 160 / LOGO_ASPECT_RATIO,
                            },
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),

          new Paragraph({ text: '', spacing: { after: 180 } }),

          // User Inputs Table
          new Paragraph({
            children: [new TextRun({ text: '1. User Inputs & Assumptions', bold: true, size: 22, color: '0f172a' })],
            spacing: { before: 100, after: 80 },
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: inputRows,
          }),

          new Paragraph({ text: '', spacing: { after: 180 } }),

          // Summary Metrics Table
          new Paragraph({
            children: [new TextRun({ text: '2. Calculation Results & Key Metrics', bold: true, size: 22, color: '0f172a' })],
            spacing: { before: 100, after: 80 },
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: metricRows,
          }),

          new Paragraph({ text: '', spacing: { after: 180 } }),

          // Growth Schedule Table
          new Paragraph({
            children: [new TextRun({ text: '3. Investment Growth & Projection Schedule', bold: true, size: 22, color: '0f172a' })],
            spacing: { before: 100, after: 80 },
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: scheduleRows,
          }),

          new Paragraph({ text: '', spacing: { after: 200 } }),

          // Disclaimer
          new Paragraph({
            children: [
              new TextRun({
                text: 'Disclaimer: ',
                bold: true,
                size: 16,
                color: '64748b',
              }),
              new TextRun({
                text: data.disclaimer || DEFAULT_CALCULATOR_DISCLAIMER,
                size: 16,
                color: '64748b',
                italics: true,
              }),
            ],
            spacing: { before: 140, after: 140 },
          }),

          // Divider
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 6, color: 'CBD5E1' },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
            },
            rows: [new TableRow({ children: [new TableCell({ children: [] })] })],
          }),

          // Professional Finance Brunch Brand Footer
          new Paragraph({
            children: [
              new TextRun({
                text: 'Finance Brunch',
                bold: true,
                size: 18,
                color: '0f172a',
              }),
              new TextRun({
                text: '   |   Email: admin@financebrunch.in   |   Phone: +91 7842-494-981   |   Website: https://financebrunch.in',
                size: 16,
                color: '64748b',
              }),
            ],
            spacing: { before: 120 },
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const safeTitle = data.calculatorTitle.replace(/[^a-zA-Z0-9_-]/g, '_');
  downloadBlob(blob, `${safeTitle}_Report.docx`);
}
