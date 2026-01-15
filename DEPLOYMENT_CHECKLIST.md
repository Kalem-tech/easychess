# Deployment Checklist

## ✅ Quick Tests

### 1. **Basic Functionality**
- [ ] Site loads without errors
- [ ] Login page appears first (if not logged in)
- [ ] Can create an account
- [ ] Can log in
- [ ] Chess board displays correctly
- [ ] Pieces render properly

### 2. **Game Features**
- [ ] Can move pieces
- [ ] Move validation works (can't make illegal moves)
- [ ] Turn indicator updates
- [ ] Move history displays
- [ ] Captured pieces show correctly
- [ ] Timer settings work (if enabled)
- [ ] "New Game" button works
- [ ] "Reset" button works

### 3. **Customization**
- [ ] Color customization works
- [ ] Piece set selector works
- [ ] Background themes work
- [ ] Settings persist

### 4. **Multiplayer (Same Browser)**
- [ ] Can create a room
- [ ] Room code displays
- [ ] Can join room (in another tab)
- [ ] Moves sync between tabs
- [ ] Player names display correctly

### 5. **Visual/UI**
- [ ] Responsive on mobile
- [ ] All buttons work
- [ ] No console errors (check browser DevTools)
- [ ] Animations work smoothly

## 🐛 Common Issues to Check

1. **404 Errors**: Check browser console for missing files
2. **CORS Issues**: Shouldn't happen with static files
3. **localStorage**: Should work (check if auth persists)
4. **Styling**: All CSS should load correctly

## 📝 Notes

- Multiplayer only works in the same browser (localStorage limitation)
- Authentication uses localStorage (not a real backend)
- All game state is stored locally
