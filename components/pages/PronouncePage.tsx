"use client";

import { useEffect, useState } from "react";
import type { Pronounce } from "@/lib/content/types";
import { speak, speechAvailable } from "@/lib/speech";

export function PronouncePage({
  page,
  setDone,
}: {
  page: Pronounce;
  setDone: (b: boolean) => void;
}) {
  const [confirmed, setConfirmed] = useState<Set<number>>(new Set());
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAvailable(speechAvailable());
  }, []);

  useEffect(() => {
    setDone(confirmed.size >= page.items.length);
  }, [confirmed.size, page.items.length, setDone]);

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold tracking-tight">{page.heading}</h2>
      {page.intro && (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{page.intro}</p>
      )}
      <p className="text-xs text-zinc-500">
        Play each one, repeat it out loud, then tap &quot;Got it&quot; to move on.
        {!available && (
          <> (Audio not supported in your browser — just read aloud.)</>
        )}
      </p>

      <ul className="space-y-3">
        {page.items.map((it, i) => {
          const ok = confirmed.has(i);
          return (
            <li
              key={i}
              className={[
                "rounded-lg border p-4 transition-colors",
                ok
                  ? "border-emerald-400 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-950/30"
                  : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950",
              ].join(" ")}
            >
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-xl font-semibold" lang="it">
                  {it.it}
                </span>
                <button
                  type="button"
                  onClick={() => speak(it.it)}
                  className="rounded-full bg-amber-600 px-3 py-1 text-xs font-semibold text-white hover:bg-amber-700"
                >
                  🔊 Play
                </button>
              </div>
              <div className="mt-1 text-xs italic text-zinc-500">{it.en}</div>
              {it.tip && (
                <div className="mt-1 text-xs text-amber-700 dark:text-amber-400">
                  💡 {it.tip}
                </div>
              )}
              <button
                type="button"
                disabled={ok}
                onClick={() =>
                  setConfirmed((prev) => {
                    const next = new Set(prev);
                    next.add(i);
                    return next;
                  })
                }
                className={[
                  "mt-2 rounded border px-3 py-1 text-xs font-semibold transition-colors",
                  ok
                    ? "cursor-default border-emerald-500 bg-emerald-100 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-100"
                    : "border-zinc-300 bg-white hover:border-amber-400 dark:border-zinc-700 dark:bg-zinc-900",
                ].join(" ")}
              >
                {ok ? "✓ Got it" : "Got it"}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
