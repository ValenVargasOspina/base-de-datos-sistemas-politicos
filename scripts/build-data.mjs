// Build-time data pipeline for the DPI2020 viewer.
//
// Reads the ~4.3MB source workbook (dpi2020.xlsx) ONCE at build time, converts
// the Excel-serial `year` column to real calendar years, normalizes all missing
// values (-999 / 'NA' / blank -> null while preserving real zeros), and writes
// two committed JSON artifacts that the Next.js app consumes server-side:
//
//   data/dpi2020.generated.json  -> array of row objects keyed by the 129 columns
//   data/meta.generated.json     -> { countries: [...], minYear, maxYear, ... }
//
// The raw xlsx is never shipped to the browser.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import xlsxPkg from "xlsx";
import {
  projectMatrix,
  validateYearRange,
  collectCountries,
} from "../lib/build-pipeline.mjs";

const XLSX = xlsxPkg.default || xlsxPkg;

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..");
const xlsxPath = join(repoRoot, "dpi2020.xlsx");
const dataDir = join(repoRoot, "data");

function main() {
  console.log(`[build-data] reading ${xlsxPath}`);
  const buf = readFileSync(xlsxPath);
  const wb = XLSX.read(buf, { type: "buffer" });

  const sheetName = wb.SheetNames[0];
  if (sheetName !== "Sheet1") {
    console.warn(`[build-data] expected sheet 'Sheet1', found '${sheetName}'`);
  }
  const ws = wb.Sheets[sheetName];

  const matrix = XLSX.utils.sheet_to_json(ws, { header: 1, raw: true });

  // Header validation, row projection and the missing-value contract all live
  // in lib/build-pipeline.mjs so they can be unit-tested without the workbook.
  const { header, records } = projectMatrix(matrix);

  // Validate year range so a bad Excel-serial parse fails the build loudly.
  const { minYear, maxYear } = validateYearRange(records);

  // Distinct, sorted country list.
  const countries = collectCountries(records);

  const meta = {
    generatedAt: new Date().toISOString(),
    source: "dpi2020.xlsx",
    recordCount: records.length,
    columns: header,
    countryCount: countries.length,
    countries,
    minYear,
    maxYear,
  };

  mkdirSync(dataDir, { recursive: true });
  const dataFile = join(dataDir, "dpi2020.generated.json");
  const metaFile = join(dataDir, "meta.generated.json");
  writeFileSync(dataFile, JSON.stringify(records));
  writeFileSync(metaFile, JSON.stringify(meta, null, 2));

  console.log(
    `[build-data] wrote ${records.length} records -> ${dataFile}`,
  );
  console.log(
    `[build-data] wrote meta (${countries.length} countries, ${minYear}-${maxYear}) -> ${metaFile}`,
  );
}

main();
