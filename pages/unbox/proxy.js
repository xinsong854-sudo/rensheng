const http = require('http');
const https = require('https');
const url = require('url');

const TARGET = 'https://api.talesofai.cn';
const PORT = 3001;

http.createServer((req, res) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, x-token'
    });
    res.end();
    return;
  }

  const parsed = url.parse(req.url);
  const options = {
    hostname: 'api.talesofai.cn',
    path: req.url,
    method: req.method,
    headers: { ...req.headers },
    rejectUnauthorized: false
  };
  delete options.headers.host;
  delete options.headers.origin;
  delete options.headers.referer;

  const proxyReq = https.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, x-token',
      'Content-Type': proxyRes.headers['content-type'] || 'application/json'
    });
    proxyRes.pipe(res);
  });

  proxyReq.on('error', (e) => {
    console.error('Proxy error:', e.message);
    res.writeHead(502);
    res.end(JSON.stringify({ error: e.message }));
  });

  req.pipe(proxyReq);
}).listen(PORT, '0.0.0.0', () => {
  console.log(`CORS proxy running on port ${PORT}`);
});
