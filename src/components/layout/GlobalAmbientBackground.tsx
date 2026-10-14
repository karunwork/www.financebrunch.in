import React, { useEffect, useRef } from 'react';

/**
 * GlobalAmbientBackground Component
 * Renders the ambient blue gradients and ONE centered, slightly brighter 'FB' watermark logo.
 * Positioned as a fixed layer behind all content with pointer-events-none,
 * active across all routes, and dynamically styled for light and dark themes.
 */
export function GlobalAmbientBackground() {
  const watermarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    let frame = 0;
    const updateParallax = () => {
      frame = 0;
      const offset = Math.min(window.scrollY * 0.035, 28);
      watermarkRef.current?.style.setProperty('transform', `translate3d(0, ${offset}px, 0)`);
    };
    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateParallax);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none transition-colors duration-300"
      aria-hidden="true"
    >
      {/* 1. Subtle Ambient Blue Radial Gradients (Preserving brand background atmosphere) */}
      {/* Top-Right Glow */}
      <div 
        className="absolute -top-[10%] -right-[10%] w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] rounded-full blur-3xl opacity-60 dark:opacity-75 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle at 60% 40%, rgba(37, 99, 235, 0.06) 0%, rgba(96, 165, 250, 0.02) 45%, transparent 70%)',
        }}
      />
      
      {/* Mid-Left Soft Accent Glow */}
      <div 
        className="absolute top-[40%] -left-[15%] w-[55vw] h-[55vw] max-w-[800px] max-h-[800px] rounded-full blur-3xl opacity-50 dark:opacity-65 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle at 40% 50%, rgba(59, 130, 246, 0.045) 0%, rgba(30, 64, 175, 0.015) 50%, transparent 70%)',
        }}
      />

      {/* Bottom-Right Soft Grounding Glow */}
      <div 
        className="absolute -bottom-[15%] right-[5%] w-[65vw] h-[65vw] max-w-[950px] max-h-[950px] rounded-full blur-3xl opacity-55 dark:opacity-70 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.05) 0%, rgba(37, 99, 235, 0.02) 50%, transparent 70%)',
        }}
      />

      {/* 2. Single, Centered Official Finance Brunch FB Logo Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <div
          ref={watermarkRef}
          className="w-[280px] sm:w-[380px] md:w-[480px] lg:w-[580px] xl:w-[680px] max-w-[85vw] max-h-[80vh] opacity-[0.085] dark:opacity-[0.11] transition-opacity duration-300 pointer-events-none select-none flex items-center justify-center"
        >
          <img
            src="/images/fb-watermark.png"
            alt=""
            className="w-full h-auto object-contain pointer-events-none select-none filter contrast-105 dark:brightness-110"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
}
