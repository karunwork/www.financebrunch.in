const https = require('https');

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', reject);
  });
}

async function verify() {
  console.log('Fetching live index.html...');
  const res = await fetch('https://www.financebrunch.in/index.html');
  console.log('Status:', res.status);
  
  // Find all js chunks
  const scriptMatches = res.data.match(/src="[^"]+"/g) || [];
  console.log('Script tags found:', scriptMatches);

  // Check the subtle watermark image asset directly on GitHub Pages
  console.log('\nChecking live fb-watermark-subtle.png...');
  const imgRes = await new Promise((resolve) => {
    https.get('https://www.financebrunch.in/images/fb-watermark-subtle.png', (r) => {
      let size = 0;
      r.on('data', d => size += d.length);
      r.on('end', () => resolve({ status: r.statusCode, size }));
    }).on('error', (e) => resolve({ status: 500, error: e.message }));
  });
  console.log(`Live watermark image status: ${imgRes.status}, size: ${imgRes.size} bytes`);

  // Check the index js bundle
  const indexJsMatch = res.data.match(/\/assets\/index-[^"]+\.js/);
  if (indexJsMatch) {
    const jsUrl = `https://www.financebrunch.in${indexJsMatch[0]}`;
    console.log(`\nFetching ${jsUrl}...`);
    const jsRes = await fetch(jsUrl);
    console.log(`Index JS Status: ${jsRes.status}, size: ${jsRes.data.length}`);
    
    // Check if it has MutualFundCalculator dynamic chunk name
    const calcChunkMatch = jsRes.data.match(/MutualFundCalculator-[^.]+\.js/);
    console.log('MutualFundCalculator chunk in bundle:', calcChunkMatch ? calcChunkMatch[0] : 'not found');

    if (calcChunkMatch) {
      const chunkUrl = `https://www.financebrunch.in/assets/${calcChunkMatch[0]}`;
      console.log(`\nFetching live chunk: ${chunkUrl}...`);
      const chunkRes = await fetch(chunkUrl);
      console.log(`Chunk status: ${chunkRes.status}, size: ${chunkRes.data.length}`);
      const hasWatermarkSubtle = chunkRes.data.includes('fb-watermark-subtle') || chunkRes.data.includes('drawPdfBackgroundWatermark') || chunkRes.data.includes('behindDocument');
      console.log('Contains watermark logic:', hasWatermarkSubtle);
    }
  }
}

verify().catch(console.error);
