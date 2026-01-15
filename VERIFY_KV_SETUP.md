# How to Verify Vercel KV is Set Up

## Step 1: Check if KV is Connected

1. **In your Vercel Dashboard:**
   - Go to your project
   - Click **Settings** → **Environment Variables**
   - Look for variables starting with `KV_` or `REDIS_`
   - You should see something like:
     - `KV_REST_API_URL`
     - `KV_REST_API_TOKEN`
     - Or similar Redis/KV variables

2. **Or check Storage tab:**
   - Go to **Storage** tab in your project
   - You should see your KV database listed
   - It should show as "Connected" or "Active"

## Step 2: Check Deployment

1. **Go to Deployments tab:**
   - Look for the latest deployment
   - Check if it's **Ready** (green checkmark)
   - If it's still building, wait for it to finish

2. **Check Function Logs:**
   - Click on the deployment
   - Go to **Functions** tab
   - Check if you see `/api/games/create`, `/api/games/join`, etc.
   - Click on one to see if there are any errors

## Step 3: Test the API

1. **Test endpoint:**
   - Go to: `https://your-vercel-url.vercel.app/api/test`
   - Should return: `{"message":"API is working!"}`

2. **Test creating a room:**
   - Use the test page: `https://your-vercel-url.vercel.app/test-api.html`
   - Or try creating a room in your chess game

## What to Look For

✅ **KV is set up correctly if:**
- You see KV/Redis environment variables
- Storage tab shows KV database connected
- API endpoints work without errors

❌ **If something's wrong:**
- No environment variables = KV not connected
- API errors = Check function logs
- "Module not found" = Package not installed

## Quick Check

**Can you:**
1. See KV/Redis in your Storage tab?
2. See KV-related environment variables?
3. Test `/api/test` and does it work?

Let me know what you find!
