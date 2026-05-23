import { notFound } from "next/navigation";
import { LessonPlayer } from "@/components/LessonPlayer";
import { findLesson } from "@/lib/content/units";

export const dynamic = "force-dynamic";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ unit: string; lesson: string }>;
}) {
  const { unit: unitSlug, lesson: lessonSlug } = await params;
  const found = findLesson(unitSlug, lessonSlug);
  if (!found) notFound();
  const { unit, lessonIndex } = found;
  const lesson = unit.lessons[lessonIndex];
  const nextLesson = unit.lessons[lessonIndex + 1];

  return (
    <LessonPlayer
      unit={unit}
      lesson={lesson}
      nextLessonSlug={nextLesson ? `${unit.slug}/${nextLesson.slug}` : null}
    />
  );
}
