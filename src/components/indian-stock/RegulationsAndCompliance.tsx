
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, CircleDot, ExternalLink, BookOpen, FileCheck } from 'lucide-react';

export function RegulationsAndCompliance() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-4 py-1.5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium mb-4">
            Regulatory Framework
          </span>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            Regulations & Compliance
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            Understanding the regulatory environment that governs Indian securities markets
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Key Regulations */}
          <motion.div 
            className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="flex items-center mb-6">
              <div className="bg-indigo-100 dark:bg-indigo-900/40 p-3 rounded-full mr-4">
                <BookOpen className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400">Key Market Regulations</h3>
            </div>
            
            <div className="space-y-5">
              <RegulationItem
                title="SEBI Act, 1992"
                description="Establishes SEBI as the regulatory authority for securities markets"
                color="indigo"
              />
              
              <RegulationItem
                title="Securities Contracts Regulation Act, 1956"
                description="Regulates securities transactions and trading on stock exchanges"
                color="indigo"
              />
              
              <RegulationItem
                title="Companies Act, 2013"
                description="Governs incorporation, operation, and management of companies"
                color="indigo"
              />
              
              <RegulationItem
                title="SEBI (LODR) Regulations, 2015"
                description="Listing Obligations and Disclosure Requirements for public companies"
                color="indigo"
              />
              
              <RegulationItem
                title="SEBI (ICDR) Regulations, 2018"
                description="Issue of Capital and Disclosure Requirements for public offerings"
                color="indigo"
              />
              
              <RegulationItem
                title="SEBI (PIT) Regulations, 2015"
                description="Prevention of Insider Trading regulations"
                color="indigo"
              />
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <a 
                href="https://www.sebi.gov.in/legal/regulations/apr-2017/securities-and-exchange-board-of-india-listing-obligations-and-disclosure-requirements-regulations-2015-last-amended-on-march-6-2017-_34624.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                View All SEBI Regulations
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </div>
          </motion.div>
          
          {/* Trading Regulations */}
          <motion.div 
            className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 dark:bg-blue-900/40 p-3 rounded-full mr-4">
                <FileCheck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400">Trading Regulations</h3>
            </div>
            
            <div className="space-y-4">
              <TradingRegulationItem
                title="Circuit Breakers"
                description="Market-wide and stock-specific price limits to prevent excessive volatility"
              />
              
              <TradingRegulationItem
                title="Block Deal Window"
                description="Special trading window for large volume trades"
              />
              
              <TradingRegulationItem
                title="T+2 Settlement Cycle"
                description="Trade settlement completed within 2 working days"
              />
              
              <TradingRegulationItem
                title="Margin Requirements"
                description="Collateral needed for trading to manage risk"
              />
              
              <TradingRegulationItem
                title="Short Selling Restrictions"
                description="Rules governing the practice of short selling securities"
              />
              
              <TradingRegulationItem
                title="Surveillance Mechanisms"
                description="Systems to monitor irregular trading patterns and market manipulation"
              />
            </div>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Investor Protection */}
          <motion.div 
            className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl p-6 border border-green-100 dark:border-green-900/50 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="flex items-center mb-6">
              <div className="bg-green-100 dark:bg-green-900/40 p-3 rounded-full mr-4">
                <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-green-700 dark:text-green-400">Investor Protection Measures</h3>
            </div>
            
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="bg-green-100 dark:bg-green-900/40 rounded-full p-1 mr-3 mt-0.5">
                  <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">Investor Education and Protection Fund (IEPF)</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Promotes investor awareness and protects investor interests
                  </p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="bg-green-100 dark:bg-green-900/40 rounded-full p-1 mr-3 mt-0.5">
                  <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">SEBI SCORES Platform</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Online complaint redressal system for investors
                  </p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="bg-green-100 dark:bg-green-900/40 rounded-full p-1 mr-3 mt-0.5">
                  <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">Mandatory Risk Disclosure</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Required risk factors in offer documents and company filings
                  </p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="bg-green-100 dark:bg-green-900/40 rounded-full p-1 mr-3 mt-0.5">
                  <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">Investor Grievance Cell</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Dedicated department at SEBI and exchanges for investor complaints
                  </p>
                </div>
              </li>
            </ul>
            
            <div className="mt-6 pt-4 border-t border-green-200 dark:border-green-800/50">
              <a 
                href="https://www.sebi.gov.in/sebiweb/home/HomeAction.do?doListing=yes&sid=2&ssid=6&smid=0" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-green-600 dark:text-green-400 hover:underline"
              >
                SEBI Investor Protection Resources
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </div>
          </motion.div>
          
          {/* Market Integrity */}
          <motion.div 
            className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30 rounded-xl p-6 border border-red-100 dark:border-red-900/50 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="flex items-center mb-6">
              <div className="bg-red-100 dark:bg-red-900/40 p-3 rounded-full mr-4">
                <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-red-700 dark:text-red-400">Market Integrity Measures</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-red-100 dark:bg-red-900/40 rounded-full p-1 mr-3 mt-0.5">
                  <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">Insider Trading Prohibition</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Trading based on non-public information is illegal with severe penalties
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-red-100 dark:bg-red-900/40 rounded-full p-1 mr-3 mt-0.5">
                  <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">Market Manipulation Surveillance</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Advanced systems to detect price manipulation, pump-and-dump schemes
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-red-100 dark:bg-red-900/40 rounded-full p-1 mr-3 mt-0.5">
                  <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">Quarterly Results Disclosure</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Mandatory financial reporting every three months for transparency
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-red-100 dark:bg-red-900/40 rounded-full p-1 mr-3 mt-0.5">
                  <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">Corporate Governance Requirements</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Board composition rules, audit committee mandates, independent directors
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-red-200 dark:border-red-800/50">
              <div className="flex items-center text-red-600 dark:text-red-400">
                <AlertTriangle className="h-4 w-4 mr-1" />
                <p className="text-sm font-medium">
                  Violations can result in significant penalties, market bans, and criminal prosecution
                </p>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-10 max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <a 
            href="https://www.sebi.gov.in" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-between"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-lg flex items-center justify-center mr-4">
                <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Securities and Exchange Board of India</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Visit official website for complete regulatory information</p>
              </div>
            </div>
            <ExternalLink className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function RegulationItem({ title, description, color }) {
  return (
    <div className="flex items-center">
      <div className={`bg-${color}-100 dark:bg-${color}-900/40 rounded-full p-1 mr-3`}>
        <CheckCircle className={`h-4 w-4 text-${color}-600 dark:text-${color}-400`} />
      </div>
      <div>
        <p className="font-medium text-gray-800 dark:text-gray-200">{title}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </div>
  );
}

function CheckCircle(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}

function TradingRegulationItem({ title, description }) {
  return (
    <div className="flex items-start">
      <div className="bg-blue-100 dark:bg-blue-900/40 rounded-full p-1 mr-3 mt-0.5">
        <CircleDot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
      </div>
      <div>
        <p className="font-medium text-gray-800 dark:text-gray-200">{title}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </div>
  );
}
