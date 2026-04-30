---
name: Deploy
description: Commit all website changes and push to Vercel via git push to main.
---

## Instructions

Deploy the current state of the Auwa website to Vercel.

1. Run `git status` to see what's changed
2. Show the user a summary of the changes
3. Stage all relevant files (website code, context files, commands, brand assets). Do NOT stage `photography/_lightroom/` or `documents/` (these are gitignored).
4. Commit with a clear, concise message describing what changed
5. Push to `origin main` in the Auwa repo (github: `more-air/auwa`)
6. **If any `/Users/admin/Github/moreair/.claude/skills/**` files or other shared More Air assets were touched in this session, also commit and push those from inside `/Users/admin/Github/moreair/`** — separate repo, separate push. Do this BEFORE the Vercel deploy so the repos stay in sync.
7. Deploy to Vercel using the CLI (git push does NOT auto-deploy). The
   command MUST be a single bash call that starts with the `cd` and ends
   with `vercel --prod --yes` — do NOT chain git commands before the `cd`
   (you'll land back in the repo root and deploy to the wrong project):
   ```bash
   cd /Users/admin/Github/auwa/website/main && \
     [ "$(pwd)" = "/Users/admin/Github/auwa/website/main" ] || { echo "ABORT: wrong cwd $(pwd)"; exit 1; } && \
     export PATH="/usr/local/bin:$PATH" && \
     npx vercel --prod --yes
   ```
   The `pwd` guard halts the deploy if the `cd` didn't land correctly (e.g. path typo, stale shell state). Without it, vercel would fall back to the nearest `.vercel/project.json` in the cwd chain.
8. Confirm the deployment URL lists `Aliased: https://auwa.life` in the output

If there are no changes to commit, say so and stop.

## CRITICAL — Vercel project

Multiple Vercel projects are linked to this repo. **The command above MUST be run from `/Users/admin/Github/auwa/website/main/`, not the repo root.** Running it from `/Users/admin/Github/auwa/` deploys to the wrong project (`auwa-app.vercel.app`) instead of `auwa-life` (which is `auwa.life`). Confirmation: the expected output contains `auwa-life-<hash>` in the Production URL and `Aliased: https://auwa.life`. If you see `auwa-a<hash>` or any other project prefix, you're in the wrong directory — redeploy from `website/main/`.

The `.vercel/project.json` at `website/main/.vercel/project.json` pins project ID `prj_doT3hBKj6wDaSBXMFmkv24Lbp23V` (auwa-life).

The `.vercel/` folder at the repo root was renamed to `.vercel.disabled/` on 2026-04-21 to stop the Vercel CLI from silently auto-picking the `auwa-app` project when run from the wrong cwd. If a command now deploys to auwa-app by accident, it would first have to re-link the project interactively, which will fail under `--yes`.

## Troubleshooting

- If the build fails with stale `.next` cache errors (ENOENT, missing `_document.js`), delete `.next/` and rebuild: `rm -rf .next && npx next build`
- If types fail, check for `as` casts on string literals passed to component props — use explicit union types instead
- The ESLint warning about `eslint-config-next/core-web-vitals` is a known issue with Next.js 15 and can be ignored
