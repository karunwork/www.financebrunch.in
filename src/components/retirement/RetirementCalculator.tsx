
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Calculator } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface CalculationResult {
  age: number;
  savings: number;
}

const RetirementCalculator = () => {
  const { toast } = useToast();
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [targetRetirementAge, setTargetRetirementAge] = useState<number>(45);
  const [currentSavings, setCurrentSavings] = useState<number>(100000);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(10000);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(5000);
  const [expectedReturn, setExpectedReturn] = useState<number>(8);
  const [inflationRate, setInflationRate] = useState<number>(3);
  const [results, setResults] = useState<CalculationResult[]>([]);

  const calculateRetirement = () => {
    if (targetRetirementAge <= currentAge) {
      toast({
        title: "Invalid Ages",
        description: "Target retirement age must be greater than current age",
        variant: "destructive",
      });
      return;
    }

    const yearlyData: CalculationResult[] = [];
    let currentSavingsAmount = currentSavings;
    const monthlySavings = monthlyIncome - monthlyExpenses;
    const monthlyReturnRate = (1 + expectedReturn / 100) ** (1/12) - 1;
    const monthlyInflationRate = (1 + inflationRate / 100) ** (1/12) - 1;

    for (let age = currentAge; age <= targetRetirementAge; age++) {
      for (let month = 0; month < 12; month++) {
        // Apply monthly return on current savings
        currentSavingsAmount *= (1 + monthlyReturnRate);
        // Add monthly savings
        currentSavingsAmount += monthlySavings;
        // Adjust for inflation
        currentSavingsAmount /= (1 + monthlyInflationRate);
      }
      yearlyData.push({
        age,
        savings: Math.round(currentSavingsAmount),
      });
    }

    setResults(yearlyData);
    
    toast({
      title: "Calculation Complete",
      description: "Your retirement projection has been updated",
    });
  };

  return (
    <Card className="p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Retirement Calculator</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <Label htmlFor="currentAge">Current Age</Label>
          <Input
            id="currentAge"
            type="number"
            value={currentAge}
            onChange={(e) => setCurrentAge(Number(e.target.value))}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="targetAge">Target Retirement Age</Label>
          <Input
            id="targetAge"
            type="number"
            value={targetRetirementAge}
            onChange={(e) => setTargetRetirementAge(Number(e.target.value))}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="currentSavings">Current Savings (₹)</Label>
          <Input
            id="currentSavings"
            type="number"
            value={currentSavings}
            onChange={(e) => setCurrentSavings(Math.max(0, Math.min(1000000000, Number(e.target.value))))}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="monthlyIncome">Monthly Income (₹)</Label>
          <Input
            id="monthlyIncome"
            type="number"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(Math.max(0, Math.min(1000000000, Number(e.target.value))))}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="monthlyExpenses">Monthly Expenses (₹)</Label>
          <Input
            id="monthlyExpenses"
            type="number"
            value={monthlyExpenses}
            onChange={(e) => setMonthlyExpenses(Math.max(0, Math.min(1000000000, Number(e.target.value))))}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="expectedReturn">Expected Annual Return (%)</Label>
          <Input
            id="expectedReturn"
            type="number"
            value={expectedReturn}
            onChange={(e) => setExpectedReturn(Number(e.target.value))}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="inflationRate">Expected Inflation Rate (%)</Label>
          <Input
            id="inflationRate"
            type="number"
            value={inflationRate}
            onChange={(e) => setInflationRate(Number(e.target.value))}
            className="mt-1"
          />
        </div>
      </div>

      <Button 
        onClick={calculateRetirement}
        category="calculator"
        rightIcon={<Calculator className="h-4 w-4" />}
        className="w-full mb-8 font-semibold"
      >
        Calculate Retirement Plan
      </Button>

      {results.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Projected Savings Growth</h3>
          <div className="h-[400px] mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={results}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="age" label={{ value: 'Age', position: 'bottom' }} />
                <YAxis
                  label={{
                    value: 'Savings (₹)',
                    angle: -90,
                    position: 'insideLeft',
                  }}
                />
                <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                <Line
                  type="monotone"
                  dataKey="savings"
                  stroke="#3b82f6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            <div>
              <Label>Progress to Goal</Label>
              <Progress value={
                ((results[0]?.savings || 0) / (results[results.length - 1]?.savings || 1)) * 100
              } className="mt-2" />
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-900">
                Final Projected Savings at age {targetRetirementAge}:{' '}
                <span className="font-bold">
                  ₹{results[results.length - 1]?.savings.toLocaleString()}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default RetirementCalculator;
