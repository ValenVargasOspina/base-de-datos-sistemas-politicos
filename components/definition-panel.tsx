"use client";

// Definition consultation panel (requirement 5). Shows, for the active
// variable: its Spanish label, the English short description from the
// dictionary, the variable type, and — for coded variables — the value legend
// (code -> Spanish meaning).

import { getVariable } from "@/lib/variables";
import { useViewer } from "./viewer-context";

export function DefinitionPanel() {
  const { variable } = useViewer();
  const entry = getVariable(variable);

  if (!entry) {
    return (
      <section className="rounded-lg border border-gray-200 p-4 text-sm text-gray-500 dark:border-gray-700">
        Selecciona una variable para consultar su definición.
      </section>
    );
  }

  const legendEntries = entry.legend
    ? Object.entries(entry.legend).filter(([code]) => code !== "null")
    : [];
  const missingMeaning = entry.legend?.["null"];

  return (
    <section
      aria-labelledby="definition-title"
      className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
    >
      <h3
        id="definition-title"
        className="text-base font-semibold text-gray-900 dark:text-gray-50"
      >
        {entry.description}
      </h3>
      <p className="mt-1 text-xs text-gray-500">
        Variable <code className="font-mono">{entry.column}</code> ·{" "}
        {entry.kind === "categorical" ? "Categórica" : "Continua"} · tipo{" "}
        <code className="font-mono">{entry.type || "—"}</code>
      </p>

      {entry.descriptionEn ? (
        <p className="mt-3 text-sm text-gray-700 dark:text-gray-200">
          <span className="font-medium">Descripción (inglés): </span>
          {entry.descriptionEn}
        </p>
      ) : null}

      {entry.legend ? (
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
            Leyenda de valores
          </h4>
          <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
            {legendEntries.map(([code, meaning]) => (
              <div key={code} className="contents">
                <dt className="font-mono text-gray-500">{code}</dt>
                <dd className="text-gray-700 dark:text-gray-200">{meaning}</dd>
              </div>
            ))}
            {missingMeaning ? (
              <div className="contents">
                <dt className="font-mono text-gray-500">N/D</dt>
                <dd className="text-gray-700 dark:text-gray-200">
                  {missingMeaning}
                </dd>
              </div>
            ) : null}
          </dl>
        </div>
      ) : (
        <p className="mt-4 text-xs text-gray-500">
          Variable continua: se representa por su valor numérico.
        </p>
      )}
    </section>
  );
}
