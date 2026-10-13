
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calculator, IndianRupee } from "lucide-react";
import { DeductionsType } from "./utils/taxTypes";

interface DeductionsFormProps {
  deductions: DeductionsType;
  handleDeductionChange: (key: string, value: string) => void;
  handleCalculate: () => void;
  goToBasicDetails: () => void;
}

const DeductionsForm: React.FC<DeductionsFormProps> = ({
  deductions,
  handleDeductionChange,
  handleCalculate,
  goToBasicDetails
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <Label htmlFor="section80C" className="mb-2 block">
            Section 80C Investments (Max ₹1,50,000)
          </Label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              id="section80C"
              type="number"
              min="0"
              max="150000"
              placeholder="PPF, ELSS, LIC, etc."
              className="pl-10"
              value={deductions.section80C === 0 ? "" : deductions.section80C}
              onChange={(e) => handleDeductionChange("section80C", e.target.value)}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            PPF, ELSS, Life Insurance Premium, NSC, etc.
          </p>
        </div>
        
        <div>
          <Label htmlFor="section80D" className="mb-2 block">
            Section 80D Health Insurance (Max ₹25,000 / ₹50,000)
          </Label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              id="section80D"
              type="number"
              min="0"
              placeholder="Health Insurance Premium"
              className="pl-10"
              value={deductions.section80D === 0 ? "" : deductions.section80D}
              onChange={(e) => handleDeductionChange("section80D", e.target.value)}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Medical insurance for self, spouse, children and parents
          </p>
        </div>
        
        <div>
          <Label htmlFor="housingLoanInterest" className="mb-2 block">
            Housing Loan Interest (Max ₹2,00,000)
          </Label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              id="housingLoanInterest"
              type="number"
              min="0"
              max="200000"
              placeholder="Interest on Home Loan"
              className="pl-10"
              value={deductions.housingLoanInterest === 0 ? "" : deductions.housingLoanInterest}
              onChange={(e) => handleDeductionChange("housingLoanInterest", e.target.value)}
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="nps" className="mb-2 block">
            NPS Contribution (Max ₹50,000)
          </Label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              id="nps"
              type="number"
              min="0"
              max="50000"
              placeholder="Additional NPS contribution"
              className="pl-10"
              value={deductions.nps === 0 ? "" : deductions.nps}
              onChange={(e) => handleDeductionChange("nps", e.target.value)}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Additional deduction for NPS under Section 80CCD(1B)
          </p>
        </div>
        
        <div>
          <Label htmlFor="hra" className="mb-2 block">
            HRA Exemption
          </Label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              id="hra"
              type="number"
              min="0"
              placeholder="HRA Exemption Amount"
              className="pl-10"
              value={deductions.hra === 0 ? "" : deductions.hra}
              onChange={(e) => handleDeductionChange("hra", e.target.value)}
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="lta" className="mb-2 block">
            LTA Exemption
          </Label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              id="lta"
              type="number"
              min="0"
              placeholder="LTA Exemption Amount"
              className="pl-10"
              value={deductions.lta === 0 ? "" : deductions.lta}
              onChange={(e) => handleDeductionChange("lta", e.target.value)}
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="section80E" className="mb-2 block">
            Section 80E Education Loan Interest
          </Label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              id="section80E"
              type="number"
              min="0"
              placeholder="Education Loan Interest"
              className="pl-10"
              value={deductions.section80E === 0 ? "" : deductions.section80E}
              onChange={(e) => handleDeductionChange("section80E", e.target.value)}
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="otherDeductions" className="mb-2 block">
            Other Deductions
          </Label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              id="otherDeductions"
              type="number"
              min="0"
              placeholder="Other Eligible Deductions"
              className="pl-10"
              value={deductions.otherDeductions === 0 ? "" : deductions.otherDeductions}
              onChange={(e) => handleDeductionChange("otherDeductions", e.target.value)}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Other eligible deductions like 80G, 80GG, etc.
          </p>
        </div>
      </div>
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={goToBasicDetails}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={handleCalculate}>
          Calculate Tax <Calculator className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default DeductionsForm;
