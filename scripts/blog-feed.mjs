// RSS 2.0 rendering for the blog, built alongside the HTML by build-blog.mjs.
//
// Items carry the full post body in content:encoded so a feed reader shows the
// whole post without a visit. Asset URLs inside the body must be absolute for
// that to work; passing SITE_URL as the renderBlocks prefix does it.
//
// No lastBuildDate: generated files are committed, and a timestamp would dirty
// every build even when nothing changed.
import {
  SITE_URL,
  SITE_NAME,
  absoluteUrl,
  postPath,
  renderBlocks,
} from './blog-render.mjs';

const XML_ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' };
const escapeXml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => XML_ESCAPES[char]);

// Post dates are day-granularity; midnight UTC is the honest timestamp.
const pubDate = (date) => new Date(date + 'T00:00:00Z').toUTCString();

// "]]>" inside a CDATA section would end it early.
const cdata = (value) => `<![CDATA[${String(value).replace(/]]>/g, ']]]]><![CDATA[>')}]]>`;

// Readers poll feeds; 20 items covers months here while keeping the payload small.
export const FEED_LIMIT = 20;

export function renderFeed({ title, description, feedPath, linkPath, posts }) {
  const items = posts.slice(0, FEED_LIMIT).map((post) => {
    const url = absoluteUrl(postPath(post.slug));
    return [
      '    <item>',
      `      <title>${escapeXml(post.title)}</title>`,
      `      <link>${escapeXml(url)}</link>`,
      `      <guid isPermaLink="true">${escapeXml(url)}</guid>`,
      `      <pubDate>${escapeXml(pubDate(post.date))}</pubDate>`,
      ...(post.author ? [`      <dc:creator>${escapeXml(post.author)}</dc:creator>`] : []),
      ...(post.summary ? [`      <description>${escapeXml(post.summary)}</description>`] : []),
      ...(post.tags || []).map((tag) => `      <category>${escapeXml(tag)}</category>`),
      `      <content:encoded>${cdata(renderBlocks(post.body, SITE_URL))}</content:encoded>`,
      '    </item>',
    ].join('\n');
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${escapeXml(absoluteUrl(linkPath))}</link>
    <atom:link href="${escapeXml(absoluteUrl(feedPath))}" rel="self" type="application/rss+xml"/>
    <description>${escapeXml(description)}</description>
    <language>en-us</language>
    <generator>${escapeXml(`${SITE_NAME} build scripts`)}</generator>
${items.join('\n')}
  </channel>
</rss>
`;
}
