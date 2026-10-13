import React from 'react';
import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import { EASING, DURATIONS, DEFAULT_VIEWPORT } from '@/lib/animations';
import { cn } from '@/lib/utils';

export interface StaggerContainerProps extends HTMLMotionProps<'div'> {
  staggerDelay?: number;
  delayChildren?: number;
  once?: boolean;
  amount?: number | 'some' | 'all';
  children: React.ReactNode;
  className?: string;
}

/**
 * Reusable container that coordinates sequential staggered child entrances.
 * Use with StaggerItem for child components.
 */
export const StaggerContainer = React.forwardRef<HTMLDivElement, StaggerContainerProps>(
  (
    {
      staggerDelay = 0.08,
      delayChildren = 0.04,
      once = true,
      amount = 0.15,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const shouldReduceMotion = useReducedMotion();

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once,
          amount,
          margin: DEFAULT_VIEWPORT.margin,
        }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              delayChildren: shouldReduceMotion ? 0 : delayChildren,
              staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
            },
          },
        }}
        className={cn(className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

StaggerContainer.displayName = 'StaggerContainer';

export interface StaggerItemProps extends HTMLMotionProps<'div'> {
  yOffset?: number;
  children: React.ReactNode;
  className?: string;
}

/**
 * Child item designed to sit inside a StaggerContainer.
 * Automatically animates in sequence.
 */
export const StaggerItem = React.forwardRef<HTMLDivElement, StaggerItemProps>(
  ({ yOffset = 14, children, className, ...props }, ref) => {
    const shouldReduceMotion = useReducedMotion();

    return (
      <motion.div
        ref={ref}
        variants={{
          hidden: { opacity: 0, y: shouldReduceMotion ? 0 : yOffset },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: shouldReduceMotion ? DURATIONS.fast : DURATIONS.normal,
              ease: EASING.decelerate,
            },
          },
        }}
        className={cn(className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

StaggerItem.displayName = 'StaggerItem';
