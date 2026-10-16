import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  allowedOrigins: (process.env.ALLOWED_ORIGINS || 'https://arasadaanishkarthik.github.io,http://localhost:8080,http://localhost:5173')
    .split(',')
    .map(o => o.trim())
    .filter(Boolean),
  youtube: {
    apiKey: process.env.YOUTUBE_API_KEY || '',
    channelId: process.env.YOUTUBE_CHANNEL_ID || 'UCgtssmXPtGcirH61m0MjrLQ',
    cacheTtlMs: parseInt(process.env.YOUTUBE_CACHE_TTL_MS || '3600000', 10), // 1 hour default
  },
  google: {
    placesApiKey: process.env.GOOGLE_PLACES_API_KEY || '',
    placeId: process.env.GOOGLE_PLACE_ID || '',
    cacheTtlMs: parseInt(process.env.REVIEWS_CACHE_TTL_MS || '86400000', 10), // 24 hours default
  }
};
