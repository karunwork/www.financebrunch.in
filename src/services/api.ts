import { YouTubeVideo, youtubeVideos as fallbackVideos } from '@/data/youtubeVideos';

export interface GoogleReview {
  id: string;
  authorName: string;
  authorPhoto: string | null;
  rating: number;
  relativeTime: string;
  text: string;
  time?: number;
  authorUrl?: string | null;
}

export interface GoogleReviewsResponse {
  success: boolean;
  configured: boolean;
  source?: string;
  placeName?: string;
  rating?: number | null;
  userRatingsTotal?: number;
  googleMapsUrl?: string | null;
  message?: string;
  reviews: GoogleReview[];
}

export interface YouTubeResponse {
  success: boolean;
  cached?: boolean;
  source?: string;
  channelId?: string;
  lastUpdated?: string;
  videos: YouTubeVideo[];
}

// Discovered API URL with production, custom env, and local fallback
const API_BASE_URL = (
  import.meta.env.VITE_API_URL || 
  (typeof window !== 'undefined' && window.location.hostname === 'localhost' ? 'http://localhost:5000' : '')
).replace(/\/$/, '');

function getApiEndpoint(path: string): string | null {
  if (API_BASE_URL) {
    return `${API_BASE_URL}${path}`;
  }
  // On GitHub Pages static hosting without a configured backend URL,
  // do not make an invalid request to the static Pages origin.
  if (typeof window !== 'undefined' && window.location.hostname.endsWith('github.io')) {
    return null;
  }
  return path;
}

/**
 * Fetch genuine YouTube uploads from the backend.
 * Automatically falls back to the baseline cached dataset if the backend is unreachable.
 */
export async function fetchLiveYouTubeVideos(): Promise<{ videos: YouTubeVideo[]; isLive: boolean; lastUpdated?: string }> {
  const endpoint = getApiEndpoint('/api/youtube');
  if (!endpoint) {
    return {
      videos: fallbackVideos,
      isLive: false
    };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(endpoint, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json'
      }
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data: YouTubeResponse = await res.json();
      if (data && Array.isArray(data.videos) && data.videos.length > 0) {
        return {
          videos: data.videos,
          isLive: true,
          lastUpdated: data.lastUpdated
        };
      }
    }
  } catch (err) {
    console.info('[Finance Brunch API] Live YouTube feed unavailable; using the verified channel dataset.');
  }

  // Graceful fallback to verified channel videos
  return {
    videos: fallbackVideos,
    isLive: false
  };
}

/**
 * Fetch authentic Google reviews from the backend.
 */
export async function fetchLiveGoogleReviews(): Promise<GoogleReviewsResponse> {
  const endpoint = getApiEndpoint('/api/reviews');

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(endpoint, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json'
      }
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn(`[Finance Brunch API] Google reviews request failed (${res.status}) at ${endpoint}.`);
      return {
        success: false,
        configured: false,
        message: 'The local review service returned an error.',
        reviews: []
      };
    }

    const data: GoogleReviewsResponse = await res.json();
    if (!Array.isArray(data.reviews)) {
      console.warn(`[Finance Brunch API] Google reviews response has an invalid shape at ${endpoint}.`);
      return {
        success: false,
        configured: false,
        message: 'The local review service returned an invalid response.',
        reviews: []
      };
    }

    if (!data.configured) {
      console.info('[Finance Brunch API] Google reviews service is reachable but not configured.');
    }

    return data;
  } catch (error) {
    const reason = error instanceof Error && error.name === 'AbortError'
      ? 'request timed out'
      : 'backend is unreachable';
    console.warn(`[Finance Brunch API] Google reviews ${reason} at ${endpoint}.`);
  }

  return {
    success: false,
    configured: false,
    message: 'Backend review service is currently in setup mode.',
    reviews: []
  };
}
