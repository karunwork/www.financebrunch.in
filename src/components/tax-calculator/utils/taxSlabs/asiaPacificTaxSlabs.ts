
import { TaxSlab } from "../taxTypes";

// Australia tax slabs
const australiaSlabs: TaxSlab[] = [
  { min: 0, max: 18200, rate: 0 },
  { min: 18201, max: 45000, rate: 19 },
  { min: 45001, max: 120000, rate: 32.5 },
  { min: 120001, max: 180000, rate: 37 },
  { min: 180001, max: null, rate: 45 },
];

// Australia state tax slabs
const australiaStateSlabs = {
  "nsw": [
    { min: 0, max: null, rate: 2 },
  ],
  "vic": [
    { min: 0, max: null, rate: 2 },
  ],
  "qld": [
    { min: 0, max: null, rate: 2 },
  ],
  "default": []
};

// Singapore tax slabs
const singaporeSlabs: TaxSlab[] = [
  { min: 0, max: 20000, rate: 0 },
  { min: 20001, max: 30000, rate: 2 },
  { min: 30001, max: 40000, rate: 3.5 },
  { min: 40001, max: 80000, rate: 7 },
  { min: 80001, max: 120000, rate: 11.5 },
  { min: 120001, max: 160000, rate: 15 },
  { min: 160001, max: 200000, rate: 18 },
  { min: 200001, max: 240000, rate: 19 },
  { min: 240001, max: 280000, rate: 19.5 },
  { min: 280001, max: 320000, rate: 20 },
  { min: 320001, max: null, rate: 22 },
];

// Malaysia tax slabs
const malaysiaSlabs: TaxSlab[] = [
  { min: 0, max: 5000, rate: 0 },
  { min: 5001, max: 20000, rate: 1 },
  { min: 20001, max: 35000, rate: 3 },
  { min: 35001, max: 50000, rate: 8 },
  { min: 50001, max: 70000, rate: 13 },
  { min: 70001, max: 100000, rate: 21 },
  { min: 100001, max: 250000, rate: 24 },
  { min: 250001, max: 400000, rate: 24.5 },
  { min: 400001, max: 600000, rate: 25 },
  { min: 600001, max: 1000000, rate: 26 },
  { min: 1000001, max: 2000000, rate: 28 },
  { min: 2000001, max: null, rate: 30 },
];

// Export the combined Asia-Pacific tax slabs
export const asiaPacificTaxSlabs = [
  {
    id: "australia",
    name: "Australia",
    currency: "AUD",
    currencySymbol: "A$",
    region: "Asia-Pacific",
    slabs: australiaSlabs,
    stateSlabs: australiaStateSlabs,
    isTaxFree: false
  },
  {
    id: "singapore",
    name: "Singapore",
    currency: "SGD",
    currencySymbol: "S$",
    region: "Asia-Pacific",
    slabs: singaporeSlabs,
    stateSlabs: { default: [] },
    isTaxFree: false
  },
  {
    id: "malaysia",
    name: "Malaysia",
    currency: "MYR",
    currencySymbol: "RM",
    region: "Asia-Pacific",
    slabs: malaysiaSlabs,
    stateSlabs: { default: [] },
    isTaxFree: false
  }
];
