# Finance Brunch — Backend API Service

A lightweight, secure, and production-grade API service for **Finance Brunch** that delivers:
1. **Live YouTube Uploads**: Automatically fetches and caches the newest public video uploads from [@TheFinanceBrunch](https://www.youtube.com/@TheFinanceBrunch) (Channel ID: `UCgtssmXPtGcirH61m0MjrLQ`) via YouTube Data API v3 or official real-time channel feed.
2. **Google Reviews**: Connects to the Finance Brunch Google Business Profile / Google Places API to stream authentic customer reviews, overall star rating, and review count.
3. **CORS & Security**: Protects API keys from being leaked to client-side bundles and enforces CORS restrictions for `https://arasadaanishkarthik.github.io`.

---

## 🚀 Quick Start (Local Development)

```bash
cd backend
npm install
npm start
```
The server will start on `http://localhost:5000`.

To run the automated tests:
```bash
npm test
```

---

## 📡 API Endpoints

### 1. Health Check
- **Route**: `GET /api/health`
- **Response**:
```json
{
  "status": "ok",
  "uptimeSeconds": 142,
  "timestamp": "2026-10-16T09:30:00.000Z",
  "environment": "production"
}
```

### 2. YouTube Uploads
- **Route**: `GET /api/youtube`
- **Query Params**: `?refresh=true` (forces bypass of server-side cache)
- **Response**:
```json
{
  "success": true,
  "cached": false,
  "source": "youtube_feed_live",
  "channelId": "UCgtssmXPtGcirH61m0MjrLQ",
  "lastUpdated": "2026-10-16T09:30:00.000Z",
  "videos": [
    {
      "id": "laU9VTo4suY",
      "title": "Tonbo Imaging IPO Analysis 2026 🔥 | 70% GMP, Financials, Valuation & Risks",
      "description": "Welcome to Finance Brunch Insights!...",
      "published": "2026-10-15T14:55:10+00:00",
      "publishedFormatted": "October 2026",
      "category": "IPO Analysis",
      "thumbnail": "https://i.ytimg.com/vi/laU9VTo4suY/hqdefault.jpg",
      "maxResThumbnail": "https://i.ytimg.com/vi/laU9VTo4suY/maxresdefault.jpg",
      "url": "https://www.youtube.com/watch?v=laU9VTo4suY",
      "embedUrl": "https://www.youtube-nocookie.com/embed/laU9VTo4suY"
    }
  ]
}
```

### 3. Google Reviews
- **Route**: `GET /api/reviews`
- **Query Params**: `?refresh=true` (forces bypass of server-side cache)
- **Response (when configured)**:
```json
{
  "success": true,
  "configured": true,
  "placeName": "Finance Brunch",
  "rating": 5.0,
  "userRatingsTotal": 48,
  "googleMapsUrl": "https://maps.google.com/?cid=...",
  "reviews": [
    {
      "id": "google_1729000000_0",
      "authorName": "Priya Sharma",
      "authorPhoto": "https://...",
      "rating": 5,
      "relativeTime": "2 days ago",
      "text": "Finance Brunch transformed my investment strategy..."
    }
  ]
}
```

---

## ⚙️ Environment Variables

Configure these in your hosting provider's dashboard (e.g. Render, Vercel, Railway):

| Variable | Required | Description | Default |
| :--- | :--- | :--- | :--- |
| `PORT` | No | Server listen port | `5000` |
| `NODE_ENV` | No | Environment mode | `production` |
| `ALLOWED_ORIGINS` | No | Comma-separated allowed CORS origins | `https://arasadaanishkarthik.github.io,http://localhost:8080` |
| `YOUTUBE_CHANNEL_ID` | No | Target YouTube Channel ID | `UCgtssmXPtGcirH61m0MjrLQ` |
| `YOUTUBE_API_KEY` | Optional | Google Cloud YouTube Data API v3 Key | *(Uses live channel feed if omitted)* |
| `YOUTUBE_CACHE_TTL_MS` | No | Cache duration in milliseconds | `3600000` (1 hour) |
| `GOOGLE_PLACES_API_KEY` | Optional | Google Maps Places API key | *(Reports unconfigured state if omitted)* |
| `GOOGLE_PLACE_ID` | Optional | Google Place ID of Finance Brunch business | *(Reports unconfigured state if omitted)* |
| `REVIEWS_CACHE_TTL_MS` | No | Google reviews cache duration in ms | `86400000` (24 hours) |

---

## 🌐 1-Click Deployment Options

### Option A: Render.com (Recommended Free Hosting)
1. Fork or push this repository to GitHub.
2. Sign in to [Render.com](https://render.com).
3. Click **New +** → **Blueprint** → Select this repository.
4. Render will read `backend/render.yaml` and configure the Web Service automatically.
5. In the Render Dashboard under **Environment**, paste your optional `YOUTUBE_API_KEY`, `GOOGLE_PLACES_API_KEY`, and `GOOGLE_PLACE_ID`.
6. Copy your service URL (e.g. `https://finance-brunch-api.onrender.com`).

### Option B: Vercel
1. Run `cd backend && vercel` or connect the repo on [Vercel](https://vercel.com).
2. Set Root Directory to `backend` in project settings.
3. Add environment variables under Settings → Environment Variables.

---

## 🔗 Connecting to the Frontend

Set the `VITE_API_URL` environment variable for your frontend:
```bash
VITE_API_URL=https://your-backend-app.onrender.com
```
If `VITE_API_URL` is omitted, the frontend automatically falls back to the backend's default production endpoint and baseline cached data, ensuring zero downtime.
