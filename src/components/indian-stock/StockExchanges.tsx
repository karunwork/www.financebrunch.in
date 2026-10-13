
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, Users, Building, BarChart, Globe, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function StockExchanges() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-4">
            Trading Venues
          </span>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Indian Stock Exchanges
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            India's primary trading platforms that facilitate securities transactions between buyers and sellers
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* BSE Card */}
          <ExchangeCard 
            name="Bombay Stock Exchange (BSE)"
            logo="https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/BSE_LOGO.svg/640px-BSE_LOGO.svg.png"
            image="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
            founded="1875"
            headquarters="Mumbai, Maharashtra"
            primaryIndex="S&P BSE SENSEX"
            marketCap="$3.2+ trillion"
            listedCompanies="5,000+"
            tradingHours="9:15 AM - 3:30 PM"
            website="https://www.bseindia.com"
            color="blue"
            description="The Bombay Stock Exchange is Asia's oldest stock exchange and the world's 10th largest stock exchange by market capitalization. Located at Dalal Street, Mumbai, it has played a crucial role in the growth of the Indian corporate sector by providing an efficient capital-raising platform."
            isOldest={true}
            delay={0.1}
          />
          
          {/* NSE Card */}
          <ExchangeCard 
            name="National Stock Exchange (NSE)"
            logo="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/NSE_Logo.svg/1200px-NSE_Logo.svg.png"
            image="https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            founded="1992"
            headquarters="Mumbai, Maharashtra"
            primaryIndex="NIFTY 50"
            marketCap="$3.1+ trillion"
            listedCompanies="2,000+"
            tradingHours="9:15 AM - 3:30 PM"
            website="https://www.nseindia.com"
            color="indigo"
            description="The National Stock Exchange is India's leading stock exchange and one of the largest in the world by trading volume. Founded in 1992, it introduced electronic trading in India and revolutionized the Indian capital markets with transparent and efficient transaction processes."
            isOldest={false}
            delay={0.3}
          />
        </div>
        
        <motion.div 
          className="mt-16 max-w-3xl mx-auto bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800/50 dark:to-blue-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-900/50 shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
            <Globe className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
            Other Notable Indian Exchanges
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <OtherExchangeItem
              name="Metropolitan Stock Exchange of India (MSE)"
              type="Equity & Derivatives"
              location="Mumbai"
            />
            
            <OtherExchangeItem
              name="India International Exchange (INX)"
              type="International Exchange"
              location="GIFT City, Gujarat"
            />
            
            <OtherExchangeItem
              name="NSE IFSC"
              type="International Exchange"
              location="GIFT City, Gujarat"
            />
            
            <OtherExchangeItem
              name="Multi Commodity Exchange (MCX)"
              type="Commodity Exchange"
              location="Mumbai"
            />
            
            <OtherExchangeItem
              name="National Commodity & Derivatives Exchange (NCDEX)"
              type="Agricultural Commodities"
              location="Mumbai"
            />
            
            <OtherExchangeItem
              name="Calcutta Stock Exchange (CSE)"
              type="Regional Stock Exchange"
              location="Kolkata"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ExchangeCard({ name, logo, image, founded, headquarters, primaryIndex, marketCap, listedCompanies, tradingHours, website, color, description, isOldest, delay }) {
  const colorStyles = {
    blue: {
      badge: "bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300",
      border: "border-blue-200 dark:border-blue-900/50",
      shadow: "shadow-blue-100 dark:shadow-blue-900/10",
      text: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-900/20",
      button: "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600",
    },
    indigo: {
      badge: "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300",
      border: "border-indigo-200 dark:border-indigo-900/50",
      shadow: "shadow-indigo-100 dark:shadow-indigo-900/10",
      text: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-50 dark:bg-indigo-900/20",
      button: "bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600",
    }
  };

  return (
    <motion.div 
      className={`rounded-2xl overflow-hidden bg-white dark:bg-gray-800 border ${colorStyles[color].border} shadow-xl ${colorStyles[color].shadow}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay }}
    >
      {/* Header with Image */}
      <div className="relative h-60">
        <img 
          src={image} 
          alt={`${name} Building`} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
          <div className="absolute bottom-0 w-full p-6">
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-bold text-white">{name}</h3>
              
              {isOldest && (
                <Badge className="bg-amber-500/90 hover:bg-amber-500/90 text-white">
                  Asia's Oldest
                </Badge>
              )}
            </div>
            
            <p className="text-sm text-gray-300 mt-1">
              Established in {founded}
            </p>
          </div>
        </div>
        
        {/* Logo */}
        <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-800/90 p-2 rounded-lg shadow-lg h-12 w-24 flex items-center justify-center">
          <img 
            src={logo} 
            alt={`${name} Logo`} 
            className="max-h-8 max-w-full object-contain"
          />
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {description}
        </p>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <InfoItem icon={<Calendar className="h-4 w-4" />} label="Founded" value={founded} color={color} />
          <InfoItem icon={<Building className="h-4 w-4" />} label="Location" value={headquarters} color={color} />
          <InfoItem icon={<BarChart className="h-4 w-4" />} label="Main Index" value={primaryIndex} color={color} />
          <InfoItem icon={<Users className="h-4 w-4" />} label="Listed Firms" value={listedCompanies} color={color} />
        </div>
        
        <a 
          href={website} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-block w-full"
        >
          <Button className={`w-full flex items-center justify-center gap-2 ${colorStyles[color].button}`}>
            Visit Official Website
            <ExternalLink className="h-4 w-4" />
          </Button>
        </a>
      </div>
    </motion.div>
  );
}

function InfoItem({ icon, label, value, color }) {
  const colorStyles = {
    blue: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20",
    indigo: "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20",
  };

  return (
    <div className="flex flex-col">
      <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</span>
      <div className="flex items-center">
        <div className={`${colorStyles[color]} p-1.5 rounded-md mr-2`}>
          {icon}
        </div>
        <span className="font-medium">{value}</span>
      </div>
    </div>
  );
}

function OtherExchangeItem({ name, type, location }) {
  return (
    <Card className="border-gray-200 dark:border-gray-700 shadow hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-medium text-gray-800 dark:text-gray-200">{name}</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{type} • {location}</p>
          </div>
          <ArrowRight className="h-4 w-4 text-gray-400" />
        </div>
      </CardContent>
    </Card>
  );
}
