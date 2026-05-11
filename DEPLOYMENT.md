# Frontend Deployment — Vercel (Free)

## Prerequisites
Deploy the backend first and get your Render URL.

---

## Deploy to Vercel

1. Push `woodcraft-frontend/` to a GitHub repository (separate from the backend)
2. Go to vercel.com → New Project → Import your repo
3. Vercel auto-detects Nuxt — no framework config needed
4. **Environment Variables** → Add:

   | Key | Value |
   |-----|-------|
   | `NUXT_PUBLIC_API_BASE` | `https://woodcraft-backend.onrender.com` |

5. Click **Deploy**

Your frontend URL: `https://woodcraft-studio.vercel.app`

---

## After deploying both

Go to your Render backend → Environment → update `FRONTEND_URL` to your Vercel URL → Render auto-redeploys.

---

## Local Development

```bash
cd woodcraft-frontend
cp .env.example .env
# Edit .env: NUXT_PUBLIC_API_BASE=http://localhost:5000
npm install
npm run dev
# Frontend at http://localhost:3000
```

---

## Architecture

```
Visitor's browser
      ↓
  Vercel CDN          — serves Nuxt HTML/CSS/JS instantly
      ↓
  Express on Render   — API: categories, products, enquiries, auth
      ↓
  MongoDB Atlas       — data + images (GridFS)
```

**Why Vercel works here:**
- Nuxt frontend has no server folder — no database, no file system
- All data fetching calls the Express backend URL
- Vercel just serves the built Vue pages and handles SSR rendering
- Images served from `https://your-backend.onrender.com/api/files/:id`

---

## Cold start protection (already built in)

`plugins/warmup.client.ts` fires a silent ping to `/api/health` the instant
the page loads — waking Render before the user clicks anything.

**Also set up UptimeRobot** (free, 5 min):
1. uptimerobot.com → Add Monitor → HTTP(s)
2. URL: `https://woodcraft-backend.onrender.com/api/health`
3. Interval: 5 minutes
4. Your backend never sleeps during the day.
