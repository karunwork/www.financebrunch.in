
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export const ContactInfo = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      toast.error('Please enter your email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    // A real subscription backend/webhook is not yet integrated.
    // As per policy, we provide transparent feedback without faking a successful subscription.
    toast.info('Our automated newsletter system is currently being configured. For immediate market updates, please contact us directly at admin@financebrunch.in.');
    setEmail('');
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Contact Us</h3>
      <p className="flex items-center mb-3">
        <MapPin size={18} className="text-primary mr-2 flex-shrink-0" />
        <span className="text-gray-600 dark:text-gray-400">
          We have global presence
        </span>
      </p>
      <ul className="space-y-3">
        <li className="flex items-center">
          <Phone size={18} className="text-primary mr-2 flex-shrink-0" />
          <a 
            href="tel:+917842494981" 
            className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-all duration-200 hover:translate-x-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
          >
            +91 7842-494-981
          </a>
        </li>
        <li className="flex items-center">
          <Mail size={18} className="text-primary mr-2 flex-shrink-0" />
          <a 
            href="mailto:admin@financebrunch.in" 
            className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-all duration-200 hover:translate-x-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
          >
            admin@financebrunch.in
          </a>
        </li>
      </ul>
      
      <div className="pt-2">
        <h4 className="text-sm font-medium mb-2">Subscribe to our newsletter</h4>
        <form onSubmit={handleSubscribe} className="flex gap-2">
          <Input 
            type="email" 
            placeholder="Your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Your email address"
            className="h-9" 
          />
          <Button 
            type="submit" 
            size="sm" 
            category="secondary"
            rightIcon={<Sparkles className="h-3.5 w-3.5" />}
          >
            Subscribe
          </Button>
        </form>
      </div>
    </div>
  );
};
