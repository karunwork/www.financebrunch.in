
import React from "react";
import { Button } from "@/components/ui/button";

const CTASection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="container px-4 mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">
          Ready to simplify your tax filing experience?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Connect with our tax experts today and let us help you navigate the complexities of income tax filing with ease and confidence.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" variant="outline" className="bg-white text-blue-700 hover:bg-gray-100 border-white">
            Schedule a Consultation
          </Button>
          <Button size="lg" className="bg-blue-800 hover:bg-blue-900 text-white border-none">
            Get Started Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
