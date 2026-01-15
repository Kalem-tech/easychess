// List all available game rooms - Using Vercel KV for persistence
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const availableRooms = [];
    
    try {
      // Get all room keys from Vercel KV
      const keys = await kv.keys('chess_room:*');
      
      // Fetch all rooms
      for (const key of keys) {
        try {
          const data = await kv.get(key);
          if (data) {
            const game = typeof data === 'string' ? JSON.parse(data) : data;
            if (game.hostConnected && !game.guestConnected) {
              availableRooms.push({
                roomCode: game.roomCode,
                host: game.host,
                createdAt: game.createdAt
              });
            }
          }
        } catch (e) {
          console.error(`Error fetching room ${key}:`, e);
        }
      }
    } catch (kvError) {
      console.log('KV list failed, using fallback:', kvError);
      // Fallback to in-memory
      if (global.gamesStorage) {
        const rooms = Array.from(global.gamesStorage.entries())
          .filter(([code, game]) => game.hostConnected && !game.guestConnected)
          .map(([code, game]) => ({
            roomCode: code,
            host: game.host,
            createdAt: game.createdAt
          }));
        availableRooms.push(...rooms);
      }
    }
    
    return res.status(200).json({ rooms: availableRooms });
  } catch (error) {
    console.error('List rooms error:', error);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}
