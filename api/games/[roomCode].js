// Get, update, or delete a specific game room
const games = getGamesStorage();

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { roomCode } = req.query;

  if (!roomCode) {
    return res.status(400).json({ error: 'Room code required' });
  }

  try {
    switch (req.method) {
      case 'GET':
        return handleGet(req, res, roomCode);
      case 'PUT':
        return handlePut(req, res, roomCode);
      case 'DELETE':
        return handleDelete(req, res, roomCode);
      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}

function handleGet(req, res, roomCode) {
  const game = games.get(roomCode);
  if (!game) {
    return res.status(404).json({ error: 'Room not found' });
  }
  
  // Return game state
  return res.status(200).json({
    roomCode,
    host: game.host,
    guest: game.guest,
    hostConnected: game.hostConnected,
    guestConnected: game.guestConnected,
    gameState: game.gameState,
    lastMove: game.lastMove,
    createdAt: game.createdAt
  });
}

function handlePut(req, res, roomCode) {
  const game = games.get(roomCode);
  if (!game) {
    return res.status(404).json({ error: 'Room not found' });
  }

  const { gameState, lastMove, playerColor, action } = req.body;

  if (action === 'update-state') {
    game.gameState = gameState;
    game.lastMove = lastMove;
    game.lastUpdate = Date.now();
  } else if (action === 'heartbeat') {
    // Update connection status
    if (playerColor === 'white') {
      game.hostConnected = true;
      game.hostLastSeen = Date.now();
    } else if (playerColor === 'black') {
      game.guestConnected = true;
      game.guestLastSeen = Date.now();
    }
  }
  
  games.set(roomCode, game);
  
  return res.status(200).json({ message: 'Game state updated' });
}

function handleDelete(req, res, roomCode) {
  const game = games.get(roomCode);
  if (!game) {
    return res.status(404).json({ error: 'Room not found' });
  }

  games.delete(roomCode);
  return res.status(200).json({ message: 'Room deleted' });
}

function getGamesStorage() {
  if (!global.gamesStorage) {
    global.gamesStorage = new Map();
  }
  return global.gamesStorage;
}
