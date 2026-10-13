
// Create a custom event system for tracking calculations
const CALCULATION_EVENT = 'mutual-fund-calculation';

// Function to dispatch a calculation event
export const dispatchCalculationEvent = () => {
  const event = new CustomEvent(CALCULATION_EVENT);
  document.dispatchEvent(event);
};

// Function to subscribe to calculation events
export const subscribeToCalculationEvents = (callback: () => void) => {
  document.addEventListener(CALCULATION_EVENT, callback);
  return () => {
    document.removeEventListener(CALCULATION_EVENT, callback);
  };
};
