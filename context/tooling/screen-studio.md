# Screen Studio Resize

How to take a 4K `.mp4` exported from the Screen Studio app and produce the two portfolio-ready siblings used in `share/auwa-demo/` and around the rest of the project:

- `<name>-1600.mp4` — ~4.6 MB target, 1600px wide
- `<name>-1920.mp4` — ~7.5 MB target, 1920px wide

Both use H.264 High profile (universal browser support), 120-frame keyframe interval, frame reordering on. Bitrate is computed per-file from `targetBytes × 8 / durationSeconds`, so a longer clip lands at a lower bitrate to hold the byte budget.

## When to use

Whenever Screen Studio outputs a 4K capture and a smaller web/embed-friendly version is wanted next to it. The same recipe was used in May 2026 for `share/auwa-demo/book-hero-{1600,1920}.mp4`, the home-hero set, the journal-article set, and the book-carousel set.

## Why Swift, not ffmpeg

`ffmpeg` is not installed on this machine and Screen Studio's bundled binary is sandboxed and silently exits when called externally. The portable path is a tiny AVFoundation script that ships with the repo.

## Run

```bash
swift /Users/admin/Github/auwa/share/_scripts/screen-studio-resize.swift <path/to/input-4k.mp4> [<more-4k.mp4> ...]
```

The script writes two siblings into the same directory as each input. The `-4k` suffix is stripped from the stem before adding `-1600` / `-1920`, so:

```
book-hero-speed-2x-4k.mp4
  →  book-hero-speed-2x-1600.mp4
  →  book-hero-speed-2x-1920.mp4
```

A single file with no `-4k` in its name (`foo.mp4`) becomes `foo-1600.mp4` + `foo-1920.mp4`.

## Aspect ratio

Output height is derived from the source aspect ratio, so the same command works for both Screen Studio default modes:

- **4:3 capture** (2880×2160) → 1600×1200 and 1920×1440
- **16:9 capture** (3840×2160) → 1600×900 and 1920×1080

Heights are rounded to the nearest even number (H.264 requires it).

## Tuning the targets

Edit the `variants` array at the top of `share/_scripts/screen-studio-resize.swift`:

```swift
let variants: [Variant] = [
    Variant(suffix: "-1600", width: 1600, targetBytes: 4_600_000),
    Variant(suffix: "-1920", width: 1920, targetBytes: 7_500_000),
]
```

The 4.6 MB and 7.5 MB numbers come from "comfortably under 5 MB for embeds" and "portfolio-crisp at 1920w" respectively. The `book-hero` clip at 23s sat at ~2.6 Mbps at 7.5 MB, which was the floor for crispness — if a future longer clip looks soft at 1920w, either bump `targetBytes` for `-1920` or split it into shorter clips.

## Sanity check after a run

```bash
ls -lh share/auwa-demo/*-1600.mp4 share/auwa-demo/*-1920.mp4
```

1600 outputs should be 3.5–5 MB; 1920 outputs 5.5–8 MB. Anything well outside that range usually means an unusually long source clip — adjust `targetBytes` or shorten the source.
