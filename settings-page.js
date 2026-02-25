/**
 * Settings page: load and save preferences (colors, theme, piece set, timer, bot, player names).
 * Same preference structure as the game page; auth.saveUserPreferences / getUserPreferences.
 */
(function() {
    function getPrefs() {
        if (typeof auth === 'undefined' || !auth.getUserPreferences) return {};
        var p = auth.getUserPreferences();
        return p || {};
    }

    function savePrefs(prefs) {
        if (typeof auth === 'undefined' || !auth.saveUserPreferences) return;
        auth.saveUserPreferences(prefs);
    }

    function buildPrefs() {
        var prefs = getPrefs();
        prefs.colors = prefs.colors || {};
        var lightEl = document.getElementById('light-square-color');
        var darkEl = document.getElementById('dark-square-color');
        var whitePieceEl = document.getElementById('white-piece-color');
        var blackPieceEl = document.getElementById('black-piece-color');
        var containerEl = document.getElementById('board-container-color');
        if (lightEl) prefs.colors.lightSquare = lightEl.value;
        if (darkEl) prefs.colors.darkSquare = darkEl.value;
        if (whitePieceEl) prefs.colors.whitePiece = whitePieceEl.value;
        if (blackPieceEl) prefs.colors.blackPiece = blackPieceEl.value;
        if (containerEl) prefs.colors.boardContainer = containerEl.value;
        var bgEl = document.getElementById('background-theme-selector');
        var pieceEl = document.getElementById('piece-set-selector');
        if (bgEl) prefs.backgroundTheme = bgEl.value;
        if (prefs.backgroundTheme === 'custom') {
            var c1 = document.getElementById('custom-bg-color1');
            var c2 = document.getElementById('custom-bg-color2');
            var ang = document.getElementById('custom-bg-angle');
            prefs.customBackground = {
                color1: c1 ? c1.value : '#2c3e50',
                color2: c2 ? c2.value : '#3498db',
                angle: ang ? (parseInt(ang.value, 10) || 135) : 135
            };
        }
        if (pieceEl) prefs.pieceSet = pieceEl.value;
        var whiteName = document.getElementById('white-player-name');
        var blackName = document.getElementById('black-player-name');
        if (whiteName && blackName) prefs.playerNames = { white: whiteName.value.trim() || 'Player 1', black: blackName.value.trim() || 'Player 2' };
        var whiteMin = document.getElementById('white-timer-minutes');
        var blackMin = document.getElementById('black-timer-minutes');
        if (whiteMin && blackMin) prefs.timerMinutes = { white: Math.max(0, Math.min(120, parseInt(whiteMin.value, 10) || 10)), black: Math.max(0, Math.min(120, parseInt(blackMin.value, 10) || 10)) };
        var botName = document.getElementById('bot-name');
        var botDiff = document.getElementById('bot-difficulty');
        if (botName) prefs.botName = botName.value.trim() || 'ChessBot';
        if (botDiff) prefs.botDifficulty = botDiff.value;
        return prefs;
    }

    function loadPrefs() {
        var p = getPrefs();
        var c = p.colors || {};
        setInput('light-square-color', c.lightSquare || '#f0d9b5');
        setInput('light-square-text', c.lightSquare || '#f0d9b5');
        setInput('dark-square-color', c.darkSquare || '#b58863');
        setInput('dark-square-text', c.darkSquare || '#b58863');
        setInput('white-piece-color', c.whitePiece || '#ffffff');
        setInput('white-piece-text', c.whitePiece || '#ffffff');
        setInput('black-piece-color', c.blackPiece || '#000000');
        setInput('black-piece-text', c.blackPiece || '#000000');
        setInput('board-container-color', c.boardContainer || '#ffffff');
        setInput('board-container-text', c.boardContainer || '#ffffff');
        setInput('background-theme-selector', p.backgroundTheme || 'rainy');
        var cb = p.customBackground || {};
        setInput('custom-bg-color1', cb.color1 || '#2c3e50');
        setInput('custom-bg-color1-text', cb.color1 || '#2c3e50');
        setInput('custom-bg-color2', cb.color2 || '#3498db');
        setInput('custom-bg-color2-text', cb.color2 || '#3498db');
        setInput('custom-bg-angle', cb.angle != null ? cb.angle : 135);
        var customSection = document.getElementById('custom-background-section');
        if (customSection) customSection.style.display = (p.backgroundTheme === 'custom') ? 'block' : 'none';
        applyBackgroundOnSettings();
        setInput('piece-set-selector', p.pieceSet || 'letters');
        updatePiecePreview();
        var pn = p.playerNames;
        setInput('white-player-name', pn && pn.white ? pn.white : 'Player 1');
        setInput('black-player-name', pn && pn.black ? pn.black : 'Player 2');
        var tm = p.timerMinutes;
        setInput('white-timer-minutes', tm && tm.white != null ? tm.white : 10);
        setInput('black-timer-minutes', tm && tm.black != null ? tm.black : 10);
        setInput('bot-name', p.botName || 'ChessBot');
        setInput('bot-difficulty', p.botDifficulty || 'medium');
    }

    function setInput(id, value) {
        var el = document.getElementById(id);
        if (!el) return;
        if (el.type === 'number') el.value = Number(value);
        else el.value = value;
    }

    function updatePiecePreview() {
        var sets = typeof window !== 'undefined' && window.PIECE_SETS;
        if (!sets) return;
        var sel = document.getElementById('piece-set-selector');
        var whiteEl = document.getElementById('piece-preview-white');
        var blackEl = document.getElementById('piece-preview-black');
        if (!sel || !whiteEl || !blackEl) return;
        var pieceSet = sets[sel.value];
        if (!pieceSet || !pieceSet.white || !pieceSet.black) return;
        if (pieceSet.useImages) {
            whiteEl.textContent = 'Piece images';
            blackEl.textContent = 'Piece images';
            whiteEl.className = blackEl.className = 'piece-preview-symbols';
            return;
        }
        var order = ['king', 'queen', 'rook', 'bishop', 'knight', 'pawn'];
        whiteEl.textContent = order.map(function(t) { return pieceSet.white[t] || ''; }).join(' ');
        blackEl.textContent = order.map(function(t) { return pieceSet.black[t] || ''; }).join(' ');
        var pieceClass = pieceSet.pieceClass || '';
        whiteEl.className = 'piece-preview-symbols' + (pieceClass ? ' ' + pieceClass : '');
        blackEl.className = 'piece-preview-symbols' + (pieceClass ? ' ' + pieceClass : '');
    }

    function applyBackgroundOnSettings() {
        var body = document.body;
        if (!body) return;
        var bgEl = document.getElementById('background-theme-selector');
        var theme = bgEl ? bgEl.value : 'rainy';
        if (theme === 'custom') {
            var c1 = document.getElementById('custom-bg-color1');
            var c2 = document.getElementById('custom-bg-color2');
            var ang = document.getElementById('custom-bg-angle');
            var color1 = c1 ? c1.value : '#2c3e50';
            var color2 = c2 ? c2.value : '#3498db';
            var angle = ang ? (parseInt(ang.value, 10) || 135) : 135;
            body.style.background = 'linear-gradient(' + angle + 'deg, ' + color1 + ', ' + color2 + ')';
            body.style.animation = 'none';
        } else {
            var themes = typeof window !== 'undefined' && window.BACKGROUND_THEMES;
            var t = themes && themes[theme];
            if (t) {
                body.style.background = t.pattern ? (t.pattern + ', ' + t.style) : t.style;
                body.style.backgroundRepeat = t.pattern ? 'repeat, no-repeat' : '';
                body.style.animation = t.animation || 'none';
            }
        }
    }

    function syncColorPair(colorId, textId) {
        var colorEl = document.getElementById(colorId);
        var textEl = document.getElementById(textId);
        if (!colorEl || !textEl) return;
        function colorToText() { textEl.value = colorEl.value; savePrefs(buildPrefs()); }
        function textToColor() {
            var v = textEl.value.trim();
            if (/^#[0-9A-Fa-f]{6}$/.test(v)) { colorEl.value = v; savePrefs(buildPrefs()); }
        }
        colorEl.addEventListener('input', colorToText);
        textEl.addEventListener('input', textToColor);
        textEl.addEventListener('change', textToColor);
    }

    function init() {
        loadPrefs();

        var adminLink = document.getElementById('admin-portal-link');
        if (adminLink && typeof auth !== 'undefined' && auth.isAdmin()) adminLink.style.display = 'inline-flex';

        var saveChangesBtn = document.getElementById('save-changes-btn');
        if (saveChangesBtn) {
            saveChangesBtn.addEventListener('click', function() {
                savePrefs(buildPrefs());
                var orig = saveChangesBtn.textContent;
                saveChangesBtn.textContent = 'Saved!';
                saveChangesBtn.disabled = true;
                setTimeout(function() {
                    saveChangesBtn.textContent = orig;
                    saveChangesBtn.disabled = false;
                }, 1500);
            });
        }

        syncColorPair('light-square-color', 'light-square-text');
        syncColorPair('dark-square-color', 'dark-square-text');
        syncColorPair('white-piece-color', 'white-piece-text');
        syncColorPair('black-piece-color', 'black-piece-text');
        syncColorPair('board-container-color', 'board-container-text');
        syncColorPair('custom-bg-color1', 'custom-bg-color1-text');
        syncColorPair('custom-bg-color2', 'custom-bg-color2-text');
        document.querySelectorAll('#custom-bg-color1, #custom-bg-color1-text, #custom-bg-color2, #custom-bg-color2-text, #custom-bg-angle').forEach(function(el) {
            if (el) {
                el.addEventListener('input', function() { applyBackgroundOnSettings(); savePrefs(buildPrefs()); });
                el.addEventListener('change', function() { applyBackgroundOnSettings(); savePrefs(buildPrefs()); });
            }
        });

        document.querySelectorAll('#white-player-name, #black-player-name, #white-timer-minutes, #black-timer-minutes, #bot-name, #bot-difficulty').forEach(function(el) {
            el.addEventListener('change', function() { savePrefs(buildPrefs()); });
            el.addEventListener('input', function() { savePrefs(buildPrefs()); });
        });

        var bgSel = document.getElementById('background-theme-selector');
        var pieceSel = document.getElementById('piece-set-selector');
        var customSection = document.getElementById('custom-background-section');
        if (bgSel) {
            bgSel.addEventListener('change', function() {
                if (customSection) customSection.style.display = (bgSel.value === 'custom') ? 'block' : 'none';
                applyBackgroundOnSettings();
                savePrefs(buildPrefs());
            });
        }
        if (pieceSel) {
            pieceSel.addEventListener('change', function() {
                savePrefs(buildPrefs());
                updatePiecePreview();
            });
        }
        updatePiecePreview();

        document.querySelectorAll('.board-style-tile').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var light = btn.getAttribute('data-light');
                var dark = btn.getAttribute('data-dark');
                if (light && dark) {
                    setInput('light-square-color', light);
                    setInput('light-square-text', light);
                    setInput('dark-square-color', dark);
                    setInput('dark-square-text', dark);
                    savePrefs(buildPrefs());
                }
            });
        });

        document.querySelectorAll('.theme-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var theme = btn.getAttribute('data-theme');
                if (theme) {
                    setInput('background-theme-selector', theme);
                    savePrefs(buildPrefs());
                }
            });
        });

        var resetBtn = document.getElementById('reset-colors-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', function() {
                var def = {
                    colors: { lightSquare: '#f0d9b5', darkSquare: '#b58863', whitePiece: '#ffffff', blackPiece: '#000000', boardContainer: '#ffffff' },
                    pieceSet: 'letters',
                    backgroundTheme: 'rainy'
                };
                setInput('light-square-color', def.colors.lightSquare);
                setInput('light-square-text', def.colors.lightSquare);
                setInput('dark-square-color', def.colors.darkSquare);
                setInput('dark-square-text', def.colors.darkSquare);
                setInput('white-piece-color', def.colors.whitePiece);
                setInput('white-piece-text', def.colors.whitePiece);
                setInput('black-piece-color', def.colors.blackPiece);
                setInput('black-piece-text', def.colors.blackPiece);
                setInput('board-container-color', def.colors.boardContainer);
                setInput('board-container-text', def.colors.boardContainer);
                setInput('background-theme-selector', def.backgroundTheme);
                var customSectionEl = document.getElementById('custom-background-section');
                if (customSectionEl) customSectionEl.style.display = 'none';
                setInput('piece-set-selector', def.pieceSet);
                applyBackgroundOnSettings();
                savePrefs(buildPrefs());
            });
        }
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
