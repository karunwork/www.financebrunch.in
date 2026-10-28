
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Flame, ChevronRight, LineChart, Calculator, TrendingUp, 
  BarChart3, PiggyBank, Target, HomeIcon, Users, GraduationCap, 
  Award, Globe, FileCode, Wallet, Shield
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ScrollToTop from '@/components/ui/ScrollToTop';

const FireStrategy = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: stepsRef, inView: stepsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: expertiseRef, inView: expertiseInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />

      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-4">
          <Link to="/">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <HomeIcon className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        
        <section className="relative bg-gradient-to-r from-orange-50/60 to-yellow-50/40 dark:from-orange-950/20 dark:to-yellow-950/20 py-20 overflow-hidden">
          <div 
            ref={headerRef} 
            className={cn(
              "container mx-auto px-4 relative z-10 transition-all duration-1000",
              headerInView ? "opacity-100 transform-none" : "opacity-0 translate-y-8"
            )}
          >
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center bg-white/80 dark:bg-gray-800/80 rounded-full py-1 px-3 mb-6 shadow-sm">
                <Flame size={16} className="text-orange-500 mr-2" />
                <span className="text-sm font-medium text-orange-700 dark:text-orange-300">Financial Independence</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-yellow-600 dark:from-orange-400 dark:to-yellow-400 bg-clip-text text-transparent">
                FIRE Strategy / Early Retirement Planning
              </h1>
              
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
                Achieve Financial Independence and Retire Early with strategic planning, disciplined saving, and smart investments.
              </p>
            </div>
          </div>
          
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-20 dark:opacity-10">
            <div className="absolute top-[20%] right-[10%] w-64 h-64 rounded-full bg-orange-400/30 filter blur-3xl"></div>
            <div className="absolute bottom-[30%] right-[20%] w-40 h-40 rounded-full bg-yellow-400/30 filter blur-2xl"></div>
          </div>
          
          <div className="absolute top-0 left-0 w-1/3 h-full opacity-20 dark:opacity-10">
            <div className="absolute top-[50%] left-[15%] w-56 h-56 rounded-full bg-red-400/30 filter blur-3xl"></div>
            <div className="absolute bottom-[20%] left-[25%] w-48 h-48 rounded-full bg-amber-400/30 filter blur-2xl"></div>
          </div>
        </section>

        <section 
          ref={expertiseRef} 
          className={cn(
            "py-16 bg-white dark:bg-gray-900 transition-all duration-1000",
            expertiseInView ? "opacity-100 transform-none" : "opacity-0 translate-y-8"
          )}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 shadow-lg">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="md:w-1/3">
                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg">
                      <img 
                        src="/lovable-uploads/26c5a7e3-fcfa-4500-ae98-4f465f3ac8b1.png" 
                        alt="Finance Brunch Expertise" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white text-xl font-bold">Expert Financial Planning</h3>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-2/3">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">
                      <span className="bg-gradient-to-r from-orange-600 to-yellow-600 dark:from-orange-400 dark:to-yellow-400 bg-clip-text text-transparent">
                        We are FIRE Strategy & Early Retirement Experts
                      </span>
                    </h2>
                    
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      At Finance Brunch, we've helped <strong>over 650 IT professionals globally</strong> achieve their early retirement dreams. Our clients have successfully planned world tours and secured financial independence, retiring comfortably between the ages of 45-50.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center mr-3">
                          <GraduationCap className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Expert Qualifications</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Our founder holds an MBA in Finance and is a Certified Financial Planner (CFP).</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/40 flex items-center justify-center mr-3">
                          <Users className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold">IT Professional Focus</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Specialized retirement plans for technology professionals with unique career patterns.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center mr-3">
                          <Globe className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Global Experience</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Supporting clients across multiple countries with international investment strategies.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mr-3">
                          <Award className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Proven Success</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Track record of clients achieving retirement goals 10-15 years earlier than traditional paths.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-gray-50 dark:bg-gray-950">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                <span className="bg-gradient-to-r from-orange-600 to-yellow-600 dark:from-orange-400 dark:to-yellow-400 bg-clip-text text-transparent">
                  Early Retirement Plans: Your Journey to Freedom
                </span>
              </h2>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg mb-8">
                <h3 className="text-xl font-bold mb-4">Understanding Early Retirement Planning</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Early retirement isn't just about stopping work—it's about gaining the freedom to choose how you spend your time and energy. Our personalized plans consider your unique circumstances, goals, and risk tolerance to create a roadmap to financial independence.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-5 rounded-lg">
                    <h4 className="font-semibold mb-2">For IT Professionals</h4>
                    <p className="text-sm">
                      We understand the unique career trajectories of tech professionals, including equity compensation, rapid career advancement, and industry volatility. Our strategies account for these factors to create stable retirement plans.
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg">
                    <h4 className="font-semibold mb-2">World Tour Planning</h4>
                    <p className="text-sm">
                      Many of our clients dream of extensive travel post-retirement. We integrate travel budgeting with retirement planning, ensuring you can explore the world without compromising your financial security.
                    </p>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-4">Our Early Retirement Approach</h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300 mb-6">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mt-1">
                      <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full"></div>
                    </div>
                    <span className="ml-3"><strong>Portfolio Diversification:</strong> Balanced allocation across equity, debt, real estate, and alternative investments tailored to your retirement timeline.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mt-1">
                      <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full"></div>
                    </div>
                    <span className="ml-3"><strong>Tax Optimization:</strong> Strategic planning to minimize tax burden during accumulation and withdrawal phases.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mt-1">
                      <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full"></div>
                    </div>
                    <span className="ml-3"><strong>Healthcare Planning:</strong> Comprehensive coverage solutions for the gap between early retirement and standard healthcare eligibility.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mt-1">
                      <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full"></div>
                    </div>
                    <span className="ml-3"><strong>Inflation Protection:</strong> Investment strategies designed to maintain purchasing power throughout retirement.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mt-1">
                      <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full"></div>
                    </div>
                    <span className="ml-3"><strong>Lifestyle Transition Planning:</strong> Guidance on the psychological and practical aspects of transitioning to retirement.</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-xl p-6 shadow-md">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="md:w-1/4 flex justify-center">
                    <div className="w-24 h-24 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center">
                      <Users className="h-12 w-12 text-orange-500" />
                    </div>
                  </div>
                  <div className="md:w-3/4">
                    <h3 className="text-xl font-bold mb-2 text-center md:text-left">Our Success Story</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      We're proud to have helped <strong>over 650 IT professionals globally</strong> achieve early retirement between ages 45-50. Our clients have fulfilled their travel dreams, pursued passion projects, and enjoyed financial independence decades earlier than traditional retirement paths.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-orange-600 to-yellow-600 dark:from-orange-400 dark:to-yellow-400 bg-clip-text text-transparent">
                      What is FIRE?
                    </span>
                  </h2>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    FIRE stands for <strong>Financial Independence, Retire Early</strong>. It's a movement focused on extreme savings and investments that allow people to retire much earlier than traditional retirement plans would allow.
                  </p>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    The core principle is to save and invest aggressively—typically 50-70% of your income—so that you can retire decades earlier than the conventional retirement age.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <Button 
                      className="bg-orange-600 hover:bg-orange-700 text-white"
                      onClick={() => {
                        document.getElementById('fire-calculator')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      Calculate Your FIRE Number
                      <Calculator className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="relative overflow-hidden rounded-xl shadow-lg">
                  <img 
                    src="/lovable-uploads/26c5a7e3-fcfa-4500-ae98-4f465f3ac8b1.png" 
                    alt="Early Retirement Planning" 
                    className="w-full h-auto rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-gray-50 dark:bg-gray-950">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                <span className="bg-gradient-to-r from-orange-600 to-yellow-600 dark:from-orange-400 dark:to-yellow-400 bg-clip-text text-transparent">
                  Different Types of FIRE
                </span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md hover:shadow-lg transition-all">
                  <div className="w-14 h-14 rounded-full bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center mb-6">
                    <Flame className="h-7 w-7 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Traditional FIRE</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Involves saving 25-30 times your annual expenses and following the 4% rule for withdrawals. This typically requires aggressive saving (50-70% of income) for 10-15 years.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md hover:shadow-lg transition-all">
                  <div className="w-14 h-14 rounded-full bg-yellow-100 dark:bg-yellow-900/40 flex items-center justify-center mb-6">
                    <TrendingUp className="h-7 w-7 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Fat FIRE</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    A more luxurious version that allows for a higher spending level in retirement. Usually requires saving 30+ times annual expenses for a more comfortable lifestyle.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md hover:shadow-lg transition-all">
                  <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center mb-6">
                    <PiggyBank className="h-7 w-7 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Lean FIRE</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    A minimalist approach with significantly reduced living expenses. Focuses on frugality and requires less savings to achieve, but means living on a tighter budget.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md hover:shadow-lg transition-all">
                  <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mb-6">
                    <BarChart3 className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Barista FIRE</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    A hybrid approach where you have enough invested to cover most expenses but still work part-time for supplemental income and often for benefits like health insurance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section 
          ref={stepsRef} 
          className={cn(
            "py-20 bg-white dark:bg-gray-900 transition-all duration-1000",
            stepsInView ? "opacity-100 transform-none" : "opacity-0 translate-y-8"
          )}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                <span className="bg-gradient-to-r from-orange-600 to-yellow-600 dark:from-orange-400 dark:to-yellow-400 bg-clip-text text-transparent">
                  Your Path to Financial Independence
                </span>
              </h2>
              
              <div className="space-y-12">
                <div className="relative pl-16 md:pl-0">
                  <div className="md:grid md:grid-cols-5 md:gap-10 items-center">
                    <div className="md:col-span-1 flex justify-center mb-6 md:mb-0">
                      <div className="w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center text-2xl font-bold text-orange-600 dark:text-orange-400">1</div>
                    </div>
                    <div className="md:col-span-4">
                      <h3 className="text-xl font-bold mb-3">Calculate Your FIRE Number</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Your FIRE number is typically 25-30 times your annual expenses, based on the 4% safe withdrawal rule. This means you need investments that will allow you to withdraw 4% annually to cover your living expenses.
                      </p>
                      <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                        <p className="text-sm font-medium">
                          <strong>Example:</strong> If your annual expenses are ₹12,00,000 (₹1,00,000 per month), your FIRE number would be ₹3,00,00,000 (25 × ₹12,00,000).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="relative pl-16 md:pl-0">
                  <div className="md:grid md:grid-cols-5 md:gap-10 items-center">
                    <div className="md:col-span-1 flex justify-center mb-6 md:mb-0">
                      <div className="w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-900/40 flex items-center justify-center text-2xl font-bold text-yellow-600 dark:text-yellow-400">2</div>
                    </div>
                    <div className="md:col-span-4">
                      <h3 className="text-xl font-bold mb-3">Lower Your Expenses</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Reducing your expenses has a double benefit: you need less money to live on, and you can save more toward your FIRE goal. Analyze your spending for opportunities to cut unnecessary expenses.
                      </p>
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                        <p className="text-sm font-medium">
                          <strong>Strategy:</strong> Track all expenses, eliminate debt, optimize housing costs, reduce discretionary spending, and negotiate bills.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="relative pl-16 md:pl-0">
                  <div className="md:grid md:grid-cols-5 md:gap-10 items-center">
                    <div className="md:col-span-1 flex justify-center mb-6 md:mb-0">
                      <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-2xl font-bold text-green-600 dark:text-green-400">3</div>
                    </div>
                    <div className="md:col-span-4">
                      <h3 className="text-xl font-bold mb-3">Increase Your Savings Rate</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        The key to FIRE is a high savings rate—aim for 50-70% of your income. This may require lifestyle changes and potentially increasing your income through side hustles or career advancement.
                      </p>
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <p className="text-sm font-medium">
                          <strong>Target:</strong> Most FIRE achievers save 50-70% of their income. The higher your savings rate, the faster you'll reach financial independence.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="relative pl-16 md:pl-0">
                  <div className="md:grid md:grid-cols-5 md:gap-10 items-center">
                    <div className="md:col-span-1 flex justify-center mb-6 md:mb-0">
                      <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-2xl font-bold text-blue-600 dark:text-blue-400">4</div>
                    </div>
                    <div className="md:col-span-4">
                      <h3 className="text-xl font-bold mb-3">Invest Strategically</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        FIRE requires not just saving but investing wisely. Build a diversified portfolio that balances growth potential with reasonable risk. Consider index funds, ETFs, real estate, and other passive income sources.
                      </p>
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <p className="text-sm font-medium">
                          <strong>Investment mix:</strong> Low-cost index funds, dividend stocks, rental properties, and bonds in proportions appropriate for your age and risk tolerance.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="relative pl-16 md:pl-0">
                  <div className="md:grid md:grid-cols-5 md:gap-10 items-center">
                    <div className="md:col-span-1 flex justify-center mb-6 md:mb-0">
                      <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-2xl font-bold text-purple-600 dark:text-purple-400">5</div>
                    </div>
                    <div className="md:col-span-4">
                      <h3 className="text-xl font-bold mb-3">Plan for Healthcare and Contingencies</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Early retirement means you need to plan for healthcare costs and unexpected expenses without employer benefits. Build a buffer into your FIRE number and consider health insurance options.
                      </p>
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                        <p className="text-sm font-medium">
                          <strong>Healthcare strategy:</strong> Comprehensive health insurance, emergency fund of 6-12 months' expenses, and regular reassessment of your withdrawal rate.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section id="fire-calculator" className="py-16 bg-gray-50 dark:bg-gray-950">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">
                <span className="bg-gradient-to-r from-orange-600 to-yellow-600 dark:from-orange-400 dark:to-yellow-400 bg-clip-text text-transparent">
                  FIRE Calculator
                </span>
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                Use our specialized FIRE calculator to determine your target number and estimate how long it will take to reach financial independence.
              </p>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                <Link to="/calculator">
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                    Go to Financial Calculator
                    <Calculator className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  Our comprehensive calculator will help you plan your FIRE journey with SIP, lumpsum, and other investment calculations.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                <span className="bg-gradient-to-r from-orange-600 to-yellow-600 dark:from-orange-400 dark:to-yellow-400 bg-clip-text text-transparent">
                  Related Financial Products
                </span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mb-4">
                    <LineChart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Investment Planning</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
                    Create a comprehensive investment strategy tailored to your financial goals and risk tolerance.
                  </p>
                  <Link to="/investment-planning">
                    <Button variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80 group">
                      Learn more
                      <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center mb-4">
                    <FileCode className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Mutual Funds</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
                    Diversify your investment portfolio with expert mutual fund selection for wealth creation and growth.
                  </p>
                  <Link to="/mutual-funds">
                    <Button variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80 group">
                      Learn more
                      <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
                  <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center mb-4">
                    <Wallet className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Retirement Planning</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
                    Secure your future with personalized retirement plans that ensure financial stability in your golden years.
                  </p>
                  <Link to="/retirement-planning">
                    <Button variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80 group">
                      Learn more
                      <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-gradient-to-r from-orange-600 to-yellow-600 dark:from-orange-700 dark:to-yellow-700 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Start Your FIRE Journey?
              </h2>
              <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
                Let our experts with MBA in Finance and CFP certification help you build a personalized FIRE strategy tailored to your financial situation and goals.
              </p>
              <Button 
                size="lg" 
                className="bg-white text-orange-700 hover:bg-orange-50"
                onClick={() => {
                  window.open('https://wa.me/917842494981?text=Hi%20Finance%20Brunch%20Team%2C%20I%27m%20interested%20in%20FIRE%20strategy%20planning.%20Can%20we%20connect%3F', '_blank');
                }}
              >
                Connect With an Advisor
                <Target className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
        
        <div className="container mx-auto px-4 py-8 flex justify-center">
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <HomeIcon className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </main>

    </div>
  );
};

export default FireStrategy;
