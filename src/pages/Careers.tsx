
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Building, BriefcaseBusiness, GraduationCap, Globe, Users, 
  ChevronRight, Clock, Keyboard, Languages, MapPin, Send, Briefcase,
  CheckCircle2, UserCheck, User, Mail, Phone, FileText, Calendar, Award
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Define the form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  position: z.string().min(1, { message: "Please select a position." }),
  experience: z.string().min(1, { message: "Please select your experience level." }),
  location: z.string().min(1, { message: "Please select your preferred location." }),
  resume: z.string().min(1, { message: "Please provide a link to your resume." }),
  typingSpeed: z.string().min(1, { message: "Please select your typing speed." }),
  englishLevel: z.string().min(1, { message: "Please select your English proficiency level." }),
  message: z.string().optional(),
});

// Job listings data
const jobListings = [
  {
    id: 1,
    title: "Financial Advisor",
    department: "Advisory Services",
    location: "Mumbai",
    type: "Full-time",
    experience: "2-5 years",
    description: "Responsible for providing financial advice and planning services to clients, developing investment strategies, and maintaining client relationships.",
    requirements: [
      "Bachelor's degree in Finance, Economics, or related field",
      "CFP certification or pursuing certification",
      "Excellent communication and interpersonal skills",
      "Strong knowledge of financial products and markets",
      "Typing speed of at least 40 WPM",
      "Proficient English communication skills"
    ],
    responsibilities: [
      "Conduct financial needs analysis for clients",
      "Develop personalized investment strategies",
      "Monitor and review client portfolios",
      "Provide regular updates and financial education",
      "Generate new business through referrals and networking"
    ]
  },
  {
    id: 2,
    title: "Investment Analyst",
    department: "Research & Analysis",
    location: "New Delhi",
    type: "Full-time",
    experience: "1-3 years",
    description: "Support the investment team by conducting market research, analyzing financial data, and preparing investment recommendations for clients.",
    requirements: [
      "Bachelor's degree in Finance, Economics, or related field",
      "Strong analytical and quantitative skills",
      "Knowledge of financial modeling and valuation techniques",
      "Proficiency in Microsoft Excel and financial analysis tools",
      "Typing speed of at least 50 WPM",
      "Advanced English communication skills"
    ],
    responsibilities: [
      "Conduct research on financial markets and investment opportunities",
      "Analyze company financial statements and performance metrics",
      "Prepare investment reports and presentations",
      "Monitor economic indicators and market trends",
      "Support senior advisors with client portfolio management"
    ]
  },
  {
    id: 3,
    title: "Insurance Specialist",
    department: "Insurance Services",
    location: "Remote",
    type: "Full-time",
    experience: "2-4 years",
    description: "Provide expertise in health and term insurance products, assess client needs, and recommend appropriate insurance solutions.",
    requirements: [
      "Bachelor's degree in any field",
      "IRDA license or relevant insurance certification",
      "Experience in insurance sales or advisory",
      "Strong knowledge of insurance products and underwriting processes",
      "Typing speed of at least 40 WPM",
      "Proficient English communication skills"
    ],
    responsibilities: [
      "Assess client insurance needs and risk profiles",
      "Recommend appropriate insurance products and coverage levels",
      "Guide clients through the application and underwriting process",
      "Review and update existing insurance policies",
      "Assist with claims processing and resolution"
    ]
  },
  {
    id: 4,
    title: "FIRE Strategy Consultant",
    department: "Retirement Planning",
    location: "Bangalore",
    type: "Full-time",
    experience: "3-7 years",
    description: "Specialize in helping clients achieve Financial Independence and Retire Early through strategic financial planning and investment strategies.",
    requirements: [
      "Bachelor's degree in Finance or related field",
      "CFP certification preferred",
      "Personal experience or deep knowledge of FIRE principles",
      "Strong mathematical and analytical skills",
      "Typing speed of at least 45 WPM",
      "Advanced English communication skills"
    ],
    responsibilities: [
      "Develop personalized FIRE strategies for clients",
      "Create detailed financial projections and retirement scenarios",
      "Optimize investment portfolios for long-term growth and passive income",
      "Educate clients on financial independence principles",
      "Monitor and adjust strategies to ensure clients stay on track"
    ]
  },
  {
    id: 5,
    title: "Tax Planning Specialist",
    department: "Tax Services",
    location: "Mumbai",
    type: "Full-time",
    experience: "3-5 years",
    description: "Provide expert tax planning and preparation services for individuals and small businesses to optimize tax efficiency and compliance.",
    requirements: [
      "Bachelor's degree in Accounting, Finance, or related field",
      "CA or relevant tax certification",
      "Strong knowledge of Indian tax laws and regulations",
      "Experience with tax preparation software",
      "Typing speed of at least 50 WPM",
      "Proficient English communication skills"
    ],
    responsibilities: [
      "Prepare and review income tax returns",
      "Develop tax-efficient investment and financial strategies",
      "Keep clients informed about tax law changes",
      "Represent clients during tax inquiries or audits",
      "Provide year-round tax planning advice"
    ]
  }
];

// Team data
const teamMembers = [
  {
    name: "SAIKARUN ARASADA",
    position: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    bio: "SAIKARUN ARASADA brings over 7 years of financial expertise with an MBA in Finance and CFP certification. Under his visionary leadership, Finance Brunch has helped over 30,000 clients achieve their financial goals and manage assets worth ₹100+ crores.",
    linkedIn: "#"
  },
  {
    name: "Priya Sharma",
    position: "Chief Investment Officer",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    bio: "With 12 years of experience in investment management and a CFA certification, Priya oversees all investment strategies and portfolio management services at Finance Brunch.",
    linkedIn: "#"
  },
  {
    name: "Rajiv Mehta",
    position: "Head of Insurance Services",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    bio: "Rajiv is an insurance expert with 10 years in the industry and holds multiple insurance certifications. He leads our insurance advisory team, specializing in health and term coverage.",
    linkedIn: "#"
  },
  {
    name: "Ananya Patel",
    position: "FIRE Strategy Expert",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    bio: "Ananya has helped over 200 clients achieve financial independence. She specializes in early retirement planning and passive income strategies for IT professionals.",
    linkedIn: "#"
  },
  {
    name: "Rahul Kapoor",
    position: "Head of Global Operations",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    bio: "Rahul manages our global presence across 5 countries. With an MBA from INSEAD, he ensures our international clients receive culturally appropriate financial advice.",
    linkedIn: "#"
  },
  {
    name: "Neha Gupta",
    position: "Tax Planning Specialist",
    image: "https://images.unsplash.com/photo-1554727242-741c14fa561c?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    bio: "Neha is a Chartered Accountant with 8 years of experience in tax advisory. She leads our tax planning and filing services, helping clients maximize their tax efficiency.",
    linkedIn: "#"
  }
];

// Office locations
const officeLocations = [
  {
    city: "Mumbai",
    address: "Finance Brunch HQ, 25th Floor, World Trade Center, Cuffe Parade, Mumbai 400005",
    phone: "+91 22 6789 1234",
    email: "mumbai@financebrunch.in",
    isHeadquarters: true
  },
  {
    city: "New Delhi",
    address: "Finance Brunch Delhi, 12th Floor, Connaught Place Tower, New Delhi 110001",
    phone: "+91 11 2345 6789",
    email: "delhi@financebrunch.in"
  },
  {
    city: "New York",
    address: "Finance Brunch US, 350 Fifth Avenue, 21st Floor, New York, NY 10118",
    phone: "+1 212 555 7890",
    email: "newyork@financebrunch.in"
  },
  {
    city: "London",
    address: "Finance Brunch UK, 30 St Mary Axe, London EC3A 8BF",
    phone: "+44 20 7123 4567",
    email: "london@financebrunch.in"
  },
  {
    city: "Dubai",
    address: "Finance Brunch ME, Dubai International Financial Centre, Gate Village, Dubai",
    phone: "+971 4 123 4567",
    email: "dubai@financebrunch.in"
  },
  {
    city: "Singapore",
    address: "Finance Brunch APAC, One Raffles Place, Tower 2, Singapore 048616",
    phone: "+65 6123 4567",
    email: "singapore@financebrunch.in"
  }
];

const Careers = () => {
  const [activeTab, setActiveTab] = useState("openings");
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      position: "",
      experience: "",
      location: "",
      resume: "",
      typingSpeed: "",
      englishLevel: "",
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log(values);
      setIsSubmitting(false);
      setApplicationSubmitted(true);
      toast({
        title: "Application Submitted!",
        description: "We'll review your application and get back to you soon.",
      });
      form.reset();
    }, 1500);
  };

  const selectJob = (id: number) => {
    setSelectedJob(id);
    const job = jobListings.find(job => job.id === id);
    if (job) {
      form.setValue("position", job.title);
    }
    setActiveTab("apply");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white dark:from-darkblue-900 dark:to-gray-950 py-20 md:py-32">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <div className="mb-6 p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Join Our Global Financial Team</h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8">
                Build your career with Finance Brunch and help clients achieve financial freedom across the globe
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-white"
                  onClick={() => setActiveTab("openings")}
                >
                  View Open Positions
                  <ChevronRight className="ml-1 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => setActiveTab("team")}
                >
                  Meet Our Team
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Main Content */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 mx-auto">
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full md:w-[500px] mx-auto grid-cols-3 mb-12">
                <TabsTrigger value="openings">Job Openings</TabsTrigger>
                <TabsTrigger value="team">Our Team</TabsTrigger>
                <TabsTrigger value="apply">Apply Now</TabsTrigger>
              </TabsList>
              
              {/* Job Openings Tab */}
              <TabsContent value="openings" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {jobListings.map((job) => (
                    <Card key={job.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <CardHeader className="bg-primary/5 dark:bg-primary/10">
                        <CardTitle>{job.title}</CardTitle>
                        <CardDescription className="flex flex-col space-y-2 mt-2">
                          <div className="flex items-center text-sm">
                            <Briefcase className="h-4 w-4 mr-2 text-primary" />
                            <span>{job.department}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 mr-2 text-primary" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Clock className="h-4 w-4 mr-2 text-primary" />
                            <span>{job.type}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <GraduationCap className="h-4 w-4 mr-2 text-primary" />
                            <span>{job.experience}</span>
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          {job.description}
                        </p>
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="requirements">
                            <AccordionTrigger className="text-sm font-medium">
                              Requirements
                            </AccordionTrigger>
                            <AccordionContent>
                              <ul className="list-disc pl-5 text-sm space-y-1">
                                {job.requirements.map((req, idx) => (
                                  <li key={idx}>{req}</li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="responsibilities">
                            <AccordionTrigger className="text-sm font-medium">
                              Responsibilities
                            </AccordionTrigger>
                            <AccordionContent>
                              <ul className="list-disc pl-5 text-sm space-y-1">
                                {job.responsibilities.map((resp, idx) => (
                                  <li key={idx}>{resp}</li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          className="w-full" 
                          onClick={() => selectJob(job.id)}
                        >
                          Apply for this Position
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              {/* Our Team Tab */}
              <TabsContent value="team" className="space-y-10">
                <div className="text-center max-w-3xl mx-auto mb-12">
                  <h2 className="text-3xl font-bold mb-4">Meet the Finance Brunch Team</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    Our team of financial experts is dedicated to helping clients achieve their financial goals. 
                    With diverse backgrounds and specializations, we provide comprehensive financial services.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {teamMembers.map((member, index) => (
                    <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-square relative overflow-hidden">
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle>{member.name}</CardTitle>
                        <CardDescription>{member.position}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {member.bio}
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full" onClick={() => window.open(member.linkedIn, '_blank')}>
                          Connect on LinkedIn
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-16 bg-white dark:bg-gray-800 rounded-xl p-8 shadow">
                  <h3 className="text-2xl font-bold mb-6">Our Global Offices</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {officeLocations.map((office, idx) => (
                      <div key={idx} className={cn(
                        "p-5 rounded-lg border", 
                        office.isHeadquarters 
                          ? "border-primary/50 bg-primary/5 dark:bg-primary/10" 
                          : "border-gray-200 dark:border-gray-700"
                      )}>
                        <div className="flex items-start mb-4">
                          <Building className={cn(
                            "h-5 w-5 mr-2 mt-1", 
                            office.isHeadquarters 
                              ? "text-primary" 
                              : "text-gray-500 dark:text-gray-400"
                          )} />
                          <div>
                            <h4 className="font-medium text-lg">{office.city}</h4>
                            {office.isHeadquarters && (
                              <span className="inline-block px-2 py-1 text-xs bg-primary/20 text-primary rounded mb-2">
                                Headquarters
                              </span>
                            )}
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {office.address}
                            </p>
                          </div>
                        </div>
                        <div className="text-sm space-y-2">
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                            <span>{office.phone}</span>
                          </div>
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                            <span>{office.email}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              {/* Apply Now Tab */}
              <TabsContent value="apply" className="max-w-3xl mx-auto">
                {applicationSubmitted ? (
                  <div className="text-center bg-white dark:bg-gray-800 rounded-xl p-10 shadow">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
                      <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Application Submitted!</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                      Thank you for your interest in joining Finance Brunch. Our team will review your application 
                      and get back to you soon.
                    </p>
                    <div className="flex justify-center gap-4">
                      <Button variant="outline" onClick={() => setActiveTab("openings")}>
                        View Other Openings
                      </Button>
                      <Button onClick={() => {
                        setApplicationSubmitted(false);
                        form.reset();
                      }}>
                        Submit Another Application
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>Apply to Finance Brunch</CardTitle>
                      <CardDescription>
                        Fill out the form below to apply for a position. All fields marked with * are required.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Full Name *</FormLabel>
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
                                  <FormLabel>Email Address *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="john.doe@example.com" {...field} />
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
                                  <FormLabel>Phone Number *</FormLabel>
                                  <FormControl>
                                    <Input placeholder="+91 9876543210" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="position"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Position Applying For *</FormLabel>
                                  <Select 
                                    onValueChange={field.onChange} 
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select position" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {jobListings.map(job => (
                                        <SelectItem key={job.id} value={job.title}>
                                          {job.title}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="experience"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Years of Experience *</FormLabel>
                                  <Select 
                                    onValueChange={field.onChange} 
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select experience" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="0-1 years">0-1 years</SelectItem>
                                      <SelectItem value="1-3 years">1-3 years</SelectItem>
                                      <SelectItem value="3-5 years">3-5 years</SelectItem>
                                      <SelectItem value="5-10 years">5-10 years</SelectItem>
                                      <SelectItem value="10+ years">10+ years</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="location"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Preferred Location *</FormLabel>
                                  <Select 
                                    onValueChange={field.onChange} 
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select location" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {officeLocations.map((location, idx) => (
                                        <SelectItem key={idx} value={location.city}>
                                          {location.city}
                                        </SelectItem>
                                      ))}
                                      <SelectItem value="Remote">Remote</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="typingSpeed"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Typing Speed (WPM) *</FormLabel>
                                  <Select 
                                    onValueChange={field.onChange} 
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select typing speed" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="30-40 WPM">30-40 WPM</SelectItem>
                                      <SelectItem value="40-50 WPM">40-50 WPM</SelectItem>
                                      <SelectItem value="50-60 WPM">50-60 WPM</SelectItem>
                                      <SelectItem value="60-70 WPM">60-70 WPM</SelectItem>
                                      <SelectItem value="70+ WPM">70+ WPM</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="englishLevel"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>English Proficiency *</FormLabel>
                                  <Select 
                                    onValueChange={field.onChange} 
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select proficiency level" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="Basic">Basic</SelectItem>
                                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                                      <SelectItem value="Advanced">Advanced</SelectItem>
                                      <SelectItem value="Fluent">Fluent</SelectItem>
                                      <SelectItem value="Native">Native</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="resume"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Resume/CV Link *</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="https://drive.google.com/file/your-resume" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Additional Information</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Tell us why you're interested in this position and what makes you a good fit." 
                                    className="min-h-32"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? (
                              <>
                                <span className="mr-2">Submitting...</span>
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                              </>
                            ) : (
                              <>
                                <Send className="mr-2 h-4 w-4" />
                                Submit Application
                              </>
                            )}
                          </Button>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Why Join Us Section */}
        <section className="py-20 bg-white dark:bg-gray-950">
          <div className="container px-4 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Join Finance Brunch?</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Build your career with a company that values innovation, growth, and work-life balance
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4 text-green-600 dark:text-green-400">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Professional Growth</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Continuous learning opportunities with sponsored certifications, training programs, and mentorship from industry experts.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Global Opportunities</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Work with international clients and opportunities for global relocation across our offices in Mumbai, New Delhi, New York, London, Dubai, and Singapore.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4 text-purple-600 dark:text-purple-400">
                  <BriefcaseBusiness className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Competitive Benefits</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Industry-leading compensation, comprehensive health insurance, retirement plans, and performance bonuses.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-4 text-orange-600 dark:text-orange-400">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Inclusive Culture</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  A diverse and inclusive workplace that celebrates different perspectives and fosters a collaborative environment.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4 text-indigo-600 dark:text-indigo-400">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Recognition & Rewards</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Your contributions are valued and recognized through our employee recognition programs, awards, and career advancement opportunities.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4 text-red-600 dark:text-red-400">
                  <UserCheck className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Work-Life Balance</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Flexible work arrangements, generous paid time off, wellness programs, and a culture that respects personal time.
                </p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Button 
                onClick={() => setActiveTab("openings")}
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Explore Opportunities
                <ChevronRight className="ml-1 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Careers;
