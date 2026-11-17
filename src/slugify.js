/**
 * Convert a string into a URL-friendly slug.
 *
 * Normalizes Unicode (NFKD + strip diacritics), lowercases, replaces
 * whitespace/underscores with hyphens, removes other special characters,
 * collapses consecutive hyphens, and trims leading/trailing hyphens.
 *
 * @param {string} text Text to slugify
 * @returns {string} The slug ("" for empty input)
 * @throws {TypeError} if text is not a string
 *
 * @example
 * slugify("Hello World!"); // "hello-world"
 * slugify("Café  Crème!"); // "cafe-creme"
 */
export function slugify(text) {
  if (typeof text !== "string") {
    throw new TypeError(`Expected a string, got ${typeof text}`);
  }

  return text
    // Decompose accented characters into base letter + combining mark
    .normalize("NFKD")
    // Strip combining marks (accents, diacritics)
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .trim()
    // Remove everything that is not a letter, digit, space, hyphen or underscore
    .replace(/[^a-z0-9\s_-]/g, "")
    // Collapse spaces/underscores/hyphen runs into a single hyphen
    .replace(/[\s_-]+/g, "-")
    // Trim leading/trailing hyphens
    .replace(/^-+|-+$/g, "");
}
