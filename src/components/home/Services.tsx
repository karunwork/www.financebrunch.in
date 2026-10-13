import { StaggerContainer, StaggerItem } from '@/components/ui/animation';
import { ServiceCard } from './services/ServiceCard';
import { ServicesHeader } from './services/ServicesHeader';
import { homepageServices } from './services/servicesData';

export default function Services() {
  return (
    <section id="services" className="py-24 bg-transparent relative scroll-mt-24">
      {/* Anchor identifier for both #services and #products */}
      <div id="products" className="absolute -top-24 left-0 w-full pointer-events-none" />

      <div className="container px-4 mx-auto max-w-7xl">
        {/* Section Header displaying exactly the 7 homepage solutions */}
        <ServicesHeader totalProductsCount={homepageServices.length} />

        {/* Restored 7 Homepage Service Cards Grid */}
        <StaggerContainer 
          staggerDelay={0.06}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
        >
          {homepageServices.map((service, itemIndex) => (
            <StaggerItem key={service.id} className="h-full">
              <ServiceCard
                {...service}
                index={itemIndex}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

