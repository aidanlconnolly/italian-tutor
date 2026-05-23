"use client";

import { useEffect, useState, useTransition } from "react";
import type { Translate } from "@/lib/content/types";
import { gradeTranslationAction, type GradeResult } from "@/lib/actions/grade";

export function TranslatePage({
  page,
  setDone,
}: {
  page: Translate;
  setDone: (b: boolean) => void;
}) {
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<GradeResult | null>(null);
  const [pending, startTransition] = useTransition();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    // Done if we got a passing grade OR the user revealed and acknowledged
    const passed =
      (result && result.ok && result.grade.score >= 1) || revealed;
    setDone(!!passed);
  }, [result, revealed, setDone]);

  function submit() {
    if (!answer.trim()) return;
    startTransition(async () => {
      const res = await gradeTranslationAction({
        direction: page.direction,
        prompt: page.prompt,
        reference: page.reference,
        learner: answer,
      });
      setResult(res);
    });
  }

  const fromLabel = page.direction === "en-to-it" ? "English" : "Italian";
  const toLabel = page.direction === "en-to-it" ? "Italian" : "English";

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">{page.heading}</h2>
      <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
        {fromLabel} → {toLabel}
      </div>

      <div className="rounded-lg border border-zinc-300 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900">
        <div className="text-[10px] uppercase tracking-wider text-zinc-500">
          Translate this:
        </div>
        <div
          className={[
            "mt-1 text-lg",
            page.direction === "it-to-en" ? "font-serif" : "font-sans",
          ].join(" ")}
          lang={page.direction === "it-to-en" ? "it" : "en"}
        >
          {page.prompt}
        </div>
      </div>

      {page.hint && (
        <details className="text-xs text-zinc-500">
          <summary className="cursor-pointer">Hint</summary>
          <p className="mt-1">{page.hint}</p>
        </details>
      )}

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        rows={3}
        lang={page.direction === "en-to-it" ? "it" : "en"}
        spellCheck={false}
        placeholder={`Your ${toLabel} translation…`}
        className="w-full rounded-lg border border-zinc-300 bg-white p-3 font-serif text-base dark:border-zinc-700 dark:bg-zinc-950"
      />

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={submit}
          disabled={pending || !answer.trim()}
          className="rounded bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700 disabled:opacity-50"
        >
          {pending ? "Grading…" : "Check with Claude"}
        </button>
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="text-xs text-zinc-500 hover:text-zinc-700"
        >
          Reveal answer
        </button>
      </div>

      {result && result.ok && (
        <div
          className={[
            "rounded-lg border p-3 text-sm",
            result.grade.score === 2
              ? "border-emerald-400 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-950/30"
              : result.grade.score === 1
                ? "border-amber-400 bg-amber-50 dark:border-amber-700 dark:bg-amber-950/30"
                : "border-rose-400 bg-rose-50 dark:border-rose-700 dark:bg-rose-950/30",
          ].join(" ")}
        >
          <div className="text-[10px] font-bold uppercase tracking-widest">
            {result.grade.score === 2
              ? "✓ Correct"
              : result.grade.score === 1
                ? "Close — minor issues"
                : "Try again"}
          </div>
          <p className="mt-1 leading-relaxed">{result.grade.feedback}</p>
          {result.grade.corrected && (
            <div className="mt-2 border-t border-current pt-2 text-xs">
              <span className="opacity-60">Suggested: </span>
              <span className="font-serif italic">{result.grade.corrected}</span>
            </div>
          )}
        </div>
      )}

      {result && !result.ok && (
        <p className="text-xs text-rose-600">{result.error}</p>
      )}

      {revealed && (
        <div className="rounded-lg border border-zinc-300 bg-zinc-50 p-3 text-sm dark:border-zinc-700 dark:bg-zinc-900">
          <div className="text-[10px] uppercase tracking-wider text-zinc-500">
            Reference answer
          </div>
          <div
            className="mt-1 font-serif italic"
            lang={page.direction === "en-to-it" ? "it" : "en"}
          >
            {page.reference}
          </div>
        </div>
      )}
    </div>
  );
}
