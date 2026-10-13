
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

interface ExchangeInfoPopupProps {
  isOpen: boolean;
  onClose: () => void;
  exchange: {
    name: string;
    description: string;
    establishment: string;
    location: string;
    tradingHours: string;
    majorIndices?: string[];
    keyFeatures: string[];
    regulatoryBody: string;
    marketCap?: string;
    website?: string;
  };
}

const ExchangeInfoPopup = ({ isOpen, onClose, exchange }: ExchangeInfoPopupProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-indigo-700">{exchange.name}</DialogTitle>
          <DialogDescription className="text-gray-600 mt-2">{exchange.description}</DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-indigo-600 mb-2">Key Information</h3>
              <ul className="space-y-2 text-sm">
                <li><span className="font-medium">Established:</span> {exchange.establishment}</li>
                <li><span className="font-medium">Location:</span> {exchange.location}</li>
                <li><span className="font-medium">Trading Hours:</span> {exchange.tradingHours}</li>
                <li><span className="font-medium">Regulatory Body:</span> {exchange.regulatoryBody}</li>
                {exchange.marketCap && <li><span className="font-medium">Market Capitalization:</span> {exchange.marketCap}</li>}
                {exchange.website && (
                  <li>
                    <span className="font-medium">Official Website:</span>{" "}
                    <a 
                      href={exchange.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {exchange.website}
                    </a>
                  </li>
                )}
              </ul>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-indigo-600 mb-2">Key Features</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {exchange.keyFeatures.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            
            {exchange.majorIndices && exchange.majorIndices.length > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-indigo-600 mb-2">Major Indices</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {exchange.majorIndices.map((index, i) => (
                    <li key={i}>{index}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            onClick={onClose}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700"
          >
            I understand
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExchangeInfoPopup;
