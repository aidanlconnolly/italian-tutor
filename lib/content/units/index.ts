import type { Unit } from "../types";
import { UNIT_ALPHABET } from "./01-alphabet";
import { UNIT_GREETINGS } from "./02-greetings";
import { UNIT_NUMBERS_TIME } from "./03-numbers-time";
import { UNIT_ARTICLES } from "./04-articles";
import { UNIT_ESSERE_AVERE } from "./05-essere-avere";

/**
 * All authored units, in stage+order sequence.
 * Stage 2-8 unit previews live in `lib/content/stages.ts` as UNIT_OUTLINE.
 */
export const UNITS: Unit[] = [
  UNIT_ALPHABET,
  UNIT_GREETINGS,
  UNIT_NUMBERS_TIME,
  UNIT_ARTICLES,
  UNIT_ESSERE_AVERE,
];

export const UNITS_BY_SLUG: Record<string, Unit> = Object.fromEntries(
  UNITS.map((u) => [u.slug, u]),
);

export function findUnit(slug: string): Unit | undefined {
  return UNITS_BY_SLUG[slug];
}

export function findLesson(
  unitSlug: string,
  lessonSlug: string,
): { unit: Unit; lessonIndex: number } | undefined {
  const unit = UNITS_BY_SLUG[unitSlug];
  if (!unit) return undefined;
  const lessonIndex = unit.lessons.findIndex((l) => l.slug === lessonSlug);
  if (lessonIndex < 0) return undefined;
  return { unit, lessonIndex };
}

/** Reverse lookup: which unit owns a given lesson slug? */
export function findUnitByLessonSlug(lessonSlug: string): Unit | undefined {
  return UNITS.find((u) => u.lessons.some((l) => l.slug === lessonSlug));
}
