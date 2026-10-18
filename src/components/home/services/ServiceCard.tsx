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
  highlights,
  ctaText = 'Learn more',
  backgroundWord,
}: ServiceCardProps) {
  const handleCardClick = () => {
    if (redirectToWhatsApp) {
      window.open(
        `https://wa.me/917842494981?text=${encodeURIComponent(whatsAppMessage || `Hi Finance Brunch Team, I'm interested in ${title}. Can we connect?`)}`,
        '_blank'
      );
    }
  };

  // Alternating light/dark panels for visual rhythm on desktop
  // Index 1 (Mutual Funds) -> Dark, Index 2 (Global Tax) -> Light, Index 3 (FIRE) -> Dark, Index 4 (Wealth) -> Light, Index 5 (Insurance) -> Dark, Index 6 (Income Tax) -> Light/Dark
  const isLightPanel = index % 2 === 0;

  const cardInner = (
    <div 
      className={cn(
        "group relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 hover:-translate-y-1",
        isLightPanel
          ? "bg-[#F5F7FA] text-slate-900 border border-slate-200/90 dark:bg-[#071224] dark:text-white dark:border-slate-800 shadow-md hover:shadow-xl hover:border-blue-400/50 dark:hover:border-cyan-400/50"
          : "bg-[#071224] text-white border border-slate-800/90 dark:border-cyan-500/25 shadow-lg hover:shadow-[0_20px_45px_-12px_rgba(6,182,212,0.22)] hover:border-cyan-400/50"
      )}
    >
      {/* Top Edge Inset Highlight Line */}
      <div 
        className={cn(
          "absolute top-0 inset-x-0 h-[1.5px] pointer-events-none z-20",
          isLightPanel 
            ? "bg-gradient-to-r from-transparent via-blue-400/40 to-transparent dark:via-cyan-400/40" 
            : "bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
        )} 
      />

      {/* 1. Aligned Image Area at Top */}
      <div className="relative w-full h-48 sm:h-52 lg:h-56 overflow-hidden bg-slate-950/80 flex-shrink-0">
        <img
          src={imageSrc}
          alt={title}
          loading="lazy"
          className={cn(
            "w-full h-full transition-transform duration-700 ease-out group-hover:scale-105 filter contrast-[1.06] saturate-[1.05]",
            imageObjectFit === 'contain' ? "object-contain p-4" : "object-cover object-center"
          )}
        />
        {/* Subtle Fade Vignette */}
        <div 
          className={cn(
            "absolute inset-0 pointer-events-none",
            isLightPanel
              ? "bg-gradient-to-t from-[#F5F7FA] via-transparent to-transparent opacity-60 dark:from-[#071224] dark:opacity-80"
              : "bg-gradient-to-t from-[#071224] via-transparent to-transparent opacity-80"
          )}
        />

        {/* Top-Left: Category Pill */}
        {category && (
          <div className="absolute top-3.5 left-3.5 z-10">
            <span className="backdrop-blur-md bg-slate-950/75 text-cyan-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-cyan-400/25 shadow-sm inline-block tracking-wider uppercase">
              {category}
            </span>
          </div>
        )}

        {/* Top-Right: Feature Badge */}
        {badge && (
          <div className="absolute top-3.5 right-3.5 z-10 max-w-[60%]">
            <span className="backdrop-blur-md bg-blue-600/85 text-white text-[10px] sm:text-xs font-medium px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-sm border border-white/20 inline-block text-center whitespace-normal leading-tight">
              {badge}
            </span>
          </div>
        )}
      </div>

      {/* 2. Card Content in Middle */}
      <div className="relative z-10 p-5 sm:p-6 lg:p-7 flex flex-col flex-grow justify-between">
        {/* Subtle Background Wordmark */}
        {backgroundWord && (
          <div 
            aria-hidden="true" 
            className="absolute -right-2 -bottom-6 pointer-events-none select-none z-0 opacity-[0.03] dark:opacity-[0.05] group-hover:opacity-[0.08] transition-opacity duration-500 overflow-hidden"
          >
            <span className="font-black text-7xl sm:text-8xl tracking-tighter leading-none bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-700 dark:from-white dark:via-cyan-200 dark:to-transparent bg-clip-text text-transparent">
              {backgroundWord}
            </span>
          </div>
        )}

        <div className="relative z-10">
          <h3 
            className={cn(
              "text-xl sm:text-2xl font-bold tracking-tight leading-snug mb-2 sm:mb-2.5 transition-colors",
              isLightPanel 
                ? "text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-cyan-400" 
                : "text-white group-hover:text-cyan-300"
            )}
          >
            {title}
          </h3>

          <p 
            className={cn(
              "text-xs sm:text-sm leading-relaxed mb-4",
              isLightPanel ? "text-slate-600 dark:text-slate-300" : "text-slate-300"
            )}
          >
            {description}
          </p>

          {/* Highlights (if any) */}
          {highlights && highlights.length > 0 && (
            <div className="space-y-1.5 mb-4">
              {highlights.slice(0, 3).map((item, idx) => (
                <div key={idx} className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-2 flex-shrink-0" />
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 3. Bottom CTA anchored at bottom */}
        <div 
          className={cn(
            "pt-4 mt-auto border-t flex items-center justify-between relative z-10",
            isLightPanel 
              ? "border-slate-200/80 dark:border-slate-800" 
              : "border-slate-800/80"
          )}
        >
          <span 
            className={cn(
              "inline-flex items-center text-xs sm:text-sm font-semibold transition-colors",
              isLightPanel 
                ? "text-blue-600 group-hover:text-blue-700 dark:text-cyan-400 dark:group-hover:text-cyan-300" 
                : "text-cyan-400 group-hover:text-cyan-300"
            )}
          >
            {ctaText}
            <ArrowRight size={14} className="ml-1.5 transition-transform duration-300 group-hover:translate-x-1.5" />
          </span>

          <div 
            className={cn(
              "w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300",
              isLightPanel
                ? "bg-blue-100 text-blue-600 dark:bg-slate-800 dark:text-cyan-400 group-hover:bg-blue-600 group-hover:text-white"
                : "bg-white/10 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950"
            )}
          >
            <ArrowRight size={13} className="transition-transform duration-200 group-hover:scale-110" />
          </div>
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
      <Link to={linkTo} className="block w-full h-full focus-visible:outline-none rounded-2xl sm:rounded-3xl">
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
