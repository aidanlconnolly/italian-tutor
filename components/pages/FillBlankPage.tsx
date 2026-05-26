"use client";

import { useEffect, useState } from "react";
import type { FillBlank } from "@/lib/content/types";

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .normalize("NFC")
    .replace(/[.!?,;:]/g, "");
}

export function FillBlankPage({
  page,
  setDone,
}: {
  page: FillBlank;
  setDone: (b: boolean) => void;
}) {
  const [answers, setAnswers] = useState<string[]>(() =>
    page.items.map(() => ""),
  );
  const [submitted, setSubmitted] = useState<boolean[]>(() =>
    page.items.map(() => false),
  );

  useEffect(() => {
    // Advance once every blank has been submitted — correctness is not required.
    const allAttempted = submitted.every(Boolean);
    setDone(allAttempted);
  }, [submitted, setDone]);

  function submit(i: number, value?: string) {
    if (value !== undefined) {
      setAnswers((prev) => {
        const next = [...prev];
        next[i] = value;
        return next;
      });
    }
    setSubmitted((prev) => {
      const next = [...prev];
      next[i] = true;
      return next;
    });
  }

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold tracking-tight">{page.heading}</h2>
      {page.intro && (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{page.intro}</p>
      )}
      {page.items.map((it, i) => {
        const ok = submitted[i] && normalize(answers[i]) === normalize(it.answer);
        const wrong = submitted[i] && !ok;
        const [before, after] = it.template.split("___");
        return (
          <div
            key={i}
            className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
          >
            <div className="font-serif text-base" lang="it">
              {before}
              <span
                className={[
                  "mx-1 inline-block min-w-[80px] rounded border-b-2 px-2 py-0.5 text-center font-semibold",
                  ok
                    ? "border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200"
                    : wrong
                      ? "border-rose-500 bg-rose-50 text-rose-900 dark:bg-rose-950/40 dark:text-rose-200"
                      : "border-zinc-400 bg-zinc-50 dark:bg-zinc-900",
                ].join(" ")}
              >
                {ok ? it.answer : answers[i] || "____"}
              </span>
              {after}
            </div>
            <div className="mt-1 text-xs italic text-zinc-500">{it.en}</div>

            {!ok && (
              <div className="mt-3">
                {it.options ? (
                  <div className="flex flex-wrap gap-2">
                    {it.options.map((o) => {
                      const oWrong =
                        submitted[i] && answers[i] === o && !ok;
                      return (
                        <button
                          key={o}
                          type="button"
                          onClick={() => submit(i, o)}
                          className={[
                            "rounded border px-3 py-1.5 text-sm font-medium transition-colors",
                            oWrong
                              ? "border-rose-500 bg-rose-50 text-rose-900 dark:bg-rose-950/40"
                              : "border-zinc-300 bg-white hover:border-amber-400 dark:border-zinc-700 dark:bg-zinc-900",
                          ].join(" ")}
                        >
                          {o}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      submit(i);
                    }}
                    className="flex gap-2"
                  >
                    <input
                      lang="it"
                      value={answers[i]}
                      onChange={(e) =>
                        setAnswers((prev) => {
                          const next = [...prev];
                          next[i] = e.target.value;
                          return next;
                        })
                      }
                      className="flex-1 rounded border border-zinc-300 bg-white px-3 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-900"
                      placeholder="Type the answer…"
                    />
                    <button
                      type="submit"
                      className="rounded bg-amber-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-amber-700"
                    >
                      Check
                    </button>
                  </form>
                )}
              </div>
            )}

            {wrong && (
              <div className="mt-2 text-xs text-rose-700 dark:text-rose-300">
                Not quite. The answer is{" "}
                <strong className="font-serif">{it.answer}</strong>.
              </div>
            )}
            {ok && (
              <div className="mt-2 text-xs text-emerald-700 dark:text-emerald-300">
                ✓ Correct.
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
