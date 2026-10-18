import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { setActiveLenis } from '@/lib/smoothScroll';

gsap.registerPlugin(ScrollTrigger);

/**
 * One app-wide Lenis instance. Wheel input is smoothed while touch scrolling
 * stays native, and the instance is removed when the React tree unmounts.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let lenis: Lenis | null = null;
    const driveLenis = (time: number) => lenis?.raf(time * 1000);
    const syncScrollTrigger = () => ScrollTrigger.update();

    const stop = () => {
      if (!lenis) return;
      gsap.ticker.remove(driveLenis);
      lenis.off('scroll', syncScrollTrigger);
      setActiveLenis(null);
      lenis.destroy();
      lenis = null;
    };

    const start = () => {
      if (reducedMotion.matches || lenis) return;
      lenis = new Lenis({
        autoRaf: false,
        smoothWheel: true,
        lerp: 0.12,
        wheelMultiplier: 0.9,
        // React Router and scrollUtils already coordinate same-page anchors.
        anchors: false,
      });
      setActiveLenis(lenis);
      lenis.on('scroll', syncScrollTrigger);
      gsap.ticker.add(driveLenis);
      gsap.ticker.lagSmoothing(0);
      ScrollTrigger.refresh();
    };

    const handleMotionPreference = () => {
      stop();
      start();
    };

    start();
    reducedMotion.addEventListener('change', handleMotionPreference);

    return () => {
      reducedMotion.removeEventListener('change', handleMotionPreference);
      stop();
    };
  }, []);

  return null;
}
