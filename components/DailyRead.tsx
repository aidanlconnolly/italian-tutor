"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useTransition } from "react";
import type { DailyRead } from "@/lib/content/types";
import { markReadDone } from "@/lib/actions/progress";
import { speak, speechAvailable } from "@/lib/speech";
import { TappableSentence } from "./TappableSentence";

type Step = "read" | "comprehension" | "done";

export function DailyReadView({ read }: { read: DailyRead }) {
  const [showEn, setShowEn] = useState(true);
  const [step, setStep] = useState<Step>("read");
  const [playing, setPlaying] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    read.comprehension.map(() => null),
  );
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [pending, startTransition] = useTransition();
  const [available, setAvailable] = useState(false);
  const ttsTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAvailable(speechAvailable());
    return () => {
      if (ttsTimeoutRef.current !== null) {
        clearTimeout(ttsTimeoutRef.current);
      }
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  function playAll() {
    if (!available) return;
    if (playing) {
      window.speechSynthesis.cancel();
      setPlaying(false);
      return;
    }
    setPlaying(true);
    // Speak each paragraph sequentially with small pauses
    let i = 0;
    const queue = () => {
      if (i >= read.paragraphs.length) {
        setPlaying(false);
        return;
      }
      const p = read.paragraphs[i];
      speak(p.it);
      // Wait roughly ~ characters/12ms before next; let utterance end handler chain it via timeout fallback
      // (we use a simple timeout — Web Speech onend isn't surfaced by our wrapper)
      const approx = Math.max(2500, p.it.length * 65);
      ttsTimeoutRef.current = window.setTimeout(() => {
        i++;
        queue();
      }, approx);
    };
    queue();
  }

  function finishReading() {
    setStep("comprehension");
    window.speechSynthesis?.cancel();
    setPlaying(false);
  }

  function submitComprehension() {
    const correct = answers.filter(
      (a, i) => a !== null && a === read.comprehension[i].correct,
    ).length;
    const pct = Math.round((correct / read.comprehension.length) * 100);
    setScore(pct);
    setSubmitted(true);
    startTransition(async () => {
      await markReadDone({
        readSlug: read.slug,
        comprehensionScore: pct,
      });
      setStep("done");
    });
  }

  if (step === "done") {
    return (
      <div className="mx-auto max-w-xl px-6 py-16 text-center font-sans">
        <div className="text-6xl">📖</div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">
          Read complete
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Comprehension: <span className="font-semibold">{score}%</span>
        </p>
        <div className="mt-8 flex flex-col items-center gap-3">
          <Link
            href="/"
            className="rounded-lg bg-amber-600 px-6 py-3 text-sm font-semibold text-white hover:bg-amber-700"
          >
            ← Back to roadmap
          </Link>
        </div>
      </div>
    );
  }

  if (step === "comprehension") {
    return (
      <main className="mx-auto max-w-2xl px-4 py-8 font-sans sm:px-6">
        <header className="mb-6">
          <div className="text-[10px] font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400">
            Comprehension — {read.comprehension.length} quick questions
          </div>
          <h1 className="text-2xl font-bold tracking-tight">{read.titleEn}</h1>
        </header>
        <div className="space-y-4">
          {read.comprehension.map((q, qi) => {
            const chosen = answers[qi];
            const ans = chosen !== null;
            const correct = ans && chosen === q.correct;
            return (
              <div
                key={qi}
                className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
              >
                <div className="text-base font-medium">{q.q}</div>
                <ul className="mt-3 space-y-2">
                  {q.options.map((opt, oi) => {
                    const isChosen = chosen === oi;
                    const isCorrect = submitted && oi === q.correct;
                    const isWrong = submitted && isChosen && !correct;
                    return (
                      <li key={oi}>
                        <button
                          type="button"
                          onClick={() =>
                            !submitted &&
                            setAnswers((prev) => {
                              const next = [...prev];
                              next[qi] = oi;
                              return next;
                            })
                          }
                          disabled={submitted}
                          className={[
                            "w-full rounded border p-2 text-left text-sm font-medium transition-colors",
                            isCorrect
                              ? "border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200"
                              : isWrong
                                ? "border-rose-500 bg-rose-50 text-rose-900 dark:bg-rose-950/40 dark:text-rose-200"
                                : isChosen
                                  ? "border-amber-500 bg-amber-50 dark:bg-amber-950/40"
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
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setStep("read")}
            className="rounded bg-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
          >
            ← Re-read
          </button>
          <button
            type="button"
            onClick={submitComprehension}
            disabled={answers.some((a) => a === null) || pending}
            className="rounded bg-emerald-600 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-40"
          >
            {pending ? "Saving…" : "Submit"}
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 font-sans sm:px-6">
      <header className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400">
            Daily read · ~10 minutes
          </div>
          <h1 className="font-serif text-3xl font-bold tracking-tight" lang="it">
            {read.titleIt}
          </h1>
          <div className="text-sm italic text-zinc-500">{read.titleEn}</div>
        </div>
        <Link href="/" className="text-xs text-zinc-500 hover:text-zinc-700">
          ← Roadmap
        </Link>
      </header>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={playAll}
          disabled={!available}
          className="rounded-full bg-amber-600 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-700 disabled:opacity-40"
        >
          {playing ? "⏹ Stop" : "🔊 Listen to story"}
        </button>
        <button
          type="button"
          onClick={() => setShowEn((v) => !v)}
          className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 hover:border-amber-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
        >
          {showEn ? "Hide English" : "Show English"}
        </button>
        <div className="ml-auto text-xs text-zinc-500">
          Tap any Italian word to save it to your deck.
        </div>
      </div>

      <p className="mb-6 rounded-lg bg-zinc-50 p-4 text-sm italic text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
        {read.intro}
      </p>

      <article className="space-y-6">
        {read.paragraphs.map((p, i) => (
          <div
            key={i}
            className={[
              "grid gap-4",
              showEn ? "md:grid-cols-2" : "md:grid-cols-1",
            ].join(" ")}
          >
            <div className="font-serif text-lg leading-relaxed">
              <TappableSentence text={p.it} />
            </div>
            {showEn && (
              <div className="border-l-2 border-zinc-200 pl-4 text-base italic text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
                {p.en}
              </div>
            )}
          </div>
        ))}
      </article>

      {read.vocabSpotlight && read.vocabSpotlight.length > 0 && (
        <section className="mt-10 rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950/30">
          <div className="text-[10px] font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400">
            Worth remembering
          </div>
          <ul className="mt-2 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
            {read.vocabSpotlight.map((v, i) => (
              <li key={i} className="flex items-baseline justify-between gap-2">
                <span className="font-serif font-semibold" lang="it">
                  {v.it}
                </span>
                <span className="text-zinc-600 dark:text-zinc-400">{v.en}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={finishReading}
          className="rounded bg-emerald-600 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          Finished — quick check →
        </button>
      </div>
    </main>
  );
}
