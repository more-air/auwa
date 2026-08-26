# AUWA Character — Print Settings Manual

This file is the print-settings reference for AUWA character figures and bases.

## Instructions for Claude Code

When the user is about to print, **walk them through each setting step-by-step before they click "Print plate"**. Don't assume — confirm each block of settings with the user before moving on. Verify the slice preview at the end. The user uses **Bambu Studio 2.7 with Bambu Lab X1 Carbon** (printer settings may differ slightly on A1/P1S).

**Trigger phrases that mean "walk me through print settings":**
- "/3d print" — **when the user types this, show the "AUWA Smooth Print — Bambu Studio 2.7 (canonical settings)" section below in full, using EXACT Bambu Studio 2.7 terminology**
- "I want to print..."
- "How do I set up the print..."
- "Can you guide me through Bambu Studio?"
- "What settings should I use..."

When you see these, find the user's filament (ask if unsure), open the relevant section below, and go through the settings phase-by-phase.

**IMPORTANT — Terminology accuracy:**
The user is on Bambu Studio 2.7. Setting names have changed over versions. When giving instructions, use the EXACT terminology from 2.7 (e.g. "Order of walls" is under **Quality tab → Advanced**, NOT Strength tab). Do not use terminology from older versions. If unsure of a setting's location, say so — do not guess.

---

## AUWA Smooth Print — Bambu Studio 2.7 (canonical settings for PLA Wood)

**This is the confirmed working setup for PLA Wood filament — verified August 2026 by user.** Use these exact terms when guiding the user through Bambu Studio 2.7.

**⚠ Filament-specific:** This setup is calibrated for **PLA Wood only**. Settings will differ for other filaments (allPHA is the opposite of PLA in three ways — **cold/unheated bed, 100% fan, 190–200°C** — see the **colorFabb allPHA** section; PLA Basic can print faster; PETG needs different bed temp). If the user is printing something other than PLA Wood, ask which filament and adjust accordingly.

**Iteration note:** These settings will evolve based on real print results. When the user reports a print outcome and requests an adjustment, update the specific value in this section AND add a brief note in the version history at the end of this section explaining why.

### Filament preparation (do this FIRST — every time)

- **Dry the filament**: PLA Wood 4-6 hours at 55°C; **allPHA 6 hours at 45°C** (Sunlu S2)
- Wet filament = failed print (rough surface, popping, arm breaks)
- If unsure whether it's dry, dry it — cheap insurance

### Object setup

1. **Printer**: Bambu Lab X1 Carbon
2. **Filament slot**: PLA Wood (or allPHA) — NEVER support filament for the figure itself
3. **Load the body STL**: `model7_body.stl` (or model 8/9/10)
4. **Add the modifier**: Right-click body → Add Modifier → Load `upper_modifier_m7.stl`
   - Verify in Objects list: modifier row shows NO filament number ✓ (if it shows "1", it's still a Part — right-click → Change type → Modifier)

### Body settings (click the body row → Objects mode)

**Strength tab:**
| Setting | Value |
|---|---|
| Wall loops | **4** |
| Top surface pattern | **Monotonic** |
| Top surface density | **100%** |
| Top shell layers | **5** |
| Sparse infill density | **15%** |
| Sparse infill pattern | **Gyroid** |

**Quality tab:**
| Setting | Value |
|---|---|
| Layer height | **0.08mm** (showpiece) or **0.12mm** (standard smooth) |
| Seam position | **Random** ⚠ critical — NOT Aligned or Back |
| Ironing Type | No ironing (for the figure) |

**Quality tab → Advanced section:**
| Setting | Value | Location note |
|---|---|---|
| Order of walls | Outer/Inner | Under **Advanced** section within Quality tab (NOT under Strength) |

**Speed tab (Advanced toggle ON):**
| Setting | Value |
|---|---|
| Outer wall speed | **30-40 mm/s** (slow = smooth) |

**Others tab → Special mode:**
| Setting | Value |
|---|---|
| Fuzzy Skin | **None** (smooth AUWA aesthetic) |

### Modifier settings (click `upper_modifier_m7.stl` row in Objects mode)

**Strength tab — ONLY change these two, leave everything else inherited:**
| Setting | Value |
|---|---|
| Sparse infill density | **2%** |
| Sparse infill pattern | **Lightning** |

**Do NOT change** Wall loops, Top surface pattern, or anything else on the modifier — those must stay inherited from the body.

### Base settings (click `base_8cm_model7.stl` row in Objects mode)

**Strength tab:**
| Setting | Value |
|---|---|
| Wall loops | 4 |
| Top surface pattern | Monotonic |
| Top shell layers | 5 |
| Sparse infill density | 20% (denser than body for stability weight) |
| Sparse infill pattern | Gyroid |

**Quality tab:**
| Setting | Value |
|---|---|
| Layer height | Same as body (0.08 or 0.12mm) |
| Seam position | Random |

**Others tab → Special mode:**
| Setting | Value |
|---|---|
| Fuzzy Skin | **All walls** (earth texture on visible sides) |
| Fuzzy skin point distance | 0.4mm |
| Fuzzy skin thickness | 0.12mm |

**Note on Fuzzy Skin in v2.7:** Only 3 options available (None / Contour / All walls). "All walls" does NOT fuzz the top surface — top stays smooth. This is actually desirable for the base (figure sits flush).

### Filament (PLA Wood)

**Filament settings** (click slot 1 filament):
| Setting | Value |
|---|---|
| Nozzle temperature (first layer) | 220°C |
| Nozzle temperature (other layers) | 220°C |
| Bed temperature | 55-60°C |

### Supports & adhesion

**Support tab:**
| Setting | Value |
|---|---|
| Enable support | ✓ checked (for body) — unchecked for base |
| Type | tree(auto) |
| Threshold angle | 45° |

**Others tab → Bed adhesion:**
| Setting | Value |
|---|---|
| Brim type | Outer brim only |
| Brim width | 3mm |

### Pre-slice checklist

Before clicking "Slice plate":

- [ ] Body has filament "1" ✓ (green check)
- [ ] Modifier has NO filament number (critical — else it prints as solid cube)
- [ ] Layer height 0.08 or 0.12mm
- [ ] Seam position: Random
- [ ] Body: Wall loops 4, Top pattern Monotonic, Sparse infill 15% Gyroid
- [ ] Modifier: Sparse infill 2% Lightning (only these two changes on modifier)
- [ ] Base: Fuzzy Skin All walls (if printing base)
- [ ] Auto orient: feet down for body ✓

### Slice preview verification

Scrub through layer preview:
- Body region: dense Gyroid infill visible
- Head/upper region (where modifier sits): sparse Lightning pattern (very light, spider-web-like)
- Random seam dots scattered — no vertical line
- No concentric bullseye on head top

If all good → **Print plate**.

### Magnets

- **Model 7 (10cm figure)**: 4 × 2mm N52 magnets, recesses are 4.4mm (body) × 4.5mm (base) × 2.5mm deep
- **Model 8, 9, 10**: 3 × 2mm N52 magnets, recesses 3.4mm

### Post-print

1. Cool 5-10 minutes, remove from build plate
2. Peel tree supports gently
3. Cut brim with thin knife
4. **Body**: sand 400 → 800 → 1200 grit (except face — preserve eye guides)
5. **Base with fuzzy skin**: do NOT sand (preserves texture)
6. Rub with beeswax cream or mineral oil, buff with cloth
7. Press magnets into recesses (Model 7 = 4mm magnets, gentle press)
8. Snap figure onto base

### Version history — iterative tuning

Track adjustments here as prints come out. Format: date — what changed — why.

- **2026-08-11** — Initial PLA Wood 2.7 canonical settings established
- *(future adjustments will be logged here)*

---

---

## Materials supported

- [PLA Wood](#material-pla-wood) ← currently in use
- [PHA](#material-pha-placeholder) (placeholder — to be filled in when user starts using it)
- Other materials added as needed

---

## Canonical AUWA file set (V8 — locked May 2026)

These are the **main production files** for the AUWA character. All STLs are in `/Users/mac/Github/auwa/figure/stl/V8/`:

| Size | Figure | Modifier | Base | Notes |
|---|---|---|---|---|
| **10 cm (large)** | `model7_body_fixed.stl` (V9) | `upper_modifier_m7.stl` + `lower_modifier_m7.stl` | `base_8cm_model7_rounded_earth.stl` (V9) | Standard, easy print. Two modifiers — see "Weight distribution" |
| **8 cm (medium)** | `model8_body.stl` | `upper_modifier_m8.stl` | `base_6cm_model8.stl` | Plane-cut flat sole |
| **6 cm (small)** | `model9_body.stl` | `upper_modifier_m9.stl` | `base_4cm_model9.stl` | Thin foot walls (~0.5mm) — needs Wall loops: 4, press magnets gently |

**All three use the same 3 × 2 mm N52 magnets** in both feet AND base recesses. Magnets meet face-to-face at z=0.

All three figure-base pairs have **0.000 mm magnet recess alignment** (verified to 5 decimal places).

## Material: PLA Wood

The default material for AUWA figures. Gives a natural wood feel after sanding + oil/wax finish.

**Confirmed AUWA aesthetic (May 2026):** smooth surface, no fuzzy skin. The wood character comes from the PLA Wood filament itself + after-print sanding and oil/wax — NOT from fuzzy skin texture. Fuzzy skin was tested and rejected: too rough, obscures the figure's clean lines and the eye guide. See "Variant: Fuzzy skin" at the end of this section if you want to experiment.

### Phase 1 — Project setup

1. Open Bambu Studio → `File → New Project` (or fresh session)
2. Confirm **Printer:** Bambu Lab X1 Carbon
3. Confirm **Filament slot 1:** PLA Wood
4. **Drag the body STL** into the build plate (e.g. `model7_body.stl`, `model8_body.stl`, or `model9_body.stl`)
5. **Verify dimensions** on the right panel:
   - Model7 (10 cm): ~78.84 × 59.91 × 99.95 mm
   - Model8 (8 cm): ~63.07 × 47.93 × 79.73 mm
   - Model9 (6 cm): ~47.31 × 35.95 × 59.7 mm
   - If much smaller (e.g. 0.08 mm): export was wrong, re-export from Blender with **Scale 1000**
6. **Add the matching modifier:** right-click on the body → **Add Part → Load...** → select the matching modifier STL:
   - Model7 → `upper_modifier_m7.stl`
   - Model8 → `upper_modifier_m8.stl`
   - Model9 → `upper_modifier_m9.stl`

7. ⚠ **CRITICAL — convert the loaded modifier from "Part" type to "Modifier" type:**
   - After loading, the modifier appears as a solid cube with filament "1" assigned — meaning it would print as a solid block.
   - Right-click on the modifier sub-item → **"Change type"** → **"Modifier"**
   - After the change: filament column should be **blank** (no number) and the cube becomes a wireframe/yellow zone in the viewport.

8. In the **Object list** (Process row → Objects), verify hierarchy:
   ```
   Plate 1
     └─ [body].stl                ← the figure (✓ green check, filament 1)
          └─ [body].stl           ← sub-part (filament 1)
          └─ [modifier].stl       ← MODIFIER (no filament number, no green check)
   ```
   The KEY indicator: **modifier has NO filament number**. If you see "1" next to the modifier, it's still a Part and will print as a solid cube.

### Phase 2 — Body settings (the figure)

Click on the body `.stl` (top item in object list). Configure:

#### Strength tab

| Setting | Value |
|---|---|
| Sparse infill density | **15%** |
| Sparse infill pattern | **Gyroid** |
| Wall loops | **3** (or **4 for Model9** — thin foot walls benefit from extra perimeters) |
| Top shell layers | **5** (or 6 for smoother top dome) |
| Top surface pattern | **Monotonic** (NOT Concentric — Concentric leaves visible rings on the head dome) |
| Order of walls | **Outer wall first** (cleaner outer surface — recommended) |
| Bottom shell layers | **4** |
| Internal solid infill pattern | Rectilinear (default) |

**Per-figure overrides:**
- For **Model9 only**: in **Objects mode**, click on `model9_body.stl` and set Wall loops to **4** (with lock 🔒). This is because the 6 cm figure has ~0.5 mm thin walls around the magnet recess, and extra perimeters improve print strength there.

#### Quality tab

| Setting | Value |
|---|---|
| Layer height | See "Layer height choice" below |
| Initial layer height | **0.20 mm** (default) |
| Seam position | **Random** ⚠ (NOT "Back" — Back leaves a visible vertical line down the figure. Random scatters the seam invisibly. AUWA has no defined orientation so Random is the right choice.) |

##### Layer height choice

| Layer | Smoothness | Print time (2 figures) | Use when |
|---|---|---|---|
| **0.12 mm High Quality** | Smoothest, barely visible layer lines | ~7-8 hours | Final / showpiece prints |
| **0.16 mm Fine** | Good — minor layer lines, hidden by wood texture | ~5-6 hours | Iteration / test prints |
| **0.20 mm Standard** | Visible layer lines on curves | ~3-4 hours | Quick tests only |
| **Adaptive (Variable)** | Smooth on curves, fast on flat | ~5-6 hours | **Best balance — recommended for X1C** |

**Bambu X1C supports Adaptive Layer Height** — top toolbar → "Variable layer height" icon → click to auto-apply. Uses thinner layers on curves (head dome) and thicker on flat areas (body). Recommended default for AUWA's mix of round head + flat-ish body.

For a final showpiece where time isn't critical: **0.12 mm High Quality** for the maximum smoothness wood-figure look.

#### Quality tab → Speed (requires Advanced toggle)

Enable the **"Advanced"** toggle at the top of the left panel first. Then:

| Setting | Value |
|---|---|
| Outer wall speed | **40-50 mm/s** (slower = cleaner fuzzy texture) |
| Inner wall speed | leave default |

#### Others tab → Special mode → Fuzzy Skin

| Setting | Value |
|---|---|
| Fuzzy Skin | **None** (AUWA default — smooth surface) |

The smooth surface is AUWA's signature look. Wood character comes from the filament + post-print finishing, not from slicer texture.

### Phase 3 — Modifier settings (head/upper-body override)

Click on the modifier `.stl` (indented under body). Configure the override:

| Setting | Value | Why |
|---|---|---|
| Sparse infill density | **5%** | Lighter head → lower COG → more stable figure |
| Fuzzy Skin | inherit (None) | Same as body — no transition line |

A lock icon (🔒) should appear next to the Sparse infill density, indicating it's an override. Fuzzy Skin should be unlocked (inheriting Global = None).

**Note on modifier coverage (canonical AUWA set):**
- **`upper_modifier_m7`** (cube, 10cm scale): covers upper body + head (z = 45–110 mm)
- **`upper_modifier_m8`** (cube, 8cm scale): proportionally scaled (z = 36–88 mm)
- **`upper_modifier_m9`** (cube, 6cm scale): proportionally scaled (z = 27–66 mm)

All three modifiers position the boundary at the **natural neck pinch** of the figure — so the infill density transition (15% → 5%) falls at the narrowest part of the body and is invisible from outside.

For Model9: the modifier visualisation might not show as a yellow cube in Bambu Studio because the cube is small enough to fit entirely inside the figure outline. This is fine — the slicer still applies the override.

### Phase 4 — Filament settings (PLA Wood)

Click on filament slot 1 (PLA Wood) at top-left → opens filament settings dialog.

| Setting | Value |
|---|---|
| Nozzle temperature (first layer) | **220°C** |
| Nozzle temperature (other layers) | **220°C** |
| Bed temperature | 55-60°C (default) |

⚠️ Verify your PLA Wood spec sheet allows 220°C. Most do (max usually 240°C). Higher temps caramelise wood fibres slightly, enhancing wood character.

Click **Save** in the filament dialog.

### Phase 5 — Supports & adhesion

#### Support tab

| Setting | Value |
|---|---|
| Enable support | **✓ checked** (figures have minor overhangs; tree supports are easy to remove) |
| Type | **tree(auto)** |
| Threshold angle | **45°** |
| On build plate only | unchecked |
| Top z distance | default (0.2 mm) |

#### Others tab → Bed adhesion

| Setting | Value |
|---|---|
| Brim type | **Auto** or **Outer brim only** |
| Brim width | **3 mm** |

#### Others tab → Prime tower

| Setting | Value |
|---|---|
| Enable | **❌ unchecked** (single filament — not needed) |

### Phase 6 — Orient and verify

1. Right-click the figure → **Auto orient** (figure should end up feet-down on the bed)
2. Confirm the flat foot sole is touching the build plate ✓
3. Click **"Slice plate"** (top-right green button)

### Phase 7 — Slice preview verification

Scrub through the layers using the slider on the right. Confirm:

✅ **Whole figure: smooth outer walls** (no fuzzy texture anywhere)  
✅ **Body region** (below modifier): dense gyroid infill  
✅ **Head/upper region** (above modifier): sparse 5% infill pattern  
✅ **No visible vertical seam line** anywhere (Random seam scatters the seam dots invisibly)  
✅ Eyes visible as small ring protrusions on the face  
✅ Magnet recesses in feet visible as open cylinders (will be bridged at top during print)  
✅ Tree supports as small organic shapes (only where needed)  
✅ **No concentric ring pattern on head top** (if you see this, change Top surface pattern to Monotonic)

Expected stats (verified May 2026, 0.12 mm High Quality, PLA Wood at 220°C):

| Print | Time | Material |
|---|---|---|
| **All 3 figures together** (m7+m8+m9) | ~6 h 53 m | ~86 g (80 g model + 5.9 g support) |
| Single model7 (10 cm) | ~3 h 30 m | ~35 g |
| Single model8 (8 cm) | ~2 h 30 m | ~25 g |
| Single model9 (6 cm) | ~1 h 30 m | ~15 g |
| Single base (any size) | ~1 h 30 m | ~10-15 g |

### Phase 8 — Print

Click **Print plate** to send to printer. Watch the first 5 minutes via Bambu Handy camera if possible.

### Phase 9 — After printing

1. Cool 5-10 minutes, remove from build plate
2. Peel off tree supports (gentle pull, pliers for stubborn bits)
3. Cut off brim with a thin knife or spudger
4. **Sand the body only** (NOT face): 400-grit, then 800-grit
   - Why: exposes wood fibres, enhances wood appearance, masks layer lines
   - Don't sand the face — preserve the eye guides for drawing over
   - Model7/8 eye guides: 0.4 mm tube
   - Model9 eye guides: 0.32 mm tube (smaller, more delicate — sand even more carefully)
5. **Optional finish:** rub the sanded body with beeswax cream or natural mineral oil, buff with soft cloth
   - Gives a satin wood finish that transforms PLA Wood from "plastic-like" to "genuinely wooden"
6. Press 3 × 2 mm N52 magnet into each foot recess (flush with sole)
   - ⚠ **For Model9 (6 cm)**: press magnets **gently** — the foot wall is only ~0.5 mm thick and can crack under excessive force. If too tight, ease the magnet in with light taps rather than crushing.
7. Place figure on the printed base — should snap firmly into position

---

## Base print (when printing the matching base)

The base uses simpler settings because there are no fine details to preserve.

### Difference from figure settings

| Setting | Figure | Base |
|---|---|---|
| Layer height | 0.16 mm / Adaptive / 0.12 mm | **0.20 mm** (base is a simple disc, faster is fine) |
| Sparse infill density | 15% | **20%** (denser = weightier, better stability) |
| Fuzzy Skin | None | **None** (smooth surface to match AUWA) |
| Supports | Tree(auto) | **disabled** (no overhangs) |
| Brim width | 3 mm | 3 mm |

Everything else (PLA Wood at 220°C, Monotonic top pattern, **Random seam**, no prime tower) stays the same.

After printing the base: **sand all over with 400-grit then 800-grit**, optionally rub with beeswax/oil. Press 3 × 2 mm magnets into the recesses (flush with top surface).

---

## Reducing sanding time — PLA Wood (the smoothness levers)

*Added 26 August 2026, for Rieko.*

Sanding is 30–45 minutes of the ~2 hours per figure, and it is Rieko's hands rather than machine
time. Print time is free by comparison. These are the levers, **ranked by how much sanding they
actually remove**, with where each one lives in Bambu Studio 2.7.

| # | Lever | Where in Bambu Studio | Value |
|---|---|---|---|
| 1 | **Layer height** | Quality tab | **0.08 mm** — halves the step depth versus 0.16 |
| 2 | **Dry the filament** | Sunlu S2, before slicing | 55°C, 6 h. Damp wood PLA prints visibly furry |
| 3 | **Flow calibration** for this spool | Top menu → **Calibration** → Flow Dynamics, then Flow Rate | run once per spool |
| 4 | **Outer wall speed** | Speed tab (Advanced toggle ON) | **30 mm/s** |
| 5 | **Outer wall acceleration** | Speed tab → Acceleration | **3000 mm/s²** — reduces the ringing echo near detail |
| 6 | **Variable layer height** | Toolbar icon above the plate | apply to the head dome |
| 7 | **Supports off** (if the model allows) | Support tab | every support scar is sanding that need not exist |

Everything else in the canonical PLA Wood list stays as it is: 4 wall loops, Monotonic top
surface, Gyroid infill, Random seam, no fuzzy skin.

### What settings cannot fix

- **The crown of the head.** The top of the head is a top solid surface, so the layers converge
  to a point there on every print, at every setting. It always needs sanding by hand. (This is
  also why fuzzy skin is permanently ruled out — fuzzy only textures the vertical walls, so the
  crown stays smooth and the sanding removes the fuzz at the most visible point on the object.
  See `context/business/figure.md` → FINISH.)
- **Support scars.** The cure is fewer supports, not better ones. Check the overhang preview and
  try one print with support disabled.

### Worth testing, not yet proven

- **Scarf joint seam** — Quality tab → Seam. If this version offers it, it spreads the seam along
  a slope instead of stacking a blob, which should reduce sanding across the whole surface. Not
  yet tested on PLA Wood here; wood fibre may behave differently. Check whether the option exists
  before relying on it.
- **Ironing on the head crown only** — Quality tab → Ironing. Could smooth the worst spot on the
  figure, but ironing wood-filled PLA can smear the fibre. Test on a scrap before a real piece.

### The test that settles it

Print the same figure twice, at **0.2 mm** and at **0.08 mm**. Sand both, with a clock running.
Print time is machine hours and costs nothing but patience; sanding is Rieko's hands and it
dominates the labour. That one number sets the whole schedule for the edition of thirty.

---

## Material: colorFabb allPHA

**Source of truth: colorFabb's own technical datasheet (v1.0, April 2022) and the allPHA
product page.** Verified August 2026. allPHA behaves *unlike any other filament in this
workshop* — do not start from PLA habits.

### The three rules that break PLA habits

1. **Cold bed. Bed heating OFF (0°C).** A heated plate induces crystallisation in the bottom
   layers, which is exactly what makes allPHA warp and lift. This is the opposite of PLA.
2. **100% part cooling fan, from layer 2.** No ramp. The goal is to pull heat out as fast as
   possible to slow crystallisation of the PHA matrix.
3. **190–200°C nozzle.** The datasheet range is 180–200°C; the product page advises 190–200°C.
   Hotter is not better.

### Manufacturer guideline (colorFabb TDS)

| Setting | colorFabb value |
|---|---|
| Nozzle temperature | 180–200°C (product page: 190–200°C) |
| Bed temperature | Room temperature / **not heated** |
| Bed surface | 3DLac or diluted wood glue |
| Bed adhesion | Brim (~20 brim lines) |
| Cooling | 100% fan from the 2nd or 3rd layer |
| Print speed | 30–60 mm/s (product page: 40–80) |
| Layer height | 0.1–0.27 mm on a 0.4 mm nozzle |
| HDT | 153°C — allPHA does **not** soften in a warm chamber |
| Density | ~1.24 g/cm³ |

### Filament profile — create once in Bambu Studio

Filament slot → choose **Generic PLA** (Bambu-branded profiles are read-only; Generic is
editable) → set the values below → floppy-disk icon → **Save as "colorFabb allPHA"**.

| Bambu Studio field | Value |
|---|---|
| Nozzle temperature — initial layer | **200°C** |
| Nozzle temperature — other layers | **195°C** |
| Bed temperature (Textured PEI) — initial layer | **0°C** |
| Bed temperature (Textured PEI) — other layers | **0°C** |
| Cooling → Fan speed min | **100%** |
| Cooling → Fan speed max | **100%** |
| Cooling → Keep fan always on | **✓ on** |
| Cooling → Fan speed at layer | **2** |
| Cooling → Auxiliary part cooling fan | **100%** |
| Advanced → Max volumetric speed | **10 mm³/s** ← the single most useful guard; it caps every speed automatically |
| Setting Overrides → Retraction length | **0.4 mm** |

If Bambu Studio refuses a bed temperature of 0, use **25–30°C** — near room temperature is the
requirement, not a specific number.

### Plate and adhesion (the real risk with AUWA figures)

The figure stands on two small feet — only about **40 mm² of contact** for a 100 mm tall part —
on an unheated plate. This is the most likely failure mode, not print quality.

- **Textured PEI plate**, cold
- **3DLac** sprayed thinly and allowed to dry (colorFabb's own recommendation; one coat lasts several prints)
- **Brim: Outer brim only, 8 mm** (≈20 lines — much wider than the 3 mm used for PLA Wood)
- Tree supports (auto) as usual — they add extra plate contact, which helps here

### Removing the print (important — do not force it)

allPHA bonds *very* strongly to the plate, and the base especially will not come off cold.
colorFabb's method: **after the print, heat the bed to 90°C and wait 15 minutes.** The heat
crystallises the bottom layers and the part releases. Slide a thin scraper underneath while the
plate is still warm. Forcing a cold allPHA part off a PEI sheet can pull the coating off.

### Chamber

Keep the **front door open and the top glass off**. Not because allPHA softens (HDT is 153°C —
it doesn't), but because it needs maximum cooling and an enclosed chamber works against that.

### Drying

colorFabb publishes no drying spec for allPHA. **45°C for 6 hours** in the Sunlu S2 is the safe
conservative setting (PHA's melting point is ~170°C, so there is no risk of fusing at that
temperature). Store with fresh desiccant.

### Feeding — external spool, AMS bypassed (chosen Aug 2026)

colorFabb does not certify allPHA for the AMS, and the community rule is that brittle filament
should not be pushed through the AMS's PTFE bends. **Decision: bypass the AMS and feed straight
from the Sunlu S2**, which also keeps the filament dry for the whole print.

Setup, once:

1. Touchscreen → tap the loaded AMS slot → **Unload**. Then push the slot's feeder tab forward
   and pull the filament out by hand.
2. At the back of the printer, unplug the PTFE tube **at the AMS end only** (press the collar,
   pull the tube out). Leave the printer end connected and every cable in place.
3. Stand the Sunlu S2 beside the printer at 45°C, cut the allPHA at 45°, thread it from the
   dryer into the open end of that tube, and push until it stops at the toolhead.
4. Touchscreen → the **external spool** entry (separate from the four AMS slots) → set type
   **PLA** → **Load**. A short purge means it worked.

In Bambu Studio:

- Set the **external spool** entry — not an AMS slot — to the `colorFabb allPHA` profile
- Assign the model to that filament
- **In the send dialog, untick "Enable AMS."** This is what tells the printer to pull from the
  external spool. The filament dropdown greys out; that is expected and correct.

To go back to the AMS later: reconnect the tube at the AMS end, load a slot as normal, and
leave "Enable AMS" ticked.

### Speed overrides (Speed tab, Advanced toggle ON)

| Setting | Value |
|---|---|
| Outer wall speed | **25 mm/s** |
| Inner wall speed | **40 mm/s** |
| Sparse infill | **60 mm/s** |
| Layer height | 0.12 mm |

With Max volumetric speed at 10 mm³/s these are mostly belt-and-braces — the flow cap will hold
the printer inside colorFabb's 30–60 mm/s range on its own.

### Calibration (first time with this filament only)

In the print-send dialog, tick **Flow dynamic calibration**. The X1C lidar tunes pressure advance
for the unknown filament — the single biggest factor in wall smoothness with a non-Bambu material.

### Print order

Print **model9 (6 cm) first** as a ~1.5 h test before committing to a 4-hour model7 print.

### Version history

- **2026-08-24** — Switched to external-spool feeding (AMS bypassed, fed from the Sunlu S2).
- **2026-08-23** — First allPHA section. Written against the colorFabb TDS after an earlier
  draft wrongly used PLA-style values (215°C nozzle, 40°C bed, 60–80% fan). Cold bed, 100% fan
  and 190–200°C are manufacturer guidance, not preference.

---

## Weight distribution — two-modifier setup (Model 7)

Measured from `model7_body_fixed.stl` (Aug 2026). The figure is blob-shaped: **72% of its volume
sits above z = 45 mm**, and the foot stance is only **±4 mm in Y**. That narrow stance is why the
figure relies on the magnets — but lowering the centre of gravity still helps meaningfully.

| Setup | Mass | Centre of gravity | Tip angle (Y axis) |
|---|---|---|---|
| Current (15% body, 5% head) | 46.9 g | 53.0 mm (53% of height) | 4.3° |
| **Recommended (below)** | **43.9 g** | **44.9 mm (45%)** | **5.1°** |
| Legs 100% below z=45 (overkill) | 78.5 g | 41.2 mm (41%) | 5.2° |

Going heavier than the recommendation adds 35 g and hours of print time for 0.1° of extra
stability — **not worth it**. Most of the gain comes from lightening the head, not weighting the legs.

### Files

| Region | File | Covers |
|---|---|---|
| Head / upper body | `upper_modifier_m7.stl` | z = 45–110 mm |
| Legs / feet | `lower_modifier_m7.stl` | z = -5–25 mm |

Both load the same way: right-click body → **Add Modifier → Load...** → then verify each shows
**no filament number** in the Objects list.

### Overrides

**Upper modifier** (Strength tab):

| Setting | Value |
|---|---|
| Sparse infill density | **2%** |
| Sparse infill pattern | **Lightning** |
| Wall loops | **3** (down from 4 — inner walls only, outer surface unaffected) |

**Lower modifier** (Strength tab):

| Setting | Value |
|---|---|
| Sparse infill density | **100%** |
| Sparse infill pattern | **Gyroid** |

If the leg surface bulges slightly with allPHA (over-packing — PHA is soft), drop the lower
modifier to **80%**. Costs only 1.4 g and removes the risk.

The base carries the rest of the stability: print `base_8cm_model7_rounded_earth.stl` at
**40% infill** (~19 g) rather than 20%. A heavier base does more for the standing figure than
anything done inside the body.

---

## Quick reference: settings checklist for PLA Wood figure

Use this as a final pre-flight check before clicking Print:

```
Object setup (Bambu Studio):
  □ Body STL loaded (model7/8/9_body.stl)
  □ Matching modifier loaded as MODIFIER type (not Part)
  □ Modifier has NO filament number in object list  ← critical check
  □ For Model9: Wall loops set to 4 on the body (override)

Body settings (Global mode → Strength tab):
  □ Sparse infill: 15% Gyroid
  □ Wall loops: 3 (4 for Model9)
  □ Top shell layers: 5, Top surface pattern: Monotonic
  □ Order of walls: Outer wall first

Quality tab:
  □ Layer height: 0.12 mm (showpiece) or Adaptive (recommended)
  □ Seam position: Random  ← CRITICAL (not Back)

Others tab → Special mode:
  □ Fuzzy Skin: None  ← AUWA aesthetic

Quality tab → Speed (Advanced toggle ON):
  □ Outer wall speed: 40-50 mm/s

Modifier overrides (Objects mode):
  □ Sparse infill density: 5%  (lock 🔒 visible)
  □ Fuzzy Skin: inherit (no lock)

Filament (PLA Wood):
  □ Nozzle temp: 220°C (first + other layers)

Support & adhesion:
  □ Support: tree(auto), 45° threshold
  □ Brim: Outer brim only, 3 mm
  □ Prime tower: disabled

Orientation:
  □ Feet down on build plate (Auto orient)

Slice preview:
  □ Whole figure: smooth walls (no fuzzy)
  □ No visible vertical seam line
  □ Head: sparse infill, Body: dense gyroid infill
  □ No concentric pattern on head top
  □ Modifier shows as wireframe/yellow zone, NOT a printable solid cube
```

If all boxes check out → **Print plate**.

---

## Notes from learning sessions

**Why use a modifier for the upper body / head?**
The modifier reduces infill to 5% only in the upper region (head, or above-arms area depending on which modifier file). This:
- Lowers center of mass for better magnetic stability on the base
- Reduces material/weight without compromising the body/legs (which need to be solid)
- Uses ~25% less filament overall vs full 15% infill everywhere

**Why Monotonic top surface pattern instead of Concentric?**
The character has a rounded head dome. Concentric circles fill at the dome's top creates visible bullseye-like rings on the print surface. Monotonic uses parallel zig-zag lines which are far less visible.

**Why Random seam, not Back?**
"Back" places every layer's seam at the same X angle, creating one visible vertical line down the figure. AUWA has no defined orientation — viewed from all angles — so a hidden "back" doesn't really hide anything. Random scatters the seam dots invisibly around the figure. Tested in May 2026 with visible-line problem on "Back" seam print.

**Why no fuzzy skin (smooth surface is the AUWA aesthetic)?**
Fuzzy skin was tested and rejected. The textured surface:
- Obscures the figure's clean rounded character
- Makes the eye guides harder to draw over
- Creates a "kitchen sponge" look rather than wood
The wood character of AUWA comes from the PLA Wood filament itself, **NOT** from slicer texture. Smooth surface + sanding + oil/wax produces a much more authentic wood look than fuzzy skin ever did.

**Why supports for a feet-down print?**
The figure has no severe overhangs, but tree supports under the arm-body joins and around the head dome give peace of mind for overnight prints. Tree supports use minimal material and peel off cleanly.

**Why the modifier-must-be-Modifier-type trap?**
In Bambu Studio, when you "Add Part → Load..." a STL, it imports as a regular **Part** by default (positive material that prints). To make it a modifier (settings override only, doesn't print), you MUST manually change its type via right-click → "Change type" → "Modifier". If you skip this step, the modifier prints as a solid cube — visible from the object list as a "1" in the filament column. Always verify the modifier has **no filament number** before slicing. (Lesson learned May 2026.)

**Why model9 (6 cm) has special wall settings?**
The 6 cm figure is at the lower limit of what fits a 3.3 mm magnet recess. After leg deformation (SOLE_X=1.30) and plane-cut flat sole, the wall thickness around the recess is only ~0.5 mm. Increasing wall loops to 4 packs more perimeter passes into this thin region for print reliability. Even with this, magnet press-fit must be gentle to avoid cracking.

**Why plane-cut flat sole on Model8 and Model9?**
At smaller scales (8 cm and below), the natural foot sole shape has visible curvature that doesn't sit cleanly on the base. A horizontal plane-cut at the bottom forces a truly flat sole that lies flush on the base. Model7 (10 cm) doesn't need this — the foot is large enough that gentle Z-flatten alone produces a clean look. (Lesson learned May 2026.)

---

## Variant: Fuzzy skin (experimental — not the AUWA default)

Tested in May 2026 and rejected for AUWA's main aesthetic, but documented here for future experimentation with different character expressions:

### To enable fuzzy skin (uniform across whole figure)

| Setting | Value |
|---|---|
| Fuzzy Skin (Global) | `Contour` (outer walls only) |
| Fuzzy skin point distance | `0.4 mm` (fine grain) |
| Fuzzy skin thickness | `0.15 mm` (gentle — preserves 0.6 mm eye guides) |

⚠ Don't override Fuzzy Skin on the modifier (let it inherit Global). Otherwise you get a visible boundary line between fuzzy body and smooth head — tested and looks bad.

### Higher thickness for chunkier wood grain

If you want more pronounced wood texture (not recommended for AUWA but useful for other characters):
- Thickness 0.20-0.25 mm
- Will start to obscure 0.6 mm eyes if you go above 0.25 mm

### Alternative two-texture variant (future characters)

For characters where you WANT a visible texture transition (smooth upper, fuzzy lower or vice versa):
- Use the `upper_modifier_m6` cube (covers above the arms, with the boundary at the neck pinch z=45 mm)
- Set Global Fuzzy Skin = Contour 0.3 mm thickness (or whatever)
- Override the modifier's Fuzzy Skin = None
- Result: legs/lower body fuzzy, upper body+head smooth, with the transition line falling at the natural neck pinch where it looks intentional
