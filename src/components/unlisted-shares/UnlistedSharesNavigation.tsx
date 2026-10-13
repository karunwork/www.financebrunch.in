
import React from 'react';
import { cn } from "@/lib/utils";

export function UnlistedSharesNavigation() {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-20 z-40">
      <div className="container mx-auto px-4">
        <div className="overflow-x-auto flex items-center py-2 scrollbar-hide">
          <ul className="flex space-x-6 min-w-max">
            <NavItem href="#overview">Overview</NavItem>
            <NavItem href="#current-opportunities">Investment Opportunities</NavItem>
            <NavItem href="#advantages">Advantages</NavItem>
            <NavItem href="#risks">Risks</NavItem>
            <NavItem href="#sebi-guidelines">SEBI Guidelines</NavItem>
            <NavItem href="#faq">FAQ</NavItem>
            <NavItem href="#services">Our Services</NavItem>
          </ul>
        </div>
      </div>
    </nav>
  );
}

interface NavItemProps {
  href: string;
  children: React.ReactNode;
}

function NavItem({ href, children }: NavItemProps) {
  return (
    <li>
      <a
        href={href}
        className={cn(
          "text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400",
          "transition-colors duration-200 px-2 py-1 rounded-md",
          "hover:bg-purple-50 dark:hover:bg-purple-900/20",
          "flex items-center"
        )}
      >
        {children}
      </a>
    </li>
  );
}
