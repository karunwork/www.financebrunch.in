import express from 'express';
import cors from 'cors';
import { config } from './config.js';
import { getLatestVideos } from './services/youtube.js';
import { getGoogleReviews } from './services/googleReviews.js';

const app = express();

// Configure CORS for GitHub Pages and local development
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);
    
    // Check against allowed origins or localhost
    const isAllowed = config.allowedOrigins.some(allowed => 
      origin === allowed || origin.endsWith('.github.io') || origin.startsWith('http://localhost:')
    );

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all during development/preview with logging
    }
  },
  methods: ['GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Root service endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'Finance Brunch API Service',
    status: 'online',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      youtube: '/api/youtube',
      reviews: '/api/reviews'
    },
    documentation: 'https://github.com/karunwork/www.financebrunch.in#backend-service'
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    uptimeSeconds: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
    integrations: {
      googleReviews: {
        configured: Boolean(config.google.placesApiKey && config.google.placeId),
        requiredEnv: ['GOOGLE_PLACES_API_KEY', 'GOOGLE_PLACE_ID']
      }
    }
  });
});

// YouTube uploads endpoint
app.get('/api/youtube', async (req, res) => {
  try {
    const forceRefresh = req.query.refresh === 'true' || req.query.refresh === '1';
    const data = await getLatestVideos(forceRefresh);
    res.setHeader('Cache-Control', 'public, max-age=1800, s-maxage=3600, stale-while-revalidate=86400');
    res.json({
      success: true,
      ...data
    });
  } catch (error) {
    console.error('Error in /api/youtube:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve YouTube uploads',
      message: error.message
    });
  }
});

// Google Reviews endpoint
app.get('/api/reviews', async (req, res) => {
  try {
    const forceRefresh = req.query.refresh === 'true' || req.query.refresh === '1';
    const data = await getGoogleReviews(forceRefresh);
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800');
    res.json({
      success: true,
      ...data
    });
  } catch (error) {
    console.error('Error in /api/reviews:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve Google reviews',
      message: error.message
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Endpoint ${req.originalUrl} does not exist.`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// Start listening if executed directly
if (process.env.NODE_ENV !== 'test') {
  app.listen(config.port, () => {
    console.log(`[Finance Brunch Backend] Server running on port ${config.port} (${config.nodeEnv})`);
    console.log(`[Finance Brunch Backend] YouTube Channel ID: ${config.youtube.channelId}`);
    console.log(`[Finance Brunch Backend] Google Places Configured: ${Boolean(config.google.placesApiKey && config.google.placeId)}`);
  });

  // Warm the server-side cache so new uploads are picked up without waiting
  // for a visitor to make the first request after the TTL expires.
  const refreshIntervalMs = Math.max(config.youtube.cacheTtlMs, 60 * 60 * 1000);
  setInterval(() => {
    getLatestVideos(true).catch((error) => {
      console.error('[Finance Brunch Backend] Scheduled YouTube refresh failed:', error.message);
    });
  }, refreshIntervalMs);

  // Warm and refresh the Google reviews cache periodically when configured
  if (config.google.placesApiKey && config.google.placeId) {
    const reviewsIntervalMs = Math.max(config.google.cacheTtlMs, 60 * 60 * 1000);
    setInterval(() => {
      getGoogleReviews(true).catch((error) => {
        console.error('[Finance Brunch Backend] Scheduled Google Reviews refresh failed:', error.message);
      });
    }, reviewsIntervalMs);
  }
}

export default app;
