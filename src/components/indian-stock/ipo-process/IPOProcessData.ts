
export const ipoSteps = [
  {
    stepNumber: 1,
    title: "Pre-IPO Preparation",
    description: "Companies prepare financial documents, conduct audits, restructure if needed, and hire investment banks to underwrite the offering.",
    checkPoints: [
      "Company valuation",
      "Due diligence process",
      "DRHP filing with SEBI"
    ],
    colorScheme: 'blue' as const
  },
  {
    stepNumber: 2,
    title: "IPO Process",
    description: "The company sets an IPO price range, markets to investors through roadshows, collects bids, and determines the final issue price.",
    checkPoints: [
      "Price band determination",
      "Book building process",
      "Subscription and allocation"
    ],
    colorScheme: 'indigo' as const
  },
  {
    stepNumber: 3,
    title: "Listing and Trading",
    description: "Shares are listed on exchanges like NSE and BSE. The IPO price becomes the floor, and market forces determine future stock movements.",
    checkPoints: [
      "First day trading",
      "Market-determined pricing",
      "Ongoing compliance reporting"
    ],
    colorScheme: 'purple' as const
  }
];

export const sebiRoleData = {
  title: "SEBI's Role in IPO Process",
  description: "The Securities and Exchange Board of India (SEBI) plays a crucial regulatory role in the IPO process:",
  rolePoints: [
    "Reviews and approves the Draft Red Herring Prospectus (DRHP) submitted by companies",
    "Ensures adequate disclosure of financial information and risk factors to protect investors",
    "Sets guidelines for price bands, subscription periods, and allocation to different investor categories",
    "Monitors the IPO process to prevent manipulation or unfair practices",
    "Enforces post-listing compliance requirements for transparency and corporate governance"
  ]
};
