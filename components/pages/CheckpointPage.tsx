"use client";

import { useEffect, useState } from "react";
import type { Checkpoint } from "@/lib/content/types";

/**
 * A "checkpoint" within a lesson body (not the unit-level final test).
 * For unit checkpoints we use the standalone CheckpointRunner page.
 */
export function CheckpointPage({
  page,
  setDone,
}: {
  page: Checkpoint;
  setDone: (b: boolean) => void;
}) {
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    page.questions.map(() => null),
  );

  useEffect(() => {
    const allCorrect = answers.every(
      (a, i) => a !== null && a === page.questions[i].correct,
    );
    setDone(allCorrect);
  }, [answers, page.questions, setDone]);

  return (
    <div className="space-y-5">
      <div className="text-[10px] font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400">
        ✓ Quick check
      </div>
      <h2 className="text-2xl font-bold tracking-tight">{page.heading}</h2>
      {page.intro && (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{page.intro}</p>
      )}
      {page.questions.map((q, qi) => {
        const chosen = answers[qi];
        const answered = chosen !== null;
        const correct = chosen === q.correct;
        return (
          <div
            key={qi}
            className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
          >
            <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              Question {qi + 1} of {page.questions.length}
            </div>
            <div className="mt-1 text-base font-medium">{q.q}</div>
            {q.qIt && (
              <div className="mt-1 font-serif italic" lang="it">
                {q.qIt}
              </div>
            )}
            <ul className="mt-3 space-y-2">
              {q.options.map((opt, oi) => {
                const isChosen = chosen === oi;
                const isCorrect = answered && oi === q.correct;
                const isWrong = answered && isChosen && !correct;
                return (
                  <li key={oi}>
                    <button
                      type="button"
                      disabled={answered && correct}
                      onClick={() =>
                        setAnswers((prev) => {
                          const next = [...prev];
                          next[qi] = oi;
                          return next;
                        })
                      }
                      className={[
                        "w-full rounded border p-2 text-left text-sm font-medium transition-colors",
                        isCorrect
                          ? "border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200"
                          : isWrong
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
        );
      })}
    </div>
  );
}
