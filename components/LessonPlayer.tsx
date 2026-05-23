"use client";

import Link from "next/link";
import { useCallback, useState, useTransition } from "react";
import type { Lesson, LessonPage, Unit } from "@/lib/content/types";
import { markLessonDone } from "@/lib/actions/progress";
import { IntroPage } from "./pages/IntroPage";
import { VocabPage } from "./pages/VocabPage";
import { DialoguePage } from "./pages/DialoguePage";
import { ConjugationPage } from "./pages/ConjugationPage";
import { MultipleChoicePage } from "./pages/MultipleChoicePage";
import { FillBlankPage } from "./pages/FillBlankPage";
import { OrderWordsPage } from "./pages/OrderWordsPage";
import { TranslatePage } from "./pages/TranslatePage";
import { ListenPage } from "./pages/ListenPage";
import { PronouncePage } from "./pages/PronouncePage";
import { TipPage } from "./pages/TipPage";
import { CheckpointPage } from "./pages/CheckpointPage";

function PageRenderer({
  page,
  setDone,
}: {
  page: LessonPage;
  setDone: (b: boolean) => void;
}) {
  switch (page.type) {
    case "intro":
      return <IntroPage page={page} setDone={setDone} />;
    case "vocab":
      return <VocabPage page={page} setDone={setDone} />;
    case "dialogue":
      return <DialoguePage page={page} setDone={setDone} />;
    case "conjugation":
      return <ConjugationPage page={page} setDone={setDone} />;
    case "multipleChoice":
      return <MultipleChoicePage page={page} setDone={setDone} />;
    case "fillBlank":
      return <FillBlankPage page={page} setDone={setDone} />;
    case "orderWords":
      return <OrderWordsPage page={page} setDone={setDone} />;
    case "translate":
      return <TranslatePage page={page} setDone={setDone} />;
    case "listen":
      return <ListenPage page={page} setDone={setDone} />;
    case "pronounce":
      return <PronouncePage page={page} setDone={setDone} />;
    case "tip":
      return <TipPage page={page} setDone={setDone} />;
    case "checkpoint":
      return <CheckpointPage page={page} setDone={setDone} />;
  }
}

export function LessonPlayer({
  unit,
  lesson,
  nextLessonSlug,
}: {
  unit: Unit;
  lesson: Lesson;
  nextLessonSlug: string | null;
}) {
  const [pageIdx, setPageIdx] = useState(0);
  const [pageDone, setPageDone] = useState<boolean[]>(() =>
    lesson.pages.map(() => false),
  );
  const [completed, setCompleted] = useState(false);
  const [pendingSave, startSave] = useTransition();

  const setDone = useCallback(
    (i: number) => (b: boolean) =>
      setPageDone((prev) => {
        if (prev[i] === b) return prev;
        const next = [...prev];
        next[i] = b;
        return next;
      }),
    [],
  );

  const total = lesson.pages.length;
  const isLast = pageIdx === total - 1;
  const canAdvance = pageDone[pageIdx];

  function next() {
    if (isLast) {
      startSave(async () => {
        await markLessonDone({
          unitSlug: unit.slug,
          lessonSlug: lesson.slug,
          score: 100,
        });
        setCompleted(true);
      });
    } else {
      setPageIdx((i) => i + 1);
      // Scroll body to top
      if (typeof document !== "undefined") {
        const body = document.getElementById("lesson-body");
        body?.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }

  function prev() {
    if (pageIdx > 0) setPageIdx((i) => i - 1);
  }

  if (completed) {
    return (
      <div className="mx-auto max-w-xl px-6 py-16 text-center font-sans">
        <div className="text-6xl">🎉</div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">Lesson complete</h1>
        <p className="mt-2 text-sm text-zinc-500">
          {lesson.title} — nice work.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3">
          {nextLessonSlug ? (
            <Link
              href={`/lesson/${nextLessonSlug}`}
              className="rounded-lg bg-amber-600 px-6 py-3 text-sm font-semibold text-white hover:bg-amber-700"
            >
              Next lesson →
            </Link>
          ) : (
            <Link
              href={`/checkpoint/${unit.slug}`}
              className="rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Take unit checkpoint →
            </Link>
          )}
          <Link
            href="/"
            className="text-xs text-zinc-500 hover:text-zinc-700"
          >
            ← Back to roadmap
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col font-sans">
      {/* Header */}
      <header className="flex items-center gap-4 border-b border-amber-500/30 bg-zinc-950 px-4 py-3 text-white">
        <Link
          href="/"
          className="text-sm font-semibold text-amber-400 hover:text-amber-300"
        >
          ← Roadmap
        </Link>
        <div className="flex-1 overflow-hidden">
          <div className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
            {unit.icon} {unit.title}
          </div>
          <div className="truncate text-sm font-semibold">{lesson.title}</div>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          {lesson.pages.map((_, i) => (
            <span
              key={i}
              className={[
                "h-1.5 w-1.5 rounded-full transition-all",
                i === pageIdx
                  ? "scale-150 bg-amber-400"
                  : i < pageIdx
                    ? "bg-white/60"
                    : "bg-white/20",
              ].join(" ")}
            />
          ))}
        </div>
      </header>

      {/* Progress bar */}
      <div className="h-1 w-full bg-zinc-200 dark:bg-zinc-800">
        <div
          className="h-full bg-amber-500 transition-all"
          style={{ width: `${((pageIdx + 1) / total) * 100}%` }}
        />
      </div>

      {/* Body */}
      <div
        id="lesson-body"
        className="flex-1 overflow-y-auto bg-zinc-50 px-4 py-6 dark:bg-zinc-900"
      >
        <div className="mx-auto max-w-2xl">
          <PageRenderer
            key={pageIdx}
            page={lesson.pages[pageIdx]}
            setDone={setDone(pageIdx)}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="flex items-center justify-between gap-3 border-t border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="text-xs text-zinc-400">
          Page {pageIdx + 1} of {total}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={prev}
            disabled={pageIdx === 0}
            className="rounded bg-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-300 disabled:opacity-40 dark:bg-zinc-800 dark:text-zinc-200"
          >
            ← Back
          </button>
          <button
            type="button"
            onClick={next}
            disabled={!canAdvance || pendingSave}
            className={[
              "rounded px-5 py-2 text-sm font-semibold text-white transition-colors",
              isLast ? "bg-emerald-600 hover:bg-emerald-700" : "bg-amber-600 hover:bg-amber-700",
              "disabled:opacity-40",
            ].join(" ")}
          >
            {pendingSave ? "Saving…" : isLast ? "Finish ✓" : "Next →"}
          </button>
        </div>
      </footer>
    </div>
  );
}
