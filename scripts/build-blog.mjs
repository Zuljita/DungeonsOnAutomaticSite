// Compile content/blog/*.md into:
//   data/blog.json        the structured feed
//   blog/<slug>/index.html one page per post (the canonical URL for a post)
//   blog.html             the index that links to them
// Slug comes from the filename. Posts are sorted newest first.
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parsePost } from './blog-content.mjs';
import { renderIndexPage, renderPostPage } from './blog-render.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = path.join(root, 'content', 'blog');
const postsDir = path.join(root, 'blog');

const files = (await readdir(contentDir)).filter((name) => name.endsWith('.md')).sort();
const posts = [];
for (const file of files) {
  const markdown = await readFile(path.join(contentDir, file), 'utf8');
  let post;
  try {
    post = parsePost(markdown);
  } catch (error) {
    throw new Error(`${file}: ${error.message}`);
  }
  post.slug = path.basename(file, '.md');
  if (!post.title) throw new Error(`${file}: missing title`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(post.date || '')) {
    throw new Error(`${file}: date must be YYYY-MM-DD, got "${post.date}"`);
  }
  posts.push(post);
}

const duplicate = posts.map((post) => post.slug).find((slug, i, all) => all.indexOf(slug) !== i);
if (duplicate) throw new Error(`duplicate slug: ${duplicate}`);

posts.sort((a, b) => String(b.date).localeCompare(String(a.date)));

const ordered = posts.map((post) => ({
  slug: post.slug,
  title: post.title,
  date: post.date,
  ...(post.author !== undefined ? { author: post.author } : {}),
  ...(post.tags !== undefined ? { tags: post.tags } : {}),
  ...(post.summary !== undefined ? { summary: post.summary } : {}),
  body: post.body,
}));

await writeFile(
  path.join(root, 'data', 'blog.json'),
  JSON.stringify(ordered, null, 2) + '\n',
  'utf8'
);

// blog/ is generated in full, so stale slugs disappear with the rebuild.
await rm(postsDir, { recursive: true, force: true });
for (const [index, post] of ordered.entries()) {
  const dir = path.join(postsDir, post.slug);
  await mkdir(dir, { recursive: true });
  await writeFile(
    path.join(dir, 'index.html'),
    renderPostPage({
      post,
      newer: ordered[index - 1],
      older: ordered[index + 1],
    }),
    'utf8'
  );
}

await writeFile(path.join(root, 'blog.html'), renderIndexPage(ordered), 'utf8');

console.log(
  `Built data/blog.json, blog.html, and ${ordered.length} post pages from ${ordered.length} posts`
);
