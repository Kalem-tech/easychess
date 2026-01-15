// Join an existing game room
const games = getGamesStorage();

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

    const game = games.get(roomCode);
    if (!game) {
      return res.status(404).json({ error: 'Room not found' });
    }

    if (game.guestConnected) {
      return res.status(400).json({ error: 'Room is full' });
    }

    game.guest = guest;
    game.guestConnected = true;
    game.guestLastSeen = Date.now();
    games.set(roomCode, game);

    return res.status(200).json({
      roomCode,
      message: 'Successfully joined room'
    });
  } catch (error) {
    console.error('Join room error:', error);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}

function getGamesStorage() {
  if (!global.gamesStorage) {
    global.gamesStorage = new Map();
  }
  return global.gamesStorage;
}
