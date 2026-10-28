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
        variant="outline"
        onClick={handleConnectAdvisor}
        className="flex-1 h-11 sm:h-12 px-5 rounded-xl font-semibold text-sm sm:text-base border-2 border-blue-600/80 text-blue-600 hover:bg-blue-50/80 dark:border-cyan-400/80 dark:text-cyan-300 dark:hover:bg-cyan-950/40 shadow-xs hover:shadow-sm transition-all duration-200 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 dark:focus-visible:ring-cyan-400 cursor-pointer text-center"
        aria-label="Connect With Mutual Fund Advisor"
      >
        <MessageSquare className="h-4 w-4 shrink-0 text-blue-600 dark:text-cyan-400" />
        <span className="truncate sm:whitespace-normal">Connect With Mutual Fund Advisor</span>
      </Button>
    </div>
  );
};
