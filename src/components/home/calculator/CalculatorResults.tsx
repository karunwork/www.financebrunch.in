
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, PieChart } from 'lucide-react';

interface CalculatorResultsProps {
  amount: number;
  years: number;
  result: number;
}

export function CalculatorResults({ amount, years, result }: CalculatorResultsProps) {
  const formatCurrency = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)} Cr`;
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)} Lakhs`;
    } else if (value >= 1000) {
      return `₹${(value / 1000).toFixed(2)}k`;
    }
    return `₹${value.toFixed(0)}`;
  };

  return (
    <div className="lg:col-span-7 bg-gradient-to-br from-blue-600 to-purple-700 dark:from-blue-700 dark:to-purple-800 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-4">
            <PieChart className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-2 text-white">Your SIP Results</h3>
          <p className="text-blue-100">
            Based on monthly investment of ₹{amount.toLocaleString()} for {years} years
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white border border-white/20 transform transition-all hover:scale-105 hover:bg-white/15 hover:border-white/30 hover:shadow-lg duration-300 cursor-default">
            <div className="text-lg text-blue-100 mb-2">Invested Amount</div>
            <div className="text-2xl font-bold">₹{(amount * years * 12).toLocaleString()}</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white border border-white/20 transform transition-all hover:scale-105 hover:bg-white/15 hover:border-white/30 hover:shadow-lg duration-300 cursor-default">
            <div className="text-lg text-blue-100 mb-2">Estimated Returns</div>
            <div className="text-2xl font-bold text-yellow-300">
              {formatCurrency(result - (amount * years * 12))}
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white border border-white/20 transform transition-all hover:scale-105 hover:bg-white/15 hover:border-white/30 hover:shadow-lg duration-300 cursor-default">
            <div className="text-lg text-blue-100 mb-2">Total Value</div>
            <div className="text-3xl font-bold text-white">
              {formatCurrency(result)}
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
          <Link to="/calculator">
            <Button size="lg" className="button-hover group bg-white text-blue-600 hover:bg-blue-50 transition-all shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] hover:shadow-lg">
              Explore More Calculators
              <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Button>
          </Link>
        </div>
        
        <p className="text-center text-sm text-blue-200 mt-6 italic">
          These calculations are estimates and not a guarantee of future returns.
        </p>
      </div>
    </div>
  );
}
