// Get, update, or delete a specific game room - Using Vercel KV for persistence
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
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
        return await handleGet(req, res, roomCode);
      case 'PUT':
        return await handlePut(req, res, roomCode);
      case 'DELETE':
        return await handleDelete(req, res, roomCode);
      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}

async function handleGet(req, res, roomCode) {
  const game = await getRoom(roomCode);
  if (!game) {
    return res.status(404).json({ error: 'Room not found' });
  }
  
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

async function handlePut(req, res, roomCode) {
  const game = await getRoom(roomCode);
  if (!game) {
    return res.status(404).json({ error: 'Room not found' });
  }

  // Parse request body
  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  const { gameState, lastMove, playerColor, action } = body;

  if (action === 'update-state') {
    game.gameState = gameState;
    game.lastMove = lastMove;
    game.lastUpdate = Date.now();
  } else if (action === 'heartbeat') {
    if (playerColor === 'white') {
      game.hostConnected = true;
      game.hostLastSeen = Date.now();
    } else if (playerColor === 'black') {
      game.guestConnected = true;
      game.guestLastSeen = Date.now();
    }
  }
  
  await storeRoom(roomCode, game);
  
  return res.status(200).json({ message: 'Game state updated' });
}

async function handleDelete(req, res, roomCode) {
  await deleteRoom(roomCode);
  return res.status(200).json({ message: 'Room deleted' });
}

async function getRoom(roomCode) {
  try {
    const data = await kv.get(`chess_room:${roomCode}`);
    if (data) {
      return typeof data === 'string' ? JSON.parse(data) : data;
    }
  } catch (kvError) {
    console.log('KV get failed, using fallback:', kvError);
  }
  
  // Fallback to in-memory
  if (!global.gamesStorage) {
    global.gamesStorage = new Map();
  }
  return global.gamesStorage.get(roomCode) || null;
}

async function storeRoom(roomCode, game) {
  try {
    await kv.set(`chess_room:${roomCode}`, JSON.stringify(game), { ex: 86400 }); // Expire after 24 hours
  } catch (kvError) {
    console.log('KV set failed, using fallback:', kvError);
    // Fallback to in-memory
    if (!global.gamesStorage) {
      global.gamesStorage = new Map();
    }
    global.gamesStorage.set(roomCode, game);
  }
}

async function deleteRoom(roomCode) {
  try {
    await kv.del(`chess_room:${roomCode}`);
  } catch (kvError) {
    console.log('KV delete failed:', kvError);
    // Fallback to in-memory
    if (global.gamesStorage) {
      global.gamesStorage.delete(roomCode);
    }
  }
}
