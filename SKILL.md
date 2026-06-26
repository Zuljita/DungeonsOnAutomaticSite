---
name: doa-design
description: Use this skill to generate well-branded interfaces and assets for Dungeons on Automatic (DOA), the procedural dungeon generator, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets
out and create static HTML files for the user to view. If working on production code,
you can copy assets and read the rules here to become an expert in designing with this
brand.

If the user invokes this skill without any other guidance, ask them what they want to
build or design, ask some questions, and act as an expert designer who outputs HTML
artifacts _or_ production code, depending on the need.

## Quick orientation
- **Brand:** dark-fantasy bureaucracy — a dungeon *workshop* run by monster staff.
  Forged-iron tool chrome + ink-on-parchment cartography, lit by brick-red Ember and
  gear-gold Brass. Voice is dry, deadpan, gallows-humor; no emoji.
- **Tokens:** link `styles.css`. Colors in `tokens/colors.css` (Ember/Brass/Stone/
  Parchment + fixed map-key colors), type in `tokens/typography.css` (Cinzel display,
  Spectral body, IBM Plex Mono data), spacing/effects alongside.
- **Components:** React primitives under `components/` — `Button`, `IconButton`,
  `Badge`, `Tag`, `StatPill`, `Panel`, `Field`, `TextInput`, `Select`, `NumberStepper`,
  `Checkbox`, `Switch`, `DirectorToast`, `LegendItem`. Each has a `.prompt.md`.
- **UI kit:** `ui_kits/generator/` — the full generator workspace to copy/recreate from.
- **Signature asset:** the four Stage Manager directors in `assets/portraits/`
  (Kovath, Zarlzazz, Vorga, Mizzik) — use them in `DirectorToast`.

## Gotchas
- Render Lucide icons as **inline SVG** in React (see `ui_kits/generator/Icon.jsx`);
  never call `lucide.createIcons()` inside a React app — it crashes on re-render.
- SVG presentation attributes (`fill`, `stroke`) don't resolve CSS `var()` — inline the
  literal hex from `tokens/colors.css` when drawing maps in SVG.
- Map-marker glyphs are fixed meanings — don't restyle them.
- Fonts are a proposal (Google Fonts); confirm with the user before shipping production.
