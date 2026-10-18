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

  // Verify Services and the YouTube showcase remain separate homepage sections.
  const ytShowcaseCode = fs.readFileSync('./src/components/home/YouTubeShowcase.tsx', 'utf8');
  const homepageCode = fs.readFileSync('./src/pages/Index.tsx', 'utf8');
  const routesCode = fs.readFileSync('./src/App.tsx', 'utf8');
  const scrollCode = fs.readFileSync('./src/components/layout/SmoothScroll.tsx', 'utf8');
  const showcaseCss = fs.readFileSync('./src/components/home/YouTubeShowcase.css', 'utf8');

  assert.strictEqual((homepageCode.match(/<Services \/>/g) || []).length, 1, 'Homepage must render Services exactly once');
  assert(homepageCode.indexOf('<Services />') < homepageCode.indexOf('<Testimonials />'), 'Services must stay in its original position before testimonials');
  assert(homepageCode.indexOf('<Testimonials />') < homepageCode.indexOf('<YouTubeShowcase />'), 'Showcase must stay after client testimonials and Google reviews');
  assert.strictEqual((homepageCode.match(/<YouTubeShowcase \/>/g) || []).length, 1, 'Homepage must render the YouTube showcase exactly once');
  assert(ytShowcaseCode.includes('id="insights-youtube"'), 'Showcase must preserve the legacy section ID');
  assert(routesCode.includes("'/insights': 'insights-youtube'") && routesCode.includes("'/youtube': 'insights-youtube'"), 'Insights and YouTube section routes must remain mapped');

  assert(ytShowcaseCode.includes('useState<YouTubeVideo[]>(youtubeVideos)'), 'Showcase must start from genuine Finance Brunch YouTube data');
  assert(ytShowcaseCode.includes('fetchLiveYouTubeVideos()'), 'Showcase must update from the existing live YouTube integration');
  assert(ytShowcaseCode.includes('Latest Videos from <span>The Finance Brunch</span>'), 'Showcase must show the official YouTube heading');
  assert(ytShowcaseCode.includes('Financial insights, market updates, and investment education.'), 'Showcase must show the required subtitle');
  assert(ytShowcaseCode.includes('<YouTubeModal video={selectedVideo}'), 'Video playback must use the existing modal');
  assert(ytShowcaseCode.includes('src={video.thumbnail}') && ytShowcaseCode.includes('video.maxResThumbnail'), 'Video cards must use official YouTube thumbnails at responsive sizes');
  assert(ytShowcaseCode.includes('{video.title}') && !ytShowcaseCode.includes('{video.description}'), 'Compact video cards must show the source title without lengthy descriptions');
  assert(ytShowcaseCode.includes('{YOUTUBE_CHANNEL.name}') && ytShowcaseCode.includes('YOUTUBE_CHANNEL.url'), 'Showcase must attribute and link to the official channel');
  assert(ytShowcaseCode.includes('videos.map((video, index)'), 'Showcase slides must render the YouTube video collection');
  assert(!ytShowcaseCode.includes("title: 'Investment Planning'") && !ytShowcaseCode.includes("title: 'Mutual Funds'"), 'Services cards must not be embedded as YouTube showcase data');
  assert(ytShowcaseCode.includes("track.querySelectorAll<HTMLElement>('[data-video-slide]')"), 'Scroll progress must target only this showcase video slides');
  assert(!ytShowcaseCode.includes("querySelectorAll('.card')"), 'Pin animation must not use a broad generic card selector');
  assert(ytShowcaseCode.includes('<canvas ref={canvasRef}'), 'Showcase must render its ambient particle canvas');
  assert(ytShowcaseCode.includes('height = window.innerHeight'), 'Particle canvas must stay viewport sized instead of scaling with pin spacing');
  assert(ytShowcaseCode.includes('time - lastFrame < 33'), 'Particle animation must be frame limited');
  assert(ytShowcaseCode.includes('intersectionObserver.observe(stage)'), 'Particle animation must pause outside the showcase viewport');
  assert(ytShowcaseCode.includes("document.addEventListener('visibilitychange', handleVisibility)"), 'Particle animation must pause when the page is hidden');
  assert(ytShowcaseCode.includes("window.matchMedia('(prefers-reduced-motion: reduce)')"), 'Showcase must respect reduced-motion preferences');
  assert(ytShowcaseCode.includes('ScrollTrigger.create({') && ytShowcaseCode.includes('pin: stage'), 'Showcase stage must pin through ScrollTrigger');
  assert(ytShowcaseCode.includes('scrub: true'), 'Horizontal animation must track vertical scrolling without scrub lag at the pin boundary');
  assert(ytShowcaseCode.includes('track.scrollWidth - viewportWidth'), 'Horizontal travel must use measured track and viewport widths');
  assert(ytShowcaseCode.includes("end: () => '+=' + Math.max(metricsRef.current.horizontalTravel, 1)"), 'Pin duration must match the cached measured horizontal travel');
  assert(ytShowcaseCode.includes('onRefreshInit: measure'), 'Track dimensions must be recalculated before a ScrollTrigger refresh');
  assert(ytShowcaseCode.includes("'(prefers-reduced-motion: no-preference) and (min-width: 701px)'"), 'Pinned scrolling must be disabled for mobile and reduced motion');
  assert(ytShowcaseCode.includes('Skip videos') && ytShowcaseCode.includes('handleSkipVideos'), 'Showcase must include a visible skip control');
  assert(ytShowcaseCode.includes("document.getElementById('contact')") && ytShowcaseCode.includes('scrollWindowTo(Math.max(0, footerTop), true)'), 'Skip control must use the shared smooth scroller to reach the footer');
  assert(!ytShowcaseCode.includes('setInterval(') && !ytShowcaseCode.includes('setCurrentIndex('), 'Scroll progress must not run autoplay or update React state each frame');
  assert(ytShowcaseCode.includes('onFocus={() => focusCardInRail(index)}'), 'Keyboard focus must bring the focused desktop card into view');
  assert(showcaseCss.includes('flex: 0 0 clamp(480px, 32vw, 530px);'), 'Desktop rail must show larger video cards');
  assert(showcaseCss.includes('height: calc(100svh - var(--fb-pin-offset, 84px));'), 'Showcase viewport must fit beneath the measured fixed navigation');
  assert(showcaseCss.includes('scroll-snap-type: x mandatory;'), 'Mobile showcase rail must support native swipe snapping');
  assert(showcaseCss.includes('.fb-youtube__skip:focus-visible'), 'Skip control must show a visible keyboard focus state');
  assert(showcaseCss.includes('@media (prefers-reduced-motion: reduce)'), 'Showcase CSS must provide a reduced-motion layout');
  assert((scrollCode.match(/new Lenis\(/g) || []).length === 1, 'App must use one Lenis instance');
  assert(scrollCode.includes('autoRaf: false') && scrollCode.includes('smoothWheel: true'), 'Lenis must use the shared GSAP ticker for smooth wheel scrolling');
  assert(scrollCode.includes('gsap.ticker.add(driveLenis)') && scrollCode.includes('raf(time * 1000)'), 'GSAP ticker must drive the single Lenis instance');
  assert(scrollCode.includes("lenis.on('scroll', syncScrollTrigger)"), 'Lenis scroll events must update ScrollTrigger');
  assert(scrollCode.includes('anchors: false'), 'Lenis must leave anchor handling to the existing router utilities');
  assert(scrollCode.includes('lenis.destroy()'), 'Lenis instance must be destroyed when the app unmounts');
  console.log('PASS: YouTube showcase content, pinned video rail, reduced-motion support, keyboard navigation, and Lenis integration verified');

  console.log('\n--- Testing Investment Planning Lenis.dev Showcase & Compact Cards ---');
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

  // Verify Lenis.dev scroll effect and ScrollTrigger pinning
  assert(appleShowcaseCode.includes('ScrollTrigger.create({') && appleShowcaseCode.includes('pin: stage'), 'Showcase stage must pin through ScrollTrigger');
  assert(appleShowcaseCode.includes('scrub: true'), 'Horizontal animation must track vertical scrolling with scrub');
  assert(appleShowcaseCode.includes('track.scrollWidth - viewportWidth'), 'Horizontal travel must use measured track and viewport widths');
  assert(appleShowcaseCode.includes('<canvas ref={canvasRef}'), 'Showcase must render its ambient glowing particle canvas');
  assert(appleShowcaseCode.includes('fb-investment-showcase'), 'Showcase must use dedicated cinematic showcase class');

  // Verify compact card dimensions matching Reference 2 screenshot
  const investmentShowcaseCss = fs.readFileSync('./src/components/investment/AppleScrollShowcase.css', 'utf8');
  assert(investmentShowcaseCss.includes('clamp(330px, 25vw, 360px)'), 'Column/card width must match compact reference dimensions (330-360px)');
  assert(investmentShowcaseCss.includes('height: 235px') || investmentShowcaseCss.includes('min-height: 225px'), 'Card height must be compact (225-250px)');
  assert(investmentShowcaseCss.includes('border-radius: 1.25rem'), 'Card corners must match reference rounded style');
  assert(appleShowcaseCode.includes('data-column-slide'), 'Showcase slides must render column slides');
  console.log('✓ PASS: Investment Lenis.dev scroll effect, ScrollTrigger pinning, particle canvas, and compact card dimensions verified');

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
