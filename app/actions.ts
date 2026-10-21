"use server";

// Server Actions for the viewer. These run on the server only, so they can read
// the full 15MB dataset and return just the compact (country, year, value)
// series for the requested variable. The client never receives the full
// dataset.

import { getVariableSeries, type SeriesPoint } from "@/lib/data";

export async function fetchVariableSeries(
  column: string,
): Promise<SeriesPoint[]> {
  return getVariableSeries(column);
}
