const https = require('https');

function testFeed() {
  https.get('https://www.youtube.com/feeds/videos.xml?channel_id=UCgtssmXPtGcirH61m0MjrLQ', (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
      console.log('Status:', res.statusCode);
      const entries = data.split('<entry>');
      console.log('Total entries found:', entries.length - 1);
      entries.slice(1, 6).forEach((e, idx) => {
        const title = (e.match(/<title>([^<]+)<\/title>/) || [])[1];
        const vidId = (e.match(/<yt:videoId>([^<]+)<\/yt:videoId>/) || [])[1];
        const pub = (e.match(/<published>([^<]+)<\/published>/) || [])[1];
        const desc = (e.match(/<media:description>([\s\S]*?)<\/media:description>/) || [])[1];
        console.log(`${idx + 1}. [${vidId}] ${title}`);
        console.log(`   Published: ${pub}`);
        console.log(`   Description: ${desc ? desc.trim().slice(0, 100) + '...' : 'N/A'}`);
      });
    });
  }).on('error', console.error);
}

testFeed();
