// Create a new game room - Using Vercel KV for persistence
import { kv } from '@vercel/kv';

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
    let roomCode;
    let attempts = 0;
    do {
      roomCode = generateRoomCode();
      const exists = await kv.exists(`chess_room:${roomCode}`);
      if (!exists) break;
      attempts++;
      if (attempts > 10) {
        return res.status(500).json({ error: 'Failed to generate unique room code' });
      }
    } while (true);
    
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

    // Store in Vercel KV
    try {
      await kv.set(`chess_room:${roomCode}`, JSON.stringify(game), { ex: 86400 }); // Expire after 24 hours
    } catch (kvError) {
      console.error('KV storage error:', kvError);
      // Fallback to in-memory if KV not configured
      if (!global.gamesStorage) {
        global.gamesStorage = new Map();
      }
      global.gamesStorage.set(roomCode, game);
    }
    
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
