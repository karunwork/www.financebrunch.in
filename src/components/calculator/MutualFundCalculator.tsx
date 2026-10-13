import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SIPCalculator from './SIPCalculator';
import StepUpSIPCalculator from './StepUpSIPCalculator';
import LumpsumCalculator from './LumpsumCalculator';
import SWPCalculator from './SWPCalculator';
import AdvisorPopup from './AdvisorPopup';
import { subscribeToCalculationEvents } from './calculationEvents';
import { Info, Repeat, ArrowUpRight, Coins, ArrowDownRight } from 'lucide-react';
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
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-slate-200/80 dark:border-slate-800 overflow-hidden">
        <div className="p-2 sm:p-4">
          <Tabs defaultValue="sip" onValueChange={setActiveTab} value={activeTab}>
            <div className="px-2 pt-2 sm:pt-4">
              <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 gap-2 h-auto p-1.5 bg-slate-100/80 dark:bg-slate-800/80 rounded-xl">
                <TabsTrigger 
                  value="sip" 
                  className="py-2.5 text-xs sm:text-sm md:text-base font-medium flex items-center justify-center gap-2 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm transition-all"
                >
                  <Repeat size={16} className="text-blue-600 dark:text-cyan-400 flex-shrink-0" />
                  <span>SIP Calculator</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="stepup" 
                  className="py-2.5 text-xs sm:text-sm md:text-base font-medium flex items-center justify-center gap-2 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm transition-all"
                >
                  <ArrowUpRight size={16} className="text-blue-600 dark:text-cyan-400 flex-shrink-0" />
                  <span>Step-Up SIP</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="lumpsum" 
                  className="py-2.5 text-xs sm:text-sm md:text-base font-medium flex items-center justify-center gap-2 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm transition-all"
                >
                  <Coins size={16} className="text-blue-600 dark:text-cyan-400 flex-shrink-0" />
                  <span>Lumpsum</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="swp" 
                  className="py-2.5 text-xs sm:text-sm md:text-base font-medium flex items-center justify-center gap-2 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:shadow-sm transition-all"
                >
                  <ArrowDownRight size={16} className="text-blue-600 dark:text-cyan-400 flex-shrink-0" />
                  <span>SWP</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <div className="mt-6 pb-4">
              <TabsContent value="sip" className="mt-0">
                <div className="px-2 sm:px-4">
                  <div className="flex items-center mb-6">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Systematic Investment Plan (SIP)</h2>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="ml-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-help">
                            <Info size={16} />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-sm">
                          <p>SIP allows you to invest a fixed amount regularly in mutual funds, typically monthly, benefiting from rupee cost averaging.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <SIPCalculator />
                </div>
              </TabsContent>
              
              <TabsContent value="stepup" className="mt-0">
                <div className="px-2 sm:px-4">
                  <div className="flex items-center mb-6">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Step-Up SIP Calculator</h2>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="ml-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-help">
                            <Info size={16} />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-sm">
                          <p>Step-Up SIP allows you to increase your SIP installment annually as your income grows, accelerating wealth creation.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <StepUpSIPCalculator />
                </div>
              </TabsContent>
              
              <TabsContent value="lumpsum" className="mt-0">
                <div className="px-2 sm:px-4">
                  <div className="flex items-center mb-6">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Lumpsum Calculator</h2>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="ml-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-help">
                            <Info size={16} />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-sm">
                          <p>Lumpsum investment calculates the long-term compounding growth of a one-time capital deposit.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <LumpsumCalculator />
                </div>
              </TabsContent>
              
              <TabsContent value="swp" className="mt-0">
                <div className="px-2 sm:px-4">
                  <div className="flex items-center mb-6">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Systematic Withdrawal Plan (SWP)</h2>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="ml-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-help">
                            <Info size={16} />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-sm">
                          <p>SWP calculates monthly cash-flow withdrawals from an investment corpus while the remaining balance continues compounding.</p>
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
        
        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 text-center text-sm text-slate-500 dark:text-slate-400 border-t border-slate-200/80 dark:border-slate-800">
          <div className="overflow-hidden whitespace-nowrap text-xs sm:text-sm">
            <span className="mx-3">We are NISM Certified</span>
            <span className="mx-2 text-slate-300 dark:text-slate-600">|</span>
            <span className="mx-3">ARN Registration Holder</span>
            <span className="mx-2 text-slate-300 dark:text-slate-600">|</span>
            <span className="mx-3">IRDAI Licensed Advisory</span>
            <span className="mx-2 text-slate-300 dark:text-slate-600">|</span>
            <span className="mx-3">FPA Certified Financial Planning</span>
          </div>
        </div>
      </div>
      
      <AdvisorPopup 
        isOpen={showAdvisorPopup} 
        onClose={() => setShowAdvisorPopup(false)} 
      />
    </>
  );
};

export default MutualFundCalculator;
