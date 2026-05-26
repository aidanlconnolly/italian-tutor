import Link from "next/link";
import { getDailyStats } from "@/lib/actions/review";
import { getRoadmapSummary } from "@/lib/actions/progress";
import { pickTodaysRead } from "@/lib/content/reads";
import { Roadmap } from "@/components/Roadmap";

export const dynamic = "force-dynamic";

export default async function Home() {
  type StatsBlock = Awaited<ReturnType<typeof getDailyStats>>;
  type SummaryBlock = Awaited<ReturnType<typeof getRoadmapSummary>>;
  let stats: StatsBlock | { error: string } | null = null;
  let summary: SummaryBlock | { error: string } | null = null;
  try {
    stats = await getDailyStats();
  } catch (err) {
    stats = { error: err instanceof Error ? err.message : String(err) };
  }
  try {
    summary = await getRoadmapSummary();
  } catch (err) {
    summary = { error: err instanceof Error ? err.message : String(err) };
  }

  const readsCompleted =
    summary && !("error" in summary) ? summary.readsCompleted.size : 0;
  const todaysRead = pickTodaysRead(readsCompleted);
  const readDoneToday =
    summary && !("error" in summary)
      ? summary.readsCompleted.has(todaysRead.slug)
      : false;

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 font-sans sm:px-6 sm:py-10">
      <header className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-baseline sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Italian Tutor</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Roadmap to Rome — A0 to B1, ten minutes a day.
          </p>
        </div>
        <nav className="-mx-1 flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-zinc-500">
          <Link href="/read" className="px-1 py-1 hover:text-amber-700">
            Daily read
          </Link>
          <Link href="/tools/reader" className="px-1 py-1 hover:text-amber-700">
            Reader
          </Link>
          <Link href="/tools/review" className="px-1 py-1 hover:text-amber-700">
            Review
          </Link>
          <Link href="/tools/deck" className="px-1 py-1 hover:text-amber-700">
            Deck
          </Link>
        </nav>
      </header>

      {/* Stats strip */}
      <section className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-5">
        <StatCard
          label="Lesson streak"
          value={
            summary && !("error" in summary) ? `${summary.lessonStreak}🔥` : "—"
          }
        />
        <StatCard
          label="Lessons done"
          value={
            summary && !("error" in summary)
              ? `${summary.totalLessons} / ${summary.totalAuthoredLessons}`
              : "—"
          }
        />
        <StatCard
          label="Read streak"
          value={
            summary && !("error" in summary) ? `${summary.readStreak}📖` : "—"
          }
        />
        <StatCard
          label="Due cards"
          value={stats && !("error" in stats) ? `${stats.dueNow}` : "—"}
        />
        <StatCard
          label="Deck size"
          value={stats && !("error" in stats) ? `${stats.deckSize}` : "—"}
        />
      </section>

      {/* Today's read CTA */}
      <section className="mb-10">
        <Link
          href={`/read/${todaysRead.slug}`}
          className="block rounded-2xl border border-amber-300 bg-gradient-to-br from-amber-50 to-white p-5 transition-shadow hover:shadow-lg dark:border-amber-800 dark:from-amber-950/30 dark:to-zinc-950"
        >
          <div className="flex items-start gap-4">
            <div className="text-3xl">📖</div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400">
                <span>
                  Today&apos;s 10-minute read {readDoneToday ? "· ✓ done" : ""}
                </span>
                <DifficultyBadge value={todaysRead.difficulty} />
              </div>
              <div className="mt-1 font-serif text-lg font-semibold" lang="it">
                {todaysRead.titleIt}
              </div>
              <div className="text-xs italic text-zinc-500">
                {todaysRead.titleEn}
              </div>
              <div className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
                Side-by-side Italian and English. Tap any word to save it.
              </div>
            </div>
            <div className="hidden text-xs font-semibold text-amber-700 dark:text-amber-400 sm:block">
              {readDoneToday ? "Re-read →" : "Start →"}
            </div>
          </div>
        </Link>
      </section>

      {/* Errors */}
      {stats && "error" in stats && (
        <div className="mb-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-xs text-amber-900 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-200">
          <strong>Stats unavailable:</strong> {stats.error}
        </div>
      )}
      {summary && "error" in summary && (
        <div className="mb-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-xs text-amber-900 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-200">
          <strong>Progress unavailable:</strong> {summary.error}
        </div>
      )}

      {/* Roadmap */}
      <Roadmap
        data={{
          unitsCompleted:
            summary && !("error" in summary)
              ? Array.from(summary.unitSlugsCompleted)
              : [],
          lessonsCompleted:
            summary && !("error" in summary)
              ? Array.from(summary.lessonsCompleted)
              : [],
        }}
      />
    </main>
  );
}

function DifficultyBadge({ value }: { value: number }) {
  // Colors ramp green → amber → red as difficulty climbs
  const tone =
    value <= 5
      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
      : value <= 7
        ? "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300"
        : "bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300";
  // Format: drop trailing .0 ("4.0" → "4")
  const formatted = value % 1 === 0 ? value.toFixed(0) : value.toFixed(1);
  return (
    <span
      className={["rounded-full px-2 py-0.5 text-[10px] font-bold", tone].join(
        " ",
      )}
      title={`Difficulty: ${formatted} / 10`}
    >
      {formatted}/10
    </span>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-3 text-center dark:border-zinc-800 dark:bg-zinc-950">
      <div className="font-serif text-2xl font-semibold">{value}</div>
      <div className="mt-0.5 text-[10px] uppercase tracking-wider text-zinc-500">
        {label}
      </div>
    </div>
  );
}
