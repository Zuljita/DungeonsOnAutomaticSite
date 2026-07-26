const KINDS = new Set(["workbook_metadata", "srd", "gcs_public", "doa_authored", "fan_authorized"]);
const SYSTEMS = new Set(["srd_3_5", "srd_5_1", "gcs_public", "doa_fixture", "gurps_4e_fan_conversion"]);
const LICENSES = new Set(["ogl_1_0a", "cc_by_4_0", "gcs_public", "doa_authored", "author_permission"]);
const PRIVATE_DATA_URL = /(?:raw\.githubusercontent\.com|github\.com)\/Zuljita\/DungeonsOnAutomaticMonsters/i;

export function validatePublishedMonsterPackage(pkg) {
  const errors = [];
  if (!isRecord(pkg)) return ["package root must be an object"];
  requiredString(pkg.manifest?.id, "manifest.id", errors);
  requiredString(pkg.manifest?.name, "manifest.name", errors);
  requiredString(pkg.manifest?.version, "manifest.version", errors);
  requiredString(pkg.manifest?.licenseSummary, "manifest.licenseSummary", errors);
  requiredString(pkg.manifest?.sourceBook?.id, "manifest.sourceBook.id", errors);
  if (pkg.manifest?.sourceBook?.required !== false) errors.push("manifest.sourceBook.required must be false");
  if (pkg.manifest?.sourceBook?.derived !== true) errors.push("manifest.sourceBook.derived must be true");
  publicUrl(pkg.manifest?.packageUrl, "manifest.packageUrl", errors);
  publicUrl(pkg.manifest?.dataUrl, "manifest.dataUrl", errors);
  publicUrl(pkg.manifest?.art?.manifestUrl, "manifest.art.manifestUrl", errors);
  publicUrl(pkg.manifest?.art?.baseUrl, "manifest.art.baseUrl", errors);
  requiredString(pkg.manifest?.art?.generator, "manifest.art.generator", errors);
  requiredString(pkg.manifest?.art?.styleId, "manifest.art.styleId", errors);

  const sources = Array.isArray(pkg.manifest?.sources) ? pkg.manifest.sources : [];
  if (sources.length === 0) errors.push("manifest.sources must include at least one source");
  const sourceIds = new Set();
  for (const [index, source] of sources.entries()) {
    const path = `manifest.sources[${index}]`;
    requiredString(source?.id, `${path}.id`, errors);
    requiredString(source?.name, `${path}.name`, errors);
    requiredEnum(source?.sourceSystem, `${path}.sourceSystem`, SYSTEMS, errors);
    requiredEnum(source?.sourceLicense, `${path}.sourceLicense`, LICENSES, errors);
    publicUrl(source?.sourceUrl, `${path}.sourceUrl`, errors);
    requiredString(source?.sourceCopyrightNotice, `${path}.sourceCopyrightNotice`, errors);
    if (sourceIds.has(source?.id)) errors.push(`duplicate manifest source id ${source.id}`);
    sourceIds.add(source?.id);
  }

  const monsters = Array.isArray(pkg.monsters) ? pkg.monsters : [];
  if (monsters.length === 0) errors.push("monsters must include at least one record");
  const monsterIds = new Set();
  for (const [index, monster] of monsters.entries()) {
    const path = `monsters[${index}]`;
    requiredString(monster?.id, `${path}.id`, errors);
    requiredString(monster?.name, `${path}.name`, errors);
    if (monsterIds.has(monster?.id)) errors.push(`duplicate monster id ${monster.id}`);
    monsterIds.add(monster?.id);
    if (!isRecord(monster?.stats)) errors.push(`${path}.stats must be an object`);
    const provenance = monster?.provenance;
    requiredEnum(provenance?.kind, `${path}.provenance.kind`, KINDS, errors);
    requiredEnum(provenance?.sourceSystem, `${path}.provenance.sourceSystem`, SYSTEMS, errors);
    requiredEnum(provenance?.sourceLicense, `${path}.provenance.sourceLicense`, LICENSES, errors);
    requiredString(provenance?.sourceMonsterId, `${path}.provenance.sourceMonsterId`, errors);
    requiredString(provenance?.sourceName, `${path}.provenance.sourceName`, errors);
    publicUrl(provenance?.sourceUrl, `${path}.provenance.sourceUrl`, errors);
    requiredString(provenance?.sourceCopyrightNotice, `${path}.provenance.sourceCopyrightNotice`, errors);
    requiredString(provenance?.conversionVersion, `${path}.provenance.conversionVersion`, errors);
    if (!Array.isArray(provenance?.conversionNotes)) errors.push(`${path}.provenance.conversionNotes must be an array`);
    if (provenance?.manualReviewStatus !== "approved") errors.push(`${path}.provenance.manualReviewStatus must be approved`);
    if (provenance?.publicStats !== true) errors.push(`${path}.provenance.publicStats must be true`);
    if (!sourceIds.has(provenance?.packageSourceId)) errors.push(`${path}.provenance.packageSourceId must reference manifest.sources`);
    validateMonsterArt(monster?.art, `${path}.art`, errors);
  }
  if (pkg.manifest?.art?.portraitCount !== monsters.length) errors.push("manifest.art.portraitCount must match monsters.length");
  if (pkg.manifest?.art?.tokenCount !== monsters.length) errors.push("manifest.art.tokenCount must match monsters.length");
  if (pkg.manifest?.art?.hexTokenCount !== monsters.length) errors.push("manifest.art.hexTokenCount must match monsters.length");
  return errors;
}

// Art is hosted on the R2-backed assets domain, not in this repository.
// Validation checks that every art URL sits under the expected base.
const PUBLIC_ART_ORIGIN = "https://assets.dungeonsonautomatic.com";
const PUBLIC_ART_PREFIX = "/monsters/";

export function validatePublishedMonsterArtFiles(pkg) {
  const errors = [];
  for (const [index, monster] of (pkg.monsters ?? []).entries()) {
    for (const assetType of ["portrait", "token", "hexToken"]) {
      const url = monster?.art?.[assetType]?.url;
      if (typeof url !== "string") continue;
      try {
        const parsed = new URL(url);
        if (parsed.origin !== PUBLIC_ART_ORIGIN || !parsed.pathname.startsWith(PUBLIC_ART_PREFIX)) {
          errors.push(`monsters[${index}].art.${assetType}.url must be under ${PUBLIC_ART_ORIGIN}${PUBLIC_ART_PREFIX}`);
        }
      } catch {
        errors.push(`monsters[${index}].art.${assetType}.url is invalid`);
      }
    }
  }
  return errors;
}

function validateMonsterArt(art, path, errors) {
  if (!isRecord(art)) {
    errors.push(`${path} must be an object`);
    return;
  }
  if (art.kind !== "ai_generated") errors.push(`${path}.kind must be ai_generated`);
  requiredString(art.generator, `${path}.generator`, errors);
  requiredString(art.styleId, `${path}.styleId`, errors);
  validateArtAsset(art.portrait, `${path}.portrait`, errors, false);
  validateArtAsset(art.token, `${path}.token`, errors, true);
  validateArtAsset(art.hexToken, `${path}.hexToken`, errors, true, true);
}

function validateArtAsset(asset, path, errors, token, hexToken = false) {
  if (!isRecord(asset)) {
    errors.push(`${path} must be an object`);
    return;
  }
  publicUrl(asset.url, `${path}.url`, errors);
  requiredString(asset.alt, `${path}.alt`, errors);
  if (asset.mediaType !== "image/png") errors.push(`${path}.mediaType must be image/png`);
  if (!Number.isInteger(asset.width) || asset.width < 1) errors.push(`${path}.width must be a positive integer`);
  if (!Number.isInteger(asset.height) || asset.height < 1) errors.push(`${path}.height must be a positive integer`);
  if (!/^[0-9a-f]{64}$/.test(asset.promptSha256 ?? "")) errors.push(`${path}.promptSha256 must be sha256 hex`);
  if (token) {
    if (asset.view !== "top_down") errors.push(`${path}.view must be top_down`);
    if (asset.grid !== "flat_top_hex") errors.push(`${path}.grid must be flat_top_hex`);
    if (asset.transparent !== true) errors.push(`${path}.transparent must be true`);
    requiredString(asset.footprint, `${path}.footprint`, errors);
  }
  if (hexToken) {
    if (asset.shape !== "flat_top_hex") errors.push(`${path}.shape must be flat_top_hex`);
    if (asset.derivedFrom !== "token") errors.push(`${path}.derivedFrom must be token`);
    requiredString(asset.derivationStyleId, `${path}.derivationStyleId`, errors);
  }
}

function requiredString(value, path, errors) {
  if (typeof value !== "string" || value.trim() === "") errors.push(`${path} must be a non-empty string`);
}

function requiredEnum(value, path, allowed, errors) {
  requiredString(value, path, errors);
  if (typeof value === "string" && !allowed.has(value)) errors.push(`${path} has unsupported value ${value}`);
}

function publicUrl(value, path, errors) {
  requiredString(value, path, errors);
  if (typeof value !== "string" || value.trim() === "") return;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") errors.push(`${path} must use https`);
    if (PRIVATE_DATA_URL.test(value)) errors.push(`${path} must not expose the private data repository`);
  } catch {
    errors.push(`${path} must be an absolute URL`);
  }
}

function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
