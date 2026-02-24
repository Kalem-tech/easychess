/* Cross-browser: NodeList.forEach in older Safari/IE */
if (typeof NodeList !== 'undefined' && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

// Chess piece sets - different visual styles (Copyright-safe themes only)
const PIECE_SETS = {
    // === CLASSIC STYLES ===
    unicode: {
        name: 'Unicode Symbols',
        white: {
            king: '♔',
            queen: '♕',
            rook: '♖',
            bishop: '♗',
            knight: '♘',
            pawn: '♙'
        },
        black: {
            king: '♚',
            queen: '♛',
            rook: '♜',
            bishop: '♝',
            knight: '♞',
            pawn: '♟'
        }
    },
    letters: {
        name: 'Letter Notation',
        white: { king: 'K', queen: 'Q', rook: 'R', bishop: 'B', knight: 'N', pawn: 'P' },
        black: { king: 'k', queen: 'q', rook: 'r', bishop: 'b', knight: 'n', pawn: 'p' }
    },
    simple: {
        name: 'Simple Shapes',
        white: { king: '◉', queen: '◈', rook: '▣', bishop: '◊', knight: '△', pawn: '○' },
        black: { king: '●', queen: '◆', rook: '■', bishop: '♦', knight: '▲', pawn: '●' }
    },
    emoji: {
        name: 'Emoji',
        white: { king: '👑', queen: '👸', rook: '🏰', bishop: '⛪', knight: '🐎', pawn: '⚪' },
        black: { king: '🤴', queen: '🧛', rook: '🏚️', bishop: '🕍', knight: '🐴', pawn: '⚫' }
    },
    bold: {
        name: 'Bold Unicode',
        white: { king: '𝐊', queen: '𝐐', rook: '𝐑', bishop: '𝐁', knight: '𝐍', pawn: '𝐏' },
        black: { king: '𝐤', queen: '𝐪', rook: '𝐫', bishop: '𝐛', knight: '𝐧', pawn: '𝐩' }
    },
    circles: {
        name: 'Circle Symbols',
        white: { king: '⊛', queen: '⊚', rook: '⊡', bishop: '⊘', knight: '⊖', pawn: '○' },
        black: { king: '⊕', queen: '⊗', rook: '⊞', bishop: '⊜', knight: '⊝', pawn: '●' }
    },
    squares: {
        name: 'Square Symbols',
        white: { king: '▢', queen: '◇', rook: '▣', bishop: '◈', knight: '△', pawn: '□' },
        black: { king: '▪', queen: '◆', rook: '■', bishop: '◆', knight: '▲', pawn: '▪' }
    },
    // === MUSIC & SPORTS ===
    rock: {
        name: 'Rock Music',
        white: { king: '🎸', queen: '🎤', rook: '🔊', bishop: '🎹', knight: '🥁', pawn: '🎵' },
        black: { king: '🎷', queen: '🎙️', rook: '📢', bishop: '🎺', knight: '🪘', pawn: '🎶' }
    },
    hipHop: {
        name: 'Hip Hop',
        white: { king: '👑', queen: '💎', rook: '🏠', bishop: '🎧', knight: '💿', pawn: '🔥' },
        black: { king: '🤴', queen: '💠', rook: '🏚️', bishop: '🎵', knight: '📀', pawn: '⭐' }
    },
    football: {
        name: 'Football',
        white: { king: '🏆', queen: '🏅', rook: '🥅', bishop: '🏃', knight: '⚽', pawn: '🦵' },
        black: { king: '🥇', queen: '🎖️', rook: '🏟️', bishop: '🧍', knight: '🏈', pawn: '👟' }
    },
    basketball: {
        name: 'Basketball',
        white: { king: '🏆', queen: '🏅', rook: '🏀', bishop: '👟', knight: '🦾', pawn: '⭐' },
        black: { king: '🥇', queen: '🎖️', rook: '🏐', bishop: '🏃', knight: '🎯', pawn: '🌟' }
    },
    // === FOOD & LIFESTYLE ===
    pizza: {
        name: 'Pizza',
        white: { king: '🍕', queen: '🍔', rook: '🍟', bishop: '🌭', knight: '🥤', pawn: '🧀' },
        black: { king: '🍔', queen: '🌮', rook: '🍿', bishop: '🥗', knight: '🍺', pawn: '🍅' }
    },
    coffee: {
        name: 'Coffee',
        white: { king: '☕', queen: '🍵', rook: '🥐', bishop: '🍩', knight: '🧁', pawn: '🍪' },
        black: { king: '🫖', queen: '🥛', rook: '🧇', bishop: '🍪', knight: '🍩', pawn: '🍫' }
    },
    // === NATURE & SPACE ===
    ocean: {
        name: 'Ocean Life',
        white: { king: '🐋', queen: '🐬', rook: '🦈', bishop: '🐙', knight: '🦑', pawn: '🐟' },
        black: { king: '🐳', queen: '🦭', rook: '🐟', bishop: '🦀', knight: '🦞', pawn: '🐠' }
    },
    forest: {
        name: 'Forest',
        white: { king: '🦁', queen: '🦊', rook: '🐻', bishop: '🦌', knight: '🐺', pawn: '🐿️' },
        black: { king: '🐯', queen: '🐺', rook: '🦡', bishop: '🐗', knight: '🦉', pawn: '🦔' }
    },
    space: {
        name: 'Space',
        white: { king: '🌟', queen: '🌙', rook: '🚀', bishop: '🛸', knight: '☄️', pawn: '⭐' },
        black: { king: '🪐', queen: '🌑', rook: '🛰️', bishop: '🔭', knight: '💥', pawn: '💫' }
    },
    // === HOLIDAYS ===
    christmas: {
        name: 'Christmas',
        white: { king: '🎅', queen: '🤶', rook: '🎄', bishop: '⛄', knight: '🦌', pawn: '🎁' },
        black: { king: '🎄', queen: '🧣', rook: '🏠', bishop: '🎿', knight: '🛷', pawn: '❄️' }
    },
    halloween: {
        name: 'Halloween',
        white: { king: '👻', queen: '🧙', rook: '🏚️', bishop: '🦇', knight: '🐈‍⬛', pawn: '🎃' },
        black: { king: '🧛', queen: '🧟', rook: '🪦', bishop: '🕷️', knight: '🐺', pawn: '💀' }
    },
    valentines: {
        name: "Valentine's Day",
        white: { king: '💖', queen: '💕', rook: '🏩', bishop: '💐', knight: '🥰', pawn: '❤️' },
        black: { king: '💜', queen: '💔', rook: '💒', bishop: '🌹', knight: '💌', pawn: '💗' }
    },
    easter: {
        name: 'Easter',
        white: { king: '🐰', queen: '🐣', rook: '🥚', bishop: '🌷', knight: '🦋', pawn: '🥕' },
        black: { king: '🐣', queen: '🐤', rook: '🪺', bishop: '🌼', knight: '🐛', pawn: '🌸' }
    },
    // === STYLE ===
    retro: {
        name: 'Retro 80s',
        white: { king: '📼', queen: '📺', rook: '📻', bishop: '🕹️', knight: '🛹', pawn: '💾' },
        black: { king: '📠', queen: '📱', rook: '💽', bishop: '🎮', knight: '🎸', pawn: '📟' }
    },
    cyberpunk: {
        name: 'Cyberpunk',
        white: { king: '🤖', queen: '👾', rook: '🏙️', bishop: '💻', knight: '🦾', pawn: '⚡' },
        black: { king: '👽', queen: '🛸', rook: '🌃', bishop: '📱', knight: '🔧', pawn: '🔌' }
    },
    rainbow: {
        name: 'Rainbow',
        white: { king: '🌈', queen: '🦄', rook: '☁️', bishop: '🌸', knight: '🦋', pawn: '⭐' },
        black: { king: '🌑', queen: '🌧️', rook: '⛈️', bishop: '🍀', knight: '🐸', pawn: '✨' }
    },
    neon: {
        name: 'Neon',
        white: { king: '💜', queen: '💙', rook: '💚', bishop: '💛', knight: '🧡', pawn: '❤️' },
        black: { king: '🟣', queen: '🔵', rook: '🟢', bishop: '🟡', knight: '🟠', pawn: '🔴' }
    },
    // === MORE CLASSIC / PROFESSIONAL ===
    italic: {
        name: 'Italic Letters',
        white: { king: '\uD835\uDC0E', queen: '\uD835\uDC10', rook: '\uD835\uDC11', bishop: '\uD835\uDC03', knight: '\uD835\uDC0D', pawn: '\uD835\uDC0B' },
        black: { king: '\uD835\uDC22', queen: '\uD835\uDC2C', rook: '\uD835\uDC2F', bishop: '\uD835\uDC21', knight: '\uD835\uDC2B', pawn: '\uD835\uDC2D' }
    },
    outline: {
        name: 'Outline Shapes',
        white: { king: '⬚', queen: '◇', rook: '□', bishop: '△', knight: '▷', pawn: '◦' },
        black: { king: '▪', queen: '◆', rook: '■', bishop: '▲', knight: '▶', pawn: '•' }
    },
    minimal: {
        name: 'Minimal',
        white: { king: '◉', queen: '◎', rook: '▣', bishop: '◊', knight: '△', pawn: '◦' },
        black: { king: '●', queen: '◆', rook: '■', bishop: '♦', knight: '▲', pawn: '•' }
    },
    serif: {
        name: 'Sans Serif',
        white: { king: '𝖪', queen: '𝖰', rook: '𝖱', bishop: '𝖡', knight: '𝖭', pawn: '𝖯' },
        black: { king: '𝗄', queen: '𝗊', rook: '𝗋', bishop: '𝖻', knight: '𝗇', pawn: '𝗉' }
    },
    // === ANIMALS ===
    dinosaurs: {
        name: 'Dinosaurs',
        white: { king: '🦖', queen: '🦕', rook: '🦴', bishop: '🥚', knight: '🌿', pawn: '🍃' },
        black: { king: '🦕', queen: '🦖', rook: '🦎', bishop: '🐊', knight: '🐢', pawn: '🪨' }
    },
    cats: {
        name: 'Cats',
        white: { king: '🦁', queen: '🐱', rook: '🐈', bishop: '😺', knight: '🐈‍⬛', pawn: '🐾' },
        black: { king: '🐯', queen: '🐅', rook: '🏠', bishop: '😸', knight: '🐆', pawn: '🧶' }
    },
    birds: {
        name: 'Birds',
        white: { king: '🦅', queen: '🦆', rook: '🦉', bishop: '🦩', knight: '🐦', pawn: '🥚' },
        black: { king: '🦃', queen: '🐔', rook: '🦤', bishop: '🐧', knight: '🦜', pawn: '🐤' }
    },
    // === THEMES (non-seasonal) ===
    medieval: {
        name: 'Medieval',
        white: { king: '👑', queen: '👸', rook: '🏰', bishop: '⛪', knight: '🐎', pawn: '⚔️' },
        black: { king: '🤴', queen: '🧝', rook: '🏚️', bishop: '🕍', knight: '🐴', pawn: '🛡️' }
    },
    tech: {
        name: 'Tech',
        white: { king: '💻', queen: '📱', rook: '🖥️', bishop: '⌨️', knight: '🔌', pawn: '⚡' },
        black: { king: '📟', queen: '📠', rook: '🖨️', bishop: '💾', knight: '🔧', pawn: '🎛️' }
    },
    fantasy: {
        name: 'Fantasy',
        white: { king: '🐉', queen: '🦄', rook: '🧙', bishop: '🗡️', knight: '🏰', pawn: '⚔️' },
        black: { king: '👹', queen: '🧌', rook: '🧛', bishop: '🔮', knight: '🏚️', pawn: '💀' }
    },
    travel: {
        name: 'Travel',
        white: { king: '✈️', queen: '🗺️', rook: '🏖️', bishop: '🏔️', knight: '🏕️', pawn: '🎒' },
        black: { king: '🚂', queen: '🌍', rook: '🏜️', bishop: '🗻', knight: '⛺', pawn: '🧳' }
    },
    art: {
        name: 'Art & Design',
        white: { king: '🎨', queen: '🖌️', rook: '🖼️', bishop: '✏️', knight: '🎭', pawn: '🖍️' },
        black: { king: '🖊️', queen: '📐', rook: '🎪', bishop: '🖋️', knight: '🎬', pawn: '✒️' }
    },
    science: {
        name: 'Science',
        white: { king: '🔬', queen: '🧪', rook: '⚗️', bishop: '🧬', knight: '🔭', pawn: '📡' },
        black: { king: '🧫', queen: '🌡️', rook: '🛸', bishop: '⚛️', knight: '📐', pawn: '🔬' }
    }
};

// Default piece set
let currentPieceSet = 'unicode';

// Background themes with 50 cool designs
const BACKGROUND_THEMES = {
    rainy: {
        name: 'Rainy Storm',
        style: 'linear-gradient(to bottom, #2c3e50 0%, #34495e 30%, #4a5568 60%, #2d3748 100%)',
        animation: 'stormySky 20s ease-in-out infinite alternate'
    },
    ocean: {
        name: 'Ocean Waves',
        style: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #20b2aa 100%)'
    },
    forest: {
        name: 'Forest Green',
        style: 'linear-gradient(to bottom, #134e5e 0%, #71b280 50%, #134e5e 100%)'
    },
    sunset: {
        name: 'Sunset Sky',
        style: 'linear-gradient(to bottom, #ff6b6b 0%, #ffa500 30%, #ffd700 60%, #ff6347 100%)'
    },
    aurora: {
        name: 'Aurora Borealis',
        style: 'linear-gradient(135deg, #0f2027 0%, #203a43 25%, #2c5364 50%, #0f2027 75%, #0f2027 100%)',
        animation: 'aurora 15s ease infinite'
    },
    mountain: {
        name: 'Mountain Peak',
        style: 'linear-gradient(to bottom, #87ceeb 0%, #b0c4de 30%, #778899 60%, #2f4f4f 100%)'
    },
    desert: {
        name: 'Desert Dunes',
        style: 'linear-gradient(135deg, #f4a460 0%, #daa520 50%, #cd853f 100%)'
    },
    tropical: {
        name: 'Tropical Paradise',
        style: 'linear-gradient(135deg, #00c9ff 0%, #92fe9d 50%, #00c9ff 100%)'
    },
    space: {
        name: 'Deep Space',
        style: 'radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 50%, #0f0f1e 100%)'
    },
    nebula: {
        name: 'Cosmic Nebula',
        style: 'radial-gradient(ellipse at top, #667eea 0%, #764ba2 30%, #2c3e50 70%, #0f0f1e 100%)'
    },
    galaxy: {
        name: 'Milky Way',
        style: 'radial-gradient(ellipse at center, #1e3c72 0%, #2a5298 30%, #1e3c72 60%, #0f0f1e 100%)'
    },
    mars: {
        name: 'Mars Surface',
        style: 'linear-gradient(135deg, #8b4513 0%, #cd5c5c 50%, #8b4513 100%)'
    },
    jupiter: {
        name: 'Jupiter Storm',
        style: 'linear-gradient(135deg, #d2691e 0%, #ff8c00 25%, #ffa500 50%, #ff8c00 75%, #d2691e 100%)',
        animation: 'jupiter 10s ease infinite'
    },
    gradient1: {
        name: 'Purple Dream',
        style: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    gradient2: {
        name: 'Blue Ocean',
        style: 'linear-gradient(135deg, #20b2aa 0%, #008080 100%)'
    },
    gradient3: {
        name: 'Sunset Fire',
        style: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    gradient4: {
        name: 'Emerald Green',
        style: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'
    },
    gradient5: {
        name: 'Rose Gold',
        style: 'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)'
    },
    neon: {
        name: 'Neon Nights',
        style: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)'
    },
    cyberpunk: {
        name: 'Cyberpunk City',
        style: 'linear-gradient(to bottom, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #533483 100%)'
    },
    matrix: {
        name: 'Matrix Code',
        style: 'linear-gradient(to bottom, #000000 0%, #003300 50%, #000000 100%)'
    },
    dark1: {
        name: 'Midnight Blue',
        style: 'linear-gradient(to bottom, #0c0c1d 0%, #1a1a3e 50%, #0c0c1d 100%)'
    },
    dark2: {
        name: 'Charcoal Storm',
        style: 'linear-gradient(to bottom, #2c3e50 0%, #34495e 30%, #4a5568 60%, #2d3748 100%)'
    },
    dark3: {
        name: 'Deep Purple',
        style: 'linear-gradient(135deg, #2d1b69 0%, #4a148c 50%, #6a1b9a 100%)'
    },
    dark4: {
        name: 'Blood Red',
        style: 'linear-gradient(135deg, #1a0000 0%, #4a0000 50%, #1a0000 100%)'
    },
    dark5: {
        name: 'Shadow Realm',
        style: 'linear-gradient(to bottom, #000000 0%, #1a1a1a 50%, #000000 100%)'
    },
    bright1: {
        name: 'Sunshine Yellow',
        style: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)'
    },
    bright2: {
        name: 'Coral Reef',
        style: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)'
    },
    bright3: {
        name: 'Lavender Fields',
        style: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    },
    bright4: {
        name: 'Mint Fresh',
        style: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)'
    },
    bright5: {
        name: 'Peachy Keen',
        style: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
    },
    spring: {
        name: 'Spring Bloom',
        style: 'linear-gradient(135deg, #a8e6cf 0%, #dcedc1 50%, #ffd3a5 100%)'
    },
    summer: {
        name: 'Summer Beach',
        style: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 50%, #4facfe 100%)'
    },
    autumn: {
        name: 'Autumn Leaves',
        style: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 50%, #d299c2 100%)'
    },
    winter: {
        name: 'Winter Frost',
        style: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)'
    },
    christmas: {
        name: 'Christmas Eve',
        style: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #1e3c72 100%)'
    },
    watercolor: {
        name: 'Watercolor',
        style: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 25%, #fecfef 50%, #c2e9fb 75%, #a1c4fd 100%)'
    },
    pastel: {
        name: 'Pastel Dreams',
        style: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 25%, #ff9a9e 50%, #fecfef 75%, #c2e9fb 100%)'
    },
    vintage: {
        name: 'Vintage Film',
        style: 'linear-gradient(135deg, #d4af37 0%, #8b6914 50%, #d4af37 100%)'
    },
    retro: {
        name: 'Retro Wave',
        style: 'linear-gradient(135deg, #fa709a 0%, #fee140 50%, #fa709a 100%)',
        animation: 'retroWave 8s ease infinite'
    },
    abstract: {
        name: 'Abstract Art',
        style: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)'
    },
    fire: {
        name: 'Fire & Flame',
        style: 'linear-gradient(to bottom, #ff6b6b 0%, #ff8c00 30%, #ff4500 60%, #8b0000 100%)',
        animation: 'fire 5s ease infinite'
    },
    ice: {
        name: 'Ice Crystal',
        style: 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 50%, #4dd0e1 100%)'
    },
    electric: {
        name: 'Electric Storm',
        style: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #1e3c72 100%)',
        animation: 'electric 3s ease infinite'
    },
    rainbow: {
        name: 'Rainbow Spectrum',
        style: 'linear-gradient(135deg, #ff0000 0%, #ff7f00 14%, #ffff00 28%, #00ff00 42%, #0000ff 57%, #4b0082 71%, #9400d3 85%, #ff0000 100%)',
        animation: 'rainbow 10s ease infinite'
    },
    holographic: {
        name: 'Holographic',
        style: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
        animation: 'holographic 8s ease infinite'
    }
};

// Chess game class
class ChessGame {
    constructor() {
        this.board = this.initializeBoard();
        this.currentPlayer = 'white';
        this.selectedSquare = null;
        this.moveHistory = [];
        this.capturedPieces = { white: [], black: [], red: [], green: [] };
        this.gameOver = false;
        this.inCheck = { white: false, black: false };
        this.boardFlipped = false; // Track if board is flipped for black's perspective
        
        // Castling rights: track if king and rooks have moved
        this.castlingRights = {
            white: { kingSide: true, queenSide: true },
            black: { kingSide: true, queenSide: true }
        };
        
        // En passant target: square where a pawn can be captured en passant
        this.enPassantTarget = null; // Format: { row, col } or null
        
        // Bot mode
        this.botMode = false;
        this.botColor = 'black'; // Bot plays as black by default
        // Bot difficulty: 'easy', 'medium', 'hard', 'expert'
        // Load from localStorage if available, default to 'medium'
        const savedDifficulty = localStorage.getItem('botDifficulty');
        this.botDifficulty = savedDifficulty || 'medium';
        // Bot name: customizable name for the bot
        // Load from localStorage if available, default to 'ChessBot'
        const savedBotName = localStorage.getItem('botName');
        this.botName = savedBotName || 'ChessBot';
        
        // Timer system - 10 minutes (600 seconds) per player
        this.timers = {
            white: 600, // 10 minutes in seconds
            black: 600
        };
        this.timerInterval = null;
        this.activeTimer = null;
        this.gameStarted = false; // Game hasn't started until button is clicked
        
        // Draw offer system
        this.drawOffer = null; // null, 'white', or 'black' - tracks who offered the draw
        
        // Review mode
        this.reviewMode = false;
        this.reviewMoveIndex = -1;
        this.boardHistory = []; // Stores board positions for review
        this.savedBoardState = null; // Stores current board when entering review
        
        // Game variant: 'standard' | 'chess960' | 'threeCheck' | 'kingOfTheHill' | 'fourPlayer'
        this.gameVariant = (typeof localStorage !== 'undefined' && localStorage.getItem('chessVariant')) || 'standard';
        this.checksGiven = { white: 0, black: 0 };
        // Four-player: turn order white -> red -> black -> green; eliminated players skip
        this.FOUR_PLAYER_ORDER = ['white', 'red', 'black', 'green'];
        this.eliminated = { white: false, red: false, black: false, green: false };
        
        // Load user preferences if available
        const userPrefs = auth ? auth.getUserPreferences() : null;
        
        // Default colors
        // Default colors - classic chess board colors
        const defaultColors = {
            lightSquare: '#f0d9b5',
            darkSquare: '#b58863',
            whitePiece: '#ffffff',
            blackPiece: '#000000',
            boardContainer: '#ffffff'
        };
        
        this.colors = userPrefs?.colors || defaultColors;
        
        // ALWAYS force reset square colors to classic colors (ignore any saved preferences)
        this.colors.lightSquare = defaultColors.lightSquare;
        this.colors.darkSquare = defaultColors.darkSquare;
        
        // Ensure all other color properties exist with defaults if not set
        if (!this.colors.whitePiece) {
            this.colors.whitePiece = defaultColors.whitePiece;
        }
        if (!this.colors.blackPiece) {
            this.colors.blackPiece = defaultColors.blackPiece;
        }
        if (!this.colors.boardContainer) {
            this.colors.boardContainer = defaultColors.boardContainer;
        }
        if (!this.colors.redPiece) {
            this.colors.redPiece = '#c0392b';
        }
        if (!this.colors.greenPiece) {
            this.colors.greenPiece = '#27ae60';
        }
        
        // Save the corrected colors immediately to override any saved blue colors
        this.savePreferences();
        
        // Current piece set - validate that it exists in PIECE_SETS
        const savedPieceSet = userPrefs?.pieceSet || currentPieceSet;
        this.pieceSet = PIECE_SETS[savedPieceSet] ? savedPieceSet : 'unicode';
        currentPieceSet = this.pieceSet;
        
        // Current background theme
        this.backgroundTheme = userPrefs?.backgroundTheme || 'rainy';
        
        // Apply background immediately
        if (document.body) {
            this.applyBackground();
        }
        
        // Multiplayer manager (will be initialized after DOM is ready)
        this.multiplayer = null;
        
        this.init();
    }

    /**
     * Get a random Chess960 back row (bishops on opposite colors, king between rooks).
     */
    getChess960BackRow() {
        const dark = [0, 2, 4, 6], light = [1, 3, 5, 7];
        const pick = (arr) => arr.splice(Math.floor(Math.random() * arr.length), 1)[0];
        const b1 = pick([...dark]);
        const b2 = pick([...light]);
        const remaining = [0, 1, 2, 3, 4, 5, 6, 7].filter(c => c !== b1 && c !== b2);
        const q = pick(remaining);
        const n1 = pick(remaining);
        const n2 = pick(remaining);
        remaining.sort((a, b) => a - b);
        const back = new Array(8).fill(null);
        back[b1] = 'bishop'; back[b2] = 'bishop';
        back[q] = 'queen'; back[n1] = 'knight'; back[n2] = 'knight';
        back[remaining[0]] = 'rook'; back[remaining[1]] = 'king'; back[remaining[2]] = 'rook';
        return back;
    }

    boardRows() { return this.board ? this.board.length : 8; }
    boardCols() { return this.board && this.board[0] ? this.board[0].length : 8; }

    initializeBoard(variant) {
        const v = variant != null ? variant : this.gameVariant;
        const board = Array(8).fill(null).map(() => Array(8).fill(null));
        
        for (let col = 0; col < 8; col++) {
            board[1][col] = { type: 'pawn', color: 'black' };
            board[6][col] = { type: 'pawn', color: 'white' };
        }
        
        if (v === 'chess960') {
            const backRow = this.getChess960BackRow();
            for (let col = 0; col < 8; col++) {
                board[0][col] = { type: backRow[col], color: 'black' };
                board[7][col] = { type: backRow[col], color: 'white' };
            }
        } else if (v === 'fourPlayer') {
            // 9×9 four-player board: North (Red), South (White), West (Green), East (Black); skip col b on back ranks, shared corners
            // Back ranks skip column b (index 7); North/South have 4 pawns each; corners shared with Green/Black
            const nine = Array(9).fill(null).map(() => Array(9).fill(null));
            const northBack = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
            const westBack = ['rook', 'knight', 'bishop', 'king', 'bishop', 'knight', 'rook'];
            // North (Red) back rank row 0: cols 0,1,2,3,4,5,6,8 (skip 7 = 'b')
            for (let c = 0; c < 9; c++) {
                if (c === 7) continue;
                nine[0][c] = { type: northBack[c > 7 ? c - 1 : c], color: 'red' };
            }
            // South (White) back rank row 8: same
            for (let c = 0; c < 9; c++) {
                if (c === 7) continue;
                nine[8][c] = { type: northBack[c > 7 ? c - 1 : c], color: 'white' };
            }
            // Row 1: Green (col 0,1), Red pawns (2,3,5,6), empty (4), Black (col 7,8)
            nine[1][0] = { type: 'rook', color: 'green' };
            nine[1][1] = { type: 'pawn', color: 'green' };
            nine[1][2] = { type: 'pawn', color: 'red' };
            nine[1][3] = { type: 'pawn', color: 'red' };
            nine[1][5] = { type: 'pawn', color: 'red' };
            nine[1][6] = { type: 'pawn', color: 'red' };
            nine[1][7] = { type: 'pawn', color: 'black' };
            nine[1][8] = { type: 'rook', color: 'black' };
            // Row 7: Green (0), White pawns (1,2,5,6), empty (3,4), Black (7,8); h8 = White Pawn so Green pawns col 1 only rows 1-6
            nine[7][0] = { type: 'rook', color: 'green' };
            nine[7][1] = { type: 'pawn', color: 'white' };
            nine[7][2] = { type: 'pawn', color: 'white' };
            nine[7][5] = { type: 'pawn', color: 'white' };
            nine[7][6] = { type: 'pawn', color: 'white' };
            nine[7][7] = { type: 'pawn', color: 'black' };
            nine[7][8] = { type: 'rook', color: 'black' };
            // West (Green) col 0 rows 1-7 back, col 1 rows 1-6 pawns (h8 is White)
            for (let r = 0; r < 7; r++) {
                nine[1 + r][0] = { type: westBack[r], color: 'green' };
                if (r < 6) nine[1 + r][1] = { type: 'pawn', color: 'green' };
            }
            // East (Black) col 8 rows 1-7 back, col 7 rows 1-7 pawns
            for (let r = 0; r < 7; r++) {
                nine[1 + r][8] = { type: westBack[r], color: 'black' };
                nine[1 + r][7] = { type: 'pawn', color: 'black' };
            }
            return nine;
        } else {
            const backRow = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
            for (let col = 0; col < 8; col++) {
                board[0][col] = { type: backRow[col], color: 'black' };
                board[7][col] = { type: backRow[col], color: 'white' };
            }
        }
        
        return board;
    }
    
    swapBoardPieces() {
        // Rotate the board 180 degrees - flip both rows AND columns
        // This properly shows black's perspective with queen on her color
        const newBoard = Array(8).fill(null).map(() => Array(8).fill(null));
        
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.board[row][col];
                if (piece) {
                    // Rotate 180 degrees: flip both row and column
                    const newRow = 7 - row;
                    const newCol = 7 - col;
                    newBoard[newRow][newCol] = { type: piece.type, color: piece.color };
                }
            }
        }
        
        this.board = newBoard;
        
        // Also swap castling rights
        const tempCastling = { ...this.castlingRights.white };
        this.castlingRights.white = { ...this.castlingRights.black };
        this.castlingRights.black = tempCastling;
        
        // Swap captured pieces
        const tempCaptured = [...this.capturedPieces.white];
        this.capturedPieces.white = [...this.capturedPieces.black];
        this.capturedPieces.black = tempCaptured;
        
        // Swap check status
        const tempCheck = this.inCheck.white;
        this.inCheck.white = this.inCheck.black;
        this.inCheck.black = tempCheck;
    }

    init() {
        // First, clear any saved blue colors from localStorage
        if (typeof auth !== 'undefined' && auth && auth.currentUser) {
            const prefs = auth.getUserPreferences();
            if (prefs && prefs.colors) {
                // Check and fix blue colors
                const ls = prefs.colors.lightSquare;
                const ds = prefs.colors.darkSquare;
                const needsFix = prefs.colors.lightSquare !== '#f0d9b5' || 
                                prefs.colors.darkSquare !== '#b58863' ||
                                (ls && ls.toLowerCase && ls.toLowerCase().indexOf('5d7fad') !== -1) ||
                                (ls && ls.toLowerCase && ls.toLowerCase().indexOf('89a9d1') !== -1) ||
                                (ds && ds.toLowerCase && ds.toLowerCase().indexOf('5d7fad') !== -1) ||
                                (ds && ds.toLowerCase && ds.toLowerCase().indexOf('89a9d1') !== -1);
                
                if (needsFix) {
                    prefs.colors.lightSquare = '#f0d9b5';
                    prefs.colors.darkSquare = '#b58863';
                    auth.saveUserPreferences(prefs);
                }
            }
        }
        
        this.setupUserInterface();
        
        // Load saved player color preference ONLY for single player
        // In multiplayer, the color is determined by host/guest status
        const savedRoom = localStorage.getItem('chess_current_room');
        if (!savedRoom && this.gameVariant !== 'fourPlayer') {
            const savedColor = localStorage.getItem('playerColor');
            if (savedColor && savedColor === 'black') {
                this.swapBoardPieces();
                this.boardFlipped = true;
                // Keep currentPlayer = 'white' so White moves first; flip is display only
            }
        }
        // If in a multiplayer room, the MultiplayerManager will set up orientation
        
        this.renderBoard();
        this.setupEventListeners();
        this.updateGameInfo();
        
        // Apply colors to the board - use saved preferences or defaults
        // Only set default colors if not already set from user preferences
        if (!this.colors.lightSquare) this.colors.lightSquare = '#f0d9b5';
        if (!this.colors.darkSquare) this.colors.darkSquare = '#b58863';
        
        // Apply colors to the board
        this.applyColors();
        this.applyBackground();
        this.initializeTimers();
        // Don't start timer automatically - wait for Start Game button
        
        // Multiplayer manager will be initialized by multiplayer.js
        // and set via window.chessGame.multiplayer = ...
        
        // Initialize timer profile pictures on page load
        setTimeout(() => {
            this.updateTimerProfilePics();
        }, 100);
        
        // Save initial board position for review mode
        this.saveBoardPosition();
        
        // Setup review controls
        this.setupReviewControls();
    }
    
    initializeTimers() {
        // Read timer settings from input fields, default to 10 minutes if not set
        const whiteMinutes = parseInt(document.getElementById('white-timer-minutes')?.value || '10', 10);
        const blackMinutes = parseInt(document.getElementById('black-timer-minutes')?.value || '10', 10);
        
        this.timers = {
            white: Math.max(0, whiteMinutes * 60), // Convert minutes to seconds
            black: Math.max(0, blackMinutes * 60)
        };
        this.updateTimerDisplay();
    }
    
    applyTimerSettings() {
        // Only allow changing timers if game hasn't started
        if (!this.gameStarted) {
            const whiteMinutes = parseInt(document.getElementById('white-timer-minutes')?.value || '10', 10);
            const blackMinutes = parseInt(document.getElementById('black-timer-minutes')?.value || '10', 10);
            
            // Validate input (0-120 minutes)
            const validWhiteMinutes = Math.max(0, Math.min(120, whiteMinutes));
            const validBlackMinutes = Math.max(0, Math.min(120, blackMinutes));
            
            // Update input fields to show valid values
            const whiteInput = document.getElementById('white-timer-minutes');
            const blackInput = document.getElementById('black-timer-minutes');
            if (whiteInput) whiteInput.value = validWhiteMinutes;
            if (blackInput) blackInput.value = validBlackMinutes;
            
            // Apply the timer settings
            this.timers = {
                white: validWhiteMinutes * 60,
                black: validBlackMinutes * 60
            };
            this.updateTimerDisplay();
            
            // Show feedback
            const gameStatus = document.getElementById('game-status');
            if (gameStatus) {
                gameStatus.textContent = `Timers set: White ${validWhiteMinutes}min, Black ${validBlackMinutes}min`;
                setTimeout(() => {
                    if (gameStatus.textContent.includes('Timers set')) {
                        gameStatus.textContent = '';
                    }
                }, 3000);
            }
        } else {
            const gameStatus = document.getElementById('game-status');
            if (gameStatus) {
                gameStatus.textContent = 'Cannot change timer settings after game has started';
                setTimeout(() => {
                    if (gameStatus.textContent.includes('Cannot change')) {
                        gameStatus.textContent = '';
                    }
                }, 3000);
            }
        }
    }
    
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    
    updateTimerDisplay() {
        const whiteTimeEl = document.getElementById('white-time');
        const blackTimeEl = document.getElementById('black-time');
        const whiteTimerEl = document.getElementById('white-timer');
        const blackTimerEl = document.getElementById('black-timer');
        
        // Update header timers (hidden but still functional)
        if (whiteTimeEl) {
            whiteTimeEl.textContent = this.formatTime(this.timers.white);
        }
        if (blackTimeEl) {
            blackTimeEl.textContent = this.formatTime(this.timers.black);
        }
        
        // Update side timers (visible on board left side)
        const whiteTimeSide = document.getElementById('white-time-side');
        const blackTimeSide = document.getElementById('black-time-side');
        
        if (whiteTimeSide) whiteTimeSide.textContent = this.formatTime(this.timers.white);
        if (blackTimeSide) blackTimeSide.textContent = this.formatTime(this.timers.black);
        
        // Update timer profile pictures
        this.updateTimerProfilePics();
        
        // Update active state for header timers
        if (whiteTimerEl && blackTimerEl) {
            if (this.activeTimer === 'white') {
                whiteTimerEl.classList.add('active');
                blackTimerEl.classList.remove('active');
            } else if (this.activeTimer === 'black') {
                blackTimerEl.classList.add('active');
                whiteTimerEl.classList.remove('active');
            } else {
                whiteTimerEl.classList.remove('active');
                blackTimerEl.classList.remove('active');
            }
            
            // Add low-time warning (less than 1 minute)
            if (this.timers.white < 60 && this.activeTimer === 'white') {
                whiteTimerEl.classList.add('low-time');
            } else {
                whiteTimerEl.classList.remove('low-time');
            }
            
            if (this.timers.black < 60 && this.activeTimer === 'black') {
                blackTimerEl.classList.add('low-time');
            } else {
                blackTimerEl.classList.remove('low-time');
            }
        }
        
        // Update active state for side timers
        const sideTimerWhite = document.getElementById('side-timer-white');
        const sideTimerBlack = document.getElementById('side-timer-black');
        
        // Reset all side timers
        [sideTimerWhite, sideTimerBlack].forEach(timer => {
            if (timer) {
                timer.classList.remove('active', 'low-time');
            }
        });
        
        // Set active state for current player's side timer
        if (this.activeTimer === 'white') {
            if (sideTimerWhite) sideTimerWhite.classList.add('active');
            
            // Add low-time warning
            if (this.timers.white < 60) {
                if (sideTimerWhite) sideTimerWhite.classList.add('low-time');
            }
        } else if (this.activeTimer === 'black') {
            if (sideTimerBlack) sideTimerBlack.classList.add('active');
            
            // Add low-time warning
            if (this.timers.black < 60) {
                if (sideTimerBlack) sideTimerBlack.classList.add('low-time');
            }
        }
    }
    
    startTimer(player) {
        if (this.gameOver || !this.gameStarted) {
            console.log('Timer not started:', { gameOver: this.gameOver, gameStarted: this.gameStarted, player });
            return;
        }
        
        // Stop any existing timer
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        
        this.activeTimer = player;
        this.updateTimerDisplay();
        
        console.log('Starting timer for:', player, 'Time remaining:', this.timers[player]);
        
        this.timerInterval = setInterval(() => {
            if (!this.gameStarted || this.gameOver) {
                clearInterval(this.timerInterval);
                this.timerInterval = null;
                return;
            }
            
            // Use activeTimer to ensure we're counting the right timer
            const currentPlayer = this.activeTimer;
            if (!currentPlayer) {
                clearInterval(this.timerInterval);
                this.timerInterval = null;
                return;
            }
            
            if (this.timers[currentPlayer] > 0) {
                this.timers[currentPlayer]--;
                this.updateTimerDisplay();
            } else {
                // Time's up!
                this.handleTimeOut(currentPlayer);
            }
        }, 1000);
    }
    
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        this.activeTimer = null;
    }
    
    handleTimeOut(player) {
        this.stopTimer();
        this.gameOver = true;
        const winner = player === 'white' ? 'Black' : 'White';
        // Use bot name if bot is the winner
        let winnerName = winner;
        if (this.botMode && winner === (this.botColor === 'white' ? 'White' : 'Black')) {
            winnerName = this.botName;
        }
        document.getElementById('game-status').textContent = `Time's up! ${winnerName} wins!`;
        this.updateTimerDisplay();
        this.updateReviewButtonVisibility();
    }
    
    setupUserInterface() {
        // Display username
        if (typeof auth !== 'undefined' && auth && auth.currentUser) {
            const usernameDisplay = document.getElementById('username-display');
            if (usernameDisplay) {
                usernameDisplay.textContent = `ðŸ‘¤ ${auth.currentUser.username} /gmail`;
            }
            
            // Setup logout button
            const logoutBtn = document.getElementById('logout-btn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', () => {
                    auth.logout();
                });
            }
        }
        
        // Setup settings button
        this.setupSettingsButton();
    }
    
    setupSettingsButton() {
        const settingsBtn = document.getElementById('settings-btn');
        const settingsModal = document.getElementById('settings-modal');
        const settingsCloseBtn = document.getElementById('settings-close-btn');
        const profileBtn = document.getElementById('settings-profile-btn');
        const customizationBtn = document.getElementById('settings-customization-btn');
        const timerBtn = document.getElementById('settings-timer-btn');
        const botBtn = document.getElementById('settings-bot-btn');
        
        // Open settings modal
        if (settingsBtn && settingsModal) {
            settingsBtn.addEventListener('click', () => {
                settingsModal.classList.add('show');
            });
        }
        
        // Close settings modal
        if (settingsCloseBtn && settingsModal) {
            settingsCloseBtn.addEventListener('click', () => {
                settingsModal.classList.remove('show');
            });
        }
        
        // Close modal when clicking outside
        if (settingsModal) {
            settingsModal.addEventListener('click', (e) => {
                if (e.target === settingsModal) {
                    settingsModal.classList.remove('show');
                }
            });
        }

        // Lessons button and modal
        const lessonsBtn = document.getElementById('lessons-btn');
        const lessonsModal = document.getElementById('lessons-modal');
        const lessonsCloseBtn = document.getElementById('lessons-close-btn');
        if (lessonsBtn && lessonsModal) {
            lessonsBtn.addEventListener('click', () => {
                lessonsModal.classList.add('show');
            });
        }
        if (lessonsCloseBtn && lessonsModal) {
            lessonsCloseBtn.addEventListener('click', () => {
                lessonsModal.classList.remove('show');
            });
        }
        if (lessonsModal) {
            lessonsModal.addEventListener('click', (e) => {
                if (e.target === lessonsModal) {
                    lessonsModal.classList.remove('show');
                }
            });
        }
        document.querySelectorAll('.lesson-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const lessonId = tab.getAttribute('data-lesson');
                document.querySelectorAll('.lesson-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.lesson-panel').forEach(p => p.classList.remove('active'));
                tab.classList.add('active');
                const panel = document.getElementById('lesson-' + lessonId);
                if (panel) panel.classList.add('active');
            });
        });
        
        // Scroll to profile/player names section
        if (profileBtn) {
            profileBtn.addEventListener('click', () => {
                settingsModal.classList.remove('show');
                const playerNamesSection = document.querySelector('.player-names');
                if (playerNamesSection) {
                    setTimeout(() => {
                        playerNamesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 300);
                }
            });
        }
        
        // Scroll to customization section
        if (customizationBtn) {
            customizationBtn.addEventListener('click', () => {
                settingsModal.classList.remove('show');
                const customizationSection = document.querySelector('.customization');
                if (customizationSection) {
                    setTimeout(() => {
                        customizationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 300);
                }
            });
        }
        
        // Scroll to timer settings
        if (timerBtn) {
            timerBtn.addEventListener('click', () => {
                settingsModal.classList.remove('show');
                const timerSection = document.querySelector('.timer-settings');
                if (timerSection) {
                    setTimeout(() => {
                        timerSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 300);
                }
            });
        }
        
        // Scroll to bot settings
        if (botBtn) {
            botBtn.addEventListener('click', () => {
                settingsModal.classList.remove('show');
                const botSection = document.querySelector('.bot-settings');
                if (botSection) {
                    setTimeout(() => {
                        botSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 300);
                }
            });
        }
    }

    renderBoard() {
        const boardElement = document.getElementById('chessboard');
        boardElement.innerHTML = '';
        boardElement.style.transform = 'rotate(0deg)';
        boardElement.classList.remove('flipped');
        const rows = this.boardRows();
        const cols = this.boardCols();
        const is9x9 = this.gameVariant === 'fourPlayer' && rows === 9;
        if (is9x9) boardElement.classList.add('board-9x9'); else boardElement.classList.remove('board-9x9');
        
        for (let displayRow = 0; displayRow < rows; displayRow++) {
            for (let displayCol = 0; displayCol < cols; displayCol++) {
                const actualRow = displayRow;
                const actualCol = displayCol;
                
                const square = document.createElement('div');
                square.className = `square ${(displayRow + displayCol) % 2 === 0 ? 'light' : 'dark'}`;
                square.dataset.row = actualRow;
                square.dataset.col = actualCol;
                
                if (displayCol === 0) {
                    const rank = document.createElement('span');
                    rank.className = 'coordinate rank';
                    if (is9x9) {
                        rank.textContent = this.boardFlipped ? (rows - displayRow) : (displayRow + 1);
                    } else {
                        rank.textContent = this.boardFlipped ? (displayRow + 1) : (rows - displayRow);
                    }
                    square.appendChild(rank);
                }
                if (displayRow === rows - 1) {
                    const file = document.createElement('span');
                    file.className = 'coordinate file';
                    if (is9x9) {
                        file.textContent = this.boardFlipped ? String.fromCharCode(97 + displayCol) : String.fromCharCode(105 - displayCol);
                    } else {
                        file.textContent = this.boardFlipped ? String.fromCharCode(96 + cols - displayCol) : String.fromCharCode(96 + displayCol + 1);
                    }
                    square.appendChild(file);
                }
                
                // Add piece if exists (use actual board coordinates)
                const piece = this.board[actualRow][actualCol];
                if (piece) {
                    const pieceSet = PIECE_SETS[this.pieceSet] || PIECE_SETS['unicode'];
                    const pieceSpan = document.createElement('span');
                    pieceSpan.className = 'piece-symbol piece-' + piece.color;
                    const symSet = pieceSet[piece.color] || pieceSet.white;
                    pieceSpan.textContent = symSet[piece.type];
                    const colorKey = piece.color + 'Piece';
                    const pieceColorValue = this.colors[colorKey] || (piece.color === 'white' ? '#ffffff' : piece.color === 'black' ? '#000000' : piece.color === 'red' ? '#c0392b' : '#27ae60');
                    pieceSpan.style.setProperty('color', pieceColorValue, 'important');
                    pieceSpan.style.setProperty('-webkit-text-fill-color', pieceColorValue, 'important');
                    square.appendChild(pieceSpan);
                    
                    square.style.removeProperty('color');
                    square.style.removeProperty('filter');
                    
                    // Add tooltip with piece name
                    const pieceName = piece.type.charAt(0).toUpperCase() + piece.type.slice(1);
                    square.title = `${piece.color.charAt(0).toUpperCase() + piece.color.slice(1)} ${pieceName}`;
                    square.setAttribute('data-piece-type', piece.type);
                    square.setAttribute('data-piece-color', piece.color);
                }
                
                // Use actual coordinates for click handler
                square.addEventListener('click', () => this.handleSquareClick(actualRow, actualCol));
                boardElement.appendChild(square);
            }
        }
        
        this.updateSquareStates();
        this.setupTooltips();
        
        // Apply colors after rendering
        this.applyColors();
    }
    
    setupTooltips() {
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => {
            const pieceType = square.getAttribute('data-piece-type');
            if (pieceType) {
                const pieceColor = square.getAttribute('data-piece-color');
                const pieceName = pieceType.charAt(0).toUpperCase() + pieceType.slice(1);
                const colorName = pieceColor.charAt(0).toUpperCase() + pieceColor.slice(1);
                
                // Remove old tooltip if exists
                square.removeEventListener('mouseenter', square._tooltipHandler);
                square.removeEventListener('mouseleave', square._tooltipLeaveHandler);
                
                // Create tooltip handler
                square._tooltipHandler = (e) => {
                    this.showTooltip(e, `${colorName} ${pieceName}`);
                };
                square._tooltipLeaveHandler = () => {
                    this.hideTooltip();
                };
                
                square.addEventListener('mouseenter', square._tooltipHandler);
                square.addEventListener('mouseleave', square._tooltipLeaveHandler);
            }
        });
    }
    
    showTooltip(event, text) {
        // Remove existing tooltip
        const existingTooltip = document.getElementById('chess-tooltip');
        if (existingTooltip) {
            existingTooltip.remove();
        }
        
        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.id = 'chess-tooltip';
        tooltip.textContent = text;
        document.body.appendChild(tooltip);
        
        // Position tooltip
        const x = event.clientX + 10;
        const y = event.clientY - 30;
        tooltip.style.left = x + 'px';
        tooltip.style.top = y + 'px';
        
        // Show tooltip
        setTimeout(() => {
            tooltip.classList.add('visible');
        }, 10);
    }
    
    hideTooltip() {
        const tooltip = document.getElementById('chess-tooltip');
        if (tooltip) {
            tooltip.classList.remove('visible');
            setTimeout(() => {
                if (tooltip.parentNode) {
                    tooltip.remove();
                }
            }, 200);
        }
    }

    setupEventListeners() {
        document.getElementById('new-game-btn').addEventListener('click', () => this.newGame());
        document.getElementById('reset-btn').addEventListener('click', () => this.resetGame());
        document.getElementById('start-game-btn').addEventListener('click', () => this.startGame());
        document.getElementById('resign-btn').addEventListener('click', () => this.resign());
        document.getElementById('draw-btn').addEventListener('click', () => this.offerDraw());
        
        const gameTypeSelect = document.getElementById('game-type-select');
        if (gameTypeSelect) {
            gameTypeSelect.value = this.gameVariant;
            gameTypeSelect.addEventListener('change', (e) => {
                this.gameVariant = e.target.value;
                try { localStorage.setItem('chessVariant', this.gameVariant); } catch (err) {}
                if (!this.gameStarted || this.gameOver) {
                    this.newGame();
                } else {
                    document.getElementById('game-status').textContent = 'Start a new game to use ' + (gameTypeSelect.selectedOptions[0]?.text || this.gameVariant);
                    setTimeout(() => { if (document.getElementById('game-status').textContent.includes('Start a new game')) document.getElementById('game-status').textContent = ''; }, 3000);
                }
            });
        }
        
        // Player color selector
        const playerColorSelect = document.getElementById('player-color-select');
        if (playerColorSelect) {
            // Load saved preference
            const savedColor = localStorage.getItem('playerColor');
            if (savedColor) {
                playerColorSelect.value = savedColor;
            }
            
            playerColorSelect.addEventListener('change', (e) => {
                const selectedColor = e.target.value;
                localStorage.setItem('playerColor', selectedColor);
                this.setPlayerColor(selectedColor);
            });
            
            // Set initial color
            this.setPlayerColor(playerColorSelect.value);
        }
        const playBotBtn = document.getElementById('play-bot-btn');
        if (playBotBtn) {
            playBotBtn.addEventListener('click', () => {
                console.log('Play Bot button clicked');
                this.toggleBotMode();
            });
        } else {
            console.error('Play Bot button not found!');
        }
        
        // Timer customization
        const applyTimerBtn = document.getElementById('apply-timer-btn');
        if (applyTimerBtn) {
            applyTimerBtn.addEventListener('click', () => this.applyTimerSettings());
        }
        
        // Update timer display when input values change (before game starts)
        const whiteTimerInput = document.getElementById('white-timer-minutes');
        const blackTimerInput = document.getElementById('black-timer-minutes');
        if (whiteTimerInput) {
            whiteTimerInput.addEventListener('input', () => {
                if (!this.gameStarted) {
                    this.initializeTimers();
                }
            });
        }
        if (blackTimerInput) {
            blackTimerInput.addEventListener('input', () => {
                if (!this.gameStarted) {
                    this.initializeTimers();
                }
            });
        }
        
        // Bot name input
        const botNameInput = document.getElementById('bot-name');
        if (botNameInput) {
            // Set the saved bot name
            botNameInput.value = this.botName;
            
            botNameInput.addEventListener('input', (e) => {
                const newName = e.target.value.trim() || 'ChessBot';
                this.botName = newName;
                localStorage.setItem('botName', this.botName);
                // Update display immediately if bot mode is active
                if (this.botMode && this.currentPlayer === this.botColor) {
                    this.updateGameInfo();
                }
            });
            
            botNameInput.addEventListener('blur', (e) => {
                // Ensure name is not empty
                if (!e.target.value.trim()) {
                    e.target.value = 'ChessBot';
                    this.botName = 'ChessBot';
                    localStorage.setItem('botName', this.botName);
                }
            });
        }
        
        // Bot difficulty selector
        const botDifficultySelect = document.getElementById('bot-difficulty');
        if (botDifficultySelect) {
            // Set the saved difficulty
            botDifficultySelect.value = this.botDifficulty;
            
            botDifficultySelect.addEventListener('change', (e) => {
                this.botDifficulty = e.target.value;
                localStorage.setItem('botDifficulty', this.botDifficulty);
                const difficultyNames = {
                    'easy': 'Easy',
                    'medium': 'Medium',
                    'hard': 'Hard',
                    'expert': 'Expert'
                };
                const statusEl = document.getElementById('game-status');
                if (statusEl) {
                    statusEl.textContent = `${this.botName} difficulty set to ${difficultyNames[this.botDifficulty]}`;
                    setTimeout(() => {
                        if (statusEl.textContent.includes('difficulty set to')) {
                            statusEl.textContent = '';
                        }
                    }, 2000);
                }
            });
        }
        
        // Player name inputs - update profiles when names change
        const whiteNameInput = document.getElementById('white-player-name');
        const blackNameInput = document.getElementById('black-player-name');
        
        if (whiteNameInput) {
            whiteNameInput.addEventListener('input', () => {
                this.updatePlayerProfiles();
            });
        }
        
        if (blackNameInput) {
            blackNameInput.addEventListener('input', () => {
                this.updatePlayerProfiles();
            });
        }
        
        // Profile picture uploads
        this.setupProfilePictureUploads();
        
        // White profile button
        const whiteProfileButton = document.getElementById('white-profile-button');
        if (whiteProfileButton) {
            whiteProfileButton.addEventListener('click', () => {
                this.showPlayerProfile('white');
            });
        }
        
        this.setupColorCustomization();
    }
    
    setupProfilePictureUploads() {
        // White player profile picture
        const whitePicInput = document.getElementById('white-player-pic');
        const whitePicPreview = document.getElementById('white-player-pic-preview');
        
        if (whitePicInput && whitePicPreview) {
            // Load saved image
            const savedWhitePic = localStorage.getItem('whitePlayerProfilePic');
            if (savedWhitePic) {
                const img = document.createElement('img');
                img.src = savedWhitePic;
                whitePicPreview.appendChild(img);
                whitePicPreview.classList.add('has-image');
            }
            
            whitePicInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const imageData = event.target.result;
                        localStorage.setItem('whitePlayerProfilePic', imageData);
                        
                        // Update preview
                        whitePicPreview.innerHTML = '';
                        const img = document.createElement('img');
                        img.src = imageData;
                        whitePicPreview.appendChild(img);
                        whitePicPreview.classList.add('has-image');
                        
                        // Update profile display
                        this.updatePlayerProfiles();
                        
                        // Update timer profile picture
                        this.updateTimerProfilePics();
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
        
        // Black player profile picture
        const blackPicInput = document.getElementById('black-player-pic');
        const blackPicPreview = document.getElementById('black-player-pic-preview');
        
        if (blackPicInput && blackPicPreview) {
            // Load saved image
            const savedBlackPic = localStorage.getItem('blackPlayerProfilePic');
            if (savedBlackPic) {
                const img = document.createElement('img');
                img.src = savedBlackPic;
                blackPicPreview.appendChild(img);
                blackPicPreview.classList.add('has-image');
            }
            
            blackPicInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const imageData = event.target.result;
                        localStorage.setItem('blackPlayerProfilePic', imageData);
                        
                        // Update preview
                        blackPicPreview.innerHTML = '';
                        const img = document.createElement('img');
                        img.src = imageData;
                        blackPicPreview.appendChild(img);
                        blackPicPreview.classList.add('has-image');
                        
                        // Update profile display
                        this.updatePlayerProfiles();
                        
                        // Update timer profile picture
                        this.updateTimerProfilePics();
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    }
    
    setPlayerColor(color) {
        // Only allow color change if game hasn't started
        if (this.gameStarted) {
            const statusEl = document.getElementById('game-status');
            if (statusEl) {
                statusEl.textContent = 'Cannot change color after game has started';
                statusEl.style.color = '#ff6b6b';
                setTimeout(() => {
                    if (statusEl.textContent.includes('Cannot change color')) {
                        statusEl.textContent = '';
                        statusEl.style.color = '';
                    }
                }, 3000);
            }
            // Reset selector to current color
            const playerColorSelect = document.getElementById('player-color-select');
            if (playerColorSelect) {
                const savedColor = localStorage.getItem('playerColor') || 'white';
                playerColorSelect.value = savedColor;
            }
            return;
        }
        
        // Set bot color to the OPPOSITE of player's color
        // Note: currentPlayer stays 'white' because white ALWAYS moves first in chess
        this.botColor = (color === 'white') ? 'black' : 'white';
        
        // Swap pieces when playing as black (so black pieces are at bottom)
        if (color === 'black' && !this.boardFlipped) {
            // First time switching to black - swap the pieces
            this.swapBoardPieces();
            this.boardFlipped = true;
        } else if (color === 'white' && this.boardFlipped) {
            // Switching back to white - swap the pieces back
            this.swapBoardPieces();
            this.boardFlipped = false;
        }
        
        // Re-render board with new orientation
        this.renderBoard();
        
        // Update UI to reflect the change
        this.updateGameInfo();
        this.updatePlayerProfiles();
        
        // Show feedback
        const statusEl = document.getElementById('game-status');
        if (statusEl) {
            statusEl.textContent = `Playing as ${color === 'white' ? 'White' : 'Black'}`;
            statusEl.style.color = '#667eea';
            setTimeout(() => {
                if (statusEl.textContent.includes('Playing as')) {
                    statusEl.textContent = '';
                    statusEl.style.color = '';
                }
            }, 2000);
        }
    }
    
    showPlayerProfile(color) {
        // Get player name based on color
        let playerName = color === 'white' ? 'White' : 'Black';
        
        if (this.botMode && ((color === 'white' && this.botColor === 'white') || (color === 'black' && this.botColor === 'black'))) {
            playerName = this.botName;
        } else if (this.multiplayer && this.multiplayer.roomCode) {
            // Get player names from multiplayer manager
            if (color === 'white') {
                playerName = this.multiplayer.isHost ? this.multiplayer.myName : this.multiplayer.opponentName;
            } else {
                playerName = this.multiplayer.isHost ? this.multiplayer.opponentName : this.multiplayer.myName;
            }
            playerName = playerName || (color === 'white' ? 'White' : 'Black');
        } else {
            const nameInput = document.getElementById(`${color}-player-name`);
            if (nameInput && nameInput.value.trim()) {
                playerName = nameInput.value.trim();
            }
        }
        
        // Show profile info (you can expand this to show a modal with more details)
        const statusEl = document.getElementById('game-status');
        if (statusEl) {
            const role = color === 'white' ? 'White Player' : 'Black Player';
            statusEl.textContent = `${playerName} - ${role}`;
            statusEl.style.color = '#667eea';
            setTimeout(() => {
                if (statusEl.textContent.includes(' - ')) {
                    statusEl.textContent = '';
                    statusEl.style.color = '';
                }
            }, 3000);
        }
    }
    
    async startGame() {
        if (!this.gameStarted && !this.gameOver) {
            // In multiplayer mode, use the multiplayer ready system
            if (this.multiplayer && this.multiplayer.roomCode) {
                // Let multiplayer manager handle the ready logic
                this.multiplayer.markReady();
                return; // Multiplayer manager will call startGame when both ready
            }
            
            // Single player mode - start immediately
            this.applyTimerSettings();
            
            this.gameStarted = true;
            const startBtn = document.getElementById('start-game-btn');
            if (startBtn) {
                startBtn.style.display = 'none';
            }
            
            // Disable timer inputs once game starts
            const whiteTimerInput = document.getElementById('white-timer-minutes');
            const blackTimerInput = document.getElementById('black-timer-minutes');
            const applyTimerBtn = document.getElementById('apply-timer-btn');
            if (whiteTimerInput) whiteTimerInput.disabled = true;
            if (blackTimerInput) blackTimerInput.disabled = true;
            if (applyTimerBtn) applyTimerBtn.disabled = true;
            
            this.startTimer('white');
            
            document.getElementById('game-status').textContent = 'Game started! White moves first.';
            setTimeout(() => {
                document.getElementById('game-status').textContent = '';
            }, 2000);
            
            // If bot mode is active and bot goes first (unlikely but possible), make bot move
            if (this.botMode && this.currentPlayer === this.botColor) {
                setTimeout(() => {
                    this.makeBotMove();
                }, 100); // Fast response
            }
        }
    }
    
    setupColorCustomization() {
        // Reset both square colors to classic colors if they've been customized
        if (this.colors.lightSquare !== '#f0d9b5') {
            this.colors.lightSquare = '#f0d9b5';
        }
        if (this.colors.darkSquare !== '#b58863') {
            this.colors.darkSquare = '#b58863';
        }
        
        // Force apply colors to all squares immediately
        this.applyColors();
        this.savePreferences();
        
        // Update the color inputs to reflect the classic colors
        const lightSquareColor = document.getElementById('light-square-color');
        const lightSquareText = document.getElementById('light-square-text');
        const darkSquareColor = document.getElementById('dark-square-color');
        const darkSquareText = document.getElementById('dark-square-text');
        if (lightSquareColor) lightSquareColor.value = '#f0d9b5';
        if (lightSquareText) lightSquareText.value = '#f0d9b5';
        if (darkSquareColor) darkSquareColor.value = '#b58863';
        if (darkSquareText) darkSquareText.value = '#b58863';
        
        // Helper function to setup color inputs with retry
        const setupColorInput = (colorId, textId, colorKey, retryCount = 0) => {
            const colorInput = document.getElementById(colorId);
            const textInput = document.getElementById(textId);
            
            if (!colorInput || !textInput) {
                if (retryCount < 5) {
                    setTimeout(() => setupColorInput(colorId, textId, colorKey, retryCount + 1), 100 * (retryCount + 1));
                } else {
                    console.error(`Could not find color inputs after retries: ${colorId} or ${textId}`);
                }
                return;
            }
            
            // Check if listeners already attached
            if (colorInput.hasAttribute('data-listener-attached')) {
                console.log(`Listeners already attached for ${colorId}`);
                return;
            }
            
            console.log(`Setting up color input: ${colorId}`);
            
            // Ensure inputs are enabled and clickable
            colorInput.disabled = false;
            colorInput.removeAttribute('readonly');
            textInput.disabled = false;
            textInput.removeAttribute('readonly');
            
            // Set initial values
            if (this.colors[colorKey]) {
                colorInput.value = this.colors[colorKey];
                textInput.value = this.colors[colorKey];
            }
            
            // Remove old listeners if they exist
            if (colorInput._colorHandler) {
                colorInput.removeEventListener('input', colorInput._colorHandler);
                colorInput.removeEventListener('change', colorInput._changeHandler);
            }
            if (textInput._textHandler) {
                textInput.removeEventListener('input', textInput._textHandler);
                textInput.removeEventListener('change', textInput._changeHandler);
            }
            
            // Create new handlers
            colorInput._colorHandler = (e) => {
                console.log(`Color changed: ${colorKey} = ${e.target.value}`);
                this.colors[colorKey] = e.target.value;
                textInput.value = e.target.value;
                this.applyColors();
                this.savePreferences();
            };
            
            colorInput._changeHandler = (e) => {
                console.log(`Color changed (change event): ${colorKey} = ${e.target.value}`);
                this.colors[colorKey] = e.target.value;
                textInput.value = e.target.value;
                this.applyColors();
                this.savePreferences();
            };
            
            textInput._textHandler = (e) => {
                if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
                    console.log(`Color changed via text: ${colorKey} = ${e.target.value}`);
                    this.colors[colorKey] = e.target.value;
                    colorInput.value = e.target.value;
                    this.applyColors();
                    this.savePreferences();
                }
            };
            
            textInput._changeHandler = (e) => {
                if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
                    console.log(`Color changed via text (change event): ${colorKey} = ${e.target.value}`);
                    this.colors[colorKey] = e.target.value;
                    colorInput.value = e.target.value;
                    this.applyColors();
                    this.savePreferences();
                }
            };
            
            // Attach listeners
            colorInput.addEventListener('input', colorInput._colorHandler);
            colorInput.addEventListener('change', colorInput._changeHandler);
            textInput.addEventListener('input', textInput._textHandler);
            textInput.addEventListener('change', textInput._changeHandler);
            
            colorInput.setAttribute('data-listener-attached', 'true');
            textInput.setAttribute('data-listener-attached', 'true');
        };
        
        // Setup all color inputs
        setupColorInput('light-square-color', 'light-square-text', 'lightSquare');
        setupColorInput('dark-square-color', 'dark-square-text', 'darkSquare');
        setupColorInput('white-piece-color', 'white-piece-text', 'whitePiece');
        setupColorInput('black-piece-color', 'black-piece-text', 'blackPiece');
        
        // Board container color (special handling for container background)
        const setupBoardContainerColor = (retryCount = 0) => {
            const boardContainerColor = document.getElementById('board-container-color');
            const boardContainerText = document.getElementById('board-container-text');
            
            if (!boardContainerColor || !boardContainerText) {
                if (retryCount < 5) {
                    setTimeout(() => setupBoardContainerColor(retryCount + 1), 100 * (retryCount + 1));
                } else {
                    console.error('Could not find board container color inputs after retries');
                }
                return;
            }
            
            if (boardContainerColor.hasAttribute('data-listener-attached')) {
                console.log('Board container listeners already attached');
                return;
            }
            
            console.log('Setting up board container color input');
            
            // Ensure inputs are enabled and clickable
            boardContainerColor.disabled = false;
            boardContainerColor.removeAttribute('readonly');
            boardContainerText.disabled = false;
            boardContainerText.removeAttribute('readonly');
            
            // Set initial values
            if (this.colors.boardContainer) {
                boardContainerColor.value = this.colors.boardContainer;
                boardContainerText.value = this.colors.boardContainer;
            }
            
            // Remove old listeners if they exist
            if (boardContainerColor._colorHandler) {
                boardContainerColor.removeEventListener('input', boardContainerColor._colorHandler);
                boardContainerColor.removeEventListener('change', boardContainerColor._changeHandler);
            }
            if (boardContainerText._textHandler) {
                boardContainerText.removeEventListener('input', boardContainerText._textHandler);
                boardContainerText.removeEventListener('change', boardContainerText._changeHandler);
            }
            
            // Create new handlers
            boardContainerColor._colorHandler = (e) => {
                console.log(`Board container color changed: ${e.target.value}`);
                this.colors.boardContainer = e.target.value;
                boardContainerText.value = e.target.value;
                const boardContainer = document.querySelector('.board-container');
                if (boardContainer) {
                    boardContainer.style.backgroundColor = this.colors.boardContainer;
                }
                this.applyColors();
                this.savePreferences();
            };
            
            boardContainerColor._changeHandler = (e) => {
                console.log(`Board container color changed (change event): ${e.target.value}`);
                this.colors.boardContainer = e.target.value;
                boardContainerText.value = e.target.value;
                const boardContainer = document.querySelector('.board-container');
                if (boardContainer) {
                    boardContainer.style.backgroundColor = this.colors.boardContainer;
                }
                this.applyColors();
                this.savePreferences();
            };
            
            boardContainerText._textHandler = (e) => {
                if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
                    console.log(`Board container color changed via text: ${e.target.value}`);
                    this.colors.boardContainer = e.target.value;
                    boardContainerColor.value = e.target.value;
                    const boardContainer = document.querySelector('.board-container');
                    if (boardContainer) {
                        boardContainer.style.backgroundColor = this.colors.boardContainer;
                    }
                    this.applyColors();
                    this.savePreferences();
                }
            };
            
            boardContainerText._changeHandler = (e) => {
                if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
                    console.log(`Board container color changed via text (change event): ${e.target.value}`);
                    this.colors.boardContainer = e.target.value;
                    boardContainerColor.value = e.target.value;
                    const boardContainer = document.querySelector('.board-container');
                    if (boardContainer) {
                        boardContainer.style.backgroundColor = this.colors.boardContainer;
                    }
                    this.applyColors();
                    this.savePreferences();
                }
            };
            
            // Attach listeners
            boardContainerColor.addEventListener('input', boardContainerColor._colorHandler);
            boardContainerColor.addEventListener('change', boardContainerColor._changeHandler);
            boardContainerText.addEventListener('input', boardContainerText._textHandler);
            boardContainerText.addEventListener('change', boardContainerText._changeHandler);
            
            boardContainerColor.setAttribute('data-listener-attached', 'true');
            boardContainerText.setAttribute('data-listener-attached', 'true');
        };
        
        setupBoardContainerColor();
        
        // Preset themes - use event delegation for reliability
        const setupThemeButtons = () => {
            const themeButtonsContainer = document.querySelector('.theme-buttons') || document.querySelector('.preset-themes');
            const themeButtons = document.querySelectorAll('.theme-btn');
            
            if (themeButtons.length > 0) {
                // Remove old listeners if any
                if (themeButtonsContainer && themeButtonsContainer._themeClickHandler) {
                    themeButtonsContainer.removeEventListener('click', themeButtonsContainer._themeClickHandler);
                }
                
                // Use event delegation on container
                if (themeButtonsContainer) {
                    themeButtonsContainer._themeClickHandler = (e) => {
                        const btn = e.target.closest('.theme-btn');
                        if (btn) {
                            e.preventDefault();
                            e.stopPropagation();
                            const theme = btn.dataset.theme;
                            if (theme) {
                                console.log('Applying theme:', theme);
                                this.applyTheme(theme);
                                document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
                                btn.classList.add('active');
                            }
                        }
                    };
                    themeButtonsContainer.addEventListener('click', themeButtonsContainer._themeClickHandler);
                } else {
                    // Fallback: direct attachment
                    themeButtons.forEach(btn => {
                        // Remove old listener if exists
                        if (btn._themeClickHandler) {
                            btn.removeEventListener('click', btn._themeClickHandler);
                        }
                        
                        btn._themeClickHandler = (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const theme = btn.dataset.theme;
                            if (theme) {
                                console.log('Applying theme:', theme);
                                this.applyTheme(theme);
                                document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
                                btn.classList.add('active');
                            }
                        };
                        btn.addEventListener('click', btn._themeClickHandler);
                    });
                }
                return true;
            }
            return false;
        };
        
        // Try immediately
        if (!setupThemeButtons()) {
            // Retry if buttons aren't loaded yet
            setTimeout(setupThemeButtons, 100);
            setTimeout(setupThemeButtons, 500);
            setTimeout(setupThemeButtons, 1000);
        }
        
        // Board style grid (Chess.com-style picker)
        const setupBoardStyleTiles = () => {
            const grid = document.getElementById('board-style-grid');
            if (!grid) return;
            const tiles = grid.querySelectorAll('.board-style-tile');
            tiles.forEach(tile => {
                const light = tile.getAttribute('data-light') || '#f0d9b5';
                const dark = tile.getAttribute('data-dark') || '#b58863';
                tile.style.setProperty('--board-light', light);
                tile.style.setProperty('--board-dark', dark);
            });
            if (grid._boardStyleClickAttached) return;
            grid._boardStyleClickAttached = true;
            grid.addEventListener('click', (e) => {
                const tile = e.target.closest('.board-style-tile');
                if (!tile) return;
                const light = tile.getAttribute('data-light');
                const dark = tile.getAttribute('data-dark');
                if (!light || !dark) return;
                this.colors.lightSquare = light;
                this.colors.darkSquare = dark;
                document.getElementById('light-square-color').value = light;
                document.getElementById('light-square-text').value = light;
                document.getElementById('dark-square-color').value = dark;
                document.getElementById('dark-square-text').value = dark;
                tiles.forEach(t => t.classList.remove('selected'));
                tile.classList.add('selected');
                this.applyColors();
                this.savePreferences();
            });
            const light = this.colors.lightSquare || '#f0d9b5';
            const dark = this.colors.darkSquare || '#b58863';
            const norm = (c) => (c || '').toLowerCase().trim();
            tiles.forEach(t => {
                if (norm(t.getAttribute('data-light')) === norm(light) && norm(t.getAttribute('data-dark')) === norm(dark)) {
                    t.classList.add('selected');
                } else {
                    t.classList.remove('selected');
                }
            });
        };
        setupBoardStyleTiles();
        
        // Background theme selector
        const backgroundSelector = document.getElementById('background-theme-selector');
        backgroundSelector.value = this.backgroundTheme;
        backgroundSelector.addEventListener('change', (e) => {
            this.backgroundTheme = e.target.value;
            this.applyBackground();
            this.savePreferences();
        });
        
        // Piece set selector
        const pieceSetSelector = document.getElementById('piece-set-selector');
        pieceSetSelector.value = this.pieceSet;
        pieceSetSelector.addEventListener('change', (e) => {
            this.pieceSet = e.target.value;
            currentPieceSet = e.target.value;
            this.renderBoard();
            this.applyColors();
            this.updateCapturedPieces();
            this.savePreferences();
        });
        
        // Reset colors button - use a more robust approach
        const setupResetButton = () => {
            const resetBtn = document.getElementById('reset-colors-btn');
            if (resetBtn) {
                // Check if already has listener
                if (!resetBtn.hasAttribute('data-listener-attached')) {
                    resetBtn.setAttribute('data-listener-attached', 'true');
                    resetBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Resetting colors');
                        this.resetColors();
                    });
                }
                return true;
            }
            return false;
        };
        
        // Try immediately
        if (!setupResetButton()) {
            // Retry if button isn't loaded yet
            setTimeout(setupResetButton, 100);
            setTimeout(setupResetButton, 500);
        }
    }
    
    applyColors() {
        // Apply square colors - ensure all squares get the correct colors
        const squares = document.querySelectorAll('.square');
        // Fallback to unicode if the selected piece set doesn't exist
        const pieceSet = PIECE_SETS[this.pieceSet] || PIECE_SETS['unicode'];
        
        // Use the colors from this.colors (which may be from a theme or customization)
        const lightColor = this.colors.lightSquare || '#f0d9b5';
        const darkColor = this.colors.darkSquare || '#b58863';
        
        squares.forEach(square => {
            // Force apply background colors to all squares with !important
            if (square.classList.contains('light')) {
                // Remove only background-related properties
                square.style.removeProperty('background');
                square.style.removeProperty('background-color');
                square.style.removeProperty('background-image');
                
                // Force set the color with !important using setProperty
                square.style.setProperty('background-color', lightColor, 'important');
                
                // Also set as regular property as backup
                square.style.backgroundColor = lightColor;
            } else if (square.classList.contains('dark')) {
                // Remove only background-related properties
                square.style.removeProperty('background');
                square.style.removeProperty('background-color');
                square.style.removeProperty('background-image');
                
                // Force set the color with !important using setProperty
                square.style.setProperty('background-color', darkColor, 'important');
                
                // Also set as regular property as backup
                square.style.backgroundColor = darkColor;
            }
            
            // Update piece symbols and colors
            const row = parseInt(square.dataset.row);
            const col = parseInt(square.dataset.col);
            const boardPiece = this.board[row][col];
            
            // Find or create piece span
            let pieceSpan = square.querySelector('.piece-symbol');
            
            if (boardPiece) {
                if (!pieceSpan) {
                    pieceSpan = document.createElement('span');
                    pieceSpan.className = 'piece-symbol';
                    square.appendChild(pieceSpan);
                }
                pieceSpan.className = 'piece-symbol piece-' + boardPiece.color;
                pieceSpan.textContent = pieceSet[boardPiece.color][boardPiece.type];
                const pieceColorValue = this.colors[boardPiece.color === 'white' ? 'whitePiece' : 'blackPiece'] || (boardPiece.color === 'white' ? '#ffffff' : '#000000');
                pieceSpan.style.setProperty('color', pieceColorValue, 'important');
                pieceSpan.style.setProperty('-webkit-text-fill-color', pieceColorValue, 'important');
                
                square.style.removeProperty('color');
                square.style.removeProperty('filter');
                
                // Update tooltip data
                const pieceName = boardPiece.type.charAt(0).toUpperCase() + boardPiece.type.slice(1);
                square.title = `${boardPiece.color.charAt(0).toUpperCase() + boardPiece.color.slice(1)} ${pieceName}`;
                square.setAttribute('data-piece-type', boardPiece.type);
                square.setAttribute('data-piece-color', boardPiece.color);
            } else {
                // Remove piece span if no piece
                if (pieceSpan) {
                    pieceSpan.remove();
                }
                square.removeAttribute('data-piece-type');
                square.removeAttribute('data-piece-color');
                square.title = '';
            }
        });
        
        this.setupTooltips();
        
        // Apply board container color
        const boardContainer = document.querySelector('.board-container');
        if (boardContainer) {
            boardContainer.style.backgroundColor = this.hexToRgba(this.colors.boardContainer, 0.95);
        }
        
        // Update captured pieces colors
        this.updateCapturedPieces();
        
        // Save preferences
        this.savePreferences();
    }
    
    applyBackground() {
        const theme = BACKGROUND_THEMES[this.backgroundTheme];
        if (!theme) return;
        
        const body = document.body;
        if (!body) return;
        
        body.style.background = theme.style;
        
        if (theme.animation) {
            body.style.animation = theme.animation;
        } else {
            body.style.animation = 'none';
        }
        
        // Show rain and lightning only when Rainy Storm theme is selected
        const rainContainer = document.getElementById('rain-container');
        const lightning = document.getElementById('lightning-effect');
        const showRain = this.backgroundTheme === 'rainy';
        if (rainContainer) rainContainer.style.display = showRain ? 'block' : 'none';
        if (lightning) lightning.style.display = showRain ? 'block' : 'none';
    }
    
    savePreferences() {
        if (typeof auth !== 'undefined' && auth && auth.currentUser) {
            auth.saveUserPreferences({
                colors: { ...this.colors },
                pieceSet: this.pieceSet,
                backgroundTheme: this.backgroundTheme
            });
        }
    }
    
    hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    
    applyTheme(theme) {
        console.log('applyTheme called with:', theme);
        const themes = {
            classic: {
                lightSquare: '#f0d9b5',
                darkSquare: '#b58863',
                whitePiece: '#ffffff',
                blackPiece: '#000000',
                boardContainer: '#ffffff'
            },
            ocean: {
                lightSquare: '#a8d5e2',
                darkSquare: '#4a90a4',
                whitePiece: '#ffffff',
                blackPiece: '#1a3a4a',
                boardContainer: '#e8f4f8'
            },
            forest: {
                lightSquare: '#c8d5b9',
                darkSquare: '#6b8e5a',
                whitePiece: '#ffffff',
                blackPiece: '#2d4a2d',
                boardContainer: '#f0f5ed'
            },
            sunset: {
                lightSquare: '#ffd4a3',
                darkSquare: '#ff8c5a',
                whitePiece: '#ffffff',
                blackPiece: '#5a2a0a',
                boardContainer: '#fff5e8'
            },
            monochrome: {
                lightSquare: '#e0e0e0',
                darkSquare: '#606060',
                whitePiece: '#ffffff',
                blackPiece: '#000000',
                boardContainer: '#f5f5f5'
            }
        };
        
        if (themes[theme]) {
            console.log('Applying theme colors:', themes[theme]);
            this.colors = { ...themes[theme] };
            this.updateColorInputs();
            this.applyColors();
            this.savePreferences();
            
            // Update board container background
            const boardContainer = document.querySelector('.board-container');
            if (boardContainer) {
                boardContainer.style.backgroundColor = this.colors.boardContainer;
            }
        } else {
            console.error('Theme not found:', theme);
        }
    }
    
    updateColorInputs() {
        document.getElementById('light-square-color').value = this.colors.lightSquare;
        document.getElementById('light-square-text').value = this.colors.lightSquare;
        document.getElementById('dark-square-color').value = this.colors.darkSquare;
        document.getElementById('dark-square-text').value = this.colors.darkSquare;
        document.getElementById('white-piece-color').value = this.colors.whitePiece;
        document.getElementById('white-piece-text').value = this.colors.whitePiece;
        document.getElementById('black-piece-color').value = this.colors.blackPiece;
        document.getElementById('black-piece-text').value = this.colors.blackPiece;
        document.getElementById('board-container-color').value = this.colors.boardContainer;
        document.getElementById('board-container-text').value = this.colors.boardContainer;
    }
    
    resetColors() {
        this.colors = {
            lightSquare: '#f0d9b5',
            darkSquare: '#b58863',
            whitePiece: '#ffffff',
            blackPiece: '#000000',
            boardContainer: '#ffffff'
        };
        this.pieceSet = 'unicode';
        this.backgroundTheme = 'rainy';
        currentPieceSet = 'unicode';
        document.getElementById('piece-set-selector').value = 'unicode';
        document.getElementById('background-theme-selector').value = 'rainy';
        // Update board container background
        const boardContainer = document.querySelector('.board-container');
        if (boardContainer) {
            boardContainer.style.backgroundColor = this.colors.boardContainer;
        }
        
        // Remove active class from all theme buttons
        document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
        // Mark Classic board style as selected
        document.querySelectorAll('.board-style-tile').forEach(t => {
            t.classList.toggle('selected', t.getAttribute('data-light') === '#f0d9b5' && t.getAttribute('data-dark') === '#b58863');
        });
        
        this.updateColorInputs();
        this.renderBoard();
        this.applyColors();
        this.applyBackground();
        this.updateCapturedPieces();
        this.savePreferences();
    }

    handleSquareClick(row, col) {
        console.log('=== CLICK DEBUG ===');
        console.log('Clicked:', row, col);
        console.log('gameStarted:', this.gameStarted);
        console.log('gameOver:', this.gameOver);
        console.log('currentPlayer:', this.currentPlayer);
        console.log('boardFlipped:', this.boardFlipped);
        
        // Don't allow moves during review mode
        if (this.reviewMode) {
            console.log('BLOCKED: Review mode active');
            return;
        }
        
        const piece = this.board[row][col];
        console.log('Piece at position:', piece);
        
        // Basic checks
        if (this.gameOver) {
            console.log('BLOCKED: Game over');
            this.stopTimer();
            return;
        }
        
        // Don't allow clicks when it's the bot's turn
        if (this.botMode && this.currentPlayer === this.botColor) {
            console.log('BLOCKED: Bot turn');
            return;
        }
        
        const squareKey = `${row}-${col}`;
        
        // If clicking on selected square, deselect
        if (this.selectedSquare && this.selectedSquare === squareKey) {
            this.selectedSquare = null;
            this.updateSquareStates();
            return;
        }
        
        // Select piece if it belongs to the current player's turn
        if (piece && piece.color === this.currentPlayer) {
            console.log('SUCCESS: Selecting piece', piece.type, piece.color);
            this.selectedSquare = squareKey;
            this.updateSquareStates();
            return;
        } else if (piece) {
            console.log('BLOCKED: Piece color', piece.color, 'does not match currentPlayer', this.currentPlayer);
        } else {
            console.log('No piece at this position');
        }
        
        // If a piece is selected, try to move
        if (this.selectedSquare) {
            console.log('Piece selected, attempting move');
            const [selectedRow, selectedCol] = this.selectedSquare.split('-').map(Number);
            if (this.isValidMove(selectedRow, selectedCol, row, col)) {
                console.log('Valid move, making move');
                this.makeMove(selectedRow, selectedCol, row, col);
                this.selectedSquare = null;
                this.updateSquareStates();
            } else {
                // Invalid move, select new piece if clicking on current player's piece
                if (piece && piece.color === this.currentPlayer) {
                    this.selectedSquare = squareKey;
                    this.updateSquareStates();
                }
            }
        } else {
            console.log('No piece selected, and not clicking on own piece');
        }
    }

    isValidMove(fromRow, fromCol, toRow, toCol) {
        console.log('=== MOVE VALIDATION ===');
        console.log('From:', fromRow, fromCol, 'To:', toRow, toCol);
        const piece = this.board[fromRow][fromCol];
        console.log('Piece:', piece);
        console.log('currentPlayer:', this.currentPlayer);
        console.log('boardFlipped:', this.boardFlipped);
        
        if (!piece || piece.color !== this.currentPlayer) {
            console.log('INVALID: No piece or wrong color');
            return false;
        }
        
        if (piece.type === 'king' && Math.abs(toCol - fromCol) === 2 && fromRow === toRow) {
            if (this.gameVariant === 'fourPlayer') return false;
            return this.isValidCastling(fromRow, fromCol, toRow, toCol);
        }
        
        const targetPiece = this.board[toRow][toCol];
        if (targetPiece && targetPiece.color === piece.color) {
            return false;
        }
        
        // Check if move is valid for the piece type (this already includes path checking for rooks, bishops, queens)
        if (!this.isValidPieceMove(piece, fromRow, fromCol, toRow, toCol)) {
            return false;
        }
        
        // Check if path is clear (for pieces that need it)
        if (piece.type === 'rook' || piece.type === 'bishop' || piece.type === 'queen') {
            if (!this.isPathClear(fromRow, fromCol, toRow, toCol)) {
                return false;
            }
        }
        
        // Simulate the move on a test board
        const testBoard = this.cloneBoard();
        testBoard[toRow][toCol] = testBoard[fromRow][fromCol];
        testBoard[fromRow][fromCol] = null;
        
        // After making the move, check if the king would be in check
        const wouldBeInCheck = this.isKingInCheck(testBoard, this.currentPlayer);
        
        // If the move would leave the king in check, it's invalid
        if (wouldBeInCheck) {
            return false;
        }
        
        // Move is valid: it doesn't leave the king in check
        return true;
    }

    isValidPieceMove(piece, fromRow, fromCol, toRow, toCol) {
        const rowDiff = toRow - fromRow;
        const colDiff = toCol - fromCol;
        
        switch (piece.type) {
            case 'pawn':
                return this.isValidPawnMove(piece, fromRow, fromCol, toRow, toCol);
            case 'rook':
                return this.isValidRookMove(fromRow, fromCol, toRow, toCol);
            case 'knight':
                return (Math.abs(rowDiff) === 2 && Math.abs(colDiff) === 1) ||
                       (Math.abs(rowDiff) === 1 && Math.abs(colDiff) === 2);
            case 'bishop':
                return this.isValidBishopMove(fromRow, fromCol, toRow, toCol);
            case 'queen':
                return this.isValidRookMove(fromRow, fromCol, toRow, toCol) ||
                       this.isValidBishopMove(fromRow, fromCol, toRow, toCol);
            case 'king':
                return Math.abs(rowDiff) <= 1 && Math.abs(colDiff) <= 1;
            default:
                return false;
        }
    }

    isValidPawnMove(piece, fromRow, fromCol, toRow, toCol) {
        if (this.gameVariant === 'fourPlayer' && this.boardRows() === 9) {
            const targetPiece = this.board[toRow][toCol];
            const rowDiff = toRow - fromRow, colDiff = toCol - fromCol;
            if (piece.color === 'red') {
                if (colDiff === 0 && !targetPiece) {
                    if (rowDiff === 1) return true;
                    if (fromRow === 1 && rowDiff === 2 && !this.board[2][fromCol]) return true;
                }
                if (Math.abs(colDiff) === 1 && rowDiff === 1 && targetPiece && targetPiece.color !== 'red') return true;
                return false;
            }
            if (piece.color === 'white') {
                if (colDiff === 0 && !targetPiece) {
                    if (rowDiff === -1) return true;
                    if (fromRow === 7 && rowDiff === -2 && !this.board[6][fromCol]) return true;
                }
                if (Math.abs(colDiff) === 1 && rowDiff === -1 && targetPiece && targetPiece.color !== 'white') return true;
                return false;
            }
            if (piece.color === 'green') {
                if (rowDiff === 0 && !targetPiece) {
                    if (colDiff === 1) return true;
                    if (fromCol === 1 && colDiff === 2 && !this.board[fromRow][2]) return true;
                }
                if (Math.abs(rowDiff) === 1 && colDiff === 1 && targetPiece && targetPiece.color !== 'green') return true;
                return false;
            }
            if (piece.color === 'black') {
                if (rowDiff === 0 && !targetPiece) {
                    if (colDiff === -1) return true;
                    if (fromCol === 7 && colDiff === -2 && !this.board[fromRow][6]) return true;
                }
                if (Math.abs(rowDiff) === 1 && colDiff === -1 && targetPiece && targetPiece.color !== 'black') return true;
                return false;
            }
        }
        let direction, startRow;
        if (this.boardFlipped) {
            // Board is flipped (black's perspective): white moves down, black moves up
            direction = piece.color === 'white' ? 1 : -1;
            startRow = piece.color === 'white' ? 1 : 6;
        } else {
            // Normal orientation: white moves up, black moves down
            direction = piece.color === 'white' ? -1 : 1;
            startRow = piece.color === 'white' ? 6 : 1;
        }
        
        const rowDiff = toRow - fromRow;
        const colDiff = toCol - fromCol;
        const targetPiece = this.board[toRow][toCol];
        
        // Forward move
        if (colDiff === 0 && !targetPiece) {
            if (rowDiff === direction) return true;
            if (fromRow === startRow && rowDiff === 2 * direction && !this.board[fromRow + direction][fromCol]) {
                return true;
            }
        }
        
        // Capture move
        if (Math.abs(colDiff) === 1 && rowDiff === direction && targetPiece && targetPiece.color !== piece.color) {
            return true;
        }
        
        // En passant capture
        if (Math.abs(colDiff) === 1 && rowDiff === direction && !targetPiece) {
            // Check if en passant target exists and matches
            if (this.enPassantTarget && 
                this.enPassantTarget.row === toRow && 
                this.enPassantTarget.col === toCol) {
                // Check if there's an enemy pawn in the adjacent square
                // Direction reversed when board is flipped
                let enemyPawnRow;
                if (this.boardFlipped) {
                    enemyPawnRow = piece.color === 'white' ? toRow - 1 : toRow + 1;
                } else {
                    enemyPawnRow = piece.color === 'white' ? toRow + 1 : toRow - 1;
                }
                const enemyPawn = this.board[enemyPawnRow][toCol];
                if (enemyPawn && enemyPawn.type === 'pawn' && enemyPawn.color !== piece.color) {
                    return true;
                }
            }
        }
        
        return false;
    }

    isValidRookMove(fromRow, fromCol, toRow, toCol) {
        if (fromRow !== toRow && fromCol !== toCol) return false;
        return this.isPathClear(fromRow, fromCol, toRow, toCol);
    }

    isValidBishopMove(fromRow, fromCol, toRow, toCol) {
        if (Math.abs(toRow - fromRow) !== Math.abs(toCol - fromCol)) return false;
        return this.isPathClear(fromRow, fromCol, toRow, toCol);
    }

    isPathClear(fromRow, fromCol, toRow, toCol) {
        const rowStep = toRow === fromRow ? 0 : (toRow > fromRow ? 1 : -1);
        const colStep = toCol === fromCol ? 0 : (toCol > fromCol ? 1 : -1);
        
        let currentRow = fromRow + rowStep;
        let currentCol = fromCol + colStep;
        
        while (currentRow !== toRow || currentCol !== toCol) {
            if (this.board[currentRow][currentCol] !== null) return false;
            currentRow += rowStep;
            currentCol += colStep;
        }
        
        return true;
    }

    /**
     * Animates a piece from one square to another, then calls callback.
     * Uses a cloned piece overlay; animates with transform so the move is visible.
     */
    animatePieceMove(fromRow, fromCol, toRow, toCol, callback) {
        const boardElement = document.getElementById('chessboard');
        if (!boardElement) {
            if (typeof callback === 'function') callback();
            return;
        }
        const wrapper = boardElement.parentElement;
        if (!wrapper || typeof wrapper.getBoundingClientRect !== 'function') {
            if (typeof callback === 'function') callback();
            return;
        }
        const fromSquare = boardElement.querySelector('.square[data-row="' + fromRow + '"][data-col="' + fromCol + '"]');
        const toSquare = boardElement.querySelector('.square[data-row="' + toRow + '"][data-col="' + toCol + '"]');
        const pieceSpan = fromSquare ? fromSquare.querySelector('.piece-symbol') : null;
        if (!fromSquare || !toSquare || !pieceSpan) {
            if (typeof callback === 'function') callback();
            return;
        }
        const wr = wrapper.getBoundingClientRect();
        const fr = fromSquare.getBoundingClientRect();
        const tr = toSquare.getBoundingClientRect();
        const leftFrom = fr.left - wr.left + wrapper.scrollLeft;
        const topFrom = fr.top - wr.top + wrapper.scrollTop;
        const leftTo = tr.left - wr.left + wrapper.scrollLeft;
        const topTo = tr.top - wr.top + wrapper.scrollTop;
        const dx = leftTo - leftFrom;
        const dy = topTo - topFrom;
        const squareSize = Math.max(fr.width, fr.height, 50);
        const overlay = document.createElement('div');
        overlay.className = 'piece-moving-overlay';
        overlay.style.pointerEvents = 'none';
        const clone = pieceSpan.cloneNode(true);
        clone.classList.add('piece-moving');
        clone.style.position = 'absolute';
        clone.style.left = leftFrom + 'px';
        clone.style.top = topFrom + 'px';
        clone.style.width = squareSize + 'px';
        clone.style.height = squareSize + 'px';
        clone.style.transform = 'translate(0, 0)';
        clone.style.transition = 'none';
        overlay.appendChild(clone);
        wrapper.appendChild(overlay);
        pieceSpan.style.visibility = 'hidden';
        const toPiece = toSquare.querySelector('.piece-symbol');
        if (toPiece) toPiece.style.visibility = 'hidden';
        let done = false;
        const onDone = () => {
            if (done) return;
            done = true;
            try { overlay.remove(); } catch (e) {}
            pieceSpan.style.visibility = '';
            if (toPiece) toPiece.style.visibility = '';
            if (typeof callback === 'function') callback();
        };
        const startTransition = () => {
            clone.style.transition = 'transform 0.28s ease-out';
            clone.style.transform = 'translate(' + dx + 'px, ' + dy + 'px)';
            clone.addEventListener('transitionend', function handler(e) {
                if (e.propertyName !== 'transform') return;
                clone.removeEventListener('transitionend', handler);
                onDone();
            });
            setTimeout(onDone, 320);
        };
        requestAnimationFrame(function () {
            requestAnimationFrame(startTransition);
        });
    }

    makeMove(fromRow, fromCol, toRow, toCol) {
        // Early return if game is over (unless it's a bot move being forced)
        if (this.gameOver) {
            console.warn('Attempted move when game is over');
            return;
        }
        
        // Decline any pending draw offer when a move is made
        if (this.drawOffer) {
            this.declineDraw();
        }
        
        const piece = this.board[fromRow][fromCol];
        if (!piece) {
            console.error('No piece at source square:', fromRow, fromCol);
            return;
        }
        
        let capturedPiece = this.board[toRow][toCol];
        
        // Handle castling (animate king and rook, then apply)
        if (piece.type === 'king' && Math.abs(toCol - fromCol) === 2 && fromRow === toRow) {
            const isKingSide = this.boardFlipped ? (toCol < fromCol) : (toCol > fromCol);
            const rookCol = this.boardFlipped ? (isKingSide ? 0 : 7) : (isKingSide ? 7 : 0);
            const newRookCol = this.boardFlipped ? (isKingSide ? 2 : 4) : (isKingSide ? 5 : 3);
            let pending = 2;
            const afterCastlingAnim = () => {
                pending--;
                if (pending !== 0) return;
                this.executeCastling(fromRow, fromCol, toRow, toCol);
                this.updateCastlingRights(piece, fromRow, fromCol);
                this.enPassantTarget = null;
                const moveNotation = this.getMoveNotation(piece, fromRow, fromCol, toRow, toCol, null);
                this.moveHistory.push({ move: moveNotation, player: this.currentPlayer });
                this.updateMoveHistory();
                this.switchTurn();
                this.checkGameState();
                this.updateGameInfo();
                this.renderBoard();
                if (this.multiplayer) this.multiplayer.onMoveMade(fromRow, fromCol, toRow, toCol);
                if (this.botMode && !this.gameOver && this.currentPlayer === this.botColor) {
                    setTimeout(() => this.makeBotMove(), 150);
                }
            };
            this.animatePieceMove(fromRow, fromCol, toRow, toCol, afterCastlingAnim);
            this.animatePieceMove(fromRow, rookCol, fromRow, newRookCol, afterCastlingAnim);
            return;
        }
        
        // Animate piece, then apply the move in callback
        const applyNormalMove = () => {
            let enPassantCapture = false;
            if (piece.type === 'pawn' && 
                Math.abs(toCol - fromCol) === 1 && 
                !capturedPiece &&
                this.enPassantTarget &&
                this.enPassantTarget.row === toRow &&
                this.enPassantTarget.col === toCol) {
                enPassantCapture = true;
                let enemyPawnRow;
                if (this.boardFlipped) {
                    enemyPawnRow = piece.color === 'white' ? toRow - 1 : toRow + 1;
                } else {
                    enemyPawnRow = piece.color === 'white' ? toRow + 1 : toRow - 1;
                }
                capturedPiece = this.board[enemyPawnRow][toCol];
                this.board[enemyPawnRow][toCol] = null;
                this.capturedPieces[capturedPiece.color].push(capturedPiece);
                this.updateCapturedPieces();
            }
            
            if (capturedPiece && !enPassantCapture) {
                this.capturedPieces[capturedPiece.color].push(capturedPiece);
                if (this.gameVariant === 'fourPlayer' && capturedPiece.type === 'king') {
                    this.eliminated[capturedPiece.color] = true;
                }
                this.updateCapturedPieces();
            }
            
            this.board[toRow][toCol] = piece;
            this.board[fromRow][fromCol] = null;
            
            this.enPassantTarget = null;
            if (piece.type === 'pawn' && Math.abs(toRow - fromRow) === 2) {
                this.enPassantTarget = {
                    row: fromRow + (toRow - fromRow) / 2,
                    col: fromCol
                };
            }
            
            this.updateCastlingRights(piece, fromRow, fromCol);
            if (piece.type === 'pawn' && (toRow === 0 || toRow === 7)) {
                piece.type = 'queen';
            }
            
            const moveNotation = this.getMoveNotation(piece, fromRow, fromCol, toRow, toCol, capturedPiece);
            this.moveHistory.push({ move: moveNotation, player: this.currentPlayer });
            this.updateMoveHistory();
            this.switchTurn();
            this.checkGameState();
            this.updateGameInfo();
            this.renderBoard();
            if (this.multiplayer) this.multiplayer.onMoveMade(fromRow, fromCol, toRow, toCol);
            if (this.botMode && !this.gameOver && this.currentPlayer === this.botColor) {
                if (this.activeTimer !== this.botColor) this.startTimer(this.botColor);
                setTimeout(() => this.makeBotMove(), 150);
            }
        };
        this.animatePieceMove(fromRow, fromCol, toRow, toCol, applyNormalMove);
    }
    
    getNextPlayerFour() {
        const order = this.FOUR_PLAYER_ORDER;
        const idx = order.indexOf(this.currentPlayer);
        for (let i = 1; i <= 4; i++) {
            const next = order[(idx + i) % 4];
            if (!this.eliminated[next]) return next;
        }
        return this.currentPlayer;
    }

    switchTurn() {
        this.stopTimer();
        if (this.gameVariant === 'fourPlayer') {
            this.currentPlayer = this.getNextPlayerFour();
            if (this.timers[this.currentPlayer] !== undefined) {
                this.startTimer(this.currentPlayer);
            }
        } else {
            this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white';
            this.startTimer(this.currentPlayer);
        }
    }
    
    isValidCastling(fromRow, fromCol, toRow, toCol) {
        const piece = this.board[fromRow][fromCol];
        if (piece.type !== 'king' || piece.color !== this.currentPlayer) {
            return false;
        }
        
        // King must not be in check
        if (this.inCheck[this.currentPlayer]) {
            return false;
        }
        
        // Determine which side (king-side or queen-side)
        // When board is flipped, the direction is reversed
        const isKingSide = this.boardFlipped ? (toCol < fromCol) : (toCol > fromCol);
        const color = piece.color;
        
        // Check castling rights
        if (isKingSide && !this.castlingRights[color].kingSide) {
            return false;
        }
        if (!isKingSide && !this.castlingRights[color].queenSide) {
            return false;
        }
        
        // Find the rook - positions are different when board is flipped
        const rookCol = this.boardFlipped 
            ? (isKingSide ? 0 : 7)  // Flipped: kingside at 0, queenside at 7
            : (isKingSide ? 7 : 0); // Normal: kingside at 7, queenside at 0
        const rook = this.board[fromRow][rookCol];
        if (!rook || rook.type !== 'rook' || rook.color !== color) {
            return false;
        }
        
        // Check if squares between king and rook are clear
        const startCol = Math.min(fromCol, rookCol) + 1;
        const endCol = Math.max(fromCol, rookCol);
        for (let col = startCol; col < endCol; col++) {
            if (this.board[fromRow][col] !== null) {
                return false;
            }
        }
        
        // Check if king doesn't pass through check
        const kingStep = this.boardFlipped 
            ? (isKingSide ? -1 : 1)  // Flipped: kingside moves left
            : (isKingSide ? 1 : -1); // Normal: kingside moves right
        for (let col = fromCol; col !== toCol + kingStep; col += kingStep) {
            const testBoard = this.cloneBoard();
            testBoard[fromRow][col] = piece;
            testBoard[fromRow][fromCol] = null;
            if (this.isKingInCheck(testBoard, color)) {
                return false;
            }
        }
        
        return true;
    }
    
    executeCastling(fromRow, fromCol, toRow, toCol) {
        const piece = this.board[fromRow][fromCol];
        // Determine kingside based on board orientation
        const isKingSide = this.boardFlipped ? (toCol < fromCol) : (toCol > fromCol);
        
        // Rook positions depend on board orientation
        const rookCol = this.boardFlipped 
            ? (isKingSide ? 0 : 7)  // Flipped: kingside rook at 0, queenside at 7
            : (isKingSide ? 7 : 0); // Normal: kingside rook at 7, queenside at 0
        const newRookCol = this.boardFlipped
            ? (isKingSide ? 2 : 4)  // Flipped: new positions are mirrored
            : (isKingSide ? 5 : 3); // Normal: kingside rook to 5, queenside to 3
        
        // Move king
        this.board[toRow][toCol] = piece;
        this.board[fromRow][fromCol] = null;
        
        // Move rook
        const rook = this.board[fromRow][rookCol];
        this.board[fromRow][newRookCol] = rook;
        this.board[fromRow][rookCol] = null;
        
        // Record move
        const moveNotation = isKingSide ? 'O-O' : 'O-O-O';
        this.moveHistory.push({
            move: moveNotation,
            player: this.currentPlayer
        });
        this.updateMoveHistory();
        
        // Update castling rights
        this.castlingRights[piece.color].kingSide = false;
        this.castlingRights[piece.color].queenSide = false;
        
        // Notify multiplayer
        if (this.multiplayer) {
            this.multiplayer.onMoveMade(fromRow, fromCol, toRow, toCol);
        }
    }
    
    updateCastlingRights(piece, fromRow, fromCol) {
        const color = piece.color;
        
        // If king moves, lose all castling rights
        if (piece.type === 'king') {
            this.castlingRights[color].kingSide = false;
            this.castlingRights[color].queenSide = false;
        }
        
        // If rook moves, lose castling rights on that side
        // Account for board flip - positions are mirrored
        if (piece.type === 'rook') {
            // Determine home row based on color and board flip
            let homeRow;
            if (this.boardFlipped) {
                homeRow = (color === 'white') ? 0 : 7;
            } else {
                homeRow = (color === 'white') ? 7 : 0;
            }
            
            if (fromRow === homeRow) {
                // Determine which rook based on column and board flip
                if (this.boardFlipped) {
                    // When flipped: kingside rook at col 0, queenside at col 7
                    if (fromCol === 0) {
                        this.castlingRights[color].kingSide = false;
                    } else if (fromCol === 7) {
                        this.castlingRights[color].queenSide = false;
                    }
                } else {
                    // Normal: queenside rook at col 0, kingside at col 7
                    if (fromCol === 0) {
                        this.castlingRights[color].queenSide = false;
                    } else if (fromCol === 7) {
                        this.castlingRights[color].kingSide = false;
                    }
                }
            }
        }
    }

    getMoveNotation(piece, fromRow, fromCol, toRow, toCol, captured) {
        const files = 'abcdefgh';
        const fromSquare = files[fromCol] + (8 - fromRow);
        const toSquare = files[toCol] + (8 - toRow);
        const pieceSymbol = piece.type === 'pawn' ? '' : piece.type[0].toUpperCase();
        const captureSymbol = captured ? 'x' : '';
        return `${pieceSymbol}${fromSquare}${captureSymbol}${toSquare}`;
    }

    resign() {
        // Don't allow resigning if game hasn't started or is already over
        if (!this.gameStarted || this.gameOver) {
            return;
        }
        
        // In multiplayer, send resign to opponent and update both screens
        if (this.multiplayer && this.multiplayer.roomCode && this.multiplayer.connection?.open) {
            if (typeof window.multiplayerResign === 'function') {
                window.multiplayerResign();
            }
            return;
        }
        
        // Stop the timer
        this.stopTimer();
        
        // Set game as over
        this.gameOver = true;
        
        // Determine the winner (opponent of the current player)
        const winner = this.currentPlayer === 'white' ? 'Black' : 'White';
        
        // Handle bot mode - if bot is the winner, show bot name
        let winnerName = winner;
        if (this.botMode) {
            if (winner === (this.botColor === 'white' ? 'White' : 'Black')) {
                winnerName = this.botName;
            }
        }
        
        // Update game status
        const resigningPlayer = this.currentPlayer === 'white' ? 'White' : 'Black';
        document.getElementById('game-status').textContent = `${resigningPlayer} resigned! ${winnerName} wins!`;
        document.getElementById('game-status').style.color = '#4CAF50';
        document.getElementById('game-status').style.fontWeight = 'bold';
        
        // Update game info
        this.updateGameInfo();
        this.updateReviewButtonVisibility();
        
        console.log(`${resigningPlayer} resigned. ${winnerName} wins!`);
    }

    offerDraw() {
        // Don't allow draw if game hasn't started or is already over
        if (!this.gameStarted || this.gameOver) {
            return;
        }
        
        // If opponent has offered a draw, accept it
        if (this.drawOffer && this.drawOffer !== this.currentPlayer) {
            this.acceptDraw();
            // In multiplayer, notify opponent that draw was accepted
            if (this.multiplayer && this.multiplayer.connection?.open) {
                this.multiplayer.connection.send({ type: 'drawAccepted' });
            }
            return;
        }
        
        // If we already offered a draw, don't offer again
        if (this.drawOffer === this.currentPlayer) {
            return;
        }
        
        // In multiplayer mode, send draw offer to opponent
        if (this.multiplayer && this.multiplayer.connection?.open) {
            this.multiplayer.connection.send({ type: 'drawOffer' });
            document.getElementById('game-status').textContent = 'Draw offer sent to opponent...';
            document.getElementById('game-status').style.color = '#ffc107';
            return;
        }
        
        // Offer a draw to the opponent (local/bot mode)
        this.drawOffer = this.currentPlayer;
        // Use bot name if current player is bot
        let offeringPlayer = this.currentPlayer === 'white' ? 'White' : 'Black';
        let opponentPlayer = this.currentPlayer === 'white' ? 'Black' : 'White';
        if (this.botMode && this.currentPlayer === this.botColor) {
            offeringPlayer = this.botName;
        }
        if (this.botMode && this.currentPlayer !== this.botColor) {
            // Opponent is bot, so use bot name
            opponentPlayer = this.botName;
        }
        
        // Update game status
        document.getElementById('game-status').textContent = `${offeringPlayer} offers a draw. ${opponentPlayer} can accept by clicking Draw.`;
        document.getElementById('game-status').style.color = '#ffc107';
        document.getElementById('game-status').style.fontWeight = 'bold';
        
        // Update draw button text for opponent
        const drawBtn = document.getElementById('draw-btn');
        if (drawBtn) {
            drawBtn.textContent = 'Accept Draw';
            drawBtn.style.backgroundColor = '#28a745';
        }
        
        console.log(`${offeringPlayer} offered a draw.`);
    }
    
    acceptDraw() {
        // Stop the timer
        this.stopTimer();
        
        // Set game as over
        this.gameOver = true;
        
        // Clear draw offer
        this.drawOffer = null;
        
        // Update game status
        document.getElementById('game-status').textContent = 'Game ended in a draw!';
        document.getElementById('game-status').style.color = '#ffc107';
        document.getElementById('game-status').style.fontWeight = 'bold';
        
        // Reset draw button
        const drawBtn = document.getElementById('draw-btn');
        if (drawBtn) {
            drawBtn.textContent = 'Draw';
            drawBtn.style.backgroundColor = '#ffc107';
        }
        
        // Update game info
        this.updateGameInfo();
        this.updateReviewButtonVisibility();
        
        console.log('Draw accepted! Game ended in a draw.');
    }
    
    declineDraw() {
        // Clear the draw offer
        this.drawOffer = null;
        
        // Update game status
        document.getElementById('game-status').textContent = '';
        
        // Reset draw button
        const drawBtn = document.getElementById('draw-btn');
        if (drawBtn) {
            drawBtn.textContent = 'Draw';
            drawBtn.style.backgroundColor = '#ffc107';
        }
        
        console.log('Draw offer declined.');
    }

    checkGameState() {
        this.inCheck.white = this.isKingInCheck(this.board, 'white');
        this.inCheck.black = this.isKingInCheck(this.board, 'black');
        if (this.gameVariant === 'fourPlayer') {
            this.inCheck.red = this.isKingInCheck(this.board, 'red');
            this.inCheck.green = this.isKingInCheck(this.board, 'green');
            const colors = ['white', 'red', 'black', 'green'];
            for (const c of colors) {
                if (!this.eliminated[c] && !this.hasValidMoves(c)) {
                    this.eliminated[c] = true;
                }
            }
            const remaining = colors.filter(c => !this.eliminated[c]);
            if (remaining.length === 1) {
                this.gameOver = true;
                this.stopTimer();
                const winner = remaining[0].charAt(0).toUpperCase() + remaining[0].slice(1);
                document.getElementById('game-status').textContent = `Four-Player Chess! ${winner} wins!`;
                document.getElementById('game-status').style.color = '#4CAF50';
                document.getElementById('game-status').style.fontWeight = 'bold';
                this.updateReviewButtonVisibility();
                return;
            }
            if (remaining.length === 0) {
                this.gameOver = true;
                this.stopTimer();
                document.getElementById('game-status').textContent = 'Draw!';
                this.updateReviewButtonVisibility();
                return;
            }
            if (this.inCheck[this.currentPlayer]) {
                document.getElementById('game-status').textContent = 'Check!';
                document.getElementById('game-status').style.color = '#f44336';
                document.getElementById('game-status').style.fontWeight = 'bold';
            } else {
                document.getElementById('game-status').textContent = '';
                document.getElementById('game-status').style.color = '';
                document.getElementById('game-status').style.fontWeight = '';
            }
            this.updateGameInfo();
            return;
        }
        
        const mover = this.currentPlayer === 'white' ? 'black' : 'white';
        if (this.inCheck[this.currentPlayer]) this.checksGiven[mover]++;
        
        if (this.gameVariant === 'threeCheck') {
            if (this.checksGiven.white >= 3 || this.checksGiven.black >= 3) {
                const winner = this.checksGiven.white >= 3 ? 'White' : 'Black';
                this.gameOver = true;
                this.stopTimer();
                const winnerName = this.botMode && winner.toLowerCase() === (this.botColor === 'white' ? 'white' : 'black') ? this.botName : winner;
                document.getElementById('game-status').textContent = `3-Check! ${winnerName} wins!`;
                document.getElementById('game-status').style.color = '#4CAF50';
                document.getElementById('game-status').style.fontWeight = 'bold';
                this.updateReviewButtonVisibility();
                return;
            }
        }
        
        if (this.gameVariant === 'kingOfTheHill') {
            const center = this.boardRows() === 9 ? [[4, 4]] : [[3, 3], [3, 4], [4, 3], [4, 4]];
            for (const [r, c] of center) {
                if (r >= this.boardRows() || c >= this.boardCols()) continue;
                const p = this.board[r][c];
                if (p && p.type === 'king') {
                    this.gameOver = true;
                    this.stopTimer();
                    const winner = p.color.charAt(0).toUpperCase() + p.color.slice(1);
                    const winnerName = this.botMode && winner.toLowerCase() === (this.botColor === 'white' ? 'white' : 'black') ? this.botName : winner;
                    document.getElementById('game-status').textContent = `King of the Hill! ${winnerName} wins!`;
                    document.getElementById('game-status').style.color = '#4CAF50';
                    document.getElementById('game-status').style.fontWeight = 'bold';
                    this.updateReviewButtonVisibility();
                    return;
                }
            }
        }
        
        // Check if current player is in checkmate
        const currentPlayerInCheck = this.inCheck[this.currentPlayer];
        const currentPlayerHasValidMoves = this.hasValidMoves(this.currentPlayer);
        
        if (currentPlayerInCheck && !currentPlayerHasValidMoves) {
            // Checkmate!
            this.gameOver = true;
            this.stopTimer();
            const winner = this.currentPlayer === 'white' ? 'Black' : 'White';
            const winnerName = this.botMode && winner === (this.botColor === 'white' ? 'White' : 'Black') ? this.botName : winner;
            document.getElementById('game-status').textContent = `Checkmate! ${winnerName} wins!`;
            document.getElementById('game-status').style.color = '#4CAF50';
            document.getElementById('game-status').style.fontWeight = 'bold';
            console.log('Checkmate detected!', winner, 'wins');
            this.updateReviewButtonVisibility();
            return;
        }
        
        // Check if current player is in stalemate (no valid moves, not in check)
        if (!currentPlayerInCheck && !currentPlayerHasValidMoves) {
            this.gameOver = true;
            this.stopTimer();
            document.getElementById('game-status').textContent = 'Stalemate! It\'s a draw.';
            document.getElementById('game-status').style.color = '#FF9800';
            document.getElementById('game-status').style.fontWeight = 'bold';
            console.log('Stalemate detected!');
            this.updateReviewButtonVisibility();
            return;
        }
        
        // Check if current player is in check (but not checkmate)
        if (currentPlayerInCheck) {
            document.getElementById('game-status').textContent = 'Check!';
            document.getElementById('game-status').style.color = '#f44336';
            document.getElementById('game-status').style.fontWeight = 'bold';
        } else {
            document.getElementById('game-status').textContent = '';
            document.getElementById('game-status').style.color = '';
            document.getElementById('game-status').style.fontWeight = '';
        }
    }

    isKingInCheck(board, color) {
        const rows = board.length, cols = board[0]?.length || 8;
        let kingRow = -1, kingCol = -1;
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const piece = board[row][col];
                if (piece && piece.type === 'king' && piece.color === color) {
                    kingRow = row; kingCol = col; break;
                }
            }
            if (kingRow !== -1) break;
        }
        if (kingRow === -1) return false;
        const opponents = this.gameVariant === 'fourPlayer' 
            ? ['white', 'black', 'red', 'green'].filter(c => c !== color) 
            : [color === 'white' ? 'black' : 'white'];
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const piece = board[row][col];
                if (piece && opponents.includes(piece.color) && this.isValidPieceMoveForBoard(board, piece, row, col, kingRow, kingCol)) {
                    return true;
                }
            }
        }
        return false;
    }

    hasValidMoves(color) {
        const saved = this.currentPlayer;
        if (this.gameVariant === 'fourPlayer' && color !== this.currentPlayer) {
            this.currentPlayer = color;
        }
        let found = false;
        const rows = this.boardRows(), cols = this.boardCols();
        for (let fromRow = 0; fromRow < rows; fromRow++) {
            for (let fromCol = 0; fromCol < cols; fromCol++) {
                const piece = this.board[fromRow][fromCol];
                if (piece && piece.color === color) {
                    for (let toRow = 0; toRow < rows; toRow++) {
                        for (let toCol = 0; toCol < cols; toCol++) {
                            if (this.isValidMove(fromRow, fromCol, toRow, toCol)) {
                                found = true;
                                break;
                            }
                        }
                        if (found) break;
                    }
                }
                if (found) break;
            }
            if (found) break;
        }
        if (this.gameVariant === 'fourPlayer' && color !== saved) {
            this.currentPlayer = saved;
        }
        return found;
    }

    updateSquareStates() {
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => {
            square.classList.remove('selected', 'possible-move', 'possible-capture', 'check');
            
            const row = parseInt(square.dataset.row);
            const col = parseInt(square.dataset.col);
            const squareKey = `${row}-${col}`;
            
            // Highlight selected square
            if (this.selectedSquare === squareKey) {
                square.classList.add('selected');
                
                const [selectedRow, selectedCol] = this.selectedSquare.split('-').map(Number);
                const rows = this.boardRows(), cols = this.boardCols();
                for (let r = 0; r < rows; r++) {
                    for (let c = 0; c < cols; c++) {
                        if (this.isValidMove(selectedRow, selectedCol, r, c)) {
                            const targetSquare = document.querySelector(`[data-row="${r}"][data-col="${c}"]`);
                            if (targetSquare) {
                                if (this.board[r][c]) targetSquare.classList.add('possible-capture');
                                else targetSquare.classList.add('possible-move');
                            }
                        }
                    }
                }
            }
            
            // Highlight check
            const piece = this.board[row][col];
            if (piece && piece.type === 'king' && this.inCheck[piece.color]) {
                square.classList.add('check');
            }
        });
    }

    updateGameInfo() {
        const turnEl = document.getElementById('current-turn');
        if (!turnEl) return;
        if (!this.gameOver) {
            let playerName;
            if (this.botMode && this.currentPlayer === this.botColor) {
                playerName = this.botName;
            } else if (this.multiplayer && this.multiplayer.roomCode) {
                if (this.currentPlayer === 'white') {
                    playerName = this.multiplayer.isHost ? this.multiplayer.myName : this.multiplayer.opponentName;
                } else {
                    playerName = this.multiplayer.isHost ? this.multiplayer.opponentName : this.multiplayer.myName;
                }
                playerName = playerName || (this.currentPlayer === 'white' ? 'White' : 'Black');
            } else {
                const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
                playerName = cap(this.currentPlayer);
            }
            let text = `${playerName}'s Turn`;
            if (this.gameVariant === 'fourPlayer') {
                const out = this.FOUR_PLAYER_ORDER.filter(c => this.eliminated[c]).map(c => c.charAt(0).toUpperCase() + c.slice(1));
                if (out.length) text += ` · Out: ${out.join(', ')}`;
            }
            if (this.gameVariant === 'threeCheck') {
                text += ` · Checks: W ${this.checksGiven.white || 0} / B ${this.checksGiven.black || 0}`;
            }
            turnEl.textContent = text;
        }
        this.updatePlayerProfiles();
    }
    
    updatePlayerProfiles() {
        // Get white player name
        let whitePlayerName = 'White';
        let whitePlayerStatus = '';
        
        if (this.botMode && this.botColor === 'white') {
            whitePlayerName = this.botName;
            if (this.currentPlayer === 'white' && !this.gameOver) {
                whitePlayerStatus = 'thinking';
            }
        } else if (this.multiplayer && this.multiplayer.roomCode) {
            whitePlayerName = this.multiplayer.isHost ? this.multiplayer.myName : this.multiplayer.opponentName;
            whitePlayerName = whitePlayerName || 'White';
            whitePlayerStatus = 'online';
        } else {
            // Get from input field if available
            const whiteNameInput = document.getElementById('white-player-name');
            if (whiteNameInput && whiteNameInput.value.trim()) {
                whitePlayerName = whiteNameInput.value.trim();
            }
        }
        
        // Get black player name
        let blackPlayerName = 'Black';
        let blackPlayerStatus = '';
        
        if (this.botMode && this.botColor === 'black') {
            blackPlayerName = this.botName;
            if (this.currentPlayer === 'black' && !this.gameOver) {
                blackPlayerStatus = 'thinking';
            }
        } else if (this.multiplayer && this.multiplayer.roomCode) {
            blackPlayerName = this.multiplayer.isHost ? this.multiplayer.opponentName : this.multiplayer.myName;
            blackPlayerName = blackPlayerName || 'Black';
            blackPlayerStatus = 'online';
        } else {
            // Get from input field if available
            const blackNameInput = document.getElementById('black-player-name');
            if (blackNameInput && blackNameInput.value.trim()) {
                blackPlayerName = blackNameInput.value.trim();
            }
        }
        
        // Update white player profile
        const whiteProfileName = document.getElementById('white-player-profile');
        const whiteProfileStatus = document.getElementById('white-player-status');
        const whiteProfileCard = document.querySelector('.white-profile');
        const whiteProfileAvatar = whiteProfileCard?.querySelector('.profile-avatar');
        
        if (whiteProfileName) {
            whiteProfileName.textContent = whitePlayerName;
        }
        
        // Update white player avatar with profile picture
        if (whiteProfileAvatar) {
            const savedWhitePic = localStorage.getItem('whitePlayerProfilePic');
            if (savedWhitePic) {
                const existingImg = whiteProfileAvatar.querySelector('img');
                if (existingImg) {
                    existingImg.src = savedWhitePic;
                } else {
                    const icon = whiteProfileAvatar.querySelector('.avatar-icon');
                    if (icon) {
                        const img = document.createElement('img');
                        img.src = savedWhitePic;
                        img.style.width = '100%';
                        img.style.height = '100%';
                        img.style.objectFit = 'cover';
                        img.style.borderRadius = '50%';
                        icon.replaceWith(img);
                    }
                }
            } else {
                // Use default icon if no picture
                if (!whiteProfileAvatar.querySelector('.avatar-icon') && !whiteProfileAvatar.querySelector('img')) {
                    const icon = document.createElement('span');
                    icon.className = 'avatar-icon';
                    icon.textContent = 'â™”';
                    whiteProfileAvatar.appendChild(icon);
                }
            }
        }
        
        if (whiteProfileStatus) {
            whiteProfileStatus.textContent = '';
            whiteProfileStatus.className = 'profile-status';
            
            if (whitePlayerStatus === 'thinking') {
                whiteProfileStatus.textContent = 'Thinking...';
                whiteProfileStatus.classList.add('thinking');
            } else if (whitePlayerStatus === 'online') {
                whiteProfileStatus.textContent = 'Online';
                whiteProfileStatus.classList.add('online');
            } else if (this.currentPlayer === 'white' && !this.gameOver) {
                whiteProfileStatus.textContent = 'Your Turn';
                whiteProfileStatus.classList.add('online');
            } else if (this.gameOver) {
                whiteProfileStatus.textContent = 'Game Over';
            } else {
                whiteProfileStatus.textContent = 'Waiting';
                whiteProfileStatus.classList.add('waiting');
            }
        }
        
        if (whiteProfileCard) {
            if (this.currentPlayer === 'white' && !this.gameOver) {
                whiteProfileCard.classList.add('active');
            } else {
                whiteProfileCard.classList.remove('active');
            }
        }
        
        // Update black player profile
        const blackProfileName = document.getElementById('black-player-profile');
        const blackProfileStatus = document.getElementById('black-player-status');
        const blackProfileCard = document.querySelector('.black-profile');
        const blackProfileAvatar = blackProfileCard?.querySelector('.profile-avatar');
        
        if (blackProfileName) {
            blackProfileName.textContent = blackPlayerName;
        }
        
        // Update black player avatar with profile picture
        if (blackProfileAvatar) {
            const savedBlackPic = localStorage.getItem('blackPlayerProfilePic');
            if (savedBlackPic) {
                const existingImg = blackProfileAvatar.querySelector('img');
                if (existingImg) {
                    existingImg.src = savedBlackPic;
                } else {
                    const img = document.createElement('img');
                    img.src = savedBlackPic;
                    img.style.width = '100%';
                    img.style.height = '100%';
                    img.style.objectFit = 'cover';
                    img.style.borderRadius = '50%';
                    blackProfileAvatar.innerHTML = '';
                    blackProfileAvatar.appendChild(img);
                }
            } else {
                // Use default icon if no picture
                if (!blackProfileAvatar.querySelector('.avatar-icon')) {
                    const icon = document.createElement('span');
                    icon.className = 'avatar-icon';
                    icon.textContent = 'â™š';
                    blackProfileAvatar.innerHTML = '';
                    blackProfileAvatar.appendChild(icon);
                }
            }
        }
        
        if (blackProfileStatus) {
            blackProfileStatus.textContent = '';
            blackProfileStatus.className = 'profile-status';
            
            if (blackPlayerStatus === 'thinking') {
                blackProfileStatus.textContent = 'Thinking...';
                blackProfileStatus.classList.add('thinking');
            } else if (blackPlayerStatus === 'online') {
                blackProfileStatus.textContent = 'Online';
                blackProfileStatus.classList.add('online');
            } else if (this.currentPlayer === 'black' && !this.gameOver) {
                blackProfileStatus.textContent = 'Your Turn';
                blackProfileStatus.classList.add('online');
            } else if (this.gameOver) {
                blackProfileStatus.textContent = 'Game Over';
            } else {
                blackProfileStatus.textContent = 'Waiting';
                blackProfileStatus.classList.add('waiting');
            }
        }
        
        if (blackProfileCard) {
            if (this.currentPlayer === 'black' && !this.gameOver) {
                blackProfileCard.classList.add('active');
            } else {
                blackProfileCard.classList.remove('active');
            }
        }
    }
    
    updateTimerProfilePics() {
        // Update white timer profile picture
        const whiteTimerProfilePic = document.getElementById('white-timer-profile-pic');
        if (whiteTimerProfilePic) {
            const savedWhitePic = localStorage.getItem('whitePlayerProfilePic');
            if (savedWhitePic) {
                const existingImg = whiteTimerProfilePic.querySelector('img');
                if (existingImg) {
                    existingImg.src = savedWhitePic;
                } else {
                    // Remove icon if exists and add image
                    whiteTimerProfilePic.innerHTML = '';
                    const img = document.createElement('img');
                    img.src = savedWhitePic;
                    img.style.width = '100%';
                    img.style.height = '100%';
                    img.style.objectFit = 'cover';
                    img.style.borderRadius = '50%';
                    whiteTimerProfilePic.appendChild(img);
                }
            } else {
                // Use default icon if no picture
                if (!whiteTimerProfilePic.querySelector('.timer-profile-icon') && !whiteTimerProfilePic.querySelector('img')) {
                    whiteTimerProfilePic.innerHTML = '';
                    const icon = document.createElement('span');
                    icon.className = 'timer-profile-icon';
                    icon.textContent = 'â™”';
                    whiteTimerProfilePic.appendChild(icon);
                }
            }
        }
        
        // Update black timer profile picture
        const blackTimerProfilePic = document.getElementById('black-timer-profile-pic');
        if (blackTimerProfilePic) {
            const savedBlackPic = localStorage.getItem('blackPlayerProfilePic');
            if (savedBlackPic) {
                const existingImg = blackTimerProfilePic.querySelector('img');
                if (existingImg) {
                    existingImg.src = savedBlackPic;
                } else {
                    // Remove icon if exists and add image
                    blackTimerProfilePic.innerHTML = '';
                    const img = document.createElement('img');
                    img.src = savedBlackPic;
                    img.style.width = '100%';
                    img.style.height = '100%';
                    img.style.objectFit = 'cover';
                    img.style.borderRadius = '50%';
                    blackTimerProfilePic.appendChild(img);
                }
            } else {
                // Use default icon if no picture
                if (!blackTimerProfilePic.querySelector('.timer-profile-icon') && !blackTimerProfilePic.querySelector('img')) {
                    blackTimerProfilePic.innerHTML = '';
                    const icon = document.createElement('span');
                    icon.className = 'timer-profile-icon';
                    icon.textContent = 'â™š';
                    blackTimerProfilePic.appendChild(icon);
                }
            }
        }
    }
    
    getBotDepth() {
        // Map difficulty to minimax depth
        const depthMap = {
            'easy': 1,      // Very fast, makes decent moves
            'medium': 2,    // Fast, makes good moves (default)
            'hard': 3,      // Slower, makes strong moves
            'expert': 4     // Slowest, makes very strong moves
        };
        return depthMap[this.botDifficulty] || 2;
    }
    
    getMaxTimeForDifficulty() {
        // Map difficulty to max calculation time (ms)
        const timeMap = {
            'easy': 400,    // 400ms for quick play
            'medium': 800,  // 800ms for balanced play
            'hard': 1500,   // 1.5s for stronger moves
            'expert': 3000  // 3s for expert level
        };
        return timeMap[this.botDifficulty] || 800;
    }
    
    getMovesToSearchCount() {
        // Map difficulty to number of moves to evaluate
        const movesMap = {
            'easy': 8,      // Check fewer moves for speed
            'medium': 12,   // Balanced
            'hard': 20,     // Check more moves
            'expert': 30    // Check many moves for best play
        };
        return movesMap[this.botDifficulty] || 12;
    }
    
    toggleBotMode() {
        console.log('toggleBotMode called, current botMode:', this.botMode);
        this.botMode = !this.botMode;
        const botBtn = document.getElementById('play-bot-btn');
        
        if (!botBtn) {
            console.error('Play Bot button not found in toggleBotMode!');
            return;
        }
        
        if (this.botMode) {
            botBtn.textContent = 'Stop Bot';
            botBtn.classList.add('active');
            const difficultyNames = {
                'easy': 'Easy',
                'medium': 'Medium',
                'hard': 'Hard',
                'expert': 'Expert'
            };
            const botColorName = this.botColor === 'white' ? 'White' : 'Black';
            document.getElementById('game-status').textContent = `Bot mode enabled! ${this.botName} plays as ${botColorName} (${difficultyNames[this.botDifficulty]} level).`;
            setTimeout(() => {
                document.getElementById('game-status').textContent = '';
            }, 3000);
            
            console.log('Bot mode enabled. Game state:', {
                gameStarted: this.gameStarted,
                gameOver: this.gameOver,
                currentPlayer: this.currentPlayer,
                botColor: this.botColor
            });
            
            // If game is started and it's bot's turn, make bot move
            if (this.gameStarted && !this.gameOver && this.currentPlayer === this.botColor) {
                console.log('Game already started, making bot move');
                setTimeout(() => {
                    this.makeBotMove();
                }, 100); // Fast response
            }
        } else {
            botBtn.textContent = 'Play Bot';
            botBtn.classList.remove('active');
            document.getElementById('game-status').textContent = 'Bot mode disabled.';
            setTimeout(() => {
                document.getElementById('game-status').textContent = '';
            }, 2000);
        }
        // Update player profiles when bot mode is toggled
        this.updatePlayerProfiles();
    }
    
    getAllValidMoves(color) {
        const validMoves = [];
        const rows = this.boardRows(), cols = this.boardCols();
        for (let fromRow = 0; fromRow < rows; fromRow++) {
            for (let fromCol = 0; fromCol < cols; fromCol++) {
                const piece = this.board[fromRow][fromCol];
                if (piece && piece.color === color) {
                    for (let toRow = 0; toRow < rows; toRow++) {
                        for (let toCol = 0; toCol < cols; toCol++) {
                            if (this.isValidMove(fromRow, fromCol, toRow, toCol)) {
                                validMoves.push({ fromRow, fromCol, toRow, toCol, piece });
                            }
                        }
                    }
                }
            }
        }
        return validMoves;
    }
    
    countMaterial(board) {
        const rows = board.length, cols = board[0]?.length || 8;
        let count = 0;
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const piece = board[row][col];
                if (piece && piece.type !== 'king') count++;
            }
        }
        return count;
    }
    
    evaluatePosition(board, color) {
        // Piece values (standard chess piece values)
        const pieceValues = {
            'pawn': 100,
            'knight': 320,
            'bishop': 330,
            'rook': 500,
            'queen': 900,
            'king': 20000
        };
        
        let score = 0;
        const opponentColor = color === 'white' ? 'black' : 'white';
        const rows = board.length, cols = board[0]?.length || 8;
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const piece = board[row][col];
                if (piece) {
                    const value = pieceValues[piece.type] || 0;
                    if (piece.color === color) {
                        score += value;
                    } else {
                        score -= value;
                    }
                    
                    // Fast positional evaluation (simplified for speed)
                    if (piece.type === 'pawn') {
                        // Pawn advancement bonus
                        const advancement = piece.color === 'white' ? (7 - row) : row;
                        score += piece.color === color ? advancement * 8 : -advancement * 8;
                        // Skip passed pawn check for speed
                    } else if (piece.type === 'knight') {
                        // Center control for knights
                        const centerDistance = Math.abs(row - 3.5) + Math.abs(col - 3.5);
                        score += piece.color === color ? (7 - centerDistance) * 5 : -(7 - centerDistance) * 5;
                        // Skip outpost check for speed
                    } else if (piece.type === 'bishop') {
                        // Center control
                        const centerDistance = Math.abs(row - 3.5) + Math.abs(col - 3.5);
                        score += piece.color === color ? (7 - centerDistance) * 4 : -(7 - centerDistance) * 4;
                        // Long diagonal bonus
                        if (row === col || row + col === 7) {
                            score += piece.color === color ? 10 : -10;
                        }
                    } else if (piece.type === 'rook') {
                        // Rooks on 7th/2nd rank
                        if ((piece.color === 'white' && row === 1) || (piece.color === 'black' && row === 6)) {
                            score += piece.color === color ? 25 : -25;
                        }
                        // Skip open file check for speed
                    } else if (piece.type === 'queen') {
                        // Center control for queen
                        const centerDistance = Math.abs(row - 3.5) + Math.abs(col - 3.5);
                        score += piece.color === color ? (7 - centerDistance) * 2 : -(7 - centerDistance) * 2;
                    }
                }
            }
        }
        
        let kingRow = -1, kingCol = -1;
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const piece = board[row][col];
                if (piece && piece.type === 'king' && piece.color === color) {
                    kingRow = row; kingCol = col; break;
                }
            }
            if (kingRow !== -1) break;
        }
        if (kingRow !== -1) {
            let defenders = 0;
            for (let row = Math.max(0, kingRow - 1); row <= Math.min(rows - 1, kingRow + 1); row++) {
                for (let col = Math.max(0, kingCol - 1); col <= Math.min(cols - 1, kingCol + 1); col++) {
                    const p = board[row][col];
                    if (p && p.color === color && p.type !== 'king') {
                        defenders++;
                    }
                }
            }
            score += defenders * 8;
            
            // Penalize exposed king
            const expectedKingRow = color === 'white' ? 7 : 0;
            if (Math.abs(kingRow - expectedKingRow) < 2) {
                score -= 30;
            }
        }
        
        // Check/checkmate detection
        if (this.isKingInCheck(board, color)) {
            score -= 150;
        }
        if (this.isKingInCheck(board, opponentColor)) {
            score += 150;
        }
        
        // Skip expensive mobility calculation for speed - use simpler heuristic
        // Only calculate if we have time (depth 0 means we're at leaf, can skip)
        // For now, skip mobility to keep it fast
        
        return score;
    }
    
    isPassedPawn(board, row, col, color) {
        const direction = color === 'white' ? -1 : 1;
        const startRow = color === 'white' ? row - 1 : row + 1;
        const endRow = color === 'white' ? 0 : 7;
        
        for (let r = startRow; r !== endRow; r += direction) {
            for (let c = Math.max(0, col - 1); c <= Math.min(7, col + 1); c++) {
                const piece = board[r][c];
                if (piece && piece.type === 'pawn' && piece.color !== color) {
                    return false;
                }
            }
        }
        return true;
    }
    
    isKnightOutpost(board, row, col, color) {
        // Check if square can be attacked by enemy pawns
        const opponentColor = color === 'white' ? 'black' : 'white';
        const pawnDirection = opponentColor === 'white' ? -1 : 1;
        const pawnRow = row + pawnDirection;
        
        if (pawnRow >= 0 && pawnRow < 8) {
            if (col > 0 && board[pawnRow][col - 1]?.type === 'pawn' && board[pawnRow][col - 1]?.color === opponentColor) {
                return false;
            }
            if (col < 7 && board[pawnRow][col + 1]?.type === 'pawn' && board[pawnRow][col + 1]?.color === opponentColor) {
                return false;
            }
        }
        return true;
    }
    
    isOpenFile(board, col, color) {
        // Check if file has no pawns of either color
        for (let row = 0; row < 8; row++) {
            const piece = board[row][col];
            if (piece && piece.type === 'pawn') {
                return false;
            }
        }
        return true;
    }
    
    minimax(board, depth, alpha, beta, maximizingPlayer, color) {
        // Terminal conditions
        if (depth === 0) {
            return this.evaluatePosition(board, color);
        }
        
        const currentColor = maximizingPlayer ? color : (color === 'white' ? 'black' : 'white');
        const validMoves = this.getAllValidMovesForBoard(board, currentColor);
        
        if (validMoves.length === 0) {
            // Checkmate or stalemate
            if (this.isKingInCheck(board, currentColor)) {
                return maximizingPlayer ? -100000 : 100000; // Checkmate
            }
            return 0; // Stalemate
        }
        
        if (maximizingPlayer) {
            let maxEval = -Infinity;
            for (const move of validMoves) {
                const newBoard = this.makeMoveOnBoard(board, move);
                const moveEval = this.minimax(newBoard, depth - 1, alpha, beta, false, color);
                maxEval = Math.max(maxEval, moveEval);
                alpha = Math.max(alpha, moveEval);
                if (beta <= alpha) {
                    break; // Alpha-beta pruning
                }
            }
            return maxEval;
        } else {
            let minEval = Infinity;
            for (const move of validMoves) {
                const newBoard = this.makeMoveOnBoard(board, move);
                const moveEval = this.minimax(newBoard, depth - 1, alpha, beta, true, color);
                minEval = Math.min(minEval, moveEval);
                beta = Math.min(beta, moveEval);
                if (beta <= alpha) {
                    break; // Alpha-beta pruning
                }
            }
            return minEval;
        }
    }
    
    getAllValidMovesForBoard(board, color) {
        const validMoves = [];
        const rows = board.length, cols = board[0]?.length || 8;
        for (let fromRow = 0; fromRow < rows; fromRow++) {
            for (let fromCol = 0; fromCol < cols; fromCol++) {
                const piece = board[fromRow][fromCol];
                if (piece && piece.color === color) {
                    for (let toRow = 0; toRow < rows; toRow++) {
                        for (let toCol = 0; toCol < cols; toCol++) {
                            if (this.isValidMoveForBoard(board, fromRow, fromCol, toRow, toCol, color)) {
                                validMoves.push({ fromRow, fromCol, toRow, toCol, piece });
                            }
                        }
                    }
                }
            }
        }
        return validMoves;
    }
    
    isValidMoveForBoard(board, fromRow, fromCol, toRow, toCol, color) {
        const piece = board[fromRow][fromCol];
        if (!piece || piece.color !== color) return false;
        
        const targetPiece = board[toRow][toCol];
        if (targetPiece && targetPiece.color === piece.color) return false;
        
        // Check if move is valid for the piece type (using board parameter)
        if (!this.isValidPieceMoveForBoard(board, piece, fromRow, fromCol, toRow, toCol)) {
            return false;
        }
        
        // Check if path is clear (for pieces that need it)
        if (!this.isPathClearForBoard(board, fromRow, fromCol, toRow, toCol)) {
            return false;
        }
        
        // Check if move would put own king in check
        const testBoard = this.cloneBoardFromBoard(board);
        testBoard[toRow][toCol] = testBoard[fromRow][fromCol];
        testBoard[fromRow][fromCol] = null;
        
        if (this.isKingInCheck(testBoard, color)) {
            return false;
        }
        
        return true;
    }
    
    isValidPieceMoveForBoard(board, piece, fromRow, fromCol, toRow, toCol) {
        const rowDiff = toRow - fromRow;
        const colDiff = toCol - fromCol;
        
        switch (piece.type) {
            case 'pawn':
                return this.isValidPawnMoveForBoard(board, piece, fromRow, fromCol, toRow, toCol);
            case 'rook':
                return this.isValidRookMoveForBoard(board, fromRow, fromCol, toRow, toCol);
            case 'knight':
                return (Math.abs(rowDiff) === 2 && Math.abs(colDiff) === 1) ||
                       (Math.abs(rowDiff) === 1 && Math.abs(colDiff) === 2);
            case 'bishop':
                return this.isValidBishopMoveForBoard(board, fromRow, fromCol, toRow, toCol);
            case 'queen':
                return this.isValidRookMoveForBoard(board, fromRow, fromCol, toRow, toCol) ||
                       this.isValidBishopMoveForBoard(board, fromRow, fromCol, toRow, toCol);
            case 'king':
                return Math.abs(rowDiff) <= 1 && Math.abs(colDiff) <= 1;
            default:
                return false;
        }
    }
    
    isValidPawnMoveForBoard(board, piece, fromRow, fromCol, toRow, toCol) {
        const rows = board.length, cols = board[0]?.length || 8;
        const rowDiff = toRow - fromRow, colDiff = toCol - fromCol;
        const targetPiece = board[toRow][toCol];
        if (rows === 9 && ['red', 'white', 'green', 'black'].includes(piece.color)) {
            if (piece.color === 'red') {
                if (colDiff === 0 && !targetPiece) { if (rowDiff === 1) return true; if (fromRow === 1 && rowDiff === 2 && !board[2][fromCol]) return true; }
                if (Math.abs(colDiff) === 1 && rowDiff === 1 && targetPiece && targetPiece.color !== 'red') return true;
                return false;
            }
            if (piece.color === 'white') {
                if (colDiff === 0 && !targetPiece) { if (rowDiff === -1) return true; if (fromRow === 7 && rowDiff === -2 && !board[6][fromCol]) return true; }
                if (Math.abs(colDiff) === 1 && rowDiff === -1 && targetPiece && targetPiece.color !== 'white') return true;
                return false;
            }
            if (piece.color === 'green') {
                if (rowDiff === 0 && !targetPiece) { if (colDiff === 1) return true; if (fromCol === 1 && colDiff === 2 && !board[fromRow][2]) return true; }
                if (Math.abs(rowDiff) === 1 && colDiff === 1 && targetPiece && targetPiece.color !== 'green') return true;
                return false;
            }
            if (piece.color === 'black') {
                if (rowDiff === 0 && !targetPiece) { if (colDiff === -1) return true; if (fromCol === 7 && colDiff === -2 && !board[fromRow][6]) return true; }
                if (Math.abs(rowDiff) === 1 && colDiff === -1 && targetPiece && targetPiece.color !== 'black') return true;
                return false;
            }
        }
        const direction = piece.color === 'white' ? -1 : 1;
        const startRow = piece.color === 'white' ? 6 : 1;
        if (colDiff === 0 && !targetPiece) {
            if (rowDiff === direction) return true;
            if (fromRow === startRow && rowDiff === 2 * direction && !board[fromRow + direction][fromCol]) {
                return true;
            }
        }
        
        // Capture move
        if (Math.abs(colDiff) === 1 && rowDiff === direction && targetPiece && targetPiece.color !== piece.color) {
            return true;
        }
        
        return false;
    }
    
    isValidRookMoveForBoard(board, fromRow, fromCol, toRow, toCol) {
        if (fromRow !== toRow && fromCol !== toCol) return false;
        return this.isPathClearForBoard(board, fromRow, fromCol, toRow, toCol);
    }
    
    isValidBishopMoveForBoard(board, fromRow, fromCol, toRow, toCol) {
        if (Math.abs(toRow - fromRow) !== Math.abs(toCol - fromCol)) return false;
        return this.isPathClearForBoard(board, fromRow, fromCol, toRow, toCol);
    }
    
    isPathClearForBoard(board, fromRow, fromCol, toRow, toCol) {
        const rowDiff = toRow - fromRow;
        const colDiff = toCol - fromCol;
        const piece = board[fromRow][fromCol];
        
        // Knights can jump, so path is always clear
        if (piece && piece.type === 'knight') {
            return true;
        }
        
        // Determine direction
        const rowStep = rowDiff === 0 ? 0 : (rowDiff > 0 ? 1 : -1);
        const colStep = colDiff === 0 ? 0 : (colDiff > 0 ? 1 : -1);
        
        // Check each square along the path (excluding start and end)
        let currentRow = fromRow + rowStep;
        let currentCol = fromCol + colStep;
        
        while (currentRow !== toRow || currentCol !== toCol) {
            if (board[currentRow][currentCol] !== null) {
                return false; // Path is blocked
            }
            currentRow += rowStep;
            currentCol += colStep;
        }
        
        return true;
    }
    
    makeMoveOnBoard(board, move) {
        const newBoard = this.cloneBoardFromBoard(board);
        const piece = newBoard[move.fromRow][move.fromCol];
        
        // Handle castling
        if (piece && piece.type === 'king' && Math.abs(move.toCol - move.fromCol) === 2 && move.fromRow === move.toRow) {
            const isKingSide = move.toCol > move.fromCol;
            const rookCol = isKingSide ? 7 : 0;
            const newRookCol = isKingSide ? 5 : 3;
            
            // Move king
            newBoard[move.toRow][move.toCol] = piece;
            newBoard[move.fromRow][move.fromCol] = null;
            
            // Move rook
            const rook = newBoard[move.fromRow][rookCol];
            if (rook && rook.type === 'rook') {
                newBoard[move.fromRow][newRookCol] = rook;
                newBoard[move.fromRow][rookCol] = null;
            }
        } else {
            // Regular move
            newBoard[move.toRow][move.toCol] = newBoard[move.fromRow][move.fromCol];
            newBoard[move.fromRow][move.fromCol] = null;
            
            // Handle pawn promotion
            const movedPiece = newBoard[move.toRow][move.toCol];
            if (movedPiece && movedPiece.type === 'pawn' && (move.toRow === 0 || move.toRow === 7)) {
                movedPiece.type = 'queen';
            }
        }
        
        return newBoard;
    }
    
    cloneBoardFromBoard(board) {
        return board.map(row => row.map(cell => cell ? { ...cell } : null));
    }
    
    makeBotMove() {
        console.log('=== BOT MOVE ATTEMPT ===', {
            botMode: this.botMode,
            gameOver: this.gameOver,
            currentPlayer: this.currentPlayer,
            botColor: this.botColor,
            gameStarted: this.gameStarted
        });
        
        if (!this.botMode) {
            console.log('Bot move cancelled - bot mode not enabled');
            return;
        }
        
        if (this.gameOver) {
            console.log('Bot move cancelled - game is over');
            return;
        }
        
        if (this.currentPlayer !== this.botColor) {
            console.log('Bot move cancelled - not bot\'s turn. Current:', this.currentPlayer, 'Bot:', this.botColor);
            return;
        }
        
        // Note: We allow bot to play even if game hasn't been "started" via button
        // as long as bot mode is enabled
        
        const validMoves = this.getAllValidMoves(this.botColor);
        console.log('Valid moves found:', validMoves.length);
        
        if (validMoves.length === 0) {
            console.log('No valid moves for bot - game might be over');
            return;
        }
        
        // Get depth based on difficulty level
        const depth = this.getBotDepth();
        const maxTime = this.getMaxTimeForDifficulty();
        
        // Use minimax with alpha-beta pruning - optimized for speed
        console.log(`Bot using minimax search (depth ${depth}, difficulty: ${this.botDifficulty}) from`, validMoves.length, 'valid moves...');
        
        let bestMove = null;
        let bestValue = -Infinity;
        const startTime = Date.now();
        
        try {
            // Quick pre-scoring to order moves (captures first, then center moves)
            const quickScored = validMoves.map(move => {
                let quickScore = 0;
                const targetPiece = this.board[move.toRow][move.toCol];
                if (targetPiece) {
                    const pieceValues = { 'pawn': 100, 'knight': 320, 'bishop': 330, 'rook': 500, 'queen': 900 };
                    quickScore += pieceValues[targetPiece.type] || 0;
                }
                const centerDistance = Math.abs(move.toRow - 3.5) + Math.abs(move.toCol - 3.5);
                quickScore += (7 - centerDistance) * 2;
                return { move, quickScore };
            });
            
            // Sort by quick score - adjust number of moves based on difficulty
            quickScored.sort((a, b) => b.quickScore - a.quickScore);
            const movesToSearchCount = this.getMovesToSearchCount();
            const movesToSearch = quickScored.slice(0, Math.min(movesToSearchCount, quickScored.length));
            
            // Use minimax with depth based on difficulty
            for (const { move } of movesToSearch) {
                // Check time limit
                if (Date.now() - startTime > maxTime) {
                    console.log('Time limit reached, using best move so far');
                    break;
                }
                
                try {
                    const testBoard = this.makeMoveOnBoard(this.board, move);
                    const moveValue = this.minimax(testBoard, depth, -Infinity, Infinity, false, this.botColor);
                    
                    if (moveValue > bestValue) {
                        bestValue = moveValue;
                        bestMove = move;
                    }
                    
                    // Early exit if we find a very good move (checkmate or winning capture)
                    if (moveValue > 5000) {
                        console.log('Found excellent move, using it immediately');
                        break;
                    }
                } catch (e) {
                    console.warn('Error evaluating move with minimax:', e, move);
                }
            }
            
            if (bestMove) {
                console.log('Bot selected best minimax move:', bestMove, 'value:', bestValue, 'time:', Date.now() - startTime, 'ms');
            }
        } catch (error) {
            console.error('Error in minimax search:', error);
        }
        
        // Fallback to quick evaluation if minimax failed or found no move
        if (!bestMove && validMoves.length > 0) {
            console.log('Minimax found no move, using quick evaluation fallback');
            const scoredMoves = validMoves.map(move => {
                let score = 0;
                const targetPiece = this.board[move.toRow][move.toCol];
                if (targetPiece) {
                    const pieceValues = { 'pawn': 100, 'knight': 320, 'bishop': 330, 'rook': 500, 'queen': 900 };
                    score += pieceValues[targetPiece.type] || 0;
                }
                const centerDistance = Math.abs(move.toRow - 3.5) + Math.abs(move.toCol - 3.5);
                score += (7 - centerDistance) * 2;
                return { move, score };
            });
            scoredMoves.sort((a, b) => b.score - a.score);
            bestMove = scoredMoves[0].move;
            console.log('Bot using quick evaluation fallback:', bestMove);
        }
        
        if (!bestMove) {
            console.error('Bot has no valid moves!');
            return;
        }
        
        console.log('Bot selected move:', bestMove);
        
        // Ensure we have a valid move
        if (!bestMove || bestMove.fromRow === undefined || bestMove.fromCol === undefined || 
            bestMove.toRow === undefined || bestMove.toCol === undefined) {
            if (validMoves.length > 0) {
                bestMove = validMoves[0];
                console.log('Using first valid move as fallback:', bestMove);
            } else {
                console.error('No valid moves available!');
                return;
            }
        }
        
        // Execute the move immediately - ensure it happens
        console.log('=== EXECUTING BOT MOVE ===', bestMove);
        
        // Double-check move is still valid (board state might have changed)
        if (!this.isValidMove(bestMove.fromRow, bestMove.fromCol, bestMove.toRow, bestMove.toCol)) {
            console.warn('Selected move is no longer valid, trying first valid move');
            if (validMoves.length > 0) {
                bestMove = validMoves[0];
                console.log('Using first valid move:', bestMove);
            } else {
                console.error('No valid moves available!');
                return;
            }
        }
        
        // Execute the move immediately - no nested setTimeout
        try {
            console.log('=== EXECUTING BOT MOVE NOW ===', {
                from: [bestMove.fromRow, bestMove.fromCol],
                to: [bestMove.toRow, bestMove.toCol],
                piece: this.board[bestMove.fromRow]?.[bestMove.fromCol]
            });
            
            // Final validation before executing
            if (!this.isValidMove(bestMove.fromRow, bestMove.fromCol, bestMove.toRow, bestMove.toCol)) {
                console.warn('âš ï¸ Selected move failed validation, trying first valid move');
                if (validMoves.length > 0) {
                    bestMove = validMoves[0];
                    console.log('Using first valid move:', bestMove);
                } else {
                    console.error('âŒ No valid moves available!');
                    return;
                }
            }
            
            // Execute the move directly
            this.makeMove(bestMove.fromRow, bestMove.fromCol, bestMove.toRow, bestMove.toCol);
            
            console.log('âœ…âœ…âœ… BOT MOVE EXECUTED SUCCESSFULLY! âœ…âœ…âœ…');
        } catch (error) {
            console.error('âŒâŒâŒ CRITICAL ERROR making bot move:', error);
            console.error('Move that failed:', bestMove);
            console.error('Error message:', error.message);
            if (error.stack) {
                console.error('Stack trace:', error.stack);
            }
            
            // Last resort - try first valid move
            if (validMoves.length > 0) {
                const fallbackMove = validMoves[0];
                console.log('ðŸ”„ Trying fallback move:', fallbackMove);
                try {
                    // Re-validate fallback move
                    if (this.isValidMove(fallbackMove.fromRow, fallbackMove.fromCol, fallbackMove.toRow, fallbackMove.toCol)) {
                        this.makeMove(fallbackMove.fromRow, fallbackMove.fromCol, fallbackMove.toRow, fallbackMove.toCol);
                        console.log('âœ… Fallback move executed successfully');
                    } else {
                        console.error('âŒ Fallback move is also invalid');
                    }
                } catch (fallbackError) {
                    console.error('âŒ Fallback move also failed:', fallbackError);
                }
            }
        }
    }

    updateMoveHistory() {
        const moveList = document.getElementById('move-list');
        moveList.innerHTML = '';
        
        this.moveHistory.forEach((move, index) => {
            const moveItem = document.createElement('div');
            moveItem.className = 'move-item';
            moveItem.textContent = `${Math.floor(index / 2) + 1}. ${move.move}`;
            moveList.appendChild(moveItem);
        });
        
        moveList.scrollTop = moveList.scrollHeight;
        
        // Save board position for review
        this.saveBoardPosition();
        
        // Show review button if game is over
        this.updateReviewButtonVisibility();
    }
    
    // ========== REVIEW MODE ==========
    saveBoardPosition() {
        // Deep copy the current board state
        const boardCopy = this.board.map(row => 
            row.map(piece => piece ? { ...piece } : null)
        );
        this.boardHistory.push(boardCopy);
    }
    
    updateReviewButtonVisibility() {
        const reviewBtn = document.getElementById('review-btn');
        if (reviewBtn) {
            if (this.gameOver && this.moveHistory.length > 0) {
                reviewBtn.style.display = 'block';
            } else {
                reviewBtn.style.display = 'none';
            }
        }
    }
    
    enterReviewMode() {
        if (!this.gameOver || this.moveHistory.length === 0) return;
        
        this.reviewMode = true;
        this.reviewMoveIndex = this.boardHistory.length - 1; // Start at final position
        
        // Save current board state
        this.savedBoardState = this.board.map(row => 
            row.map(piece => piece ? { ...piece } : null)
        );
        
        // Show review controls, hide game controls
        document.getElementById('review-controls').style.display = 'block';
        document.getElementById('review-btn').style.display = 'none';
        document.getElementById('start-game-btn').style.display = 'none';
        document.getElementById('draw-btn').style.display = 'none';
        document.getElementById('resign-btn').style.display = 'none';
        
        this.updateReviewDisplay();
        document.getElementById('game-status').textContent = 'ðŸ“– Review Mode';
        document.getElementById('game-status').style.color = '#667eea';
    }
    
    exitReviewMode() {
        this.reviewMode = false;
        
        // Restore the final board state
        if (this.savedBoardState) {
            this.board = this.savedBoardState;
            this.savedBoardState = null;
        }
        
        // Hide review controls, show game controls
        document.getElementById('review-controls').style.display = 'none';
        document.getElementById('review-btn').style.display = 'block';
        document.getElementById('start-game-btn').style.display = 'block';
        document.getElementById('draw-btn').style.display = 'block';
        document.getElementById('resign-btn').style.display = 'block';
        
        this.renderBoard();
        this.updateGameInfo();
    }
    
    reviewGoToMove(index) {
        if (index < 0) index = 0;
        if (index >= this.boardHistory.length) index = this.boardHistory.length - 1;
        
        this.reviewMoveIndex = index;
        
        // Set board to the saved position
        this.board = this.boardHistory[index].map(row => 
            row.map(piece => piece ? { ...piece } : null)
        );
        
        this.renderBoard();
        this.updateReviewDisplay();
    }
    
    reviewPrevMove() {
        if (this.reviewMoveIndex > 0) {
            this.reviewGoToMove(this.reviewMoveIndex - 1);
        }
    }
    
    reviewNextMove() {
        if (this.reviewMoveIndex < this.boardHistory.length - 1) {
            this.reviewGoToMove(this.reviewMoveIndex + 1);
        }
    }
    
    reviewGoToStart() {
        this.reviewGoToMove(0);
    }
    
    reviewGoToEnd() {
        this.reviewGoToMove(this.boardHistory.length - 1);
    }
    
    updateReviewDisplay() {
        const moveDisplay = document.getElementById('review-move-display');
        const moveInfo = document.getElementById('review-move-info');
        
        // Move 0 is the initial position, so move index 1 = move 1
        const moveNum = this.reviewMoveIndex;
        const totalMoves = this.boardHistory.length - 1;
        
        moveDisplay.textContent = `Move ${moveNum}/${totalMoves}`;
        
        // Show the move that led to this position
        if (moveNum > 0 && this.moveHistory[moveNum - 1]) {
            const move = this.moveHistory[moveNum - 1];
            const player = move.player === 'white' ? 'âšª' : 'âš«';
            moveInfo.textContent = `${player} ${move.move}`;
        } else {
            moveInfo.textContent = 'Starting position';
        }
        
        // Update button states
        document.getElementById('review-start-btn').disabled = (this.reviewMoveIndex === 0);
        document.getElementById('review-prev-btn').disabled = (this.reviewMoveIndex === 0);
        document.getElementById('review-next-btn').disabled = (this.reviewMoveIndex >= this.boardHistory.length - 1);
        document.getElementById('review-end-btn').disabled = (this.reviewMoveIndex >= this.boardHistory.length - 1);
    }
    
    setupReviewControls() {
        document.getElementById('review-btn')?.addEventListener('click', () => this.enterReviewMode());
        document.getElementById('exit-review-btn')?.addEventListener('click', () => this.exitReviewMode());
        document.getElementById('review-start-btn')?.addEventListener('click', () => this.reviewGoToStart());
        document.getElementById('review-prev-btn')?.addEventListener('click', () => this.reviewPrevMove());
        document.getElementById('review-next-btn')?.addEventListener('click', () => this.reviewNextMove());
        document.getElementById('review-end-btn')?.addEventListener('click', () => this.reviewGoToEnd());
    }

    updateCapturedPieces() {
        const whiteCaptured = document.getElementById('white-captured');
        const blackCaptured = document.getElementById('black-captured');
        
        whiteCaptured.innerHTML = '';
        blackCaptured.innerHTML = '';
        
        // Fallback to unicode if the selected piece set doesn't exist
        const pieceSet = PIECE_SETS[this.pieceSet] || PIECE_SETS['unicode'];
        const whitePieceColor = this.colors.whitePiece || '#ffffff';
        const blackPieceColor = this.colors.blackPiece || '#000000';
        this.capturedPieces.white.forEach(piece => {
            const span = document.createElement('span');
            span.className = 'captured-piece';
            span.textContent = pieceSet.white[piece.type];
            span.style.setProperty('color', whitePieceColor, 'important');
            span.style.setProperty('-webkit-text-fill-color', whitePieceColor, 'important');
            whiteCaptured.appendChild(span);
        });
        
        this.capturedPieces.black.forEach(piece => {
            const span = document.createElement('span');
            span.className = 'captured-piece';
            span.textContent = pieceSet.black[piece.type];
            span.style.setProperty('color', blackPieceColor, 'important');
            span.style.setProperty('-webkit-text-fill-color', blackPieceColor, 'important');
            blackCaptured.appendChild(span);
        });
    }

    cloneBoard() {
        return this.board.map(row => row.map(piece => piece ? { ...piece } : null));
    }

    newGame() {
        this.stopTimer();
        this.board = this.initializeBoard();
        this.currentPlayer = 'white';
        this.selectedSquare = null;
        this.moveHistory = [];
        this.capturedPieces = { white: [], black: [], red: [], green: [] };
        this.gameOver = false;
        this.gameStarted = false;
        this.inCheck = { white: false, black: false, red: false, green: false };
        this.checksGiven = { white: 0, black: 0 };
        this.eliminated = { white: false, red: false, black: false, green: false };
        if (this.gameVariant === 'fourPlayer') {
            const mins = parseInt(document.getElementById('white-timer-minutes')?.value || '10', 10);
            this.timers = { white: mins * 60, black: mins * 60, red: mins * 60, green: mins * 60 };
        }
        
        // Reset review mode
        this.reviewMode = false;
        this.reviewMoveIndex = -1;
        this.boardHistory = [];
        this.savedBoardState = null;
        document.getElementById('review-controls').style.display = 'none';
        document.getElementById('review-btn').style.display = 'none';
        
        // Reset castling rights
        this.castlingRights = {
            white: { kingSide: true, queenSide: true },
            black: { kingSide: true, queenSide: true }
        };
        
        // Reset en passant target
        this.enPassantTarget = null;
        
        // Reset draw offer
        this.drawOffer = null;
        
        // Reset draw button
        const drawBtn = document.getElementById('draw-btn');
        if (drawBtn) {
            drawBtn.textContent = 'Draw';
            drawBtn.style.backgroundColor = '#ffc107';
        }
        
        // Bot mode persists across new games
        this.initializeTimers();
        
        // Show start button again and re-enable timer inputs
        const startBtn = document.getElementById('start-game-btn');
        if (startBtn) {
            startBtn.style.display = 'block';
        }
        
        // Re-enable timer inputs for new game
        const whiteTimerInput = document.getElementById('white-timer-minutes');
        const blackTimerInput = document.getElementById('black-timer-minutes');
        const applyTimerBtn = document.getElementById('apply-timer-btn');
        if (whiteTimerInput) whiteTimerInput.disabled = false;
        if (blackTimerInput) blackTimerInput.disabled = false;
        if (applyTimerBtn) applyTimerBtn.disabled = false;
        
        this.updateGameInfo();
        this.updateMoveHistory();
        this.updateCapturedPieces();
        document.getElementById('game-status').textContent = '';
        this.renderBoard();
        this.applyColors();
    }

    resetGame() {
        this.newGame();
    }
}

// Default preferences for guest / fallback auth (so any user can play)
var GUEST_PREFERENCES = {
    colors: {
        lightSquare: '#f0d9b5',
        darkSquare: '#b58863',
        whitePiece: '#ffffff',
        blackPiece: '#000000',
        boardContainer: '#ffffff'
    },
    pieceSet: 'unicode',
    backgroundTheme: 'rainy'
};

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Ensure any visitor can play: use auth if loaded, otherwise guest fallback (no redirect to login)
    var authToUse = (typeof auth !== 'undefined' && auth) ? auth : null;
    if (!authToUse) {
        window.auth = {
            currentUser: { username: 'Guest', email: null, preferences: GUEST_PREFERENCES },
            checkAuth: function() { return true; },
            getCurrentUser: function() { return this.currentUser; },
            getUserPreferences: function() { return GUEST_PREFERENCES; },
            saveUserPreferences: function() {},
            setCurrentUser: function() {}
        };
        authToUse = window.auth;
    }
    if (authToUse.checkAuth()) {
        window.chessGame = new ChessGame();
    }
});
