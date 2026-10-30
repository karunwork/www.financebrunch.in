
import { useState } from "react";
import { AlertTriangle, ExternalLink, CheckCircle, HelpCircle, User } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { ConsultationScheduler } from "./ConsultationScheduler";

interface USAStockPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function USAStockPopup({ open, onOpenChange }: USAStockPopupProps) {
  const [scheduleOpen, setScheduleOpen] = useState(false);
  
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-blue-600 dark:text-blue-400">
              USA Stock Analysis & Investment
            </DialogTitle>
            <DialogDescription>
              Important information for investing in U.S. stocks through our platform
            </DialogDescription>
          </DialogHeader>
          
          <div className="overflow-y-auto pr-1 max-h-[60vh]">
            {/* Caution Note Section */}
            <div className="mb-6 bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-amber-800 dark:text-amber-400 mb-2">
                    Important Regulatory Considerations for Investing in U.S. Stocks
                  </h3>
                  <p className="text-sm text-amber-700 dark:text-amber-300 mb-4">
                    At Finance Brunch Strategies Pvt. Ltd., we ensure full compliance with all regulatory guidelines 
                    while assisting Indian investors in accessing U.S. stock markets. Before proceeding with 
                    international investments, please take note of the following key regulations:
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-amber-800 dark:text-amber-400">1. Reserve Bank of India's Liberalized Remittance Scheme (LRS)</h4>
                      <p className="text-sm text-amber-700 dark:text-amber-300">
                        Under the Liberalized Remittance Scheme (LRS), the Reserve Bank of India (RBI) allows Indian 
                        residents to remit up to $250,000 per financial year for international investments, including 
                        U.S. stocks. Investors must ensure that their remittances comply with LRS guidelines, 
                        including tax implications and reporting requirements.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-amber-800 dark:text-amber-400">2. SEBI Regulations for Investment Advisory Services</h4>
                      <p className="text-sm text-amber-700 dark:text-amber-300">
                        All financial advisory services related to international investments must comply with the 
                        Securities and Exchange Board of India (SEBI) regulations. Clients are advised to invest 
                        through SEBI-registered entities and understand the legal framework governing overseas investments.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-amber-800 dark:text-amber-400">3. Currency Exchange and Market Risks</h4>
                      <p className="text-sm text-amber-700 dark:text-amber-300">
                        Investing in U.S. stocks involves currency conversion from INR to USD, which can impact returns 
                        due to exchange rate fluctuations. Investors should consider forex risks, taxation on capital 
                        gains, and brokerage fees before making investment decisions.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-amber-800 dark:text-amber-400">4. Client Education & Continuous Support</h4>
                      <p className="text-sm text-amber-700 dark:text-amber-300">
                        We believe in empowering our clients with knowledge. Our team provides detailed guidance on 
                        U.S. stock investments, portfolio diversification, tax implications, and risk management 
                        strategies. Whether you're a first-time investor or an experienced trader, we are here to 
                        support you at every step.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-amber-800 dark:text-amber-400">5. Secure & Compliant Investment Process</h4>
                      <p className="text-sm text-amber-700 dark:text-amber-300">
                        To ensure a seamless and compliant investment journey, we work with regulated brokerage 
                        partners that facilitate investments in U.S. markets for Indian clients. Our services 
                        adhere to international financial compliance standards, safeguarding your investments.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-start gap-2">
                    <div className="bg-amber-100 dark:bg-amber-900/40 rounded-full p-1">
                      <CheckCircle className="h-5 w-5 text-amber-600 dark:text-amber-500" />
                    </div>
                    <p className="text-sm font-medium text-amber-800 dark:text-amber-400">
                      For more information or personalized guidance, feel free to connect with our expert team.
                    </p>
                  </div>
                  
                  <div className="mt-2 flex items-start gap-2">
                    <div className="bg-amber-100 dark:bg-amber-900/40 rounded-full p-1">
                      <CheckCircle className="h-5 w-5 text-amber-600 dark:text-amber-500" />
                    </div>
                    <p className="text-sm font-medium text-amber-800 dark:text-amber-400">
                      Diversify your portfolio and explore global investment opportunities with confidence!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* FAQ Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-blue-600 dark:text-blue-400">
                <HelpCircle className="h-5 w-5" />
                Frequently Asked Questions
              </h3>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left">
                    How can I start investing in US stocks as an Indian resident?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      As an Indian resident, you can invest in US stocks through platforms like INDmoney that comply with 
                      RBI's Liberalized Remittance Scheme (LRS). You'll need to complete KYC procedures, link your bank account, 
                      and complete FEMA declarations before making your first investment. Our advisors can guide you through 
                      the entire process to ensure compliance with all regulations.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left">
                    What are the tax implications of investing in US stocks?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      When investing in US stocks, Indian residents are subject to taxes in both countries. In the US, 
                      dividends are taxed at 25% (withheld at source), which can be reduced to 15% if you submit W-8BEN forms. 
                      In India, capital gains from US stocks are treated as capital gains from any foreign assets. Short-term 
                      gains (held less than 24 months) are taxed at your income tax slab rate, while long-term gains are taxed 
                      at 20% with indexation benefits.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left">
                    What are the advantages of diversifying into US markets?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Diversifying into US markets offers several benefits: access to global tech giants and innovative 
                      companies not available on Indian exchanges, currency diversification to hedge against INR depreciation, 
                      exposure to different economic cycles, and the opportunity to invest in companies with global revenue streams. 
                      Additionally, US markets tend to have higher liquidity and different trading hours, allowing for more 
                      flexibility in portfolio management.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left">
                    How does Finance Brunch help with US stock investments?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Finance Brunch provides comprehensive support for US stock investments, including in-depth research and 
                      analysis of US equities, regulatory guidance to ensure compliance with Indian laws, portfolio construction 
                      that balances US and Indian assets, risk assessment that considers currency fluctuations, and ongoing 
                      monitoring and rebalancing recommendations. Our CFP-certified advisors help you navigate both markets 
                      efficiently while considering your overall financial goals.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left">
                    What minimum investment is recommended for US stocks?
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      While there's no strict minimum, we typically recommend starting with at least ₹1,00,000 (approximately $1,200) 
                      for US stock investments. This amount allows for reasonable diversification across 3-5 stocks or ETFs while 
                      managing the fixed costs associated with international investments. For smaller amounts, we often suggest 
                      using US-focused mutual funds or ETFs available in India until you can build a larger corpus for direct 
                      international investments.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            {/* Contact Section */}
            <Card className="mb-4 border-blue-100 dark:border-blue-900">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <User className="h-5 w-5" />
                  USA Stock Analysis Advisor
                </h3>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="space-y-1">
                      <p className="font-medium">Saikarun Arasada, CFP</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Certified Financial Planner</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">NISM Certified</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">+91 8801313321</p>
                      <a href="mailto:admin@financebrunch.in" className="text-sm text-blue-600 dark:text-blue-400 hover:underline block">
                        admin@financebrunch.in
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                      With over 8 years of experience in global equity markets, Saikarun specializes in US tech stocks, 
                      growth investing, and international portfolio diversification for Indian investors.
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setScheduleOpen(true)}
                    >
                      Schedule a Consultation
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
            
            <Button 
              onClick={() => window.open('https://www.indmoney.com/', '_blank')}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Invest via INDmoney
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <ConsultationScheduler 
        open={scheduleOpen} 
        onOpenChange={setScheduleOpen} 
      />
    </>
  );
}
