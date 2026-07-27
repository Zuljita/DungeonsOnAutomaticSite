# Dungeons on Automatic Site

Public marketing, manual, and release-note site for
[Dungeons on Automatic](https://github.com/Zuljita/DungeonsOnAutomatic).

This repository is intentionally static. It can stay public while the application
source repository moves private, giving users a stable place to find:

- product overview and launch links
- user manual and troubleshooting notes
- public monster-library release links and source/license summaries
- public release notes, mirrored app downloads, and known issues
- brand assets and public product documentation

## Adding a blog post

To publish a post, add a Markdown file under `content/blog/` and commit - see
[Blog authoring](#blog-authoring) below. The build compiles it to the block
structure described here, which is what the page templates consume.

Each post becomes a JSON object in the generated `data/blog.json`:

```json
{
  "slug": "url-safe-id",
  "title": "Post title",
  "date": "2026-06-30",
  "author": "Optional name",
  "tags": ["update"],
  "summary": "One-line description (reserved for previews/SEO).",
  "body": [
    "A plain string becomes a paragraph.",
    { "h3": "A subheading" },
    { "list": ["bullet one", "bullet two"] },
    { "callout": "An emphasized callout box." },
    { "code": "Preformatted / monospace block." },
    { "image": "assets/blog/your-slug/image.png", "alt": "alt text", "caption": "optional" },
    { "download": "https://github.com/Zuljita/DungeonsOnAutomaticSite/raw/main/assets/blog/your-slug/pack.zip", "label": "Download (.zip)", "filename": "pack.zip", "size": "1.2 MB" }
  ]
}
```

Notes:

- Posts are sorted newest-first by `date` (use `YYYY-MM-DD`).
- `slug` is the post URL (`/blog/your-slug/`); keep it unique.
- `body` items render in order; mix strings and the object block types above.
- Body text is inserted as plain text, so no HTML escaping is required.

### Downloadable files (Git LFS)

Binary download packs (e.g. the Token Tuesday `.zip` archives under
`assets/blog/`) are stored in **Git LFS** — see the `assets/blog/**/*.zip`
rule in `.gitattributes`. You need `git lfs install` once on any clone that
will add or fetch these files.

Important: **GitHub Pages does not serve Git LFS content** — it would return the
small pointer file, not the binary. So `download` blocks must point at GitHub's
raw endpoint, which resolves LFS objects:

```text
https://github.com/Zuljita/DungeonsOnAutomaticSite/raw/main/assets/blog/<slug>/<file>.zip
```

These links resolve once the file is on `main`. Note GitHub's free LFS tier
allows 1 GB storage and 1 GB/month bandwidth; if a pack ever gets heavy traffic,
move it to a GitHub Release asset (no LFS bandwidth limit) and update the link.

## GitHub Pages

The included workflow publishes the repository root to GitHub Pages whenever
`main` changes. After the repository exists on GitHub, enable Pages with
**Settings -> Pages -> Source -> GitHub Actions**.

Expected URLs:

```text
https://dungeonsonautomatic.com/
https://zuljita.github.io/DungeonsOnAutomaticSite/
```

## Local preview

Open `index.html` directly, or serve the folder with any static file server.
No build step is required.

## Public/private split

Once `Zuljita/DungeonsOnAutomatic` is private, keep public release assets mirrored
on this repository's GitHub Releases. Private-repo release assets require
authentication, so public downloads should not point there.

## SJ Games compliance notes

See `LEGAL.md` for the current Steve Jackson Games Online Policy review, the
sitewide notice checklist, monster-library source boundaries, and launch decision
about proactive SJ Games contact before any commercial, mobile, or app-store
distribution path.

## Mirroring app releases

The `Mirror App Release Downloads` workflow copies assets from
`Zuljita/DungeonsOnAutomatic` into this public repository's `continuous` release.
The downloads page links to those stable public asset URLs, so routine release
updates should not require editing the page.

Before the source repository goes private, add a repository secret named
`DOA_RELEASE_MIRROR_TOKEN` with read access to `Zuljita/DungeonsOnAutomatic`.
The scheduled workflow uses that token to read the private release and the
standard `GITHUB_TOKEN` to publish mirrored assets here.

The mirror workflow also accepts a `repository_dispatch` event named
`app_release_published` so the source repository can update the public mirror
within minutes of publishing a release:

```sh
gh api repos/Zuljita/DungeonsOnAutomaticSite/dispatches \
  --method POST \
  --field event_type=app_release_published \
  --raw-field client_payload='{"source_tag":"continuous","target_tag":"continuous"}'
```

In the source app repository, configure `DOA_SITE_MIRROR_DISPATCH_TOKEN` with
permission to create repository dispatch events in this public site repository.

During launch, the fallback schedule runs every 15 minutes. Dispatch and
scheduled runs fail visibly if `DOA_RELEASE_MIRROR_TOKEN` is missing or invalid
instead of silently succeeding with stale downloads.

Updater metadata matters: the mirror compares release assets and the
`latest*.yml` files used by Electron auto-update before deciding whether to
replace public assets.

## Public monster library

The monster library page (`monsters.html`) should read only public release or
site-hosted package JSON. It is the browsing surface: gallery, search, filters,
and the per-monster sheet. Package identity, source credits, licensing, and the
raw JSON download live on `monster-credits.html`, which reads the same index and
package files. Keep canonical monster data, schemas, conversion scripts, and
package validation in the private `Zuljita/DungeonsOnAutomaticMonsters`
repository. The site should link to and render released package metadata after a
public artifact exists; it should not point at private raw `main` URLs or become
the canonical monster-data store.

`data/monsters/index.json` is the public discovery pointer. Before release it reports
the review queue without exposing candidate records. After all records are approved,
the monster data repository's publish workflow creates a release asset, uploads art
to the `doa-assets` R2 bucket (served at `https://assets.dungeonsonautomatic.com`),
and dispatches `monster_package_published`; this repository validates the asset,
copies it to a versioned `data/monsters/packages/` path, updates the index, and the
deploy workflows publish it. Monster art is never committed to this repository.

Repository secrets used by that handoff:

- `DOA_SITE_MONSTER_DISPATCH_TOKEN` in the data repository can dispatch to this repository.
- `DOA_MONSTER_SOURCE_TOKEN` in this repository can read release assets from the data repository.
- `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` deploy this site to Cloudflare Pages.

## Hosting

The site deploys to Cloudflare Pages (`dungeonsonautomatic.pages.dev`, production
domain `dungeonsonautomatic.com`) via `.github/workflows/deploy.yml` on every push
to `main`. The legacy GitHub Pages workflow remains during the transition and can
be removed after DNS cutover.

## Blog authoring

Blog posts are Markdown files in `content/blog/*.md` with YAML frontmatter
(`title`, `date`, `author`, `tags`, `summary`). `npm run build` compiles them; the
deploy workflows run the build, so committing a Markdown post is all it takes to
publish. `npm test` verifies the Markdown serialization round-trips losslessly.

Each post gets its own page at `/blog/<slug>/`, which is its canonical URL. The
build writes four things, **all of them artifacts - edit the Markdown, never
these**:

- `blog/<slug>/index.html` - one static page per post, with its own title,
  description, OpenGraph tags, and JSON-LD so links unfurl and index properly.
- `blog.html` - the index, listing every post with its summary and a link.
- `data/blog.json` - the structured feed.
- `sitemap.xml` - see below.

`blog/` is deleted and regenerated on every build, so deleting a Markdown file
removes its page. Post pages use relative asset paths, so opening one from disk
works the same as serving it.

Posts previously lived at `blog.html#<slug>`. Those anchors still work: the index
carries a small script that forwards a known slug fragment to the post page.
Markup and styles are shared between the index and post pages via
`scripts/blog-render.mjs` and `blog.css`.

Markdown conventions beyond standard paragraphs, `###` headings, `-` lists, and
fenced code blocks:

- `> text` renders as a callout box.
- `![alt](src "caption")` renders a centered figure with optional caption.
- `[download: Label | filename.zip | 2.9 MB](https://url)` renders a download button.

A browser editor is available at `/admin` (Sveltia CMS). It authenticates through
the `doa-cms-auth` Cloudflare Worker (`https://doa-cms-auth.zuljita.workers.dev`)
using a GitHub OAuth app, and commits Markdown straight to `main`.

## Search engines

`scripts/build-sitemap.mjs` generates `sitemap.xml` as part of `npm run build`,
covering the top-level pages plus every blog post. It is an artifact - do not
edit it by hand.

Pages are discovered by scanning top-level `*.html`, so a new page is picked up
with no change to the script. Pages carrying a `refresh` meta or `noindex` are
skipped automatically, which is how `downloads.html` stays out. Blog posts carry
a `lastmod` from their frontmatter date; static pages deliberately do not, since
CI checks out shallow and neither git history nor file mtime survives the build.

`robots.txt` is a static file that points at the sitemap and disallows `/admin`.
Both live at the site root, which is where crawlers expect them.
