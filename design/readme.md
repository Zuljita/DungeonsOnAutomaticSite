# Dungeons on Automatic — Design System

A brand & UI design system for **Dungeons on Automatic (DOA)** — a modular,
system-agnostic **procedural dungeon generator** for tabletop RPGs. This system
exists to redesign the DOA frontend so it looks great and feels intuitive,
while preserving the tool's dense, GM-facing power.

> **What DOA does.** It produces coherent, narratively logical dungeons through a
> three-tier pipeline — Binary Space Partitioning for biome allocation, organic
> growth for zones, and Wave Function Collapse for room detail — then dresses
> them with monsters, traps, treasure and doors filtered by the GM's owned source
> books. Output is a GM map, a player-safe map, room keys, and VTT exports
> (Foundry, Universal VTT, PNG, Markdown). The engine is system-agnostic; the
> DFRPG / GURPS module is the reference system.

## Sources used to build this system

- **GitHub — `Zuljita/DungeonsOnAutomatic`** (private): the current TypeScript /
  Vite web app. Brand mark, character portraits and map renderer palette were
  lifted from here. Read `PROJECT.md` for the full architecture, `index.html` +
  `src/style.css` for the existing (utilitarian) UI, and `images/` for assets.
  → https://github.com/Zuljita/DungeonsOnAutomatic
- **Related repos worth exploring** for deeper product/domain context:
  - `Zuljita/DungeonsOnAutomatic-Legacy` — the original modular generator.
    → https://github.com/Zuljita/DungeonsOnAutomatic-Legacy
  - `Syndaryl/DFRPGRandomDungeonGenerator` — the legacy DFRPG generator DOA
    targets for feature parity. → https://github.com/Syndaryl/DFRPGRandomDungeonGenerator
  - `Zuljita/DFRPGArdenVul-Obsidian` — a curated DFRPG dungeon vault.
- **Uploaded assets**: the DOA logo (`DOA Logo.JPG`) and the four "Stage Manager"
  director portraits (`Kovath.png`, `Vorga.png`, `Mizzik.png`, `Zarlzazz.png`).

A reader with access to the repo above can explore it to build richer, more
accurate DOA designs — especially `PROJECT.md` (data model, generation pipeline,
the Stage Manager / narrative-director roster) and the `/systems/dfrpg/` data.

---

## The brand in one breath

**Dark-fantasy bureaucracy.** DOA is a dungeon *workshop* staffed by monsters who
treat dungeon-building as a tedious, deadline-driven office job. The mugs read
*"Another fine layout, doomed to player cleverness."* The reference books on the
shelf are *Dead Ends & Desperation*, *Elegant Torture Through Design*, and *The
Monster's Commute*. The aesthetic marries **forged-iron tool chrome** (the app)
with **ink-on-parchment dungeon cartography** (the output), lit by the logo's
**brick red** and **gear gold**.

### The Stage Manager cast
DOA's narrative-director pipeline is personified as four union-staff monsters who
narrate generation in character. They are signature brand assets — use them.

- **Kovath** (raven) — *Creative Director.* Sets global/region tag pressure, names
  anchors, requests set pieces, triggers scoped rerolls.
- **Zarlzazz** (minotaur) — *Narrative Director.* Shapes the dungeon's overall
  story and coherence — layout intent, set-piece anchoring, the throughline.
- **Vorga** (orc) — *Encounter Director.* Rerolls encounters, balances threat.
- **Mizzik** (goblin) — *Furniture & Loot.* Treasure, containers, room dressing.

---

## CONTENT FUNDAMENTALS — how DOA writes

The voice is **dry, deadpan, gallows-humor bureaucracy**. It treats lethal dungeon
design as mundane clerical work, and that contrast is the whole joke. Copy is
confident and terse; it never winks too hard or explains the bit.

- **Tone:** wry, world-weary, professional-but-murderous. A barracks isn't
  "spooky" — it has *"a duty roster nobody has updated in an age."* A fair treasure
  hoard is *"regrettably, fair."*
- **Person & address:** speak to the GM as a competent peer — *"you,"* imperative
  for actions (*"Generate Map," "Lock room," "Reroll encounters"*). The directors
  speak in first person, in character (*"I weighed the Hoard. It is, regrettably,
  fair."*). The app chrome itself stays plain and instrumental.
- **Casing:** Cinzel headings and the wordmark are **UPPERCASE** (carved-stone).
  Eyebrows/overlines are uppercase small-caps. Body and labels are sentence case.
  Buttons are Title Case (*"Generate Map," "Export Profile"*).
- **Mechanical labels stay literal.** Generator controls are plain and unfunny —
  *Size, Biomes, Party CER, Challenge, Door security, Dead ends, Generosity.* The
  humor lives in the directors and flavor text, never in a field label or an error
  the GM needs to act on.
- **Status/errors are deadpan, not cute when it matters.** A real failure reads
  *"Seed rejected — every path to the exit is a deathtrap"* — informative first,
  dry second. Never block comprehension for a punchline.
- **No emoji.** Ever. The cast portraits and map glyphs carry personality; emoji
  would undercut the painted, old-world register.
- **Numbers & jargon are a feature.** Seeds (`8F1A-7C2D`), CER, peril `6/10`, sq-ft,
  bracketed tags (`[military]`, `[ancient:3]`) — this audience (GMs) wants the data.
  Surface it in mono; don't hide it.

**Vocabulary:** dungeon, room, corridor, biome, zone, set piece, encounter, peril,
hazard, treasure, key, secret/illusory, door security, dead ends, party CER, seed,
source book, lock, reroll, polish, GM map / player map.

---

## VISUAL FOUNDATIONS

Two worlds, one system. **Chrome** = the tool (forged iron & stone, dark). **Document**
= the output (ink on parchment, light). Tokens model both.

- **Color.** Brand is **Ember** brick-red (`--ember-500 #d30000`, straight from the
  logo arch) and **Brass** gear-gold (`--brass-300 #ffd800`, the cogs). Chrome is a
  warm-tinted dark **Stone** scale (`#100f12 → #efedf3`). The document surface is the
  **Parchment** scale with **Ink** text, taken directly from the map renderer
  (`floor #fff7df`, `wall #eadbb7`, `ink #1b1b1b`). Map markers are a fixed semantic
  set — encounter `#dc2626`, treasure `#fbbf24`, hazard `#facc15` on `#111827`, key
  `#f59e0b`, door `#22d3ee`, secret `#a855f7` — never repurposed for chrome.
- **Type.** Three families. **Cinzel** (carved-stone caps) for the wordmark, section
  heads and big numbers — always uppercase with `0.06em` tracking. **Spectral** (a
  screen-tuned editorial serif) for body, room keys and UI copy, italic for emphasis.
  **IBM Plex Mono** for the "automatic" machine voice — seeds, coordinates, tags,
  data, exports. Scale is a 1.250 major-third on a 16px base; UI text never below
  ~13px, map/slide text never below the readable floor.
  *(Font substitution note below.)*
- **Backgrounds.** Chrome uses flat dark stone with subtle vertical gradients on bars
  and panel headers (a glint of torchlight), never busy. The map document uses a
  parchment fill with a soft radial vignette and a faint paper grain; walls are a
  45°-hatched rock fill. No photographic backgrounds, no purple gradients.
- **Borders & corners.** Hairline `1px` stone borders everywhere; radii are small and
  architectural (`sm 3px` default, `lg 8px` for panels) — this is iron and stone, not
  a soft consumer app. Pills, dots and toggles go fully round.
- **Cards / panels.** A `Panel` is a dark stone surface, `lg` radius, hairline border,
  `shadow-sm` + a 1px inner top **glint** highlight, and an optional header with a
  brass small-caps eyebrow over a Cinzel title (header has a faint top-down gradient).
- **Elevation & shadows.** Warm-black, low and heavy (`0 6px 16px rgba(0,0,0,.5)`).
  Raised/lit metal carries `--glint-top` (inner top highlight). Pressed controls
  invert to an inset shadow. The parchment document uses a softer brown paper drop.
- **Focus, hover, press.** Focus is always a **2px brass ring** (`--focus-ring`) with a
  dark offset — visible on every interactive element. Hover lightens iron one step
  (`stone-700 → stone-600`) and brightens borders/icon to brass; it does not change
  size. Press nudges `translateY(1px)` and switches to the inset shadow — a physical
  click, never a bounce.
- **Active / selected.** Toggles and active map layers gain a brass border + soft
  `--glow-brass`. The selected room on the map gets an ember stroke plus a dashed
  brass marquee; in the room list it gets an inset ember spine.
- **Transparency & blur.** Reserved for overlays: the director toasts use a
  `rgba(16,15,18,.86)` panel with a 6px backdrop blur (torch-smoke over the map).
  Body chrome stays opaque.
- **Motion.** Deliberate and weighty — *stone doesn't bounce.* Standard ease
  `cubic-bezier(.2,0,.1,1)`, 110–320ms. Toasts slide up + fade in; map view blurs
  and dims while "Collapsing wave function…". No infinite decorative loops. Honor
  `prefers-reduced-motion`.
- **Imagery vibe.** The character portraits are painted, desaturated, cool-gray
  studio backdrops with warm brass/skin accents — a consistent "Renaissance guild
  portrait" register. Keep any added imagery in that key; never bright or glossy.
- **Layout rules.** The workspace is a fixed three-column shell: control **rail**
  (left, `~320px`, scrolls), **map** stage (center, fills), **info** column (right,
  `~340px`, scrolls), under a `60px` app bar. Director toasts are fixed bottom-right.
  Density is high and tool-like — `gap`-based flex/grid on a 4px grid.

### ⚠ Font substitution — needs your confirmation
The current DOA app uses only the system **monospace** font; it has no defined brand
typefaces. **Cinzel, Spectral and IBM Plex Mono are this system's proposal**, loaded
from Google Fonts (no binaries are bundled, so the design-system compiler reports
"0 fonts"). If DOA has — or wants — specific licensed typefaces, send them and we'll
swap the `@font-face`/`@import` in `tokens/typography.css`.

---

## ICONOGRAPHY

- **The current app ships no icon system** — it uses plain unicode (`−` `+` for zoom,
  `v`/`^` for disclosure) and HTML form controls. The painted portraits and the map's
  drawn markers do the heavy lifting.
- **UI icons (substitution): [Lucide](https://lucide.dev)**, loaded from CDN. Clean
  1.5–2px line icons, `currentColor`, that sit well against the iron chrome:
  `dices` (generate), `shuffle` (new seed), `download` (export), `lock` (lock room),
  `rotate-cw` (reroll), `settings-2`, `map`, `skull`, `gem`, `key-round`, `door-open`,
  chevrons. **Flagged as a substitution** — if DOA prefers another set (or a hand-drawn
  woodcut style to match the portraits), say so. See the *Iconography* card.
- **React-safe usage.** `lucide.createIcons()` mutates the DOM and **conflicts with
  React re-render** (it throws `removeChild` and unmounts the app). In any React
  surface, render icons as **inline SVG** from `lucide.icons[Name]` instead — see
  `ui_kits/generator/Icon.jsx` for the wrapper used throughout the kit. `createIcons()`
  is only safe in static, render-once HTML (the specimen cards).
- **Map markers are NOT icons — they are fixed glyphs** drawn by the renderer and must
  never be restyled: encounter = red dot with halo, treasure = amber diamond, trap =
  yellow-edged black square, key = amber dot, secret door = purple "S" square. Their
  meaning is load-bearing for GMs reading the map.
- **No emoji as iconography.**

---

## Index / manifest

**Foundations**
- `styles.css` — the single entry point consumers link. `@import`s only.
- `tokens/colors.css` · `typography.css` · `spacing.css` · `effects.css` — all tokens.
- `components/components.css` — component class styling (interaction states).
- `foundations/*.html` — specimen cards (Colors, Type, Spacing, Effects, Brand) shown
  in the Design System tab.

**Components** (`window.<Namespace>.<Name>` — run `check_design_system` for the namespace)
- core: `Button`, `IconButton`, `Badge`, `Tag`, `StatPill`, `Panel`
- forms: `Field`, `TextInput`, `Select`, `NumberStepper`, `Checkbox`, `Switch`
- feedback: `DirectorToast` (signature), `LegendItem`

**UI kit**
- `ui_kits/generator/` — the redesigned DOA generator workspace (`index.html`),
  an interactive recreation: configure parameters, Generate (watch the Stage Manager
  narrate), inspect/select rooms, toggle Ink/Grid/Biomes. See its `README.md`.

**Assets**
- `assets/brand/` — logo (SVG/PNG), favicons. `assets/portraits/` — the four directors.

**Other**
- `SKILL.md` — Agent-Skill manifest for using this system in Claude Code.
