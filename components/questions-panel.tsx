"use client";

// Pedagogical guiding questions ("preguntas enfocadas") for the active theme.
// Orients students toward comparative analysis. FEAT-004 may wire each question
// to a preset chart; here they are rendered to guide exploration.

import { getQuestionsForTheme } from "@/lib/questions";
import { useViewer } from "./viewer-context";

export function QuestionsPanel() {
  const { themeId } = useViewer();
  const questions = getQuestionsForTheme(themeId);

  if (questions.length === 0) return null;

  return (
    <section
      aria-labelledby="questions-title"
      className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30"
    >
      <h3
        id="questions-title"
        className="text-sm font-semibold text-amber-900 dark:text-amber-200"
      >
        Preguntas para orientar el análisis
      </h3>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-amber-900/90 dark:text-amber-100/90">
        {questions.map((q) => (
          <li key={q}>{q}</li>
        ))}
      </ul>
    </section>
  );
}
