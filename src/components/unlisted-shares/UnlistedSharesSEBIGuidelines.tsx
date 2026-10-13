
import React from 'react';
import { ExternalLink, ShieldAlert } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from '@/components/ui/button';

export function UnlistedSharesSEBIGuidelines() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-8 border border-purple-100 dark:border-purple-800/30 shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <ShieldAlert className="h-8 w-8 text-purple-600 dark:text-purple-400" />
        <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          SEBI Guidelines for Unlisted Securities
        </h3>
      </div>

      <div className="space-y-4 mb-4">
        <p className="text-gray-700 dark:text-gray-300">
          The Securities and Exchange Board of India (SEBI) provides regulatory oversight to protect 
          investors in the Indian securities market. While unlisted shares don't fall directly under 
          exchange regulations, several SEBI provisions still apply:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="bg-white dark:bg-gray-800/50 p-4 rounded-lg border border-purple-100 dark:border-purple-900/20">
            <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Transfer Regulations</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              SEBI mandates that unlisted shares must be transferred in dematerialized form if the company has obtained ISIN, 
              with transactions routed through depository participants.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800/50 p-4 rounded-lg border border-purple-100 dark:border-purple-900/20">
            <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Disclosure Requirements</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Companies with unlisted shares must maintain transparency with shareholders regarding financial performance, 
              material developments, and corporate actions.
            </p>
          </div>
        </div>
      </div>

      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="border-t border-purple-100 dark:border-purple-800/40 pt-4"
      >
        <div className="flex justify-between items-center">
          <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">
            View additional SEBI guidelines
          </p>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="p-0 h-9 w-9">
              <span className="sr-only">Toggle</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Button>
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800/50 p-4 rounded-lg border border-purple-100 dark:border-purple-900/20">
              <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Insider Trading Prohibitions</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                SEBI's Prohibition of Insider Trading Regulations apply to unlisted companies seeking to get listed, 
                restricting trading based on unpublished price-sensitive information.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800/50 p-4 rounded-lg border border-purple-100 dark:border-purple-900/20">
              <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Substantial Acquisition Reporting</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Acquirers must report to SEBI when their shareholding crosses specified thresholds in companies 
                planning to list, even if currently unlisted.
              </p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800/50 p-4 rounded-lg border border-purple-100 dark:border-purple-900/20">
            <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Pre-IPO Due Diligence</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Companies planning to go public must meet SEBI's disclosure and compliance standards for at least 
              three years before filing for an IPO, affecting governance practices even while unlisted.
            </p>
          </div>
          
          <div className="flex justify-center mt-4">
            <a 
              href="https://www.sebi.gov.in/regulations.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-600 dark:text-purple-400 text-sm font-medium inline-flex items-center hover:underline"
            >
              Visit SEBI website for complete guidelines
              <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
