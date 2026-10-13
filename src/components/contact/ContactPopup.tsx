
import { Mail, Phone, BookCheck } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ContactPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactPopup({ open, onOpenChange }: ContactPopupProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-blue-600 dark:text-blue-400">Contact Finance Brunch</DialogTitle>
          <DialogDescription>
            Get in touch with our team for financial consultations and services.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="flex items-start gap-3">
            <div className="mt-1 h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Phone className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-medium">Managing Director</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">SAIKARUN ARASADA</p>
              <a 
                href="tel:+917842494981" 
                className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                +91 7842-494-981
              </a>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="mt-1 h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Mail className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-medium">Email</h3>
              <a 
                href="mailto:admin@financebrunch.in" 
                className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                admin@financebrunch.in
              </a>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="mt-1 h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <BookCheck className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-medium">Licenses & Certifications</h3>
              <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
                <li>NISM Certified</li>
                <li>CFP Certified</li>
                <li>ARN Holder</li>
                <li>ISO 9001:2015 Certified</li>
              </ul>
            </div>
          </div>
        </div>
        
        <DialogFooter className="sm:justify-center">
          <Button 
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
