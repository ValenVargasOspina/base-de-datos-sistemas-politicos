// Typed re-export surface for the Next.js app. Implementation in chart-data.mjs.

import * as impl from "./chart-data.mjs";
import type { ProjectedRow } from "./filter";

export interface SeriesDescriptor {
  key: string;
  label: string;
}

export interface TimeSeriesResult {
  series: SeriesDescriptor[];
  data: Array<Record<string, number | null>>;
}

export interface ComparisonBar {
  key: string;
  label: string;
  value: number;
  count: number;
}

export interface CategoryDescriptor {
  code: string;
  label: string;
}

export interface CategoricalShareResult {
  categories: CategoryDescriptor[];
  data: Array<Record<string, number | string>>;
}

export type GroupBy = "country" | "region";

export const toNumber = impl.toNumber as (
  value: number | string | null | undefined,
) => number | null;

export const distinctYears = impl.distinctYears as (
  rows: ProjectedRow[],
) => number[];

export const buildTimeSeries = impl.buildTimeSeries as (
  rows: ProjectedRow[],
  options?: { groupBy?: GroupBy },
) => TimeSeriesResult;

export const latestYearWithData = impl.latestYearWithData as (
  rows: ProjectedRow[],
) => number | null;

export const buildContinuousComparison = impl.buildContinuousComparison as (
  rows: ProjectedRow[],
  options?: { groupBy?: GroupBy; year?: number },
) => ComparisonBar[];

export const buildCategoricalShare = impl.buildCategoricalShare as (
  rows: ProjectedRow[],
  legend: Record<string, string>,
  options?: { groupBy?: GroupBy; year?: number },
) => CategoricalShareResult;
