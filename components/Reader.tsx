"use client";

import { useMemo, useState } from "react";
import { tokenize } from "@/lib/italian";
import { TappableWord, type WordTapData } from "./TappableWord";
import { WordPopover, type PopoverState } from "./WordPopover";
import type { Word } from "@/lib/db/schema";

const SAMPLE = `Mi chiamo Marco e abito a Roma. Ogni mattina vado al lavoro in metropolitana e leggo il giornale durante il viaggio.

Mi piace molto bere il caffè al bar sotto casa con l'amico di mio fratello. Dopo cena, di solito guardo un film o ascolto la radio prima di andare a dormire.`;

export function Reader({
  initialSavedSurfaces,
}: {
  initialSavedSurfaces: string[];
}) {
  const [draft, setDraft] = useState(SAMPLE);
  const [text, setText] = useState<string | null>(null);
  const [popover, setPopover] = useState<
    (PopoverState & { tokenIndex: number }) | null
  >(null);
  const [savedSurfaces, setSavedSurfaces] = useState<Set<string>>(
    () => new Set(initialSavedSurfaces),
  );

  const tokens = useMemo(() => (text ? tokenize(text) : []), [text]);

  function handleSaved(word: Word) {
    setSavedSurfaces((prev) => {
      const next = new Set(prev);
      next.add(word.lemma);
      for (const s of word.surfaceSeen ?? []) next.add(s);
      return next;
    });
  }

  if (text === null) {
    return (
      <div className="space-y-4">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={10}
          spellCheck={false}
          className="w-full rounded-lg border border-zinc-300 bg-white p-4 font-serif text-base leading-relaxed shadow-sm focus:border-amber-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-950 sm:text-lg"
          placeholder="Incolla un testo italiano…"
        />
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setText(draft.normalize("NFC"))}
            disabled={!draft.trim()}
            className="rounded-lg bg-amber-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Read →
          </button>
          <p className="text-xs text-zinc-500">
            Click any word for a definition. Saved words get a green underline.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={() => {
          setText(null);
          setPopover(null);
        }}
        className="text-xs text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
      >
        ← New text
      </button>

      <div className="whitespace-pre-wrap font-serif text-lg leading-loose sm:text-xl sm:leading-relaxed">
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
      </div>

      {popover && (
        <WordPopover
          key={`${popover.surface}|${popover.sentence}`}
          state={popover}
          onClose={() => setPopover(null)}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}
