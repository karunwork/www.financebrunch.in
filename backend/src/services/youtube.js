import https from 'https';
import { config } from '../config.js';

let videoCache = {
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

function decodeHtmlEntities(str) {
  if (!str) return '';
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x2F;/g, '/');
}

function deriveCategory(title, description) {
  const combined = `${title} ${description}`.toLowerCase();
  if (combined.includes('repo rate') || combined.includes('rbi') || combined.includes('fd') || combined.includes('interest rate') || combined.includes('banking')) {
    return {
      category: 'Banking & Interest Rates',
      tagColor: {
        bg: 'bg-blue-500/10 dark:bg-blue-500/15',
        text: 'text-blue-700 dark:text-blue-300',
        border: 'border-blue-500/30 dark:border-blue-400/30'
      }
    };
  }
  if (combined.includes('gmp') || combined.includes('grey market')) {
    return {
      category: 'IPO Dates & GMP',
      tagColor: {
        bg: 'bg-amber-500/10 dark:bg-amber-500/15',
        text: 'text-amber-700 dark:text-amber-300',
        border: 'border-amber-500/30 dark:border-amber-400/30'
      }
    };
  }
  if (combined.includes('ipo')) {
    return {
      category: 'IPO Analysis',
      tagColor: {
        bg: 'bg-purple-500/10 dark:bg-purple-500/15',
        text: 'text-purple-700 dark:text-purple-300',
        border: 'border-purple-500/30 dark:border-purple-400/30'
      }
    };
  }
  if (combined.includes('sip') || combined.includes('mutual fund') || combined.includes('retirement')) {
    return {
      category: 'Wealth & Mutual Funds',
      tagColor: {
        bg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
        text: 'text-emerald-700 dark:text-emerald-300',
        border: 'border-emerald-500/30 dark:border-emerald-400/30'
      }
    };
  }
  return {
    category: 'Market Insights',
    tagColor: {
      bg: 'bg-indigo-500/10 dark:bg-indigo-500/15',
      text: 'text-indigo-700 dark:text-indigo-300',
      border: 'border-indigo-500/30 dark:border-indigo-400/30'
    }
  };
}

function formatPublishedDate(isoDate) {
  try {
    const d = new Date(isoDate);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
  } catch (e) {
    return 'Recent Upload';
  }
}

/**
 * Fetch latest videos via official YouTube RSS/Atom feed (Reliable, real-time, keyless fallback)
 */
async function fetchFromRss(channelId) {
  const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
  const xml = await fetchHttps(url);
  const entries = xml.split('<entry>');
  
  if (entries.length <= 1) {
    throw new Error('No video entries found in channel XML feed.');
  }

  const videos = [];
  // Skip index 0 (channel header) and process entries
  for (let i = 1; i < entries.length; i++) {
    const entry = entries[i];
    const vidIdMatch = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
    const titleMatch = entry.match(/<title>([^<]+)<\/title>/);
    const pubMatch = entry.match(/<published>([^<]+)<\/published>/);
    const descMatch = entry.match(/<media:description>([\s\S]*?)<\/media:description>/);

    if (vidIdMatch && titleMatch) {
      const id = vidIdMatch[1].trim();
      const rawTitle = decodeHtmlEntities(titleMatch[1].trim());
      const rawDesc = descMatch ? decodeHtmlEntities(descMatch[1].trim()) : '';
      const published = pubMatch ? pubMatch[1].trim() : new Date().toISOString();
      const { category, tagColor } = deriveCategory(rawTitle, rawDesc);

      videos.push({
        id,
        title: rawTitle,
        description: rawDesc,
        published,
        publishedFormatted: formatPublishedDate(published),
        views: 0,
        viewsFormatted: 'New Upload',
        category,
        tagColor,
        thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        maxResThumbnail: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
        url: `https://www.youtube.com/watch?v=${id}`,
        embedUrl: `https://www.youtube-nocookie.com/embed/${id}`
      });
    }
  }

  return videos;
}

/**
 * Fetch latest videos using official YouTube Data API v3
 */
async function fetchFromApi(apiKey, channelId) {
  // Convert channel ID (UC...) to uploads playlist ID (UU...)
  const uploadsPlaylistId = 'UU' + channelId.substring(2);
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploadsPlaylistId}&maxResults=15&key=${apiKey}`;
  const jsonText = await fetchHttps(url);
  const json = JSON.parse(jsonText);

  if (!json.items || json.items.length === 0) {
    throw new Error('No items returned from YouTube API playlistItems.');
  }

  return json.items.map(item => {
    const snip = item.snippet;
    const id = snip.resourceId?.videoId || item.contentDetails?.videoId;
    const rawTitle = snip.title;
    const rawDesc = snip.description || '';
    const published = snip.publishedAt;
    const { category, tagColor } = deriveCategory(rawTitle, rawDesc);

    return {
      id,
      title: rawTitle,
      description: rawDesc,
      published,
      publishedFormatted: formatPublishedDate(published),
      views: 0,
      viewsFormatted: 'Recent Upload',
      category,
      tagColor,
      thumbnail: snip.thumbnails?.high?.url || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      maxResThumbnail: snip.thumbnails?.maxres?.url || `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
      url: `https://www.youtube.com/watch?v=${id}`,
      embedUrl: `https://www.youtube-nocookie.com/embed/${id}`
    };
  });
}

/**
 * Get latest videos with caching and fallback
 */
export async function getLatestVideos(forceRefresh = false) {
  const now = Date.now();
  if (!forceRefresh && videoCache.data && (now - videoCache.lastFetched) < config.youtube.cacheTtlMs) {
    return {
      cached: true,
      source: videoCache.source,
      channelId: config.youtube.channelId,
      lastUpdated: new Date(videoCache.lastFetched).toISOString(),
      videos: videoCache.data
    };
  }

  let videos = null;
  let source = 'youtube_rss';

  // 1. Try official YouTube Data API v3 if API key is provided
  if (config.youtube.apiKey) {
    try {
      videos = await fetchFromApi(config.youtube.apiKey, config.youtube.channelId);
      source = 'youtube_api_v3';
    } catch (apiErr) {
      console.warn('[YouTube Service] API v3 fetch failed, falling back to live channel feed:', apiErr.message);
    }
  }

  // 2. If API v3 was not used or failed, fetch from the official YouTube channel RSS feed
  if (!videos || videos.length === 0) {
    try {
      videos = await fetchFromRss(config.youtube.channelId);
      source = 'youtube_feed_live';
    } catch (rssErr) {
      console.error('[YouTube Service] Live feed fetch failed:', rssErr.message);
      // 3. Fallback to stale cache if available
      if (videoCache.data) {
        return {
          cached: true,
          stale: true,
          source: videoCache.source,
          channelId: config.youtube.channelId,
          lastUpdated: new Date(videoCache.lastFetched).toISOString(),
          videos: videoCache.data
        };
      }
      throw rssErr;
    }
  }

  // Update in-memory cache
  videoCache = {
    data: videos,
    lastFetched: now,
    source
  };

  return {
    cached: false,
    source,
    channelId: config.youtube.channelId,
    lastUpdated: new Date(now).toISOString(),
    videos
  };
}
