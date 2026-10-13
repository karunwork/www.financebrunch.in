
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Phone, ChevronDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface IndianStockHeroProps {
  onContactAdvisor: () => void;
}

export function IndianStockHero({ onContactAdvisor }: IndianStockHeroProps) {
  return (
    <section className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="md:w-1/2">
            <div className="animate-fade-in-up">
              <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                Indian Stock Market Analysis
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-lg">
                Unlock the potential of the Indian equities market with our comprehensive analysis, insights, and expert guidance on BSE and NSE listed securities.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-6 text-lg rounded-lg shadow-xl transition-all duration-300 hover:shadow-blue-500/20 hover:shadow-2xl"
                  onClick={onContactAdvisor}
                >
                  Connect with Advisor
                  <Phone className="ml-2 h-5 w-5" />
                </Button>
                <Link to="#stock-market-history">
                  <Button variant="outline" className="border-blue-300 dark:border-blue-700 py-6 group transition-all duration-300">
                    Learn About Indian Markets
                    <ChevronDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative rounded-xl overflow-hidden shadow-2xl animate-fade-in-up">
              <img 
                src="/lovable-uploads/b7af595c-860c-4bed-8735-64391a005af9.png" 
                alt="Bombay Stock Exchange Building" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <p className="text-white text-xl font-medium">Bombay Stock Exchange</p>
                <p className="text-gray-200 text-sm">Asia's oldest stock exchange, established in 1875</p>
                <div className="mt-3 flex items-center">
                  <Link to="#stock-market-history" className="text-blue-300 hover:text-white flex items-center transition-colors">
                    Explore History <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
