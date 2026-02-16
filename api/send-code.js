// Vercel serverless: send 5-digit code to email. Needs RESEND_API_KEY, UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN.
const { Redis } = require('@upstash/redis');
const { Resend } = require('resend');

const CODE_TTL_SEC = 600; // 10 minutes
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Chess Game <onboarding@resend.dev>';

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

module.exports = async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  let email;
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    email = (body.email || '').trim().toLowerCase();
  } catch (_) {
    return res.status(400).json({ error: 'Invalid JSON' });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  const code = String(Math.floor(10000 + Math.random() * 90000)); // 5 digits

  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!redisUrl || !redisToken) {
    return res.status(500).json({ error: 'Server not configured for email sign-in. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.' });
  }
  try {
    const redis = new Redis({ url: redisUrl, token: redisToken });
    await redis.set(`otp:${email}`, code, { ex: CODE_TTL_SEC });
  } catch (e) {
    console.error('Redis error:', e);
    return res.status(500).json({ error: 'Could not store code. Try again.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Email not configured. Set RESEND_API_KEY.' });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Your Chess Game sign-in code',
      html: `<p>Your 5-digit code is: <strong>${code}</strong></p><p>It expires in 10 minutes.</p>`
    });
    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: error.message || 'Failed to send email' });
    }
  } catch (e) {
    console.error('Send email error:', e);
    return res.status(500).json({ error: 'Failed to send email' });
  }

  return res.status(200).json({ success: true });
}
