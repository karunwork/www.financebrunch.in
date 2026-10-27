import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calculator } from 'lucide-react';
import { EASING, DURATIONS } from '@/lib/animations';
import { AnimatedNumber } from '@/components/ui/AnimatedNumber';
import HeroFloatingGraph from './HeroFloatingGraph';

const Hero = () => {
  const shouldReduceMotion = useReducedMotion();

  const handleConsultantClick = () => {
    // Redirect to WhatsApp with predefined message
    window.open(
      'https://wa.me/917842494981?text=Hi%20Finance%20Brunch%20Team%2C%20I%27m%20looking%20for%20Investment%20Guidance.%20Can%20we%20connect%3F',
      '_blank'
    );
  };

  return (
    <div className="relative pt-8 lg:pt-0 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-transparent to-blue-50/20 dark:from-blue-950/20 dark:via-transparent dark:to-darkblue-950/30 z-0"></div>
      
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-grid-pattern opacity-5 dark:opacity-10"></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 md:w-64 md:h-64 bg-primary opacity-10 blur-3xl rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/4 w-32 h-32 md:w-64 md:h-64 bg-blue-400 dark:bg-blue-600 opacity-10 blur-3xl rounded-full"></div>
      </div>
      
      <div className="w-full max-w-7xl 2xl:max-w-[1536px] 3xl:max-w-[1680px] px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between py-6 sm:py-10 lg:py-16 xl:py-20 min-h-[calc(100vh-5rem)] gap-6 lg:gap-12 xl:gap-16">
          {/* Left content */}
          <div className="flex-1 max-w-2xl xl:max-w-3xl text-center lg:text-left lg:pr-6 xl:pr-10 mb-6 lg:mb-0">
            {/* Heading with subtle reveal */}
            <motion.h1 
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATIONS.normal, ease: EASING.decelerate }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
            >
              Secure Your Future <br />
              <span className="text-primary">Financial Growth</span><br />
              <span className="text-blue-600 dark:text-blue-400">Peace of Mind</span>
            </motion.h1>
            
            {/* Supporting text with staggered entrance */}
            <motion.p 
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATIONS.normal, delay: 0.12, ease: EASING.decelerate }}
              className="mt-5 md:mt-6 text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-xl mx-auto lg:mx-0"
            >
              Your trusted partner in financial planning with <span className="font-medium">7+ years</span> of experience. We provide personalized investment solutions to achieve your financial goals.
            </motion.p>
            
            {/* Action buttons with smooth entrance and subtle hover lift */}
            <motion.div 
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATIONS.normal, delay: 0.22, ease: EASING.decelerate }}
              className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4"
            >
              <Button 
                onClick={handleConsultantClick}
                size="lg" 
                category="primary"
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Schedule a Consultation
              </Button>
              <Link to="/calculator" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  category="calculator"
                  rightIcon={<Calculator className="h-4 w-4" />}
                  className="w-full sm:w-auto"
                >
                  Try Our Calculators
                </Button>
              </Link>
            </motion.div>
            
            {/* Key stats with sequenced appearance and responsive 3-column mobile layout */}
            <motion.div 
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATIONS.normal, delay: 0.32, ease: EASING.decelerate }}
              className="mt-8 sm:mt-10 grid grid-cols-3 gap-2 sm:gap-4 md:flex md:flex-wrap md:justify-center lg:justify-start md:gap-6 max-w-lg mx-auto lg:mx-0"
            >
              <div className="text-center group p-1.5 sm:p-2.5 rounded-xl border border-transparent hover:border-primary/20 hover:shadow-sm hover:bg-white/60 dark:hover:bg-darkblue-900/60 transition-all duration-200 cursor-default">
                <div className="text-2xl sm:text-3xl font-bold text-primary transition-transform duration-200 group-hover:scale-105">
                  <AnimatedNumber value={550} suffix="+" duration={1200} />
                </div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-tight mt-0.5">Happy Clients</div>
              </div>
              <div className="text-center group p-1.5 sm:p-2.5 rounded-xl border border-transparent hover:border-primary/20 hover:shadow-sm hover:bg-white/60 dark:hover:bg-darkblue-900/60 transition-all duration-200 cursor-default">
                <div className="text-2xl sm:text-3xl font-bold text-primary transition-transform duration-200 group-hover:scale-105">
                  <AnimatedNumber value={15} suffix="Cr+" duration={1000} />
                </div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-tight mt-0.5">Assets Under Management</div>
              </div>
              <div className="text-center group p-1.5 sm:p-2.5 rounded-xl border border-transparent hover:border-primary/20 hover:shadow-sm hover:bg-white/60 dark:hover:bg-darkblue-900/60 transition-all duration-200 cursor-default">
                <div className="text-2xl sm:text-3xl font-bold text-primary transition-transform duration-200 group-hover:scale-105">Global</div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-tight mt-0.5">Financial Presence</div>
              </div>
            </motion.div>
          </div>
          
          {/* Right content - Premium 3D Floating Financial Visualization */}
          <div className="flex-1 w-full max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-[660px] flex justify-center lg:justify-end">
            <HeroFloatingGraph />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
