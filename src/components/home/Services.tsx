import { StaggerContainer, StaggerItem } from '@/components/ui/animation';
import { ServiceCard } from './services/ServiceCard';
import { ServicesHeader } from './services/ServicesHeader';
import { homepageServices } from './services/servicesData';

export default function Services() {
  return (
    <section id="services" className="pt-8 sm:pt-10 md:pt-12 pb-12 sm:pb-14 md:pb-16 bg-transparent relative scroll-mt-20">
      {/* Anchor identifier for both #services and #products */}
      <div id="products" className="absolute -top-20 left-0 w-full pointer-events-none" />

      <div className="w-full max-w-7xl 2xl:max-w-[1536px] 3xl:max-w-[1680px] px-4 sm:px-6 lg:px-8 mx-auto">
        {/* 1. Centered Section Header displaying exactly the 7 homepage solutions */}
        <ServicesHeader totalProductsCount={homepageServices.length} />

        {/* 2. Coherent Section Heading Block aligned directly with the product grid */}
        <div id="all-solutions-grid" className="scroll-mt-24 pt-2 sm:pt-4 mb-6 sm:mb-8 text-left">
          <p className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-1.5">
            DIVERSIFIED CAPABILITIES
          </p>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-2 sm:mb-2.5">
            Comprehensive Financial Solutions
          </h3>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            {homepageServices.length} specialized execution verticals engineered for long-term wealth creation, capital preservation, and multi-asset growth.
          </p>
        </div>

        {/* 3. Unified Product Showcase Grid: Exactly 3 columns on desktop, 2 on tablet, 1 on mobile */}
        <StaggerContainer 
          staggerDelay={0.05}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
        >
          {homepageServices.map((service, itemIndex) => (
            <StaggerItem 
              key={service.id} 
              className="w-full h-full flex"
            >
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

