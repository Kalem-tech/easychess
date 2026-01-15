// Create a new game room - Using Supabase for persistence
export default async function handler(req, res) {
  // Enable CORS
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
    // Parse request body
    let body;
    if (typeof req.body === 'string') {
      try {
        body = JSON.parse(req.body);
      } catch (e) {
        return res.status(400).json({ error: 'Invalid JSON in request body' });
      }
    } else {
      body = req.body || {};
    }
    
    const { host, guest } = body;
    
    if (!host || !guest) {
      return res.status(400).json({ error: 'Host and guest names required' });
    }

    // Generate room code
    const roomCode = generateRoomCode();
    
    const game = {
      roomCode,
      host,
      guest,
      hostConnected: true,
      guestConnected: false,
      gameState: null,
      lastMove: null,
      createdAt: Date.now()
    };

    // Store in database (Supabase) or fallback to in-memory
    await storeRoom(roomCode, game);
    
    return res.status(201).json({
      roomCode,
      message: 'Room created successfully'
    });
  } catch (error) {
    console.error('Create room error:', error);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}

function generateRoomCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

async function storeRoom(roomCode, game) {
  // Try Supabase first if configured
  if (process.env.SUPABASE_URL && process.env.SUPABASE_KEY) {
    try {
      const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/rooms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': process.env.SUPABASE_KEY,
          'Authorization': `Bearer ${process.env.SUPABASE_KEY}`
        },
        body: JSON.stringify({
          room_code: roomCode,
          data: game,
          created_at: new Date().toISOString()
        })
      });
      if (response.ok) return;
    } catch (e) {
      console.log('Supabase storage failed, using fallback');
    }
  }
  
  // Fallback to in-memory (will be lost on cold start)
  if (!global.gamesStorage) {
    global.gamesStorage = new Map();
  }
  global.gamesStorage.set(roomCode, game);
}
