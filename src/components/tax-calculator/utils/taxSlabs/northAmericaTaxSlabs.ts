
import { TaxSlab } from "../taxTypes";

// USA federal tax slabs
const usaFederalSlabs: TaxSlab[] = [
  { min: 0, max: 11600, rate: 10 },
  { min: 11601, max: 47150, rate: 12 },
  { min: 47151, max: 100525, rate: 22 },
  { min: 100526, max: 191950, rate: 24 },
  { min: 191951, max: 243725, rate: 32 },
  { min: 243726, max: 609350, rate: 35 },
  { min: 609351, max: null, rate: 37 },
];

// USA state tax slabs
const usaStateSlabs = {
  "ca": [
    { min: 0, max: 10099, rate: 1 },
    { min: 10100, max: 23942, rate: 2 },
    { min: 23943, max: 37788, rate: 4 },
    { min: 37789, max: 52455, rate: 6 },
    { min: 52456, max: 66295, rate: 8 },
    { min: 66296, max: 338639, rate: 9.3 },
    { min: 338640, max: 406364, rate: 10.3 },
    { min: 406365, max: 677275, rate: 11.3 },
    { min: 677276, max: null, rate: 12.3 },
  ],
  "ny": [
    { min: 0, max: 13900, rate: 4 },
    { min: 13901, max: 80650, rate: 4.5 },
    { min: 80651, max: 215400, rate: 5.25 },
    { min: 215401, max: 1077550, rate: 6.33 },
    { min: 1077551, max: 5000000, rate: 6.85 },
    { min: 5000001, max: 25000000, rate: 9.65 },
    { min: 25000001, max: null, rate: 10.9 },
  ],
  "tx": [],
  "fl": [],
  "il": [
    { min: 0, max: null, rate: 4.95 },
  ],
  "default": []
};

// Canada federal tax slabs
const canadaFederalSlabs: TaxSlab[] = [
  { min: 0, max: 55867, rate: 15 },
  { min: 55868, max: 111733, rate: 20.5 },
  { min: 111734, max: 173205, rate: 26 },
  { min: 173206, max: 246752, rate: 29 },
  { min: 246753, max: null, rate: 33 },
];

// Canada provincial tax slabs
const canadaProvinceSlabs = {
  "on": [
    { min: 0, max: 49231, rate: 5.05 },
    { min: 49232, max: 98463, rate: 9.15 },
    { min: 98464, max: 150000, rate: 11.16 },
    { min: 150001, max: 220000, rate: 12.16 },
    { min: 220001, max: null, rate: 13.16 },
  ],
  "qc": [
    { min: 0, max: 49275, rate: 15 },
    { min: 49276, max: 98540, rate: 20 },
    { min: 98541, max: 119910, rate: 24 },
    { min: 119911, max: null, rate: 25.75 },
  ],
  "bc": [
    { min: 0, max: 45654, rate: 5.06 },
    { min: 45655, max: 91310, rate: 7.7 },
    { min: 91311, max: 104835, rate: 10.5 },
    { min: 104836, max: 127299, rate: 12.29 },
    { min: 127300, max: 172602, rate: 14.7 },
    { min: 172603, max: 240716, rate: 16.8 },
    { min: 240717, max: null, rate: 20.5 },
  ],
  "ab": [
    { min: 0, max: 142292, rate: 10 },
    { min: 142293, max: 170751, rate: 12 },
    { min: 170752, max: 227668, rate: 13 },
    { min: 227669, max: 341502, rate: 14 },
    { min: 341503, max: null, rate: 15 },
  ],
  "default": []
};

// Export the combined North America tax slabs
export const northAmericaTaxSlabs = [
  {
    id: "usa",
    name: "United States",
    currency: "USD",
    currencySymbol: "$",
    region: "North America",
    slabs: usaFederalSlabs,
    stateSlabs: usaStateSlabs,
    isTaxFree: false
  },
  {
    id: "canada",
    name: "Canada",
    currency: "CAD",
    currencySymbol: "C$",
    region: "North America",
    slabs: canadaFederalSlabs,
    stateSlabs: canadaProvinceSlabs,
    isTaxFree: false
  }
];
