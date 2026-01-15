// List all available game rooms
const games = getGamesStorage();

export default function handler(req, res) {
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
    // List all available rooms (host connected, guest not connected)
    const availableRooms = Array.from(games.entries())
      .filter(([code, game]) => game.hostConnected && !game.guestConnected)
      .map(([code, game]) => ({
        roomCode: code,
        host: game.host,
        createdAt: game.createdAt
      }));
    
    return res.status(200).json({ rooms: availableRooms });
  } catch (error) {
    console.error('List rooms error:', error);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}

function getGamesStorage() {
  if (!global.gamesStorage) {
    global.gamesStorage = new Map();
  }
  return global.gamesStorage;
}
