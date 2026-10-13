
import { TrendingUp, AlertCircle, AlertTriangle, DollarSign, Calendar } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

interface UpcomingIPOCardProps {
  ipo: {
    name: string;
    sector: string;
    priceRange: string;
    subscriptionDates: string;
    rating: string;
    description: string;
    logoColor: string;
  };
}

export const UpcomingIPOCard = ({ ipo }: UpcomingIPOCardProps) => {
  const getRatingColor = (rating: string) => {
    switch(rating) {
      case "Subscribe": return "text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400";
      case "Subscribe with Caution": return "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "Avoid": return "text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400";
      default: return "text-gray-600 bg-gray-50 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  return (
    <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="h-2 bg-gradient-to-r from-indigo-500 to-blue-500"></div>
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className={`w-12 h-12 rounded-lg ${ipo.logoColor} flex items-center justify-center text-white font-bold text-xl mr-4`}>
              {ipo.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-semibold">{ipo.name}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{ipo.sector}</p>
            </div>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {ipo.description}
          </p>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-start">
              <DollarSign className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Price Range</p>
                <p className="text-gray-600 dark:text-gray-400">{ipo.priceRange}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Calendar className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Subscription Dates</p>
                <p className="text-gray-600 dark:text-gray-400">{ipo.subscriptionDates}</p>
              </div>
            </div>
          </div>
          
          <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getRatingColor(ipo.rating)}`}>
            {ipo.rating === "Subscribe" && <TrendingUp className="inline-block h-4 w-4 mr-1" />}
            {ipo.rating === "Subscribe with Caution" && <AlertCircle className="inline-block h-4 w-4 mr-1" />}
            {ipo.rating === "Avoid" && <AlertTriangle className="inline-block h-4 w-4 mr-1" />}
            {ipo.rating}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
