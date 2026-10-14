import { useEffect } from 'react';

const SELECTOR = '[data-scroll-depth]';

/**
 * Coordinates the small continuous depth offsets used by shared motion
 * primitives. Individual elements use the CSS translate property so this
 * remains independent from Framer Motion's transform animation.
 */
export function ScrollLinkedMotion() {
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    let frame = 0;
    let elements: HTMLElement[] = [];

    const collectElements = () => {
      elements = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
    };

    const update = () => {
      frame = 0;
      const viewportCenter = window.innerHeight / 2;

      for (const element of elements) {
        const rect = element.getBoundingClientRect();
        if (rect.bottom < -120 || rect.top > window.innerHeight + 120) continue;

        const depth = Number(element.dataset.scrollDepth) || 0;
        const elementCenter = rect.top + rect.height / 2;
        const normalizedPosition = (elementCenter - viewportCenter) / Math.max(window.innerHeight, 1);
        const offset = Math.max(-1, Math.min(1, normalizedPosition)) * depth;
        element.style.translate = `0 ${offset.toFixed(2)}px`;
      }
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    collectElements();
    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    const observer = new MutationObserver(() => {
      collectElements();
      requestUpdate();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      for (const element of elements) element.style.removeProperty('translate');
    };
  }, []);

  return null;
}
