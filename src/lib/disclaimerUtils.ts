/**
 * disclaimerUtils.ts
 *
 * Previously contained sessionStorage helpers that persisted the disclaimer
 * acceptance state within a browser tab session. Those helpers have been
 * removed because the RegulatoryDisclaimerGuard now uses component-local state
 * exclusively, ensuring the disclaimer reappears on every route visit.
 *
 * This file is kept for potential future use (e.g., analytics or audit logging).
 */

export const DISCLAIMER_STORAGE_KEY = 'fb_regulatory_disclaimer_accepted';
