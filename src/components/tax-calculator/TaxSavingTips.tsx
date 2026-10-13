
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TaxRegime, DeductionsType } from "./utils/taxTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LightbulbIcon, Landmark, BarChart4, PiggyBank, HeartPulse, Briefcase } from "lucide-react";
import { TaxpayerType } from "./TaxpayerTypeSelector";

interface TaxSavingTipsProps {
  regime: TaxRegime;
  income?: number;
  deductions?: DeductionsType;
  taxpayerType?: TaxpayerType;
}

const TaxSavingTips: React.FC<TaxSavingTipsProps> = ({ regime }) => {
  return (
    <Card className="border-t-4 border-t-yellow-500">
      <CardHeader className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20">
        <CardTitle className="flex items-center">
          <LightbulbIcon className="h-5 w-5 text-yellow-600 mr-2" />
          Tax Saving Tips
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <Accordion type="single" collapsible className="w-full">
          {regime === "old" ? (
            <>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-base">
                  <div className="flex items-center">
                    <PiggyBank className="h-5 w-5 text-blue-600 mr-2" />
                    Maximize Section 80C Investments
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-sm space-y-2">
                  <p>
                    You can save up to ₹46,800 in taxes by utilizing the full ₹1,50,000 deduction under Section 80C. Consider investing in:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Public Provident Fund (PPF)</li>
                    <li>Equity Linked Savings Scheme (ELSS)</li>
                    <li>National Pension System (NPS)</li>
                    <li>Tax Saving Fixed Deposits</li>
                    <li>Life Insurance Premiums</li>
                    <li>Sukanya Samriddhi Account</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-base">
                  <div className="flex items-center">
                    <HeartPulse className="h-5 w-5 text-blue-600 mr-2" />
                    Health Insurance Premium (Section 80D)
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-sm space-y-2">
                  <p>
                    Invest in health insurance to claim deductions under Section 80D:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Up to ₹25,000 for self, spouse, and children</li>
                    <li>Additional ₹25,000 for parents below 60 years</li>
                    <li>Additional ₹50,000 for senior citizen parents</li>
                    <li>Total deduction can go up to ₹75,000 if both you and your parents are senior citizens</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-base">
                  <div className="flex items-center">
                    <Landmark className="h-5 w-5 text-blue-600 mr-2" />
                    Home Loan Benefits
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-sm space-y-2">
                  <p>
                    Maximize your tax benefits on home loans:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Claim up to ₹2,00,000 deduction on home loan interest under Section 24</li>
                    <li>Principal repayment qualifies for deduction under Section 80C (within the overall limit of ₹1,50,000)</li>
                    <li>First-time homebuyers can claim additional deduction of ₹50,000 under Section 80EE if loan amount is less than ₹35 lakhs</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-base">
                  <div className="flex items-center">
                    <BarChart4 className="h-5 w-5 text-blue-600 mr-2" />
                    Additional NPS Investment
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-sm space-y-2">
                  <p>
                    Invest in National Pension System (NPS) for additional tax benefits:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Extra ₹50,000 deduction under Section 80CCD(1B), over and above the ₹1,50,000 limit of Section 80C</li>
                    <li>Employer's contribution up to 10% of salary (Basic + DA) is deductible under Section 80CCD(2)</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-base">
                  <div className="flex items-center">
                    <Briefcase className="h-5 w-5 text-blue-600 mr-2" />
                    Optimize Your Salary Structure
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-sm space-y-2">
                  <p>
                    Restructure your salary components to maximize tax-free allowances:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>House Rent Allowance (HRA) if you live in rented accommodation</li>
                    <li>Leave Travel Allowance (LTA) for domestic travel</li>
                    <li>Medical reimbursement through employer</li>
                    <li>Food coupons and meal vouchers</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </>
          ) : (
            <>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-base">
                  <div className="flex items-center">
                    <BarChart4 className="h-5 w-5 text-blue-600 mr-2" />
                    New Regime Strategy
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-sm space-y-2">
                  <p>
                    Under the New Tax Regime, most deductions and exemptions aren't available. Focus on these strategies:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Compare both tax regimes annually to determine which is more beneficial</li>
                    <li>Consider investments for long-term financial goals rather than tax saving</li>
                    <li>Focus on growth-oriented investments instead of tax-saving instruments</li>
                    <li>You can still claim the standard deduction of ₹50,000</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-base">
                  <div className="flex items-center">
                    <HeartPulse className="h-5 w-5 text-blue-600 mr-2" />
                    Don't Ignore Health Insurance
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-sm space-y-2">
                  <p>
                    Even though you can't claim tax deductions under the New Regime, health insurance is still essential:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Purchase adequate health coverage for yourself and family</li>
                    <li>Consider a critical illness policy for additional protection</li>
                    <li>Review and update your coverage annually based on healthcare inflation</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-base">
                  <div className="flex items-center">
                    <PiggyBank className="h-5 w-5 text-blue-600 mr-2" />
                    Financial Planning Beyond Tax Saving
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-sm space-y-2">
                  <p>
                    Focus on holistic financial planning rather than just tax optimization:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Create an emergency fund of 6-12 months of expenses</li>
                    <li>Invest for long-term goals through diversified equity mutual funds</li>
                    <li>Consider debt instruments for short to medium-term goals</li>
                    <li>Plan for retirement through a mix of equity, debt, and NPS</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-base">
                  <div className="flex items-center">
                    <Briefcase className="h-5 w-5 text-blue-600 mr-2" />
                    When to Switch Regimes
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-sm space-y-2">
                  <p>
                    Consider switching to the Old Regime if:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>You have substantial eligible investments under Section 80C</li>
                    <li>You pay significant home loan interest</li>
                    <li>You have considerable eligible exemptions like HRA</li>
                    <li>Your total deductions exceed ₹3,00,000</li>
                  </ul>
                  <p className="mt-2">
                    Salaried individuals can choose regimes each year, while businesses must stick with their choice for some years.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </>
          )}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default TaxSavingTips;
