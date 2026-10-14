import { StaggerContainer, StaggerItem } from '@/components/ui/animation';
import { ServiceCard } from './services/ServiceCard';
import { ServicesHeader } from './services/ServicesHeader';
import { FeaturedServiceShowcase } from './services/FeaturedServiceShowcase';
import { homepageServices } from './services/servicesData';

export default function Services() {
  const featuredService = homepageServices[0];
  const gridServices = homepageServices.slice(1);

  return (
    <section id="services" className="py-12 sm:py-16 md:py-20 bg-transparent relative scroll-mt-20">
      {/* Anchor identifier for both #services and #products */}
      <div id="products" className="absolute -top-20 left-0 w-full pointer-events-none" />

      <div className="w-full max-w-7xl 2xl:max-w-[1536px] 3xl:max-w-[1680px] px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Section Header displaying exactly the 7 homepage solutions */}
        <ServicesHeader totalProductsCount={homepageServices.length} />

        {/* 1. Full-Screen Featured Apple-Inspired Product Showcase (Investment Planning) */}
        {featuredService && (
          <FeaturedServiceShowcase service={featuredService} />
        )}

        {/* Anchor point for smooth scroll transition from showcase hint */}
        <div id="all-solutions-grid" className="scroll-mt-24 pt-4 sm:pt-6">
          {/* Section Divider & Context Heading */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 sm:mb-8 border-b border-slate-200/80 dark:border-slate-800">
            <div>
              <p className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                Diversified Capabilities
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
                Complementary Financial Solutions
              </h3>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 sm:mt-0 font-medium">
              6 Specialized Execution Verticals
            </p>
          </div>

          {/* Apple-Inspired TWO-COLUMN Product Showcase Grid (Strictly 2 columns on desktop) */}
          <StaggerContainer 
            staggerDelay={0.06}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-stretch"
          >
            {gridServices.map((service, itemIndex) => {
              // The 6th item in gridServices (which is the 7th homepage service: Income Tax Filing) spans both columns
              const isLastItem = itemIndex === gridServices.length - 1;

              return (
                <StaggerItem 
                  key={service.id} 
                  className={isLastItem ? "md:col-span-2 w-full" : "w-full"}
                >
                  <ServiceCard
                    {...service}
                    index={itemIndex + 1}
                    isFullWidth={isLastItem}
                  />
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
