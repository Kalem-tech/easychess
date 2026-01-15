// Join an existing game room - Using Supabase for persistence
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
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { roomCode, guest } = body;
    
    if (!roomCode) {
      return res.status(400).json({ error: 'Room code required' });
    }

    if (!guest) {
      return res.status(400).json({ error: 'Guest name required' });
    }

    const game = await getRoom(roomCode);
    if (!game) {
      return res.status(404).json({ error: 'Room not found' });
    }

    if (game.guestConnected) {
      return res.status(400).json({ error: 'Room is full' });
    }

    game.guest = guest;
    game.guestConnected = true;
    game.guestLastSeen = Date.now();
    await storeRoom(roomCode, game);

    return res.status(200).json({
      roomCode,
      message: 'Successfully joined room'
    });
  } catch (error) {
    console.error('Join room error:', error);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}

async function getRoom(roomCode) {
  // Try Supabase first
  if (process.env.SUPABASE_URL && process.env.SUPABASE_KEY) {
    try {
      const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/rooms?room_code=eq.${roomCode}`, {
        headers: {
          'apikey': process.env.SUPABASE_KEY,
          'Authorization': `Bearer ${process.env.SUPABASE_KEY}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          return data[0].data;
        }
      }
    } catch (e) {
      console.log('Supabase fetch failed, using fallback');
    }
  }
  
  // Fallback to in-memory
  if (!global.gamesStorage) {
    global.gamesStorage = new Map();
  }
  return global.gamesStorage.get(roomCode) || null;
}

async function storeRoom(roomCode, game) {
  // Try Supabase first
  if (process.env.SUPABASE_URL && process.env.SUPABASE_KEY) {
    try {
      const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/rooms?room_code=eq.${roomCode}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'apikey': process.env.SUPABASE_KEY,
          'Authorization': `Bearer ${process.env.SUPABASE_KEY}`
        },
        body: JSON.stringify({
          data: game,
          updated_at: new Date().toISOString()
        })
      });
      if (response.ok) return;
    } catch (e) {
      console.log('Supabase update failed');
    }
  }
  
  // Fallback to in-memory
  if (!global.gamesStorage) {
    global.gamesStorage = new Map();
  }
  global.gamesStorage.set(roomCode, game);
}
