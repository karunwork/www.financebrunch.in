import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export const SocialLinks: React.FC = () => {
  return (
    <div className="flex items-center space-x-2.5">
      <a 
        href="https://www.facebook.com/profile.php?id=61566898102413" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-slate-600 dark:text-slate-300 hover:text-white hover:bg-gradient-to-tr hover:from-blue-600 hover:to-cyan-500 hover:border-transparent transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-cyan-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
        aria-label="Finance Brunch on Facebook"
      >
        <Facebook size={16} />
      </a>
      <a 
        href="https://x.com/financebrunch" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-slate-600 dark:text-slate-300 hover:text-white hover:bg-gradient-to-tr hover:from-blue-600 hover:to-cyan-500 hover:border-transparent transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-cyan-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
        aria-label="Finance Brunch on Twitter / X"
      >
        <Twitter size={16} />
      </a>
      <a 
        href="https://www.linkedin.com/company/finance-brunch/?viewAsMember=true" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-slate-600 dark:text-slate-300 hover:text-white hover:bg-gradient-to-tr hover:from-blue-600 hover:to-cyan-500 hover:border-transparent transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-cyan-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
        aria-label="Finance Brunch on LinkedIn"
      >
        <Linkedin size={16} />
      </a>
      <a 
        href="https://www.instagram.com/financebrunch/?igsh=MWhieWJkMDAyYTJucA%3D%3D&utm_source=qr#" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-slate-600 dark:text-slate-300 hover:text-white hover:bg-gradient-to-tr hover:from-blue-600 hover:to-cyan-500 hover:border-transparent transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-cyan-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
        aria-label="Finance Brunch on Instagram"
      >
        <Instagram size={16} />
      </a>
    </div>
  );
};
