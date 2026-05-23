"use client";

import { useEffect } from "react";
import type { Conjugation } from "@/lib/content/types";
import { SpeakButton } from "../SpeakButton";

export function ConjugationPage({
  page,
  setDone,
}: {
  page: Conjugation;
  setDone: (b: boolean) => void;
}) {
  useEffect(() => {
    setDone(true);
  }, [setDone]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">{page.heading}</h2>
      <div className="flex items-baseline gap-2">
        <span className="font-serif text-xl font-semibold" lang="it">
          {page.verb}
        </span>
        <span className="text-sm italic text-zinc-500">— {page.meaning}</span>
      </div>
      {page.intro && (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{page.intro}</p>
      )}
      <div className="space-y-5">
        {page.tenses.map((t, ti) => (
          <div key={ti}>
            <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400">
              {t.name}
            </div>
            <table className="w-full text-sm">
              <tbody>
                {t.forms.map((f, fi) => (
                  <tr
                    key={fi}
                    className="border-b border-zinc-200 last:border-b-0 dark:border-zinc-800"
                  >
                    <td className="py-2 pr-3 text-xs text-zinc-500">
                      {f.person}
                    </td>
                    <td className="py-2 pr-2">
                      <span className="font-serif font-medium" lang="it">
                        {f.form}
                      </span>
                    </td>
                    <td className="w-8 py-2">
                      <SpeakButton text={f.form} />
                    </td>
                    {f.en && (
                      <td className="py-2 pl-2 text-xs italic text-zinc-500">
                        {f.en}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
