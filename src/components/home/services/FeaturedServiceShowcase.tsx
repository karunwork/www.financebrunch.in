import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { ServiceItem } from './servicesData';
import { scrollToSection } from '@/lib/scrollUtils';

interface FeaturedServiceShowcaseProps {
  service: ServiceItem;
}

export const FeaturedServiceShowcase: React.FC<FeaturedServiceShowcaseProps> = ({ service }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [mousePos, setMousePos] = useState({ x: 400, y: 300 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
      setIsTouchDevice(true);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || shouldReduceMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Scroll-linked parallax transforms
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.04, 1.08]);
  const imageY = useTransform(scrollYProgress, [0, 0.5, 1], [-15, 0, 15]);
  const planBgY = useTransform(scrollYProgress, [0, 1], [20, -30]);

  const handleScrollToNext = () => {
    scrollToSection('all-solutions-grid', true);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full rounded-3xl sm:rounded-[2.5rem] overflow-hidden border border-slate-800/80 dark:border-cyan-500/25 bg-gradient-to-b from-[#071122] via-[#091730] to-[#040C1A] text-white shadow-2xl shadow-blue-950/40 dark:shadow-[0_30px_90px_-20px_rgba(4,12,32,0.95)] transition-all duration-500 mb-8 sm:mb-10 min-h-[calc(100svh-5rem)] lg:min-h-[calc(100svh-5.25rem)] flex flex-col justify-between p-6 sm:p-10 lg:p-12 select-none"
    >
      {/* Top Architectural Inset Highlight Line */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent pointer-events-none z-20" />

      {/* Ambient Lighting Blooms */}
      <div 
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-cyan-400/15 blur-[130px] pointer-events-none z-0" 
        aria-hidden="true" 
      />
      <div 
        className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-blue-600/20 blur-[140px] pointer-events-none z-0" 
        aria-hidden="true" 
      />

      {/* Desktop Pointer-Responsive Radial Glow */}
      {!isTouchDevice && !shouldReduceMotion && (
        <div
          className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.12), transparent 70%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Oversized Cinematic Background Typography ("PLAN") */}
      <motion.div
        aria-hidden="true"
        style={{ y: shouldReduceMotion ? 0 : planBgY }}
        className="absolute -right-4 -bottom-6 sm:-bottom-10 lg:-bottom-14 pointer-events-none select-none z-0 opacity-[0.05] dark:opacity-[0.07] transition-opacity duration-700 origin-bottom-right"
      >
        <span className="font-black text-[22vw] sm:text-[18vw] lg:text-[15vw] xl:text-[13vw] tracking-tighter leading-none bg-gradient-to-br from-white via-cyan-200 to-transparent bg-clip-text text-transparent block">
          {service.backgroundWord || "PLAN"}
        </span>
      </motion.div>

      {/* Top Area: Clean Apple-Style Centered Product Header & CTAs */}
      <div className="relative z-10 w-full text-center max-w-4xl mx-auto pt-2 sm:pt-4">
        {/* Eyebrow Label */}
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-cyan-400 mb-3 sm:mb-4">
          Wealth & Investments • Strategic Advisory
        </p>

        {/* Large Clean Apple Pro Headline */}
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.04] mb-3 sm:mb-4">
          {service.title}
        </h2>

        {/* Concise Description */}
        <p className="text-slate-300 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed font-normal mb-6 sm:mb-7">
          {service.description}
        </p>

        {/* Apple-Style Prominent Call-To-Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <Link
            to={service.linkTo || '/investment-planning'}
            className="group/btn inline-flex items-center justify-center px-8 py-3.5 rounded-full text-base font-semibold text-slate-950 bg-white hover:bg-cyan-50 transition-all duration-300 shadow-xl shadow-cyan-500/15 hover:shadow-cyan-400/30 hover:scale-105 active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            <span>{service.ctaText || 'Explore Strategy'}</span>
            <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>

          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-base font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all duration-300 backdrop-blur-md hover:border-cyan-400/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            Schedule Consultation
          </Link>
        </div>
      </div>

      {/* Central / Lower Area: Broad Cinematic Hero Image Showcase */}
      <div className="relative z-10 w-full max-w-5xl mx-auto my-auto pt-6 pb-4 flex items-center justify-center">
        <div className="relative w-full aspect-[16/10] sm:aspect-[21/10] lg:aspect-[24/11] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-2xl shadow-black/70 bg-slate-950 group">
          <motion.img
            src={service.imageSrc}
            alt={service.title}
            style={{
              scale: shouldReduceMotion ? 1 : imageScale,
              y: shouldReduceMotion ? 0 : imageY,
            }}
            className="w-full h-full object-cover object-center filter contrast-[1.10] saturate-[1.08] transition-all duration-700"
            loading="eager"
          />

          {/* Refined Dark Vignettes */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#071122] via-[#071122]/30 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#071122]/40 via-transparent to-transparent pointer-events-none" />

          {/* Subtle Strategic Horizon Badge */}
          <div className="absolute bottom-4 right-4 z-10 backdrop-blur-md bg-slate-950/70 border border-white/20 rounded-xl px-3.5 py-1.5 text-xs font-medium text-slate-200 shadow-lg hidden sm:block">
            <span className="text-cyan-400 font-semibold">Strategic Horizon:</span> 3 to 15+ Years
          </div>
        </div>
      </div>

      {/* Bottom Subtle Scroll Hint Bar */}
      <div 
        id="next-solutions-hint"
        onClick={handleScrollToNext}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleScrollToNext();
          }
        }}
        className="relative z-10 w-full pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer group/hint select-none"
      >
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-medium tracking-wide">Featured Main Advisory Portfolio</span>
        </div>

        <div className="flex items-center space-x-1.5 font-medium group-hover/hint:translate-y-0.5 transition-transform duration-200">
          <span>Explore 6 Additional Specialized Solutions</span>
          <ChevronDown size={15} className="text-cyan-400 group-hover/hint:translate-y-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
};
