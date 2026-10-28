import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Users, FileSearch, ShieldCheck, ArrowRight, CheckCircle2, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface InsuranceProcessProps {
  onWhatsApp: (service: 'Health Insurance' | 'Term Insurance') => void;
}

export const InsuranceProcess: React.FC<InsuranceProcessProps> = ({ onWhatsApp }) => {
  const shouldReduceMotion = useReducedMotion();

  const steps = [
    {
      stepNumber: '01',
      title: 'Understand Your Needs',
      badge: 'Discovery & Life Stage Audit',
      icon: Users,
      color: 'blue',
      description:
        'We begin by analyzing your household responsibilities, outstanding debts, lifestyle factors, dependent milestones, and existing employer group cover to pinpoint your true protection shortfall.',
      points: [
        'Family dependency & income replacement audit',
        'Evaluation of existing corporate/group insurance limits',
        'Identifying specific medical history & pre-existing risks',
        'Customized sum assured recommendations',
      ],
    },
    {
      stepNumber: '02',
      title: 'Compare and Choose',
      badge: 'Fine-Print Unpacking',
      icon: FileSearch,
      color: 'cyan',
      description:
        'We compare eligible policies side-by-side. Rather than looking only at premium cost, we scrutinize room-rent rules, restoration triggers, waiting periods, sub-limits, and hospital network density.',
      points: [
        'Transparent comparison of benefits vs hidden restrictions',
        'Vetting claim settlement & amount settlement track records',
        'Recommending optimal rider combinations (Critical Illness, Waiver)',
        'Zero commission bias or pushy sales calls',
      ],
    },
    {
      stepNumber: '03',
      title: 'Application & Ongoing Support',
      badge: 'Flawless Filing & Lifetime Guidance',
      icon: ShieldCheck,
      color: 'indigo',
      description:
        'We guide you through 100% accurate disclosures on your proposal form to protect against Section 45 disputes. We also support you through tele-underwriting, medical tests, policy verification, annual renewals, and claim documentation.',
      points: [
        'Guidance on proposal form declarations to avoid claim rejection',
        'Assistance with medical scheduling and counter-offer audits',
        'Verification of policy document, terms, and nominee entries',
        'Claims preparation checklist when hospitalizations occur',
      ],
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900/60 border-y border-slate-200/80 dark:border-slate-800">
      <div className="container px-4 md:px-6 mx-auto">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <Badge variant="outline" className="mb-3 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-cyan-400 border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/60">
            The Customer Journey
          </Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            The Finance Brunch Insurance Experience
          </h2>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Navigating insurance shouldn’t feel like an interrogation. Our structured three-stage process ensures
            you obtain genuine peace of mind with total transparency at every step.
          </p>
        </div>

        {/* 3-Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.stepNumber}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative flex flex-col justify-between bg-white dark:bg-slate-900 p-7 md:p-8 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                {/* Step Top Bar */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl font-black text-slate-200 dark:text-slate-800 group-hover:text-blue-500/20 dark:group-hover:text-cyan-400/20 transition-colors">
                      {step.stepNumber}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-cyan-400 flex items-center justify-center border border-blue-100 dark:border-blue-900 group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>

                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 inline-block mb-3">
                    {step.badge}
                  </span>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {step.description}
                  </p>

                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-6 border-t border-slate-100 dark:border-slate-800 pt-4">
                    {step.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                      style={{ width: `${(index + 1) * 33.3}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Process Footer CTA */}
        <div className="mt-12 text-center">
          <Button
            size="lg"
            onClick={() => onWhatsApp('Health Insurance')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-6 rounded-xl shadow-lg shadow-blue-500/20 gap-2 text-base"
          >
            Start Your Free Needs Assessment
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};
