import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ShieldCheck, Heart, ArrowRight, Phone, CheckCircle2, ChevronRight, Calculator, FileCheck, Users, Umbrella } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface InsuranceHeroProps {
  onSelectPathway: (type: 'health' | 'term') => void;
  onScrollToEstimator: () => void;
  onScrollToProducts: () => void;
  onWhatsApp: (service: 'Health Insurance' | 'Term Insurance' | 'General Insurance') => void;
}

export const InsuranceHero: React.FC<InsuranceHeroProps> = ({
  onSelectPathway,
  onScrollToEstimator,
  onScrollToProducts,
  onWhatsApp,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section aria-label="Insurance hero" className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-blue-950 to-slate-950 text-white pt-12 pb-20 md:pt-16 md:pb-28">
      {/* Ambient background glow accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-blue-600/15 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-48 right-10 w-80 h-80 bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute top-60 left-10 w-80 h-80 bg-indigo-600/15 blur-[100px] pointer-events-none rounded-full" />

      <div className="container relative z-10 px-4 md:px-6 mx-auto">
        {/* Navigation Breadcrumb / Tag */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-semibold backdrop-blur-md">
            <ShieldCheck className="h-4 w-4 text-cyan-400" aria-hidden="true" />
            <span>Finance Brunch • Comprehensive Insurance Planning</span>
          </div>

          <Link
            to="/contact?service=Insurance+Planning"
            className="text-xs text-blue-200/80 hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>Need advice? Speak to an advisor</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Main Hero Header */}
        <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] mb-6"
          >
            Protect Your Family, Health &{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
              Financial Independence
            </span>
          </motion.h1>

          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8"
          >
            Insurance shouldn’t be a confusing maze of sales calls and hidden clauses.
            We help you understand your real protection needs, decode policy fine print,
            and choose coverage tailored to your life stage.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5"
          >
            <Button
              size="lg"
              onClick={onScrollToProducts}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-medium px-7 py-6 rounded-xl shadow-lg shadow-blue-600/30 gap-2 text-base transition-all transform hover:-translate-y-0.5"
            >
              Explore Insurance Products
              <ArrowRight className="h-4 w-4" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={onScrollToEstimator}
              className="w-full sm:w-auto border-blue-400/30 bg-blue-950/40 hover:bg-blue-900/50 text-white font-medium px-6 py-6 rounded-xl backdrop-blur-md gap-2 text-base transition-all"
            >
              <Calculator className="h-4 w-4 text-cyan-400" />
              Calculate Life Cover
            </Button>

            <Button
              size="lg"
              variant="ghost"
              onClick={() => onWhatsApp('General Insurance')}
              className="w-full sm:w-auto text-emerald-300 hover:text-emerald-200 hover:bg-emerald-950/40 gap-2 text-sm font-medium"
            >
              <Phone className="h-4 w-4 text-emerald-400" />
              WhatsApp Advisor
            </Button>
          </motion.div>
        </div>

        {/* Dual Primary Pathways: Health vs Term */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Pathway 1: Health Insurance */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onClick={() => onSelectPathway('health')}
            className="group relative cursor-pointer rounded-2xl bg-gradient-to-b from-blue-900/40 to-slate-900/60 p-6 md:p-8 border border-blue-500/20 hover:border-blue-400/50 backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-5">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center border border-blue-400/30 group-hover:scale-105 transition-transform">
                <Heart className="h-6 w-6 text-cyan-300" />
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-200 border border-cyan-400/30">
                Medical Security
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
              Health Insurance
            </h2>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-6">
              Protect yourself and your loved ones from skyrocketing hospitalization bills.
              Coverage for surgeries, daycare treatments, pre & post-hospitalization, and annual health checks.
            </p>

            <ul className="space-y-2.5 mb-6 text-xs sm:text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                <span>Cashless treatment across thousands of network hospitals</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                <span>Zero room-rent capping options to avoid billing traps</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                <span>Individual and family floater structures decoded</span>
              </li>
            </ul>

            <div className="flex items-center text-cyan-400 text-sm font-semibold group-hover:translate-x-1 transition-transform">
              <span>Explore Health Coverage Guide</span>
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </div>
          </motion.div>

          {/* Pathway 2: Term Life Insurance */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onClick={() => onSelectPathway('term')}
            className="group relative cursor-pointer rounded-2xl bg-gradient-to-b from-indigo-900/40 to-slate-900/60 p-6 md:p-8 border border-indigo-500/20 hover:border-indigo-400/50 backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-5">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center border border-indigo-400/30 group-hover:scale-105 transition-transform">
                <Umbrella className="h-6 w-6 text-indigo-300" />
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-200 border border-indigo-400/30">
                Pure Life Protection
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
              Term Life Insurance
            </h2>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-6">
              Replace your income and secure your dependants’ future.
              High sum assured at affordable premiums to clear debts, fund children's higher education, and protect family goals.
            </p>

            <ul className="space-y-2.5 mb-6 text-xs sm:text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-indigo-400 shrink-0" />
                <span>Substantial cover (e.g. ₹1 Cr – ₹3 Cr) without investment lock-in</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-indigo-400 shrink-0" />
                <span>Claim settlement ratios & amount settlement ratios evaluated</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-indigo-400 shrink-0" />
                <span>Section 45 guidance for 100% honest, contestation-proof claims</span>
              </li>
            </ul>

            <div className="flex items-center text-indigo-300 text-sm font-semibold group-hover:translate-x-1 transition-transform">
              <span>Explore Term Insurance Guide</span>
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </div>
          </motion.div>
        </div>

        {/* Value Prop Badges Bar */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto text-center"
        >
          <div className="p-3">
            <p className="text-xl md:text-2xl font-bold text-cyan-400">Zero Spam</p>
            <p className="text-xs text-slate-400 mt-1">No unsolicited robocalls or aggressive agent quotas</p>
          </div>
          <div className="p-3">
            <p className="text-xl md:text-2xl font-bold text-blue-400">Needs-Based</p>
            <p className="text-xs text-slate-400 mt-1">Pure risk protection tailored to your life stage</p>
          </div>
          <div className="p-3">
            <p className="text-xl md:text-2xl font-bold text-indigo-400">Plain English</p>
            <p className="text-xs text-slate-400 mt-1">Exclusions, co-pays & waiting periods decoded</p>
          </div>
          <div className="p-3">
            <p className="text-xl md:text-2xl font-bold text-emerald-400">NISM Certified</p>
            <p className="text-xs text-slate-400 mt-1">Verified financial advisory specialists</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
