/**
 * Vercel serverless: proxy viewer count so the browser calls same-origin (avoids CORS/ad-blockers).
 * GET /api/viewers -> returns { count } (read)
 * GET /api/viewers?hit=1 -> increments and returns { count } (visitor +1)
 */
const COUNTAPI = 'https://api.countapi.xyz';
const NAMESPACE = 'easychess';
const KEY = 'viewers';

async function proxyCount(hit) {
  const path = hit ? 'hit' : 'get';
  const url = `${COUNTAPI}/${path}/${NAMESPACE}/${KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(res.statusText);
  const data = await res.json();
  const value = data.value != null ? data.value : (data.count != null ? data.count : 0);
  return { count: value };
}

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

module.exports = async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const hit = req.query && (req.query.hit === '1' || req.query.hit === 'true');

  try {
    const data = await proxyCount(hit);
    return res.status(200).json(data);
  } catch (e) {
    console.error('Viewers API error:', e.message);
    return res.status(502).json({ count: 0 });
  }
};
