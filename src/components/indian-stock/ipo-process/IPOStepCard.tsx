
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface IPOStepCardProps {
  stepNumber: number;
  title: string;
  description: string;
  checkPoints: string[];
  colorScheme: 'blue' | 'indigo' | 'purple';
}

export function IPOStepCard({ 
  stepNumber, 
  title, 
  description, 
  checkPoints,
  colorScheme
}: IPOStepCardProps) {
  const bgColor = {
    blue: 'bg-blue-50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900',
    indigo: 'bg-indigo-50 dark:bg-indigo-950/20 border-indigo-100 dark:border-indigo-900',
    purple: 'bg-purple-50 dark:bg-purple-950/20 border-purple-100 dark:border-purple-900',
  }[colorScheme];

  const badgeColor = {
    blue: 'bg-blue-600 dark:bg-blue-500',
    indigo: 'bg-indigo-600 dark:bg-indigo-500',
    purple: 'bg-purple-600 dark:bg-purple-500',
  }[colorScheme];

  const textColor = {
    blue: 'text-blue-700 dark:text-blue-400',
    indigo: 'text-indigo-700 dark:text-indigo-400',
    purple: 'text-purple-700 dark:text-purple-400',
  }[colorScheme];

  return (
    <div className={`${bgColor} rounded-xl p-6 border shadow-md relative`}>
      <div className={`absolute -top-4 -left-4 w-10 h-10 ${badgeColor} rounded-full flex items-center justify-center text-white font-bold shadow-lg`}>
        {stepNumber}
      </div>
      
      <h3 className={`text-lg font-semibold mb-3 ${textColor} mt-2`}>
        {title}
      </h3>
      
      <p className="text-gray-700 dark:text-gray-300">
        {description}
      </p>
      
      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        {checkPoints.map((point, index) => (
          <p key={index} className="flex items-center">
            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
            {point}
          </p>
        ))}
      </div>
    </div>
  );
}
