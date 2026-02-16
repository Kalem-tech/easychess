# Email sign-in (5-digit code) setup

The login page can send a 5-digit code to the user's email (Gmail or any). To enable it on your deployment:

## 1. Resend (sending email)

1. Sign up at [resend.com](https://resend.com) (free tier: 100 emails/day).
2. Get your API key from the dashboard.
3. Optional: Add and verify your domain so "From" can be your address; otherwise Resend uses `onboarding@resend.dev` and may only send to your own email until domain is verified.

## 2. Upstash Redis (storing codes)

1. Sign up at [upstash.com](https://upstash.com) and create a Redis database (free tier).
2. In the database dashboard, copy **REST URL** and **REST Token**.

## 3. Vercel environment variables

In your Vercel project → Settings → Environment Variables, add:

| Name | Value |
|------|--------|
| `RESEND_API_KEY` | Your Resend API key |
| `UPSTASH_REDIS_REST_URL` | Your Upstash Redis REST URL |
| `UPSTASH_REDIS_REST_TOKEN` | Your Upstash Redis REST token |

Optional:

| Name | Value |
|------|--------|
| `RESEND_FROM_EMAIL` | e.g. `Chess Game <noreply@yourdomain.com>` (requires verified domain in Resend) |

Redeploy after adding variables.

## Flow

1. User opens **Email Code** tab, enters email, clicks "Send code to my email".
2. Backend stores a 5-digit code in Redis (10 min TTL) and sends it via Resend.
3. User enters the 5-digit code and clicks "Verify code and sign in".
4. Backend checks the code and returns success; user is signed in (no password).
