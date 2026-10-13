
import { TaxSlab } from "../taxTypes";

interface TaxRegimeSlabs {
  [key: string]: {
    below60: TaxSlab[];
    "60to80": TaxSlab[];
    above80: TaxSlab[];
  };
}

interface BusinessTaxSlabs {
  [key: string]: TaxSlab[];
}

// Indian individual tax slabs for different regimes and age groups
export const taxRegimes: TaxRegimeSlabs = {
  "new-2024-2025": {
    below60: [
      { min: 0, max: 300000, rate: 0 },
      { min: 300001, max: 600000, rate: 5 },
      { min: 600001, max: 900000, rate: 10 },
      { min: 900001, max: 1200000, rate: 15 },
      { min: 1200001, max: 1500000, rate: 20 },
      { min: 1500001, max: null, rate: 30 },
    ],
    "60to80": [
      { min: 0, max: 300000, rate: 0 },
      { min: 300001, max: 600000, rate: 5 },
      { min: 600001, max: 900000, rate: 10 },
      { min: 900001, max: 1200000, rate: 15 },
      { min: 1200001, max: 1500000, rate: 20 },
      { min: 1500001, max: null, rate: 30 },
    ],
    above80: [
      { min: 0, max: 300000, rate: 0 },
      { min: 300001, max: 600000, rate: 5 },
      { min: 600001, max: 900000, rate: 10 },
      { min: 900001, max: 1200000, rate: 15 },
      { min: 1200001, max: 1500000, rate: 20 },
      { min: 1500001, max: null, rate: 30 },
    ],
  },
  "old-2024-2025": {
    below60: [
      { min: 0, max: 250000, rate: 0 },
      { min: 250001, max: 500000, rate: 5 },
      { min: 500001, max: 1000000, rate: 20 },
      { min: 1000001, max: null, rate: 30 },
    ],
    "60to80": [
      { min: 0, max: 300000, rate: 0 },
      { min: 300001, max: 500000, rate: 5 },
      { min: 500001, max: 1000000, rate: 20 },
      { min: 1000001, max: null, rate: 30 },
    ],
    above80: [
      { min: 0, max: 500000, rate: 0 },
      { min: 500001, max: 1000000, rate: 20 },
      { min: 1000001, max: null, rate: 30 },
    ],
  },
  "new-2025-2026": {
    below60: [
      { min: 0, max: 1275000, rate: 0 },
      { min: 1275001, max: 1500000, rate: 5 },
      { min: 1500001, max: 1800000, rate: 10 },
      { min: 1800001, max: 2100000, rate: 15 },
      { min: 2100001, max: 2400000, rate: 20 },
      { min: 2400001, max: null, rate: 30 },
    ],
    "60to80": [
      { min: 0, max: 1275000, rate: 0 },
      { min: 1275001, max: 1500000, rate: 5 },
      { min: 1500001, max: 1800000, rate: 10 },
      { min: 1800001, max: 2100000, rate: 15 },
      { min: 2100001, max: 2400000, rate: 20 },
      { min: 2400001, max: null, rate: 30 },
    ],
    above80: [
      { min: 0, max: 1275000, rate: 0 },
      { min: 1275001, max: 1500000, rate: 5 },
      { min: 1500001, max: 1800000, rate: 10 },
      { min: 1800001, max: 2100000, rate: 15 },
      { min: 2100001, max: 2400000, rate: 20 },
      { min: 2400001, max: null, rate: 30 },
    ],
  },
  "old-2025-2026": {
    below60: [
      { min: 0, max: 250000, rate: 0 },
      { min: 250001, max: 500000, rate: 5 },
      { min: 500001, max: 1000000, rate: 20 },
      { min: 1000001, max: null, rate: 30 },
    ],
    "60to80": [
      { min: 0, max: 300000, rate: 0 },
      { min: 300001, max: 500000, rate: 5 },
      { min: 500001, max: 1000000, rate: 20 },
      { min: 1000001, max: null, rate: 30 },
    ],
    above80: [
      { min: 0, max: 500000, rate: 0 },
      { min: 500001, max: 1000000, rate: 20 },
      { min: 1000001, max: null, rate: 30 },
    ],
  },
};

// Indian business tax slabs
export const indianBusinessTaxSlabs: BusinessTaxSlabs = {
  "startup-2024-2025": [
    { min: 0, max: 10000000, rate: 0 },
    { min: 10000001, max: null, rate: 25 },
  ],
  "llp-2024-2025": [
    { min: 0, max: null, rate: 30 },
  ],
  "msme-2024-2025": [
    { min: 0, max: 5000000, rate: 25 },
    { min: 5000001, max: null, rate: 30 },
  ],
  "company-2024-2025": [
    { min: 0, max: null, rate: 22 },
  ],
  "professional-2024-2025": [
    { min: 0, max: 5000000, rate: 25 },
    { min: 5000001, max: null, rate: 30 },
  ],
  "nri-2024-2025": [
    { min: 0, max: 250000, rate: 0 },
    { min: 250001, max: 500000, rate: 5 },
    { min: 500001, max: 1000000, rate: 20 },
    { min: 1000001, max: null, rate: 30 },
  ],
  "startup-2025-2026": [
    { min: 0, max: 12000000, rate: 0 },
    { min: 12000001, max: null, rate: 25 },
  ],
  "llp-2025-2026": [
    { min: 0, max: 12000000, rate: 0 },
    { min: 12000001, max: null, rate: 30 },
  ],
  "msme-2025-2026": [
    { min: 0, max: 12000000, rate: 0 },
    { min: 12000001, max: null, rate: 30 },
  ],
  "company-2025-2026": [
    { min: 0, max: 12000000, rate: 0 },
    { min: 12000001, max: null, rate: 22 },
  ],
  "professional-2025-2026": [
    { min: 0, max: 12000000, rate: 0 },
    { min: 12000001, max: null, rate: 30 },
  ],
  "nri-2025-2026": [
    { min: 0, max: 1275000, rate: 0 },
    { min: 1275001, max: 1500000, rate: 5 },
    { min: 1500001, max: 1800000, rate: 10 },
    { min: 1800001, max: 2100000, rate: 15 },
    { min: 2100001, max: 2400000, rate: 20 },
    { min: 2400001, max: null, rate: 30 },
  ],
};

// Export India's tax slabs in an array format for consistency with other regions
export const indianTaxSlabs = [
  {
    id: "india",
    name: "India",
    currency: "INR",
    currencySymbol: "₹",
    region: "South Asia",
    taxSlabs: taxRegimes["new-2025-2026"],
    isTaxFree: false
  },
  {
    id: "india-old",
    name: "India (Old Regime)",
    currency: "INR",
    currencySymbol: "₹",
    region: "South Asia",
    taxSlabs: taxRegimes["old-2025-2026"],
    isTaxFree: false
  }
];
