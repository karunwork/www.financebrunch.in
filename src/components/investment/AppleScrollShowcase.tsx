import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { 
  ChevronLeft, ChevronRight, TrendingUp, Globe, FileText, 
  DollarSign, CandlestickChart, Users, Sparkles, ArrowRight, ArrowDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollWindowTo } from '@/lib/smoothScroll';
import './AppleScrollShowcase.css';

gsap.registerPlugin(ScrollTrigger);

const PIN_OFFSET = 84;

type Particle = {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  driftX: number;
  driftY: number;
  colorType: 'pink' | 'red' | 'white';
};

export interface WhyChooseItem {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  tag: string;
  accent: {
    name: string;
    lightBg: string;
    darkBg: string;
    lightBorder: string;
    darkBorder: string;
    iconBgLight: string;
    iconBgDark: string;
    iconColorLight: string;
    iconColorDark: string;
    tagBgLight: string;
    tagBgDark: string;
    tagTextLight: string;
    tagTextDark: string;
    topGlow: string;
    hoverGlow: string;
  };
}

export const whyChooseCards: WhyChooseItem[] = [
  {
    id: "data-driven",
    number: "01",
    title: "Data-Driven Approach",
    description: "Our recommendations are backed by thorough research, data analysis, and seasoned SEBI-accredited market expertise.",
    icon: <TrendingUp className="h-5 w-5" />,
    tag: "Institutional Research",
    accent: {
      name: "blue",
      lightBg: "bg-[#f0f6ff]/95",
      darkBg: "dark:bg-[#071329]/95",
      lightBorder: "border-blue-200/90",
      darkBorder: "dark:border-blue-900/50",
      iconBgLight: "bg-blue-100",
      iconBgDark: "dark:bg-blue-900/50",
      iconColorLight: "text-blue-600",
      iconColorDark: "dark:text-cyan-400",
      tagBgLight: "bg-blue-50 border-blue-200/80",
      tagBgDark: "dark:bg-blue-950/60 dark:border-blue-800/60",
      tagTextLight: "text-blue-700",
      tagTextDark: "dark:text-cyan-300",
      topGlow: "from-blue-400 via-indigo-500 to-blue-400",
      hoverGlow: "hover:border-blue-400/70 dark:hover:border-cyan-400/60",
    }
  },
  {
    id: "global-diversification",
    number: "02",
    title: "Global Diversification",
    description: "Strategic allocation across high-growth Indian equities and US tech leaders delivers seamless geographical diversification.",
    icon: <Globe className="h-5 w-5" />,
    tag: "Cross-Border Wealth",
    accent: {
      name: "purple",
      lightBg: "bg-[#fbf7ff]/95",
      darkBg: "dark:bg-[#150d24]/95",
      lightBorder: "border-purple-200/90",
      darkBorder: "dark:border-purple-900/50",
      iconBgLight: "bg-purple-100",
      iconBgDark: "dark:bg-purple-900/50",
      iconColorLight: "text-purple-600",
      iconColorDark: "dark:text-purple-400",
      tagBgLight: "bg-purple-50 border-purple-200/80",
      tagBgDark: "dark:bg-purple-950/60 dark:border-purple-800/60",
      tagTextLight: "text-purple-700",
      tagTextDark: "dark:text-purple-300",
      topGlow: "from-purple-400 via-pink-500 to-purple-400",
      hoverGlow: "hover:border-purple-400/70 dark:hover:border-purple-400/60",
    }
  },
  {
    id: "exclusive-opportunities",
    number: "03",
    title: "Exclusive Opportunities",
    description: "Curated access to vetted pre-IPO opportunities and high-conviction unlisted shares prior to public market listings.",
    icon: <FileText className="h-5 w-5" />,
    tag: "Pre-IPO Equity",
    accent: {
      name: "emerald",
      lightBg: "bg-[#f2fcf6]/95",
      darkBg: "dark:bg-[#071d14]/95",
      lightBorder: "border-emerald-200/90",
      darkBorder: "dark:border-emerald-900/50",
      iconBgLight: "bg-emerald-100",
      iconBgDark: "dark:bg-emerald-900/50",
      iconColorLight: "text-emerald-600",
      iconColorDark: "dark:text-emerald-400",
      tagBgLight: "bg-emerald-50 border-emerald-200/80",
      tagBgDark: "dark:bg-emerald-950/60 dark:border-emerald-800/60",
      tagTextLight: "text-emerald-700",
      tagTextDark: "dark:text-emerald-300",
      topGlow: "from-emerald-400 via-teal-500 to-emerald-400",
      hoverGlow: "hover:border-emerald-400/70 dark:hover:border-emerald-400/60",
    }
  },
  {
    id: "alternative-investments",
    number: "04",
    title: "Alternative Investments",
    description: "Innovative investment options such as 99.9% 24K pure Digital Gold serving as effective inflation hedges and portfolio diversifiers.",
    icon: <DollarSign className="h-5 w-5" />,
    tag: "Inflation Hedging",
    accent: {
      name: "amber",
      lightBg: "bg-[#fffbf0]/95",
      darkBg: "dark:bg-[#1a140d]/95",
      lightBorder: "border-amber-200/90",
      darkBorder: "dark:border-amber-900/50",
      iconBgLight: "bg-amber-100",
      iconBgDark: "dark:bg-amber-900/50",
      iconColorLight: "text-amber-600",
      iconColorDark: "dark:text-amber-400",
      tagBgLight: "bg-amber-50 border-amber-200/80",
      tagBgDark: "dark:bg-amber-950/60 dark:border-amber-800/60",
      tagTextLight: "text-amber-700",
      tagTextDark: "dark:text-amber-300",
      topGlow: "from-amber-400 via-orange-500 to-amber-400",
      hoverGlow: "hover:border-amber-400/70 dark:hover:border-amber-400/60",
    }
  },
  {
    id: "technical-expertise",
    number: "05",
    title: "Technical Expertise",
    description: "Multi-timeframe chart structures and trailing stop-loss strategies to identify high-probability entry points and protect capital.",
    icon: <CandlestickChart className="h-5 w-5" />,
    tag: "Market Timing",
    accent: {
      name: "indigo",
      lightBg: "bg-[#f4f7ff]/95",
      darkBg: "dark:bg-[#0c1024]/95",
      lightBorder: "border-indigo-200/90",
      darkBorder: "dark:border-indigo-900/50",
      iconBgLight: "bg-indigo-100",
      iconBgDark: "dark:bg-indigo-900/50",
      iconColorLight: "text-indigo-600",
      iconColorDark: "dark:text-indigo-400",
      tagBgLight: "bg-indigo-50 border-indigo-200/80",
      tagBgDark: "dark:bg-indigo-950/60 dark:border-indigo-800/60",
      tagTextLight: "text-indigo-700",
      tagTextDark: "dark:text-indigo-300",
      topGlow: "from-indigo-400 via-blue-500 to-indigo-400",
      hoverGlow: "hover:border-indigo-400/70 dark:hover:border-indigo-400/60",
    }
  },
  {
    id: "strong-client-network",
    number: "06",
    title: "Strong Client Network",
    description: "Join 1,000+ informed investors with direct 1-on-1 advisor reviews and exclusive proactive portfolio allocation briefs.",
    icon: <Users className="h-5 w-5" />,
    tag: "Investor Community",
    accent: {
      name: "rose",
      lightBg: "bg-[#fff3f4]/95",
      darkBg: "dark:bg-[#200b10]/95",
      darkBorder: "dark:border-rose-900/50",
      lightBorder: "border-rose-200/90",
      iconBgLight: "bg-rose-100",
      iconBgDark: "dark:bg-rose-900/50",
      iconColorLight: "text-rose-600",
      iconColorDark: "dark:text-rose-400",
      tagBgLight: "bg-rose-50 border-rose-200/80",
      tagBgDark: "dark:bg-rose-950/60 dark:border-rose-800/60",
      tagTextLight: "text-rose-700",
      tagTextDark: "dark:text-rose-300",
      topGlow: "from-rose-400 via-pink-500 to-rose-400",
      hoverGlow: "hover:border-rose-400/70 dark:hover:border-rose-400/60",
    }
  }
];

// Group into 3 two-card columns to match Reference 2 screenshot (Card 1 on top, Card 4 on bottom)
export const columns = [
  { id: 'col-1', top: whyChooseCards[0], bottom: whyChooseCards[3] },
  { id: 'col-2', top: whyChooseCards[1], bottom: whyChooseCards[4] },
  { id: 'col-3', top: whyChooseCards[2], bottom: whyChooseCards[5] },
];

export function AppleScrollShowcase() {
  const currentIndexRef = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  const metricsRef = useRef({
    horizontalTravel: 0,
    viewportWidth: 0,
    cardCenters: [] as number[],
    columnCenters: [] as number[],
    navbarHeight: PIN_OFFSET,
  });

  const getProgressForCard = (index: number) => {
    const { horizontalTravel, viewportWidth, cardCenters } = metricsRef.current;
    const center = cardCenters[index];
    if (!horizontalTravel || viewportWidth === 0 || center === undefined) return 0;
    return Math.min(1, Math.max(0, (center - viewportWidth / 2) / horizontalTravel));
  };

  const setActiveCard = (index: number) => {
    if (currentIndexRef.current === index) return;
    currentIndexRef.current = index;
    paginationRef.current?.querySelectorAll<HTMLButtonElement>('[data-column-dot]').forEach((dot, dotIndex) => {
      const active = dotIndex === index;
      dot.classList.toggle('is-active', active);
      if (active) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
  };

  const navigateToCard = (index: number) => {
    const count = whyChooseCards.length;
    if (!count) return;
    const targetIndex = Math.min(Math.max(index, 0), count - 1);
    const trigger = triggerRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const cardElement = track?.querySelectorAll<HTMLElement>('[data-column-slide]')[targetIndex];

    setActiveCard(targetIndex);

    if (trigger) {
      const progress = getProgressForCard(targetIndex);
      scrollWindowTo(trigger.start + progress * (trigger.end - trigger.start), true);
    } else if (viewport && cardElement) {
      viewport.scrollTo({
        left: cardElement.offsetLeft,
        behavior: 'smooth',
      });
    }
  };

  const focusCardInRail = (index: number) => {
    navigateToCard(index);
  };

  const goToPrev = () => {
    const count = whyChooseCards.length;
    if (count) navigateToCard((currentIndexRef.current - 1 + count) % count);
  };

  const goToNext = () => {
    const count = whyChooseCards.length;
    if (count) navigateToCard((currentIndexRef.current + 1) % count);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goToPrev();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      goToNext();
    }
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartXRef.current;
    const diffX = touchStartXRef.current - touchEndX;
    if (Math.abs(diffX) > 40 && triggerRef.current) {
      if (diffX > 0) goToNext();
      else goToPrev();
    }
    touchStartXRef.current = null;
  };

  const handleSkipToServices = () => {
    const section = document.getElementById('comprehensive-investment-services');
    if (!section) return;
    const fixedHeader = Array.from(document.querySelectorAll<HTMLElement>('header')).find(
      (header) => getComputedStyle(header).position === 'fixed',
    );
    const navbarHeight = fixedHeader?.getBoundingClientRect().height ?? PIN_OFFSET;
    const targetTop = section.getBoundingClientRect().top + window.scrollY - navbarHeight;
    scrollWindowTo(Math.max(0, targetTop), true);
  };

  // ScrollTrigger Horizontal Pinning synchronized with Lenis
  useLayoutEffect(() => {
    const scroll = scrollRef.current;
    const stage = stageRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;
    if (!scroll || !stage || !viewport || !track || !progress) return;

    const media = gsap.matchMedia();
    let refreshFrame = 0;

    const measure = () => {
      const fixedHeader = Array.from(document.querySelectorAll<HTMLElement>('header')).find(
        (header) => getComputedStyle(header).position === 'fixed',
      );
      const navbarHeight = fixedHeader?.getBoundingClientRect().height ?? PIN_OFFSET;
      const viewportWidth = viewport.clientWidth;
      const cardSlides = Array.from(track.querySelectorAll<HTMLElement>('[data-column-slide]'));
      const centers = cardSlides.map((slide) => slide.offsetLeft + slide.offsetWidth / 2);
      metricsRef.current = {
        horizontalTravel: Math.max(track.scrollWidth - viewportWidth, 0),
        viewportWidth,
        cardCenters: centers,
        columnCenters: centers,
        navbarHeight,
      };
      stage.style.setProperty('--fb-pin-offset', navbarHeight + 'px');
    };

    const refresh = () => {
      if (refreshFrame) window.cancelAnimationFrame(refreshFrame);
      refreshFrame = window.requestAnimationFrame(() => {
        refreshFrame = 0;
        measure();
        ScrollTrigger.refresh();
      });
    };

    media.add('(prefers-reduced-motion: no-preference) and (min-width: 701px)', () => {
      measure();
      scroll.dataset.animated = 'true';

      const renderProgress = (progressValue: number) => {
        const { horizontalTravel, viewportWidth, cardCenters } = metricsRef.current;
        const offset = horizontalTravel * progressValue;
        progress.style.transform = 'scaleX(' + progressValue.toFixed(4) + ')';

        const viewportCenter = viewportWidth / 2;
        let activeIndex = 0;
        let nearestDistance = Number.POSITIVE_INFINITY;
        for (const [index, center] of cardCenters.entries()) {
          const distance = Math.abs(center - offset - viewportCenter);
          if (distance < nearestDistance) {
            activeIndex = index;
            nearestDistance = distance;
          }
        }
        setActiveCard(activeIndex);
      };

      const animation = gsap.to(track, {
        x: () => -metricsRef.current.horizontalTravel,
        ease: 'none',
        paused: true,
      });

      const trigger = ScrollTrigger.create({
        id: 'fb-investment-pillars-rail',
        trigger: scroll,
        pin: stage,
        pinSpacing: true,
        start: () => 'top top+=' + metricsRef.current.navbarHeight,
        end: () => '+=' + Math.max(metricsRef.current.horizontalTravel, 1),
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        animation,
        onRefreshInit: measure,
        onUpdate: (self) => renderProgress(self.progress),
        onRefresh: (self) => renderProgress(self.progress),
      });
      triggerRef.current = trigger;

      const resizeObserver = new ResizeObserver(refresh);
      resizeObserver.observe(viewport);
      resizeObserver.observe(track);
      window.addEventListener('resize', refresh);
      refresh();

      return () => {
        resizeObserver.disconnect();
        window.removeEventListener('resize', refresh);
        if (refreshFrame) window.cancelAnimationFrame(refreshFrame);
        triggerRef.current = null;
        trigger.kill(true);
        animation.kill();
        scroll.dataset.animated = 'false';
        gsap.set(track, { clearProps: 'transform' });
        gsap.set(progress, { clearProps: 'transform' });
        stage.style.removeProperty('--fb-pin-offset');
      };
    });

    return () => media.revert();
  }, []);

  // Lenis.dev Glowing Particle Canvas with soft pink, warm red, and muted white highlights
  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;

    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0;
    let height = 0;
    let frame = 0;
    let lastFrame = 0;
    let isVisible = false;
    let particles: Particle[] = [];

    const draw = () => {
      context.clearRect(0, 0, width, height);
      for (const particle of particles) {
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);

        let fillStyle = 'rgba(255, 255, 255, ' + particle.alpha.toFixed(3) + ')';
        if (particle.colorType === 'pink') {
          fillStyle = 'rgba(244, 114, 182, ' + particle.alpha.toFixed(3) + ')';
        } else if (particle.colorType === 'red') {
          fillStyle = 'rgba(239, 68, 68, ' + particle.alpha.toFixed(3) + ')';
        }

        context.fillStyle = fillStyle;
        context.fill();

        // Subtle soft halo on larger particles
        if (particle.radius > 1.2) {
          context.beginPath();
          context.arc(particle.x, particle.y, particle.radius * 2.2, 0, Math.PI * 2);
          context.fillStyle = particle.colorType === 'pink' 
            ? 'rgba(244, 114, 182, ' + (particle.alpha * 0.18).toFixed(3) + ')'
            : 'rgba(239, 68, 68, ' + (particle.alpha * 0.16).toFixed(3) + ')';
          context.fill();
        }

        particle.x += particle.driftX;
        particle.y += particle.driftY;

        if (particle.x < -10) particle.x = width + 10;
        else if (particle.x > width + 10) particle.x = -10;

        if (particle.y < -10) particle.y = height + 10;
        else if (particle.y > height + 10) particle.y = -10;
      }
    };

    const animate = (time: number) => {
      frame = window.requestAnimationFrame(animate);
      if (!isVisible || time - lastFrame < 33) return; // Cap at ~30fps for ultra performance
      lastFrame = time;
      draw();
    };

    const resize = () => {
      const rect = stage.getBoundingClientRect();
      width = Math.max(Math.floor(rect.width), 1);
      height = Math.max(Math.floor(rect.height), 1);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const targetCount = Math.min(Math.max(Math.round((width * height) / 36000), 22), 40);
      particles = Array.from({ length: targetCount }, () => {
        const rand = Math.random();
        const colorType: 'pink' | 'red' | 'white' = rand < 0.45 ? 'pink' : rand < 0.75 ? 'red' : 'white';
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.5 + 0.6,
          alpha: Math.random() * 0.45 + 0.25,
          driftX: (Math.random() - 0.5) * 0.22,
          driftY: (Math.random() - 0.5) * 0.22,
          colorType,
        };
      });

      draw();
    };

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = Boolean(entry?.isIntersecting);
      if (isVisible) draw();
    }, { threshold: 0.05 });
    observer.observe(stage);

    const handleVisibility = () => {
      isVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibility);

    resize();
    window.addEventListener('resize', resize);
    if (!reducedMotion.matches) {
      frame = window.requestAnimationFrame(animate);
    }

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section 
      id="why-choose-us"
      className="fb-investment-showcase"
      aria-label="Why Choose Our Investment Services - Strategic Pillars"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <canvas ref={canvasRef} className="fb-investment-showcase__particles" aria-hidden="true" />

      <div ref={scrollRef} className="fb-investment-showcase__scroll">
        <div ref={stageRef} className="fb-investment-showcase__stage">
          
          {/* Header */}
          <div className="fb-investment-showcase__header">
            <div className="fb-investment-showcase__header-copy">
              <span className="fb-investment-showcase__pill">
                <Sparkles className="h-3 w-3" />
                <span>Strategic Advantage • 6 Core Pillars</span>
              </span>
              <h2 className="fb-investment-showcase__title">
                Why Choose Our <span>Investment Services</span>
              </h2>
              <p className="fb-investment-showcase__subtitle">
                Institutional-grade research, tailored wealth strategies, and multi-asset expertise designed to optimize returns and protect capital.
              </p>
            </div>

            <button
              type="button"
              className="fb-investment-showcase__skip"
              onClick={handleSkipToServices}
              aria-label="Skip to Comprehensive Investment Services"
            >
              <span>Explore Services</span>
              <ArrowDown size={13} aria-hidden="true" />
            </button>
          </div>

          {/* Horizontal Rail Viewport */}
          <div ref={viewportRef} className="fb-investment-showcase__viewport">
            <div 
              className="fb-investment-showcase__rail-window"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div ref={trackRef} className="fb-investment-showcase__track">
                {whyChooseCards.map((card, index) => (
                  <div 
                    key={card.id} 
                    className="fb-investment-showcase__slide fb-investment-showcase__column"
                    data-column-slide
                    data-slide-card
                    aria-label={`Pillar ${index + 1}: ${card.title}`}
                    tabIndex={0}
                    onFocus={() => focusCardInRail(index)}
                  >
                    <div 
                      className={cn(
                        "fb-investment-showcase__card",
                        card.accent.lightBg,
                        card.accent.darkBg,
                        card.accent.lightBorder,
                        card.accent.darkBorder,
                        card.accent.hoverGlow
                      )}
                    >
                      <div className={cn("fb-investment-showcase__card-accent bg-gradient-to-r", card.accent.topGlow)} />
                      
                      <div className="fb-investment-showcase__card-header">
                        <div className={cn(
                          "fb-investment-showcase__icon-badge",
                          card.accent.iconBgLight,
                          card.accent.iconBgDark,
                          card.accent.iconColorLight,
                          card.accent.iconColorDark,
                          card.accent.lightBorder,
                          card.accent.darkBorder
                        )}>
                          {card.icon}
                        </div>

                        <span className={cn(
                          "fb-investment-showcase__card-tag",
                          card.accent.tagBgLight,
                          card.accent.tagBgDark,
                          card.accent.tagTextLight,
                          card.accent.tagTextDark
                        )}>
                          {card.tag}
                        </span>
                      </div>

                      <h3 className="fb-investment-showcase__card-title text-slate-900 dark:text-white">
                        {card.title}
                      </h3>

                      <p className="fb-investment-showcase__card-desc text-slate-600 dark:text-slate-300">
                        {card.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="fb-investment-showcase__progress-track" aria-hidden="true">
            <div ref={progressRef} className="fb-investment-showcase__progress-fill" />
          </div>

          {/* Footer Controls */}
          <div className="fb-investment-showcase__footer">
            <div className="fb-investment-showcase__navigation">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="fb-investment-showcase__arrow"
                onClick={goToPrev}
                aria-label="Previous investment card"
              >
                <ChevronLeft size={17} aria-hidden="true" />
              </Button>

              <div ref={paginationRef} className="fb-investment-showcase__pagination" aria-label="Choose pillars card">
                {whyChooseCards.map((card, index) => (
                  <button
                    type="button"
                    key={card.id}
                    className={cn('fb-investment-showcase__dot', index === currentIndexRef.current && 'is-active')}
                    data-column-dot
                    onClick={() => navigateToCard(index)}
                    aria-label={`Go to pillar ${index + 1}: ${card.title}`}
                    aria-current={index === currentIndexRef.current ? 'true' : undefined}
                  />
                ))}
              </div>

              <Button
                type="button"
                variant="outline"
                size="icon"
                className="fb-investment-showcase__arrow"
                onClick={goToNext}
                aria-label="Next investment card"
              >
                <ChevronRight size={17} aria-hidden="true" />
              </Button>
            </div>

            <a
              href="#comprehensive-investment-services"
              className="fb-investment-showcase__cta-link"
              onClick={(e) => {
                e.preventDefault();
                handleSkipToServices();
              }}
            >
              <span>View All 6 Specialized Services Below</span>
              <ArrowRight size={14} aria-hidden="true" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
