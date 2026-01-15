// User login API endpoint
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
    const { usernameOrEmail, password } = body;

    if (!usernameOrEmail || !password) {
      return res.status(400).json({ error: 'Username/email and password required' });
    }

    // Use Supabase if configured
    if (process.env.SUPABASE_URL && process.env.SUPABASE_KEY) {
      const hashedPassword = hashPassword(password);
      
      // Try to find user by username or email
      const response = await fetch(
        `${process.env.SUPABASE_URL}/rest/v1/users?or=(username.eq.${usernameOrEmail},email.eq.${usernameOrEmail.toLowerCase()})`,
        {
          headers: {
            'apikey': process.env.SUPABASE_KEY,
            'Authorization': `Bearer ${process.env.SUPABASE_KEY}`
          }
        }
      );

      if (response.ok) {
        const users = await response.json();
        if (users && users.length > 0) {
          const user = users[0];
          if (user.password_hash === hashedPassword) {
            return res.status(200).json({
              success: true,
              user: {
                username: user.username,
                email: user.email,
                preferences: user.preferences || {}
              }
            });
          } else {
            return res.status(401).json({ error: 'Invalid password' });
          }
        } else {
          return res.status(404).json({ error: 'User not found' });
        }
      } else {
        return res.status(500).json({ error: 'Database error' });
      }
    } else {
      // Fallback: return error indicating database not configured
      return res.status(503).json({ 
        error: 'Database not configured. Please set up Supabase.',
        fallback: true
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}

function hashPassword(password) {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString();
}
