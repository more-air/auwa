---
name: Deploy
description: Commit all website changes and push to Vercel via git push to main.
---

## Instructions

Deploy the current state of the AUWA website to Vercel.

1. Run `git status` to see what's changed
2. Show the user a summary of the changes
3. Stage all relevant files (website code, context files, commands, brand assets). Do NOT stage `photos/` or `documents/` (these are gitignored).
4. Commit with a clear, concise message describing what changed
5. Push to `origin main`
6. Deploy using the Vercel CLI (git push does NOT auto-deploy to the correct project):
   ```bash
   cd /Users/admin/Github/auwa/website/main && export PATH="/usr/local/bin:$PATH" && npx vercel --prod --yes
   ```
7. Confirm the deployment URL from the output

If there are no changes to commit, say so and stop.

## Troubleshooting

- If the build fails with stale `.next` cache errors (ENOENT, missing `_document.js`), delete `.next/` and rebuild: `rm -rf .next && npx next build`
- If types fail, check for `as` casts on string literals passed to component props — use explicit union types instead
- The ESLint warning about `eslint-config-next/core-web-vitals` is a known issue with Next.js 15 and can be ignored
