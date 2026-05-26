"use client";

import { useEffect, useMemo, useState } from "react";
import type { OrderWords } from "@/lib/content/types";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type ItemState = {
  /** indexes into the original tokens array, in user-chosen order */
  chosen: number[];
  /** shuffled display order; tokens not yet picked */
  remaining: number[];
};

export function OrderWordsPage({
  page,
  setDone,
}: {
  page: OrderWords;
  setDone: (b: boolean) => void;
}) {
  const initialState = useMemo<ItemState[]>(
    () =>
      page.items.map((item) => ({
        chosen: [],
        // Keep shuffling until it differs from canonical (avoid trivial pre-solved)
        remaining: (() => {
          const ids = item.tokens.map((_, i) => i);
          if (ids.length < 2) return ids;
          let s = shuffle(ids);
          let safety = 0;
          while (s.every((v, i) => v === ids[i]) && safety < 5) {
            s = shuffle(ids);
            safety++;
          }
          return s;
        })(),
      })),
    [page.items],
  );

  const [states, setStates] = useState<ItemState[]>(initialState);

  function isCorrect(item: OrderWords["items"][number], st: ItemState) {
    if (st.remaining.length !== 0) return false;
    return st.chosen.every((idx, i) => item.tokens[idx] === item.tokens[i]);
  }

  useEffect(() => {
    // Advance once every item has been committed (all tokens placed) — correctness is not required.
    const allAttempted = states.every((st) => st.remaining.length === 0);
    setDone(allAttempted);
  }, [states, setDone]);

  function pick(itemIdx: number, tokenIdx: number) {
    setStates((prev) => {
      const next = [...prev];
      const cur = next[itemIdx];
      next[itemIdx] = {
        chosen: [...cur.chosen, tokenIdx],
        remaining: cur.remaining.filter((x) => x !== tokenIdx),
      };
      return next;
    });
  }

  function unpick(itemIdx: number, tokenIdx: number) {
    setStates((prev) => {
      const next = [...prev];
      const cur = next[itemIdx];
      next[itemIdx] = {
        chosen: cur.chosen.filter((x) => x !== tokenIdx),
        remaining: [...cur.remaining, tokenIdx],
      };
      return next;
    });
  }

  function reset(itemIdx: number) {
    setStates((prev) => {
      const next = [...prev];
      next[itemIdx] = initialState[itemIdx];
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
        const st = states[i];
        const done = isCorrect(it, st);
        return (
          <div
            key={i}
            className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
          >
            <div className="text-xs italic text-zinc-500">{it.en}</div>

            <div
              className={[
                "mt-2 flex min-h-[44px] flex-wrap items-center gap-2 rounded border-2 border-dashed p-2",
                done
                  ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30"
                  : "border-zinc-300 dark:border-zinc-700",
              ].join(" ")}
            >
              {st.chosen.length === 0 ? (
                <span className="text-xs text-zinc-400">Tap words below…</span>
              ) : (
                st.chosen.map((tIdx) => (
                  <button
                    key={`c-${tIdx}`}
                    type="button"
                    disabled={done}
                    onClick={() => unpick(i, tIdx)}
                    className={[
                      "rounded border px-2 py-1 font-serif text-sm",
                      done
                        ? "border-emerald-500 bg-emerald-100 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-100"
                        : "border-amber-400 bg-amber-50 text-amber-900 hover:border-amber-600 dark:bg-amber-950/30 dark:text-amber-100",
                    ].join(" ")}
                    lang="it"
                  >
                    {it.tokens[tIdx]}
                  </button>
                ))
              )}
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              {st.remaining.map((tIdx) => (
                <button
                  key={`r-${tIdx}`}
                  type="button"
                  onClick={() => pick(i, tIdx)}
                  className="rounded border border-zinc-300 bg-white px-2 py-1 font-serif text-sm hover:border-amber-400 dark:border-zinc-700 dark:bg-zinc-900"
                  lang="it"
                >
                  {it.tokens[tIdx]}
                </button>
              ))}
              {st.chosen.length > 0 && !done && (
                <button
                  type="button"
                  onClick={() => reset(i)}
                  className="ml-auto text-[10px] uppercase tracking-wider text-zinc-500 hover:text-zinc-700"
                >
                  Reset
                </button>
              )}
            </div>

            {st.remaining.length === 0 && !done && (
              <div className="mt-2 text-xs text-rose-700 dark:text-rose-300">
                Not the right order — tap chips above to remove them, then try again.
              </div>
            )}
            {done && (
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
