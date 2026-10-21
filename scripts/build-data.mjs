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
import { serialToYear, normalizeValue } from "../lib/transform.mjs";

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
  if (!matrix.length) {
    throw new Error("[build-data] sheet is empty");
  }

  const header = matrix[0].map((h) => String(h).trim());
  if (header.length !== 129) {
    throw new Error(
      `[build-data] expected 129 columns, found ${header.length}`,
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

  const records = [];
  for (let r = 1; r < matrix.length; r++) {
    const row = matrix[r];
    // Skip fully empty trailing rows if any.
    if (!row || row.every((c) => c === undefined || c === null || c === "")) {
      continue;
    }

    const obj = {};
    for (let c = 0; c < header.length; c++) {
      const key = header[c];
      const raw = row[c];

      if (c === yearIdx) {
        if (raw === undefined || raw === null || raw === "") {
          obj[key] = null;
        } else {
          obj[key] = serialToYear(raw);
        }
        continue;
      }

      if (c === countryIdx) {
        // countryname is always carried through as a trimmed string.
        obj[key] = raw === undefined || raw === null ? null : String(raw).trim();
        continue;
      }

      if (c === ifsIdx) {
        // ifs is unreliable but carried through as-is (string).
        obj[key] = raw === undefined || raw === null ? null : String(raw).trim();
        continue;
      }

      obj[key] = normalizeValue(raw);
    }
    records.push(obj);
  }

  // Validate year range so a bad Excel-serial parse fails the build loudly.
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

  // Distinct, sorted country list.
  const countrySet = new Set();
  for (const rec of records) {
    if (rec.countryname) {
      countrySet.add(rec.countryname);
    }
  }
  const countries = [...countrySet].sort((a, b) =>
    a.localeCompare(b, "es", { sensitivity: "base" }),
  );

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
