"use client";

// Analysis preview. The actual charts land in FEAT-004; this component proves
// the derived "filtered rows" selector is wired by summarizing the current
// selection (how many countries, observations and the active variable). It also
// renders the empty state required by the plan.

import { useMemo } from "react";
import { THEMES } from "@/lib/themes";
import { getSpanishLabel } from "@/lib/variables";
import { getDisplayName } from "@/lib/regions";
import { useViewer } from "./viewer-context";

export function AnalysisPreview() {
  const {
    themeId,
    variable,
    filteredRows,
    selectedCountries,
    selectedRegions,
    yearMin,
    yearMax,
  } = useViewer();

  const theme = THEMES.find((t) => t.id === themeId);

  const distinctCountries = useMemo(
    () => [...new Set(filteredRows.map((r) => r.countryname))],
    [filteredRows],
  );

  const scope =
    selectedCountries.length > 0
      ? `${selectedCountries.length} países seleccionados`
      : selectedRegions.length > 0
        ? `${selectedRegions.length} regiones (${distinctCountries.length} países)`
        : "Todos los países";

  if (filteredRows.length === 0) {
    return (
      <section className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500 dark:border-gray-700">
        Selecciona al menos un país (o una región) para ver el análisis.
      </section>
    );
  }

  const sample = distinctCountries.slice(0, 8).map(getDisplayName);

  return (
    <section
      aria-labelledby="analysis-title"
      className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
    >
      <h2
        id="analysis-title"
        className="text-base font-semibold text-gray-900 dark:text-gray-50"
      >
        {theme?.label}: {getSpanishLabel(variable) ?? variable}
      </h2>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
        {theme?.description}
      </p>

      <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="rounded-md border border-gray-200 p-3 dark:border-gray-700">
          <dt className="text-xs text-gray-500">Alcance</dt>
          <dd className="mt-1 text-sm font-medium">{scope}</dd>
        </div>
        <div className="rounded-md border border-gray-200 p-3 dark:border-gray-700">
          <dt className="text-xs text-gray-500">Observaciones</dt>
          <dd className="mt-1 text-sm font-medium">{filteredRows.length}</dd>
        </div>
        <div className="rounded-md border border-gray-200 p-3 dark:border-gray-700">
          <dt className="text-xs text-gray-500">Periodo</dt>
          <dd className="mt-1 text-sm font-medium">
            {yearMin}–{yearMax}
          </dd>
        </div>
      </dl>

      <p className="mt-4 text-xs text-gray-500">
        Países en la vista: {sample.join(", ")}
        {distinctCountries.length > sample.length
          ? `, y ${distinctCountries.length - sample.length} más`
          : ""}
        .
      </p>
      <p className="mt-3 text-xs text-gray-400">
        Los gráficos comparativos de abajo usan esta misma selección.
      </p>
    </section>
  );
}
