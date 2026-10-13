import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, Heart, FileText, CheckCircle2, ArrowRight, Phone, User, Users, Coins, Timer, Sparkles, Wallet, Home, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

// ─── Carousel slide data using existing project assets ─────────────────────
const carouselSlides = [
  {
    id: 'health',
    heading: "Protect What Matters Most",
    subheading: "Health Insurance",
    description: "Cashless treatment at 10,000+ network hospitals. Coverage for pre and post hospitalization, annual health check-ups, and family floater plans.",
    ctaLabel: "Get Health Insurance Advice",
    ctaType: 'health' as const,
    image: "/images/service-insurance.jpg",
    accent: "from-blue-600 to-blue-400",
    badge: "Medical Security",
    badgeColor: "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300",
  },
  {
    id: 'term',
    heading: "Secure Your Family's Future",
    subheading: "Term Insurance",
    description: "High coverage up to ₹1 Crore at affordable premiums. Income replacement, tax benefits under Section 80C, and critical illness riders.",
    ctaLabel: "Get Term Insurance Advice",
    ctaType: 'term' as const,
    image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    accent: "from-indigo-600 to-indigo-400",
    badge: "Pure Life Protection",
    badgeColor: "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300",
  },
  {
    id: 'planning',
    heading: "Insurance For Every Life Stage",
    subheading: "Holistic Insurance Planning",
    description: "From young professionals to growing families and pre-retirees — our advisors craft the right coverage mix for where you are now.",
    ctaLabel: "Book Free Consultation",
    ctaType: 'health' as const,
    image: "/images/financial-planning-advisory.jpg",
    accent: "from-purple-600 to-purple-400",
    badge: "Holistic Audit",
    badgeColor: "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300",
  },
];

const AUTOPLAY_INTERVAL = 5500;

// ─── Carousel Component ─────────────────────────────────────────────────────
interface InsuranceCarouselProps {
  onWhatsApp: (type: 'health' | 'term') => void;
  onScrollToOptions: () => void;
}

function InsuranceCarousel({ onWhatsApp, onScrollToOptions }: InsuranceCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const total = carouselSlides.length;

  const go = useCallback((idx: number) => {
    setCurrent(((idx % total) + total) % total);
  }, [total]);

  const prev = useCallback(() => go(current - 1), [current, go]);
  const next = useCallback(() => go(current + 1), [current, go]);

  // Auto-advance
  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      if (!document.hidden) {
        setCurrent(c => ((c + 1) % total));
      }
    }, AUTOPLAY_INTERVAL);
  }, [total]);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isPlaying && !shouldReduceMotion) {
      startAutoplay();
    } else {
      stopAutoplay();
    }
    return stopAutoplay;
  }, [isPlaying, shouldReduceMotion, startAutoplay, stopAutoplay]);

  // Pause on hidden tab
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) stopAutoplay();
      else if (isPlaying && !shouldReduceMotion) startAutoplay();
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [isPlaying, shouldReduceMotion, startAutoplay, stopAutoplay]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') { prev(); setIsPlaying(false); }
    if (e.key === 'ArrowRight') { next(); setIsPlaying(false); }
  };

  // Touch / drag swipe
  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    setIsDragging(true);
    setIsPlaying(false);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    if (Math.abs(delta) > 40) {
      if (delta < 0) {
        next();
      } else {
        prev();
      }
    }
  };

  const slide = carouselSlides[current];

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl select-none"
      role="region"
      aria-label="Insurance plans carousel"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={() => setIsDragging(false)}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {/* Slide */}
      <div className="relative min-h-[420px] md:min-h-[480px] flex items-center">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src={slide.image}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
            style={{ transition: shouldReduceMotion ? 'none' : 'opacity 0.5s ease' }}
            key={slide.id}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 container px-6 md:px-8 mx-auto py-12">
          <motion.div
            key={slide.id}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="max-w-xl"
          >
            {/* Badge */}
            <span className={cn("inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4", slide.badgeColor)}>
              <ShieldCheck className="h-3.5 w-3.5 mr-1.5" aria-hidden="true" />
              {slide.badge}
            </span>

            {/* Subheading */}
            <p className={cn("text-sm font-medium mb-2 bg-gradient-to-r bg-clip-text text-transparent", slide.accent)}>
              {slide.subheading}
            </p>

            {/* Main heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {slide.heading}
            </h2>

            {/* Description */}
            <p className="text-gray-200 text-base md:text-lg mb-8 leading-relaxed max-w-md">
              {slide.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white gap-2 shadow-lg"
                onClick={() => onWhatsApp(slide.ctaType)}
              >
                {slide.ctaLabel}
                <Phone className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button
                variant="outline"
                className="border-white/40 bg-white/10 text-white hover:bg-white/20 hover:border-white/60 gap-2 backdrop-blur-sm"
                onClick={onScrollToOptions}
              >
                Explore Plans
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Controls row */}
      <div className="absolute bottom-4 left-0 right-0 z-20 flex items-center justify-between px-4 md:px-6">
        {/* Dots */}
        <div role="tablist" aria-label="Select slide" className="flex items-center gap-2">
          {carouselSlides.map((s, i) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={i === current}
              aria-label={`Slide ${i + 1}: ${s.subheading}`}
              onClick={() => { go(i); setIsPlaying(false); }}
              className={cn(
                "rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                i === current ? "w-6 h-2.5 bg-white" : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
              )}
            />
          ))}
        </div>

        {/* Prev / Play-Pause / Next */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => { prev(); setIsPlaying(false); }}
            aria-label="Previous slide"
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white backdrop-blur-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsPlaying(p => !p)}
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white backdrop-blur-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          </button>
          <button
            onClick={() => { next(); setIsPlaying(false); }}
            aria-label="Next slide"
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white backdrop-blur-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Progress bar */}
      {!shouldReduceMotion && isPlaying && (
        <div className="absolute bottom-0 left-0 right-0 h-[3px] z-20 bg-white/10">
          <div
            key={`${current}-progress`}
            className="h-full bg-blue-400"
            style={{
              animation: `carousel-progress ${AUTOPLAY_INTERVAL}ms linear forwards`,
            }}
          />
        </div>
      )}

      {/* ARIA live region for slide announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {slide.subheading}: {slide.heading}
      </div>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────
const InsurancePlanning = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'health' | 'term'>(() => {
    if (location.pathname.includes('term')) return 'term';
    return 'health';
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (location.pathname.includes('term')) {
      setActiveTab('term');
    } else if (location.pathname.includes('health')) {
      setActiveTab('health');
    }
  }, [location.pathname]);

  const { ref: benefitsRef, inView: benefitsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: featuresRef, inView: featuresInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: stepsRef, inView: stepsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: cardsRef, inView: cardsInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleWhatsAppClick = (type: 'health' | 'term') => {
    const message = type === 'health'
      ? "Hi Finance Brunch Team, I'm interested in Health Insurance planning. Can we connect to discuss options suitable for me?"
      : "Hi Finance Brunch Team, I'm interested in Term Insurance planning. Can we connect to discuss the right coverage for me?";
    window.open(`https://wa.me/917842494981?text=${encodeURIComponent(message)}`, '_blank');
  };

  const scrollToOptions = () => {
    document.getElementById('insurance-options')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col pt-16">
      {/* Carousel progress bar keyframe */}
      <style>{`
        @keyframes carousel-progress {
          from { width: 0; }
          to { width: 100%; }
        }
      `}</style>

      <main className="flex-grow">
        {/* ── Hero Carousel ── */}
        <section
          aria-label="Insurance hero"
          className="relative bg-gradient-to-br from-blue-950 via-gray-900 to-gray-950 dark:from-blue-950 dark:via-gray-900 dark:to-gray-950"
        >
          {/* Back to Home */}
          <div className="absolute top-4 left-4 z-30">
            <Link to="/">
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/50 backdrop-blur-sm text-xs"
              >
                <Home className="h-3.5 w-3.5" aria-hidden="true" />
                Home
              </Button>
            </Link>
          </div>

          <div className="container px-4 mx-auto py-4 pt-10">
            {/* Page title above the carousel */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center px-3 py-1.5 bg-blue-800/60 rounded-full mb-3">
                <ShieldCheck className="h-4 w-4 text-blue-300 mr-2" aria-hidden="true" />
                <span className="text-sm font-medium text-blue-200">Insurance Solutions</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
                Don't Compromise on{' '}
                <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Protection
                </span>
              </h1>
              <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
                The right insurance coverage is your financial shield against life's unexpected challenges.
              </p>
            </div>

            {/* Carousel */}
            <InsuranceCarousel onWhatsApp={handleWhatsAppClick} onScrollToOptions={scrollToOptions} />
          </div>
        </section>

        {/* ── How Insurance Works ── */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How We Make Insurance Simple</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                We've simplified the process to help you get the right coverage without the jargon and complexity.
              </p>
            </div>
            <div ref={stepsRef} className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: <User className="h-10 w-10 text-blue-600 dark:text-blue-400" aria-hidden="true" />,
                  title: "Understand Your Needs",
                  description: "We start by understanding your lifestyle, family situation, and financial goals."
                },
                {
                  icon: <Sparkles className="h-10 w-10 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />,
                  title: "Compare Best Plans",
                  description: "Our experts analyze suitable plans across insurers to find your perfect match."
                },
                {
                  icon: <ShieldCheck className="h-10 w-10 text-green-600 dark:text-green-400" aria-hidden="true" />,
                  title: "Secure Your Future",
                  description: "We handle the paperwork and ensure you're protected with the right coverage."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800"
                  initial={{ opacity: 0, y: 30 }}
                  animate={stepsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-white dark:bg-gray-800 flex items-center justify-center mb-6 shadow-sm">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Insurance Matters ── */}
        <section id="importance" className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Insurance Planning Is Essential</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                In life's unpredictable journey, proper insurance planning provides financial security
                and peace of mind for you and your loved ones.
              </p>
            </div>
            <div ref={benefitsRef} className="grid md:grid-cols-4 gap-6">
              {[
                {
                  icon: <ShieldCheck className="h-8 w-8 text-blue-600 dark:text-blue-400" aria-hidden="true" />,
                  title: "Financial Security",
                  description: "Protect against unexpected expenses that could impact your financial stability."
                },
                {
                  icon: <Heart className="h-8 w-8 text-pink-600 dark:text-pink-400" aria-hidden="true" />,
                  title: "Family Protection",
                  description: "Ensure your loved ones are taken care of, no matter what happens."
                },
                {
                  icon: <Wallet className="h-8 w-8 text-green-600 dark:text-green-400" aria-hidden="true" />,
                  title: "Tax Benefits",
                  description: "Enjoy tax advantages while securing your health and family's future."
                },
                {
                  icon: <Timer className="h-8 w-8 text-amber-600 dark:text-amber-400" aria-hidden="true" />,
                  title: "Peace of Mind",
                  description: "Live confidently knowing you're prepared for life's uncertainties."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="w-14 h-14 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center mb-5">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Insurance Options – Tab based ── */}
        <section id="insurance-options" className="py-16 md:py-24 bg-white dark:bg-gray-950">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Choose The Right Protection</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                We offer specialized solutions for your unique protection needs
              </p>
              {/* Tabs */}
              <div className="inline-flex p-1.5 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-sm">
                <button
                  className={cn(
                    "px-6 py-3 rounded-lg font-medium transition-all text-base",
                    activeTab === 'health'
                      ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  )}
                  onClick={() => setActiveTab('health')}
                  aria-pressed={activeTab === 'health'}
                >
                  Health Insurance
                </button>
                <button
                  className={cn(
                    "px-6 py-3 rounded-lg font-medium transition-all text-base",
                    activeTab === 'term'
                      ? "bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  )}
                  onClick={() => setActiveTab('term')}
                  aria-pressed={activeTab === 'term'}
                >
                  Term Insurance
                </button>
              </div>
            </div>

            <div className="max-w-6xl mx-auto">
              {/* Health Insurance Content */}
              <div className={cn("transition-all duration-300", activeTab === 'health' ? 'block' : 'hidden')}>
                <div className="grid md:grid-cols-5 gap-8 items-center">
                  <div className="md:col-span-2 md:order-2">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={activeTab === 'health' ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5 }}
                      className="relative"
                    >
                      <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 rounded-3xl transform rotate-3" />
                      <img
                        src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                        alt="Health Insurance"
                        className="rounded-2xl shadow-xl w-full h-auto object-cover transform -rotate-2"
                      />
                    </motion.div>
                  </div>
                  <div className="md:col-span-3 md:order-1">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={activeTab === 'health' ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="text-2xl md:text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">
                        Health Insurance
                      </h3>
                      <p className="text-lg mb-6 text-gray-600 dark:text-gray-400">
                        Comprehensive health insurance protects you and your family from the financial burden of medical emergencies,
                        ensuring you receive the best care without worrying about the costs.
                      </p>
                      <div ref={featuresRef} className="space-y-4 mb-8">
                        {[
                          "Cashless treatment at 10,000+ network hospitals",
                          "Coverage for pre and post hospitalization expenses",
                          "No claim bonus up to 50% of sum insured",
                          "Family floater plans to cover your entire family",
                          "Annual health check-ups included"
                        ].map((feature, index) => (
                          <motion.div
                            key={index}
                            className="flex items-start"
                            initial={{ opacity: 0, x: -20 }}
                            animate={featuresInView && activeTab === 'health' ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                          >
                            <div className="mr-3 mt-1 flex-shrink-0 w-5 h-5 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                              <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                            </div>
                            <p className="text-gray-700 dark:text-gray-300">{feature}</p>
                          </motion.div>
                        ))}
                      </div>
                      <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white gap-2 px-8 py-6 rounded-xl text-lg shadow-lg shadow-blue-500/10"
                        onClick={() => handleWhatsAppClick('health')}
                      >
                        Get Free Health Insurance Advice
                        <Phone className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Term Insurance Content */}
              <div className={cn("transition-all duration-300", activeTab === 'term' ? 'block' : 'hidden')}>
                <div className="grid md:grid-cols-5 gap-8 items-center">
                  <div className="md:col-span-2">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={activeTab === 'term' ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5 }}
                      className="relative"
                    >
                      <div className="absolute inset-0 bg-indigo-100 dark:bg-indigo-900/30 rounded-3xl transform rotate-3" />
                      <img
                        src="https://images.unsplash.com/photo-1590650153855-d9e808231d41?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                        alt="Term Life Insurance"
                        className="rounded-2xl shadow-xl w-full h-auto object-cover transform -rotate-2"
                      />
                    </motion.div>
                  </div>
                  <div className="md:col-span-3">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={activeTab === 'term' ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="text-2xl md:text-3xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">
                        Term Insurance
                      </h3>
                      <p className="text-lg mb-6 text-gray-600 dark:text-gray-400">
                        Term insurance provides financial security to your loved ones in your absence,
                        ensuring they can maintain their lifestyle and achieve long-term goals without financial stress.
                      </p>
                      <div className="space-y-4 mb-8">
                        {[
                          "High coverage (up to ₹1 Crore) at affordable premiums",
                          "Income replacement for your family",
                          "Tax benefits under Section 80C and 10(10D)",
                          "Additional riders for critical illness coverage",
                          "Life stage-based coverage enhancement options"
                        ].map((feature, index) => (
                          <motion.div
                            key={index}
                            className="flex items-start"
                            initial={{ opacity: 0, x: -20 }}
                            animate={activeTab === 'term' ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                          >
                            <div className="mr-3 mt-1 flex-shrink-0 w-5 h-5 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center">
                              <CheckCircle2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                            </div>
                            <p className="text-gray-700 dark:text-gray-300">{feature}</p>
                          </motion.div>
                        ))}
                      </div>
                      <Button
                        className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2 px-8 py-6 rounded-xl text-lg shadow-lg shadow-indigo-500/10"
                        onClick={() => handleWhatsAppClick('term')}
                      >
                        Get Free Term Insurance Advice
                        <Phone className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Insurance For Every Life Stage ── */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-950 dark:to-blue-950/30">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Insurance For Every Life Stage</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                We understand that insurance needs vary based on your life stage. Our advisors help you find the right coverage for where you are now.
              </p>
            </div>
            <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Young Professionals",
                  icon: <User className="h-10 w-10 text-blue-600 dark:text-blue-400" aria-hidden="true" />,
                  description: "Starting your career? Get essential coverage at affordable rates with room to upgrade as you grow.",
                  features: ["Health insurance with lower premiums", "Term insurance to secure future plans", "Critical illness riders"],
                  color: "blue"
                },
                {
                  title: "Growing Families",
                  icon: <Users className="h-10 w-10 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />,
                  description: "Protect your growing family with comprehensive coverage for all your loved ones.",
                  features: ["Family floater health plans", "Higher term insurance coverage", "Child education protection"],
                  color: "indigo"
                },
                {
                  title: "Pre-Retirement",
                  icon: <Coins className="h-10 w-10 text-purple-600 dark:text-purple-400" aria-hidden="true" />,
                  description: "Secure your retirement years with the right mix of health and life coverage.",
                  features: ["Senior-friendly health insurance", "Income replacement solutions", "Legacy planning options"],
                  color: "purple"
                }
              ].map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={cardsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className={cn(
                    "overflow-hidden h-full shadow-lg hover:shadow-xl transition-all duration-300",
                    card.color === "blue" ? "border-blue-100 dark:border-blue-900/50" :
                    card.color === "indigo" ? "border-indigo-100 dark:border-indigo-900/50" :
                    "border-purple-100 dark:border-purple-900/50"
                  )}>
                    <CardHeader className={cn(
                      "pb-4",
                      card.color === "blue" ? "border-b border-blue-100 dark:border-blue-900/30" :
                      card.color === "indigo" ? "border-b border-indigo-100 dark:border-indigo-900/30" :
                      "border-b border-purple-100 dark:border-purple-900/30"
                    )}>
                      <div className="flex items-center gap-3 mb-1">
                        <div className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center",
                          card.color === "blue" ? "bg-blue-50 dark:bg-blue-900/20" :
                          card.color === "indigo" ? "bg-indigo-50 dark:bg-indigo-900/20" :
                          "bg-purple-50 dark:bg-purple-900/20"
                        )}>
                          {card.icon}
                        </div>
                        <CardTitle>{card.title}</CardTitle>
                      </div>
                      <CardDescription className="text-base">{card.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <ul className="space-y-3">
                        {card.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <div className={cn(
                              "mr-3 mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center",
                              card.color === "blue" ? "bg-blue-100 dark:bg-blue-900/50" :
                              card.color === "indigo" ? "bg-indigo-100 dark:bg-indigo-900/50" :
                              "bg-purple-100 dark:bg-purple-900/50"
                            )}>
                              <CheckCircle2 className={cn(
                                "h-3 w-3",
                                card.color === "blue" ? "text-blue-600 dark:text-blue-400" :
                                card.color === "indigo" ? "text-indigo-600 dark:text-indigo-400" :
                                "text-purple-600 dark:text-purple-400"
                              )} aria-hidden="true" />
                            </div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className={cn(
                          "w-full gap-2",
                          card.color === "blue" ? "bg-blue-600 hover:bg-blue-700 text-white" :
                          card.color === "indigo" ? "bg-indigo-600 hover:bg-indigo-700 text-white" :
                          "bg-purple-600 hover:bg-purple-700 text-white"
                        )}
                        onClick={() => handleWhatsAppClick(activeTab)}
                      >
                        Get Free Consultation
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Consultation CTA ── */}
        <section id="consultation" className="py-16 md:py-24 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="mb-4 inline-flex items-center justify-center px-3 py-1.5 bg-blue-100 dark:bg-blue-900/40 rounded-full">
                      <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" aria-hidden="true" />
                      <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Expert Advice</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready To Secure Your Future?</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                      Our insurance experts are ready to guide you through the best options tailored to your specific needs and budget. Get a free consultation today!
                    </p>
                    <Button
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700 text-white gap-2 px-8 py-6 rounded-xl text-lg shadow-lg shadow-blue-500/10"
                      onClick={() => handleWhatsAppClick(activeTab)}
                    >
                      Schedule a Free Consultation
                      <Phone className="h-5 w-5" aria-hidden="true" />
                    </Button>
                    <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                      Our consultant will reach out to you within 24 hours of your request.
                    </p>
                  </motion.div>
                </div>
                <div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-3xl transform rotate-3" />
                    <img
                      src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                      alt="Insurance Consultation"
                      className="rounded-2xl shadow-xl w-full h-auto object-cover transform -rotate-2"
                    />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Back to Home */}
            <div className="mt-16 text-center">
              <Link to="/">
                <Button variant="outline" size="lg" className="gap-2">
                  <Home className="h-4 w-4" aria-hidden="true" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default InsurancePlanning;
