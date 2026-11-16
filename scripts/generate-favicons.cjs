const fs = require('fs');

const iconEntries = [
  ['public/favicon-16.png', 16],
  ['public/favicon-32.png', 32],
  ['public/favicon-v2.png', 48],
].map(([file, size]) => ({ data: fs.readFileSync(file), size }));

const directory = Buffer.alloc(6 + iconEntries.length * 16);
directory.writeUInt16LE(0, 0);
directory.writeUInt16LE(1, 2);
directory.writeUInt16LE(iconEntries.length, 4);
let offset = directory.length;
const images = [];
iconEntries.forEach(({ data, size }, index) => {
  const entryOffset = 6 + index * 16;
  directory.writeUInt8(size === 256 ? 0 : size, entryOffset);
  directory.writeUInt8(size === 256 ? 0 : size, entryOffset + 1);
  directory.writeUInt8(0, entryOffset + 2);
  directory.writeUInt8(0, entryOffset + 3);
  directory.writeUInt16LE(1, entryOffset + 4);
  directory.writeUInt16LE(32, entryOffset + 6);
  directory.writeUInt32LE(data.length, entryOffset + 8);
  directory.writeUInt32LE(offset, entryOffset + 12);
  images.push(data);
  offset += data.length;
});
fs.writeFileSync('public/favicon.ico', Buffer.concat([directory, ...images]));
console.log('Created public/favicon.ico with 16x16, 32x32, and 48x48 entries');

// Keep the manifest aligned with the static HTML icon declarations.
const manifest = {
  name: "Finance Brunch",
  short_name: "Finance Brunch",
  description: "Financial Advisory, Wealth & Planning",
  start_url: "/",
  display: "standalone",
  background_color: "#080e1e",
  theme_color: "#080e1e",
  icons: [
    {
      src: "/favicon-v2-192.png",
      sizes: "192x192",
      type: "image/png",
      purpose: "any maskable"
    },
    {
      src: "/favicon-v2-512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "any maskable"
    }
  ]
};

fs.writeFileSync('public/site.webmanifest', JSON.stringify(manifest, null, 2), 'utf8');
console.log('Updated public/site.webmanifest');

