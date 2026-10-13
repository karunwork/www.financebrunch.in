
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Calculator, Clock, TrendingUp } from 'lucide-react';

interface CalculatorFormProps {
  amount: number;
  amountDisplay: string;
  years: number;
  rate: number;
  onAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAmountBlur: () => void;
  onYearsChange: (years: number) => void;
  onRateChange: (rate: number) => void;
}

export function CalculatorForm({
  amount,
  amountDisplay,
  years,
  rate,
  onAmountChange,
  onAmountBlur,
  onYearsChange,
  onRateChange
}: CalculatorFormProps) {
  return (
    <div className="lg:col-span-5 bg-white dark:bg-gray-800 rounded-2xl p-5 sm:p-8 shadow-xl shadow-blue-500/5 dark:shadow-blue-500/10 border border-blue-100 dark:border-blue-900/50">
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label htmlFor="amount" className="text-sm sm:text-base flex items-center font-medium text-gray-700 dark:text-gray-300">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mr-2 flex-shrink-0">
                <Calculator className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              Monthly Investment
            </Label>
            <Input
              id="amount"
              type="text"
              value={amountDisplay}
              onChange={onAmountChange}
              onBlur={onAmountBlur}
              className="w-28 sm:w-32 text-right font-medium"
            />
          </div>
          <Slider
            value={[amount]}
            min={0}
            max={100000}
            step={100}
            onValueChange={(values) => onAmountChange({ target: { value: values[0].toString() } } as React.ChangeEvent<HTMLInputElement>)}
            className="mt-2"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>₹0</span>
            <span>₹1,00,000</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label htmlFor="years" className="text-sm sm:text-base flex items-center font-medium text-gray-700 dark:text-gray-300">
              <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mr-2 flex-shrink-0">
                <Clock className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              Time Period (Years)
            </Label>
            <Input
              id="years"
              type="number"
              value={years}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (!isNaN(value)) onYearsChange(Math.min(Math.max(value, 1), 35));
              }}
              className="w-28 sm:w-32 text-right font-medium"
            />
          </div>
          <Slider
            value={[years]}
            min={1}
            max={35}
            step={1}
            onValueChange={(values) => onYearsChange(values[0])}
            className="mt-2"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>1 Year</span>
            <span>35 Years</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label htmlFor="rate" className="text-sm sm:text-base flex items-center font-medium text-gray-700 dark:text-gray-300">
              <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mr-2 flex-shrink-0">
                <TrendingUp className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
              Expected Return (% p.a.)
            </Label>
            <Input
              id="rate"
              type="number"
              value={rate}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (!isNaN(value)) onRateChange(Math.min(Math.max(value, 1), 30));
              }}
              className="w-28 sm:w-32 text-right font-medium"
            />
          </div>
          <Slider
            value={[rate]}
            min={1}
            max={30}
            step={0.5}
            onValueChange={(values) => onRateChange(values[0])}
            className="mt-2"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>1%</span>
            <span>30%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
