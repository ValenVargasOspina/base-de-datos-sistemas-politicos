import { describe, it, expect } from "vitest";
import {
  selectRows,
  resolveAllowedCountries,
  countSelectedCountries,
} from "../lib/filter.mjs";

// A tiny synthetic dataset spanning several real dataset country keys across
// two regions (América Latina y el Caribe vs Medio Oriente y Norte de África)
// and a few years, so we can assert the region -> country -> year filtering.
const rows = [
  { countryname: "Argentina", ifs: "ARG", year: 1990, checks: 3, system: 0 },
  { countryname: "Argentina", ifs: "ARG", year: 2000, checks: 4, system: 0 },
  { countryname: "Argentina", ifs: "ARG", year: 2010, checks: 5, system: 0 },
  { countryname: "Brazil", ifs: "BRA", year: 1990, checks: 6, system: 0 },
  { countryname: "Brazil", ifs: "BRA", year: 2010, checks: 7, system: 0 },
  { countryname: "Israel", ifs: "ISR", year: 1990, checks: 2, system: 2 },
  { countryname: "Israel", ifs: "ISR", year: 2010, checks: 2, system: 2 },
  { countryname: "Egypt", ifs: "EGY", year: 2000, checks: 1, system: 0 },
];

const universe = ["Argentina", "Brazil", "Israel", "Egypt"];

describe("resolveAllowedCountries", () => {
  it("allows every country when no region or country selection is set", () => {
    const allowed = resolveAllowedCountries(universe, undefined, undefined);
    expect([...allowed].sort()).toEqual([...universe].sort());
  });

  it("narrows to the countries in the selected regions", () => {
    const allowed = resolveAllowedCountries(
      universe,
      ["América Latina y el Caribe"],
      undefined,
    );
    expect([...allowed].sort()).toEqual(["Argentina", "Brazil"]);
  });

  it("intersects region and explicit country selections", () => {
    const allowed = resolveAllowedCountries(
      universe,
      ["América Latina y el Caribe"],
      ["Argentina", "Israel"],
    );
    // Israel is excluded because it is not in the selected region.
    expect([...allowed]).toEqual(["Argentina"]);
  });
});

describe("selectRows", () => {
  it("returns all rows (unprojected) when the filter is empty", () => {
    const out = selectRows(rows, {}, universe);
    expect(out).toHaveLength(rows.length);
    expect(out[0]).toHaveProperty("checks");
  });

  it("filters by an explicit country selection", () => {
    const out = selectRows(rows, { countries: ["Argentina"] }, universe);
    expect(out).toHaveLength(3);
    expect(out.every((r) => r.countryname === "Argentina")).toBe(true);
  });

  it("filters by region across country keys", () => {
    const out = selectRows(
      rows,
      { regions: ["Medio Oriente y Norte de África"] },
      universe,
    );
    const countries = new Set(out.map((r) => r.countryname));
    expect(countries).toEqual(new Set(["Israel", "Egypt"]));
  });

  it("supports cross-region comparison (two regions)", () => {
    const out = selectRows(
      rows,
      {
        regions: [
          "América Latina y el Caribe",
          "Medio Oriente y Norte de África",
        ],
      },
      universe,
    );
    const countries = new Set(out.map((r) => r.countryname));
    expect(countries).toEqual(
      new Set(["Argentina", "Brazil", "Israel", "Egypt"]),
    );
  });

  it("scopes to a year range (inclusive)", () => {
    const out = selectRows(
      rows,
      { yearMin: 2000, yearMax: 2010 },
      universe,
    );
    expect(out.every((r) => r.year >= 2000 && r.year <= 2010)).toBe(true);
    expect(out.map((r) => r.year).sort()).toEqual([2000, 2000, 2010, 2010, 2010]);
  });

  it("projects to the chosen variable with region and value fields", () => {
    const out = selectRows(
      rows,
      { countries: ["Brazil"], variable: "checks" },
      universe,
    );
    expect(out).toEqual([
      {
        countryname: "Brazil",
        ifs: "BRA",
        year: 1990,
        region: "América Latina y el Caribe",
        value: 6,
      },
      {
        countryname: "Brazil",
        ifs: "BRA",
        year: 2010,
        region: "América Latina y el Caribe",
        value: 7,
      },
    ]);
  });

  it("combines region, country and year filters", () => {
    const out = selectRows(
      rows,
      {
        regions: ["América Latina y el Caribe"],
        countries: ["Argentina", "Brazil"],
        yearMin: 2005,
        yearMax: 2020,
        variable: "checks",
      },
      universe,
    );
    expect(out).toEqual([
      {
        countryname: "Argentina",
        ifs: "ARG",
        year: 2010,
        region: "América Latina y el Caribe",
        value: 5,
      },
      {
        countryname: "Brazil",
        ifs: "BRA",
        year: 2010,
        region: "América Latina y el Caribe",
        value: 7,
      },
    ]);
  });

  it("preserves real zero values when projecting (does not null them)", () => {
    const out = selectRows(
      rows,
      { countries: ["Argentina"], variable: "system" },
      universe,
    );
    expect(out.every((r) => r.value === 0)).toBe(true);
  });
});

describe("countSelectedCountries", () => {
  it("counts distinct countries after filtering", () => {
    expect(
      countSelectedCountries(
        rows,
        { regions: ["América Latina y el Caribe"] },
        universe,
      ),
    ).toBe(2);
  });
});
