// Pin the behaviour data/changelog.json depends on.
//
// The public changelog is accumulated, not replaced: the application publishes
// one rolling `continuous` release, so each mirror run hands merge-changelog.mjs
// a window of recent entries and expects the file to keep everything older. Three
// properties have to hold or the published changelog quietly rots:
//
//   1. Re-merging the same window adds nothing. The mirror runs every fifteen
//      minutes; if this drifted, the site would commit and redeploy on a loop.
//   2. No private URLs survive. The application repository is private, so any
//      link the generator produced 404s for the public.
//   3. Entries stay ordered newest-first across UTC offsets. git stamps each
//      commit in its author's own offset, so string ordering is wrong.
//
// The script writes to data/changelog.json, so the test runs it against a
// throwaway copy of the repository layout and restores the real file after.
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, cpSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** A throwaway repo layout: scripts/merge-changelog.mjs plus an empty data/. */
const sandbox = mkdtempSync(path.join(tmpdir(), 'doa-changelog-'));
mkdirSync(path.join(sandbox, 'scripts'));
mkdirSync(path.join(sandbox, 'data'));
cpSync(path.join(root, 'scripts', 'merge-changelog.mjs'), path.join(sandbox, 'scripts', 'merge-changelog.mjs'));

const target = path.join(sandbox, 'data', 'changelog.json');

function merge(payload) {
  const input = path.join(sandbox, 'input.json');
  writeFileSync(input, JSON.stringify(payload));
  execFileSync('node', [path.join(sandbox, 'scripts', 'merge-changelog.mjs'), input], { stdio: 'pipe' });
  return JSON.parse(readFileSync(target, 'utf8'));
}

const REPO = 'https://github.com/Zuljita/DungeonsOnAutomatic';

const older = {
  schemaVersion: 2,
  entries: [
    {
      kind: 'pull-request',
      number: 100,
      title: 'The older change',
      authorName: 'Kyle Norton',
      // 14:00Z, written in an offset that sorts *after* the newer entry as text.
      authoredAt: '2026-08-01T10:00:00-04:00',
      sha: 'a'.repeat(40),
      shortSha: 'aaaaaaa',
      url: `${REPO}/pull/100`,
      commits: [{ sha: 'c'.repeat(40), shortSha: 'ccccccc', subject: 'A carried commit', url: `${REPO}/commit/${'c'.repeat(40)}` }],
    },
  ],
};

const newer = {
  schemaVersion: 2,
  entries: [
    {
      kind: 'pull-request',
      number: 101,
      title: 'The newer change',
      authorName: 'Kyle Norton',
      // 09:00Z — later than the entry above only once both are parsed.
      authoredAt: '2026-08-02T09:00:00+00:00',
      sha: 'b'.repeat(40),
      shortSha: 'bbbbbbb',
      url: `${REPO}/pull/101`,
      commits: [],
    },
  ],
};

// 1. Accumulation: a later window must not drop what an earlier one published.
merge(older);
const afterSecond = merge(newer);
assert.equal(afterSecond.entries.length, 2, 'merging a new window dropped previously published entries');
assert.deepEqual(
  afterSecond.entries.map((entry) => entry.number),
  [101, 100],
  'entries are not ordered newest-first across differing UTC offsets',
);

// 2. Idempotence: the mirror re-runs on a schedule, so an unchanged source must
//    leave the file byte-identical or the site redeploys forever.
const before = readFileSync(target, 'utf8');
merge(newer);
merge(older);
assert.equal(readFileSync(target, 'utf8'), before, 're-merging an already-published window changed the file');

// 3. Deduplication survives a re-worded title: the pull request number is the
//    identity, and the copy already published wins.
const reworded = JSON.parse(JSON.stringify(newer));
reworded.entries[0].title = 'The newer change, reworded upstream';
const afterReword = merge(reworded);
assert.equal(afterReword.entries.length, 2, 'a re-worded pull request was published twice');
assert.equal(afterReword.entries[0].title, 'The newer change', 'a re-mirror rewrote already-published history');

// 4. No link into the private application repository may reach a public file.
const serialized = readFileSync(target, 'utf8');
assert.ok(!serialized.includes('github.com'), 'a private-repository URL leaked into data/changelog.json');
assert.ok(!serialized.includes('http'), 'a URL leaked into data/changelog.json');
assert.deepEqual(
  afterReword.entries.find((entry) => entry.number === 100).commits,
  ['A carried commit'],
  'carried commit subjects were lost or kept their private URLs',
);

// 5. A schema the site does not understand must fail loudly rather than publish
//    a changelog that silently skipped a release.
assert.throws(() => merge({ schemaVersion: 3, entries: [] }), 'an unknown schemaVersion was accepted');

rmSync(sandbox, { recursive: true, force: true });

// The real file is the seed plus everything mirrored since; it must still parse
// and still be free of private URLs.
const published = path.join(root, 'data', 'changelog.json');
assert.ok(existsSync(published), 'data/changelog.json is missing');
const live = JSON.parse(readFileSync(published, 'utf8'));
assert.equal(live.schemaVersion, 1, 'data/changelog.json is not the schema releases.html reads');
assert.ok(live.entries.length > 0, 'data/changelog.json has no entries');
assert.ok(!readFileSync(published, 'utf8').includes('github.com'), 'data/changelog.json contains a private-repository URL');

console.log(`changelog merge: OK (${live.entries.length} published entries)`);
