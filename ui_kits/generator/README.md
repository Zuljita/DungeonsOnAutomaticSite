# UI Kit — DOA Generator Workspace

A high-fidelity, interactive recreation of the redesigned **Dungeons on Automatic**
generator — the tool's primary (and essentially only) screen. It composes the
design-system primitives; it does not re-implement them.

Open `index.html`.

## What it demonstrates
- **App bar** — brand lockup, seed field, the primary **Generate Map** action
  (ember), New Seed, live Rooms/Peril stats, Export.
- **Control rail** (left) — generation parameters grouped into `Panel`s: Layout,
  Threat, and a Source Books filter with checkboxes. Real `Field` / `Select` /
  `NumberStepper` / `Checkbox` controls.
- **Map stage** (center) — a parchment GM map drawn in SVG: hatched-rock walls,
  floored rooms with ink outlines and numbered badges, corridors, doors (incl.
  secret "S" doors), and the fixed marker glyphs (encounter / treasure / trap /
  key). Toggle **Ink style**, **Grid**, and **Biomes** underlay; click a room to
  select it.
- **Info column** (right) — `Selection` (the inspected room: area, peril, biome,
  tags, lock/reroll), the map `Key` legend, and a scrollable `Rooms & Contents`
  list.
- **Stage Manager** — clicking Generate plays a sequence of in-character
  `DirectorToast`s (Zarlzazz → Vorga → Mizzik → Kovath) bottom-right while the map
  "collapses the wave function."

## Files
- `index.html` — loads `styles.css`, the DS bundle, then the JSX modules; mounts `App`.
- `App.jsx` — state + composition. `AppBar.jsx`, `ControlRail.jsx`, `InfoPanels.jsx`,
  `StageManager.jsx` — surfaces. `MapCanvas.jsx` — the SVG map. `Icon.jsx` —
  React-safe Lucide wrapper. `mapData.js` — the sample dungeon. `kit.css` — layout only.

## Recreation notes
This mirrors the real DOA controls (seed, size, biomes, party CER, challenge, door
security, room layout/size, corridors, dead ends, generosity, source books) and its
GM-map output. The dungeon geometry is a hand-authored sample, drawn schematically —
the same vocabulary the engine renders to canvas, not a generated layout. Where the
real app has features not reproduced here (VTT exports, the LLM narrative pipeline,
intent editor), they are intentionally omitted rather than mocked.
