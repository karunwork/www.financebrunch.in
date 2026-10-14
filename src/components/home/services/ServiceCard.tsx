import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import {
  Sheet,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MutualFundSheet } from './MutualFundSheet';
import { FixedDepositSheet } from './FixedDepositSheet';

export interface ServiceCardProps {
  id?: string;
  title: string;
  category?: string;
  badge?: string;
  description: string;
  icon?: React.ReactNode;
  color?: string;
  index?: number;
  isInView?: boolean;
  redirectToWhatsApp?: boolean;
  whatsAppMessage?: string;
  imageSrc: string;
  showSheet?: boolean;
  sheetType?: 'mutual-fund' | 'fixed-deposit';
  linkTo?: string;
  imageObjectFit?: string;
  highlights?: string[];
  ctaText?: string;
  backgroundWord?: string;
  isFullWidth?: boolean;
}

export function ServiceCard({ 
  title, 
  category,
  badge,
  description, 
  index = 0,
  redirectToWhatsApp, 
  whatsAppMessage, 
  imageSrc, 
  showSheet,
  sheetType = 'mutual-fund',
  linkTo,
  imageObjectFit = 'cover',
  ctaText = 'Learn more',
  backgroundWord,
  isFullWidth = false,
}: ServiceCardProps) {
  const handleCardClick = () => {
    if (redirectToWhatsApp) {
      window.open(
        `https://wa.me/917842494981?text=${encodeURIComponent(whatsAppMessage || `Hi Finance Brunch Team, I'm interested in ${title}. Can we connect?`)}`,
        '_blank'
      );
    }
  };

  // Apple-inspired alternating dark and refined light panels
  // Index 1 (Mutual Funds) -> Dark, Index 2 (Global Tax) -> Light, Index 3 (FIRE) -> Dark, Index 4 (Wealth) -> Light, Index 5 (Insurance) -> Dark, Index 6 (Income Tax) -> Full-width Dark
  const isLightPanel = !isFullWidth && (index === 2 || index === 4);

  const cardInner = isFullWidth ? (
    /* Full-Width Panoramic Apple Showcase Panel (7th Item: Income Tax Filing) */
    <div className="group relative w-full h-[460px] sm:h-[500px] lg:h-[540px] rounded-3xl sm:rounded-[2.25rem] overflow-hidden bg-gradient-to-br from-[#060E1D] via-[#091834] to-[#040A18] text-white border border-slate-800/90 hover:border-cyan-500/40 shadow-xl hover:shadow-[0_25px_60px_-15px_rgba(6,182,212,0.22)] transition-all duration-500 flex flex-col lg:flex-row items-center justify-between p-8 sm:p-12 lg:p-14 select-none cursor-pointer">
      {/* Top Edge Highlight */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none" />

      {/* Background Wordmark */}
      {backgroundWord && (
        <div 
          aria-hidden="true" 
          className="absolute -right-4 -bottom-10 pointer-events-none select-none z-0 opacity-[0.05] dark:opacity-[0.07] group-hover:opacity-[0.12] transition-opacity duration-700"
        >
          <span className="font-black text-[18vw] lg:text-[14vw] tracking-tighter leading-none bg-gradient-to-br from-white via-cyan-200 to-transparent bg-clip-text text-transparent">
            {backgroundWord}
          </span>
        </div>
      )}

      {/* Left Column: Text & CTA */}
      <div className="relative z-10 w-full lg:max-w-xl flex flex-col justify-center space-y-4 text-center lg:text-left">
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
          {category || 'Tax & Specialized Solutions'} {badge ? `• ${badge}` : ''}
        </p>

        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.05]">
          {title}
        </h3>

        <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-lg">
          {description}
        </p>

        <div className="pt-2 flex items-center justify-center lg:justify-start gap-4">
          <span className="inline-flex items-center text-sm sm:text-base font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors">
            {ctaText}
            <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1.5" />
          </span>
        </div>
      </div>

      {/* Right Column: Expansive Visual */}
      <div className="relative z-10 w-full lg:w-1/2 h-56 sm:h-64 lg:h-full flex items-center justify-center mt-6 lg:mt-0">
        <div className="relative w-full h-full max-h-[360px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-950/60">
          <img
            src={imageSrc}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover object-center filter contrast-[1.08] saturate-[1.06] transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060E1D] via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  ) : (
    /* Standard 2-Column Apple-Inspired Broad Rectangular Product Tile */
    <div 
      className={cn(
        "group relative w-full h-[520px] sm:h-[560px] lg:h-[600px] xl:h-[620px] rounded-3xl sm:rounded-[2rem] overflow-hidden transition-all duration-500 flex flex-col justify-between p-7 sm:p-9 lg:p-10 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500",
        isLightPanel
          ? "bg-[#F5F7FA] text-slate-900 border border-slate-200/90 dark:bg-[#0B172E] dark:text-white dark:border-slate-800 shadow-lg hover:shadow-[0_24px_55px_-12px_rgba(29,78,216,0.14)] hover:border-blue-400/50"
          : "bg-[#071224] text-white border border-slate-800/90 dark:border-cyan-500/25 shadow-xl hover:shadow-[0_24px_55px_-12px_rgba(6,182,212,0.22)] hover:border-cyan-400/50"
      )}
    >
      {/* Top Edge Inset Highlight Line */}
      <div 
        className={cn(
          "absolute top-0 inset-x-0 h-[1.5px] pointer-events-none z-20",
          isLightPanel 
            ? "bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" 
            : "bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
        )} 
      />

      {/* Oversized Background Word Typography */}
      {backgroundWord && (
        <div 
          aria-hidden="true" 
          className="absolute -right-2 -bottom-8 pointer-events-none select-none z-0 opacity-[0.04] dark:opacity-[0.06] group-hover:opacity-[0.11] transition-opacity duration-700"
        >
          <span className="font-black text-8xl sm:text-9xl lg:text-[10rem] tracking-tighter leading-none bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-700 dark:from-white dark:via-cyan-200 dark:to-transparent bg-clip-text text-transparent">
            {backgroundWord}
          </span>
        </div>
      )}

      {/* Top Area: Clean Apple-Style Typography & CTA Header */}
      <div className="relative z-10 w-full text-center max-w-md mx-auto pt-1">
        {/* Eyebrow Label */}
        <p 
          className={cn(
            "text-xs font-semibold uppercase tracking-[0.2em] mb-2 sm:mb-2.5",
            isLightPanel ? "text-blue-600 dark:text-cyan-400" : "text-cyan-400"
          )}
        >
          {category || 'Financial Solution'} {badge ? `• ${badge}` : ''}
        </p>

        {/* Large Clean Apple Headline */}
        <h3 
          className={cn(
            "text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-[1.08] mb-2.5 sm:mb-3",
            isLightPanel ? "text-slate-900 dark:text-white" : "text-white"
          )}
        >
          {title}
        </h3>

        {/* Short Concise Description */}
        <p 
          className={cn(
            "text-xs sm:text-sm lg:text-base leading-relaxed line-clamp-2 max-w-sm mx-auto",
            isLightPanel ? "text-slate-600 dark:text-slate-300" : "text-slate-300"
          )}
        >
          {description}
        </p>

        {/* Clean Apple-Style Inline CTA */}
        <div className="mt-3 sm:mt-4 flex items-center justify-center">
          <span 
            className={cn(
              "inline-flex items-center text-xs sm:text-sm font-semibold transition-colors group-hover:underline underline-offset-4",
              isLightPanel ? "text-blue-600 hover:text-blue-700 dark:text-cyan-400" : "text-cyan-400 hover:text-cyan-300"
            )}
          >
            {ctaText}
            <ArrowRight size={14} className="ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>

      {/* Lower Area: Broad Product Image Occupying Lower Portion of Panel */}
      <div className="relative z-10 w-full flex-grow mt-4 sm:mt-6 overflow-hidden rounded-2xl flex items-end justify-center">
        <div className="relative w-full h-full max-h-[290px] sm:max-h-[320px] lg:max-h-[350px] rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200/50 dark:border-white/10 shadow-lg">
          <img
            src={imageSrc}
            alt={title}
            loading="lazy"
            className={cn(
              "w-full h-full transition-transform duration-700 ease-out group-hover:scale-106 filter contrast-[1.06] saturate-[1.05]",
              imageObjectFit === 'contain' ? "object-contain p-4" : "object-cover object-center"
            )}
          />

          {/* Smooth Fade Vignette blending into panel background */}
          <div 
            className={cn(
              "absolute inset-0 pointer-events-none",
              isLightPanel
                ? "bg-gradient-to-t from-[#F5F7FA]/70 via-transparent to-transparent dark:from-[#0B172E]/70"
                : "bg-gradient-to-t from-[#071224]/80 via-transparent to-transparent"
            )}
          />
        </div>
      </div>
    </div>
  );

  // If card opens a slide-over sheet (Mutual Funds / Fixed Deposits)
  if (showSheet) {
    const isFD = sheetType === 'fixed-deposit' || title === 'Fixed Deposits';
    return (
      <Sheet>
        <SheetTrigger asChild>
          <div className="w-full h-full focus-visible:outline-none">
            {cardInner}
          </div>
        </SheetTrigger>
        {isFD ? <FixedDepositSheet /> : <MutualFundSheet />}
      </Sheet>
    );
  }

  // If card has an internal React Router link
  if (linkTo) {
    return (
      <Link to={linkTo} className="block w-full h-full focus-visible:outline-none rounded-3xl">
        {cardInner}
      </Link>
    );
  }

  // Otherwise handle external WhatsApp or fallback click
  return (
    <div onClick={handleCardClick} className="w-full h-full focus-visible:outline-none">
      {cardInner}
    </div>
  );
}
