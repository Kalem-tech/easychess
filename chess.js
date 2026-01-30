// Chess piece sets - different visual styles
const PIECE_SETS = {
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
        white: {
            king: 'K',
            queen: 'Q',
            rook: 'R',
            bishop: 'B',
            knight: 'N',
            pawn: 'P'
        },
        black: {
            king: 'k',
            queen: 'q',
            rook: 'r',
            bishop: 'b',
            knight: 'n',
            pawn: 'p'
        }
    },
    bold: {
        name: 'Bold Unicode',
        white: {
            king: '🅚',
            queen: '🅠',
            rook: '🅡',
            bishop: '🅑',
            knight: '🅝',
            pawn: '🅟'
        },
        black: {
            king: '🅚',
            queen: '🅠',
            rook: '🅡',
            bishop: '🅑',
            knight: '🅝',
            pawn: '🅟'
        }
    },
    circles: {
        name: 'Circle Symbols',
        white: {
            king: 'Ⓚ',
            queen: 'Ⓠ',
            rook: 'Ⓡ',
            bishop: 'Ⓑ',
            knight: 'Ⓝ',
            pawn: 'Ⓟ'
        },
        black: {
            king: 'ⓚ',
            queen: 'ⓠ',
            rook: 'ⓡ',
            bishop: 'ⓑ',
            knight: 'ⓝ',
            pawn: 'ⓟ'
        }
    },
    squares: {
        name: 'Square Symbols',
        white: {
            king: '▣',
            queen: '▤',
            rook: '▥',
            bishop: '▦',
            knight: '▧',
            pawn: '▨'
        },
        black: {
            king: '▢',
            queen: '▣',
            rook: '▤',
            bishop: '▥',
            knight: '▦',
            pawn: '▧'
        }
    },
    simple: {
        name: 'Simple Shapes',
        white: {
            king: '◉',
            queen: '◈',
            rook: '▣',
            bishop: '◊',
            knight: '△',
            pawn: '○'
        },
        black: {
            king: '●',
            queen: '◆',
            rook: '■',
            bishop: '♦',
            knight: '▲',
            pawn: '●'
        }
    },
    anime: {
        name: 'Anime Characters',
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
    demonSlayer: {
        name: 'Demon Slayer - Main Cast',
        white: {
            king: '🔥', queen: '👧', rook: '💧', bishop: '🦋', knight: '⚡', pawn: '⚔️'
        },
        black: {
            king: '👹', queen: '🌙', rook: '💀', bishop: '👺', knight: '🦇', pawn: '😈'
        }
    },
    demonSlayerHashira: {
        name: 'Demon Slayer - Hashira',
        white: {
            king: '🔥', queen: '💧', rook: '🦋', bishop: '💨', knight: '⚡', pawn: '⚔️'
        },
        black: {
            king: '👹', queen: '🌙', rook: '💀', bishop: '👺', knight: '🦇', pawn: '😈'
        }
    },
    demonSlayerKamado: {
        name: 'Demon Slayer - Kamado Family',
        white: {
            king: '🔥', queen: '👧', rook: '⚡', bishop: '🐗', knight: '💧', pawn: '⚔️'
        },
        black: {
            king: '👹', queen: '🌙', rook: '💀', bishop: '👺', knight: '🦇', pawn: '😈'
        }
    },
    christmas: {
        name: 'Christmas',
        white: {
            king: '🎅', queen: '🎄', rook: '🎁', bishop: '❄️', knight: '🦌', pawn: '⭐'
        },
        black: {
            king: '🎃', queen: '🎁', rook: '🔔', bishop: '🕯️', knight: '🎄', pawn: '❄️'
        }
    },
    // Movies & TV Shows
    starWars: {
        name: 'Star Wars',
        white: {
            king: '👑', queen: '⭐', rook: '🚀', bishop: '⚔️', knight: '🛸', pawn: '🌟'
        },
        black: {
            king: '⚫', queen: '🌑', rook: '💀', bishop: '🔴', knight: '⚡', pawn: '👤'
        }
    },
    harryPotter: {
        name: 'Harry Potter',
        white: {
            king: '⚡', queen: '🦉', rook: '🪄', bishop: '📚', knight: '🏰', pawn: '✨'
        },
        black: {
            king: '🐍', queen: '💀', rook: '🕷️', bishop: '🌙', knight: '🦇', pawn: '👁️'
        }
    },
    gameOfThrones: {
        name: 'Game of Thrones',
        white: {
            king: '👑', queen: '🐺', rook: '🦁', bishop: '⚔️', knight: '🛡️', pawn: '🗡️'
        },
        black: {
            king: '🐉', queen: '❄️', rook: '💀', bishop: '🔥', knight: '👻', pawn: '⚫'
        }
    },
    marvel: {
        name: 'Marvel',
        white: {
            king: '🦸', queen: '⚡', rook: '🛡️', bishop: '🕷️', knight: '🔨', pawn: '⭐'
        },
        black: {
            king: '💀', queen: '👹', rook: '🌑', bishop: '⚫', knight: '👤', pawn: '🔴'
        }
    },
    dc: {
        name: 'DC Comics',
        white: {
            king: '🦇', queen: '⚡', rook: '🛡️', bishop: '👸', knight: '🦸', pawn: '⭐'
        },
        black: {
            king: '👹', queen: '💀', rook: '🌑', bishop: '⚫', knight: '👤', pawn: '🔴'
        }
    },
    breakingBad: {
        name: 'Breaking Bad',
        white: {
            king: '🧪', queen: '⚗️', rook: '💊', bishop: '🔬', knight: '🚗', pawn: '💰'
        },
        black: {
            king: '💀', queen: '🔫', rook: '🌑', bishop: '⚫', knight: '👤', pawn: '💵'
        }
    },
    strangerThings: {
        name: 'Stranger Things',
        white: {
            king: '🔮', queen: '⭐', rook: '🚲', bishop: '📻', knight: '🎮', pawn: '✨'
        },
        black: {
            king: '👹', queen: '🌑', rook: '💀', bishop: '⚫', knight: '👤', pawn: '🔴'
        }
    },
    // Video Games
    pokemon: {
        name: 'Pokemon',
        white: {
            king: '⚡', queen: '🔥', rook: '💧', bishop: '🌿', knight: '⭐', pawn: '🐾'
        },
        black: {
            king: '🌑', queen: '💀', rook: '👹', bishop: '⚫', knight: '👤', pawn: '🔴'
        }
    },
    mario: {
        name: 'Super Mario',
        white: {
            king: '🍄', queen: '⭐', rook: '🪙', bishop: '🌸', knight: '🐢', pawn: '💎'
        },
        black: {
            king: '👹', queen: '🌑', rook: '💀', bishop: '⚫', knight: '👤', pawn: '🔴'
        }
    },
    minecraft: {
        name: 'Minecraft',
        white: {
            king: '⛏️', queen: '💎', rook: '🪵', bishop: '🌿', knight: '🐷', pawn: '🧱'
        },
        black: {
            king: '💀', queen: '🌑', rook: '👹', bishop: '⚫', knight: '🕷️', pawn: '🔴'
        }
    },
    zelda: {
        name: 'Zelda',
        white: {
            king: '🗡️', queen: '🛡️', rook: '💎', bishop: '⭐', knight: '🏹', pawn: '✨'
        },
        black: {
            king: '👹', queen: '🌑', rook: '💀', bishop: '⚫', knight: '👤', pawn: '🔴'
        }
    },
    fortnite: {
        name: 'Fortnite',
        white: {
            king: '🎯', queen: '🏆', rook: '💎', bishop: '⭐', knight: '🎮', pawn: '🔫'
        },
        black: {
            king: '💀', queen: '🌑', rook: '👹', bishop: '⚫', knight: '👤', pawn: '🔴'
        }
    },
    // Anime
    naruto: {
        name: 'Naruto',
        white: {
            king: '🔥', queen: '⚡', rook: '💨', bishop: '🌊', knight: '🌿', pawn: '⭐'
        },
        black: {
            king: '👹', queen: '🌑', rook: '💀', bishop: '⚫', knight: '👤', pawn: '🔴'
        }
    },
    onePiece: {
        name: 'One Piece',
        white: {
            king: '🏴‍☠️', queen: '⚓', rook: '🗺️', bishop: '💎', knight: '⚔️', pawn: '⭐'
        },
        black: {
            king: '👹', queen: '🌑', rook: '💀', bishop: '⚫', knight: '👤', pawn: '🔴'
        }
    },
    attackOnTitan: {
        name: 'Attack on Titan',
        white: {
            king: '⚔️', queen: '🛡️', rook: '🏰', bishop: '🔥', knight: '⚡', pawn: '⭐'
        },
        black: {
            king: '👹', queen: '🌑', rook: '💀', bishop: '⚫', knight: '👤', pawn: '🔴'
        }
    },
    // Music
    rock: {
        name: 'Rock Music',
        white: {
            king: '🎸', queen: '🎤', rook: '🥁', bishop: '🎹', knight: '🎵', pawn: '⭐'
        },
        black: {
            king: '🎸', queen: '🎤', rook: '🥁', bishop: '🎹', knight: '🎵', pawn: '⭐'
        }
    },
    hipHop: {
        name: 'Hip Hop',
        white: {
            king: '🎤', queen: '🎧', rook: '💿', bishop: '🎵', knight: '⭐', pawn: '🔥'
        },
        black: {
            king: '🎤', queen: '🎧', rook: '💿', bishop: '🎵', knight: '⭐', pawn: '🔥'
        }
    },
    // Tech Companies
    apple: {
        name: 'Apple',
        white: {
            king: '🍎', queen: '💻', rook: '📱', bishop: '⌚', knight: '🎧', pawn: '⚡'
        },
        black: {
            king: '🍎', queen: '💻', rook: '📱', bishop: '⌚', knight: '🎧', pawn: '⚡'
        }
    },
    google: {
        name: 'Google',
        white: {
            king: '🔍', queen: '🌐', rook: '📱', bishop: '💻', knight: '⚡', pawn: '⭐'
        },
        black: {
            king: '🔍', queen: '🌐', rook: '📱', bishop: '💻', knight: '⚡', pawn: '⭐'
        }
    },
    // Sports
    football: {
        name: 'Football',
        white: {
            king: '🏈', queen: '🏆', rook: '⚽', bishop: '🎯', knight: '⭐', pawn: '🔥'
        },
        black: {
            king: '🏈', queen: '🏆', rook: '⚽', bishop: '🎯', knight: '⭐', pawn: '🔥'
        }
    },
    basketball: {
        name: 'Basketball',
        white: {
            king: '🏀', queen: '🏆', rook: '⚡', bishop: '⭐', knight: '🔥', pawn: '💪'
        },
        black: {
            king: '🏀', queen: '🏆', rook: '⚡', bishop: '⭐', knight: '🔥', pawn: '💪'
        }
    },
    // Food & Drink
    pizza: {
        name: 'Pizza',
        white: {
            king: '🍕', queen: '🧀', rook: '🍅', bishop: '🌶️', knight: '🍄', pawn: '🫒'
        },
        black: {
            king: '🍕', queen: '🧀', rook: '🍅', bishop: '🌶️', knight: '🍄', pawn: '🫒'
        }
    },
    coffee: {
        name: 'Coffee',
        white: {
            king: '☕', queen: '🥐', rook: '🍩', bishop: '🍰', knight: '🍪', pawn: '⭐'
        },
        black: {
            king: '☕', queen: '🥐', rook: '🍩', bishop: '🍰', knight: '🍪', pawn: '⭐'
        }
    },
    // Nature & Animals
    ocean: {
        name: 'Ocean Life',
        white: {
            king: '🐋', queen: '🐙', rook: '🦈', bishop: '🐠', knight: '🐚', pawn: '🌊'
        },
        black: {
            king: '🐋', queen: '🐙', rook: '🦈', bishop: '🐠', knight: '🐚', pawn: '🌊'
        }
    },
    forest: {
        name: 'Forest',
        white: {
            king: '🌲', queen: '🦌', rook: '🐻', bishop: '🦉', knight: '🐺', pawn: '🍄'
        },
        black: {
            king: '🌲', queen: '🦌', rook: '🐻', bishop: '🦉', knight: '🐺', pawn: '🍄'
        }
    },
    // Space
    space: {
        name: 'Space',
        white: {
            king: '🌍', queen: '🌙', rook: '⭐', bishop: '🚀', knight: '🛸', pawn: '✨'
        },
        black: {
            king: '🌑', queen: '🌌', rook: '💫', bishop: '🪐', knight: '☄️', pawn: '⭐'
        }
    },
    // More Movies
    matrix: {
        name: 'The Matrix',
        white: {
            king: '💊', queen: '🕶️', rook: '⌨️', bishop: '💻', knight: '⚡', pawn: '🔴'
        },
        black: {
            king: '🌑', queen: '⚫', rook: '💀', bishop: '👤', knight: '🔴', pawn: '⚫'
        }
    },
    lordOfTheRings: {
        name: 'Lord of the Rings',
        white: {
            king: '👑', queen: '💍', rook: '🗡️', bishop: '🛡️', knight: '🏰', pawn: '⭐'
        },
        black: {
            king: '👹', queen: '🌑', rook: '💀', bishop: '⚫', knight: '👤', pawn: '🔴'
        }
    },
    // More TV Shows
    theOffice: {
        name: 'The Office',
        white: {
            king: '📄', queen: '☕', rook: '📞', bishop: '💼', knight: '🎯', pawn: '⭐'
        },
        black: {
            king: '📄', queen: '☕', rook: '📞', bishop: '💼', knight: '🎯', pawn: '⭐'
        }
    },
    friends: {
        name: 'Friends',
        white: {
            king: '☕', queen: '🍕', rook: '🛋️', bishop: '💛', knight: '⭐', pawn: '✨'
        },
        black: {
            king: '☕', queen: '🍕', rook: '🛋️', bishop: '💛', knight: '⭐', pawn: '✨'
        }
    },
    // More Video Games
    amongUs: {
        name: 'Among Us',
        white: {
            king: '👨‍🚀', queen: '🚀', rook: '🔴', bishop: '🟢', knight: '🔵', pawn: '⭐'
        },
        black: {
            king: '👨‍🚀', queen: '🚀', rook: '🔴', bishop: '🟢', knight: '🔵', pawn: '⭐'
        }
    },
    roblox: {
        name: 'Roblox',
        white: {
            king: '🎮', queen: '🧱', rook: '⭐', bishop: '💎', knight: '🎯', pawn: '✨'
        },
        black: {
            king: '🎮', queen: '🧱', rook: '⭐', bishop: '💎', knight: '🎯', pawn: '✨'
        }
    },
    // More Anime
    dragonBall: {
        name: 'Dragon Ball',
        white: {
            king: '⚡', queen: '🔥', rook: '💥', bishop: '⭐', knight: '👊', pawn: '✨'
        },
        black: {
            king: '⚡', queen: '🔥', rook: '💥', bishop: '⭐', knight: '👊', pawn: '✨'
        }
    },
    myHeroAcademia: {
        name: 'My Hero Academia',
        white: {
            king: '🦸', queen: '⚡', rook: '🔥', bishop: '💪', knight: '⭐', pawn: '✨'
        },
        black: {
            king: '👹', queen: '🌑', rook: '💀', bishop: '⚫', knight: '👤', pawn: '🔴'
        }
    },
    // Social Media
    instagram: {
        name: 'Instagram',
        white: {
            king: '📷', queen: '💜', rook: '⭐', bishop: '✨', knight: '🔥', pawn: '💖'
        },
        black: {
            king: '📷', queen: '💜', rook: '⭐', bishop: '✨', knight: '🔥', pawn: '💖'
        }
    },
    tiktok: {
        name: 'TikTok',
        white: {
            king: '🎵', queen: '💃', rook: '⭐', bishop: '✨', knight: '🔥', pawn: '💖'
        },
        black: {
            king: '🎵', queen: '💃', rook: '⭐', bishop: '✨', knight: '🔥', pawn: '💖'
        }
    },
    // More Themes
    retro: {
        name: 'Retro 80s',
        white: {
            king: '📼', queen: '💿', rook: '📻', bishop: '🎮', knight: '🕹️', pawn: '⭐'
        },
        black: {
            king: '📼', queen: '💿', rook: '📻', bishop: '🎮', knight: '🕹️', pawn: '⭐'
        }
    },
    cyberpunk: {
        name: 'Cyberpunk',
        white: {
            king: '💻', queen: '🌐', rook: '⚡', bishop: '🔮', knight: '🤖', pawn: '💎'
        },
        black: {
            king: '🌑', queen: '⚫', rook: '💀', bishop: '🔴', knight: '👤', pawn: '🔵'
        }
    },
    halloween: {
        name: 'Halloween',
        white: {
            king: '🎃', queen: '👻', rook: '🦇', bishop: '🕷️', knight: '💀', pawn: '🕯️'
        },
        black: {
            king: '🌑', queen: '👹', rook: '💀', bishop: '🦇', knight: '👻', pawn: '🕷️'
        }
    },
    valentines: {
        name: 'Valentine\'s Day',
        white: {
            king: '💕', queen: '💖', rook: '💗', bishop: '💝', knight: '🌹', pawn: '💌'
        },
        black: {
            king: '💕', queen: '💖', rook: '💗', bishop: '💝', knight: '🌹', pawn: '💌'
        }
    },
    easter: {
        name: 'Easter',
        white: {
            king: '🐰', queen: '🥚', rook: '🌸', bishop: '🌷', knight: '🐣', pawn: '💐'
        },
        black: {
            king: '🐰', queen: '🥚', rook: '🌸', bishop: '🌷', knight: '🐣', pawn: '💐'
        }
    },
    // More Pop Culture
    disney: {
        name: 'Disney',
        white: {
            king: '👑', queen: '⭐', rook: '✨', bishop: '🎆', knight: '🏰', pawn: '💫'
        },
        black: {
            king: '👑', queen: '⭐', rook: '✨', bishop: '🎆', knight: '🏰', pawn: '💫'
        }
    },
    starTrek: {
        name: 'Star Trek',
        white: {
            king: '🖖', queen: '🚀', rook: '⭐', bishop: '🌌', knight: '🛸', pawn: '✨'
        },
        black: {
            king: '🖖', queen: '🚀', rook: '⭐', bishop: '🌌', knight: '🛸', pawn: '✨'
        }
    },
    // Final additions to reach 50
    emoji: {
        name: 'Emoji Party',
        white: {
            king: '😎', queen: '🤩', rook: '😍', bishop: '🥳', knight: '🎉', pawn: '⭐'
        },
        black: {
            king: '😎', queen: '🤩', rook: '😍', bishop: '🥳', knight: '🎉', pawn: '⭐'
        }
    },
    rainbow: {
        name: 'Rainbow',
        white: {
            king: '🌈', queen: '☀️', rook: '☁️', bishop: '⭐', knight: '✨', pawn: '💫'
        },
        black: {
            king: '🌈', queen: '☀️', rook: '☁️', bishop: '⭐', knight: '✨', pawn: '💫'
        }
    },
    neon: {
        name: 'Neon',
        white: {
            king: '💡', queen: '⚡', rook: '🔆', bishop: '✨', knight: '⭐', pawn: '💫'
        },
        black: {
            king: '💡', queen: '⚡', rook: '🔆', bishop: '✨', knight: '⭐', pawn: '💫'
        }
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
        this.capturedPieces = { white: [], black: [] };
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
        
        // Save the corrected colors immediately to override any saved blue colors
        this.savePreferences();
        
        // Current piece set
        this.pieceSet = userPrefs?.pieceSet || currentPieceSet;
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

    initializeBoard() {
        const board = Array(8).fill(null).map(() => Array(8).fill(null));
        
        // Place pawns
        for (let col = 0; col < 8; col++) {
            board[1][col] = { type: 'pawn', color: 'black' };
            board[6][col] = { type: 'pawn', color: 'white' };
        }
        
        // Place other pieces
        const backRow = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
        for (let col = 0; col < 8; col++) {
            board[0][col] = { type: backRow[col], color: 'black' };
            board[7][col] = { type: backRow[col], color: 'white' };
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
                const needsFix = prefs.colors.lightSquare !== '#f0d9b5' || 
                                prefs.colors.darkSquare !== '#b58863' ||
                                prefs.colors.lightSquare?.toLowerCase().includes('5d7fad') ||
                                prefs.colors.lightSquare?.toLowerCase().includes('89a9d1') ||
                                prefs.colors.darkSquare?.toLowerCase().includes('5d7fad') ||
                                prefs.colors.darkSquare?.toLowerCase().includes('89a9d1');
                
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
        if (!savedRoom) {
            // Not in a multiplayer room - use saved color preference
            const savedColor = localStorage.getItem('playerColor');
            if (savedColor && savedColor === 'black') {
                // Swap pieces if user previously selected black (single player only)
                this.swapBoardPieces();
                this.currentPlayer = 'black';
                this.boardFlipped = true;
            }
        }
        // If in a multiplayer room, the MultiplayerManager will set up orientation
        
        this.renderBoard();
        this.setupEventListeners();
        this.updateGameInfo();
        
        // Force both square colors to classic colors
        this.colors.lightSquare = '#f0d9b5';
        this.colors.darkSquare = '#b58863';
        
        // Apply colors to the board - force apply to all squares
        this.applyColors();
        
        // Force reapply colors multiple times to ensure they stick
        setTimeout(() => {
            this.applyColors();
        }, 50);
        setTimeout(() => {
            this.applyColors();
        }, 200);
        setTimeout(() => {
            this.applyColors();
        }, 500);
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
                usernameDisplay.textContent = `👤 ${auth.currentUser.username} /gmail`;
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
        
        // Don't apply visual flip - pieces are already swapped in the board array
        boardElement.style.transform = 'rotate(0deg)';
        boardElement.classList.remove('flipped');
        
        for (let displayRow = 0; displayRow < 8; displayRow++) {
            for (let displayCol = 0; displayCol < 8; displayCol++) {
                // Use actual board coordinates directly (pieces are already swapped)
                const actualRow = displayRow;
                const actualCol = displayCol;
                
                const square = document.createElement('div');
                square.className = `square ${(displayRow + displayCol) % 2 === 0 ? 'light' : 'dark'}`;
                square.dataset.row = actualRow; // Store actual board coordinates
                square.dataset.col = actualCol;
                
                // Add coordinates
                if (displayCol === 0) {
                    const rank = document.createElement('span');
                    rank.className = 'coordinate rank';
                    rank.textContent = 8 - displayRow; // 8-1 from top
                    square.appendChild(rank);
                }
                if (displayRow === 7) {
                    const file = document.createElement('span');
                    file.className = 'coordinate file';
                    file.textContent = String.fromCharCode(97 + displayCol); // a-h from left
                    square.appendChild(file);
                }
                
                // Add piece if exists (use actual board coordinates)
                const piece = this.board[actualRow][actualCol];
                if (piece) {
                    const pieceSet = PIECE_SETS[this.pieceSet];
                    square.textContent = pieceSet[piece.color][piece.type];
                    
                    // Remove color filters and let pieces use their natural colors
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
        
        // Force apply colors immediately after rendering
        this.applyColors();
        
        // Force reapply colors multiple times to ensure they stick
        setTimeout(() => {
            this.applyColors();
        }, 50);
        setTimeout(() => {
            this.applyColors();
        }, 200);
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
        const pieceSet = PIECE_SETS[this.pieceSet];
        
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
            if (boardPiece) {
                square.textContent = pieceSet[boardPiece.color][boardPiece.type];
                
                // Remove color filters and let pieces use their natural colors
                square.style.removeProperty('color');
                square.style.removeProperty('filter');
                
                // Update tooltip data
                const pieceName = boardPiece.type.charAt(0).toUpperCase() + boardPiece.type.slice(1);
                square.title = `${boardPiece.color.charAt(0).toUpperCase() + boardPiece.color.slice(1)} ${pieceName}`;
                square.setAttribute('data-piece-type', boardPiece.type);
                square.setAttribute('data-piece-color', boardPiece.color);
            } else {
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
        
        // Check for castling
        if (piece.type === 'king' && Math.abs(toCol - fromCol) === 2 && fromRow === toRow) {
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
        // When board is flipped, directions are reversed
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
        
        // Handle castling
        if (piece.type === 'king' && Math.abs(toCol - fromCol) === 2 && fromRow === toRow) {
            this.executeCastling(fromRow, fromCol, toRow, toCol);
            // Castling is complete, update rights and continue
            this.updateCastlingRights(piece, fromRow, fromCol);
            this.enPassantTarget = null; // Clear en passant target
            
            // Record move
            const moveNotation = this.getMoveNotation(piece, fromRow, fromCol, toRow, toCol, null);
            this.moveHistory.push({
                move: moveNotation,
                player: this.currentPlayer
            });
            this.updateMoveHistory();
            
            // Switch turn BEFORE saving game state
            this.switchTurn();
            
            // Check for check/checkmate
            this.checkGameState();
            this.updateGameInfo();
            this.renderBoard();
            
            // Notify multiplayer manager of the move AFTER turn switch
            if (this.multiplayer) {
                this.multiplayer.onMoveMade(fromRow, fromCol, toRow, toCol);
            }
            
            // If bot mode is active and it's the bot's turn, make bot move
            if (this.botMode && !this.gameOver && this.currentPlayer === this.botColor) {
                console.log('=== TRIGGERING BOT MOVE AFTER CASTLING ===');
                setTimeout(() => {
                    this.makeBotMove();
                }, 150);
            }
            return;
        }
        
        // Check for en passant before clearing the target
        let enPassantCapture = false;
        if (piece.type === 'pawn' && 
            Math.abs(toCol - fromCol) === 1 && 
            !capturedPiece &&
            this.enPassantTarget &&
            this.enPassantTarget.row === toRow &&
            this.enPassantTarget.col === toCol) {
            enPassantCapture = true;
            // Capture the pawn that moved two squares
            // Direction reversed when board is flipped
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
        
        // Handle regular capture
        if (capturedPiece && !enPassantCapture) {
            this.capturedPieces[capturedPiece.color].push(capturedPiece);
            this.updateCapturedPieces();
        }
        
        // Make the move
        this.board[toRow][toCol] = piece;
        this.board[fromRow][fromCol] = null;
        
        // Update en passant target (set when pawn moves two squares)
        // Clear previous target first (en passant is only valid for one move)
        this.enPassantTarget = null;
        
        if (piece.type === 'pawn' && Math.abs(toRow - fromRow) === 2) {
            // Set en passant target to the square the pawn passed through
            this.enPassantTarget = {
                row: fromRow + (toRow - fromRow) / 2,
                col: fromCol
            };
        }
        
        // Update castling rights
        this.updateCastlingRights(piece, fromRow, fromCol);
        
        // Pawn promotion
        if (piece.type === 'pawn' && (toRow === 0 || toRow === 7)) {
            piece.type = 'queen'; // Auto-promote to queen
        }
        
        // Record move
        const moveNotation = this.getMoveNotation(piece, fromRow, fromCol, toRow, toCol, capturedPiece);
        this.moveHistory.push({
            move: moveNotation,
            player: this.currentPlayer
        });
        this.updateMoveHistory();
        
        // Switch turn BEFORE saving game state (so currentPlayer is correct)
        this.switchTurn();
        
        // Check for check/checkmate (this will set gameOver if checkmate occurs)
        this.checkGameState();
        this.updateGameInfo();
        this.renderBoard();
        
        // Notify multiplayer manager of the move AFTER turn switch
        // This ensures the saved game state has the correct currentPlayer
        if (this.multiplayer) {
            this.multiplayer.onMoveMade(fromRow, fromCol, toRow, toCol);
        }
        
        // If bot mode is active and it's the bot's turn, make bot move
        if (this.botMode && !this.gameOver && this.currentPlayer === this.botColor) {
            console.log('=== TRIGGERING BOT MOVE AFTER PLAYER MOVE ===', {
                botMode: this.botMode,
                gameOver: this.gameOver,
                currentPlayer: this.currentPlayer,
                botColor: this.botColor,
                gameStarted: this.gameStarted
            });
            
            // Ensure bot's timer is running
            if (this.activeTimer !== this.botColor) {
                this.startTimer(this.botColor);
            }
            
            // Make bot move quickly (small delay for visual feedback and to ensure state is updated)
            setTimeout(() => {
                console.log('🚀 Triggering bot move after player move');
                this.makeBotMove();
            }, 150); // Slightly longer delay to ensure makeMove has fully completed
        } else {
            console.log('Bot move not triggered after player move:', {
                botMode: this.botMode,
                gameOver: this.gameOver,
                currentPlayer: this.currentPlayer,
                botColor: this.botColor,
                gameStarted: this.gameStarted
            });
        }
    }
    
    switchTurn() {
        // Switch player and timers
        this.stopTimer();
        this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white';
        this.startTimer(this.currentPlayer);
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
            return;
        }
        
        // If we already offered a draw, don't offer again
        if (this.drawOffer === this.currentPlayer) {
            return;
        }
        
        // Offer a draw to the opponent
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
        // Check for check/checkmate for both players
        this.inCheck.white = this.isKingInCheck(this.board, 'white');
        this.inCheck.black = this.isKingInCheck(this.board, 'black');
        
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
        let kingRow = -1, kingCol = -1;
        
        // Find the king
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = board[row][col];
                if (piece && piece.type === 'king' && piece.color === color) {
                    kingRow = row;
                    kingCol = col;
                    break;
                }
            }
            if (kingRow !== -1) break;
        }
        
        if (kingRow === -1) return false;
        
        // Check if any opponent piece can attack the king
        const opponentColor = color === 'white' ? 'black' : 'white';
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = board[row][col];
                if (piece && piece.color === opponentColor) {
                    if (this.isValidPieceMoveForBoard(board, piece, row, col, kingRow, kingCol)) {
                        return true;
                    }
                }
            }
        }
        
        return false;
    }

    hasValidMoves(color) {
        for (let fromRow = 0; fromRow < 8; fromRow++) {
            for (let fromCol = 0; fromCol < 8; fromCol++) {
                const piece = this.board[fromRow][fromCol];
                if (piece && piece.color === color) {
                    for (let toRow = 0; toRow < 8; toRow++) {
                        for (let toCol = 0; toCol < 8; toCol++) {
                            if (this.isValidMove(fromRow, fromCol, toRow, toCol)) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
        return false;
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
                
                // Highlight possible moves
                const [selectedRow, selectedCol] = this.selectedSquare.split('-').map(Number);
                for (let r = 0; r < 8; r++) {
                    for (let c = 0; c < 8; c++) {
                        if (this.isValidMove(selectedRow, selectedCol, r, c)) {
                            const targetSquare = document.querySelector(`[data-row="${r}"][data-col="${c}"]`);
                            if (this.board[r][c]) {
                                targetSquare.classList.add('possible-capture');
                            } else {
                                targetSquare.classList.add('possible-move');
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
        if (!this.gameOver) {
            let playerName;
            if (this.botMode && this.currentPlayer === this.botColor) {
                playerName = this.botName;
            } else if (this.multiplayer && this.multiplayer.roomCode) {
                // In multiplayer, show actual player names
                if (this.currentPlayer === 'white') {
                    playerName = this.multiplayer.isHost ? this.multiplayer.myName : this.multiplayer.opponentName;
                } else {
                    playerName = this.multiplayer.isHost ? this.multiplayer.opponentName : this.multiplayer.myName;
                }
                playerName = playerName || (this.currentPlayer === 'white' ? 'White' : 'Black');
            } else {
                playerName = this.currentPlayer === 'white' ? 'White' : 'Black';
            }
            document.getElementById('current-turn').textContent = `${playerName}'s Turn`;
        }
        // Update player profiles whenever game info is updated
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
                    icon.textContent = '♔';
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
                    icon.textContent = '♚';
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
                    icon.textContent = '♔';
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
                    icon.textContent = '♚';
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
        for (let fromRow = 0; fromRow < 8; fromRow++) {
            for (let fromCol = 0; fromCol < 8; fromCol++) {
                const piece = this.board[fromRow][fromCol];
                if (piece && piece.color === color) {
                    for (let toRow = 0; toRow < 8; toRow++) {
                        for (let toCol = 0; toCol < 8; toCol++) {
                            if (this.isValidMove(fromRow, fromCol, toRow, toCol)) {
                                validMoves.push({
                                    fromRow,
                                    fromCol,
                                    toRow,
                                    toCol,
                                    piece
                                });
                            }
                        }
                    }
                }
            }
        }
        return validMoves;
    }
    
    countMaterial(board) {
        let count = 0;
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = board[row][col];
                if (piece && piece.type !== 'king') {
                    count++;
                }
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
        
        // Material evaluation with positional bonuses
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
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
        
        // King safety evaluation
        let kingRow = -1, kingCol = -1;
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = board[row][col];
                if (piece && piece.type === 'king' && piece.color === color) {
                    kingRow = row;
                    kingCol = col;
                    break;
                }
            }
            if (kingRow !== -1) break;
        }
        
        if (kingRow !== -1) {
            // Count pieces defending the king
            let defenders = 0;
            for (let row = Math.max(0, kingRow - 1); row <= Math.min(7, kingRow + 1); row++) {
                for (let col = Math.max(0, kingCol - 1); col <= Math.min(7, kingCol + 1); col++) {
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
        for (let fromRow = 0; fromRow < 8; fromRow++) {
            for (let fromCol = 0; fromCol < 8; fromCol++) {
                const piece = board[fromRow][fromCol];
                if (piece && piece.color === color) {
                    for (let toRow = 0; toRow < 8; toRow++) {
                        for (let toCol = 0; toCol < 8; toCol++) {
                            if (this.isValidMoveForBoard(board, fromRow, fromCol, toRow, toCol, color)) {
                                validMoves.push({
                                    fromRow,
                                    fromCol,
                                    toRow,
                                    toCol,
                                    piece
                                });
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
        const direction = piece.color === 'white' ? -1 : 1;
        const startRow = piece.color === 'white' ? 6 : 1;
        const rowDiff = toRow - fromRow;
        const colDiff = toCol - fromCol;
        const targetPiece = board[toRow][toCol];
        
        // Forward move
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
                console.warn('⚠️ Selected move failed validation, trying first valid move');
                if (validMoves.length > 0) {
                    bestMove = validMoves[0];
                    console.log('Using first valid move:', bestMove);
                } else {
                    console.error('❌ No valid moves available!');
                    return;
                }
            }
            
            // Execute the move directly
            this.makeMove(bestMove.fromRow, bestMove.fromCol, bestMove.toRow, bestMove.toCol);
            
            console.log('✅✅✅ BOT MOVE EXECUTED SUCCESSFULLY! ✅✅✅');
        } catch (error) {
            console.error('❌❌❌ CRITICAL ERROR making bot move:', error);
            console.error('Move that failed:', bestMove);
            console.error('Error message:', error.message);
            if (error.stack) {
                console.error('Stack trace:', error.stack);
            }
            
            // Last resort - try first valid move
            if (validMoves.length > 0) {
                const fallbackMove = validMoves[0];
                console.log('🔄 Trying fallback move:', fallbackMove);
                try {
                    // Re-validate fallback move
                    if (this.isValidMove(fallbackMove.fromRow, fallbackMove.fromCol, fallbackMove.toRow, fallbackMove.toCol)) {
                        this.makeMove(fallbackMove.fromRow, fallbackMove.fromCol, fallbackMove.toRow, fallbackMove.toCol);
                        console.log('✅ Fallback move executed successfully');
                    } else {
                        console.error('❌ Fallback move is also invalid');
                    }
                } catch (fallbackError) {
                    console.error('❌ Fallback move also failed:', fallbackError);
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
        document.getElementById('game-status').textContent = '📖 Review Mode';
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
            const player = move.player === 'white' ? '⚪' : '⚫';
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
        
        const pieceSet = PIECE_SETS[this.pieceSet];
        this.capturedPieces.white.forEach(piece => {
            const span = document.createElement('span');
            span.className = 'captured-piece';
            span.textContent = pieceSet.white[piece.type];
            span.style.color = this.colors.whitePiece;
            whiteCaptured.appendChild(span);
        });
        
        this.capturedPieces.black.forEach(piece => {
            const span = document.createElement('span');
            span.className = 'captured-piece';
            span.textContent = pieceSet.black[piece.type];
            span.style.color = this.colors.blackPiece;
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
        this.capturedPieces = { white: [], black: [] };
        this.gameOver = false;
        this.gameStarted = false; // Reset game started flag
        this.inCheck = { white: false, black: false };
        
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

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Check authentication first
    if (typeof auth !== 'undefined' && auth) {
        if (auth.checkAuth()) {
            // Create game and expose globally for multiplayer
            window.chessGame = new ChessGame();
        }
    } else {
        // If auth.js hasn't loaded, redirect to login
        window.location.href = 'login.html';
    }
});
