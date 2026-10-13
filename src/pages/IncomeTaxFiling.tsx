import { useState, useEffect } from "react";
import HeroSection from "@/components/income-tax-filing/HeroSection";
import TaxCalculatorSection from "@/components/income-tax-filing/TaxCalculatorSection";
import RegimeComparisonSection from "@/components/income-tax-filing/RegimeComparisonSection";
import BusinessTaxSection from "@/components/income-tax-filing/BusinessTaxSection";
import USTaxSection from "@/components/income-tax-filing/USTaxSection";
import ExpertiseSection from "@/components/income-tax-filing/ExpertiseSection";
import CTASection from "@/components/income-tax-filing/CTASection";
import { ContactPopup } from "@/components/contact/ContactPopup";

const IncomeTaxFiling = () => {
  const [contactVisible, setContactVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openContactForm = () => {
    setContactVisible(true);
  };

  return (
    <div className="flex flex-col min-h-screen">      
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection openContactForm={openContactForm} />
        
        {/* Tax Calculator Section */}
        <TaxCalculatorSection />
        
        {/* Regime Comparison Section */}
        <RegimeComparisonSection />
        
        {/* Business Tax Filing */}
        <BusinessTaxSection />
        
        {/* US Tax Filing */}
        <USTaxSection />
        
        {/* Our Expertise */}
        <ExpertiseSection />
        
        {/* CTA Section */}
        <CTASection />
      </main>

      {/* Contact Form Dialog */}
      <ContactPopup open={contactVisible} onOpenChange={setContactVisible} />
    </div>
  );
};

export default IncomeTaxFiling;
