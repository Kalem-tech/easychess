# Database Setup for Multiplayer

The API currently uses in-memory storage which doesn't work across serverless function invocations. To fix cross-browser multiplayer, you need to add a database.

## Option 1: Supabase (Recommended - Free & Easy)

1. **Create a Supabase account:**
   - Go to https://supabase.com
   - Sign up for free
   - Create a new project

2. **Create the rooms table:**
   - Go to SQL Editor in Supabase
   - Run this SQL:
   ```sql
   CREATE TABLE rooms (
     room_code TEXT PRIMARY KEY,
     data JSONB NOT NULL,
     created_at TIMESTAMPTZ DEFAULT NOW(),
     updated_at TIMESTAMPTZ DEFAULT NOW()
   );
   
   CREATE INDEX idx_rooms_room_code ON rooms(room_code);
   ```

3. **Get your API credentials:**
   - Go to Settings → API
   - Copy your "Project URL" and "anon/public key"

4. **Add to Vercel:**
   - Go to your Vercel project → Settings → Environment Variables
   - Add:
     - `SUPABASE_URL` = your Project URL
     - `SUPABASE_KEY` = your anon/public key

5. **Redeploy:**
   - Vercel will automatically redeploy with the new environment variables

## Option 2: MongoDB Atlas (Free)

1. **Create MongoDB Atlas account:**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free
   - Create a cluster

2. **Get connection string:**
   - Click "Connect" → "Connect your application"
   - Copy the connection string

3. **Add to Vercel:**
   - Add environment variable: `MONGODB_URI` = your connection string

4. **Update API code:**
   - I'll need to update the API functions to use MongoDB instead

## Option 3: Vercel KV (Redis) - Easiest for Vercel

1. **Add Vercel KV:**
   - In Vercel dashboard → Storage → Create Database → KV
   - This creates a Redis database

2. **Get credentials:**
   - Vercel automatically provides environment variables

3. **Update API code:**
   - I'll need to update the API functions to use Vercel KV

## Quick Test Without Database

For now, the API will work within the same serverless function instance, but rooms will be lost on cold starts. This means:
- ✅ Works if both users connect quickly (same function instance)
- ❌ Fails if there's a cold start between requests

**Which option would you like to use?** I recommend Supabase as it's free, easy, and works well with Vercel.
