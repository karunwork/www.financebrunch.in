/**
 * Utilities for sticky-navbar-aware section scrolling and viewport management.
 */

export const NAVBAR_HEIGHT = 84;

export function scrollToSection(sectionId: string, smooth: boolean = true): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false;
  
  const element = document.getElementById(sectionId);
  if (!element) return false;

  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const targetPosition = Math.max(0, elementPosition - NAVBAR_HEIGHT);

  window.scrollTo({
    top: targetPosition,
    behavior: smooth ? 'smooth' : 'auto'
  });

  return true;
}

export function scrollToTop(smooth: boolean = true): void {
  if (typeof window === 'undefined') return;
  window.scrollTo({
    top: 0,
    behavior: smooth ? 'smooth' : 'auto'
  });
}
