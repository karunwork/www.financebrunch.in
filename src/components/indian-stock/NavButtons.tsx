
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavButtonsProps {
  className?: string;
}

export function NavButtons({ className = "" }: NavButtonsProps) {
  return (
    <div className={`container mx-auto px-4 ${className}`}>
      <motion.div 
        className="flex flex-wrap items-center gap-4 justify-center md:justify-start"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link to="/">
          <Button variant="outline" size="sm" className="flex items-center gap-2 border-gray-300 dark:border-gray-700">
            <Home className="h-4 w-4" />
            Home
          </Button>
        </Link>
        <Link to="/investment-planning">
          <Button variant="outline" size="sm" className="flex items-center gap-2 border-gray-300 dark:border-gray-700">
            <ArrowLeft className="h-4 w-4" />
            Investment Planning
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
