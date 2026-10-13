
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { UpcomingIPOCard } from './UpcomingIPOCard';

const upcomingIPOs = [
  {
    name: "Tech Innovations Ltd",
    sector: "Technology",
    priceRange: "₹800 - ₹850",
    subscriptionDates: "Aug 10 - Aug 12, 2023",
    rating: "Subscribe",
    description: "Leading technology company specializing in AI and machine learning solutions with strong revenue growth.",
    logoColor: "bg-blue-500"
  },
  {
    name: "Green Energy Solutions",
    sector: "Renewable Energy",
    priceRange: "₹350 - ₹370",
    subscriptionDates: "Aug 18 - Aug 20, 2023",
    rating: "Subscribe with Caution",
    description: "Renewable energy provider with innovative solar solutions, though facing competitive market pressure.",
    logoColor: "bg-green-500"
  },
  {
    name: "Healthcare Pioneers",
    sector: "Healthcare",
    priceRange: "₹1,250 - ₹1,300",
    subscriptionDates: "Aug 25 - Aug 27, 2023",
    rating: "Avoid",
    description: "Medical device manufacturer with recent regulatory challenges and uncertain growth prospects.",
    logoColor: "bg-red-500"
  }
];

export const UpcomingIPOSection = () => {
  const { ref: ipoListRef, inView: ipoListInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section 
      ref={ipoListRef} 
      className={cn(
        "py-16 bg-white dark:bg-gray-900 transition-all duration-1000",
        ipoListInView ? "opacity-100 transform-none" : "opacity-0 translate-y-8"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-8">
            <img 
              src="/lovable-uploads/57727f9c-2aca-4226-99e9-efa57dc9848f.png" 
              alt="IPO Analysis" 
              className="w-full max-w-md rounded-lg shadow-lg"
            />
          </div>
          
          <h2 className="text-3xl font-bold mb-2">Upcoming IPOs</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-10">
            Our analysis of the latest companies planning to go public.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {upcomingIPOs.map((ipo, index) => (
              <UpcomingIPOCard key={index} ipo={ipo} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
