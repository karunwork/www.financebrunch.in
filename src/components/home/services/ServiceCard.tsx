import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
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
  icon: React.ReactNode;
  color: string;
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
}

export function ServiceCard({ 
  title, 
  category,
  badge,
  description, 
  icon, 
  color, 
  redirectToWhatsApp, 
  whatsAppMessage, 
  imageSrc, 
  showSheet,
  sheetType = 'mutual-fund',
  linkTo,
  imageObjectFit = 'cover',
  highlights,
  ctaText = 'Learn more',
  backgroundWord
}: ServiceCardProps) {
  const handleCardClick = () => {
    if (redirectToWhatsApp) {
      window.open(
        `https://wa.me/917842494981?text=${encodeURIComponent(whatsAppMessage || `Hi Finance Brunch Team, I'm interested in ${title}. Can we connect?`)}`,
        '_blank'
      );
    }
  };

  const cardInner = (
    <div className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_20px_45px_-12px_rgba(6,182,212,0.15)] dark:hover:shadow-[0_20px_45px_-12px_rgba(6,182,212,0.22)] hover:-translate-y-1.5 border border-slate-200/80 dark:border-slate-800 hover:border-cyan-500/40 dark:hover:border-cyan-400/50 transition-all duration-300 flex flex-col h-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900">
      {/* 1. Image Header with Gradient Overlay & Badges */}
      <div className="w-full h-52 overflow-hidden relative bg-gray-100 dark:bg-gray-800">
        <img 
          src={imageSrc} 
          alt={title} 
          loading="lazy"
          className={cn(
            "w-full h-full transition-transform duration-700 ease-out group-hover:scale-105",
            imageObjectFit === 'contain' ? "object-contain" : "object-cover"
          )}
        />
        {/* Subtle Dark Gradient Overlay for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/30 to-transparent pointer-events-none transition-opacity duration-300"></div>

        {/* Top-Left: Category Pill */}
        {category && (
          <div className="absolute top-3.5 left-3.5 z-10">
            <span className="backdrop-blur-md bg-white/90 dark:bg-gray-900/90 text-gray-800 dark:text-gray-200 text-xs font-semibold px-2.5 py-1 rounded-full border border-white/20 dark:border-gray-700/50 shadow-sm inline-block">
              {category}
            </span>
          </div>
        )}

        {/* Top-Right: Feature / Key Benefit Badge */}
        {badge && (
          <div className="absolute top-3.5 right-3.5 z-10">
            <span className="backdrop-blur-md bg-blue-600/90 text-white text-xs font-medium px-2.5 py-1 rounded-full shadow-sm border border-white/20 inline-block">
              {badge}
            </span>
          </div>
        )}
      </div>

      {/* 2. Elevated Floating Icon Tile */}
      <div className="px-6 -mt-7 relative z-10">
        <div 
          className={cn(
            "w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-2 group-hover:shadow-xl",
            color
          )}
        >
          {icon}
        </div>
      </div>

      {/* 3. Card Body: Title, Description, and Feature Highlights */}
      <div className="p-6 pt-4 flex flex-col flex-grow justify-between relative overflow-hidden">
        {/* Cinematic Oversized Background Typography */}
        {backgroundWord && (
          <div 
            aria-hidden="true" 
            className="absolute -right-2 -bottom-6 pointer-events-none select-none overflow-hidden z-0 pr-1 opacity-[0.05] dark:opacity-[0.06] group-hover:opacity-[0.14] dark:group-hover:opacity-[0.16] transition-all duration-500 ease-out transform group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:scale-105 origin-bottom-right"
          >
            <span className="font-black text-7xl sm:text-8xl tracking-tighter leading-none bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-700 dark:from-white dark:via-blue-200 dark:to-cyan-400 bg-clip-text text-transparent">
              {backgroundWord}
            </span>
          </div>
        )}

        <div className="relative z-10">
          <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors duration-200 mb-2.5">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
            {description}
          </p>

          {/* Value Highlights Pill List */}
          {highlights && highlights.length > 0 && (
            <div className="space-y-1.5 mb-5 pt-1">
              {highlights.map((highlight, i) => (
                <div key={i} className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 dark:text-cyan-400 mr-2 flex-shrink-0" />
                  <span className="truncate">{highlight}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 4. Action Footer: CTA and Animated Arrow Indicator */}
        <div className="pt-4 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between mt-auto relative z-10">
          <span className="inline-flex items-center text-sm font-semibold text-blue-600 dark:text-cyan-400 group-hover:text-blue-700 dark:group-hover:text-cyan-300 transition-colors">
            {ctaText}
            <ArrowRight size={16} className="ml-1.5 transition-transform duration-300 group-hover:translate-x-1.5" />
          </span>
          <div className="w-7 h-7 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-cyan-400 flex items-center justify-center transition-all duration-200 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-500 group-hover:text-white">
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:scale-110" />
          </div>
        </div>
      </div>

      {/* Decorative Interactive Subtle Glow Ring on Hover */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-500/25 rounded-2xl transition-colors duration-300 pointer-events-none"></div>
    </div>
  );

  // If card opens a slide-over sheet (Mutual Funds / Fixed Deposits)
  if (showSheet) {
    const isFD = sheetType === 'fixed-deposit' || title === 'Fixed Deposits';
    return (
      <Sheet>
        <SheetTrigger asChild>
          <div className="h-full focus-visible:outline-none">
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
      <Link to={linkTo} className="block h-full focus-visible:outline-none rounded-2xl">
        {cardInner}
      </Link>
    );
  }

  // Otherwise handle external WhatsApp or fallback click
  return (
    <div onClick={handleCardClick} className="h-full focus-visible:outline-none">
      {cardInner}
    </div>
  );
}
