import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Modular insurance sections
import { InsuranceHero } from '@/components/insurance/InsuranceHero';
import { InsuranceProducts } from '@/components/insurance/InsuranceProducts';
import { InsuranceProcess } from '@/components/insurance/InsuranceProcess';
import { InsuranceExpertGuidance } from '@/components/insurance/InsuranceExpertGuidance';
import { InsuranceJourneyComparison } from '@/components/insurance/InsuranceJourneyComparison';
import { InsuranceWhyTrust } from '@/components/insurance/InsuranceWhyTrust';
import { InsuranceChecklists } from '@/components/insurance/InsuranceChecklists';
import { InsuranceNeedsEstimator } from '@/components/insurance/InsuranceNeedsEstimator';
import { InsuranceFAQ } from '@/components/insurance/InsuranceFAQ';
import { InsuranceFinalCTA } from '@/components/insurance/InsuranceFinalCTA';
import { InsuranceDisclaimer } from '@/components/insurance/InsuranceDisclaimer';

const InsurancePlanning: React.FC = () => {
  const location = useLocation();

  // Active tab state: initialized based on current pathname
  const [activeTab, setActiveTab] = useState<'health' | 'term'>(() => {
    if (location.pathname.includes('term')) return 'term';
    return 'health';
  });

  // Sync active tab whenever location changes & update page title
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (location.pathname.includes('term')) {
      setActiveTab('term');
      document.title = "Term Life Insurance Planning — Finance Brunch";
    } else if (location.pathname.includes('health')) {
      setActiveTab('health');
      document.title = "Health Insurance Planning — Finance Brunch";
    } else {
      document.title = "Insurance Planning & Advisory Solutions — Finance Brunch";
    }
  }, [location.pathname]);

  // Smooth scroll helpers
  const scrollToProducts = () => {
    document.getElementById('insurance-products')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToEstimator = () => {
    document.getElementById('insurance-estimator')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectPathway = (pathway: 'health' | 'term') => {
    setActiveTab(pathway);
    scrollToProducts();
  };

  // WhatsApp click handler with pre-filled message
  const handleWhatsApp = (
    service: 'Health Insurance' | 'Term Insurance' | 'General Insurance',
    customMessage?: string
  ) => {
    let message = customMessage;
    if (!message) {
      if (service === 'Health Insurance') {
        message = "Hi Finance Brunch Team, I would like to consult with an advisor regarding Health Insurance coverage for my family. Could we connect to discuss options?";
      } else if (service === 'Term Insurance') {
        message = "Hi Finance Brunch Team, I am looking to calculate and choose a Term Life Insurance plan for income protection. Could we discuss suitable plans?";
      } else {
        message = "Hi Finance Brunch Team, I'm reviewing my insurance portfolio and would like to get an expert audit of my coverage options.";
      }
    }
    window.open(`https://wa.me/917842494981?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col pt-16 bg-white dark:bg-slate-950 transition-colors insurance-planning-page">
      <main className="flex-grow">
        {/* Sections above checklist (Excluded from Print) */}
        <div className="print:hidden">
          {/* Section A — Hero & Pathway Introduction */}
          <InsuranceHero
            onSelectPathway={handleSelectPathway}
            onScrollToEstimator={scrollToEstimator}
            onScrollToProducts={scrollToProducts}
            onWhatsApp={handleWhatsApp}
          />

          {/* Section B — Insurance Products Deep-Dive (Health & Term) */}
          <InsuranceProducts
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onWhatsApp={handleWhatsApp}
            onOpenEstimator={scrollToEstimator}
          />

          {/* Section C — The Finance Brunch Insurance Experience (3-Stage Journey) */}
          <InsuranceProcess onWhatsApp={handleWhatsApp} />

          {/* Section D — Expert Guidance and Personalized Recommendations */}
          <InsuranceExpertGuidance onWhatsApp={handleWhatsApp} />

          {/* Section E — Insurance Buying Journey Comparison (Guided vs Self-Directed) */}
          <InsuranceJourneyComparison onWhatsApp={handleWhatsApp} />

          {/* Section F — Why Choose Finance Brunch (Authentic Trust Pillars) */}
          <InsuranceWhyTrust />
        </div>

        {/* Section G — Interactive Insurance Checklists (Health & Term) */}
        <InsuranceChecklists />

        {/* Sections below checklist (Excluded from Print) */}
        <div className="print:hidden">
          {/* Section H — Interactive Term Insurance Needs Estimator */}
          <InsuranceNeedsEstimator onWhatsApp={handleWhatsApp} />

          {/* Section I — Frequently Asked Questions Accordion */}
          <InsuranceFAQ onWhatsApp={handleWhatsApp} />

          {/* Section J — Final Call to Action */}
          <InsuranceFinalCTA onWhatsApp={handleWhatsApp} />

          {/* Section K — Educational & Regulatory Disclaimer */}
          <InsuranceDisclaimer />
        </div>
      </main>
    </div>
  );
};

export default InsurancePlanning;
