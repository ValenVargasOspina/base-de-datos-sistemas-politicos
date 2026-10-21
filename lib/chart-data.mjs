// Pure, framework-free chart-data builders for the DPI2020 viewer (FEAT-004).
// These transform the already-filtered + projected rows (ProjectedRow:
// { countryname, ifs, year, region, value }) into the shapes recharts needs,
// without importing React or recharts, so Vitest can unit-test them directly.
//
// Design rules enforced here:
//   - null values (former -999 / 'NA') are GAPS, never zeros. A missing value
//     is emitted as `null` so recharts renders a break in the line.
//   - region aggregation (mean) EXCLUDES nulls from both numerator and count.
//   - categorical "share" computes the proportion of each legend category per
//     group and the shares within a group sum to ~1 (nulls excluded).

import { getRegion, getDisplayName } from "./regions.mjs";

/**
 * @typedef {Object} ProjectedRow
 * @property {string} countryname
 * @property {string} [ifs]
 * @property {number} year
 * @property {string} [region]
 * @property {number|string|null} value
 */

/**
 * Coerce a projected value to a finite number, or null when it is missing /
 * non-numeric. Real zeros are preserved.
 * @param {number|string|null|undefined} value
 * @returns {number|null}
 */
export function toNumber(value) {
  if (value === null || value === undefined || value === "") return null;
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : null;
}

/**
 * Distinct, ascending list of years present in the rows.
 * @param {ProjectedRow[]} rows
 * @returns {number[]}
 */
export function distinctYears(rows) {
  return [...new Set(rows.map((r) => r.year))].sort((a, b) => a - b);
}

/**
 * Build a time-series dataset for a LineChart: one row per year, with one key
 * per group (country or region). Missing observations are emitted as `null`
 * (gaps), never zeros. When grouping by region the value is the MEAN of the
 * group's member values for that year (nulls excluded).
 *
 * @param {ProjectedRow[]} rows   Filtered + projected rows for one variable.
 * @param {Object} [options]
 * @param {'country'|'region'} [options.groupBy='country'] Series grouping.
 * @returns {{
 *   series: { key: string, label: string }[],
 *   data: Array<Record<string, number|null>>,
 * }}
 *   `series` lists the group keys + Spanish labels (for the legend); `data` is
 *   the recharts-ready array ([{ year, <key>: value|null, ... }, ...]).
 */
export function buildTimeSeries(rows, options = {}) {
  const groupBy = options.groupBy ?? "country";
  const years = distinctYears(rows);

  // group key -> label
  /** @type {Map<string, string>} */
  const groups = new Map();
  // `${groupKey}|${year}` -> { sum, count }
  /** @type {Map<string, { sum: number, count: number }>} */
  const buckets = new Map();

  for (const row of rows) {
    const key =
      groupBy === "region"
        ? row.region ?? getRegion(row.countryname)
        : row.countryname;
    if (!groups.has(key)) {
      groups.set(
        key,
        groupBy === "region" ? key : getDisplayName(row.countryname),
      );
    }
    const num = toNumber(row.value);
    if (num === null) continue; // null is a gap, excluded from the mean
    const bucketKey = `${key}|${row.year}`;
    const bucket = buckets.get(bucketKey) ?? { sum: 0, count: 0 };
    bucket.sum += num;
    bucket.count += 1;
    buckets.set(bucketKey, bucket);
  }

  const series = [...groups.entries()].map(([key, label]) => ({ key, label }));

  const data = years.map((year) => {
    /** @type {Record<string, number|null>} */
    const point = { year };
    for (const { key } of series) {
      const bucket = buckets.get(`${key}|${year}`);
      // No observation for this group/year -> null gap (NOT zero).
      point[key] = bucket && bucket.count > 0 ? bucket.sum / bucket.count : null;
    }
    return point;
  });

  return { series, data };
}

/**
 * Pick the latest year that has at least one non-null observation, so the
 * comparison chart does not default to an all-gaps year.
 * @param {ProjectedRow[]} rows
 * @returns {number|null}
 */
export function latestYearWithData(rows) {
  let latest = null;
  for (const row of rows) {
    if (toNumber(row.value) === null) continue;
    if (latest === null || row.year > latest) latest = row.year;
  }
  return latest;
}

/**
 * Build a comparison (bar) dataset of the MEAN of a continuous variable per
 * group (country or region) for a given year. Nulls are excluded from the mean;
 * groups with no data for the year are omitted.
 *
 * @param {ProjectedRow[]} rows
 * @param {Object} [options]
 * @param {'country'|'region'} [options.groupBy='country']
 * @param {number} [options.year] Restrict to this year; omit to use all rows.
 * @returns {{ key: string, label: string, value: number, count: number }[]}
 */
export function buildContinuousComparison(rows, options = {}) {
  const groupBy = options.groupBy ?? "country";
  const year = options.year;

  /** @type {Map<string, { label: string, sum: number, count: number }>} */
  const agg = new Map();

  for (const row of rows) {
    if (typeof year === "number" && row.year !== year) continue;
    const key =
      groupBy === "region"
        ? row.region ?? getRegion(row.countryname)
        : row.countryname;
    const label =
      groupBy === "region" ? key : getDisplayName(row.countryname);
    const entry = agg.get(key) ?? { label, sum: 0, count: 0 };
    const num = toNumber(row.value);
    if (num !== null) {
      entry.sum += num;
      entry.count += 1;
    }
    agg.set(key, entry);
  }

  return [...agg.entries()]
    .filter(([, e]) => e.count > 0)
    .map(([key, e]) => ({
      key,
      label: e.label,
      value: e.sum / e.count,
      count: e.count,
    }));
}

/**
 * Build a categorical distribution ("share") per group (country or region):
 * for each group, the proportion of observations in each legend category. Nulls
 * are excluded from the denominator, so the shares within a group sum to ~1
 * (unless the group has zero non-null observations, in which case it is
 * omitted).
 *
 * The returned `data` is recharts-ready for a stacked bar chart: one row per
 * group, with one key per legend category holding that category's share.
 *
 * @param {ProjectedRow[]} rows
 * @param {Record<string,string>} legend Code -> Spanish label.
 * @param {Object} [options]
 * @param {'country'|'region'} [options.groupBy='region']
 * @param {number} [options.year] Restrict to this year; omit to use all rows.
 * @returns {{
 *   categories: { code: string, label: string }[],
 *   data: Array<Record<string, number|string>>,
 * }}
 */
export function buildCategoricalShare(rows, legend, options = {}) {
  const groupBy = options.groupBy ?? "region";
  const year = options.year;

  const categories = Object.entries(legend)
    .filter(([code]) => code !== "null")
    .map(([code, label]) => ({ code, label }));
  const codeSet = new Set(categories.map((c) => c.code));

  // group key -> { label, counts: Map<code, n>, total }
  /** @type {Map<string, { label: string, counts: Map<string, number>, total: number }>} */
  const groups = new Map();

  for (const row of rows) {
    if (typeof year === "number" && row.year !== year) continue;
    const num = toNumber(row.value);
    if (num === null) continue; // nulls excluded from the denominator
    const code = String(num);
    if (!codeSet.has(code)) continue; // value outside the legend -> skip
    const key =
      groupBy === "region"
        ? row.region ?? getRegion(row.countryname)
        : row.countryname;
    const label =
      groupBy === "region" ? key : getDisplayName(row.countryname);
    const entry = groups.get(key) ?? {
      label,
      counts: new Map(),
      total: 0,
    };
    entry.counts.set(code, (entry.counts.get(code) ?? 0) + 1);
    entry.total += 1;
    groups.set(key, entry);
  }

  const data = [...groups.entries()]
    .filter(([, g]) => g.total > 0)
    .map(([key, g]) => {
      /** @type {Record<string, number|string>} */
      const point = { group: key, label: g.label };
      for (const { code } of categories) {
        point[code] = (g.counts.get(code) ?? 0) / g.total;
      }
      return point;
    });

  return { categories, data };
}
