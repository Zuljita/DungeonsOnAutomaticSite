# Dungeons on Automatic Site

Public marketing, manual, and release-note site for
[Dungeons on Automatic](https://github.com/Zuljita/DungeonsOnAutomatic).

This repository is intentionally static. It can stay public while the application
source repository moves private, giving users a stable place to find:

- product overview and launch links
- user manual and troubleshooting notes
- public release notes and known issues
- brand assets and prototype UI references

## GitHub Pages

The included workflow publishes the repository root to GitHub Pages whenever
`main` changes. After the repository exists on GitHub, enable Pages with
**Settings -> Pages -> Source -> GitHub Actions**.

Expected URL:

```text
https://zuljita.github.io/DungeonsOnAutomaticSite/
```

## Local preview

Open `index.html` directly, or serve the folder with any static file server.
No build step is required.

## Public/private split

Once `Zuljita/DungeonsOnAutomatic` is private, update this site to point launch,
download, and support links at the chosen public distribution path rather than
the source repository.
