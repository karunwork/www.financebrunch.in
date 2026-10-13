import { FadeIn } from '@/components/ui/animation';

interface ServicesHeaderProps {
  isVisible?: boolean;
  totalProductsCount?: number;
}

export function ServicesHeader({ totalProductsCount = 7 }: ServicesHeaderProps) {
  return (
    <FadeIn direction="up" className="max-w-3xl mx-auto text-center mb-14">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-4 border border-blue-100 dark:border-blue-900/50 shadow-sm">
        <span>Complete Financial Portfolio</span>
        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400"></span>
        <span className="text-xs uppercase tracking-wider">{totalProductsCount} Solutions</span>
      </div>
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-5">
        Our Products & Financial Services
      </h2>
      <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
        Explore our complete suite of research-driven investment strategies, capital market intelligence, life & health protection, early retirement blueprints, and tax filing solutions.
      </p>
    </FadeIn>
  );
}
