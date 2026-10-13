
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Building, Clock, BarChart, Shield, TrendingUp, Globe, Landmark } from 'lucide-react';

export function StockMarketHistory() {
  const timelineEvents = [
    {
      year: "1875",
      title: "Birth of BSE",
      description: "The Bombay Stock Exchange was established under a banyan tree in Mumbai's Dalal Street, becoming Asia's first stock exchange.",
      icon: <Building className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      imageAlt: "Historic Bombay Stock Exchange Building",
      imageCaption: "The iconic BSE building at Dalal Street, Mumbai"
    },
    {
      year: "1956",
      title: "Securities Contracts Regulation Act",
      description: "The Indian government established the legislative framework to regulate securities markets with the SCRA.",
      icon: <Landmark className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
      image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      imageAlt: "Legal Documents",
      imageCaption: "The SCRA provided the legal foundation for securities markets in India"
    },
    {
      year: "1992",
      title: "Birth of SEBI",
      description: "The Securities and Exchange Board of India was established as the regulatory authority for securities markets.",
      icon: <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
      image: "https://images.unsplash.com/photo-1539057083366-e9c81a8d33e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      imageAlt: "SEBI Headquarters",
      imageCaption: "SEBI brought standardized regulations and investor protections"
    },
    {
      year: "1994",
      title: "National Stock Exchange (NSE)",
      description: "The NSE was founded as India's first electronic exchange, bringing technological innovation to trading.",
      icon: <BarChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
      image: "https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      imageAlt: "Modern NSE Building",
      imageCaption: "NSE revolutionized trading with its electronic platform"
    },
    {
      year: "1996",
      title: "Dematerialization Era",
      description: "The National Securities Depository Limited (NSDL) was established, transforming physical share certificates into electronic form.",
      icon: <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80",
      imageAlt: "Digital Trading",
      imageCaption: "Dematerialization reduced fraud and increased market efficiency"
    },
    {
      year: "Present Day",
      title: "Global Integration",
      description: "Indian stock markets are now fully integrated with global financial systems, with advanced derivative products and cutting-edge technology.",
      icon: <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1115&q=80",
      imageAlt: "Modern Trading Floor",
      imageCaption: "Modern algorithmic trading and global market access"
    }
  ];

  return (
    <section id="stock-market-history" className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-4">
            Historical Perspective
          </span>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Evolution of Indian Stock Markets
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
            From open outcry trading under a banyan tree to sophisticated electronic platforms
          </p>
        </motion.div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-indigo-500 hidden md:block"></div>
          
          <div className="space-y-16 md:space-y-24">
            {timelineEvents.map((event, index) => (
              <TimelineItem 
                key={event.year} 
                event={event} 
                isEven={index % 2 === 0} 
                index={index} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ event, isEven, index }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const variants = {
    hidden: { 
      opacity: 0, 
      x: isEven ? -30 : 30 
    },
    visible: { 
      opacity: 1, 
      x: 0,
        transition: {
          duration: 0.6,
          ease: "easeOut" as const,
          delay: 0.2
        }
    }
  };

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9,
      x: isEven ? 30 : -30 
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      x: 0,
        transition: {
          duration: 0.6,
          ease: "easeOut" as const,
          delay: 0.4
        }
    }
  };

  return (
    <div ref={ref} className="relative">
      <div className="flex flex-col md:flex-row items-center">
        {/* Content Section */}
        <motion.div 
          className={`md:w-1/2 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:order-2'}`}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={variants}
        >
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-start mb-4">
              <div className="h-10 w-10 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-900/40 mr-4">
                {event.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400">{event.year}</h3>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{event.title}</h4>
              </div>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300">
              {event.description}
            </p>
          </div>
        </motion.div>
        
        {/* Timeline dot - visible only on md screens and up */}
        <div className="relative z-10 hidden md:flex items-center justify-center">
          <motion.div 
            className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 border-4 border-blue-500 shadow-lg flex items-center justify-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <span className="text-xs font-bold text-blue-500">{index + 1}</span>
          </motion.div>
        </div>
        
        {/* Image Section */}
        <motion.div 
          className={`md:w-1/2 ${isEven ? 'md:order-2 md:pl-12' : 'md:pr-12'} mt-6 md:mt-0`}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={imageVariants}
        >
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img 
              src={event.image} 
              alt={event.imageAlt} 
              className="w-full h-auto object-cover"
            />
            <div className="bg-gradient-to-t from-black/80 to-transparent p-4 text-white absolute bottom-0 left-0 right-0">
              <p className="text-sm">{event.imageCaption}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
