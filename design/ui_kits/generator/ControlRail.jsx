/* ControlRail — the left generation-parameter rail, grouped into panels. */
function ControlRail(props) {
  const NS = window.DungeonsOnAutomaticDesignSystem_e301a1;
  const { Panel, Field, Select, NumberStepper, Checkbox } = NS;
  const { params, setParam, books, toggleBook } = props;

  const sel = (key, opts) => (
    <Field label={opts.label}>
      <Select value={params[key]} onChange={(e) => setParam(key, e.target.value)}>
        {opts.items.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </Select>
    </Field>
  );

  return (
    <aside className="kit-rail">
      <Panel eyebrow="Configure" title="Layout">
        <div className="kit-grid2">
          {sel('size', { label: 'Size', items: [['compact','Compact'],['standard','Standard'],['large','Large']] })}
          <Field label="Biomes">
            <NumberStepper value={params.biomes} onChange={(v) => setParam('biomes', v)} min={2} max={8} />
          </Field>
          {sel('rooms', { label: 'Rooms', items: [['sparse','Sparse'],['scattered','Scattered'],['tight','Tight'],['dense','Dense']] })}
          {sel('roomSize', { label: 'Room size', items: [['small','Small'],['medium','Medium'],['large','Large'],['huge','Huge']] })}
          {sel('corridors', { label: 'Corridors', items: [['labyrinth','Labyrinthian'],['wandering','Wandering'],['organized','Organized'],['straight','Straight']] })}
          {sel('deadEnds', { label: 'Dead ends', items: [['none','None'],['few','Few'],['some','Some'],['most','Most']] })}
        </div>
      </Panel>

      <Panel eyebrow="Configure" title="Threat">
        <div className="kit-grid2">
          <Field label="Party CER">
            <input className="doa-input" type="number" value={params.cer} onChange={(e) => setParam('cer', e.target.value)} />
          </Field>
          {sel('challenge', { label: 'Challenge', items: [['cakewalk','Cakewalk'],['easy','Easy'],['average','Average'],['hard','Hard'],['evil','Evil']] })}
          {sel('doors', { label: 'Doors', items: [['none','None'],['basic','Basic'],['standard','Standard'],['secure','Secure'],['deathtrap','Deathtrap']] })}
          {sel('treasure', { label: 'Generosity', items: [['fifty','50%'],['onehundred','100%'],['twohundred','200%'],['fourhundred','400%']] })}
        </div>
      </Panel>

      <Panel eyebrow="Filter" title="Source Books"
        actions={<span className="kit-rail__count">{books.filter((b) => b.on).length}/{books.length}</span>}>
        <div className="kit-books">
          {books.map((b) => (
            <Checkbox key={b.id} checked={b.on} onChange={() => toggleBook(b.id)}
              label={<span>{b.name} <span className="kit-books__c">{b.count}</span></span>} />
          ))}
        </div>
      </Panel>
    </aside>
  );
}
window.ControlRail = ControlRail;
