# AUWA Instagram

This folder holds the prepared briefs for every AUWA Instagram post. One file per post, one file per week for the plan, named by date.

## Files

- `YYYY-MM-DD-[slug].md` — individual post briefs, one per post
- `weeks/YYYY-WW.md` — weekly plan files, one per ISO week

## Workflow

1. **Plan the week.** Run `/ig-week` on Monday. Outputs three slots (Tue/Wed Reel, Fri/Sat Slideshow, Sun atmospheric) and saves to `weeks/YYYY-WW.md`.
2. **Prepare each post.** Run `/ig-post` for Reels and single/atmospheric posts. Run `/ig-slideshow` for article digests. Each command asks for the asset and context, drafts caption, hashtags, alt text, first comment, and Story plan, and saves the brief here.
3. **Produce the visual.** For slideshows, design the 5 slides in Figma or Canva using the design brief in the saved file. For Reels, export the 9:16 cut from Runway or Premiere.
4. **Schedule in Buffer or Later.** Paste the caption, attach the asset, add alt text, set the first-comment to auto-post, schedule for the time in the brief.
5. **Publish day.** After the post goes live, share to Story with the link sticker from the brief. Pin to grid if the brief says to.

## Voice rules (non-negotiable)

- No em dashes. Ever.
- No "here's the thing," "let's be honest," "in a world where."
- Three sentences per caption, maximum, unless there's a genuine reason.
- Caption text is IG-search-indexed. Weave natural keywords, don't force them.
- No CTAs. The link in bio does that job.
- Full writing style rules in root `CLAUDE.md` and `context/instagram.md`.

## Phase 1 reminder

Restart burst is daily for the first two to three weeks (April-May 2026), then settles to the three-a-week cadence. Buffer queue should be loaded a week ahead at all times.
