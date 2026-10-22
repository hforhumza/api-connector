// Minimal static file server for hosting this prototype on Node.js (e.g. Cloudways Velocity).
// No dependencies. Start with: node server.js   (listens on process.env.PORT, default 3000)
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PORT = process.env.PORT || 3000;
const ENTRY = 'login.html'; // "/" opens the login screen, which leads to index.html (the dashboard)

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

// only these are served; keeps server.js, package.json and dotfiles private
const PUBLIC = (rel) => rel === 'index.html' || rel === 'login.html' || rel === 'api.html' || rel.startsWith('assets/');

http
  .createServer((req, res) => {
    let rel;
    try {
      rel = decodeURIComponent(new URL(req.url, 'http://x').pathname).replace(/^\/+/, '');
    } catch {
      res.writeHead(400).end('Bad request');
      return;
    }
    if (rel === '') rel = ENTRY;

    const file = path.normalize(path.join(ROOT, rel));
    if (!file.startsWith(ROOT + path.sep) || !PUBLIC(path.relative(ROOT, file).split(path.sep).join('/'))) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Not found');
      return;
    }

    fs.readFile(file, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Not found');
        return;
      }
      const ext = path.extname(file).toLowerCase();
      const isAsset = rel.startsWith('assets/');
      res.writeHead(200, {
        'Content-Type': TYPES[ext] || 'application/octet-stream',
        // assets are versioned with ?v= in the pages; HTML is always revalidated
        'Cache-Control': isAsset ? 'public, max-age=86400' : 'no-cache',
        'X-Content-Type-Options': 'nosniff',
      });
      res.end(data);
    });
  })
  .listen(PORT, '0.0.0.0', () => console.log(`Cloudways dashboard prototype on port ${PORT}`));
