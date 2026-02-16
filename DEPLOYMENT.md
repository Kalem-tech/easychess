# Vercel Deployment Guide

## IMPORTANT: Fixing 404 Errors

The 404 errors you're seeing are because Vercel needs to be configured as a static site.

## Step 1: Vercel Project Settings

Go to your Vercel project dashboard → Settings → General:

1. **Framework Preset:** Select "Other" or leave blank
2. **Build Command:** Leave EMPTY (no build needed for static files)
3. **Output Directory:** Set to `.` (dot/period) - this means root directory
4. **Install Command:** `npm install` (only needed for Convex)

## Step 2: Verify Files Are Committed

Make sure ALL these files are committed to your git repository:

```
✓ index.html
✓ login.html  
✓ auth.js
✓ chess.js
✓ multiplayer.js
✓ rain.js
✓ styles.css
✓ vercel.json
✓ package.json
```

## Step 3: Check .gitignore

Make sure your `.gitignore` is NOT excluding the JavaScript files. Your `.gitignore` should only exclude:
- `node_modules/`
- `.env` files
- Build artifacts

NOT:
- `*.js` (don't exclude JavaScript files!)
- `auth.js`, `chess.js`, etc.

## Step 4: Redeploy

After updating settings:
1. Push your changes to git
2. Vercel will auto-deploy, OR
3. Manually trigger a new deployment in Vercel dashboard

## Files Required for Deployment

### Core Files (Required)
- `index.html` - Main game page
- `login.html` - Login/signup page
- `auth.js` - Authentication logic
- `chess.js` - Main game logic
- `multiplayer.js` - Multiplayer functionality
- `rain.js` - Rain animation effect
- `styles.css` - Main stylesheet
- `vercel.json` - Vercel configuration

### Configuration Files
- `package.json` - Node.js dependencies
- `convex.json` - Convex configuration
- `convex/` - Convex backend files

## Troubleshooting 404 Errors

If you still see 404 errors after fixing settings:

1. ✅ Check Vercel project settings (Framework = Other, Output Directory = `.`)
2. ✅ Verify all files are committed to git (check your repository)
3. ✅ Check `.gitignore` isn't excluding `.js` files
4. ✅ Look at Vercel deployment logs - check "Source" tab to see what files were deployed
5. ✅ Try manually redeploying from Vercel dashboard

## Quick Fix Checklist

- [ ] Vercel Settings → Framework: "Other"
- [ ] Vercel Settings → Build Command: EMPTY
- [ ] Vercel Settings → Output Directory: `.`
- [ ] All `.js` files are committed to git
- [ ] `.gitignore` doesn't exclude `*.js`
- [ ] Redeploy the project
