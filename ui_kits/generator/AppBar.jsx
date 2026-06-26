/* AppBar — top chrome: brand lockup, seed, primary generate action,
   map-layer toggles, exports. */
function AppBar(props) {
  const NS = window.DungeonsOnAutomaticDesignSystem_e301a1;
  const { Button, IconButton, StatPill } = NS;
  const { seed, onSeed, onGenerate, onNewSeed, busy, rooms, peril } = props;
  const Ic = window.Ic;

  return (
    <header className="kit-appbar">
      <div className="kit-brand">
        <img src="../../assets/brand/doa_logo_transparent.svg" alt="" className="kit-brand__mark" />
        <div className="kit-brand__wm">
          <span className="kit-brand__t">Dungeons on Automatic</span>
          <span className="kit-brand__s">Procedural Dungeon Generator</span>
        </div>
      </div>

      <div className="kit-seed">
        <label className="kit-seed__lbl">Seed</label>
        <input className="doa-input kit-seed__input" value={seed} onChange={(e) => onSeed(e.target.value)} />
        <IconButton aria-label="New seed" onClick={onNewSeed}><Ic n="shuffle" /></IconButton>
        <Button variant="primary" leadingIcon={<Ic n="dices" />} onClick={onGenerate} disabled={busy}>
          {busy ? 'Generating…' : 'Generate Map'}
        </Button>
      </div>

      <div className="kit-appbar__stats">
        <StatPill label="Rooms" value={rooms} />
        <StatPill label="Peril" value={peril + ' / 10'} plain />
      </div>

      <div className="kit-appbar__actions">
        <Button variant="outline" size="sm" leadingIcon={<Ic n="download" />}>Export</Button>
        <IconButton variant="ghost" aria-label="Settings"><Ic n="settings-2" /></IconButton>
      </div>
    </header>
  );
}
window.AppBar = AppBar;
