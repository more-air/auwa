---
name: Sync
description: Pull the latest Auwa files down from GitHub and push anything this machine has that GitHub doesn't. Safe by default. Never discards local work.
---

## Purpose

Tom and Rieko work on more than one Mac. GitHub is the shared copy in the middle. Run this at the **start of every session** to pull down whatever the other machine did, and again at the end if you only changed context/writing files (for website code, use `/website:deploy` instead, which also deploys to Vercel).

This command is deliberately cautious. Its job is to make both machines match **without ever losing a file**. If there is any ambiguity, it stops and asks.

## Absolute rules

Never run any of these, in any mode, for any reason, as part of this command:

`git checkout <ref> -- <path>` · `git checkout -- <path>` · `git restore` · `git reset --hard` · `git reset --merge` · `git clean -fd` · `git stash drop` · `git stash clear` · `git push --force` · `git rebase -i` · `rm -rf` on any repo path

If a pull conflicts, the answer is to resolve the conflict in the file, or to stop and ask. It is never to throw away one side. See the safety rules at the top of `CLAUDE.md`.

## Steps

**1. Report where we are.**

```bash
cd /Users/admin/Github/auwa && git status --short && git stash list && git fetch origin && git status -sb
```

Adjust the path if the repo lives elsewhere on this machine (use the current working directory's repo root rather than assuming a username).

**2. If there are uncommitted local changes, stop and ask.**

Show the user the list and ask which they want:

- Commit them now, then pull (recommended, and the usual answer)
- Pull anyway (fine when the changed files are not the ones coming down, but say so explicitly)

Do not stash without being asked, and never drop a stash.

**3. Pull.**

```bash
cd /Users/admin/Github/auwa && git pull --rebase origin main
```

If the rebase stops on a conflict: show the conflicted files, explain in plain English what each side changed, and ask how to resolve. `git rebase --abort` is safe and puts things back as they were, so offer it as the escape hatch.

**4. Say what arrived, in plain English.**

```bash
cd /Users/admin/Github/auwa && git log --oneline ORIG_HEAD..HEAD && git diff --stat ORIG_HEAD HEAD
```

Do not just paste the log. Summarise it: which context files moved, whether the website changed, whether any decision in `CLAUDE.md` was revised. If `CLAUDE.md` or anything under `context/` changed, read the diff and tell the user the substance, because that is the shared brain and this session needs to know it.

**5. Reinstall website dependencies only if they changed.**

If `website/main/package-lock.json` or `website/main/package.json` appeared in the diff:

```bash
cd /Users/admin/Github/auwa/website/main && export PATH="/usr/local/bin:$PATH" && npm install
```

If nothing else changed under `website/`, skip this.

**5b. Large files (Git LFS).**

The 3D and print files (`.blend`, `.stl`, `.3mf`, `.glb`, listed in `.gitattributes`) are stored with Git LFS. Git only holds a small pointer for each one; the real file is fetched separately.

If `git lfs version` fails, LFS is not installed on this machine. **Stop and say so**, because a pull without it produces 133-byte placeholder files that look like the real thing and will not open in Blender or the slicer. Install it first (`brew install git-lfs && git lfs install`), then:

```bash
cd /Users/admin/Github/auwa && git lfs pull
```

A normal `git pull` fetches LFS content automatically once LFS is installed. `git lfs pull` is the repair command for a machine that pulled before LFS was set up.

**6. Push anything this machine is holding.**

If step 1 or the pull left local commits that GitHub does not have, offer to push:

```bash
cd /Users/admin/Github/auwa && git push origin main
```

Pushing context and writing files is fine on its own. If **website code** changed, say so and recommend `/website:deploy` instead, because a push alone does not put the site live.

**7. The More Air repo, only if it is there and only if asked.**

`/Users/admin/Github/moreair` is a separate repo on branch `develop`. It holds the shared More Air skills. Do not touch it as a matter of routine. If the user asks for "everything", run the same steps there against `origin develop`, and report it separately so the two repos never get confused for each other.

## What is deliberately not synced

Say this if the user is surprised something is missing on the other machine. These are excluded on purpose (see `.gitignore`), and live in Dropbox or locally instead:

- Instagram post content (`social`, single source of truth is the shared Dropbox folder)
- Raw and working photography, Lightroom catalogues, video source frames
- `share/` handoff assets, `bug/` scratch files
- `node_modules`, `.next`, `.env` and `.env.local` (secrets never go to GitHub; if the other machine needs env vars, they come from Vercel or from Tom, not from a commit)

## Finish

End with one short line: what came down, what went up, and whether anything needs a decision. If both machines already matched, say "already in sync" and stop.
