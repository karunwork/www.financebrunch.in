import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, Phone, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export const FooterCTA: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Detect touch-only devices to disable pointer-glow tracking
    if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
      setIsTouchDevice(true);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      toast.error('Please enter your email address.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    toast.info('Our automated newsletter system is currently being configured. For immediate market updates, please contact us directly at admin@financebrunch.in.');
    setEmail('');
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden rounded-3xl border border-blue-200/60 dark:border-cyan-500/25 bg-gradient-to-br from-white via-blue-50/40 to-slate-50 dark:from-[#0B1528] dark:via-[#0E1B33] dark:to-[#070D1B] p-8 sm:p-12 mb-16 shadow-xl shadow-blue-500/5 dark:shadow-cyan-950/40"
    >
      {/* Pointer-Responsive Radial Glow (Desktop Only, non-interfering) */}
      {!isTouchDevice && !shouldReduceMotion && (
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6, 182, 212, 0.15), transparent 70%)`,
          }}
        />
      )}

      {/* Decorative subtle background elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-cyan-400/10 via-blue-500/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-blue-600/10 via-indigo-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Copy & Primary CTA */}
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 dark:bg-cyan-500/15 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300">
            <Sparkles size={12} className="text-cyan-500 animate-pulse" />
            <span className="text-[11px] font-mono tracking-widest font-semibold uppercase">
              YOUR NEXT STEP STARTS HERE.
            </span>
          </div>

          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Let's make your next move count.
          </h3>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal">
            Have a question? Let's talk.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm sm:text-base text-white bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-md shadow-blue-500/20 hover:shadow-cyan-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
            >
              <span>Start a conversation</span>
              <ArrowUpRight 
                size={18} 
                className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-200" 
              />
            </Link>

            <a
              href="tel:+917842494981"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 bg-white/70 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 hover:border-cyan-500/60 hover:text-cyan-600 dark:hover:text-cyan-300 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <Phone size={15} className="text-cyan-500" />
              <span>+91 7842-494-981</span>
            </a>
          </div>
        </div>

        {/* Right Column: Direct Connect & Newsletter Subscription */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-5 lg:border-l lg:border-slate-200/60 dark:lg:border-slate-800/80 lg:pl-8">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Stay in the loop
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Receive curated insights, tax blueprints, and disciplined financial ideas directly.
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-2 pt-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Your email address"
                className="h-10 text-sm bg-white/90 dark:bg-slate-900/80 border-slate-200 dark:border-slate-700 focus-visible:ring-cyan-500 rounded-lg"
              />
              <Button
                type="submit"
                size="default"
                className="h-10 px-4 bg-slate-900 hover:bg-slate-800 text-white dark:bg-cyan-500 dark:hover:bg-cyan-600 dark:text-slate-950 font-medium transition-all duration-200 rounded-lg flex-shrink-0"
              >
                Subscribe
              </Button>
            </form>
          </div>

          <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <Mail size={13} className="text-cyan-500" />
              <a 
                href="mailto:admin@financebrunch.in"
                className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors"
              >
                admin@financebrunch.in
              </a>
            </span>
            <span className="font-mono text-[11px] text-slate-400 dark:text-slate-500">
              Response within 24h
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
