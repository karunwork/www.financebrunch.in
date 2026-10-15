import React from 'react';
import { useLocation } from 'react-router-dom';
import { FooterEditorialHeadline } from './footer/FooterEditorialHeadline';
import { FooterFinancialGrid } from './footer/FooterFinancialGrid';
import { FooterCTA } from './footer/FooterCTA';
import { FooterNavigation } from './footer/FooterNavigation';
import { FooterWordmark } from './footer/FooterWordmark';
import { FooterBottomBar } from './footer/FooterBottomBar';

/**
 * Homepage Footer Variant:
 * Contains the complete, original homepage footer architecture:
 * 1. Opening Editorial Statement & Brand Header
 * 2. Live Market Financial Trajectory Curve
 * 3. Schedule Strategic Consultation CTA Card
 * 4. 4-Panel Glassmorphism Navigation System
 * 5. Two-Line FINANCE / BRUNCH Wordmark with Cinematic Light Sweep
 * 6. Dynamic Bottom Bar with Copyright, Legal & Regulatory Credentials
 */
function HomepageFooter({ currentYear }: { currentYear: number }) {
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

/**
 * Standard Page Footer Variant (for all non-homepage routes):
 * Uses the compact four-panel glassmorphism footer layout matching the reference design:
 * 1. Four translucent frosted-glass panels (01/EXPLORE, 02/DISCOVER, 03/CONNECT, 04/LEGAL) with subtle FB watermark
 * 2. Wide rounded glass brand section with FINANCE / BRUNCH wordmark, light sweep, and exact tagline
 * 3. Bottom legal strip with copyright, legal links, social icons, and CIN corporate credentials
 */
function StandardPageFooter({ currentYear }: { currentYear: number }) {
  return (
    <footer 
      id="footer" 
      className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/80 to-blue-50/20 dark:from-[#070D1B] dark:via-[#081022] dark:to-[#040812] border-t border-slate-200/80 dark:border-slate-800/80 pt-12 sm:pt-16 pb-10 sm:pb-12 transition-colors duration-300 mt-auto"
    >
      {/* Top Subtle Border Accent */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 dark:via-cyan-400/30 to-transparent" />

      {/* Ambient Background Lighting Blooms */}
      <div 
        className="absolute top-1/4 -right-24 w-[420px] h-[420px] bg-cyan-400/5 dark:bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-1/3 -left-24 w-[440px] h-[440px] bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Faint Subtle FB Watermark Centered Behind Section */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
        <img
          src="/images/fb-watermark.png"
          alt=""
          className="w-[580px] max-w-[85%] h-auto object-contain opacity-[0.035] dark:opacity-[0.055] pointer-events-none select-none"
          loading="lazy"
        />
      </div>

      <div className="w-full max-w-7xl 2xl:max-w-[1536px] 3xl:max-w-[1680px] px-4 sm:px-6 lg:px-8 mx-auto relative z-10 space-y-8 sm:space-y-10">
        {/* 1. Four Translucent Frosted-Glass Panels */}
        <FooterNavigation className="my-0" />

        {/* 2. Brand Section: Two-Line FINANCE / BRUNCH Wordmark & Tagline with Cinematic Light Sweep */}
        <FooterWordmark className="py-2 sm:py-4" />

        {/* 3. Bottom Bar: Copyright, Legal Links, Social Profiles, and CIN Credentials */}
        <FooterBottomBar currentYear={currentYear} />
      </div>
    </footer>
  );
}

export default function Footer() {
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  // Strict route check: exact match for root homepage '/'
  const isHomePage = location.pathname === '/';

  // Render the appropriate footer variant based on route (never mounted simultaneously)
  if (isHomePage) {
    return <HomepageFooter currentYear={currentYear} />;
  }

  return <StandardPageFooter currentYear={currentYear} />;
}
