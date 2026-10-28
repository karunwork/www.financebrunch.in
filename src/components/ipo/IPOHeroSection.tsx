
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BarChart, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export const IPOHeroSection = () => {
  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="relative bg-gradient-to-r from-indigo-50/50 via-transparent to-blue-50/40 dark:from-indigo-950/20 dark:via-transparent dark:to-blue-950/20 py-20 overflow-hidden">
      <div 
        ref={headerRef} 
        className={cn(
          "container mx-auto px-4 relative z-10 transition-all duration-1000",
          headerInView ? "opacity-100 transform-none" : "opacity-0 translate-y-8"
        )}
      >
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center bg-white/80 dark:bg-gray-800/80 rounded-full py-1 px-3 mb-6 shadow-sm">
            <BarChart size={16} className="text-indigo-500 mr-2" />
            <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">IPO Insights</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-700 to-blue-700 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent">
            Initial Public Offering Analysis
          </h1>
          
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            Expert insights and analysis on upcoming and recent IPOs to help you make informed investment decisions.
          </p>
          
          <Link to="/investment-planning">
            <Button 
              variant="outline"
              className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-950/50"
            >
              <span className="flex items-center">
                Back to Investment Planning
                <ChevronRight className="h-4 w-4 ml-1" />
              </span>
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Abstract background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-20 dark:opacity-10">
        <div className="absolute top-[20%] right-[10%] w-64 h-64 rounded-full bg-indigo-400/30 filter blur-3xl"></div>
        <div className="absolute bottom-[30%] right-[20%] w-40 h-40 rounded-full bg-blue-400/30 filter blur-2xl"></div>
      </div>
      
      <div className="absolute top-0 left-0 w-1/3 h-full opacity-20 dark:opacity-10">
        <div className="absolute top-[50%] left-[15%] w-56 h-56 rounded-full bg-blue-400/30 filter blur-3xl"></div>
        <div className="absolute bottom-[20%] left-[25%] w-48 h-48 rounded-full bg-indigo-400/30 filter blur-2xl"></div>
      </div>
    </section>
  );
};
