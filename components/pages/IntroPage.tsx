"use client";

import { useEffect } from "react";
import type { Intro } from "@/lib/content/types";

export function IntroPage({
  page,
  setDone,
}: {
  page: Intro;
  setDone: (b: boolean) => void;
}) {
  useEffect(() => {
    setDone(true);
  }, [setDone]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">{page.heading}</h2>
      {page.body.map((p, i) => (
        <p
          key={i}
          className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300"
          dangerouslySetInnerHTML={{ __html: p }}
        />
      ))}
      {page.keyPoint && (
        <div className="mt-4 rounded-lg bg-zinc-900 p-4 text-white dark:bg-zinc-800">
          <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-amber-400">
            Key point
          </div>
          <div className="text-sm font-medium leading-relaxed">
            {page.keyPoint}
          </div>
        </div>
      )}
      {page.tip && (
        <div className="mt-4 rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4 dark:bg-amber-950/30">
          <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400">
            {page.tip.label}
          </div>
          <div
            className="text-sm leading-relaxed text-amber-900 dark:text-amber-100"
            dangerouslySetInnerHTML={{ __html: page.tip.body }}
          />
        </div>
      )}
    </div>
  );
}
