"use server";

import { gradeTranslation, type TranslationGrade } from "@/lib/anthropic";

export type GradeResult =
  | { ok: true; grade: TranslationGrade }
  | { ok: false; error: string };

export async function gradeTranslationAction(args: {
  direction: "it-to-en" | "en-to-it";
  prompt: string;
  reference: string;
  learner: string;
}): Promise<GradeResult> {
  if (!args.learner.trim()) {
    return { ok: false, error: "Empty answer" };
  }
  try {
    const grade = await gradeTranslation({
      direction: args.direction,
      prompt: args.prompt.normalize("NFC"),
      reference: args.reference.normalize("NFC"),
      learner: args.learner.trim().normalize("NFC"),
    });
    return { ok: true, grade };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
