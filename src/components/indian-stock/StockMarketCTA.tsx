
import { motion } from 'framer-motion';
import { Phone, ChevronRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface StockMarketCTAProps {
  onContactAdvisor: () => void;
}

export function StockMarketCTA({ onContactAdvisor }: StockMarketCTAProps) {
  const isMobile = useIsMobile();

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
          alt="Stock market background" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-90"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <motion.div 
              className="md:col-span-8 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Invest in the Indian Stock Market?
              </h2>
              <p className="text-xl opacity-90 mb-8">
                Our team of expert advisors is ready to guide you with personalized investment strategies tailored to your financial goals.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-white mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Personalized Portfolio</p>
                    <p className="text-sm text-blue-100">Customized investment strategies</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-white mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Market Insights</p>
                    <p className="text-sm text-blue-100">Regular research updates</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-white mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Risk Management</p>
                    <p className="text-sm text-blue-100">Protection strategies for capital</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-white mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Ongoing Support</p>
                    <p className="text-sm text-blue-100">Regular portfolio reviews</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="md:col-span-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Connect With Us</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Speak with our investment experts for personalized guidance on Indian equity markets.
                </p>
                
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-6 text-base rounded-lg shadow-lg flex items-center justify-center gap-2"
                  onClick={onContactAdvisor}
                >
                  <Phone className="h-5 w-5" />
                  {isMobile ? "Call an Advisor" : "Schedule a Consultation"}
                  <ChevronRight className="h-5 w-5" />
                </Button>
                
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                  Our advisors are available Monday-Friday, 9AM-6PM IST
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
