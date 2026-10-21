// Build-time parser for the DPI2020 variable dictionary.
//
// Parses dpi2020_dictionary.csv (columns: column,description,type,choices) into
// a committed JSON artifact at data/variables.generated.json. lib/variables.mjs
// reads that artifact and enriches it with Spanish labels and value legends, so
// no CSV parsing happens at runtime.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..");
const csvPath = join(repoRoot, "dpi2020_dictionary.csv");
const dataDir = join(repoRoot, "data");

/**
 * Minimal RFC-4180-ish CSV parser: handles quoted fields, embedded commas, and
 * escaped double-quotes. Returns an array of rows, each an array of strings.
 * @param {string} text
 * @returns {string[][]}
 */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];

    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
      continue;
    }

    if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(field);
      field = "";
    } else if (ch === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (ch === "\r") {
      // ignore; handled by the following \n (or trailing)
    } else {
      field += ch;
    }
  }
  // Flush trailing field/row if the file does not end with a newline.
  if (field !== "" || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

function main() {
  console.log(`[build-variables] reading ${csvPath}`);
  const text = readFileSync(csvPath, "utf8");
  const rows = parseCsv(text).filter((r) => r.some((c) => c.trim() !== ""));

  const header = rows[0].map((h) => h.trim());
  const expected = ["column", "description", "type", "choices"];
  for (const col of expected) {
    if (!header.includes(col)) {
      throw new Error(
        `[build-variables] dictionary missing expected column '${col}'`,
      );
    }
  }
  const idx = Object.fromEntries(header.map((h, i) => [h, i]));

  const entries = [];
  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    const column = (row[idx.column] ?? "").trim();
    if (!column) continue;
    entries.push({
      column,
      description: (row[idx.description] ?? "").trim(),
      type: (row[idx.type] ?? "").trim(),
      choices: (row[idx.choices] ?? "").trim(),
    });
  }

  if (entries.length !== 129) {
    throw new Error(
      `[build-variables] expected 129 dictionary rows, found ${entries.length}`,
    );
  }

  mkdirSync(dataDir, { recursive: true });
  const outFile = join(dataDir, "variables.generated.json");
  writeFileSync(outFile, JSON.stringify(entries, null, 2));
  console.log(
    `[build-variables] wrote ${entries.length} variables -> ${outFile}`,
  );
}

main();
