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
    { "code": "Preformatted / monospace block." },
    { "image": "assets/blog/your-slug/image.png", "alt": "alt text", "caption": "optional" },
    { "download": "https://github.com/Zuljita/DungeonsOnAutomaticSite/raw/main/assets/blog/your-slug/pack.zip", "label": "Download (.zip)", "filename": "pack.zip", "size": "1.2 MB" }
  ]
}
```

Notes:

- Posts are sorted newest-first by `date` (use `YYYY-MM-DD`).
- `slug` powers the permalink anchor (`blog.html#your-slug`); keep it unique.
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

During launch, the fallback schedule runs every 15 minutes. Manual or dispatch
runs fail if `DOA_RELEASE_MIRROR_TOKEN` is missing or invalid. Scheduled runs
create or update a visible repository issue named "Release mirror token needs
attention" instead of silently succeeding with stale downloads.

Updater metadata matters: the mirror compares release assets and the
`latest*.yml` files used by Electron auto-update before deciding whether to
replace public assets.

## Public monster library

The monster library page (`monsters.html`) should read only public release or
site-hosted package JSON. Keep canonical monster data, schemas, conversion
scripts, and package validation in the private `Zuljita/DungeonsOnAutomaticMonsters`
repository. The site should link to and render released package metadata after a
public artifact exists; it should not point at private raw `main` URLs or become
the canonical monster-data store.
