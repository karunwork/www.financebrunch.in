import https from 'https';
import { config } from '../config.js';

let reviewsCache = {
  data: null,
  lastFetched: 0,
};

function fetchHttps(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'FinanceBrunchBackend/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data.slice(0, 200)}`));
        }
      });
    }).on('error', reject);
  });
}

/**
 * Fetch Google Reviews via Google Places API (Place Details)
 */
async function fetchGooglePlaceReviews(apiKey, placeId) {
  const fields = 'name,rating,user_ratings_total,reviews,url';
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=${fields}&key=${encodeURIComponent(apiKey)}`;
  
  const text = await fetchHttps(url);
  const json = JSON.parse(text);

  if (json.status !== 'OK') {
    throw new Error(`Google Places API returned status: ${json.status} ${json.error_message || ''}`);
  }

  const result = json.result || {};
  const rawReviews = result.reviews || [];

  const reviews = rawReviews.map((r, index) => ({
    id: `google_${r.time || index}_${index}`,
    authorName: r.author_name || 'Verified Client',
    authorPhoto: r.profile_photo_url || null,
    rating: typeof r.rating === 'number' ? r.rating : 5,
    relativeTime: r.relative_time_description || 'Recently',
    text: r.text || '',
    time: r.time ? r.time * 1000 : Date.now(),
    authorUrl: r.author_url || null
  }));

  // Sort by recency (newest first)
  reviews.sort((a, b) => (b.time || 0) - (a.time || 0));

  return {
    placeName: result.name || 'Finance Brunch',
    rating: result.rating || 5.0,
    userRatingsTotal: result.user_ratings_total || reviews.length,
    googleMapsUrl: result.url || 'https://www.google.com/maps/search/?api=1&query=Finance+Brunch+Hyderabad',
    reviews
  };
}

/**
 * Get Google reviews with configuration check and caching
 */
export async function getGoogleReviews(forceRefresh = false) {
  const now = Date.now();

  // If Google API credentials are not configured
  if (!config.google.placesApiKey || !config.google.placeId) {
    return {
      configured: false,
      source: 'unconfigured',
      message: 'Google Places API key or Place ID is not configured in backend environment variables.',
      requiredEnv: ['GOOGLE_PLACES_API_KEY', 'GOOGLE_PLACE_ID'],
      placeName: 'Finance Brunch',
      rating: null,
      userRatingsTotal: 0,
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Finance+Brunch+Hyderabad',
      reviews: []
    };
  }

  // Return cached data if fresh
  if (!forceRefresh && reviewsCache.data && (now - reviewsCache.lastFetched) < config.google.cacheTtlMs) {
    return {
      configured: true,
      cached: true,
      source: 'google_places_api',
      lastUpdated: new Date(reviewsCache.lastFetched).toISOString(),
      ...reviewsCache.data
    };
  }

  try {
    const data = await fetchGooglePlaceReviews(config.google.placesApiKey, config.google.placeId);
    reviewsCache = {
      data,
      lastFetched: now
    };

    return {
      configured: true,
      cached: false,
      source: 'google_places_api',
      lastUpdated: new Date(now).toISOString(),
      ...data
    };
  } catch (err) {
    console.error('[Google Reviews Service] Failed to fetch Google reviews:', err.message);
    if (reviewsCache.data) {
      return {
        configured: true,
        cached: true,
        stale: true,
        source: 'google_places_api',
        lastUpdated: new Date(reviewsCache.lastFetched).toISOString(),
        ...reviewsCache.data
      };
    }
    throw err;
  }
}
