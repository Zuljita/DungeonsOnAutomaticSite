// Build one static page per monster from the published package.
//
// Runs before build-sitemap.mjs, which picks the generated directories up.
// If no package has been released yet, the bestiary is still a review queue
// and there is nothing to render; the monsters/ tree is removed and the build
// succeeds, so this can sit in the pipeline before the first release.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { monsterSlug, renderMonsterPage } from './monster-render.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pagesDir = path.join(root, 'monsters');
const indexPath = path.join(root, 'data', 'monsters', 'index.json');

const index = JSON.parse(await readFile(indexPath, 'utf8'));

// monsters/ is generated in full, so records dropped from a package take their
// pages with them on the next build.
await rm(pagesDir, { recursive: true, force: true });

if (!index.latest?.path) {
  console.log('No released monster package; skipped monster pages');
  process.exit(0);
}

const packagePath = path.join(path.dirname(indexPath), index.latest.path);
const pkg = JSON.parse(await readFile(packagePath, 'utf8'));
const monsters = (Array.isArray(pkg.monsters) ? pkg.monsters : [])
  .filter((monster) => monster && monster.name)
  .sort((a, b) => a.name.localeCompare(b.name));

if (!monsters.length) {
  console.log('Released package contains no monsters; skipped monster pages');
  process.exit(0);
}

// Slugs are public URLs, so a collision has to stop the build rather than
// silently overwrite one monster's page with another's. Sources published
// later may well bring a second Goblin; when they do, that record needs an
// explicit slug rather than a guess made here.
const seen = new Map();
const collisions = [];
for (const monster of monsters) {
  const slug = monsterSlug(monster);
  if (!slug) {
    collisions.push(`${monster.id}: name "${monster.name}" produces an empty slug`);
    continue;
  }
  if (seen.has(slug)) collisions.push(`${slug}: ${seen.get(slug)} and ${monster.id}`);
  else seen.set(slug, monster.id);
}
if (collisions.length) {
  console.error('Monster slug collisions:\n  ' + collisions.join('\n  '));
  process.exit(1);
}

for (const [position, monster] of monsters.entries()) {
  const dir = path.join(pagesDir, monsterSlug(monster));
  await mkdir(dir, { recursive: true });
  await writeFile(
    path.join(dir, 'index.html'),
    renderMonsterPage({
      monster,
      prev: monsters[position - 1],
      next: monsters[position + 1],
    }),
    'utf8'
  );
}

// The bestiary needs id -> slug to link its cards at the right URL, and to
// forward the #<record id> links it published before these pages existed.
await writeFile(
  path.join(root, 'data', 'monsters', 'slugs.json'),
  JSON.stringify(
    Object.fromEntries(monsters.map((monster) => [monster.id, monsterSlug(monster)])),
    null,
    2
  ) + '\n',
  'utf8'
);

console.log(`Built ${monsters.length} monster pages and data/monsters/slugs.json`);
