"use client";

import { useEffect, useState } from "react";
import type { MultipleChoice } from "@/lib/content/types";

export function MultipleChoicePage({
  page,
  setDone,
}: {
  page: MultipleChoice;
  setDone: (b: boolean) => void;
}) {
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    page.questions.map(() => null),
  );

  useEffect(() => {
    // Advance once every question has been attempted — correctness is not required.
    const allAttempted = answers.every((a) => a !== null);
    setDone(allAttempted);
  }, [answers, setDone]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">{page.heading}</h2>
      {page.intro && (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{page.intro}</p>
      )}
      {page.questions.map((q, qi) => (
        <McQuestion
          key={qi}
          q={q}
          chosen={answers[qi]}
          onChoose={(idx) =>
            setAnswers((prev) => {
              const next = [...prev];
              next[qi] = idx;
              return next;
            })
          }
          index={qi}
          total={page.questions.length}
        />
      ))}
    </div>
  );
}

function McQuestion({
  q,
  chosen,
  onChoose,
  index,
  total,
}: {
  q: MultipleChoice["questions"][number];
  chosen: number | null;
  onChoose: (i: number) => void;
  index: number;
  total: number;
}) {
  const answered = chosen !== null;
  const correct = chosen === q.correct;
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
        Question {index + 1} of {total}
      </div>
      <div className="mt-1 text-base font-medium">{q.q}</div>
      {q.qIt && (
        <div
          className="mt-1 font-serif text-lg italic text-zinc-700 dark:text-zinc-300"
          lang="it"
        >
          {q.qIt}
        </div>
      )}
      <ul className="mt-3 space-y-2">
        {q.options.map((opt, i) => {
          const isChosen = chosen === i;
          const isCorrect = answered && i === q.correct;
          const isWrong = answered && isChosen && !correct;
          return (
            <li key={i}>
              <button
                type="button"
                disabled={answered && correct}
                onClick={() => onChoose(i)}
                className={[
                  "w-full rounded border p-3 text-left text-sm font-medium transition-colors",
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
      {answered && !correct && (
        <div className="mt-3 rounded border border-rose-300 bg-rose-50 p-2 text-xs text-rose-900 dark:border-rose-700 dark:bg-rose-950/30 dark:text-rose-200">
          <span className="font-semibold">Not quite.</span>{" "}
          {q.fb ?? `The answer is "${q.options[q.correct]}".`}
        </div>
      )}
      {answered && correct && (
        <div className="mt-3 rounded border border-emerald-300 bg-emerald-50 p-2 text-xs text-emerald-900 dark:border-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-200">
          <span className="font-semibold">Correct.</span>{" "}
          {q.fb ?? "Nice."}
        </div>
      )}
    </div>
  );
}
