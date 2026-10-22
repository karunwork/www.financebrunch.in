import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ShieldCheck,
  MessageSquareOff,
  Sparkles,
  BookOpenCheck,
  Eye,
  HeartHandshake,
  TrendingUp,
  FileCheck2,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const InsuranceWhyTrust: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const trustPillars = [
    {
      title: 'Zero Spam & Pressure-Free Conversations',
      icon: MessageSquareOff,
      description:
        'We never sell your contact details or bombard you with automated sales robocalls. You reach out when you are ready, on your own terms, via WhatsApp or our secure portal.',
    },
    {
      title: 'Strictly Needs-Based Planning',
      icon: BookOpenCheck,
      description:
        'We never push expensive endowment or high-commission investment schemes disguised as insurance. We focus solely on pure risk coverage (Term Life & Comprehensive Health) to protect your net worth.',
    },
    {
      title: 'Unvarnished Transparency on Limitations',
      icon: Eye,
      description:
        'Every policy has boundaries. We explain waiting periods, pre-existing disease rules, room-rent traps, and non-payable items with the exact same rigor as the policy benefits.',
    },
    {
      title: 'Plain-English Explanations',
      icon: Sparkles,
      description:
        'Insurance jargon like "proportional deduction", "moratorium periods", and "restoration triggers" are translated into simple, everyday concepts so you are never left guessing.',
    },
    {
      title: 'Long-Term Financial Integration',
      icon: TrendingUp,
      description:
        'Insurance does not exist in a silo. We align your health and term protection with your overall wealth management, mutual fund investments, and retirement goals.',
    },
    {
      title: 'Certified Advisory Standards',
      icon: ShieldCheck,
      description:
        'Our advisory team consists of NISM-certified financial professionals committed to ethical, transparent client service rather than product-pushing sales quotas.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-slate-950">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <Badge variant="outline" className="mb-3 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-cyan-400 border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/60">
            Our Philosophy
          </Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Why Plan Your Insurance with Finance Brunch?
          </h2>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            The Indian insurance landscape is flooded with pushy agents selling low-yield policies.
            Finance Brunch was built on an uncompromising ethos of transparency, financial literacy, and client-first ethics.
          </p>
        </div>

        {/* 6 Trust Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {trustPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="p-6 md:p-7 rounded-3xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/40 dark:hover:border-cyan-400/40 transition-all duration-300 hover:shadow-lg group"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-100/80 dark:bg-blue-950 text-blue-600 dark:text-cyan-400 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2.5 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Credibility Callout */}
        <div className="mt-14 max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-gradient-to-r from-blue-900/10 via-cyan-900/10 to-indigo-900/10 border border-blue-200 dark:border-blue-900/50 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <HeartHandshake className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-base md:text-lg text-slate-900 dark:text-white">
                Independent, Unbiased Financial Insights
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Learn more about our advisory standards, client reviews, and regulatory principles across Finance Brunch.
              </p>
            </div>
          </div>

          <Link to="/about" className="shrink-0">
            <Button variant="outline" className="border-blue-300 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950 text-xs sm:text-sm font-semibold gap-1.5">
              <span>About Finance Brunch</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
