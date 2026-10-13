
import React from 'react';

export function UnlistedSharesOverview() {
  return (
    <div className="max-w-4xl mx-auto mb-16" id="overview">
      <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        Understanding Unlisted Shares in the Indian Context
      </h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-purple-100 dark:border-purple-800/30 shadow-md">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-lg leading-relaxed">
            Unlisted shares represent ownership in companies that aren't listed on stock exchanges like NSE or BSE. 
            In India, these investments have gained significant traction as investors seek exposure to the country's 
            rapidly expanding startup and private company ecosystem.
          </p>
          
          <p className="text-lg leading-relaxed">
            Unlike the regulated public markets, unlisted shares operate in a more informal environment with unique 
            characteristics that are particularly relevant in the Indian financial landscape:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-100 dark:border-purple-800/30">
              <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-300 mb-2">
                Access to India's Innovation Economy
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Unlisted shares provide exposure to India's burgeoning tech startups, fintech disruptors, 
                and new-age businesses that are transforming the economic landscape.
              </p>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-100 dark:border-purple-800/30">
              <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-300 mb-2">
                Pre-IPO Opportunities
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                With India's growing IPO market, unlisted shares offer a chance to invest in companies before 
                they go public, potentially at more favorable valuations.
              </p>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-100 dark:border-purple-800/30">
              <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-300 mb-2">
                Unique Market Dynamics
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                The unlisted share market in India has its own network of brokers, platforms, and valuation 
                mechanisms that differ substantially from public markets.
              </p>
            </div>
          </div>
          
          <p className="text-lg leading-relaxed mt-4">
            While these investments can offer significant growth opportunities, they come with unique challenges including 
            valuation complexity, liquidity constraints, and information asymmetry. Investors should approach this market 
            with proper research and preferably with guidance from specialists familiar with the unlisted securities landscape.
          </p>
        </div>
      </div>
    </div>
  );
}
