
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, ArrowRightLeft } from 'lucide-react';

export function BullBearMarket() {
  return (
    <section className="relative py-16 overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30">
      <div className="absolute inset-0 z-0 opacity-10">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
          <path d="M800 0H0V800H800V0Z" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray="10 12"></path>
        </svg>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Bull vs Bear Markets
          </motion.h2>
          <motion.p 
            className="text-gray-600 dark:text-gray-400 mt-3 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Understanding the fundamental market forces that drive stock prices
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <BullMarketCard />
          <BearMarketCard />
        </div>
        
        <div className="mt-12 bg-white/50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <ArrowRightLeft className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
            Market Cycles
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            Stock markets typically move in cycles between bull and bear phases. Understanding these cycles can help investors make more informed decisions about when to buy, hold, or sell investments. Market timing is difficult even for professional investors, which is why many experts recommend a disciplined, long-term investment approach.
          </p>
        </div>
      </div>
    </section>
  );
}

function BullMarketCard() {
  return (
    <motion.div 
      className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-100 dark:border-green-800/50 shadow-lg"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="flex items-start">
        <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
          <TrendingUp className="h-8 w-8 text-white" />
        </div>
        <div className="ml-5">
          <h3 className="text-2xl font-bold text-green-700 dark:text-green-400">Bull Market</h3>
          <p className="text-green-600 dark:text-green-300 text-sm">Rising prices & investor optimism</p>
        </div>
      </div>
      
      <div className="mt-6 space-y-4">
        <div className="flex items-center">
          <div className="w-1 h-8 bg-green-300 dark:bg-green-600 rounded-full mr-4"></div>
          <div>
            <h4 className="font-semibold">Extended Price Increases</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Markets rising 20%+ from recent lows</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="w-1 h-8 bg-green-300 dark:bg-green-600 rounded-full mr-4"></div>
          <div>
            <h4 className="font-semibold">High Trading Volumes</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Increased participation & liquidity</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="w-1 h-8 bg-green-300 dark:bg-green-600 rounded-full mr-4"></div>
          <div>
            <h4 className="font-semibold">Strong Economic Indicators</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">GDP growth, favorable policies</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 relative h-24">
        <svg className="w-full h-full" viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,80 C20,70 40,85 60,70 C80,55 100,65 120,50 C140,35 160,40 180,25 C200,10 220,15 240,5 C260,-5 280,10 300,0" fill="none" stroke="#22c55e" strokeWidth="3" />
        </svg>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-emerald-50 to-transparent dark:from-emerald-900/20 dark:to-transparent"></div>
      </div>
    </motion.div>
  );
}

function BearMarketCard() {
  return (
    <motion.div 
      className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 rounded-2xl p-6 border border-red-100 dark:border-red-800/50 shadow-lg"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="flex items-start">
        <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg">
          <TrendingDown className="h-8 w-8 text-white" />
        </div>
        <div className="ml-5">
          <h3 className="text-2xl font-bold text-red-700 dark:text-red-400">Bear Market</h3>
          <p className="text-red-600 dark:text-red-300 text-sm">Falling prices & market pessimism</p>
        </div>
      </div>
      
      <div className="mt-6 space-y-4">
        <div className="flex items-center">
          <div className="w-1 h-8 bg-red-300 dark:bg-red-600 rounded-full mr-4"></div>
          <div>
            <h4 className="font-semibold">Sustained Price Declines</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Markets falling 20%+ from recent highs</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="w-1 h-8 bg-red-300 dark:bg-red-600 rounded-full mr-4"></div>
          <div>
            <h4 className="font-semibold">Low Investor Confidence</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Negative sentiment & risk aversion</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="w-1 h-8 bg-red-300 dark:bg-red-600 rounded-full mr-4"></div>
          <div>
            <h4 className="font-semibold">Economic Challenges</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Recession, high inflation, policy tightening</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 relative h-24">
        <svg className="w-full h-full" viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 C20,10 40,5 60,20 C80,35 100,25 120,40 C140,55 160,50 180,65 C200,80 220,75 240,85 C260,95 280,80 300,90" fill="none" stroke="#ef4444" strokeWidth="3" />
        </svg>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-rose-50 to-transparent dark:from-rose-900/20 dark:to-transparent"></div>
      </div>
    </motion.div>
  );
}
