import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, ArrowRight, Plane, IndianRupee, ExternalLink, Globe, ShieldCheck, 
  FileCheck2, DollarSign, Clock, CheckCircle2, ChevronRight, Building2, 
  HelpCircle, Sparkles, Phone, MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ScrollToTop from '@/components/ui/ScrollToTop';

const nriBenefits = [
  'Specialized NRE/NRO account guidance for optimal tax benefits',
  'Assistance with FEMA regulations and RBI compliance',
  'Higher returns on investments compared to overseas options',
  'Simplified remote account management and documentation',
  'Strategic asset allocation across multiple currencies',
];

const nriServicesList = [
  'Repatriation-friendly investment strategies with minimal paperwork',
  'Tax-efficient portfolio structuring for NRIs from different countries',
  'Virtual consultations across global time zones',
  'Real estate investment advisory for NRIs looking to invest in India',
  'Retirement planning focused on eventual return to India',
];

const advisoryPillars = [
  {
    icon: ShieldCheck,
    title: 'FEMA & RBI Regulatory Compliance',
    description: '100% compliant investment routes safeguarding your capital under Reserve Bank of India and FEMA statutes.',
  },
  {
    icon: DollarSign,
    title: 'NRE & NRO Tax Optimization',
    description: 'Strategic allocation between repatriable NRE and non-repatriable NRO channels to minimize tax friction and maximize post-tax gains.',
  },
  {
    icon: Globe,
    title: 'Double Tax Avoidance (DTAA)',
    description: 'Leverage global tax treaties between India and your host country (US, UK, UAE, Singapore, Europe) to prevent double taxation.',
  },
  {
    icon: Building2,
    title: 'Cross-Border Wealth Structuring',
    description: 'Comprehensive wealth management aligning Indian real estate, equities, mutual funds, and fixed deposits with your global assets.',
  },
];

const onboardingSteps = [
  {
    step: '01',
    title: 'Virtual Consultation',
    description: 'Meet our cross-border advisory team over a 1-on-1 virtual call scheduled to your local timezone.',
  },
  {
    step: '02',
    title: 'FEMA & KYC Audit',
    description: 'We review your tax residency status, NRE/NRO banking needs, and compile compliant documentation effortlessly.',
  },
  {
    step: '03',
    title: 'Custom Portfolio Formulation',
    description: 'Receive an institutional-grade investment blueprint mapped to your currency preferences and repatriation goals.',
  },
  {
    step: '04',
    title: 'Seamless Execution & Review',
    description: 'Digital paperless onboarding with periodic quarterly performance reporting and tax season assistance.',
  },
];

export default function NRIServices() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNRISpecialistClick = () => {
    const whatsAppMessage = encodeURIComponent(
      "Hi Finance Brunch Team, I'm an NRI interested in your specialized investment services. Can we connect?"
    );
    window.open(`https://wa.me/917842494981?text=${whatsAppMessage}`, '_blank');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />

      <main className="flex-grow pt-20 pb-20 bg-transparent min-h-screen">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center justify-between mb-8">
            <Link to="/">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <Link to="/" className="hover:underline">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link to="/investment-planning" className="hover:underline">Investment Planning</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-blue-600 dark:text-blue-400 font-medium">NRI Services</span>
            </div>
          </div>

          {/* Hero Section */}
          <div className="relative rounded-3xl overflow-hidden p-8 md:p-12 mb-16 bg-gradient-to-br from-blue-900/10 via-indigo-900/5 to-cyan-900/10 border border-blue-200/50 dark:border-blue-900/50 backdrop-blur-sm">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/80 border border-blue-300 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold tracking-wide uppercase mb-6">
                <Plane className="h-3.5 w-3.5" />
                Specialized NRI Desk
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
                Specialized Investment Solutions for{' '}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                  NRIs
                </span>
              </h1>
              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                Helping Non-Resident Indians navigate complex financial regulations and build wealth across borders.
                Experience institutional-grade advisory, FEMA compliance, and multi-currency capital growth back home in India.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Button
                  size="lg"
                  category="primary"
                  rightIcon={<ExternalLink className="h-4 w-4" />}
                  className="font-medium shadow-md"
                  onClick={handleNRISpecialistClick}
                >
                  Connect with NRI Specialist
                </Button>
                <Link to="/contact">
                  <Button
                    size="lg"
                    category="secondary"
                    rightIcon={<ArrowRight className="h-4 w-4" />}
                  >
                    Schedule Consultation
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Main NRI Content Panels - Exact benefits & services preserved */}
          <div className="mb-20">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-4">
                NRI Services
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Specialized Investment Solutions for NRIs
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Helping Non-Resident Indians navigate complex financial regulations and build wealth across borders
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Panel 1: NRI Investment Benefits */}
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mr-4 flex-shrink-0">
                      <Plane className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      NRI Investment Benefits
                    </h3>
                  </div>
                  <ul className="space-y-3.5">
                    {nriBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <div className="mr-3 mt-1 text-green-500 font-bold">✓</div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                          {benefit}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Panel 2: Our NRI Services */}
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center mr-4 flex-shrink-0">
                      <IndianRupee className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Our NRI Services
                    </h3>
                  </div>
                  <ul className="space-y-3.5">
                    {nriServicesList.map((service, index) => (
                      <li key={index} className="flex items-start">
                        <div className="mr-3 mt-1 text-indigo-500 font-bold">•</div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                          {service}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-10 text-center">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md shadow-blue-500/20"
                onClick={handleNRISpecialistClick}
              >
                Connect with NRI Specialist
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Strategic Advisory Pillars */}
          <div className="mb-20">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Built Around Global Compliance & Capital Security
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                Cross-border financial management demands meticulous precision. Here is how we ensure seamless wealth building.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {advisoryPillars.map((pillar, i) => {
                const IconComponent = pillar.icon;
                return (
                  <Card key={i} className="border-gray-200/80 dark:border-gray-800 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm hover:shadow-md transition-all">
                    <CardContent className="p-6">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                        {pillar.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {pillar.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Seamless 4-Step NRI Onboarding */}
          <div className="mb-20">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                How NRIs Partner With Us
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                Zero friction, 100% digital onboarding tailored for clients in any global timezone.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {onboardingSteps.map((item, idx) => (
                <div key={idx} className="relative p-6 rounded-2xl bg-gray-50/80 dark:bg-gray-800/50 border border-gray-200/60 dark:border-gray-700/60">
                  <div className="text-3xl font-extrabold text-blue-600/30 dark:text-blue-400/30 mb-3 font-mono">
                    {item.step}
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action Section */}
          <div className="rounded-3xl p-8 md:p-12 text-center bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Ready to Optimize Your Indian Portfolio as an NRI?
            </h2>
            <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto mb-8">
              Speak directly with our senior cross-border wealth specialists to structure your investments efficiently.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <Button
                size="lg"
                category="success"
                rightIcon={<ExternalLink className="h-4 w-4" />}
                className="font-semibold shadow-md"
                onClick={handleNRISpecialistClick}
              >
                Chat on WhatsApp (+91 7842-494-981)
              </Button>
              <Link to="/contact">
                <Button
                  size="lg"
                  category="secondary"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  Book a Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
