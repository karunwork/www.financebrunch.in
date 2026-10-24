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

import { GState, jsPDF } from 'jspdf';
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
import {
  drawPdfBackgroundWatermark,
  getDocxWatermarkHeader,
} from '@/utils/reportWatermark';

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
/**
 * 1. BUILD CALCULATOR PDF DOCUMENT
 * Generates an authentic, beautifully styled, non-overlapping jsPDF document
 * with Finance Brunch logo, structured inputs, metrics dashboard, multi-page projection schedule,
 * disclaimer, and consistent headers/footers on every page.
 */
export function buildCalculatorPdfDoc(data: CalculatorExportData): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: false,
  });

  registerReportFonts(doc);

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 14;
  const contentWidth = pageWidth - margin * 2; // 182mm
  const maxContentBottom = pageHeight - 21; // 276mm, leaving 6mm safe space above footer line

  // Column X alignment coordinates for 5-column projection table
  const colX = {
    c1: margin + 3,                 // Year (left-aligned)
    c2: margin + 52,                // Col 2 (right-aligned)
    c3: margin + 94,                // Col 3 (right-aligned)
    c4: margin + 138,               // Col 4 (right-aligned)
    c5: margin + contentWidth - 3,  // Col 5 (right-aligned)
  };

  // --- Header for Page 1 ---
  const printPage1Header = (): number => {
    const logoWidth = 38;
    const logoHeight = logoWidth / LOGO_ASPECT_RATIO;
    const logoX = pageWidth - margin - logoWidth;
    const logoY = 9.5;

    // 1. Embed Logo on Top-Right
    try {
      doc.addImage(FINANCE_BRUNCH_LOGO_RAW, 'PNG', logoX, logoY, logoWidth, logoHeight);
    } catch (err) {
      console.warn('Failed to embed logo into PDF, falling back to text:', err);
      doc.setFont('ReportFont', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(2, 132, 199);
      doc.text('FINANCE BRUNCH', logoX, logoY + 8);
    }

    // 2. Title block on Left (bounded strictly so it NEVER overlaps logo)
    const titleMaxWidth = logoX - margin - 6; // 138mm of clear horizontal space

    doc.setFont('ReportFont', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(2, 132, 199);
    doc.text('FINANCE BRUNCH WEALTH PLANNING', margin, 14);

    doc.setFont('ReportFont', 'bold');
    doc.setFontSize(14.5);
    doc.setTextColor(15, 23, 42);
    const splitTitle = doc.splitTextToSize(data.calculatorTitle, titleMaxWidth);
    doc.text(splitTitle, margin, 20);
    const titleBottomY = 20 + (splitTitle.length - 1) * 5.2;

    const metaY = Math.max(titleBottomY + 5.2, 25.5);
    doc.setFont('ReportFont', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(`Report Generated: ${data.generatedDateStr}   |   Mode: Deterministic Compound Simulation`, margin, metaY);

    // 3. Dynamic divider line placed strictly below BOTH logo and title/meta
    const headerBottom = Math.max(logoY + logoHeight + 2, metaY + 3.5);
    doc.setDrawColor(2, 132, 199);
    doc.setLineWidth(0.6);
    doc.line(margin, headerBottom, pageWidth - margin, headerBottom);

    return headerBottom + 5.5;
  };

  // --- Header for Continuation Pages (Page 2, 3...) ---
  const printSubsequentPageHeader = (): number => {
    const subLogoWidth = 30;
    const subLogoHeight = subLogoWidth / LOGO_ASPECT_RATIO;
    const subLogoX = pageWidth - margin - subLogoWidth;
    const subLogoY = 8.5;

    try {
      doc.addImage(FINANCE_BRUNCH_LOGO_RAW, 'PNG', subLogoX, subLogoY, subLogoWidth, subLogoHeight);
    } catch {
      doc.setFont('ReportFont', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(2, 132, 199);
      doc.text('FINANCE BRUNCH', subLogoX, subLogoY + 6);
    }

    const subTitleMaxWidth = subLogoX - margin - 5;
    doc.setFont('ReportFont', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(2, 132, 199);
    doc.text('FINANCE BRUNCH WEALTH PLANNING', margin, 12.5);

    doc.setFont('ReportFont', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(15, 23, 42);
    const splitSubTitle = doc.splitTextToSize(`${data.calculatorTitle} — Projection Schedule`, subTitleMaxWidth);
    doc.text(splitSubTitle, margin, 17.5);

    const subHeaderBottom = Math.max(subLogoY + subLogoHeight + 2, 17.5 + (splitSubTitle.length - 1) * 4.5 + 2.5);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.35);
    doc.line(margin, subHeaderBottom, pageWidth - margin, subHeaderBottom);

    return subHeaderBottom + 4.5;
  };

  // --- Table Header Function ---
  const printTableHeader = (yPos: number, isContinuation = false): number => {
    doc.setFont('ReportFont', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text(
      isContinuation 
        ? 'Investment Growth & Projection Schedule (Continued)' 
        : 'Investment Growth & Projection Schedule',
      margin,
      yPos
    );

    const tableY = yPos + 3.5;
    doc.setFillColor(241, 245, 249);
    doc.rect(margin, tableY, contentWidth, 7, 'F');

    doc.setFont('ReportFont', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(51, 65, 85);

    doc.text(data.scheduleHeaders[0], colX.c1, tableY + 4.8);
    doc.text(data.scheduleHeaders[1], colX.c2, tableY + 4.8, { align: 'right' });
    doc.text(data.scheduleHeaders[2], colX.c3, tableY + 4.8, { align: 'right' });
    doc.text(data.scheduleHeaders[3], colX.c4, tableY + 4.8, { align: 'right' });
    doc.text(data.scheduleHeaders[4], colX.c5, tableY + 4.8, { align: 'right' });

    return tableY + 7;
  };

  // Start on Page 1: draw background watermark first so it sits strictly behind all content
  drawPdfBackgroundWatermark(doc, pageWidth, pageHeight);
  let currentY = printPage1Header();

  // --- Inputs and Summary Dashboard Cards ---
  const colWidth = (contentWidth - 6) / 2; // 88mm
  const innerCardW = colWidth - 10; // 78mm

  const measureItemHeight = (item: { label: string; value: string }): number => {
    doc.setFont('ReportFont', 'normal');
    doc.setFontSize(7.5);
    const labelW = doc.getTextWidth(item.label);
    doc.setFont('ReportFont', 'bold');
    doc.setFontSize(8);
    const valW = doc.getTextWidth(item.value);
    if (labelW + valW + 4 <= innerCardW) {
      return 5.8;
    }
    return 9.5;
  };

  const calcCardHeight = (items: Array<{ label: string; value: string; isHighlight?: boolean }>): number => {
    let h = 13.5; // title + top padding
    items.forEach((item) => {
      h += measureItemHeight(item);
    });
    return h + 4; // bottom padding
  };

  const cardHeight = Math.max(
    36,
    calcCardHeight(data.inputs),
    calcCardHeight(data.summaryMetrics)
  );

  const renderCardItems = (
    items: Array<{ label: string; value: string; isHighlight?: boolean }>,
    startX: number,
    startY: number
  ) => {
    let itemY = startY + 13.5;

    items.forEach((item) => {
      doc.setFont('ReportFont', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      const labelW = doc.getTextWidth(item.label);

      doc.setFont('ReportFont', 'bold');
      doc.setFontSize(8);
      const valW = doc.getTextWidth(item.value);

      if (labelW + valW + 4 <= innerCardW) {
        doc.setFont('ReportFont', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(100, 116, 139);
        doc.text(item.label, startX + 5, itemY);

        doc.setFont('ReportFont', 'bold');
        doc.setFontSize(8);
        if (item.isHighlight) {
          doc.setTextColor(2, 132, 199);
        } else {
          doc.setTextColor(15, 23, 42);
        }
        doc.text(item.value, startX + colWidth - 5, itemY, { align: 'right' });
        itemY += 5.8;
      } else {
        // Multi-line layout: label on top, value below (right-aligned) to prevent collision
        doc.setFont('ReportFont', 'normal');
        doc.setFontSize(7.2);
        doc.setTextColor(100, 116, 139);
        doc.text(item.label, startX + 5, itemY);

        doc.setFont('ReportFont', 'bold');
        doc.setFontSize(8);
        if (item.isHighlight) {
          doc.setTextColor(2, 132, 199);
        } else {
          doc.setTextColor(15, 23, 42);
        }
        doc.text(item.value, startX + colWidth - 5, itemY + 4, { align: 'right' });
        itemY += 9.5;
      }
    });
  };

  // Card 1: User Inputs & Assumptions
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, currentY, colWidth, cardHeight, 2, 2, 'FD');

  doc.setFont('ReportFont', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(30, 41, 59);
  doc.text('Inputs & Assumptions', margin + 5, currentY + 7);
  renderCardItems(data.inputs, margin, currentY);

  // Card 2: Calculation Results Dashboard
  const card2X = margin + colWidth + 6;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.roundedRect(card2X, currentY, colWidth, cardHeight, 2, 2, 'FD');

  doc.setFont('ReportFont', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(30, 41, 59);
  doc.text('Key Results & Metrics', card2X + 5, currentY + 7);
  renderCardItems(data.summaryMetrics, card2X, currentY);

  currentY += cardHeight + 6;

  // Notes or Educational guidance (if provided)
  if (data.notes) {
    doc.setFillColor(239, 246, 255);
    doc.setDrawColor(191, 219, 254);
    doc.setLineWidth(0.3);
    const splitNotes = doc.splitTextToSize(data.notes, contentWidth - 10);
    const noteBoxHeight = splitNotes.length * 3.4 + 7;
    doc.roundedRect(margin, currentY, contentWidth, noteBoxHeight, 2, 2, 'FD');

    doc.setFont('ReportFont', 'normal');
    doc.setFontSize(7.3);
    doc.setTextColor(30, 58, 138);
    doc.text(splitNotes, margin + 5, currentY + 4.8);

    currentY += noteBoxHeight + 5;
  }

  // Projection Table
  currentY = printTableHeader(currentY);

  const rowHeight = 6.2;

  data.growthSchedule.forEach((row, idx) => {
    // Check if new page is needed for this row
    if (currentY + rowHeight > maxContentBottom) {
      doc.addPage();
      drawPdfBackgroundWatermark(doc, pageWidth, pageHeight);
      currentY = printSubsequentPageHeader();
      currentY = printTableHeader(currentY, true);
    }

    if (idx % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(margin, currentY, contentWidth, rowHeight, 'F');
    }

    doc.setFont('ReportFont', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(15, 23, 42);

    doc.text(String(row.col1), colX.c1, currentY + 4.3);
    doc.text(String(row.col2), colX.c2, currentY + 4.3, { align: 'right' });
    doc.text(String(row.col3), colX.c3, currentY + 4.3, { align: 'right' });
    doc.text(String(row.col4), colX.c4, currentY + 4.3, { align: 'right' });

    doc.setFont('ReportFont', 'bold');
    doc.setTextColor(2, 132, 199);
    doc.text(String(row.col5), colX.c5, currentY + 4.3, { align: 'right' });

    doc.setDrawColor(241, 245, 249);
    doc.setLineWidth(0.2);
    doc.line(margin, currentY + rowHeight, margin + contentWidth, currentY + rowHeight);

    currentY += rowHeight;
  });

  // Disclaimer block
  const disclaimerText = data.disclaimer || DEFAULT_CALCULATOR_DISCLAIMER;
  const splitDisclaimer = doc.splitTextToSize(disclaimerText, contentWidth - 8);
  const disclaimerHeight = splitDisclaimer.length * 3.3 + 9;

  // If disclaimer doesn't fit on this page, push cleanly to a new page
  if (currentY + disclaimerHeight + 4 > maxContentBottom) {
    doc.addPage();
    drawPdfBackgroundWatermark(doc, pageWidth, pageHeight);
    currentY = printSubsequentPageHeader();
  }

  currentY += 4;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin, currentY, contentWidth, disclaimerHeight, 1.5, 1.5, 'FD');

  doc.setFont('ReportFont', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text('Important Disclaimer:', margin + 4, currentY + 5);

  doc.setFont('ReportFont', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(100, 116, 139);
  doc.text(splitDisclaimer, margin + 4, currentY + 9);

  // Apply consistent footers and page numbers across ALL pages
  const totalPages = doc.getNumberOfPages();
  for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
    doc.setPage(pageNum);

    const footerDividerY = pageHeight - 15;
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(margin, footerDividerY, pageWidth - margin, footerDividerY);

    // Left: Brand
    doc.setFont('ReportFont', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(15, 23, 42);
    doc.text('Finance Brunch', margin, footerDividerY + 4.5);

    // Center: Verified Contact Details
    doc.setFont('ReportFont', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    doc.text(
      'Email: admin@financebrunch.in   |   Phone: +91 7842-494-981   |   Website: https://financebrunch.in',
      margin + 24,
      footerDividerY + 4.5
    );

    // Right: Page Number
    doc.setFont('ReportFont', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - margin, footerDividerY + 4.5, { align: 'right' });
  }

  return doc;
}

/**
 * 2. DOWNLOAD AS PDF (Client-side Blob Download)
 */
export async function downloadCalculatorPdf(data: CalculatorExportData) {
  const doc = buildCalculatorPdfDoc(data);
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
        headers: {
          default: getDocxWatermarkHeader(),
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
                            type: 'png',
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
