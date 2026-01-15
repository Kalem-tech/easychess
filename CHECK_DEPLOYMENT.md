# How to Check Your Vercel Deployment

## Step 1: Find Your Correct Vercel URL

1. **Go to Vercel Dashboard:**
   - Visit https://vercel.com/dashboard
   - Sign in to your account

2. **Find Your Project:**
   - Look for a project named "easychess" or "easychess1"
   - Click on it

3. **Check the Deployment:**
   - Go to the **Deployments** tab
   - Look for the latest deployment
   - Check its status:
     - ✅ **Ready** = Deployment is live
     - ⏳ **Building** = Still deploying
     - ❌ **Error** = Deployment failed

4. **Get Your URL:**
   - In the deployment, you'll see a URL like:
     - `https://easychess-xxxxx.vercel.app`
     - Or your custom domain if you set one up
   - **This is the URL you should use**

## Step 2: Test the API

Once you have the correct URL, test:

1. **Basic Test:**
   - `https://your-actual-url.vercel.app/api/test`
   - Should return: `{"message":"API is working!"}`

2. **Or use the test page:**
   - `https://your-actual-url.vercel.app/test-api.html`

## Common Issues

### Issue 1: Deployment Not Found
- **Cause:** Using wrong URL or deployment was deleted
- **Fix:** Check Vercel dashboard for the correct URL

### Issue 2: Functions Not Deploying
- **Cause:** Build errors or API folder not recognized
- **Fix:** Check deployment logs in Vercel dashboard

### Issue 3: 404 on API Routes
- **Cause:** API routes not being recognized
- **Fix:** Make sure `api/` folder is in the root of your project

## Quick Check

**What's your Vercel project URL?** 
- It should be something like: `easychess-xxxxx.vercel.app`
- Or: `easychess1.vercel.app`
- Check your Vercel dashboard to find it
