"use server";

import { and, desc, eq, gte } from "drizzle-orm";
import { nanoid } from "nanoid";
import { db, schema } from "@/lib/db/client";
import { findUnit, UNITS } from "@/lib/content/units";

/* ─────────── Lesson progress ─────────── */

export type LessonStatus = {
  lessonSlug: string;
  unitSlug: string;
  completedAt: number;
  score: number;
};

export async function getAllLessonProgress(): Promise<LessonStatus[]> {
  const rows = await db.select().from(schema.lessonProgress);
  return rows.map((r) => ({
    lessonSlug: r.lessonSlug,
    unitSlug: r.unitSlug,
    completedAt: r.completedAt,
    score: r.score,
  }));
}

export async function markLessonDone(args: {
  unitSlug: string;
  lessonSlug: string;
  score: number;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const now = Date.now();
    const existing = await db
      .select()
      .from(schema.lessonProgress)
      .where(eq(schema.lessonProgress.lessonSlug, args.lessonSlug))
      .limit(1);
    if (existing.length > 0) {
      await db
        .update(schema.lessonProgress)
        .set({ score: Math.max(existing[0].score, args.score), completedAt: now })
        .where(eq(schema.lessonProgress.lessonSlug, args.lessonSlug));
    } else {
      await db.insert(schema.lessonProgress).values({
        id: nanoid(),
        lessonSlug: args.lessonSlug,
        unitSlug: args.unitSlug,
        completedAt: now,
        score: args.score,
      });
    }
    await touchStreak("lesson");
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

/* ─────────── Checkpoint attempts ─────────── */

export type CheckpointStatus = {
  unitSlug: string;
  bestScore: number;
  passed: boolean;
  lastTakenAt: number | null;
};

export async function getAllCheckpointStatus(): Promise<CheckpointStatus[]> {
  const rows = await db
    .select()
    .from(schema.checkpointAttempts)
    .orderBy(desc(schema.checkpointAttempts.takenAt));
  const byUnit = new Map<string, CheckpointStatus>();
  for (const r of rows) {
    const cur = byUnit.get(r.unitSlug);
    if (!cur) {
      byUnit.set(r.unitSlug, {
        unitSlug: r.unitSlug,
        bestScore: r.score,
        passed: r.passed,
        lastTakenAt: r.takenAt,
      });
    } else {
      byUnit.set(r.unitSlug, {
        unitSlug: r.unitSlug,
        bestScore: Math.max(cur.bestScore, r.score),
        passed: cur.passed || r.passed,
        lastTakenAt: Math.max(cur.lastTakenAt ?? 0, r.takenAt),
      });
    }
  }
  return Array.from(byUnit.values());
}

export async function recordCheckpoint(args: {
  unitSlug: string;
  score: number;
}): Promise<{ ok: true; passed: boolean } | { ok: false; error: string }> {
  try {
    const unit = findUnit(args.unitSlug);
    if (!unit) return { ok: false, error: "Unknown unit" };
    const passed = args.score >= unit.checkpoint.passingPct;
    await db.insert(schema.checkpointAttempts).values({
      id: nanoid(),
      unitSlug: args.unitSlug,
      score: args.score,
      passed,
      takenAt: Date.now(),
    });
    return { ok: true, passed };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

/* ─────────── Read progress ─────────── */

export async function getAllReadProgress(): Promise<
  { readSlug: string; completedAt: number; comprehensionScore: number }[]
> {
  const rows = await db.select().from(schema.readProgress);
  return rows.map((r) => ({
    readSlug: r.readSlug,
    completedAt: r.completedAt,
    comprehensionScore: r.comprehensionScore,
  }));
}

export async function markReadDone(args: {
  readSlug: string;
  comprehensionScore: number;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const existing = await db
      .select()
      .from(schema.readProgress)
      .where(eq(schema.readProgress.readSlug, args.readSlug))
      .limit(1);
    if (existing.length > 0) {
      await db
        .update(schema.readProgress)
        .set({
          completedAt: Date.now(),
          comprehensionScore: Math.max(
            existing[0].comprehensionScore,
            args.comprehensionScore,
          ),
        })
        .where(eq(schema.readProgress.readSlug, args.readSlug));
    } else {
      await db.insert(schema.readProgress).values({
        id: nanoid(),
        readSlug: args.readSlug,
        completedAt: Date.now(),
        comprehensionScore: args.comprehensionScore,
      });
    }
    await touchStreak("read");
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

/* ─────────── Streaks ─────────── */

function localDay(d: Date = new Date()): string {
  // YYYY-MM-DD in local time
  const yr = d.getFullYear();
  const mo = String(d.getMonth() + 1).padStart(2, "0");
  const da = String(d.getDate()).padStart(2, "0");
  return `${yr}-${mo}-${da}`;
}

function priorDay(day: string): string {
  const [y, m, d] = day.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() - 1);
  return localDay(date);
}

export type StreakInfo = {
  kind: "lesson" | "read";
  current: number;
  longest: number;
  lastDay: string | null;
};

export async function getStreak(kind: "lesson" | "read"): Promise<StreakInfo> {
  const rows = await db
    .select()
    .from(schema.streaks)
    .where(eq(schema.streaks.kind, kind))
    .limit(1);
  if (rows.length === 0) {
    return { kind, current: 0, longest: 0, lastDay: null };
  }
  const r = rows[0];
  // If lastDay is older than yesterday, the streak is dead
  const today = localDay();
  const yest = priorDay(today);
  const live = r.lastDay === today || r.lastDay === yest;
  return {
    kind,
    current: live ? r.current : 0,
    longest: r.longest,
    lastDay: r.lastDay,
  };
}

async function touchStreak(kind: "lesson" | "read"): Promise<void> {
  const today = localDay();
  const yest = priorDay(today);
  const rows = await db
    .select()
    .from(schema.streaks)
    .where(eq(schema.streaks.kind, kind))
    .limit(1);
  if (rows.length === 0) {
    await db.insert(schema.streaks).values({
      kind,
      current: 1,
      longest: 1,
      lastDay: today,
    });
    return;
  }
  const r = rows[0];
  if (r.lastDay === today) return; // already counted today
  const newCurrent = r.lastDay === yest ? r.current + 1 : 1;
  const newLongest = Math.max(r.longest, newCurrent);
  await db
    .update(schema.streaks)
    .set({ current: newCurrent, longest: newLongest, lastDay: today })
    .where(eq(schema.streaks.kind, kind));
}

/* ─────────── Aggregated dashboard ─────────── */

export type RoadmapSummary = {
  unitSlugsCompleted: Set<string>;
  lessonsCompleted: Set<string>;
  totalLessons: number;
  totalAuthoredLessons: number;
  lessonStreak: number;
  readStreak: number;
  readsCompleted: Set<string>;
};

export async function getRoadmapSummary(): Promise<RoadmapSummary> {
  const [lessons, checkpoints, reads, lessonStreak, readStreak] =
    await Promise.all([
      getAllLessonProgress(),
      getAllCheckpointStatus(),
      getAllReadProgress(),
      getStreak("lesson"),
      getStreak("read"),
    ]);
  const unitSlugsCompleted = new Set(
    checkpoints.filter((c) => c.passed).map((c) => c.unitSlug),
  );
  const lessonsCompleted = new Set(lessons.map((l) => l.lessonSlug));
  const readsCompleted = new Set(reads.map((r) => r.readSlug));
  return {
    unitSlugsCompleted,
    lessonsCompleted,
    totalLessons: lessonsCompleted.size,
    totalAuthoredLessons: UNITS.reduce((s, u) => s + u.lessons.length, 0),
    lessonStreak: lessonStreak.current,
    readStreak: readStreak.current,
    readsCompleted,
  };
}

/** Recent checkpoint attempts list (for showing past scores). */
export async function getRecentCheckpointAttempts(unitSlug: string, limit = 5) {
  return db
    .select()
    .from(schema.checkpointAttempts)
    .where(
      and(
        eq(schema.checkpointAttempts.unitSlug, unitSlug),
        gte(schema.checkpointAttempts.takenAt, 0),
      ),
    )
    .orderBy(desc(schema.checkpointAttempts.takenAt))
    .limit(limit);
}
