/**
 * Finance Brunch - Piecewise & Logarithmic Slider Scaling Utilities
 *
 * Provides smooth, beginner-friendly non-linear slider progressions for financial calculators.
 * Maps normalized slider positions (0-100) to practical monetary ranges up to ₹100 Crore.
 * Ensures small amounts (₹100 to ₹1 Lakh) have fine, comfortable increments for 99% of users,
 * while still enabling sliders to scale up to the maximum ₹100 Crore limit.
 */

export interface ScaleBreakpoint {
  percent: number; // 0 to 100
  value: number;   // Value in Rupees at this breakpoint
  step: number;    // Snap increment within this segment
}

export interface SliderScaleConfig {
  breakpoints: ScaleBreakpoint[];
  min: number;
  max: number;
  labels: { percent: number; label: string }[];
}

/**
 * Standard piecewise scale for Monthly SIP & Step-Up SIP (₹100 to ₹100 Crore)
 */
export const SIP_MONTHLY_SCALE: SliderScaleConfig = {
  min: 100,
  max: 1000000000, // ₹100 Crore
  breakpoints: [
    { percent: 0, value: 100, step: 100 },
    { percent: 20, value: 2500, step: 250 },
    { percent: 40, value: 10000, step: 500 },
    { percent: 60, value: 50000, step: 1000 },
    { percent: 80, value: 500000, step: 10000 },
    { percent: 90, value: 5000000, step: 100000 },
    { percent: 100, value: 1000000000, step: 10000000 },
  ],
  labels: [
    { percent: 0, label: '₹100' },
    { percent: 20, label: '₹2.5k' },
    { percent: 40, label: '₹10k' },
    { percent: 60, label: '₹50k' },
    { percent: 80, label: '₹5 Lakh' },
    { percent: 100, label: '₹100 Cr' },
  ],
};

/**
 * Standard piecewise scale for Lumpsum Investment (₹1,000 to ₹100 Crore)
 */
export const LUMPSUM_INVESTMENT_SCALE: SliderScaleConfig = {
  min: 1000,
  max: 1000000000, // ₹100 Crore
  breakpoints: [
    { percent: 0, value: 1000, step: 500 },
    { percent: 20, value: 25000, step: 2500 },
    { percent: 40, value: 100000, step: 5000 },
    { percent: 60, value: 500000, step: 10000 },
    { percent: 80, value: 2500000, step: 50000 },
    { percent: 90, value: 10000000, step: 500000 },
    { percent: 100, value: 1000000000, step: 25000000 },
  ],
  labels: [
    { percent: 0, label: '₹1,000' },
    { percent: 20, label: '₹25k' },
    { percent: 40, label: '₹1 Lakh' },
    { percent: 60, label: '₹5 Lakh' },
    { percent: 80, label: '₹25 Lakh' },
    { percent: 100, label: '₹100 Cr' },
  ],
};

/**
 * Standard piecewise scale for SWP Initial Corpus (₹10,000 to ₹100 Crore)
 */
export const SWP_CORPUS_SCALE: SliderScaleConfig = {
  min: 10000,
  max: 1000000000, // ₹100 Crore
  breakpoints: [
    { percent: 0, value: 10000, step: 5000 },
    { percent: 20, value: 100000, step: 10000 },
    { percent: 40, value: 500000, step: 25000 },
    { percent: 60, value: 2500000, step: 50000 },
    { percent: 80, value: 10000000, step: 500000 },
    { percent: 90, value: 50000000, step: 2500000 },
    { percent: 100, value: 1000000000, step: 50000000 },
  ],
  labels: [
    { percent: 0, label: '₹10k' },
    { percent: 20, label: '₹1 Lakh' },
    { percent: 40, label: '₹5 Lakh' },
    { percent: 60, label: '₹25 Lakh' },
    { percent: 80, label: '₹1 Cr' },
    { percent: 100, label: '₹100 Cr' },
  ],
};

/**
 * Standard piecewise scale for SWP Monthly Withdrawal (₹500 to ₹100 Crore)
 */
export const SWP_WITHDRAWAL_SCALE: SliderScaleConfig = {
  min: 500,
  max: 1000000000, // ₹100 Crore
  breakpoints: [
    { percent: 0, value: 500, step: 250 },
    { percent: 20, value: 2500, step: 250 },
    { percent: 40, value: 10000, step: 500 },
    { percent: 60, value: 50000, step: 1000 },
    { percent: 80, value: 200000, step: 5000 },
    { percent: 90, value: 1000000, step: 25000 },
    { percent: 100, value: 1000000000, step: 10000000 },
  ],
  labels: [
    { percent: 0, label: '₹500' },
    { percent: 20, label: '₹2.5k' },
    { percent: 40, label: '₹10k' },
    { percent: 60, label: '₹50k' },
    { percent: 80, label: '₹2 Lakh' },
    { percent: 100, label: '₹100 Cr' },
  ],
};

/**
 * Converts a numeric value in Rupees to a normalized slider position (0 - 100).
 */
export function valueToSliderPos(value: number, config: SliderScaleConfig): number {
  if (isNaN(value) || value <= config.min) return 0;
  if (value >= config.max) return 100;

  const { breakpoints } = config;
  for (let i = 0; i < breakpoints.length - 1; i++) {
    const bCurrent = breakpoints[i];
    const bNext = breakpoints[i + 1];

    if (value >= bCurrent.value && value <= bNext.value) {
      const valueSpan = bNext.value - bCurrent.value;
      if (valueSpan === 0) return bCurrent.percent;
      const ratio = (value - bCurrent.value) / valueSpan;
      return bCurrent.percent + ratio * (bNext.percent - bCurrent.percent);
    }
  }

  return 100;
}

/**
 * Converts a normalized slider position (0 - 100) to a snapped Rupee value.
 */
export function sliderPosToValue(pos: number, config: SliderScaleConfig): number {
  const clampedPos = Math.max(0, Math.min(100, pos));
  if (clampedPos <= 0) return config.min;
  if (clampedPos >= 100) return config.max;

  const { breakpoints } = config;
  for (let i = 0; i < breakpoints.length - 1; i++) {
    const bCurrent = breakpoints[i];
    const bNext = breakpoints[i + 1];

    if (clampedPos >= bCurrent.percent && clampedPos <= bNext.percent) {
      const posSpan = bNext.percent - bCurrent.percent;
      if (posSpan === 0) return bCurrent.value;
      const ratio = (clampedPos - bCurrent.percent) / posSpan;
      const rawValue = bCurrent.value + ratio * (bNext.value - bCurrent.value);

      // Snap to segment step
      const step = bCurrent.step;
      const offset = rawValue - bCurrent.value;
      const snapped = bCurrent.value + Math.round(offset / step) * step;

      return Math.max(bCurrent.value, Math.min(bNext.value, Math.round(snapped)));
    }
  }

  return config.max;
}
