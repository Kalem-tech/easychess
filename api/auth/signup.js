// User signup API endpoint
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { username, email, password } = body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email, and password required' });
    }

    if (username.length < 3) {
      return res.status(400).json({ error: 'Username must be at least 3 characters' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Use Supabase if configured, otherwise use in-memory storage
    if (process.env.SUPABASE_URL && process.env.SUPABASE_KEY) {
      // Check if username or email already exists
      const checkResponse = await fetch(
        `${process.env.SUPABASE_URL}/rest/v1/users?or=(username.eq.${username},email.eq.${email})`,
        {
          headers: {
            'apikey': process.env.SUPABASE_KEY,
            'Authorization': `Bearer ${process.env.SUPABASE_KEY}`
          }
        }
      );

      if (checkResponse.ok) {
        const existing = await checkResponse.json();
        if (existing && existing.length > 0) {
          return res.status(400).json({ error: 'Username or email already exists' });
        }
      }

      // Create user in Supabase
      const createResponse = await fetch(`${process.env.SUPABASE_URL}/rest/v1/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': process.env.SUPABASE_KEY,
          'Authorization': `Bearer ${process.env.SUPABASE_KEY}`
        },
        body: JSON.stringify({
          username,
          email: email.toLowerCase(),
          password_hash: hashPassword(password), // In production, use proper hashing
          preferences: {
            colors: {
              lightSquare: '#f0d9b5',
              darkSquare: '#b58863',
              whitePiece: '#ffffff',
              blackPiece: '#000000',
              boardContainer: '#ffffff'
            },
            pieceSet: 'unicode',
            backgroundTheme: 'rainy'
          },
          created_at: new Date().toISOString()
        })
      });

      if (createResponse.ok) {
        const user = await createResponse.json();
        return res.status(201).json({
          success: true,
          user: {
            username: user.username,
            email: user.email,
            preferences: user.preferences
          }
        });
      } else {
        const error = await createResponse.json();
        return res.status(400).json({ error: error.message || 'Failed to create user' });
      }
    } else {
      // Fallback: return success but note that database isn't configured
      return res.status(201).json({
        success: true,
        message: 'User created (localStorage mode - database not configured)',
        user: { username, email }
      });
    }
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}

function hashPassword(password) {
  // Simple hash - in production, use bcrypt or similar
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString();
}
