// Typed re-export surface for the Next.js app. Implementation in variables.mjs.

import * as impl from "./variables.mjs";

export interface VariableEntry {
  column: string;
  descriptionEn: string;
  description: string;
  type: string;
  choices: string;
  kind: "categorical" | "continuous";
  legend: Record<string, string> | null;
}

export const getVariable = impl.getVariable as (
  column: string,
) => VariableEntry | undefined;
export const getSpanishLabel = impl.getSpanishLabel as (
  column: string,
) => string | undefined;
export const getValueLegend = impl.getValueLegend as (
  column: string,
) => Record<string, string> | null;
export const formatValue = impl.formatValue as (
  column: string,
  value: number | string | null | undefined,
) => string;
export const allVariables = impl.allVariables as () => VariableEntry[];
