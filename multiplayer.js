/**
 * PEER-TO-PEER MULTIPLAYER CHESS
 * Uses PeerJS for direct browser-to-browser communication
 * No server required!
 */

const MP = {
    peer: null,
    connection: null,
    roomCode: null,
    myColor: null,
    isHost: false,
    gameStarted: false,
    opponentConnected: false,
    connectionTimeout: null
};

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', () => {
    const wait = setInterval(() => {
        if (window.chessGame) {
            clearInterval(wait);
            setup();
        }
    }, 100);
});

function setup() {
    document.getElementById('create-room-btn')?.addEventListener('click', createRoom);
    document.getElementById('join-room-btn')?.addEventListener('click', joinRoom);
    document.getElementById('leave-room-btn')?.addEventListener('click', leaveRoom);
    document.getElementById('copy-room-code-btn')?.addEventListener('click', copyCode);
    document.getElementById('copy-invite-link-btn')?.addEventListener('click', copyInvite);
    document.getElementById('list-rooms-btn')?.addEventListener('click', () => {
        showMsg('P2P mode - ask your friend for their room code!');
    });
    
    // Check URL for invite
    const params = new URLSearchParams(window.location.search);
    if (params.get('join')) {
        document.getElementById('room-code-input').value = params.get('join');
        window.history.replaceState({}, '', window.location.pathname);
    }
    
    // Expose for chess.js
    window.chessGame.multiplayer = {
        get roomCode() { return MP.roomCode; },
        get playerColor() { return MP.myColor; },
        get isHost() { return MP.isHost; },
        onMoveMade: sendMove,
        markReady: () => {},
        saveGameState: () => {}
    };
    
    console.log('✅ P2P Multiplayer ready');
}

// ========== GENERATE ROOM CODE ==========
function generateRoomCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

// ========== CREATE ROOM (HOST) ==========
function createRoom() {
    // Clean up any existing connection
    if (MP.peer) {
        MP.peer.destroy();
    }
    
    const name = document.getElementById('white-player-name')?.value || 'Player 1';
    const chosenColor = document.getElementById('create-color-select')?.value || 'white';
    
    showMsg('Creating room...');
    
    const roomCode = generateRoomCode();
    console.log('🎮 Creating room:', roomCode);
    
    try {
        // Create peer with room code as ID
        MP.peer = new Peer('chess-' + roomCode, {
            debug: 2,
            config: {
                iceServers: [
                    { urls: 'stun:stun.l.google.com:19302' },
                    { urls: 'stun:stun1.l.google.com:19302' }
                ]
            }
        });
        
        MP.peer.on('open', (id) => {
            console.log('✅ Host peer created:', id);
            MP.roomCode = roomCode;
            MP.myColor = chosenColor;
            MP.isHost = true;
            MP.gameStarted = false;
            
            if (chosenColor === 'black') {
                flipBoard();
            }
            
            updateUI();
            showMsg('Room created! Waiting for opponent...');
            
            alert(`Room Created!\n\nRoom Code: ${roomCode}\n\nYou are playing as ${chosenColor.toUpperCase()}\n\nShare this code with your friend!`);
        });
        
        MP.peer.on('connection', (conn) => {
            console.log('✅ Incoming connection from:', conn.peer);
            MP.connection = conn;
            
            conn.on('open', () => {
                console.log('✅ Connection opened with guest');
                MP.opponentConnected = true;
                showMsg('Opponent connected!');
                updateUI();
            });
            
            conn.on('data', (data) => {
                console.log('📩 Host received:', data.type);
                handleMessage(data);
            });
            
            conn.on('close', () => {
                console.log('⚠️ Guest disconnected');
                MP.opponentConnected = false;
                showMsg('Opponent disconnected!');
                updateUI();
            });
            
            conn.on('error', (err) => {
                console.error('Connection error:', err);
            });
        });
        
        MP.peer.on('error', (err) => {
            console.error('❌ Peer error:', err.type, err);
            if (err.type === 'unavailable-id') {
                MP.peer.destroy();
                showMsg('Room code taken, trying another...');
                setTimeout(createRoom, 500);
            } else {
                showMsg('Error: ' + err.type);
            }
        });
        
        MP.peer.on('disconnected', () => {
            console.log('⚠️ Disconnected from signaling server');
            showMsg('Reconnecting...');
            MP.peer.reconnect();
        });
        
    } catch (err) {
        console.error('Create room error:', err);
        alert('Failed to create room: ' + err.message);
    }
}

// ========== JOIN ROOM ==========
function joinRoom() {
    // Clean up any existing connection
    if (MP.peer) {
        MP.peer.destroy();
    }
    
    const code = document.getElementById('room-code-input')?.value?.trim().toUpperCase();
    const name = document.getElementById('black-player-name')?.value || 'Player 2';
    
    if (!code) {
        alert('Please enter a room code');
        return;
    }
    
    if (code.length !== 6) {
        alert('Room code must be 6 characters');
        return;
    }
    
    showMsg('Connecting to room ' + code + '...');
    console.log('🎮 Joining room:', code);
    
    try {
        // Create our peer (with random ID)
        MP.peer = new Peer({
            debug: 2,
            config: {
                iceServers: [
                    { urls: 'stun:stun.l.google.com:19302' },
                    { urls: 'stun:stun1.l.google.com:19302' }
                ]
            }
        });
        
        MP.peer.on('open', (myId) => {
            console.log('✅ Guest peer created:', myId);
            console.log('🔗 Connecting to host: chess-' + code);
            
            // Set connection timeout
            MP.connectionTimeout = setTimeout(() => {
                console.log('⏰ Connection timeout');
                alert('Connection timed out.\n\nMake sure:\n1. The room code is correct\n2. The host has the room open\n3. Both players have internet');
                cleanup();
            }, 15000);
            
            // Connect to the host
            const conn = MP.peer.connect('chess-' + code, {
                reliable: true,
                serialization: 'json',
                metadata: { playerName: name }
            });
            
            MP.connection = conn;
            
            conn.on('open', () => {
                console.log('✅ Connected to host!');
                clearTimeout(MP.connectionTimeout);
                
                MP.roomCode = code;
                MP.isHost = false;
                MP.opponentConnected = true;
                
                showMsg('Connected! Waiting for game info...');
                
                // Send join request
                conn.send({ type: 'join', playerName: name });
            });
            
            conn.on('data', (data) => {
                console.log('📩 Guest received:', data.type);
                handleMessage(data);
            });
            
            conn.on('close', () => {
                console.log('⚠️ Disconnected from host');
                clearTimeout(MP.connectionTimeout);
                MP.opponentConnected = false;
                showMsg('Disconnected from host!');
                updateUI();
            });
            
            conn.on('error', (err) => {
                console.error('Connection error:', err);
                clearTimeout(MP.connectionTimeout);
                showMsg('Connection error');
            });
        });
        
        MP.peer.on('error', (err) => {
            console.error('❌ Peer error:', err.type, err);
            clearTimeout(MP.connectionTimeout);
            
            if (err.type === 'peer-unavailable') {
                alert('Room "' + code + '" not found!\n\nMake sure:\n1. The room code is correct\n2. Your friend has created the room\n3. The host browser is still open');
            } else {
                alert('Connection error: ' + err.type);
            }
            cleanup();
        });
        
        MP.peer.on('disconnected', () => {
            console.log('⚠️ Disconnected from signaling server');
        });
        
    } catch (err) {
        console.error('Join room error:', err);
        alert('Failed to join room: ' + err.message);
    }
}

// ========== HANDLE MESSAGES ==========
function handleMessage(data) {
    console.log('📨 Received message:', data.type, '| isHost:', MP.isHost, '| myColor:', MP.myColor);
    
    switch (data.type) {
        case 'join':
            handlePlayerJoined(data);
            break;
        case 'welcome':
            handleWelcome(data);
            break;
        case 'ready':
            handleJoinerReady();
            break;
        case 'move':
            handleOpponentMove(data);
            break;
        case 'gameStart':
            console.log('🎮 Received gameStart message!');
            startGame();
            break;
        case 'sync':
            applyState(data.gameState);
            break;
        case 'resign':
            handleResign();
            break;
        case 'drawOffer':
            handleDrawOffer();
            break;
        default:
            console.log('Unknown message type:', data.type);
    }
}

// ========== HOST: PLAYER JOINED ==========
function handlePlayerJoined(data) {
    console.log('👋 Player joined:', data.playerName);
    MP.opponentConnected = true;
    
    const opponentColor = MP.myColor === 'white' ? 'black' : 'white';
    
    // Send welcome message
    if (MP.connection && MP.connection.open) {
        MP.connection.send({
            type: 'welcome',
            yourColor: opponentColor,
            hostColor: MP.myColor
        });
        console.log('📤 Sent welcome, assigned color:', opponentColor);
    }
    
    updateUI();
    showMsg('Opponent joined! Waiting for ready...');
}

// ========== HOST: JOINER IS READY ==========
function handleJoinerReady() {
    console.log('✅ Joiner is ready!');
    showMsg('Starting game...');
    
    // Start game on host
    startGame();
    
    // Send gameStart to guest with a small delay to ensure it's received
    setTimeout(() => {
        if (MP.connection && MP.connection.open) {
            console.log('📤 Sending gameStart to guest');
            MP.connection.send({ type: 'gameStart' });
            
            // Send it again after a short delay for reliability
            setTimeout(() => {
                if (MP.connection && MP.connection.open) {
                    MP.connection.send({ type: 'gameStart' });
                }
            }, 500);
        }
    }, 100);
}

// ========== GUEST: RECEIVED WELCOME ==========
function handleWelcome(data) {
    console.log('🎮 Received welcome, my color:', data.yourColor);
    MP.myColor = data.yourColor;
    MP.opponentConnected = true;
    
    if (MP.myColor === 'black') {
        flipBoard();
    }
    
    updateUI();
    showMsg('You are ' + MP.myColor.toUpperCase() + '! Game starting...');
    
    // Send ready FIRST (before showing alert which blocks)
    if (MP.connection && MP.connection.open) {
        console.log('📤 Sending ready to host');
        MP.connection.send({ type: 'ready' });
    }
    
    // Use setTimeout to show alert without blocking message handling
    setTimeout(() => {
        alert('Joined game!\n\nYou are playing as ' + MP.myColor.toUpperCase() + '\n\nGame is starting!');
    }, 100);
}

// ========== START GAME ==========
function startGame() {
    console.log('🎮 startGame called - already started:', MP.gameStarted, 'color:', MP.myColor);
    
    if (MP.gameStarted) {
        console.log('Game already started, skipping');
        return;
    }
    
    if (!MP.myColor) {
        console.error('Cannot start: color not set, waiting...');
        // Retry after a short delay
        setTimeout(() => {
            if (MP.myColor && !MP.gameStarted) {
                startGame();
            }
        }, 500);
        return;
    }
    
    console.log('🎮 STARTING GAME! Playing as:', MP.myColor);
    
    MP.gameStarted = true;
    window.chessGame.gameStarted = true;
    window.chessGame.currentPlayer = 'white';
    
    try {
        window.chessGame.applyTimerSettings();
        window.chessGame.startTimer('white');
    } catch (e) {
        console.warn('Timer error:', e);
    }
    
    const startBtn = document.getElementById('start-game-btn');
    if (startBtn) startBtn.style.display = 'none';
    
    if (MP.myColor === 'white') {
        showMsg('🎮 Game started! Your move.');
    } else {
        showMsg('🎮 Game started! Waiting for white...');
    }
    
    updateUI();
    console.log('✅ Game successfully started');
}

// ========== HANDLE OPPONENT MOVE ==========
function handleOpponentMove(data) {
    console.log('♟️ Opponent move received');
    applyState(data.gameState);
    
    if (!window.chessGame.gameOver) {
        showMsg('Your turn!');
    }
}

// ========== SEND MOVE ==========
function sendMove(fromRow, fromCol, toRow, toCol) {
    if (!MP.connection || !MP.connection.open) {
        console.warn('Cannot send move: no connection');
        return;
    }
    
    const game = window.chessGame;
    
    // Convert board to standard orientation if flipped
    let board = game.board;
    if (game.boardFlipped) {
        board = Array(8).fill(null).map(() => Array(8).fill(null));
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = game.board[row][col];
                if (piece) {
                    board[7 - row][7 - col] = { ...piece };
                }
            }
        }
    }
    
    const gameState = {
        board: board,
        currentPlayer: game.currentPlayer,
        moveHistory: game.moveHistory,
        capturedPieces: game.capturedPieces,
        gameOver: game.gameOver,
        winner: game.winner,
        gameStarted: true
    };
    
    MP.connection.send({
        type: 'move',
        gameState: gameState
    });
    
    console.log('📤 Move sent');
    showMsg('Waiting for opponent...');
}

// ========== APPLY GAME STATE ==========
function applyState(state) {
    if (!state || !state.board) return;
    
    const game = window.chessGame;
    
    // Rotate board if we're black (viewing flipped)
    if (game.boardFlipped) {
        game.board = Array(8).fill(null).map(() => Array(8).fill(null));
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = state.board[row][col];
                if (piece) {
                    game.board[7 - row][7 - col] = { ...piece };
                }
            }
        }
    } else {
        game.board = state.board.map(row => row.map(p => p ? {...p} : null));
    }
    
    game.currentPlayer = state.currentPlayer;
    game.moveHistory = state.moveHistory || [];
    game.capturedPieces = state.capturedPieces || { white: [], black: [] };
    game.gameOver = state.gameOver || false;
    game.winner = state.winner || null;
    game.gameStarted = true;
    
    game.renderBoard();
    game.updateGameInfo();
    game.updateMoveHistory();
    game.updateCapturedPieces();
    
    if (!game.gameOver) {
        game.startTimer(state.currentPlayer);
    }
    
    console.log('✅ State applied, current player:', game.currentPlayer);
}

// ========== FLIP BOARD ==========
function flipBoard() {
    if (!window.chessGame.boardFlipped) {
        window.chessGame.swapBoardPieces();
        window.chessGame.boardFlipped = true;
        window.chessGame.renderBoard();
    }
}

// ========== LEAVE ROOM ==========
function leaveRoom() {
    cleanup();
    
    if (window.chessGame.boardFlipped) {
        window.chessGame.swapBoardPieces();
        window.chessGame.boardFlipped = false;
    }
    
    window.chessGame.resetGame();
    updateUI();
    showMsg('Left room');
}

function cleanup() {
    clearTimeout(MP.connectionTimeout);
    
    if (MP.connection) {
        MP.connection.close();
    }
    if (MP.peer) {
        MP.peer.destroy();
    }
    
    MP.peer = null;
    MP.connection = null;
    MP.roomCode = null;
    MP.myColor = null;
    MP.isHost = false;
    MP.gameStarted = false;
    MP.opponentConnected = false;
}

// ========== HANDLE RESIGN ==========
function handleResign() {
    const game = window.chessGame;
    game.gameOver = true;
    game.winner = MP.myColor;
    showMsg('Opponent resigned! You win!');
    game.updateGameInfo();
    game.updateReviewButtonVisibility();
}

// ========== HANDLE DRAW OFFER ==========
function handleDrawOffer() {
    if (confirm('Opponent offers a draw. Accept?')) {
        const game = window.chessGame;
        game.gameOver = true;
        game.winner = 'draw';
        showMsg('Game drawn');
        game.updateGameInfo();
        game.updateReviewButtonVisibility();
        
        if (MP.connection?.open) {
            MP.connection.send({ type: 'drawAccepted' });
        }
    }
}

// ========== UI ==========
function updateUI() {
    const roomInfo = document.getElementById('room-info');
    const createBtn = document.getElementById('create-room-btn');
    const joinSection = document.querySelector('.join-room-section');
    const startBtn = document.getElementById('start-game-btn');
    const colorSelectSection = document.querySelector('.color-select-section');
    
    if (MP.roomCode) {
        roomInfo.style.display = 'block';
        createBtn.style.display = 'none';
        joinSection.style.display = 'none';
        startBtn.style.display = 'none';
        if (colorSelectSection) colorSelectSection.style.display = 'none';
        
        document.getElementById('room-code-display').textContent = MP.roomCode;
        
        const whiteText = MP.myColor === 'white' ? 'You' : (MP.opponentConnected ? 'Opponent' : 'Waiting...');
        const blackText = MP.myColor === 'black' ? 'You' : (MP.opponentConnected ? 'Opponent' : 'Waiting...');
        document.getElementById('white-player-display').textContent = whiteText;
        document.getElementById('black-player-display').textContent = blackText;
        
        updateProfiles();
    } else {
        roomInfo.style.display = 'none';
        createBtn.style.display = 'block';
        joinSection.style.display = 'flex';
        startBtn.style.display = 'block';
        if (colorSelectSection) colorSelectSection.style.display = 'block';
    }
}

function showMsg(text) {
    const el = document.getElementById('game-status');
    if (el) {
        el.textContent = text;
        el.style.color = '#667eea';
    }
    console.log('💬', text);
}

function updateProfiles() {
    const whiteName = document.getElementById('white-profile-name');
    const blackName = document.getElementById('black-profile-name');
    
    if (MP.roomCode && MP.myColor) {
        if (whiteName) whiteName.textContent = MP.myColor === 'white' ? 'You' : 'Opponent';
        if (blackName) blackName.textContent = MP.myColor === 'black' ? 'You' : 'Opponent';
    } else {
        if (whiteName) whiteName.textContent = 'Player 1';
        if (blackName) blackName.textContent = 'Player 2';
    }
}

function copyCode() {
    if (MP.roomCode) {
        navigator.clipboard.writeText(MP.roomCode);
        showMsg('Code copied!');
    }
}

function copyInvite() {
    if (MP.roomCode) {
        const link = window.location.origin + window.location.pathname + '?join=' + MP.roomCode;
        navigator.clipboard.writeText(link);
        showMsg('Invite link copied!');
    }
}

// ========== EXPOSE FOR UI ==========
window.multiplayerResign = function() {
    if (MP.connection?.open) {
        MP.connection.send({ type: 'resign' });
        const game = window.chessGame;
        game.gameOver = true;
        game.winner = MP.myColor === 'white' ? 'black' : 'white';
        showMsg('You resigned');
        game.updateGameInfo();
        game.updateReviewButtonVisibility();
    }
};

window.multiplayerOfferDraw = function() {
    if (MP.connection?.open) {
        MP.connection.send({ type: 'drawOffer' });
        showMsg('Draw offer sent');
    }
};
