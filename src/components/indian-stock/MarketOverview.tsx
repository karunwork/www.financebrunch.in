
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, BarChart3, PieChart, LineChart, Percent } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function MarketOverview() {
  return (
    <section id="market-overview" className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-4">
            Market Insights
          </span>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Indian Stock Market Overview
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            A comprehensive look at the Indian equity market structure, key participants, and market dynamics
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <MarketMetricsCard 
            title="Market Capitalization" 
            value="$3.2 Trillion"
            description="Total worth of all listed securities"
            icon={<BarChart3 className="h-5 w-5" />}
            color="blue"
            delay={0.1}
          />
          
          <MarketMetricsCard 
            title="Average Daily Volume" 
            value="₹25+ Trillion"
            description="Total value traded per day"
            icon={<LineChart className="h-5 w-5" />}
            color="green"
            delay={0.2}
          />
          
          <MarketMetricsCard 
            title="Foreign Investment" 
            value="$642 Billion"
            description="Total FDI in Indian markets"
            icon={<PieChart className="h-5 w-5" />}
            color="purple"
            delay={0.3}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div 
            className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl p-6 border border-blue-100 dark:border-blue-900/50 shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-4">Market Participants</h3>
            <div className="space-y-4">
              <ParticipantItem 
                title="Domestic Retail Investors"
                percentage={44}
                description="Individual investors trading through broker platforms"
                trend="up"
              />
              
              <ParticipantItem 
                title="Foreign Institutional Investors (FIIs)"
                percentage={23}
                description="Foreign entities investing in Indian markets"
                trend="up"
              />
              
              <ParticipantItem 
                title="Domestic Institutional Investors (DIIs)"
                percentage={21}
                description="Insurance companies, mutual funds, and banks"
                trend="up"
              />
              
              <ParticipantItem 
                title="Proprietary Traders"
                percentage={12}
                description="Brokerages trading with their own capital"
                trend="down"
              />
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 rounded-xl p-6 border border-purple-100 dark:border-purple-900/50 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="text-xl font-bold text-purple-700 dark:text-purple-400 mb-4">Market Structure Highlights</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <StructureItem
                title="Trading Hours"
                value="9:15 AM - 3:30 PM"
                subtitle="Monday to Friday"
              />
              
              <StructureItem
                title="Settlement Cycle"
                value="T+2 / T+1"
                subtitle="Moving to T+1 full implementation"
              />
              
              <StructureItem
                title="Market Segments"
                value="Equity, F&O, Debt"
                subtitle="Currency and commodity derivatives"
              />
              
              <StructureItem
                title="Circuit Limits"
                value="5%, 10%, 20%"
                subtitle="Price bands for volatility control"
              />
              
              <StructureItem
                title="Indices"
                value="SENSEX, NIFTY"
                subtitle="Over 100 sectoral indices"
              />
              
              <StructureItem
                title="Market Access"
                value="Online Trading"
                subtitle="Mobile apps, web platforms"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MarketMetricsCard({ title, value, description, icon, color, delay }) {
  const colorStyles = {
    blue: "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400",
    green: "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400",
    purple: "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400",
    amber: "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400",
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
        <div className={`p-5 ${colorStyles[color]} bg-opacity-50 dark:bg-opacity-20`}>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{title}</h3>
            <div className={`w-8 h-8 rounded-lg ${colorStyles[color]} flex items-center justify-center`}>
              {icon}
            </div>
          </div>
        </div>
        <CardContent className="p-5">
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ParticipantItem({ title, percentage, description, trend }) {
  return (
    <div className="bg-white/70 dark:bg-gray-800/50 rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium text-gray-800 dark:text-gray-200">{title}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
        </div>
        <div className={`flex items-center ${trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
          <span className="text-xl font-bold">{percentage}%</span>
          {trend === 'up' ? (
            <ArrowUp className="h-4 w-4 ml-1" />
          ) : (
            <ArrowDown className="h-4 w-4 ml-1" />
          )}
        </div>
      </div>
      <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden h-1.5">
        <div 
          className={`h-full ${trend === 'up' ? 'bg-green-500 dark:bg-green-400' : 'bg-red-500 dark:bg-red-400'}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

function StructureItem({ title, value, subtitle }) {
  return (
    <div className="bg-white/70 dark:bg-gray-800/50 rounded-lg p-4 shadow-sm">
      <div className="flex items-center mb-2">
        <Percent className="w-4 h-4 text-purple-500 dark:text-purple-400 mr-2" />
        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h4>
      </div>
      <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">{value}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>
    </div>
  );
}
