#!/usr/bin/env python3
"""Render AUWA editorial slideshow text frames at 1080x1350.

Three variants:
  cover  - hero photo + 10% black overlay + drop-shadowed wordmark, optional
           eyebrow, title (1-2 words), and Japanese translation. Used as the
           text-overlay alternative to the clean image-hero.jpg on slide 1.
  quote  - large pull quote with credit line and bottom-left wordmark
  close  - "Read the story in / the Auwa Journal." with article title,
           URL, and centred wordmark

Inputs are passed via CLI flags so the post.md command can call it.
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "_assets"
FONT_DIR = ASSETS / "fonts"
EB_GARAMOND = str(FONT_DIR / "EBGaramond.ttf")
INSTRUMENT_SANS = str(FONT_DIR / "InstrumentSans.ttf")
NOTO_SERIF_JP = str(FONT_DIR / "NotoSerifJP-SemiBold.ttf")
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

# Cover slide spec (slide 1 alternative — see render_cover docstring)
COVER_TITLE_FONT_SIZE = 160
COVER_TITLE_TRACKING_PCT = -0.02   # -2% per em
COVER_EYEBROW_FONT_SIZE = 24
COVER_EYEBROW_TRACKING_PCT = 0.10  # 10% per em
COVER_JP_FONT_SIZE = 60
COVER_TITLE_TOP_Y = 570            # title text-bbox top (baseline lands near canvas vertical centre)
COVER_EYEBROW_TOP_Y = 530          # eyebrow text-bbox top, sits above the title
COVER_JP_GAP_FROM_TITLE_BASELINE = 54
COVER_LOGO_TOP_Y = 120
COVER_LOGO_HEIGHT = 30
COVER_OVERLAY_OPACITY = 0.10       # 10% black wash sits between photo and text for contrast
COVER_SHADOW_OFFSET = (0, 4)
COVER_SHADOW_BLUR = 25             # Pillow Gaussian radius ≈ Figma blur 50 / 2
COVER_SHADOW_OPACITY = 0.25        # 25% black


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


def draw_text_tracked(
    layer: Image.Image,
    cx: float,
    top_y: float,
    text: str,
    font: ImageFont.FreeTypeFont,
    fill: tuple[int, int, int, int],
    tracking_px: float = 0.0,
) -> None:
    """Draw text horizontally centred on cx with manual letter-spacing.

    PIL has no native tracking parameter, so each char is drawn individually.
    Each character is drawn with `anchor="ls"` (left, baseline) at a SHARED
    baseline derived from the first character's bbox-top — otherwise per-glyph
    "lt" anchoring places lowercase letters at their x-height-top instead of
    the cap-height-top, breaking the baseline (lowercase letters appear pushed
    up to the visual top of the word).

    `top_y` is the visual top of the first character (matching the brand
    spec's "sits NNNpx from image top"). Total width is computed first so the
    run centres on `cx`.
    """
    if not text:
        return
    draw = ImageDraw.Draw(layer)
    ascent = font.getmetrics()[0]
    first_glyph_top = font.getbbox(text[0])[1]
    baseline_y = top_y + ascent - first_glyph_top

    char_widths = [draw.textlength(c, font=font) for c in text]
    total = sum(char_widths) + tracking_px * max(0, len(text) - 1)
    cursor = cx - total / 2
    for i, c in enumerate(text):
        draw.text((cursor, baseline_y), c, font=font, fill=fill, anchor="ls")
        cursor += char_widths[i] + tracking_px


def build_wordmark_layer(
    canvas_size: tuple[int, int],
    centre_x: int,
    top_y: int,
    target_height: int,
    colour: tuple[int, int, int],
) -> Image.Image:
    """Return a transparent RGBA the size of the canvas with the AUWA wordmark
    rendered horizontally centred at (centre_x, top_y), scaled to target_height.
    """
    alpha = Image.open(WORDMARK_MASK).convert("L")
    bbox = alpha.getbbox()
    if bbox:
        alpha = alpha.crop(bbox)
    aspect = alpha.size[0] / alpha.size[1]
    target_size = (max(1, round(target_height * aspect)), target_height)
    alpha = alpha.resize(target_size, Image.LANCZOS)

    layer = Image.new("RGBA", canvas_size, (0, 0, 0, 0))
    fill_layer = Image.new("RGBA", target_size, colour + (0,))
    fill_layer.putalpha(alpha)
    layer.paste(fill_layer, (centre_x - target_size[0] // 2, top_y), fill_layer)
    return layer


def make_drop_shadow(
    fg_layer: Image.Image,
    offset: tuple[int, int],
    blur_radius: float,
    opacity: float,
) -> Image.Image:
    """Build a drop-shadow RGBA layer from `fg_layer`'s alpha silhouette.

    The result is the same size as `fg_layer`. Where fg_layer is opaque, the
    shadow has alpha = 255 * opacity; the layer is then offset and Gaussian-
    blurred. Composite this BEFORE the foreground layer onto the photo.
    """
    alpha = fg_layer.split()[-1]
    scaled = alpha.point(lambda a: int(a * opacity))
    shadow = Image.new("RGBA", fg_layer.size, (0, 0, 0, 0))
    black = Image.new("RGBA", fg_layer.size, (0, 0, 0, 255))
    shadow.paste(black, (0, 0), scaled)

    offset_layer = Image.new("RGBA", fg_layer.size, (0, 0, 0, 0))
    offset_layer.paste(shadow, offset, shadow)
    return offset_layer.filter(ImageFilter.GaussianBlur(radius=blur_radius))


def render_cover(
    photo_path: Path,
    title: str,
    eyebrow: str | None,
    jp_text: str | None,
    out: Path,
) -> None:
    """Render the slide-1 cover frame.

    Layers, bottom to top:
      1. Photo, fitted to 1080x1350 with cover-crop if not already that size
      2. 10% black overlay for text contrast
      3. Drop-shadow layer (offset Y:4, blur radius 25, black 25%)
      4. Foreground layer in Washi: optional eyebrow (Instrument Sans Medium,
         24pt, 10% tracking), title (EB Garamond, 160pt, -2% tracking),
         optional JP translation (Noto Serif JP SemiBold, 60pt), and the
         AUWA wordmark (30px tall, 120px from top)

    All foreground elements are horizontally centred. Eyebrow and JP text are
    optional — the slideshow flow asks the user before passing them through.
    """
    photo = Image.open(photo_path).convert("RGB")
    if photo.size != CANVAS:
        photo = ImageOps.fit(photo, CANVAS, Image.LANCZOS, centering=(0.5, 0.5))

    overlay = Image.new("RGB", CANVAS, (0, 0, 0))
    photo = Image.blend(photo, overlay, COVER_OVERLAY_OPACITY)

    fg = Image.new("RGBA", CANVAS, (0, 0, 0, 0))
    fill = WASHI + (255,)

    title_font = load_font(EB_GARAMOND, COVER_TITLE_FONT_SIZE, weight=400)
    eyebrow_font = load_font(INSTRUMENT_SANS, COVER_EYEBROW_FONT_SIZE, weight=500)
    jp_font = ImageFont.truetype(NOTO_SERIF_JP, COVER_JP_FONT_SIZE)

    cx = CANVAS[0] // 2

    if eyebrow:
        draw_text_tracked(
            fg, cx, COVER_EYEBROW_TOP_Y,
            eyebrow.upper(), eyebrow_font, fill,
            tracking_px=COVER_EYEBROW_FONT_SIZE * COVER_EYEBROW_TRACKING_PCT,
        )

    draw_text_tracked(
        fg, cx, COVER_TITLE_TOP_Y,
        title, title_font, fill,
        tracking_px=COVER_TITLE_FONT_SIZE * COVER_TITLE_TRACKING_PCT,
    )

    if jp_text:
        # Mirror the baseline derivation in draw_text_tracked so the JP gap is
        # measured from the actual rendered title baseline (the per-char "ls"
        # anchor places the baseline at top + ascent - first_glyph_top).
        title_ascent = title_font.getmetrics()[0]
        title_first_glyph_top = title_font.getbbox(title[0])[1] if title else 0
        title_baseline_y = COVER_TITLE_TOP_Y + title_ascent - title_first_glyph_top
        ImageDraw.Draw(fg).text(
            (cx, title_baseline_y + COVER_JP_GAP_FROM_TITLE_BASELINE),
            jp_text, font=jp_font, fill=fill, anchor="mt",
        )

    # AUWA wordmark — composite onto fg so its shadow is built in the same pass
    wordmark_layer = build_wordmark_layer(CANVAS, cx, COVER_LOGO_TOP_Y, COVER_LOGO_HEIGHT, WASHI)
    fg = Image.alpha_composite(fg, wordmark_layer)

    shadow = make_drop_shadow(fg, COVER_SHADOW_OFFSET, COVER_SHADOW_BLUR, COVER_SHADOW_OPACITY)

    composed = photo.convert("RGBA")
    composed = Image.alpha_composite(composed, shadow)
    composed = Image.alpha_composite(composed, fg)
    composed.convert("RGB").save(out, "JPEG", quality=92, optimize=True)


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

    # Two-line headline, hard-wrapped after "in" so the carousel reads with rhythm.
    # "Auwa" is mixed-case in EB Garamond (matches the wordmark register on the site);
    # the all-caps "AUWA Journal" wording was retired in May 2026 alongside this rewording.
    headline_lines = ["Read the story in", "the Auwa Journal."]
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
    parser.add_argument("--variant", required=True, choices=["cover", "quote", "close"])
    parser.add_argument("--theme", default="dark", choices=["dark", "light"], help="Yoru-on-Washi or Washi-on-Yoru. Quote/close only.")
    parser.add_argument("--out", required=True, help="Output JPG path")
    parser.add_argument("--quote", default="", help="Pull quote text (variant=quote)")
    parser.add_argument("--title", default="", help="Article title (variant=close) or 1-2 word cover title (variant=cover)")
    parser.add_argument("--slug", default="", help="Article slug")
    parser.add_argument("--photo", default="", help="Source photo path (variant=cover) — typically the article hero IG image")
    parser.add_argument("--eyebrow", default="", help="Optional small-caps eyebrow line above the cover title (variant=cover)")
    parser.add_argument("--jp", default="", help="Optional Japanese translation of the cover title, rendered below it (variant=cover)")
    args = parser.parse_args()

    out_path = Path(args.out)
    out_path.parent.mkdir(parents=True, exist_ok=True)

    if args.variant == "cover":
        if not args.photo or not args.title:
            print("error: --photo and --title required for variant=cover", file=sys.stderr)
            return 2
        render_cover(Path(args.photo), args.title, args.eyebrow or None, args.jp or None, out_path)
    elif args.variant == "quote":
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
