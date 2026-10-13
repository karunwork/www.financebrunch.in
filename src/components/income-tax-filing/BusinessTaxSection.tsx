
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FileText, Calculator, BookOpen } from "lucide-react";

const BusinessTaxSection: React.FC = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Business Tax Filing Solutions
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Comprehensive tax services for businesses of all sizes, from startups to established enterprises.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5 text-blue-500" />
                Income Tax Returns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>ITR 3, 4, 5, 6, and 7 filing for different business entities</li>
                <li>Comprehensive income and expense analysis</li>
                <li>Tax planning and liability optimization</li>
                <li>Compliance with latest tax regulations</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="mr-2 h-5 w-5 text-blue-500" />
                GST Filing & Compliance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>GSTR-1, GSTR-3B, and other GST returns</li>
                <li>Input tax credit reconciliation</li>
                <li>E-way bill generation and management</li>
                <li>GST audit assistance</li>
                <li>Resolution of GST notices</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-blue-500" />
                TDS/TCS Compliance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Quarterly TDS/TCS return filing</li>
                <li>Form 16/16A generation</li>
                <li>Lower TDS certificate application</li>
                <li>TDS/TCS payment calculation</li>
                <li>Correction statements filing</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-12">
          <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg">Tax Benefits for MSMEs and Startups</AccordionTrigger>
              <AccordionContent className="space-y-4">
                <p>The government offers various tax benefits to promote small businesses:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Section 44AD: Presumptive taxation scheme for small businesses with turnover up to ₹2 crore</li>
                  <li>Section 80IAC: Tax holiday for eligible startups for 3 out of 10 years</li>
                  <li>Section 35AD: Investment-linked deduction for specified businesses</li>
                  <li>Section 35(2AB): Weighted deduction for R&D expenditure</li>
                  <li>Lower corporate tax rate of 25% for companies with turnover up to ₹400 crore</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg">Corporate Tax Rates for FY 2024-25</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Domestic Companies:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Regular Tax Regime: 30% (25% for companies with turnover up to ₹400 crore)</li>
                      <li>Section 115BAA: 22% flat rate (with certain conditions)</li>
                      <li>Section 115BAB: 15% for new manufacturing companies</li>
                      <li>Plus applicable surcharge and cess</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Foreign Companies:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>40% plus applicable surcharge and cess</li>
                      <li>Modified by DTAA provisions where applicable</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg">Advance Tax Payment Schedule</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p>For all assesses (except those covered under 44AD):</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>By June 15: At least 15% of advance tax</li>
                    <li>By September 15: At least 45% of advance tax</li>
                    <li>By December 15: At least 75% of advance tax</li>
                    <li>By March 15: 100% of advance tax</li>
                  </ul>
                  <p>Interest under section 234B and 234C applies for default in payment of advance tax.</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default BusinessTaxSection;
