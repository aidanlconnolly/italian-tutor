import type { Stage } from "./types";

export const STAGES: Stage[] = [
  { number: 1, title: "Foundations", blurb: "Sounds, greetings, numbers, articles, the first verbs." },
  { number: 2, title: "First conversations", blurb: "Talk about yourself, ask questions, glue ideas together." },
  { number: 3, title: "Around Rome", blurb: "Transit, directions, hotels, help — survival Italian." },
  { number: 4, title: "Eating & drinking", blurb: "Bars, trattorias, ordering, paying, Roman specialties." },
  { number: 5, title: "Past & future", blurb: "Tell stories — passato prossimo, imperfetto, futuro." },
  { number: 6, title: "Shopping & daily life", blurb: "Markets, money, formal Lei, polite complaints." },
  { number: 7, title: "Cultural fluency", blurb: "Idioms, gestures, art, religion, small talk." },
  { number: 8, title: "Real conversations (B1)", blurb: "Conditional, subjunctive, opinions and debate." },
];

/** Full 35-unit outline (for the locked previews in the roadmap). */
export type UnitPreview = {
  slug: string;
  stage: number;
  order: number;
  icon: string;
  title: string;
  tagline: string;
};

export const UNIT_OUTLINE: UnitPreview[] = [
  // Stage 1 — Foundations (built)
  { slug: "alphabet", stage: 1, order: 1, icon: "🔤", title: "Alphabet & sounds", tagline: "Letters, doubled consonants, c/g + e/i, stress." },
  { slug: "greetings", stage: 1, order: 2, icon: "👋", title: "Greetings & politeness", tagline: "Ciao, salve, buongiorno — and when to use which." },
  { slug: "numbers-time", stage: 1, order: 3, icon: "🔢", title: "Numbers, days & time", tagline: "0–1000, dates, telling time, prices." },
  { slug: "articles", stage: 1, order: 4, icon: "📚", title: "Nouns, gender & articles", tagline: "il, la, lo, l', un, una — and plurals." },
  { slug: "essere-avere", stage: 1, order: 5, icon: "🧱", title: "Essere, avere & present tense", tagline: "The two pillars, plus -are/-ere/-ire regulars." },

  // Stage 2 — First conversations
  { slug: "about-me", stage: 2, order: 6, icon: "🪪", title: "About me", tagline: "Nationalities, professions, family, possessives." },
  { slug: "questions", stage: 2, order: 7, icon: "❓", title: "Asking questions", tagline: "Chi, che, dove, quando, perché, come." },
  { slug: "likes-wants", stage: 2, order: 8, icon: "❤️", title: "Likes & wants", tagline: "Mi piace, vorrei, preferisco, sapere vs conoscere." },
  { slug: "connectors", stage: 2, order: 9, icon: "🔗", title: "Connecting words", tagline: "E, ma, però, perché, poi, quindi." },

  // Stage 3 — Around Rome
  { slug: "transit", stage: 3, order: 10, icon: "🚇", title: "Getting around", tagline: "Metro, autobus, treno, biglietti, validare." },
  { slug: "directions", stage: 3, order: 11, icon: "🧭", title: "Asking for directions", tagline: "Destra, sinistra, dritto — scusi, dov'è…" },
  { slug: "hotel", stage: 3, order: 12, icon: "🏨", title: "Airport & hotel", tagline: "Check-in, reservations, room vocab, complaints." },
  { slug: "help", stage: 3, order: 13, icon: "🆘", title: "Emergencies & help", tagline: "Farmacia, pronto soccorso, può aiutarmi?" },
  { slug: "landmarks", stage: 3, order: 14, icon: "🏛️", title: "Roman landmarks", tagline: "Colosseo, Vaticano, Trastevere, history-talk." },

  // Stage 4 — Eating & drinking
  { slug: "bar", stage: 4, order: 15, icon: "☕", title: "At the bar", tagline: "Caffè culture, bar vs tavolo, pay-first." },
  { slug: "trattoria", stage: 4, order: 16, icon: "🍝", title: "At the trattoria", tagline: "Antipasto → dolce, ordering, il conto." },
  { slug: "food-vocab", stage: 4, order: 17, icon: "🥬", title: "Food vocab deep dive", tagline: "Pasta shapes, meats, veg, fish, prep verbs." },
  { slug: "diet-wine", stage: 4, order: 18, icon: "🍷", title: "Wine & dietary needs", tagline: "Vino della casa, vegetarian, sono allergico a…" },
  { slug: "roman-food", stage: 4, order: 19, icon: "🍕", title: "Roman & regional", tagline: "Cacio e pepe, carbonara, supplì, tipping." },

  // Stage 5 — Past & future
  { slug: "passato-avere", stage: 5, order: 20, icon: "⏪", title: "Passato prossimo (avere)", tagline: "Ieri ho mangiato… the workhorse past." },
  { slug: "passato-essere", stage: 5, order: 21, icon: "🏃", title: "Passato prossimo (essere)", tagline: "Sono andato/a — motion & state verbs, agreement." },
  { slug: "imperfetto", stage: 5, order: 22, icon: "🌅", title: "Imperfetto", tagline: "Quando ero a Roma… habitual past." },
  { slug: "futuro", stage: 5, order: 23, icon: "⏩", title: "Futuro semplice", tagline: "Domani vedrò — and futuro anteriore." },
  { slug: "narrate-trip", stage: 5, order: 24, icon: "📖", title: "Narrating a trip", tagline: "Combine tenses to tell your travel story." },

  // Stage 6 — Shopping & daily life
  { slug: "shopping", stage: 6, order: 25, icon: "🛍️", title: "Money & shopping", tagline: "Quanto costa, sconto, posso pagare con carta?" },
  { slug: "market", stage: 6, order: 26, icon: "🥕", title: "Market / supermercato", tagline: "Etti, chili, ne prendo due." },
  { slug: "formal", stage: 6, order: 27, icon: "🤝", title: "Formal (Lei) deep dive", tagline: "Mi scusi, dica, prego — the polite imperative." },
  { slug: "complaints", stage: 6, order: 28, icon: "📣", title: "Complaints & returns", tagline: "Vorrei un rimborso — polite escalation." },

  // Stage 7 — Cultural fluency
  { slug: "idioms", stage: 7, order: 29, icon: "🐺", title: "Idioms & gestures", tagline: "In bocca al lupo, magari, boh, hand-talk." },
  { slug: "religion", stage: 7, order: 30, icon: "⛪", title: "Religion & Vatican", tagline: "Chiesa, papa, messa — basics without taking a side." },
  { slug: "museums", stage: 7, order: 31, icon: "🖼️", title: "Museums & art talk", tagline: "Affresco, mostra, biglietto ridotto." },
  { slug: "small-talk", stage: 7, order: 32, icon: "💬", title: "Small talk", tagline: "Meteo, sport, che bello! — graceful exits." },

  // Stage 8 — Real conversations
  { slug: "condizionale", stage: 8, order: 33, icon: "🎩", title: "Condizionale", tagline: "Vorrei, potrei, dovrei — gentle requests." },
  { slug: "congiuntivo", stage: 8, order: 34, icon: "🤔", title: "Subjunctive intro", tagline: "Credo che, penso che — common verbs." },
  { slug: "opinions", stage: 8, order: 35, icon: "🗣️", title: "Opinions & debate", tagline: "Secondo me, sono d'accordo, però…" },
];

export const TOTAL_UNITS = UNIT_OUTLINE.length;
