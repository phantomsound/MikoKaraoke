# 🎤 MikoKaraoke

Multi-page karaoke queue app with DJ console, reports, and tipping.

## Pages
- **index.html** – Home (Queue signup + PIN-locked DJ Console)
- **reports.html** – Reports (history table, top singers/songs, CSV export)
- **tipping.html** – Virtual Tip Jar (Venmo & Cash App QR codes + links)
- **settings.html** – PIN gate & change PIN (device-local)

Header shows Venmo and Cash App; footer has site navigation.

## Setup
1. Host these files on any static host (GitHub Pages, Netlify, Vercel, etc).
2. In Supabase, run `schema.sql` to create tables.
3. Update **Supabase URL and anon key** in `assets/shared.js` if needed.

Current config:
- SUPABASE_URL: `https://ggntnabyoxcmveflntov.supabase.co`
- Anon Key: embedded in code for demo

## Behavior
- **Join Queue**: only name required; song/artist/contact optional.
- **Feature**: moves selected singer to *Now Featuring* and removes from queue.
- **Mark Done**: appends current *Now Featuring* to history and clears it.
- **Up Next**: shows first in queue (Home footer).
- **Realtime**: live updates via Supabase, with a polling fallback.

## Security
- PIN lock: default `123456` + master `03861745` (device-local).
- Settings require same PIN. (Backend auth can be added later.)

## Tipping
- Venmo: https://account.venmo.com/pay?recipients=kjtherapist (label: Karaoke Therapy)
- Cash App: https://cash.app/$fatfellacash (label: Terrence Moore)
- QR codes are rendered via `api.qrserver.com`. Swap to a local generator anytime.

## Deploy
- GitHub Pages: push the repo and enable Pages (root).
- Netlify/Vercel: drag-and-drop the folder.
