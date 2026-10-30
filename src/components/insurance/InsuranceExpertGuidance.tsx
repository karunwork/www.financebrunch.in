import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  FileCheck2,
  FileQuestion,
  SearchX,
  ShieldCheck,
  Stethoscope,
  RotateCcw,
  Phone,
  Mail,
  CalendarCheck,
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface InsuranceExpertGuidanceProps {
  onWhatsApp: (service: 'Health Insurance' | 'Term Insurance') => void;
}

export const InsuranceExpertGuidance: React.FC<InsuranceExpertGuidanceProps> = ({ onWhatsApp }) => {
  const shouldReduceMotion = useReducedMotion();

  const guidanceAreas = [
    {
      title: 'Deciphering Complex Policy Terms',
      icon: FileQuestion,
      color: 'blue',
      description:
        'Insurance brochures highlight rosy benefits while burying caveats in 50-page policy wordings. We translate terms like copayments, sublimits, restoration rules, and moratorium periods into plain English.',
    },
    {
      title: 'Comparing Real Coverage & Exclusions',
      icon: SearchX,
      color: 'cyan',
      description:
        'A ₹10 Lakh policy with no room-rent cap can pay out significantly more than a ₹25 Lakh policy with a 1% daily room limit. We evaluate real-world claim utility rather than headline sum assured.',
    },
    {
      title: 'Reviewing Existing & Corporate Insurance',
      icon: ShieldCheck,
      color: 'indigo',
      description:
        'Relying solely on your employer health cover is a major risk. If you switch jobs or retire, you lose cover at the exact age when new individual policies become expensive or unavailable due to pre-existing conditions.',
    },
    {
      title: 'Identifying Critical Coverage Gaps',
      icon: AlertCircle,
      color: 'amber',
      description:
        'Many families believe they are protected with a ₹5L policy, unaware that modern cancer or cardiac treatments routinely exceed ₹15-20 Lakhs. We spot underinsurance before a crisis hits.',
    },
    {
      title: 'Ensuring Airtight Application Disclosures',
      icon: Stethoscope,
      color: 'emerald',
      description:
        'Non-disclosure is the number one cause of claim disputes. We help you disclose medical histories, smoking habits, surgeries, and family genetics accurately on proposal forms so claims are legally contestation-proof.',
    },
    {
      title: 'Preparing for Renewals & Claims',
      icon: RotateCcw,
      color: 'purple',
      description:
        'From keeping your policy schedule up-to-date and verifying nominee details to knowing what hospital documents (discharge summary, break-up bill, prescription) are needed, we ensure you are claim-ready.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-slate-950">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Column: Explanation of Value */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <Badge variant="outline" className="px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-cyan-400 border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/60">
                Personalized Advisory
              </Badge>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Why Unbiased Guidance Makes All the Difference
              </h2>
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                Buying insurance directly from a comparison portal often feels convenient until an unexpected medical emergency reveals a hidden room-rent clause or pre-existing disease exclusion.
                Human advisory ensures your policy actually delivers when you need it most.
              </p>
            </div>

            {/* 6 Grid items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {guidanceAreas.map((area, idx) => {
                const Icon = area.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800"
                  >
                    <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-cyan-400 flex items-center justify-center mb-2.5">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1.5">
                      {area.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {area.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Advisor Connect Card */}
          <div className="lg:col-span-5">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-7 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white border border-blue-500/30 shadow-2xl relative overflow-hidden"
            >
              {/* Decorative background glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold mb-4 border border-cyan-400/30">
                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                Finance Brunch Advisory Desk
              </div>

              <h3 className="text-2xl font-bold mb-3">
                Connect with an Insurance Specialist
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Have questions about your current policy, need an audit of your family's coverage, or want unbiased recommendations? Reach out directly.
              </p>

              <div className="space-y-3.5 mb-7 text-xs sm:text-sm text-slate-200">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <Phone className="h-4 w-4 text-cyan-400 shrink-0" />
                  <div>
                    <p className="text-[11px] text-slate-400">Direct Call & WhatsApp</p>
                    <p className="font-semibold text-white">+91 78424 94981</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <Mail className="h-4 w-4 text-blue-400 shrink-0" />
                  <div>
                    <p className="text-[11px] text-slate-400">Email Advisory</p>
                    <a href="mailto:admin@financebrunch.in" className="font-semibold text-white hover:text-cyan-300 transition-colors">
                      admin@financebrunch.in
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <CalendarCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                  <div>
                    <p className="text-[11px] text-slate-400">Hours of Support</p>
                    <p className="font-semibold text-white">Mon – Sat, 9:00 AM – 7:00 PM IST</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Link to="/contact?service=Health+Insurance" className="block w-full">
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold rounded-xl gap-2 shadow-lg shadow-blue-600/30 text-sm"
                  >
                    <span>Schedule Consultation via Web Form</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>

                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => onWhatsApp('Health Insurance')}
                  className="w-full border-emerald-400/30 bg-emerald-950/30 hover:bg-emerald-900/40 text-emerald-300 font-semibold rounded-xl gap-2 text-sm"
                >
                  <Phone className="h-4 w-4 text-emerald-400" />
                  Chat on WhatsApp Now
                </Button>
              </div>

              <p className="mt-4 text-[11px] text-slate-400 text-center">
                100% confidential. No spam, unsolicited telemarketing, or aggressive quotas.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
