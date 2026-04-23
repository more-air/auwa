# AUWA PDF Generation

The recipe for generating `documents/AUWA-*.pdf` from any context file. Load this when the user asks to produce or refresh a PDF. Other tooling files (image pipeline, audio prep) can sit alongside in `context/tooling/` as they're needed.

---

## WHEN TO USE

Used when the user says something like "generate a PDF from [file].md and put it in documents/" — works for any `context/**/*.md` file (brand, business, manifesto, arrival, instagram, etc.), not just website work.

**IMPORTANT: Puppeteer (used by md-to-pdf) hangs when multiple instances run concurrently. Always generate PDFs one at a time, in the foreground, never in background mode.**

**Step 1 — Ensure the CSS file exists.** Check for `/tmp/auwa-pdf.css`. If missing (e.g. after a restart), recreate it:

```css
body { font-family: Georgia, 'Times New Roman', serif; font-size: 11pt; line-height: 1.65; color: #1a1a1a; max-width: 100%; }
h1, h2, h3, h4, h5, h6 { font-family: Georgia, 'Times New Roman', serif; font-weight: normal; margin-top: 1.5em; margin-bottom: 0.5em; }
h1 { font-size: 22pt; } h2 { font-size: 16pt; border-bottom: 1px solid #ccc; padding-bottom: 0.3em; } h3 { font-size: 13pt; } h4 { font-size: 11pt; font-style: italic; }
table { border-collapse: collapse; width: 100%; margin: 1em 0; font-size: 10pt; } th, td { border: 1px solid #ccc; padding: 6px 10px; text-align: left; } th { background-color: #f5f5f5; font-weight: bold; }
blockquote { border-left: 3px solid #ccc; margin-left: 0; padding-left: 1em; color: #555; }
code { font-size: 9.5pt; background: #f5f5f5; padding: 2px 4px; border-radius: 3px; }
hr { border: none; border-top: 1px solid #ddd; margin: 2em 0; }
@page { size: A4; margin: 25mm 20mm; }
```

**Step 2 — Kill any stuck Chromium processes first:**
```
pkill -9 -f "chromium" 2>/dev/null; pkill -9 -f "chrome" 2>/dev/null; sleep 1
```

**Step 3 — Generate ONE PDF at a time, in the FOREGROUND (not background), with PATH set:**
```
export PATH="/usr/local/bin:$PATH" && npx md-to-pdf context/[folder]/[file].md --stylesheet /tmp/auwa-pdf.css 2>&1
```
Then move the output: `mv context/[folder]/[file].pdf documents/AUWA-[Name].pdf`

**File → PDF name mapping:**

*Pillars:*
- `context/pillar/app.md` → `documents/AUWA-App.pdf`
- `context/pillar/book.md` → `documents/AUWA-Book.pdf`

*Brand:*
- `context/brand/brand.md` → `documents/AUWA-Brand.pdf`
- `context/brand/manifesto.md` → `documents/AUWA-Manifesto.pdf`
- `context/brand/reference.md` → `documents/AUWA-Reference.pdf`

*Business:*
- `context/business/business.md` → `documents/AUWA-Business.pdf`
- `context/business/competitors.md` → `documents/AUWA-Competitors.pdf`
- `context/business/japan.md` → `documents/AUWA-Japan.pdf`
- `context/business/structure.md` → `documents/AUWA-Structure.pdf`

*Website:*
- `context/website/website.md` → `documents/AUWA-Website.pdf`

*Marketing:*
- `context/marketing/arrival.md` → `documents/AUWA-Arrival.pdf`
- `context/marketing/instagram.md` → `documents/AUWA-Instagram.pdf`
- `context/marketing/social.md` → `documents/AUWA-Social.pdf`

*Claude-only (no PDF):* `context/pillar/journal.md`, `context/marketing/newsletter.md`, `context/website/patterns.md`, `context/tooling/pdf.md`.

**If it hangs:** Kill Chrome (`pkill -9 -f "chromium"`), wait 2 seconds, retry. Never run two md-to-pdf commands in parallel.
