"use client";

// Analytical charts for the viewer (FEAT-004, requirement 4). Reads the derived
// filtered rows + chart mode from the ViewerProvider and renders, with recharts:
//   - a time-series LineChart of the variable over 1975-2020 (one line per
//     selected country, or per region in compare-by-region mode). Null values
//     are gaps, never zeros.
//   - a comparison BarChart for a chosen (or latest) year: mean per group for
//     continuous variables, or a stacked share-by-category chart (using the
//     Spanish legend labels) for categorical variables.
// Spanish empty/edge states are shown when there is no selection or no data.

import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  buildCategoricalShare,
  buildContinuousComparison,
  buildTimeSeries,
  latestYearWithData,
} from "@/lib/chart-data";
import { getValueLegend, getSpanishLabel, getVariable } from "@/lib/variables";
import { useViewer } from "./viewer-context";

// A colour-blind-friendly palette reused across both charts.
const PALETTE = [
  "#2563eb",
  "#dc2626",
  "#16a34a",
  "#d97706",
  "#7c3aed",
  "#0891b2",
  "#db2777",
  "#65a30d",
  "#9333ea",
  "#0d9488",
  "#ca8a04",
  "#e11d48",
];

function color(index: number): string {
  return PALETTE[index % PALETTE.length];
}

/** Spanish-friendly numeric formatter for axes and tooltips. */
function formatNumber(value: unknown): string {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return "";
  const rounded = Math.round(n * 100) / 100;
  return rounded.toLocaleString("es-ES", { maximumFractionDigits: 2 });
}

function formatPercent(value: unknown): string {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return "";
  return `${(n * 100).toLocaleString("es-ES", { maximumFractionDigits: 0 })}%`;
}

export function Charts() {
  const {
    variable,
    filteredRows,
    selectedCountries,
    selectedRegions,
    groupMode,
    comparisonYear,
    setGroupMode,
    setComparisonYear,
    yearMin,
    yearMax,
  } = useViewer();

  // recharts' ResponsiveContainer needs the DOM; render charts only after mount
  // so the production build / prerender stays green.
  // Mount guard so recharts' ResponsiveContainer (DOM-dependent) renders only on
  // the client; the empty-dep effect runs once, so there is no render cascade.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const entry = getVariable(variable);
  const label = getSpanishLabel(variable) ?? variable;
  const legend = getValueLegend(variable);
  const isCategorical = entry?.kind === "categorical" && legend !== null;

  const hasData = filteredRows.some((r) => r.value !== null);

  const groupBy = groupMode;

  const timeSeries = useMemo(
    () => buildTimeSeries(filteredRows, { groupBy }),
    [filteredRows, groupBy],
  );

  const effectiveYear = useMemo(
    () => comparisonYear ?? latestYearWithData(filteredRows),
    [comparisonYear, filteredRows],
  );

  const continuousBars = useMemo(
    () =>
      isCategorical || effectiveYear === null
        ? []
        : buildContinuousComparison(filteredRows, {
            groupBy,
            year: effectiveYear,
          }),
    [filteredRows, groupBy, effectiveYear, isCategorical],
  );

  const categorical = useMemo(
    () =>
      isCategorical && legend
        ? buildCategoricalShare(filteredRows, legend, {
            groupBy,
            year: effectiveYear ?? undefined,
          })
        : { categories: [], data: [] },
    [filteredRows, legend, isCategorical, groupBy, effectiveYear],
  );

  const availableYears = useMemo(() => {
    const years = new Set<number>();
    for (const r of filteredRows) if (r.value !== null) years.add(r.year);
    return [...years].sort((a, b) => a - b);
  }, [filteredRows]);

  const noSelection =
    selectedCountries.length === 0 && selectedRegions.length === 0;

  if (filteredRows.length === 0) {
    return (
      <EmptyState>
        Selecciona al menos un país (o una región) para ver los gráficos.
      </EmptyState>
    );
  }

  if (!hasData) {
    return (
      <EmptyState>
        No hay datos de «{label}» para la selección y el periodo {yearMin}–
        {yearMax}. Prueba con otro país, región, variable o rango de años.
      </EmptyState>
    );
  }

  return (
    <div className="space-y-6">
      {/* Chart controls */}
      <div className="flex flex-wrap items-center gap-4 rounded-lg border border-gray-200 p-3 text-sm dark:border-gray-700">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-700 dark:text-gray-200">
            Comparar por:
          </span>
          <div className="inline-flex overflow-hidden rounded-md border border-gray-300 dark:border-gray-600">
            <button
              type="button"
              onClick={() => setGroupMode("country")}
              className={`px-3 py-1 ${
                groupMode === "country"
                  ? "bg-blue-600 text-white"
                  : "bg-transparent text-gray-700 dark:text-gray-200"
              }`}
            >
              País
            </button>
            <button
              type="button"
              onClick={() => setGroupMode("region")}
              className={`px-3 py-1 ${
                groupMode === "region"
                  ? "bg-blue-600 text-white"
                  : "bg-transparent text-gray-700 dark:text-gray-200"
              }`}
            >
              Región
            </button>
          </div>
        </div>

        <label className="flex items-center gap-2">
          <span className="font-medium text-gray-700 dark:text-gray-200">
            Año de comparación:
          </span>
          <select
            value={effectiveYear ?? ""}
            onChange={(e) =>
              setComparisonYear(e.target.value ? Number(e.target.value) : null)
            }
            className="rounded-md border border-gray-300 bg-white px-2 py-1 dark:border-gray-600 dark:bg-gray-800"
          >
            {availableYears.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>
        {groupMode === "region" && selectedRegions.length === 0 ? (
          <span className="text-xs text-amber-700 dark:text-amber-300">
            Mostrando todas las regiones; selecciona regiones en el filtro para
            acotar la comparación.
          </span>
        ) : null}
      </div>

      {/* Time-series chart */}
      <section
        aria-labelledby="timeseries-title"
        className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
      >
        <h2
          id="timeseries-title"
          className="text-base font-semibold text-gray-900 dark:text-gray-50"
        >
          {label}: evolución {yearMin}–{yearMax}
        </h2>
        <p className="mt-1 text-xs text-gray-500">
          Una línea por {groupMode === "region" ? "región" : "país"}. Los años
          sin datos aparecen como cortes en la línea.
          {isCategorical
            ? " Variable categórica: la línea muestra el código; consulta la leyenda de valores y el gráfico de distribución de abajo."
            : ""}
        </p>
        <div className="mt-4 h-80 w-full">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={timeSeries.data}
                margin={{ top: 8, right: 16, bottom: 8, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="year"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(v: number) => String(v)}
                />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={formatNumber} />
                <Tooltip
                  formatter={(value) => formatNumber(value)}
                  labelFormatter={(y) => `Año ${y}`}
                />
                <Legend />
                {timeSeries.series.map((s, i) => (
                  <Line
                    key={s.key}
                    type="monotone"
                    dataKey={s.key}
                    name={s.label}
                    stroke={color(i)}
                    strokeWidth={2}
                    dot={false}
                    connectNulls={false}
                    isAnimationActive={false}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <ChartPlaceholder />
          )}
        </div>
      </section>

      {/* Comparison chart */}
      <section
        aria-labelledby="comparison-title"
        className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
      >
        <h2
          id="comparison-title"
          className="text-base font-semibold text-gray-900 dark:text-gray-50"
        >
          {isCategorical
            ? `${label}: distribución por ${groupMode === "region" ? "región" : "país"}`
            : `${label}: comparación`}
          {effectiveYear !== null ? ` (${effectiveYear})` : ""}
        </h2>
        <p className="mt-1 text-xs text-gray-500">
          {isCategorical
            ? "Proporción de cada categoría (usando las etiquetas en español de la leyenda). Las categorías de cada grupo suman 100%."
            : `Promedio de «${label}» por ${
                groupMode === "region" ? "región" : "país"
              } en el año seleccionado (se excluyen los valores sin dato).`}
        </p>
        <div className="mt-4 h-80 w-full">
          {!mounted ? (
            <ChartPlaceholder />
          ) : isCategorical ? (
            categorical.data.length === 0 ? (
              <EmptyState>
                No hay datos categóricos para {effectiveYear ?? "el periodo"}.
              </EmptyState>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categorical.data}
                  margin={{ top: 8, right: 16, bottom: 8, left: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 11 }}
                    interval={0}
                    angle={-15}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickFormatter={formatPercent}
                    domain={[0, 1]}
                  />
                  <Tooltip
                    formatter={(value, name) => [formatPercent(value), name]}
                  />
                  <Legend />
                  {categorical.categories.map((c, i) => (
                    <Bar
                      key={c.code}
                      dataKey={c.code}
                      name={c.label}
                      stackId="share"
                      fill={color(i)}
                      isAnimationActive={false}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            )
          ) : continuousBars.length === 0 ? (
            <EmptyState>
              No hay datos para comparar en {effectiveYear ?? "el periodo"}.
            </EmptyState>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={continuousBars}
                margin={{ top: 8, right: 16, bottom: 8, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 11 }}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                  height={60}
                />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={formatNumber} />
                <Tooltip
                  formatter={(value) => [formatNumber(value), label]}
                />
                <Bar
                  dataKey="value"
                  name={label}
                  fill={color(0)}
                  isAnimationActive={false}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </section>

      {noSelection ? (
        <p className="text-xs text-gray-400">
          Estás viendo todos los países. Selecciona países o regiones en los
          filtros para una comparación más enfocada.
        </p>
      ) : null}
    </div>
  );
}

function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex h-full min-h-40 items-center justify-center rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500 dark:border-gray-700">
      {children}
    </section>
  );
}

function ChartPlaceholder() {
  return (
    <div className="flex h-full items-center justify-center text-sm text-gray-400">
      Cargando gráfico…
    </div>
  );
}
