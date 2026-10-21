"use client";

// Top-level viewer layout. Composes the theme navigation, the filters (region,
// country, year), the variable selector, the definition panel, the guiding
// questions and the analysis preview inside the shared ViewerProvider state
// container. Charts (FEAT-004) will slot into the main column next to the
// analysis preview.

import { ViewerProvider } from "./viewer-context";
import { ThemeNav } from "./theme-nav";
import { RegionFilter } from "./region-filter";
import { CountryFilter } from "./country-filter";
import { YearControl } from "./year-control";
import { VariableSelector } from "./variable-selector";
import { DefinitionPanel } from "./definition-panel";
import { QuestionsPanel } from "./questions-panel";
import { AnalysisPreview } from "./analysis-preview";
import type { SeriesPoint } from "@/lib/data";

export interface ViewerProps {
  allCountries: string[];
  minYear: number;
  maxYear: number;
  initialThemeId: string;
  initialVariable: string;
  initialSeries: SeriesPoint[];
}

export function Viewer(props: ViewerProps) {
  return (
    <ViewerProvider {...props}>
      <div className="grid gap-6 lg:grid-cols-[16rem_1fr]">
        {/* Sidebar: themes + filters */}
        <aside className="space-y-6">
          <ThemeNav />
          <div className="space-y-6 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
            <RegionFilter />
            <CountryFilter />
            <YearControl />
          </div>
        </aside>

        {/* Main column */}
        <div className="space-y-6">
          <VariableSelector />
          <QuestionsPanel />
          <AnalysisPreview />
          <DefinitionPanel />
        </div>
      </div>
    </ViewerProvider>
  );
}
