import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { validatePublishedMonsterPackage } from "./monster-package-contract.mjs";

const index = JSON.parse(readFileSync(resolve("data/monsters/index.json"), "utf8"));
if (index.schemaVersion !== 1) throw new Error("data/monsters/index.json must use schemaVersion 1.");
if (!index.candidate || typeof index.candidate.recordCount !== "number") {
  throw new Error("Monster index must describe the review candidate.");
}

if (index.latest) {
  const packagePath = resolve("data/monsters", index.latest.path);
  if (!existsSync(packagePath)) throw new Error(`Published package is missing: ${index.latest.path}`);
  const serialized = readFileSync(packagePath, "utf8");
  const pkg = JSON.parse(serialized);
  const errors = validatePublishedMonsterPackage(pkg);
  if (errors.length > 0) throw new Error(errors.join("\n"));
  const sha256 = createHash("sha256").update(serialized).digest("hex");
  if (sha256 !== index.latest.sha256) throw new Error("Published package checksum does not match index.json.");
  if (pkg.monsters.length !== index.latest.monsterCount) throw new Error("Published package count does not match index.json.");
}

const authorPermissionFixture = {
  manifest: {
    id: "enraged-eggplant-monsters",
    name: "Enraged Eggplant Monster Library",
    version: "0.2.0",
    sourceBook: { id: "enraged_eggplant_monsters_2024_05_11", name: "Enraged Eggplant Monsters", required: false, derived: true },
    licenseSummary: "Fan-authored GURPS monster statistics published with author permission.",
    packageUrl: "https://dungeonsonautomatic.com/monsters.html",
    dataUrl: "https://dungeonsonautomatic.com/data/monsters/packages/enraged-eggplant-0.2.0.json",
    art: {
      manifestUrl: "https://assets.dungeonsonautomatic.com/monsters/enraged-eggplant/image-manifest.json",
      baseUrl: "https://assets.dungeonsonautomatic.com/monsters/enraged-eggplant",
      generator: "OpenAI image generation",
      styleId: "doa-dark-fantasy-bestiary-v1",
      portraitCount: 1,
      tokenCount: 1,
      hexTokenCount: 1,
    },
    sources: [{
      id: "enraged_eggplant_author_permission",
      name: "Enraged Eggplant GURPS Monster Conversions",
      sourceSystem: "gurps_4e_fan_conversion",
      sourceLicense: "author_permission",
      sourceUrl: "https://dungeonsonautomatic.com/data/monsters/enraged-eggplant-permission.txt",
      sourceCopyrightNotice: "Enraged Eggplant GURPS monster conversions; used with permission.",
    }],
  },
  monsters: [{
    id: "enraged_eggplant_fixture",
    name: "Authorized Fixture",
    stats: {},
    art: {
      kind: "ai_generated",
      generator: "OpenAI image generation",
      styleId: "doa-dark-fantasy-bestiary-v1",
      portrait: {
        url: "https://assets.dungeonsonautomatic.com/monsters/enraged-eggplant/portraits/enraged_eggplant_fixture.png",
        alt: "Authorized Fixture bestiary portrait",
        mediaType: "image/png",
        width: 1024,
        height: 1024,
        promptSha256: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
      },
      token: {
        url: "https://assets.dungeonsonautomatic.com/monsters/enraged-eggplant/tokens/enraged_eggplant_fixture.png",
        alt: "Authorized Fixture top-down encounter token",
        mediaType: "image/png",
        width: 1024,
        height: 1024,
        view: "top_down",
        grid: "flat_top_hex",
        transparent: true,
        footprint: "1 hex",
        promptSha256: "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"
      },
      hexToken: {
        url: "https://assets.dungeonsonautomatic.com/monsters/enraged-eggplant/hex-tokens/enraged_eggplant_fixture.png",
        alt: "Authorized Fixture top-down flat-top hex token",
        mediaType: "image/png",
        width: 1024,
        height: 1024,
        view: "top_down",
        grid: "flat_top_hex",
        shape: "flat_top_hex",
        transparent: true,
        footprint: "1 hex",
        promptSha256: "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
        derivedFrom: "token",
        derivationStyleId: "doa-flat-top-hex-v1"
      }
    },
    provenance: {
      kind: "fan_authorized",
      sourceSystem: "gurps_4e_fan_conversion",
      sourceLicense: "author_permission",
      sourceMonsterId: "authorized-fixture",
      sourceName: "Authorized Fixture",
      sourceUrl: "https://dungeonsonautomatic.com/data/monsters/enraged-eggplant-permission.txt",
      sourceCopyrightNotice: "Enraged Eggplant GURPS monster conversions; used with permission.",
      conversionVersion: "0.2.0",
      conversionNotes: [],
      manualReviewStatus: "approved",
      packageSourceId: "enraged_eggplant_author_permission",
      publicStats: true,
    },
  }],
};
if (validatePublishedMonsterPackage(authorPermissionFixture).length > 0) {
  throw new Error("Author-permission package fixture should be publishable.");
}
const unapprovedFixture = structuredClone(authorPermissionFixture);
unapprovedFixture.monsters[0].provenance.manualReviewStatus = "review_required";
if (!validatePublishedMonsterPackage(unapprovedFixture).some(error => error.includes("must be approved"))) {
  throw new Error("Review-required records must be rejected by the public site.");
}
const privateUrlFixture = structuredClone(authorPermissionFixture);
privateUrlFixture.monsters[0].provenance.sourceUrl = "https://github.com/Zuljita/DungeonsOnAutomaticMonsters/blob/main/private.json";
if (!validatePublishedMonsterPackage(privateUrlFixture).some(error => error.includes("private data repository"))) {
  throw new Error("Private data-repository URLs must be rejected by the public site.");
}

console.log(`Validated monster library index (${index.status}, ${index.candidate.recordCount} candidates).`);
