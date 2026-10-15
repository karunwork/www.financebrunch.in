import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AlertTriangle, Check, X } from 'lucide-react';

interface RegulatoryDisclaimerGuardProps {
  children: React.ReactNode;
}

/**
 * Shows the regulatory disclaimer modal every time the user visits a protected route.
 * State is intentionally kept in component-local state only — no sessionStorage or
 * localStorage — so the dialog reappears on every separate page visit.
 */
// Explicit route-based exclusion list for pages that do not require the regulatory disclaimer modal
const EXCLUDED_DISCLAIMER_ROUTES = [
  // 1. Insurance Solutions / Health Insurance & Term Insurance
  '/health-insurance',
  '/insurance-planning',
  '/insurance-solutions',
  '/term-insurance',

  // 2. Global Tax File
  '/global-tax-file',

  // 3. Income Tax Filing & Tax Planning
  '/income-tax-filing',
  '/tax-planning',
  '/tax-filing',

  // 4. Financial Calculators (SIP, Step-Up SIP, Lumpsum, SWP)
  '/calculator',
  '/calculators',
  '/sip-calculator',
  '/step-up-sip-calculator',
  '/lumpsum-calculator',
  '/swp-calculator',
];

export function RegulatoryDisclaimerGuard({ children }: RegulatoryDisclaimerGuardProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const isExcluded = EXCLUDED_DISCLAIMER_ROUTES.includes(location.pathname);

  // `accepted` tracks whether the user has clicked OK for the CURRENT visit.
  const [accepted, setAccepted] = useState(false);
  const okButtonRef = useRef<HTMLButtonElement>(null);

  const handleDecline = React.useCallback(() => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const handleAgree = React.useCallback(() => {
    setAccepted(true);
  }, []);

  // Reset acceptance whenever the protected route is re-entered.
  useEffect(() => {
    setAccepted(false);
  }, [location.pathname]);

  // Move keyboard focus into the dialog when it opens.
  useEffect(() => {
    if (isExcluded || accepted) return;
    const timer = setTimeout(() => {
      okButtonRef.current?.focus();
    }, 50);
    return () => clearTimeout(timer);
  }, [accepted, isExcluded]);

  // Trap keyboard within the modal while it is open.
  useEffect(() => {
    if (isExcluded || accepted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent Escape from dismissing (user must use OK or Decline).
      if (e.key === 'Escape') {
        e.preventDefault();
        handleDecline();
      }
      // Basic Tab trap — keep focus within the two action buttons.
      if (e.key === 'Tab') {
        const focusable = document
          .getElementById('disclaimer-modal')
          ?.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [accepted, isExcluded, handleDecline]);

  // If the current route is in the exclusion list, immediately render children without the disclaimer
  if (isExcluded) {
    return <>{children}</>;
  }

  if (!accepted) {
    return (
      /* Full-screen backdrop — clicking the backdrop does NOT dismiss */
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
        aria-modal="true"
        role="dialog"
        aria-labelledby="disclaimer-title"
        aria-describedby="disclaimer-body"
      >
        <div
          id="disclaimer-modal"
          className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border-2 border-amber-400/80 dark:border-amber-500/70 p-6 sm:p-7 animate-in fade-in zoom-in-95 duration-200"
          // Clicking the modal card itself must NOT bubble to the backdrop.
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700/60 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
            </div>
            <h2
              id="disclaimer-title"
              className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              Regulatory Disclaimer
            </h2>
          </div>

          {/* Body */}
          <div
            id="disclaimer-body"
            className="text-gray-700 dark:text-gray-300 space-y-3 text-sm sm:text-base leading-relaxed mb-6"
          >
            <p>
              Finance Brunch is not registered with SEBI but holds NISM certification. We do not provide
              buy/sell recommendations or engage in unauthorized financial activities. All investment
              decisions should be based on your own research and due diligence.
            </p>
            <p>
              We strictly adhere to SEBI and RBI regulations. If you come across anyone impersonating
              Finance Brunch and offering stock recommendations or direct investment advisory services,
              please report them to our compliance officer immediately.
            </p>
          </div>

          {/* Footer actions */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={handleDecline}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium text-sm hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors"
            >
              <X className="h-4 w-4" aria-hidden="true" />
              Decline
            </button>
            <button
              ref={okButtonRef}
              type="button"
              id="disclaimer-ok-button"
              onClick={handleAgree}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-semibold text-sm shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 transition-colors"
            >
              <Check className="h-4 w-4" aria-hidden="true" />
              OK, I Understand
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
