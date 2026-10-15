import React from 'react';
import { ServiceCard } from './ServiceCard';
import { ServiceItem } from './servicesData';
import { FadeIn } from '@/components/ui/animation';

interface FeaturedServiceShowcaseProps {
  service: ServiceItem;
}

export const FeaturedServiceShowcase: React.FC<FeaturedServiceShowcaseProps> = ({ service }) => {
  return (
    <FadeIn direction="up" className="w-full md:max-w-[calc(50%-12px)] mx-auto mb-10 sm:mb-12 flex justify-center">
      <div className="w-full h-full">
        <ServiceCard
          {...service}
          index={0}
        />
      </div>
    </FadeIn>
  );
};

