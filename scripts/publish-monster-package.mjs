import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, resolve } from "node:path";
import { validatePublishedMonsterArtFiles, validatePublishedMonsterPackage } from "./monster-package-contract.mjs";

const input = process.argv[2];
if (!input) throw new Error("Usage: node scripts/publish-monster-package.mjs <package.json>");

const pkg = JSON.parse(readFileSync(resolve(input), "utf8"));
const errors = validatePublishedMonsterPackage(pkg);
if (errors.length > 0) throw new Error(`Package is not publishable:\n${errors.join("\n")}`);
const artErrors = validatePublishedMonsterArtFiles(pkg);
if (artErrors.length > 0) throw new Error(`Package art is not publishable:\n${artErrors.join("\n")}`);
if (pkg.manifest.id !== "enraged-eggplant-monsters") {
  throw new Error(`Unexpected package id ${pkg.manifest.id}; expected enraged-eggplant-monsters.`);
}
if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(pkg.manifest.version)) {
  throw new Error(`Unsafe package version ${pkg.manifest.version}.`);
}

const relativePath = `packages/enraged-eggplant-${pkg.manifest.version}.json`;
const output = resolve("data/monsters", relativePath);
const serialized = `${JSON.stringify(pkg, null, 2)}\n`;
const sha256 = createHash("sha256").update(serialized).digest("hex");
mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, serialized, "utf8");

const indexPath = resolve("data/monsters/index.json");
const index = JSON.parse(readFileSync(indexPath, "utf8"));
index.status = "released";
index.candidate = {
  ...index.candidate,
  candidateVersion: pkg.manifest.version,
  recordCount: pkg.monsters.length,
  approvedCount: pkg.monsters.length,
  reviewRequiredCount: 0,
};
index.latest = {
  id: pkg.manifest.id,
  name: pkg.manifest.name,
  version: pkg.manifest.version,
  path: relativePath,
  fileName: basename(output),
  sha256,
  monsterCount: pkg.monsters.length,
  art: {
    manifestUrl: pkg.manifest.art.manifestUrl,
    portraitCount: pkg.manifest.art.portraitCount,
    tokenCount: pkg.manifest.art.tokenCount,
    hexTokenCount: pkg.manifest.art.hexTokenCount,
  },
  publishedAt: process.env.SOURCE_PUBLISHED_AT ?? new Date().toISOString(),
};
writeFileSync(indexPath, `${JSON.stringify(index, null, 2)}\n`, "utf8");

console.log(`Published ${pkg.manifest.name} ${pkg.manifest.version} with ${pkg.monsters.length} records.`);
