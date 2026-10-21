// Pedagogical guiding questions ('preguntas enfocadas') per theme. These orient
// students toward comparative analysis across countries, regions and time.
// Framework-free (.mjs) so the Next.js app and Vitest can both import it.
//
// Each question set is tied to a theme id from lib/themes.mjs.

/**
 * @typedef {Object} QuestionSet
 * @property {string} themeId   Matches a Theme.id in lib/themes.mjs.
 * @property {string[]} questions Spanish guiding questions (3-5 per theme).
 */

/** @type {readonly QuestionSet[]} */
export const QUESTIONS = [
  {
    themeId: "sistema-politico",
    questions: [
      "¿Cómo cambia el número de contrapesos (checks) en América Latina y el Caribe frente a Medio Oriente y Norte de África a lo largo del tiempo?",
      "¿Qué regiones muestran mayor estabilidad del sistema político (tensys) entre 1975 y 2020?",
      "¿Existe relación entre la polarización (polariz) y la fragmentación del sistema de partidos (frac)?",
      "¿En qué países predomina cada tipo de sistema político (presidencial, parlamentario o presidente electo por asamblea)?",
    ],
  },
  {
    themeId: "poder-ejecutivo",
    questions: [
      "¿Qué relación hay entre los límites de reelección (termlimit) y los años del ejecutivo en el cargo (yrsoffc)?",
      "¿Cómo varía la orientación ideológica del partido del ejecutivo (execrlc) entre regiones?",
      "¿En qué medida el partido del ejecutivo controla todas las cámaras (allhouse) según el tipo de sistema?",
      "¿Qué países tienen ejecutivos militares (military) y cómo evoluciona esto en el tiempo?",
    ],
  },
  {
    themeId: "poder-legislativo-gobierno",
    questions: [
      "¿Cómo se concentra el poder legislativo según el índice de Herfindahl del gobierno (herfgov) por región?",
      "¿Qué tan fragmentadas están las coaliciones de gobierno (govfrac) en los distintos continentes?",
      "¿Cómo se relaciona el total de escaños (totalseats) con el número de partidos de gobierno (govoth)?",
      "¿Qué orientación ideológica (gov1rlc) predomina entre los principales partidos de gobierno?",
    ],
  },
  {
    themeId: "oposicion",
    questions: [
      "¿Con qué frecuencia la oposición alcanza una mayoría en la cámara baja (oppmajh) según la región?",
      "¿Cómo se compara la fraccionalización de la oposición (oppfrac) entre América Latina y el Caribe y Medio Oriente y Norte de África?",
      "¿Qué peso tienen los partidos no alineados (ulprty) en los distintos sistemas políticos?",
      "¿Cómo evoluciona la fuerza electoral de la oposición (oppvote) a lo largo del tiempo?",
    ],
  },
  {
    themeId: "elecciones-sistema-electoral",
    questions: [
      "¿Cómo evoluciona la competitividad electoral (liec/eiec) por región entre 1975 y 2020?",
      "¿Qué países usan reglas mayoritarias (housesys) frente a representación proporcional (pr)?",
      "¿Hay relación entre la magnitud media de distrito (mdmh) y la fragmentación del sistema de partidos?",
      "¿En qué contextos se reportan más casos de fraude electoral (fraud)?",
    ],
  },
  {
    themeId: "federalismo-gobierno-subnacional",
    questions: [
      "¿Qué regiones tienen más países con gobiernos estatales electos (state) y autoridad fiscal subnacional (author)?",
      "¿Cómo se relaciona la existencia de regiones autónomas (auton) con el tipo de sistema político?",
      "¿Los senadores representan a los estados o provincias (stconst) en los sistemas federales comparados?",
      "¿Cómo cambia la descentralización municipal (muni) a lo largo del tiempo en cada región?",
    ],
  },
  {
    themeId: "cuotas-de-genero",
    questions: [
      "¿En qué año implementaron cuotas de género (gqi) los países de cada región?",
      "¿Qué tipo de cuota de género (gq) es más común: escaños reservados, listas o cuotas voluntarias?",
      "¿Qué regiones adoptaron antes las cuotas de género y cuáles lo hicieron más tarde?",
      "¿Existe relación entre el tipo de sistema electoral y la adopción de cuotas de género?",
    ],
  },
];

/**
 * Return the guiding questions for a given theme id.
 * @param {string} themeId
 * @returns {string[]}
 */
export function getQuestionsForTheme(themeId) {
  return QUESTIONS.find((q) => q.themeId === themeId)?.questions ?? [];
}
