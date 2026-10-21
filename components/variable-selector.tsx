"use client";

// Variable selector: within the active theme, lets the user pick the variable
// to analyze. Changing the variable loads its compact series via a server
// action (the full dataset stays on the server).

import { THEMES } from "@/lib/themes";
import { getSpanishLabel } from "@/lib/variables";
import { useViewer } from "./viewer-context";
import { fetchVariableSeries } from "@/app/actions";

export function VariableSelector() {
  const { themeId, variable, setVariable, setSeries } = useViewer();
  const theme = THEMES.find((t) => t.id === themeId);
  const variables = theme?.variables ?? [];

  async function handleChange(column: string) {
    setVariable(column);
    const series = await fetchVariableSeries(column);
    setSeries(series);
  }

  return (
    <section aria-labelledby="variable-selector-title" className="space-y-2">
      <h3
        id="variable-selector-title"
        className="text-sm font-semibold text-gray-800 dark:text-gray-100"
      >
        Variable a analizar
      </h3>
      <label htmlFor="variable-select" className="sr-only">
        Variable a analizar
      </label>
      <select
        id="variable-select"
        value={variable}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-900"
      >
        {variables.map((column) => (
          <option key={column} value={column}>
            {getSpanishLabel(column) ?? column} ({column})
          </option>
        ))}
      </select>
    </section>
  );
}
