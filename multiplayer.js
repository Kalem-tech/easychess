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
    connectionTimeout: null,
    whitePlayerName: '',
    blackPlayerName: ''
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
    
    document.getElementById('lobby-start-btn')?.addEventListener('click', onLobbyStartClick);
    document.getElementById('lobby-leave-btn')?.addEventListener('click', leaveRoom);
    
    // Expose for chess.js (connection getter so resign/move checks can see MP.connection)
    window.chessGame.multiplayer = {
        get roomCode() { return MP.roomCode; },
        get connection() { return MP.connection; },
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
// Optional onCreated(roomCode, inviteLink) - when provided, called instead of alert (e.g. for Friends "Invite to game")
function createRoom(onCreated) {
    // Clean up any existing connection
    if (MP.peer) {
        MP.peer.destroy();
    }
    
    const name = document.getElementById('white-player-name')?.value || 'Player 1';
    // Read host's chosen color from the "Play as" dropdown in the Create Room section
    const colorSelect = document.getElementById('create-color-select');
    const chosenColor = (colorSelect && colorSelect.value === 'black') ? 'black' : 'white';
    
    showMsg('Creating room...');
    
    const roomCode = generateRoomCode();
    console.log('🎮 Creating room:', roomCode, '| Host color:', chosenColor);
    
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
            
            // Sync chess game to host's chosen color: flip board and set player color
            if (window.chessGame) {
                window.chessGame.setPlayerColor(chosenColor);
                localStorage.setItem('playerColor', chosenColor);
                const boardColorSelect = document.getElementById('player-color-select');
                if (boardColorSelect) boardColorSelect.value = chosenColor;
            }
            if (chosenColor === 'black') {
                flipBoard();
            }
            
            updateUI();
            showMsg('Room created! Waiting for opponent...');
            
            const inviteLink = (window.location.origin || '') + (window.location.pathname || '/') + '?join=' + roomCode;
            if (typeof onCreated === 'function') {
                onCreated(roomCode, inviteLink);
            } else {
                alert(`Room Created!\n\nRoom Code: ${roomCode}\n\nYou are playing as ${chosenColor.toUpperCase()}\n\nShare this code with your friend!`);
            }
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
            hideLobby();
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
        case 'drawAccepted':
            handleDrawAccepted();
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
    const hostName = (MP.myColor === 'white')
        ? (document.getElementById('white-player-name')?.value?.trim() || 'Player 1')
        : (document.getElementById('black-player-name')?.value?.trim() || 'Player 2');
    const joinerName = (data.playerName && data.playerName.trim()) ? data.playerName.trim() : (opponentColor === 'white' ? 'Player 1' : 'Player 2');
    MP.whitePlayerName = MP.myColor === 'white' ? hostName : joinerName;
    MP.blackPlayerName = MP.myColor === 'black' ? hostName : joinerName;
    
    if (MP.connection && MP.connection.open) {
        MP.connection.send({
            type: 'welcome',
            yourColor: opponentColor,
            hostColor: MP.myColor,
            whitePlayerName: MP.whitePlayerName,
            blackPlayerName: MP.blackPlayerName
        });
        console.log('📤 Sent welcome, assigned color:', opponentColor);
    }
    
    updateUI();
    showLobby(true);
    showMsg('Opponent joined! Start when ready.');
}

// ========== HOST: JOINER IS READY ==========
function handleJoinerReady() {
    console.log('✅ Joiner is ready!');
    setLobbyMessage('Opponent is ready! Click Start when you\'re ready.');
}

// ========== GUEST: RECEIVED WELCOME ==========
function handleWelcome(data) {
    console.log('🎮 Received welcome, my color:', data.yourColor);
    MP.myColor = data.yourColor;
    MP.opponentConnected = true;
    if (data.whitePlayerName) MP.whitePlayerName = data.whitePlayerName;
    if (data.blackPlayerName) MP.blackPlayerName = data.blackPlayerName;
    
    if (window.chessGame) {
        window.chessGame.setPlayerColor(MP.myColor);
        localStorage.setItem('playerColor', MP.myColor);
        const boardColorSelect = document.getElementById('player-color-select');
        if (boardColorSelect) boardColorSelect.value = MP.myColor;
    }
    if (MP.myColor === 'black') {
        flipBoard();
    }
    
    updateUI();
    showMsg('You are ' + MP.myColor.toUpperCase() + '. Waiting for host to start.');
    showLobby(false);
    
    if (MP.connection && MP.connection.open) {
        MP.connection.send({ type: 'ready' });
    }
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
    
    hideLobby();
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
    
    hideLobby();
    window.chessGame.resetGame();
    updateUI();
    showMsg('Left room');
}

function cleanup() {
    clearTimeout(MP.connectionTimeout);
    hideLobby();
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
    MP.whitePlayerName = '';
    MP.blackPlayerName = '';
}

// ========== HANDLE RESIGN ==========
function handleResign() {
    const statusEl = document.getElementById('game-status');
    if (statusEl) {
        statusEl.textContent = 'Opponent resigned! You win!';
        statusEl.style.color = '#4CAF50';
        statusEl.style.fontWeight = 'bold';
    }
    const turnEl = document.getElementById('current-turn');
    if (turnEl) turnEl.textContent = 'Game Over – You win!';
    showMsg('Opponent resigned! You win!');

    const game = window.chessGame;
    if (game) {
        game.stopTimer();
        game.gameOver = true;
        game.winner = MP.myColor;
        game.updateGameInfo();
        game.updateReviewButtonVisibility();
    }
}

// ========== HANDLE DRAW OFFER ==========
function handleDrawOffer() {
    const game = window.chessGame;
    
    // Update draw button to show "Accept Draw"
    const drawBtn = document.getElementById('draw-btn');
    if (drawBtn) {
        drawBtn.textContent = 'Accept Draw';
        drawBtn.style.backgroundColor = '#28a745';
    }
    
    // Update game status
    const statusEl = document.getElementById('game-status');
    if (statusEl) {
        statusEl.textContent = 'Opponent offers a draw. Click "Accept Draw" to accept.';
        statusEl.style.color = '#ffc107';
        statusEl.style.fontWeight = 'bold';
    }
    
    // Set draw offer state
    game.drawOffer = game.currentPlayer === 'white' ? 'black' : 'white'; // Opponent offered
    
    showMsg('Opponent offers a draw');
}

// Handle draw accepted from opponent
function handleDrawAccepted() {
    const game = window.chessGame;
    game.stopTimer();
    game.gameOver = true;
    game.drawOffer = null;
    
    // Update game status
    const statusEl = document.getElementById('game-status');
    if (statusEl) {
        statusEl.textContent = 'Game ended in a draw!';
        statusEl.style.color = '#ffc107';
        statusEl.style.fontWeight = 'bold';
    }
    
    // Reset draw button
    const drawBtn = document.getElementById('draw-btn');
    if (drawBtn) {
        drawBtn.textContent = 'Draw';
        drawBtn.style.backgroundColor = '#ffc107';
    }
    
    game.updateGameInfo();
    game.updateReviewButtonVisibility();
    
    showMsg('Game ended in a draw!');
}

// ========== PRE-GAME LOBBY (VS SCREEN) ==========
function showLobby(isHost) {
    const el = document.getElementById('multiplayer-lobby');
    if (!el) return;
    const whiteName = document.getElementById('lobby-white-name');
    const blackName = document.getElementById('lobby-black-name');
    const msg = document.getElementById('lobby-message');
    const startBtn = document.getElementById('lobby-start-btn');
    const waitText = document.getElementById('lobby-waiting-text');
    if (whiteName) whiteName.textContent = MP.whitePlayerName || '—';
    if (blackName) blackName.textContent = MP.blackPlayerName || '—';
    if (msg) msg.textContent = isHost ? 'Opponent joined. Click Start when you\'re ready.' : 'Match ready. Waiting for host to start.';
    if (startBtn) startBtn.style.display = isHost ? 'inline-block' : 'none';
    if (waitText) waitText.style.display = isHost ? 'none' : 'inline';
    el.style.display = 'flex';
}

function hideLobby() {
    const el = document.getElementById('multiplayer-lobby');
    if (el) el.style.display = 'none';
}

function setLobbyMessage(text) {
    const msg = document.getElementById('lobby-message');
    if (msg) msg.textContent = text;
}

function onLobbyStartClick() {
    if (!MP.isHost || MP.gameStarted || !MP.connection || !MP.connection.open) return;
    startGame();
    MP.connection.send({ type: 'gameStart' });
    setTimeout(() => {
        if (MP.connection && MP.connection.open) MP.connection.send({ type: 'gameStart' });
    }, 300);
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
        const w = (MP.whitePlayerName && MP.whitePlayerName.trim()) ? MP.whitePlayerName.trim() : null;
        const b = (MP.blackPlayerName && MP.blackPlayerName.trim()) ? MP.blackPlayerName.trim() : null;
        if (whiteName) whiteName.textContent = w || (MP.myColor === 'white' ? 'You' : 'Opponent');
        if (blackName) blackName.textContent = b || (MP.myColor === 'black' ? 'You' : 'Opponent');
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
    if (!MP.connection || !MP.connection.open) return;
    var payload = { type: 'resign' };
    MP.connection.send(payload);
    // Send again after a short delay so opponent is more likely to receive it
    setTimeout(function() {
        if (MP.connection && MP.connection.open) MP.connection.send(payload);
    }, 150);
    var game = window.chessGame;
    if (game) {
        game.stopTimer();
        game.gameOver = true;
        game.winner = MP.myColor === 'white' ? 'black' : 'white';
    }
    var statusEl = document.getElementById('game-status');
    if (statusEl) {
        statusEl.textContent = 'You resigned. Opponent wins!';
        statusEl.style.color = '#666';
        statusEl.style.fontWeight = 'bold';
    }
    var turnEl = document.getElementById('current-turn');
    if (turnEl) turnEl.textContent = 'Game Over – You resigned';
    if (game) {
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
