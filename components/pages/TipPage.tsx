"use client";

import { useEffect } from "react";
import type { Tip } from "@/lib/content/types";
import { SpeakButton } from "../SpeakButton";

export function TipPage({
  page,
  setDone,
}: {
  page: Tip;
  setDone: (b: boolean) => void;
}) {
  useEffect(() => {
    setDone(true);
  }, [setDone]);

  return (
    <div className="space-y-4">
      <div className="text-[10px] font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400">
        💡 Tip
      </div>
      <h2 className="text-2xl font-bold tracking-tight">{page.heading}</h2>
      <p
        className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300"
        dangerouslySetInnerHTML={{ __html: page.body }}
      />
      {page.example && (
        <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4 dark:bg-amber-950/30">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-lg italic" lang="it">
              {page.example.it}
            </span>
            <SpeakButton text={page.example.it} />
          </div>
          <div className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
            {page.example.en}
          </div>
        </div>
      )}
    </div>
  );
}
