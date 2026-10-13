import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import ScrollToTop from '@/components/ui/ScrollToTop';

import Index from './pages/Index';
import NotFound from './pages/NotFound';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { GlobalAmbientBackground } from './components/layout/GlobalAmbientBackground';
import { Toaster } from './components/ui/sonner';

import Calculator from './pages/Calculator';
import MutualFunds from './pages/MutualFunds';
import IncomeTaxFiling from './pages/IncomeTaxFiling';
import IndianStockAnalysis from './pages/IndianStockAnalysis';
import UnlistedShares from './pages/UnlistedShares';
import InvestmentPlanning from './pages/InvestmentPlanning';
import InsurancePlanning from './pages/InsurancePlanning';
import FireStrategy from './pages/FireStrategy';
import IPOAnalysis from './pages/IPOAnalysis';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Disclaimer from './pages/Disclaimer';
import Careers from './pages/Careers';
import EarlyRetirement from './pages/EarlyRetirement';
import Contact from './pages/Contact';

import { motion, useReducedMotion } from 'framer-motion';

import { scrollToSection } from '@/lib/scrollUtils';
import { RegulatoryDisclaimerGuard } from '@/components/compliance/RegulatoryDisclaimerGuard';

// Initialize React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Helper component to handle in-page section scrolling when navigating to hash URLs
function ScrollToHashElement() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const scroll = () => {
        scrollToSection(id, true);
      };
      const t1 = setTimeout(scroll, 100);
      const t2 = setTimeout(scroll, 350);
      const t3 = setTimeout(scroll, 750);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [pathname, hash]);

  return null;
}

// Subtle page transition wrapper preserving scroll restoration and calculator states
function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.main
      key={location.pathname}
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: 'easeOut' }}
      className="flex-grow flex flex-col"
    >
      {children}
    </motion.main>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="finance-brunch-theme">
        <TooltipProvider>
          <Router basename={import.meta.env.BASE_URL}>
            <ScrollToTop />
            <ScrollToHashElement />
            <div className="relative flex flex-col min-h-screen bg-background text-gray-900 dark:text-gray-100 transition-colors duration-300">
              <GlobalAmbientBackground />
              <Navbar />
              <PageTransition>
                <Routes>
                  {/* Home - Freely accessible without disclaimer */}
                  <Route path="/" element={<Index />} />

                  {/* Mutual Funds & Calculators - Protected Financial Services */}
                  <Route path="/mutual-funds" element={<RegulatoryDisclaimerGuard><MutualFunds /></RegulatoryDisclaimerGuard>} />
                  <Route path="/calculator" element={<RegulatoryDisclaimerGuard><Calculator /></RegulatoryDisclaimerGuard>} />
                  <Route path="/calculators" element={<RegulatoryDisclaimerGuard><Calculator /></RegulatoryDisclaimerGuard>} />

                  {/* Insurance Planning - Protected Financial Services */}
                  <Route path="/insurance-planning" element={<RegulatoryDisclaimerGuard><InsurancePlanning /></RegulatoryDisclaimerGuard>} />
                  <Route path="/health-insurance" element={<RegulatoryDisclaimerGuard><InsurancePlanning /></RegulatoryDisclaimerGuard>} />
                  <Route path="/term-insurance" element={<RegulatoryDisclaimerGuard><InsurancePlanning /></RegulatoryDisclaimerGuard>} />

                  {/* Retirement & FIRE - Protected Financial Services */}
                  <Route path="/fire-strategy" element={<RegulatoryDisclaimerGuard><FireStrategy /></RegulatoryDisclaimerGuard>} />
                  <Route path="/early-retirement" element={<RegulatoryDisclaimerGuard><EarlyRetirement /></RegulatoryDisclaimerGuard>} />
                  <Route path="/retirement-planning" element={<RegulatoryDisclaimerGuard><EarlyRetirement /></RegulatoryDisclaimerGuard>} />

                  {/* Investment Planning - Protected Financial Services */}
                  <Route path="/investment-planning" element={<RegulatoryDisclaimerGuard><InvestmentPlanning /></RegulatoryDisclaimerGuard>} />
                  <Route path="/indian-stock-analysis" element={<RegulatoryDisclaimerGuard><IndianStockAnalysis /></RegulatoryDisclaimerGuard>} />
                  <Route path="/unlisted-shares" element={<RegulatoryDisclaimerGuard><UnlistedShares /></RegulatoryDisclaimerGuard>} />
                  <Route path="/ipo-analysis" element={<RegulatoryDisclaimerGuard><IPOAnalysis /></RegulatoryDisclaimerGuard>} />

                  {/* Tax Planning & Filing - Protected Financial Services */}
                  <Route path="/income-tax-filing" element={<RegulatoryDisclaimerGuard><IncomeTaxFiling /></RegulatoryDisclaimerGuard>} />
                  <Route path="/tax-planning" element={<RegulatoryDisclaimerGuard><IncomeTaxFiling /></RegulatoryDisclaimerGuard>} />
                  <Route path="/tax-filing" element={<RegulatoryDisclaimerGuard><IncomeTaxFiling /></RegulatoryDisclaimerGuard>} />
                  <Route path="/global-tax-file" element={<RegulatoryDisclaimerGuard><IncomeTaxFiling /></RegulatoryDisclaimerGuard>} />

                  {/* Contact & Careers - Freely Accessible Informational */}
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/careers" element={<Careers />} />

                  {/* Legal & Compliance - Freely Accessible Informational */}
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-of-service" element={<TermsOfService />} />
                  <Route path="/disclaimer" element={<Disclaimer />} />

                  {/* 404 Fallback */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </PageTransition>
              <Footer />
              <Toaster />
            </div>
          </Router>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
