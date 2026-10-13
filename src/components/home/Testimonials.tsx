
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { FadeIn } from '@/components/ui/animation';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Priya Sharma",
      position: "Entrepreneur",
      company: "Innovate Solutions",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      content: "Finance Brunch transformed my investment strategy. Their expert guidance helped me create a diversified portfolio that's yielded incredible returns. The team is always responsive and provides personalized attention.",
      rating: 5,
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      position: "IT Professional",
      company: "TechCore Systems",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      content: "I've been working with Finance Brunch for my mutual fund investments for over 5 years. Their deep market knowledge and personalized approach has helped me achieve my financial goals faster than I expected.",
      rating: 5,
    },
    {
      id: 3,
      name: "Ananya Patel",
      position: "Doctor",
      company: "Metro Hospitals",
      avatar: "https://randomuser.me/api/portraits/women/63.jpg",
      content: "The health insurance solutions provided by Finance Brunch offer comprehensive coverage at competitive rates. Their team guided me through the entire process and found the perfect plan for my family's needs.",
      rating: 4,
    },
    {
      id: 4,
      name: "Vikram Singh",
      position: "Business Owner",
      company: "Frontier Exports",
      avatar: "https://randomuser.me/api/portraits/men/72.jpg",
      content: "Finance Brunch has been instrumental in helping me secure my family's future with the right term insurance policy. Their attention to detail and understanding of my requirements was impressive.",
      rating: 5,
    },
    {
      id: 5,
      name: "Meera Reddy",
      position: "Marketing Director",
      company: "Creative Solutions",
      avatar: "https://randomuser.me/api/portraits/women/17.jpg",
      content: "The financial planning services offered by Finance Brunch are exceptional. They created a roadmap that aligned perfectly with my goals, and their regular reviews ensure I stay on track.",
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const maxIndex = testimonials.length - 1;
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev === maxIndex ? 0 : prev + 1));
    }, 6000);

    return () => clearInterval(timer);
  }, [maxIndex]);

  const goToPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(prev => (prev === 0 ? maxIndex : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(prev => (prev === maxIndex ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToIndex = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };


  return (
    <section id="testimonials" className="py-24 bg-transparent overflow-hidden">
      <div className="container px-4 mx-auto">
        <FadeIn direction="up" className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Client Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            What Our Clients Say About Us
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Discover why thousands of clients trust Finance Brunch with their financial future.
          </p>
        </FadeIn>

        <FadeIn direction="up" delay={0.15} className="relative max-w-4xl mx-auto">

          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="group bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-lg p-8 md:p-10 border border-gray-100 dark:border-gray-800 hover:border-primary/25 transition-all duration-300">
                    <div className="flex flex-col h-full">
                      <div className="mb-6 flex-shrink-0">
                        <Quote size={48} className="text-primary/20 transition-all duration-300 group-hover:text-primary/40 group-hover:scale-105" />
                      </div>
                      
                      <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 flex-grow">
                        "{testimonial.content}"
                      </p>
                      
                      <div className="flex items-center mt-auto">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name} 
                          className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-primary/20 transition-all duration-300 group-hover:scale-105 group-hover:border-primary/50"
                        />
                        <div>
                          <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {testimonial.position}, {testimonial.company}
                          </p>
                          <div className="flex mt-1">
                            {[...Array(5)].map((_, i) => (
                              <svg 
                                key={i}
                                xmlns="http://www.w3.org/2000/svg" 
                                className={cn(
                                  "h-4 w-4", 
                                  i < testimonial.rating ? "text-yellow-500" : "text-gray-300"
                                )}
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-4">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-md hover:bg-white dark:hover:bg-gray-900 hover:scale-110 active:scale-95 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary"
              onClick={goToPrev}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} className="transition-transform duration-200 hover:-translate-x-0.5" />
            </Button>
          </div>
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-4">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-md hover:bg-white dark:hover:bg-gray-900 hover:scale-110 active:scale-95 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary"
              onClick={goToNext}
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} className="transition-transform duration-200 hover:translate-x-0.5" />
            </Button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-10">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-3 h-3 mx-1 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  index === currentIndex 
                    ? "bg-primary w-8" 
                    : "bg-gray-300 dark:bg-gray-700 hover:bg-primary/50 hover:scale-125"
                )}
                onClick={() => goToIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
