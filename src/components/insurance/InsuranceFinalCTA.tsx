import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ShieldCheck, Phone, Mail, ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface InsuranceFinalCTAProps {
  onWhatsApp: (service: 'General Insurance' | 'Health Insurance' | 'Term Insurance') => void;
}

export const InsuranceFinalCTA: React.FC<InsuranceFinalCTAProps> = ({ onWhatsApp }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white relative overflow-hidden">
      {/* Ambient background glow accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-80 bg-blue-600/15 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-0 right-10 w-64 h-64 bg-cyan-500/10 blur-[90px] pointer-events-none rounded-full" />

      <div className="container relative z-10 px-4 md:px-6 mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-cyan-300 text-xs font-semibold backdrop-blur-md mb-6">
              <ShieldCheck className="h-4 w-4 text-cyan-400" />
              <span>Take Control of Your Family's Protection Today</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
              Don't Wait for an Emergency to Discover{' '}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                What Your Policy Doesn't Cover
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
              Whether you need to review an existing policy for hidden traps, structure a new health floater for your family,
              or estimate your term insurance cover, our certified advisors are here to help.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Link to="/contact?service=Insurance+Planning" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  category="insurance"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                  className="w-full sm:w-auto font-bold px-8 py-6 rounded-xl shadow-xl text-base"
                >
                  Schedule Free Insurance Consultation
                </Button>
              </Link>

              <Button
                size="lg"
                category="success"
                rightIcon={<Phone className="h-4 w-4" />}
                onClick={() => onWhatsApp('General Insurance')}
                className="w-full sm:w-auto font-bold px-7 py-6 rounded-xl text-base"
              >
                Chat on WhatsApp Now
              </Button>
            </div>

            {/* Quick trust assurances */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-300 pt-6 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                <span>Zero unsolicited spam calls</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                <span>Unbiased, needs-based guidance</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-cyan-400" />
                <span>Advisor response within 24 business hours</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
