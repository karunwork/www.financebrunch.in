
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Building2, Briefcase } from "lucide-react";

export type TaxpayerType = 
  | "individual" 
  | "nri" 
  | "startup" 
  | "llp" 
  | "msme" 
  | "company" 
  | "professional";

interface TaxpayerTypeSelectorProps {
  value: TaxpayerType;
  onValueChange: (value: TaxpayerType) => void;
  countryCode: string;
}

const TaxpayerTypeSelector: React.FC<TaxpayerTypeSelectorProps> = ({ 
  value, 
  onValueChange,
  countryCode
}) => {
  // Different taxpayer types based on country
  const renderOptions = () => {
    switch(countryCode) {
      case "india":
        return (
          <>
            <SelectItem value="individual">Individual</SelectItem>
            <SelectItem value="nri">Non-Resident Indian (NRI)</SelectItem>
            <SelectItem value="professional">Professional/Freelancer</SelectItem>
            <SelectItem value="startup">Startup</SelectItem>
            <SelectItem value="llp">Limited Liability Partnership (LLP)</SelectItem>
            <SelectItem value="msme">MSME</SelectItem>
            <SelectItem value="company">Company</SelectItem>
          </>
        );
      case "usa":
        return (
          <>
            <SelectItem value="individual">Individual</SelectItem>
            <SelectItem value="professional">Self-Employed</SelectItem>
            <SelectItem value="company">Corporation</SelectItem>
            <SelectItem value="llp">LLC/Partnership</SelectItem>
          </>
        );
      case "uk":
        return (
          <>
            <SelectItem value="individual">Individual</SelectItem>
            <SelectItem value="professional">Self-Employed</SelectItem>
            <SelectItem value="company">Limited Company</SelectItem>
            <SelectItem value="llp">Partnership/LLP</SelectItem>
          </>
        );
      case "germany":
        return (
          <>
            <SelectItem value="individual">Individual</SelectItem>
            <SelectItem value="professional">Freelancer</SelectItem>
            <SelectItem value="company">GmbH (Limited Company)</SelectItem>
            <SelectItem value="llp">Partnership</SelectItem>
          </>
        );
      case "australia":
        return (
          <>
            <SelectItem value="individual">Individual</SelectItem>
            <SelectItem value="professional">Sole Trader</SelectItem>
            <SelectItem value="company">Company</SelectItem>
            <SelectItem value="llp">Partnership</SelectItem>
          </>
        );
      case "singapore":
        return (
          <>
            <SelectItem value="individual">Individual</SelectItem>
            <SelectItem value="professional">Self-Employed</SelectItem>
            <SelectItem value="company">Private Limited Company</SelectItem>
          </>
        );
      case "malaysia":
        return (
          <>
            <SelectItem value="individual">Individual</SelectItem>
            <SelectItem value="professional">Self-Employed</SelectItem>
            <SelectItem value="company">Sdn Bhd (Private Limited)</SelectItem>
          </>
        );
      case "uae":
      case "qatar":
        return (
          <>
            <SelectItem value="individual">Individual</SelectItem>
            <SelectItem value="professional">Freelancer</SelectItem>
            <SelectItem value="company">Company</SelectItem>
          </>
        );
      case "canada":
        return (
          <>
            <SelectItem value="individual">Individual</SelectItem>
            <SelectItem value="professional">Self-Employed</SelectItem>
            <SelectItem value="company">Corporation</SelectItem>
            <SelectItem value="llp">Partnership</SelectItem>
          </>
        );
      default:
        return (
          <>
            <SelectItem value="individual">Individual</SelectItem>
            <SelectItem value="professional">Self-Employed/Freelancer</SelectItem>
            <SelectItem value="company">Company/Business</SelectItem>
          </>
        );
    }
  };

  // Choose the right icon based on taxpayer type
  const getTypeIcon = () => {
    switch(value) {
      case "individual":
      case "nri":
        return <Users className="mr-2 h-4 w-4 text-blue-600" />;
      case "professional":
        return <Briefcase className="mr-2 h-4 w-4 text-blue-600" />;
      default:
        return <Building2 className="mr-2 h-4 w-4 text-blue-600" />;
    }
  };

  return (
    <div className="flex-1 min-w-[250px]">
      <Label htmlFor="taxpayer-type" className="mb-2 block">Taxpayer Type</Label>
      <Select value={value} onValueChange={onValueChange as (value: string) => void}>
        <SelectTrigger id="taxpayer-type" className="flex items-center">
          {getTypeIcon()}
          <SelectValue placeholder="Select Taxpayer Type" />
        </SelectTrigger>
        <SelectContent>
          {renderOptions()}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TaxpayerTypeSelector;
