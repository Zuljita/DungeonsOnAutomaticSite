/* Dungeons on Automatic — sample dungeon for the UI kit map view.
   Coordinates are in 1-cell units on a 46×30 grid. Rooms are floored
   rectangles; corridors are thin floored runs; markers sit on cells.
   This mirrors the engine's GM map output (rooms, corridors, doors,
   encounters, treasure, traps, keys) — drawn schematically, not generated. */
window.DOA_MAP = {
  cols: 46,
  rows: 30,
  rooms: [
    { id: 'R1',  n: 1,  x: 3,  y: 3,  w: 7, h: 5, name: 'Collapsed Gatehouse', type: 'Entry', biome: 'worked_stone', tags: ['ancient','guarded'], area: 350, peril: 2 },
    { id: 'R2',  n: 2,  x: 14, y: 2,  w: 6, h: 4, name: 'Guard Barracks', type: 'Barracks', biome: 'worked_stone', tags: ['military','organized','sapient'], area: 240, peril: 5 },
    { id: 'R3',  n: 3,  x: 24, y: 3,  w: 5, h: 5, name: 'Duty Roster Hall', type: 'Hall', biome: 'worked_stone', tags: ['military'], area: 250, peril: 3 },
    { id: 'R4',  n: 4,  x: 34, y: 2,  w: 8, h: 6, name: 'Quartermaster Vault', type: 'Vault', biome: 'worked_stone', tags: ['guarded','treasure'], area: 480, peril: 6 },
    { id: 'R5',  n: 5,  x: 4,  y: 12, w: 6, h: 6, name: 'Flooded Cistern', type: 'Cavern', biome: 'flooded', tags: ['wet','natural','dangerous'], area: 360, peril: 7 },
    { id: 'R6',  n: 6,  x: 14, y: 11, w: 7, h: 7, name: 'Mess of Bones', type: 'Cavern', biome: 'bone_deep', tags: ['undead','decayed'], area: 490, peril: 8 },
    { id: 'R7',  n: 7,  x: 25, y: 13, w: 5, h: 4, name: 'Trapped Antechamber', type: 'Chamber', biome: 'worked_stone', tags: ['trapped','guarded'], area: 200, peril: 6 },
    { id: 'R8',  n: 8,  x: 34, y: 12, w: 8, h: 7, name: 'The Hoard', type: 'Treasury', biome: 'worked_stone', tags: ['treasure','sealed','guarded'], area: 560, peril: 9 },
    { id: 'R9',  n: 9,  x: 6,  y: 23, w: 6, h: 5, name: 'Mushroom Grove', type: 'Cavern', biome: 'fungal', tags: ['natural','wet'], area: 300, peril: 4 },
    { id: 'R10', n: 10, x: 16, y: 23, w: 5, h: 5, name: 'Silent Shrine', type: 'Shrine', biome: 'worked_stone', tags: ['sacred','sealed'], area: 250, peril: 3 },
    { id: 'R11', n: 11, x: 25, y: 22, w: 6, h: 6, name: 'Sunken Library', type: 'Library', biome: 'flooded', tags: ['arcane','wet','sealed'], area: 360, peril: 7 },
    { id: 'R12', n: 12, x: 35, y: 23, w: 7, h: 5, name: "Architect's Folly", type: 'Set piece', biome: 'worked_stone', tags: ['arcane','dangerous'], area: 350, peril: 10 },
  ],
  corridors: [
    { x: 10, y: 5, w: 4, h: 2 }, { x: 20, y: 3, w: 4, h: 2 }, { x: 29, y: 4, w: 5, h: 2 },
    { x: 6,  y: 8, w: 2, h: 4 }, { x: 16, y: 6, w: 2, h: 5 }, { x: 27, y: 8, w: 2, h: 5 },
    { x: 37, y: 8, w: 2, h: 4 }, { x: 10, y: 14, w: 4, h: 2 }, { x: 21, y: 14, w: 4, h: 2 },
    { x: 30, y: 14, w: 4, h: 2 }, { x: 8, y: 18, w: 2, h: 5 }, { x: 18, y: 18, w: 2, h: 5 },
    { x: 27, y: 17, w: 2, h: 5 }, { x: 38, y: 19, w: 2, h: 4 }, { x: 12, y: 25, w: 4, h: 2 },
    { x: 21, y: 25, w: 4, h: 2 }, { x: 31, y: 25, w: 4, h: 2 },
  ],
  doors: [
    { x: 10, y: 5 }, { x: 13, y: 5 }, { x: 20, y: 3 }, { x: 23, y: 4 }, { x: 29, y: 5 },
    { x: 16, y: 10 }, { x: 27, y: 12 }, { x: 37, y: 11 }, { x: 6, y: 17 }, { x: 18, y: 22 },
    { x: 27, y: 21 }, { x: 38, y: 22 }, { x: 33, y: 14, secret: true }, { x: 24, y: 14, secret: true },
  ],
  markers: [
    { kind: 'encounter', x: 16, y: 13, room: 'R2' },
    { kind: 'encounter', x: 17, y: 14, room: 'R6' },
    { kind: 'encounter', x: 7,  y: 14, room: 'R5' },
    { kind: 'encounter', x: 37, y: 15, room: 'R8' },
    { kind: 'encounter', x: 38, y: 25, room: 'R12' },
    { kind: 'treasure',  x: 37, y: 4,  room: 'R4' },
    { kind: 'treasure',  x: 39, y: 15, room: 'R8' },
    { kind: 'treasure',  x: 28, y: 24, room: 'R11' },
    { kind: 'hazard',    x: 26, y: 14, room: 'R7' },
    { kind: 'hazard',    x: 36, y: 25, room: 'R12' },
    { kind: 'key',       x: 18, y: 25, room: 'R10' },
    { kind: 'key',       x: 36, y: 13, room: 'R8' },
  ],
};
