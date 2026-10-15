
import { useEffect, useRef } from 'react';
import { dispatchCalculationEvent } from './calculationEvents';

/**
 * This component monitors DOM events to track calculator button clicks
 * Since we can't modify the calculator components directly
 */
export const CalculationWatcher = () => {
  const initialized = useRef(false);
  
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    
    // Set up a mutation observer to watch for calculator button clicks
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const target = mutation.target as HTMLElement;
          if (target.tagName === 'BUTTON' && 
              (target.innerText === 'Calculate' || 
               target.innerText.includes('Calculate') || 
               target.classList.contains('calculator-button'))) {
            
            // Track calculation button clicks
            const originalClick = target.onclick;
            target.onclick = (e) => {
              if (originalClick) {
                // @ts-expect-error - Event listener function signature variance
                originalClick.call(target, e);
              }
              // Dispatch a calculation event after a brief delay to ensure calculation completes
              setTimeout(() => dispatchCalculationEvent(), 100);
            };
          }
        }
      });
    });
    
    // Watch for DOM changes
    observer.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
    });
    
    // Watch for form submissions too (some calculators might use forms)
    const handleFormSubmit = (e: SubmitEvent) => {
      const form = e.target as HTMLFormElement;
      if (form.classList.contains('calculator-form') || 
          form.closest('.calculator-container') ||
          form.querySelector('button')?.innerText.includes('Calculate')) {
        dispatchCalculationEvent();
      }
    };
    
    document.addEventListener('submit', handleFormSubmit as EventListener);
    
    // Cleanup
    return () => {
      observer.disconnect();
      document.removeEventListener('submit', handleFormSubmit as EventListener);
    };
  }, []);
  
  return null;
};
