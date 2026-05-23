"use client";

import { useEffect, useState } from "react";
import type { Vocab } from "@/lib/content/types";
import { SpeakButton } from "../SpeakButton";

export function VocabPage({
  page,
  setDone,
}: {
  page: Vocab;
  setDone: (b: boolean) => void;
}) {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Done once half the cards have been flipped (lower friction)
    const threshold = Math.max(1, Math.ceil(page.items.length / 2));
    setDone(revealed.size >= threshold);
  }, [revealed.size, page.items.length, setDone]);

  function toggle(i: number) {
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">{page.heading}</h2>
      {page.intro && (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{page.intro}</p>
      )}
      <p className="text-xs text-zinc-500">
        Tap a card to flip it. Tap the speaker to hear the Italian.
      </p>
      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {page.items.map((it, i) => {
          const flipped = revealed.has(i);
          return (
            <li key={i}>
              <div
                role="button"
                tabIndex={0}
                onClick={() => toggle(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggle(i);
                  }
                }}
                className={[
                  "w-full cursor-pointer rounded-lg border p-3 text-left transition-colors",
                  flipped
                    ? "border-emerald-400 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-950/30"
                    : "border-zinc-300 bg-white hover:border-amber-400 dark:border-zinc-700 dark:bg-zinc-900",
                ].join(" ")}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-serif text-lg font-semibold" lang="it">
                    {it.it}
                  </span>
                  <SpeakButton text={it.it} />
                </div>
                {flipped ? (
                  <>
                    <div className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
                      {it.en}
                    </div>
                    {it.note && (
                      <div className="mt-1 text-xs italic text-zinc-500">
                        {it.note}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="mt-1 text-xs text-zinc-400">Tap to reveal</div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
