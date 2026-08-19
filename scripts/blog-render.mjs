// Build-time HTML rendering for the blog.
//
// The block vocabulary is defined in blog-content.mjs; this module turns those
// blocks into the same markup blog.html used to build client-side, so the
// existing styles in blog.css apply unchanged.
//
// Every page is emitted with relative asset paths (`prefix`), which keeps
// `file://` preview working as well as the deployed site. Only canonical and
// OpenGraph URLs are absolute, because those must be.

export const SITE_URL = 'https://dungeonsonautomatic.com/';
export const SITE_NAME = 'Dungeons on Automatic';
const FALLBACK_OG_IMAGE = 'assets/brand/logo.png';

const HTML_ESCAPES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

export const escapeHtml = (value) =>
  String(value ?? '').replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]);

// Post bodies were authored for a page at the site root, so their asset paths
// are root-relative ("assets/blog/..."). Pages nested under /blog/<slug>/ need
// those walked back up.
const isExternal = (url) =>
  /^([a-z][a-z0-9+.-]*:|\/\/|\/|#)/i.test(String(url ?? ''));

export const withPrefix = (url, prefix) =>
  isExternal(url) ? String(url ?? '') : prefix + String(url ?? '');

export const absoluteUrl = (url) => new URL(String(url ?? ''), SITE_URL).href;

export const formatDate = (value) => {
  if (!value) return 'Undated';
  const parsed = new Date(value + 'T00:00:00Z');
  if (Number.isNaN(parsed.getTime())) return value;
  // Fixed locale: this runs at build time, so it cannot follow the reader's.
  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
};

export const postPath = (slug) => `blog/${slug}/`;

// Tag names are free text ("behind the scenes"); URLs need slugs. Distinct
// names that collapse to one slug ("GM Tips" / "gm tips") share a page, and
// the first-seen name (newest post) is the one displayed.
export const tagSlug = (tag) =>
  String(tag ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const tagPath = (tag) => `blog/tags/${tagSlug(tag)}/`;

export const BLOG_DESCRIPTION =
  'Thoughts, progress notes, and behind-the-scenes updates on Dungeons on Automatic, the local-first DFRPG / GURPS dungeon generator.';

export function renderBlock(block, prefix) {
  if (typeof block === 'string') {
    return `<p>${escapeHtml(block)}</p>`;
  }
  if (!block) return '';

  if (block.h3) {
    return `<h3>${escapeHtml(block.h3)}</h3>`;
  }

  if (Array.isArray(block.list)) {
    const items = block.list.map((item) => `<li>${escapeHtml(item)}</li>`).join('');
    return `<ul>${items}</ul>`;
  }

  if (block.callout) {
    // .callout is `white-space: pre-line`, so newlines survive as authored.
    return `<div class="callout">${escapeHtml(block.callout)}</div>`;
  }

  if (block.code) {
    return `<pre>${escapeHtml(block.code)}</pre>`;
  }

  if (block.download) {
    const parts = [
      `<a class="download-btn" href="${escapeHtml(withPrefix(block.download, prefix))}" rel="noopener"`,
      block.filename ? ` download="${escapeHtml(block.filename)}"` : '',
      '>',
      '<span class="dl-ico" aria-hidden="true">⬇</span>',
      `<span>${escapeHtml(block.label || 'Download')}</span>`,
      block.size ? `<span class="dl-size">${escapeHtml(block.size)}</span>` : '',
      '</a>',
    ];
    return parts.join('');
  }

  if (block.image) {
    const width =
      block.width === undefined
        ? ''
        : ` style="max-width:${escapeHtml(
            typeof block.width === 'number' ? `${block.width}px` : block.width
          )}"`;
    const caption = block.caption
      ? `<figcaption>${escapeHtml(block.caption)}</figcaption>`
      : '';
    return [
      '<figure class="center">',
      `<img src="${escapeHtml(withPrefix(block.image, prefix))}" alt="${escapeHtml(
        block.alt || ''
      )}" loading="lazy"${width}>`,
      caption,
      '</figure>',
    ].join('');
  }

  return '';
}

export const renderBlocks = (blocks, prefix) =>
  (blocks || []).map((block) => renderBlock(block, prefix)).join('\n        ');

const renderTags = (tags, prefix) => {
  if (!Array.isArray(tags) || !tags.length) return '';
  const items = tags
    .map(
      (tag) =>
        `<a class="tag" href="${escapeHtml(prefix + tagPath(tag))}">${escapeHtml(tag)}</a>`
    )
    .join('');
  return `<div class="post__tags">${items}</div>`;
};

const renderMeta = (post, prefix) => {
  const author = post.author
    ? `<div class="author">${escapeHtml(post.author)}</div>`
    : '';
  return [
    '<aside class="post__meta">',
    `<time datetime="${escapeHtml(post.date || '')}">${escapeHtml(formatDate(post.date))}</time>`,
    author,
    renderTags(post.tags, prefix),
    '</aside>',
  ].join('');
};

// First image in the body makes a better share card than the logo.
const ogImageFor = (post) => {
  const image = (post.body || []).find((block) => block && block.image);
  return absoluteUrl(image ? image.image : FALLBACK_OG_IMAGE);
};

function renderHead({ title, description, canonical, prefix, ogType, image, extraHead = '' }) {
  return `<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${escapeHtml(canonical)}">
  <meta property="og:site_name" content="${escapeHtml(SITE_NAME)}">
  <meta property="og:type" content="${escapeHtml(ogType)}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${escapeHtml(canonical)}">
  <meta property="og:image" content="${escapeHtml(image)}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="alternate" type="application/rss+xml" title="${escapeHtml(SITE_NAME)} - Blog" href="${prefix}feed.xml">
  <link rel="icon" href="${prefix}assets/brand/favicon.ico">
  <link rel="stylesheet" href="${prefix}styles.css">
  <link rel="stylesheet" href="${prefix}blog.css">
  <link rel="stylesheet" href="${prefix}site.css">${extraHead}
</head>`;
}

const renderNav = (prefix) => `<div class="site-family" aria-label="On Automatic family">
    <div class="site-wrap site-family__inner">
      <a class="site-family__brand" href="${prefix}family.html">On Automatic</a>
      <div class="site-family__links"><a href="${prefix}index.html">Dungeons</a><a href="${prefix}hexes.html">Hexes</a><a href="${prefix}characters.html">Characters</a><a href="${prefix}campaigns.html">Campaign Vault</a><a href="${prefix}monsters.html">Monster Library</a></div>
    </div>
  </div>
  <nav class="site-nav" aria-label="Main navigation">
    <div class="site-wrap site-nav__inner">
      <a class="site-brand" href="${prefix}index.html"><img src="${prefix}assets/brand/doa_logo_transparent.svg" alt=""><span>Dungeons on Automatic</span></a>
      <div class="site-nav__links"><a href="${prefix}index.html">Home</a><a href="${prefix}quickstart.html">Quickstart</a><a href="${prefix}manual.html">Manual</a><a href="${prefix}monsters.html">Monsters</a><a href="${prefix}blog.html">Blog</a></div>
      <a class="site-button site-button--primary" href="${prefix}releases.html#downloads">Download</a>
    </div>
  </nav>`;

const LEGAL_NOTICE = `<section class="legal-notice" aria-label="Steve Jackson Games notice">
    <div class="wrap">
      <p>Dungeons on Automatic is an original game aid by Kyle Norton for use with <a href="https://www.sjgames.com/gurps/"><b><i>GURPS</i></b></a> and <a href="https://www.sjgames.com/dungeonfantasy/"><b><i>Dungeon Fantasy Roleplaying Game</i></b></a> from <a href="https://www.sjgames.com/">Steve Jackson Games</a>. It is not official and is not endorsed by Steve Jackson Games.</p>
      <p>GURPS and Dungeon Fantasy Roleplaying Game are trademarks or registered trademarks of Steve Jackson Games. All rights are reserved by Steve Jackson Games. This free, non-resale game aid uses those marks under the <a href="https://www.sjgames.com/general/online_policy.html">SJ Games Online Policy</a>; no SJ Games art, logos, or trade dress are hosted here.</p>
    </div>
  </section>`;

const SITE_FOOTER = `<footer><div class="wrap">Dungeons on Automatic blog. Local-first DFRPG dungeon prep, thinking out loud. <a href="https://github.com/Zuljita/DungeonsOnAutomaticSite/issues">Report a bug.</a></div></footer>`;

const GENERATED_BANNER = (source) =>
  `<!-- Generated by scripts/build-blog.mjs from ${source}. Do not edit by hand. -->`;

function renderJsonLd(post, canonical) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    datePublished: post.date,
    mainEntityOfPage: canonical,
    url: canonical,
    image: ogImageFor(post),
    ...(post.author ? { author: { '@type': 'Person', name: post.author } } : {}),
    ...(post.summary ? { description: post.summary } : {}),
  };
  // </script> inside JSON would close the tag early; nothing else needs escaping.
  const json = JSON.stringify(data, null, 2).replace(/</g, '\\u003c');
  return `\n  <script type="application/ld+json">\n${json}\n  </script>`;
}

export function renderPostPage({ post, newer, older }) {
  const prefix = '../../';
  const canonical = absoluteUrl(postPath(post.slug));
  const description =
    post.summary || `${post.title} - from the Dungeons on Automatic blog.`;

  const pager = [
    newer
      ? `<a class="post-nav__link" href="${prefix}${postPath(newer.slug)}" rel="prev"><span class="post-nav__dir">Newer</span><span class="post-nav__title">${escapeHtml(newer.title)}</span></a>`
      : '<span class="post-nav__link post-nav__link--empty"></span>',
    older
      ? `<a class="post-nav__link post-nav__link--older" href="${prefix}${postPath(older.slug)}" rel="next"><span class="post-nav__dir">Older</span><span class="post-nav__title">${escapeHtml(older.title)}</span></a>`
      : '<span class="post-nav__link post-nav__link--empty"></span>',
  ].join('\n      ');

  return `<!DOCTYPE html>
${GENERATED_BANNER(`content/blog/${post.slug}.md`)}
<html lang="en">
${renderHead({
  title: `${post.title} - ${SITE_NAME}`,
  description,
  canonical,
  prefix,
  ogType: 'article',
  image: ogImageFor(post),
  extraHead: renderJsonLd(post, canonical),
})}
<body>
  ${renderNav(prefix)}
  <main class="wrap post-page">
    <a class="post-page__back" href="${prefix}blog.html">&larr; All posts</a>
    <article class="post">
      ${renderMeta(post, prefix)}
      <div class="post__body">
        <h1 class="post__title">${escapeHtml(post.title)}</h1>
        ${renderBlocks(post.body, prefix)}
      </div>
    </article>
    <nav class="post-nav" aria-label="More posts">
      ${pager}
    </nav>
  </main>
  ${LEGAL_NOTICE}
  ${SITE_FOOTER}
</body>
</html>
`;
}

const renderPostCards = (posts, prefix) =>
  posts
    .map((post) => {
      const href = prefix + postPath(post.slug);
      const summary = post.summary
        ? `<p class="post__summary">${escapeHtml(post.summary)}</p>`
        : '';
      return `    <article class="post post--card" id="${escapeHtml(post.slug)}">
      ${renderMeta(post, prefix)}
      <div class="post__body">
        <h2><a href="${escapeHtml(href)}">${escapeHtml(post.title)}</a></h2>
        ${summary}
        <a class="post__more" href="${escapeHtml(href)}">Read post &rarr;</a>
      </div>
    </article>`;
    })
    .join('\n');

export function renderIndexPage(posts) {
  const prefix = '';
  const canonical = absoluteUrl('blog.html');
  const description = BLOG_DESCRIPTION;

  const entries = renderPostCards(posts, prefix);

  const body = posts.length
    ? entries
    : '    <p class="empty">No posts yet. Check back soon.</p>';

  // Posts used to live at blog.html#slug. Fragments never reach the server, so
  // forwarding the old permalinks has to happen here.
  const slugs = JSON.stringify(posts.map((post) => post.slug));
  const redirect = `<script>
    (() => {
      const slugs = new Set(${slugs});
      const slug = decodeURIComponent(location.hash.replace(/^#/, ''));
      if (slugs.has(slug)) location.replace('blog/' + slug + '/');
    })();
  </script>`;

  return `<!DOCTYPE html>
${GENERATED_BANNER('content/blog/*.md')}
<html lang="en">
${renderHead({
  title: `${SITE_NAME} - Blog`,
  description,
  canonical,
  prefix,
  ogType: 'website',
  image: absoluteUrl(FALLBACK_OG_IMAGE),
})}
<body>
  ${renderNav(prefix)}
  <header>
    <div class="wrap">
      <span class="eyebrow">From the dungeon office</span>
      <h1>Thoughts and updates.</h1>
      <p class="lead">Notes from behind the generator: design decisions, pipeline experiments, dead ends worth learning from, and the occasional confession about what the staff are up to. The Releases page carries the changelog. The blog carries the reasoning.</p>
      <p class="feed-line"><a href="feed.xml">RSS feed</a></p>
    </div>
  </header>
  <main class="wrap" id="posts">
${body}
  </main>
  ${LEGAL_NOTICE}
  ${SITE_FOOTER}
  ${redirect}
</body>
</html>
`;
}

export function renderTagPage({ tag, posts }) {
  const prefix = '../../../';
  const canonical = absoluteUrl(tagPath(tag));
  const description = `Posts tagged "${tag}" on the ${SITE_NAME} blog.`;
  const count = `${posts.length} post${posts.length === 1 ? '' : 's'}`;

  // Relative href, so it resolves to this tag's own feed.
  const tagFeed = `\n  <link rel="alternate" type="application/rss+xml" title="${escapeHtml(
    `${SITE_NAME} - ${tag}`
  )}" href="feed.xml">`;

  return `<!DOCTYPE html>
${GENERATED_BANNER('content/blog/*.md')}
<html lang="en">
${renderHead({
  title: `Tagged "${tag}" - ${SITE_NAME}`,
  description,
  canonical,
  prefix,
  ogType: 'website',
  image: absoluteUrl(FALLBACK_OG_IMAGE),
  extraHead: tagFeed,
})}
<body>
  ${renderNav(prefix)}
  <header>
    <div class="wrap">
      <span class="eyebrow">Blog tag</span>
      <h1>${escapeHtml(tag)}</h1>
      <p class="lead">${count} tagged &ldquo;${escapeHtml(tag)}&rdquo;. <a class="tag-page__back" href="${prefix}blog.html">All posts &rarr;</a></p>
      <p class="feed-line"><a href="feed.xml">RSS feed for this tag</a></p>
    </div>
  </header>
  <main class="wrap" id="posts">
${renderPostCards(posts, prefix)}
  </main>
  ${LEGAL_NOTICE}
  ${SITE_FOOTER}
</body>
</html>
`;
}
