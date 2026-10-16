import { YouTubeVideo, youtubeVideos as fallbackVideos } from '@/data/youtubeVideos';

export interface GoogleReview {
  id: string;
  authorName: string;
  authorPhoto: string;
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

/**
 * Fetch genuine YouTube uploads from the backend.
 * Automatically falls back to the baseline cached dataset if the backend is unreachable.
 */
export async function fetchLiveYouTubeVideos(): Promise<{ videos: YouTubeVideo[]; isLive: boolean; lastUpdated?: string }> {
  try {
    // If an API base is configured or on localhost
    const endpoint = API_BASE_URL ? `${API_BASE_URL}/api/youtube` : '/api/youtube';
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
    // Log softly and fallback smoothly
    console.info('[Finance Brunch API] Live YouTube feed backend unreachable, using verified channel dataset.');
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
  try {
    const endpoint = API_BASE_URL ? `${API_BASE_URL}/api/reviews` : '/api/reviews';
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
      const data: GoogleReviewsResponse = await res.json();
      return data;
    }
  } catch (err) {
    console.info('[Finance Brunch API] Google reviews backend unreachable.');
  }

  return {
    success: false,
    configured: false,
    message: 'Backend review service is currently in setup mode.',
    reviews: []
  };
}
