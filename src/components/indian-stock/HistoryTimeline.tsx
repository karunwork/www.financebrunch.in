
import React, { useEffect } from 'react';
import { Building, Clock, BarChart, Shield, TrendingUp } from 'lucide-react';

export function HistoryTimeline() {
  // Add animation effect for timeline items
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.timeline-item').forEach(item => {
      observer.observe(item);
    });
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <section className="py-16 bg-white dark:bg-gray-900" id="stock-market-history">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            The Evolution of Indian Stock Markets
          </span>
        </h2>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500"></div>
          
          <div className="space-y-20">
            {/* Timeline Item 1 */}
            <div className="flex flex-col md:flex-row items-center timeline-item animate-fade-in-up">
              <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0 md:text-right">
                <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-3">1875</h3>
                <h4 className="text-lg font-semibold mb-2">Birth of BSE</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  The Bombay Stock Exchange (BSE) was established under a banyan tree in Mumbai's Dalal Street, making it Asia's oldest stock exchange and one of the world's earliest exchanges.
                </p>
              </div>
              
              <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 border-4 border-blue-500 shadow-lg">
                <Building className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              
              <div className="md:w-1/2 md:pl-12 md:text-left">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-md">
                  <img 
                    src="/lovable-uploads/bf6dd0ac-44d2-4676-a31c-07952b0c5108.png" 
                    alt="Historical Mumbai" 
                    className="w-full h-auto rounded-md mb-3"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    The BSE began with just a handful of brokers trading under a banyan tree opposite the Town Hall in what is now Mumbai's Horniman Circle.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Timeline Item 2 */}
            <div className="flex flex-col md:flex-row items-center timeline-item animate-fade-in-up">
              <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0 md:text-right">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-md">
                  <img 
                    src="/lovable-uploads/afd7b556-34ae-453c-aae9-770e16ab4414.png" 
                    alt="Early Trading Floor" 
                    className="w-full h-auto rounded-md mb-3"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Early trading floors were characterized by open outcry systems and physical share certificates.
                  </p>
                </div>
              </div>
              
              <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 border-4 border-blue-500 shadow-lg">
                <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              
              <div className="md:w-1/2 md:pl-12">
                <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-3">1956</h3>
                <h4 className="text-lg font-semibold mb-2">Securities Contract Regulation Act</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  The government passed the Securities Contract Regulation Act (SCRA), which became the foundational legislation for regulating securities trading and exchanges in India.
                </p>
              </div>
            </div>
            
            {/* Timeline Item 3 */}
            <div className="flex flex-col md:flex-row items-center timeline-item animate-fade-in-up">
              <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0 md:text-right">
                <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-3">1992</h3>
                <h4 className="text-lg font-semibold mb-2">Birth of SEBI</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  The Securities and Exchange Board of India (SEBI) was established as the regulatory authority for the securities market, bringing standardized practices and investor protections.
                </p>
              </div>
              
              <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 border-4 border-blue-500 shadow-lg">
                <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              
              <div className="md:w-1/2 md:pl-12 md:text-left">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-md">
                  <img 
                    src="/lovable-uploads/75e0d2e9-6d50-49f9-abe9-5236913686da.png" 
                    alt="SEBI Headquarters" 
                    className="w-full h-auto rounded-md mb-3"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    SEBI's establishment marked a significant step in formalizing market regulations and protecting investor interests.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Timeline Item 4 */}
            <div className="flex flex-col md:flex-row items-center timeline-item animate-fade-in-up">
              <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0 md:text-right">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-md">
                  <img 
                    src="/lovable-uploads/3a5fcbd0-7610-456b-b056-3607bd6b15e2.png" 
                    alt="NSE Building" 
                    className="w-full h-auto rounded-md mb-3"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    The NSE introduced electronic trading, eliminating the need for traders to be physically present on the trading floor.
                  </p>
                </div>
              </div>
              
              <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 border-4 border-blue-500 shadow-lg">
                <BarChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              
              <div className="md:w-1/2 md:pl-12">
                <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-3">1994</h3>
                <h4 className="text-lg font-semibold mb-2">National Stock Exchange (NSE)</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  The National Stock Exchange was established as India's first electronic exchange, bringing technological innovation and transparency to the market.
                </p>
              </div>
            </div>
            
            {/* Timeline Item 5 */}
            <div className="flex flex-col md:flex-row items-center timeline-item animate-fade-in-up">
              <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0 md:text-right">
                <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-3">1996</h3>
                <h4 className="text-lg font-semibold mb-2">Dematerialization Era</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  The National Securities Depository Limited (NSDL) was established, beginning the era of dematerialization that transformed physical share certificates into electronic form.
                </p>
              </div>
              
              <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 border-4 border-blue-500 shadow-lg">
                <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              
              <div className="md:w-1/2 md:pl-12 md:text-left">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-md">
                  <img 
                    src="/lovable-uploads/b80d81b8-1bd9-42ad-9457-5b8f46a67af0.png" 
                    alt="Modern Trading" 
                    className="w-full h-auto rounded-md mb-3"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Dematerialization reduced fraud, streamlined transactions, and increased market efficiency dramatically.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Timeline Item 6 */}
            <div className="flex flex-col md:flex-row items-center timeline-item animate-fade-in-up">
              <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0 md:text-right">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-md">
                  <img 
                    src="/lovable-uploads/4d13bcab-a123-47b9-bf2e-cd9cc4554217.png" 
                    alt="Modern Trading Floor" 
                    className="w-full h-auto rounded-md mb-3"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Today's Indian stock market is a sophisticated ecosystem with advanced trading platforms, algorithmic trading, and international investment flows.
                  </p>
                </div>
              </div>
              
              <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 border-4 border-blue-500 shadow-lg">
                <GlobeIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              
              <div className="md:w-1/2 md:pl-12">
                <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-3">Present Day</h3>
                <h4 className="text-lg font-semibold mb-2">Global Integration</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  Today, Indian stock markets are fully integrated with global financial systems, with increased foreign participation, sophisticated derivative products, and cutting-edge trading technologies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GlobeIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
  );
}
