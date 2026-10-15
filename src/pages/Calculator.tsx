import { useNavigate } from 'react-router-dom';
import MutualFundCalculator from '@/components/calculator/MutualFundCalculator';
import { CalculationWatcher } from '@/components/calculator/calculationWatcher';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Calculator = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };
  
  return (
    <main className="flex-grow pt-24 pb-24 min-h-screen">
      <div className="w-full max-w-7xl 2xl:max-w-[1536px] 3xl:max-w-[1680px] px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="mb-8 flex items-center">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="mr-4 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-darkblue-800"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Mutual Fund Calculator
          </h1>
        </div>
        
        <div className="mb-6">
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
            Plan your financial future with our comprehensive mutual fund calculators. Choose between SIP, Step-up SIP, Lumpsum or SWP calculators to forecast your investments.
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-500 italic">
            Dedicated to Finance Brunch by Saikarun Arasada
          </p>
        </div>
        
        <MutualFundCalculator />
        <CalculationWatcher />
      </div>
    </main>
  );
};

export default Calculator;
