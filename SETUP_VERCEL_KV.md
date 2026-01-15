# Vercel KV Setup Guide

## Step 1: Add Vercel KV through Marketplace

1. **Go to your Vercel Dashboard:**
   - Visit https://vercel.com/dashboard
   - Click on your project (easychess)

2. **Add KV through Marketplace:**
   - Go to your project → **Storage** tab
   - Look for **"Marketplace Database Providers"** section
   - Click **"Learn more"** or browse the marketplace
   - Search for **"KV"** or **"Vercel KV"**
   - Click **Add** or **Install** on the KV option
   - Follow the prompts to add it to your project

   **Alternative method:**
   - Go to **Settings** → **Integrations** or **Marketplace**
   - Search for "KV" or "Redis"
   - Add it to your project

3. **Configure KV:**
   - After adding, Vercel will automatically configure it
   - Environment variables are set automatically
   - The database will be connected to your project

## Step 2: Verify Installation

After creating the KV database:
- Vercel automatically adds `@vercel/kv` package
- Environment variables are automatically set
- The API will use KV automatically

## Step 3: Redeploy

1. **Automatic:** Vercel will detect the new dependency and redeploy
2. **Manual:** Go to Deployments → Click "Redeploy"

## Step 4: Test

1. Try creating a room in your chess game
2. Try joining from a different browser/device
3. Rooms should now persist across all browsers!

## How It Works

- Rooms are stored with keys like: `chess_room:ABC123`
- Rooms automatically expire after 24 hours
- No manual document creation needed - the API handles everything

## Troubleshooting

- **"KV not found"**: Make sure you created the KV database in Vercel
- **"Module not found"**: Vercel should auto-install `@vercel/kv`, but you can add it manually to package.json
- **Rooms not persisting**: Check that KV database is connected to your project

## That's It!

Once you create the KV database in Vercel, everything should work automatically. The API code is already updated to use Vercel KV!
