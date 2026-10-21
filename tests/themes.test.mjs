import { describe, it, expect } from "vitest";
import { createRequire } from "node:module";
import {
  THEMES,
  IDENTIFIER_COLUMNS,
  ASSIGNED_VARIABLES,
  validateThemeCoverage,
  getThemeForVariable,
} from "../lib/themes.mjs";

const require = createRequire(import.meta.url);
const meta = require("../data/meta.generated.json");

const EXPECTED_LABELS = [
  "Sistema político",
  "Poder Ejecutivo",
  "Poder Legislativo / Gobierno",
  "Oposición",
  "Elecciones y sistema electoral",
  "Federalismo y gobierno subnacional",
  "Cuotas de género",
];

describe("themes", () => {
  it("defines exactly seven themes in the required Spanish order", () => {
    expect(THEMES).toHaveLength(7);
    expect(THEMES.map((t) => t.label)).toEqual(EXPECTED_LABELS);
  });

  it("covers every non-identifier column exactly once (no missing/dup/unknown)", () => {
    const report = validateThemeCoverage(meta.columns);
    expect(report.missing).toEqual([]);
    expect(report.duplicated).toEqual([]);
    expect(report.unknown).toEqual([]);
    expect(report.ok).toBe(true);
  });

  it("assigns all 126 thematic columns (129 columns minus 3 identifiers)", () => {
    const thematic = meta.columns.filter(
      (c) => !IDENTIFIER_COLUMNS.includes(c),
    );
    expect(meta.columns).toHaveLength(129);
    expect(thematic).toHaveLength(126);
    expect(ASSIGNED_VARIABLES.size).toBe(126);
  });

  it("places the identifier columns outside the thematic assignment", () => {
    for (const id of IDENTIFIER_COLUMNS) {
      expect(ASSIGNED_VARIABLES.has(id)).toBe(false);
    }
  });

  it("maps the Plurality variable using the dataset column name 'pluralty'", () => {
    expect(ASSIGNED_VARIABLES.has("pluralty")).toBe(true);
    expect(ASSIGNED_VARIABLES.has("plurality")).toBe(false);
    expect(getThemeForVariable("pluralty")?.id).toBe(
      "elecciones-sistema-electoral",
    );
  });

  it("assigns gwno to 'Sistema político'", () => {
    expect(getThemeForVariable("gwno")?.id).toBe("sistema-politico");
  });
});
