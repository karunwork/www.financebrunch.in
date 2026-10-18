import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  HomeIcon, ChevronRight, ArrowRight, ExternalLink,
  Sparkles, Compass, TrendingUp, LineChart, BookOpen, 
  ShieldCheck, Laptop, Users, PieChart, Mail, Phone, 
  GraduationCap, CheckCircle2, Send, Lightbulb, Shield,
  Award, HeartHandshake, Globe, Briefcase, Code2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { cn } from '@/lib/utils';

export default function Careers() {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Form state for future opportunity interest
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    areaOfInterest: 'Financial Research & Market Analysis',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const futureAreas = [
    'Financial Research & Market Analysis',
    'Wealth Management & Financial Planning',
    'FinTech & Software Development',
    'Digital Content & Financial Education',
    'Client Relations & Business Development',
    'Data Analytics & Business Intelligence',
    'Other Strategic Area',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInterestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nameTrimmed = formData.name.trim();
    const emailTrimmed = formData.email.trim();

    if (!nameTrimmed || !emailTrimmed) {
      toast.error('Please provide your name and email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailTrimmed)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    // Prepare mailto link with encoded content
    const subject = encodeURIComponent(`Expression of Future Interest: ${formData.areaOfInterest} - ${nameTrimmed}`);
    const body = encodeURIComponent(
      `Hello Finance Brunch Team,\n\nI am expressing interest in future opportunities with Finance Brunch.\n\nName: ${nameTrimmed}\nEmail: ${emailTrimmed}\nArea of Interest: ${formData.areaOfInterest}\n\nBackground & Note:\n${formData.message.trim() || 'I am interested in learning more about future opportunities and following the growth of Finance Brunch.'}\n\nBest regards,\n${nameTrimmed}`
    );

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      window.location.href = `mailto:admin@financebrunch.in?subject=${subject}&body=${body}`;
      toast.info('Your interest details have been prepared for admin@financebrunch.in. We have opened your email client to send your message directly.');
    }, 400);
  };

  // Apple-inspired smooth deceleration bezier
  const appleEase = [0.16, 1, 0.3, 1] as const;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 20,
      scale: shouldReduceMotion ? 1 : 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: shouldReduceMotion ? 0 : 0.55, ease: appleEase },
    },
  };

  // Section 2: Future Vision 5 Strategic Pillars
  const visionPillars = [
    {
      id: 'digital-education',
      title: 'Digital Services & Education',
      category: 'Financial Literacy',
      icon: <BookOpen className="h-6 w-6" />,
      description: 'Democratizing financial knowledge through intuitive learning hubs, transparent guides, and interactive tools that make personal investing accessible to everyone.',
      accent: {
        iconBg: 'bg-blue-500/10 dark:bg-blue-500/15',
        iconColor: 'text-blue-600 dark:text-cyan-400',
        border: 'border-blue-500/25 dark:border-cyan-400/25',
        badgeBg: 'bg-blue-50 dark:bg-blue-950/60',
        badgeText: 'text-blue-700 dark:text-cyan-300',
        topGlow: 'from-transparent via-blue-500/60 to-transparent',
        glow: 'hover:shadow-[0_16px_36px_-10px_rgba(59,130,246,0.18)] dark:hover:shadow-[0_16px_36px_-10px_rgba(6,182,212,0.22)]',
      },
    },
    {
      id: 'investment-research',
      title: 'Research & Data-Driven Insights',
      category: 'Market Intelligence',
      icon: <LineChart className="h-6 w-6" />,
      description: 'Applying quantitative modeling, valuation disciplines, and structured risk-reward research across Indian and global equities to deliver high-conviction insights.',
      accent: {
        iconBg: 'bg-purple-500/10 dark:bg-purple-500/15',
        iconColor: 'text-purple-600 dark:text-purple-400',
        border: 'border-purple-500/25 dark:border-purple-400/25',
        badgeBg: 'bg-purple-50 dark:bg-purple-950/60',
        badgeText: 'text-purple-700 dark:text-purple-300',
        topGlow: 'from-transparent via-purple-500/60 to-transparent',
        glow: 'hover:shadow-[0_16px_36px_-10px_rgba(168,85,247,0.18)] dark:hover:shadow-[0_16px_36px_-10px_rgba(168,85,247,0.22)]',
      },
    },
    {
      id: 'wealth-management',
      title: 'Wealth Management & Planning',
      category: 'Fiduciary Advisory',
      icon: <ShieldCheck className="h-6 w-6" />,
      description: 'Crafting life-stage wealth roadmaps, early retirement (FIRE) blueprints, and multi-asset asset allocation models aligned with clients’ real-world goals.',
      accent: {
        iconBg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
        iconColor: 'text-emerald-600 dark:text-emerald-400',
        border: 'border-emerald-500/25 dark:border-emerald-400/25',
        badgeBg: 'bg-emerald-50 dark:bg-emerald-950/60',
        badgeText: 'text-emerald-700 dark:text-emerald-300',
        topGlow: 'from-transparent via-emerald-500/60 to-transparent',
        glow: 'hover:shadow-[0_16px_36px_-10px_rgba(16,185,129,0.18)] dark:hover:shadow-[0_16px_36px_-10px_rgba(16,185,129,0.22)]',
      },
    },
    {
      id: 'technology-experience',
      title: 'Technology-Enabled Experience',
      category: 'FinTech Innovation',
      icon: <Code2 className="h-6 w-6" />,
      description: 'Engineering responsive, state-of-the-art client interfaces, instant portfolio calculators, and seamless digital onboarding to simplify complex wealth decisions.',
      accent: {
        iconBg: 'bg-cyan-500/10 dark:bg-cyan-500/15',
        iconColor: 'text-cyan-600 dark:text-cyan-400',
        border: 'border-cyan-500/25 dark:border-cyan-400/25',
        badgeBg: 'bg-cyan-50 dark:bg-cyan-950/60',
        badgeText: 'text-cyan-700 dark:text-cyan-300',
        topGlow: 'from-transparent via-cyan-500/60 to-transparent',
        glow: 'hover:shadow-[0_16px_36px_-10px_rgba(6,182,212,0.18)] dark:hover:shadow-[0_16px_36px_-10px_rgba(6,182,212,0.22)]',
      },
    },
    {
      id: 'global-presence',
      title: 'Global Awareness & Markets',
      category: 'Cross-Border Wealth',
      icon: <Globe className="h-6 w-6" />,
      description: 'Bridging domestic capital with international opportunities across US equities and providing cross-border planning for NRI families worldwide.',
      accent: {
        iconBg: 'bg-amber-500/10 dark:bg-amber-500/15',
        iconColor: 'text-amber-600 dark:text-amber-400',
        border: 'border-amber-500/25 dark:border-amber-400/25',
        badgeBg: 'bg-amber-50 dark:bg-amber-950/60',
        badgeText: 'text-amber-700 dark:text-amber-300',
        topGlow: 'from-transparent via-amber-500/60 to-transparent',
        glow: 'hover:shadow-[0_16px_36px_-10px_rgba(245,158,11,0.18)] dark:hover:shadow-[0_16px_36px_-10px_rgba(245,158,11,0.22)]',
      },
    },
  ];

  // Section 3: Potential Future Career Paths
  const futureCareerPaths = [
    {
      id: 'research-analysis',
      title: 'Financial Research & Market Analysis',
      category: 'Equity & Macro',
      icon: <TrendingUp className="h-6 w-6" />,
      focus: 'Fundamental valuation modeling, sector research, quarterly earnings analysis, and primary market evaluation (IPOs & unlisted shares).',
      futureScope: 'Quantitative financial modeling, analytical rigor, and deep understanding of Indian and international capital market mechanics.',
      accent: {
        iconBg: 'bg-blue-500/10 dark:bg-blue-500/15',
        iconColor: 'text-blue-600 dark:text-cyan-400',
        border: 'border-blue-500/25 dark:border-cyan-400/25',
        badgeBg: 'bg-blue-50 dark:bg-blue-950/60',
        badgeText: 'text-blue-700 dark:text-cyan-300',
        topGlow: 'from-transparent via-blue-500/60 to-transparent',
        glow: 'hover:shadow-[0_16px_36px_-10px_rgba(59,130,246,0.18)] dark:hover:shadow-[0_16px_36px_-10px_rgba(6,182,212,0.22)]',
      },
    },
    {
      id: 'wealth-planning',
      title: 'Wealth Management & Financial Planning',
      category: 'Personalized Advisory',
      icon: <ShieldCheck className="h-6 w-6" />,
      focus: 'Building customized financial plans, retirement projections, tax-efficient asset allocations, and client risk profile assessments.',
      futureScope: 'Certified financial planning frameworks, disciplined advisory, client empathy, and holistic life-stage wealth stewardship.',
      accent: {
        iconBg: 'bg-purple-500/10 dark:bg-purple-500/15',
        iconColor: 'text-purple-600 dark:text-purple-400',
        border: 'border-purple-500/25 dark:border-purple-400/25',
        badgeBg: 'bg-purple-50 dark:bg-purple-950/60',
        badgeText: 'text-purple-700 dark:text-purple-300',
        topGlow: 'from-transparent via-purple-500/60 to-transparent',
        glow: 'hover:shadow-[0_16px_36px_-10px_rgba(168,85,247,0.18)] dark:hover:shadow-[0_16px_36px_-10px_rgba(168,85,247,0.22)]',
      },
    },
    {
      id: 'fintech-development',
      title: 'FinTech & Software Development',
      category: 'Digital Architecture',
      icon: <Laptop className="h-6 w-6" />,
      focus: 'Developing web-scale financial calculators, real-time data interfaces, responsive user experiences, and secure advisory tooling.',
      futureScope: 'Modern TypeScript and React ecosystems, performant web design, client-side financial computation, and data security.',
      accent: {
        iconBg: 'bg-cyan-500/10 dark:bg-cyan-500/15',
        iconColor: 'text-cyan-600 dark:text-cyan-400',
        border: 'border-cyan-500/25 dark:border-cyan-400/25',
        badgeBg: 'bg-cyan-50 dark:bg-cyan-950/60',
        badgeText: 'text-cyan-700 dark:text-cyan-300',
        topGlow: 'from-transparent via-cyan-500/60 to-transparent',
        glow: 'hover:shadow-[0_16px_36px_-10px_rgba(6,182,212,0.18)] dark:hover:shadow-[0_16px_36px_-10px_rgba(6,182,212,0.22)]',
      },
    },
    {
      id: 'content-education',
      title: 'Digital Content & Financial Education',
      category: 'Media & Outreach',
      icon: <BookOpen className="h-6 w-6" />,
      focus: 'Creating actionable educational videos, researched editorial insights, visual guides, and interactive market explainers.',
      futureScope: 'Translating complex financial and regulatory concepts into engaging, accurate, and transparent educational content.',
      accent: {
        iconBg: 'bg-amber-500/10 dark:bg-amber-500/15',
        iconColor: 'text-amber-600 dark:text-amber-400',
        border: 'border-amber-500/25 dark:border-amber-400/25',
        badgeBg: 'bg-amber-50 dark:bg-amber-950/60',
        badgeText: 'text-amber-700 dark:text-amber-300',
        topGlow: 'from-transparent via-amber-500/60 to-transparent',
        glow: 'hover:shadow-[0_16px_36px_-10px_rgba(245,158,11,0.18)] dark:hover:shadow-[0_16px_36px_-10px_rgba(245,158,11,0.22)]',
      },
    },
    {
      id: 'client-relations',
      title: 'Client Relations & Business Development',
      category: 'Partnerships & Success',
      icon: <Users className="h-6 w-6" />,
      focus: 'Connecting with prospective clients, managing NRI wealth advisory inquiries, fostering community trust, and coordinating consultation workflows.',
      futureScope: 'High-touch professional communication, client onboarding excellence, and relationship management built on long-term integrity.',
      accent: {
        iconBg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
        iconColor: 'text-emerald-600 dark:text-emerald-400',
        border: 'border-emerald-500/25 dark:border-emerald-400/25',
        badgeBg: 'bg-emerald-50 dark:bg-emerald-950/60',
        badgeText: 'text-emerald-700 dark:text-emerald-300',
        topGlow: 'from-transparent via-emerald-500/60 to-transparent',
        glow: 'hover:shadow-[0_16px_36px_-10px_rgba(16,185,129,0.18)] dark:hover:shadow-[0_16px_36px_-10px_rgba(16,185,129,0.22)]',
      },
    },
    {
      id: 'data-analytics',
      title: 'Data Analytics & Business Intelligence',
      category: 'Data Science',
      icon: <PieChart className="h-6 w-6" />,
      focus: 'Evaluating portfolio trends, analyzing user engagement patterns, optimizing operational efficiency, and uncovering macroeconomic data insights.',
      futureScope: 'Data pipelines, statistical modeling, financial analytics visualization, and data-backed organizational decision-making.',
      accent: {
        iconBg: 'bg-rose-500/10 dark:bg-rose-500/15',
        iconColor: 'text-rose-600 dark:text-rose-400',
        border: 'border-rose-500/25 dark:border-rose-400/25',
        badgeBg: 'bg-rose-50 dark:bg-rose-950/60',
        badgeText: 'text-rose-700 dark:text-rose-300',
        topGlow: 'from-transparent via-rose-500/60 to-transparent',
        glow: 'hover:shadow-[0_16px_36px_-10px_rgba(244,63,94,0.18)] dark:hover:shadow-[0_16px_36px_-10px_rgba(244,63,94,0.22)]',
      },
    },
  ];

  // Section 4: Growth and Learning Pillars
  const learningPillars = [
    {
      icon: <GraduationCap className="h-6 w-6 text-blue-600 dark:text-cyan-400" />,
      title: 'Continuous Professional Learning',
      description: 'We place deep value on ongoing skill mastery, supporting financial accreditation (NISM, CFP, CA, CFA) and keeping pace with evolving global market structures.',
    },
    {
      icon: <HeartHandshake className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
      title: 'Cross-Functional Collaboration',
      description: 'Breakthrough ideas emerge where quantitative researchers, web technologists, and wealth advisors collaborate openly with shared purpose.',
    },
    {
      icon: <Shield className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
      title: 'Responsible Financial Innovation',
      description: 'Every technology and strategy we explore is anchored by strict fiduciary ethics, investor protection, and unwavering regulatory alignment.',
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-amber-600 dark:text-amber-400" />,
      title: 'Adaptability in a Digital Era',
      description: 'Equipping future financial thinkers with the modern digital toolsets, analytical models, and communicative clarity needed for the next decade of finance.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen selection:bg-cyan-500/20 selection:text-cyan-600">
      <ScrollToTop />

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

        {/* 1. HERO SECTION — BUILD THE FUTURE OF FINANCE */}
        <section className="relative pt-6 sm:pt-10 pb-16 sm:pb-20 overflow-hidden bg-gradient-to-b from-blue-50/40 via-transparent to-transparent dark:from-blue-950/20 dark:via-transparent">
          
          {/* Subtle Watermark */}
          <div 
            aria-hidden="true" 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 opacity-[0.05] dark:opacity-[0.07]"
          >
            <img 
              src="/images/fb-watermark.png" 
              alt="" 
              className="w-[280px] sm:w-[420px] md:w-[500px] h-auto object-contain filter contrast-105 dark:brightness-110" 
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
              
              {/* Category Pill */}
              <motion.div 
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: appleEase }}
                className="inline-flex items-center gap-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full py-1.5 px-4 mb-4 sm:mb-5 border border-blue-200/70 dark:border-blue-900/60 shadow-sm"
              >
                <Sparkles size={14} className="text-blue-600 dark:text-cyan-400" />
                <span className="text-xs sm:text-sm font-semibold tracking-wide text-blue-700 dark:text-cyan-300">
                  Future Scope & Strategic Growth
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1 
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: appleEase, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 tracking-tight text-slate-900 dark:text-white leading-tight"
              >
                Build the Future of Finance{" "}
                <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400 bg-clip-text text-transparent">
                  With Us
                </span>
              </motion.h1>

              {/* Supporting Text */}
              <motion.p 
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: appleEase, delay: 0.2 }}
                className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed font-normal"
              >
                Explore how innovation, financial expertise, and technology can create better financial experiences and opportunities for the future.
              </motion.p>

              {/* CTA Action Buttons */}
              <motion.div 
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: appleEase, delay: 0.3 }}
                className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
              >
                <a 
                  href="#future-career-paths"
                  className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-slate-950 transition-all duration-300 shadow-md shadow-blue-500/20 hover:shadow-lg hover:scale-105 active:scale-100"
                >
                  <span>Explore Future Opportunities</span>
                  <ChevronRight size={15} className="ml-1.5" />
                </a>

                <a 
                  href="#our-future-vision"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-cyan-400 transition-all"
                >
                  <span>Our Future Vision</span>
                  <Compass size={14} className="ml-1.5 text-blue-600 dark:text-cyan-400" />
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 2. OUR FUTURE VISION SECTION */}
        <section 
          id="our-future-vision" 
          className="py-16 sm:py-20 bg-transparent scroll-mt-20 border-t border-slate-200/60 dark:border-slate-800/60"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
              <span className="inline-block px-3.5 py-1 bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-cyan-400 border border-blue-200 dark:border-blue-900/60 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
                Strategic Roadmap
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4 text-slate-900 dark:text-white">
                Our Future Vision
              </h2>
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                How Finance Brunch is charting the course to develop and expand across critical dimensions of modern financial services.
              </p>
            </div>

            {/* 5 Strategic Vision Cards in Balanced Grid */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 max-w-[1140px] mx-auto items-stretch"
            >
              {visionPillars.map((pillar) => (
                <motion.div 
                  key={pillar.id}
                  variants={itemVariants}
                  className={cn(
                    "group relative rounded-3xl p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between select-none h-auto min-h-[290px] w-full",
                    "backdrop-blur-xl border shadow-sm hover:shadow-xl",
                    "bg-white/95 dark:bg-[#071329]/95 border-slate-200/90 dark:border-slate-800/90",
                    "hover:-translate-y-1.5 hover:border-blue-500/50 dark:hover:border-cyan-400/50",
                    pillar.accent.glow
                  )}
                >
                  {/* Top Architectural Accent Highlight Line */}
                  <div 
                    className={cn(
                      "absolute top-0 inset-x-0 h-[2.5px] rounded-t-3xl bg-gradient-to-r pointer-events-none",
                      pillar.accent.topGlow
                    )} 
                  />

                  {/* Soft Background Hover Bloom */}
                  <div 
                    aria-hidden="true"
                    className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/[0.03] to-purple-500/[0.03] dark:from-cyan-500/[0.03] dark:to-purple-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  />

                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <div>
                      {/* Top Row: Icon Badge & Category Chip */}
                      <div className="flex items-center justify-between mb-4">
                        <div className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm transition-transform duration-300 group-hover:scale-105 flex-shrink-0",
                          pillar.accent.iconBg,
                          pillar.accent.iconColor,
                          pillar.accent.border
                        )}>
                          {pillar.icon}
                        </div>

                        <span className={cn(
                          "px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase border",
                          pillar.accent.badgeBg,
                          pillar.accent.badgeText,
                          pillar.accent.border
                        )}>
                          {pillar.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg sm:text-[19px] font-bold tracking-tight text-slate-900 dark:text-white leading-snug mb-2.5 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                        {pillar.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-auto border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
                      <span className="inline-flex items-center gap-1.5 text-blue-600 dark:text-cyan-400">
                        <CheckCircle2 size={13} />
                        <span>Core Strategic Pillar</span>
                      </span>
                      <span className="font-mono text-[11px] text-slate-400">Vision 2030</span>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Summary Statement Card completing the balanced grid */}
              <motion.div 
                variants={itemVariants}
                className="group relative rounded-3xl p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between select-none h-auto min-h-[290px] w-full backdrop-blur-xl border border-dashed border-blue-300/80 dark:border-cyan-500/30 bg-blue-50/40 dark:bg-slate-900/40 hover:-translate-y-1.5"
              >
                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center border border-blue-400/30 bg-blue-500/10 text-blue-600 dark:text-cyan-400 mb-4 shadow-sm">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase border border-blue-200 dark:border-blue-900/60 bg-white/70 dark:bg-slate-950/60 text-blue-700 dark:text-cyan-300 mb-3">
                      Sustainable Growth
                    </span>
                    <h3 className="text-lg sm:text-[19px] font-bold tracking-tight text-slate-900 dark:text-white leading-snug mb-2">
                      Purpose-Driven Architecture
                    </h3>
                    <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed">
                      We prioritize patient capital, long-term fiduciary alignment, and sustainable technological resilience over short-term market hype.
                    </p>
                  </div>

                  <div className="pt-4 mt-auto border-t border-blue-200/50 dark:border-slate-800/80 text-xs text-blue-700 dark:text-cyan-300 font-semibold flex items-center gap-1">
                    <span>Explore emerging domains below</span>
                    <ArrowRight size={13} />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 3. FUTURE CAREER PATHS SECTION */}
        <section 
          id="future-career-paths" 
          className="py-16 sm:py-20 bg-transparent scroll-mt-20 border-t border-slate-200/60 dark:border-slate-800/60"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
              <span className="inline-block px-3.5 py-1 bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-900/60 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
                Emerging Domains
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4 text-slate-900 dark:text-white">
                Future Career Paths
              </h2>
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-4">
                As Finance Brunch continues to evolve, we anticipate organizational development across several potential future career paths.
              </p>
              
              {/* Explicit non-vacancy clarity alert */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/70 dark:border-blue-900/50 text-xs text-slate-700 dark:text-slate-300 max-w-xl mx-auto text-center">
                <Compass className="w-4 h-4 text-blue-600 dark:text-cyan-400 flex-shrink-0" />
                <span>
                  <strong>Note:</strong> These areas represent future growth directions as our business expands, rather than active immediate vacancies.
                </span>
              </div>
            </div>

            {/* 6 Potential Future Paths in 3-Column, 2-Row Grid */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 max-w-[1140px] mx-auto items-stretch"
            >
              {futureCareerPaths.map((path) => (
                <motion.div 
                  key={path.id}
                  variants={itemVariants}
                  className={cn(
                    "group relative rounded-3xl p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between select-none h-auto min-h-[310px] lg:h-[315px] w-full",
                    "backdrop-blur-xl border shadow-sm hover:shadow-xl",
                    "bg-white/95 dark:bg-[#071329]/95 border-slate-200/90 dark:border-slate-800/90",
                    "hover:-translate-y-1.5 hover:border-blue-500/50 dark:hover:border-cyan-400/50",
                    path.accent.glow
                  )}
                >
                  {/* Top Architectural Accent Highlight Line */}
                  <div 
                    className={cn(
                      "absolute top-0 inset-x-0 h-[2.5px] rounded-t-3xl bg-gradient-to-r pointer-events-none",
                      path.accent.topGlow
                    )} 
                  />

                  {/* Soft Background Hover Bloom */}
                  <div 
                    aria-hidden="true"
                    className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/[0.03] to-purple-500/[0.03] dark:from-cyan-500/[0.03] dark:to-purple-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  />

                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <div>
                      {/* Top Row: Icon Badge & Category Chip */}
                      <div className="flex items-center justify-between mb-3.5">
                        <div className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm transition-transform duration-300 group-hover:scale-105 flex-shrink-0",
                          path.accent.iconBg,
                          path.accent.iconColor,
                          path.accent.border
                        )}>
                          {path.icon}
                        </div>

                        <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase border bg-slate-100/80 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700">
                          Potential Path
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg sm:text-[18px] font-bold tracking-tight text-slate-900 dark:text-white leading-snug mb-2 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-1">
                        {path.title}
                      </h3>

                      {/* Focus Scope */}
                      <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed mb-2 line-clamp-3">
                        {path.focus}
                      </p>
                    </div>

                    {/* Skill/Scope Footer */}
                    <div className="pt-3.5 mt-auto border-t border-slate-100 dark:border-slate-800/80">
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                        <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-0.5">Key Capability Profile:</span>
                        <span className="line-clamp-2">{path.futureScope}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 4. GROWTH AND LEARNING SECTION */}
        <section 
          id="growth-and-learning" 
          className="py-16 sm:py-20 bg-transparent scroll-mt-20 border-t border-slate-200/60 dark:border-slate-800/60"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
              <span className="inline-block px-3.5 py-1 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/60 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
                Culture & Philosophy
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4 text-slate-900 dark:text-white">
                Growth, Learning & Innovation
              </h2>
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                We believe sustainable financial leadership is built on continuous skill development, collaboration, and uncompromising fiduciary ethics.
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-[1040px] mx-auto">
              {learningPillars.map((pillar, idx) => (
                <div 
                  key={idx}
                  className="rounded-3xl p-6 sm:p-7 border border-slate-200/90 dark:border-slate-800/90 bg-white/90 dark:bg-[#071329]/90 shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center flex-shrink-0 border border-slate-200/80 dark:border-slate-700">
                    {pillar.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. FUTURE OPPORTUNITIES CTA & EXPRESSION OF INTEREST FORM */}
        <section 
          id="express-interest" 
          className="py-16 sm:py-20 bg-gradient-to-b from-blue-50/50 via-white to-transparent dark:from-blue-950/20 dark:via-[#070D1B] dark:to-transparent border-t border-slate-200/60 dark:border-slate-800/60 scroll-mt-20"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              
              {/* Header */}
              <div className="text-center mb-10 sm:mb-12">
                <span className="inline-block px-3.5 py-1 bg-cyan-100 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-900/60 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
                  Connect With Our Journey
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4 text-slate-900 dark:text-white">
                  Express Interest in Future Opportunities
                </h2>
                <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                  While we are not actively hiring for open vacancies at this time, we are always eager to connect with disciplined financial minds and technologists who share our vision.
                </p>
              </div>

              {/* Form & Direct Contact Card */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Form: 7 cols */}
                <div className="lg:col-span-7 bg-white/95 dark:bg-[#0B1528]/95 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl shadow-blue-500/5">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    Share Your Profile
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                    Tell us about your background and the domain you are passionate about. We review submissions periodically as our organization expands.
                  </p>

                  <form onSubmit={handleInterestSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="bg-white/90 dark:bg-slate-900/80 border-slate-200 dark:border-slate-700 focus-visible:ring-blue-500 rounded-xl text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="e.g. rahul.sharma@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="bg-white/90 dark:bg-slate-900/80 border-slate-200 dark:border-slate-700 focus-visible:ring-blue-500 rounded-xl text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="areaOfInterest" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                        Area of Future Interest *
                      </label>
                      <select
                        id="areaOfInterest"
                        name="areaOfInterest"
                        value={formData.areaOfInterest}
                        onChange={handleInputChange}
                        className="w-full h-10 px-3 text-sm bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {futureAreas.map((area) => (
                          <option key={area} value={area} className="dark:bg-slate-900 text-slate-900 dark:text-white">
                            {area}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide">
                        Brief Background / Note (Optional)
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={3}
                        placeholder="Tell us a little about your experience, qualifications, or what resonates with Finance Brunch..."
                        value={formData.message}
                        onChange={handleInputChange}
                        className="bg-white/90 dark:bg-slate-900/80 border-slate-200 dark:border-slate-700 focus-visible:ring-blue-500 rounded-xl text-sm resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-11 bg-blue-600 hover:bg-blue-700 dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-slate-950 text-white font-semibold rounded-xl text-sm shadow-md transition-all duration-200 hover:shadow-lg"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      <span>{isSubmitting ? 'Preparing Email...' : 'Send Expression of Interest'}</span>
                    </Button>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center leading-relaxed">
                      Submitting initiates an honest direct email to our advisory management at <strong>admin@financebrunch.in</strong>. No automated rejection algorithms.
                    </p>
                  </form>
                </div>

                {/* Right Info: 5 cols */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* Direct Contact Fallback Box */}
                  <div className="rounded-3xl p-6 sm:p-7 border border-blue-200/80 dark:border-slate-800 bg-white/90 dark:bg-[#071329]/90 shadow-sm">
                    <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                      <Mail className="h-4 w-4 text-blue-600 dark:text-cyan-400" />
                      <span>Direct Advisory Channels</span>
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-5 leading-relaxed">
                      You can also reach out to us directly through our verified corporate communication channels:
                    </p>

                    <div className="space-y-3.5">
                      <div className="flex items-center gap-3 text-xs sm:text-sm">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-cyan-400 flex-shrink-0">
                          <Mail size={15} />
                        </div>
                        <div>
                          <span className="text-[11px] text-slate-400 block font-mono">PRIMARY INQUIRIES</span>
                          <a 
                            href="mailto:admin@financebrunch.in"
                            className="font-medium text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
                          >
                            admin@financebrunch.in
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-xs sm:text-sm">
                        <div className="w-8 h-8 rounded-lg bg-cyan-50 dark:bg-cyan-950/60 flex items-center justify-center text-cyan-600 dark:text-cyan-400 flex-shrink-0">
                          <Phone size={15} />
                        </div>
                        <div>
                          <span className="text-[11px] text-slate-400 block font-mono">DIRECT PHONE / WHATSAPP</span>
                          <a 
                            href="tel:+917842494981"
                            className="font-medium text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
                          >
                            +91 7842-494-981
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="pt-5 mt-5 border-t border-slate-100 dark:border-slate-800">
                      <a 
                        href="https://www.linkedin.com/company/finance-brunch/?viewAsMember=true"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-between w-full p-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-cyan-400 transition-all border border-slate-200/60 dark:border-slate-700/60"
                      >
                        <span>Follow Us on LinkedIn</span>
                        <ExternalLink size={13} />
                      </a>
                    </div>
                  </div>

                  {/* Corporate Credibility Note */}
                  <div className="rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60">
                    <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      <ShieldCheck size={14} className="text-emerald-500" />
                      <span>Fiduciary Integrity</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                      Finance Brunch operates with strict SEBI, AMFI, and IRDAI compliance standards. We prioritize ethical wealth building and data protection for all clients and team members.
                    </p>
                  </div>

                </div>
              </div>

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
}
