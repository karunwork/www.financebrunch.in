import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, MapPin } from "lucide-react";

export type CountryCode = 
  | "india" 
  | "usa" 
  | "canada" 
  | "australia" 
  | "uae" 
  | "qatar" 
  | "singapore" 
  | "malaysia" 
  | "uk" 
  | "germany";

export type StateCode = string;

interface CountrySelectorProps {
  value: CountryCode;
  onValueChange: (value: CountryCode) => void;
  stateValue?: StateCode;
  onStateValueChange?: (value: StateCode) => void;
}

// States/Provinces for applicable countries
export const countryStates: Record<CountryCode, { code: string; name: string; }[]> = {
  usa: [
    { code: "default", name: "Federal Only" },
    { code: "ca", name: "California" },
    { code: "ny", name: "New York" },
    { code: "tx", name: "Texas" },
    { code: "fl", name: "Florida" },
    { code: "il", name: "Illinois" },
  ],
  canada: [
    { code: "default", name: "Federal Only" },
    { code: "on", name: "Ontario" },
    { code: "qc", name: "Quebec" },
    { code: "bc", name: "British Columbia" },
    { code: "ab", name: "Alberta" },
  ],
  australia: [
    { code: "default", name: "Federal Only" },
    { code: "nsw", name: "New South Wales" },
    { code: "vic", name: "Victoria" },
    { code: "qld", name: "Queensland" },
  ],
  india: [
    { code: "default", name: "All India (Standard)" },
  ],
  germany: [
    { code: "default", name: "All Germany (Standard)" },
  ],
  uk: [
    { code: "default", name: "All UK (Standard)" },
    { code: "sco", name: "Scotland" },
    { code: "wal", name: "Wales" },
  ],
  singapore: [
    { code: "default", name: "Singapore (Standard)" },
  ],
  malaysia: [
    { code: "default", name: "Malaysia (Standard)" },
  ],
  uae: [
    { code: "default", name: "UAE (Standard)" },
    { code: "dubai", name: "Dubai" },
    { code: "abudhabi", name: "Abu Dhabi" },
  ],
  qatar: [
    { code: "default", name: "Qatar (Standard)" },
  ],
};

// Determine if a country has state/province tax variations
export const hasStateTaxes = (country: CountryCode): boolean => {
  return countryStates[country]?.length > 1;
};

const CountrySelector: React.FC<CountrySelectorProps> = ({ 
  value, 
  onValueChange,
  stateValue,
  onStateValueChange
}) => {
  const [showStateSelector, setShowStateSelector] = useState(false);
  
  useEffect(() => {
    setShowStateSelector(hasStateTaxes(value));
    // Set default state when changing country
    if (onStateValueChange) {
      onStateValueChange("default");
    }
  }, [value, onStateValueChange]);
  
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="flex-1 min-w-[250px]">
        <Label htmlFor="country" className="mb-2 block">Country</Label>
        <Select value={value} onValueChange={onValueChange as (value: string) => void}>
          <SelectTrigger id="country" className="flex items-center">
            <Globe className="mr-2 h-4 w-4 text-blue-600" />
            <SelectValue placeholder="Select Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="india">India</SelectItem>
            <SelectItem value="usa">United States</SelectItem>
            <SelectItem value="canada">Canada</SelectItem>
            <SelectItem value="australia">Australia</SelectItem>
            <SelectItem value="uae">UAE</SelectItem>
            <SelectItem value="qatar">Qatar</SelectItem>
            <SelectItem value="singapore">Singapore</SelectItem>
            <SelectItem value="malaysia">Malaysia</SelectItem>
            <SelectItem value="uk">United Kingdom</SelectItem>
            <SelectItem value="germany">Germany</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {showStateSelector && onStateValueChange && (
        <div className="flex-1 min-w-[250px]">
          <Label htmlFor="state" className="mb-2 block">State/Province</Label>
          <Select 
            value={stateValue || "default"} 
            onValueChange={onStateValueChange as (value: string) => void}
          >
            <SelectTrigger id="state" className="flex items-center">
              <MapPin className="mr-2 h-4 w-4 text-blue-600" />
              <SelectValue placeholder="Select State/Province" />
            </SelectTrigger>
            <SelectContent>
              {countryStates[value].map((state) => (
                <SelectItem key={state.code} value={state.code}>
                  {state.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default CountrySelector;
