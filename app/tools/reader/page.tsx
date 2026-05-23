import Link from "next/link";
import { Reader } from "@/components/Reader";
import { getSavedSurfaces } from "@/lib/actions/deck";

export const dynamic = "force-dynamic";

export default async function ReaderPage() {
  const initialSavedSurfaces = await getSavedSurfaces();

  return (
    <main className="mx-auto max-w-2xl px-6 py-12 font-sans">
      <div className="mb-8 flex items-baseline justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-zinc-400">Tools</div>
          <h1 className="text-2xl font-semibold tracking-tight">Reader</h1>
        </div>
        <Link
          href="/"
          className="text-xs text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
        >
          ← Roadmap
        </Link>
      </div>
      <Reader initialSavedSurfaces={initialSavedSurfaces} />
    </main>
  );
}
