import { describe, it, expect } from "vitest";
import {
  EXPECTED_COLUMN_COUNT,
  parseHeader,
  isEmptyRow,
  projectRow,
  projectMatrix,
  validateYearRange,
  collectCountries,
} from "../lib/build-pipeline.mjs";

// Build a 129-column header that mirrors the real sheet's identifier layout
// (countryname, ifs, year, then filler columns) so the pipeline helpers can be
// exercised against a tiny in-memory matrix instead of the 4.3MB workbook.
function makeHeader() {
  const header = new Array(EXPECTED_COLUMN_COUNT);
  header[0] = "countryname";
  header[1] = "ifs";
  header[2] = "year";
  header[3] = "system";
  header[4] = "execrlc";
  header[5] = "pr"; // a binary variable, used to assert zero preservation
  for (let c = 6; c < EXPECTED_COLUMN_COUNT; c++) header[c] = `col${c}`;
  return header;
}

// Build one data row aligned to makeHeader(); unspecified columns default to -999.
function makeRow({ countryname, ifs, year, system, execrlc, pr }) {
  const row = new Array(EXPECTED_COLUMN_COUNT).fill(-999);
  row[0] = countryname;
  row[1] = ifs;
  row[2] = year;
  row[3] = system;
  row[4] = execrlc;
  row[5] = pr;
  return row;
}

describe("parseHeader", () => {
  it("accepts a 129-column header and locates the identifier columns", () => {
    const { header, yearIdx, countryIdx, ifsIdx } = parseHeader(makeHeader());
    expect(header).toHaveLength(129);
    expect(countryIdx).toBe(0);
    expect(ifsIdx).toBe(1);
    expect(yearIdx).toBe(2);
  });

  it("trims whitespace in header cells", () => {
    const h = makeHeader();
    h[0] = "  countryname  ";
    expect(parseHeader(h).countryIdx).toBe(0);
  });

  it("throws when the column count is not 129", () => {
    expect(() => parseHeader(["countryname", "ifs", "year"])).toThrow(
      /expected 129 columns, found 3/,
    );
  });

  it("throws when a required identifier column is missing", () => {
    const h = makeHeader();
    h[2] = "fecha"; // rename 'year' away
    expect(() => parseHeader(h)).toThrow(/missing required columns/);
  });
});

describe("isEmptyRow", () => {
  it("treats undefined/null/blank-only rows as empty", () => {
    expect(isEmptyRow(undefined)).toBe(true);
    expect(isEmptyRow([])).toBe(true);
    expect(isEmptyRow([undefined, null, ""])).toBe(true);
  });

  it("treats a row with any real value (including 0) as non-empty", () => {
    expect(isEmptyRow([0])).toBe(false);
    expect(isEmptyRow(["", "USA"])).toBe(false);
  });
});

describe("projectRow", () => {
  const ctx = parseHeader(makeHeader());

  it("converts the Excel-serial year to a calendar year", () => {
    const rec = projectRow(
      makeRow({
        countryname: "USA",
        ifs: "USA",
        year: 43831,
        system: 0,
        execrlc: 0,
        pr: 0,
      }),
      ctx,
    );
    expect(rec.year).toBe(2020);
  });

  it("preserves real zeros and normalizes -999 to null", () => {
    const rec = projectRow(
      makeRow({
        countryname: "Brazil",
        ifs: "BRA",
        year: 27395,
        system: 0, // real zero must survive (presidential)
        execrlc: 0, // real zero = 'sin informacion'
        pr: -999, // sentinel -> null
      }),
      ctx,
    );
    expect(rec.year).toBe(1975);
    expect(rec.system).toBe(0);
    expect(rec.execrlc).toBe(0);
    expect(rec.pr).toBe(null);
    // filler columns were -999 in the fixture and should all be null
    expect(rec.col6).toBe(null);
  });

  it("carries countryname/ifs through as trimmed strings", () => {
    const rec = projectRow(
      makeRow({
        countryname: "  USA  ",
        ifs: "  USA  ",
        year: 43831,
        system: 0,
        execrlc: 1,
        pr: 1,
      }),
      ctx,
    );
    expect(rec.countryname).toBe("USA");
    expect(rec.ifs).toBe("USA");
  });
});

describe("projectMatrix", () => {
  const header = makeHeader();
  const matrix = [
    header,
    makeRow({ countryname: "USA", ifs: "USA", year: 27395, system: 0, execrlc: 1, pr: 1 }),
    makeRow({ countryname: "Brazil", ifs: "BRA", year: 43831, system: 2, execrlc: 3, pr: 0 }),
    new Array(EXPECTED_COLUMN_COUNT).fill(""), // trailing empty row, must be skipped
  ];

  it("projects data rows and skips trailing empty rows", () => {
    const { records } = projectMatrix(matrix);
    expect(records).toHaveLength(2);
    expect(records[0].countryname).toBe("USA");
    expect(records[1].year).toBe(2020);
  });

  it("throws on an empty matrix", () => {
    expect(() => projectMatrix([])).toThrow(/sheet is empty/);
  });
});

describe("validateYearRange", () => {
  it("accepts a plausible 1975-2020 range", () => {
    const records = [{ year: 1975 }, { year: 2020 }, { year: 1999 }];
    expect(validateYearRange(records)).toEqual({ minYear: 1975, maxYear: 2020 });
  });

  it("throws if the min year drifts away from ~1975 (broken serial parse)", () => {
    // If the Excel-serial conversion were skipped, years would look like 27395.
    const records = [{ year: 27395 }, { year: 43831 }];
    expect(() => validateYearRange(records)).toThrow(/unexpected min year/);
  });

  it("throws if the max year drifts away from ~2020", () => {
    const records = [{ year: 1975 }, { year: 1999 }];
    expect(() => validateYearRange(records)).toThrow(/unexpected max year/);
  });

  it("throws when no valid years are present", () => {
    expect(() => validateYearRange([{ year: null }, {}])).toThrow(
      /no valid years parsed/,
    );
  });
});

describe("collectCountries", () => {
  it("returns distinct, Spanish-collated country names", () => {
    const records = [
      { countryname: "Brazil" },
      { countryname: "Argentina" },
      { countryname: "Brazil" },
      { countryname: null },
    ];
    expect(collectCountries(records)).toEqual(["Argentina", "Brazil"]);
  });
});
