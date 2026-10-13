import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from "sonner";
import { IndianStockRiskPopup } from '@/components/investment/IndianStockRiskPopup';
import { MarketOverview } from '@/components/indian-stock/MarketOverview';
import { StockMarketHero } from '@/components/indian-stock/StockMarketHero';
import { BullBearMarket } from '@/components/indian-stock/BullBearMarket';
import { RiskDisclosure } from '@/components/indian-stock/RiskDisclosure';
import { StockMarketHistory } from '@/components/indian-stock/StockMarketHistory';
import { MajorIndices } from '@/components/indian-stock/MajorIndices';
import { StockExchanges } from '@/components/indian-stock/StockExchanges';
import { IpoProcess } from '@/components/indian-stock/IPOProcess';
import { RegulationsAndCompliance } from '@/components/indian-stock/RegulationsAndCompliance';
import { FaqSection } from '@/components/indian-stock/FAQSection';
import { StockMarketCTA } from '@/components/indian-stock/StockMarketCTA';
import { NavButtons } from '@/components/indian-stock/NavButtons';

const IndianStockAnalysis = () => {
  const [showRiskPopup, setShowRiskPopup] = useState(true);
  const [userAccepted, setUserAccepted] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!userAccepted) {
      setShowRiskPopup(true);
    }
  }, [userAccepted]);

  const handleAcceptRisks = () => {
    setUserAccepted(true);
    setShowRiskPopup(false);
    toast.success("Terms accepted. You can now explore Indian stock market information.");
  };

  const handleRejectRisks = () => {
    navigate('/investment-planning');
    toast.info("You've been directed back to Investment Planning.");
  };

  const handleContactAdvisor = () => {
    const phoneNumber = '917842494981';
    const whatsAppMessage = encodeURIComponent('Hi Finance Brunch Team, I\'m interested in learning more about Indian stock market investments. Can we discuss this in detail?');
    
    if (isMobile) {
      window.location.href = `tel:+${phoneNumber}`;
    } else {
      window.open(`https://wa.me/${phoneNumber}?text=${whatsAppMessage}`, '_blank');
    }
    
    toast.success("Connecting you with an investment advisor");
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent pt-16">
      <ScrollToTop />

      <IndianStockRiskPopup 
        open={showRiskPopup} 
        onOpenChange={setShowRiskPopup}
        onAccept={handleAcceptRisks}
        onCancel={handleRejectRisks}
      />

      <main className="flex-grow">
        <NavButtons className="py-4" />
        <StockMarketHero onContactAdvisor={handleContactAdvisor} />
        <BullBearMarket />
        <MarketOverview />
        <RiskDisclosure />
        <MajorIndices />
        <StockExchanges />
        <StockMarketHistory />
        <IpoProcess />
        <RegulationsAndCompliance />
        <FaqSection />
        <StockMarketCTA onContactAdvisor={handleContactAdvisor} />
        <NavButtons className="py-8" />
      </main>
    </div>
  );
};

export default IndianStockAnalysis;
