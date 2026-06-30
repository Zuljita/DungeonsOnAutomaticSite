# Dungeons on Automatic Site

Public marketing, manual, and release-note site for
[Dungeons on Automatic](https://github.com/Zuljita/DungeonsOnAutomatic).

This repository is intentionally static. It can stay public while the application
source repository moves private, giving users a stable place to find:

- product overview and launch links
- user manual and troubleshooting notes
- public release notes, mirrored app downloads, and known issues
- brand assets and public product documentation

## Adding a blog post

The blog (`blog.html`) is data-driven and needs no build step. To publish a
post, add one entry to the array in `data/blog.json` and commit.

Each post is a JSON object:

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
    { "code": "Preformatted / monospace block." }
  ]
}
```

Notes:

- Posts are sorted newest-first by `date` (use `YYYY-MM-DD`).
- `slug` powers the permalink anchor (`blog.html#your-slug`); keep it unique.
- `body` items render in order; mix strings and the object block types above.
- Body text is inserted as plain text, so no HTML escaping is required.

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

## Mirroring app releases

The `Mirror App Release Downloads` workflow copies assets from
`Zuljita/DungeonsOnAutomatic` into this public repository's `continuous` release.
The downloads page links to those stable public asset URLs, so routine release
updates should not require editing the page.

Before the source repository goes private, add a repository secret named
`DOA_RELEASE_MIRROR_TOKEN` with read access to `Zuljita/DungeonsOnAutomatic`.
The scheduled workflow uses that token to read the private release and the
standard `GITHUB_TOKEN` to publish mirrored assets here.
