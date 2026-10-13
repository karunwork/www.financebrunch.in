
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import ExchangeInfoPopup from "./ExchangeInfoPopup";
import exchangesData from "../../data/exchangesData";

interface ExchangeCardProps {
  id: string;
  name: string;
  description: string;
  onClick: () => void;
}

const ExchangeCard = ({ id, name, description, onClick }: ExchangeCardProps) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center hover:border-indigo-100 transition-all">
    <div>
      <h3 className="font-semibold text-gray-900">{name}</h3>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
    </div>
    <button 
      onClick={onClick}
      className="flex items-center justify-center rounded-full w-8 h-8 text-indigo-600 hover:bg-indigo-50 transition-colors"
      aria-label={`Learn more about ${name}`}
    >
      <ArrowRight size={18} />
    </button>
  </div>
);

const NotableExchanges = () => {
  const [selectedExchange, setSelectedExchange] = useState<string | null>(null);

  const handleOpenExchange = (exchangeId: string) => {
    setSelectedExchange(exchangeId);
  };

  const handleCloseExchange = () => {
    setSelectedExchange(null);
  };

  return (
    <section className="py-8 bg-blue-50/50 rounded-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-6">
          <div className="mr-3 text-blue-800">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Other Notable Indian Exchanges</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(exchangesData).map(([key, exchange]) => (
            <ExchangeCard
              key={key}
              id={exchange.id}
              name={exchange.name}
              description={exchange.shortDescription}
              onClick={() => handleOpenExchange(key)}
            />
          ))}
        </div>

        {selectedExchange && exchangesData[selectedExchange] && (
          <ExchangeInfoPopup
            isOpen={!!selectedExchange}
            onClose={handleCloseExchange}
            exchange={exchangesData[selectedExchange]}
          />
        )}
      </div>
    </section>
  );
};

export default NotableExchanges;
