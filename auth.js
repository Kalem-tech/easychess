// Authentication system - now supports database via API
class AuthSystem {
    constructor() {
        this.apiBase = this.getApiBase();
        this.currentUser = this.getCurrentUser();
        this.init();
    }

    getApiBase() {
        const origin = window.location.origin;
        return `${origin}/api/auth`;
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
        const stored = localStorage.getItem('chess_users');
        return stored ? JSON.parse(stored) : {};
    }

    saveUsers() {
        localStorage.setItem('chess_users', JSON.stringify(this.users));
    }

    getCurrentUser() {
        const user = localStorage.getItem('chess_current_user');
        return user ? JSON.parse(user) : null;
    }

    setCurrentUser(user) {
        if (user) {
            localStorage.setItem('chess_current_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('chess_current_user');
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

        // Login form
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // Signup form
        document.getElementById('signup-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSignup();
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
        document.getElementById(`${tabName}-form`).classList.add('active');

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

    async handleSignup() {
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

        try {
            // Try API first
            const response = await fetch(`${this.apiBase}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    // Auto-login after signup
                    this.setCurrentUser(data.user);
                    this.showSuccess('Account created successfully! Redirecting to chess board...');
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 500);
                    return;
                }
            } else {
                const error = await response.json();
                this.showError(error.error || 'Failed to create account');
                return;
            }
        } catch (error) {
            console.warn('API signup failed, using localStorage fallback:', error);
        }

        // Fallback to localStorage if API fails
        if (this.users[username]) {
            this.showError('Username already exists');
            return;
        }

        const emailExists = Object.values(this.users).some(u => u.email && u.email.toLowerCase() === email);
        if (emailExists) {
            this.showError('Email is already registered. Please use a different email or login.');
            return;
        }

        const user = {
            username: username,
            email: email,
            password: this.hashPassword(password),
            createdAt: new Date().toISOString(),
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

        this.users[username] = user;
        this.saveUsers();

        this.setCurrentUser({
            username: user.username,
            email: user.email,
            preferences: user.preferences
        });

        this.showSuccess('Account created (local mode). Redirecting...');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 500);
    }

    loadUsers() {
        const stored = localStorage.getItem('chess_users');
        return stored ? JSON.parse(stored) : {};
    }

    saveUsers() {
        localStorage.setItem('chess_users', JSON.stringify(this.users));
    }

    async handleLogin() {
        const usernameOrEmail = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value;

        if (!usernameOrEmail || !password) {
            this.showError('Please enter both username/email and password');
            return;
        }

        try {
            // Try API first
            const response = await fetch(`${this.apiBase}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    usernameOrEmail,
                    password
                })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    // Login successful
                    this.setCurrentUser(data.user);
                    window.location.href = 'index.html';
                    return;
                }
            } else {
                const error = await response.json();
                if (error.fallback) {
                    // Database not configured, fall back to localStorage
                    console.log('Database not configured, using localStorage fallback');
                } else {
                    this.showError(error.error || 'Login failed');
                    return;
                }
            }
        } catch (error) {
            console.warn('API login failed, using localStorage fallback:', error);
        }

        // Fallback to localStorage
        let user = this.users[usernameOrEmail];

        if (!user) {
            const searchEmail = usernameOrEmail.toLowerCase();
            user = Object.values(this.users).find(u => {
                if (u.email) {
                    return u.email.toLowerCase().trim() === searchEmail;
                }
                return false;
            });
        }

        if (!user) {
            const userCount = Object.keys(this.users).length;
            if (userCount === 0) {
                this.showError('No accounts found. Please sign up first.');
            } else {
                this.showError('Invalid username/email or password');
            }
            return;
        }

        const hashedPassword = this.hashPassword(password);

        if (user.password !== hashedPassword) {
            this.showError('Invalid username/email or password');
            return;
        }

        this.setCurrentUser({
            username: user.username,
            email: user.email,
            preferences: user.preferences
        });

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
            window.location.href = 'login.html';
            return false;
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
