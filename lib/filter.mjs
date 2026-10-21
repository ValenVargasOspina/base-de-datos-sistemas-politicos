// Pure filtering selector for the DPI2020 viewer. Given the dataset rows and a
// filter state (selected regions, selected countries, a year or year range and
// a variable column), it returns the subset of rows that match, projected to
// the identifier fields plus the chosen variable.
//
// Framework-free (.mjs) so the Next.js app and Vitest can both import it. All
// logic here is deterministic and side-effect free so it is easy to unit test.

import { getRegion } from "./regions.mjs";

/**
 * @typedef {Object} DataRow
 * @property {string} countryname
 * @property {string} ifs
 * @property {number} year
 * @property {Record<string, number|string|null>} [rest] Remaining 126 columns.
 */

/**
 * @typedef {Object} FilterState
 * @property {string[]} [regions]   Selected region labels (empty/undefined = all regions).
 * @property {string[]} [countries] Selected dataset country keys (empty/undefined = all countries).
 * @property {number} [yearMin]     Lower bound of the year range (inclusive).
 * @property {number} [yearMax]     Upper bound of the year range (inclusive).
 * @property {string} [variable]    Variable column to project (optional).
 */

/**
 * Resolve the effective set of allowed country keys from the region and country
 * selections. Regions act as a coarse filter over the country universe; an
 * explicit country selection further narrows it (intersection). When neither is
 * set, every country is allowed.
 *
 * @param {string[]} allCountries The full dataset country universe.
 * @param {string[]|undefined} regions Selected region labels.
 * @param {string[]|undefined} countries Selected country keys.
 * @returns {Set<string>} Allowed country keys.
 */
export function resolveAllowedCountries(allCountries, regions, countries) {
  const hasRegions = Array.isArray(regions) && regions.length > 0;
  const hasCountries = Array.isArray(countries) && countries.length > 0;

  const regionSet = hasRegions ? new Set(regions) : null;
  const countrySet = hasCountries ? new Set(countries) : null;

  const allowed = new Set();
  for (const name of allCountries) {
    if (regionSet && !regionSet.has(getRegion(name))) continue;
    if (countrySet && !countrySet.has(name)) continue;
    allowed.add(name);
  }
  return allowed;
}

/**
 * Apply region -> country -> year filters to the rows and return the matching
 * records. When `variable` is provided each returned record is projected to the
 * identifier fields (countryname, ifs, year) plus a `value` field holding that
 * variable's raw value; otherwise the full row is returned unchanged.
 *
 * @param {DataRow[]} rows        The full dataset (array of row objects).
 * @param {FilterState} state     The active filter state.
 * @param {string[]} [allCountries] Optional country universe used for region
 *   resolution; defaults to the distinct countries present in `rows`.
 * @returns {Array<Object>} The filtered (and optionally projected) records.
 */
export function selectRows(rows, state = {}, allCountries) {
  const { regions, countries, yearMin, yearMax, variable } = state;

  const universe =
    allCountries ?? [...new Set(rows.map((r) => r.countryname))];
  const allowed = resolveAllowedCountries(universe, regions, countries);

  const min = typeof yearMin === "number" ? yearMin : -Infinity;
  const max = typeof yearMax === "number" ? yearMax : Infinity;

  const result = [];
  for (const row of rows) {
    if (!allowed.has(row.countryname)) continue;
    if (row.year < min || row.year > max) continue;

    if (variable) {
      result.push({
        countryname: row.countryname,
        ifs: row.ifs,
        year: row.year,
        region: getRegion(row.countryname),
        value: row[variable] ?? null,
      });
    } else {
      result.push(row);
    }
  }
  return result;
}

/**
 * Count the distinct countries present after applying the filter. Useful for
 * empty-state messaging in the UI.
 * @param {DataRow[]} rows
 * @param {FilterState} state
 * @param {string[]} [allCountries]
 * @returns {number}
 */
export function countSelectedCountries(rows, state = {}, allCountries) {
  const selected = selectRows(rows, state, allCountries);
  return new Set(selected.map((r) => r.countryname)).size;
}
