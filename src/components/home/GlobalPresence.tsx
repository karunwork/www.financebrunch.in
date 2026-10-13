
import { useNavigate } from 'react-router-dom';
import { GlobeIcon, BuildingIcon, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import MapComponent from './MapComponent';
import { FadeIn, HoverCardEffect, AnimatedNumber } from '@/components/ui/animation';

interface OfficeProps {
  city: string;
  country: string;
  isMain?: boolean;
}

const offices: OfficeProps[] = [
  {
    city: "Mumbai",
    country: "India",
    isMain: true
  },
  {
    city: "New Delhi",
    country: "India"
  },
  {
    city: "New York",
    country: "USA"
  },
  {
    city: "London",
    country: "UK"
  },
  {
    city: "Dubai",
    country: "UAE"
  },
  {
    city: "Singapore",
    country: "Singapore"
  }
];

const OfficeCard = ({ office }: { office: OfficeProps }) => {
  return (
    <HoverCardEffect liftDistance={2}>
      <div className={cn(
        "group bg-white dark:bg-gray-900 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md hover:border-primary/30 transition-all duration-200 cursor-default",
        office.isMain && "border-l-4 border-l-primary"
      )}>
        <div className="flex items-start">
          {office.isMain ? (
            <BuildingIcon className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0 transition-transform duration-200 group-hover:scale-110" />
          ) : (
            <MapPin className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-0.5" />
          )}
          <div>
            <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors duration-200">
              {office.city}, {office.country}
              {office.isMain && (
                <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  Headquarters
                </span>
              )}
            </h3>
          </div>
        </div>
      </div>
    </HoverCardEffect>
  );
};

export default function GlobalPresence() {
  const navigate = useNavigate();

  return (
    <section id="global" className="py-24 bg-transparent scroll-mt-24">
      <div className="container px-4 mx-auto">
        <FadeIn direction="up" className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Global Network
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Our Global Presence
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            With offices across major financial hubs, we provide localized expertise with a global perspective.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <FadeIn direction="up" delay={0.1} className="lg:col-span-2">
            <MapComponent />
          </FadeIn>
          
          <FadeIn direction="left" delay={0.2} className="space-y-6">
            <div className="group bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/10 hover:border-primary/30 hover:shadow-sm transition-all duration-200 flex items-center mb-8 cursor-default">
              <GlobeIcon className="h-8 w-8 text-primary mr-4 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
              <div>
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors duration-200">
                  <AnimatedNumber value={15} suffix="+" duration={1000} /> Global Offices
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Serving clients across major financial centers worldwide
                </p>
              </div>
            </div>
            
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
              {offices.map((office) => (
                <OfficeCard key={office.city} office={office} />
              ))}
            </div>
            
            <div className="pt-4">
              <Button 
                onClick={() => navigate('/contact')}
                className="w-full button-hover group hover:-translate-y-0.5 active:translate-y-0 hover:shadow-md transition-all duration-200"
              >
                <Users className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                Schedule a Consultation
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

