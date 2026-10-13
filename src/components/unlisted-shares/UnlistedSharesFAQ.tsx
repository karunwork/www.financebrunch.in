
import React from 'react';

export function UnlistedSharesFAQ() {
  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 border border-blue-100 dark:border-blue-800 shadow-md mb-12">
      <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold text-lg mb-2">How are unlisted shares taxed in India?</h4>
          <p className="text-gray-700 dark:text-gray-300">
            Unlisted shares held for more than 24 months are treated as long-term capital assets. Long-term capital gains are taxed at 20% with indexation benefits. If held for less than 24 months, gains are added to your income and taxed as per your income tax slab.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold text-lg mb-2">How do I transfer or sell unlisted shares?</h4>
          <p className="text-gray-700 dark:text-gray-300">
            Unlisted shares are transferred via off-market transactions using delivery instruction slips. The seller and buyer must have demat accounts. Sale transactions are facilitated through specialized brokers or platforms dealing in unlisted securities.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold text-lg mb-2">What is the minimum investment required for unlisted shares?</h4>
          <p className="text-gray-700 dark:text-gray-300">
            The minimum investment typically ranges from ₹1 lakh to ₹5 lakhs, depending on the company and broker. This higher threshold exists due to the illiquid nature of these investments and to ensure only qualified investors participate.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold text-lg mb-2">Can NRIs invest in unlisted shares in India?</h4>
          <p className="text-gray-700 dark:text-gray-300">
            Yes, NRIs can invest in unlisted shares through their NRE/NRO accounts, subject to FEMA regulations. However, they need to comply with additional documentation requirements and may face restrictions on certain sectors.
          </p>
        </div>
      </div>
    </div>
  );
}
