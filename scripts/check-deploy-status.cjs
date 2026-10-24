const https = require('https');

const commitSha = 'c1cd9393dd9d9d4b8c7c312e0e6cc16246449612';

function getRuns() {
  const options = {
    hostname: 'api.github.com',
    path: `/repos/arasadaanishkarthik/Finance-Brunch/actions/runs?head_sha=${commitSha}`,
    headers: { 'User-Agent': 'NodeJS' }
  };

  https.get(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const json = JSON.parse(data);
        if (json.workflow_runs && json.workflow_runs.length > 0) {
          const run = json.workflow_runs[0];
          console.log(`Workflow Run: ${run.name} (#${run.run_number})`);
          console.log(`Status: ${run.status} | Conclusion: ${run.conclusion}`);
          console.log(`URL: ${run.html_url}`);
          
          if (run.jobs_url) {
            checkJobs(run.jobs_url);
          }
        } else {
          console.log('No workflow runs found yet for sha:', commitSha);
        }
      } catch (e) {
        console.error('Error parsing runs:', e.message);
      }
    });
  }).on('error', console.error);
}

function checkJobs(jobsUrl) {
  const url = new URL(jobsUrl);
  const options = {
    hostname: url.hostname,
    path: url.pathname,
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
            console.log(`  Job: ${j.name} | Status: ${j.status} | Conclusion: ${j.conclusion}`);
            if (j.steps) {
              j.steps.forEach(s => {
                console.log(`    - Step: ${s.name} [${s.status} / ${s.conclusion || 'running'}]`);
              });
            }
          });
        }
      } catch (e) {
        console.error('Error parsing jobs:', e.message);
      }
    });
  }).on('error', console.error);
}

getRuns();

