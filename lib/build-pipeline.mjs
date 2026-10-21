// Pure, framework-free helpers for the DPI2020 build-time data pipeline.
//
// These are extracted from scripts/build-data.mjs so the header/column-count
// validation, row projection and year-range guard can be unit-tested with a
// tiny in-memory matrix fixture (no dependency on the real 4.3MB workbook).
// The script wires xlsx -> matrix -> these helpers; the tests feed a matrix
// directly, so a regression in the parse contract fails `npm test`.

import { serialToYear, normalizeValue } from "./transform.mjs";

/** Number of columns the DPI2020 sheet is expected to have. */
export const EXPECTED_COLUMN_COUNT = 129;

/**
 * Validate and normalize the header row.
 *
 * @param {unknown[]} headerRow Raw first row of the sheet matrix.
 * @returns {{ header: string[], yearIdx: number, countryIdx: number, ifsIdx: number }}
 * @throws if the column count is wrong or a required identifier is missing.
 */
export function parseHeader(headerRow) {
  if (!Array.isArray(headerRow) || headerRow.length === 0) {
    throw new Error("[build-data] header row is empty");
  }
  const header = headerRow.map((h) => String(h).trim());
  if (header.length !== EXPECTED_COLUMN_COUNT) {
    throw new Error(
      `[build-data] expected ${EXPECTED_COLUMN_COUNT} columns, found ${header.length}`,
    );
  }
  const yearIdx = header.indexOf("year");
  const countryIdx = header.indexOf("countryname");
  const ifsIdx = header.indexOf("ifs");
  if (yearIdx === -1 || countryIdx === -1 || ifsIdx === -1) {
    throw new Error(
      "[build-data] missing required columns countryname/ifs/year",
    );
  }
  return { header, yearIdx, countryIdx, ifsIdx };
}

/** Whether a raw matrix row is entirely empty (undefined/null/blank cells). */
export function isEmptyRow(row) {
  return (
    !row || row.every((c) => c === undefined || c === null || c === "")
  );
}

/**
 * Project a single raw matrix row to a normalized record object keyed by the
 * header columns. `year` is converted from an Excel serial, `countryname`/`ifs`
 * are carried through as trimmed strings, and every other cell goes through
 * `normalizeValue` (so -999 / 'NA' / blank -> null while real zeros survive).
 *
 * @param {unknown[]} row Raw matrix row.
 * @param {{ header: string[], yearIdx: number, countryIdx: number, ifsIdx: number }} ctx
 * @returns {Record<string, number|string|null>}
 */
export function projectRow(row, ctx) {
  const { header, yearIdx, countryIdx, ifsIdx } = ctx;
  const obj = {};
  for (let c = 0; c < header.length; c++) {
    const key = header[c];
    const raw = row[c];

    if (c === yearIdx) {
      obj[key] =
        raw === undefined || raw === null || raw === ""
          ? null
          : serialToYear(raw);
      continue;
    }
    if (c === countryIdx || c === ifsIdx) {
      obj[key] =
        raw === undefined || raw === null ? null : String(raw).trim();
      continue;
    }
    obj[key] = normalizeValue(raw);
  }
  return obj;
}

/**
 * Project all data rows of a sheet matrix (header + rows) into records,
 * skipping fully-empty trailing rows.
 *
 * @param {unknown[][]} matrix Sheet as an array of rows (row 0 = header).
 * @returns {{ header: string[], records: Record<string, number|string|null>[] }}
 */
export function projectMatrix(matrix) {
  if (!Array.isArray(matrix) || matrix.length === 0) {
    throw new Error("[build-data] sheet is empty");
  }
  const ctx = parseHeader(matrix[0]);
  const records = [];
  for (let r = 1; r < matrix.length; r++) {
    const row = matrix[r];
    if (isEmptyRow(row)) continue;
    records.push(projectRow(row, ctx));
  }
  return { header: ctx.header, records };
}

/**
 * Validate the parsed year range so a broken Excel-serial conversion fails the
 * build loudly instead of shipping wrong years.
 *
 * @param {Record<string, number|string|null>[]} records
 * @returns {{ minYear: number, maxYear: number }}
 */
export function validateYearRange(records) {
  const years = records
    .map((rec) => rec.year)
    .filter((y) => typeof y === "number" && Number.isFinite(y));
  if (!years.length) {
    throw new Error("[build-data] no valid years parsed");
  }
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  if (minYear < 1974 || minYear > 1976) {
    throw new Error(
      `[build-data] unexpected min year ${minYear} (expected ~1975); year parse likely wrong`,
    );
  }
  if (maxYear < 2019 || maxYear > 2021) {
    throw new Error(
      `[build-data] unexpected max year ${maxYear} (expected ~2020); year parse likely wrong`,
    );
  }
  return { minYear, maxYear };
}

/**
 * Build the distinct, Spanish-collated country list from parsed records.
 *
 * @param {Record<string, number|string|null>[]} records
 * @returns {string[]}
 */
export function collectCountries(records) {
  const countrySet = new Set();
  for (const rec of records) {
    if (rec.countryname) countrySet.add(rec.countryname);
  }
  return [...countrySet].sort((a, b) =>
    a.localeCompare(b, "es", { sensitivity: "base" }),
  );
}
