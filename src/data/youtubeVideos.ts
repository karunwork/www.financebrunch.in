export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  published: string;
  publishedFormatted: string;
  views: number;
  viewsFormatted: string;
  category: string;
  tagColor: {
    bg: string;
    text: string;
    border: string;
  };
  thumbnail: string;
  maxResThumbnail: string;
  url: string;
  embedUrl: string;
}

export const YOUTUBE_CHANNEL = {
  name: "The Finance Brunch",
  handle: "@TheFinanceBrunch",
  url: "https://www.youtube.com/@TheFinanceBrunch",
  channelId: "UCgtssmXPtGcirH61m0MjrLQ",
  rssFeed: "https://www.youtube.com/feeds/videos.xml?channel_id=UCgtssmXPtGcirH61m0MjrLQ"
};

/**
 * Genuine video uploads from official YouTube channel @TheFinanceBrunch (UCgtssmXPtGcirH61m0MjrLQ).
 * Retrieved via official YouTube channel feed.
 */
export const youtubeVideos: YouTubeVideo[] = [
  {
    id: "7krdh7k7XYY",
    title: "RBI 5.50% Repo Rate 🚨 సామాన్యుడిపై ప్రభావం ఏంటి? | EMI, Loans, FD Explained",
    description: "An analysis of the RBI repo rate announcement and its immediate impact on home loan EMIs, borrowing costs, and fixed deposit returns for retail investors.",
    published: "2026-10-07T11:08:58+00:00",
    publishedFormatted: "October 2026",
    views: 40,
    viewsFormatted: "40+ views",
    category: "Banking & Interest Rates",
    tagColor: {
      bg: "bg-blue-500/10 dark:bg-blue-500/15",
      text: "text-blue-700 dark:text-blue-300",
      border: "border-blue-500/30 dark:border-blue-400/30"
    },
    thumbnail: "https://i.ytimg.com/vi/7krdh7k7XYY/hqdefault.jpg",
    maxResThumbnail: "https://i.ytimg.com/vi/7krdh7k7XYY/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=7krdh7k7XYY",
    embedUrl: "https://www.youtube-nocookie.com/embed/7krdh7k7XYY"
  },
  {
    id: "sVPYpoMRayA",
    title: "LUMINO IPO 2026 🚨 భారీ Opportunityనా? అసలు Risk ఇదే!",
    description: "A detailed review of the Lumino IPO, breaking down the business fundamentals, financial valuation, growth catalysts, and key investment risks.",
    published: "2026-08-29T03:30:17+00:00",
    publishedFormatted: "August 2026",
    views: 27,
    viewsFormatted: "27+ views",
    category: "IPO Analysis",
    tagColor: {
      bg: "bg-purple-500/10 dark:bg-purple-500/15",
      text: "text-purple-700 dark:text-purple-300",
      border: "border-purple-500/30 dark:border-purple-400/30"
    },
    thumbnail: "https://i.ytimg.com/vi/sVPYpoMRayA/hqdefault.jpg",
    maxResThumbnail: "https://i.ytimg.com/vi/sVPYpoMRayA/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=sVPYpoMRayA",
    embedUrl: "https://www.youtube-nocookie.com/embed/sVPYpoMRayA"
  },
  {
    id: "TB8gp5-L-eI",
    title: "ESDS Software Solutions IPO: అసలు విషయం ఇదే! 🔥 | IPO పూర్తి వివరాలు",
    description: "Complete fundamental breakdown of the ESDS Software Solutions IPO, reviewing financials, cloud industry growth, issue size, and long-term viability.",
    published: "2026-08-28T07:38:30+00:00",
    publishedFormatted: "August 2026",
    views: 89,
    viewsFormatted: "89+ views",
    category: "Tech IPO Review",
    tagColor: {
      bg: "bg-emerald-500/10 dark:bg-emerald-500/15",
      text: "text-emerald-700 dark:text-emerald-300",
      border: "border-emerald-500/30 dark:border-emerald-400/30"
    },
    thumbnail: "https://i.ytimg.com/vi/TB8gp5-L-eI/hqdefault.jpg",
    maxResThumbnail: "https://i.ytimg.com/vi/TB8gp5-L-eI/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=TB8gp5-L-eI",
    embedUrl: "https://www.youtube-nocookie.com/embed/TB8gp5-L-eI"
  },
  {
    id: "XZ9Y6pYOHkg",
    title: "Hy-Tech Engineers IPO | కొనాలా? వద్దా? 🚀 | IPO Dates, GMP, Issue Size & పూర్తి విశ్లేషణ",
    description: "Comprehensive analysis of Hy-Tech Engineers IPO exploring Grey Market Premium (GMP) indicators, issue valuation, and subscription guidance.",
    published: "2026-08-26T12:30:01+00:00",
    publishedFormatted: "August 2026",
    views: 36,
    viewsFormatted: "36+ views",
    category: "IPO Dates & GMP",
    tagColor: {
      bg: "bg-amber-500/10 dark:bg-amber-500/15",
      text: "text-amber-700 dark:text-amber-300",
      border: "border-amber-500/30 dark:border-amber-400/30"
    },
    thumbnail: "https://i.ytimg.com/vi/XZ9Y6pYOHkg/hqdefault.jpg",
    maxResThumbnail: "https://i.ytimg.com/vi/XZ9Y6pYOHkg/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=XZ9Y6pYOHkg",
    embedUrl: "https://www.youtube-nocookie.com/embed/XZ9Y6pYOHkg"
  },
  {
    id: "VgcywbIbiYg",
    title: "ఎమర్జెన్సీ ఫండ్ అంటే ఏమిటి? | 6-12 నెలల రూల్ | Financial Planning Telugu | Finance Brunch",
    description: "Practical guide explaining the 6-12 months emergency fund rule, why liquid contingency savings are essential, and where to safely invest them.",
    published: "2026-07-25T04:30:30+00:00",
    publishedFormatted: "July 2026",
    views: 50,
    viewsFormatted: "50+ views",
    category: "Financial Planning",
    tagColor: {
      bg: "bg-cyan-500/10 dark:bg-cyan-500/15",
      text: "text-cyan-700 dark:text-cyan-300",
      border: "border-cyan-500/30 dark:border-cyan-400/30"
    },
    thumbnail: "https://i.ytimg.com/vi/VgcywbIbiYg/hqdefault.jpg",
    maxResThumbnail: "https://i.ytimg.com/vi/VgcywbIbiYg/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=VgcywbIbiYg",
    embedUrl: "https://www.youtube-nocookie.com/embed/VgcywbIbiYg"
  },
  {
    id: "5_cZYhvQjQk",
    title: "🔥 95% మంది Job చేస్తూనే ఉంటారు! ₹10,000 Salaryతో Financial Freedom? | FIRE Telugu",
    description: "Learn how the Financial Independence, Retire Early (FIRE) framework works, and how disciplined monthly investing builds substantial wealth on any salary.",
    published: "2026-07-18T04:30:32+00:00",
    publishedFormatted: "July 2026",
    views: 23,
    viewsFormatted: "23+ views",
    category: "FIRE Strategy",
    tagColor: {
      bg: "bg-rose-500/10 dark:bg-rose-500/15",
      text: "text-rose-700 dark:text-rose-300",
      border: "border-rose-500/30 dark:border-rose-400/30"
    },
    thumbnail: "https://i.ytimg.com/vi/5_cZYhvQjQk/hqdefault.jpg",
    maxResThumbnail: "https://i.ytimg.com/vi/5_cZYhvQjQk/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=5_cZYhvQjQk",
    embedUrl: "https://www.youtube-nocookie.com/embed/5_cZYhvQjQk"
  },
  {
    id: "BgerokDBsYs",
    title: "IPO లో పెట్టుబడి పెట్టేముందు తప్పక చూడండి! | IPO Explained in Telugu | Stock Market for Beginners",
    description: "Step-by-step masterclass covering everything beginners need to know about IPO bidding, price bands, allotment probabilities, and red flags.",
    published: "2026-07-04T04:30:26+00:00",
    publishedFormatted: "July 2026",
    views: 75,
    viewsFormatted: "75+ views",
    category: "Stock Market Basics",
    tagColor: {
      bg: "bg-indigo-500/10 dark:bg-indigo-500/15",
      text: "text-indigo-700 dark:text-indigo-300",
      border: "border-indigo-500/30 dark:border-indigo-400/30"
    },
    thumbnail: "https://i.ytimg.com/vi/BgerokDBsYs/hqdefault.jpg",
    maxResThumbnail: "https://i.ytimg.com/vi/BgerokDBsYs/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=BgerokDBsYs",
    embedUrl: "https://www.youtube-nocookie.com/embed/BgerokDBsYs"
  },
  {
    id: "3t42oCUnEU8",
    title: "Financial Planning లేకపోతే... డబ్బు సంపాదించినా ప్రయోజనం లేదు! 💸",
    description: "Discover why disciplined financial planning and strategic asset allocation protect your hard-earned money and secure long-term family wealth.",
    published: "2026-06-26T07:28:31+00:00",
    publishedFormatted: "June 2026",
    views: 60,
    viewsFormatted: "60+ views",
    category: "Wealth Creation",
    tagColor: {
      bg: "bg-teal-500/10 dark:bg-teal-500/15",
      text: "text-teal-700 dark:text-teal-300",
      border: "border-teal-500/30 dark:border-teal-400/30"
    },
    thumbnail: "https://i.ytimg.com/vi/3t42oCUnEU8/hqdefault.jpg",
    maxResThumbnail: "https://i.ytimg.com/vi/3t42oCUnEU8/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=3t42oCUnEU8",
    embedUrl: "https://www.youtube-nocookie.com/embed/3t42oCUnEU8"
  }
];
