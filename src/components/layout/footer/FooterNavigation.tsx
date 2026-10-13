import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { scrollToSection } from '@/lib/scrollUtils';

interface NavItem {
  name: string;
  href: string;
  isExternal?: boolean;
}

interface NavSection {
  number: string;
  title: string;
  items: NavItem[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    number: '01',
    title: 'EXPLORE',
    items: [
      { name: 'Investment Planning', href: '/investment-planning' },
      { name: 'Mutual Funds', href: '/mutual-funds' },
      { name: 'Global Tax File', href: '/global-tax-file' },
      { name: 'FIRE Strategy / Early Retirement', href: '/fire-strategy' },
      { name: 'Wealth Management', href: '/investment-planning' },
      { name: 'Insurance Solutions', href: '/insurance-planning' },
      { name: 'Income Tax Filing', href: '/income-tax-filing' },
    ],
  },
  {
    number: '02',
    title: 'DISCOVER',
    items: [
      { name: 'About Us', href: '/#about' },
      { name: 'Financial Calculators', href: '/calculator' },
      { name: 'Indian Stock Analysis', href: '/indian-stock-analysis' },
      { name: 'Pre-IPO & Unlisted Shares', href: '/unlisted-shares' },
      { name: 'Global Presence', href: '/#global' },
      { name: 'Client Testimonials', href: '/#testimonials' },
      { name: 'Careers & Opportunities', href: '/careers' },
    ],
  },
  {
    number: '03',
    title: 'CONNECT',
    items: [
      { name: 'Contact Advisory', href: '/contact' },
      { name: 'Direct Phone: +91 7842-494-981', href: 'tel:+917842494981', isExternal: true },
      { name: 'Email: admin@financebrunch.in', href: 'mailto:admin@financebrunch.in', isExternal: true },
      { name: 'LinkedIn Company', href: 'https://www.linkedin.com/company/finance-brunch/?viewAsMember=true', isExternal: true },
      { name: 'Twitter / X Profile', href: 'https://x.com/financebrunch', isExternal: true },
      { name: 'Instagram Community', href: 'https://www.instagram.com/financebrunch/?igsh=MWhieWJkMDAyYTJucA%3D%3D&utm_source=qr#', isExternal: true },
      { name: 'Schedule Consultation', href: '/contact' },
    ],
  },
  {
    number: '04',
    title: 'LEGAL',
    items: [
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms-of-service' },
      { name: 'Regulatory Disclaimer', href: '/disclaimer' },
      { name: 'IRDAI & NISM Compliance', href: '/disclaimer' },
      { name: 'Corporate Verification (CIN)', href: '/disclaimer' },
    ],
  },
];

export const FooterNavigation: React.FC = () => {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const location = useLocation();

  const handleLinkClick = (href: string, e: React.MouseEvent) => {
    if (href.startsWith('/#')) {
      const sectionId = href.replace('/#', '');
      if (location.pathname === '/') {
        e.preventDefault();
        window.history.pushState(null, '', `#${sectionId}`);
        scrollToSection(sectionId, true);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 my-14">
      {NAV_SECTIONS.map((section) => {
        const isSectionActive = hoveredSection === section.number;

        return (
          <div 
            key={section.number}
            className="flex flex-col space-y-4"
            onMouseEnter={() => setHoveredSection(section.number)}
            onMouseLeave={() => setHoveredSection(null)}
          >
            {/* Numbered Section Header */}
            <div className="flex items-center space-x-2.5 pb-2 border-b border-slate-200/70 dark:border-slate-800 transition-colors duration-200">
              <span 
                className={`font-mono text-xs font-semibold tracking-wider transition-colors duration-200 ${
                  isSectionActive 
                    ? 'text-cyan-500 dark:text-cyan-400' 
                    : 'text-slate-400 dark:text-slate-500'
                }`}
              >
                {section.number} /
              </span>
              <h3 
                className={`text-sm font-semibold tracking-wider uppercase transition-colors duration-200 ${
                  isSectionActive 
                    ? 'text-slate-900 dark:text-white' 
                    : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                {section.title}
              </h3>
            </div>

            {/* Links List */}
            <ul className="space-y-2.5 pt-1">
              {section.items.map((item) => {
                const linkContent = (
                  <span className="relative inline-flex items-center justify-between w-full group py-1">
                    <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors duration-200 pr-2">
                      {item.name}
                    </span>
                    
                    {/* Animated arrow icon */}
                    {item.isExternal ? (
                      <ArrowUpRight 
                        size={14} 
                        className="text-slate-400 dark:text-slate-500 group-hover:text-cyan-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 flex-shrink-0" 
                        aria-hidden="true"
                      />
                    ) : (
                      <ArrowRight 
                        size={14} 
                        className="text-slate-400 dark:text-slate-500 group-hover:text-cyan-500 group-hover:translate-x-1 transition-transform duration-200 flex-shrink-0 opacity-0 group-hover:opacity-100" 
                        aria-hidden="true"
                      />
                    )}

                    {/* Animated Underline (drawn left to right) */}
                    <span 
                      className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-blue-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 origin-left transition-transform duration-300 pointer-events-none" 
                    />
                  </span>
                );

                return (
                  <li key={item.name}>
                    {item.isExternal ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-1 dark:focus-visible:ring-offset-slate-900 rounded"
                      >
                        {linkContent}
                      </a>
                    ) : (
                      <Link
                        to={item.href}
                        onClick={(e) => handleLinkClick(item.href, e)}
                        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-1 dark:focus-visible:ring-offset-slate-900 rounded"
                      >
                        {linkContent}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};
