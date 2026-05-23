"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import type { Unit } from "@/lib/content/types";
import { recordCheckpoint } from "@/lib/actions/progress";

export function CheckpointRunner({
  unit,
  nextUnitSlug,
}: {
  unit: Unit;
  nextUnitSlug: string | null;
}) {
  const total = unit.checkpoint.questions.length;
  const [qi, setQi] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    Array(total).fill(null),
  );
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<{ score: number; passed: boolean } | null>(
    null,
  );
  const [pending, startTransition] = useTransition();

  const cur = unit.checkpoint.questions[qi];
  const chosen = answers[qi];

  function choose(i: number) {
    if (chosen !== null) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[qi] = i;
      return next;
    });
  }

  function next() {
    if (qi < total - 1) {
      setQi(qi + 1);
    } else {
      // Finalize
      const correct = answers.filter((a, i) => a === unit.checkpoint.questions[i].correct).length;
      const score = Math.round((correct / total) * 100);
      const passed = score >= unit.checkpoint.passingPct;
      startTransition(async () => {
        await recordCheckpoint({ unitSlug: unit.slug, score });
        setResult({ score, passed });
        setSubmitted(true);
      });
    }
  }

  function retry() {
    setQi(0);
    setAnswers(Array(total).fill(null));
    setResult(null);
    setSubmitted(false);
  }

  if (submitted && result) {
    return (
      <div className="mx-auto max-w-xl px-6 py-16 text-center font-sans">
        <div className="text-6xl">{result.passed ? "🏆" : "📚"}</div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">
          {result.passed ? "Unit complete!" : "Almost there"}
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Score: <span className="font-semibold">{result.score}%</span> · need{" "}
          {unit.checkpoint.passingPct}% to pass
        </p>
        <div className="mt-8 flex flex-col items-center gap-3">
          {result.passed && nextUnitSlug && (
            <Link
              href={`/lesson/${unit.slug}/${unit.lessons[0].slug}`}
              className="hidden"
            >
              {/* keep import resolving without errors */}
            </Link>
          )}
          {result.passed && nextUnitSlug ? (
            <Link
              href={`/`}
              className="rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Continue to next unit →
            </Link>
          ) : result.passed ? (
            <Link
              href="/"
              className="rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              ← Back to roadmap
            </Link>
          ) : (
            <>
              <button
                type="button"
                onClick={retry}
                className="rounded-lg bg-amber-600 px-6 py-3 text-sm font-semibold text-white hover:bg-amber-700"
              >
                Try again
              </button>
              <Link
                href="/"
                className="text-xs text-zinc-500 hover:text-zinc-700"
              >
                ← Back to roadmap
              </Link>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col font-sans">
      <header className="flex items-center gap-4 border-b-2 border-emerald-500 bg-zinc-950 px-4 py-3 text-white">
        <Link
          href="/"
          className="text-sm font-semibold text-emerald-400 hover:text-emerald-300"
        >
          ← Exit
        </Link>
        <div className="flex-1">
          <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
            🏆 Unit checkpoint
          </div>
          <div className="text-sm font-semibold">{unit.title}</div>
        </div>
        <div className="text-xs text-emerald-300">
          {qi + 1} / {total}
        </div>
      </header>
      <div className="h-1 w-full bg-zinc-200">
        <div
          className="h-full bg-emerald-500 transition-all"
          style={{ width: `${((qi + 1) / total) * 100}%` }}
        />
      </div>

      <div className="flex-1 overflow-y-auto bg-zinc-50 px-4 py-8 dark:bg-zinc-900">
        <div className="mx-auto max-w-2xl">
          <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            Question {qi + 1} of {total}
          </div>
          <h2 className="mt-1 text-2xl font-bold tracking-tight">{cur.q}</h2>
          {cur.qIt && (
            <p className="mt-2 font-serif text-lg italic" lang="it">
              {cur.qIt}
            </p>
          )}
          <ul className="mt-6 space-y-3">
            {cur.options.map((opt, oi) => {
              const isChosen = chosen === oi;
              const correct = chosen !== null && oi === cur.correct;
              const wrong = chosen !== null && isChosen && oi !== cur.correct;
              return (
                <li key={oi}>
                  <button
                    type="button"
                    onClick={() => choose(oi)}
                    disabled={chosen !== null}
                    className={[
                      "w-full rounded-lg border-2 p-4 text-left text-base font-medium transition-colors",
                      correct
                        ? "border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200"
                        : wrong
                          ? "border-rose-500 bg-rose-50 text-rose-900 dark:bg-rose-950/40 dark:text-rose-200"
                          : "border-zinc-300 bg-white hover:border-amber-400 dark:border-zinc-700 dark:bg-zinc-900",
                    ].join(" ")}
                  >
                    {opt}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <footer className="flex items-center justify-end border-t border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950">
        <button
          type="button"
          onClick={next}
          disabled={chosen === null || pending}
          className="rounded bg-emerald-600 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-40"
        >
          {pending ? "Saving…" : qi === total - 1 ? "Submit" : "Next →"}
        </button>
      </footer>
    </div>
  );
}
