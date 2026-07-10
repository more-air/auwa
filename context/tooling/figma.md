# Auwa Figma

*Created 28 May 2026. Project IDs, file keys, and conventions for working with Auwa's Figma and FigJam files via the Figma MCP server. Load when the task involves creating or editing Figma/FigJam content.*

---

## Account & project

- **Authenticated user:** Tom (tom@moreair.co)
- **Team:** More Air (pro tier, full edit access)
- **Team key for MCP calls:** `team::817785093858644871`
- **Auwa project ID:** `573778922`
- **Auwa project URL:** https://www.figma.com/files/project/573778922

When calling `mcp__plugin_figma_figma__create_new_file`, pass `planKey: team::817785093858644871` and `projectId: 573778922` to land the file directly in the Auwa project. Without `projectId` the file lands in drafts and has to be dragged across manually.

Note: `generate_diagram` does NOT accept a `projectId` parameter; FigJam diagrams created via that tool always land in drafts as unclaimed files until Tom claims them, then he drags them into Auwa. If we want a FigJam to land directly inside Auwa, the workaround is to create the file via `create_new_file` first with `editorType: "figjam"` and `projectId: 573778922`, then use `use_figma` to populate it. For most cases the drafts-then-drag flow is fine.

---

## Files in use

| Purpose | File key | URL | Notes |
|---|---|---|---|
| App v1 user flow (Stage 1) | `bsT5waEFwTkrjZVDjjonCs` | https://www.figma.com/board/bsT5waEFwTkrjZVDjjonCs | First FigJam, 28 May 2026. Source of truth for the user flow until Stage 2 prototype begins. |

Add new entries as files are created.

---

## Conventions

- **Source of truth:** the markdown spec (`context/pillar/app.md`) is canonical. Figma files visualise the spec; the spec is not edited to match Figma. When chat and Figma diverge, chat wins until reconciled.
- **Diagram updates:** when the spec changes, the FigJam is updated to match via `use_figma` or by regenerating with `generate_diagram` (overwriting the existing file by passing `fileKey`).
- **Reading from Figma:** use `get_figjam` for board files (URL `/board/...`) and `get_design_context` or `get_metadata` for design files (URL `/design/...`).
- **No emojis in diagram text** (Mermaid syntax does not handle them cleanly in the `generate_diagram` tool).
- **No `\n` in mermaid syntax**; use multi-line strings carefully.

---

## Skills to load

When calling Figma write tools, the Figma MCP server expects relevant skills to be loaded first:

- Before `use_figma`: load `/figma-use` skill.
- Before `create_new_file`: load `/figma-create-new-file` skill.
- For design-to-code work (translating Figma to React): load `/figma-implement-design`.
- For code-to-design work (capturing app pages into Figma): load `/figma-generate-design`.

`generate_diagram` does not require a skill load.

---

*Confidential. Auwa Limited. All rights reserved.*
