const http = require('http');
const fs = require('fs');
const path = require('path');

const LITELLM_URL = 'https://litellm.talesofai.cn/v1/chat/completions';
const API_KEY = 'sk-fZrLXE0IEs6EDYJCOsLLaQ';
const PORT = 3721;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
};

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.writeHead(200); res.end(); return; }

  const url = new URL(req.url, `http://localhost:${PORT}`);

  if (url.pathname === '/api/llm' && req.method === 'POST') {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        const result = await callLLM(data.messages, data.systemPrompt, data.model);
        res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
        res.end(JSON.stringify(result));
      } catch(e) {
        console.error('LLM error:', e.message);
        res.writeHead(500, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({error: e.message}));
      }
    });
    return;
  }

  let filePath = url.pathname === '/' ? '/index.html' : decodeURIComponent(url.pathname);
  filePath = path.join(__dirname, filePath);
  const ext = path.extname(filePath);
  const mime = MIME[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not Found'); return; }
    res.writeHead(200, {'Content-Type': mime});
    res.end(data);
  });
});

async function callLLM(messages, systemPrompt, model) {
  const msgs = [];
  if (systemPrompt) msgs.push({role: 'system', content: systemPrompt});
  if (Array.isArray(messages)) msgs.push(...messages);
  else msgs.push({role: 'user', content: messages});

  const resp = await fetch(LITELLM_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: model || 'qwen3.6-plus',
      messages: msgs,
      max_tokens: 2048,
      temperature: 0.85
    })
  });

  if (!resp.ok) {
    const t = await resp.text();
    throw new Error(`LLM ${resp.status}: ${t.substring(0, 200)}`);
  }

  const json = await resp.json();
  const text = json.choices?.[0]?.message?.content || '';

  // Try to extract JSON
  const jm = text.match(/\{[\s\S]*\}/);
  if (jm) {
    try { return {text, json: JSON.parse(jm[0])}; } catch(e) {}
  }
  return {text};
}

server.listen(PORT, '0.0.0.0', () => {
  console.log(`rensheng server on :3721`);
});
