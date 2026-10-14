import React from 'react';
import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import { EASING, DURATIONS, DEFAULT_VIEWPORT } from '@/lib/animations';
import { cn } from '@/lib/utils';

export type FadeDirection = 'up' | 'down' | 'left' | 'right' | 'none';

export interface FadeInProps extends HTMLMotionProps<'div'> {
  direction?: FadeDirection;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  amount?: number | 'some' | 'all';
  children: React.ReactNode;
  className?: string;
}

/**
 * Reusable scroll-triggered Fade component.
 * Supports Fade-in, Fade-up, and Slide-in (left/right).
 * Automatically honors prefers-reduced-motion to ensure accessibility.
 */
export const FadeIn = React.forwardRef<HTMLDivElement, FadeInProps>(
  (
    {
      direction = 'up',
      delay = 0,
      duration = DURATIONS.normal,
      distance = 18,
      once = true,
      amount = 0.15,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const shouldReduceMotion = useReducedMotion();

    const getInitialCoordinates = () => {
      if (shouldReduceMotion || direction === 'none') {
        return { x: 0, y: 0 };
      }
      switch (direction) {
        case 'up':
          return { x: 0, y: distance };
        case 'down':
          return { x: 0, y: -distance };
        case 'left':
          return { x: -distance * 1.3, y: 0 };
        case 'right':
          return { x: distance * 1.3, y: 0 };
        default:
          return { x: 0, y: 0 };
      }
    };

    const initialPos = getInitialCoordinates();

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, ...initialPos }}
        whileInView={{
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration: shouldReduceMotion ? DURATIONS.fast : duration,
            delay: shouldReduceMotion ? 0 : delay,
            ease: EASING.decelerate,
          },
        }}
        viewport={{
          once,
          amount,
          margin: DEFAULT_VIEWPORT.margin,
        }}
        className={cn('scroll-depth', className)}
        data-scroll-depth="18"
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

FadeIn.displayName = 'FadeIn';
