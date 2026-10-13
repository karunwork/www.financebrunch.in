import { useState, useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { ArrowUpRight, TrendingUp, IndianRupee, Calendar, Percent } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { calculateSIP } from '@/utils/sipCalculator';

const StepUpSIPCalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState(5000);
  const [stepUpRate, setStepUpRate] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [investmentDuration, setInvestmentDuration] = useState(10);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [estimatedReturns, setEstimatedReturns] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  
  const minInvestment = 0;
  const maxInvestment = 99999999;
  const maxReturn = 30;
  const maxDuration = 35;
  const maxStepUp = 100;
  
  const calculateStepUpSIP = () => {
    if (initialInvestment === 0 || investmentDuration === 0) {
      setTotalInvestment(0);
      setEstimatedReturns(0);
      setTotalValue(0);
      return;
    }
    
    const result = calculateSIP({
      monthlyInvestment: initialInvestment,
      expectedAnnualReturn: expectedReturn,
      investmentDurationYears: investmentDuration,
      isStepUpEnabled: true,
      stepUpPercentage: stepUpRate,
    });
    
    setTotalInvestment(result.totalInvested);
    setEstimatedReturns(result.estimatedReturns);
    setTotalValue(result.futureValue);
  };
  
  useEffect(() => {
    calculateStepUpSIP();
  }, [initialInvestment, stepUpRate, expectedReturn, investmentDuration]);
  
  const handleInitialInvestmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, '');
    
    if (inputValue === '') {
      setInitialInvestment(0);
    } else {
      const value = parseInt(inputValue);
      setInitialInvestment(Math.min(value, maxInvestment));
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
  
  const pieChartData = [
    { name: 'Investment', value: totalInvestment },
    { name: 'Returns', value: estimatedReturns },
  ];
  
  const COLORS = ['#8884d8', '#82ca9d'];
  
  const yearlyData = useMemo(() => {
    if (initialInvestment === 0 || investmentDuration === 0) return [];
    const result = calculateSIP({
      monthlyInvestment: initialInvestment,
      expectedAnnualReturn: expectedReturn,
      investmentDurationYears: investmentDuration,
      isStepUpEnabled: true,
      stepUpPercentage: stepUpRate,
    });
    return result.yearlyBreakdown.map((item) => ({
      name: `Year ${item.year}`,
      Investment: Math.round(item.yearlyInvested),
      SIPAmount: Math.round(item.monthlyContribution),
    }));
  }, [initialInvestment, stepUpRate, expectedReturn, investmentDuration]);


  return (
    <div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label htmlFor="initialInvestment" className="text-base flex items-center">
                <IndianRupee className="h-4 w-4 mr-1.5" />
                Initial Monthly Investment
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
              max={500000}
              step={100}
              onValueChange={(values) => setInitialInvestment(values[0])}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>₹{minInvestment}</span>
              <span>₹5 Lakhs</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label htmlFor="stepUpRate" className="text-base flex items-center">
                <Percent className="h-4 w-4 mr-1.5" />
                Annual Step-Up Rate
              </Label>
              <Input
                id="stepUpRate"
                type="number"
                value={stepUpRate}
                onChange={(e) => setStepUpRate(Math.min(Math.max(Number(e.target.value), 1), maxStepUp))}
                className="w-32 text-right"
              />
            </div>
            <Slider
              value={[stepUpRate]}
              min={1}
              max={maxStepUp}
              step={1}
              onValueChange={(values) => setStepUpRate(values[0])}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>1%</span>
              <span>{maxStepUp}%</span>
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
              <Label htmlFor="investmentDuration" className="text-base flex items-center">
                <Calendar className="h-4 w-4 mr-1.5" />
                Investment Duration (Years)
              </Label>
              <Input
                id="investmentDuration"
                type="number"
                value={investmentDuration}
                onChange={(e) => setInvestmentDuration(Math.min(Math.max(Number(e.target.value), 1), maxDuration))}
                className="w-32 text-right"
              />
            </div>
            <Slider
              value={[investmentDuration]}
              min={1}
              max={maxDuration}
              step={1}
              onValueChange={(values) => setInvestmentDuration(values[0])}
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
                <span className="text-gray-600">Invested Amount:</span>
                <span className="font-semibold">₹{totalInvestment.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Est. Returns:</span>
                <span className="font-semibold text-primary">₹{estimatedReturns.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Total Value:</span>
                <span className="font-bold text-lg">₹{totalValue.toLocaleString()}</span>
              </div>
            </div>
          </Card>
          
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-4">SIP Amount Growth Over Years</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={yearlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip formatter={(value) => [formatCurrency(Number(value)), ""]} />
              <Bar dataKey="SIPAmount" fill="#8884d8" name="Monthly SIP Amount" />
              <Bar dataKey="Investment" fill="#82ca9d" name="Yearly Investment" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StepUpSIPCalculator;
