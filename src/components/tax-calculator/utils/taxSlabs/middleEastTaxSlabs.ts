
import { TaxSlab } from "../taxTypes";

// UAE tax slabs (no income tax)
const uaeSlabs: TaxSlab[] = [
  { min: 0, max: null, rate: 0 },
];

// Qatar tax slabs (no income tax)
const qatarSlabs: TaxSlab[] = [
  { min: 0, max: null, rate: 0 },
];

// Export the combined Middle East tax slabs
export const middleEastTaxSlabs = [
  {
    id: "uae",
    name: "United Arab Emirates",
    currency: "AED",
    currencySymbol: "AED",
    region: "Middle East",
    slabs: uaeSlabs,
    isTaxFree: true
  },
  {
    id: "qatar",
    name: "Qatar",
    currency: "QAR",
    currencySymbol: "QAR",
    region: "Middle East",
    slabs: qatarSlabs,
    isTaxFree: true
  }
];
