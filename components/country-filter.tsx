"use client";

// Country filter: a searchable multi-select listing every dataset country by
// its Spanish display name. Supports selecting several countries for comparison
// and a single "Ver todos los países" control that clears the selection
// (empty = todos). The selected regions narrow which countries are offered.

import { useMemo, useState } from "react";
import { getDisplayName, getRegion } from "@/lib/regions";
import { useViewer } from "./viewer-context";

export function CountryFilter() {
  const {
    allCountries,
    selectedCountries,
    selectedRegions,
    toggleCountry,
    selectAllCountries,
  } = useViewer();
  const [query, setQuery] = useState("");

  // Countries available given the active region selection (empty = all).
  const available = useMemo(() => {
    const regionSet =
      selectedRegions.length > 0 ? new Set(selectedRegions) : null;
    return allCountries.filter(
      (c) => !regionSet || regionSet.has(getRegion(c)),
    );
  }, [allCountries, selectedRegions]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = available
      .map((key) => ({ key, name: getDisplayName(key) }))
      .sort((a, b) => a.name.localeCompare(b.name, "es"));
    if (!q) return list;
    return list.filter(
      ({ key, name }) =>
        name.toLowerCase().includes(q) || key.toLowerCase().includes(q),
    );
  }, [available, query]);

  const seeingAll = selectedCountries.length === 0;

  return (
    <section aria-labelledby="country-filter-title" className="space-y-2">
      <div className="flex items-center justify-between">
        <h3
          id="country-filter-title"
          className="text-sm font-semibold text-gray-800 dark:text-gray-100"
        >
          Filtrar por país
        </h3>
        <span className="text-xs text-gray-500">
          {seeingAll
            ? `Todos (${available.length})`
            : `${selectedCountries.length} seleccionados`}
        </span>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={selectAllCountries}
          aria-pressed={seeingAll}
          disabled={seeingAll}
          className={`rounded-md px-2 py-1 text-xs font-medium ${
            seeingAll
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200"
          }`}
        >
          Ver todos los países
        </button>
      </div>

      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar país…"
        aria-label="Buscar país"
        className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-900"
      />

      <ul className="max-h-64 space-y-0.5 overflow-y-auto rounded-md border border-gray-200 p-2 dark:border-gray-700">
        {filtered.length === 0 ? (
          <li className="px-1 py-2 text-xs text-gray-500">
            No se encontraron países.
          </li>
        ) : (
          filtered.map(({ key, name }) => {
            const checked = selectedCountries.includes(key);
            return (
              <li key={key}>
                <label className="flex cursor-pointer items-center gap-2 rounded px-1 py-1 text-sm hover:bg-gray-50 dark:hover:bg-gray-800">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleCountry(key)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <span>{name}</span>
                </label>
              </li>
            );
          })
        )}
      </ul>
    </section>
  );
}
