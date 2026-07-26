// One-time (rerunnable) exporter: data/blog.json -> content/blog/<slug>.md
// Markdown becomes the authoring source of truth; build-blog.mjs compiles it
// back into data/blog.json for the site to consume.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { serializePost } from './blog-content.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const posts = JSON.parse(await readFile(path.join(root, 'data', 'blog.json'), 'utf8'));
const outDir = path.join(root, 'content', 'blog');
await mkdir(outDir, { recursive: true });

for (const post of posts) {
  if (!post.slug) throw new Error(`Post missing slug: ${post.title}`);
  await writeFile(path.join(outDir, `${post.slug}.md`), serializePost(post), 'utf8');
}
console.log(`Exported ${posts.length} posts to content/blog/`);
