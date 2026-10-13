
import { AlertTriangle, Info, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export function RiskDisclosure() {
  return (
    <section className="py-12 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-3xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-amber-200 dark:border-amber-800/50 shadow-lg p-6 md:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-start gap-4">
            <div className="bg-amber-100 dark:bg-amber-900/50 p-3 rounded-full">
              <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-amber-800 dark:text-amber-400 mb-3">
                Important Risk Disclosure
              </h3>
              
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Investment in securities market is subject to market risks. Please read all the related documents carefully before investing.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium text-gray-800 dark:text-gray-200">Past Performance:</span> Past performance is not indicative of future returns. Investment decisions should not be based solely on historical data.
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium text-gray-800 dark:text-gray-200">Market Volatility:</span> Stock prices can be volatile and may fluctuate widely in response to various factors beyond our control.
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium text-gray-800 dark:text-gray-200">Regulatory Changes:</span> Changes in government policies and regulations may impact the performance of companies and market sentiment.
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium text-gray-800 dark:text-gray-200">Liquidity Risk:</span> Some securities may become difficult to sell at a favorable time or price due to lack of buyers in the market.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 border-t border-amber-200 dark:border-amber-800/50 pt-4 flex items-center">
                <Shield className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-2" />
                <p className="text-sm text-amber-700 dark:text-amber-300 font-medium">
                  Always consult with a qualified financial advisor before making investment decisions.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
