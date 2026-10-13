import { type Variants } from 'framer-motion';

/**
 * Standard cubic bezier easing curves for financial/corporate design.
 * Subtle, professional, non-bouncy deceleration curves.
 */
export const EASING = {
  // Smooth deceleration for natural entrances
  decelerate: [0.22, 1, 0.36, 1] as const,
  // Standard ease-in-out for symmetric transitions
  easeInOut: [0.4, 0, 0.2, 1] as const,
  // Sharp exit curve
  accelerate: [0.4, 0, 1, 1] as const,
};

/**
 * Standard duration tokens (in seconds) to maintain consistent rhythm.
 */
export const DURATIONS = {
  instant: 0.15,
  fast: 0.25,
  normal: 0.45,
  moderate: 0.6,
  slow: 0.8,
};

/**
 * Default scroll viewport trigger options.
 * Using once: true ensures animations run only once without continuous re-triggering.
 */
export const DEFAULT_VIEWPORT = {
  once: true,
  amount: 0.15,
  margin: '-40px 0px',
} as const;

/**
 * 1. Fade-in Variant
 * Pure opacity transition with zero layout shift.
 */
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (custom?: { delay?: number; duration?: number }) => ({
    opacity: 1,
    transition: {
      duration: custom?.duration ?? DURATIONS.normal,
      delay: custom?.delay ?? 0,
      ease: EASING.decelerate,
    },
  }),
};

/**
 * 2. Fade-up Variant
 * Gentle upward translation (16px) combined with opacity fade.
 * Low distance prevents jarring jumps and layout shifts.
 */
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (custom?: { delay?: number; duration?: number; distance?: number }) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: custom?.duration ?? DURATIONS.normal,
      delay: custom?.delay ?? 0,
      ease: EASING.decelerate,
    },
  }),
};

/**
 * 3. Slide-in from Left Variant
 * Enters from -24px on the X axis.
 */
export const slideLeftVariants: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: (custom?: { delay?: number; duration?: number }) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: custom?.duration ?? DURATIONS.moderate,
      delay: custom?.delay ?? 0,
      ease: EASING.decelerate,
    },
  }),
};

/**
 * 4. Slide-in from Right Variant
 * Enters from +24px on the X axis.
 */
export const slideRightVariants: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: (custom?: { delay?: number; duration?: number }) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: custom?.duration ?? DURATIONS.moderate,
      delay: custom?.delay ?? 0,
      ease: EASING.decelerate,
    },
  }),
};

/**
 * 5. Staggered Container Variant
 * Orchestrates sequenced animations for children elements.
 */
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (custom?: { staggerDelay?: number; delayChildren?: number }) => ({
    opacity: 1,
    transition: {
      delayChildren: custom?.delayChildren ?? 0.05,
      staggerChildren: custom?.staggerDelay ?? 0.1,
    },
  }),
};

/**
 * Child item variant designed for use within StaggerContainer.
 */
export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATIONS.normal,
      ease: EASING.decelerate,
    },
  },
};

/**
 * 6. Image Reveal Variant
 * Subtle scale down from 1.04 to 1.0 with opacity fade.
 * Gives images a refined photographic reveal.
 */
export const imageRevealVariants: Variants = {
  hidden: { opacity: 0, scale: 1.04 },
  visible: (custom?: { delay?: number; duration?: number }) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: custom?.duration ?? DURATIONS.slow,
      delay: custom?.delay ?? 0,
      ease: EASING.decelerate,
    },
  }),
};

/**
 * 7. Subtle Hover & Focus Transition Variants
 * Gentle elevation (-3px) and slight border glow without distracting spring bounce.
 * Accessible for keyboard navigation via whileFocus.
 */
export const hoverCardVariants: Variants = {
  initial: { y: 0, scale: 1 },
  hover: {
    y: -3,
    transition: {
      duration: DURATIONS.fast,
      ease: EASING.decelerate,
    },
  },
  tap: {
    y: 0,
    scale: 0.99,
    transition: {
      duration: DURATIONS.instant,
    },
  },
};

/**
 * Reduced motion fallback helper.
 * When prefers-reduced-motion is active, strips away translations/scaling
 * and keeps only simple opacity transitions to respect user accessibility preferences.
 */
export function getAccessibleVariants(variants: Variants, shouldReduceMotion: boolean): Variants {
  if (!shouldReduceMotion) return variants;

  const accessible: Variants = {};
  for (const key of Object.keys(variants)) {
    const variantValue = variants[key];
    if (typeof variantValue === 'function') {
      accessible[key] = (custom: unknown) => {
        const result = variantValue(custom);
        const opacity =
          typeof result === 'object' && result !== null && 'opacity' in result
            ? (result as Record<string, unknown>).opacity
            : key === 'hidden'
              ? 0
              : 1;
        return {
          opacity,
          transition: { duration: DURATIONS.fast },
        };
      };
    } else if (typeof variantValue === 'object' && variantValue !== null) {
      const opacity =
        'opacity' in variantValue
          ? (variantValue as Record<string, unknown>).opacity
          : key === 'hidden'
            ? 0
            : 1;
      accessible[key] = {
        opacity,
        transition: { duration: DURATIONS.fast },
      };
    }
  }
  return accessible;
}
