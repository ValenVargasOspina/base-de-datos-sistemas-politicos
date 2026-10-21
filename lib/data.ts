// Server-side data access for the DPI2020 viewer.
//
// The generated dataset (data/dpi2020.generated.json) is ~15MB and must NEVER
// be shipped to the browser. This module reads it on the server only and
// exposes:
//   - loadMeta(): the small metadata artifact (counts, year range, columns).
//   - loadDataset(): the full in-memory dataset (server use only).
//   - getVariableSeries(column): a COMPACT projection (country, year, value)
//     for a single variable, safe to send to a client component. This is the
//     structure FEAT-004 charts consume; the client re-applies region/country/
//     year filtering with lib/filter on this compact series.
//
// Next 16 has Cache Components (PPR) enabled, so every async loader that reads
// from the filesystem during prerender uses the `'use cache'` directive (the
// data is static at build time).

import { readFile } from "node:fs/promises";
import { join } from "node:path";

export interface Meta {
  recordCount: number;
  countryCount: number;
  countries: string[];
  columns: string[];
  minYear: number;
  maxYear: number;
}

export interface DatasetRow {
  countryname: string;
  ifs: string;
  year: number;
  [column: string]: number | string | null;
}

/** A single compact observation for one variable. */
export interface SeriesPoint {
  countryname: string;
  year: number;
  value: number | string | null;
}

function dataPath(file: string): string {
  return join(process.cwd(), "data", file);
}

/** Load the small metadata artifact. */
export async function loadMeta(): Promise<Meta> {
  "use cache";
  const raw = await readFile(dataPath("meta.generated.json"), "utf8");
  return JSON.parse(raw) as Meta;
}

/**
 * Load the full dataset. SERVER-SIDE ONLY — do not pass the result wholesale to
 * a client component.
 */
export async function loadDataset(): Promise<DatasetRow[]> {
  "use cache";
  const raw = await readFile(dataPath("dpi2020.generated.json"), "utf8");
  return JSON.parse(raw) as DatasetRow[];
}

/**
 * Return a compact (country, year, value) series for one variable column,
 * suitable to send to the client. Only the three needed fields per row are
 * included, keeping the payload small (a single variable across 8200 rows is a
 * couple hundred KB at most, versus the 15MB full dataset).
 */
export async function getVariableSeries(
  column: string,
): Promise<SeriesPoint[]> {
  "use cache";
  const dataset = await loadDataset();
  return dataset.map((row) => ({
    countryname: row.countryname,
    year: row.year,
    value: (row[column] ?? null) as number | string | null,
  }));
}
