# AUWA Character Template Kit

Reusable base templates for sculpting AUWA universe characters in **Nomad Sculpt** or other 3D tools. Print with the shared magnet base system.

---

## Files in this folder

| File | What it is | Use for |
|---|---|---|
| `auwa_body_10cm_clean.stl` | AUWA body shape, **no eyes**, print-ready feet | Clean starting point for any character sculpt |
| `auwa_body_10cm_with_eyes.stl` | Full Model 7 with eye rings | Reference / direct print of AUWA |
| `auwa_upper_modifier_10cm.stl` | Cube for lower-infill upper body | Load as Modifier in Bambu Studio |
| `auwa_base_8cm_4mm_magnets.stl` | 8cm base platform, 4.4mm holes | Print once, use with any 10cm character |

**Both body templates include:**
- Flat 40mm × 40mm foot footprint (fits the 8cm base)
- 4.4mm magnet recesses at foot positions (for 4mm × 2mm N52 magnets)
- Correct height (100mm) and proportional to AUWA universe
- Manifold, print-ready mesh

---

## Nomad Sculpt workflow

### 1. Sculpt your character

- Open Nomad Sculpt on iPad
- Import `auwa_body_10cm_clean.stl` as your base layer
- Use **layers** to keep the base separate from your sculpted additions
- Add head decorations, hair, features, ornaments on new layers
- Subdivide (increase resolution) as needed for detail

**Key Nomad brushes for AUWA characters:**
- **Clay Strip** — build up form (hair, headdresses, ornaments)
- **Move** — reshape body proportions
- **Smooth** — refine edges, blend transitions
- **Mask** — protect areas while working (keep the feet flat!)
- **Insert Mesh** — add pre-made shapes (spheres, cylinders) for accessories
- **Trim** — cut clean lines for hard-edged decorations

### 2. Preserve the feet

**Do not sculpt on the bottom of the feet** — the magnet recesses must stay exact for the base to fit.

Recommended: **mask the bottom 5mm** of the figure before sculpting. Nomad's masking tools let you protect this area from any brush.

### 3. Export from Nomad

- File → Export → **STL** (or OBJ if you'll do more work in Blender)
- Keep the scale (Nomad usually preserves it correctly from imported STL)
- Save to somewhere you can find it (iCloud Drive works well)

### 4. Print prep

- Open Bambu Studio
- Import your exported STL from Nomad
- Import `auwa_upper_modifier_10cm.stl` as a Modifier (right-click → change type to Modifier)
- Print settings — same as your AUWA figures (0.12mm layer, PLA Wood, etc.)
- **Also print the base separately** (once) with 4mm magnets inserted

### 5. Assemble

- Glue 4mm × 2mm N52 magnets into the foot recesses (super glue, magnet polarity matters — test before gluing)
- Same magnets in the base (opposite polarity)
- Character snaps to base

---

## Character design ideas for AUWA universe

Each character in the AUWA universe should embody a different aspect of *kokoro* (heart/spirit) revealed through Japanese philosophy. Some directions:

- **Seasonal spirits** — one for each of the 24 sekki (spring bud, summer cicada, autumn leaf, winter snow)
- **Elemental beings** — water, wind, fire, earth, wood
- **Craftsman guardians** — potter's spirit, tea master, sword smith
- **Nature companions** — cat, crane, fox, rabbit, deer with kokoro visibility

Each retains the AUWA "body silhouette" (rounded, small limbs, tall proportions) but has unique head shape / decoration / accessories.

---

## Technical notes

**Magnet fit:**
- Recess: 4.4mm diameter × 2.3mm deep
- Magnet: 4mm × 2mm N52
- Print shrinkage: ~5% → actual hole ~4.2mm, gives ~0.2mm clearance for comfortable snap fit

**File formats:**
- STL — final print format
- OBJ — better if you need to keep working in Blender after Nomad
- GLB — Nomad's native format, most fidelity

**Print recommendations:**
- Layer height: 0.12mm (fine detail)
- Wall loops: 4 (Model 9 setting — good for character shapes)
- Sparse infill: 15% Gyroid (body), 5% override for upper (via modifier)
- Filament: PLA Wood (dried!) or allPHA for other characters
- Seam: Random position (avoid visible line)

---

## Updating this template

If you need the template updated (different eye style, different proportions, different magnet size), just ask Claude in the figure project — the source is in `Auwa.final.blend` as the object **"Auwa_body_template_10cm"**.
