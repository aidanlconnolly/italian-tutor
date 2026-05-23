import { notFound } from "next/navigation";
import { findRead } from "@/lib/content/reads";
import { DailyReadView } from "@/components/DailyRead";

export const dynamic = "force-dynamic";

export default async function ReadPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const read = findRead(slug);
  if (!read) notFound();
  return <DailyReadView read={read} />;
}
