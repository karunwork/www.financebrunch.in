
import { useCallback } from 'react';

/**
 * A custom hook that wraps the original calculation functions to track calculation events
 */
export const useCalculationTracker = (onCalculate?: () => void) => {
  const trackCalculation = useCallback(() => {
    // Call the onCalculate callback if provided
    if (onCalculate) {
      onCalculate();
    }
    
    // Log the calculation event
    console.log('Calculation performed');
  }, [onCalculate]);
  
  return trackCalculation;
};
