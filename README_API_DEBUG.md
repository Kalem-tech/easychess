# API Debugging Guide

## Check if API is Working

1. **Test the API endpoint:**
   - Open: `https://your-vercel-url.vercel.app/api/test`
   - Should return: `{"message":"API is working!","timestamp":...}`

2. **Check Vercel Dashboard:**
   - Go to your project → **Functions** tab
   - You should see:
     - `/api/test`
     - `/api/games/create`
     - `/api/games/join`
     - `/api/games/[roomCode]`
   - If these don't appear, the routes aren't deploying

3. **Check Deployment Logs:**
   - Vercel → Deployments → Latest deployment
   - Look for build errors
   - Check Function Logs for runtime errors

## Common Issues

1. **Functions not appearing**: The `api/` folder might not be recognized
2. **"Failed to fetch"**: CORS issue or function not deployed
3. **404 errors**: Route structure might be wrong

## Quick Fix Options

### Option 1: Use a Database (Recommended)
- Use **Supabase** (free tier) or **MongoDB Atlas** (free tier)
- Store rooms in database instead of memory
- Works across all browsers/devices

### Option 2: Fix Current API
- Verify functions are deploying
- Check for syntax errors
- Ensure proper export format
