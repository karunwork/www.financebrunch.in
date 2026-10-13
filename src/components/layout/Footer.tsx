import React from 'react';
import { FooterEditorialHeadline } from './footer/FooterEditorialHeadline';
import { FooterFinancialGrid } from './footer/FooterFinancialGrid';
import { FooterCTA } from './footer/FooterCTA';
import { FooterNavigation } from './footer/FooterNavigation';
import { FooterWordmark } from './footer/FooterWordmark';
import { FooterBottomBar } from './footer/FooterBottomBar';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      id="contact" 
      className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/90 to-blue-50/20 dark:from-[#070D1B] dark:via-[#081022] dark:to-[#040812] border-t border-slate-200/80 dark:border-slate-800/80 pt-20 pb-12 transition-colors duration-300"
    >
      {/* Top Subtle Border Accent */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 dark:via-cyan-400/30 to-transparent" />

      {/* Ambient Background Lighting Blooms */}
      <div 
        className="absolute top-1/4 -right-24 w-[480px] h-[480px] bg-cyan-400/5 dark:bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-1/3 -left-24 w-[520px] h-[520px] bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="w-full max-w-7xl 2xl:max-w-[1536px] 3xl:max-w-[1680px] px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        {/* 1. Opening Statement — Oversized Editorial Typography & Brand Logo */}
        <FooterEditorialHeadline />

        {/* 2. Financial Data Grid & Trajectory Curve */}
        <FooterFinancialGrid />

        {/* 3. Distinctive Contact Call-to-Action Card */}
        <FooterCTA />

        {/* 4. Interactive Numbered Navigation System (01 / EXPLORE, 02 / DISCOVER, 03 / CONNECT, 04 / LEGAL) */}
        <FooterNavigation />

        {/* 5. Progressive Wordmark Reveal & Brand Signature */}
        <FooterWordmark />

        {/* 6. Dynamic Bottom Bar & Regulatory Credentials */}
        <FooterBottomBar currentYear={currentYear} />
      </div>
    </footer>
  );
}
