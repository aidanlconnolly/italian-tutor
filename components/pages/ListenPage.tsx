"use client";

import { useEffect, useState } from "react";
import type { Listen } from "@/lib/content/types";
import { speak, speechAvailable } from "@/lib/speech";

export function ListenPage({
  page,
  setDone,
}: {
  page: Listen;
  setDone: (b: boolean) => void;
}) {
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    page.items.map(() => null),
  );
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAvailable(speechAvailable());
  }, []);

  useEffect(() => {
    const allCorrect = answers.every(
      (a, i) => a !== null && a === page.items[i].correct,
    );
    setDone(allCorrect);
  }, [answers, page.items, setDone]);

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold tracking-tight">{page.heading}</h2>
      {page.intro && (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{page.intro}</p>
      )}
      {!available && (
        <div className="rounded border border-amber-300 bg-amber-50 p-3 text-xs text-amber-900 dark:border-amber-700 dark:bg-amber-950/40">
          Your browser doesn&apos;t expose speech synthesis. You can still play
          this by reading the Italian out loud yourself.
        </div>
      )}

      {page.items.map((it, qi) => {
        const chosen = answers[qi];
        const answered = chosen !== null;
        const correct = chosen === it.correct;
        return (
          <div
            key={qi}
            className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
          >
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => speak(it.it)}
                className="rounded-full bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700"
              >
                🔊 Play
              </button>
              <span className="text-xs text-zinc-500">
                What did you hear?
              </span>
            </div>
            <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {it.options.map((opt, oi) => {
                const isChosen = chosen === oi;
                const isCorrect = answered && oi === it.correct;
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
                        "w-full rounded border p-2 text-left font-serif text-sm transition-colors",
                        isCorrect
                          ? "border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200"
                          : isWrong
                            ? "border-rose-500 bg-rose-50 text-rose-900 dark:bg-rose-950/40 dark:text-rose-200"
                            : "border-zinc-300 bg-white hover:border-amber-400 dark:border-zinc-700 dark:bg-zinc-900",
                      ].join(" ")}
                      lang="it"
                    >
                      {opt}
                    </button>
                  </li>
                );
              })}
            </ul>
            {answered && correct && (
              <div className="mt-2 text-xs text-emerald-700 dark:text-emerald-300">
                ✓ <span className="italic">{it.en}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
