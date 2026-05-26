"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { lookupWord, type LookupResult } from "@/lib/actions/lookup";
import { saveCardForWord, type SaveResult } from "@/lib/actions/save";
import { SpeakButton } from "./SpeakButton";
import type { Word } from "@/lib/db/schema";

export type PopoverState = {
  surface: string;
  sentence: string;
  rect: DOMRect;
};

const POPOVER_WIDTH = 360;
const MOBILE_BREAKPOINT = 640;

export function WordPopover({
  state,
  onClose,
  onSaved,
}: {
  state: PopoverState;
  onClose: () => void;
  onSaved?: (word: Word) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [result, setResult] = useState<LookupResult | null>(null);
  const [saved, setSaved] = useState(false);
  const [saving, startSave] = useTransition();
  const [saveError, setSaveError] = useState<string | null>(null);

  // Fetch once on mount. The Reader keys this component on surface+sentence
  // so a new tap remounts (no stale state to worry about).
  useEffect(() => {
    let cancelled = false;
    lookupWord({ surface: state.surface, sentence: state.sentence }).then(
      (r) => {
        if (cancelled) return;
        setResult(r);
        if (r.ok) setSaved(r.isSaved);
      },
    );
    return () => {
      cancelled = true;
    };
    // Intentionally empty: this popover is keyed on surface+sentence upstream.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Outside click / Esc to close
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    function onPointer(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [onClose]);

  const viewportWidth =
    typeof window !== "undefined" ? window.innerWidth : 1024;
  const viewportHeight =
    typeof window !== "undefined" ? window.innerHeight : 800;
  const isMobile = viewportWidth < MOBILE_BREAKPOINT;
  // Desktop: anchor under the word; flip above if no room.
  // Mobile: pin to bottom of viewport as a sheet — never block the tapped word.
  const left = isMobile
    ? 8
    : Math.max(8, Math.min(state.rect.left, viewportWidth - POPOVER_WIDTH - 8));
  const desktopTop =
    state.rect.bottom + 8 + 320 > viewportHeight && state.rect.top > 320
      ? Math.max(8, state.rect.top - 8 - 320)
      : state.rect.bottom + 8;
  const top = isMobile ? undefined : desktopTop;
  const bottom = isMobile ? 8 : undefined;
  const right = isMobile ? 8 : undefined;

  function handleSave() {
    if (!result?.ok || saved || saving) return;
    const word = result.word;
    startSave(async () => {
      const res: SaveResult = await saveCardForWord({
        wordId: word.id,
        sourceSurface: state.surface,
        sourceSentence: state.sentence,
      });
      if (res.ok) {
        setSaved(true);
        onSaved?.(word);
      } else {
        setSaveError(res.error);
      }
    });
  }

  return (
    <div
      ref={ref}
      role="dialog"
      className="fixed z-50 max-h-[70vh] overflow-y-auto overscroll-contain rounded-lg border border-zinc-300 bg-white p-4 shadow-xl dark:border-zinc-700 dark:bg-zinc-900 sm:w-[360px] sm:max-w-[calc(100vw-16px)]"
      style={{
        top,
        left,
        right,
        bottom,
        paddingBottom: isMobile
          ? "calc(1rem + env(safe-area-inset-bottom))"
          : undefined,
      }}
    >
      <Body
        state={state}
        result={result}
        saved={saved}
        saving={saving}
        saveError={saveError}
        onSave={handleSave}
      />
    </div>
  );
}

function Body({
  state,
  result,
  saved,
  saving,
  saveError,
  onSave,
}: {
  state: PopoverState;
  result: LookupResult | null;
  saved: boolean;
  saving: boolean;
  saveError: string | null;
  onSave: () => void;
}) {
  if (!result) {
    return (
      <>
        <Header surface={state.surface} />
        <p className="mt-2 text-xs text-zinc-500">Looking up…</p>
        <SourceSentence sentence={state.sentence} />
      </>
    );
  }

  if (!result.ok) {
    return (
      <>
        <Header surface={state.surface} />
        <p className="mt-2 text-xs text-rose-600 dark:text-rose-400">
          {result.error}
        </p>
        <SourceSentence sentence={state.sentence} />
      </>
    );
  }

  const w = result.word;
  return (
    <>
      <div className="flex items-baseline justify-between gap-2">
        <div className="flex items-baseline gap-2">
          <div className="font-serif text-2xl font-semibold">{w.lemma}</div>
          <SpeakButton text={w.lemma} />
        </div>
        <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-400">
          {w.pos}
          {w.gender ? ` · ${w.gender}` : ""}
        </span>
      </div>

      <p className="mt-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
        {w.translation}
      </p>
      <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
        {w.definition}
      </p>

      {w.grammarNotes && (
        <p className="mt-2 rounded bg-amber-50 px-2 py-1 text-[11px] text-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
          {w.grammarNotes}
        </p>
      )}

      {w.examples && w.examples.length > 0 && (
        <div className="mt-3 space-y-2 border-t border-zinc-200 pt-3 dark:border-zinc-700">
          {w.examples.map((ex, i) => (
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

      {w.conjugation && Object.keys(w.conjugation).length > 0 && (
        <details className="mt-3 border-t border-zinc-200 pt-2 dark:border-zinc-700">
          <summary className="cursor-pointer text-[11px] font-medium uppercase tracking-wider text-zinc-500">
            Conjugation
          </summary>
          <div className="mt-2 space-y-2 text-xs">
            {Object.entries(w.conjugation).map(([tense, forms]) => (
              <div key={tense}>
                <div className="font-medium capitalize text-zinc-700 dark:text-zinc-300">
                  {tense}
                </div>
                <div className="mt-0.5 grid grid-cols-2 gap-x-3 gap-y-0.5 font-serif">
                  {Object.entries(forms).map(([person, form]) => (
                    <div key={person} className="flex justify-between">
                      <span className="text-zinc-500">{person}</span>
                      <span className="text-zinc-800 dark:text-zinc-200">
                        {form}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </details>
      )}

      <SourceSentence sentence={state.sentence} />

      {saveError && (
        <p className="mt-2 text-[11px] text-rose-600 dark:text-rose-400">
          {saveError}
        </p>
      )}
      <button
        type="button"
        onClick={onSave}
        disabled={saved || saving}
        className={[
          "mt-3 w-full rounded px-3 py-1.5 text-xs font-medium transition-colors",
          saved
            ? "cursor-default bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200"
            : saving
              ? "cursor-wait bg-zinc-200 text-zinc-500 dark:bg-zinc-800"
              : "bg-amber-600 text-white hover:bg-amber-700",
        ].join(" ")}
      >
        {saved ? "✓ In your deck" : saving ? "Saving…" : "Add to deck"}
      </button>

      <p className="mt-2 text-[10px] text-zinc-400">
        {result.cached ? "✓ from cache" : "fetched from Claude"}
      </p>
    </>
  );
}

function Header({ surface }: { surface: string }) {
  return <div className="font-serif text-2xl font-semibold">{surface}</div>;
}

function SourceSentence({ sentence }: { sentence: string }) {
  return (
    <div className="mt-3 border-t border-zinc-200 pt-3 dark:border-zinc-700">
      <div className="text-[10px] font-medium uppercase tracking-wider text-zinc-400">
        Source sentence
      </div>
      <p className="mt-1 font-serif text-sm italic text-zinc-700 dark:text-zinc-300">
        {sentence || "(no sentence found)"}
      </p>
    </div>
  );
}
