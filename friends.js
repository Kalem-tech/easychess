/**
 * Friends list: add by username, invite to game (create room + copy link).
 * Storage: localStorage key chess_friends_<username> = JSON array of usernames.
 */
(function() {
    const STORAGE_PREFIX = 'chess_friends_';

    function getStorageKey() {
        if (typeof auth === 'undefined' || !auth.currentUser || !auth.currentUser.username) return null;
        return STORAGE_PREFIX + auth.currentUser.username;
    }

    function getFriends() {
        var key = getStorageKey();
        if (!key) return [];
        try {
            var raw = localStorage.getItem(key);
            if (!raw) return [];
            var list = JSON.parse(raw);
            return Array.isArray(list) ? list : [];
        } catch (e) {
            return [];
        }
    }

    function saveFriends(list) {
        var key = getStorageKey();
        if (!key) return false;
        try {
            localStorage.setItem(key, JSON.stringify(list));
            return true;
        } catch (e) {
            return false;
        }
    }

    function addFriend(username) {
        var u = (username || '').trim();
        if (!u) return { ok: false, message: 'Enter a username.' };
        if (u.length < 2) return { ok: false, message: 'Username too short.' };
        if (typeof auth !== 'undefined' && auth.currentUser && auth.currentUser.username && u.toLowerCase() === auth.currentUser.username.toLowerCase()) {
            return { ok: false, message: "You can't add yourself." };
        }
        var list = getFriends();
        if (list.some(function(f) { return f.toLowerCase() === u.toLowerCase(); })) {
            return { ok: false, message: u + ' is already in your friends list.' };
        }
        list.push(u);
        if (!saveFriends(list)) return { ok: false, message: 'Could not save. Try again.' };
        return { ok: true, message: u + ' added as a friend!' };
    }

    function removeFriend(username) {
        var list = getFriends().filter(function(f) { return f !== username; });
        saveFriends(list);
    }

    function renderFriendsList() {
        var listEl = document.getElementById('friends-list');
        var emptyEl = document.getElementById('friends-empty');
        if (!listEl || !emptyEl) return;
        var friends = getFriends();
        listEl.innerHTML = '';
        if (friends.length === 0) {
            emptyEl.style.display = 'block';
            return;
        }
        emptyEl.style.display = 'none';
        friends.forEach(function(username) {
            var li = document.createElement('li');
            li.className = 'friends-list-item';
            var nameSpan = document.createElement('span');
            nameSpan.className = 'friends-list-name';
            nameSpan.textContent = username;
            var inviteBtn = document.createElement('button');
            inviteBtn.type = 'button';
            inviteBtn.className = 'btn btn-small friends-invite-btn';
            inviteBtn.textContent = 'Invite to game';
            inviteBtn.dataset.friend = username;
            var removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.className = 'btn btn-small friends-remove-btn';
            removeBtn.textContent = 'Remove';
            removeBtn.dataset.friend = username;
            li.appendChild(nameSpan);
            li.appendChild(inviteBtn);
            li.appendChild(removeBtn);
            listEl.appendChild(li);
        });
    }

    function showFriendsMessage(text, isError) {
        var el = document.getElementById('friends-add-message');
        if (!el) return;
        el.textContent = text || '';
        el.className = 'friends-message' + (isError ? ' friends-message-error' : '');
        el.style.display = text ? 'block' : 'none';
    }

    function setupFriendsModal() {
        var modal = document.getElementById('friends-modal');
        var openBtn = document.getElementById('friends-btn');
        var closeBtn = document.getElementById('friends-close-btn');
        var addBtn = document.getElementById('add-friend-btn');
        var input = document.getElementById('friend-username-input');
        var listEl = document.getElementById('friends-list');

        if (!modal || !openBtn) return;

        openBtn.addEventListener('click', function() {
            modal.classList.add('show');
            var key = getStorageKey();
            var addSection = modal.querySelector('.friends-add-section');
            var listSection = modal.querySelector('.friends-list-section');
            if (!key) {
                showFriendsMessage('Log in to add friends and invite them to games.', true);
                if (addSection) addSection.style.display = 'none';
                if (listSection) listSection.style.display = 'none';
                var emptyEl = document.getElementById('friends-empty');
                if (emptyEl) { emptyEl.style.display = 'none'; }
                var guestMsg = document.getElementById('friends-guest-msg');
                if (guestMsg) guestMsg.style.display = 'block';
            } else {
                showFriendsMessage('');
                if (addSection) addSection.style.display = 'block';
                if (listSection) listSection.style.display = 'block';
                var guestMsg = document.getElementById('friends-guest-msg');
                if (guestMsg) guestMsg.style.display = 'none';
                renderFriendsList();
            }
            if (input) input.value = '';
        });

        if (closeBtn) closeBtn.addEventListener('click', function() { modal.classList.remove('show'); });
        modal.addEventListener('click', function(e) {
            if (e.target === modal) modal.classList.remove('show');
        });

        function doAddFriend() {
            var username = input ? input.value.trim() : '';
            var result = addFriend(username);
            showFriendsMessage(result.message, !result.ok);
            if (result.ok) {
                if (input) input.value = '';
                renderFriendsList();
            }
        }

        if (addBtn) addBtn.addEventListener('click', doAddFriend);
        if (input) input.addEventListener('keydown', function(e) { if (e.key === 'Enter') doAddFriend(); });

        if (listEl) {
            listEl.addEventListener('click', function(e) {
                var friend = e.target.dataset && e.target.dataset.friend;
                if (!friend) return;
                if (e.target.classList.contains('friends-remove-btn')) {
                    removeFriend(friend);
                    renderFriendsList();
                    showFriendsMessage(friend + ' removed.', false);
                } else if (e.target.classList.contains('friends-invite-btn')) {
                    e.target.disabled = true;
                    e.target.textContent = 'Creating room...';
                    if (typeof createRoom === 'function') {
                        createRoom(function(roomCode, inviteLink) {
                            e.target.disabled = false;
                            e.target.textContent = 'Invite to game';
                            try {
                                if (navigator.clipboard && navigator.clipboard.writeText) {
                                    navigator.clipboard.writeText(inviteLink);
                                    showFriendsMessage('Invite link copied! Send it to ' + friend + ' so they can join.', false);
                                } else {
                                    showFriendsMessage('Room code: ' + roomCode + '. Share this with ' + friend + '.', false);
                                }
                            } catch (err) {
                                showFriendsMessage('Room code: ' + roomCode + '. Share with ' + friend + '.', false);
                            }
                        });
                    } else {
                        e.target.disabled = false;
                        e.target.textContent = 'Invite to game';
                        showFriendsMessage('Multiplayer not ready. Try again.', true);
                    }
                }
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupFriendsModal);
    } else {
        setupFriendsModal();
    }
})();
