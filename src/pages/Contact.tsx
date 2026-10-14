import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, ShieldCheck, Send, MessageSquare, ArrowLeft, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Link, useSearchParams } from 'react-router-dom';

const Contact = () => {
  const [searchParams] = useSearchParams();
  const subjectParam = searchParams.get('subject') || searchParams.get('service');
  
  const resolveInitialService = (param: string | null) => {
    if (!param) return 'Investment Planning';
    if (param === 'Mutual Fund Advisory' || param === 'Mutual Funds') {
      return 'Mutual Fund Advisory';
    }
    return param;
  };

  const initialService = resolveInitialService(subjectParam);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: initialService,
    message: initialService === 'Mutual Fund Advisory'
      ? 'I would like to consult with a mutual fund advisor regarding my investment plan.'
      : '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (subjectParam) {
      const resolved = resolveInitialService(subjectParam);
      setFormData((prev) => ({
        ...prev,
        service: resolved,
        message: prev.message || (resolved === 'Mutual Fund Advisory' ? 'I would like to consult with a mutual fund advisor regarding my investment plan.' : ''),
      }));
    }
  }, [subjectParam]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast.success('Thank you! Your message has been sent. Our advisor will reach out shortly.');
    }, 1000);
  };

  const handleWhatsAppChat = () => {
    const message = encodeURIComponent(
      `Hi Finance Brunch Team, my name is ${formData.name || 'there'}. I would like to consult about ${formData.service || 'Financial Planning'}.`
    );
    window.open(`https://wa.me/917842494981?text=${message}`, '_blank');
  };

  return (
    <main className="flex-grow pt-20 pb-20 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-darkblue-950 dark:via-darkblue-900 dark:to-darkblue-950 min-h-screen">
      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb navigation */}
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
            <MessageSquare className="h-4 w-4" />
            Direct Advisor Support
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
            Get in Touch with <span className="text-blue-600 dark:text-blue-400">Finance Brunch</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Have questions about investments, mutual funds, taxes, or insurance? Our certified financial experts are ready to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-darkblue-900/80 backdrop-blur-md shadow-sm">
              <CardContent className="p-6 space-y-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white pb-2 border-b border-gray-100 dark:border-gray-800">
                  Contact Information
                </h2>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-200 text-sm">Phone & WhatsApp</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-0.5">+91 78424 94981</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">Mon - Sat, 9:00 AM - 7:00 PM IST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-200 text-sm">Email Address</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-0.5">contact@financebrunch.com</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">support@financebrunch.in</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-200 text-sm">Corporate Office</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-0.5">
                      FinanceBrunch Strategies Pvt. Ltd.<br />
                      Financial District, Gachibowli<br />
                      Hyderabad, Telangana 500032, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-green-50 dark:bg-green-900/40 text-green-600 dark:text-green-400 shrink-0">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-200 text-sm">Regulatory Credentials</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      • NISM Certified Financial Advisors<br />
                      • ARN Registered Mutual Fund Distributor<br />
                      • IRDAI Licensed Insurance Specialist
                    </p>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleWhatsAppChat}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium gap-2 shadow-sm"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Chat on WhatsApp
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950/40"
                  >
                    <a href="tel:+917842494981">
                      <Phone className="h-4 w-4 mr-2" />
                      Direct Call
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick stats / reassurance */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/60 dark:bg-darkblue-900/60 border border-gray-100 dark:border-gray-800 text-center">
                <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                <div className="text-lg font-bold text-gray-900 dark:text-white">&lt; 2 Hours</div>
                <div className="text-xs text-gray-500">Average Response Time</div>
              </div>
              <div className="p-4 rounded-xl bg-white/60 dark:bg-darkblue-900/60 border border-gray-100 dark:border-gray-800 text-center">
                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
                <div className="text-lg font-bold text-gray-900 dark:text-white">100% Free</div>
                <div className="text-xs text-gray-500">Initial Consultation</div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-darkblue-900 shadow-sm">
              <CardContent className="p-6 sm:p-8">
                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Message Received!</h3>
                    <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                      Thank you for contacting Finance Brunch. Our dedicated advisor will review your query and connect with you shortly.
                    </p>
                    <div className="pt-4">
                      <Button
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({ name: '', email: '', phone: '', service: 'Investment Planning', message: '' });
                        }}
                        variant="outline"
                      >
                        Send Another Message
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        Send Us a Message
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Fill out the form below and an investment specialist will reach out.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Rahul Sharma"
                          required
                          className="bg-gray-50/50 dark:bg-darkblue-800"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <Input
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          required
                          className="bg-gray-50/50 dark:bg-darkblue-800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          required
                          className="bg-gray-50/50 dark:bg-darkblue-800"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Area of Interest
                        </label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full h-10 px-3 rounded-md border border-input bg-gray-50/50 dark:bg-darkblue-800 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Mutual Fund Advisory">Mutual Fund Advisory</option>
                          <option value="Investment Planning">Investment Planning</option>
                          <option value="Mutual Funds">Mutual Funds</option>
                          <option value="Health Insurance">Health Insurance</option>
                          <option value="Term Insurance">Term Insurance</option>
                          <option value="FIRE Strategy / Early Retirement">FIRE Strategy / Early Retirement</option>
                          <option value="Income Tax Filing">Income Tax Filing</option>
                          <option value="Indian Stock Analysis">Indian Stock Analysis</option>
                          <option value="Unlisted Shares">Unlisted Shares</option>
                          <option value="IPO Analysis">IPO Analysis</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        How can we help you?
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Tell us about your financial goals, existing portfolio, or specific questions..."
                        className="bg-gray-50/50 dark:bg-darkblue-800 resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 shadow-sm transition-all"
                    >
                      {isSubmitting ? (
                        <span>Sending message...</span>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span>Submit Request</span>
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                      🔒 Your information is confidential and will never be shared with third parties.
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
