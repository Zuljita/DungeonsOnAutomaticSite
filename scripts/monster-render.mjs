// Render one standalone page per monster.
//
// The bestiary at monsters.html builds the same sheet client side, inside a
// dialog. These pages exist because a dialog cannot be shared, unfurled, or
// indexed: a crawler does not run the script that would fill it in. The sheet
// markup here and the DOM the page builds are deliberately the same shape, and
// both pull their styling from monster.css so they cannot drift apart visually.
import { SITE_NAME, SITE_URL, absoluteUrl, escapeHtml } from './blog-render.mjs';

const EM_DASH = '—';

/** Source-neutral slug. The record id carries its source package
 *  ("enraged_eggplant_aboleth"); a public URL should not, because the library
 *  is ours and the source is one of several to come. Provenance stays in the
 *  JSON, where it belongs. */
export const monsterSlug = (monster) =>
  String(monster?.name ?? '')
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const monsterPath = (slug) => `monsters/${slug}/`;

/** Tags that describe the package rather than the creature. */
const HIDDEN_TAGS = new Set(['fan-authorized', 'enraged-eggplant']);
export const monsterTags = (monster) =>
  [...new Set([...(monster.tags || []), ...(monster.classTags || [])])]
    .filter((tag) => !HIDDEN_TAGS.has(tag));

const text = (value) => (value === null || value === undefined ? '' : String(value));
const dash = (value) => (value === null || value === undefined || value === '' ? EM_DASH : value);

const panel = (title, body) =>
  `<section class="panel"><h3>${escapeHtml(title)}</h3><div class="panel-body">${body}</div></section>`;

const attrRow = (label, value) =>
  `<div class="attr-row"><span>${escapeHtml(label)}</span><strong>${escapeHtml(dash(value))}</strong></div>`;

const attrCols = (left, right) =>
  `<div class="attr-cols"><div>${left.map(([l, v]) => attrRow(l, v)).join('')}</div>` +
  `<div>${right.map(([l, v]) => attrRow(l, v)).join('')}</div></div>`;

const ruleList = (items, single) =>
  `<ul class="rule-list${single ? ' single' : ''}">` +
  items
    .map((item) =>
      Array.isArray(item)
        ? `<li><span class="lvl">${escapeHtml(dash(item[1]))}</span>${escapeHtml(item[0])}</li>`
        : `<li>${escapeHtml(item)}</li>`
    )
    .join('') +
  '</ul>';

function attacksPanel(monster) {
  const attacks = (monster.stats?.attacks || []).filter(Boolean);
  if (!attacks.length) return '';
  const rows = attacks
    .map((attack) => {
      const noSkill = attack.skill === null || attack.skill === undefined;
      const level = noSkill ? (attack.autoHit ? 'no roll' : EM_DASH) : attack.skill;
      const usage =
        `<span class="usage">${escapeHtml(attack.name || 'Attack')}</span>` +
        (attack.notes ? `<span class="usage-note">${escapeHtml(attack.notes)}</span>` : '');
      return (
        '<tr>' +
        `<td>${usage}</td>` +
        `<td class="num">${escapeHtml(level)}</td>` +
        `<td>${escapeHtml(dash(attack.damage))}</td>` +
        `<td class="num">${escapeHtml(dash(attack.reach))}</td>` +
        '</tr>'
      );
    })
    .join('');
  return panel(
    'Melee attacks',
    '<table class="wtable"><thead><tr><th>Usage</th><th>Level</th><th>Damage</th><th>Reach</th></tr></thead>' +
      `<tbody>${rows}</tbody></table>`
  );
}

function filesPanel(monster) {
  const files = monster.files || {};
  const links = [
    ['↓ Character sheet (.gcs)', files.gcs?.url, `${monster.id}.gcs`, 'Open directly in GCS'],
    ['↓ Ancestry template (.gct)', files.gct?.url, `${monster.id}.gct`, 'Apply to any character'],
  ].filter(([, url]) => url);
  if (!links.length) return '';
  const items = links
    .map(
      ([label, url, filename, hint]) =>
        `<li><a href="${escapeHtml(url)}" download="${escapeHtml(filename)}">${escapeHtml(label)}` +
        `<small>${escapeHtml(hint)}</small></a></li>`
    )
    .join('');
  return panel('GCS v5 downloads', `<ul class="file-links">${items}</ul>`);
}

function provenancePanel(monster) {
  const provenance = monster.provenance || {};
  const pairs = [
    ['Source record', provenance.sourceName],
    ['Source system', [provenance.sourceSystem, provenance.sourceLicense].filter(Boolean).join(' / ')],
    ['Released under', provenance.contentLicense],
    ['Conversion', provenance.conversionVersion],
    ['Review status', provenance.manualReviewStatus],
    ['Credit', (provenance.credits || []).map((credit) => credit.creditLine).join(' ')],
    // Description prose carries its own authorship and terms, which need not be
    // the record's: the record's licence covers the converted mechanics, the
    // description's covers prose Dungeons on Automatic wrote. Stating only the
    // record's licence here would quietly attribute one to the other.
    ['Description', monster.description
      ? `Written by Dungeons on Automatic, released under ${monster.description.contentLicense}`
      : ''],
  ].filter(([, value]) => value !== undefined && value !== null && value !== '');
  const dl = pairs
    .map(([label, value]) => `<dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd>`)
    .join('');
  const notes = (provenance.conversionNotes || []).filter(Boolean);
  const noteList = notes.length
    ? `<ul class="sheet-notes">${notes.map((note) => `<li>${escapeHtml(note)}</li>`).join('')}</ul>`
    : '';
  return (
    '<details class="panel sheet-prov"><summary>Where this one came from</summary>' +
    `<div class="panel-body"><dl class="sheet-stats">${dl}</dl>${noteList}</div></details>`
  );
}

/** The sheet itself, in the order a GM reads it. */
export function renderSheet(monster) {
  const a = monster.stats?.attributes || {};
  const e = monster.effectiveness || {};
  const n = monster.encounter || {};
  const parts = [];

  const ident = [
    monster.class,
    monster.size?.hexes,
    monster.size?.modifier ? `SM ${monster.size.modifier}` : '',
  ]
    .filter(Boolean)
    .join(' · ');
  const identLine = [ident, monster.pageRef].filter(Boolean).join('\n');
  if (identLine) parts.push(`<p class="sheet-ident">${escapeHtml(identLine)}</p>`);

  // What the creature is, before what its numbers are. The record states this
  // prose's own licence separately from the mechanics beside it, so the page
  // does not have to infer that the two share terms.
  const prose = monsterProse(monster);
  if (prose) parts.push(`<p class="sheet-prose">${escapeHtml(prose)}</p>`);

  parts.push(
    panel(
      'Attributes',
      attrCols(
        [['ST', a.st], ['DX', a.dx], ['IQ', a.iq], ['HT', a.ht]],
        [['HP', a.hp], ['Will', a.will], ['Per', a.per], ['FP', a.fp]]
      ) +
        attrCols(
          [['Basic Speed', a.speed], ['Basic Move', a.move]],
          [['Dodge', a.dodge], ['DR', a.dr]]
        )
    )
  );

  parts.push(attacksPanel(monster));

  const traits = (monster.stats?.traits || []).filter(Boolean);
  if (traits.length) parts.push(panel(`Traits (${traits.length})`, ruleList(traits)));

  const skills = (monster.stats?.skills || []).filter(Boolean);
  if (skills.length) {
    parts.push(panel(`Skills (${skills.length})`, ruleList(skills.map((s) => [s.name, s.level]))));
  }

  const notes = (monster.stats?.notes || []).filter(Boolean);
  if (notes.length) {
    parts.push(
      panel('Notes', `<ul class="sheet-notes">${notes.map((x) => `<li>${escapeHtml(x)}</li>`).join('')}</ul>`)
    );
  }

  parts.push(
    panel(
      'Encounter rating',
      attrCols(
        [['CER', e.combatEffectivenessRating], ['Offense', e.offenseRating], ['Protection', e.protectionRating]],
        [['Threat tier', e.threatTier], ['Appearing', n.averageNumberAppearing], ['Wandering', n.wanderingWeight]]
      )
    )
  );

  const tags = monsterTags(monster);
  if (tags.length) parts.push(panel('Tags', ruleList(tags)));

  parts.push(filesPanel(monster));
  parts.push(provenancePanel(monster));
  return parts.filter(Boolean).join('\n        ');
}

/** The authored prose about the creature, or '' when the record has none.
 *  Records published before the field existed, and any record whose prose is
 *  still unwritten, carry `description: null` rather than omitting the key. */
export function monsterProse(monster) {
  const text = monster.description?.text;
  return typeof text === 'string' && text.trim() ? text.trim() : '';
}

/** One sentence a search result or an unfurl can stand on.
 *  Prefers the authored prose, which is what a reader actually wants to see in
 *  a search result, and falls back to the stat summary when a record has none.
 *  Kept clause-separated rather than parenthetical: 22 of these names already
 *  carry their own bracket ("Monstrous Centipede (Tiny)"), and nesting a
 *  second one reads as a typo. */
export function monsterDescription(monster) {
  const prose = monsterProse(monster);
  if (prose) return prose;
  return monsterStatSummary(monster);
}

export function monsterStatSummary(monster) {
  const cer = monster.effectiveness?.combatEffectivenessRating;
  const facts = [
    monster.class,
    monster.size?.hexes,
    cer !== undefined && cer !== null ? `CER ${cer}` : '',
    monster.effectiveness?.threatTier ? `${monster.effectiveness.threatTier} threat` : '',
  ]
    .filter(Boolean)
    .join(', ');
  return [
    `${monster.name}.`,
    facts ? `${facts}.` : '',
    'Full GURPS stat block, original portrait, hex token, and GCS downloads.',
  ]
    .filter(Boolean)
    .join(' ');
}

const NAV = `<div class="site-family" aria-label="On Automatic family">
    <div class="site-wrap site-family__inner">
      <a class="site-family__brand" href="../../family.html">On Automatic</a>
      <div class="site-family__links"><a href="../../index.html">Dungeons</a><a href="../../hexes.html">Hexes</a><a href="../../characters.html">Characters</a><a href="../../campaigns.html">Campaign Vault</a><a href="../../monsters.html" aria-current="page">Monster Library</a></div>
    </div>
  </div>
  <nav class="site-nav" aria-label="Main navigation">
    <div class="site-wrap site-nav__inner">
      <a class="site-brand" href="../../index.html"><img src="../../assets/brand/doa_logo_transparent.svg" alt=""><span>Dungeons on Automatic</span></a>
      <div class="site-nav__links"><a href="../../index.html">Home</a><a href="../../quickstart.html">Quickstart</a><a href="../../manual.html">Manual</a><a href="../../monsters.html">Monsters</a><a href="../../blog.html">Blog</a></div>
      <a class="site-button site-button--primary" href="../../releases.html#downloads">Download</a>
    </div>
  </nav>`;

const LEGAL_NOTICE = `<section class="legal-notice" aria-label="Steve Jackson Games notice">
    <div class="wrap">
      <p>Dungeons on Automatic is an original game aid by Kyle Norton for use with <a href="https://www.sjgames.com/gurps/"><b><i>GURPS</i></b></a> and <a href="https://www.sjgames.com/dungeonfantasy/"><b><i>Dungeon Fantasy Roleplaying Game</i></b></a> from <a href="https://www.sjgames.com/">Steve Jackson Games</a>. It is not official and is not endorsed by Steve Jackson Games.</p>
      <p>GURPS and Dungeon Fantasy Roleplaying Game are trademarks or registered trademarks of Steve Jackson Games. All rights are reserved by Steve Jackson Games. This free, non-resale game aid uses those marks under the <a href="https://www.sjgames.com/general/online_policy.html">SJ Games Online Policy</a>; no SJ Games art, logos, or trade dress are hosted here.</p>
    </div>
  </section>`;

const artImage = (art, className, extra = '') =>
  art?.url
    ? `<img class="${className}" src="${escapeHtml(art.url)}" alt="${escapeHtml(art.alt || '')}" width="${
        art.width || ''
      }" height="${art.height || ''}"${extra} loading="lazy">`
    : '';

function renderArt(monster) {
  const art = monster.art || {};
  // The hex token carries its renderer's style id so the facing-bar overlay can
  // refuse to draw on art it was not measured against.
  const hexStyle = art.hexToken?.derivationStyleId;
  const hexToken = artImage(
    art.hexToken,
    'token token--hex',
    hexStyle ? ` data-hex-style="${escapeHtml(hexStyle)}"` : ''
  );
  const tokens = [
    artImage(art.token, 'token'),
    hexToken ? `<span class="token-frame">${hexToken}</span>` : '',
  ]
    .filter(Boolean)
    .join('');
  // Drawn client-side by assets/js/hex-facing.js. The control ships hidden and
  // is revealed by that script, so a visitor without JavaScript is not offered a
  // checkbox that cannot do anything.
  const facingControl = hexToken
    ? '<label class="token-controls" hidden><input type="checkbox"> Red facing bar</label>'
    : '';
  const downloads = [
    ['Portrait', art.portrait?.url, 'portrait'],
    ['Token', art.token?.url, 'token'],
    ['Hex token', art.hexToken?.url, 'hex-token'],
  ]
    .filter(([, url]) => url)
    .map(
      ([label, url, slug]) =>
        `<li><a href="${escapeHtml(url)}" data-art="${escapeHtml(slug)}" download="${escapeHtml(
          `${monster.id}-${slug}.png`
        )}">↓ ${escapeHtml(label)}</a></li>`
    )
    .join('');
  return [
    art.portrait?.url
      ? `<img class="portrait" src="${escapeHtml(art.portrait.url)}" alt="${escapeHtml(
          art.portrait.alt || monster.name
        )}" width="${art.portrait.width || ''}" height="${art.portrait.height || ''}">`
      : '',
    tokens ? `<div class="monster-tokens">${tokens}</div>` : '',
    facingControl,
    downloads ? `<ul class="art-downloads">${downloads}</ul>` : '',
  ]
    .filter(Boolean)
    .join('\n        ');
}

const siblingLink = (monster, direction) => {
  if (!monster) return '<span></span>';
  const arrow = direction === 'prev' ? '← ' : '';
  const trail = direction === 'next' ? ' →' : '';
  return `<a href="../${escapeHtml(monsterSlug(monster))}/">${arrow}${escapeHtml(monster.name)}${trail}</a>`;
};

export function renderMonsterPage({ monster, prev, next }) {
  const slug = monsterSlug(monster);
  const canonical = absoluteUrl(monsterPath(slug));
  const title = `${monster.name} - ${SITE_NAME} Bestiary`;
  const description = monsterDescription(monster);
  const portrait = monster.art?.portrait;
  // A square portrait is the only per-monster image that exists, so the small
  // card is the honest choice: summary_large_image would centre-crop it to
  // 1.91:1 and behead half the bestiary.
  const cardTags = portrait?.url
    ? `
  <meta property="og:image" content="${escapeHtml(portrait.url)}">
  <meta property="og:image:width" content="${escapeHtml(portrait.width || 1254)}">
  <meta property="og:image:height" content="${escapeHtml(portrait.height || 1254)}">
  <meta property="og:image:alt" content="${escapeHtml(portrait.alt || `${monster.name} portrait`)}">
  <meta name="twitter:card" content="summary">`
    : `
  <meta property="og:image" content="${escapeHtml(absoluteUrl('assets/brand/logo.png'))}">
  <meta name="twitter:card" content="summary">`;

  const credit = [monster.provenance?.sourceCopyrightNotice, 'Portrait and tokens are AI-generated original art.']
    .filter(Boolean)
    .join(' ');

  const identBits = [monster.class, monster.effectiveness?.threatTier && `${monster.effectiveness.threatTier} threat`]
    .filter(Boolean)
    .join(' · ');

  return `<!DOCTYPE html>
<!-- Generated by scripts/build-monsters.mjs from the published monster package. Do not edit by hand. -->
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${escapeHtml(canonical)}">
  <meta property="og:site_name" content="${escapeHtml(SITE_NAME)}">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${escapeHtml(canonical)}">${cardTags}
  <link rel="icon" href="../../assets/brand/favicon.ico">
  <link rel="stylesheet" href="../../styles.css">
  <link rel="stylesheet" href="../../site.css">
  <link rel="stylesheet" href="../../monster.css">
  <link rel="stylesheet" href="../../monster-page.css">
</head>
<body>
  ${NAV}
  <header class="monster-head">
    <div class="wrap">
      <a class="back-link" href="../../monsters.html">← All monsters</a>
      <h1>${escapeHtml(monster.name)}</h1>
      ${identBits ? `<p class="monster-ident">${escapeHtml(identBits)}</p>` : ''}
    </div>
  </header>
  <main class="wrap monster-main">
    <div class="monster-art">
        ${renderArt(monster)}
    </div>
    <div class="monster-sheet">
        ${renderSheet(monster)}
    </div>
    <p class="monster-credit">${escapeHtml(credit)} <a href="../../monster-credits.html">Sources and credits</a>.</p>
    <nav class="monster-siblings" aria-label="Nearby monsters">
      ${siblingLink(prev, 'prev')}
      ${siblingLink(next, 'next')}
    </nav>
  </main>
  ${LEGAL_NOTICE}
  <footer><div class="wrap">Part of the <a href="../../monsters.html">Dungeons on Automatic bestiary</a>. Free to browse, print, and use at your table.</div></footer>
  <script src="../../assets/js/hex-facing.js" defer></script>
</body>
</html>
`;
}

export { SITE_URL };
