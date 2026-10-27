import React from 'react';
import {
  SheetContent,
  SheetHeader,
} from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { 
  ChevronRight, 
  ExternalLink, 
  Shield, 
  Building, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  IndianRupee, 
  Globe
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function FixedDepositSheet() {
  const handleContactClick = () => {
    const whatsAppMessage = encodeURIComponent('Hi Finance Brunch Team, I\'m interested in your Fixed Deposit investment options. Can you share the details of available banks and rates?');
    window.open(`https://wa.me/917842494981?text=${whatsAppMessage}`, '_blank');
  };

  return (
    <SheetContent className="w-full sm:max-w-[100vw] md:max-w-[720px] overflow-y-auto">
      <div className="h-full pb-16">
        {/* Hero Section */}
        <div className="relative w-full h-[300px] overflow-hidden rounded-xl mb-8">
          <img 
            src="/lovable-uploads/b10e7df8-0120-4065-9082-e64035550408.png" 
            alt="Fixed Deposit Investments" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8 w-full">
            <div className="flex items-center mb-4">
              <div className="h-10 w-1 bg-yellow-400 mr-3"></div>
              <h2 className="text-white text-xl font-medium">Secure and Steady Returns</h2>
            </div>
            <h1 className="text-white text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              Fixed Deposit Investments <br />with Finance Brunch
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-2">
          {/* Introduction Section */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Why Choose Fixed Deposits?</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Fixed Deposits offer a safe and secure investment option with guaranteed returns. With interest rates up to 8% 
              and RBI insurance protection of up to ₹5,00,000, FDs remain one of the most reliable investment instruments in India.
            </p>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800 rounded-lg p-4 flex items-start">
              <Shield className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-yellow-800 dark:text-yellow-300">
                Finance Brunch is empaneled with all RBI registered banks including Small Finance Banks (except cooperative societies), 
                providing you access to the best FD rates in the market.
              </p>
            </div>
          </div>

          {/* Bank Types & Rates Section */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Types of Banks & Interest Rates</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="h-2 bg-blue-500"></div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Building className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" />
                    <h3 className="text-xl font-semibold">Public & Private Banks</h3>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="w-32 text-gray-600 dark:text-gray-400">SBI:</span>
                      <span className="font-medium">5.50% - 6.25%</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-32 text-gray-600 dark:text-gray-400">HDFC Bank:</span>
                      <span className="font-medium">5.75% - 6.50%</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-32 text-gray-600 dark:text-gray-400">ICICI Bank:</span>
                      <span className="font-medium">5.75% - 6.70%</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-32 text-gray-600 dark:text-gray-400">Axis Bank:</span>
                      <span className="font-medium">5.75% - 6.75%</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="h-2 bg-green-500"></div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Building className="h-6 w-6 text-green-600 dark:text-green-400 mr-3" />
                    <h3 className="text-xl font-semibold">Small Finance Banks</h3>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <span className="w-32 text-gray-600 dark:text-gray-400">Jana SFB:</span>
                      <span className="font-medium">6.00% - 7.75%</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-32 text-gray-600 dark:text-gray-400">Equitas SFB:</span>
                      <span className="font-medium">6.50% - 8.00%</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-32 text-gray-600 dark:text-gray-400">Suryoday SFB:</span>
                      <span className="font-medium">6.25% - 7.75%</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-32 text-gray-600 dark:text-gray-400">Ujjivan SFB:</span>
                      <span className="font-medium">6.75% - 8.00%</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <IndianRupee className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
                Advantages of Small Finance Banks
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <p>Higher interest rates (up to 8%) compared to traditional banks</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <p>Same RBI insurance protection of up to ₹5,00,000</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <p>Additional interest rate benefits for senior citizens</p>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <p>More flexible terms and tenure options</p>
                </li>
              </ul>
            </div>
          </div>

          {/* NRI-specific section */}
          <div className="mb-10">
            <div className="flex items-center mb-4">
              <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h2 className="text-2xl font-bold">NRI Fixed Deposit Options</h2>
            </div>

            <Card className="mb-6 overflow-hidden border-0 shadow-md">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6">
                <h3 className="font-bold text-xl mb-2">Specialized NRI FD Services</h3>
                <p>Higher returns on your foreign currency with tax advantages</p>
              </div>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">NRE Fixed Deposits</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Tax-free interest and fully repatriable (principal and interest)</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">NRO Fixed Deposits</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">For income earned in India, limited repatriation with tax implications</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">FCNR Deposits</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Foreign Currency Non-Resident deposits in USD, GBP, EUR, etc.</p>
                    </div>
                  </li>
                </ul>
                <div className="mt-6">
                  <Button 
                    category="success"
                    rightIcon={<ExternalLink className="h-4 w-4" />}
                    className="w-full font-semibold"
                    onClick={() => {
                      const message = encodeURIComponent("Hi Finance Brunch Team, I'm an NRI interested in your Fixed Deposit investment options. Can you share the details?");
                      window.open(`https://wa.me/917842494981?text=${message}`, '_blank');
                    }}
                  >
                    Connect with NRI Specialist
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pros and Cons */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-6">Pros and Cons of Fixed Deposits</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-100 dark:border-green-800">
                <h3 className="text-xl font-semibold text-green-800 dark:text-green-400 mb-4">Advantages</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <p>Guaranteed returns with fixed interest rates</p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <p>Capital protection with RBI insurance up to ₹5,00,000</p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <p>Higher interest rates than regular savings accounts</p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <p>Flexible tenure options (7 days to 10 years)</p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <p>Easy loan facility against FD collateral</p>
                  </li>
                </ul>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border border-red-100 dark:border-red-800">
                <h3 className="text-xl font-semibold text-red-800 dark:text-red-400 mb-4">Limitations</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                    <p>Returns may not beat inflation in the long term</p>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                    <p>Premature withdrawal penalties (0.5% to 1%)</p>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                    <p>Interest income is taxable as per income tax slab</p>
                  </li>
                  <li className="flex items-start">
                    <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                    <p>TDS applicable on interest if it exceeds ₹40,000 (₹50,000 for seniors)</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is the minimum investment amount for FDs?</AccordionTrigger>
                <AccordionContent>
                  The minimum investment amount varies from bank to bank, but typically starts from ₹1,000 for regular banks and ₹5,000 for small finance banks. Some premium FD options may require higher minimum investments.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>How does the RBI deposit insurance work?</AccordionTrigger>
                <AccordionContent>
                  The Deposit Insurance and Credit Guarantee Corporation (DICGC), a subsidiary of RBI, provides insurance cover for bank deposits up to ₹5,00,000 per depositor per bank. This covers both principal and interest amounts across all accounts (savings, current, fixed deposits) held in the same capacity in the same bank.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>Are Small Finance Banks safe for FD investments?</AccordionTrigger>
                <AccordionContent>
                  Yes, Small Finance Banks are regulated by the RBI and offer the same deposit insurance protection of up to ₹5,00,000 as any other commercial bank. They often offer higher interest rates to attract deposits, making them an attractive option for investors seeking better returns without compromising on safety.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>What are the tax implications on FD interest?</AccordionTrigger>
                <AccordionContent>
                  Interest earned on Fixed Deposits is fully taxable as per your income tax slab rate. Banks deduct TDS (Tax Deducted at Source) at 10% if the interest earned in a financial year exceeds ₹40,000 (₹50,000 for senior citizens). If your total income is below the taxable limit, you can submit Form 15G/15H to avoid TDS deduction.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>What are the FD options available for NRIs?</AccordionTrigger>
                <AccordionContent>
                  NRIs can invest in NRE (Non-Resident External), NRO (Non-Resident Ordinary), and FCNR (Foreign Currency Non-Resident) fixed deposits. NRE deposits offer tax-free interest and are fully repatriable. NRO deposits are for income earned in India and have restrictions on repatriation. FCNR deposits allow you to deposit money in foreign currencies like USD, GBP, etc.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Disclaimer */}
          <div className="mb-10">
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-lg p-4">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-amber-800 dark:text-amber-400 mb-1">Important Disclaimer</h3>
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    Interest rates mentioned are indicative and subject to change based on bank policies and RBI guidelines. 
                    Please verify the latest rates before making investment decisions. Finance Brunch is empaneled with RBI registered 
                    banks and does not deal with cooperative societies.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12">
            <div className="bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30 rounded-2xl p-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0">
                  <h3 className="text-2xl font-bold mb-2">Ready to secure your savings with high returns?</h3>
                  <p className="text-gray-700 dark:text-gray-300">Get personalized FD recommendations from our experts.</p>
                </div>
                <Button 
                  size="lg" 
                  category="investment"
                  rightIcon={<ExternalLink className="h-4 w-4" />}
                  className="font-semibold shadow-md"
                  onClick={handleContactClick}
                >
                  Get Best FD Rates
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SheetContent>
  );
}
