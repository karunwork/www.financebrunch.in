
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SIPCalculator from './SIPCalculator';
import StepUpSIPCalculator from './StepUpSIPCalculator';
import LumpsumCalculator from './LumpsumCalculator';
import SWPCalculator from './SWPCalculator';
import AdvisorPopup from './AdvisorPopup';
import { subscribeToCalculationEvents } from './calculationEvents';
import { Info } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';

const MutualFundCalculator = () => {
  const [activeTab, setActiveTab] = useState('sip');
  const [calculationCount, setCalculationCount] = useState(0);
  const [showAdvisorPopup, setShowAdvisorPopup] = useState(false);
  const { toast } = useToast();
  
  // Load calculation count from localStorage on component mount
  useEffect(() => {
    const storedCount = localStorage.getItem('calculationCount');
    if (storedCount) {
      setCalculationCount(parseInt(storedCount, 10));
    }
  }, []);

  // Subscribe to calculation events
  useEffect(() => {
    const unsubscribe = subscribeToCalculationEvents(() => {
      const newCount = calculationCount + 1;
      setCalculationCount(newCount);
      localStorage.setItem('calculationCount', newCount.toString());
      
      // Show popup after 4 calculations
      if (newCount === 4) {
        setShowAdvisorPopup(true);
        toast({
          title: "Need help with your investments?",
          description: "Our advisors can help optimize your portfolio.",
        });
      }
    });
    
    return unsubscribe;
  }, [calculationCount, toast]);

  return (
    <>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="p-1 sm:p-2">
          <Tabs defaultValue="sip" onValueChange={setActiveTab} value={activeTab}>
            <div className="px-4 pt-4">
              <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 gap-2">
                <TabsTrigger value="sip" className="text-sm md:text-base">SIP Calculator</TabsTrigger>
                <TabsTrigger value="stepup" className="text-sm md:text-base">Step-Up SIP</TabsTrigger>
                <TabsTrigger value="lumpsum" className="text-sm md:text-base">Lumpsum</TabsTrigger>
                <TabsTrigger value="swp" className="text-sm md:text-base">SWP</TabsTrigger>
              </TabsList>
            </div>
            
            <div className="mt-6 pb-4">
              <TabsContent value="sip" className="mt-0">
                <div className="px-4">
                  <div className="flex items-center mb-4">
                    <h2 className="text-xl font-semibold">Systematic Investment Plan (SIP)</h2>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="ml-2 text-gray-500 cursor-help">
                            <Info size={16} />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-sm">
                          <p>SIP allows you to invest a fixed amount regularly in mutual funds, typically monthly.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <SIPCalculator />
                </div>
              </TabsContent>
              
              <TabsContent value="stepup" className="mt-0">
                <div className="px-4">
                  <div className="flex items-center mb-4">
                    <h2 className="text-xl font-semibold">Step-Up SIP Calculator</h2>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="ml-2 text-gray-500 cursor-help">
                            <Info size={16} />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-sm">
                          <p>Step-Up SIP allows you to increase your SIP amount periodically, helping your investments grow faster.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <StepUpSIPCalculator />
                </div>
              </TabsContent>
              
              <TabsContent value="lumpsum" className="mt-0">
                <div className="px-4">
                  <div className="flex items-center mb-4">
                    <h2 className="text-xl font-semibold">Lumpsum Calculator</h2>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="ml-2 text-gray-500 cursor-help">
                            <Info size={16} />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-sm">
                          <p>Lumpsum investment involves investing a large amount at once in mutual funds.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <LumpsumCalculator />
                </div>
              </TabsContent>
              
              <TabsContent value="swp" className="mt-0">
                <div className="px-4">
                  <div className="flex items-center mb-4">
                    <h2 className="text-xl font-semibold">Systematic Withdrawal Plan (SWP)</h2>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="ml-2 text-gray-500 cursor-help">
                            <Info size={16} />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-sm">
                          <p>SWP allows you to withdraw a fixed amount from your mutual fund investments at regular intervals.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <SWPCalculator />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
          <div className="animate-marquee whitespace-nowrap">
            <span className="mx-4">We are Not SEBI Registered</span>
            <span className="mx-4">|</span>
            <span className="mx-4">We are NISM Certified</span>
            <span className="mx-4">|</span>
            <span className="mx-4">We are CFP Certified</span>
            <span className="mx-4">|</span>
            <span className="mx-4">We are ARN Holders</span>
            <span className="mx-4">|</span>
            <span className="mx-4">Certified Financial Planners</span>
          </div>
        </div>
      </div>
      
      <AdvisorPopup 
        open={showAdvisorPopup} 
        onOpenChange={setShowAdvisorPopup}
      />
    </>
  );
};

export default MutualFundCalculator;
