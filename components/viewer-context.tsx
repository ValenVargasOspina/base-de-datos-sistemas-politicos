"use client";

// Central client-side state container for the viewer. Holds the active theme,
// the selected variable, the selected countries and regions, and the year
// range. Exposes a derived "filtered rows" selector (via lib/filter) so the
// charts added in FEAT-004 can consume the current selection without each
// component re-deriving it.

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { selectRows, type ProjectedRow } from "@/lib/filter";
import type { SeriesPoint } from "@/lib/data";

export interface ViewerState {
  themeId: string;
  variable: string;
  selectedCountries: string[];
  selectedRegions: string[];
  yearMin: number;
  yearMax: number;
}

export interface ViewerContextValue extends ViewerState {
  minYear: number;
  maxYear: number;
  allCountries: string[];
  setThemeId: (id: string) => void;
  setVariable: (column: string) => void;
  setSelectedCountries: (countries: string[]) => void;
  toggleCountry: (country: string) => void;
  selectAllCountries: () => void;
  clearCountries: () => void;
  setSelectedRegions: (regions: string[]) => void;
  toggleRegion: (region: string) => void;
  clearRegions: () => void;
  setYearRange: (min: number, max: number) => void;
  /** Compact series for the active variable (set by the loader on change). */
  series: SeriesPoint[];
  setSeries: (series: SeriesPoint[]) => void;
  /** Derived filtered + projected rows for the active variable. */
  filteredRows: ProjectedRow[];
}

const ViewerContext = createContext<ViewerContextValue | null>(null);

export interface ViewerProviderProps {
  children: ReactNode;
  allCountries: string[];
  minYear: number;
  maxYear: number;
  initialThemeId: string;
  initialVariable: string;
  initialSeries: SeriesPoint[];
}

export function ViewerProvider({
  children,
  allCountries,
  minYear,
  maxYear,
  initialThemeId,
  initialVariable,
  initialSeries,
}: ViewerProviderProps) {
  const [themeId, setThemeId] = useState(initialThemeId);
  const [variable, setVariable] = useState(initialVariable);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [yearMin, setYearMin] = useState(minYear);
  const [yearMax, setYearMax] = useState(maxYear);
  const [series, setSeries] = useState<SeriesPoint[]>(initialSeries);

  const toggleCountry = (country: string) =>
    setSelectedCountries((prev) =>
      prev.includes(country)
        ? prev.filter((c) => c !== country)
        : [...prev, country],
    );

  const selectAllCountries = () => setSelectedCountries([]); // empty = all
  const clearCountries = () => setSelectedCountries([]);

  const toggleRegion = (region: string) =>
    setSelectedRegions((prev) =>
      prev.includes(region)
        ? prev.filter((r) => r !== region)
        : [...prev, region],
    );

  const clearRegions = () => setSelectedRegions([]);

  const setYearRange = (min: number, max: number) => {
    setYearMin(min);
    setYearMax(max);
  };

  // Derived: apply region -> country -> year filtering to the compact series.
  // The series rows carry { countryname, year, value } for the active variable,
  // so we treat `value` as the projected variable directly.
  const filteredRows = useMemo<ProjectedRow[]>(() => {
    const rows = series.map((p) => ({
      countryname: p.countryname,
      ifs: "",
      year: p.year,
      __value: p.value,
    }));
    const selected = selectRows(
      rows as unknown as Parameters<typeof selectRows>[0],
      {
        regions: selectedRegions,
        countries: selectedCountries,
        yearMin,
        yearMax,
        variable: "__value",
      },
      allCountries,
    ) as ProjectedRow[];
    return selected;
  }, [
    series,
    selectedRegions,
    selectedCountries,
    yearMin,
    yearMax,
    allCountries,
  ]);

  const value: ViewerContextValue = {
    themeId,
    variable,
    selectedCountries,
    selectedRegions,
    yearMin,
    yearMax,
    minYear,
    maxYear,
    allCountries,
    setThemeId,
    setVariable,
    setSelectedCountries,
    toggleCountry,
    selectAllCountries,
    clearCountries,
    setSelectedRegions,
    toggleRegion,
    clearRegions,
    setYearRange,
    series,
    setSeries,
    filteredRows,
  };

  return (
    <ViewerContext.Provider value={value}>{children}</ViewerContext.Provider>
  );
}

export function useViewer(): ViewerContextValue {
  const ctx = useContext(ViewerContext);
  if (!ctx) {
    throw new Error("useViewer debe usarse dentro de <ViewerProvider>");
  }
  return ctx;
}
