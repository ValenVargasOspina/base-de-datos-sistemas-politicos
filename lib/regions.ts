// Typed re-export surface for the Next.js app. Implementation in regions.mjs.

import * as impl from "./regions.mjs";

export const REGIONS = impl.REGIONS as readonly string[];
export const FALLBACK_REGION = impl.FALLBACK_REGION as string;
export const COUNTRY_REGION = impl.COUNTRY_REGION as Record<string, string>;
export const COUNTRY_DISPLAY_NAME = impl.COUNTRY_DISPLAY_NAME as Record<
  string,
  string
>;

export const getRegion = impl.getRegion as (countryName: string) => string;
export const getDisplayName = impl.getDisplayName as (
  countryName: string,
) => string;
export const groupByRegion = impl.groupByRegion as (
  countryNames: string[],
) => Record<string, string[]>;
