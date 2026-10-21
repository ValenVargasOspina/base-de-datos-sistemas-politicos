// Typed re-export surface for the Next.js app. The implementation lives in the
// framework-free lib/themes.mjs (shared with the Vitest tests); here we add the
// TypeScript types the UI relies on.

import * as impl from "./themes.mjs";

export interface Theme {
  id: string;
  label: string;
  description: string;
  variables: string[];
}

export interface ThemeCoverageReport {
  ok: boolean;
  missing: string[];
  duplicated: string[];
  unknown: string[];
}

export const IDENTIFIER_COLUMNS = impl.IDENTIFIER_COLUMNS as readonly string[];
export const THEMES = impl.THEMES as readonly Theme[];
export const ASSIGNED_VARIABLES = impl.ASSIGNED_VARIABLES as Set<string>;

export const getThemeForVariable = impl.getThemeForVariable as (
  variable: string,
) => Theme | undefined;

export const validateThemeCoverage = impl.validateThemeCoverage as (
  columns: string[],
) => ThemeCoverageReport;
