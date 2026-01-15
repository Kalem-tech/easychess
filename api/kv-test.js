// Test endpoint to check if KV is working
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Test KV connection
    const testKey = 'kv_test_' + Date.now();
    const testValue = { message: 'KV is working!', timestamp: Date.now() };
    
    let kvWorking = false;
    let errorMessage = null;
    
    try {
      // Try to set a value
      await kv.set(testKey, JSON.stringify(testValue), { ex: 60 }); // Expire in 60 seconds
      
      // Try to get it back
      const retrieved = await kv.get(testKey);
      
      if (retrieved) {
        kvWorking = true;
        // Clean up
        await kv.del(testKey);
      }
    } catch (kvError) {
      errorMessage = kvError.message;
      console.error('KV test error:', kvError);
    }

    return res.status(200).json({
      kvConfigured: !!process.env.KV_REST_API_URL || !!process.env.KV_URL || !!process.env.REDIS_URL,
      kvWorking,
      error: errorMessage,
      envVars: {
        hasKvUrl: !!process.env.KV_REST_API_URL,
        hasKvToken: !!process.env.KV_REST_API_TOKEN,
        hasRedisUrl: !!process.env.REDIS_URL,
        // Don't expose actual values for security
      },
      message: kvWorking 
        ? '✅ KV is working correctly!' 
        : errorMessage 
          ? `❌ KV error: ${errorMessage}` 
          : '⚠️ KV may not be configured. Check environment variables.'
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Test failed',
      message: error.message,
      kvConfigured: false
    });
  }
}
