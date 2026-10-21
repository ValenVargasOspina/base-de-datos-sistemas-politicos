// Variable catalog for the DPI2020 viewer. Merges the dictionary CSV short
// English description + type + choices code-set with a Spanish label and, for
// coded variables, a human-readable Spanish value legend taken from the
// authoritative .md definitions file.
//
// Framework-free (.mjs) so the Next.js app and Vitest can both import it. The
// dictionary CSV is parsed by scripts/build-variables.mjs into
// data/variables.generated.json; this module reads that artifact (no runtime
// CSV parsing) and enriches it with the Spanish metadata below.

import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
/** @type {{ column: string, description: string, type: string, choices: string }[]} */
const dictionary = require("../data/variables.generated.json");

/**
 * Reusable coded-value legends (code -> Spanish meaning). `null` encodes the
 * meaning of a missing/NA value where the dictionary gives one.
 * @type {Record<string, Record<string, string>>}
 */
const LEGENDS = {
  // Political system (SYSTEM).
  system: {
    0: "Presidencial",
    1: "Presidente electo por asamblea",
    2: "Parlamentario",
  },
  // Party orientation (EXECRLC / GOV*RLC / OPP*RLC).
  rlc: {
    0: "Sin información",
    1: "Derecha",
    2: "Centro",
    3: "Izquierda",
    null: "Sin ejecutivo / partido",
  },
  // Party religious affiliation (EXEC/GOV/OPP *REL).
  rel: {
    0: "Ninguna",
    1: "Cristiana",
    2: "Católica",
    3: "Islámica",
    4: "Hindú",
    5: "Budista",
    6: "Judía",
  },
  // Term limits for the chief executive (TERMLIMIT), per the .md.
  termlimit: {
    1: "Reelección ilimitada (sin limitación)",
    2: "Límite de dos mandatos consecutivos",
    3: "Límite de dos mandatos en total",
    4: "Prohibición absoluta de reelección",
    5: "Límite de mandatos consecutivos (sin máximo fijo)",
    6: "Límite de tres mandatos consecutivos",
    7: "Reelección posible tras dos mandatos fuera",
    8: "Límite de mandatos consecutivos (máximo fijo de 2)",
  },
  // Legislative/Executive Index of Electoral Competitiveness (LIEC / EIEC).
  iec: {
    1: "Sin legislatura / sin ejecutivo",
    2: "No electo",
    3: "Electo, una sola candidatura",
    4: "Un partido, varias candidaturas",
    5: "Varios partidos legales, solo uno obtuvo escaños",
    6: "Varios partidos con escaños; el mayor obtuvo más del 75%",
    7: "Varios partidos con escaños; el mayor obtuvo menos del 75%",
  },
  // Gender quota type (GQ).
  gq: {
    0: "Sin cuota",
    1: "Escaños reservados",
    2: "Cuota en listas de candidaturas",
    3: "Cuota voluntaria",
  },
  // Candidate selection (SELECT).
  select: {
    1: "Nacional",
    2: "Subnacional",
    3: "Primaria",
  },
  // Electoral rule of the chamber (HOUSESYS / SENSYS).
  sys: {
    0: "Representación proporcional",
    1: "Mayoritario / plurality",
  },
  // Generic binary yes/no variables.
  binary: {
    0: "No",
    1: "Sí",
  },
};

/**
 * Per-variable Spanish labels, the legend to apply (if any), and whether the
 * variable is categorical (discrete coded/boolean) or continuous (counts,
 * shares, indices). Only variables that need a Spanish override or a legend are
 * listed; everything else falls back to the English description with a derived
 * kind.
 * @type {Record<string, { label?: string, legend?: keyof typeof LEGENDS, kind?: 'categorical'|'continuous' }>}
 */
const SPANISH = {
  countryname: { label: "Nombre del país", kind: "categorical" },
  ifs: { label: "Código del país", kind: "categorical" },
  year: { label: "Año", kind: "continuous" },

  // Sistema político.
  system: { label: "Sistema político", legend: "system", kind: "categorical" },
  checks: { label: "Contrapesos institucionales (checks)", kind: "continuous" },
  checks_lax: {
    label: "Contrapesos institucionales (criterio laxo)",
    kind: "continuous",
  },
  polariz: { label: "Polarización", kind: "continuous" },
  tensys: { label: "Antigüedad del sistema", kind: "continuous" },
  tensys_strict: {
    label: "Antigüedad del sistema (criterio estricto)",
    kind: "continuous",
  },
  stabs: { label: "Estabilidad", kind: "continuous" },
  stabs_strict: { label: "Estabilidad (umbral LIEC = 6)", kind: "continuous" },
  stabns: { label: "Estabilidad (cámara única)", kind: "continuous" },
  stabns_strict: {
    label: "Estabilidad, cámara única (umbral LIEC = 6)",
    kind: "continuous",
  },
  tenlong: {
    label: "Mayor permanencia de un jugador con veto",
    kind: "continuous",
  },
  tenlong_strict: {
    label: "Mayor permanencia de un jugador con veto (umbral LIEC = 6)",
    kind: "continuous",
  },
  tenshort: {
    label: "Menor permanencia de un jugador con veto",
    kind: "continuous",
  },
  tenshort_strict: {
    label: "Menor permanencia de un jugador con veto (umbral LIEC = 6)",
    kind: "continuous",
  },
  frac: { label: "Índice de fraccionalización", kind: "continuous" },
  herftot: { label: "Índice de Herfindahl total", kind: "continuous" },
  maj: { label: "Margen de la mayoría", kind: "continuous" },
  partyage: { label: "Edad promedio de los partidos", kind: "continuous" },
  gwno: {
    label: "Identificador Gleditsch-Ward del país",
    kind: "categorical",
  },

  // Poder Ejecutivo.
  yrsoffc: { label: "Años del ejecutivo en el cargo", kind: "continuous" },
  finittrm: {
    label: "¿Tiene un mandato de duración finita?",
    legend: "binary",
    kind: "categorical",
  },
  yrcurnt: {
    label: "Años restantes del mandato actual",
    kind: "continuous",
  },
  termlimit: {
    label: "Límites de reelección del ejecutivo",
    legend: "termlimit",
    kind: "categorical",
  },
  reelect: {
    label: "¿El ejecutivo puede ser reelecto?",
    legend: "binary",
    kind: "categorical",
  },
  multpl: {
    label: "¿Puede el ejecutivo servir varios mandatos?",
    legend: "binary",
    kind: "categorical",
  },
  military: {
    label: "¿El ejecutivo es militar?",
    legend: "binary",
    kind: "categorical",
  },
  defmin: {
    label: "¿El ministro de Defensa es militar?",
    legend: "binary",
    kind: "categorical",
  },
  percent1: {
    label: "% de votos del presidente (primera vuelta)",
    kind: "continuous",
  },
  percentl: {
    label: "% de votos del presidente (última vuelta)",
    kind: "continuous",
  },
  prtyin: {
    label: "Años del partido del ejecutivo en el cargo",
    kind: "continuous",
  },
  execme: { label: "Nombre del partido del ejecutivo", kind: "categorical" },
  execrlc: {
    label: "Orientación del partido del ejecutivo",
    legend: "rlc",
    kind: "categorical",
  },
  execnat: {
    label: "Partido del ejecutivo: nacionalista",
    legend: "binary",
    kind: "categorical",
  },
  execrurl: {
    label: "Partido del ejecutivo: rural",
    legend: "binary",
    kind: "categorical",
  },
  execreg: {
    label: "Partido del ejecutivo: regional",
    legend: "binary",
    kind: "categorical",
  },
  execrel: {
    label: "Partido del ejecutivo: religioso",
    legend: "rel",
    kind: "categorical",
  },
  execage: { label: "Edad del partido del ejecutivo", kind: "continuous" },
  allhouse: {
    label: "¿El partido del ejecutivo controla todas las cámaras?",
    legend: "binary",
    kind: "categorical",
  },
  nonchief: {
    label: "Partido del segundo ejecutivo (presidente/PM)",
    kind: "categorical",
  },

  // Elecciones y sistema electoral (legends of interest).
  liec: {
    label: "Competitividad electoral legislativa (LIEC)",
    legend: "iec",
    kind: "categorical",
  },
  eiec: {
    label: "Competitividad electoral ejecutiva (EIEC)",
    legend: "iec",
    kind: "categorical",
  },
  legelec: {
    label: "¿Hubo elección legislativa?",
    legend: "binary",
    kind: "categorical",
  },
  exelec: {
    label: "¿Hubo elección presidencial?",
    legend: "binary",
    kind: "categorical",
  },
  pluralty: {
    label: "Sistema de pluralidad (mayoría simple)",
    legend: "binary",
    kind: "categorical",
  },
  pr: {
    label: "Representación proporcional",
    legend: "binary",
    kind: "categorical",
  },
  housesys: {
    label: "Regla electoral de la cámara baja",
    legend: "sys",
    kind: "categorical",
  },
  sensys: {
    label: "Regla electoral del senado",
    legend: "sys",
    kind: "categorical",
  },
  dhondt: { label: "Sistema D'Hondt", legend: "binary", kind: "categorical" },
  cl: { label: "Lista cerrada", legend: "binary", kind: "categorical" },
  select: {
    label: "Selección de candidaturas",
    legend: "select",
    kind: "categorical",
  },
  fraud: { label: "Fraude electoral", legend: "binary", kind: "categorical" },
  dateleg: { label: "Mes de la elección legislativa", kind: "categorical" },
  dateexec: { label: "Mes de la elección presidencial", kind: "categorical" },
  mdmh: { label: "Magnitud media de distrito (cámara)", kind: "continuous" },
  mdms: { label: "Magnitud media de distrito (senado)", kind: "continuous" },
  ssh: { label: "Proporción de escaños del senado", kind: "continuous" },
  thresh: { label: "Umbral de votos", kind: "continuous" },

  // Federalismo.
  auton: {
    label: "Regiones autónomas",
    legend: "binary",
    kind: "categorical",
  },
  muni: {
    label: "Gobierno municipal electo",
    legend: "binary",
    kind: "categorical",
  },
  state: {
    label: "Gobierno estatal electo",
    legend: "binary",
    kind: "categorical",
  },
  author: {
    label: "Autoridad fiscal/legislativa subnacional",
    legend: "binary",
    kind: "categorical",
  },
  stconst: {
    label: "¿Los senadores representan estados/provincias?",
    legend: "binary",
    kind: "categorical",
  },

  // Cuotas de género.
  gq: { label: "Cuota de género (tipo)", legend: "gq", kind: "categorical" },
  gqi: { label: "Año de implementación de la cuota de género", kind: "continuous" },
};

/**
 * Apply the shared orientation/religion legends to the numbered party-slot
 * variables (gov1rlc, opp2rel, ...) so they all expose a legend without being
 * listed individually.
 * @param {string} column
 * @returns {('rlc'|'rel'|'binary')|undefined}
 */
function inferPartyLegend(column) {
  if (/^(gov[123]|opp[123])rlc$/.test(column)) return "rlc";
  if (/^(gov[123]|opp[123])rel$/.test(column)) return "rel";
  if (/^(gov[123]|opp[123])(nat|rurl|reg)$/.test(column)) return "binary";
  return undefined;
}

/**
 * Derive a kind from the dictionary `type` when no explicit Spanish override
 * exists: string columns and integers with a legend are categorical; floats
 * and plain integer counts are continuous.
 * @param {string} type
 * @returns {'categorical'|'continuous'}
 */
function kindFromType(type) {
  return typeof type === "string" && type.startsWith("str")
    ? "categorical"
    : "continuous";
}

/**
 * @typedef {Object} VariableEntry
 * @property {string} column         Dataset column name (stable id).
 * @property {string} descriptionEn  English short description from the CSV.
 * @property {string} description    Spanish description/label shown in the UI.
 * @property {string} type           Dictionary type (int/float/strN).
 * @property {string} choices        Dictionary choices code-set key ('' if none).
 * @property {'categorical'|'continuous'} kind How charts should treat it.
 * @property {Record<string,string>|null} legend Code -> Spanish meaning, or null.
 */

/** @type {Map<string, VariableEntry>} */
const CATALOG = new Map();

for (const row of dictionary) {
  const column = row.column;
  const override = SPANISH[column] ?? {};
  const legendKey = override.legend ?? inferPartyLegend(column);
  const legend = legendKey ? LEGENDS[legendKey] : null;
  const descriptionEn = row.description || "";
  const description =
    override.label ?? (descriptionEn || column);
  const kind =
    override.kind ?? (legend ? "categorical" : kindFromType(row.type));

  CATALOG.set(column, {
    column,
    descriptionEn,
    description,
    type: row.type || "",
    choices: row.choices || "",
    kind,
    legend: legend ?? null,
  });
}

/**
 * Return the full catalog entry for a variable, or undefined if the column is
 * not in the dictionary.
 * @param {string} column
 * @returns {VariableEntry | undefined}
 */
export function getVariable(column) {
  return CATALOG.get(column);
}

/**
 * Return the Spanish description/label for a variable.
 * @param {string} column
 * @returns {string | undefined}
 */
export function getSpanishLabel(column) {
  return CATALOG.get(column)?.description;
}

/**
 * Return the Spanish value legend for a coded variable, or null if it is not a
 * coded variable.
 * @param {string} column
 * @returns {Record<string, string> | null}
 */
export function getValueLegend(column) {
  return CATALOG.get(column)?.legend ?? null;
}

/**
 * Format a raw coded value into its Spanish meaning when a legend applies;
 * otherwise returns the value stringified ('' for null/undefined).
 * @param {string} column
 * @param {number|string|null|undefined} value
 * @returns {string}
 */
export function formatValue(column, value) {
  const legend = getValueLegend(column);
  if (value === null || value === undefined) {
    return legend && "null" in legend ? legend["null"] : "";
  }
  if (legend && String(value) in legend) {
    return legend[String(value)];
  }
  return String(value);
}

/**
 * The complete catalog as an array (dictionary order).
 * @returns {VariableEntry[]}
 */
export function allVariables() {
  return [...CATALOG.values()];
}

export { CATALOG };
