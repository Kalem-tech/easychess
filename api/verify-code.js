// Vercel serverless: verify 5-digit code. Needs UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN.
const { Redis } = require('@upstash/redis');

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

module.exports = async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  let email, code;
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    email = (body.email || '').trim().toLowerCase();
    code = (body.code || '').trim();
  } catch (_) {
    return res.status(400).json({ error: 'Invalid JSON' });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email required' });
  }
  if (!/^\d{5}$/.test(code)) {
    return res.status(400).json({ error: 'Code must be 5 digits' });
  }

  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!redisUrl || !redisToken) {
    return res.status(500).json({ error: 'Server not configured for verification' });
  }

  try {
    const redis = new Redis({ url: redisUrl, token: redisToken });
    const key = `otp:${email}`;
    const stored = await redis.get(key);
    if (stored !== code) {
      return res.status(400).json({ error: 'Invalid or expired code' });
    }
    await redis.del(key);
  } catch (e) {
    console.error('Redis error:', e);
    return res.status(500).json({ error: 'Verification failed' });
  }

  return res.status(200).json({ success: true, email });
}
