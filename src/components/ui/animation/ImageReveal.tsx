import React from 'react';
import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import { EASING, DURATIONS, DEFAULT_VIEWPORT } from '@/lib/animations';
import { cn } from '@/lib/utils';

export interface ImageRevealProps extends HTMLMotionProps<'div'> {
  delay?: number;
  duration?: number;
  scaleStart?: number;
  once?: boolean;
  aspectRatioClass?: string;
  containerClassName?: string;
  children: React.ReactNode;
}

/**
 * Reusable image reveal container.
 * Constrains layout shifts (CLS) through fixed container boundaries,
 * applying a subtle 1.04 -> 1.0 scale settling effect with smooth opacity.
 */
export const ImageReveal = React.forwardRef<HTMLDivElement, ImageRevealProps>(
  (
    {
      delay = 0,
      duration = DURATIONS.slow,
      scaleStart = 1.04,
      once = true,
      aspectRatioClass,
      containerClassName,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const shouldReduceMotion = useReducedMotion();

    return (
      <div
        ref={ref}
        className={cn('overflow-hidden relative', aspectRatioClass, containerClassName)}
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: shouldReduceMotion ? 1 : scaleStart,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
            transition: {
              duration: shouldReduceMotion ? DURATIONS.fast : duration,
              delay: shouldReduceMotion ? 0 : delay,
              ease: EASING.decelerate,
            },
          }}
          viewport={DEFAULT_VIEWPORT}
          className={cn('w-full h-full', className)}
          {...props}
        >
          {children}
        </motion.div>
      </div>
    );
  }
);

ImageReveal.displayName = 'ImageReveal';
