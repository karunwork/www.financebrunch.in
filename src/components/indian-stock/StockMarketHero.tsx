
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Phone, LineChart, TrendingUp, Shield, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface StockMarketHeroProps {
  onContactAdvisor: () => void;
}

export function StockMarketHero({ onContactAdvisor }: StockMarketHeroProps) {
  const isMobile = useIsMobile();
  
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30 py-20 md:py-28">
      <div className="absolute inset-0 z-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
              Indian Stock Market Analysis
            </h1>
            
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-xl">
              Unleash the potential of India's dynamic equities market with expert analysis, real-time insights, and strategic guidance on BSE and NSE investments.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <Button 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-6 text-lg rounded-lg shadow-xl hover:shadow-blue-500/20 hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
                onClick={onContactAdvisor}
              >
                <Phone className="h-5 w-5" />
                Connect with Advisor
              </Button>
              
              <Link to="#market-overview">
                <Button variant="outline" className="border-blue-300 dark:border-blue-700 py-6 group transition-all duration-300 flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Market Overview
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/40">
                  <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Daily Trading</p>
                  <p className="font-semibold">₹25+ Trillion</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40">
                  <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">SEBI Regulated</p>
                  <p className="font-semibold">Since 1992</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/40">
                  <ExternalLink className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Listed Companies</p>
                  <p className="font-semibold">7,000+</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1600267204091-5c1ab8b10c02?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                alt="Bombay Stock Exchange Building" 
                className="w-full h-[350px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6">
                <p className="text-white text-2xl font-bold">Bombay Stock Exchange</p>
                <p className="text-gray-200">Asia's oldest stock exchange, established in 1875</p>
                <div className="mt-4 flex gap-2">
                  <span className="bg-blue-600/80 text-white text-sm px-3 py-1 rounded-full">SENSEX</span>
                  <span className="bg-green-600/80 text-white text-sm px-3 py-1 rounded-full">Market Cap: $3.2T</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
