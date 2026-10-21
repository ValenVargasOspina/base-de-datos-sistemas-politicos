"use client";

// Year range control (1975-2020). Two bound selectors scope the data shown;
// FEAT-004 charts read yearMin/yearMax from the viewer state.

import { useViewer } from "./viewer-context";

export function YearControl() {
  const { minYear, maxYear, yearMin, yearMax, setYearRange } = useViewer();
  const years: number[] = [];
  for (let y = minYear; y <= maxYear; y++) years.push(y);

  function handleMin(value: number) {
    setYearRange(value, Math.max(value, yearMax));
  }
  function handleMax(value: number) {
    setYearRange(Math.min(yearMin, value), value);
  }

  return (
    <section aria-labelledby="year-control-title" className="space-y-2">
      <div className="flex items-center justify-between">
        <h3
          id="year-control-title"
          className="text-sm font-semibold text-gray-800 dark:text-gray-100"
        >
          Periodo
        </h3>
        <button
          type="button"
          onClick={() => setYearRange(minYear, maxYear)}
          className="text-xs text-blue-600 hover:underline disabled:text-gray-400 disabled:no-underline"
          disabled={yearMin === minYear && yearMax === maxYear}
        >
          Todo el periodo
        </button>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <label className="flex items-center gap-1">
          <span className="text-gray-500">Desde</span>
          <select
            value={yearMin}
            onChange={(e) => handleMin(Number(e.target.value))}
            aria-label="Año inicial"
            className="rounded-md border border-gray-300 px-2 py-1 dark:border-gray-700 dark:bg-gray-900"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-1">
          <span className="text-gray-500">Hasta</span>
          <select
            value={yearMax}
            onChange={(e) => handleMax(Number(e.target.value))}
            aria-label="Año final"
            className="rounded-md border border-gray-300 px-2 py-1 dark:border-gray-700 dark:bg-gray-900"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
}
