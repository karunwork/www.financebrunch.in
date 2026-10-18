/**
 * Utilities for sticky-navbar-aware section scrolling and viewport management.
 */

import { scrollWindowTo } from '@/lib/smoothScroll';

export const NAVBAR_HEIGHT = 84;

export function scrollToSection(sectionId: string, smooth: boolean = true): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false;
  
  const element = document.getElementById(sectionId);
  if (!element) return false;

  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const targetPosition = Math.max(0, elementPosition - NAVBAR_HEIGHT);

  scrollWindowTo(targetPosition, smooth);

  return true;
}

export function scrollToTop(smooth: boolean = true): void {
  if (typeof window === 'undefined') return;
  scrollWindowTo(0, smooth);
}
