"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import type { ReviewRow } from "@/lib/actions/review";
import { rateCard } from "@/lib/actions/review";
import { RATING_LABELS, type Rating1to4 } from "@/lib/srs";
import { SpeakButton } from "./SpeakButton";

type Phase = "front" | "back";

const RATING_CLASSES: Record<Rating1to4, string> = {
  1: "bg-rose-600 hover:bg-rose-700 text-white",
  2: "bg-orange-500 hover:bg-orange-600 text-white",
  3: "bg-emerald-600 hover:bg-emerald-700 text-white",
  4: "bg-sky-600 hover:bg-sky-700 text-white",
};

export function ReviewSession({ initial }: { initial: ReviewRow[] }) {
  const [queue, setQueue] = useState<ReviewRow[]>(initial);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("front");
  const [completed, setCompleted] = useState(0);
  const [pending, startTransition] = useTransition();

  const current = queue[index];

  const reveal = useCallback(() => setPhase("back"), []);

  const rate = useCallback(
    (rating: Rating1to4) => {
      if (!current || pending) return;
      const cardId = current.card.id;
      startTransition(async () => {
        const res = await rateCard({ cardId, rating });
        if (!res.ok) {
          alert(`Failed to record review: ${res.error}`);
          return;
        }
        setCompleted((n) => n + 1);
        if (index + 1 < queue.length) {
          setIndex(index + 1);
          setPhase("front");
        } else {
          setIndex(queue.length); // sentinel: past the end
        }
      });
    },
    [current, index, pending, queue.length],
  );

  // Keyboard shortcuts
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      // Ignore when typing in inputs
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      if (phase === "front") {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          reveal();
        }
      } else {
        if (e.key >= "1" && e.key <= "4") {
          e.preventDefault();
          rate(Number(e.key) as Rating1to4);
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [phase, reveal, rate]);

  if (queue.length === 0) {
    return <EmptyState />;
  }

  if (!current) {
    return <DoneState completed={completed} total={queue.length} onReset={() => {
      setQueue([]);
      setIndex(0);
      setPhase("front");
      setCompleted(0);
    }} />;
  }

  const { card, word, intervals } = current;
  const redacted = redactSurface(card.sourceSentence, card.sourceSurface);

  return (
    <div className="space-y-6">
      <ProgressBar done={completed} total={queue.length} />

      <div className="rounded-xl border border-zinc-300 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 sm:p-8">
        <div className="text-[10px] font-medium uppercase tracking-wider text-zinc-400">
          Sentence
        </div>
        <p className="mt-2 font-serif text-xl leading-relaxed sm:text-2xl">
          {phase === "front" ? (
            <span>{redacted}</span>
          ) : (
            <span>
              {card.sourceSentence
                .split(card.sourceSurface)
                .flatMap((part, i, arr) =>
                  i < arr.length - 1
                    ? [
                        part,
                        <mark
                          key={i}
                          className="rounded bg-amber-200 px-1 dark:bg-amber-800/60"
                        >
                          {card.sourceSurface}
                        </mark>,
                      ]
                    : [part],
                )}
            </span>
          )}
        </p>

        {phase === "back" && (
          <div className="mt-6 border-t border-zinc-200 pt-6 dark:border-zinc-700">
            <div className="flex items-baseline gap-2">
              <div className="font-serif text-3xl font-semibold">
                {word.lemma}
              </div>
              <SpeakButton text={word.lemma} size="md" />
              <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-400">
                {word.pos}
                {word.gender ? ` · ${word.gender}` : ""}
              </span>
            </div>
            <p className="mt-1 text-base font-medium text-zinc-800 dark:text-zinc-200">
              {word.translation}
            </p>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {word.definition}
            </p>
            {word.grammarNotes && (
              <p className="mt-2 rounded bg-amber-50 px-2 py-1 text-xs text-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
                {word.grammarNotes}
              </p>
            )}
            {word.examples && word.examples.length > 0 && (
              <div className="mt-4 space-y-2">
                {word.examples.map((ex, i) => (
                  <div key={i} className="text-xs">
                    <div className="flex items-start gap-1.5 font-serif italic text-zinc-800 dark:text-zinc-200">
                      <span className="flex-1">{ex.it}</span>
                      <SpeakButton text={ex.it} />
                    </div>
                    <div className="mt-0.5 text-zinc-500">{ex.en}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {phase === "front" ? (
        <button
          type="button"
          onClick={reveal}
          className="w-full rounded-lg bg-zinc-800 px-5 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-zinc-900 dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-white"
        >
          Reveal · <kbd className="rounded bg-white/20 px-1.5 py-0.5 text-[10px]">Space</kbd>
        </button>
      ) : (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {([1, 2, 3, 4] as Rating1to4[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => rate(r)}
              disabled={pending}
              className={`rounded-lg px-3 py-4 text-sm font-medium shadow-sm transition-colors disabled:opacity-50 sm:py-3 ${RATING_CLASSES[r]}`}
            >
              <div className="flex items-center justify-center gap-1.5">
                <kbd className="hidden rounded bg-white/20 px-1.5 py-0.5 text-[10px] sm:inline">
                  {r}
                </kbd>
                {RATING_LABELS[r]}
              </div>
              <div className="mt-1 text-[10px] opacity-80">{intervals[r]}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ProgressBar({ done, total }: { done: number; total: number }) {
  const pct = total === 0 ? 0 : Math.min(100, (done / total) * 100);
  return (
    <div>
      <div className="flex items-baseline justify-between text-xs text-zinc-500">
        <span>
          {done} / {total}
        </span>
        <span>{total - done} left</span>
      </div>
      <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
        <div
          className="h-full bg-emerald-500 transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-lg border border-dashed border-zinc-300 p-10 text-center dark:border-zinc-700">
      <p className="text-base font-medium">Nothing due right now.</p>
      <p className="mt-1 text-sm text-zinc-500">
        Head to the Reader and save some words. New cards become due immediately.
      </p>
    </div>
  );
}

function DoneState({
  completed,
  total,
  onReset,
}: {
  completed: number;
  total: number;
  onReset: () => void;
}) {
  return (
    <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-10 text-center dark:border-emerald-700 dark:bg-emerald-950/40">
      <p className="text-2xl">🎉</p>
      <p className="mt-2 text-base font-medium text-emerald-900 dark:text-emerald-100">
        {completed} / {total} reviewed
      </p>
      <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-300">
        Refresh the page to pick up any more cards that came due during the session.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-4 text-xs text-emerald-700 underline hover:text-emerald-900 dark:text-emerald-300"
      >
        Hide
      </button>
    </div>
  );
}

/** Replace the surface form in the sentence with a redacted blank. */
function redactSurface(sentence: string, surface: string): string {
  if (!surface) return sentence;
  // Case-insensitive replace, preserve original length-ish with underscores.
  const blank = "_".repeat(Math.max(3, surface.length));
  const idx = sentence.toLowerCase().indexOf(surface.toLowerCase());
  if (idx === -1) return sentence;
  return sentence.slice(0, idx) + blank + sentence.slice(idx + surface.length);
}
