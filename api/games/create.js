// Create a new game room
const games = getGamesStorage();

export default function handler(req, res) {
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
    const { host, guest } = req.body;
    
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

    games.set(roomCode, game);
    
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
  let code;
  do {
    code = Math.random().toString(36).substring(2, 8).toUpperCase();
  } while (games.has(code));
  return code;
}

function getGamesStorage() {
  // In a serverless environment, we need to use a shared storage
  // For now, use a simple in-memory store (will reset on cold start)
  // In production, use Redis, MongoDB, or Vercel KV
  if (!global.gamesStorage) {
    global.gamesStorage = new Map();
  }
  return global.gamesStorage;
}
