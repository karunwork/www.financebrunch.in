
import React from 'react';
import {
  SheetContent,
  SheetHeader,
} from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ChevronRight, ExternalLink, Shield, Sparkles } from 'lucide-react';

export function MutualFundSheet() {
  return (
    <SheetContent className="w-full sm:max-w-[100vw] md:max-w-[720px] overflow-y-auto">
      <div className="h-full pb-16">
        {/* Hero Section */}
        <div className="relative w-full h-[300px] overflow-hidden rounded-xl mb-8">
          <img 
            src="/lovable-uploads/bf6dd0ac-44d2-4676-a31c-07952b0c5108.png" 
            alt="Mutual Fund Investment" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8 w-full">
            <div className="flex items-center mb-4">
              <div className="h-10 w-1 bg-green-400 mr-3"></div>
              <h2 className="text-white text-xl font-medium">Discover a better way to invest</h2>
            </div>
            <h1 className="text-white text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              Mutual Fund Investments <br />with Finance Brunch
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-2">
          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="h-2 bg-gradient-to-r from-purple-500 to-indigo-600"></div>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mr-4">
                    <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold">Expert Guidance</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Our team of financial experts continuously analyzes market trends and fund performances 
                  to provide personalized investment strategies aligned with your financial goals.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-600"></div>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mr-4">
                    <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold">Top-Tier Security</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  We prioritize the security of your investments with the highest standards of transparency 
                  and protection, ensuring peace of mind as your portfolio grows.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Why Invest With Us */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <h2 className="text-3xl font-bold">Why Invest With Finance Brunch?</h2>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-2xl mb-8">
              <p className="text-lg leading-relaxed mb-4">
                At Finance Brunch, we believe in building long-term wealth through strategic investments 
                in funds with consistent track records and strong growth potential. Our research team 
                meticulously analyzes fund performances, risk factors, and market conditions to identify 
                the top-performing funds.
              </p>
              <p className="text-lg leading-relaxed">
                With our guidance, you'll navigate the complex world of mutual funds with confidence, 
                knowing your investments are optimized for growth and aligned with your financial goals.
              </p>
            </div>
          </div>

          {/* Investment Partners */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-6">Our Trusted Investment Partners</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
              We have empanelment with both platforms below. You can choose either one to open your account.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {/* Angel One Card - Authentic Logo */}
              <Card className="overflow-hidden border border-gray-100 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between">
                <div>
                  <div className="h-3 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                  <CardContent className="p-8">
                    <div className="flex flex-col items-center">
                      <div className="w-full h-48 mb-4 flex items-center justify-center bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                        <img 
                          src="/images/angel-one-logo.svg" 
                          alt="Angel One" 
                          className="h-16 w-auto max-w-[85%] object-contain"
                        />
                      </div>
                      <h4 className="text-xl font-semibold mb-3 text-center">Angel One</h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-6 text-center text-sm leading-relaxed">
                        Trade with India's No.1 stock broking house with cutting-edge technology and expert research support.
                      </p>
                    </div>
                  </CardContent>
                </div>
                <div className="p-8 pt-0">
                  <Button 
                    className="w-full group-hover:bg-blue-600 transition-colors"
                    onClick={() => window.open('https://angel-one.onelink.me/Wjgr/f6agg88z', '_blank')}
                  >
                    Open Account <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </Card>
              
              {/* NJ E-Wealth Card - Top Pick with authentic logo & premium highlight */}
              <Card className="relative overflow-hidden border-2 border-primary/50 dark:border-cyan-500/50 shadow-2xl hover:shadow-[0_0_30px_rgba(59,130,246,0.25)] transition-all duration-300 group flex flex-col justify-between ring-1 ring-primary/20">
                <div>
                  <div className="h-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500"></div>
                  <CardContent className="p-8">
                    <div className="flex flex-col items-center">
                      {/* Logo Container with Top Pick Badge */}
                      <div className="relative w-full h-48 mb-4 flex items-center justify-center bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                        {/* Prominent ⭐ Top Pick badge positioned at top-right without covering logo */}
                        <div className="absolute top-2.5 right-2.5 z-10">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold tracking-wide bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md border border-amber-300/60 uppercase">
                            ⭐ Top Pick
                          </span>
                        </div>
                        <img 
                          src="/images/nj-ewealth-logo.png" 
                          alt="NJ E-Wealth" 
                          className="h-28 w-auto max-w-[85%] object-contain"
                        />
                      </div>
                      <div className="inline-flex items-center gap-1.5 mb-1.5">
                        <h4 className="text-xl font-bold text-center text-gray-900 dark:text-white">NJ E-Wealth</h4>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                          Recommended
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-6 text-center text-sm leading-relaxed">
                        Access comprehensive wealth management solutions through NJ E-Wealth's diverse investment products and advisory services.
                      </p>
                    </div>
                  </CardContent>
                </div>
                <div className="p-8 pt-0">
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold transition-colors shadow-md"
                    onClick={() => window.open('https://njwealth.in/', '_blank')}
                  >
                    Open Account <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12">
            <div className="bg-gradient-to-r from-primary/10 to-primary/20 dark:from-primary/20 dark:to-primary/30 rounded-2xl p-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0">
                  <h3 className="text-2xl font-bold mb-2">Ready to start your investment journey?</h3>
                  <p className="text-gray-600 dark:text-gray-300">Our experts are just a message away.</p>
                </div>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary"
                  onClick={() => window.open('https://wa.me/917842494981?text=Hi%20Finance%20Brunch%20Team%2C%20I%27m%20interested%20in%20mutual%20fund%20investments.%20Can%20we%20connect%3F', '_blank')}
                >
                  Contact Us <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SheetContent>
  );
}
