"use client";

import { useEffect } from "react";
import type { Dialogue } from "@/lib/content/types";
import { SpeakButton } from "../SpeakButton";
import { TappableSentence } from "../TappableSentence";

export function DialoguePage({
  page,
  setDone,
}: {
  page: Dialogue;
  setDone: (b: boolean) => void;
}) {
  useEffect(() => {
    setDone(true);
  }, [setDone]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">{page.heading}</h2>
      {page.setup && (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{page.setup}</p>
      )}
      <p className="text-xs text-zinc-500">
        Tap any Italian word for a definition. Tap the speaker to hear the line.
      </p>
      <ol className="space-y-3 border-l-2 border-amber-300 pl-4 dark:border-amber-700">
        {page.lines.map((line, i) => (
          <li key={i}>
            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              {line.speaker}
            </div>
            <div className="mt-0.5 flex items-start gap-2">
              <div className="flex-1 text-base leading-relaxed">
                <TappableSentence text={line.it} />
              </div>
              <SpeakButton text={line.it} />
            </div>
            <div className="mt-0.5 text-xs italic text-zinc-500">{line.en}</div>
          </li>
        ))}
      </ol>
    </div>
  );
}
