
import { Link } from 'react-router-dom';

export const QuickLinks = () => {
  const links = [
    { name: 'Services', href: '/#services' },
    { name: 'About Us', href: '/#about' },
    { name: 'Global Presence', href: '/#global' },
    { name: 'Testimonials', href: '/#testimonials' },
    { name: 'Calculator', href: '/calculator' },
    { name: 'FIRE Strategy', href: '/fire-strategy' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Quick Links</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.name}>
            <a 
              href={link.href}
              className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary hover:translate-x-1 transition-all duration-200 inline-block pb-1 link-underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
