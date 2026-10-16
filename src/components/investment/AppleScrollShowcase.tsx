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
  highlights?: string[];
}

export const whyChooseCards: WhyChooseItem[] = [
  {
    id: "data-driven",
    number: "01",
    title: "Data-Driven Approach",
    description: "Our investment recommendations are backed by quantitative risk-reward research and seasoned SEBI-accredited market expertise. We apply disciplined valuation modeling and downside drawdown protection to build resilient portfolios.",
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
    }
  },
  {
    id: "global-diversification",
    number: "02",
    title: "Global Diversification",
    description: "Strategic allocation across high-growth Indian equities and US tech leaders delivers seamless geographical diversification. Investors benefit from multi-currency growth potential while insulating portfolios against localized market volatility.",
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
    }
  },
  {
    id: "exclusive-opportunities",
    number: "03",
    title: "Exclusive Opportunities",
    description: "Gain curated access to vetted pre-IPO opportunities and high-conviction unlisted shares prior to public market listings. We ensure institutional-grade diligence, transparent pricing, and direct demat share transfers.",
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
    }
  },
  {
    id: "alternative-investments",
    number: "04",
    title: "Alternative Investments",
    description: "Hedge portfolios against inflation with 99.9% 24K pure Digital Gold and regulated alternative asset solutions. Enjoy zero storage fees, fully insured vault backing, and seamless doorstep physical delivery.",
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
    }
  },
  {
    id: "technical-expertise",
    number: "05",
    title: "Technical Expertise",
    description: "We leverage multi-timeframe chart structures and momentum modeling to identify high-probability entry points. Systematic trailing stop-loss strategies help protect capital and capture disciplined market upside.",
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
    }
  },
  {
    id: "strong-client-network",
    number: "06",
    title: "Strong Client Network",
    description: "Join a thriving community of 1,000+ informed investors who rely on our proactive portfolio allocations. Clients receive direct 1-on-1 advisor reviews and exclusive weekly market intelligence briefs.",
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
    }
  }
];

export function AppleScrollShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [autoplayKey, setAutoplayKey] = useState(0);

  const maxIndex = whyChooseCards.length - 1;
  const touchStartXRef = useRef<number | null>(null);

  // Helper to restart the 6-second timer on user interaction
  const resetAutoplay = () => {
    setAutoplayKey((k) => k + 1);
  };

  // Automatic sliding every 6 seconds
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    if (isHovered) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }, 6000);

    return () => clearInterval(timer);
  }, [maxIndex, isHovered, autoplayKey]);

  const goToPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    resetAutoplay();
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    resetAutoplay();
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToIndex = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    if (index < 0 || index > maxIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    resetAutoplay();
    setTimeout(() => setIsAnimating(false), 500);
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

        {/* Carousel Container */}
        <div 
          className="relative mx-auto w-full max-w-[1060px] px-4 sm:px-12 md:px-14 lg:px-16"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          
          {/* Card Viewport - Centered & width min(900px, calc(100vw - 120px)) */}
          <div 
            className="relative overflow-hidden rounded-3xl mx-auto w-full max-w-[calc(100%-32px)] sm:max-w-full lg:max-w-[min(900px,calc(100vw-120px))]"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {whyChooseCards.map((card) => (
                <div key={card.id} className="w-full flex-shrink-0 px-1 sm:px-2">
                  <div 
                    data-slide-card="true"
                    className={cn(
                      "relative rounded-3xl p-[20px] sm:p-7 lg:p-[36px] transition-all duration-300 flex flex-col justify-between select-none w-full",
                      "backdrop-blur-2xl border shadow-xl min-h-0 md:min-h-[380px] lg:min-h-[450px]",
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

                    {/* Card Body with 20-24px vertical spacing between sections */}
                    <div className="flex flex-col justify-between h-full space-y-5 lg:space-y-6">
                      
                      {/* Section 1: Icon Header & Number Watermark */}
                      <div className="flex items-center justify-between">
                        {/* Icon Badge: 64px x 64px */}
                        <div className={cn(
                          "w-16 h-16 rounded-2xl flex items-center justify-center border shadow-sm transition-transform duration-300 flex-shrink-0",
                          card.accent.iconBg,
                          card.accent.iconColor,
                          card.accent.border
                        )}>
                          {card.icon}
                        </div>

                        {/* Large Subtle Number Watermark */}
                        <span className="font-mono text-4xl sm:text-5xl lg:text-6xl font-black text-slate-300 dark:text-slate-700/60 select-none">
                          {card.number}
                        </span>
                      </div>

                      {/* Section 2: Eyebrow Category Chip */}
                      <div>
                        <span className={cn(
                          "inline-block px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase border",
                          card.accent.badgeBg,
                          card.accent.badgeText,
                          card.accent.border
                        )}>
                          {card.tag}
                        </span>
                      </div>

                      {/* Section 3: Main Heading (30–34px on desktop) */}
                      <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-black tracking-tight text-slate-900 dark:text-white leading-snug">
                        {card.title}
                      </h3>

                      {/* Section 4: Description (17–18px on desktop) */}
                      <p className="text-base sm:text-[17px] lg:text-[18px] text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                        {card.description}
                      </p>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Left Arrow Button (Continuous cycling with timer reset) */}
          <div className="absolute top-1/2 left-0 sm:left-1 md:left-2 transform -translate-y-1/2 z-20">
            <Button 
              variant="outline" 
              size="icon" 
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full shadow-md backdrop-blur-sm transition-all duration-200 bg-white/90 dark:bg-slate-900/90 border-slate-200/90 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 hover:scale-110 active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-500 opacity-100 hover:border-blue-500/50"
              onClick={goToPrev}
              aria-label="Previous investment feature card"
            >
              <ChevronLeft size={22} className="text-slate-700 dark:text-slate-200 transition-transform duration-200 hover:-translate-x-0.5" />
            </Button>
          </div>

          {/* Right Arrow Button (Continuous cycling with timer reset) */}
          <div className="absolute top-1/2 right-0 sm:right-1 md:right-2 transform -translate-y-1/2 z-20">
            <Button 
              variant="outline" 
              size="icon" 
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full shadow-md backdrop-blur-sm transition-all duration-200 bg-white/90 dark:bg-slate-900/90 border-slate-200/90 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 hover:scale-110 active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-500 opacity-100 hover:border-blue-500/50"
              onClick={goToNext}
              aria-label="Next investment feature card"
            >
              <ChevronRight size={22} className="text-slate-700 dark:text-slate-200 transition-transform duration-200 hover:translate-x-0.5" />
            </Button>
          </div>

          {/* Indicators & Counter Below Card */}
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
