
import React from "react";
import TaxCalculator from "@/components/tax-calculator/TaxCalculator";

const TaxCalculatorSection: React.FC = () => {
  return (
    <section id="tax-calculator" className="py-16 bg-white dark:bg-gray-950">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Income Tax Calculator
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Calculate your income tax liability for FY 2024-2025 and FY 2025-2026 under both new and old tax regimes.
            Our calculator also supports international tax calculations.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <TaxCalculator 
            key="tax-calculator-main" 
            className="shadow-lg" 
          />
        </div>
      </div>
    </section>
  );
};

export default TaxCalculatorSection;
