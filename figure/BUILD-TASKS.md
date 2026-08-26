# Blender Agent — Build Tasks

You are a Blender agent. Build the AUWA 10 cm body + 8 cm base by following the tasks below.

## Rules

1. Do **one task at a time**, in order.
2. After each task, **show the user the result** (the actual printed output from the code).
3. Then **ask the user "Yes?"** to confirm before moving to the next task.
4. **Wait for the user's "Yes"** before proceeding. Do not run the next task on your own.
5. If the printed numbers don't match the **Expected** values in this file, **stop** and tell the user. Do not proceed.
6. If the user says anything other than "Yes" (e.g. "wait", "change something", a question), stop and discuss before continuing.

---

## Setup (run once at the start of the session)

```python
import bpy, bmesh, numpy as np
from mathutils import Vector

SRC_NAME         = "model1(original)"
TARGET_HEIGHT_M  = 0.10
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
RECESS_DIA       = MAGNET_DIA + RECESS_TOLERANCE
RECESS_DEPTH     = MAGNET_DEPTH + RECESS_TOLERANCE
APPLY_LEG_FIX    = True
SOLE_X           = 1.00
SOLE_Y           = 1.30
DEFORM_H         = 0.010
```

Then say to the user: **"Setup complete. Shall I start Task 1?"** Wait for "Yes".

---

## Task 1 — Verify source mesh

```python
src = bpy.data.objects[SRC_NAME]
print(f"Source: {src.name}")
print(f"Dimensions: {tuple(round(d, 4) for d in src.dimensions)} m")
print(f"Vertices: {len(src.data.vertices)}")
```

**Expected:** `model1(original)`, `(1.4997, 1.1396, 1.9021)` m, 7990 verts.

**Ask:** "Task 1 done — source verified. Yes to Task 2?"

---

## Task 2 — Create scaled figure at origin

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
print(f"Created {obj.name}: {tuple(round(d*1000, 2) for d in obj.dimensions)} mm")
```

**Expected:** `model2(10cm)`: `(78.84, 59.91, 100.0)` mm.

**Ask:** "Task 2 done — figure is 78.84 × 59.91 × 100 mm at origin. Yes to Task 3?"

---

## Task 3 — Cut foot magnet recesses

```python
obj = bpy.data.objects[NEW_NAME]
coords = np.array([(obj.matrix_world @ v.co)[:] for v in obj.data.vertices])
zmin = coords[:, 2].min()
bottom = coords[coords[:, 2] < zmin + 0.0015]
left_xy  = tuple(bottom[bottom[:, 0] < 0].mean(axis=0)[:2])
right_xy = tuple(bottom[bottom[:, 0] > 0].mean(axis=0)[:2])
bpy.context.scene["_foot_left"]  = list(left_xy)
bpy.context.scene["_foot_right"] = list(right_xy)
print(f"Foot centres: L=({left_xy[0]*1000:.2f}, {left_xy[1]*1000:.2f}) R=({right_xy[0]*1000:.2f}, {right_xy[1]*1000:.2f}) mm")

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

**Expected:** L = `(-16.59, +0.03)` mm, R = `(+16.44, +0.05)` mm, recesses 3.2 × 2.2 mm.

**Ask:** "Task 3 done — foot recesses cut at the expected positions. Yes to Task 4?"

---

## Task 4 — Add eyes

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
print(f"Eyes added: {EYE_OD_M*1000:.1f} mm OD at Z = {Z_eye*1000:.0f} mm")
```

**Expected:** Eye L at `(-12.29, -27.72, 65.00)` mm, Eye R at `(+12.29, -27.72, 65.00)` mm.

**Ask:** "Task 4 done — eyes added at Z=65mm, surface Y=−27.72mm. Yes to Task 5?"

---

## Task 5 — Build base with matching magnet recesses

```python
left_xy  = tuple(bpy.context.scene["_foot_left"])
right_xy = tuple(bpy.context.scene["_foot_right"])

bpy.ops.mesh.primitive_cylinder_add(
    vertices=96, radius=BASE_DIA_M / 2.0, depth=BASE_H_M,
    location=(0.0, 0.0, -BASE_H_M / 2.0),
)
base = bpy.context.active_object
base.name = BASE_NAME
base.data.name = BASE_NAME
for p in base.data.polygons:
    p.use_smooth = (len(p.vertices) != 2 * 96)

overshoot  = 0.0005
cyl_h      = RECESS_DEPTH + overshoot
cyl_z_base = (overshoot - RECESS_DEPTH) / 2.0

base_cutters = []
for label, c in [("L", left_xy), ("R", right_xy)]:
    bpy.ops.mesh.primitive_cylinder_add(
        vertices=64, radius=RECESS_DIA / 2.0, depth=cyl_h,
        location=(c[0], c[1], cyl_z_base),
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
print(f"Base: {BASE_DIA_M*1000:.0f} mm × {BASE_H_M*1000:.0f} mm with recesses aligned to feet")
```

**Expected:** Base 80 mm × 8 mm with two recesses 3.2 × 2.2 mm at the foot positions.

**Ask:** "Task 5 done — base built with aligned magnet recesses. Yes to Task 6?"

---

## Task 6 — Leg stability deformation

Only run if `APPLY_LEG_FIX = True`. If False, say "Task 6 skipped (APPLY_LEG_FIX = False). Yes to Task 7?"

```python
obj = bpy.data.objects[NEW_NAME]
left_xy  = tuple(bpy.context.scene["_foot_left"])
right_xy = tuple(bpy.context.scene["_foot_right"])

coords = np.array([(obj.matrix_world @ v.co)[:] for v in obj.data.vertices])
bottom = coords[coords[:, 2] < coords[:, 2].min() + 0.0015]
rs = bottom[bottom[:, 0] > 0.010]
pre_x = (rs[:,0].max() - rs[:,0].min()) * 1000
pre_y = (rs[:,1].max() - rs[:,1].min()) * 1000
print(f"Sole BEFORE: {pre_x:.2f} × {pre_y:.2f} mm")

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

coords = np.array([(obj.matrix_world @ v.co)[:] for v in obj.data.vertices])
bottom = coords[coords[:, 2] < coords[:, 2].min() + 0.0015]
rs = bottom[bottom[:, 0] > 0.010]
post_x = (rs[:,0].max() - rs[:,0].min()) * 1000
post_y = (rs[:,1].max() - rs[:,1].min()) * 1000
print(f"Sole AFTER:  {post_x:.2f} × {post_y:.2f} mm (Y +{(post_y/pre_y-1)*100:.0f}%)")
```

**Expected:** Sole `6.06 × 5.70` → `6.06 × 7.32` mm (Y +28%).

**Ask:** "Task 6 done — sole 6.06 × 7.32 mm, 28% deeper. Yes to Task 7?"

---

## Task 7 — Manifold check and repair

```python
def check_and_repair(obj_name, incremental=False):
    """
    incremental=False: full repair pass for first-build meshes
    incremental=True:  gentle repair for additions to already-clean meshes
                       (skips remove_doubles to avoid merging fine features)
    """
    o = bpy.data.objects[obj_name]
    bpy.ops.object.select_all(action='DESELECT')
    o.select_set(True)
    bpy.context.view_layer.objects.active = o
    bpy.ops.object.mode_set(mode='EDIT')
    bm = bmesh.from_edit_mesh(o.data)
    nm_e_b = sum(1 for e in bm.edges if not e.is_manifold)
    nm_v_b = sum(1 for v in bm.verts if not v.is_manifold)
    bpy.ops.mesh.select_all(action='SELECT')
    if not incremental:
        # First-build only: merge boolean-output duplicates
        bpy.ops.mesh.remove_doubles(threshold=0.0001)
    bpy.ops.mesh.normals_make_consistent(inside=False)
    if not incremental:
        bpy.ops.mesh.select_all(action='DESELECT')
        bpy.ops.mesh.select_non_manifold()
        bpy.ops.mesh.fill_holes(sides=0)
    bm = bmesh.from_edit_mesh(o.data)
    nm_e_a = sum(1 for e in bm.edges if not e.is_manifold)
    nm_v_a = sum(1 for v in bm.verts if not v.is_manifold)
    bpy.ops.object.mode_set(mode='OBJECT')
    print(f"[{obj_name}] {nm_e_b}/{nm_v_b} → {nm_e_a}/{nm_v_a}")
    return nm_e_a == 0 and nm_v_a == 0

ok_body = check_and_repair(NEW_NAME)
ok_base = check_and_repair(BASE_NAME)
print(f"Both watertight: {ok_body and ok_base}")
```

**Expected:** Both `0/0 → 0/0`, both watertight `True`.

**If not both watertight, STOP and tell the user.**

**Ask:** "Task 7 done — both meshes watertight. Yes to Task 8?"

---

### ⚠️ Important note on `remove_doubles` (lesson learned)

The default `remove_doubles(threshold=0.0001)` is **safe for first-build meshes** (Tasks 1-7 above) because the boolean output has truly duplicate vertices at the cut edges that need merging.

**BUT** when **adding new features to an already-clean mesh** (e.g. thickening eye rings, adding accessories on top of an existing watertight body), **do NOT use `remove_doubles`** — or use a much tighter threshold (0.00001). With features close together in space (like a 0.4mm eye getting upgraded to 0.6mm), the 0.0001 threshold can merge vertices that belong to *different* features, creating non-manifold geometry that cleanup tools can't easily fix.

**For incremental additions:** call `check_and_repair(obj_name, incremental=True)` — this skips `remove_doubles` and only re-computes normals.

**Symptom of this bug:** boolean union runs cleanly, then `remove_doubles` reports "Removed N vertices", and the manifold check goes from `0 → 3+ non-manifold edges`. Solution: redo the operation on a fresh copy of the source mesh, calling the incremental check.

---

## Task 8 — Save

```python
bpy.ops.wm.save_mainfile()
print(f"Saved: {bpy.data.filepath}")
```

**Ask:** "Task 8 done — file saved. The build is complete. Would you like me to also save a foundation snapshot as `Auwa.body.blend`?"

If user says yes:

```python
import os
snapshot = os.path.join(os.path.dirname(bpy.data.filepath), "Auwa.body.blend")
bpy.ops.wm.save_as_mainfile(filepath=snapshot, copy=True)
print(f"Snapshot saved: {snapshot}")
```

---

## End

After Task 8, the 10 cm body + 8 cm base is built, watertight, saved, ready to slice and print.

For per-character accessories (hats, items in hand, things at the feet), see the **Stage 7** section of `CHARACTER-WORKFLOW.md` — that's a separate session on top of the saved foundation.
