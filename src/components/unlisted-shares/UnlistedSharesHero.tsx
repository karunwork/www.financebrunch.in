
import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, Phone, TrendingUp, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface UnlistedSharesHeroProps {
  handleContactAdvisor: () => void;
}

export function UnlistedSharesHero({ handleContactAdvisor }: UnlistedSharesHeroProps) {
  const isMobile = useIsMobile();
  
  return (
    <section className="bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 py-20 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-purple-200/20 dark:bg-purple-700/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-200/20 dark:bg-blue-700/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-purple-100 dark:bg-purple-900/30 px-4 py-1.5 rounded-full mb-6">
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1.5" />
              High-Potential Pre-IPO Opportunities
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
              Unlisted Shares Investment
            </span>
          </h1>
          
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
            Access high-growth potential companies before they go public, with expert guidance and comprehensive research
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-4">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 h-auto"
              onClick={handleContactAdvisor}
            >
              {isMobile ? (
                <>
                  Call Unlisted Shares Specialist
                  <Phone className="ml-2 h-5 w-5" />
                </>
              ) : (
                <>
                  Connect with Unlisted Shares Specialist
                  <ExternalLink className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 px-6 py-6 h-auto"
              onClick={() => document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto text-center">
            <div>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">200+</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Unlisted Companies</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">₹50Cr+</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Investments Facilitated</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">500+</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Satisfied Clients</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">15+</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Years Experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
