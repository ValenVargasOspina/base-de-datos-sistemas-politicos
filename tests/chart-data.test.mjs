import { describe, it, expect } from "vitest";
import {
  toNumber,
  distinctYears,
  buildTimeSeries,
  latestYearWithData,
  buildContinuousComparison,
  buildCategoricalShare,
} from "../lib/chart-data.mjs";

// Projected rows mirror what lib/filter.selectRows emits:
// { countryname, ifs, year, region, value }. We use real dataset country keys
// so getRegion / getDisplayName resolve to the Spanish labels.
const continuousRows = [
  { countryname: "Argentina", ifs: "ARG", year: 1990, region: "América Latina y el Caribe", value: 3 },
  { countryname: "Argentina", ifs: "ARG", year: 2000, region: "América Latina y el Caribe", value: null },
  { countryname: "Argentina", ifs: "ARG", year: 2010, region: "América Latina y el Caribe", value: 5 },
  { countryname: "Brazil", ifs: "BRA", year: 1990, region: "América Latina y el Caribe", value: 6 },
  { countryname: "Brazil", ifs: "BRA", year: 2010, region: "América Latina y el Caribe", value: 8 },
  { countryname: "Israel", ifs: "ISR", year: 1990, region: "Medio Oriente y Norte de África", value: 2 },
  { countryname: "Israel", ifs: "ISR", year: 2010, region: "Medio Oriente y Norte de África", value: 4 },
];

describe("toNumber", () => {
  it("preserves real zeros and finite numbers", () => {
    expect(toNumber(0)).toBe(0);
    expect(toNumber(5)).toBe(5);
    expect(toNumber("3")).toBe(3);
  });

  it("maps missing / non-numeric to null (gaps, not zeros)", () => {
    expect(toNumber(null)).toBeNull();
    expect(toNumber(undefined)).toBeNull();
    expect(toNumber("")).toBeNull();
    expect(toNumber("NA")).toBeNull();
  });
});

describe("distinctYears", () => {
  it("returns ascending distinct years", () => {
    expect(distinctYears(continuousRows)).toEqual([1990, 2000, 2010]);
  });
});

describe("buildTimeSeries (by country)", () => {
  const { series, data } = buildTimeSeries(continuousRows, {
    groupBy: "country",
  });

  it("produces one series per selected country", () => {
    expect(series.map((s) => s.key).sort()).toEqual(
      ["Argentina", "Brazil", "Israel"].sort(),
    );
  });

  it("uses Spanish display labels for the legend", () => {
    const brazil = series.find((s) => s.key === "Brazil");
    expect(brazil.label).toBe("Brasil");
  });

  it("emits null (a gap) for a missing observation, not zero", () => {
    const y2000 = data.find((d) => d.year === 2000);
    // Argentina has a null in 2000 -> must be null, not 0.
    expect(y2000.Argentina).toBeNull();
    // Brazil has no 2000 row at all -> also a null gap.
    expect(y2000.Brazil).toBeNull();
  });

  it("carries real values through for observed years", () => {
    const y2010 = data.find((d) => d.year === 2010);
    expect(y2010.Argentina).toBe(5);
    expect(y2010.Brazil).toBe(8);
  });
});

describe("buildTimeSeries (by region) excludes nulls from the mean", () => {
  const { series, data } = buildTimeSeries(continuousRows, {
    groupBy: "region",
  });

  it("creates one series per region", () => {
    expect(series.map((s) => s.key).sort()).toEqual(
      ["América Latina y el Caribe", "Medio Oriente y Norte de África"].sort(),
    );
  });

  it("averages member countries per year, ignoring nulls", () => {
    // 1990: Argentina 3, Brazil 6 -> mean 4.5
    const y1990 = data.find((d) => d.year === 1990);
    expect(y1990["América Latina y el Caribe"]).toBeCloseTo(4.5, 10);
    // 2000: Argentina null, Brazil absent -> no data -> null gap
    const y2000 = data.find((d) => d.year === 2000);
    expect(y2000["América Latina y el Caribe"]).toBeNull();
  });
});

describe("latestYearWithData", () => {
  it("returns the latest year that has a non-null value", () => {
    expect(latestYearWithData(continuousRows)).toBe(2010);
  });

  it("returns null when there is no data at all", () => {
    expect(
      latestYearWithData([
        { countryname: "Argentina", year: 2000, region: "América Latina y el Caribe", value: null },
      ]),
    ).toBeNull();
  });
});

describe("buildContinuousComparison", () => {
  it("computes the mean per region excluding nulls", () => {
    const bars = buildContinuousComparison(continuousRows, {
      groupBy: "region",
    });
    const latam = bars.find((b) => b.key === "América Latina y el Caribe");
    // Argentina: 3, 5 (null excluded); Brazil: 6, 8 -> mean of [3,5,6,8] = 5.5
    expect(latam.value).toBeCloseTo(5.5, 10);
    expect(latam.count).toBe(4);
  });

  it("filters to a single year when requested", () => {
    const bars = buildContinuousComparison(continuousRows, {
      groupBy: "country",
      year: 2010,
    });
    const argentina = bars.find((b) => b.key === "Argentina");
    expect(argentina.value).toBe(5);
    expect(argentina.count).toBe(1);
  });

  it("omits groups with no non-null data for the scope", () => {
    const bars = buildContinuousComparison(continuousRows, {
      groupBy: "country",
      year: 2000,
    });
    // Argentina's only 2000 value is null -> omitted; no other country has 2000
    expect(bars).toHaveLength(0);
  });
});

describe("buildCategoricalShare", () => {
  const legend = { 0: "Presidencial", 1: "Presidente electo por asamblea", 2: "Parlamentario" };
  const catRows = [
    { countryname: "Argentina", year: 2000, region: "América Latina y el Caribe", value: 0 },
    { countryname: "Brazil", year: 2000, region: "América Latina y el Caribe", value: 0 },
    { countryname: "Mexico", year: 2000, region: "América Latina y el Caribe", value: 2 },
    { countryname: "Peru", year: 2000, region: "América Latina y el Caribe", value: null },
    { countryname: "Israel", year: 2000, region: "Medio Oriente y Norte de África", value: 2 },
  ];

  const { categories, data } = buildCategoricalShare(catRows, legend, {
    groupBy: "region",
  });

  it("exposes the legend categories (code + Spanish label)", () => {
    expect(categories).toEqual([
      { code: "0", label: "Presidencial" },
      { code: "1", label: "Presidente electo por asamblea" },
      { code: "2", label: "Parlamentario" },
    ]);
  });

  it("computes per-group shares that sum to ~1 (nulls excluded)", () => {
    const latam = data.find((d) => d.group === "América Latina y el Caribe");
    // Non-null LATAM: Argentina 0, Brazil 0, Mexico 2 (Peru null excluded).
    expect(latam["0"]).toBeCloseTo(2 / 3, 10);
    expect(latam["2"]).toBeCloseTo(1 / 3, 10);
    expect(latam["1"]).toBe(0);
    const sum = Number(latam["0"]) + Number(latam["1"]) + Number(latam["2"]);
    expect(sum).toBeCloseTo(1, 10);
  });

  it("produces one row per group with its Spanish label", () => {
    const groups = data.map((d) => d.group).sort();
    expect(groups).toEqual(
      ["América Latina y el Caribe", "Medio Oriente y Norte de África"].sort(),
    );
  });
});
