
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Shield, CheckCircle, Info } from 'lucide-react';

interface TaxFreeCountryInfoProps {
  countryName: string;
}

const TaxFreeCountryInfo: React.FC<TaxFreeCountryInfoProps> = ({ countryName }) => {
  return (
    <Card className="mt-6 border-green-200 bg-green-50">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-green-600" />
          <CardTitle className="text-lg text-green-700">Tax-Free Country</CardTitle>
        </div>
        <CardDescription className="text-green-700">
          {countryName} is a tax-free jurisdiction for personal income tax.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
            <p className="text-sm text-green-700">Residents in {countryName} don't pay personal income tax on their earnings.</p>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
            <p className="text-sm text-green-700">This makes {countryName} an attractive destination for expatriates and high-net-worth individuals.</p>
          </div>
          <div className="flex items-start gap-2">
            <Info className="h-5 w-5 text-amber-600 mt-0.5" />
            <p className="text-sm text-amber-700">Note: While there is no personal income tax, there may be other taxes or fees that apply depending on your situation.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaxFreeCountryInfo;
