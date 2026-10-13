
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { TrendingUp, IndianRupee, Calendar } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const LumpsumCalculator = () => {
  const [investment, setInvestment] = useState(100000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [investmentDuration, setInvestmentDuration] = useState(10);
  const [futureValue, setFutureValue] = useState(0);
  
  const minInvestment = 0;
  const maxInvestment = 99999999;
  const maxReturn = 30;
  const maxDuration = 35;
  
  const calculateLumpsum = () => {
    if (investment === 0 || investmentDuration === 0) {
      setFutureValue(0);
      return;
    }
    
    const rate = expectedReturn / 100;
    const years = investmentDuration;
    // Lumpsum formula: P(1+r)^n
    const futureVal = investment * Math.pow(1 + rate, years);
    setFutureValue(futureVal);
  };
  
  useEffect(() => {
    calculateLumpsum();
  }, [investment, expectedReturn, investmentDuration]);
  
  const handleInvestmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, '');
    
    if (inputValue === '') {
      setInvestment(0);
    } else {
      const value = parseInt(inputValue);
      setInvestment(Math.min(value, maxInvestment));
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
  
  const estimatedReturns = futureValue - investment;
  
  const pieChartData = [
    { name: 'Investment', value: investment },
    { name: 'Returns', value: estimatedReturns },
  ];
  
  const COLORS = ['#8884d8', '#82ca9d'];
  
  const yearlyData = Array.from({ length: investmentDuration }, (_, i) => {
    const year = i + 1;
    const value = investment * Math.pow(1 + expectedReturn / 100, year);
    
    return {
      name: `Year ${year}`,
      value: value,
    };
  });

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label htmlFor="investment" className="text-base flex items-center">
                <IndianRupee className="h-4 w-4 mr-1.5" />
                Investment Amount
              </Label>
              <Input
                id="investment"
                type="text"
                value={investment === 0 ? '' : investment.toLocaleString()}
                onChange={handleInvestmentChange}
                placeholder="Enter amount"
                className="w-32 text-right"
              />
            </div>
            <Slider
              value={[investment]}
              min={minInvestment}
              max={10000000}
              step={1000}
              onValueChange={(values) => setInvestment(values[0])}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>₹{minInvestment}</span>
              <span>₹1 Cr</span>
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
                <span className="font-semibold">₹{investment.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Est. Returns:</span>
                <span className="font-semibold text-primary">₹{estimatedReturns.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Total Value:</span>
                <span className="font-bold text-lg">₹{futureValue.toLocaleString()}</span>
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
        <h3 className="text-lg font-semibold mb-4">Growth Over Time</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={yearlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip formatter={(value) => [formatCurrency(Number(value)), "Value"]} />
              <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} name="Investment Value" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default LumpsumCalculator;
