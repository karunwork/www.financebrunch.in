
import { TaxSlab } from "../taxTypes";

// UK tax slabs
const ukFederalSlabs: TaxSlab[] = [
  { min: 0, max: 12750, rate: 0 },
  { min: 12751, max: 50270, rate: 20 },
  { min: 50271, max: 125140, rate: 40 },
  { min: 125141, max: null, rate: 45 },
];

// UK regional tax slabs
const ukRegionalSlabs = {
  "sco": [
    { min: 0, max: 12570, rate: 0 },
    { min: 12571, max: 14732, rate: 19 },
    { min: 14733, max: 43662, rate: 20 },
    { min: 43663, max: 125140, rate: 41 },
    { min: 125141, max: null, rate: 46 },
  ],
  "wal": [
    { min: 0, max: 12570, rate: 0 },
    { min: 12571, max: 50270, rate: 20 },
    { min: 50271, max: 125140, rate: 40 },
    { min: 125141, max: null, rate: 45 },
  ],
  "default": []
};

// Germany tax slabs
const germanySlabs: TaxSlab[] = [
  { min: 0, max: 11604, rate: 0 },
  { min: 11605, max: 17005, rate: 14 },
  { min: 17006, max: 66761, rate: 24 },
  { min: 66762, max: 277825, rate: 42 },
  { min: 277826, max: null, rate: 45 },
];

// Export the combined European tax slabs
export const europeTaxSlabs = [
  {
    id: "uk",
    name: "United Kingdom",
    currency: "GBP",
    currencySymbol: "£",
    region: "Europe",
    slabs: ukFederalSlabs,
    stateSlabs: ukRegionalSlabs,
    isTaxFree: false
  },
  {
    id: "germany",
    name: "Germany",
    currency: "EUR",
    currencySymbol: "€",
    region: "Europe",
    slabs: germanySlabs,
    stateSlabs: { default: [] },
    isTaxFree: false
  }
];
