
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import ScrollToTop from '@/components/ui/ScrollToTop';
import { UnlistedSharesRiskPopup } from '@/components/investment/UnlistedSharesRiskPopup';
import { useIsMobile } from '@/hooks/use-mobile';
import { UnlistedSharesRiskAlert } from '@/components/unlisted-shares/UnlistedSharesRiskAlert';
import { UnlistedSharesNavigation } from '@/components/unlisted-shares/UnlistedSharesNavigation';
import { UnlistedSharesHero } from '@/components/unlisted-shares/UnlistedSharesHero';
import { UnlistedSharesOverview } from '@/components/unlisted-shares/UnlistedSharesOverview';
import { AdvantagesRisksSection } from '@/components/unlisted-shares/AdvantagesRisksSection';
import { UnlistedSharesCollapsibleFAQ } from '@/components/unlisted-shares/UnlistedSharesCollapsibleFAQ';
import { UnlistedSharesServices } from '@/components/unlisted-shares/UnlistedSharesServices';
import { UnlistedSharesSEBIGuidelines } from '@/components/unlisted-shares/UnlistedSharesSEBIGuidelines';
import { UnlistedSharesTable } from '@/components/unlisted-shares/UnlistedSharesTable';
import { toast } from "sonner";
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { HomeIcon, ArrowLeft } from 'lucide-react';

const UnlistedShares = () => {
  const [showRiskPopup, setShowRiskPopup] = useState(true);
  const [userAccepted, setUserAccepted] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();
  const investmentSolutionsRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check if we have a hash in the URL that matches #comprehensive-investment-services
    if (location.hash === '#comprehensive-investment-services') {
      setTimeout(() => {
        investmentSolutionsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location]);

  // Handle the acceptance state change separately from the popup visibility
  useEffect(() => {
    if (!userAccepted) {
      setShowRiskPopup(true);
    }
  }, [userAccepted]);

  const handleAcceptRisks = () => {
    console.log("User accepted risks");
    // Update state to indicate user has accepted
    setUserAccepted(true);
    // Allow popup to close by setting showRiskPopup to false
    setShowRiskPopup(false);
    
    // Show a confirmation toast
    toast.success("Risk terms accepted. You can now explore unlisted shares opportunities.");
  };

  const handleRejectRisks = () => {
    // Navigate back to investment planning page and scroll to Comprehensive Investment Services section
    navigate('/investment-planning#comprehensive-investment-services');
  };

  const handleContactAdvisor = () => {
    const phoneNumber = '917842494981'; // Updated phone number
    const whatsAppMessage = encodeURIComponent('Hi Finance Brunch Team, I\'m interested in exploring unlisted share investment opportunities. I have read and agreed to the terms & disclosures and understand the associated risks. I\'m willing to invest in a calculated manner. Can we discuss this in detail');
    
    if (isMobile) {
      window.location.href = `tel:+${phoneNumber}`;
    } else {
      window.open(`https://wa.me/${phoneNumber}?text=${whatsAppMessage}`, '_blank');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />

      <UnlistedSharesRiskPopup 
        open={showRiskPopup} 
        onOpenChange={setShowRiskPopup}
        onAccept={handleAcceptRisks}
        onReject={handleRejectRisks}
      />

      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-4 flex flex-wrap items-center gap-3">
          <Link to="/">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <HomeIcon className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <Link to="/investment-planning#comprehensive-investment-services">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Investment Planning
            </Button>
          </Link>
        </div>
        
        <UnlistedSharesRiskAlert />
        <UnlistedSharesNavigation />
        <UnlistedSharesHero handleContactAdvisor={handleContactAdvisor} />
        
        <section className="py-16 bg-transparent">
          <div className="container mx-auto px-4">
            <UnlistedSharesOverview />
            
            {/* Add the new Unlisted Shares Table component */}
            <div className="max-w-5xl mx-auto mb-16" id="current-opportunities">
              <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Current Investment Opportunities
              </h2>
              <UnlistedSharesTable />
            </div>
            
            <AdvantagesRisksSection />
            <div className="max-w-4xl mx-auto space-y-12">
              <UnlistedSharesSEBIGuidelines />
              <UnlistedSharesCollapsibleFAQ />
              <UnlistedSharesServices handleContactAdvisor={handleContactAdvisor} />
            </div>
          </div>
        </section>
        
        <div className="container mx-auto px-4 py-8 flex justify-center gap-4">
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <HomeIcon className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <Link to="/investment-planning#comprehensive-investment-services">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Investment Planning
            </Button>
          </Link>
        </div>
      </main>

    </div>
  );
};

export default UnlistedShares;
