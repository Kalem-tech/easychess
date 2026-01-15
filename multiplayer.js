// Multiplayer system for online chess
class MultiplayerManager {
    constructor(chessGame) {
        this.chessGame = chessGame;
        this.roomCode = null;
        this.isHost = false;
        this.playerColor = null; // 'white' or 'black'
        this.opponentName = null;
        this.myName = null;
        this.syncInterval = null;
        this._lastAppliedMove = null;
        this._disconnectShown = false;
        this.init();
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

    generateRoomCode() {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
    }

    createRoom() {
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

            this.roomCode = this.generateRoomCode();
            console.log('Generated room code:', this.roomCode);
            
            this.isHost = true;
            this.playerColor = 'white'; // Host plays white
            this.myName = whiteName;
            this.opponentName = blackName;

            const roomData = {
                roomCode: this.roomCode,
                host: whiteName,
                guest: blackName,
                gameState: null,
                lastMove: null,
                createdAt: Date.now(),
                hostConnected: true,
                guestConnected: false
            };

            // Save room data
            const roomKey = `chess_room_${this.roomCode}`;
            localStorage.setItem(roomKey, JSON.stringify(roomData));
            localStorage.setItem('chess_current_room', this.roomCode);
            localStorage.setItem('chess_player_color', 'white');

            // Verify it was saved
            const verifyData = localStorage.getItem(roomKey);
            console.log('Room data saved. Verification:', verifyData ? 'SUCCESS' : 'FAILED');
            console.log('Room key:', roomKey);
            console.log('Room code:', this.roomCode);
            console.log('Full room data:', roomData);
            
            // Show room code prominently
            alert(`✅ Room Created Successfully!\n\n📋 ROOM CODE: ${this.roomCode}\n\n⚠️ IMPORTANT: Share this code with your opponent.\n\nNote: Rooms only work in the SAME browser.\nIf your opponent is on a different device/browser, they won't be able to join.`);
            
            this.updateUI();
            this.startSyncing();
            this.showMessage(`Room created! Code: ${this.roomCode}`, 'success');
        } catch (error) {
            console.error('Error creating room:', error);
            alert('An error occurred while creating the room. Please try again.');
        }
    }

    joinRoom() {
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

            // Debug: List all rooms in localStorage
            console.log('Searching for room:', roomCode);
            const allKeys = Object.keys(localStorage);
            const roomKeys = allKeys.filter(key => key.startsWith('chess_room_'));
            console.log('All room keys in localStorage:', roomKeys);
            
            // Get all actual room codes and their data
            const availableRooms = [];
            roomKeys.forEach(key => {
                const roomCodeFromKey = key.replace('chess_room_', '');
                try {
                    const roomData = JSON.parse(localStorage.getItem(key));
                    availableRooms.push({
                        key: key,
                        code: roomCodeFromKey,
                        codeUpper: roomCodeFromKey.toUpperCase(),
                        host: roomData?.host || 'Unknown',
                        guestConnected: roomData?.guestConnected || false
                    });
                    console.log(`Found room: ${roomCodeFromKey} (host: ${roomData?.host || 'Unknown'})`);
                } catch (e) {
                    console.error(`Error parsing room ${key}:`, e);
                }
            });

            // Try exact match first
            let roomData = this.getRoomData(roomCode);
            console.log('Room data retrieved (exact match):', roomData);
            
            // If not found, try case-insensitive match
            if (!roomData) {
                const matchingRoom = availableRooms.find(r => r.codeUpper === roomCode);
                if (matchingRoom) {
                    console.log('Found case-insensitive match:', matchingRoom.code);
                    roomData = this.getRoomData(matchingRoom.code);
                    if (roomData) {
                        // Use the actual room code from storage
                        return this.joinRoomWithCode(matchingRoom.code, roomData);
                    }
                }
            }
            
            if (!roomData) {
                // Build a helpful error message with clickable options
                let errorMsg = `Room "${roomCode}" not found.\n\n`;
                errorMsg += `Found ${availableRooms.length} room(s) in system:\n\n`;
                
                const joinableRooms = availableRooms.filter(r => !r.guestConnected && r.hostConnected);
                
                availableRooms.forEach((room, index) => {
                    const status = room.isJoinable ? '🟢 JOINABLE' : room.guestConnected ? '🔴 FULL' : '🟡 WAITING';
                    errorMsg += `${index + 1}. ${status} - ${room.code}\n`;
                    errorMsg += `   Host: ${room.host}\n`;
                });
                
                if (joinableRooms.length > 0) {
                    errorMsg += `\n\n💡 Found ${joinableRooms.length} room(s) available to join!\n`;
                    errorMsg += `Would you like to join room "${joinableRooms[0].code}" (Host: ${joinableRooms[0].host})?`;
                    
                    const shouldJoin = confirm(errorMsg);
                    if (shouldJoin) {
                        const roomCodeInput = document.getElementById('room-code-input');
                        if (roomCodeInput) {
                            roomCodeInput.value = joinableRooms[0].code;
                            // Small delay to ensure input is updated, then retry join
                            setTimeout(() => {
                                this.joinRoom();
                            }, 100);
                            return;
                        }
                    }
                } else {
                    errorMsg += `\n\n⚠️ IMPORTANT: Rooms only work in the SAME browser.\n`;
                    errorMsg += `If you're on different devices/browsers, you need a server.\n\n`;
                    errorMsg += `Tip: Use "Show Available Rooms" button to see all rooms.`;
                    alert(errorMsg);
                }
                return;
            }

            if (roomData.guestConnected) {
                alert('Room is full. This room already has two players.');
                return;
            }

            return this.joinRoomWithCode(roomCode, roomData);
        } catch (error) {
            console.error('Error joining room:', error);
            alert('An error occurred while joining the room. Please try again.');
        }
    }

    joinRoomWithCode(roomCode, roomData) {
        const blackName = document.getElementById('black-player-name').value.trim();
        if (!blackName) {
            alert('Please enter your name');
            return;
        }

        // If already in a room, leave it first
        if (this.roomCode && this.roomCode !== roomCode) {
            console.log('Leaving existing room before joining new one');
            this.leaveRoom();
        }

        console.log('Joining room:', roomCode, 'as guest with name:', blackName);

        this.roomCode = roomCode;
        this.isHost = false;
        this.playerColor = 'black'; // Guest plays black
        this.myName = blackName;
        this.opponentName = roomData.host;

        roomData.guest = blackName;
        roomData.guestConnected = true;
        
        // Save room data
        const roomKey = `chess_room_${this.roomCode}`;
        localStorage.setItem(roomKey, JSON.stringify(roomData));
        localStorage.setItem('chess_current_room', this.roomCode);
        localStorage.setItem('chess_player_color', 'black');

        // Verify it was saved
        const verifyData = localStorage.getItem(roomKey);
        console.log('Room data saved. Verification:', verifyData ? 'SUCCESS' : 'FAILED');
        console.log('Successfully joined room. Room data saved.');

        this.updateUI();
        this.startSyncing();
        this.showMessage('Successfully joined room!', 'success');
    }

    leaveRoom() {
        if (this.roomCode) {
            const roomData = this.getRoomData(this.roomCode);
            if (roomData) {
                if (this.isHost) {
                    roomData.hostConnected = false;
                } else {
                    roomData.guestConnected = false;
                }
                localStorage.setItem(`chess_room_${this.roomCode}`, JSON.stringify(roomData));
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

    getRoomData(roomCode) {
        if (!roomCode) return null;
        
        // Ensure room code is uppercase for consistency
        const normalizedCode = roomCode.toUpperCase().trim();
        const key = `chess_room_${normalizedCode}`;
        const data = localStorage.getItem(key);
        
        if (data) {
            try {
                return JSON.parse(data);
            } catch (e) {
                console.error('Error parsing room data:', e);
                return null;
            }
        }
        
        return null;
    }

    updateUI() {
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
            
            const roomData = this.getRoomData(this.roomCode);
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
            }
        } else {
            roomInfo.style.display = 'none';
            createBtn.style.display = 'block';
            joinSection.style.display = 'flex';
        }
    }

    startSyncing() {
        // Sync every 500ms to check for updates
        this.syncInterval = setInterval(() => {
            this.syncGameState();
        }, 500);
    }

    stopSyncing() {
        if (this.syncInterval) {
            clearInterval(this.syncInterval);
            this.syncInterval = null;
        }
    }

    syncGameState() {
        if (!this.roomCode) return;

        const roomData = this.getRoomData(this.roomCode);
        if (!roomData) {
            this.leaveRoom();
            return;
        }

        // Check if opponent disconnected
        if (this.isHost && !roomData.guestConnected) {
            // Don't spam the message
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
        this.saveGameState();
    }

    saveGameState() {
        if (!this.roomCode) return;

        const roomData = this.getRoomData(this.roomCode);
        if (!roomData) return;

        roomData.gameState = {
            board: this.chessGame.board,
            currentPlayer: this.chessGame.currentPlayer,
            moveHistory: this.chessGame.moveHistory,
            capturedPieces: this.chessGame.capturedPieces,
            gameOver: this.chessGame.gameOver,
            inCheck: this.chessGame.inCheck,
            timers: this.chessGame.timers,
            gameStarted: this.chessGame.gameStarted
        };

        localStorage.setItem(`chess_room_${this.roomCode}`, JSON.stringify(roomData));
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

    onMoveMade(fromRow, fromCol, toRow, toCol) {
        if (!this.roomCode) return;

        const roomData = this.getRoomData(this.roomCode);
        if (!roomData) return;

        // Record the move
        roomData.lastMove = {
            fromRow,
            fromCol,
            toRow,
            toCol,
            player: this.playerColor,
            timestamp: Date.now()
        };

        this.saveGameState();
    }

    updatePlayerName(color, name) {
        if (!this.roomCode) return;

        const roomData = this.getRoomData(this.roomCode);
        if (!roomData) return;

        if (color === 'white') {
            if (this.isHost) {
                roomData.host = name;
                this.myName = name;
            } else {
                // Update display for opponent
            }
        } else {
            if (!this.isHost) {
                roomData.guest = name;
                this.myName = name;
            }
        }

        localStorage.setItem(`chess_room_${this.roomCode}`, JSON.stringify(roomData));
        this.updateUI();
    }

    loadRoomState() {
        const savedRoom = localStorage.getItem('chess_current_room');
        const savedColor = localStorage.getItem('chess_player_color');

        if (savedRoom && savedColor) {
            const roomData = this.getRoomData(savedRoom);
            if (roomData) {
                this.roomCode = savedRoom;
                this.playerColor = savedColor;
                this.isHost = savedColor === 'white';
                this.myName = this.isHost ? roomData.host : roomData.guest;
                this.opponentName = this.isHost ? roomData.guest : roomData.host;

                // Update input fields
                document.getElementById('white-player-name').value = roomData.host || '';
                document.getElementById('black-player-name').value = roomData.guest || '';

                this.updateUI();
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

    listAvailableRooms() {
        const allKeys = Object.keys(localStorage);
        const roomKeys = allKeys.filter(key => key.startsWith('chess_room_'));
        
        if (roomKeys.length === 0) {
            alert('No rooms found. Create a room first!\n\n⚠️ Note: Rooms only work in the SAME browser.');
            return;
        }
        
        const availableRooms = [];
        roomKeys.forEach(key => {
            const roomCodeFromKey = key.replace('chess_room_', '');
            try {
                const roomData = JSON.parse(localStorage.getItem(key));
                const isJoinable = !roomData?.guestConnected && roomData?.hostConnected;
                availableRooms.push({
                    code: roomCodeFromKey,
                    host: roomData?.host || 'Unknown',
                    guest: roomData?.guest || 'Not joined',
                    guestConnected: roomData?.guestConnected || false,
                    hostConnected: roomData?.hostConnected || false,
                    isJoinable: isJoinable
                });
            } catch (e) {
                console.error(`Error parsing room ${key}:`, e);
            }
        });
        
        // Sort: joinable rooms first
        availableRooms.sort((a, b) => {
            if (a.isJoinable && !b.isJoinable) return -1;
            if (!a.isJoinable && b.isJoinable) return 1;
            return 0;
        });
        
        let roomsList = `Available Rooms (${availableRooms.length}):\n\n`;
        availableRooms.forEach((room, index) => {
            const status = room.isJoinable ? '🟢 JOINABLE' : room.guestConnected ? '🔴 FULL' : '🟡 WAITING';
            roomsList += `${index + 1}. ${status}\n`;
            roomsList += `   Room Code: ${room.code}\n`;
            roomsList += `   Host: ${room.host}\n`;
            roomsList += `   Guest: ${room.guest}\n\n`;
        });
        
        // Find the first joinable room and offer to auto-fill
        const joinableRoom = availableRooms.find(r => r.isJoinable);
        if (joinableRoom) {
            roomsList += `\n💡 Room "${joinableRoom.code}" is available to join!\n`;
            roomsList += `Would you like to join this room now?`;
            
            if (confirm(roomsList)) {
                const roomCodeInput = document.getElementById('room-code-input');
                if (roomCodeInput) {
                    roomCodeInput.value = joinableRoom.code;
                    // Auto-join after a brief delay
                    setTimeout(() => {
                        this.joinRoom();
                    }, 100);
                }
            }
        } else {
            roomsList += '\n⚠️ IMPORTANT: Rooms only work in the SAME browser.\n';
            roomsList += 'If you\'re on different devices, you need a server.';
            alert(roomsList);
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
