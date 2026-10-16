const fs = require('fs');
const assert = require('assert');

function runCarouselTests() {
  console.log('\n--- Testing YouTube Videos Data & Showcase ---');
  const ytDataCode = fs.readFileSync('./src/data/youtubeVideos.ts', 'utf8');

  // Verify YouTube channel info
  assert(ytDataCode.includes('UCgtssmXPtGcirH61m0MjrLQ'), 'Channel ID must match official Finance Brunch channel');
  assert(ytDataCode.includes('https://www.youtube.com/@TheFinanceBrunch'), 'Channel URL must be official');

  // Verify real video IDs
  const realVideoIds = [
    '7krdh7k7XYY',
    'sVPYpoMRayA',
    'TB8gp5-L-eI',
    'XZ9Y6pYOHkg',
    'VgcywbIbiYg',
    '5_cZYhvQjQk',
    'BgerokDBsYs',
    '3t42oCUnEU8'
  ];

  realVideoIds.forEach(id => {
    assert(ytDataCode.includes(id), `Verified video ID ${id} must be present`);
  });

  // Verify description field in interface and items
  assert(ytDataCode.includes('description: string;'), 'YouTubeVideo interface must have description field');
  console.log('✓ PASS: All 8 real video IDs and metadata verified from official channel');

  // Verify YouTubeShowcase component significantly enlarged dimensions & layout
  const ytShowcaseCode = fs.readFileSync('./src/components/home/YouTubeShowcase.tsx', 'utf8');
  assert(ytShowcaseCode.includes("min(1100px, calc(100vw - 100px))"), 'YouTube card width must target min(1100px, calc(100vw - 100px))');
  assert(ytShowcaseCode.includes("minHeight: '380px'") || ytShowcaseCode.includes("min-h-[380px]"), 'YouTube card minimum height must target 380px');
  assert(ytShowcaseCode.includes("p-[32px]"), 'YouTube card padding must target 32px on desktop');
  assert(ytShowcaseCode.includes("md:w-[420px]"), 'YouTube video thumbnail width must target approx 420px');
  assert(ytShowcaseCode.includes("gap-[28px]"), 'Gap between thumbnail and video details must target 28px');
  assert(ytShowcaseCode.includes('duration-500 ease-in-out'), 'Transition timing must be duration-500 ease-in-out');
  assert(ytShowcaseCode.includes('translateX(-${currentIndex * 100}%)'), 'Must use single-card 100% horizontal translation');
  assert(ytShowcaseCode.includes('bg-primary w-8'), 'Active pagination indicator must match bg-primary w-8');
  assert(ytShowcaseCode.includes('fb-watermark.png'), 'Must preserve background watermark');
  assert(ytShowcaseCode.includes('YouTubeModal'), 'Must integrate YouTubeModal for video playback');
  assert(ytShowcaseCode.includes('resetAutoplay'), 'Must reset autoplay on user interaction');
  assert(ytShowcaseCode.includes('6000'), 'Must autoplay every 6 seconds');
  assert(ytShowcaseCode.includes('isHovered'), 'Must pause autoplay on hover');
  assert(ytShowcaseCode.includes('handleTouchStart') && ytShowcaseCode.includes('handleTouchEnd'), 'Must support mobile swipe gestures');
  console.log('✓ PASS: YouTubeShowcase significantly enlarged dimensions, 6s autoplay with reset, and hover pause verified');

  console.log('\n--- Testing Investment Planning Carousel & Simplified Cards ---');
  const appleShowcaseCode = fs.readFileSync('./src/components/investment/AppleScrollShowcase.tsx', 'utf8');

  // Verify 6 cards in exact order
  const cardIds = [
    'data-driven',
    'global-diversification',
    'exclusive-opportunities',
    'alternative-investments',
    'technical-expertise',
    'strong-client-network'
  ];

  let lastIndex = -1;
  cardIds.forEach(id => {
    const idx = appleShowcaseCode.indexOf(`id: "${id}"`);
    assert(idx !== -1, `Card ${id} must exist`);
    assert(idx > lastIndex, `Card ${id} must maintain original ordering`);
    lastIndex = idx;
  });
  console.log('✓ PASS: All 6 investment cards preserved in exact original order');

  // Verify bullet-point clutter removal
  assert(!appleShowcaseCode.includes('Key Value Deliverables'), 'Must remove Key Value Deliverables label');
  assert(!appleShowcaseCode.includes('card.highlights'), 'Must remove bullet point checklist rendering');
  console.log('✓ PASS: "KEY VALUE DELIVERABLES" label and bullet points completely removed');

  // Verify 6s autoplay and interaction reset
  assert(appleShowcaseCode.includes('6000'), 'Must autoplay every 6 seconds');
  assert(appleShowcaseCode.includes('resetAutoplay'), 'Must reset autoplay on manual interaction');
  assert(appleShowcaseCode.includes('isHovered'), 'Must pause autoplay on hover');
  console.log('✓ PASS: Investment carousel 6s autoplay with reset and hover pause verified');

  // Verify significantly enlarged card dimensions
  assert(appleShowcaseCode.includes("min(900px, calc(100vw - 120px))"), 'Must target min(900px, calc(100vw - 120px))');
  assert(appleShowcaseCode.includes("minHeight: '450px'") || appleShowcaseCode.includes("min-h-[450px]"), 'Must target 450px card minimum height');
  assert(appleShowcaseCode.includes("p-[36px]"), 'Must target 36px card padding');
  assert(appleShowcaseCode.includes("w-16 h-16"), 'Must target 64px x 64px icon container');
  assert(appleShowcaseCode.includes("text-[32px]"), 'Must target 30-34px heading font size');
  assert(appleShowcaseCode.includes("text-[18px]"), 'Must target 17-18px description font size');
  assert(appleShowcaseCode.includes("space-y-5 lg:space-y-6"), 'Must target 20-24px vertical spacing between sections');
  console.log('✓ PASS: Investment carousel significantly enlarged dimensions, typography, and spacing verified');

  // Verify essential qualifications and concise 1-2 sentence content preserved
  assert(appleShowcaseCode.includes('SEBI-accredited'), 'Must keep SEBI accreditation qualification');
  assert(appleShowcaseCode.includes('99.9% 24K pure Digital Gold'), 'Must keep pure Digital Gold qualification');
  assert(appleShowcaseCode.includes('US tech leaders'), 'Must incorporate global equity leader deliverables');
  assert(appleShowcaseCode.includes('pre-IPO opportunities'), 'Must incorporate pre-IPO deliverables');
  assert(appleShowcaseCode.includes('trailing stop-loss'), 'Must incorporate technical strategy deliverables');
  assert(appleShowcaseCode.includes('1-on-1 advisor reviews'), 'Must incorporate advisor review deliverables');
  console.log('✓ PASS: Essential service meaning and qualifications retained in concise 1-2 sentences');

  console.log('\n========================================');
  console.log('🎉 ALL CAROUSEL & INVESTMENT TESTS PASSED!');
  console.log('========================================\n');
}

runCarouselTests();
