// Merge one `release-changelog.json` (schemaVersion 2, produced by the
// application repository's scripts/generate-release-changelog.ts) into this
// site's cumulative data/changelog.json.
//
// Why a cumulative file at all: the application publishes a single rolling
// `continuous` release, so the release feed only ever describes the newest
// build. Left alone the public changelog could never show history — it would
// replace itself on every build. This file is the history.
//
// Usage:
//   node scripts/merge-changelog.mjs <release-changelog.json> [<target changelog.json>]
//
// The target defaults to data/changelog.json (Dungeons on Automatic). Sibling
// apps keep their own cumulative file — the mirror passes e.g.
// data/hexes/changelog.json — so one app's history never leaks into another's.
//
// Re-running with the same input is a no-op: entries are keyed and deduplicated,
// so an unchanged mirror run leaves the file byte-identical and commits nothing.
import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const SCHEMA_VERSION = 1;

/**
 * The application repository is private, so every `html_url` the generator
 * produces — pull requests, commits, compare views — 404s for the public. Those
 * URLs must not reach a public JSON file, let alone a rendered link. Numbers and
 * titles survive; links do not.
 */
function publicEntry(entry) {
  const commits = Array.isArray(entry.commits) ? entry.commits : [];
  return {
    kind: entry.kind === 'commit' ? 'commit' : 'pull-request',
    number: Number.isInteger(entry.number) ? entry.number : null,
    title: String(entry.title ?? '').trim(),
    authorName: String(entry.authorName ?? '').trim(),
    authoredAt: String(entry.authoredAt ?? ''),
    shortSha: String(entry.shortSha ?? ''),
    commits: commits
      .map((commit) => String(commit.subject ?? '').trim())
      .filter((subject) => subject.length > 0),
  };
}

/**
 * A pull request is the same change however often it is mirrored, so its number
 * is the identity. Direct commits have no number and fall back to their sha.
 */
function entryKey(entry) {
  return entry.kind === 'pull-request' && entry.number !== null
    ? `pr:${entry.number}`
    : `commit:${entry.shortSha}`;
}

function sortNewestFirst(entries) {
  // Compare instants, not strings: git writes each timestamp in its author's
  // own UTC offset, so "2026-08-10T07:50-04:00" sorts before
  // "2026-08-10T11:03+00:00" lexically while being the later moment.
  const instant = (entry) => {
    const parsed = Date.parse(entry.authoredAt);
    return Number.isNaN(parsed) ? 0 : parsed;
  };

  return entries.slice().sort((left, right) => {
    const delta = instant(right) - instant(left);
    if (delta !== 0) return delta;
    // Same moment: higher PR numbers merged later.
    return (right.number ?? 0) - (left.number ?? 0);
  });
}

const [inputPath, targetArg] = process.argv.slice(2);
if (!inputPath) {
  console.error('Usage: node scripts/merge-changelog.mjs <release-changelog.json> [<target changelog.json>]');
  process.exit(1);
}
const target = targetArg ? path.resolve(targetArg) : path.join(root, 'data', 'changelog.json');

const incoming = JSON.parse(await readFile(inputPath, 'utf8'));
if (incoming.schemaVersion !== 2) {
  // Failing loudly beats silently publishing a changelog that skipped a release:
  // a schema bump in the application repository has to be handled here too.
  console.error(
    `Unsupported release-changelog schemaVersion ${incoming.schemaVersion}; this script understands 2.`,
  );
  process.exit(1);
}

const existing = existsSync(target) ? JSON.parse(await readFile(target, 'utf8')) : { entries: [] };
const byKey = new Map();

// Existing entries win over incoming duplicates: the site's copy is the one
// already published, and a re-mirror should not reword history.
for (const entry of existing.entries ?? []) {
  byKey.set(entryKey(entry), entry);
}

let added = 0;
for (const raw of incoming.entries ?? []) {
  const entry = publicEntry(raw);
  if (entry.title.length === 0) continue;
  const key = entryKey(entry);
  if (byKey.has(key)) continue;
  byKey.set(key, entry);
  added += 1;
}

const merged = {
  schemaVersion: SCHEMA_VERSION,
  entries: sortNewestFirst([...byKey.values()]),
};

// `generatedAt` is deliberately absent: a timestamp would make every mirror run
// a content change, so the workflow would commit and redeploy the site every
// fifteen minutes even when no release shipped.
const serialized = `${JSON.stringify(merged, null, 2)}\n`;
const unchanged = existsSync(target) && (await readFile(target, 'utf8')) === serialized;

await writeFile(target, serialized);
console.log(
  `Changelog: ${added} new entr${added === 1 ? 'y' : 'ies'}, ${merged.entries.length} total${unchanged ? ' (file unchanged)' : ''}.`,
);
