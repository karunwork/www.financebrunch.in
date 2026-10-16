
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BuildingIcon, MapPin, Users, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import MapComponent, { officeLocations } from './MapComponent';
import { FadeIn } from '@/components/ui/animation';

export default function GlobalPresence() {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  return (
    <section id="global" className="py-10 sm:py-12 lg:py-14 bg-transparent scroll-mt-20">
      <div className="w-full max-w-7xl 2xl:max-w-[1536px] 3xl:max-w-[1680px] px-4 sm:px-6 lg:px-8 mx-auto">
        <FadeIn direction="up" className="max-w-2xl mx-auto text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2 sm:mb-2.5">
            Our Global Presence
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            We provide localized expertise with a global perspective.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          <FadeIn direction="up" delay={0.1} className="lg:col-span-7 flex flex-col">
            <MapComponent 
              selectedCity={selectedCity} 
              onSelectCity={setSelectedCity}
              className="h-full min-h-[290px] sm:min-h-[330px] md:min-h-[360px]"
            />
          </FadeIn>
          
          <FadeIn direction="left" delay={0.15} className="lg:col-span-5 flex flex-col justify-between space-y-3">
            <div className="space-y-2">
              {officeLocations.map((office) => {
                const isSelected = selectedCity === office.city;
                return (
                  <div
                    key={office.city}
                    onMouseEnter={() => setSelectedCity(office.city)}
                    onMouseLeave={() => setSelectedCity(null)}
                    onClick={() => setSelectedCity(isSelected ? null : office.city)}
                    className={cn(
                      "group flex items-center justify-between px-3.5 py-2.5 rounded-lg border transition-all duration-200 cursor-pointer select-none",
                      isSelected 
                        ? "bg-primary/10 border-primary shadow-xs" 
                        : "bg-white dark:bg-slate-900/90 border-slate-200/80 dark:border-slate-800 hover:border-primary/40 hover:bg-slate-50/80 dark:hover:bg-slate-800/50 shadow-2xs",
                      office.isMain && !isSelected && "border-l-primary border-l-4"
                    )}
                  >
                    <div className="flex items-center min-w-0">
                      {office.isMain ? (
                        <BuildingIcon className={cn(
                          "h-4 w-4 mr-2.5 flex-shrink-0 transition-colors",
                          isSelected ? "text-primary" : "text-primary/80 group-hover:text-primary"
                        )} />
                      ) : (
                        <MapPin className={cn(
                          "h-4 w-4 mr-2.5 flex-shrink-0 transition-colors",
                          isSelected ? "text-primary" : "text-slate-400 group-hover:text-primary"
                        )} />
                      )}
                      <span className={cn(
                        "text-sm font-semibold truncate transition-colors",
                        isSelected ? "text-primary" : "text-slate-800 dark:text-slate-200 group-hover:text-primary"
                      )}>
                        {office.city}, {office.country}
                      </span>
                    </div>

                    {office.isMain && (
                      <span className="ml-2 text-[10px] font-medium tracking-wide uppercase bg-primary/10 text-primary px-2 py-0.5 rounded-full flex-shrink-0">
                        Headquarters
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="pt-1 flex flex-col sm:flex-row gap-2.5">
              <Button 
                onClick={() => navigate('/contact')}
                className="flex-1 h-9 text-xs sm:text-sm button-hover group hover:-translate-y-0.5 active:translate-y-0 hover:shadow-xs transition-all duration-200"
              >
                <Users className="mr-2 h-3.5 w-3.5 transition-transform duration-200 group-hover:scale-110" />
                Schedule a Consultation
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/nri-services')}
                className="flex-1 h-9 text-xs sm:text-sm border-primary/20 hover:border-primary/50 text-primary hover:bg-primary/5 transition-all duration-200 hover:-translate-y-0.5"
              >
                <Plane className="mr-2 h-3.5 w-3.5" />
                NRI Services
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

