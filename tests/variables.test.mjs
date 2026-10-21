import { describe, it, expect } from "vitest";
import {
  getVariable,
  getSpanishLabel,
  getValueLegend,
  formatValue,
  allVariables,
} from "../lib/variables.mjs";
import { getQuestionsForTheme, QUESTIONS } from "../lib/questions.mjs";
import { THEMES } from "../lib/themes.mjs";

describe("variable catalog", () => {
  it("exposes the full 129-variable dictionary", () => {
    expect(allVariables()).toHaveLength(129);
  });

  it("returns a Spanish label for every sampled variable", () => {
    for (const col of ["system", "execrlc", "gq", "checks", "liec"]) {
      const label = getSpanishLabel(col);
      expect(typeof label).toBe("string");
      expect(label.length).toBeGreaterThan(0);
    }
    expect(getSpanishLabel("system")).toBe("Sistema político");
    expect(getSpanishLabel("checks")).toBe(
      "Contrapesos institucionales (checks)",
    );
  });

  it("provides Spanish value legends for coded variables", () => {
    expect(getValueLegend("system")).toMatchObject({
      0: "Presidencial",
      1: "Presidente electo por asamblea",
      2: "Parlamentario",
    });
    expect(getValueLegend("execrlc")).toMatchObject({
      1: "Derecha",
      2: "Centro",
      3: "Izquierda",
      0: "Sin información",
    });
    expect(getValueLegend("gq")).toMatchObject({
      0: "Sin cuota",
      1: "Escaños reservados",
      2: "Cuota en listas de candidaturas",
      3: "Cuota voluntaria",
    });
    expect(getValueLegend("liec")).toMatchObject({
      1: "Sin legislatura / sin ejecutivo",
      7: "Varios partidos con escaños; el mayor obtuvo menos del 75%",
    });
  });

  it("marks continuous variables (checks) without a legend", () => {
    expect(getValueLegend("checks")).toBeNull();
    expect(getVariable("checks").kind).toBe("continuous");
  });

  it("marks coded variables as categorical", () => {
    for (const col of ["system", "execrlc", "gq", "liec"]) {
      expect(getVariable(col).kind).toBe("categorical");
    }
  });

  it("carries the English short description and dictionary type/choices", () => {
    const system = getVariable("system");
    expect(system.descriptionEn).toBe("Political System");
    expect(system.type).toBe("int");
    expect(system.choices).toBe("presparl");
  });

  it("applies legends to the numbered party-slot variables", () => {
    expect(getValueLegend("gov1rlc")).toMatchObject({ 1: "Derecha" });
    expect(getValueLegend("opp1rel")).toMatchObject({ 3: "Islámica" });
  });

  it("formats raw coded values into Spanish meanings", () => {
    expect(formatValue("system", 0)).toBe("Presidencial");
    expect(formatValue("gq", 2)).toBe("Cuota en listas de candidaturas");
    expect(formatValue("checks", 4)).toBe("4");
    expect(formatValue("execrlc", null)).toBe("Sin ejecutivo / partido");
  });
});

describe("guiding questions", () => {
  it("provides a question set for each of the seven themes", () => {
    expect(QUESTIONS).toHaveLength(7);
    for (const theme of THEMES) {
      const qs = getQuestionsForTheme(theme.id);
      expect(qs.length).toBeGreaterThanOrEqual(3);
      expect(qs.length).toBeLessThanOrEqual(5);
      for (const q of qs) {
        expect(typeof q).toBe("string");
        expect(q.length).toBeGreaterThan(0);
      }
    }
  });

  it("ties every question set to a valid theme id", () => {
    const themeIds = new Set(THEMES.map((t) => t.id));
    for (const set of QUESTIONS) {
      expect(themeIds.has(set.themeId)).toBe(true);
    }
  });
});
