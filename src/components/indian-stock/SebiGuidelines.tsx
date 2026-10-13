
import { CheckCircle, CircleDot, ShieldCheck, AlertTriangle, ExternalLink } from 'lucide-react';

export function SebiGuidelines() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            SEBI Guidelines & Regulatory Framework
          </span>
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Key SEBI Regulations</h3>
                
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <div className="bg-blue-100 dark:bg-blue-900/40 rounded-full p-1 mr-3 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium">SEBI Act, 1992</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Establishes SEBI as the regulatory authority for securities markets
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="bg-blue-100 dark:bg-blue-900/40 rounded-full p-1 mr-3 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium">Securities Contracts (Regulation) Act, 1956</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Regulates securities transactions and trading on stock exchanges
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="bg-blue-100 dark:bg-blue-900/40 rounded-full p-1 mr-3 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium">Companies Act, 2013</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Governs incorporation, operation, and management of companies
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="bg-blue-100 dark:bg-blue-900/40 rounded-full p-1 mr-3 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium">SEBI (LODR) Regulations, 2015</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Listing Obligations and Disclosure Requirements for public companies
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="bg-blue-100 dark:bg-blue-900/40 rounded-full p-1 mr-3 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium">SEBI (ICDR) Regulations, 2018</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Issue of Capital and Disclosure Requirements for public offerings
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Investor Protection Measures</h3>
                
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <div className="bg-green-100 dark:bg-green-900/40 rounded-full p-1 mr-3 mt-0.5">
                      <ShieldCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <p>Mandatory risk disclosure in offer documents</p>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="bg-green-100 dark:bg-green-900/40 rounded-full p-1 mr-3 mt-0.5">
                      <ShieldCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <p>Grievance redressal mechanisms for investors</p>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="bg-green-100 dark:bg-green-900/40 rounded-full p-1 mr-3 mt-0.5">
                      <ShieldCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <p>SCORES platform for complaint resolution</p>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="bg-green-100 dark:bg-green-900/40 rounded-full p-1 mr-3 mt-0.5">
                      <ShieldCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <p>Investor education initiatives by SEBI</p>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Trading Regulations</h3>
                
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <div className="bg-blue-100 dark:bg-blue-900/40 rounded-full p-1 mr-3 mt-0.5">
                      <CircleDot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium">Circuit Breakers</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Market-wide and stock-specific price limits to prevent excessive volatility
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="bg-blue-100 dark:bg-blue-900/40 rounded-full p-1 mr-3 mt-0.5">
                      <CircleDot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium">Block Deal Window</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Special trading window for large volume trades
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="bg-blue-100 dark:bg-blue-900/40 rounded-full p-1 mr-3 mt-0.5">
                      <CircleDot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium">T+2 Settlement Cycle</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Trade settlement completed within 2 working days
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="bg-blue-100 dark:bg-blue-900/40 rounded-full p-1 mr-3 mt-0.5">
                      <CircleDot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium">Margin Requirements</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Collateral needed for trading to manage risk
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Market Integrity Measures</h3>
                
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <div className="bg-red-100 dark:bg-red-900/40 rounded-full p-1 mr-3 mt-0.5">
                      <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <p className="font-medium">Insider Trading Prohibition</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Trading based on non-public information is illegal
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="bg-red-100 dark:bg-red-900/40 rounded-full p-1 mr-3 mt-0.5">
                      <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <p className="font-medium">Market Manipulation Surveillance</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Monitoring for artificial price influence and fraud
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="bg-red-100 dark:bg-red-900/40 rounded-full p-1 mr-3 mt-0.5">
                      <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <p className="font-medium">Quarterly Results Disclosure</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Mandatory financial reporting every three months
                      </p>
                    </div>
                  </li>
                </ul>
                
                <a 
                  href="https://www.sebi.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Visit SEBI Official Website
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
