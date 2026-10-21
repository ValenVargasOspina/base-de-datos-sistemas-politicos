"use client";

// Thematic navigation: renders the seven DPI2020 themes as a vertical nav.
// Selecting a theme updates the viewer state and resets the active variable to
// the first variable of the chosen theme (loading its compact series).

import { THEMES } from "@/lib/themes";
import { useViewer } from "./viewer-context";
import { fetchVariableSeries } from "@/app/actions";

export function ThemeNav() {
  const { themeId, setThemeId, setVariable, setSeries } = useViewer();

  async function handleSelect(id: string) {
    if (id === themeId) return;
    setThemeId(id);
    const theme = THEMES.find((t) => t.id === id);
    const firstVar = theme?.variables[0];
    if (firstVar) {
      setVariable(firstVar);
      const series = await fetchVariableSeries(firstVar);
      setSeries(series);
    }
  }

  return (
    <nav aria-label="Temas principales" className="space-y-1">
      <h2 className="px-2 pb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
        Temas principales
      </h2>
      {THEMES.map((theme) => {
        const active = theme.id === themeId;
        return (
          <button
            key={theme.id}
            type="button"
            onClick={() => handleSelect(theme.id)}
            aria-current={active ? "page" : undefined}
            className={`block w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
              active
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
            }`}
          >
            {theme.label}
          </button>
        );
      })}
    </nav>
  );
}
