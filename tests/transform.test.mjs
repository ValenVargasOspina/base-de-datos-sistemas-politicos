import { describe, it, expect } from "vitest";
import { serialToYear, normalizeValue } from "../lib/transform.mjs";

describe("serialToYear", () => {
  it("converts Excel serial 27395 to calendar year 1975", () => {
    expect(serialToYear(27395)).toBe(1975);
  });

  it("converts Excel serial 43831 to calendar year 2020", () => {
    expect(serialToYear(43831)).toBe(2020);
  });

  it("leaves an already-plain calendar year untouched", () => {
    expect(serialToYear(1990)).toBe(1990);
    expect(serialToYear(2020)).toBe(2020);
  });

  it("accepts numeric strings", () => {
    expect(serialToYear("27395")).toBe(1975);
  });

  it("throws on non-numeric input", () => {
    expect(() => serialToYear("not-a-number")).toThrow();
  });
});

describe("normalizeValue", () => {
  it("maps numeric -999 to null", () => {
    expect(normalizeValue(-999)).toBe(null);
  });

  it("maps the string 'NA' (any case/whitespace) to null", () => {
    expect(normalizeValue("NA")).toBe(null);
    expect(normalizeValue("na")).toBe(null);
    expect(normalizeValue("  Na  ")).toBe(null);
  });

  it("maps empty / whitespace-only strings to null", () => {
    expect(normalizeValue("")).toBe(null);
    expect(normalizeValue("   ")).toBe(null);
  });

  it("maps the string '-999' sentinel to null", () => {
    expect(normalizeValue("-999")).toBe(null);
  });

  it("maps null / undefined to null", () => {
    expect(normalizeValue(null)).toBe(null);
    expect(normalizeValue(undefined)).toBe(null);
  });

  it("PRESERVES a real numeric 0 (binary vars, EXECRLC '0=no info')", () => {
    expect(normalizeValue(0)).toBe(0);
  });

  it("keeps other numbers as numbers", () => {
    expect(normalizeValue(1)).toBe(1);
    expect(normalizeValue(42)).toBe(42);
    expect(normalizeValue(-1)).toBe(-1);
  });

  it("keeps and trims meaningful strings", () => {
    expect(normalizeValue("Presidential")).toBe("Presidential");
    expect(normalizeValue("  Turk Cyprus  ")).toBe("Turk Cyprus");
  });
});
