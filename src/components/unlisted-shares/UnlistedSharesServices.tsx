
import React from 'react';
import { Button } from '@/components/ui/button';
import { Users, LineChart, Phone, ExternalLink, Shield, FileText, TrendingUp } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface UnlistedSharesServicesProps {
  handleContactAdvisor: () => void;
}

export function UnlistedSharesServices({ handleContactAdvisor }: UnlistedSharesServicesProps) {
  const isMobile = useIsMobile();
  
  return (
    <div className="bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-purple-900/10 rounded-xl p-8 border border-purple-100 dark:border-purple-800/30 shadow-lg">
      <h3 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
        How Finance Brunch Assists in Unlisted Share Investments
      </h3>
      
      <div className="space-y-6">
        <p className="text-lg text-center max-w-3xl mx-auto text-gray-700 dark:text-gray-300">
          At Finance Brunch, we understand the complex nature of unlisted share investments in the Indian market. 
          Our approach is centered on thorough research, due diligence, and client education:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white dark:bg-gray-800/50 rounded-lg p-6 shadow-sm border border-purple-100 dark:border-purple-900/20 transition-all hover:shadow-md hover:-translate-y-1">
            <div className="flex flex-col items-center text-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center">
                <Users className="h-7 w-7 text-purple-600 dark:text-purple-400" />
              </div>
              <h4 className="font-semibold text-lg">Expert Network</h4>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Access to our network of industry specialists who provide insights into unlisted companies' business models, 
              growth trajectories, and market positioning.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800/50 rounded-lg p-6 shadow-sm border border-purple-100 dark:border-purple-900/20 transition-all hover:shadow-md hover:-translate-y-1">
            <div className="flex flex-col items-center text-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center">
                <LineChart className="h-7 w-7 text-purple-600 dark:text-purple-400" />
              </div>
              <h4 className="font-semibold text-lg">Due Diligence</h4>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Comprehensive analysis of financial statements, business models, management quality, and 
              growth prospects of potential investment opportunities.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800/50 rounded-lg p-6 shadow-sm border border-purple-100 dark:border-purple-900/20 transition-all hover:shadow-md hover:-translate-y-1">
            <div className="flex flex-col items-center text-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center">
                <Shield className="h-7 w-7 text-purple-600 dark:text-purple-400" />
              </div>
              <h4 className="font-semibold text-lg">Risk Assessment</h4>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Detailed evaluation of company-specific and market risks, providing you with a clear 
              understanding of potential downside scenarios.
            </p>
          </div>
        </div>
        
        <div className="text-center mt-12 bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border border-purple-100 dark:border-purple-900/30">
          <p className="mb-4 italic text-lg text-gray-700 dark:text-gray-300">
            "Our mission is to provide well-researched unlisted share opportunities while ensuring our clients 
            fully understand the associated risks and potential rewards."
          </p>
          
          <p className="mb-6 font-medium text-purple-700 dark:text-purple-300">
            Finance Brunch offers special pricing compared to market rates, thanks to our direct 
            empanelment with unlisted share providers.
          </p>
          
          <Button 
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            onClick={handleContactAdvisor}
          >
            {isMobile ? (
              <>
                Call Our Unlisted Shares Specialist
                <Phone className="ml-2 h-5 w-5" />
              </>
            ) : (
              <>
                Connect with Unlisted Shares Specialist
                <ExternalLink className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
