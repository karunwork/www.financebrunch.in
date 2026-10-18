
import React from "react";
import { Button } from "@/components/ui/button";
import { Users, GraduationCap, Building2 } from "lucide-react";

interface HeroSectionProps {
  openContactForm: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ openContactForm }) => {
  return (
    <section className="bg-gradient-to-b from-blue-50/50 to-transparent dark:from-gray-900/40 dark:to-transparent pt-20 pb-16">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              Professional Income Tax Filing Services
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Expert assistance with your income tax preparation, filing, and planning from our team of Chartered Accountants with 15+ years of experience.
            </p>
            
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-gray-700 dark:text-gray-300">15+ Years Experience</span>
              </div>
              <div className="flex items-center">
                <GraduationCap className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-gray-700 dark:text-gray-300">Certified Experts</span>
              </div>
              <div className="flex items-center">
                <Building2 className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-gray-700 dark:text-gray-300">Individual & Business</span>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <img 
              src="/lovable-uploads/b80d81b8-1bd9-42ad-9457-5b8f46a67af0.png" 
              alt="Income Tax Filing" 
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
