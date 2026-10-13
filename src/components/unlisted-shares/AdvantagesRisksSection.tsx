
import React from 'react';
import { UnlistedSharesAdvantages } from './UnlistedSharesAdvantages';
import { UnlistedSharesRisks } from './UnlistedSharesRisks';

export function AdvantagesRisksSection() {
  return (
    <div className="max-w-4xl mx-auto mb-16 px-2 sm:px-0">
      <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        Advantages & Risks
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <UnlistedSharesAdvantages />
        <UnlistedSharesRisks />
      </div>
    </div>
  );
}
