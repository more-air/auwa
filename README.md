# Auwa

This folder is the whole Auwa project: the writing, the plans, the website, and the record of every decision made so far. It lives on GitHub so both of our Macs can work from the same copy.

If you are reading this and you are not sure what to do first, the answer is almost always: open Claude Code in this folder and type `/sync`.

---

## The two machines

We work on Auwa from more than one Mac. GitHub sits in the middle and holds the shared copy.

| When | What to do |
| --- | --- |
| Starting a session | `/sync` (pulls down whatever the other machine did) |
| Finishing a session, writing or plans only | `/sync` again (pushes your work up) |
| Finishing a session, website changed | `/website:deploy` (pushes up **and** puts the site live) |

Nothing is shared until it has been pushed to GitHub, so if you finish a session without running one of those, the other machine will not see the work. It is worth making it a habit at both ends.

Some things are kept out of GitHub on purpose. Instagram content lives in the shared Dropbox folder, and raw photography, video files and passwords stay off it entirely. `/sync` will explain this if something looks missing.

---

## What is in here

| Folder | What it holds |
| --- | --- |
| `CLAUDE.md` | The single most important file. Everything Claude needs to know about Auwa: what it is, what we make, what we decided and why. Read the top before starting anything. |
| `context/` | The detail behind `CLAUDE.md`, split by subject. The brand, the business plan, the book, the journal, the store, marketing, Japan. This is where the thinking lives. |
| `documents/` | The same context files as PDFs, for reading away from the computer or sending to someone. |
| `website/main/` | The auwa.life website. This is the live site. |
| `website/app/` | The Kokoro Mirror app. Built, then parked in August 2026. Left alone. |
| `book/` | The four books, one folder each. |
| `photography/` | Photography for the journal and the site. The finished exports are here; the raw files stay on Dropbox. |
| `audio/` | Sound used on the site. |
| `scripts/` | Small tools for the mailing list. Run by Claude, not by hand. |
| `.claude/` | The commands below, and the settings that make them work. |
| `archive/`, `_backups/` | Old versions kept in case we want them back. Safe to ignore. |

---

## Commands

In Claude Code, type the command and it walks you through the rest. Each one asks questions, shows you the result, and only does the final step once you approve it.

| Command | What it does |
| --- | --- |
| `/sync` | Pulls the latest files down from GitHub, and pushes yours up. Start here. |
| `/website:deploy` | Commits the website changes and puts auwa.life live. |
| `/journal:article` | Writes a new journal article, prepares the images, and builds the page. |
| `/journal:optimise` | Improves articles that are already published so more people find them. |
| `/instagram:post` | Prepares one Instagram post, ready to schedule. |
| `/instagram:week` | Plans next week's three posts across the content pillars. |
| `/marketing:monthly` | Writes and sends the monthly letter to the mailing list. |
| `/marketing:newsletter` | Writes and sends a one-off newsletter. |
| `/marketing:import-leads` | Adds emails collected by Instagram ads to the mailing list. |

You do not have to use a command. Plain English works just as well, and for anything that is not on the list it is the better option.

---

## Shortcut phrases

`CLAUDE.md` lists a set of phrases that make Claude load the right background before it answers. Saying "store session" or "book route" or "collab" at the start of a message saves explaining the whole picture again. The full list is near the bottom of `CLAUDE.md` under Context Files.

---

## Where things are published

| | |
| --- | --- |
| Website | auwa.life (all variants redirect there) |
| App | auwa.app (live, unmaintained, parked) |
| Code | github.com/more-air/auwa |
| Hosting | Vercel, deployed by `/website:deploy` |
| Email | Resend, sent by the marketing commands |

---

## Two rules worth knowing

**Nothing gets deleted.** There is a long safety section at the top of `CLAUDE.md` that stops Claude from throwing away work. It exists because a session once wiped several days of writing in one command. If Claude ever proposes reverting, discarding or resetting anything, the answer is no until it has explained exactly what would be lost.

**The context files are the memory.** Claude starts each session knowing nothing except what is written down here. When a real decision gets made, it belongs in `CLAUDE.md` or the relevant file in `context/`, or the next session will quietly work from the old plan.

---

## Who does what

Rieko creates: the illustrations, the books, the character and its master form, the seasonal work, and every conversation in Japanese with artists, craftsmen and galleries.

Tom produces: the brand, the publishing route, the store, the website, figure production, marketing and the business side.

*Last updated 13 August 2026.*
