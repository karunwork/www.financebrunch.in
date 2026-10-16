import { useState, useEffect } from 'react';
import { CalculatorHeader } from './calculator/CalculatorHeader';
import { CalculatorForm } from './calculator/CalculatorForm';
import { CalculatorResults } from './calculator/CalculatorResults';
import { FadeIn } from '@/components/ui/animation';
import { calculateSIP } from '@/utils/sipCalculator';
import { MAX_INVESTMENT_AMOUNT } from '@/utils/calculatorConstants';

export default function HomeCalculator() {
  const [amount, setAmount] = useState(5000);
  const [amountDisplay, setAmountDisplay] = useState(`₹${amount.toLocaleString()}`);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);
  const [result, setResult] = useState(0);
  
  useEffect(() => {
    const sipRes = calculateSIP({
      monthlyInvestment: amount,
      expectedAnnualReturn: rate,
      investmentDurationYears: years,
    });
    setResult(Math.round(sipRes.futureValue));
  }, [amount, years, rate]);

  useEffect(() => {
    setAmountDisplay(`₹${amount.toLocaleString()}`);
  }, [amount]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    
    if (value === '') {
      setAmount(0);
      setAmountDisplay('');
    } else {
      const numericValue = parseInt(value, 10);
      if (!isNaN(numericValue)) {
        const clamped = Math.min(MAX_INVESTMENT_AMOUNT, Math.max(0, numericValue));
        setAmount(clamped);
      }
    }
  };

  const handleAmountBlur = () => {
    if (amountDisplay === '' || amount === 0) {
      setAmount(0);
      setAmountDisplay('₹0');
    } else {
      setAmountDisplay(`₹${amount.toLocaleString()}`);
    }
  };

  return (
    <section id="calculator" className="py-24 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-transparent dark:from-indigo-950/20 dark:via-transparent dark:to-purple-950/15">
      <div className="w-full max-w-7xl 2xl:max-w-[1536px] 3xl:max-w-[1680px] px-4 sm:px-6 lg:px-8 mx-auto">
        <CalculatorHeader />
        
        <FadeIn 
          direction="up"
          delay={0.15}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          <CalculatorForm 
            amount={amount}
            amountDisplay={amountDisplay}
            years={years}
            rate={rate}
            onAmountChange={handleAmountChange}
            onAmountBlur={handleAmountBlur}
            onYearsChange={(value) => setYears(value)}
            onRateChange={(value) => setRate(value)}
          />
          
          <CalculatorResults 
            amount={amount}
            years={years}
            result={result}
          />
        </FadeIn>
      </div>
    </section>
  );
}

