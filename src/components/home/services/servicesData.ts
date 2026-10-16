import React from 'react';
import { 
  LineChart, Heart, Shield, Wallet, 
  FileCode, Flame, ReceiptText, Bitcoin, 
  IndianRupee, TrendingUp, CandlestickChart, 
  FileText, ShieldCheck, PiggyBank, Calculator, 
  Coins, Globe
} from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  categorySlug: 'wealth-investments' | 'capital-markets' | 'insurance-protection' | 'retirement-fire' | 'tax-specialized';
  badge: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  redirectToWhatsApp?: boolean;
  whatsAppMessage?: string;
  imageSrc: string;
  showSheet?: boolean;
  sheetType?: 'mutual-fund' | 'fixed-deposit';
  linkTo?: string;
  imageObjectFit?: string;
  highlights?: string[];
  ctaText?: string;
  isComingSoon?: boolean;
  backgroundWord?: string;
}

export interface ProductCategoryGroup {
  id: string;
  name: string;
  slug: 'wealth-investments' | 'capital-markets' | 'insurance-protection' | 'retirement-fire' | 'tax-specialized';
  description: string;
  badge: string;
  items: ServiceItem[];
}

export const servicesData: ServiceItem[] = [
  // 1. Wealth & Investments
  {
    id: "investment-planning",
    title: "Investment Planning",
    category: "Wealth & Investments",
    categorySlug: "wealth-investments",
    badge: "Strategic Advisory",
    description: "Build a personalized investment strategy aligned with your financial goals, risk tolerance, and time horizon.",
    icon: React.createElement(LineChart, { size: 24 }),
    color: "bg-blue-600",
    redirectToWhatsApp: false,
    imageSrc: "/images/service-investment-planning.jpg",
    showSheet: false,
    linkTo: "/investment-planning",
    ctaText: "Explore Strategy",
    highlights: ["Goal-Driven Planning", "Risk Profiling", "Portfolio Optimization"]
  },
  {
    id: "mutual-funds",
    title: "Mutual Funds",
    category: "Wealth & Investments",
    categorySlug: "wealth-investments",
    badge: "SIP & Lumpsum",
    description: "Diversify your investment portfolio with expert mutual fund selection for wealth creation and growth across Large, Flexi, Mid, and ELSS funds.",
    icon: React.createElement(FileCode, { size: 24 }),
    color: "bg-emerald-600",
    redirectToWhatsApp: false,
    imageSrc: "/lovable-uploads/bf6dd0ac-44d2-4676-a31c-07952b0c5108.png",
    showSheet: true,
    sheetType: "mutual-fund",
    linkTo: "/mutual-funds",
    ctaText: "Explore Mutual Funds",
    highlights: ["Zero Commission Direct Funds", "ELSS Tax Saving 80C", "Disciplined SIP Plans"]
  },
  {
    id: "fixed-deposits",
    title: "Fixed Deposits",
    category: "Wealth & Investments",
    categorySlug: "wealth-investments",
    badge: "Up to 8% Interest",
    description: "Secure competitive interest rates of up to 8% with RBI DICGC insurance protection of up to ₹5,00,000 on your deposits.",
    icon: React.createElement(IndianRupee, { size: 24 }),
    color: "bg-amber-500",
    redirectToWhatsApp: false,
    whatsAppMessage: "Hi Finance Brunch Team, I'm interested in Fixed Deposit options with high interest rates. Can you share more details?",
    imageSrc: "/lovable-uploads/b10e7df8-0120-4065-9082-e64035550408.png",
    showSheet: true,
    sheetType: "fixed-deposit",
    ctaText: "View FD Options",
    highlights: ["RBI DICGC Protected", "Guaranteed Fixed Yield", "Flexible Tenure Options"]
  },
  {
    id: "wealth-management",
    title: "Wealth Management",
    category: "Wealth & Investments",
    categorySlug: "wealth-investments",
    badge: "HNI Advisory",
    description: "Comprehensive management of your assets with personalized strategies for growth, capital preservation, and multi-generational legacy.",
    icon: React.createElement(Wallet, { size: 24 }),
    color: "bg-purple-600",
    redirectToWhatsApp: true,
    whatsAppMessage: "Hi Finance Brunch Team, I'm interested in Wealth Management services. I'd like to discuss how you can help manage my portfolio.",
    imageSrc: "/images/service-wealth-management.jpg",
    showSheet: false,
    ctaText: "Connect with Advisor",
    highlights: ["Custom Asset Allocation", "Quarterly Rebalancing", "Dedicated Wealth Specialist"]
  },
  {
    id: "nri-services",
    title: "NRI Investment Services",
    category: "Wealth & Investments",
    categorySlug: "wealth-investments",
    badge: "Cross-Border",
    description: "Specialized financial solutions for Non-Resident Indians including NRE/NRO accounts, FEMA compliance, and repatriation strategies.",
    icon: React.createElement(Globe, { size: 24 }),
    color: "bg-cyan-600",
    redirectToWhatsApp: true,
    whatsAppMessage: "Hi Finance Brunch Team, I'm an NRI interested in your investment services. Can we connect?",
    imageSrc: "/images/financial-planning-advisory.jpg",
    showSheet: false,
    linkTo: "/investment-planning",
    ctaText: "NRI Consultation",
    highlights: ["NRE / NRO Account Guidance", "FEMA & RBI Compliance", "Global Remote Support"]
  },

  // 2. Stock & Capital Markets
  {
    id: "indian-stock-analysis",
    title: "Indian Stock Analysis",
    category: "Stock & Capital Markets",
    categorySlug: "capital-markets",
    badge: "BSE & NSE Research",
    description: "Expert research and analysis of Indian equity markets across BSE and NSE with actionable sector insights and risk disclosures.",
    icon: React.createElement(TrendingUp, { size: 24 }),
    color: "bg-blue-600",
    redirectToWhatsApp: false,
    imageSrc: "/lovable-uploads/06b665ec-50f4-4f68-b7fe-836df10af649.png",
    showSheet: false,
    linkTo: "/indian-stock-analysis",
    ctaText: "Explore Indian Markets",
    highlights: ["Technical & Fundamental Data", "Major Index Tracking", "NISM Certified Insights"]
  },
  {
    id: "usa-stock-analysis",
    title: "USA Stock Analysis",
    category: "Stock & Capital Markets",
    categorySlug: "capital-markets",
    badge: "NASDAQ & NYSE",
    description: "In-depth research on US equities, focusing on global tech leaders, bluechip growth stocks, and dollar asset diversification.",
    icon: React.createElement(CandlestickChart, { size: 24 }),
    color: "bg-indigo-600",
    redirectToWhatsApp: false,
    imageSrc: "/lovable-uploads/39526ab9-be38-46a7-9a10-857828b19686.png",
    showSheet: false,
    linkTo: "/investment-planning",
    ctaText: "Explore US Equities",
    highlights: ["Global Tech Leaders", "Currency Diversification", "Wall Street Research"]
  },
  {
    id: "ipo-analysis",
    title: "IPO Analysis",
    category: "Stock & Capital Markets",
    categorySlug: "capital-markets",
    badge: "Primary Market",
    description: "Detailed evaluation of upcoming and recent IPOs, covering business models, financials, valuations, and listing prospects.",
    icon: React.createElement(FileText, { size: 24 }),
    color: "bg-teal-600",
    redirectToWhatsApp: false,
    imageSrc: "/lovable-uploads/57727f9c-2aca-4226-99e9-efa57dc9848f.png",
    showSheet: false,
    linkTo: "/ipo-analysis",
    ctaText: "View IPO Insights",
    highlights: ["Upcoming Issues Calendar", "Subscription Trackers", "In-Depth Valuations"]
  },
  {
    id: "unlisted-shares",
    title: "Unlisted Shares",
    category: "Stock & Capital Markets",
    categorySlug: "capital-markets",
    badge: "Pre-IPO Equity",
    description: "Access to private equity opportunities in promising high-growth companies before they go public, with strict due diligence.",
    icon: React.createElement(ShieldCheck, { size: 24 }),
    color: "bg-violet-600",
    redirectToWhatsApp: false,
    imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    showSheet: false,
    linkTo: "/unlisted-shares",
    ctaText: "Explore Unlisted Shares",
    highlights: ["Early Growth Stage Access", "Transparent Price Discovery", "SEBI Regulated Transfer"]
  },

  // 3. Protection & Insurance
  {
    id: "health-insurance",
    title: "Health Insurance",
    category: "Protection & Insurance",
    categorySlug: "insurance-protection",
    badge: "Medical Security",
    description: "Comprehensive medical and critical illness coverage for you and your family to protect against unexpected healthcare costs.",
    icon: React.createElement(Heart, { size: 24 }),
    color: "bg-rose-500",
    redirectToWhatsApp: false,
    imageSrc: "/images/service-insurance.jpg",
    showSheet: false,
    linkTo: "/health-insurance",
    ctaText: "Explore Health Plans",
    highlights: ["Cashless Hospitalization", "Critical Illness Add-on", "Section 80D Tax Benefit"]
  },
  {
    id: "term-insurance",
    title: "Term Insurance",
    category: "Protection & Insurance",
    categorySlug: "insurance-protection",
    badge: "Pure Life Protection",
    description: "High-cover life insurance protection offering financial security and income replacement for your dependents at affordable premiums.",
    icon: React.createElement(Shield, { size: 24 }),
    color: "bg-blue-600",
    redirectToWhatsApp: false,
    imageSrc: "/images/service-insurance.jpg",
    showSheet: false,
    linkTo: "/term-insurance",
    ctaText: "Explore Term Cover",
    highlights: ["100x Income Protection", "Zero-Cost Term Options", "Section 80C Benefit"]
  },
  {
    id: "insurance-planning",
    title: "Insurance Solutions",
    category: "Protection & Insurance",
    categorySlug: "insurance-protection",
    badge: "Holistic Audit",
    description: "Protect yourself and your loved ones with an exhaustive audit of your family's health, term, and liability coverage gaps.",
    icon: React.createElement(ShieldCheck, { size: 24 }),
    color: "bg-indigo-600",
    redirectToWhatsApp: false,
    imageSrc: "/images/service-insurance.jpg",
    showSheet: false,
    linkTo: "/insurance-planning",
    ctaText: "Get Insurance Audit",
    highlights: ["Policy Portfolio Review", "Claim Settlement Guidance", "Unbiased Product Curation"]
  },

  // 4. Retirement & FIRE
  {
    id: "fire-strategy",
    title: "FIRE Strategy",
    category: "Retirement & FIRE",
    categorySlug: "retirement-fire",
    badge: "Financial Freedom",
    description: "Plan for Financial Independence, Retire Early with strategic saving rates, frugal budgeting, and compounding investments.",
    icon: React.createElement(Flame, { size: 24 }),
    color: "bg-orange-500",
    redirectToWhatsApp: false,
    imageSrc: "/lovable-uploads/26c5a7e3-fcfa-4500-ae98-4f465f3ac8b1.png",
    showSheet: false,
    linkTo: "/fire-strategy",
    ctaText: "Plan FIRE Strategy",
    highlights: ["Rule of 25 & 4% Safe Rate", "Early Exit Blueprint", "Passive Income Stacks"]
  },
  {
    id: "early-retirement",
    title: "Retirement Planning",
    category: "Retirement & FIRE",
    categorySlug: "retirement-fire",
    badge: "Corpus Modeling",
    description: "Calculate exactly how much you need to accumulate to maintain your desired lifestyle throughout retirement without outliving savings.",
    icon: React.createElement(PiggyBank, { size: 24 }),
    color: "bg-amber-600",
    redirectToWhatsApp: false,
    imageSrc: "/lovable-uploads/26c5a7e3-fcfa-4500-ae98-4f465f3ac8b1.png",
    showSheet: false,
    linkTo: "/early-retirement",
    ctaText: "Calculate Retirement",
    highlights: ["Inflation-Adjusted Target", "Corpus Sustainability", "Custom Pension Cashflows"]
  },
  {
    id: "calculators",
    title: "Mutual Fund Calculators",
    category: "Retirement & FIRE",
    categorySlug: "retirement-fire",
    badge: "Interactive Tool",
    description: "Interactive financial tools including SIP, Step-Up SIP, Lumpsum, and SWP calculators to forecast wealth growth with accuracy.",
    icon: React.createElement(Calculator, { size: 24 }),
    color: "bg-blue-600",
    redirectToWhatsApp: false,
    imageSrc: "/images/service-investment-planning.jpg",
    showSheet: false,
    linkTo: "/calculator",
    ctaText: "Open Calculators",
    highlights: ["SIP & Step-Up SIP", "SWP Cash Flow Simulator", "Visual Growth Curves"]
  },

  // 5. Tax & Specialized Solutions
  {
    id: "income-tax-filing",
    title: "Income Tax Filing",
    category: "Tax & Specialized Solutions",
    categorySlug: "tax-specialized",
    badge: "ITR Filing & Tax Optimization",
    description: "Expert assistance with income tax preparation, regime comparison (New vs Old), business tax filing, and maximizing legal deductions.",
    icon: React.createElement(ReceiptText, { size: 24 }),
    color: "bg-indigo-600",
    redirectToWhatsApp: false,
    whatsAppMessage: "Hello, I am seeking assistance with income tax filing. Could we connect to discuss further?",
    imageSrc: "/lovable-uploads/b80d81b8-1bd9-42ad-9457-5b8f46a67af0.png",
    showSheet: false,
    linkTo: "/income-tax-filing",
    ctaText: "File Your Taxes",
    highlights: ["Old vs New Regime Modeling", "Capital Gains Calculation", "Notice Management"]
  },
  {
    id: "digital-gold",
    title: "Digital Gold",
    category: "Tax & Specialized Solutions",
    categorySlug: "tax-specialized",
    badge: "99.9% Pure 24K",
    description: "Invest in 99.9% pure gold electronically without worrying about physical storage, locker charges, or purity authenticity.",
    icon: React.createElement(Coins, { size: 24 }),
    color: "bg-amber-500",
    redirectToWhatsApp: false,
    imageSrc: "/lovable-uploads/75e0d2e9-6d50-49f9-abe9-5236913686da.png",
    showSheet: false,
    linkTo: "/investment-planning",
    ctaText: "Explore Digital Gold",
    highlights: ["Insured Vault Storage", "Sell or Deliver Anytime", "Zero Storage Fees"]
  },
  {
    id: "crypto-currency",
    title: "Crypto Currency Investments",
    category: "Tax & Specialized Solutions",
    categorySlug: "tax-specialized",
    badge: "Emerging Tech",
    description: "Educational guidance and strategic insights into blockchain digital assets, risk assessment, and emerging decentralized technologies.",
    icon: React.createElement(Bitcoin, { size: 24 }),
    color: "bg-purple-600",
    redirectToWhatsApp: false,
    imageSrc: "/lovable-uploads/b7af595c-860c-4bed-8735-64391a005af9.png",
    showSheet: false,
    linkTo: "/investment-planning",
    ctaText: "Explore Crypto Guidance",
    highlights: ["Blockchain Fundamentals", "Risk Profiling", "Regulatory Compliance"]
  }
];

export const productCategories: ProductCategoryGroup[] = [
  {
    id: "cat-wealth-investments",
    name: "Wealth & Investment Advisory",
    slug: "wealth-investments",
    badge: "Core Wealth Creation",
    description: "Tailored investment portfolios, mutual fund curation, fixed-income yields, and specialized wealth management.",
    items: servicesData.filter(item => item.categorySlug === 'wealth-investments')
  },
  {
    id: "cat-capital-markets",
    name: "Stock & Capital Markets Research",
    slug: "capital-markets",
    badge: "Equities & IPOs",
    description: "Data-driven equity intelligence across Indian exchanges, US global equities, pre-IPO unlisted shares, and practical market research.",
    items: servicesData.filter(item => item.categorySlug === 'capital-markets')
  },
  {
    id: "cat-insurance-protection",
    name: "Protection & Insurance Planning",
    slug: "insurance-protection",
    badge: "Shield & Security",
    description: "Comprehensive risk management safeguarding your family's health, lifestyle, and wealth against unforeseen emergencies.",
    items: servicesData.filter(item => item.categorySlug === 'insurance-protection')
  },
  {
    id: "cat-retirement-fire",
    name: "Retirement & Financial Independence (FIRE)",
    slug: "retirement-fire",
    badge: "Financial Freedom",
    description: "Strategic roadmaps and interactive compounding tools designed to achieve early retirement and lifelong financial freedom.",
    items: servicesData.filter(item => item.categorySlug === 'retirement-fire')
  },
  {
    id: "cat-tax-specialized",
    name: "Tax Solutions & Alternative Assets",
    slug: "tax-specialized",
    badge: "Optimization & Hedges",
    description: "Expert tax filing, Section 80C/80D optimization, digital gold inflation hedges, and emerging asset guidance.",
    items: servicesData.filter(item => item.categorySlug === 'tax-specialized')
  }
];

/**
 * Exactly 6 homepage service cards in the requested order:
 * 1. Investment Planning
 * 2. Mutual Funds
 * 3. Tax Filings (formerly Global Tax File)
 * 4. FIRE Strategy / Early Retirement
 * 5. Wealth Management
 * 6. Insurance Solutions
 */
export const homepageServices: ServiceItem[] = [
  // 1. Investment Planning
  {
    id: "investment-planning",
    title: "Investment Planning",
    category: "Wealth & Investments",
    categorySlug: "wealth-investments",
    badge: "Strategic Advisory",
    description: "Build a personalized investment strategy aligned with your financial goals, risk tolerance, and time horizon.",
    icon: React.createElement(LineChart, { size: 24 }),
    color: "bg-blue-600",
    redirectToWhatsApp: false,
    imageSrc: "/images/service-investment-planning.jpg",
    showSheet: false,
    linkTo: "/investment-planning",
    ctaText: "Explore Strategy",
    backgroundWord: "PLAN",
    highlights: ["Goal-Driven Planning", "Risk Profiling", "Portfolio Optimization"]
  },
  // 2. Mutual Funds
  {
    id: "mutual-funds",
    title: "Mutual Funds",
    category: "Wealth & Investments",
    categorySlug: "wealth-investments",
    badge: "SIP & Lumpsum",
    description: "Diversify your investment portfolio with expert mutual fund selection for wealth creation and growth across Large, Flexi, Mid, and ELSS funds.",
    icon: React.createElement(FileCode, { size: 24 }),
    color: "bg-emerald-600",
    redirectToWhatsApp: false,
    imageSrc: "/lovable-uploads/bf6dd0ac-44d2-4676-a31c-07952b0c5108.png",
    showSheet: true,
    sheetType: "mutual-fund",
    linkTo: "/mutual-funds",
    ctaText: "Explore Mutual Funds",
    backgroundWord: "GROW",
    highlights: ["Zero Commission Direct Funds", "ELSS Tax Saving 80C", "Disciplined SIP Plans"]
  },
  // 3. Tax Filings (formerly Global Tax File)
  {
    id: "global-tax-file",
    title: "Tax Filings",
    category: "Tax & Specialized Solutions",
    categorySlug: "tax-specialized",
    badge: "Cross-Border Tax",
    description: "Specialized cross-border tax filing and advisory for NRIs, expats, and global investors handling dual-country tax compliance, DTAA, and foreign credits.",
    icon: React.createElement(Globe, { size: 24 }),
    color: "bg-cyan-600",
    redirectToWhatsApp: false,
    imageSrc: "/images/financial-planning-advisory.jpg",
    showSheet: false,
    linkTo: "/global-tax-file",
    ctaText: "Explore Global Tax",
    backgroundWord: "GLOBAL",
    highlights: ["Cross-Border Tax Returns", "DTAA & Foreign Tax Credits", "Expat & NRI Tax Advisory"]
  },
  // 4. FIRE Strategy / Early Retirement
  {
    id: "fire-strategy-early-retirement",
    title: "FIRE Strategy / Early Retirement",
    category: "Retirement & FIRE",
    categorySlug: "retirement-fire",
    badge: "Financial Freedom",
    description: "Plan for Financial Independence, Retire Early with strategic saving rates, frugal budgeting, corpus modeling, and compounding investments.",
    icon: React.createElement(Flame, { size: 24 }),
    color: "bg-orange-500",
    redirectToWhatsApp: false,
    imageSrc: "/lovable-uploads/26c5a7e3-fcfa-4500-ae98-4f465f3ac8b1.png",
    showSheet: false,
    linkTo: "/fire-strategy",
    ctaText: "Plan Early Retirement",
    backgroundWord: "FREEDOM",
    highlights: ["Rule of 25 & 4% Safe Rate", "Early Exit Blueprint", "Corpus Sustainability Modeling"]
  },
  // 5. Wealth Management
  {
    id: "wealth-management",
    title: "Wealth Management",
    category: "Wealth & Investments",
    categorySlug: "wealth-investments",
    badge: "HNI Advisory",
    description: "Comprehensive management of your assets with personalized strategies for growth, capital preservation, and multi-generational legacy.",
    icon: React.createElement(Wallet, { size: 24 }),
    color: "bg-purple-600",
    redirectToWhatsApp: true,
    whatsAppMessage: "Hi Finance Brunch Team, I'm interested in Wealth Management services. I'd like to discuss how you can help manage my portfolio.",
    imageSrc: "/images/service-wealth-management.jpg",
    showSheet: false,
    linkTo: "/investment-planning",
    ctaText: "Connect with Advisor",
    backgroundWord: "WEALTH",
    highlights: ["Custom Asset Allocation", "Quarterly Rebalancing", "Dedicated Wealth Specialist"]
  },
  // 6. Insurance Solutions
  {
    id: "insurance-solutions",
    title: "Insurance Solutions",
    category: "Protection & Insurance",
    categorySlug: "insurance-protection",
    badge: "Holistic Audit",
    description: "Protect yourself and your loved ones with an exhaustive audit of your family's health, term, and liability coverage gaps.",
    icon: React.createElement(ShieldCheck, { size: 24 }),
    color: "bg-indigo-600",
    redirectToWhatsApp: false,
    imageSrc: "/images/service-insurance.jpg",
    showSheet: false,
    linkTo: "/insurance-planning",
    ctaText: "Get Insurance Audit",
    backgroundWord: "PROTECT",
    highlights: ["Policy Portfolio Review", "Claim Settlement Guidance", "Unbiased Product Curation"]
  }
];
