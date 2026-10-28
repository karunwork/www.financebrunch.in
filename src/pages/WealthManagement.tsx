import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  ShieldCheck, ArrowRight, CheckCircle2, TrendingUp, Sparkles, 
  Building, BarChart3, PieChart, Users, Phone, ChevronRight, 
  Lock, Award, FileText, ArrowUpRight, HelpCircle, Layers, 
  RefreshCw, Wallet, Crown, ChevronDown, Check, Scale, Globe, Landmark
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { cn } from '@/lib/utils';
import { EASING, DURATIONS } from '@/lib/animations';

// Asset Allocation Profiles for Interactive Visualizer
interface AllocationProfile {
  id: string;
  name: string;
  subtitle: string;
  targetAlpha: string;
  volatility: string;
  rebalanceFreq: string;
  description: string;
  allocation: {
    label: string;
    percentage: number;
    color: string;
    bgClass: string;
  }[];
}

const ALLOCATION_PROFILES: AllocationProfile[] = [
  {
    id: 'aggressive',
    name: 'Capital Expansion',
    subtitle: 'High Alpha for Wealth Builders',
    targetAlpha: '14% – 16% CAGR',
    volatility: 'Moderate-High',
    rebalanceFreq: 'Quarterly',
    description: 'Constructed for founders and ambitious professionals seeking aggressive long-term wealth compounding through high-conviction domestic equities, pre-IPO opportunities, and global tech equities.',
    allocation: [
      { label: 'Active & Research Equities', percentage: 55, color: '#2563eb', bgClass: 'bg-blue-600' },
      { label: 'Alternative Investment Funds (AIF/PMS)', percentage: 20, color: '#7c3aed', bgClass: 'bg-purple-600' },
      { label: 'Unlisted & Private Tech', percentage: 10, color: '#0891b2', bgClass: 'bg-cyan-600' },
      { label: 'Dynamic Fixed Income & Arbitrage', percentage: 10, color: '#059669', bgClass: 'bg-emerald-600' },
      { label: 'Sovereign Gold & Cash Buffer', percentage: 5, color: '#d97706', bgClass: 'bg-amber-600' },
    ]
  },
  {
    id: 'balanced',
    name: 'Multi-Asset Compounding',
    subtitle: 'Optimal Risk-Adjusted Growth',
    targetAlpha: '11% – 13% CAGR',
    volatility: 'Low-Moderate',
    rebalanceFreq: 'Bi-Annual',
    description: 'A harmonious blend of equity compounding and downside hedging. Designed to beat inflation sustainably while safeguarding capital during severe macroeconomic contractions.',
    allocation: [
      { label: 'Large & Midcap Equity Alpha', percentage: 45, color: '#2563eb', bgClass: 'bg-blue-600' },
      { label: 'AAA Corporate Bonds & G-Secs', percentage: 25, color: '#059669', bgClass: 'bg-emerald-600' },
      { label: 'Curated PMS / Thematic Funds', percentage: 15, color: '#7c3aed', bgClass: 'bg-purple-600' },
      { label: 'Global Equities (LRS / USD)', percentage: 10, color: '#0891b2', bgClass: 'bg-cyan-600' },
      { label: 'Sovereign Gold & Liquid Reserve', percentage: 5, color: '#d97706', bgClass: 'bg-amber-600' },
    ]
  },
  {
    id: 'preservation',
    name: 'Capital Preservation & Legacy',
    subtitle: 'Generational Purchasing Power',
    targetAlpha: '9% – 11% CAGR',
    volatility: 'Low',
    rebalanceFreq: 'Annual',
    description: 'Prioritizes extreme drawdown protection, steady tax-efficient yield generation, and seamless estate transfer. Tailored for family offices, retirees, and multi-generational trust accounts.',
    allocation: [
      { label: 'Sovereign & Target Maturity Debt', percentage: 45, color: '#059669', bgClass: 'bg-emerald-600' },
      { label: 'Dividend Aristocrats & Quality Equity', percentage: 30, color: '#2563eb', bgClass: 'bg-blue-600' },
      { label: 'Physical Gold / Sovereign Gold Bonds', percentage: 12, color: '#d97706', bgClass: 'bg-amber-600' },
      { label: 'Real Estate Investment Trusts (REITs)', percentage: 8, color: '#7c3aed', bgClass: 'bg-purple-600' },
      { label: 'Overnight & Emergency Liquidity', percentage: 5, color: '#0891b2', bgClass: 'bg-cyan-600' },
    ]
  }
];

export default function WealthManagement() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const [selectedProfile, setSelectedProfile] = useState<string>('balanced');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Wealth Management & Private Family Office Advisory — Finance Brunch";
  }, []);

  const handleWhatsAppConsult = (subject: string = 'Wealth Management') => {
    const message = encodeURIComponent(
      `Hi Finance Brunch Team, I'm interested in your bespoke ${subject} advisory services. I'd like to schedule a private consultation with a Senior Wealth Partner.`
    );
    window.open(`https://wa.me/917842494981?text=${message}`, '_blank');
  };

  const activeProfileData = ALLOCATION_PROFILES.find(p => p.id === selectedProfile) || ALLOCATION_PROFILES[1];

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 selection:bg-purple-500/20 selection:text-purple-300">
      <ScrollToTop />

      {/* ──────────────── 1. BESPOKE HERO SECTION ──────────────── */}
      <section className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28 bg-gradient-to-b from-slate-950 via-[#0B0F19] to-slate-950 border-b border-slate-800/60">
        {/* Luxury Background Glow Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[520px] bg-gradient-to-b from-purple-600/15 via-indigo-600/10 to-transparent blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute top-36 right-[-8%] w-96 h-96 bg-amber-500/10 blur-[130px] pointer-events-none rounded-full" />
        <div className="absolute top-48 left-[-10%] w-96 h-96 bg-blue-600/15 blur-[120px] pointer-events-none rounded-full" />

        <div className="container relative z-10 px-4 sm:px-6 lg:px-8 mx-auto">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-8">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/#services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-purple-300 font-medium">Wealth Management</span>
          </div>

          <div className="max-w-4xl mx-auto text-center">
            {/* Top Badge */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/15 via-indigo-500/15 to-amber-500/10 border border-purple-400/30 text-purple-200 text-xs sm:text-sm font-semibold mb-6 shadow-sm backdrop-blur-md"
            >
              <Crown className="h-4 w-4 text-amber-400" />
              <span>Bespoke Private Wealth & Family Office Advisory</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] mb-6 text-white"
            >
              Architecting Generational Wealth for{' '}
              <span className="bg-gradient-to-r from-purple-300 via-indigo-200 to-amber-200 bg-clip-text text-transparent">
                Discerning Families & Founders
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10"
            >
              Beyond cookie-cutter portfolios. Finance Brunch delivers institutional-grade multi-asset allocation, 
              proactive tax-loss harvesting, curated private market opportunities, and family estate governance—engineered 
              to compound and safeguard your legacy.
            </motion.p>

            {/* Hero CTAs */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
            >
              <Button
                size="lg"
                onClick={() => handleWhatsAppConsult('Family Wealth Strategy')}
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold px-8 py-6 rounded-xl shadow-lg shadow-purple-600/30 gap-2.5 text-base transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <Phone className="h-4 w-4" />
                Schedule Confidential Consultation
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  document.getElementById('wealth-tiers')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto border-purple-400/30 bg-purple-950/30 hover:bg-purple-900/40 text-purple-200 font-medium px-7 py-6 rounded-xl backdrop-blur-md gap-2 text-base transition-all"
              >
                <span>Explore Advisory Tiers</span>
                <ChevronDown className="h-4 w-4 text-purple-300" />
              </Button>
            </motion.div>

            {/* Executive KPI Stats Bar */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl max-w-4xl mx-auto shadow-xl"
            >
              <div className="border-r border-slate-800/60 pr-2">
                <div className="text-2xl sm:text-3xl font-extrabold text-white">₹15 Cr+</div>
                <div className="text-xs text-slate-400 mt-1 font-medium">Assets Under Advisory</div>
              </div>
              <div className="border-r border-slate-800/60 pr-2 md:border-r">
                <div className="text-2xl sm:text-3xl font-extrabold text-purple-400">99.4%</div>
                <div className="text-xs text-slate-400 mt-1 font-medium">Client Retention Rate</div>
              </div>
              <div className="border-r border-slate-800/60 pr-2">
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">100%</div>
                <div className="text-xs text-slate-400 mt-1 font-medium">Fiduciary & Conflict-Free</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400">1 : 25</div>
                <div className="text-xs text-slate-400 mt-1 font-medium">Advisor-to-Family Ratio</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──────────────── 2. WEALTH ADVISORY TIERS ──────────────── */}
      <section id="wealth-tiers" className="py-20 bg-slate-950 relative">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-500/15 text-purple-300 border border-purple-400/30 uppercase tracking-wider">
              Tailored Portfolios
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-4 mb-4">
              Tiered Wealth Solutions Built for Every Milestone
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Whether accelerating capital growth or orchestrating multi-generational trust transmission, 
              our advisory models scale with your family balance sheet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {/* Tier 1: Premier Wealth */}
            <div className="rounded-3xl bg-slate-900/60 border border-slate-800/80 p-8 flex flex-col justify-between hover:border-slate-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                    Emerging Affluent
                  </span>
                  <Wallet className="h-5 w-5 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Premier Wealth</h3>
                <div className="text-sm font-semibold text-blue-400 mb-4">₹50 Lakhs – ₹2 Crore Portfolio</div>
                <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                  Systematic multi-cap core creation, research-driven mutual fund curation, sovereign fixed income, and proactive tax harvesting.
                </p>

                <ul className="space-y-3 mb-8 text-xs text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>Core & satellite equity fund architecture</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>Quarterly drift monitoring & rebalancing</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>Direct tax harvesting to minimize LTCG friction</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>Bi-annual portfolio review with senior advisor</span>
                  </li>
                </ul>
              </div>

              <Button
                variant="outline"
                onClick={() => handleWhatsAppConsult('Premier Wealth (₹50L-₹2Cr)')}
                className="w-full border-blue-400/30 bg-blue-950/30 hover:bg-blue-900/50 text-white font-medium"
              >
                Inquire for Premier Wealth
              </Button>
            </div>

            {/* Tier 2: High Net Worth (HNI Advisory) - HIGHLIGHTED */}
            <div className="rounded-3xl bg-gradient-to-b from-purple-950/50 via-slate-900/90 to-slate-900 border-2 border-purple-500/50 p-8 flex flex-col justify-between relative shadow-2xl shadow-purple-900/20 hover:-translate-y-1.5 transition-all duration-300">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-purple-600 text-white text-xs font-bold uppercase tracking-wider shadow-md">
                  <Sparkles className="h-3 w-3" /> Most Recommended
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4 mt-2">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 border border-purple-400/30">
                    HNI Advisory
                  </span>
                  <Crown className="h-5 w-5 text-amber-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">Private Wealth Portfolio</h3>
                <div className="text-sm font-semibold text-purple-300 mb-4">₹2 Crore – ₹10 Crore Portfolio</div>
                <p className="text-xs text-slate-200 mb-6 leading-relaxed">
                  Institutional access to bespoke Portfolio Management Services (PMS), Category II/III AIFs, unlisted growth equities, and dedicated family manager.
                </p>

                <ul className="space-y-3 mb-8 text-xs text-slate-200">
                  <li className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>Curated SEBI-registered PMS & AIF strategies</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>Pre-IPO & unlisted high-conviction opportunities</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>Dedicated Certified Wealth Partner with direct cell</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>Monthly detailed performance & macro memos</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>Comprehensive family estate & Will framework</span>
                  </li>
                </ul>
              </div>

              <Button
                onClick={() => handleWhatsAppConsult('Private Wealth (₹2Cr-₹10Cr)')}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold py-5 shadow-lg shadow-purple-600/30"
              >
                Connect with Senior Partner
              </Button>
            </div>

            {/* Tier 3: Ultra HNI & Multi-Family Office */}
            <div className="rounded-3xl bg-slate-900/60 border border-slate-800/80 p-8 flex flex-col justify-between hover:border-slate-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
                    Family Office
                  </span>
                  <Landmark className="h-5 w-5 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Ultra HNI & Family Office</h3>
                <div className="text-sm font-semibold text-amber-400 mb-4">₹10 Crore+ Balance Sheet</div>
                <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                  Full-spectrum wealth office covering cross-border diversification, private family trusts, founder ESOP monetization, and philanthropic governance.
                </p>

                <ul className="space-y-3 mb-8 text-xs text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Private Family Trust creation & succession deed</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Global LRS & GIFT City dollar account allocations</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Founder equity hedging & secondary sale advisory</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Direct coordination with your legal & audit teams</span>
                  </li>
                </ul>
              </div>

              <Button
                variant="outline"
                onClick={() => handleWhatsAppConsult('Family Office (₹10Cr+)')}
                className="w-full border-amber-400/30 bg-amber-950/30 hover:bg-amber-900/50 text-white font-medium"
              >
                Inquire for Family Office
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── 3. INTERACTIVE ASSET ALLOCATION VISUALIZER ──────────────── */}
      <section className="py-20 bg-slate-900/40 border-y border-slate-800/80 relative">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-400/30 uppercase tracking-wider">
              Asset Allocation Science
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-4 mb-4">
              Visualizing Your Custom Strategic Asset Allocation
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              90% of long-term portfolio return variance is determined by asset allocation rather than stock picking. 
              Explore how we engineer risk-weighted capital resilience.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 md:p-10 shadow-2xl">
            {/* Strategy Profile Selector Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              {ALLOCATION_PROFILES.map((profile) => {
                const isActive = profile.id === selectedProfile;
                return (
                  <button
                    key={profile.id}
                    onClick={() => setSelectedProfile(profile.id)}
                    className={cn(
                      "p-4 rounded-2xl text-left border transition-all duration-200 cursor-pointer",
                      isActive
                        ? "bg-purple-950/60 border-purple-500 shadow-md shadow-purple-900/30 text-white"
                        : "bg-slate-950/50 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200"
                    )}
                  >
                    <div className="text-sm font-bold flex items-center justify-between">
                      <span>{profile.name}</span>
                      {isActive && <CheckCircle2 className="h-4 w-4 text-purple-400 shrink-0" />}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">{profile.subtitle}</div>
                  </button>
                );
              })}
            </div>

            {/* Selected Profile Key Metrics */}
            <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 mb-8 text-center">
              <div>
                <div className="text-xs text-slate-400 mb-1">Target Alpha Band</div>
                <div className="text-base sm:text-lg font-bold text-purple-300">{activeProfileData.targetAlpha}</div>
              </div>
              <div className="border-x border-slate-800">
                <div className="text-xs text-slate-400 mb-1">Drawdown Volatility</div>
                <div className="text-base sm:text-lg font-bold text-cyan-300">{activeProfileData.volatility}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Rebalancing Cadence</div>
                <div className="text-base sm:text-lg font-bold text-emerald-300">{activeProfileData.rebalanceFreq}</div>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-300 leading-relaxed mb-8 bg-slate-950/40 p-4 rounded-xl border border-slate-800/50">
              {activeProfileData.description}
            </p>

            {/* Visual Allocation Stacked Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-2">
                <span>Multi-Asset Distribution</span>
                <span>100% Fully Allocated</span>
              </div>
              <div className="h-4 w-full rounded-full overflow-hidden flex bg-slate-950 border border-slate-800">
                {activeProfileData.allocation.map((item, idx) => (
                  <div
                    key={idx}
                    style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                    className="h-full transition-all duration-500 relative group"
                    title={`${item.label}: ${item.percentage}%`}
                  />
                ))}
              </div>
            </div>

            {/* Detailed Asset Class Breakdown Legend */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {activeProfileData.allocation.map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950/50 border border-slate-800/60"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-xs sm:text-sm text-slate-200 font-medium">{item.label}</span>
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold text-white">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── 4. FOUR PILLARS OF WEALTH STEWARDSHIP ──────────────── */}
      <section className="py-20 bg-slate-950 relative">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-400/30 uppercase tracking-wider">
              Holistic Stewardship
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-4 mb-4">
              The 4 Cornerstones of Comprehensive Wealth Architecture
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              True wealth management extends far past returns. We insulate your family against fiscal drag, 
              litigation liabilities, macro downturns, and disorderly succession.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Pillar 1 */}
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-purple-500/30 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-400/30 mb-6 group-hover:scale-105 transition-transform">
                <PieChart className="h-6 w-6 text-purple-300" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">1. Multi-Asset Strategic Allocation</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                We eliminate single-asset vulnerability through dynamic core-satellite positioning across Indian equities, 
                high-yield fixed income, unlisted tech, and global dollar assets (via LRS or GIFT City accounts).
              </p>
              <ul className="text-xs text-slate-400 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-purple-400" />
                  <span>Uncorrelated alternative yield generation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-purple-400" />
                  <span>Dollar hedge against domestic rupee inflation</span>
                </li>
              </ul>
            </div>

            {/* Pillar 2 */}
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/30 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-400/30 mb-6 group-hover:scale-105 transition-transform">
                <Scale className="h-6 w-6 text-emerald-300" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">2. Proactive Tax-Engineered Alpha</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Taxes are often the single largest friction on compounding. We deploy year-round tax-loss harvesting, 
                HUF vehicle structuring, capital gains set-offs, and tax-efficient debt substitutes to retain maximum net alpha.
              </p>
              <ul className="text-xs text-slate-400 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Systematic annual ₹1.25L LTCG tax exemption harvesting</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span>HUF and family entity income distribution audits</span>
                </li>
              </ul>
            </div>

            {/* Pillar 3 */}
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-blue-500/30 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-300 flex items-center justify-center border border-blue-400/30 mb-6 group-hover:scale-105 transition-transform">
                <ShieldCheck className="h-6 w-6 text-blue-300" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">3. Capital Preservation & Downside Hedging</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Protecting hard-won capital takes precedence over chasing reckless yield. We maintain 12-24 months of sovereign 
                liquid buffers, ring-fenced from business liability, allowing equities to ride through cyclical drawdowns.
              </p>
              <ul className="text-xs text-slate-400 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-400" />
                  <span>Zero exposure to credit-risk debt instruments</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-400" />
                  <span>Drawdown dampening overlay during overvalued market peaks</span>
                </li>
              </ul>
            </div>

            {/* Pillar 4 */}
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/30 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-400/30 mb-6 group-hover:scale-105 transition-transform">
                <Building className="h-6 w-6 text-amber-300" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">4. Family Estate & Generational Succession</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Ensure your wealth transitions gracefully without probate court delays or family disputes. 
                We advise on Private Family Trusts, Will drafting coordination, and family constitution governance.
              </p>
              <ul className="text-xs text-slate-400 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-400" />
                  <span>Asset ring-fencing against future commercial litigation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-400" />
                  <span>Clear nomination, transmission, and succession roadmap</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── 5. THE 4-STEP CLIENT JOURNEY ──────────────── */}
      <section className="py-20 bg-slate-900/30 border-y border-slate-800/80 relative">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-500/15 text-purple-300 border border-purple-400/30 uppercase tracking-wider">
              Client Engagement
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-4 mb-4">
              The Finance Brunch Wealth Management Process
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              A transparent, high-touch advisory framework engineered around your unique family financial milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 relative">
              <div className="text-3xl font-black text-purple-500/40 mb-3">01</div>
              <h4 className="text-base font-bold text-white mb-2">Holistic Balance Sheet Audit</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Comprehensive mapping of all existing mutual funds, direct stocks, fixed deposits, real estate illiquidity, and liabilities.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 relative">
              <div className="text-3xl font-black text-indigo-500/40 mb-3">02</div>
              <h4 className="text-base font-bold text-white mb-2">Investment Policy Statement</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Drafting your family's custom IPS documenting mandatory return hurdles, liquidity drawdown rules, and risk tolerance.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 relative">
              <div className="text-3xl font-black text-cyan-500/40 mb-3">03</div>
              <h4 className="text-base font-bold text-white mb-2">Conflict-Free Deployment</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Phased, systematic capital deployment into institutional-grade funds, direct equity buckets, and curated alternative products.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 relative">
              <div className="text-3xl font-black text-amber-500/40 mb-3">04</div>
              <h4 className="text-base font-bold text-white mb-2">Quarterly Governance</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Regular executive review calls, rebalancing drift correction, tax harvesting executions, and consolidated reporting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── 6. WHY FINANCE BRUNCH VS TRADITIONAL WEALTH DESKS ──────────────── */}
      <section className="py-20 bg-slate-950 relative">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-400/30 uppercase tracking-wider">
              Fiduciary Advantage
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-4 mb-4">
              How We Compare to Bank Desks and Online Apps
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Why prominent families and entrepreneurs trust Finance Brunch over commission-incentivized bank sales teams.
            </p>
          </div>

          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full text-left border-collapse border border-slate-800 rounded-2xl overflow-hidden">
              <thead>
                <tr className="bg-slate-900 border-b border-slate-800 text-xs sm:text-sm text-slate-300">
                  <th className="p-4 sm:p-5 font-bold">Key Consideration</th>
                  <th className="p-4 sm:p-5 font-bold text-slate-400">Traditional Bank Wealth Desk</th>
                  <th className="p-4 sm:p-5 font-bold text-slate-400">DIY Fintech Apps</th>
                  <th className="p-4 sm:p-5 font-bold text-purple-300 bg-purple-950/40">Finance Brunch Advisory</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs sm:text-sm text-slate-300">
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-white">Product Objectivity</td>
                  <td className="p-4 sm:p-5 text-slate-400">High bias; pushes own group funds and commission products</td>
                  <td className="p-4 sm:p-5 text-slate-400">Zero human advice; user left to guess</td>
                  <td className="p-4 sm:p-5 font-bold text-purple-200 bg-purple-950/20">100% Unbiased open architecture; pure research-backed selection</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-white">Advisor Continuity</td>
                  <td className="p-4 sm:p-5 text-slate-400">Frequent RM turnover every 12–18 months</td>
                  <td className="p-4 sm:p-5 text-slate-400">Automated bot chatbots; no human relationship</td>
                  <td className="p-4 sm:p-5 font-bold text-purple-200 bg-purple-950/20">Dedicated Senior Wealth Partner with multi-year continuity</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-white">Tax-Harvesting Discipline</td>
                  <td className="p-4 sm:p-5 text-slate-400">Rarely executed; disconnected from taxation desk</td>
                  <td className="p-4 sm:p-5 text-slate-400">Not available or strictly manual</td>
                  <td className="p-4 sm:p-5 font-bold text-purple-200 bg-purple-950/20">Year-round automated LTCG & STCG harvesting roadmap</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-white">Estate & Succession Scope</td>
                  <td className="p-4 sm:p-5 text-slate-400">Ignored; banks only focus on investable liquidity</td>
                  <td className="p-4 sm:p-5 text-slate-400">Completely absent</td>
                  <td className="p-4 sm:p-5 font-bold text-purple-200 bg-purple-950/20">Integrated Private Family Trust and succession coordination</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-white">Advisor-to-Client Ratio</td>
                  <td className="p-4 sm:p-5 text-slate-400">1 : 300+ (High volume sales pressure)</td>
                  <td className="p-4 sm:p-5 text-slate-400">1 : Infinite (Self-directed)</td>
                  <td className="p-4 sm:p-5 font-bold text-purple-200 bg-purple-950/20">Strictly capped at 1 : 25 for bespoke personal attention</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ──────────────── 7. FAQ ACCORDION ──────────────── */}
      <section className="py-20 bg-slate-900/30 border-t border-slate-800/80 relative">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-500/15 text-purple-300 border border-purple-400/30 uppercase tracking-wider">
              Answers & Clarifications
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-4 mb-4">
              Frequently Asked Questions About Wealth Management
            </h2>
            <p className="text-slate-400 text-sm">
              Clear, transparent answers on portfolio safety, fee structure, and onboarding.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "What is the qualifying portfolio size for Wealth Management services?",
                a: "Our Premier Wealth advisory begins at ₹50 Lakhs of investable assets. Our dedicated High-Net-Worth (HNI) and Family Office advisory tiers typically serve families with portfolios ranging from ₹2 Crore to upwards of ₹50 Crore. For portfolios under ₹50 Lakhs, we provide research-driven Mutual Fund Advisory through our core platform."
              },
              {
                q: "Where is my money held? Is it safe with Finance Brunch?",
                a: "Your capital and securities are NEVER held by Finance Brunch. All investments reside directly in your own name within SEBI-regulated, government-monitored institutional depositories (CDSL, NSDL, and official Asset Management Companies). Finance Brunch acts strictly as your licensed advisory partner—we can never withdraw or redirect client capital."
              },
              {
                q: "Can you help evaluate and clean up my existing legacy portfolio?",
                a: "Yes. In Step 1 of our onboarding, we conduct a complete 360-degree forensic audit of your existing holdings (illiquid endowment plans, duplicate mutual funds, direct stocks, and real estate). We identify underperformers, eliminate high expense ratios, and transition the portfolio into an institutional structure with zero unnecessary tax friction."
              },
              {
                q: "How does Finance Brunch handle market volatility and major corrections?",
                a: "We do not believe in panic selling or futile day-to-day market timing. Instead, our portfolios maintain strict liquidity buffers (12–24 months of essential cash flow in sovereign debt instruments) so our clients are never forced to liquidate equities during downturns. We use major market dips as strategic rebalancing windows to accumulate high-quality assets at attractive valuations."
              },
              {
                q: "Can Non-Resident Indians (NRIs) subscribe to Wealth Management?",
                a: "Absolutely. We specialize in cross-border wealth management for NRIs across the UAE, USA, UK, Singapore, and Europe. We assist with NRE/NRO account configurations, 40 Act/PFIC-compliant mutual fund selection, FEMA adherence, and 15CA/CB repatriation certifications."
              }
            ].map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-white text-sm sm:text-base cursor-pointer hover:text-purple-300 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 shrink-0 text-purple-400 transition-transform duration-200",
                        isOpen ? "rotate-180" : ""
                      )}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──────────────── 8. FINAL BESPOKE CALL-TO-ACTION ──────────────── */}
      <section className="py-20 bg-gradient-to-b from-slate-950 via-[#100D22] to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-purple-600/10 via-transparent to-transparent pointer-events-none" />

        <div className="container relative z-10 px-4 sm:px-6 lg:px-8 mx-auto text-center max-w-4xl">
          <div className="w-16 h-16 rounded-3xl bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-400/40 mx-auto mb-6 shadow-lg shadow-purple-900/30">
            <Crown className="h-8 w-8 text-amber-300" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Ready to Architect Your Family's Private Wealth?
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Connect directly with a Senior Wealth Partner. We guarantee 100% discretion, zero sales pressure, 
            and a complete confidential review of your current asset allocation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => handleWhatsAppConsult('Bespoke Wealth Onboarding')}
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold px-9 py-6 rounded-xl shadow-xl shadow-purple-600/30 gap-2.5 text-base transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <Phone className="h-4 w-4" />
              Chat on WhatsApp Directly
            </Button>

            <Link to="/contact?service=Wealth+Management" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-purple-400/30 bg-purple-950/40 hover:bg-purple-900/50 text-purple-200 font-medium px-8 py-6 rounded-xl backdrop-blur-md gap-2 text-base transition-all"
              >
                <span>Request Advisory Callback</span>
                <ArrowRight className="h-4 w-4 text-purple-300" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>AMFI Registered Mutual Fund Distributor</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-cyan-400" />
              <span>Strict Fiduciary Confidentiality</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-amber-400" />
              <span>NISM Certified Wealth Specialists</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
