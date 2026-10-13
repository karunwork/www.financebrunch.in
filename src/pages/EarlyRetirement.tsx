import React, { useEffect } from 'react';
import { Calculator, PiggyBank, DollarSign, ArrowLeft } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import RetirementCalculator from '@/components/retirement/RetirementCalculator';

const EarlyRetirement = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-transparent pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mb-6">
        <Link to="/">
          <Button variant="ghost" size="sm" className="gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Plan Your Early Retirement
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Calculate how much you need to save and invest to achieve financial independence and retire early (FIRE).
        </p>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <Card className="p-6 bg-white/80 dark:bg-darkblue-900/80 backdrop-blur-sm hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-800">
          <Calculator className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Detailed Calculations</h3>
          <p className="text-gray-600 dark:text-gray-400">Get comprehensive insights into your retirement planning with our advanced calculator.</p>
        </Card>

        <Card className="p-6 bg-white/80 dark:bg-darkblue-900/80 backdrop-blur-sm hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-800">
          <PiggyBank className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Savings Strategy</h3>
          <p className="text-gray-600 dark:text-gray-400">Learn how much you need to save monthly to reach your early retirement goals.</p>
        </Card>

        <Card className="p-6 bg-white/80 dark:bg-darkblue-900/80 backdrop-blur-sm hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-800">
          <DollarSign className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Investment Growth</h3>
          <p className="text-gray-600 dark:text-gray-400">See how your investments can grow over time with compound interest.</p>
        </Card>
      </div>

      {/* Calculator Section */}
      <div className="max-w-4xl mx-auto">
        <RetirementCalculator />
      </div>
    </main>
  );
};

export default EarlyRetirement;
