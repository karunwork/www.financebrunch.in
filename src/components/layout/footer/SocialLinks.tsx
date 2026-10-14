import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export const SocialLinks: React.FC = () => {
  const socialItems = [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/profile.php?id=61566898102413',
      icon: <Facebook size={16} />,
      label: 'Finance Brunch on Facebook',
    },
    {
      name: 'Twitter / X',
      href: 'https://x.com/financebrunch',
      icon: <Twitter size={16} />,
      label: 'Finance Brunch on Twitter / X',
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/finance-brunch/?viewAsMember=true',
      icon: <Linkedin size={16} />,
      label: 'Finance Brunch on LinkedIn',
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/financebrunch/?igsh=MWhieWJkMDAyYTJucA%3D%3D&utm_source=qr#',
      icon: <Instagram size={16} />,
      label: 'Finance Brunch on Instagram',
    },
  ];

  return (
    <div className="flex items-center space-x-2.5">
      {socialItems.map((item) => (
        <a
          key={item.name}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative w-9 h-9 rounded-full flex items-center justify-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/90 dark:border-slate-700/80 text-slate-600 dark:text-slate-300 hover:text-white hover:bg-gradient-to-tr hover:from-blue-600 hover:to-cyan-500 hover:border-transparent transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
          aria-label={item.label}
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
};
