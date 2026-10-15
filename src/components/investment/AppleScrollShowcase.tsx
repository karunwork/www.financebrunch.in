import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, ChevronRight, TrendingUp, Globe, FileText, 
  DollarSign, CandlestickChart, Users, Sparkles, CheckCircle2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface WhyChooseItem {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  tag: string;
  accent: {
    name: string;
    iconBg: string;
    iconColor: string;
    border: string;
    badgeBg: string;
    badgeText: string;
    topGlow: string;
    cardGlow: string;
  };
  highlights: string[];
}

export const whyChooseCards: WhyChooseItem[] = [
  {
    id: "data-driven",
    number: "01",
    title: "Data-Driven Approach",
    description: "Our recommendations are backed by thorough research, quantitative data analysis, and deep market expertise from seasoned SEBI-accredited professionals.",
    icon: <TrendingUp className="h-7 w-7" />,
    tag: "Institutional Intelligence",
    accent: {
      name: "blue",
      iconBg: "bg-blue-500/10 dark:bg-blue-500/15",
      iconColor: "text-blue-600 dark:text-blue-400",
      border: "border-blue-500/30 dark:border-blue-400/30",
      badgeBg: "bg-blue-100/80 dark:bg-blue-950/60",
      badgeText: "text-blue-700 dark:text-blue-300",
      topGlow: "from-transparent via-blue-500/60 to-transparent",
      cardGlow: "rgba(59, 130, 246, 0.12)",
    },
    highlights: [
      "Rigorous Quantitative Risk-Reward Screening",
      "Macroeconomic & Sectoral Growth Modeling",
      "Disciplined Downside Drawdown Protection"
    ]
  },
  {
    id: "global-diversification",
    number: "02",
    title: "Global Diversification",
    description: "Strategic exposure across both Indian and US equities, providing seamless geographical diversification to optimize multi-currency returns while shielding against localized volatility.",
    icon: <Globe className="h-7 w-7" />,
    tag: "Cross-Border Wealth",
    accent: {
      name: "purple",
      iconBg: "bg-purple-500/10 dark:bg-purple-500/15",
      iconColor: "text-purple-600 dark:text-purple-400",
      border: "border-purple-500/30 dark:border-purple-400/30",
      badgeBg: "bg-purple-100/80 dark:bg-purple-950/60",
      badgeText: "text-purple-700 dark:text-purple-300",
      topGlow: "from-transparent via-purple-500/60 to-transparent",
      cardGlow: "rgba(168, 85, 247, 0.12)",
    },
    highlights: [
      "Dollar-Hedged Global Tech & S&P 500 Leaders",
      "High-Growth Indian Equities (BSE & NSE)",
      "Smart Currency Allocation & FEMA Compliance"
    ]
  },
  {
    id: "exclusive-opportunities",
    number: "03",
    title: "Exclusive Opportunities",
    description: "Access to private market placements, pre-IPO deals, and high-pedigree unlisted shares that typically remain inaccessible to retail investors, unlocking superior early-stage upside.",
    icon: <FileText className="h-7 w-7" />,
    tag: "Pre-IPO Equity",
    accent: {
      name: "emerald",
      iconBg: "bg-emerald-500/10 dark:bg-emerald-500/15",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      border: "border-emerald-500/30 dark:border-emerald-400/30",
      badgeBg: "bg-emerald-100/80 dark:bg-emerald-950/60",
      badgeText: "text-emerald-700 dark:text-emerald-300",
      topGlow: "from-transparent via-emerald-500/60 to-transparent",
      cardGlow: "rgba(16, 185, 129, 0.12)",
    },
    highlights: [
      "Curated Pre-IPO Unicorns & Tech Innovators",
      "Transparent Price Discovery & Demat Transfers",
      "Institutional-Grade Diligence & Valuation Audits"
    ]
  },
  {
    id: "alternative-investments",
    number: "04",
    title: "Alternative Investments",
    description: "Innovative portfolio assets such as 99.9% pure Digital Gold and regulated alternative avenues that serve as enduring hedges against inflation and macroeconomic market turbulence.",
    icon: <DollarSign className="h-7 w-7" />,
    tag: "Inflation Hedging",
    accent: {
      name: "amber",
      iconBg: "bg-amber-500/10 dark:bg-amber-500/15",
      iconColor: "text-amber-600 dark:text-amber-400",
      border: "border-amber-500/30 dark:border-amber-400/30",
      badgeBg: "bg-amber-100/80 dark:bg-amber-950/60",
      badgeText: "text-amber-700 dark:text-amber-300",
      topGlow: "from-transparent via-amber-500/60 to-transparent",
      cardGlow: "rgba(245, 158, 11, 0.12)",
    },
    highlights: [
      "99.9% 24K Pure Digital Gold with Zero Storage Fees",
      "Insured Physical Vault Backing with Anytime Delivery",
      "Uncorrelated Asset Shield Against Market Drawdowns"
    ]
  },
  {
    id: "technical-expertise",
    number: "05",
    title: "Technical Expertise",
    description: "Advanced technical chart structures, momentum oscillators, and timing methodologies to identify high-probability entry points and disciplined exit parameters for capital maximization.",
    icon: <CandlestickChart className="h-7 w-7" />,
    tag: "Market Timing",
    accent: {
      name: "indigo",
      iconBg: "bg-indigo-500/10 dark:bg-indigo-500/15",
      iconColor: "text-indigo-600 dark:text-indigo-400",
      border: "border-indigo-500/30 dark:border-indigo-400/30",
      badgeBg: "bg-indigo-100/80 dark:bg-indigo-950/60",
      badgeText: "text-indigo-700 dark:text-indigo-300",
      topGlow: "from-transparent via-indigo-500/60 to-transparent",
      cardGlow: "rgba(99, 102, 241, 0.12)",
    },
    highlights: [
      "Multi-Timeframe Trend & Support Analysis",
      "Systematic Trailing Stop-Loss Strategies",
      "Volume Profile & Institutional Flow Tracking"
    ]
  },
  {
    id: "strong-client-network",
    number: "06",
    title: "Strong Client Network",
    description: "Join a thriving community of 1,000+ informed investors who leverage our institutional research, strategic asset allocations, and proactive market updates to grow wealth steadily.",
    icon: <Users className="h-7 w-7" />,
    tag: "Investor Community",
    accent: {
      name: "rose",
      iconBg: "bg-rose-500/10 dark:bg-rose-500/15",
      iconColor: "text-rose-600 dark:text-rose-400",
      border: "border-rose-500/30 dark:border-rose-400/30",
      badgeBg: "bg-rose-100/80 dark:bg-rose-950/60",
      badgeText: "text-rose-700 dark:text-rose-300",
      topGlow: "from-transparent via-rose-500/60 to-transparent",
      cardGlow: "rgba(244, 63, 94, 0.12)",
    },
    highlights: [
      "1,000+ High-Net-Worth & Retail Investor Trust",
      "Direct 1-on-1 Portfolio Reviews with Advisors",
      "Exclusive Weekly Strategic Intelligence Briefs"
    ]
  }
];

export function AppleScrollShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const maxIndex = whyChooseCards.length - 1;

  const touchStartXRef = useRef<number | null>(null);

  const goToPrev = () => {
    if (isAnimating || currentIndex === 0) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => Math.max(0, prev - 1));
    setTimeout(() => setIsAnimating(false), 450);
  };

  const goToNext = () => {
    if (isAnimating || currentIndex === maxIndex) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
    setTimeout(() => setIsAnimating(false), 450);
  };

  const goToIndex = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    if (index < 0 || index > maxIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 450);
  };

  // Keyboard navigation when section is in view
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      goToPrev();
    } else if (e.key === 'ArrowRight') {
      goToNext();
    }
  };

  // Touch swipe support for mobile ergonomics
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartXRef.current - touchEndX;

    // Minimum swipe threshold: 45px
    if (Math.abs(diffX) > 45) {
      if (diffX > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    touchStartXRef.current = null;
  };

  return (
    <section 
      id="why-choose-us" 
      className="py-16 sm:py-20 bg-transparent overflow-hidden relative"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Why Choose Our Investment Services Carousel"
    >
      {/* Subtle Ambient Lighting Blooms */}
      <div 
        className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-blue-500/10 blur-[130px] pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-500/10 blur-[130px] pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="w-full max-w-7xl 2xl:max-w-[1536px] 3xl:max-w-[1680px] px-4 sm:px-6 lg:px-8 mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-800/50 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>STRATEGIC ADVANTAGE • 6 CORE PILLARS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-4">
            Why Choose Our{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400 bg-clip-text text-transparent">
              Investment Services
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Discover our institutional-grade research, tailored wealth strategies, and multi-asset expertise designed to optimize returns and protect capital.
          </p>
        </div>

        {/* Carousel Container (Modeled directly after Client Testimonials Carousel) */}
        <div className="relative max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto px-2 sm:px-12 md:px-14">
          
          {/* Card Viewport */}
          <div 
            className="relative overflow-hidden rounded-3xl"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {whyChooseCards.map((card, idx) => (
                <div key={card.id} className="w-full flex-shrink-0 px-2 sm:px-3">
                  <div 
                    className={cn(
                      "relative rounded-3xl p-6 sm:p-9 md:p-10 transition-all duration-300 flex flex-col justify-between select-none",
                      "backdrop-blur-2xl border shadow-xl",
                      "bg-white/95 dark:bg-[#071329]/95 border-slate-200/90 dark:border-slate-800/90"
                    )}
                  >
                    {/* Top Architectural Accent Highlight Line */}
                    <div 
                      className={cn(
                        "absolute top-0 inset-x-0 h-[3px] rounded-t-3xl bg-gradient-to-r",
                        card.accent.topGlow
                      )} 
                    />

                    {/* Card Top: Number Watermark & Icon Header */}
                    <div>
                      <div className="flex items-center justify-between mb-5 sm:mb-6">
                        {/* Icon Badge */}
                        <div className={cn(
                          "w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center border shadow-sm transition-transform duration-300",
                          card.accent.iconBg,
                          card.accent.iconColor,
                          card.accent.border
                        )}>
                          {card.icon}
                        </div>

                        {/* Large Subtle Number Watermark */}
                        <span className="font-mono text-3xl sm:text-5xl font-black text-slate-300 dark:text-slate-700/60 select-none">
                          {card.number}
                        </span>
                      </div>

                      {/* Eyebrow Category Chip */}
                      <div className="inline-block mb-3">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase border",
                          card.accent.badgeBg,
                          card.accent.badgeText,
                          card.accent.border
                        )}>
                          {card.tag}
                        </span>
                      </div>

                      {/* Card Headline */}
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3 leading-snug">
                        {card.title}
                      </h3>

                      {/* Card Description */}
                      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                        {card.description}
                      </p>
                    </div>

                    {/* Card Bottom: Value Deliverables Highlights */}
                    <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 space-y-3">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                        Key Value Deliverables
                      </div>
                      {card.highlights.map((item, hIdx) => (
                        <div key={hIdx} className="flex items-start text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                          <CheckCircle2 className={cn("w-4 h-4 sm:w-5 sm:h-5 mr-2.5 sm:mr-3 mt-0.5 flex-shrink-0", card.accent.iconColor)} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Left Arrow Button (Matching Testimonial Carousel) */}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-20">
            <Button 
              variant="outline" 
              size="icon" 
              className={cn(
                "rounded-full w-10 h-10 sm:w-11 sm:h-11 shadow-md backdrop-blur-sm transition-all duration-200",
                "bg-white/90 dark:bg-slate-900/90 border-slate-200/90 dark:border-slate-800",
                "hover:bg-white dark:hover:bg-slate-800 hover:scale-110 active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-500",
                currentIndex === 0 
                  ? "opacity-30 cursor-not-allowed hover:scale-100" 
                  : "opacity-100 hover:border-blue-500/50"
              )}
              onClick={goToPrev}
              disabled={currentIndex === 0}
              aria-label="Previous investment feature card"
            >
              <ChevronLeft size={20} className="text-slate-700 dark:text-slate-200 transition-transform duration-200 hover:-translate-x-0.5" />
            </Button>
          </div>

          {/* Right Arrow Button (Matching Testimonial Carousel) */}
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-20">
            <Button 
              variant="outline" 
              size="icon" 
              className={cn(
                "rounded-full w-10 h-10 sm:w-11 sm:h-11 shadow-md backdrop-blur-sm transition-all duration-200",
                "bg-white/90 dark:bg-slate-900/90 border-slate-200/90 dark:border-slate-800",
                "hover:bg-white dark:hover:bg-slate-800 hover:scale-110 active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-500",
                currentIndex === maxIndex 
                  ? "opacity-30 cursor-not-allowed hover:scale-100" 
                  : "opacity-100 hover:border-blue-500/50"
              )}
              onClick={goToNext}
              disabled={currentIndex === maxIndex}
              aria-label="Next investment feature card"
            >
              <ChevronRight size={20} className="text-slate-700 dark:text-slate-200 transition-transform duration-200 hover:translate-x-0.5" />
            </Button>
          </div>

          {/* Indicators & Counter Below Card (Matching Testimonial Carousel) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8 sm:mt-10">
            <div className="flex items-center gap-1.5">
              {whyChooseCards.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "h-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer",
                    index === currentIndex 
                      ? "bg-blue-600 dark:bg-cyan-400 w-8 shadow-sm shadow-blue-500/30" 
                      : "bg-slate-300 dark:bg-slate-700 w-2.5 hover:bg-blue-400 dark:hover:bg-cyan-600 hover:scale-125"
                  )}
                  onClick={() => goToIndex(index)}
                  aria-label={`Go to investment pillar ${index + 1}`}
                />
              ))}
            </div>

            <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 sm:ml-2">
              0{currentIndex + 1} / 0{whyChooseCards.length}
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}

// Alias export for clarity
export { AppleScrollShowcase as InvestmentServicesCarousel };
