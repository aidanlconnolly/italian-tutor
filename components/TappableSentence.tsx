"use client";

import { useState } from "react";
import { tokenize } from "@/lib/italian";
import { TappableWord, type WordTapData } from "./TappableWord";
import { WordPopover, type PopoverState } from "./WordPopover";
import type { Word } from "@/lib/db/schema";

/**
 * Render a piece of Italian text with every word as a TappableWord. Tap a word
 * → WordPopover opens → save-to-deck flow lives there. Reuses the existing
 * Reader machinery so behavior is identical across the app.
 *
 * Wrap groups of TappableSentence in a TappableContext if you want a shared
 * popover (recommended within one paragraph). Otherwise each instance owns its
 * own popover state, which is fine for short snippets.
 */
export function TappableSentence({
  text,
  className,
  serif = true,
}: {
  text: string;
  className?: string;
  serif?: boolean;
}) {
  const tokens = tokenize(text);
  const [popover, setPopover] = useState<
    (PopoverState & { tokenIndex: number }) | null
  >(null);
  const [savedSurfaces, setSavedSurfaces] = useState<Set<string>>(new Set());

  function handleSaved(word: Word) {
    setSavedSurfaces((prev) => {
      const next = new Set(prev);
      next.add(word.lemma);
      for (const s of word.surfaceSeen ?? []) next.add(s);
      return next;
    });
  }

  return (
    <>
      <span
        className={[serif ? "font-serif" : "", className ?? ""].join(" ")}
        lang="it"
      >
        {tokens.map((tok, i) =>
          tok.type === "word" ? (
            <TappableWord
              key={`w-${tok.index}`}
              surface={tok.surface}
              sentence={tok.sentence}
              isOpen={popover?.tokenIndex === tok.index}
              isSaved={savedSurfaces.has(tok.surface)}
              onTap={(data: WordTapData) =>
                setPopover({ ...data, tokenIndex: tok.index })
              }
            />
          ) : (
            <span key={`t-${i}`}>{tok.text}</span>
          ),
        )}
      </span>
      {popover && (
        <WordPopover
          key={`${popover.surface}|${popover.sentence}`}
          state={popover}
          onClose={() => setPopover(null)}
          onSaved={handleSaved}
        />
      )}
    </>
  );
}
