import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  LineChart, ChevronRight, ExternalLink, TrendingUp, 
  Info, Globe, FileText, CandlestickChart, DollarSign, Users, HomeIcon, Phone,
  Bitcoin, Clock, Shield, IndianRupee, Plane, ArrowRight
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { useIsMobile } from '@/hooks/use-mobile';

import { USAStockPopup } from '@/components/investment/USAStockPopup';
import SIPCalculator from '@/components/calculator/SIPCalculator';

const InvestmentPlanning = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();
  const [usaStockPopupOpen, setUsaStockPopupOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: servicesRef, inView: servicesInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: nriRef, inView: nriInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleDigitalGoldClick = () => {
    toast({
      title: "Coming Soon!",
      description: "We're getting our Digital Gold platform ready. Thank you for your interest! We'll inform you when we launch.",
      duration: 5000,
    });
  };
  
  const handleCryptoClick = () => {
    toast({
      title: "Coming Soon!",
      description: "We are waiting for Empannelement. Soon we will come up with Good news regarding Crypto Currency Investments!",
      duration: 5000,
    });
  };
  
  const handleContactAdvisor = () => {
    const phoneNumber = '8801313321';
    const whatsAppMessage = encodeURIComponent('Hi Finance Brunch Team, I\'m interested in your investment services. Can we connect?');
    
    if (isMobile) {
      window.location.href = `tel:+${phoneNumber}`;
    } else {
      window.open(`https://wa.me/${phoneNumber}?text=${whatsAppMessage}`, '_blank');
    }
  };
  
  const handleNRISpecialistClick = () => {
    const whatsAppMessage = encodeURIComponent('Hi Finance Brunch Team, I\'m an NRI interested in your investment services. Can we connect?');
    window.open(`https://wa.me/917842494981?text=${whatsAppMessage}`, '_blank');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />

      <USAStockPopup open={usaStockPopupOpen} onOpenChange={setUsaStockPopupOpen} />

      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-4">
          <Link to="/">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <HomeIcon className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        
        <section className="relative bg-gradient-to-r from-blue-50/50 via-transparent to-indigo-50/30 dark:from-blue-950/20 dark:via-transparent dark:to-indigo-950/20 py-20 overflow-hidden">
          <div 
            ref={headerRef} 
            className={cn(
              "container mx-auto px-4 relative z-10 transition-all duration-1000",
              headerInView ? "opacity-100 transform-none" : "opacity-0 translate-y-8"
            )}
          >
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center bg-white/80 dark:bg-gray-800/80 rounded-full py-1 px-3 mb-6 shadow-sm">
                <LineChart size={16} className="text-blue-500 mr-2" />
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Strategic Investment Solutions</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-700 to-purple-700 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Maximize Your Investment Potential
              </h1>
              
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
                Our expert investment planning services help you navigate financial markets with confidence and build wealth for your future, whether you're in India or abroad.
              </p>
            </div>
          </div>
          
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-20 dark:opacity-10">
            <div className="absolute top-[20%] right-[10%] w-64 h-64 rounded-full bg-blue-400/30 filter blur-3xl"></div>
            <div className="absolute bottom-[30%] right-[20%] w-40 h-40 rounded-full bg-purple-400/30 filter blur-2xl"></div>
          </div>
          
          <div className="absolute top-0 left-0 w-1/3 h-full opacity-20 dark:opacity-10">
            <div className="absolute top-[50%] left-[15%] w-56 h-56 rounded-full bg-indigo-400/30 filter blur-3xl"></div>
            <div className="absolute bottom-[20%] left-[25%] w-48 h-48 rounded-full bg-green-400/30 filter blur-2xl"></div>
          </div>
        </section>
        
        <section className="py-16 bg-transparent">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                  Why Choose Our Investment Services
                </span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-blue-50 dark:bg-blue-950/20 rounded-xl p-6 border border-blue-100 dark:border-blue-900 shadow-md hover:shadow-lg transition-all">
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mr-4 flex-shrink-0">
                      <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Data-Driven Approach</h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        Our recommendations are backed by thorough research, data analysis and deep market expertise from seasoned professionals.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-950/20 rounded-xl p-6 border border-purple-100 dark:border-purple-900 shadow-md hover:shadow-lg transition-all">
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center mr-4 flex-shrink-0">
                      <Globe className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Global Diversification</h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        Strategic exposure to both Indian and US markets, providing geographical diversification to optimize returns while managing risk.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 dark:bg-green-950/20 rounded-xl p-6 border border-green-100 dark:border-green-900 shadow-md hover:shadow-lg transition-all">
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center mr-4 flex-shrink-0">
                      <FileText className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Exclusive Opportunities</h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        Access to pre-IPO placements and unlisted shares that typically remain inaccessible to retail investors but offer high growth potential.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-orange-50 dark:bg-orange-950/20 rounded-xl p-6 border border-orange-100 dark:border-orange-900 shadow-md hover:shadow-lg transition-all">
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center mr-4 flex-shrink-0">
                      <DollarSign className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Alternative Investments</h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        Innovative investment options such as Digital Gold that serve as effective inflation hedges and portfolio diversifiers.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-indigo-50 dark:bg-indigo-950/20 rounded-xl p-6 border border-indigo-100 dark:border-indigo-900 shadow-md hover:shadow-lg transition-all">
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center mr-4 flex-shrink-0">
                      <CandlestickChart className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Technical Expertise</h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        Advanced technical analysis tools and methodologies to identify optimal entry and exit points for maximum profit potential.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-red-50 dark:bg-red-950/20 rounded-xl p-6 border border-red-100 dark:border-red-900 shadow-md hover:shadow-lg transition-all">
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center mr-4 flex-shrink-0">
                      <Users className="h-6 w-6 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Strong Client Network</h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        Join a thriving community of 1000+ investors who trust our insights to navigate volatile markets and capture emerging opportunities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section 
          ref={nriRef} 
          className={cn(
            "py-16 bg-transparent transition-all duration-1000",
            nriInView ? "opacity-100 transform-none" : "opacity-0 translate-y-8"
          )}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-4">
                NRI Services
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Specialized Investment Solutions for NRIs
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Helping Non-Resident Indians navigate complex financial regulations and build wealth across borders
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 p-6">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mr-4">
                    <Plane className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold">NRI Investment Benefits</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 text-green-500">✓</div>
                    <p>Specialized NRE/NRO account guidance for optimal tax benefits</p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 text-green-500">✓</div>
                    <p>Assistance with FEMA regulations and RBI compliance</p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 text-green-500">✓</div>
                    <p>Higher returns on investments compared to overseas options</p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 text-green-500">✓</div>
                    <p>Simplified remote account management and documentation</p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 text-green-500">✓</div>
                    <p>Strategic asset allocation across multiple currencies</p>
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 p-6">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center mr-4">
                    <IndianRupee className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-bold">Our NRI Services</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 text-indigo-500">•</div>
                    <p>Repatriation-friendly investment strategies with minimal paperwork</p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 text-indigo-500">•</div>
                    <p>Tax-efficient portfolio structuring for NRIs from different countries</p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 text-indigo-500">•</div>
                    <p>Virtual consultations across global time zones</p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 text-indigo-500">•</div>
                    <p>Real estate investment advisory for NRIs looking to invest in India</p>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 text-indigo-500">•</div>
                    <p>Retirement planning focused on eventual return to India</p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-10 text-center">
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleNRISpecialistClick}
              >
                Connect with NRI Specialist
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
        
        <section 
          ref={servicesRef} 
          className={cn(
            "py-20 bg-transparent transition-all duration-1000",
            servicesInView ? "opacity-100 transform-none" : "opacity-0 translate-y-8"
          )}
          id="comprehensive-investment-services"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-4">
                Investment Solutions
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Comprehensive Investment Services
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Choose from our range of specialized investment services tailored to meet your financial objectives and risk tolerance.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group flex flex-col h-full">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src="/lovable-uploads/06b665ec-50f4-4f68-b7fe-836df10af649.png" 
                    alt="Indian Stock Analysis - BSE Building" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-xl font-bold text-white">Indian Stock Analysis</h3>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">
                    Expert analysis of Indian equity markets with actionable insights on stocks across various sectors and market capitalizations.
                  </p>
                  <div className="flex justify-center mt-auto">
                    <Link to="/indian-stock-analysis" className="w-full">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Explore Indian Markets
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group flex flex-col h-full">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src="/lovable-uploads/39526ab9-be38-46a7-9a10-857828b19686.png" 
                    alt="USA Stock Analysis - Wall Street" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-xl font-bold text-white">USA Stock Analysis</h3>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">
                    In-depth research on US equities, focusing on growth stocks, tech companies, and dividend-yielding investments across NASDAQ and NYSE.
                  </p>
                  <div className="flex justify-center mt-auto">
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => setUsaStockPopupOpen(true)}
                    >
                      Explore
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group flex flex-col h-full">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src="/lovable-uploads/57727f9c-2aca-4226-99e9-efa57dc9848f.png" 
                    alt="IPO Analysis" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-xl font-bold text-white">IPO Analysis</h3>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">
                    Detailed evaluation of upcoming IPOs, including business models, financial health, valuation, and potential for long-term growth.
                  </p>
                  <div className="flex justify-center mt-auto">
                    <Link to="/ipo-analysis" className="w-full">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        View IPO Insights
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group flex flex-col h-full">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f" 
                    alt="Unlisted Shares" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-xl font-bold text-white">Unlisted Shares</h3>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">
                    Access to private equity opportunities in promising companies before they go public, offering potential for significant returns.
                  </p>
                  <div className="flex justify-center mt-auto">
                    <Link to="/unlisted-shares" className="w-full">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Explore Unlisted Shares
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group flex flex-col h-full">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src="/lovable-uploads/75e0d2e9-6d50-49f9-abe9-5236913686da.png" 
                    alt="Digital Gold" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-xl font-bold text-white">Digital Gold</h3>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">
                    Invest in 99.9% pure gold electronically without worrying about storage, security, or authenticity issues.
                  </p>
                  <div className="flex justify-center mt-auto">
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={handleDigitalGoldClick}
                    >
                      Coming Soon
                      <Info className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group flex flex-col h-full">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src="/lovable-uploads/b7af595c-860c-4bed-8735-64391a005af9.png" 
                    alt="Crypto Currency" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-xl font-bold text-white">Crypto Currency Investments</h3>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">
                    Strategic guidance on blockchain assets and cryptocurrencies, helping you navigate this emerging investment class with confidence.
                  </p>
                  <div className="flex justify-center mt-auto">
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={handleCryptoClick}
                    >
                      Coming Soon
                      <Clock className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Interactive Mutual Fund SIP Calculator */}
        <section id="sip-calculator" className="py-20 bg-gradient-to-b from-blue-50/50 via-transparent to-indigo-50/30 dark:from-blue-950/20 dark:via-transparent dark:to-indigo-950/20 scroll-mt-24 border-y border-gray-100 dark:border-gray-800/80">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-4">
                Interactive Wealth Simulator
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-gray-900 dark:text-white">
                Mutual Fund SIP Calculator
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Calculate your estimated mutual fund returns through disciplined monthly Systematic Investment Plans with real-time compounding and optional annual step-up.
              </p>
            </div>

            <SIPCalculator />
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-800 dark:to-indigo-800 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Elevate Your Investment Strategy?
              </h2>
              <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
                Our team of expert advisors is ready to guide you toward financial success with personalized investment solutions.
              </p>
              <Button 
                size="lg" 
                className="bg-white text-blue-700 hover:bg-blue-50"
                onClick={handleContactAdvisor}
              >
                {isMobile ? (
                  <>
                    Call an Advisor
                    <Phone className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Connect with an Advisor
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </>
                )}
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

export default InvestmentPlanning;
