
import { useState, useEffect } from 'react';
import { format, addDays, isBefore, isAfter, isWeekend, setHours, setMinutes, isEqual } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CalendarIcon, Clock, Check, AlertTriangle, InfoIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

// Mock booked slots - in a real application, these would come from a database
const BOOKED_DATES = [
  new Date(2025, 3, 19), // April 19, 2025
  new Date(2025, 3, 22), // April 22, 2025
  new Date(2025, 3, 25), // April 25, 2025
];

// Available time slots (11 AM to 4 PM)
const TIME_SLOTS = [
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
];

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  date: z.date({
    required_error: "Please select a date.",
  }),
  time: z.string({
    required_error: "Please select a time slot.",
  }),
  specialRequests: z.string().optional(),
});

interface ConsultationSchedulerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ConsultationScheduler({ open, onOpenChange }: ConsultationSchedulerProps) {
  const { toast } = useToast();
  const [bookingComplete, setBookingComplete] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      specialRequests: "",
    },
  });

  // Reset the form when dialog is opened
  useEffect(() => {
    if (open) {
      setBookingComplete(false);
      form.reset();
    }
  }, [open, form]);

  const today = new Date();
  const maxDate = addDays(today, 33); // Maximum 33 days in advance

  const isDateDisabled = (date: Date) => {
    // Disable weekends (Saturday and Sunday)
    if (isWeekend(date)) return true;
    
    // Disable dates before today or after maxDate
    if (isBefore(date, today) || isAfter(date, maxDate)) return true;
    
    // Disable already booked dates
    return BOOKED_DATES.some(bookedDate => 
      isEqual(
        new Date(date.getFullYear(), date.getMonth(), date.getDate()),
        new Date(bookedDate.getFullYear(), bookedDate.getMonth(), bookedDate.getDate())
      )
    );
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // In a real app, this would send the data to your backend
    console.log("Consultation scheduled:", data);
    
    // Show success state
    setBookingComplete(true);
    
    // Show toast notification
    toast({
      title: "Consultation Request Received",
      description: "Our team will contact you with payment details shortly.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Schedule a Consultation with USA Stock Analyst
          </DialogTitle>
          <DialogDescription>
            Book a video consultation with our certified financial planner specialized in US markets.
          </DialogDescription>
        </DialogHeader>

        {!bookingComplete ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+91 9876543210" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Consultation Date</FormLabel>
                        <FormControl>
                          <div className="border rounded-md p-3">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={isDateDisabled}
                              className="pointer-events-auto"
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Available Monday-Friday, up to 33 days in advance.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {form.watch("date") && (
                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Time Slot</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a time slot" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {TIME_SLOTS.map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            All time slots are in Indian Standard Time (IST).
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </div>
              
              <FormField
                control={form.control}
                name="specialRequests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Requests or Questions</FormLabel>
                    <FormControl>
                      <Input placeholder="Any specific topics you'd like to discuss?" {...field} />
                    </FormControl>
                    <FormDescription>
                      For detailed requests, please email us directly.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <Alert variant="default" className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                  <InfoIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <AlertTitle className="text-blue-800 dark:text-blue-300">Consultation Fees</AlertTitle>
                  <AlertDescription className="text-blue-700 dark:text-blue-400">
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Initial 2 hours: $12 per hour</li>
                      <li>Additional time: $8 per hour</li>
                      <li>You'll receive a payment link after booking confirmation</li>
                    </ul>
                  </AlertDescription>
                </Alert>
                
                <Alert variant="default" className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
                  <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <AlertTitle className="text-amber-800 dark:text-amber-300">Important Disclaimer</AlertTitle>
                  <AlertDescription className="text-amber-700 dark:text-amber-400 text-sm">
                    <p>This consultation is for educational purposes only and does not constitute investment advice. Finance Brunch Strategies Pvt. Ltd. is not registered with USA regulatory bodies. We reserve the right to reschedule or cancel meetings due to unforeseen circumstances.</p>
                  </AlertDescription>
                </Alert>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  category="primary"
                  rightIcon={<CalendarIcon className="h-4 w-4" />}
                >
                  Request Consultation
                </Button>
              </DialogFooter>
            </form>
          </Form>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-center">
              <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3">
                <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="text-xl font-medium">Your Request Has Been Submitted</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our team will contact you soon with a payment link. After payment confirmation, you'll receive a web meeting link within 30 minutes to your registered email.
              </p>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">What Happens Next?</h4>
                <ul className="list-disc list-inside space-y-1 mt-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>You'll receive a payment link via email</li>
                  <li>After payment, we'll send your meeting link</li>
                  <li>The consultation will be conducted via video conference</li>
                  <li>Your session will be with Saikarun Arasada, CFP</li>
                </ul>
              </div>
              
              <Alert variant="default" className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <InfoIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <AlertTitle className="text-blue-800 dark:text-blue-300">Cancellation Policy</AlertTitle>
                <AlertDescription className="text-blue-700 dark:text-blue-400 text-sm">
                  <p>If you need to reschedule or cancel your consultation:</p>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    <li>You may reschedule based on available slots</li>
                    <li>Full refunds are available upon request</li>
                    <li>All refunds will be processed within 7 working days</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </div>
            
              <Button
                onClick={() => onOpenChange(false)}
                category="primary"
                className="w-full"
              >
                Close
              </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
