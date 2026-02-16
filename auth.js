// Authentication system using localStorage
class AuthSystem {
    constructor() {
        this.users = this.loadUsers();
        this.currentUser = this.getCurrentUser();
        this.init();
    }

    init() {
        // Check if we're on login page
        if (document.getElementById('login-form')) {
            this.setupLoginPage();
        }
        
        // Check if we're on main page
        if (document.getElementById('chessboard')) {
            this.checkAuth();
        }
    }

    loadUsers() {
        try {
            const stored = localStorage.getItem('chess_users');
            return stored ? JSON.parse(stored) : {};
        } catch (e) {
            return {};
        }
    }

    saveUsers() {
        try {
            localStorage.setItem('chess_users', JSON.stringify(this.users));
            return true;
        } catch (e) {
            console.warn('Could not save users (e.g. private browsing):', e.message);
            return false;
        }
    }

    getCurrentUser() {
        try {
            const user = localStorage.getItem('chess_current_user');
            return user ? JSON.parse(user) : null;
        } catch (e) {
            return null;
        }
    }

    setCurrentUser(user) {
        try {
            if (user) {
                localStorage.setItem('chess_current_user', JSON.stringify(user));
            } else {
                localStorage.removeItem('chess_current_user');
            }
        } catch (e) {
            console.warn('Could not save session (e.g. private browsing):', e.message);
        }
        this.currentUser = user;
    }

    setupLoginPage() {
        // Tab switching
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.dataset.tab;
                this.switchTab(tabName);
            });
        });

        // Email code form (send code -> then verify code)
        var emailForm = document.getElementById('email-form');
        if (emailForm) {
            emailForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleEmailCodeSubmit();
            });
        }

        // Login form
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // Forgot password: switch to Login (email code) tab so they can sign in with code
        var forgotBtn = document.getElementById('forgot-password-btn');
        if (forgotBtn) {
            forgotBtn.addEventListener('click', function() {
                auth.switchTab('email');
            });
        }

        // Signup form
        document.getElementById('signup-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSignup();
        });
    }

    getApiBase() {
        if (typeof window !== 'undefined' && window.location && window.location.origin) {
            return window.location.origin;
        }
        return '';
    }

    handleEmailCodeSubmit() {
        var emailInput = document.getElementById('email-login');
        var codeInput = document.getElementById('email-code');
        var codeGroup = document.getElementById('email-code-group');
        var submitBtn = document.getElementById('email-submit-btn');
        var email = (emailInput && emailInput.value || '').trim().toLowerCase();
        if (!email) {
            this.showError('Please enter your email');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            this.showError('Please enter a valid email address');
            return;
        }

        if (codeGroup && codeGroup.style.display === 'none') {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            var base = this.getApiBase();
            fetch(base + '/api/send-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email })
            })
                .then(function(r) { return r.json().then(function(data) { return { ok: r.ok, data: data }; }); })
                .then(function(result) {
                    submitBtn.disabled = false;
                    if (result.ok && result.data && !result.data.error) {
                        codeGroup.style.display = 'block';
                        if (codeInput) {
                            codeInput.value = '';
                            codeInput.focus();
                        }
                        submitBtn.textContent = 'Verify code and sign in';
                        auth.showSuccess('Check your email and enter the 5-digit code.');
                    } else {
                        submitBtn.textContent = 'Request code from Gmail';
                        auth.showError(result.data && result.data.error || 'Failed to send code');
                    }
                })
                .catch(function(err) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Request code from Gmail';
                    auth.showError('Network error. Try again or use Password / Sign up.');
                });
            return;
        }

        var code = (codeInput && codeInput.value || '').trim();
        if (!/^\d{5}$/.test(code)) {
            this.showError('Please enter the 5-digit code from your email');
            return;
        }
        submitBtn.disabled = true;
        submitBtn.textContent = 'Verifying...';
        var self = this;
        var base = this.getApiBase();
        fetch(base + '/api/verify-code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, code: code })
        })
            .then(function(r) { return r.json().then(function(data) { return { ok: r.ok, data: data }; }); })
            .then(function(result) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Verify code and sign in';
                if (result.ok && result.data && result.data.success) {
                    var user = {
                        username: result.data.email || email,
                        email: email,
                        preferences: {
                            colors: {
                                lightSquare: '#f0d9b5',
                                darkSquare: '#b58863',
                                whitePiece: '#ffffff',
                                blackPiece: '#000000',
                                boardContainer: '#ffffff'
                            },
                            pieceSet: 'unicode',
                            backgroundTheme: 'rainy'
                        }
                    };
                    if (self.users[email]) {
                        user.preferences = self.users[email].preferences || user.preferences;
                    } else {
                        self.users[email] = { email: email, preferences: user.preferences, createdAt: new Date().toISOString() };
                        self.saveUsers();
                    }
                    self.setCurrentUser(user);
                    self.showSuccess('Signed in! Redirecting...');
                    setTimeout(function() { window.location.href = 'index.html'; }, 500);
                } else {
                    self.showError(result.data && result.data.error || 'Invalid or expired code');
                }
            })
            .catch(function(err) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Verify code and sign in';
                auth.showError('Network error. Try again.');
            });
    }

    switchTab(tabName) {
        // Update tabs
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.tab === tabName) {
                tab.classList.add('active');
            }
        });

        // Update forms
        document.querySelectorAll('.auth-form').forEach(form => {
            form.classList.remove('active');
        });
        var formEl = document.getElementById(tabName + '-form');
        if (formEl) formEl.classList.add('active');

        // Reset email-code form when switching away
        var codeGroup = document.getElementById('email-code-group');
        var emailSubmitBtn = document.getElementById('email-submit-btn');
        if (codeGroup) codeGroup.style.display = 'none';
        if (emailSubmitBtn) {
            emailSubmitBtn.textContent = 'Request code from Gmail';
            emailSubmitBtn.disabled = false;
        }

        // Clear messages
        this.hideMessages();
    }

    showError(message) {
        const errorDiv = document.getElementById('error-message');
        errorDiv.textContent = message;
        errorDiv.classList.add('show');
        setTimeout(() => {
            errorDiv.classList.remove('show');
        }, 5000);
    }

    showSuccess(message) {
        const successDiv = document.getElementById('success-message');
        successDiv.textContent = message;
        successDiv.classList.add('show');
        setTimeout(() => {
            successDiv.classList.remove('show');
        }, 3000);
    }

    hideMessages() {
        document.getElementById('error-message').classList.remove('show');
        document.getElementById('success-message').classList.remove('show');
    }

    handleSignup() {
        const username = document.getElementById('signup-username').value.trim();
        const email = document.getElementById('signup-email').value.trim().toLowerCase();
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;

        // Validation
        if (username.length < 3) {
            this.showError('Username must be at least 3 characters long');
            return;
        }

        if (password.length < 6) {
            this.showError('Password must be at least 6 characters long');
            return;
        }

        if (password !== confirmPassword) {
            this.showError('Passwords do not match');
            return;
        }

        if (this.users[username]) {
            this.showError('Username already exists');
            return;
        }

        // Check if email is already registered
        const emailExists = Object.values(this.users).some(u => u.email && u.email.toLowerCase() === email);
        if (emailExists) {
            this.showError('Email is already registered. Please use a different email or login.');
            return;
        }

        // Create user
        const user = {
            username: username,
            email: email,
            password: this.hashPassword(password), // Simple hash (not secure for production)
            createdAt: new Date().toISOString(),
            preferences: {
                colors: {
                    lightSquare: '#f0d9b5',
                    darkSquare: '#b58863',
                    whitePiece: '#ffffff',
                    blackPiece: '#000000',
                    boardContainer: '#ffffff'
                },
                pieceSet: 'letters',
                backgroundTheme: 'rainy'
            }
        };

        this.users[username] = user;
        if (!this.saveUsers()) {
            this.showError('Could not save account. Try turning off private browsing or allow site storage.');
            return;
        }

        // Auto-login after signup and redirect to chess board
        this.setCurrentUser({
            username: user.username,
            email: user.email,
            preferences: user.preferences
        });

        this.showSuccess('Account created successfully! Redirecting to chess board...');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 500);
    }

    handleLogin() {
        const usernameOrEmail = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value;

        if (!usernameOrEmail || !password) {
            this.showError('Please enter both username/email and password');
            return;
        }

        // Try to find user by username first
        let user = this.users[usernameOrEmail];

        // If not found by username, search by email
        if (!user) {
            const searchEmail = usernameOrEmail.toLowerCase();
            console.log('Searching by email:', searchEmail);
            user = Object.values(this.users).find(u => {
                if (u.email) {
                    const userEmail = u.email.toLowerCase().trim();
                    return userEmail === searchEmail;
                }
                return false;
            });
        }

        if (!user) {
            // Check if any users exist at all
            const userCount = Object.keys(this.users).length;
            if (userCount === 0) {
                this.showError('No accounts found. Please sign up first.');
            } else {
                this.showError('Invalid username/email or password.');
            }
            return;
        }

        const hashedPassword = this.hashPassword(password);

        if (user.password !== hashedPassword) {
            this.showError('Invalid username/email or password');
            return;
        }

        // Login successful
        this.setCurrentUser({
            username: user.username,
            email: user.email,
            preferences: user.preferences
        });

        // Redirect immediately to chess board
        window.location.href = 'index.html';
    }

    hashPassword(password) {
        // Simple hash function (not secure for production - use proper hashing in real apps)
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash.toString();
    }

    logout() {
        this.setCurrentUser(null);
        window.location.href = 'login.html';
    }

    checkAuth() {
        if (!this.currentUser) {
            // No user found — allow guest/demo mode so the app can initialize
            // This enables the site to work when deployed publicly without
            // requiring a login. Real user flows remain unchanged when a
            // real `currentUser` exists.
            const guest = {
                username: 'Guest',
                email: null,
                preferences: {
                    colors: {
                        lightSquare: '#f0d9b5',
                        darkSquare: '#b58863',
                        whitePiece: '#ffffff',
                        blackPiece: '#000000',
                        boardContainer: '#ffffff'
                    },
                    pieceSet: 'letters',
                    backgroundTheme: 'rainy'
                }
            };
            this.setCurrentUser(guest);
            console.warn('No current user found — entering guest mode');
            return true;
        }
        return true;
    }

    getUserPreferences() {
        if (this.currentUser && this.currentUser.preferences) {
            return this.currentUser.preferences;
        }
        return null;
    }

    saveUserPreferences(preferences) {
        if (this.currentUser) {
            const username = this.currentUser.username;
            if (this.users[username]) {
                this.users[username].preferences = preferences;
                this.currentUser.preferences = preferences;
                this.setCurrentUser(this.currentUser);
                this.saveUsers();
            }
        }
    }
}

// Initialize auth system
const auth = new AuthSystem();
