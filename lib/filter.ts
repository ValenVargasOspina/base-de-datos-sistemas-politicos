// Typed re-export surface for the Next.js app. Implementation in filter.mjs.

import * as impl from "./filter.mjs";

export interface DataRow {
  countryname: string;
  ifs: string;
  year: number;
  [column: string]: number | string | null;
}

export interface FilterState {
  regions?: string[];
  countries?: string[];
  yearMin?: number;
  yearMax?: number;
  variable?: string;
}

export interface ProjectedRow {
  countryname: string;
  ifs: string;
  year: number;
  region: string;
  value: number | string | null;
}

export const resolveAllowedCountries = impl.resolveAllowedCountries as (
  allCountries: string[],
  regions: string[] | undefined,
  countries: string[] | undefined,
) => Set<string>;

export const selectRows = impl.selectRows as unknown as (
  rows: DataRow[],
  state?: FilterState,
  allCountries?: string[],
) => DataRow[] | ProjectedRow[];

export const countSelectedCountries = impl.countSelectedCountries as (
  rows: DataRow[],
  state?: FilterState,
  allCountries?: string[],
) => number;
