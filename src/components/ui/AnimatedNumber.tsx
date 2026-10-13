
import { useState, useEffect, useRef } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

export interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  start?: number;
  formatNumber?: boolean;
  className?: string;
}

export const AnimatedNumber = ({ 
  value, 
  prefix = '',
  suffix = '', 
  duration = 1200, 
  start = 0,
  formatNumber = false,
  className
}: AnimatedNumberProps) => {
  const [current, setCurrent] = useState(start);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px 0px' });
  const shouldReduceMotion = useReducedMotion();
  
  useEffect(() => {
    if (shouldReduceMotion) {
      setCurrent(value);
      setHasAnimated(true);
      return;
    }

    if (!inView || hasAnimated) return;

    if (value === start) {
      setCurrent(value);
      setHasAnimated(true);
      return;
    }
    
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progressRatio = Math.min(elapsed / duration, 1);
      
      // Deceleration curve (easeOutCubic)
      const easeProgress = 1 - Math.pow(1 - progressRatio, 3);
      const nextValue = Math.round(start + easeProgress * (value - start));
      
      setCurrent(nextValue);
      
      if (progressRatio < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        setCurrent(value);
        setHasAnimated(true);
      }
    };
    
    animationFrameId = window.requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [inView, hasAnimated, shouldReduceMotion, value, start, duration]);

  const displayValue = formatNumber ? current.toLocaleString() : current;

  return (
    <span ref={ref} className={className}>
      {prefix}{displayValue}{suffix}
    </span>
  );
};

export default AnimatedNumber;

