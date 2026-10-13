
import { IPOHeroSection } from '@/components/ipo/IPOHeroSection';
import { UpcomingIPOSection } from '@/components/ipo/UpcomingIPOSection';
import { RecentIPOTable } from '@/components/ipo/RecentIPOTable';
import { DisclaimerSection } from '@/components/ipo/DisclaimerSection';

const IPOAnalysis = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow pt-20">
        <IPOHeroSection />
        <UpcomingIPOSection />
        <RecentIPOTable />
        <DisclaimerSection />
      </main>
    </div>
  );
};

export default IPOAnalysis;
