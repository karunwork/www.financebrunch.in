import type Lenis from 'lenis';

let activeLenis: Lenis | null = null;

export function setActiveLenis(instance: Lenis | null) {
  activeLenis = instance;
}

export function getActiveLenis() {
  return activeLenis;
}

export function scrollWindowTo(top: number, smooth = true) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const shouldAnimate = smooth && !prefersReducedMotion;

  if (activeLenis) {
    activeLenis.scrollTo(top, shouldAnimate ? { duration: 1.05 } : { immediate: true });
    return;
  }

  window.scrollTo({
    top,
    behavior: shouldAnimate ? 'smooth' : 'auto',
  });
}
