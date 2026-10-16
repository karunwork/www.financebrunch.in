import https from 'https';

function fetchHttps(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'FinanceBrunchServerless/1.0' } }, (res) => {
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

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return res.status(200).json({
      success: true,
      configured: false,
      source: 'unconfigured',
      message: 'Google Places API key or Place ID is not configured in backend environment variables.',
      requiredEnv: ['GOOGLE_PLACES_API_KEY', 'GOOGLE_PLACE_ID'],
      placeName: 'Finance Brunch',
      rating: null,
      userRatingsTotal: 0,
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Finance+Brunch+Hyderabad',
      reviews: []
    });
  }

  try {
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

    reviews.sort((a, b) => (b.time || 0) - (a.time || 0));

    return res.status(200).json({
      success: true,
      configured: true,
      source: 'google_places_api',
      placeName: result.name || 'Finance Brunch',
      rating: result.rating || 5.0,
      userRatingsTotal: result.user_ratings_total || reviews.length,
      googleMapsUrl: result.url || 'https://www.google.com/maps/search/?api=1&query=Finance+Brunch+Hyderabad',
      reviews
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Failed to retrieve Google reviews',
      message: error.message
    });
  }
}
