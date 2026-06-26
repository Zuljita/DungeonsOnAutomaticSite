/* App — composes the DOA generator workspace and holds interaction state. */
function App() {
  const M = window.DOA_MAP;
  const [seed, setSeed] = React.useState('8F1A-7C2D');
  const [params, setParams] = React.useState({
    size: 'standard', biomes: 4, rooms: 'scattered', roomSize: 'medium',
    corridors: 'organized', deadEnds: 'most', cer: 125, challenge: 'average',
    doors: 'standard', treasure: 'onehundred',
  });
  const [books, setBooks] = React.useState([
    { id: 'exploits', name: 'DF: Exploits', count: 212, on: true },
    { id: 'monsters', name: 'DF: Monsters', count: 340, on: true },
    { id: 'companion3', name: 'DF: Companion 3', count: 96, on: true },
    { id: 'dungeons', name: 'DF: Dungeons', count: 154, on: true },
    { id: 'sorcery', name: 'DFRPG: Sorcery', count: 78, on: false },
  ]);
  const [view, setView] = React.useState({ inkStyle: true, showGrid: true, showBiomes: false });
  const [selected, setSelected] = React.useState('R8');
  const [busy, setBusy] = React.useState(false);
  const [toasts, setToasts] = React.useState([
    { key: 0, dir: 'Kovath', tone: 'brass', line: 'Workshop ready. Twelve rooms on the slab. Try not to make them livable.' },
  ]);
  const timers = React.useRef([]);

  const setParam = (k, v) => setParams((p) => ({ ...p, [k]: v }));
  const toggleBook = (id) => setBooks((bs) => bs.map((b) => b.id === id ? { ...b, on: !b.on } : b));
  const setV = (k, v) => setView((s) => ({ ...s, [k]: v }));

  const newSeed = () => {
    const hex = () => Math.floor(Math.random() * 65536).toString(16).toUpperCase().padStart(4, '0');
    setSeed(hex() + '-' + hex());
  };

  const generate = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setBusy(true);
    setToasts([]);
    window.DOA_LINES.forEach((l, i) => {
      const t = setTimeout(() => {
        setToasts((prev) => [...prev.slice(-3), { ...l, key: Date.now() + i }]);
      }, 500 + i * 850);
      timers.current.push(t);
    });
    const done = setTimeout(() => setBusy(false), 500 + window.DOA_LINES.length * 850);
    timers.current.push(done);
  };

  React.useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const selRoom = M.rooms.find((r) => r.id === selected) || null;
  const peril = Math.max(...M.rooms.map((r) => r.peril));

  return (
    <div className="kit-app">
      <AppBar seed={seed} onSeed={setSeed} onGenerate={generate} onNewSeed={newSeed}
        busy={busy} rooms={M.rooms.length} peril={peril} />

      <div className="kit-body">
        <ControlRail params={params} setParam={setParam} books={books} toggleBook={toggleBook} />

        <main className="kit-stagearea">
          <div className="kit-maphead">
            <MapToolbar {...view} set={setV} />
            <div className="kit-zoom">
              <span className="kit-zoom__r">100%</span>
              <div className="kit-zoom__btns">
                <button aria-label="Zoom out">−</button>
                <button aria-label="Zoom in">+</button>
                <button className="kit-zoom__fit">Fit</button>
              </div>
            </div>
          </div>
          <div className={'kit-mapview' + (busy ? ' is-busy' : '')}>
            <MapCanvas inkStyle={view.inkStyle} showGrid={view.showGrid} showBiomes={view.showBiomes}
              selected={selected} onSelect={setSelected} />
            {busy && <div className="kit-mapview__veil"><span>Collapsing wave function…</span></div>}
          </div>
        </main>

        <aside className="kit-info">
          <SelectionPanel room={selRoom} />
          <KeyPanel />
          <RoomList rooms={M.rooms} selected={selected} onSelect={setSelected} />
        </aside>
      </div>

      <StageManager toasts={toasts} />
    </div>
  );
}
window.App = App;
