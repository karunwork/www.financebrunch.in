
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function UnlistedSharesCollapsibleFAQ() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-purple-100 dark:border-purple-900/30 shadow-md">
      <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
        Frequently Asked Questions
      </h3>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="border-b border-purple-100 dark:border-purple-800/40">
          <AccordionTrigger className="text-lg font-medium py-4 hover:text-purple-600 dark:hover:text-purple-400">
            How are unlisted shares taxed in India?
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 dark:text-gray-300 pb-4">
            Unlisted shares held for more than 24 months are treated as long-term capital assets. 
            Long-term capital gains are taxed at 20% with indexation benefits. If held for less 
            than 24 months, gains are added to your income and taxed as per your income tax slab.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-2" className="border-b border-purple-100 dark:border-purple-800/40">
          <AccordionTrigger className="text-lg font-medium py-4 hover:text-purple-600 dark:hover:text-purple-400">
            How do I transfer or sell unlisted shares?
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 dark:text-gray-300 pb-4">
            Unlisted shares are transferred via off-market transactions using delivery instruction slips. 
            The seller and buyer must have demat accounts. Sale transactions are facilitated through 
            specialized brokers or platforms dealing in unlisted securities.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-3" className="border-b border-purple-100 dark:border-purple-800/40">
          <AccordionTrigger className="text-lg font-medium py-4 hover:text-purple-600 dark:hover:text-purple-400">
            What is the minimum investment required for unlisted shares?
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 dark:text-gray-300 pb-4">
            The minimum investment typically ranges from ₹1 lakh to ₹5 lakhs, depending on the 
            company and broker. This higher threshold exists due to the illiquid nature of these 
            investments and to ensure only qualified investors participate.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-4" className="border-b-0">
          <AccordionTrigger className="text-lg font-medium py-4 hover:text-purple-600 dark:hover:text-purple-400">
            Can NRIs invest in unlisted shares in India?
          </AccordionTrigger>
          <AccordionContent className="text-gray-700 dark:text-gray-300 pb-4">
            Yes, NRIs can invest in unlisted shares through their NRE/NRO accounts, subject to 
            FEMA regulations. However, they need to comply with additional documentation requirements 
            and may face restrictions on certain sectors.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
