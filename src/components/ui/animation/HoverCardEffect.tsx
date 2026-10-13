import React from 'react';
import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import { EASING, DURATIONS } from '@/lib/animations';
import { cn } from '@/lib/utils';

export interface HoverCardEffectProps extends HTMLMotionProps<'div'> {
  liftDistance?: number;
  tapScale?: number;
  children: React.ReactNode;
  className?: string;
}

/**
 * Reusable subtle hover & focus wrapper for interactive cards, buttons, or service panels.
 * Provides subtle elevation (-3px) and slight click feedback (0.99 scale).
 * Fully accessible for keyboard navigation.
 */
export const HoverCardEffect = React.forwardRef<HTMLDivElement, HoverCardEffectProps>(
  (
    {
      liftDistance = 3,
      tapScale = 0.99,
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
        initial={{ y: 0, scale: 1 }}
        whileHover={
          shouldReduceMotion
            ? undefined
            : {
                y: -liftDistance,
                transition: {
                  duration: DURATIONS.fast,
                  ease: EASING.decelerate,
                },
              }
        }
        whileTap={
          shouldReduceMotion
            ? undefined
            : {
                scale: tapScale,
                y: 0,
                transition: { duration: DURATIONS.instant },
              }
        }
        className={cn('transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500', className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

HoverCardEffect.displayName = 'HoverCardEffect';
