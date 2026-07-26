// Round-trip guarantee: every post in data/blog.json survives
// serialize -> parse unchanged, so Markdown authoring is lossless.
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { deepStrictEqual } from 'node:assert';
import { parsePost, serializePost } from './blog-content.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const posts = JSON.parse(await readFile(path.join(root, 'data', 'blog.json'), 'utf8'));

let failures = 0;
for (const post of posts) {
  const markdown = serializePost(post);
  const parsed = parsePost(markdown);
  parsed.slug = post.slug;
  const expected = { ...post };
  try {
    deepStrictEqual(
      { ...parsed, body: parsed.body },
      expected
    );
  } catch (error) {
    failures += 1;
    console.error(`ROUND-TRIP FAILURE: ${post.slug}`);
    console.error(error.message.split('\n').slice(0, 20).join('\n'));
  }
}
if (failures) {
  console.error(`${failures}/${posts.length} posts failed round-trip`);
  process.exit(1);
}
console.log(`All ${posts.length} posts round-trip losslessly`);
