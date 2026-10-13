
import { Button } from '@/components/ui/button';
import { Phone, ExternalLink } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface CallToActionProps {
  onContactAdvisor: () => void;
}

export function CallToAction({ onContactAdvisor }: CallToActionProps) {
  const isMobile = useIsMobile();

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Invest in the Indian Stock Market?
          </h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
            Our team of expert advisors is ready to guide you with personalized investment strategies for the Indian equity markets.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-6 text-lg rounded-lg shadow-xl"
            onClick={onContactAdvisor}
          >
            {isMobile ? (
              <>
                Call an Advisor
                <Phone className="ml-2 h-5 w-5" />
              </>
            ) : (
              <>
                Connect with an Expert Advisor
                <ExternalLink className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
}
