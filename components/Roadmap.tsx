"use client";

import Link from "next/link";
import { STAGES, UNIT_OUTLINE, type UnitPreview } from "@/lib/content/stages";
import { UNITS } from "@/lib/content/units";

type RoadmapData = {
  unitsCompleted: string[];
  lessonsCompleted: string[];
};

export function Roadmap({ data }: { data: RoadmapData }) {
  const completedUnits = new Set(data.unitsCompleted);
  const completedLessons = new Set(data.lessonsCompleted);
  const builtSlugs = new Set(UNITS.map((u) => u.slug));

  // Stage unlock: stage N is unlocked when (N-1) is fully complete OR N === 1
  const stageUnlocked: Record<number, boolean> = { 1: true };
  for (const stage of STAGES) {
    if (stage.number === 1) continue;
    const prev = stage.number - 1;
    const prevUnits = UNIT_OUTLINE.filter((u) => u.stage === prev);
    stageUnlocked[stage.number] = prevUnits.every((u) =>
      completedUnits.has(u.slug),
    );
  }

  return (
    <div className="space-y-12">
      {STAGES.map((stage) => {
        const units = UNIT_OUTLINE.filter((u) => u.stage === stage.number);
        const unlocked = stageUnlocked[stage.number];
        return (
          <section key={stage.number}>
            <div
              className={[
                "mb-6 border-l-4 pl-4",
                unlocked ? "border-amber-500" : "border-zinc-300 opacity-60",
              ].join(" ")}
            >
              <div className="text-[10px] font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400">
                Stage {stage.number}
              </div>
              <h2 className="text-xl font-bold tracking-tight">
                {stage.title}{" "}
                {!unlocked && (
                  <span className="text-xs font-normal text-zinc-400">🔒 Locked</span>
                )}
              </h2>
              <p className="mt-1 text-sm text-zinc-500">{stage.blurb}</p>
            </div>
            <div className="relative">
              <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 border-l-2 border-dotted border-amber-300 sm:block" />
              <ul className="space-y-8">
                {units.map((u, i) => (
                  <UnitNode
                    key={u.slug}
                    unit={u}
                    side={i % 2 === 0 ? "left" : "right"}
                    isBuilt={builtSlugs.has(u.slug)}
                    isCompleted={completedUnits.has(u.slug)}
                    isUnlocked={unlocked && (i === 0 || prevUnitDone(units, i, completedUnits))}
                    completedLessons={completedLessons}
                  />
                ))}
              </ul>
            </div>
          </section>
        );
      })}
    </div>
  );
}

function prevUnitDone(
  units: UnitPreview[],
  index: number,
  completedUnits: Set<string>,
) {
  if (index === 0) return true;
  return completedUnits.has(units[index - 1].slug);
}

function UnitNode({
  unit,
  side,
  isBuilt,
  isCompleted,
  isUnlocked,
  completedLessons,
}: {
  unit: UnitPreview;
  side: "left" | "right";
  isBuilt: boolean;
  isCompleted: boolean;
  isUnlocked: boolean;
  completedLessons: Set<string>;
}) {
  const built = isBuilt
    ? UNITS.find((bu) => bu.slug === unit.slug)
    : undefined;
  const lessons = built?.lessons ?? [];
  const dotCount = built?.lessons.length ?? 0;

  const status: "complete" | "active" | "available" | "locked" | "preview" =
    isCompleted
      ? "complete"
      : !isBuilt
        ? "preview"
        : !isUnlocked
          ? "locked"
          : lessons.some((l) => completedLessons.has(l.slug))
            ? "active"
            : "available";

  const cardClass =
    status === "complete"
      ? "border-emerald-500"
      : status === "active"
        ? "border-amber-500 ring-2 ring-amber-200 dark:ring-amber-900/40"
        : status === "preview" || status === "locked"
          ? "border-zinc-300 opacity-70"
          : "border-zinc-300";

  const cardInner = (
    <div
      className={[
        "w-full rounded-xl border-2 bg-white p-4 shadow-sm transition-transform active:scale-[0.99] sm:hover:-translate-y-0.5 sm:hover:shadow-lg dark:bg-zinc-950",
        cardClass,
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        <div
          className={[
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl",
            status === "complete"
              ? "bg-emerald-100 dark:bg-emerald-950/40"
              : status === "active"
                ? "bg-amber-100 dark:bg-amber-950/40"
                : "bg-zinc-100 dark:bg-zinc-900",
          ].join(" ")}
        >
          {unit.icon}
        </div>
        <div className="flex-1">
          <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            Unit {unit.order}
          </div>
          <div className="text-sm font-bold leading-tight">{unit.title}</div>
        </div>
        {status === "complete" && (
          <span className="text-emerald-500">✓</span>
        )}
        {status === "locked" && <span className="text-zinc-400">🔒</span>}
        {status === "preview" && (
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            soon
          </span>
        )}
      </div>
      <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
        {unit.tagline}
      </p>

      {dotCount > 0 && (
        <div className="mt-3 flex items-center gap-1.5">
          {lessons.map((l) => (
            <span
              key={l.slug}
              className={[
                "h-2 w-2 rounded-full",
                completedLessons.has(l.slug)
                  ? "bg-emerald-500"
                  : "bg-zinc-300 dark:bg-zinc-700",
              ].join(" ")}
              title={l.title}
            />
          ))}
          {isBuilt && (
            <span className="ml-auto text-[10px] uppercase tracking-wider text-zinc-400">
              {(() => {
                const doneCount = lessons.filter((l) =>
                  completedLessons.has(l.slug),
                ).length;
                return doneCount > 0
                  ? `${doneCount} / ${lessons.length}`
                  : `${lessons.length} lessons`;
              })()}
            </span>
          )}
        </div>
      )}

      {status === "complete" && (
        <div className="mt-3 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
          ✓ Complete
        </div>
      )}
      {status === "active" && (
        <div className="mt-3 text-xs font-semibold text-amber-700 dark:text-amber-400">
          {lessons.every((l) => completedLessons.has(l.slug))
            ? "Take checkpoint →"
            : "Continue →"}
        </div>
      )}
      {status === "available" && (
        <div className="mt-3 text-xs font-semibold text-zinc-600 dark:text-zinc-300">
          Start →
        </div>
      )}
    </div>
  );

  // Find where to navigate on click
  let href: string | null = null;
  if (isBuilt && isUnlocked && built) {
    if (isCompleted) {
      // Unit done — link back to first lesson for review
      href = `/lesson/${unit.slug}/${lessons[0].slug}`;
    } else {
      const allLessonsDone = lessons.every((l) => completedLessons.has(l.slug));
      if (allLessonsDone) {
        // All lessons done — send straight to checkpoint
        href = `/checkpoint/${unit.slug}`;
      } else {
        const nextLesson =
          lessons.find((l) => !completedLessons.has(l.slug)) ??
          lessons[lessons.length - 1];
        href = `/lesson/${unit.slug}/${nextLesson.slug}`;
      }
    }
  }

  return (
    <li
      className={[
        "flex",
        side === "left" ? "sm:justify-start" : "sm:justify-end",
      ].join(" ")}
    >
      <div className="sm:w-[calc(50%-1.5rem)]">
        {href ? (
          <Link href={href} className="block">
            {cardInner}
          </Link>
        ) : (
          cardInner
        )}
      </div>
    </li>
  );
}
