// Pin the facing-bar geometry to the renderer that draws the hex tokens.
//
// assets/js/hex-facing.js overlays a bar on art produced by build-hex-token.py
// in the monsters repo. The expected vertices below are that script's own
// hex_points() evaluated at the published token size, so a change to the
// overlay's maths fails here instead of shipping a bar that floats off the hex.
//
// This cannot notice the Python changing; the runtime guard covers that case.
// A new renderer carries a new derivationStyleId, and the overlay declines to
// draw on any style id it was not measured against.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = await readFile(path.join(root, 'assets', 'js', 'hex-facing.js'), 'utf8');

let api = null;
const context = vm.createContext({
  __doaHexFacingTestHook: (exposed) => {
    api = exposed;
  }
});
vm.runInContext(source, context, { filename: 'hex-facing.js' });
assert.ok(api, 'hex-facing.js did not expose its geometry to the test hook');

// build-hex-token.py, hex_points(size=1254, margin=44):
//   quarter = 314, three_quarters = 939, middle = 627, left/top = 44,
//   right/bottom = 1209.
const EXPECTED_POINTS = [
  [314, 44],
  [939, 44],
  [1209, 627],
  [939, 1209],
  [314, 1209],
  [44, 627]
];

// The script runs in its own realm, so its arrays carry a foreign prototype and
// would fail a strict deep comparison on identical numbers. Copy into this one.
const hexPoints = (size) => Array.from(api.hexPoints(size), ([x, y]) => [x, y]);

assert.equal(api.TOKEN_SIZE, 1254, 'published hex tokens are 1254px square');
assert.equal(api.STYLE_ID, 'doa-flat-top-hex-v2', 'guarded style id changed');
assert.deepEqual(
  hexPoints(api.TOKEN_SIZE),
  EXPECTED_POINTS,
  'overlay hex no longer matches build-hex-token.py'
);

// The bar marks the back hexside: the bottom edge, running left to right, with
// both ends pulled in from the corners.
const bar = api.backBar(api.TOKEN_SIZE);
const [bottomLeft, bottomRight] = [EXPECTED_POINTS[4], EXPECTED_POINTS[3]];
const span = bottomRight[0] - bottomLeft[0];

assert.equal(bar.y1, bottomLeft[1], 'bar must sit on the bottom hexside');
assert.equal(bar.y2, bottomRight[1], 'bar must sit on the bottom hexside');
assert.ok(bar.x1 > bottomLeft[0], 'bar should be inset from the bottom-left corner');
assert.ok(bar.x2 < bottomRight[0], 'bar should be inset from the bottom-right corner');
assert.equal(
  Math.round(bar.x1 - bottomLeft[0]),
  Math.round(bottomRight[0] - bar.x2),
  'bar should be inset evenly at both ends'
);
assert.ok(
  bar.x2 - bar.x1 > span * 0.75,
  'bar should still cover most of the hexside it marks'
);
assert.ok(bar.width >= 8, 'bar must stay legible at print size');

// Every size the renderer accepts should produce a closed, sane hexagon.
for (const size of [512, 1254, 2048]) {
  const points = hexPoints(size);
  assert.equal(points.length, 6, `expected six vertices at size ${size}`);
  assert.equal(points[2][1], points[5][1], `east and west vertices must be level at ${size}`);
  assert.equal(points[0][1], points[1][1], `top edge must be flat at ${size}`);
  assert.equal(points[4][1], points[3][1], `bottom edge must be flat at ${size}`);
}

console.log('hex facing geometry ok');
