import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  LineChart, ChevronRight, ExternalLink, 
  Info, Clock, HomeIcon, Phone,
  ArrowRight, Shield, TrendingUp, Globe,
  CandlestickChart, Sparkles, Briefcase, DollarSign
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { useIsMobile } from '@/hooks/use-mobile';
import { USAStockPopup } from '@/components/investment/USAStockPopup';
import { AppleScrollShowcase } from '@/components/investment/AppleScrollShowcase';

const InvestmentPlanning = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const shouldReduceMotion = useReducedMotion();
  const [usaStockPopupOpen, setUsaStockPopupOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDigitalGoldClick = () => {
    toast({
      title: "Coming Soon!",
      description: "We're getting our Digital Gold platform ready. Thank you for your interest! We'll inform you when we launch.",
      duration: 5000,
    });
  };
  
  const handleCryptoClick = () => {
    toast({
      title: "Coming Soon!",
      description: "We are waiting for Empannelment. Soon we will come up with Good news regarding Crypto Currency Investments!",
      duration: 5000,
    });
  };
  
  const handleContactAdvisor = () => {
    const phoneNumber = '8801313321';
    const whatsAppMessage = encodeURIComponent('Hi Finance Brunch Team, I\'m interested in your investment services. Can we connect?');
    
    if (isMobile) {
      window.location.href = `tel:+${phoneNumber}`;
    } else {
      window.open(`https://wa.me/${phoneNumber}?text=${whatsAppMessage}`, '_blank');
    }
  };

  // Apple-inspired smooth deceleration bezier
  const appleEase = [0.16, 1, 0.3, 1] as const;

  // Cinematic dropping headline animation variants
  const badgeVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : -22, 
      filter: shouldReduceMotion ? 'blur(0px)' : 'blur(8px)' 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.65, ease: appleEase, delay: 0.08 } 
    }
  };

  const headlineContainerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.22,
        staggerChildren: 0.08,
      }
    }
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : -32, 
      filter: shouldReduceMotion ? 'blur(0px)' : 'blur(10px)' 
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.75, ease: appleEase }
    }
  };

  const descVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : -18, 
      filter: shouldReduceMotion ? 'blur(0px)' : 'blur(6px)' 
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.7, ease: appleEase, delay: 0.58 }
    }
  };

  const ctaVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : -14, 
      filter: shouldReduceMotion ? 'blur(0px)' : 'blur(4px)' 
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.65, ease: appleEase, delay: 0.76 }
    }
  };

  // Staggered card container for Comprehensive Services
  const sectionGridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      }
    }
  };

  const serviceCardVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 20,
      scale: shouldReduceMotion ? 1 : 0.98,
      filter: shouldReduceMotion ? 'blur(0px)' : 'blur(4px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: shouldReduceMotion ? 0 : 0.55, ease: appleEase }
    }
  };

  interface InvestmentServiceItem {
    id: string;
    title: string;
    category: string;
    description: string;
    icon: React.ReactNode;
    accent: {
      iconBg: string;
      iconColor: string;
      border: string;
      badgeBg: string;
      badgeText: string;
      topGlow: string;
      glow: string;
    };
    renderAction: () => React.ReactNode;
  }

  const investmentServices: InvestmentServiceItem[] = [
    {
      id: "indian-stock-analysis",
      title: "Indian Stock Analysis",
      category: "Equity Research",
      description: "Expert analysis of Indian equity markets with actionable insights on stocks across various sectors and market capitalizations.",
      icon: <TrendingUp className="h-6 w-6" />,
      accent: {
        iconBg: "bg-blue-500/10 dark:bg-blue-500/15",
        iconColor: "text-blue-600 dark:text-cyan-400",
        border: "border-blue-500/25 dark:border-cyan-400/25",
        badgeBg: "bg-blue-50 dark:bg-blue-950/60",
        badgeText: "text-blue-700 dark:text-cyan-300",
        topGlow: "from-transparent via-blue-500/60 to-transparent",
        glow: "hover:shadow-[0_16px_36px_-10px_rgba(59,130,246,0.18)] dark:hover:shadow-[0_16px_36px_-10px_rgba(6,182,212,0.22)]",
      },
      renderAction: () => (
        <Link to="/indian-stock-analysis" className="w-full block">
          <Button className="w-full h-9.5 bg-blue-600 hover:bg-blue-700 dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-slate-950 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-sm transition-all group-hover:shadow-md">
            <span>Explore Indian Markets</span>
            <ChevronRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      ),
    },
    {
      id: "usa-stock-analysis",
      title: "USA Stock Analysis",
      category: "NASDAQ & NYSE",
      description: "In-depth research on US equities, focusing on growth stocks, tech companies, and dividend-yielding investments across NASDAQ and NYSE.",
      icon: <Globe className="h-6 w-6" />,
      accent: {
        iconBg: "bg-purple-500/10 dark:bg-purple-500/15",
        iconColor: "text-purple-600 dark:text-purple-400",
        border: "border-purple-500/25 dark:border-purple-400/25",
        badgeBg: "bg-purple-50 dark:bg-purple-950/60",
        badgeText: "text-purple-700 dark:text-purple-300",
        topGlow: "from-transparent via-purple-500/60 to-transparent",
        glow: "hover:shadow-[0_16px_36px_-10px_rgba(168,85,247,0.18)] dark:hover:shadow-[0_16px_36px_-10px_rgba(168,85,247,0.22)]",
      },
      renderAction: () => (
        <Button 
          className="w-full h-9.5 bg-blue-600 hover:bg-blue-700 dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-slate-950 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-sm transition-all group-hover:shadow-md"
          onClick={() => setUsaStockPopupOpen(true)}
        >
          <span>Explore US Equities</span>
          <ExternalLink className="ml-1.5 h-4 w-4 transition-transform group-hover:scale-110" />
        </Button>
      ),
    },
    {
      id: "ipo-analysis",
      title: "IPO Analysis",
      category: "Primary Market",
      description: "Detailed evaluation of upcoming IPOs, including business models, financial health, valuation, and potential for long-term growth.",
      icon: <Sparkles className="h-6 w-6" />,
      accent: {
        iconBg: "bg-emerald-500/10 dark:bg-emerald-500/15",
        iconColor: "text-emerald-600 dark:text-emerald-400",
        border: "border-emerald-500/25 dark:border-emerald-400/25",
        badgeBg: "bg-emerald-50 dark:bg-emerald-950/60",
        badgeText: "text-emerald-700 dark:text-emerald-300",
        topGlow: "from-transparent via-emerald-500/60 to-transparent",
        glow: "hover:shadow-[0_16px_36px_-10px_rgba(16,185,129,0.18)] dark:hover:shadow-[0_16px_36px_-10px_rgba(16,185,129,0.22)]",
      },
      renderAction: () => (
        <Link to="/ipo-analysis" className="w-full block">
          <Button className="w-full h-9.5 bg-blue-600 hover:bg-blue-700 dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-slate-950 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-sm transition-all group-hover:shadow-md">
            <span>View IPO Insights</span>
            <ChevronRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      ),
    },
    {
      id: "unlisted-shares",
      title: "Unlisted Shares",
      category: "Pre-IPO Equities",
      description: "Access to private equity opportunities in promising companies before they go public, offering potential for significant returns.",
      icon: <Briefcase className="h-6 w-6" />,
      accent: {
        iconBg: "bg-cyan-500/10 dark:bg-cyan-500/15",
        iconColor: "text-cyan-600 dark:text-cyan-400",
        border: "border-cyan-500/25 dark:border-cyan-400/25",
        badgeBg: "bg-cyan-50 dark:bg-cyan-950/60",
        badgeText: "text-cyan-700 dark:text-cyan-300",
        topGlow: "from-transparent via-cyan-500/60 to-transparent",
        glow: "hover:shadow-[0_16px_36px_-10px_rgba(6,182,212,0.18)] dark:hover:shadow-[0_16px_36px_-10px_rgba(6,182,212,0.22)]",
      },
      renderAction: () => (
        <Link to="/unlisted-shares" className="w-full block">
          <Button className="w-full h-9.5 bg-blue-600 hover:bg-blue-700 dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-slate-950 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-sm transition-all group-hover:shadow-md">
            <span>Explore Unlisted Shares</span>
            <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      ),
    },
    {
      id: "digital-gold",
      title: "Digital Gold",
      category: "24K Pure Gold",
      description: "Invest in 99.9% pure gold electronically without worrying about storage, security, or authenticity issues.",
      icon: <DollarSign className="h-6 w-6" />,
      accent: {
        iconBg: "bg-amber-500/10 dark:bg-amber-500/15",
        iconColor: "text-amber-600 dark:text-amber-400",
        border: "border-amber-500/25 dark:border-amber-400/25",
        badgeBg: "bg-amber-50 dark:bg-amber-950/60",
        badgeText: "text-amber-700 dark:text-amber-300",
        topGlow: "from-transparent via-amber-500/60 to-transparent",
        glow: "hover:shadow-[0_16px_36px_-10px_rgba(245,158,11,0.18)] dark:hover:shadow-[0_16px_36px_-10px_rgba(245,158,11,0.22)]",
      },
      renderAction: () => (
        <Button 
          className="w-full h-9.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-amber-700 dark:text-amber-300 font-semibold rounded-xl text-xs sm:text-sm shadow-sm transition-all"
          onClick={handleDigitalGoldClick}
        >
          <span>Coming Soon</span>
          <Info className="ml-1.5 h-4 w-4" />
        </Button>
      ),
    },
    {
      id: "crypto-currency",
      title: "Crypto Currency Investments",
      category: "Blockchain Assets",
      description: "Strategic guidance on blockchain assets and cryptocurrencies, helping you navigate this emerging investment class with confidence.",
      icon: <CandlestickChart className="h-6 w-6" />,
      accent: {
        iconBg: "bg-rose-500/10 dark:bg-rose-500/15",
        iconColor: "text-rose-600 dark:text-rose-400",
        border: "border-rose-500/25 dark:border-rose-400/25",
        badgeBg: "bg-rose-50 dark:bg-rose-950/60",
        badgeText: "text-rose-700 dark:text-rose-300",
        topGlow: "from-transparent via-rose-500/60 to-transparent",
        glow: "hover:shadow-[0_16px_36px_-10px_rgba(244,63,94,0.18)] dark:hover:shadow-[0_16px_36px_-10px_rgba(244,63,94,0.22)]",
      },
      renderAction: () => (
        <Button 
          className="w-full h-9.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-purple-700 dark:text-purple-300 font-semibold rounded-xl text-xs sm:text-sm shadow-sm transition-all"
          onClick={handleCryptoClick}
        >
          <span>Coming Soon</span>
          <Clock className="ml-1.5 h-4 w-4" />
        </Button>
      ),
    },
  ];

  const headlineWords = ["Maximize", "Your", "Investment", "Potential"];

  return (
    <div className="flex flex-col min-h-screen selection:bg-cyan-500/20 selection:text-cyan-600">
      <ScrollToTop />
      <USAStockPopup open={usaStockPopupOpen} onOpenChange={setUsaStockPopupOpen} />

      {/* Main Container with reduced top spacing */}
      <main className="flex-grow pt-16 sm:pt-20">
        
        {/* Compact Back-to-Home utility row */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-1">
          <Link to="/">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 bg-white/70 dark:bg-slate-900/60 border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md rounded-full px-3 py-1.5 transition-all shadow-sm hover:shadow"
            >
              <HomeIcon className="h-3.5 w-3.5" />
              <span>Back to Home</span>
            </Button>
          </Link>
        </div>
        
        {/* 1. COMPACT HERO SECTION WITH DROPPING ANIMATION */}
        <section className="relative pt-4 sm:pt-6 pb-12 sm:pb-16 overflow-hidden bg-gradient-to-b from-blue-50/40 via-transparent to-transparent dark:from-blue-950/20 dark:via-transparent">
          
          {/* Centered Translucent FB Watermark complementing the headline */}
          <div 
            aria-hidden="true" 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 opacity-[0.055] dark:opacity-[0.075] transition-opacity duration-500"
          >
            <img 
              src={`${import.meta.env.BASE_URL}images/fb-watermark.png`} 
              alt="" 
              className="w-[280px] sm:w-[380px] md:w-[460px] lg:w-[540px] h-auto object-contain filter contrast-105 dark:brightness-110" 
              loading="eager"
            />
          </div>

          {/* Ambient Lighting Blooms */}
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-25 dark:opacity-15 pointer-events-none">
            <div className="absolute top-[10%] right-[10%] w-64 h-64 rounded-full bg-blue-400/25 filter blur-3xl" />
            <div className="absolute bottom-[20%] right-[20%] w-48 h-48 rounded-full bg-purple-400/25 filter blur-2xl" />
          </div>
          <div className="absolute top-0 left-0 w-1/3 h-full opacity-25 dark:opacity-15 pointer-events-none">
            <div className="absolute top-[30%] left-[10%] w-56 h-56 rounded-full bg-indigo-400/25 filter blur-3xl" />
            <div className="absolute bottom-[10%] left-[20%] w-48 h-48 rounded-full bg-cyan-400/25 filter blur-2xl" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              
              {/* 1. Category Badge dropping from above */}
              <motion.div 
                variants={badgeVariants}
                initial="hidden"
                animate="visible"
                className="inline-flex items-center gap-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full py-1.5 px-4 mb-4 sm:mb-5 border border-blue-200/70 dark:border-blue-900/60 shadow-sm"
              >
                <LineChart size={15} className="text-blue-600 dark:text-cyan-400" />
                <span className="text-xs sm:text-sm font-semibold tracking-wide text-blue-700 dark:text-cyan-300">
                  Strategic Investment Solutions
                </span>
              </motion.div>
              
              {/* 2. Headline dropping into place with word-by-word stagger */}
              <motion.h1 
                variants={headlineContainerVariants}
                initial="hidden"
                animate="visible"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-5 tracking-tight flex flex-wrap justify-center gap-x-3 gap-y-1"
              >
                {headlineWords.map((word, index) => (
                  <motion.span 
                    key={index} 
                    variants={wordVariants}
                    className="inline-block bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400 bg-clip-text text-transparent"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>
              
              {/* 3. Description dropping into position */}
              <motion.p 
                variants={descVariants}
                initial="hidden"
                animate="visible"
                className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-slate-300 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed font-normal"
              >
                Our expert investment planning services help you navigate financial markets with confidence and build wealth for your future, whether you're in India or abroad.
              </motion.p>

              {/* 4. Action button entering last */}
              <motion.div 
                variants={ctaVariants}
                initial="hidden"
                animate="visible"
                className="flex items-center justify-center pt-2"
              >
                <a 
                  href="#comprehensive-investment-services"
                  className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-slate-950 transition-all duration-300 shadow-md shadow-blue-500/20 hover:shadow-lg hover:scale-105 active:scale-100"
                >
                  <span>Explore Services</span>
                  <ChevronRight size={15} className="ml-1.5" />
                </a>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* 2. WHY CHOOSE OUR INVESTMENT SERVICES CAROUSEL */}
        <AppleScrollShowcase />
        
        {/* 3. COMPREHENSIVE INVESTMENT SERVICES SECTION */}
        <section 
          className="py-16 sm:py-20 bg-transparent scroll-mt-20"
          id="comprehensive-investment-services"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
              <span className="inline-block px-3.5 py-1 bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-cyan-400 border border-blue-200 dark:border-blue-900/60 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
                Investment Solutions
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4 text-slate-900 dark:text-white">
                Comprehensive Investment Services
              </h2>
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Choose from our range of specialized investment services tailored to meet your financial objectives and risk tolerance.
              </p>
            </div>
            
            {/* 6 Comprehensive Services Cards with Staggered Entrance - Compact 3-Column, 2-Row Grid */}
            <motion.div 
              variants={sectionGridVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 max-w-[1140px] mx-auto items-stretch"
            >
              {investmentServices.map((service) => (
                <motion.div 
                  key={service.id} 
                  variants={serviceCardVariants}
                  className={cn(
                    "group relative rounded-3xl p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between select-none h-auto min-h-[300px] lg:h-[305px] w-full",
                    "backdrop-blur-xl border shadow-sm hover:shadow-xl",
                    "bg-white/95 dark:bg-[#071329]/95 border-slate-200/90 dark:border-slate-800/90",
                    "hover:-translate-y-1.5 hover:border-blue-500/50 dark:hover:border-cyan-400/50",
                    service.accent.glow
                  )}
                >
                  {/* Top Architectural Accent Highlight Line */}
                  <div 
                    className={cn(
                      "absolute top-0 inset-x-0 h-[2.5px] rounded-t-3xl bg-gradient-to-r pointer-events-none",
                      service.accent.topGlow
                    )} 
                  />

                  {/* Soft Background Pointer/Hover Ambient Bloom */}
                  <div 
                    aria-hidden="true"
                    className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/[0.03] to-purple-500/[0.03] dark:from-cyan-500/[0.03] dark:to-purple-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  />

                  {/* Card Interior */}
                  <div className="relative z-10 flex flex-col justify-between h-full">
                    {/* Header: Icon badge & Category Chip */}
                    <div>
                      <div className="flex items-center justify-between mb-3.5">
                        <div className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm transition-transform duration-300 group-hover:scale-105 flex-shrink-0",
                          service.accent.iconBg,
                          service.accent.iconColor,
                          service.accent.border
                        )}>
                          {service.icon}
                        </div>

                        <span className={cn(
                          "px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase border",
                          service.accent.badgeBg,
                          service.accent.badgeText,
                          service.accent.border
                        )}>
                          {service.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg sm:text-[19px] font-bold tracking-tight text-slate-900 dark:text-white leading-snug mb-2 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-1">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                        {service.description}
                      </p>
                    </div>

                    {/* Bottom CTA Action Button */}
                    <div className="pt-3.5 mt-auto border-t border-slate-100 dark:border-slate-800/80">
                      {service.renderAction()}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 4. CALL TO ACTION SECTION */}
        <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.12),transparent_60%)] pointer-events-none" />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-blue-100 mb-4">
                <Shield className="w-3.5 h-3.5 text-cyan-300" />
                <span>Personalized Wealth Advisory</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-5 tracking-tight text-white leading-tight">
                Ready to Elevate Your Investment Strategy?
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-blue-100/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                Our team of expert advisors is ready to guide you toward financial success with personalized investment solutions.
              </p>
              <Button 
                size="lg" 
                className="bg-white text-slate-950 hover:bg-blue-50 font-bold rounded-full px-8 py-3 text-sm sm:text-base shadow-xl shadow-blue-950/20 hover:scale-105 active:scale-100 transition-all duration-300"
                onClick={handleContactAdvisor}
              >
                {isMobile ? (
                  <>
                    <span>Call an Advisor</span>
                    <Phone className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    <span>Connect with an Advisor</span>
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </section>
        
        {/* Bottom Back-to-Home button */}
        <div className="container mx-auto px-4 py-10 flex justify-center">
          <Link to="/">
            <Button 
              variant="outline" 
              className="flex items-center gap-2 rounded-full px-6 py-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400 bg-white/70 dark:bg-slate-900/60 border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md shadow-sm hover:shadow"
            >
              <HomeIcon className="h-4 w-4" />
              <span>Back to Home</span>
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default InvestmentPlanning;
