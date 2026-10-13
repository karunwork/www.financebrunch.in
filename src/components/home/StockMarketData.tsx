
import { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, RefreshCw } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { useQuery } from '@tanstack/react-query';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';

interface StockData {
  symbol: string;
  companyName: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
}

// Top Indian stocks from NSE/BSE
const STOCK_SYMBOLS = [
  'RELIANCE.NS', 'TCS.NS', 'HDFCBANK.NS', 'INFY.NS', 'ICICIBANK.NS', 
  'BHARTIARTL.NS', 'SBIN.NS', 'HINDUNILVR.NS', 'WIPRO.NS', 'ADANIPORTS.NS'
];

// Fallback mock data in case the API fails
const mockStockData: StockData[] = [
  { symbol: 'RELIANCE', companyName: 'Reliance Industries', price: 2845.25, change: 15.75, changePercent: 0.56, volume: 4521365 },
  { symbol: 'TCS', companyName: 'Tata Consultancy Services', price: 3698.50, change: -12.30, changePercent: -0.33, volume: 1256478 },
  { symbol: 'HDFCBANK', companyName: 'HDFC Bank', price: 1678.90, change: 23.45, changePercent: 1.42, volume: 3245698 },
  { symbol: 'INFY', companyName: 'Infosys', price: 1542.75, change: 8.35, changePercent: 0.54, volume: 2156987 },
  { symbol: 'ICICIBANK', companyName: 'ICICI Bank', price: 987.60, change: -5.20, changePercent: -0.52, volume: 1879654 },
  { symbol: 'BHARTIARTL', companyName: 'Bharti Airtel', price: 876.30, change: 12.75, changePercent: 1.48, volume: 1456987 },
  { symbol: 'SBIN', companyName: 'State Bank of India', price: 645.85, change: 3.25, changePercent: 0.51, volume: 2356489 },
  { symbol: 'HINDUNILVR', companyName: 'Hindustan Unilever', price: 2456.50, change: -18.75, changePercent: -0.76, volume: 896547 },
  { symbol: 'WIPRO', companyName: 'Wipro', price: 432.60, change: -2.35, changePercent: -0.54, volume: 1254689 },
  { symbol: 'ADANIPORTS', companyName: 'Adani Ports', price: 765.25, change: 25.35, changePercent: 3.42, volume: 1456987 }
];

// Map Yahoo Finance symbols to company names
const COMPANY_NAMES: Record<string, string> = {
  'RELIANCE.NS': 'Reliance Industries',
  'TCS.NS': 'Tata Consultancy Services',
  'HDFCBANK.NS': 'HDFC Bank',
  'INFY.NS': 'Infosys',
  'ICICIBANK.NS': 'ICICI Bank',
  'BHARTIARTL.NS': 'Bharti Airtel',
  'SBIN.NS': 'State Bank of India',
  'HINDUNILVR.NS': 'Hindustan Unilever',
  'WIPRO.NS': 'Wipro',
  'ADANIPORTS.NS': 'Adani Ports'
};

export default function StockMarketData() {
  const [stockData, setStockData] = useState<StockData[]>(mockStockData);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;
  const hasValidApiKey = Boolean(apiKey && apiKey !== 'YOUR_RAPIDAPI_KEY');

  // Function to fetch stock data from Yahoo Finance API
  const fetchStockData = async (): Promise<StockData[]> => {
    if (!hasValidApiKey) {
      return [];
    }

    const symbols = STOCK_SYMBOLS.join(',');
    const url = `https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/${symbols}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch stock data');
    }
    
    interface YahooQuoteItem {
      symbol: string;
      longName?: string;
      shortName?: string;
      regularMarketPrice?: number;
      regularMarketChange?: number;
      regularMarketChangePercent?: number;
      regularMarketVolume?: number;
    }

    const data: YahooQuoteItem[] = await response.json();
    
    const transformedData: StockData[] = data.map((item) => ({
      symbol: item.symbol.replace('.NS', ''),
      companyName: COMPANY_NAMES[item.symbol] || item.longName || item.shortName || 'Unknown',
      price: item.regularMarketPrice || 0,
      change: item.regularMarketChange || 0,
      changePercent: item.regularMarketChangePercent || 0,
      volume: item.regularMarketVolume || 0
    }));
    
    return transformedData.sort((a, b) => b.changePercent - a.changePercent);
  };

  // Use React Query to fetch and manage stock data only if a valid key is provided
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['stockData'],
    queryFn: fetchStockData,
    enabled: hasValidApiKey,
    retry: 1,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  // Update stock data when the query succeeds
  useEffect(() => {
    if (data && data.length > 0) {
      setStockData(data);
      setLastUpdated(new Date());
    }
  }, [data]);

  // Handle manual refresh
  const handleRefresh = () => {
    if (!hasValidApiKey) {
      toast({
        title: "Live Feed Currently Inactive",
        description: "Live market streaming is not configured. Please contact an advisor for real-time market insights.",
      });
      return;
    }

    refetch();
    toast({
      title: "Refreshing stock data",
      description: "Fetching the latest stock prices..."
    });
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <div 
          className={cn(
            "max-w-3xl mx-auto text-center mb-12 opacity-0 translate-y-8 transition-all duration-700",
            isVisible && "opacity-100 translate-y-0"
          )}
        >
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Market Insights
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Tracked Market Equities
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Monitor key Indian bluechip securities across BSE and NSE to plan strategic investment allocations.
          </p>
          <div className="mt-2 text-sm text-gray-500 flex items-center justify-center gap-3">
            <span>
              {hasValidApiKey ? `Last updated: ${lastUpdated.toLocaleTimeString()}` : "Status: Feed Inactive (Advisory Mode)"}
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              <RefreshCw className={cn("h-3 w-3", isLoading && "animate-spin")} />
              Refresh
            </Button>
          </div>
        </div>
        
        <div 
          ref={ref}
          className={cn(
            "max-w-5xl mx-auto relative bg-white dark:bg-gray-950 rounded-xl shadow-md border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-700 opacity-0 translate-y-8",
            isVisible && "opacity-100 translate-y-0"
          )}
        >
          {isLoading && (
            <div className="absolute inset-0 bg-white/80 dark:bg-black/80 flex items-center justify-center z-10">
              <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            </div>
          )}
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 dark:bg-gray-900">
                  <TableHead className="text-left">Symbol</TableHead>
                  <TableHead className="text-left">Company</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Change</TableHead>
                  <TableHead className="text-right">% Change</TableHead>
                  <TableHead className="text-right">Volume</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                {hasValidApiKey && data && data.length > 0 ? (
                  stockData.map((stock) => (
                    <TableRow key={stock.symbol} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                      <TableCell className="font-medium">
                        {stock.symbol}
                      </TableCell>
                      <TableCell className="text-gray-600 dark:text-gray-300">
                        {stock.companyName}
                      </TableCell>
                      <TableCell className="text-right text-gray-900 dark:text-white">
                        ₹{stock.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                      </TableCell>
                      <TableCell className={`text-right ${
                        stock.change >= 0 
                          ? 'text-green-600 dark:text-green-400' 
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        <span className="flex items-center justify-end">
                          {stock.change >= 0 ? (
                            <ArrowUp className="w-3 h-3 mr-1" />
                          ) : (
                            <ArrowDown className="w-3 h-3 mr-1" />
                          )}
                          {Math.abs(stock.change).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </span>
                      </TableCell>
                      <TableCell className={`text-right ${
                        stock.changePercent >= 0 
                          ? 'text-green-600 dark:text-green-400' 
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                      </TableCell>
                      <TableCell className="text-right text-gray-600 dark:text-gray-300">
                        {stock.volume.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  STOCK_SYMBOLS.map((sym) => {
                    const cleanSym = sym.replace('.NS', '');
                    const compName = COMPANY_NAMES[sym] || cleanSym;
                    return (
                      <TableRow key={cleanSym} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                        <TableCell className="font-medium text-gray-900 dark:text-white">
                          {cleanSym}
                        </TableCell>
                        <TableCell className="text-gray-600 dark:text-gray-300">
                          {compName}
                        </TableCell>
                        <TableCell className="text-right text-gray-400 dark:text-gray-500">
                          —
                        </TableCell>
                        <TableCell className="text-right text-gray-400 dark:text-gray-500">
                          —
                        </TableCell>
                        <TableCell className="text-right text-gray-400 dark:text-gray-500">
                          —
                        </TableCell>
                        <TableCell className="text-right text-gray-400 dark:text-gray-500">
                          —
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-900 px-6 py-3 text-sm text-gray-500 dark:text-gray-400 text-center">
            {hasValidApiKey ? (
              "Data provided via Market API. Prices shown may be delayed."
            ) : (
              "Live market feed is currently offline. Connect with our certified advisors for current equity quotes and personalized portfolio analysis."
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
