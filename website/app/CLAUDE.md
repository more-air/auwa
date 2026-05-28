# Auwa App (auwa.app) — Kokoro Mirror PWA

Standalone Next.js project serving the Kokoro Mirror at https://auwa.app.

Separate Vercel project: `auwa-app` (prj_zaDXSo2qMY4dO7aeScdU1myrjycW). All
routes live at root level (`/welcome`, `/rest`, `/trove`, `/senshin`,
`/archive`, `/kokoro`, `/letter`, `/settings`) — there is no `/app/pwa`
prefix here.

Source of truth for app spec: `../../context/pillar/app.md`. Brand tokens
mirror the cosmic palette in `../main/src/app/globals.css` — keep them in
sync if either changes.

## Deploy

```bash
cd /Users/admin/Github/auwa/website/app && \
  export PATH="/usr/local/bin:$PATH" && \
  npx vercel --prod --yes
```

Confirmation: output must list `Aliased: https://auwa.app`.

## What's deferred (v1 friends release)

- Real Claude Haiku classification (placeholder library serves text)
- End-to-end encryption for Senshin (plain localStorage v1; see
  `context/business/privacy.md` §3 for the real architecture)
- Account/login (continue-as-guest only)
- Stripe billing (free tier behaviour everywhere)
- Real photo upload to Vercel Blob (in-memory data URLs)
- Server-rendered share cards (Web Share API + clipboard fallback)
- Boids physics in Trove (simple drift only)
- Audio in Sanctuary
- 365-prompt Daily Light library (~25 scaffold prompts)
