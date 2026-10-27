const { spawn } = require('child_process');
const http = require('http');
const net = require('net');
const crypto = require('crypto');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const LIVE_URL = 'https://www.financebrunch.in/investment-planning';

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

async function runTest(viewport, testFn) {
  const port = 9556;
  const chromeProcess = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    `--window-size=${viewport.width},${viewport.height}`,
    '--disable-gpu',
    '--no-sandbox',
    LIVE_URL
  ]);

  try {
    await new Promise(r => setTimeout(r, 4500));

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
      expression: `(${testFn.toString()})()`,
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

async function verifyLive() {
  console.log('Testing Desktop (1280x900) Live Investment Planning...');
  const desktop = await runTest({ width: 1280, height: 900 }, async () => {
    const disclaimerBtn = document.querySelector('#disclaimer-ok-button');
    if (disclaimerBtn) disclaimerBtn.click();

    await new Promise(r => setTimeout(r, 800));

    const showcase = document.querySelector('#why-choose-us');
    const track = document.querySelector('[data-scroll-track]');
    const cards = Array.from(document.querySelectorAll('#why-choose-us [data-slide-card]'));
    const skipBtn = document.querySelector('a[href="#comprehensive-investment-services"]');
    const targetSection = document.querySelector('#comprehensive-investment-services');

    const cardDetails = cards.map(c => {
      const rect = c.getBoundingClientRect();
      const h3 = c.querySelector('h3')?.innerText;
      return {
        title: h3,
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        borderRadius: window.getComputedStyle(c).borderRadius
      };
    });

    // Check scroll progress and track movement
    const initialTrackRect = track ? track.getBoundingClientRect() : null;
    
    // Scroll down into the showcase section
    window.scrollTo({ top: 1200, behavior: 'instant' });
    await new Promise(r => setTimeout(r, 500));
    const scrolledTrackRect = track ? track.getBoundingClientRect() : null;

    // Scroll past the showcase to check unpinning and vertical continuation
    window.scrollTo({ top: 6000, behavior: 'instant' });
    await new Promise(r => setTimeout(r, 500));
    const targetRect = targetSection ? targetSection.getBoundingClientRect() : null;
    const finalScrollY = window.scrollY;

    return {
      cardCount: cards.length,
      cardDetails,
      initialTrackLeft: initialTrackRect ? Math.round(initialTrackRect.left) : null,
      scrolledTrackLeft: scrolledTrackRect ? Math.round(scrolledTrackRect.left) : null,
      hasSkipButton: !!skipBtn,
      finalScrollY,
      targetSectionFound: !!targetSection,
      canScrollPastPinnedSection: finalScrollY > 3000
    };
  });

  console.log('Desktop Live Result:', JSON.stringify(desktop.result, null, 2));
  console.log('Desktop Console Errors:', desktop.errors.length === 0 ? 'None ✓' : desktop.errors);

  console.log('\nTesting Mobile (375x812) Live Investment Planning...');
  const mobile = await runTest({ width: 375, height: 812 }, async () => {
    const disclaimerBtn = document.querySelector('#disclaimer-ok-button');
    if (disclaimerBtn) disclaimerBtn.click();

    await new Promise(r => setTimeout(r, 800));

    const cards = Array.from(document.querySelectorAll('#why-choose-us [data-slide-card]'));
    const docWidth = document.documentElement.scrollWidth;
    const windowWidth = window.innerWidth;

    const cardDetails = cards.map(c => {
      const rect = c.getBoundingClientRect();
      return {
        title: c.querySelector('h3')?.innerText,
        width: Math.round(rect.width),
        height: Math.round(rect.height)
      };
    });

    return {
      cardCount: cards.length,
      cardDetails,
      docWidth,
      windowWidth,
      hasHorizontalPageOverflow: docWidth > windowWidth
    };
  });

  console.log('Mobile Live Result:', JSON.stringify(mobile.result, null, 2));
  console.log('Mobile Console Errors:', mobile.errors.length === 0 ? 'None ✓' : mobile.errors);
}

verifyLive();
