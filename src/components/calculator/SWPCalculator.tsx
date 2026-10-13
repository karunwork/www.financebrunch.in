
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { TrendingUp, IndianRupee, Calendar, ArrowDownRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SWPCalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState(1000000);
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState(5000);
  const [expectedReturn, setExpectedReturn] = useState(8);
  const [withdrawalYears, setWithdrawalYears] = useState(10);
  const [finalCorpus, setFinalCorpus] = useState(0);
  const [totalWithdrawal, setTotalWithdrawal] = useState(0);
  
  const minInvestment = 0;
  const maxInvestment = 99999999;
  const minWithdrawal = 0;
  const maxWithdrawal = 9999999;
  const maxReturn = 30;
  const maxDuration = 35;
  
  const calculateSWP = () => {
    if (initialInvestment === 0) {
      setFinalCorpus(0);
      setTotalWithdrawal(0);
      return;
    }
    
    // Calculate using the provided SWP formula
    const months = withdrawalYears * 12;
    const monthlyRate = expectedReturn / 100 / 12;
    
    // Calculate monthly withdrawal amount using the SWP formula
    const calculatedMonthlyWithdrawal = (initialInvestment * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
    
    // If user specified a withdrawal amount, use that instead of calculated amount
    const effectiveMonthlyWithdrawal = monthlyWithdrawal > 0 ? monthlyWithdrawal : calculatedMonthlyWithdrawal;
    
    // Calculate final corpus if withdrawing at the specified rate
    let remainingCorpus = initialInvestment;
    let totalWithdrawn = 0;
    
    for (let i = 0; i < months; i++) {
      // First grow the corpus for this month
      remainingCorpus = remainingCorpus * (1 + monthlyRate);
      
      // Then withdraw for this month
      remainingCorpus -= effectiveMonthlyWithdrawal;
      totalWithdrawn += effectiveMonthlyWithdrawal;
      
      // Check if corpus is depleted
      if (remainingCorpus <= 0) {
        remainingCorpus = 0;
        break;
      }
    }
    
    setFinalCorpus(Math.max(0, remainingCorpus));
    setTotalWithdrawal(totalWithdrawn);
  };
  
  useEffect(() => {
    calculateSWP();
  }, [initialInvestment, monthlyWithdrawal, expectedReturn, withdrawalYears]);
  
  const handleInitialInvestmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, '');
    
    if (inputValue === '') {
      setInitialInvestment(0);
    } else {
      const value = parseInt(inputValue);
      setInitialInvestment(Math.min(value, maxInvestment));
    }
  };
  
  const handleMonthlyWithdrawalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, '');
    
    if (inputValue === '') {
      setMonthlyWithdrawal(0);
    } else {
      const value = parseInt(inputValue);
      setMonthlyWithdrawal(Math.min(value, maxWithdrawal));
    }
  };
  
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
  
  const generateChartData = () => {
    const data = [];
    let remainingCorpus = initialInvestment;
    const monthlyRate = expectedReturn / 100 / 12;
    
    for (let year = 0; year <= withdrawalYears; year++) {
      if (year === 0) {
        data.push({
          name: 'Start',
          corpus: remainingCorpus,
          withdrawal: 0,
        });
        continue;
      }
      
      let yearlyWithdrawal = 0;
      
      for (let month = 0; month < 12; month++) {
        if (remainingCorpus <= 0) {
          remainingCorpus = 0;
          break;
        }
        
        // First grow the corpus for this month
        remainingCorpus = remainingCorpus * (1 + monthlyRate);
        
        // Then withdraw for this month
        remainingCorpus -= monthlyWithdrawal;
        yearlyWithdrawal += monthlyWithdrawal;
        
        if (remainingCorpus < 0) {
          remainingCorpus = 0;
          break;
        }
      }
      
      data.push({
        name: `Year ${year}`,
        corpus: remainingCorpus,
        withdrawal: yearlyWithdrawal,
      });
    }
    
    return data;
  };
  
  const chartData = generateChartData();
  
  // Check if corpus depletes before the specified duration
  const corpusDepletesIn = chartData.findIndex(item => item.corpus <= 0);
  const corpusDepletionYear = corpusDepletesIn > 0 ? corpusDepletesIn - 1 : null;

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label htmlFor="initialInvestment" className="text-base flex items-center">
                <IndianRupee className="h-4 w-4 mr-1.5" />
                Initial Investment
              </Label>
              <Input
                id="initialInvestment"
                type="text"
                value={initialInvestment === 0 ? '' : initialInvestment.toLocaleString()}
                onChange={handleInitialInvestmentChange}
                placeholder="Enter amount"
                className="w-32 text-right"
              />
            </div>
            <Slider
              value={[initialInvestment]}
              min={minInvestment}
              max={10000000}
              step={1000}
              onValueChange={(values) => setInitialInvestment(values[0])}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>₹{minInvestment}</span>
              <span>₹1 Cr</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label htmlFor="monthlyWithdrawal" className="text-base flex items-center">
                <ArrowDownRight className="h-4 w-4 mr-1.5" />
                Monthly Withdrawal
              </Label>
              <Input
                id="monthlyWithdrawal"
                type="text"
                value={monthlyWithdrawal === 0 ? '' : monthlyWithdrawal.toLocaleString()}
                onChange={handleMonthlyWithdrawalChange}
                placeholder="Enter amount"
                className="w-32 text-right"
              />
            </div>
            <Slider
              value={[monthlyWithdrawal]}
              min={minWithdrawal}
              max={maxWithdrawal > initialInvestment / 10 ? initialInvestment / 10 : maxWithdrawal}
              step={100}
              onValueChange={(values) => setMonthlyWithdrawal(values[0])}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>₹{minWithdrawal}</span>
              <span>{formatCurrency(maxWithdrawal > initialInvestment / 10 ? initialInvestment / 10 : maxWithdrawal)}</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label htmlFor="expectedReturn" className="text-base flex items-center">
                <TrendingUp className="h-4 w-4 mr-1.5" />
                Expected Return (% p.a)
              </Label>
              <Input
                id="expectedReturn"
                type="number"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(Math.min(Math.max(Number(e.target.value), 1), maxReturn))}
                className="w-32 text-right"
              />
            </div>
            <Slider
              value={[expectedReturn]}
              min={1}
              max={maxReturn}
              step={0.5}
              onValueChange={(values) => setExpectedReturn(values[0])}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>1%</span>
              <span>{maxReturn}%</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label htmlFor="withdrawalYears" className="text-base flex items-center">
                <Calendar className="h-4 w-4 mr-1.5" />
                Withdrawal Period (Years)
              </Label>
              <Input
                id="withdrawalYears"
                type="number"
                value={withdrawalYears}
                onChange={(e) => setWithdrawalYears(Math.min(Math.max(Number(e.target.value), 1), maxDuration))}
                className="w-32 text-right"
              />
            </div>
            <Slider
              value={[withdrawalYears]}
              min={1}
              max={maxDuration}
              step={1}
              onValueChange={(values) => setWithdrawalYears(values[0])}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>1 Year</span>
              <span>{maxDuration} Years</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Results</h3>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Initial Investment:</span>
                <span className="font-semibold">₹{initialInvestment.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Total Withdrawals:</span>
                <span className="font-semibold text-primary">₹{totalWithdrawal.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Final Corpus:</span>
                <span className="font-bold text-lg">₹{finalCorpus > 0 ? finalCorpus.toLocaleString() : 0}</span>
              </div>
              
              {corpusDepletionYear && (
                <div className="py-2 mt-2">
                  <div className="p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-md text-sm">
                    <strong>Note:</strong> Your corpus may deplete in {corpusDepletionYear} years at this withdrawal rate.
                  </div>
                </div>
              )}
            </div>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-base font-semibold mb-2">Sustainable Withdrawal Rate</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {finalCorpus > 0 
                ? "Your withdrawal rate is sustainable for the entire period."
                : `Consider reducing your monthly withdrawal amount to make your corpus last the entire ${withdrawalYears} years.`
              }
            </p>
            
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500">Less</div>
              <div className={`w-full mx-2 h-2 rounded-full bg-gradient-to-r ${
                finalCorpus > initialInvestment * 0.5 
                  ? 'from-green-500 to-green-300' 
                  : finalCorpus > 0 
                    ? 'from-yellow-500 to-yellow-300' 
                    : 'from-red-500 to-red-300'
              }`}></div>
              <div className="text-xs text-gray-500">More</div>
            </div>
          </Card>
        </div>
      </div>
      
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-4">Corpus & Withdrawals Over Time</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip formatter={(value) => [formatCurrency(Number(value)), ""]} />
              <Line type="monotone" dataKey="corpus" stroke="#8884d8" name="Remaining Corpus" strokeWidth={2} />
              <Line type="monotone" dataKey="withdrawal" stroke="#82ca9d" name="Yearly Withdrawal" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SWPCalculator;
