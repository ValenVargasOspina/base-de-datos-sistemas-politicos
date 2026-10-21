// Thematic grouping of the 129 DPI2020 variables into seven Spanish-labelled
// themes. This module is the backbone of the UI: every analytical view is
// organised around these themes. It is intentionally framework-free (.mjs) so
// that both the Next.js app and the Vitest unit tests can import it directly.

/**
 * Identifier columns that are NOT thematic variables. They are excluded from
 * the theme-coverage assertion (they describe each row, they are not analysed).
 * @type {readonly string[]}
 */
export const IDENTIFIER_COLUMNS = ["countryname", "ifs", "year"];

/**
 * @typedef {Object} Theme
 * @property {string} id       Stable identifier used across the app.
 * @property {string} label    Spanish display label.
 * @property {string} description Short Spanish description of the theme.
 * @property {string[]} variables Dataset column names assigned to this theme.
 */

/**
 * The seven thematic groups, in the order required by the plan. Every
 * non-identifier column of the dataset is assigned to exactly one theme.
 * @type {readonly Theme[]}
 */
export const THEMES = [
  {
    id: "sistema-politico",
    label: "Sistema político",
    description:
      "Tipo de régimen, contrapesos institucionales (checks), estabilidad, polarización y fragmentación del sistema de partidos.",
    variables: [
      "system",
      "checks",
      "checks_lax",
      "polariz",
      "tensys",
      "tensys_strict",
      "stabs",
      "stabs_strict",
      "stabns",
      "stabns_strict",
      "tenlong",
      "tenlong_strict",
      "tenshort",
      "tenshort_strict",
      "frac",
      "herftot",
      "maj",
      "partyage",
      "gwno",
    ],
  },
  {
    id: "poder-ejecutivo",
    label: "Poder Ejecutivo",
    description:
      "Jefatura del ejecutivo: años en el cargo, límites de reelección, orientación del partido del presidente y control del ejecutivo sobre el legislativo.",
    variables: [
      "yrsoffc",
      "finittrm",
      "yrcurnt",
      "termlimit",
      "reelect",
      "multpl",
      "military",
      "defmin",
      "percent1",
      "percentl",
      "prtyin",
      "execme",
      "execrlc",
      "execnat",
      "execrurl",
      "execreg",
      "execrel",
      "execage",
      "allhouse",
      "nonchief",
    ],
  },
  {
    id: "poder-legislativo-gobierno",
    label: "Poder Legislativo / Gobierno",
    description:
      "Composición del legislativo y de los partidos de gobierno: escaños, votos, orientación y fragmentación de las bancadas oficialistas.",
    variables: [
      "totalseats",
      "gov1me",
      "gov1seat",
      "gov1vote",
      "gov1rlc",
      "gov1nat",
      "gov1rurl",
      "gov1reg",
      "gov1rel",
      "gov1age",
      "gov2me",
      "gov2seat",
      "gov2vote",
      "gov2rlc",
      "gov2nat",
      "gov2rurl",
      "gov2reg",
      "gov2rel",
      "gov2age",
      "gov3me",
      "gov3seat",
      "gov3vote",
      "gov3rlc",
      "gov3nat",
      "gov3rurl",
      "gov3reg",
      "gov3rel",
      "gov3age",
      "govoth",
      "govothst",
      "govothvt",
      "numgov",
      "numvote",
      "herfgov",
      "govfrac",
    ],
  },
  {
    id: "oposicion",
    label: "Oposición",
    description:
      "Partidos de oposición y no alineados: escaños, votos, orientación, mayorías opositoras y fragmentación de la oposición.",
    variables: [
      "opp1me",
      "opp1seat",
      "opp1vote",
      "opp1rlc",
      "opp1nat",
      "opp1rurl",
      "opp1reg",
      "opp1rel",
      "opp1age",
      "opp2me",
      "opp2seat",
      "opp2vote",
      "opp3me",
      "opp3seat",
      "opp3vote",
      "oppoth",
      "oppothst",
      "oppothvt",
      "ulprty",
      "numul",
      "ulvote",
      "oppmajh",
      "oppmajs",
      "numopp",
      "oppvote",
      "herfopp",
      "oppfrac",
    ],
  },
  {
    id: "elecciones-sistema-electoral",
    label: "Elecciones y sistema electoral",
    description:
      "Calendario electoral, competitividad (LIEC/EIEC), fórmula electoral, magnitud de distrito, umbrales y selección de candidaturas.",
    variables: [
      "dateleg",
      "dateexec",
      "legelec",
      "exelec",
      "liec",
      "eiec",
      "mdmh",
      "mdms",
      "ssh",
      "pluralty",
      "pr",
      "housesys",
      "sensys",
      "thresh",
      "dhondt",
      "cl",
      "select",
      "fraud",
    ],
  },
  {
    id: "federalismo-gobierno-subnacional",
    label: "Federalismo y gobierno subnacional",
    description:
      "Descentralización: regiones autónomas, gobiernos municipales y estatales, autoridad fiscal subnacional y representación territorial en el senado.",
    variables: ["auton", "muni", "state", "author", "stconst"],
  },
  {
    id: "cuotas-de-genero",
    label: "Cuotas de género",
    description:
      "Existencia y tipo de cuotas de género para cargos políticos y el año de su implementación efectiva.",
    variables: ["gq", "gqi"],
  },
];

/**
 * Flat set of every variable assigned to a theme (for fast membership checks).
 * @type {Set<string>}
 */
export const ASSIGNED_VARIABLES = new Set(
  THEMES.flatMap((theme) => theme.variables),
);

/**
 * Return the theme that owns a given variable, or undefined if unassigned.
 * @param {string} variable
 * @returns {Theme | undefined}
 */
export function getThemeForVariable(variable) {
  return THEMES.find((theme) => theme.variables.includes(variable));
}

/**
 * Validate that the themes partition the supplied column list exactly.
 *
 * Given the authoritative list of dataset columns, this verifies that every
 * non-identifier column is assigned to exactly one theme and that no theme
 * references an unknown column. Returns a report rather than throwing so that
 * callers (tests, build checks) can present precise diagnostics.
 *
 * @param {string[]} columns Authoritative dataset column names.
 * @returns {{ ok: boolean, missing: string[], duplicated: string[], unknown: string[] }}
 */
export function validateThemeCoverage(columns) {
  const thematicColumns = columns.filter(
    (col) => !IDENTIFIER_COLUMNS.includes(col),
  );

  // Columns referenced more than once across all themes.
  const counts = new Map();
  for (const theme of THEMES) {
    for (const v of theme.variables) {
      counts.set(v, (counts.get(v) ?? 0) + 1);
    }
  }
  const duplicated = [...counts.entries()]
    .filter(([, n]) => n > 1)
    .map(([v]) => v);

  // Thematic columns that no theme assigns.
  const missing = thematicColumns.filter((col) => !ASSIGNED_VARIABLES.has(col));

  // Variables assigned by a theme that do not exist in the dataset columns.
  const columnSet = new Set(columns);
  const unknown = [...ASSIGNED_VARIABLES].filter((v) => !columnSet.has(v));

  return {
    ok: missing.length === 0 && duplicated.length === 0 && unknown.length === 0,
    missing,
    duplicated,
    unknown,
  };
}
