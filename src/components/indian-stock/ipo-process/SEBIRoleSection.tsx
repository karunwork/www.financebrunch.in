
import React from 'react';
import { Shield } from 'lucide-react';

interface SEBIRoleSectionProps {
  title: string;
  description: string;
  rolePoints: string[];
}

export function SEBIRoleSection({ title, description, rolePoints }: SEBIRoleSectionProps) {
  return (
    <div className="mt-12 bg-blue-50 dark:bg-blue-950/20 rounded-xl p-6 border border-blue-100 dark:border-blue-900">
      <h3 className="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-400">
        {title}
      </h3>
      
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        {description}
      </p>
      
      <ul className="space-y-2 text-gray-700 dark:text-gray-300">
        {rolePoints.map((point, index) => (
          <li key={index} className="flex items-start">
            <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}
