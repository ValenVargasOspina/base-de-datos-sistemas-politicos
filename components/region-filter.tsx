"use client";

// Region filter: lets the user select one or more regions to narrow the country
// universe and enable cross-region comparison (e.g. América Latina y el Caribe
// vs Medio Oriente y Norte de África). Selecting no region means "todas".

import { REGIONS } from "@/lib/regions";
import { useViewer } from "./viewer-context";

export function RegionFilter() {
  const { selectedRegions, toggleRegion, clearRegions } = useViewer();

  return (
    <section aria-labelledby="region-filter-title" className="space-y-2">
      <div className="flex items-center justify-between">
        <h3
          id="region-filter-title"
          className="text-sm font-semibold text-gray-800 dark:text-gray-100"
        >
          Filtrar por región
        </h3>
        <button
          type="button"
          onClick={clearRegions}
          className="text-xs text-blue-600 hover:underline disabled:text-gray-400 disabled:no-underline"
          disabled={selectedRegions.length === 0}
        >
          Todas las regiones
        </button>
      </div>
      <p className="text-xs text-gray-500">
        Selecciona dos regiones para compararlas (por ejemplo, América Latina y
        el Caribe frente a Medio Oriente y Norte de África).
      </p>
      <ul className="space-y-1">
        {REGIONS.map((region) => {
          const checked = selectedRegions.includes(region);
          return (
            <li key={region}>
              <label className="flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleRegion(region)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <span>{region}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
