import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, ShieldCheck, Sparkles, PieChart, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import MutualFundCalculator from '@/components/calculator/MutualFundCalculator';

const fundCategories = [
  {
    title: "Large Cap Funds",
    description: "Invest in India's top 100 bluechip companies for steady, stable capital appreciation with lower volatility.",
    badge: "Low to Moderate Risk",
    icon: ShieldCheck,
    color: "from-blue-500 to-indigo-600",
  },
  {
    title: "Flexi Cap Funds",
    description: "Dynamic allocation across large, mid, and small cap companies to capture growth wherever opportunities arise.",
    badge: "Moderate Risk",
    icon: TrendingUp,
    color: "from-indigo-500 to-purple-600",
  },
  {
    title: "ELSS (Tax Saving) Funds",
    description: "Save up to ₹46,800 under Section 80C with the shortest lock-in period of 3 years and superior wealth generation.",
    badge: "High Growth + Tax Benefit",
    icon: Sparkles,
    color: "from-green-500 to-emerald-600",
  },
  {
    title: "Mid & Small Cap Funds",
    description: "High-conviction investments in emerging companies with exceptional long-term compound growth potential.",
    badge: "High Risk / High Return",
    icon: PieChart,
    color: "from-purple-500 to-pink-600",
  },
];

const MutualFunds = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleConsultantClick = () => {
    window.open(
      'https://wa.me/917842494981?text=Hi%20Finance%20Brunch%20Team%2C%20I%27m%20interested%20in%20starting%20a%20Mutual%20Fund%20investment.%20Can%20we%20connect%3F',
      '_blank'
    );
  };

  return (
    <main className="flex-grow pt-20 pb-20 bg-transparent min-h-screen">
      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
            <TrendingUp className="h-4 w-4" />
            Strategic Wealth Creation
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
            Mutual Fund Investments with <span className="text-blue-600 dark:text-blue-400">Finance Brunch</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Build disciplined wealth through automated SIPs and research-driven fund portfolios tailored to your unique financial milestones.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              onClick={handleConsultantClick}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
              Start Your SIP with an Advisor
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                document.getElementById('calculator-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="border-gray-300 dark:border-gray-700"
            >
              Calculate Returns Below
            </Button>
          </div>
        </div>

        {/* Fund Categories Grid */}
        <div id="fund-categories-section" className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Explore Popular Mutual Fund Categories
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Select the strategy that matches your investment horizon and appetite.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fundCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Card
                  key={cat.title}
                  className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-darkblue-900 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  <div className={`h-1.5 bg-gradient-to-r ${cat.color}`} />
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {cat.title}
                        </h3>
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                        {cat.badge}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                      {cat.description}
                    </p>
                    <button
                      onClick={handleConsultantClick}
                      className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline gap-1"
                    >
                      Explore top funds in this category
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Embedded Calculator Section */}
        <div id="calculator-section" className="mb-16 pt-6">
          <div className="text-center mb-8">
            <span className="text-xs font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400">
              Interactive Tool
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-1">
              Mutual Fund Returns Calculator
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-xl mx-auto">
              Forecast how your systematic investments (SIP), step-up allocations, lumpsum deposits, or SWP withdrawals can grow over time.
            </p>
          </div>

          <MutualFundCalculator />
        </div>

        {/* Why Choose Finance Brunch */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg mb-12">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold">
              Why Invest in Mutual Funds with Finance Brunch?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left pt-4">
              <div className="space-y-2 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                <CheckCircle2 className="h-6 w-6 text-green-300" />
                <h3 className="font-semibold text-lg">Goal-Based Portfolios</h3>
                <p className="text-xs text-blue-100">
                  Customized for retirement, children's education, or house purchases.
                </p>
              </div>
              <div className="space-y-2 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                <CheckCircle2 className="h-6 w-6 text-green-300" />
                <h3 className="font-semibold text-lg">Periodic Rebalancing</h3>
                <p className="text-xs text-blue-100">
                  We review your asset allocation annually to protect profits.
                </p>
              </div>
              <div className="space-y-2 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                <CheckCircle2 className="h-6 w-6 text-green-300" />
                <h3 className="font-semibold text-lg">Certified Advisors</h3>
                <p className="text-xs text-blue-100">
                  Direct guidance from licensed AMFI/NISM registered professionals.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Button
                onClick={handleConsultantClick}
                className="bg-white text-blue-700 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg shadow"
              >
                Schedule Free Portfolio Review
              </Button>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center max-w-3xl mx-auto">
          Mutual fund investments are subject to market risks. Please read all scheme-related documents carefully before investing. Past performance is not indicative of future returns.
        </div>
      </div>
    </main>
  );
};

export default MutualFunds;
