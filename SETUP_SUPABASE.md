# Supabase Setup Guide

## Step 1: Create Supabase Account & Project

1. Go to https://supabase.com
2. Sign up for free account
3. Create a new project
4. Wait for project to finish setting up (takes ~2 minutes)

## Step 2: Create Database Tables

Go to **SQL Editor** in Supabase and run these SQL commands:

### Users Table
```sql
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
```

### Rooms Table (for multiplayer)
```sql
CREATE TABLE rooms (
  room_code TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_rooms_room_code ON rooms(room_code);
```

## Step 3: Get Your API Credentials

1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (the `anon` key, not the `service_role` key)

## Step 4: Add to Vercel Environment Variables

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add these two variables:

   **Variable 1:**
   - Name: `SUPABASE_URL`
   - Value: Your Project URL (e.g., `https://xxxxx.supabase.co`)
   - Environment: Production, Preview, Development (check all)

   **Variable 2:**
   - Name: `SUPABASE_KEY`
   - Value: Your anon/public key
   - Environment: Production, Preview, Development (check all)

4. Click **Save**

## Step 5: Redeploy

1. Go to **Deployments** tab
2. Click the three dots (⋯) on the latest deployment
3. Click **Redeploy**

Or Vercel will automatically redeploy when you push new code.

## Step 6: Test

1. Try signing up a new user
2. Try logging in
3. Try creating a multiplayer room
4. Try joining from a different browser/device

## Troubleshooting

- **"Database not configured"**: Check that environment variables are set correctly
- **"User not found"**: Make sure the users table was created
- **"Room not found"**: Make sure the rooms table was created
- **CORS errors**: Supabase handles CORS automatically, but check your API endpoints

## Security Note

The current password hashing is simple. For production, you should:
- Use Supabase Auth (built-in authentication)
- Or use bcrypt for password hashing
- Never store plain text passwords
