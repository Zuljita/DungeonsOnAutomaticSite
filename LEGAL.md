# Compliance Notes

Last reviewed: 2026-07-06

This repository is the public documentation, download, and launch-collateral site
for Dungeons on Automatic. It is not legal advice; it is the project checklist
for keeping public pages aligned with the Steve Jackson Games Online Policy and
the public/private repository split.

## Steve Jackson Games Online Policy

Reviewed source:

- https://www.sjgames.com/general/online_policy.html
- The issue-referenced URL, `https://www.sjgames.com/general/online_policy/`,
  returned a 404 on 2026-07-06.
- The live policy page says it was updated May 15, 2012.

Site implementation:

- Every top-level public HTML page carries a Steve Jackson Games notice block.
- The notice links to the GURPS page, Dungeon Fantasy Roleplaying Game page,
  Steve Jackson Games home page, and the Online Policy page.
- The notice says Dungeons on Automatic is original, unofficial, not endorsed by
  Steve Jackson Games, and released for free distribution and not resale.
- The notice avoids SJ Games logos, trade dress, and hosted SJ Games art.

Launch decision:

- Proactively contact Steve Jackson Games before a broad public launch if the app
  is distributed beyond a free desktop/table aid, if money changes hands, or if
  any installer/app-store/mobile distribution path is pursued. The Online Policy
  allows certain free fan pages and PC-style game aids, but it does not grant a
  commercial license.

## Monster Library Boundary

The public monster-library page is intentionally a release/discovery surface,
not the canonical data store.

- Canonical conversion data, schemas, provenance docs, and validation tools stay
  in the private `Zuljita/DungeonsOnAutomaticMonsters` repository.
- This site must link only public release assets or site-hosted JSON after a
  reviewed package exists.
- This site must not link private raw `main` URLs.
- Public monster records must include record-level source/license provenance,
  source copyright notice, conversion version, conversion notes, approved manual
  review status, and `publicStats: true`.
- Do not publish Steve Jackson Games book text, monster stat blocks, art, logos,
  or trade dress through this site.

Allowed public source bases for monster packages are tracked separately by
package provenance, such as SRD 5.1 CC-BY, 3.5-era OGL, GCS public data, and
DOA-authored metadata. Do not merge those into an ambiguous source bucket.

## Page Checklist

Before adding a new public page:

- Include the shared SJ Games notice block.
- Link user-facing DFRPG/GURPS mentions to official SJ Games pages when practical.
- Avoid copy that implies Steve Jackson Games endorsement, partnership, approval,
  certification, or official status.
- Keep release downloads and update metadata on public release assets.
- Keep the quickstart and known-issues links discoverable from downloads/release
  surfaces during launch week.
