import { getLatestVideos } from '../src/services/youtube.js';
import { getGoogleReviews } from '../src/services/googleReviews.js';

async function runTests() {
  console.log('--- Running Backend Service Unit Tests ---');
  let failures = 0;

  // 1. YouTube Live Fetch Test
  try {
    console.log('Test 1: Testing YouTube Videos Fetch...');
    const ytResult = await getLatestVideos(true);
    if (!ytResult || !Array.isArray(ytResult.videos) || ytResult.videos.length === 0) {
      throw new Error('Expected an array of videos');
    }
    const first = ytResult.videos[0];
    if (!first.id || !first.title || !first.thumbnail) {
      throw new Error(`Video missing required fields: ${JSON.stringify(first)}`);
    }
    console.log(`✓ PASS: Retrieved ${ytResult.videos.length} live videos from channel (${ytResult.source})`);
    console.log(`   Latest Video: [${first.id}] ${first.title.slice(0, 60)}...`);
  } catch (e) {
    console.error('✗ FAIL: YouTube Fetch Test:', e.message);
    failures++;
  }

  // 2. Google Reviews Unconfigured Fallback Test
  try {
    console.log('\nTest 2: Testing Google Reviews Safe Unconfigured State...');
    const reviewsResult = await getGoogleReviews();
    if (typeof reviewsResult.configured !== 'boolean') {
      throw new Error('Expected configured boolean');
    }
    if (!reviewsResult.configured) {
      if (!Array.isArray(reviewsResult.reviews) || reviewsResult.reviews.length !== 0) {
        throw new Error('Unconfigured reviews must return empty array without fabricating reviews');
      }
      if (!reviewsResult.requiredEnv || !reviewsResult.requiredEnv.includes('GOOGLE_PLACES_API_KEY')) {
        throw new Error('Unconfigured state must report missing environment variables');
      }
      console.log('✓ PASS: Google Reviews unconfigured state handled cleanly and honestly');
      console.log(`   Reported required envs: ${reviewsResult.requiredEnv.join(', ')}`);
    } else {
      console.log(`✓ PASS: Google Reviews configured, retrieved ${reviewsResult.reviews.length} reviews`);
    }

    // 3. Google Reviews Refresh Flag Test
    console.log('\nTest 3: Testing Google Reviews with refresh=true...');
    const refreshResult = await getGoogleReviews(true);
    if (!refreshResult || typeof refreshResult.configured !== 'boolean') {
      throw new Error('Refresh request failed to return valid response structure');
    }
    console.log('✓ PASS: Google Reviews refresh=true executed successfully');
  } catch (e) {
    console.error('✗ FAIL: Google Reviews Test:', e.message);
    failures++;
  }

  console.log('\n========================================');
  if (failures === 0) {
    console.log('🎉 ALL BACKEND SERVICE TESTS PASSED!');
    console.log('========================================');
    process.exit(0);
  } else {
    console.error(`❌ ${failures} TEST(S) FAILED`);
    console.log('========================================');
    process.exit(1);
  }
}

runTests();
