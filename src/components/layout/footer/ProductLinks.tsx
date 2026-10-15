
import { Link } from 'react-router-dom';

export const ProductLinks = () => {
  const products = [
    { name: 'Mutual Funds', href: '/mutual-funds' },
    { name: 'Mutual Fund Calculator', href: '/calculator' },
    { name: 'Health Insurance', href: '/health-insurance' },
    { name: 'Term Insurance', href: '/term-insurance' },
    { name: 'FIRE Strategy', href: '/fire-strategy' },
    { name: 'Retirement Planning', href: '/retirement-planning' },
    { name: 'Investment Planning', href: '/investment-planning' },
    { name: 'NRI Services', href: '/nri-services' },
    { name: 'Indian Stock Analysis', href: '/indian-stock-analysis' },
    { name: 'Unlisted Shares', href: '/unlisted-shares' },
    { name: 'IPO Analysis', href: '/ipo-analysis' },
    { name: 'Tax Planning & Filing', href: '/income-tax-filing' },
    { name: 'Insurance Solutions', href: '/insurance-planning' },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Our Products</h3>
      <ul className="space-y-2">
        {products.map((link) => (
          <li key={link.name}>
            <Link 
              to={link.href}
              className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary hover:translate-x-1 transition-all duration-200 inline-block pb-1 link-underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
