
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const [isHammering, setIsHammering] = useState(true);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    // Toggle hammering animation
    const interval = setInterval(() => {
      setIsHammering(prev => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 overflow-hidden">
      <div className="max-w-md w-full text-center">
        <div className="relative w-full h-64 mb-8">
          {/* Character and graph SVG animation */}
          <svg 
            viewBox="0 0 400 200" 
            className="w-full h-full"
            aria-hidden="true"
          >
            {/* Graph background */}
            <rect x="50" y="30" width="300" height="140" fill="#f0f0f0" stroke="#cccccc" strokeWidth="2" rx="4" ry="4" />
            
            {/* Graph grid lines */}
            <g stroke="#e0e0e0" strokeWidth="1">
              <line x1="50" y1="50" x2="350" y2="50" />
              <line x1="50" y1="80" x2="350" y2="80" />
              <line x1="50" y1="110" x2="350" y2="110" />
              <line x1="50" y1="140" x2="350" y2="140" />
              <line x1="50" y1="170" x2="350" y2="170" />
              
              <line x1="80" y1="30" x2="80" y2="170" />
              <line x1="140" y1="30" x2="140" y2="170" />
              <line x1="200" y1="30" x2="200" y2="170" />
              <line x1="260" y1="30" x2="260" y2="170" />
              <line x1="320" y1="30" x2="320" y2="170" />
            </g>
            
            {/* Broken graph line */}
            <polyline 
              points="80,140 140,90 200,100 260,70 320,130" 
              fill="none" 
              stroke="#9333ea" 
              strokeWidth="3"
              strokeDasharray="5,5"
            />
            
            {/* Error point */}
            <circle cx="200" cy="100" r="6" fill="#ef4444" />
            
            {/* Character */}
            <g transform="translate(180, 90)">
              {/* Body */}
              <circle cx="0" cy="0" r="12" fill="#3b82f6" />
              
              {/* Head */}
              <circle cx="0" cy="-20" r="8" fill="#f59e0b" />
              
              {/* Arms */}
              <line x1="-12" y1="-5" x2="-20" y2="-15" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
              
              {/* Right arm with hammer (animated) */}
              <g transform={isHammering ? "rotate(-40)" : "rotate(-10)"}>
                <line x1="12" y1="-5" x2="22" y2="-15" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
                <rect x="20" y="-28" width="6" height="10" fill="#64748b" />
                <rect x="16" y="-32" width="14" height="6" fill="#64748b" />
              </g>
              
              {/* Legs */}
              <line x1="-5" y1="12" x2="-10" y2="25" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
              <line x1="5" y1="12" x2="10" y2="25" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
            </g>
            
            {/* Error number */}
            <text x="200" y="190" fontSize="30" fontWeight="bold" fill="#ef4444" textAnchor="middle">404</text>
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Oops! Page not found</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          We're working on fixing this issue. The page you're looking for doesn't exist or is temporarily unavailable.
        </p>
        
        <Button asChild size="lg" className="button-hover mt-2">
          <a href="/" className="inline-flex items-center">
            <Home className="mr-2 h-4 w-4" />
            Return to Home
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
