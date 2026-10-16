const https = require('https');

function checkJob() {
  const options = {
    hostname: 'api.github.com',
    path: '/repos/arasadaanishkarthik/Finance-Brunch/actions/runs/38870486406/jobs',
    headers: { 'User-Agent': 'NodeJS' }
  };

  https.get(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const json = JSON.parse(data);
        if (json.jobs) {
          json.jobs.forEach(j => {
            console.log(`Job: ${j.name} | Status: ${j.status} | Conclusion: ${j.conclusion}`);
            if (j.steps) {
              j.steps.forEach(s => {
                console.log(`  - Step: ${s.name} [${s.status} / ${s.conclusion || 'running'}]`);
              });
            }
          });
        } else {
          console.log(data.slice(0, 300));
        }
      } catch (e) {
        console.error('Error:', e.message);
      }
    });
  }).on('error', console.error);
}

checkJob();
