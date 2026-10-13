
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

export function ExchangeInformation() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Major Indian Stock Exchanges
          </span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* BSE Card */}
          <Card className="overflow-hidden border-blue-100 dark:border-blue-900 shadow-lg hover:shadow-xl transition-all">
            <div className="h-48 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3"
                alt="Bombay Stock Exchange" 
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400">Bombay Stock Exchange (BSE)</h3>
                <span className="text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">
                  Est. 1875
                </span>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Benchmark Index</p>
                  <p className="font-medium">SENSEX</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Listed Companies</p>
                  <p className="font-medium">~5,000+</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Market Capitalization</p>
                  <p className="font-medium">~$3.2 trillion (as of 2023)</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Asia's oldest stock exchange and the world's 10th largest in terms of market capitalization. The BSE has played a pivotal role in the growth of the Indian corporate sector.
                  </p>
                </div>
                
                <a 
                  href="https://www.bseindia.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Visit Official Website
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </div>
            </CardContent>
          </Card>
          
          {/* NSE Card */}
          <Card className="overflow-hidden border-blue-100 dark:border-blue-900 shadow-lg hover:shadow-xl transition-all">
            <div className="h-48 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1642543492256-6437376a4144?auto=format&fit=crop&q=80&w=2844&ixlib=rb-4.0.3" 
                alt="National Stock Exchange" 
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-indigo-700 dark:text-indigo-400">National Stock Exchange (NSE)</h3>
                <span className="text-xs bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded-full">
                  Est. 1994
                </span>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Benchmark Index</p>
                  <p className="font-medium">NIFTY 50</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Listed Companies</p>
                  <p className="font-medium">~2,000+</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Market Capitalization</p>
                  <p className="font-medium">~$3.1 trillion (as of 2023)</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    India's leading stock exchange and one of the largest in the world by trading volume. NSE pioneered electronic trading in India and introduced many market innovations.
                  </p>
                </div>
                
                <a 
                  href="https://www.nseindia.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                >
                  Visit Official Website
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
