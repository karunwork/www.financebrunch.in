import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { scrollToSection } from '@/lib/scrollUtils';
import { useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

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
      { name: 'NRI Services', href: '/nri-services' },
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

interface FooterNavigationProps {
  className?: string;
}

export const FooterNavigation: React.FC<FooterNavigationProps> = ({ className }) => {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [mousePosMap, setMousePosMap] = useState<Record<string, { x: number; y: number }>>({});
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const panelRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
      setIsTouchDevice(true);
    }
  }, []);

  const handleMouseMove = (sectionNumber: string, e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || shouldReduceMotion) return;
    const panel = panelRefs.current[sectionNumber];
    if (!panel) return;
    const rect = panel.getBoundingClientRect();
    setMousePosMap((prev) => ({
      ...prev,
      [sectionNumber]: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      },
    }));
  };

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
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7 my-10 sm:my-14", className)}>
      {NAV_SECTIONS.map((section) => {
        const isSectionActive = hoveredSection === section.number;
        const mouse = mousePosMap[section.number] || { x: 150, y: 150 };

        return (
          <div 
            key={section.number}
            ref={(el) => (panelRefs.current[section.number] = el)}
            onMouseMove={(e) => handleMouseMove(section.number, e)}
            onMouseEnter={() => setHoveredSection(section.number)}
            onMouseLeave={() => setHoveredSection(null)}
            className="group/panel relative rounded-2xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden transition-all duration-300
              /* Light theme: visibly blue-tinted frosted glass */
              bg-gradient-to-b from-blue-50/85 via-white/80 to-blue-50/60
              border border-blue-200/80
              shadow-lg shadow-blue-900/5
              /* Dark theme: deep navy translucent frosted glass */
              dark:bg-gradient-to-b dark:from-[#0B1528]/85 dark:via-[#091222]/80 dark:to-[#060D1A]/90
              dark:border-slate-800/90
              dark:shadow-xl dark:shadow-cyan-950/20
              backdrop-blur-md backdrop-saturate-150
              hover:-translate-y-1.5 hover:shadow-xl hover:shadow-cyan-500/10 hover:border-cyan-500/50 dark:hover:border-cyan-400/50"
          >
            {/* Fine Top-Edge Highlight Line */}
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 dark:via-cyan-400/40 to-transparent pointer-events-none" />

            {/* Restrained Side Edge Highlight */}
            <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-white/70 dark:from-cyan-400/30 via-transparent to-transparent pointer-events-none" />

            {/* Subtle Faint FB Watermark inside panel corner */}
            <div 
              aria-hidden="true" 
              className="absolute -right-3 -bottom-4 pointer-events-none select-none z-0 opacity-[0.035] dark:opacity-[0.05] group-hover/panel:opacity-[0.07] transition-opacity duration-300"
            >
              <img
                src={`${import.meta.env.BASE_URL}images/fb-watermark.png`}
                alt=""
                className="w-28 h-auto object-contain pointer-events-none select-none"
                loading="lazy"
              />
            </div>

            {/* Soft Desktop Pointer-Responsive Radial Glow (Does not interfere with clicks) */}
            {!isTouchDevice && !shouldReduceMotion && (
              <div 
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover/panel:opacity-100"
                style={{
                  background: `radial-gradient(320px circle at ${mouse.x}px ${mouse.y}px, rgba(6, 182, 212, 0.12), transparent 70%)`,
                }}
              />
            )}

            {/* Ambient Low-Intensity Glow */}
            <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-cyan-400/5 dark:bg-cyan-500/10 blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              {/* Numbered Section Header */}
              <div className="flex items-center space-x-2.5 pb-3 border-b border-blue-200/60 dark:border-slate-800/80 transition-colors duration-200">
                <span 
                  className={`font-mono text-xs font-semibold tracking-wider transition-colors duration-200 ${
                    isSectionActive 
                      ? 'text-cyan-600 dark:text-cyan-400 font-bold' 
                      : 'text-blue-500/70 dark:text-cyan-500/70'
                  }`}
                >
                  {section.number} /
                </span>
                <h3 
                  className={`text-sm font-bold tracking-wider uppercase transition-colors duration-200 ${
                    isSectionActive 
                      ? 'text-slate-900 dark:text-white' 
                      : 'text-slate-800 dark:text-slate-200'
                  }`}
                >
                  {section.title}
                </h3>
              </div>

              {/* Links List */}
              <ul className="space-y-2.5 pt-1">
                {section.items.map((item) => {
                  const linkContent = (
                    <span className="relative inline-flex items-center justify-between w-full group/link py-1">
                      <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 group-hover/link:text-blue-700 dark:group-hover/link:text-cyan-300 transition-colors duration-200 pr-2">
                        {item.name}
                      </span>
                      
                      {/* Animated arrow icon */}
                      {item.isExternal ? (
                        <ArrowUpRight 
                          size={13} 
                          className="text-slate-400 dark:text-slate-500 group-hover/link:text-cyan-500 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200 flex-shrink-0" 
                          aria-hidden="true"
                        />
                      ) : (
                        <ArrowRight 
                          size={13} 
                          className="text-slate-400 dark:text-slate-500 group-hover/link:text-cyan-500 group-hover/link:translate-x-1 transition-transform duration-200 flex-shrink-0 opacity-0 group-hover/link:opacity-100" 
                          aria-hidden="true"
                        />
                      )}

                      {/* Animated Underline (drawn left to right) */}
                      <span 
                        className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-blue-500 to-cyan-400 scale-x-0 group-hover/link:scale-x-100 group-focus-visible/link:scale-x-100 origin-left transition-transform duration-300 pointer-events-none" 
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
          </div>
        );
      })}
    </div>
  );
};
