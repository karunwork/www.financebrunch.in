/**
 * Finance Brunch - Centralized Report Watermark Utility
 * Provides standardized, consistent background watermark rendering
 * for all PDF (jsPDF) and Word (.docx) financial report exports.
 * 
 * Features:
 * - Uses the official standalone FB monogram mark
 * - Centered on every page of the document
 * - Preserves exact original proportions (aspect ratio 600 / 487)
 * - Extremely subtle, low-contrast appearance (approx. 6.5% opacity)
 * - Positioned strictly behind all report text, figures, tables, and disclaimers
 * - Completely separate from the top-right header logo
 */

import { GState, jsPDF } from 'jspdf';
import {
  Header,
  Paragraph,
  ImageRun,
  HorizontalPositionRelativeFrom,
  HorizontalPositionAlign,
  VerticalPositionRelativeFrom,
  VerticalPositionAlign,
} from 'docx';
import {
  FINANCE_BRUNCH_WATERMARK_RAW,
  WATERMARK_ASPECT_RATIO,
} from '@/components/tax-calculator/utils/reportLogo';

export {
  FINANCE_BRUNCH_WATERMARK_RAW,
  WATERMARK_ASPECT_RATIO,
};

/**
 * Draws the centered subtle official FB watermark on the active page of a jsPDF document.
 * Must be invoked immediately upon page creation before any text, shapes, or tables are rendered,
 * ensuring it resides strictly at the bottom of the PDF layer stack.
 */
export function drawPdfBackgroundWatermark(
  doc: jsPDF,
  pageWidth: number = 210,
  pageHeight: number = 297,
  targetWidth: number = 110
): void {
  const watermarkWidth = targetWidth;
  const watermarkHeight = watermarkWidth / WATERMARK_ASPECT_RATIO;
  const watermarkX = (pageWidth - watermarkWidth) / 2;
  const watermarkY = (pageHeight - watermarkHeight) / 2;

  doc.saveGraphicsState();
  try {
    // Subtle opacity (opacity is also baked into the watermark PNG asset for 100% viewer compatibility)
    doc.setGState(new GState({ opacity: 0.95 }));
  } catch {
    // Fallback if GState is unsupported
  }

  try {
    doc.addImage(
      FINANCE_BRUNCH_WATERMARK_RAW,
      'PNG',
      watermarkX,
      watermarkY,
      watermarkWidth,
      watermarkHeight
    );
  } catch (err) {
    console.warn('Failed to embed FB watermark into PDF:', err);
  }
  doc.restoreGraphicsState();
}

/**
 * Returns a Word (.docx) Header component containing a centered, floating FB watermark image.
 * Setting `behindDocument: true` ensures the mark is drawn in the background layer beneath
 * all paragraphs, tables, and cell content, while header placement repeats it seamlessly on every page.
 */
export function getDocxWatermarkHeader(targetWidth: number = 380): Header {
  const watermarkBytes = Uint8Array.from(atob(FINANCE_BRUNCH_WATERMARK_RAW), (c) => c.charCodeAt(0));

  return new Header({
    children: [
      new Paragraph({
        children: [
          new ImageRun({
            type: 'png',
            data: watermarkBytes,
            transformation: {
              width: targetWidth,
              height: Math.round(targetWidth / WATERMARK_ASPECT_RATIO),
            },
            floating: {
              horizontalPosition: {
                relative: HorizontalPositionRelativeFrom.PAGE,
                align: HorizontalPositionAlign.CENTER,
              },
              verticalPosition: {
                relative: VerticalPositionRelativeFrom.PAGE,
                align: VerticalPositionAlign.CENTER,
              },
              behindDocument: true,
            },
          }),
        ],
      }),
    ],
  });
}
