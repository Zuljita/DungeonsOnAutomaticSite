/* MapCanvas — the parchment GM map. Schematic SVG recreation of the
   engine's rendered dungeon (rooms, corridors, doors, markers).
   NOTE: SVG presentation attributes can't resolve CSS var() — token
   values are inlined here as the literal hex from /tokens/colors.css. */
const INK = '#1b1b1b', INK_LINE = '#3a3326', FLOOR = '#fff7df', WALL = '#eadbb7';
const EMBER = '#d30000', BRASS = '#ffd800';
const KEY = {
  encounter: '#dc2626', treasure: '#c79a16', hazard: '#facc15',
  hazardBg: '#111827', key: '#e07a00', secret: '#7e22ce',
};
const BIOME_TINT = {
  worked_stone: '#f3e7c8', flooded: '#dfe8e6', bone_deep: '#efe6cf', fungal: '#e2e8cf',
};
const MONO = "'IBM Plex Mono', ui-monospace, monospace";

function MapCanvas({ inkStyle = true, showGrid = true, showBiomes = false, selected, onSelect }) {
  const M = window.DOA_MAP;
  const CELL = 17;
  const W = M.cols * CELL, H = M.rows * CELL;
  const px = (n) => n * CELL;

  return (
    <div className="doa-map" style={{ width: '100%', height: '100%' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
        <defs>
          <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="6" height="6" fill={WALL} />
            <line x1="0" y1="0" x2="0" y2="6" stroke={INK_LINE} strokeWidth="1.1" opacity="0.5" />
          </pattern>
          <radialGradient id="encGlow">
            <stop offset="0%" stopColor="#fff7ed" /><stop offset="100%" stopColor="#fff7ed" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Wall body (hatched rock fills everything) */}
        <rect x="0" y="0" width={W} height={H} fill="url(#hatch)" />

        {/* Corridors — floor runs */}
        {M.corridors.map((c, i) => (
          <rect key={'c' + i} x={px(c.x)} y={px(c.y)} width={px(c.w)} height={px(c.h)}
                fill={FLOOR} stroke={INK} strokeWidth="1.5" />
        ))}

        {/* Rooms */}
        {M.rooms.map((r) => {
          const isSel = selected === r.id;
          const fill = showBiomes ? (BIOME_TINT[r.biome] || FLOOR) : FLOOR;
          return (
            <g key={r.id} onClick={() => onSelect && onSelect(r.id)} style={{ cursor: 'pointer' }}>
              <rect x={px(r.x)} y={px(r.y)} width={px(r.w)} height={px(r.h)}
                    fill={fill} stroke={isSel ? EMBER : INK} strokeWidth={isSel ? 3 : 1.8} />
              {isSel && (
                <rect x={px(r.x) - 2} y={px(r.y) - 2} width={px(r.w) + 4} height={px(r.h) + 4}
                      fill="none" stroke={INK} strokeWidth="1.3" strokeDasharray="4 3" opacity="0.85" />
              )}
              <circle cx={px(r.x) + 11} cy={px(r.y) + 11} r="9" fill={INK} />
              <text x={px(r.x) + 11} y={px(r.y) + 14.5} textAnchor="middle" fontFamily={MONO} fontSize="11" fontWeight="600" fill={FLOOR}>{r.n}</text>
            </g>
          );
        })}

        {/* Doors */}
        {M.doors.map((d, i) => (
          d.secret
            ? <g key={'d' + i}>
                <rect x={px(d.x) + 4} y={px(d.y) + 4} width="9" height="9" fill={WALL} stroke={KEY.secret} strokeWidth="1.5" />
                <text x={px(d.x) + 8.5} y={px(d.y) + 11.5} textAnchor="middle" fontFamily={MONO} fontSize="8" fontWeight="700" fill={KEY.secret}>S</text>
              </g>
            : <rect key={'d' + i} x={px(d.x) + 3} y={px(d.y) + 5} width="11" height="7" rx="1" fill={FLOOR} stroke={INK} strokeWidth="1.5" />
        ))}

        {/* Markers */}
        {M.markers.map((m, i) => {
          const cx = px(m.x) + CELL / 2, cy = px(m.y) + CELL / 2;
          if (m.kind === 'encounter') return (
            <g key={'m' + i}>
              <circle cx={cx} cy={cy} r="11" fill="url(#encGlow)" opacity="0.5" />
              <circle cx={cx} cy={cy} r="5.5" fill={KEY.encounter} stroke="#fff7ed" strokeWidth="1.5" />
            </g>
          );
          if (m.kind === 'treasure') return (
            <rect key={'m' + i} x={cx - 5.5} y={cy - 5.5} width="11" height="11" transform={`rotate(45 ${cx} ${cy})`} fill={KEY.treasure} stroke={INK} strokeWidth="1.6" />
          );
          if (m.kind === 'hazard') return (
            <rect key={'m' + i} x={cx - 5.5} y={cy - 5.5} width="11" height="11" fill={KEY.hazardBg} stroke={KEY.hazard} strokeWidth="1.6" />
          );
          if (m.kind === 'key') return (
            <circle key={'m' + i} cx={cx} cy={cy} r="5" fill={KEY.key} stroke={INK} strokeWidth="1.6" />
          );
          return null;
        })}

        {/* Grid overlay (square, on top) */}
        {showGrid && (
          <g opacity={inkStyle ? 0.16 : 0.28}>
            {Array.from({ length: M.cols + 1 }).map((_, i) => (
              <line key={'gx' + i} x1={px(i)} y1="0" x2={px(i)} y2={H} stroke={INK_LINE} strokeWidth="0.5" />
            ))}
            {Array.from({ length: M.rows + 1 }).map((_, i) => (
              <line key={'gy' + i} x1="0" y1={px(i)} x2={W} y2={px(i)} stroke={INK_LINE} strokeWidth="0.5" />
            ))}
          </g>
        )}
      </svg>
    </div>
  );
}
window.MapCanvas = MapCanvas;
