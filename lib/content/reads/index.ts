import type { DailyRead } from "../types";
import { READ_FIUMICINO } from "./01-fiumicino";
import { READ_MONTI_HOTEL } from "./02-monti-hotel";
import { READ_BAR_MORNING } from "./03-bar-morning";

export const DAILY_READS: DailyRead[] = [
  READ_FIUMICINO,
  READ_MONTI_HOTEL,
  READ_BAR_MORNING,
];

export const READS_BY_SLUG: Record<string, DailyRead> = Object.fromEntries(
  DAILY_READS.map((r) => [r.slug, r]),
);

export function findRead(slug: string): DailyRead | undefined {
  return READS_BY_SLUG[slug];
}

/**
 * Pick today's read based on the current "lesson streak day". If the user has
 * completed N reads, today's is read (N+1) — or wraps if past the catalog end.
 */
export function pickTodaysRead(completedCount: number): DailyRead {
  const i = completedCount % DAILY_READS.length;
  return DAILY_READS[i];
}
