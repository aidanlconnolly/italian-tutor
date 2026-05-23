import { redirect } from "next/navigation";
import { pickTodaysRead } from "@/lib/content/reads";
import { getRoadmapSummary } from "@/lib/actions/progress";

export const dynamic = "force-dynamic";

export default async function ReadIndex() {
  let completedCount = 0;
  try {
    const summary = await getRoadmapSummary();
    completedCount = summary.readsCompleted.size;
  } catch {
    completedCount = 0;
  }
  const today = pickTodaysRead(completedCount);
  redirect(`/read/${today.slug}`);
}
