const fs = require('fs');

// Read the original file
const originalContent = fs.readFileSync('chess.js', 'utf8');

// Find where BACKGROUND_THEMES starts
const bgThemesIndex = originalContent.indexOf('// Background themes with 50 cool designs');

if (bgThemesIndex === -1) {
    console.error('Could not find BACKGROUND_THEMES section');
    process.exit(1);
}

// Get everything from BACKGROUND_THEMES onwards
const restOfFile = originalContent.substring(bgThemesIndex);

// Create clean piece sets with actual Unicode characters
const cleanPieceSets = `// Chess piece sets - different visual styles (Copyright-safe themes only)
const PIECE_SETS = {
    // === CLASSIC STYLES ===
    unicode: {
        name: 'Unicode Symbols',
        white: {
            king: '\u2654',
            queen: '\u2655',
            rook: '\u2656',
            bishop: '\u2657',
            knight: '\u2658',
            pawn: '\u2659'
        },
        black: {
            king: '\u265A',
            queen: '\u265B',
            rook: '\u265C',
            bishop: '\u265D',
            knight: '\u265E',
            pawn: '\u265F'
        }
    },
    letters: {
        name: 'Letter Notation',
        white: { king: 'K', queen: 'Q', rook: 'R', bishop: 'B', knight: 'N', pawn: 'P' },
        black: { king: 'k', queen: 'q', rook: 'r', bishop: 'b', knight: 'n', pawn: 'p' }
    },
    simple: {
        name: 'Simple Shapes',
        white: { king: '\u25C9', queen: '\u25C8', rook: '\u25A3', bishop: '\u25CA', knight: '\u25B3', pawn: '\u25CB' },
        black: { king: '\u25CF', queen: '\u25C6', rook: '\u25A0', bishop: '\u2666', knight: '\u25B2', pawn: '\u25CF' }
    },
    emoji: {
        name: 'Emoji',
        white: { king: '\uD83D\uDC51', queen: '\uD83D\uDC78', rook: '\uD83C\uDFF0', bishop: '\u26EA', knight: '\uD83D\uDC0E', pawn: '\u26AA' },
        black: { king: '\uD83D\uDC51', queen: '\uD83D\uDC78', rook: '\uD83C\uDFF0', bishop: '\u26EA', knight: '\uD83D\uDC0E', pawn: '\u26AB' }
    }
};

// Default piece set
let currentPieceSet = 'unicode';

`;

// Combine and write
const newContent = cleanPieceSets + restOfFile;
fs.writeFileSync('chess.js', newContent, 'utf8');
console.log('File written successfully with', newContent.length, 'characters');

// Verify the file
const verifyContent = fs.readFileSync('chess.js', 'utf8');
const hasCorrectPieces = verifyContent.includes('\u2654') || verifyContent.includes('♔');
console.log('Verification - has correct pieces:', hasCorrectPieces);
console.log('First 200 chars:', verifyContent.substring(0, 200));
