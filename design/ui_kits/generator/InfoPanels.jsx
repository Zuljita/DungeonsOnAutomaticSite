/* InfoPanels — the right column: map Key, current Selection, and the
   Rooms & Contents list. */
function MapToolbar({ inkStyle, showGrid, showBiomes, set }) {
  const NS = window.DungeonsOnAutomaticDesignSystem_e301a1;
  const { Switch } = NS;
  return (
    <div className="kit-maptoolbar">
      <Switch checked={inkStyle} onChange={(v) => set('inkStyle', v)} label="Ink style" />
      <Switch checked={showGrid} onChange={(v) => set('showGrid', v)} label="Grid" />
      <Switch checked={showBiomes} onChange={(v) => set('showBiomes', v)} label="Biomes" />
    </div>
  );
}
window.MapToolbar = MapToolbar;

function KeyPanel() {
  const NS = window.DungeonsOnAutomaticDesignSystem_e301a1;
  const { Panel, LegendItem } = NS;
  return (
    <Panel eyebrow="Reference" title="Key">
      <div className="kit-legend">
        <LegendItem color="var(--key-encounter)" shape="dot" label="Monster encounter" />
        <LegendItem color="var(--key-treasure)" shape="diamond" label="Treasure" />
        <LegendItem color="var(--key-hazard-bg)" label="Trap / hazard" />
        <LegendItem color="var(--key-key)" shape="dot" label="Quest key" />
        <LegendItem color="var(--doc-floor)" label="Floor" />
        <LegendItem color="var(--doc-wall)" label="Hatched wall" />
      </div>
    </Panel>
  );
}
window.KeyPanel = KeyPanel;

function SelectionPanel({ room }) {
  const NS = window.DungeonsOnAutomaticDesignSystem_e301a1;
  const { Panel, Tag, Badge, Button, StatPill } = NS;
  const Ic = window.Ic;
  if (!room) {
    return <Panel eyebrow="Inspect" title="Selection"><p className="kit-empty">Select a room on the map to inspect its contents.</p></Panel>;
  }
  return (
    <Panel eyebrow="Inspect" title="Selection"
      actions={<Badge tone="neutral">{room.type}</Badge>}>
      <div className="kit-sel">
        <div className="kit-sel__name"><span className="kit-sel__num">{room.n}</span>{room.name}</div>
        <div className="kit-sel__stats">
          <StatPill label="Area" value={room.area + ' ft²'} plain />
          <StatPill label="Peril" value={room.peril + '/10'} />
          <StatPill label="Biome" value={room.biome.replace('_', ' ')} plain />
        </div>
        <div className="kit-sel__tags">
          {room.tags.map((t) => <Tag key={t}>{t}</Tag>)}
        </div>
        <div className="kit-sel__btns">
          <Button variant="outline" size="sm" leadingIcon={<Ic n="lock" />}>Lock room</Button>
          <Button variant="ghost" size="sm" leadingIcon={<Ic n="rotate-cw" />}>Reroll</Button>
        </div>
      </div>
    </Panel>
  );
}
window.SelectionPanel = SelectionPanel;

function RoomList({ rooms, selected, onSelect }) {
  const NS = window.DungeonsOnAutomaticDesignSystem_e301a1;
  const { Panel, Badge } = NS;
  const toneFor = (r) => r.tags.includes('treasure') ? 'treasure' : r.peril >= 8 ? 'danger' : r.tags.includes('sacred') ? 'secret' : 'neutral';
  return (
    <Panel eyebrow="Dungeon" title="Rooms & Contents" flush>
      <div className="kit-roomlist">
        {rooms.map((r) => (
          <button key={r.id} className={'kit-room' + (selected === r.id ? ' is-sel' : '')} onClick={() => onSelect(r.id)}>
            <span className="kit-room__num">{r.n}</span>
            <span className="kit-room__name">{r.name}</span>
            <Badge tone={toneFor(r)}>{r.peril}</Badge>
          </button>
        ))}
      </div>
    </Panel>
  );
}
window.RoomList = RoomList;
