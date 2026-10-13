
import { indianTaxSlabs } from './indianTaxSlabs';
import { northAmericaTaxSlabs } from './northAmericaTaxSlabs';
import { europeTaxSlabs } from './europeTaxSlabs';
import { asiaPacificTaxSlabs } from './asiaPacificTaxSlabs';
import { middleEastTaxSlabs } from './middleEastTaxSlabs';
import taxFreeCountries from './taxFreeCountries';

// Merge all tax slabs into a single object
const allCountries = [
  ...indianTaxSlabs,
  ...northAmericaTaxSlabs,
  ...europeTaxSlabs,
  ...asiaPacificTaxSlabs,
  ...middleEastTaxSlabs,
  ...taxFreeCountries
];

// Create a lookup by region
export const countriesByRegion = allCountries.reduce((acc, country) => {
  const region = country.region;
  if (!acc[region]) {
    acc[region] = [];
  }
  acc[region].push(country);
  return acc;
}, {} as Record<string, typeof allCountries>);

// Helper function to find a country by ID
export const findCountryById = (id: string) => {
  return allCountries.find(country => country.id === id);
};

// Export individual region tax slabs for specific use cases
export {
  indianTaxSlabs,
  northAmericaTaxSlabs,
  europeTaxSlabs,
  asiaPacificTaxSlabs,
  middleEastTaxSlabs,
  taxFreeCountries
};

// Export tax slabs for various calculator functions
export const taxSlabs = {
  "new-2024-2025": indianTaxSlabs[0].taxSlabs,
  "new-2025-2026": indianTaxSlabs[0].taxSlabs,
  "old-2024-2025": indianTaxSlabs[1].taxSlabs,
  "old-2025-2026": indianTaxSlabs[1].taxSlabs
};

// Add business tax slabs
export const businessTaxSlabs = {
  "company-2024-2025": [
    { min: 0, max: null, rate: 25 }
  ],
  "company-2025-2026": [
    { min: 0, max: null, rate: 25 }
  ],
  "llp-2024-2025": [
    { min: 0, max: null, rate: 30 }
  ],
  "llp-2025-2026": [
    { min: 0, max: null, rate: 30 }
  ],
  "startup-2024-2025": [
    { min: 0, max: null, rate: 22 }
  ],
  "startup-2025-2026": [
    { min: 0, max: null, rate: 22 }
  ],
  "msme-2024-2025": [
    { min: 0, max: null, rate: 25 }
  ],
  "msme-2025-2026": [
    { min: 0, max: null, rate: 25 }
  ],
  "professional-2024-2025": [
    { min: 0, max: null, rate: 30 }
  ],
  "professional-2025-2026": [
    { min: 0, max: null, rate: 30 }
  ],
  "nri-2024-2025": indianTaxSlabs[0].taxSlabs.below60,
  "nri-2025-2026": indianTaxSlabs[0].taxSlabs.below60
};

export default allCountries;
