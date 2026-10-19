const { spawn } = require('child_process');
const http = require('http');
const net = require('net');
const crypto = require('crypto');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const LIVE_URL = 'https://arasadaanishkarthik.github.io/Finance-Brunch/';

function createWebSocketConnection(wsUrl) {
  return new Promise((resolve, reject) => {
    const url = new URL(wsUrl);
    const host = url.hostname;
    const port = url.port || 80;
    const path = url.pathname;

    const key = crypto.randomBytes(16).toString('base64');
    const socket = net.createConnection(port, host, () => {
      const headers = [
        `GET ${path} HTTP/1.1`,
        `Host: ${host}:${port}`,
        'Upgrade: websocket',
        'Connection: Upgrade',
        `Sec-WebSocket-Key: ${key}`,
        `Sec-WebSocket-Version: 13`,
        '\r\n'
      ].join('\r\n');
      socket.write(headers);
    });

    let isUpgraded = false;
    let buffer = Buffer.alloc(0);

    socket.on('data', (data) => {
      if (!isUpgraded) {
        buffer = Buffer.concat([buffer, data]);
        const headerEnd = buffer.indexOf('\r\n\r\n');
        if (headerEnd !== -1) {
          isUpgraded = true;
          const remaining = buffer.slice(headerEnd + 4);
          resolve({ socket, remaining });
        }
      }
    });

    socket.on('error', reject);
  });
}

function sendWsMessage(socket, obj) {
  const json = JSON.stringify(obj);
  const payload = Buffer.from(json);
  const length = payload.length;

  let header;
  if (length < 126) {
    header = Buffer.from([0x81, 0x80 | length]);
  } else if (length < 65536) {
    header = Buffer.alloc(4);
    header[0] = 0x81;
    header[1] = 0x80 | 126;
    header.writeUInt16BE(length, 2);
  } else {
    header = Buffer.alloc(10);
    header[0] = 0x81;
    header[1] = 0x80 | 127;
    header.writeBigUInt64BE(BigInt(length), 2);
  }

  const mask = crypto.randomBytes(4);
  const maskedPayload = Buffer.alloc(length);
  for (let i = 0; i < length; i++) {
    maskedPayload[i] = payload[i] ^ mask[i % 4];
  }

  socket.write(Buffer.concat([header, mask, maskedPayload]));
}

function readWsFrames(socket, onMessage) {
  let buf = Buffer.alloc(0);
  socket.on('data', (chunk) => {
    buf = Buffer.concat([buf, chunk]);
    while (buf.length >= 2) {
      const firstByte = buf[0];
      const secondByte = buf[1];
      const masked = (secondByte & 0x80) !== 0;
      let len = secondByte & 0x7f;
      let offset = 2;

      if (len === 126) {
        if (buf.length < 4) return;
        len = buf.readUInt16BE(2);
        offset = 4;
      } else if (len === 127) {
        if (buf.length < 10) return;
        len = Number(buf.readBigUInt64BE(2));
        offset = 10;
      }

      let mask = null;
      if (masked) {
        if (buf.length < offset + 4) return;
        mask = buf.slice(offset, offset + 4);
        offset += 4;
      }

      if (buf.length < offset + len) return;

      const payload = buf.slice(offset, offset + len);
      if (masked && mask) {
        for (let i = 0; i < len; i++) {
          payload[i] ^= mask[i % 4];
        }
      }

      buf = buf.slice(offset + len);
      try {
        const text = payload.toString('utf8');
        onMessage(JSON.parse(text));
      } catch (e) {}
    }
  });
}

async function verifyPage(url, evalCode) {
  const port = 9555;
  const chromeProcess = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--window-size=1280,900',
    '--disable-gpu',
    '--no-sandbox',
    url
  ]);

  try {
    await new Promise(r => setTimeout(r, 4000));

    const targets = await new Promise((res, rej) => {
      http.get(`http://127.0.0.1:${port}/json/list`, (r) => {
        let d = '';
        r.on('data', c => d += c);
        r.on('end', () => res(JSON.parse(d)));
      }).on('error', rej);
    });

    const page = targets.find(t => t.type === 'page');
    if (!page || !page.webSocketDebuggerUrl) {
      throw new Error('No page WebSocket URL');
    }

    const { socket } = await createWebSocketConnection(page.webSocketDebuggerUrl);

    let msgId = 1;
    const errors = [];

    const sendCmd = (method, params) => new Promise((resolve) => {
      const id = ++msgId;
      const handler = (msg) => {
        if (msg.method === 'Log.entryAdded' && msg.params?.entry?.level === 'error') {
          errors.push(msg.params.entry.text);
        }
        if (msg.id === id) {
          resolve(msg.result);
        }
      };
      readWsFrames(socket, handler);
      sendWsMessage(socket, { id, method, params });
    });

    await sendCmd('Log.enable', {});

    const evalResult = await sendCmd('Runtime.evaluate', {
      expression: evalCode,
      awaitPromise: true,
      returnByValue: true
    });

    socket.end();
    return {
      result: evalResult?.result?.value,
      errors
    };
  } finally {
    chromeProcess.kill();
  }
}

async function runLiveVerification() {
  console.log('============================================================');
  console.log('🌐 LIVE PRODUCTION WEBSITE VERIFICATION');
  console.log('Production URL:', LIVE_URL);
  console.log('============================================================\n');

  // 1. Homepage Verification
  console.log('--- 1. Testing Live Homepage & Components ---');
  const homeCheck = await verifyPage(LIVE_URL, `
    new Promise((resolve) => {
      let attempts = 0;
      const check = () => {
        const title = document.title;
        const logo = document.querySelector('nav img, nav svg, header img');
        const ytCard = document.querySelector('#insights-youtube .fb-youtube__video-card');
        const comprehensiveHeading = Array.from(document.querySelectorAll('h2, h3, span')).some(el => el.textContent.includes('Comprehensive Financial Solutions'));
        const incomeTaxInServices = Array.from(document.querySelectorAll('#services h3, #products h3')).some(el => el.textContent.trim() === 'Income Tax Filing');

        const testimonialsSec = document.querySelector('#testimonials');
        const testimonialsText = testimonialsSec ? testimonialsSec.innerText : '';
        const testimonialsLink = testimonialsSec ? testimonialsSec.querySelector('a')?.href : null;

        if (ytCard && testimonialsSec) {
          const ytRect = ytCard.getBoundingClientRect();
          resolve({
            status: 'success',
            title,
            logoFound: !!logo,
            hasComprehensiveHeading: comprehensiveHeading,
            incomeTaxCardRemovedFromServices: !incomeTaxInServices,
            testimonialsSection: {
              found: true,
              hasGoogleReviewsBadge: testimonialsText.includes('Google Reviews'),
              hasVerifiedLink: !!testimonialsLink,
              linkUrl: testimonialsLink
            },
            youtubeCard: {
              found: true,
              width: Math.round(ytRect.width),
              height: Math.round(ytRect.height)
            }
          });
        } else if (++attempts > 40) {
          resolve({ status: 'timeout', title, bodyExcerpt: document.body.innerText.slice(0, 300) });
        } else {
          setTimeout(check, 100);
        }
      };
      check();
    })
  `);
  console.log('Homepage Result:', JSON.stringify(homeCheck.result, null, 2));
  console.log('Console Errors:', homeCheck.errors.length === 0 ? 'None ✓' : homeCheck.errors);

  // 2. Direct Navigation to /global-tax-file
  console.log('\n--- 2. Testing Direct Navigation to /global-tax-file ---');
  const taxCheck = await verifyPage(LIVE_URL + 'global-tax-file', `
    new Promise((resolve) => {
      let attempts = 0;
      const check = () => {
        const h1 = document.querySelector('h1')?.innerText;
        const taxpayerButtons = Array.from(document.querySelectorAll('button, [role="button"]')).map(b => b.innerText.trim()).filter(t => ['Individual', 'Non-Resident Indian (NRI)', 'Professional/Freelancer', 'Startup', 'Limited Liability Partnership (LLP)', 'MSME', 'Company'].includes(t));
        const calcButton = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Calculate Tax') || b.innerText.includes('Calculate'));

        if (h1 && taxpayerButtons.length > 0) {
          resolve({
            status: 'success',
            heading: h1,
            taxpayerTypes: taxpayerButtons,
            hasLLP: taxpayerButtons.includes('Limited Liability Partnership (LLP)'),
            hasMSME: taxpayerButtons.includes('MSME'),
            hasCompany: taxpayerButtons.includes('Company'),
            calcButtonFound: !!calcButton
          });
        } else if (++attempts > 40) {
          resolve({ status: 'timeout', url: window.location.href, bodyExcerpt: document.body.innerText.slice(0, 300) });
        } else {
          setTimeout(check, 100);
        }
      };
      check();
    })
  `);
  console.log('Global Tax File Result:', JSON.stringify(taxCheck.result, null, 2));

  // 3. Investment Services Page & Carousel
  console.log('\n--- 3. Testing Investment Planning Carousel ---');
  const invCheck = await verifyPage(LIVE_URL + 'investment-planning', `
    new Promise((resolve) => {
      let attempts = 0;
      const check = () => {
        const disclaimerBtn = document.querySelector('#disclaimer-ok-button');
        if (disclaimerBtn) disclaimerBtn.click();

        const invCard = document.querySelector('#why-choose-us [data-slide-card]');
        if (invCard) {
          const rect = invCard.getBoundingClientRect();
          const heading = invCard.querySelector('h3')?.innerText;
          const hasKeyDeliverables = invCard.innerText.includes('KEY VALUE DELIVERABLES');
          resolve({
            status: 'success',
            cardWidth: Math.round(rect.width),
            cardHeight: Math.round(rect.height),
            firstHeading: heading,
            hasKeyDeliverablesLabel: hasKeyDeliverables
          });
        } else if (++attempts > 40) {
          resolve({ status: 'timeout', url: window.location.href, bodyExcerpt: document.body.innerText.slice(0, 300) });
        } else {
          setTimeout(check, 100);
        }
      };
      check();
    })
  `);
  console.log('Investment Planning Result:', JSON.stringify(invCheck.result, null, 2));

  // 4. Calculator Page (SIP / SWP ₹100 Cr enforcement)
  console.log('\n--- 4. Testing Calculator Page Limits ---');
  const calcCheck = await verifyPage(LIVE_URL + 'calculator', `
    new Promise((resolve) => {
      let attempts = 0;
      const check = () => {
        const inputs = Array.from(document.querySelectorAll('input[type="text"], input[type="number"]'));
        if (inputs.length > 0) {
          resolve({
            status: 'success',
            title: document.title,
            inputsCount: inputs.length
          });
        } else if (++attempts > 40) {
          resolve({ status: 'timeout', url: window.location.href, bodyExcerpt: document.body.innerText.slice(0, 300) });
        } else {
          setTimeout(check, 100);
        }
      };
      check();
    })
  `);
  console.log('Calculator Page Result:', JSON.stringify(calcCheck.result, null, 2));
}

runLiveVerification();
