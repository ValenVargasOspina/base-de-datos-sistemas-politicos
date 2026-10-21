import { describe, it, expect } from "vitest";
import { createRequire } from "node:module";
import {
  REGIONS,
  FALLBACK_REGION,
  getRegion,
  getDisplayName,
  groupByRegion,
} from "../lib/regions.mjs";

const require = createRequire(import.meta.url);
const meta = require("../data/meta.generated.json");

describe("regions", () => {
  it("maps all 183 dataset countries with zero in the fallback bucket", () => {
    expect(meta.countries).toHaveLength(183);
    const fallbacks = meta.countries.filter(
      (c) => getRegion(c) === FALLBACK_REGION,
    );
    expect(fallbacks).toEqual([]);
  });

  it("assigns every country to one of the defined regions", () => {
    for (const country of meta.countries) {
      expect(REGIONS).toContain(getRegion(country));
    }
  });

  it("keeps 'América Latina y el Caribe' and 'Medio Oriente y Norte de África' as distinct regions", () => {
    expect(REGIONS).toContain("América Latina y el Caribe");
    expect(REGIONS).toContain("Medio Oriente y Norte de África");
    expect(getRegion("Argentina")).toBe("América Latina y el Caribe");
    expect(getRegion("Egypt")).toBe("Medio Oriente y Norte de África");
    expect(getRegion("Iran")).toBe("Medio Oriente y Norte de África");
  });

  it("maps the tricky abbreviated names to sensible regions", () => {
    expect(getRegion("USA")).toBe("América del Norte");
    expect(getRegion("PRC")).toBe("Asia");
    expect(getRegion("PRK")).toBe("Asia");
    expect(getRegion("ROK")).toBe("Asia");
    expect(getRegion("Timor-Leste")).toBe("Asia");
    expect(getRegion("S. Africa")).toBe("África Subsahariana");
    expect(getRegion("P. N. Guinea")).toBe("Oceanía");
    expect(getRegion("Soviet Union")).toBe("Euroasia/Post-soviético");
  });

  it("renders abbreviated codes as Spanish display names", () => {
    expect(getDisplayName("USA")).toBe("Estados Unidos");
    expect(getDisplayName("UK")).toBe("Reino Unido");
    expect(getDisplayName("PRC")).toBe("China");
    expect(getDisplayName("PRK")).toBe("Corea del Norte");
    expect(getDisplayName("ROK")).toBe("Corea del Sur");
    expect(getDisplayName("FRG/Germany")).toBe("Alemania");
    expect(getDisplayName("S. Africa")).toBe("Sudáfrica");
    expect(getDisplayName("Dom. Rep.")).toBe("Rep. Dominicana");
  });

  it("falls back to the raw dataset key when no translation exists", () => {
    expect(getDisplayName("Unknownland")).toBe("Unknownland");
  });

  it("groups the full country list across regions without loss", () => {
    const grouped = groupByRegion(meta.countries);
    const total = Object.values(grouped).reduce(
      (sum, arr) => sum + arr.length,
      0,
    );
    expect(total).toBe(183);
    expect(grouped[FALLBACK_REGION]).toBeUndefined();
  });
});
