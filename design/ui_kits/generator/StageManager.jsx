/* StageManager — the bottom-right director toast stack. Each director
   comments, in character, on generation events. */
window.DOA_DIRECTORS = {
  Kovath:   { name: 'KOVATH',   role: 'Creative Director',   portrait: '../../assets/portraits/Kovath.png' },
  Zarlzazz: { name: 'ZARLZAZZ', role: 'Narrative Director',  portrait: '../../assets/portraits/Zarlzazz.png' },
  Vorga:    { name: 'VORGA',    role: 'Encounter Director',   portrait: '../../assets/portraits/Vorga.png' },
  Mizzik:   { name: 'MIZZIK',   role: 'Furniture & Loot',     portrait: '../../assets/portraits/Mizzik.png' },
};

window.DOA_LINES = [
  { dir: 'Zarlzazz', tone: 'brass', line: 'Twelve rooms partitioned. The gatehouse has already collapsed. On schedule.' },
  { dir: 'Vorga',    tone: 'brass', line: 'Bone Deep gets the undead. The cistern gets something wetter. Approved.' },
  { dir: 'Mizzik',   tone: 'brass', line: 'I weighed the Hoard against party CER 125. It is, regrettably, fair.' },
  { dir: 'Kovath',   tone: 'ember', line: "Room 12 flagged: every path to the exit is a deathtrap. Another fine layout." },
];

function StageManager({ toasts }) {
  const NS = window.DungeonsOnAutomaticDesignSystem_e301a1;
  const { DirectorToast } = NS;
  return (
    <div className="kit-stage">
      {toasts.map((t) => {
        const d = window.DOA_DIRECTORS[t.dir];
        return (
          <DirectorToast key={t.key} portrait={d.portrait} name={d.name} role={d.role} tone={t.tone}>
            {t.line}
          </DirectorToast>
        );
      })}
    </div>
  );
}
window.StageManager = StageManager;
