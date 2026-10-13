
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, BarChart, LineChart } from 'lucide-react';

export function MajorIndices() {
  // Mock data for Indian market indices
  const indices = [
    {
      name: "NIFTY 50",
      value: "19,453.80",
      change: "+125.65",
      percentChange: "+0.65%",
      trend: "up",
      description: "Benchmark index of the National Stock Exchange representing the weighted average of 50 of the largest Indian companies",
      chartData: [6300, 8900, 9800, 11500, 14300, 18300, 19500]
    },
    {
      name: "SENSEX",
      value: "65,387.16",
      change: "+385.04",
      percentChange: "+0.59%",
      trend: "up",
      description: "The S&P BSE SENSEX is a free-float market-weighted stock market index of 30 well-established companies listed on BSE",
      chartData: [21000, 29000, 32000, 38000, 48000, 61000, 65000]
    },
    {
      name: "NIFTY Bank",
      value: "44,485.70",
      change: "-120.35",
      percentChange: "-0.27%",
      trend: "down",
      description: "Index comprising the most liquid and large capitalized Indian banking stocks trading on the National Stock Exchange",
      chartData: [20000, 25000, 27000, 30000, 35000, 41000, 44000]
    },
    {
      name: "NIFTY IT",
      value: "32,156.75",
      change: "+456.25",
      percentChange: "+1.44%",
      trend: "up",
      description: "Index representing the performance of IT companies listed on the National Stock Exchange of India",
      chartData: [15000, 18000, 23000, 28000, 25000, 30000, 32000]
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-4 py-1.5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium mb-4">
            Market Benchmarks
          </span>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            Major Indian Market Indices
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            Track the performance of key benchmark indices that represent the Indian stock market
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {indices.map((index, i) => (
            <motion.div 
              key={index.name}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{index.name}</h3>
                      <div className={`ml-3 px-2 py-1 rounded text-xs font-medium ${
                        index.trend === 'up' 
                          ? 'bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-400' 
                          : 'bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-400'
                      }`}>
                        {index.trend === 'up' ? 'Bullish' : 'Bearish'}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{index.description}</p>
                  </div>
                </div>
                
                <div className="flex items-end mt-6">
                  <div className="flex-1">
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">₹{index.value}</span>
                      <span className={`ml-2 text-sm font-medium ${
                        index.trend === 'up' 
                          ? 'text-green-600 dark:text-green-400' 
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {index.change} ({index.percentChange})
                        {index.trend === 'up' ? (
                          <TrendingUp className="inline-block h-4 w-4 ml-1" />
                        ) : (
                          <TrendingDown className="inline-block h-4 w-4 ml-1" />
                        )}
                      </span>
                    </div>
                  </div>
                  
                  <div className="h-10 flex items-end">
                    {index.chartData.map((value, i) => (
                      <div 
                        key={i} 
                        className={`w-1.5 mx-0.5 rounded-t ${
                          index.trend === 'up' ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        style={{ 
                          height: `${(value / Math.max(...index.chartData)) * 40}px`,
                          opacity: 0.5 + (i / index.chartData.length) * 0.5
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className={`h-1 w-full ${index.trend === 'up' ? 'bg-green-500' : 'bg-red-500'}`}></div>
              
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 flex justify-between items-center text-sm">
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <BarChart className="h-4 w-4 mr-1" />
                  <span>5Y CAGR: {index.trend === 'up' ? '+12.8%' : '+8.4%'}</span>
                </div>
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <LineChart className="h-4 w-4 mr-1" />
                  <span>Volatility: {index.trend === 'up' ? 'Moderate' : 'High'}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
