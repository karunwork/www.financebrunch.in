
import { useState } from 'react';
import { MessageCircleHeart, BadgeCheck, TrendingUp, ExternalLink, Phone } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

interface AdvisorPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AdvisorPopup = ({ open, onOpenChange }: AdvisorPopupProps) => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const phoneNumber = '917842494981'; // Updated phone number
  const whatsappMessage = encodeURIComponent('Hello! I would like to get advice on mutual fund investments.');
  
  const handleConnect = () => {
    if (isMobile) {
      // Redirect to phone dialer on mobile
      window.location.href = `tel:+${phoneNumber}`;
      toast({
        title: "Connecting you with an advisor",
        description: "Redirecting you to phone dialer.",
      });
    } else {
      // Redirect to WhatsApp on desktop
      window.open(`https://wa.me/${phoneNumber}?text=${whatsappMessage}`, '_blank');
      toast({
        title: "Connecting you with an advisor",
        description: "Thank you for your interest! We're redirecting you to WhatsApp.",
      });
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <div className="absolute -z-10 inset-0 bg-gradient-to-br from-blue-500/20 via-blue-500/20 to-blue-500/20 rounded-lg opacity-70" />
        
        <DialogHeader className="space-y-3">
          <div className="mx-auto bg-gradient-to-r from-blue-600 to-blue-600 text-white rounded-full p-3 w-16 h-16 flex items-center justify-center">
            <MessageCircleHeart className="h-8 w-8" />
          </div>
          <DialogTitle className="text-2xl text-center bg-gradient-to-r from-blue-700 to-blue-700 bg-clip-text text-transparent">
            You're in the Right Place!
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Our expert mutual fund advisors are just one click away.
          </DialogDescription>
        </DialogHeader>
        
        <div className="relative overflow-hidden rounded-lg border border-blue-100 dark:border-blue-900/50">
          <img 
            src="/lovable-uploads/75e0d2e9-6d50-49f9-abe9-5236913686da.png" 
            alt="Financial advisor" 
            className="w-full h-48 object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-2">
            <TrendingUp className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm">
              Even a <span className="font-bold text-blue-600 dark:text-blue-500">4% difference</span> in returns can significantly impact your long-term portfolio value.
            </p>
          </div>
          
          <div className="flex items-start space-x-2">
            <BadgeCheck className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm">
              Our advisory service is <span className="font-bold text-blue-600 dark:text-blue-400">completely free</span> - we're committed to helping you make informed investment decisions.
            </p>
          </div>
          
          <p className="text-sm italic text-gray-500 dark:text-gray-400">
            "Professional guidance can help you navigate market volatility and build a portfolio aligned with your financial goals."
          </p>
        </div>
        
        <DialogFooter className="sm:justify-center mt-4">
          <Button 
            onClick={handleConnect}
            category={isMobile ? "primary" : "success"}
            rightIcon={isMobile ? <Phone className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
            className="w-full sm:w-auto font-semibold"
          >
            {isMobile ? "Call Advisor Now" : "Connect with Advisor on WhatsApp"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdvisorPopup;
