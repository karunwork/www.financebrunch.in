
import { ArrowRight, Check, TrendingUp, ShieldCheck, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn, HoverCardEffect, DURATIONS } from '@/components/ui/animation';
import AnimatedNumber from '../ui/AnimatedNumber';

export default function About() {
  const achievements = [
    { value: 7, suffix: '+', label: 'Years Experience' },
    { value: 550, suffix: '+', label: 'Happy Clients' },
    { value: 15, suffix: 'Cr+', label: 'Assets Managed' },
    { value: 95, suffix: '%', label: 'Client Retention' },
  ];

  return (
    <section id="about" className="py-24 overflow-hidden scroll-mt-24">
      <div className="w-full max-w-7xl 2xl:max-w-[1536px] 3xl:max-w-[1680px] px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Executive image with viewport reveal and restrained hover zoom */}
          <FadeIn direction="right" duration={DURATIONS.slow} className="relative">
            {/* Image card with rounded corners, subtle viewport reveal, and restrained hover zoom */}
            <div className="group relative z-10 rounded-2xl overflow-hidden shadow-2xl bg-gray-900">
              <div className="overflow-hidden">
                <img 
                  src="/images/about-executive.jpg" 
                  alt="Finance Brunch Executive Leadership and Financial Advisory" 
                  className="w-full h-[460px] sm:h-[500px] lg:h-[540px] object-cover object-top sm:object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Gradient layer guaranteeing deep contrast behind the overlay on all screen sizes */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none"></div>

              {/* Dark information overlay near bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-20">
                <div className="rounded-xl p-4 sm:p-5 bg-gray-950/85 dark:bg-black/85 backdrop-blur-md border border-white/10 shadow-lg text-white">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                    <span className="text-xs uppercase tracking-wider font-semibold text-blue-400">Founder & CEO</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">SAIKARUN ARASADA</h3>
                  <p className="text-xs sm:text-sm text-gray-200 mt-1 leading-relaxed">
                    Visionary leader with over seven years of financial expertise
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-lg bg-primary/10 -z-10 animate-float"></div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-primary/5 -z-10 animate-float delay-200"></div>
          </FadeIn>

          {/* Right Column: About content, key pillars, achievements, and CTA */}
          <FadeIn direction="left" delay={0.15} className="space-y-8">
            <div>
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                About Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Building Financial Success Stories
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Finance Brunch was founded by Saikarun Arasada with a vision to make financial services accessible, transparent, and tailored to individual needs. Our journey began with a simple belief: everyone deserves expert financial guidance.
              </p>
            </div>

            <div className="space-y-4">
              {[
                "Global presence with operations in multiple countries",
                "Customized solutions for individuals and businesses",
                "Certified Financial Planners & ARN holders",
                "Commitment to financial education and client empowerment"
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                    <Check size={14} className="text-primary" />
                  </div>
                  <span className="ml-3 text-gray-600 dark:text-gray-400">{item}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-2">
              {achievements.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
                    <AnimatedNumber
                      value={item.value}
                      suffix={item.suffix}
                      duration={1400}
                    />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: <TrendingUp size={24} />, title: "Growth Focused" },
                { icon: <ShieldCheck size={24} />, title: "Client Security" },
                { icon: <Users size={24} />, title: "Expert Team" },
              ].map((item, index) => (
                <HoverCardEffect key={index} liftDistance={3} className="h-full">
                  <div className="group flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg h-full border border-gray-100/50 dark:border-gray-800/50 hover:border-primary/30 hover:shadow-md transition-all duration-300 cursor-default">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 text-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-primary/20">
                      {item.icon}
                    </div>
                    <h3 className="font-medium text-center group-hover:text-primary transition-colors duration-200">{item.title}</h3>
                  </div>
                </HoverCardEffect>
              ))}
            </div>

            <div>
              <Button 
                size="lg" 
                onClick={() => {
                  const el = document.getElementById('services');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="button-hover group hover:-translate-y-0.5 active:translate-y-0 hover:shadow-lg transition-all duration-200"
              >
                Learn Our Story
                <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

