
interface ExchangeInfo {
  id: string;
  name: string;
  shortDescription: string;
  location: string;
  description: string;
  establishment: string;
  tradingHours: string;
  majorIndices?: string[];
  keyFeatures: string[];
  regulatoryBody: string;
  marketCap?: string;
  website?: string;
}

export const exchangesData: Record<string, ExchangeInfo> = {
  mse: {
    id: "mse",
    name: "Metropolitan Stock Exchange of India (MSE)",
    shortDescription: "Equity & Derivatives • Mumbai",
    location: "Mumbai, India",
    description: "The Metropolitan Stock Exchange of India (formerly MCX Stock Exchange) provides a platform for trading in equity, equity derivatives, interest rate derivatives, and currency derivatives.",
    establishment: "2008",
    tradingHours: "Monday to Friday, 9:00 AM to 3:30 PM IST",
    keyFeatures: [
      "Provides a transparent electronic limit order book platform",
      "Offers trading in equity, equity derivatives, interest rate derivatives, and currency derivatives",
      "Uses a modern trading architecture for high-speed execution",
      "Implements rigorous risk management systems",
      "Adheres to global best practices for market operations"
    ],
    regulatoryBody: "Securities and Exchange Board of India (SEBI)",
    marketCap: "Smaller compared to NSE and BSE",
    website: "https://www.msei.in"
  },
  inx: {
    id: "inx",
    name: "India International Exchange (INX)",
    shortDescription: "International Exchange • GIFT City, Gujarat",
    location: "GIFT City, Gujarat, India",
    description: "India INX is India's first international exchange, located at GIFT City in Gujarat. It operates 22 hours a day to overlap with global market hours and provides a platform for trading in various financial instruments.",
    establishment: "2017",
    tradingHours: "22 hours (from 4:30 AM to 2:30 AM the next day) IST",
    majorIndices: [
      "India INX Global Access"
    ],
    keyFeatures: [
      "India's first international exchange",
      "22-hour trading session to align with global markets",
      "Trading in multiple asset classes including equity derivatives, currency derivatives, and commodities",
      "GIFT City tax benefits for market participants",
      "State-of-the-art trading technology with low latency",
      "Dollar-denominated contracts for international investors"
    ],
    regulatoryBody: "International Financial Services Centres Authority (IFSCA)",
    website: "https://www.indiainx.com"
  },
  nseifsc: {
    id: "nseifsc",
    name: "NSE IFSC",
    shortDescription: "International Exchange • GIFT City, Gujarat",
    location: "GIFT City, Gujarat, India",
    description: "NSE IFSC is the international exchange set up by the National Stock Exchange of India at the GIFT City in Gujarat. It provides a platform for Indian and global investors to trade in various derivative products denominated in US dollars.",
    establishment: "2017",
    tradingHours: "Monday to Friday, 8:00 AM to 5:00 PM IST",
    keyFeatures: [
      "Trading in US dollar-denominated products",
      "Platform for international investors to access Indian securities",
      "Offers equity derivatives, currency derivatives, and commodity derivatives",
      "Tax benefits for investors under GIFT City regulations",
      "Modern trading infrastructure with low latency",
      "Strong risk management framework"
    ],
    regulatoryBody: "International Financial Services Centres Authority (IFSCA)",
    website: "https://www.nseifsc.com"
  },
  mcx: {
    id: "mcx",
    name: "Multi Commodity Exchange (MCX)",
    shortDescription: "Commodity Exchange • Mumbai",
    location: "Mumbai, India",
    description: "MCX is India's largest commodity derivatives exchange that facilitates trading of commodity derivatives across various segments including bullion, base metals, energy, and agricultural commodities.",
    establishment: "2003",
    tradingHours: "Monday to Friday, with varying hours by commodity (generally 9:00 AM to 11:30 PM IST)",
    majorIndices: [
      "MCX COMDEX (Composite Commodity Index)",
      "MCX METAL",
      "MCX AGRI"
    ],
    keyFeatures: [
      "India's largest commodity derivatives exchange",
      "Trading in bullion, base metals, energy, and agricultural commodities",
      "Electronic trading platform with nationwide reach",
      "Price discovery and risk management for commodity markets",
      "Option contracts on various commodities",
      "Robust clearing and settlement systems"
    ],
    regulatoryBody: "Securities and Exchange Board of India (SEBI)",
    marketCap: "Largest commodity exchange in India",
    website: "https://www.mcxindia.com"
  },
  ncdex: {
    id: "ncdex",
    name: "National Commodity & Derivatives Exchange (NCDEX)",
    shortDescription: "Agricultural Commodities • Mumbai",
    location: "Mumbai, India",
    description: "NCDEX is a commodity exchange primarily focused on agricultural commodities. It provides a platform for market participants to hedge, trade, and invest in agricultural derivative contracts.",
    establishment: "2003",
    tradingHours: "Monday to Friday, 9:00 AM to 5:00 PM IST",
    keyFeatures: [
      "Leading agricultural commodity exchange in India",
      "Focus on agricultural commodities and derivatives",
      "Electronic trading platform with transparency",
      "Price dissemination across rural India",
      "Warehouse-based delivery system for physical settlement",
      "Provides risk management tools for farmers and agribusinesses"
    ],
    regulatoryBody: "Securities and Exchange Board of India (SEBI)",
    website: "https://www.ncdex.com"
  },
  cse: {
    id: "cse",
    name: "Calcutta Stock Exchange (CSE)",
    shortDescription: "Regional Stock Exchange • Kolkata",
    location: "Kolkata, West Bengal, India",
    description: "The Calcutta Stock Exchange is one of India's oldest stock exchanges, serving the eastern region of India. While its trading volumes have reduced significantly, it maintains a historical importance in India's financial history.",
    establishment: "1908",
    tradingHours: "Monday to Friday, 9:00 AM to 3:30 PM IST",
    keyFeatures: [
      "One of India's oldest stock exchanges with rich heritage",
      "Regional focus on eastern India",
      "Electronic trading system",
      "Listing platform for regional companies",
      "Has played a significant historical role in Indian capital markets"
    ],
    regulatoryBody: "Securities and Exchange Board of India (SEBI)",
    website: "https://www.cse-india.com"
  }
};

export default exchangesData;
