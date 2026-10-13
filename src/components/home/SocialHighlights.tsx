import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { ArrowLeft, ArrowRight, Instagram, Facebook } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SocialPostProps {
  platform: 'facebook' | 'instagram';
  imageUrl: string;
  content: string;
  date: string;
  likes: number;
}

const socialPosts: SocialPostProps[] = [
  {
    platform: 'instagram',
    imageUrl: 'https://images.unsplash.com/photo-1579621970795-87facc2f976d?q=80&w=2070&auto=format&fit=crop',
    content: 'Planning for retirement? Start your journey with us today! #FinanceBrunch #RetirementPlanning',
    date: '3 days ago',
    likes: 124
  },
  {
    platform: 'facebook',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop',
    content: 'Understanding mutual funds is key to building a diverse portfolio. Let us guide you through the process.',
    date: '1 week ago',
    likes: 89
  },
  {
    platform: 'instagram',
    imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2071&auto=format&fit=crop',
    content: 'Financial freedom starts with a plan. Book a consultation today! #FinancialFreedom #Planning',
    date: '2 weeks ago',
    likes: 156
  },
  {
    platform: 'facebook',
    imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop',
    content: 'Tax season is approaching. Stay ahead with our expert income tax filing services.',
    date: '3 weeks ago',
    likes: 76
  },
  {
    platform: 'instagram',
    imageUrl: 'https://images.unsplash.com/photo-1607863680198-23d4b2565df0?q=80&w=1986&auto=format&fit=crop',
    content: 'Health is wealth. Secure your family with the right health insurance plan. #HealthInsurance #FamilyFirst',
    date: '1 month ago',
    likes: 203
  }
];

const SocialPost = ({ post }: { post: SocialPostProps }) => {
  return (
    <div className="min-w-[300px] w-72 bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden flex flex-col">
      <div className="p-4 flex items-center border-b border-gray-100 dark:border-gray-800">
        {post.platform === 'instagram' ? (
          <Instagram className="h-5 w-5 text-pink-500 mr-2" />
        ) : (
          <Facebook className="h-5 w-5 text-blue-600 mr-2" />
        )}
        <span className="text-sm font-medium">
          {post.platform === 'instagram' ? 'Instagram' : 'Facebook'}
        </span>
        <span className="ml-auto text-xs text-gray-500">{post.date}</span>
      </div>
      
      <div className="relative h-48 bg-gray-200 dark:bg-gray-800">
        <img 
          src={post.imageUrl} 
          alt="Social media post" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4 flex-grow">
        <p className="text-sm text-gray-700 dark:text-gray-300">{post.content}</p>
      </div>
      
      <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800 flex items-center">
        <div className="flex items-center text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 fill-current" viewBox="0 0 20 20">
            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
          </svg>
          <span className="text-xs">{post.likes}</span>
        </div>
        <Button variant="ghost" size="sm" className="ml-auto text-primary text-xs px-3">
          View Post
        </Button>
      </div>
    </div>
  );
};

export default function SocialHighlights() {
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
    
    // Auto-scroll functionality
    const scrollInterval = setInterval(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const scrollAmount = 300; // Width of one post plus gap
        
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
          // If reached the end, reset to beginning
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Otherwise, scroll right
          container.scrollTo({ 
            left: container.scrollLeft + scrollAmount, 
            behavior: 'smooth' 
          });
        }
      }
    }, 5000); // Scroll every 5 seconds
    
    return () => clearInterval(scrollInterval);
  }, [inView]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = 300;
      const newPosition = direction === 'left' 
        ? container.scrollLeft - scrollAmount 
        : container.scrollLeft + scrollAmount;
        
      container.scrollTo({
        left: newPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <div 
          className={cn(
            "max-w-3xl mx-auto text-center mb-16 opacity-0 translate-y-8 transition-all duration-700",
            isVisible && "opacity-100 translate-y-0"
          )}
          ref={ref}
        >
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Social Media
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Connect With Us on Social Media
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Follow us for the latest financial insights, tips, and updates from our expert team.
          </p>
        </div>

        <div className="relative">
          <div 
            className={cn(
              "opacity-0 translate-y-8 transition-all duration-1000",
              isVisible && "opacity-100 translate-y-0"
            )}
          >
            <div 
              ref={scrollContainerRef}
              className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {socialPosts.map((post, index) => (
                <SocialPost key={index} post={post} />
              ))}
            </div>
          </div>
          
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 shadow-lg rounded-full p-2 z-10 transform transition-all hover:scale-110"
            aria-label="Scroll left"
          >
            <ArrowLeft size={20} />
          </button>
          
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 shadow-lg rounded-full p-2 z-10 transform transition-all hover:scale-110"
            aria-label="Scroll right"
          >
            <ArrowRight size={20} />
          </button>
        </div>
        
        <div className="flex justify-center gap-6 mt-12">
          <a 
            href="https://www.instagram.com/financebrunch/?igsh=MWhieWJkMDAyYTJucA%3D%3D&utm_source=qr#" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
          >
            <Instagram className="h-5 w-5" />
            <span>@financebrunch</span>
          </a>
          
          <a 
            href="https://www.facebook.com/profile.php?id=61566898102413" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
          >
            <Facebook className="h-5 w-5" />
            <span>Finance Brunch</span>
          </a>
        </div>
      </div>
    </section>
  );
}
