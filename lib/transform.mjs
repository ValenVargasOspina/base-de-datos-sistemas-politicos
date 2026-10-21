// Pure transform helpers for the DPI2020 build-time data pipeline.
// These are deliberately framework-free so both scripts/build-data.mjs and the
// Vitest unit tests can import them directly.

/**
 * Convert an Excel serial date number to a calendar year integer.
 *
 * The DPI2020 `year` column is stored as an Excel serial date (days since the
 * 1900 date system epoch). Example: 27395 -> 1975, 43831 -> 2020.
 *
 * If the value already looks like a plausible calendar year (1900-2100) it is
 * returned as-is. Otherwise it is treated as an Excel serial and converted.
 *
 * @param {number} value Excel serial date number or an already-plain year.
 * @returns {number} Calendar year integer.
 */
export function serialToYear(value) {
  const num = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(num)) {
    throw new Error(`serialToYear: non-numeric value ${JSON.stringify(value)}`);
  }
  // Already a plain calendar year.
  if (num >= 1900 && num <= 2100) {
    return Math.trunc(num);
  }
  // Excel serial date -> JS Date. 25569 = days between 1899-12-30 and 1970-01-01.
  const year = new Date((num - 25569) * 86400 * 1000).getUTCFullYear();
  return year;
}

/**
 * Normalize a raw cell value to its canonical form.
 *
 * Rules:
 *  - numeric -999 -> null (DPI sentinel for missing)
 *  - string 'NA' (case-insensitive, trimmed) -> null
 *  - empty / whitespace-only string -> null
 *  - null / undefined -> null
 *  - a real numeric 0 is PRESERVED as 0 (binary yes/no vars, EXECRLC '0=no info', etc.)
 *  - other numbers are returned as numbers
 *  - other strings are trimmed and returned as strings
 *
 * @param {*} value Raw cell value.
 * @returns {number|string|null} Normalized value.
 */
export function normalizeValue(value) {
  if (value === null || value === undefined) {
    return null;
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      return null;
    }
    if (value === -999) {
      return null;
    }
    return value;
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed === "") {
      return null;
    }
    if (trimmed.toLowerCase() === "na") {
      return null;
    }
    // A numeric string that is exactly the -999 sentinel.
    if (trimmed === "-999") {
      return null;
    }
    return trimmed;
  }
  // Booleans or anything else: coerce booleans to numbers, else stringify.
  if (typeof value === "boolean") {
    return value ? 1 : 0;
  }
  return String(value);
}
