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
        this.saveUsers();

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

        // Debug: Log all users (remove in production)
        console.log('All users:', this.users);
        console.log('Searching for:', usernameOrEmail);

        // Try to find user by username first
        let user = this.users[usernameOrEmail];

        // If not found by username, search by email
        if (!user) {
            const searchEmail = usernameOrEmail.toLowerCase();
            console.log('Searching by email:', searchEmail);
            user = Object.values(this.users).find(u => {
                if (u.email) {
                    const userEmail = u.email.toLowerCase().trim();
                    console.log('Comparing:', userEmail, 'with', searchEmail);
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
                this.showError(`Invalid username/email or password. Found ${userCount} user(s) in system.`);
            }
            console.error('User not found. Available users:', Object.keys(this.users).map(u => ({
                username: u,
                email: this.users[u].email
            })));
            return;
        }

        const hashedPassword = this.hashPassword(password);
        console.log('Password check:', user.password, '===', hashedPassword);

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
