
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Building2, Briefcase } from "lucide-react";

export type TaxpayerType = 
  | "individual" 
  | "nri" 
  | "professional" 
  | "startup";

export interface TaxpayerOption {
  value: TaxpayerType;
  label: string;
}

export const ALLOWED_TAXPAYER_OPTIONS: TaxpayerOption[] = [
  { value: "individual", label: "Individual" },
  { value: "nri", label: "Non-Resident Indian (NRI)" },
  { value: "professional", label: "Professional/Freelancer" },
  { value: "startup", label: "Startup" },
];

interface TaxpayerTypeSelectorProps {
  value: TaxpayerType;
  onValueChange: (value: TaxpayerType) => void;
  countryCode: string;
}

const TaxpayerTypeSelector: React.FC<TaxpayerTypeSelectorProps> = ({ 
  value, 
  onValueChange,
}) => {
  // Choose the right icon based on taxpayer type
  const getTypeIcon = () => {
    switch(value) {
      case "individual":
      case "nri":
        return <Users className="mr-2 h-4 w-4 text-blue-600" />;
      case "professional":
        return <Briefcase className="mr-2 h-4 w-4 text-blue-600" />;
      case "startup":
      default:
        return <Building2 className="mr-2 h-4 w-4 text-blue-600" />;
    }
  };

  const handleValueChange = (val: string) => {
    const match = ALLOWED_TAXPAYER_OPTIONS.find(opt => opt.value === val);
    if (match) {
      onValueChange(match.value);
    } else {
      onValueChange("individual");
    }
  };

  // Safe selected value: ensure only one of the 4 allowed types is selected
  const safeValue: TaxpayerType = ALLOWED_TAXPAYER_OPTIONS.some(opt => opt.value === value)
    ? value
    : "individual";

  return (
    <div className="flex-1 min-w-[250px]">
      <Label htmlFor="taxpayer-type" className="mb-2 block">Taxpayer Type</Label>
      <Select value={safeValue} onValueChange={handleValueChange}>
        <SelectTrigger id="taxpayer-type" className="flex items-center">
          {getTypeIcon()}
          <SelectValue placeholder="Select Taxpayer Type" />
        </SelectTrigger>
        <SelectContent>
          {ALLOWED_TAXPAYER_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TaxpayerTypeSelector;
