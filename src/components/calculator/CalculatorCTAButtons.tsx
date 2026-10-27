import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowUpRight, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CalculatorCTAButtonsProps {
  className?: string;
  sourceCalculator?: 'sip' | 'stepup' | 'lumpsum' | 'swp';
}

export const CalculatorCTAButtons: React.FC<CalculatorCTAButtonsProps> = ({
  className = '',
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleInvestNow = () => {
    if (location.pathname === '/mutual-funds') {
      const fundSection = document.getElementById('fund-categories-section');
      if (fundSection) {
        fundSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 350, behavior: 'smooth' });
      }
    } else {
      navigate('/mutual-funds');
    }
  };

  const handleConnectAdvisor = () => {
    navigate('/contact?subject=Mutual+Fund+Advisory');
  };

  return (
    <div
      className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 pb-1 ${className}`}
      role="group"
      aria-label="Investment actions"
    >
      {/* 1. Primary Call-to-Action: Invest Now */}
      <Button
        type="button"
        onClick={handleInvestNow}
        category="investment"
        size="lg"
        rightIcon={<ArrowUpRight className="h-4 w-4" />}
        className="flex-1"
        aria-label="Invest Now in Mutual Funds"
      >
        Invest Now
      </Button>

      {/* 2. Secondary Call-to-Action: Connect With Mutual Fund Advisor */}
      <Button
        type="button"
        onClick={handleConnectAdvisor}
        category="primary"
        size="lg"
        rightIcon={<MessageSquare className="h-4 w-4" />}
        className="flex-1"
        aria-label="Connect With Mutual Fund Advisor"
      >
        Connect With Mutual Fund Advisor
      </Button>
    </div>
  );
};
