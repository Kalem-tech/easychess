// Multiplayer system for online chess - Now using API backend
class MultiplayerManager {
    constructor(chessGame) {
        this.chessGame = chessGame;
        this.roomCode = null;
        this.isHost = false;
        this.playerColor = null; // 'white' or 'black'
        this.opponentName = null;
        this.myName = null;
        this.syncInterval = null;
        this.heartbeatInterval = null;
        this._lastAppliedMove = null;
        this._disconnectShown = false;
        this.apiBase = this.getApiBase();
        this.init();
    }

    getApiBase() {
        // Get the base URL for API calls
        // Works for both localhost and Vercel deployment
        const origin = window.location.origin;
        return `${origin}/api/games`;
    }

    init() {
        this.setupEventListeners();
        this.loadRoomState();
    }

    setupEventListeners() {
        const createBtn = document.getElementById('create-room-btn');
        const joinBtn = document.getElementById('join-room-btn');
        const leaveBtn = document.getElementById('leave-room-btn');
        const copyBtn = document.getElementById('copy-room-code-btn');
        const whiteNameInput = document.getElementById('white-player-name');
        const blackNameInput = document.getElementById('black-player-name');
        
        if (!createBtn || !joinBtn || !leaveBtn || !copyBtn || !whiteNameInput || !blackNameInput) {
            console.error('MultiplayerManager: Some DOM elements not found. Retrying in 100ms...');
            setTimeout(() => this.setupEventListeners(), 100);
            return;
        }
        
        createBtn.addEventListener('click', () => {
            console.log('Create room button clicked');
            this.createRoom();
        });
        
        joinBtn.addEventListener('click', () => this.joinRoom());
        leaveBtn.addEventListener('click', () => this.leaveRoom());
        copyBtn.addEventListener('click', () => this.copyRoomCode());
        
        const listRoomsBtn = document.getElementById('list-rooms-btn');
        if (listRoomsBtn) {
            listRoomsBtn.addEventListener('click', () => this.listAvailableRooms());
        }
        
        // Update player names when changed
        whiteNameInput.addEventListener('input', (e) => {
            this.updatePlayerName('white', e.target.value);
        });
        blackNameInput.addEventListener('input', (e) => {
            this.updatePlayerName('black', e.target.value);
        });
    }

    async createRoom() {
        console.log('createRoom called');
        try {
            const whiteNameEl = document.getElementById('white-player-name');
            const blackNameEl = document.getElementById('black-player-name');
            
            if (!whiteNameEl || !blackNameEl) {
                console.error('Player name inputs not found');
                alert('Error: Player name inputs not found. Please refresh the page.');
                return;
            }
            
            const whiteName = whiteNameEl.value.trim();
            const blackName = blackNameEl.value.trim();
            
            console.log('White name:', whiteName, 'Black name:', blackName);
            
            if (!whiteName || !blackName) {
                alert('Please enter names for both players');
                return;
            }

            // Generate room code locally first
            const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
            
            // Try to create room via API, but fallback to localStorage if it fails
            const apiUrl = `${this.apiBase}/create`;
            console.log('Creating room at:', apiUrl);
            
            let apiSuccess = false;
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        host: whiteName,
                        guest: blackName
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    // Use server-generated room code if available
                    if (data.roomCode) {
                        this.roomCode = data.roomCode;
                        apiSuccess = true;
                        console.log('Room created on server with code:', this.roomCode);
                    }
                } else {
                    console.warn('API returned error, using localStorage fallback');
                }
            } catch (error) {
                console.warn('API call failed, using localStorage-only mode:', error);
                // Continue with localStorage fallback
            }

            // If API failed, use localStorage-only mode
            if (!apiSuccess) {
                this.roomCode = roomCode;
                console.log('Room created locally with code:', this.roomCode);
                alert(`⚠️ Note: API is not available. Room created in LOCAL MODE.\n\n📋 ROOM CODE: ${this.roomCode}\n\n⚠️ IMPORTANT: This room only works in the SAME browser.\n\nFor cross-browser multiplayer, the API needs to be working.`);
            } else {
                alert(`✅ Room Created Successfully!\n\n📋 ROOM CODE: ${this.roomCode}\n\n✅ Share this code with your opponent to play across different devices!\n\nThey can join from any browser or device.`);
            }
            
            this.isHost = true;
            this.playerColor = 'white'; // Host plays white
            this.myName = whiteName;
            this.opponentName = blackName;

            // Save to localStorage for persistence (primary source of truth)
            localStorage.setItem('chess_current_room', this.roomCode);
            localStorage.setItem('chess_player_color', 'white');
            
            // Save complete room data locally
            const localRoomData = {
                roomCode: this.roomCode,
                host: whiteName,
                guest: blackName,
                hostConnected: true,
                guestConnected: false,
                gameState: null,
                lastMove: null,
                createdAt: Date.now(),
                apiEnabled: apiSuccess // Track if API is working
            };
            localStorage.setItem(`chess_room_${this.roomCode}`, JSON.stringify(localRoomData));
            
            // Cache it for immediate use
            this._cachedRoomData = localRoomData;
            
            // Update UI without fetching (we already have the data)
            this.updateUIWithoutFetch();
            this.startSyncing();
            this.showMessage(`Room created! Code: ${this.roomCode}`, 'success');
        } catch (error) {
            console.error('Error creating room:', error);
            alert(`An error occurred while creating the room: ${error.message}`);
        }
    }

    async joinRoom() {
        try {
            const roomCodeInput = document.getElementById('room-code-input');
            if (!roomCodeInput) {
                console.error('Room code input not found');
                alert('Error: Room code input not found. Please refresh the page.');
                return;
            }

            const roomCode = roomCodeInput.value.trim().toUpperCase();
            console.log('Attempting to join room with code:', roomCode);
            
            if (!roomCode || roomCode.length !== 6) {
                alert('Please enter a valid 6-character room code');
                return;
            }

            const blackName = document.getElementById('black-player-name').value.trim();
            if (!blackName) {
                alert('Please enter your name');
                return;
            }

            // Join room via API
            const response = await fetch(`${this.apiBase}/join`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    roomCode,
                    guest: blackName
                })
            });

            if (!response.ok) {
                const error = await response.json();
                if (response.status === 404) {
                    alert(`Room "${roomCode}" not found. Please check the room code and try again.`);
                } else if (response.status === 400 && error.error === 'Room is full') {
                    alert('Room is full. This room already has two players.');
                } else {
                    alert(`Error joining room: ${error.error || 'Unknown error'}`);
                }
                return;
            }

            const data = await response.json();
            console.log('Successfully joined room:', data);

            // If already in a room, leave it first
            if (this.roomCode && this.roomCode !== roomCode) {
                console.log('Leaving existing room before joining new one');
                await this.leaveRoom();
            }

            this.roomCode = roomCode;
            this.isHost = false;
            this.playerColor = 'black'; // Guest plays black
            this.myName = blackName;

            // Get room data to set opponent name
            const roomData = await this.fetchRoomData(roomCode);
            if (roomData) {
                this.opponentName = roomData.host;
            }

            // Save to localStorage
            localStorage.setItem('chess_current_room', this.roomCode);
            localStorage.setItem('chess_player_color', 'black');

            this.updateUI();
            this.startSyncing();
            this.showMessage('Successfully joined room!', 'success');
        } catch (error) {
            console.error('Error joining room:', error);
            alert(`An error occurred while joining the room: ${error.message}`);
        }
    }

    async leaveRoom() {
        if (this.roomCode) {
            try {
                // Send heartbeat to mark as disconnected
                await fetch(`${this.apiBase}/${this.roomCode}?action=heartbeat`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        playerColor: this.playerColor,
                        action: 'heartbeat'
                    })
                });
            } catch (error) {
                console.error('Error updating disconnect status:', error);
            }
        }

        this.stopSyncing();
        this.roomCode = null;
        this.isHost = false;
        this.playerColor = null;
        this.opponentName = null;
        this.myName = null;

        localStorage.removeItem('chess_current_room');
        localStorage.removeItem('chess_player_color');

        this.updateUI();
        this.showMessage('Left room', 'info');
    }

    async fetchRoomData(roomCode) {
        if (!roomCode) return null;
        
        // First try to get from localStorage (more reliable)
        const localData = localStorage.getItem(`chess_room_${roomCode}`);
        if (localData) {
            try {
                const parsed = JSON.parse(localData);
                // Also try to sync with server, but don't fail if it doesn't work
                this.syncWithServer(roomCode, parsed).catch(err => {
                    console.log('Server sync failed, using local data:', err);
                });
                return parsed;
            } catch (e) {
                console.error('Error parsing local room data:', e);
            }
        }
        
        // Fallback to server
        try {
            const response = await fetch(`${this.apiBase}/${roomCode}`);
            if (!response.ok) {
                return null;
            }
            const serverData = await response.json();
            // Save server data to localStorage
            localStorage.setItem(`chess_room_${roomCode}`, JSON.stringify(serverData));
            return serverData;
        } catch (error) {
            console.error('Error fetching room data from server:', error);
            return null;
        }
    }
    
    async syncWithServer(roomCode, localData) {
        // Try to ensure server has the room data
        try {
            const response = await fetch(`${this.apiBase}/${roomCode}`);
            if (!response.ok && response.status === 404) {
                // Room doesn't exist on server, try to recreate it
                await fetch(`${this.apiBase}/create`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        host: localData.host,
                        guest: localData.guest
                    })
                });
            }
        } catch (error) {
            // Ignore errors - we'll use local data
            console.log('Server sync error (non-critical):', error);
        }
    }

    updateUIWithoutFetch() {
        const roomInfo = document.getElementById('room-info');
        const createBtn = document.getElementById('create-room-btn');
        const joinSection = document.querySelector('.join-room-section');
        const whitePlayerDisplay = document.getElementById('white-player-display');
        const blackPlayerDisplay = document.getElementById('black-player-display');
        const roomCodeDisplay = document.getElementById('room-code-display');

        if (!roomInfo || !createBtn || !joinSection) {
            console.error('updateUIWithoutFetch: Some DOM elements not found');
            return;
        }

        if (this.roomCode) {
            roomInfo.style.display = 'block';
            createBtn.style.display = 'none';
            joinSection.style.display = 'none';
            
            if (roomCodeDisplay) {
                roomCodeDisplay.textContent = this.roomCode;
                roomCodeDisplay.style.fontSize = '1.5rem';
                roomCodeDisplay.style.fontWeight = 'bold';
                roomCodeDisplay.style.color = '#667eea';
                roomCodeDisplay.style.letterSpacing = '3px';
            }
            if (whitePlayerDisplay) whitePlayerDisplay.textContent = this.myName || 'Waiting...';
            if (blackPlayerDisplay) blackPlayerDisplay.textContent = this.opponentName || 'Waiting...';
        } else {
            roomInfo.style.display = 'none';
            createBtn.style.display = 'block';
            joinSection.style.display = 'flex';
        }
    }

    async updateUI() {
        const roomInfo = document.getElementById('room-info');
        const createBtn = document.getElementById('create-room-btn');
        const joinSection = document.querySelector('.join-room-section');
        const whitePlayerDisplay = document.getElementById('white-player-display');
        const blackPlayerDisplay = document.getElementById('black-player-display');
        const roomCodeDisplay = document.getElementById('room-code-display');

        if (!roomInfo || !createBtn || !joinSection) {
            console.error('updateUI: Some DOM elements not found');
            return;
        }

        if (this.roomCode) {
            roomInfo.style.display = 'block';
            createBtn.style.display = 'none';
            joinSection.style.display = 'none';
            
            const roomData = await this.fetchRoomData(this.roomCode);
            if (roomData) {
                if (roomCodeDisplay) {
                    roomCodeDisplay.textContent = this.roomCode;
                    roomCodeDisplay.style.fontSize = '1.5rem';
                    roomCodeDisplay.style.fontWeight = 'bold';
                    roomCodeDisplay.style.color = '#667eea';
                    roomCodeDisplay.style.letterSpacing = '3px';
                }
                if (whitePlayerDisplay) whitePlayerDisplay.textContent = roomData.host || 'Waiting...';
                if (blackPlayerDisplay) blackPlayerDisplay.textContent = roomData.guest || 'Waiting...';
            } else {
                // Fallback to local data if fetch fails
                if (whitePlayerDisplay) whitePlayerDisplay.textContent = this.myName || 'Waiting...';
                if (blackPlayerDisplay) blackPlayerDisplay.textContent = this.opponentName || 'Waiting...';
            }
        } else {
            roomInfo.style.display = 'none';
            createBtn.style.display = 'block';
            joinSection.style.display = 'flex';
        }
    }

    // For backward compatibility with chess.js
    // Note: This returns a promise, but chess.js might call it synchronously
    // We'll cache the room data and return it synchronously when available
    _cachedRoomData = null;

    getRoomData(roomCode) {
        // Return cached data if available, otherwise return null
        // The sync will update the cache
        if (this._cachedRoomData && (!roomCode || this._cachedRoomData.roomCode === roomCode)) {
            return this._cachedRoomData;
        }
        return null;
    }

    startSyncing() {
        // Sync game state every 500ms
        this.syncInterval = setInterval(() => {
            this.syncGameState();
        }, 500);

        // Send heartbeat every 5 seconds to keep connection alive
        this.heartbeatInterval = setInterval(() => {
            this.sendHeartbeat();
        }, 5000);
    }

    stopSyncing() {
        if (this.syncInterval) {
            clearInterval(this.syncInterval);
            this.syncInterval = null;
        }
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval);
            this.heartbeatInterval = null;
        }
    }

    async sendHeartbeat() {
        if (!this.roomCode || !this.playerColor) return;

        try {
            await fetch(`${this.apiBase}/${this.roomCode}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    playerColor: this.playerColor,
                    action: 'heartbeat'
                })
            });
        } catch (error) {
            console.error('Heartbeat error:', error);
        }
    }

    async syncGameState() {
        if (!this.roomCode) return;

        try {
            const roomData = await this.fetchRoomData(this.roomCode);
            if (!roomData) {
                // Don't immediately leave - retry a few times first
                // This handles cases where the server might have cold-started
                if (!this._retryCount) {
                    this._retryCount = 0;
                }
                this._retryCount++;
                
                if (this._retryCount < 5) {
                    // Retry - might be a temporary server issue
                    console.log(`Room not found, retrying... (${this._retryCount}/5)`);
                    return;
                }
                
                // After 5 retries, check if we just created the room
                // If so, try to recreate it or use local storage
                if (this._retryCount === 5) {
                    console.warn('Room not found after retries. This might be a server cold start issue.');
                    this.showMessage('Connection issue - room may have been lost. Please recreate the room.', 'warning');
                    // Don't auto-leave, let user decide
                    return;
                }
                
                // Only leave after many failed attempts
                if (this._retryCount >= 10) {
                    this.showMessage('Room not found. Leaving...', 'warning');
                    setTimeout(() => this.leaveRoom(), 2000);
                    return;
                }
                return;
            }
            
            // Reset retry count on success
            this._retryCount = 0;

            // Cache room data for synchronous access
            this._cachedRoomData = roomData;

            // Check if opponent disconnected
            if (this.isHost && !roomData.guestConnected) {
                if (!this._disconnectShown) {
                    this.showMessage('Waiting for opponent to join...', 'info');
                    this._disconnectShown = true;
                }
            } else if (!this.isHost && !roomData.hostConnected) {
                if (!this._disconnectShown) {
                    this.showMessage('Host disconnected', 'warning');
                    this._disconnectShown = true;
                }
            } else {
                this._disconnectShown = false;
            }

            // If it's not my turn, check for opponent's move
            if (roomData.lastMove && roomData.lastMove.player !== this.playerColor) {
                // Check if we've already applied this move
                const lastMoveKey = `${roomData.lastMove.fromRow}-${roomData.lastMove.fromCol}-${roomData.lastMove.toRow}-${roomData.lastMove.toCol}`;
                if (this._lastAppliedMove !== lastMoveKey) {
                    // Apply opponent's move
                    if (roomData.gameState) {
                        this.applyGameState(roomData.gameState);
                        this._lastAppliedMove = lastMoveKey;
                    }
                }
            }

            // Update my game state
            await this.saveGameState();
        } catch (error) {
            console.error('Sync error:', error);
        }
    }

    async saveGameState() {
        if (!this.roomCode) return;

        try {
            const gameState = {
                board: this.chessGame.board,
                currentPlayer: this.chessGame.currentPlayer,
                moveHistory: this.chessGame.moveHistory,
                capturedPieces: this.chessGame.capturedPieces,
                gameOver: this.chessGame.gameOver,
                inCheck: this.chessGame.inCheck,
                timers: this.chessGame.timers,
                gameStarted: this.chessGame.gameStarted
            };

            const lastMove = this.chessGame.lastMove || null;

            // Update localStorage first (primary storage)
            const localData = this._cachedRoomData || {};
            localData.gameState = gameState;
            localData.lastMove = lastMove;
            localStorage.setItem(`chess_room_${this.roomCode}`, JSON.stringify(localData));
            this._cachedRoomData = localData;

            // Also try to sync with server (best effort)
            fetch(`${this.apiBase}/${this.roomCode}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    gameState,
                    lastMove,
                    playerColor: this.playerColor,
                    action: 'update-state'
                })
            }).catch(error => {
                console.log('Server sync failed (using local storage):', error);
            });
        } catch (error) {
            console.error('Error saving game state:', error);
        }
    }

    // Synchronous version for backward compatibility
    saveGameStateSync() {
        // Just trigger async save
        this.saveGameState();
    }

    applyGameState(gameState) {
        if (!gameState) return;
        
        // Deep clone the board to avoid reference issues
        const currentBoardStr = JSON.stringify(this.chessGame.board);
        const newBoardStr = JSON.stringify(gameState.board);
        
        // Only apply if it's different from current state
        if (currentBoardStr === newBoardStr) {
            return; // No changes
        }

        // Deep clone the board
        this.chessGame.board = gameState.board.map(row => 
            row.map(piece => piece ? { ...piece } : null)
        );
        
        this.chessGame.currentPlayer = gameState.currentPlayer;
        this.chessGame.moveHistory = [...(gameState.moveHistory || [])];
        this.chessGame.capturedPieces = {
            white: [...(gameState.capturedPieces?.white || [])],
            black: [...(gameState.capturedPieces?.black || [])]
        };
        this.chessGame.gameOver = gameState.gameOver || false;
        this.chessGame.inCheck = { ...(gameState.inCheck || { white: false, black: false }) };
        
        if (gameState.timers) {
            this.chessGame.timers = { ...gameState.timers };
        }
        
        if (gameState.gameStarted !== undefined) {
            this.chessGame.gameStarted = gameState.gameStarted;
        }

        this.chessGame.renderBoard();
        this.chessGame.updateGameInfo();
        this.chessGame.updateMoveHistory();
        this.chessGame.updateCapturedPieces();
        this.chessGame.updateTimerDisplay();
    }

    async onMoveMade(fromRow, fromCol, toRow, toCol) {
        if (!this.roomCode) return;

        // Store last move for saving
        this.chessGame.lastMove = {
            fromRow,
            fromCol,
            toRow,
            toCol,
            player: this.playerColor,
            timestamp: Date.now()
        };

        // Save immediately
        await this.saveGameState();
    }

    async updatePlayerName(color, name) {
        if (!this.roomCode) return;

        // Note: Player name updates would need a separate API endpoint
        // For now, we'll just update locally
        if (color === 'white' && this.isHost) {
            this.myName = name;
        } else if (color === 'black' && !this.isHost) {
            this.myName = name;
        }

        await this.updateUI();
    }

    async loadRoomState() {
        const savedRoom = localStorage.getItem('chess_current_room');
        const savedColor = localStorage.getItem('chess_player_color');

        if (savedRoom && savedColor) {
            const roomData = await this.fetchRoomData(savedRoom);
            if (roomData) {
                this.roomCode = savedRoom;
                this.playerColor = savedColor;
                this.isHost = savedColor === 'white';
                this.myName = this.isHost ? roomData.host : roomData.guest;
                this.opponentName = this.isHost ? roomData.guest : roomData.host;

                // Update input fields
                const whiteInput = document.getElementById('white-player-name');
                const blackInput = document.getElementById('black-player-name');
                if (whiteInput) whiteInput.value = roomData.host || '';
                if (blackInput) blackInput.value = roomData.guest || '';

                await this.updateUI();
                this.startSyncing();

                // Load game state if available
                if (roomData.gameState) {
                    this.applyGameState(roomData.gameState);
                }
            }
        }
    }

    copyRoomCode() {
        if (this.roomCode) {
            navigator.clipboard.writeText(this.roomCode).then(() => {
                this.showMessage('Room code copied!', 'success');
            });
        }
    }

    async listAvailableRooms() {
        try {
            const response = await fetch(`${this.apiBase}/list`);
            if (!response.ok) {
                throw new Error('Failed to fetch rooms');
            }

            const data = await response.json();
            const availableRooms = data.rooms || [];

            if (availableRooms.length === 0) {
                alert('No rooms found. Create a room first!');
                return;
            }

            let roomsList = `Available Rooms (${availableRooms.length}):\n\n`;
            availableRooms.forEach((room, index) => {
                roomsList += `${index + 1}. 🟢 JOINABLE\n`;
                roomsList += `   Room Code: ${room.roomCode}\n`;
                roomsList += `   Host: ${room.host}\n\n`;
            });

            // Find the first joinable room and offer to auto-fill
            const joinableRoom = availableRooms[0];
            if (joinableRoom) {
                roomsList += `\n💡 Room "${joinableRoom.roomCode}" is available to join!\n`;
                roomsList += `Would you like to join this room now?`;
                
                if (confirm(roomsList)) {
                    const roomCodeInput = document.getElementById('room-code-input');
                    if (roomCodeInput) {
                        roomCodeInput.value = joinableRoom.roomCode;
                        // Auto-join after a brief delay
                        setTimeout(() => {
                            this.joinRoom();
                        }, 100);
                    }
                }
            } else {
                alert(roomsList);
            }
        } catch (error) {
            console.error('Error listing rooms:', error);
            alert(`Error fetching rooms: ${error.message}`);
        }
    }

    showMessage(message, type) {
        const statusEl = document.getElementById('game-status');
        if (statusEl) {
            statusEl.textContent = message;
            statusEl.style.color = type === 'success' ? '#2e7d32' : type === 'warning' ? '#f57c00' : '#333';
            setTimeout(() => {
                if (statusEl.textContent === message) {
                    statusEl.textContent = '';
                }
            }, 3000);
        }
    }
}

// Export for use in chess.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MultiplayerManager;
}
