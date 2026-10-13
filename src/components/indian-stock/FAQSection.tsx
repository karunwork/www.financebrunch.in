
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Phone, ExternalLink, CheckCircle } from "lucide-react";

export function FaqSection() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Frequently Asked Questions
          </span>
        </h2>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left">
                How do I start investing in the Indian stock market?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  To start investing in the Indian stock market, follow these steps:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Complete KYC (Know Your Customer) verification with a SEBI-registered broker</li>
                  <li>Open a demat and trading account</li>
                  <li>Link your bank account for seamless fund transfers</li>
                  <li>Obtain your PAN (Permanent Account Number) card</li>
                  <li>Research stocks or mutual funds based on your financial goals</li>
                  <li>Start with a small investment amount as you learn the market</li>
                </ol>
                <p className="mt-4 text-gray-700 dark:text-gray-300">
                  Our advisors can guide you through each step of this process to ensure a smooth start to your investment journey.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left">
                What is the difference between BSE and NSE?
              </AccordionTrigger>
              <AccordionContent>
                <div className="text-gray-700 dark:text-gray-300">
                  <p className="mb-4">
                    The Bombay Stock Exchange (BSE) and National Stock Exchange (NSE) are India's two primary stock exchanges, differing in several key aspects:
                  </p>
                  
                  <table className="w-full border-collapse mb-4">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-800">
                        <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left">Feature</th>
                        <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left">BSE</th>
                        <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left">NSE</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">Establishment</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">1875 (Asia's oldest)</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">1994</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">Benchmark Index</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">SENSEX (30 stocks)</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">NIFTY (50 stocks)</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">Trading Volume</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">Lower than NSE</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">Higher (approx. 70% of Indian market)</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">Listed Companies</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">More (~5000+)</td>
                        <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">Less (~2000+)</td>
                      </tr>
                    </tbody>
                  </table>
                  
                  <p>
                    Both exchanges follow similar regulations and trading hours. Many companies are listed on both exchanges, though prices may vary slightly due to liquidity differences.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left">
                What are the tax implications of stock market investments in India?
              </AccordionTrigger>
              <AccordionContent>
                <div className="text-gray-700 dark:text-gray-300">
                  <p className="mb-4">
                    Stock market investments in India have the following tax implications:
                  </p>
                  
                  <h4 className="font-semibold mb-2">Equity Investments:</h4>
                  <ul className="list-disc list-inside mb-4 space-y-1">
                    <li><strong>Short-term Capital Gains (STCG):</strong> Profits from shares held for less than 12 months are taxed at 15%</li>
                    <li><strong>Long-term Capital Gains (LTCG):</strong> Profits from shares held for more than 12 months are taxed at 10% (without indexation) for gains exceeding ₹1 lakh per financial year</li>
                    <li><strong>Dividend Income:</strong> Taxed at the investor's applicable income tax slab rate</li>
                  </ul>
                  
                  <h4 className="font-semibold mb-2">Mutual Funds:</h4>
                  <ul className="list-disc list-inside mb-4 space-y-1">
                    <li><strong>Equity Mutual Funds:</strong> Follow the same taxation rules as direct equity investments</li>
                    <li><strong>Debt Mutual Funds:</strong> STCG (held for less than 36 months) taxed at income tax slab rate; LTCG taxed at 20% with indexation benefits</li>
                  </ul>
                  
                  <p className="mb-4">
                    Additionally, a Securities Transaction Tax (STT) is levied on all transactions made on recognized stock exchanges in India.
                  </p>
                  
                  <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                    <p className="text-sm italic">
                      <strong>Note:</strong> Tax laws are subject to change. We recommend consulting with a tax professional for personalized advice based on your specific situation and the latest tax regulations.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left">
                What is the minimum amount required to start investing in stocks?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-gray-700 dark:text-gray-300">
                  There is no official minimum amount required to start investing in the Indian stock market. You can start with as little as ₹500 to buy shares of companies or invest in Systematic Investment Plans (SIPs) for mutual funds. However, for building a diversified portfolio, we typically recommend starting with at least ₹10,000-25,000. This allows you to spread your investments across different stocks or mutual funds, reducing risk through diversification.
                </p>
                <p className="mt-4 text-gray-700 dark:text-gray-300">
                  Remember that while investing in the stock market, it's not about how much you start with, but about consistency and following sound investment principles. Our advisors can help you build a personalized strategy based on your financial situation and goals.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left">
                How does Finance Brunch help with Indian stock market investments?
              </AccordionTrigger>
              <AccordionContent>
                <div className="text-gray-700 dark:text-gray-300">
                  <p className="mb-4">
                    Finance Brunch provides comprehensive support for Indian stock market investments:
                  </p>
                  
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-blue-100 dark:bg-blue-900/40 rounded-full p-1 mr-3 mt-0.5">
                        <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium">Research & Analysis</p>
                        <p className="text-sm">
                          In-depth research on Indian companies across sectors, with fundamental and technical analysis to identify investment opportunities
                        </p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <div className="bg-blue-100 dark:bg-blue-900/40 rounded-full p-1 mr-3 mt-0.5">
                        <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium">Portfolio Construction</p>
                        <p className="text-sm">
                          Personalized portfolio creation based on your risk profile, investment horizon, and financial goals
                        </p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <div className="bg-blue-100 dark:bg-blue-900/40 rounded-full p-1 mr-3 mt-0.5">
                        <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium">Account Setup Support</p>
                        <p className="text-sm">
                          Guidance in opening demat and trading accounts with reliable brokers and completing all necessary documentation
                        </p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <div className="bg-blue-100 dark:bg-blue-900/40 rounded-full p-1 mr-3 mt-0.5">
                        <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium">Regular Portfolio Reviews</p>
                        <p className="text-sm">
                          Periodic assessment of your investments to ensure they remain aligned with your goals and market conditions
                        </p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <div className="bg-blue-100 dark:bg-blue-900/40 rounded-full p-1 mr-3 mt-0.5">
                        <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium">Market Education</p>
                        <p className="text-sm">
                          Resources and guidance to help you understand market mechanisms, investment strategies, and risk management
                        </p>
                      </div>
                    </li>
                  </ul>
                  
                  <div className="mt-6 bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-100 dark:border-green-900">
                    <p className="font-medium text-green-800 dark:text-green-300 flex items-center">
                      <InfoCircled className="h-5 w-5 mr-2" />
                      Ready to start your investment journey?
                    </p>
                    <p className="mt-2 text-sm text-green-700 dark:text-green-400">
                      Connect with our expert advisors who can provide personalized guidance based on your unique financial situation and goals.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}

function InfoCircled(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  )
}
