#!/usr/bin/env python3
"""Render AUWA editorial slideshow text frames at 1080x1350.

Two variants match the Figma originals byte-for-byte:
  quote  - large pull quote with credit line and bottom-left wordmark
  close  - "Continue reading on the AUWA Journal." with article title,
           URL, and centred wordmark

Inputs are passed via CLI flags so the post.md command can call it.
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "_assets"
FONT_DIR = ASSETS / "fonts"
EB_GARAMOND = str(FONT_DIR / "EBGaramond.ttf")
INSTRUMENT_SANS = str(FONT_DIR / "InstrumentSans.ttf")
WORDMARK_MASK = ASSETS / "auwa-wordmark-mask.png"

CANVAS = (1080, 1350)
# Brand colours from context/brand/brand.md
YORU = (31, 42, 46)         # #1F2A2E
WASHI = (239, 233, 221)     # #EFE9DD

# Two themes — same composition, swapped foreground/background.
THEMES = {
    "dark":  {"bg": YORU,  "text": WASHI},
    "light": {"bg": WASHI, "text": YORU},
}

SIDE_MARGIN = 110
QUOTE_BLOCK_WIDTH = 820     # tighter than mirrored left padding for editorial inset
WORDMARK_WIDTH = 256        # matches the Figma wordmark scale
TOP_GAP = 180               # canvas top to quote mark top
TEXT_TOP_Y = 448            # large text top — identical on both slides
BOTTOM_GAP = 180            # logo bottom to canvas bottom
SMALL_TEXT_GAP = 50         # large text bottom to small text top, identical on both slides
LARGE_FONT_SIZE = 86        # both slides use the same large-text size
LARGE_LINE_HEIGHT = 94      # both slides use the same line-height
CREDIT_INTERNAL_GAP = 38    # bold credit line to URL line


def blend(text_rgb: tuple[int, int, int], bg_rgb: tuple[int, int, int], alpha: float) -> tuple[int, int, int]:
    """Pre-blend text colour onto a solid background at the given alpha.

    PIL's draw.text on an RGB canvas can't do real alpha — composing the
    blended colour ahead of time is the cleanest path and gives identical
    output to drawing on RGBA + composite.
    """
    return tuple(round(bg_rgb[i] * (1 - alpha) + text_rgb[i] * alpha) for i in range(3))


def load_font(path: str, size: int, weight: int | None = None) -> ImageFont.FreeTypeFont:
    """Load a variable font and set its weight axis.

    Pillow's set_variation_by_axes takes ALL axes in their declared order,
    so we read the axis list and substitute weight while keeping the
    defaults for any other axes (e.g. Width on Instrument Sans).
    """
    font = ImageFont.truetype(path, size)
    if weight is not None:
        try:
            axes = font.get_variation_axes()
            values = [axis["default"] for axis in axes]
            for i, axis in enumerate(axes):
                if axis["name"] == b"Weight":
                    values[i] = max(axis["minimum"], min(axis["maximum"], weight))
            if values:
                font.set_variation_by_axes(values)
        except (OSError, AttributeError):
            pass
    return font


def wrap(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.FreeTypeFont, max_width: int) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current = ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if draw.textlength(candidate, font=font) <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def paste_wordmark(canvas: Image.Image, position: tuple[int, int], colour: tuple[int, int, int], anchor: str = "left") -> int:
    """Composite the AUWA wordmark in the theme text colour.

    The vendored mask is greyscale: logo pixels are bright (255), background
    is dark (0). The luminance is used directly as the alpha channel, then
    a solid fill in the chosen colour is composited through it.
    Returns the bottom-edge y-coordinate so callers can chain layout.
    """
    alpha = Image.open(WORDMARK_MASK).convert("L")
    bbox = alpha.getbbox()
    if bbox:
        alpha = alpha.crop(bbox)
    aspect = alpha.size[1] / alpha.size[0]
    target_size = (WORDMARK_WIDTH, int(WORDMARK_WIDTH * aspect))
    alpha = alpha.resize(target_size, Image.LANCZOS)

    layer = Image.new("RGBA", target_size, colour + (0,))
    layer.putalpha(alpha)

    x, y = position
    if anchor == "centre":
        x -= target_size[0] // 2
    canvas.paste(layer, (x, y), layer)
    return y + target_size[1]


def _wordmark_y() -> int:
    """Y-position of the top of the wordmark, anchored BOTTOM_GAP from the canvas bottom."""
    wordmark_height = int(WORDMARK_WIDTH * 110 / 561)
    return CANVAS[1] - BOTTOM_GAP - wordmark_height


def render_quote(quote: str, _slug_unused: str | None, out: Path, theme: str) -> None:
    palette = THEMES[theme]
    bg, text = palette["bg"], palette["text"]
    quote_mark_colour = blend(text, bg, 0.20)
    url_colour = blend(text, bg, 0.50)

    img = Image.new("RGB", CANVAS, bg)
    draw = ImageDraw.Draw(img)

    quote_mark_font = load_font(EB_GARAMOND, 320, weight=400)
    quote_font = load_font(EB_GARAMOND, LARGE_FONT_SIZE, weight=400)
    credit_bold = load_font(INSTRUMENT_SANS, 26, weight=700)
    credit_regular = load_font(INSTRUMENT_SANS, 26, weight=400)

    # Opening quote mark — text colour at 20% so it sits gently behind the rhythm
    draw.text((SIDE_MARGIN - 4, TOP_GAP), "\u201c", font=quote_mark_font, fill=quote_mark_colour, anchor="lt")

    # Quote body — fixed top y shared with slide 2 for cross-slide alignment
    lines = wrap(draw, quote, quote_font, QUOTE_BLOCK_WIDTH)
    y = TEXT_TOP_Y
    for line in lines:
        draw.text((SIDE_MARGIN, y), line, font=quote_font, fill=text, anchor="lt")
        y += LARGE_LINE_HEIGHT

    # Credit block — SMALL_TEXT_GAP from the last large-text baseline advance
    credit_y = y + SMALL_TEXT_GAP
    draw.text((SIDE_MARGIN, credit_y), "AUWA Journal", font=credit_bold, fill=text, anchor="lt")
    draw.text((SIDE_MARGIN, credit_y + CREDIT_INTERNAL_GAP), "auwa.life/journal", font=credit_regular, fill=url_colour, anchor="lt")

    paste_wordmark(img, (SIDE_MARGIN, _wordmark_y()), text, anchor="left")

    img.save(out, "JPEG", quality=92, optimize=True)


def render_close(title: str, slug: str, out: Path, theme: str) -> None:
    palette = THEMES[theme]
    bg, text = palette["bg"], palette["text"]
    url_colour = blend(text, bg, 0.50)

    img = Image.new("RGB", CANVAS, bg)
    draw = ImageDraw.Draw(img)

    headline_font = load_font(EB_GARAMOND, LARGE_FONT_SIZE, weight=400)
    title_bold = load_font(INSTRUMENT_SANS, 26, weight=700)
    url_regular = load_font(INSTRUMENT_SANS, 26, weight=400)

    # Two-line headline, hard-wrapped after "on" so the carousel reads with rhythm
    headline_lines = ["Continue reading on", "the AUWA Journal."]
    cx = CANVAS[0] // 2
    y = TEXT_TOP_Y
    for line in headline_lines:
        draw.text((cx, y), line, font=headline_font, fill=text, anchor="mt")
        y += LARGE_LINE_HEIGHT

    # Title + URL pair, centred, SMALL_TEXT_GAP below — matches slide 1's spacing
    pair_y = y + SMALL_TEXT_GAP
    draw.text((cx, pair_y), title, font=title_bold, fill=text, anchor="mt")
    draw.text((cx, pair_y + CREDIT_INTERNAL_GAP), "auwa.life/journal", font=url_regular, fill=url_colour, anchor="mt")

    paste_wordmark(img, (cx, _wordmark_y()), text, anchor="centre")

    img.save(out, "JPEG", quality=92, optimize=True)


def main() -> int:
    parser = argparse.ArgumentParser(description="Render AUWA editorial text frames")
    parser.add_argument("--variant", required=True, choices=["quote", "close"])
    parser.add_argument("--theme", default="dark", choices=["dark", "light"], help="Yoru-on-Washi or Washi-on-Yoru. Default: dark.")
    parser.add_argument("--out", required=True, help="Output JPG path")
    parser.add_argument("--quote", default="", help="Pull quote text (variant=quote)")
    parser.add_argument("--title", default="", help="Article title (variant=close)")
    parser.add_argument("--slug", default="", help="Article slug")
    args = parser.parse_args()

    out_path = Path(args.out)
    out_path.parent.mkdir(parents=True, exist_ok=True)

    if args.variant == "quote":
        if not args.quote:
            print("error: --quote required for variant=quote", file=sys.stderr)
            return 2
        render_quote(args.quote, args.slug or None, out_path, args.theme)
    else:
        if not args.title or not args.slug:
            print("error: --title and --slug required for variant=close", file=sys.stderr)
            return 2
        render_close(args.title, args.slug, out_path, args.theme)

    print(f"wrote {out_path} ({out_path.stat().st_size // 1024} KB)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
