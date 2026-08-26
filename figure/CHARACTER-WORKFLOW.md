# Character Body Workflow — 10 cm Foundation

A reproducible Blender workflow for turning a sculpted character into a stable, printable 10 cm figure with a matching magnetic base. This is the **foundation** for any AUWA-style character — once the body and base are built and proven, each new character just adds its own accessories (hat, item in hand, object at the feet, etc.) on top of the same template.

Proven: the AUWA `model2(10cm)` + `base_8cm` pair printed successfully, stands stable, recesses align, magnets hold.

---

## The 10 cm body + 8 cm base specification

| | Value |
|---|---|
| **Figure height** | 100 mm (tallest dimension) |
| **Figure sole (per foot)** | 6.06 × 7.32 mm (X × Y) — deeper than wide for front-back stability |
| **Foot centres** | X = ±16.59 mm, Y ≈ 0 (in world coords with figure at origin) |
| **Eye outer diameter** | 5.0 mm (torus major 2.3 + minor 0.2 mm) |
| **Eye position** | Z = 65 mm (65% of body height), X = ±12.29 mm |
| **Base diameter** | 80 mm (80% of figure height) |
| **Base height** | 8 mm |
| **Magnet** | 3 × 2 mm N52 neodymium disc |
| **Recess** | 3.2 mm diameter × 2.2 mm deep (magnet + 0.2 mm tolerance) |
| **Two magnets per figure**, two in base; meet face-to-face at z = 0 |

---

## Parameters

**Per-character (find these once for each new source mesh):**

| Parameter | How to find |
|---|---|
| Source mesh name | Listed in the source `.blend` |
| Front-facing direction | Usually −Y (Blender default front view); verify |
| Foot centre positions | Slice bottom verts, cluster left/right by X sign, take centroid of each |
| Head half-width at eye height | Cross-section X-span at the eye Z |
| Eye fractions (Z%, X%) | Measure from a 2D reference image |
| Leg stability factor | Check the sole contact patch — if narrow front-back, apply Stage 5 |

**Per-print (set each time):**

| Parameter | Default |
|---|---|
| Target figure height | 0.10 m for the 10 cm version |
| Magnet | 3×2 mm for 6–12 cm figures |
| Eye OD | 5 mm at 10 cm scale, scale proportionally for other sizes |
| Base diameter | 75–80% of figure height |
| Base height | 8 mm |

**Scaling rule:** When scaling this template to other sizes, foot recess dimensions stay **absolute** (the magnet doesn't scale), everything else scales **proportionally**.

---

## The build sequence

All stages run via Python through the Blender MCP. The pattern is the same every time. Stages 1–4 build the figure and base; Stage 5 is the stability check; Stage 6 is the watertight repair; Stage 7 (optional, per-character) adds accessories.

### Stage 1 — Scale the source to 10 cm and centre it

```python
import bpy

SRC_NAME = "model1(original)"            # name of the source mesh
TARGET_HEIGHT_M = 0.10                   # 10 cm
NEW_NAME = "model2(10cm)"

src = bpy.data.objects[SRC_NAME]
new_obj = src.copy()
new_obj.data = src.data.copy()
new_obj.name = NEW_NAME
new_obj.data.name = NEW_NAME
bpy.context.collection.objects.link(new_obj)

factor = TARGET_HEIGHT_M / max(src.dimensions)
new_obj.scale = (factor, factor, factor)
new_obj.location = (0.0, 0.0, 0.0)

bpy.ops.object.select_all(action='DESELECT')
new_obj.select_set(True)
bpy.context.view_layer.objects.active = new_obj
# Apply scale — REQUIRED before any boolean. Booleans use local coords.
bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
```

### Stage 2 — Foot magnet recesses

Find foot centres from the lowest slice of vertices, then cut a clean cylinder into each foot.

```python
import numpy as np

obj = bpy.data.objects[NEW_NAME]
coords = np.array([(obj.matrix_world @ v.co)[:] for v in obj.data.vertices])
zmin = coords[:, 2].min()

# Bottom slice of vertices (within 1.5 mm of lowest point)
bottom = coords[coords[:, 2] < zmin + 0.0015]
left  = bottom[bottom[:, 0] < 0]
right = bottom[bottom[:, 0] > 0]
left_centre  = left.mean(axis=0)
right_centre = right.mean(axis=0)

# Magnet & recess spec
MAGNET_DIA   = 0.0030    # 3 mm
MAGNET_DEPTH = 0.0020    # 2 mm
RECESS_DIA   = MAGNET_DIA + 0.0002    # 3.2 mm dia
RECESS_DEPTH = MAGNET_DEPTH + 0.0002  # 2.2 mm deep

overshoot = 0.0005   # extend cylinder below z=0 for clean boolean
cyl_h     = RECESS_DEPTH + overshoot
cyl_z_c   = (RECESS_DEPTH - overshoot) / 2.0

cutters = []
for label, c in [("L", left_centre), ("R", right_centre)]:
    bpy.ops.mesh.primitive_cylinder_add(
        vertices=64,
        radius=RECESS_DIA / 2.0,
        depth=cyl_h,
        location=(c[0], c[1], cyl_z_c),
    )
    cyl = bpy.context.active_object
    cyl.name = f"foot_cutter_{label}"
    cutters.append(cyl.name)

bpy.context.view_layer.objects.active = obj
for name in cutters:
    mod = obj.modifiers.new(name=f"bool_{name}", type='BOOLEAN')
    mod.operation = 'DIFFERENCE'
    mod.object = bpy.data.objects[name]
    mod.solver = 'EXACT'      # NEVER use 'FAST' on thin or precise features
    bpy.ops.object.modifier_apply(modifier=mod.name)

bpy.ops.object.select_all(action='DESELECT')
for name in cutters:
    bpy.data.objects[name].select_set(True)
bpy.ops.object.delete()
```

### Stage 3 — Eyes (ray-cast surface alignment)

```python
from mathutils import Vector

EYE_Z_FRACTION = 0.65                    # 65% of body height
EYE_X_OFFSET_M = 0.01229                 # measured from your 2D reference
EYE_OD_M  = 0.0050
EYE_TUBE_M = 0.0004                      # full tube thickness (2× minor radius)

Z_eye = TARGET_HEIGHT_M * EYE_Z_FRACTION

mw  = obj.matrix_world
mwi = mw.inverted()

def front_hit(x, z):
    # Cast from far -Y toward +Y; assumes front of figure faces -Y
    o = mwi @ Vector((x, -TARGET_HEIGHT_M, z))
    d = (mwi.to_3x3() @ Vector((0, 1, 0))).normalized()
    hit, loc, n, _ = obj.ray_cast(o, d)
    if not hit:
        raise RuntimeError(f"No surface hit at ({x*1000:.1f}, {z*1000:.1f}) mm")
    return (mw @ loc), (mw.to_3x3() @ n).normalized()

eyes = []
for label, x in [("L", -EYE_X_OFFSET_M), ("R", EYE_X_OFFSET_M)]:
    loc, n = front_hit(x, Z_eye)
    eyes.append((label, loc, n))

MAJOR_R = EYE_OD_M / 2.0 - EYE_TUBE_M / 2.0
MINOR_R = EYE_TUBE_M / 2.0
z_up = Vector((0, 0, 1))

cutters = []
for label, loc, n in eyes:
    bpy.ops.mesh.primitive_torus_add(
        major_radius=MAJOR_R, minor_radius=MINOR_R,
        major_segments=64, minor_segments=16,
        location=loc,
    )
    t = bpy.context.active_object
    t.name = f"eye_{label}"
    t.rotation_mode = 'QUATERNION'
    t.rotation_quaternion = z_up.rotation_difference(n)   # align torus axis to outward normal
    cutters.append(t.name)

bpy.ops.object.select_all(action='DESELECT')
obj.select_set(True)
bpy.context.view_layer.objects.active = obj
for name in cutters:
    mod = obj.modifiers.new(name=f"union_{name}", type='BOOLEAN')
    mod.operation = 'UNION'
    mod.object = bpy.data.objects[name]
    mod.solver = 'EXACT'
    bpy.ops.object.modifier_apply(modifier=mod.name)

bpy.ops.object.select_all(action='DESELECT')
for name in cutters:
    bpy.data.objects[name].select_set(True)
bpy.ops.object.delete()
```

### Stage 4 — Base with matching magnet recesses

```python
BASE_DIA_M = 0.080                        # 80 mm
BASE_H_M   = 0.008
BASE_CX, BASE_CY = 0.0, 0.0               # base sits under figure

bpy.ops.mesh.primitive_cylinder_add(
    vertices=96,
    radius=BASE_DIA_M / 2.0,
    depth=BASE_H_M,
    location=(BASE_CX, BASE_CY, -BASE_H_M / 2.0),  # top flush at z=0
)
base = bpy.context.active_object
base.name = "base_8cm"
base.data.name = "base_8cm"
# Smooth shading on sides only; keep caps flat for clean disc edges
for p in base.data.polygons:
    p.use_smooth = (len(p.vertices) != 2 * 96)

# Recesses on top, cutting DOWN — same XY as figure feet
cyl_z_base = (overshoot - RECESS_DEPTH) / 2.0
cutters = []
for label, c in [("L", left_centre), ("R", right_centre)]:
    bpy.ops.mesh.primitive_cylinder_add(
        vertices=64,
        radius=RECESS_DIA / 2.0,
        depth=cyl_h,
        location=(BASE_CX + c[0], BASE_CY + c[1], cyl_z_base),
    )
    cyl = bpy.context.active_object
    cyl.name = f"base_cutter_{label}"
    cutters.append(cyl.name)

bpy.ops.object.select_all(action='DESELECT')
base.select_set(True)
bpy.context.view_layer.objects.active = base
for name in cutters:
    mod = base.modifiers.new(name=f"bool_{name}", type='BOOLEAN')
    mod.operation = 'DIFFERENCE'
    mod.object = bpy.data.objects[name]
    mod.solver = 'EXACT'
    bpy.ops.object.modifier_apply(modifier=mod.name)

bpy.ops.object.select_all(action='DESELECT')
for name in cutters:
    bpy.data.objects[name].select_set(True)
bpy.ops.object.delete()
```

### Stage 5 — Leg stability check & deformation (CRITICAL)

This is the step we added today after the first print wobbled. The default Auwa source has feet that taper to a small sole — physically unstable. Anisotropic vertex displacement makes the sole deeper in Y while keeping X width, matching Auwa03's proven proportions and producing a stable stance with no boolean seams (the surface stays topologically the same — only existing vertices move).

```python
# Foot centres (same values as Stage 2 above)
left_xy  = (left_centre[0],  left_centre[1])
right_xy = (right_centre[0], right_centre[1])

# Deformation parameters — these worked for AUWA's source. Adjust per character.
SOLE_X    = 1.00     # X scale at sole (1.0 = preserve original width)
SOLE_Y    = 1.30     # Y scale at sole (1.3 = 30% deeper)
DEFORM_H  = 0.010    # falloff height — deformation fades to zero at z=10mm

# Recess guard — leave the magnet hole walls untouched so the cylinder stays clean
RECESS_R_GUARD = (RECESS_DIA / 2.0) + 0.0003    # 0.3 mm beyond recess wall
RECESS_Z_GUARD = RECESS_DEPTH + 0.0003

def in_recess(co):
    for cx, cy in (left_xy, right_xy):
        if (co.x - cx)**2 + (co.y - cy)**2 < RECESS_R_GUARD**2 and co.z < RECESS_Z_GUARD:
            return True
    return False

for v in obj.data.vertices:
    if v.co.z >= DEFORM_H or in_recess(v.co):
        continue
    cx, cy = (left_xy if v.co.x < 0 else right_xy)
    dx = v.co.x - cx
    dy = v.co.y - cy

    # Smoothstep falloff: 1.0 at sole, 0.0 at z = DEFORM_H — C1 continuous
    t = (DEFORM_H - v.co.z) / DEFORM_H
    t = max(0.0, min(1.0, t))
    t = t * t * (3 - 2 * t)

    sx = 1.0 + (SOLE_X - 1.0) * t
    sy = 1.0 + (SOLE_Y - 1.0) * t

    v.co.x = cx + dx * sx
    v.co.y = cy + dy * sy

obj.data.update()
```

**When to apply Stage 5:**
- Measure the sole contact patch in Stage 1 output (X × Y at the bottom slice)
- If Y < 6 mm for a 10 cm figure (front-back contact too narrow) → apply this stage
- If a different character's source is already chunky-legged, may not be needed

**Tuning Stage 5 for a different character:**
- Start with SOLE_X = 1.00, SOLE_Y = 1.25–1.35
- Make a preview copy first (don't modify the real model2 until happy)
- The recess guard automatically keeps the magnet holes circular and at the correct position — no need to re-cut

### Stage 6 — Manifold check and repair

```python
import bmesh

def check_and_repair(obj_name):
    obj = bpy.data.objects[obj_name]
    bpy.ops.object.select_all(action='DESELECT')
    obj.select_set(True)
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.mode_set(mode='EDIT')

    bm = bmesh.from_edit_mesh(obj.data)
    nm_e_b = sum(1 for e in bm.edges if not e.is_manifold)
    nm_v_b = sum(1 for v in bm.verts if not v.is_manifold)

    bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.mesh.remove_doubles(threshold=0.0001)
    bpy.ops.mesh.normals_make_consistent(inside=False)
    bpy.ops.mesh.select_all(action='DESELECT')
    bpy.ops.mesh.select_non_manifold()
    bpy.ops.mesh.fill_holes(sides=0)

    bm = bmesh.from_edit_mesh(obj.data)
    nm_e_a = sum(1 for e in bm.edges if not e.is_manifold)
    nm_v_a = sum(1 for v in bm.verts if not v.is_manifold)
    bpy.ops.object.mode_set(mode='OBJECT')
    print(f"[{obj_name}] {nm_e_b}/{nm_v_b} → {nm_e_a}/{nm_v_a}")
    return nm_e_a == 0 and nm_v_a == 0

check_and_repair(NEW_NAME)
check_and_repair("base_8cm")
bpy.ops.wm.save_mainfile()
```

After Stage 6, both meshes are watertight, magnets align, file is saved. **Ready to slice & print.**

---

## Stage 7 — Adding character accessories

Once Stages 1–6 are done, you have a proven body + base. Now each character variant gets its accessories. The principle: **build the body once, add accessories per character, never modify the foundation body**.

### Where things go

The body has natural attachment regions:

- **Head crown** — the top of the head, roughly z = 90–100 mm (90–100% of body height)
- **Forehead / brow line** — z = 70–80 mm
- **Face front** — the −Y surface around z = 50–70 mm (same place we put the eyes)
- **Sides / shoulders** — at the body's widest band, z = 25–35 mm
- **Hands** — at the natural arm protrusions
- **Feet top / ankle** — the smooth slope just above the foot bulge, z = 5–15 mm
- **At-foot props** — sat on the base next to the figure rather than attached

### Pattern for any accessory

The same recipe works for almost everything:

1. **Position the accessory** in 3D space at the desired location on the body
2. **Find the surface beneath it** with a ray cast (like Stage 3 did for eyes), so you get position + outward normal
3. **Align the accessory** so its base sits on that surface, oriented along the normal
4. **Boolean UNION** with the body to merge into one watertight mesh, OR keep as a separate part if you want a removable accessory
5. **Re-run Stage 6** (manifold check) after adding

Skeleton code:

```python
from mathutils import Vector

def attach_to_body_surface(body, accessory, target_x, target_z, cast_axis='-Y'):
    """Position accessory on body surface at (x, z), oriented along outward surface normal."""
    mw  = body.matrix_world
    mwi = mw.inverted()

    # Cast from outside the body inward to find the surface
    if cast_axis == '-Y':                       # cast from -Y toward +Y (front face)
        origin = Vector((target_x, -0.20, target_z))
        direction = Vector((0, 1, 0))
    elif cast_axis == '+Z':                     # cast from above downward (top of head)
        origin = Vector((target_x, 0, 0.20))
        direction = Vector((0, 0, -1))
    elif cast_axis == '+X':                     # cast from the right (side / shoulder)
        origin = Vector((0.20, 0, target_z))
        direction = Vector((-1, 0, 0))
    # ... extend as needed

    o = mwi @ origin
    d = (mwi.to_3x3() @ direction).normalized()
    hit, loc, n, _ = body.ray_cast(o, d)
    if not hit:
        raise RuntimeError("No surface hit — accessory position is off the body")

    accessory.location = mw @ loc
    accessory.rotation_mode = 'QUATERNION'
    # Align accessory's local +Z to the body's outward surface normal
    z_up = Vector((0, 0, 1))
    accessory.rotation_quaternion = z_up.rotation_difference((mw.to_3x3() @ n).normalized())
```

### Approaches by accessory type

| Accessory type | Approach |
|---|---|
| **Hat or crown** | Model as a separate mesh, position on top of head with ray cast (cast direction `+Z`), boolean UNION |
| **Item in hand** | Model as a separate object, position at hand location, boolean UNION if held, leave separate if removable |
| **Face decoration (ribbon, mark, sticker)** | Same approach as the eyes — small flat shape, surface-aligned with `-Y` ray cast, boolean UNION |
| **Pattern on the body (stripe, dot)** | Boolean UNION or DIFFERENCE depending on raised vs incised |
| **Item next to figure on base** | Model separately, place on the base (z = 0), no boolean — sits as its own object |
| **Feet add-on (shoes, paws)** | Anisotropic vertex deformation like Stage 5, OR boolean UNION with a separate sole-shaped mesh |

### Important rules for accessories

- **Never modify the foundation body's topology.** The body is proven. Use boolean UNION to add geometry, or work on a COPY of the body and modify that copy.
- **Always re-run the manifold check (Stage 6)** after any boolean operation.
- **Eye position is the reference for "front-of-face."** Other facial accessories use the same Y surface (Y ≈ −27.7 mm at Z = 65 mm for the 10 cm body).
- **If the accessory needs to be removable** (separate magnetic part), give it its own small magnet recess and a matching recess on the body — same 3 × 2 mm magnet, same 3.2 × 2.2 mm recess spec.

---

## Magnet sizing for other figure sizes

| Figure height | Magnet | Recess | Hold force per pair |
|---|---|---|---|
| 6–9 cm | 3 × 2 mm N52 | 3.2 × 2.2 mm | ~600 g |
| 10–12 cm (this template) | 3 × 2 mm N52 | 3.2 × 2.2 mm | ~600 g |
| 15–18 cm | 5 × 3 mm N52 | 5.2 × 3.2 mm | ~1.4 kg |
| 20–25 cm | 6 × 3 mm N52 | 6.2 × 3.2 mm | ~2 kg |

Rule of thumb: aim for ~8–10× the figure's weight in hold force.

---

## AUWA reference values (the 10 cm body that printed)

| | Value |
|---|---|
| Source mesh | `model1(original)` — 1.5 × 1.14 × 1.9 m unscaled |
| Front direction | −Y |
| Scale factor for 10 cm | 0.0526 |
| Foot centres | L = (−16.59, +0.03), R = (+16.44, +0.05) mm |
| Eye centres | X = ±12.29 mm, Z = 65 mm, surface at Y = −27.72 mm |
| Eye surface normal | ≈ (±0.36, −0.93, −0.04) — mostly outward (−Y) with slight outward X |
| Sole (before leg deformation) | 6.06 × 5.70 mm — too narrow front-back, unstable |
| Sole (after leg deformation) | 6.06 × 7.32 mm — stable when printed |
| Magnet contact patch alignment | 0.000 mm offset between figure and base recesses |
| Final figure verts / faces | 9,338 / 16,408 (watertight) |
| Final base verts / faces | ~450 / 540 (watertight) |

---

## Gotchas (lessons learned)

- **Apply scale before any boolean.** Booleans use local coordinates; a scaled-but-unapplied object will cut wrong-sized features.
- **Always use the EXACT boolean solver.** FAST is unreliable on thin features (eye tube < 0.3 mm) and precise cylinders.
- **Name collisions are silent.** Blender appends `.001`, `.002` etc. without warning. Check `bpy.context.active_object.name` after creating a primitive.
- **Recess geometric centre ≠ vertex centroid.** When measuring a recess centre after boolean, the boolean may add asymmetric vertices around the rim. Use the bounding-box midpoint of wall verts at radius 1.6 mm, not the average.
- **Foot sole curves up at the rim** by about 0.05–0.1 mm — this is the source mesh's natural shape, not a problem. Recess depth reads 2.15 mm instead of 2.20 mm but the magnet still seats flush.
- **Don't try to match a "donor" character mesh exactly.** When fixing AUWA's legs, the goal was Auwa03's aspect ratio (deeper than wide), not Auwa03's literal geometry — applying the proportion to AUWA's own mesh keeps Auwa04's character.
- **Vertex deformation > boolean union for surface modifications.** When the goal is a smooth, seamless change to the body (like the leg widening), move existing vertices with a smooth falloff — no new edges are created, so no joints can ever be visible.
- **Recess guard radius matters.** When deforming vertices near the recess, set the guard to ~0.3 mm beyond the recess wall radius. Too tight and the recess wall verts get caught in the deformation; too loose and a discontinuity may appear at the boundary.
- **Save snapshots at milestones.** `bpy.ops.wm.save_as_mainfile(filepath="...", copy=True)` writes a snapshot without switching the active file. The current working file series for AUWA is: `Auwa04.blend` (first print, original) → `Auwa04.1.blend` (working, with leg fix) → `Auwa.final.blend` (locked production).

---

## INSTRUCTIONS FOR THE BLENDER AGENT

This is the build session for the locked AUWA 10 cm body + 8 cm base. Follow the tasks below **one at a time, in order**. After each task:

1. Run the code for that task only
2. Report the result (show the actual numbers from the output)
3. Ask the user: **"Task N complete. Shall I proceed to Task N+1?"**
4. **Wait for the user to say "Yes"** before moving on
5. If the user says "No" or asks for changes, stop and discuss before continuing

If the output numbers don't match the expected values in this doc, stop and tell the user — don't proceed silently.

For a different character, the user will tell you which values to change. The default values below produce the proven AUWA `model2(10cm)` + `base_8cm` pair.

### Shared values (set once at the start of the session)

```python
import bpy, bmesh, numpy as np
from mathutils import Vector

SRC_NAME         = "model1(original)"   # source mesh name
TARGET_HEIGHT_M  = 0.10                 # 10 cm
NEW_NAME         = "model2(10cm)"
BASE_NAME        = "base_8cm"
BASE_DIA_M       = 0.080
BASE_H_M         = 0.008
EYE_Z_FRACTION   = 0.65
EYE_X_OFFSET_M   = 0.01229
EYE_OD_M         = 0.0050
EYE_TUBE_M       = 0.0004
MAGNET_DIA       = 0.0030
MAGNET_DEPTH     = 0.0020
RECESS_TOLERANCE = 0.0002
RECESS_DIA       = MAGNET_DIA + RECESS_TOLERANCE       # 3.2 mm
RECESS_DEPTH     = MAGNET_DEPTH + RECESS_TOLERANCE     # 2.2 mm
APPLY_LEG_FIX    = True
SOLE_X           = 1.00
SOLE_Y           = 1.30
DEFORM_H         = 0.010
```

These are read by every task below. Set them once at the top of the session.

---

### Task 1 — Verify the source mesh

**What:** Confirm the source mesh exists, check its dimensions, identify the front direction.

```python
src = bpy.data.objects[SRC_NAME]
print(f"Source mesh: {src.name}")
print(f"Dimensions: {tuple(round(d, 4) for d in src.dimensions)} m")
print(f"Vertex count: {len(src.data.vertices)}")
print(f"Front direction (convention): -Y")
```

**Expected for AUWA:** `model1(original)`, dimensions `(1.4997, 1.1396, 1.9021)` m, 7990 verts.

**Ask the user:** "Task 1 complete. Source is `model1(original)`, 1.5 × 1.14 × 1.9 m. Shall I proceed to Task 2?"

---

### Task 2 — Create the scaled figure at origin

**What:** Duplicate the source, scale so the tallest dimension equals `TARGET_HEIGHT_M`, apply the scale (required for booleans to work correctly), place at origin.

```python
src = bpy.data.objects[SRC_NAME]
obj = src.copy()
obj.data = src.data.copy()
obj.name = NEW_NAME
obj.data.name = NEW_NAME
bpy.context.collection.objects.link(obj)
factor = TARGET_HEIGHT_M / max(src.dimensions)
obj.scale = (factor, factor, factor)
obj.location = (0.0, 0.0, 0.0)
bpy.ops.object.select_all(action='DESELECT')
obj.select_set(True)
bpy.context.view_layer.objects.active = obj
bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
print(f"Created: {obj.name}, dimensions = {tuple(round(d*1000,2) for d in obj.dimensions)} mm")
```

**Expected:** `model2(10cm)`, dimensions `(78.84, 59.91, 100.0)` mm.

**Ask the user:** "Task 2 complete. Figure is 78.84 × 59.91 × 100.0 mm at origin. Shall I proceed to Task 3?"

---

### Task 3 — Cut the foot magnet recesses

**What:** Find the two foot centroids automatically from the bottom slice of vertices, then cut a clean 3.2 × 2.2 mm cylinder into each foot using boolean DIFFERENCE.

```python
obj = bpy.data.objects[NEW_NAME]
coords = np.array([(obj.matrix_world @ v.co)[:] for v in obj.data.vertices])
zmin = coords[:, 2].min()
bottom = coords[coords[:, 2] < zmin + 0.0015]
left_xy  = tuple(bottom[bottom[:, 0] < 0].mean(axis=0)[:2])
right_xy = tuple(bottom[bottom[:, 0] > 0].mean(axis=0)[:2])
print(f"Foot centres: L = ({left_xy[0]*1000:.2f}, {left_xy[1]*1000:.2f}) mm, "
      f"R = ({right_xy[0]*1000:.2f}, {right_xy[1]*1000:.2f}) mm")

# Save foot centres for later tasks
bpy.context.scene["_foot_left"]  = list(left_xy)
bpy.context.scene["_foot_right"] = list(right_xy)

overshoot  = 0.0005
cyl_h      = RECESS_DEPTH + overshoot
cyl_z_foot = (RECESS_DEPTH - overshoot) / 2.0

cutters = []
for label, c in [("L", left_xy), ("R", right_xy)]:
    bpy.ops.mesh.primitive_cylinder_add(
        vertices=64, radius=RECESS_DIA / 2.0, depth=cyl_h,
        location=(c[0], c[1], cyl_z_foot),
    )
    cyl = bpy.context.active_object
    cyl.name = f"foot_cutter_{label}"
    cutters.append(cyl.name)

bpy.ops.object.select_all(action='DESELECT')
obj.select_set(True)
bpy.context.view_layer.objects.active = obj
for name in cutters:
    mod = obj.modifiers.new(name=f"bool_{name}", type='BOOLEAN')
    mod.operation = 'DIFFERENCE'
    mod.object = bpy.data.objects[name]
    mod.solver = 'EXACT'
    bpy.ops.object.modifier_apply(modifier=mod.name)
bpy.ops.object.select_all(action='DESELECT')
for name in cutters:
    bpy.data.objects[name].select_set(True)
bpy.ops.object.delete()
print(f"Foot recesses cut: {RECESS_DIA*1000:.1f} mm dia × {RECESS_DEPTH*1000:.1f} mm deep")
```

**Expected for AUWA:** L = `(-16.59, +0.03)` mm, R = `(+16.44, +0.05)` mm, recesses 3.2 × 2.2 mm.

**Ask the user:** "Task 3 complete. Foot recesses cut at L (−16.59, +0.03) and R (+16.44, +0.05). Shall I proceed to Task 4?"

---

### Task 4 — Add the eyes (ray-cast surface alignment)

**What:** Ray-cast from in front of the figure to find the head surface at the eye positions, then place torus rings flat against the curved face. Eyes are merged into the body by boolean UNION.

```python
obj = bpy.data.objects[NEW_NAME]
Z_eye = TARGET_HEIGHT_M * EYE_Z_FRACTION
mw, mwi = obj.matrix_world, obj.matrix_world.inverted()

def front_hit(x, z):
    o = mwi @ Vector((x, -TARGET_HEIGHT_M, z))
    d = (mwi.to_3x3() @ Vector((0, 1, 0))).normalized()
    hit, loc, n, _ = obj.ray_cast(o, d)
    if not hit:
        raise RuntimeError(f"No surface hit at ({x*1000:.1f}, {z*1000:.1f}) mm")
    return (mw @ loc), (mw.to_3x3() @ n).normalized()

MAJOR_R = EYE_OD_M / 2.0 - EYE_TUBE_M / 2.0
MINOR_R = EYE_TUBE_M / 2.0
z_up = Vector((0, 0, 1))

eye_cutters = []
for label, x in [("L", -EYE_X_OFFSET_M), ("R", EYE_X_OFFSET_M)]:
    loc, n = front_hit(x, Z_eye)
    print(f"Eye {label}: surface at ({loc.x*1000:.2f}, {loc.y*1000:.2f}, {loc.z*1000:.2f}) mm")
    bpy.ops.mesh.primitive_torus_add(
        major_radius=MAJOR_R, minor_radius=MINOR_R,
        major_segments=64, minor_segments=16,
        location=loc,
    )
    t = bpy.context.active_object
    t.name = f"eye_{label}"
    t.rotation_mode = 'QUATERNION'
    t.rotation_quaternion = z_up.rotation_difference(n)
    eye_cutters.append(t.name)

bpy.ops.object.select_all(action='DESELECT')
obj.select_set(True)
bpy.context.view_layer.objects.active = obj
for name in eye_cutters:
    mod = obj.modifiers.new(name=f"union_{name}", type='BOOLEAN')
    mod.operation = 'UNION'
    mod.object = bpy.data.objects[name]
    mod.solver = 'EXACT'
    bpy.ops.object.modifier_apply(modifier=mod.name)
bpy.ops.object.select_all(action='DESELECT')
for name in eye_cutters:
    bpy.data.objects[name].select_set(True)
bpy.ops.object.delete()
print(f"Eyes added: {EYE_OD_M*1000:.1f} mm OD torus at Z = {Z_eye*1000:.0f} mm")
```

**Expected for AUWA:** Eye L at `(-12.29, -27.72, 65.00)` mm, Eye R at `(+12.29, -27.72, 65.00)` mm.

**Ask the user:** "Task 4 complete. Eyes added at Z=65mm, ±12.29mm X, surface at Y=−27.72mm. Shall I proceed to Task 5?"

---

### Task 5 — Build the base with matching magnet recesses

**What:** Create an 80 mm × 8 mm cylinder centred under the figure, smooth-shade the sides only, then cut matching 3.2 × 2.2 mm recesses into the top, aligned exactly under the figure's feet.

```python
left_xy  = tuple(bpy.context.scene["_foot_left"])
right_xy = tuple(bpy.context.scene["_foot_right"])
BASE_CX, BASE_CY = 0.0, 0.0

bpy.ops.mesh.primitive_cylinder_add(
    vertices=96, radius=BASE_DIA_M / 2.0, depth=BASE_H_M,
    location=(BASE_CX, BASE_CY, -BASE_H_M / 2.0),
)
base = bpy.context.active_object
base.name = BASE_NAME
base.data.name = BASE_NAME
for p in base.data.polygons:
    p.use_smooth = (len(p.vertices) != 2 * 96)

overshoot   = 0.0005
cyl_h       = RECESS_DEPTH + overshoot
cyl_z_base  = (overshoot - RECESS_DEPTH) / 2.0   # cuts DOWN from z=0

base_cutters = []
for label, c in [("L", left_xy), ("R", right_xy)]:
    bpy.ops.mesh.primitive_cylinder_add(
        vertices=64, radius=RECESS_DIA / 2.0, depth=cyl_h,
        location=(BASE_CX + c[0], BASE_CY + c[1], cyl_z_base),
    )
    cyl = bpy.context.active_object
    cyl.name = f"base_cutter_{label}"
    base_cutters.append(cyl.name)

bpy.ops.object.select_all(action='DESELECT')
base.select_set(True)
bpy.context.view_layer.objects.active = base
for name in base_cutters:
    mod = base.modifiers.new(name=f"bool_{name}", type='BOOLEAN')
    mod.operation = 'DIFFERENCE'
    mod.object = bpy.data.objects[name]
    mod.solver = 'EXACT'
    bpy.ops.object.modifier_apply(modifier=mod.name)
bpy.ops.object.select_all(action='DESELECT')
for name in base_cutters:
    bpy.data.objects[name].select_set(True)
bpy.ops.object.delete()
print(f"Base: {BASE_DIA_M*1000:.0f} mm dia × {BASE_H_M*1000:.0f} mm, recesses aligned at L/R foot centres")
```

**Expected for AUWA:** Base 80 mm dia × 8 mm height, two recesses 3.2 × 2.2 mm at `(-16.59, +0.03)` and `(+16.44, +0.05)`.

**Ask the user:** "Task 5 complete. Base built with magnet recesses aligned to the feet. Shall I proceed to Task 6?"

---

### Task 6 — Leg stability deformation

**What:** Anisotropic vertex displacement that stretches the sole 30% deeper in Y while preserving X width. Smoothstep falloff over the bottom 10 mm so the change feathers into the leg with no kink. Recess walls are skipped via a guard so the magnet hole stays a clean cylinder at its original position.

**Only run this task if `APPLY_LEG_FIX = True`.** For source meshes that already have chunky stable legs, skip Task 6.

```python
if not APPLY_LEG_FIX:
    print("Leg fix skipped (APPLY_LEG_FIX = False)")
else:
    obj = bpy.data.objects[NEW_NAME]
    left_xy  = tuple(bpy.context.scene["_foot_left"])
    right_xy = tuple(bpy.context.scene["_foot_right"])

    # Measure sole before the fix
    coords = np.array([(obj.matrix_world @ v.co)[:] for v in obj.data.vertices])
    bottom = coords[coords[:, 2] < coords[:, 2].min() + 0.0015]
    rs = bottom[bottom[:, 0] > 0.010]
    pre_x = (rs[:,0].max() - rs[:,0].min()) * 1000
    pre_y = (rs[:,1].max() - rs[:,1].min()) * 1000
    print(f"Sole BEFORE leg fix: {pre_x:.2f} × {pre_y:.2f} mm")

    RECESS_R_GUARD = (RECESS_DIA / 2.0) + 0.0003
    RECESS_Z_GUARD = RECESS_DEPTH + 0.0003

    def in_recess(co):
        for cx, cy in (left_xy, right_xy):
            if (co.x - cx)**2 + (co.y - cy)**2 < RECESS_R_GUARD**2 and co.z < RECESS_Z_GUARD:
                return True
        return False

    for v in obj.data.vertices:
        if v.co.z >= DEFORM_H or in_recess(v.co):
            continue
        cx, cy = (left_xy if v.co.x < 0 else right_xy)
        dx = v.co.x - cx
        dy = v.co.y - cy
        t = (DEFORM_H - v.co.z) / DEFORM_H
        t = max(0.0, min(1.0, t))
        t = t * t * (3 - 2 * t)
        sx = 1.0 + (SOLE_X - 1.0) * t
        sy = 1.0 + (SOLE_Y - 1.0) * t
        v.co.x = cx + dx * sx
        v.co.y = cy + dy * sy
    obj.data.update()

    # Measure sole after the fix
    coords = np.array([(obj.matrix_world @ v.co)[:] for v in obj.data.vertices])
    bottom = coords[coords[:, 2] < coords[:, 2].min() + 0.0015]
    rs = bottom[bottom[:, 0] > 0.010]
    post_x = (rs[:,0].max() - rs[:,0].min()) * 1000
    post_y = (rs[:,1].max() - rs[:,1].min()) * 1000
    print(f"Sole AFTER leg fix:  {post_x:.2f} × {post_y:.2f} mm (Y +{(post_y/pre_y-1)*100:.0f}%)")
```

**Expected for AUWA:** Sole before `6.06 × 5.70` → after `6.06 × 7.32` mm (Y +28%).

**Ask the user:** "Task 6 complete. Sole now 6.06 × 7.32 mm — 28% deeper in Y for front-back stability. Shall I proceed to Task 7?"

---

### Task 7 — Manifold check and repair (both meshes)

**What:** Verify both the figure and the base are watertight. Merge duplicate verts, recalculate outward normals, fill any unintended holes. Report before/after counts.

```python
def check_and_repair(obj_name):
    o = bpy.data.objects[obj_name]
    bpy.ops.object.select_all(action='DESELECT')
    o.select_set(True)
    bpy.context.view_layer.objects.active = o
    bpy.ops.object.mode_set(mode='EDIT')
    bm = bmesh.from_edit_mesh(o.data)
    nm_e_b = sum(1 for e in bm.edges if not e.is_manifold)
    nm_v_b = sum(1 for v in bm.verts if not v.is_manifold)
    bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.mesh.remove_doubles(threshold=0.0001)
    bpy.ops.mesh.normals_make_consistent(inside=False)
    bpy.ops.mesh.select_all(action='DESELECT')
    bpy.ops.mesh.select_non_manifold()
    bpy.ops.mesh.fill_holes(sides=0)
    bm = bmesh.from_edit_mesh(o.data)
    nm_e_a = sum(1 for e in bm.edges if not e.is_manifold)
    nm_v_a = sum(1 for v in bm.verts if not v.is_manifold)
    bpy.ops.object.mode_set(mode='OBJECT')
    print(f"[{obj_name}] before {nm_e_b}/{nm_v_b} → after {nm_e_a}/{nm_v_a}  (non-manifold edges/verts)")
    return nm_e_a == 0 and nm_v_a == 0

ok_body = check_and_repair(NEW_NAME)
ok_base = check_and_repair(BASE_NAME)
print(f"\nBoth watertight: {ok_body and ok_base}")
```

**Expected for AUWA:** Both `0/0 → 0/0`, both watertight `True`.

**If any non-manifold edges/verts remain after the repair**, stop and tell the user — do not proceed to save.

**Ask the user:** "Task 7 complete. Both meshes watertight. Shall I proceed to Task 8 (save)?"

---

### Task 8 — Save the file

**What:** Save the current Blender file. If this is the proven foundation save (no character accessories), also save a copy as the locked foundation snapshot.

```python
bpy.ops.wm.save_mainfile()
print(f"Saved: {bpy.data.filepath}")
```

**Ask the user:** "Task 8 complete. File saved at `[path]`. Build complete. Would you like me to also save a foundation snapshot (`Auwa.body.blend`), or are we done?"

If user says "save snapshot too":

```python
import os
snapshot_path = os.path.join(os.path.dirname(bpy.data.filepath), "Auwa.body.blend")
bpy.ops.wm.save_as_mainfile(filepath=snapshot_path, copy=True)
print(f"Snapshot saved: {snapshot_path}  (working file still: {bpy.data.filepath})")
```

---

## End of build session

After Task 8, the 10 cm body + 8 cm base is built, watertight, saved. The user can now slice and print, or move on to Stage 7 (per-character accessories) in a new session.

```python
import bpy
import bmesh
import numpy as np
from mathutils import Vector

# === EDIT PER CHARACTER ===
SRC_NAME            = "model1(original)"   # source mesh name in the .blend
TARGET_HEIGHT_M     = 0.10                 # 10 cm figure
NEW_NAME            = "model2(10cm)"       # name for the built figure
BASE_NAME           = "base_8cm"
BASE_DIA_M          = 0.080                # base 80 mm diameter
BASE_H_M            = 0.008                # base 8 mm height
EYE_Z_FRACTION      = 0.65                 # eyes at 65% of body height
EYE_X_OFFSET_M      = 0.01229              # eye horizontal offset from centre
EYE_OD_M            = 0.0050               # eye outer diameter 5 mm
EYE_TUBE_M          = 0.0004               # eye tube thickness 0.4 mm
MAGNET_DIA          = 0.0030               # 3 × 2 mm N52 magnet
MAGNET_DEPTH        = 0.0020
RECESS_TOLERANCE    = 0.0002               # 0.2 mm fit clearance
APPLY_LEG_FIX       = True                 # Stage 5 — set False if source already stable
SOLE_X              = 1.00                 # leg deformation X scale at sole
SOLE_Y              = 1.30                 # leg deformation Y scale at sole (1.30 = 30% deeper)
DEFORM_H            = 0.010                # leg deformation falloff height
# ==========================

RECESS_DIA   = MAGNET_DIA + RECESS_TOLERANCE       # 3.2 mm
RECESS_DEPTH = MAGNET_DEPTH + RECESS_TOLERANCE     # 2.2 mm

# ── Stage 1: scale source to target height, centre at origin, apply scale ──
src = bpy.data.objects[SRC_NAME]
obj = src.copy()
obj.data = src.data.copy()
obj.name = NEW_NAME
obj.data.name = NEW_NAME
bpy.context.collection.objects.link(obj)
factor = TARGET_HEIGHT_M / max(src.dimensions)
obj.scale = (factor, factor, factor)
obj.location = (0.0, 0.0, 0.0)
bpy.ops.object.select_all(action='DESELECT')
obj.select_set(True)
bpy.context.view_layer.objects.active = obj
bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)

# ── Find foot centroids from the bottom slice ──
coords = np.array([(obj.matrix_world @ v.co)[:] for v in obj.data.vertices])
zmin = coords[:, 2].min()
bottom = coords[coords[:, 2] < zmin + 0.0015]
left_xy  = tuple(bottom[bottom[:, 0] < 0].mean(axis=0)[:2])
right_xy = tuple(bottom[bottom[:, 0] > 0].mean(axis=0)[:2])
print(f"Foot centres: L = ({left_xy[0]*1000:.2f}, {left_xy[1]*1000:.2f}) mm, "
      f"R = ({right_xy[0]*1000:.2f}, {right_xy[1]*1000:.2f}) mm")

# Sole dimensions before any fix
right_sole = bottom[bottom[:, 0] > 0]
sole_x_pre = (right_sole[:, 0].max() - right_sole[:, 0].min()) * 1000
sole_y_pre = (right_sole[:, 1].max() - right_sole[:, 1].min()) * 1000
print(f"Sole (pre-fix): {sole_x_pre:.2f} × {sole_y_pre:.2f} mm")

# ── Stage 2: cut foot magnet recesses (3.2 × 2.2 mm) ──
overshoot = 0.0005
cyl_h     = RECESS_DEPTH + overshoot
cyl_z_foot = (RECESS_DEPTH - overshoot) / 2.0   # cuts UP from z=0 into the foot

foot_cutters = []
for label, c in [("L", left_xy), ("R", right_xy)]:
    bpy.ops.mesh.primitive_cylinder_add(
        vertices=64, radius=RECESS_DIA / 2.0, depth=cyl_h,
        location=(c[0], c[1], cyl_z_foot),
    )
    cyl = bpy.context.active_object
    cyl.name = f"foot_cutter_{label}"
    foot_cutters.append(cyl.name)

bpy.ops.object.select_all(action='DESELECT')
obj.select_set(True)
bpy.context.view_layer.objects.active = obj
for name in foot_cutters:
    mod = obj.modifiers.new(name=f"bool_{name}", type='BOOLEAN')
    mod.operation = 'DIFFERENCE'
    mod.object = bpy.data.objects[name]
    mod.solver = 'EXACT'
    bpy.ops.object.modifier_apply(modifier=mod.name)
bpy.ops.object.select_all(action='DESELECT')
for name in foot_cutters:
    bpy.data.objects[name].select_set(True)
bpy.ops.object.delete()

# ── Stage 3: add eyes via ray-cast surface alignment ──
Z_eye = TARGET_HEIGHT_M * EYE_Z_FRACTION
mw, mwi = obj.matrix_world, obj.matrix_world.inverted()

def front_hit(x, z):
    """Cast from far -Y toward +Y; returns (world_loc, world_normal). Front of figure = -Y."""
    o = mwi @ Vector((x, -TARGET_HEIGHT_M, z))
    d = (mwi.to_3x3() @ Vector((0, 1, 0))).normalized()
    hit, loc, n, _ = obj.ray_cast(o, d)
    if not hit:
        raise RuntimeError(f"No surface hit at ({x*1000:.1f}, {z*1000:.1f}) mm — check EYE_X_OFFSET_M / EYE_Z_FRACTION")
    return (mw @ loc), (mw.to_3x3() @ n).normalized()

MAJOR_R = EYE_OD_M / 2.0 - EYE_TUBE_M / 2.0
MINOR_R = EYE_TUBE_M / 2.0
z_up = Vector((0, 0, 1))

eye_cutters = []
for label, x in [("L", -EYE_X_OFFSET_M), ("R", EYE_X_OFFSET_M)]:
    loc, n = front_hit(x, Z_eye)
    print(f"Eye {label}: surface at ({loc.x*1000:.2f}, {loc.y*1000:.2f}, {loc.z*1000:.2f}) mm")
    bpy.ops.mesh.primitive_torus_add(
        major_radius=MAJOR_R, minor_radius=MINOR_R,
        major_segments=64, minor_segments=16,
        location=loc,
    )
    t = bpy.context.active_object
    t.name = f"eye_{label}"
    t.rotation_mode = 'QUATERNION'
    t.rotation_quaternion = z_up.rotation_difference(n)
    eye_cutters.append(t.name)

bpy.ops.object.select_all(action='DESELECT')
obj.select_set(True)
bpy.context.view_layer.objects.active = obj
for name in eye_cutters:
    mod = obj.modifiers.new(name=f"union_{name}", type='BOOLEAN')
    mod.operation = 'UNION'
    mod.object = bpy.data.objects[name]
    mod.solver = 'EXACT'
    bpy.ops.object.modifier_apply(modifier=mod.name)
bpy.ops.object.select_all(action='DESELECT')
for name in eye_cutters:
    bpy.data.objects[name].select_set(True)
bpy.ops.object.delete()

# ── Stage 4: build base with matching magnet recesses ──
BASE_CX, BASE_CY = 0.0, 0.0
bpy.ops.mesh.primitive_cylinder_add(
    vertices=96, radius=BASE_DIA_M / 2.0, depth=BASE_H_M,
    location=(BASE_CX, BASE_CY, -BASE_H_M / 2.0),
)
base = bpy.context.active_object
base.name = BASE_NAME
base.data.name = BASE_NAME
for p in base.data.polygons:
    p.use_smooth = (len(p.vertices) != 2 * 96)   # smooth sides, flat caps

cyl_z_base = (overshoot - RECESS_DEPTH) / 2.0   # cuts DOWN from z=0 into the base
base_cutters = []
for label, c in [("L", left_xy), ("R", right_xy)]:
    bpy.ops.mesh.primitive_cylinder_add(
        vertices=64, radius=RECESS_DIA / 2.0, depth=cyl_h,
        location=(BASE_CX + c[0], BASE_CY + c[1], cyl_z_base),
    )
    cyl = bpy.context.active_object
    cyl.name = f"base_cutter_{label}"
    base_cutters.append(cyl.name)

bpy.ops.object.select_all(action='DESELECT')
base.select_set(True)
bpy.context.view_layer.objects.active = base
for name in base_cutters:
    mod = base.modifiers.new(name=f"bool_{name}", type='BOOLEAN')
    mod.operation = 'DIFFERENCE'
    mod.object = bpy.data.objects[name]
    mod.solver = 'EXACT'
    bpy.ops.object.modifier_apply(modifier=mod.name)
bpy.ops.object.select_all(action='DESELECT')
for name in base_cutters:
    bpy.data.objects[name].select_set(True)
bpy.ops.object.delete()

# ── Stage 5: leg stability deformation (only if APPLY_LEG_FIX is True) ──
if APPLY_LEG_FIX:
    RECESS_R_GUARD = (RECESS_DIA / 2.0) + 0.0003   # 1.9 mm — preserves recess wall
    RECESS_Z_GUARD = RECESS_DEPTH + 0.0003

    def in_recess(co):
        for cx, cy in (left_xy, right_xy):
            if (co.x - cx)**2 + (co.y - cy)**2 < RECESS_R_GUARD**2 and co.z < RECESS_Z_GUARD:
                return True
        return False

    for v in obj.data.vertices:
        if v.co.z >= DEFORM_H or in_recess(v.co):
            continue
        cx, cy = (left_xy if v.co.x < 0 else right_xy)
        dx = v.co.x - cx
        dy = v.co.y - cy
        t = (DEFORM_H - v.co.z) / DEFORM_H
        t = max(0.0, min(1.0, t))
        t = t * t * (3 - 2 * t)        # smoothstep
        sx = 1.0 + (SOLE_X - 1.0) * t
        sy = 1.0 + (SOLE_Y - 1.0) * t
        v.co.x = cx + dx * sx
        v.co.y = cy + dy * sy
    obj.data.update()

    # Confirm new sole dimensions
    coords = np.array([(obj.matrix_world @ v.co)[:] for v in obj.data.vertices])
    bottom = coords[coords[:, 2] < coords[:, 2].min() + 0.0015]
    right_sole = bottom[bottom[:, 0] > 0.010]
    print(f"Sole (after leg fix): "
          f"{(right_sole[:,0].max()-right_sole[:,0].min())*1000:.2f} × "
          f"{(right_sole[:,1].max()-right_sole[:,1].min())*1000:.2f} mm")

# ── Stage 6: manifold check and repair on both meshes ──
def check_and_repair(obj_name):
    o = bpy.data.objects[obj_name]
    bpy.ops.object.select_all(action='DESELECT')
    o.select_set(True)
    bpy.context.view_layer.objects.active = o
    bpy.ops.object.mode_set(mode='EDIT')
    bm = bmesh.from_edit_mesh(o.data)
    nm_e_b = sum(1 for e in bm.edges if not e.is_manifold)
    nm_v_b = sum(1 for v in bm.verts if not v.is_manifold)
    bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.mesh.remove_doubles(threshold=0.0001)
    bpy.ops.mesh.normals_make_consistent(inside=False)
    bpy.ops.mesh.select_all(action='DESELECT')
    bpy.ops.mesh.select_non_manifold()
    bpy.ops.mesh.fill_holes(sides=0)
    bm = bmesh.from_edit_mesh(o.data)
    nm_e_a = sum(1 for e in bm.edges if not e.is_manifold)
    nm_v_a = sum(1 for v in bm.verts if not v.is_manifold)
    bpy.ops.object.mode_set(mode='OBJECT')
    print(f"[{obj_name}] {nm_e_b}/{nm_v_b} → {nm_e_a}/{nm_v_a}  (non-manifold edges/verts)")
    return nm_e_a == 0 and nm_v_a == 0

ok_body = check_and_repair(NEW_NAME)
ok_base = check_and_repair(BASE_NAME)
print(f"\nBoth watertight: {ok_body and ok_base}")

# ── Save the file ──
bpy.ops.wm.save_mainfile()
print(f"Saved: {bpy.data.filepath}")
```

**Expected output when this runs cleanly:**

```
Foot centres: L = (-16.59, +0.03) mm, R = (+16.44, +0.05) mm
Sole (pre-fix): 6.06 × 5.70 mm
Eye L: surface at (-12.29, -27.72, 65.00) mm
Eye R: surface at (12.29, -27.72, 65.00) mm
Sole (after leg fix): 6.06 × 7.32 mm
[model2(10cm)] 0/0 → 0/0  (non-manifold edges/verts)
[base_8cm]     0/0 → 0/0  (non-manifold edges/verts)

Both watertight: True
Saved: /Users/mac/Github/auwa/figure/blender/Good file/Auwa[N].blend
```

If you see those numbers, the build matches the proven AUWA print exactly. Slice and print.

---

## Then: per-character accessories (Stage 7)

After the body is built and saved, save a snapshot with `Auwa.body.blend`, then open a working copy named after the character (e.g. `Auwa-fox.blend`) and use the patterns in **Stage 7** above to add the character's accessories.

**Workflow per accessory:**
1. Decide the attachment region (head / face / hand / foot / next-to-figure on the base)
2. Model the accessory as a separate object
3. Use the `attach_to_body_surface` helper from Stage 7 to position it with ray-cast surface alignment
4. Boolean UNION onto the body (merged into one piece) **or** leave separate (removable part with its own magnet recess)
5. Re-run **`check_and_repair(NEW_NAME)`** from Stage 6

Save each character variant as `Auwa-[character].final.blend` and keep `Auwa.body.blend` untouched as the master foundation.

---

## File naming convention

- `Auwa.body.blend` — locked foundation: 10 cm body + 8 cm base, no character extras
- `Auwa.body.10cm.blend` etc. if you build multiple sizes from the same source
- `Auwa-[character].working.blend` — per-character work-in-progress
- `Auwa-[character].final.blend` — locked print-ready version for that character
- Always `save_as_mainfile(filepath=..., copy=True)` for snapshots so the active file doesn't switch unexpectedly
