
import React from "react";
import { 
  ArrowUpRight, 
  ArrowDownRight,
  TrendingUp,
  BarChart3
} from "lucide-react";

interface MarketIndexProps {
  name: string;
  description: string;
  value: string;
  change: string;
  changePercentage: string;
  isUp: boolean;
  sentiment: "Bullish" | "Bearish" | "Neutral";
  volatility: string;
  cagr: string;
}

const MarketIndex = ({
  name,
  description,
  value,
  change,
  changePercentage,
  isUp,
  sentiment,
  volatility,
  cagr,
}: MarketIndexProps) => {
  const sentimentColor = 
    sentiment === "Bullish" 
      ? "bg-green-100 text-green-700" 
      : sentiment === "Bearish" 
        ? "bg-red-100 text-red-700" 
        : "bg-gray-100 text-gray-700";

  const changeColor = isUp ? "text-green-600" : "text-red-600";
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-gray-800">{name}</h3>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${sentimentColor}`}>
          {sentiment}
        </span>
      </div>
      
      <p className="text-sm text-gray-600 mb-4 h-12">{description}</p>
      
      <div className="mb-4">
        <h4 className="text-2xl font-bold mb-1">₹{value}</h4>
        <div className="flex items-center">
          <span className={`flex items-center ${changeColor} text-sm font-medium`}>
            {isUp ? <ArrowUpRight size={16} className="mr-1" /> : <ArrowDownRight size={16} className="mr-1" />}
            {change} ({changePercentage})
          </span>
        </div>
      </div>
      
      <div className="h-12">
        {isUp ? (
          <div className="flex justify-end">
            <div className="flex space-x-0.5">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div 
                  key={i} 
                  className={`w-3 rounded-sm bg-green-${100 + i * 100}`} 
                  style={{ 
                    height: `${10 + i * 4}px`, 
                    backgroundColor: `rgba(16, 185, 129, ${0.3 + i * 0.1})` 
                  }}
                ></div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-end">
            <div className="flex space-x-0.5">
              {[7, 6, 5, 4, 3, 2, 1].map((i) => (
                <div 
                  key={i} 
                  className="w-3 rounded-sm" 
                  style={{ 
                    height: `${10 + i * 4}px`, 
                    backgroundColor: `rgba(239, 68, 68, ${0.3 + i * 0.1})` 
                  }}
                ></div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="pt-4 mt-4 border-t border-gray-100 grid grid-cols-2 gap-2 text-xs text-gray-500">
        <div className="flex items-center">
          <TrendingUp size={14} className="mr-1 text-indigo-500" />
          <span>5Y CAGR: {cagr}</span>
        </div>
        <div className="flex items-center justify-end">
          <BarChart3 size={14} className="mr-1 text-indigo-500" />
          <span>Volatility: {volatility}</span>
        </div>
      </div>
    </div>
  );
};

const StaticMarketIndices = () => {
  // Market data that doesn't need frequent updates (historical/average values)
  const marketIndices = [
    {
      name: "NIFTY 50",
      description: "Benchmark index of the National Stock Exchange representing the weighted average of 50 of the largest Indian companies",
      value: "19,453.80",
      change: "+125.65",
      changePercentage: "+0.65%",
      isUp: true,
      sentiment: "Bullish" as const,
      volatility: "Moderate",
      cagr: "+12.8%"
    },
    {
      name: "SENSEX",
      description: "The S&P BSE SENSEX is a free-float market-weighted stock market index of 30 well-established companies listed on BSE",
      value: "65,387.16",
      change: "+385.04",
      changePercentage: "+0.59%",
      isUp: true,
      sentiment: "Bullish" as const,
      volatility: "Moderate",
      cagr: "+12.8%"
    },
    {
      name: "NIFTY Bank",
      description: "Index comprising the most liquid and large capitalized Indian banking stocks trading on the National Stock Exchange",
      value: "44,485.70",
      change: "-120.35",
      changePercentage: "-0.27%",
      isUp: false,
      sentiment: "Bearish" as const,
      volatility: "Moderate",
      cagr: "+9.7%"
    },
    {
      name: "NIFTY IT",
      description: "Index representing the performance of IT companies listed on the National Stock Exchange of India",
      value: "32,156.75",
      change: "+456.25",
      changePercentage: "+1.44%",
      isUp: true,
      sentiment: "Bullish" as const,
      volatility: "Moderate",
      cagr: "+15.3%"
    }
  ];

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-2">
          <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-2">
            Market Benchmarks
          </span>
          <h2 className="text-3xl font-bold text-indigo-800 mb-2">Major Indian Market Indices</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Track the performance of key benchmark indices that represent the Indian stock market
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {marketIndices.map((index, i) => (
            <MarketIndex key={i} {...index} />
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            * Data shown represents typical market behavior and historical averages, not real-time data.
          </p>
        </div>
      </div>
    </section>
  );
};

export default StaticMarketIndices;
