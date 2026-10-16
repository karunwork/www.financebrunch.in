const { spawn } = require('child_process');
const http = require('http');
const net = require('net');
const crypto = require('crypto');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

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
        'Sec-WebSocket-Version: 13',
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

async function measureDetailed(urlToOpen, viewportWidth, viewportHeight) {
  const port = 9444;
  const chromeProcess = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    `--window-size=${viewportWidth},${viewportHeight}`,
    '--disable-gpu',
    '--no-sandbox',
    urlToOpen
  ]);

  try {
    await new Promise(r => setTimeout(r, 2500));

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

    const result = await new Promise((resolve) => {
      readWsFrames(socket, (msg) => {
        if (msg.id === 1) {
          resolve(msg.result);
        }
      });

      const expr = `
        new Promise((resolve) => {
          let attempts = 0;
          const check = () => {
            const disclaimerBtn = document.querySelector('#disclaimer-ok-button');
            if (disclaimerBtn) disclaimerBtn.click();

            const ytCard = document.querySelector('#insights-youtube .group');
            const invCard = document.querySelector('#why-choose-us [data-slide-card]');

            if (ytCard) {
              const ytRect = ytCard.getBoundingClientRect();
              const ytComputed = window.getComputedStyle(ytCard);
              const ytThumb = ytCard.querySelector('.aspect-video');
              const ytThumbRect = ytThumb ? ytThumb.getBoundingClientRect() : null;
              const ytContent = ytCard.querySelector('.flex-1');
              const ytContentRect = ytContent ? ytContent.getBoundingClientRect() : null;

              resolve({
                type: 'youtube',
                windowInfo: {
                  innerWidth: window.innerWidth,
                  scrollWidth: document.documentElement.scrollWidth,
                  hasHorizontalScroll: document.documentElement.scrollWidth > window.innerWidth
                },
                card: {
                  width: Math.round(ytRect.width),
                  height: Math.round(ytRect.height),
                  minHeight: ytComputed.minHeight,
                  padding: ytComputed.padding
                },
                thumbnail: ytThumbRect ? {
                  width: Math.round(ytThumbRect.width),
                  height: Math.round(ytThumbRect.height),
                  aspectRatio: (ytThumbRect.width / ytThumbRect.height).toFixed(2)
                } : null,
                gap: ytContentRect && ytThumbRect ? Math.round(ytContentRect.left - ytThumbRect.right) : null
              });
            } else if (invCard) {
              const invRect = invCard.getBoundingClientRect();
              const invComputed = window.getComputedStyle(invCard);
              const iconBox = invCard.querySelector('.w-16.h-16') || invCard.querySelector('.rounded-2xl.flex');
              const iconRect = iconBox ? iconBox.getBoundingClientRect() : null;
              const heading = invCard.querySelector('h3');
              const headingComputed = heading ? window.getComputedStyle(heading) : null;
              const desc = invCard.querySelector('p');
              const descComputed = desc ? window.getComputedStyle(desc) : null;

              resolve({
                type: 'investment',
                windowInfo: {
                  innerWidth: window.innerWidth,
                  scrollWidth: document.documentElement.scrollWidth,
                  hasHorizontalScroll: document.documentElement.scrollWidth > window.innerWidth
                },
                card: {
                  width: Math.round(invRect.width),
                  height: Math.round(invRect.height),
                  minHeight: invComputed.minHeight,
                  padding: invComputed.padding
                },
                iconContainer: iconRect ? {
                  width: Math.round(iconRect.width),
                  height: Math.round(iconRect.height)
                } : null,
                headingFontSize: headingComputed ? headingComputed.fontSize : null,
                descriptionFontSize: descComputed ? descComputed.fontSize : null
              });
            } else if (++attempts > 40) {
              resolve({ error: 'Timeout waiting for cards' });
            } else {
              setTimeout(check, 100);
            }
          };
          check();
        })
      `;

      sendWsMessage(socket, {
        id: 1,
        method: 'Runtime.evaluate',
        params: {
          expression: expr,
          awaitPromise: true,
          returnByValue: true
        }
      });
    });

    socket.end();
    return result?.result?.value;
  } finally {
    chromeProcess.kill();
  }
}

async function main() {
  console.log('\n============================================================');
  console.log('📏 ACTUAL RENDERED MEASUREMENTS IN HEADLESS CHROME');
  console.log('============================================================');

  console.log('\n--- 1. DESKTOP VIEWPORT (1280 x 900) ---');
  const ytDesktop = await measureDetailed('http://localhost:8080/', 1280, 900);
  console.log('YouTube Video Card (Desktop):', JSON.stringify(ytDesktop, null, 2));

  const invDesktop = await measureDetailed('http://localhost:8080/investment-planning', 1280, 900);
  console.log('Investment Services Card (Desktop):', JSON.stringify(invDesktop, null, 2));

  console.log('\n--- 2. TABLET VIEWPORT (820 x 900) ---');
  const ytTablet = await measureDetailed('http://localhost:8080/', 820, 900);
  console.log('YouTube Video Card (Tablet):', JSON.stringify(ytTablet, null, 2));

  const invTablet = await measureDetailed('http://localhost:8080/investment-planning', 820, 900);
  console.log('Investment Services Card (Tablet):', JSON.stringify(invTablet, null, 2));

  console.log('\n--- 3. MOBILE VIEWPORT (375 x 812) ---');
  const ytMobile = await measureDetailed('http://localhost:8080/', 375, 812);
  console.log('YouTube Video Card (Mobile):', JSON.stringify(ytMobile, null, 2));

  const invMobile = await measureDetailed('http://localhost:8080/investment-planning', 375, 812);
  console.log('Investment Services Card (Mobile):', JSON.stringify(invMobile, null, 2));
}

main();
