
import React from 'react';
import { IPOStepCard } from './ipo-process/IPOStepCard';
import { SEBIRoleSection } from './ipo-process/SEBIRoleSection';
import { ipoSteps, sebiRoleData } from './ipo-process/IPOProcessData';

export function IpoProcess() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            How Companies Enter the Stock Market
          </span>
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ipoSteps.map((step) => (
              <IPOStepCard
                key={step.stepNumber}
                stepNumber={step.stepNumber}
                title={step.title}
                description={step.description}
                checkPoints={step.checkPoints}
                colorScheme={step.colorScheme}
              />
            ))}
          </div>
          
          <SEBIRoleSection
            title={sebiRoleData.title}
            description={sebiRoleData.description}
            rolePoints={sebiRoleData.rolePoints}
          />
        </div>
      </div>
    </section>
  );
}
