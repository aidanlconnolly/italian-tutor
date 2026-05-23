import { notFound } from "next/navigation";
import { CheckpointRunner } from "@/components/CheckpointRunner";
import { findUnit, UNITS } from "@/lib/content/units";

export const dynamic = "force-dynamic";

export default async function CheckpointPage({
  params,
}: {
  params: Promise<{ unit: string }>;
}) {
  const { unit: unitSlug } = await params;
  const unit = findUnit(unitSlug);
  if (!unit) notFound();

  const idx = UNITS.findIndex((u) => u.slug === unit.slug);
  const next = UNITS[idx + 1];

  return (
    <CheckpointRunner
      unit={unit}
      nextUnitSlug={next ? next.slug : null}
    />
  );
}
