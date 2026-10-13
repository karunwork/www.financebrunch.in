
import { FadeIn } from '@/components/ui/animation';

interface CalculatorHeaderProps {
  isVisible?: boolean;
}

export function CalculatorHeader({ isVisible }: CalculatorHeaderProps) {
  return (
    <FadeIn direction="up" className="max-w-3xl mx-auto text-center mb-16">
      <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-medium mb-4">
        Financial Calculator
      </span>
      <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
        Plan Your Financial Future
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-400">
        See how your investments can grow over time with our powerful SIP calculator.
      </p>
    </FadeIn>
  );
}

