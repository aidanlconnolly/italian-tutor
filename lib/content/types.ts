/**
 * Discriminated union for lesson page types. Each variant is rendered by a
 * dedicated component in components/pages/. The LessonPlayer treats every
 * page uniformly: it asks for { done, missedLemmas? } so it can gate Next
 * and auto-save miss lemmas to the FSRS deck at lesson end.
 */

export type Intro = {
  type: "intro";
  heading: string;
  body: string[];
  tip?: { label: string; body: string };
  keyPoint?: string;
};

export type VocabItem = {
  it: string;
  en: string;
  /** Optional contextual note (gender for nouns, irregularity, etc.) */
  note?: string;
};

export type Vocab = {
  type: "vocab";
  heading: string;
  intro?: string;
  items: VocabItem[];
};

export type DialogueLine = {
  speaker: string;
  it: string;
  en: string;
};

export type Dialogue = {
  type: "dialogue";
  heading: string;
  setup?: string;
  lines: DialogueLine[];
};

export type ConjTense = {
  name: string;
  forms: { person: string; form: string; en?: string }[];
};

export type Conjugation = {
  type: "conjugation";
  heading: string;
  verb: string;
  meaning: string;
  intro?: string;
  tenses: ConjTense[];
};

export type MCQuestion = {
  q: string;
  qIt?: string;
  options: string[];
  /** index of the correct option */
  correct: number;
  /** Feedback shown after answer */
  fb?: string;
};

export type MultipleChoice = {
  type: "multipleChoice";
  heading: string;
  intro?: string;
  questions: MCQuestion[];
};

export type FillBlankItem = {
  /** Sentence containing `___` placeholder for the blank */
  template: string;
  /** Correct answer */
  answer: string;
  en: string;
  /** Optional multiple-choice options; if absent, user types the answer */
  options?: string[];
};

export type FillBlank = {
  type: "fillBlank";
  heading: string;
  intro?: string;
  items: FillBlankItem[];
};

export type OrderWordsItem = {
  /** All tokens in canonical order; we shuffle for the user */
  tokens: string[];
  en: string;
};

export type OrderWords = {
  type: "orderWords";
  heading: string;
  intro?: string;
  items: OrderWordsItem[];
};

export type Translate = {
  type: "translate";
  heading: string;
  direction: "it-to-en" | "en-to-it";
  prompt: string;
  /** Canonical answer used for grading + reveal */
  reference: string;
  hint?: string;
};

export type ListenItem = {
  it: string;
  en: string;
  options: string[];
  correct: number;
};

export type Listen = {
  type: "listen";
  heading: string;
  intro?: string;
  items: ListenItem[];
};

export type PronounceItem = {
  it: string;
  en: string;
  tip?: string;
};

export type Pronounce = {
  type: "pronounce";
  heading: string;
  intro?: string;
  items: PronounceItem[];
};

export type Tip = {
  type: "tip";
  heading: string;
  body: string;
  example?: { it: string; en: string };
};

export type CheckpointQuestion = {
  q: string;
  qIt?: string;
  options: string[];
  correct: number;
};

export type Checkpoint = {
  type: "checkpoint";
  heading: string;
  intro?: string;
  questions: CheckpointQuestion[];
};

export type LessonPage =
  | Intro
  | Vocab
  | Dialogue
  | Conjugation
  | MultipleChoice
  | FillBlank
  | OrderWords
  | Translate
  | Listen
  | Pronounce
  | Tip
  | Checkpoint;

export type Lesson = {
  slug: string;
  title: string;
  summary?: string;
  estMinutes: number;
  pages: LessonPage[];
};

export type UnitCheckpoint = {
  passingPct: number;
  questions: CheckpointQuestion[];
};

export type Unit = {
  slug: string;
  stage: number;
  order: number;
  icon: string;
  title: string;
  tagline: string;
  badge?: "core" | "tourist" | "culture" | "advanced";
  lessons: Lesson[];
  checkpoint: UnitCheckpoint;
};

export type Stage = {
  number: number;
  title: string;
  blurb: string;
};

export type DailyRead = {
  slug: string;
  /** Day offset 1-30 — used to pick "today's read" by streak day */
  order: number;
  /** Minimum stage required to unlock this read */
  stageUnlock: number;
  titleIt: string;
  titleEn: string;
  intro: string;
  paragraphs: { it: string; en: string }[];
  comprehension: CheckpointQuestion[];
  /** Star words worth highlighting after reading */
  vocabSpotlight?: { it: string; en: string }[];
};
