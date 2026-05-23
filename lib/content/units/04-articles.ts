import type { Unit } from "../types";

export const UNIT_ARTICLES: Unit = {
  slug: "articles",
  stage: 1,
  order: 4,
  icon: "📚",
  title: "Nouns, gender & articles",
  tagline: "il, la, lo, l', un, una — and how to make plurals. The grammar that pulls everything else together.",
  badge: "core",
  lessons: [
    {
      slug: "articles-gender",
      title: "Every noun has a gender",
      estMinutes: 8,
      pages: [
        {
          type: "intro",
          heading: "Masculine or feminine — no exceptions",
          body: [
            "Every Italian noun is either <strong>masculine</strong> or <strong>feminine</strong>. There's no \"it.\" Even objects like tables and pens have gender.",
            "The good news: the ending usually gives it away. Most nouns ending in <strong>-o</strong> are masculine: <em>libro, gatto, vino</em>. Most ending in <strong>-a</strong> are feminine: <em>casa, pizza, donna</em>.",
            "Nouns ending in <strong>-e</strong> can be either — these you memorize. <em>il pane</em> (m, bread), <em>la notte</em> (f, night), <em>il fiore</em> (m, flower).",
          ],
          tip: {
            label: "When in doubt, learn the article with the noun",
            body: "Don't memorize just <em>casa</em> — memorize <em>la casa</em>. Don't learn <em>libro</em> alone — learn <em>il libro</em>. The article carries the gender for free.",
          },
        },
        {
          type: "vocab",
          heading: "Common nouns with their gender",
          intro: "Learn each one with its article — that's how Italians remember them.",
          items: [
            { it: "il libro", en: "the book (m)" },
            { it: "il gatto", en: "the cat (m)" },
            { it: "il treno", en: "the train (m)" },
            { it: "il caffè", en: "the coffee (m)" },
            { it: "la casa", en: "the house (f)" },
            { it: "la pizza", en: "the pizza (f)" },
            { it: "la donna", en: "the woman (f)" },
            { it: "la macchina", en: "the car (f)" },
            { it: "il pane", en: "the bread (m, -e ending)" },
            { it: "la notte", en: "the night (f, -e ending)" },
            { it: "il fiore", en: "the flower (m, -e ending)" },
            { it: "la chiave", en: "the key (f, -e ending)" },
          ],
        },
        {
          type: "tip",
          heading: "Gotchas — the gender mismatches",
          body: "A handful of words end in -a but are masculine: <em>il problema, il programma, il sistema, il clima</em> (almost all Greek-origin). And some -o words are feminine: <em>la mano</em> (the hand), <em>la radio</em> (the radio), <em>la foto</em> (short for fotografia).",
          example: { it: "Ho un problema con la mano.", en: "I have a problem with my hand." },
        },
        {
          type: "multipleChoice",
          heading: "Spot the gender",
          questions: [
            {
              q: "Which is feminine?",
              options: ["il vino", "la pizza", "il libro", "il gatto"],
              correct: 1,
              fb: "la pizza — feminine, ends in -a.",
            },
            {
              q: "Which is the odd one out (different gender)?",
              options: ["la casa", "la donna", "la mano", "il libro"],
              correct: 3,
              fb: "Tricky — la mano is feminine despite ending in -o. The other three are all the same gender (la = feminine), so il libro is the odd one.",
            },
            {
              q: "Which article goes with 'problema'?",
              options: ["la", "il", "lo", "l'"],
              correct: 1,
              fb: "Il problema — masculine despite the -a ending. So is il programma, il sistema, il clima.",
            },
          ],
        },
      ],
    },
    {
      slug: "articles-definite",
      title: "The definite article zoo",
      estMinutes: 10,
      pages: [
        {
          type: "intro",
          heading: "Italian has seven words for 'the'",
          body: [
            "English has one. Italian has seven, and which one you use depends on the noun's gender, number, and the first letter of the noun.",
            "<strong>Masculine singular:</strong> <em>il</em> before most consonants (il libro), <em>lo</em> before s+consonant, z, ps, gn, y (lo studente, lo zaino), <em>l'</em> before a vowel (l'amico).",
            "<strong>Feminine singular:</strong> <em>la</em> before consonants (la casa), <em>l'</em> before vowels (l'amica).",
            "<strong>Plurals:</strong> masculine = <em>i</em> (i libri) or <em>gli</em> (gli studenti, gli amici). Feminine = <em>le</em> (le case, le amiche).",
          ],
          keyPoint:
            "M.sg: il / lo / l'. F.sg: la / l'. M.pl: i / gli. F.pl: le. The choice is dictated by the first sound of the noun.",
        },
        {
          type: "conjugation",
          heading: "The seven definite articles",
          verb: "il / la / lo / l' / i / gli / le",
          meaning: "the (in all its forms)",
          tenses: [
            {
              name: "Masculine singular",
              forms: [
                { person: "il + consonant", form: "il libro", en: "the book" },
                { person: "lo + s+cons/z/etc", form: "lo studente", en: "the student" },
                { person: "lo + zaino", form: "lo zaino", en: "the backpack" },
                { person: "l' + vowel", form: "l'amico", en: "the friend (m)" },
              ],
            },
            {
              name: "Feminine singular",
              forms: [
                { person: "la + consonant", form: "la casa", en: "the house" },
                { person: "la + pizza", form: "la pizza", en: "the pizza" },
                { person: "l' + vowel", form: "l'amica", en: "the friend (f)" },
              ],
            },
            {
              name: "Plurals",
              forms: [
                { person: "i (m, consonant)", form: "i libri", en: "the books" },
                { person: "gli (m, s+cons/vowel/etc)", form: "gli amici", en: "the friends (m)" },
                { person: "gli (m, zaini)", form: "gli zaini", en: "the backpacks" },
                { person: "le (all feminine)", form: "le case, le amiche", en: "the houses, the friends (f)" },
              ],
            },
          ],
        },
        {
          type: "fillBlank",
          heading: "Pick the right article",
          items: [
            {
              template: "___ caffè è buono.",
              answer: "Il",
              en: "The coffee is good.",
              options: ["Il", "Lo", "La", "L'"],
            },
            {
              template: "___ amico arriva alle otto.",
              answer: "L'",
              en: "The friend (m) arrives at 8.",
              options: ["Il", "Lo", "La", "L'"],
            },
            {
              template: "___ studente è italiano.",
              answer: "Lo",
              en: "The student is Italian.",
              options: ["Il", "Lo", "La", "L'"],
            },
            {
              template: "___ amica di Marco si chiama Anna.",
              answer: "L'",
              en: "Marco's (female) friend is named Anna.",
              options: ["Il", "Lo", "La", "L'"],
            },
            {
              template: "___ chiave è sul tavolo.",
              answer: "La",
              en: "The key is on the table.",
              options: ["Il", "Lo", "La", "L'"],
            },
            {
              template: "___ zaino è pesante.",
              answer: "Lo",
              en: "The backpack is heavy.",
              options: ["Il", "Lo", "La", "L'"],
            },
          ],
        },
        {
          type: "tip",
          heading: "When you don't know the noun, listen for the article",
          body: "If a stranger says <em>l'</em> something, you know it starts with a vowel. If they say <em>lo</em>, it starts with s+consonant or z. Italian articles are tiny clues to spelling.",
        },
      ],
    },
    {
      slug: "articles-indefinite-plurals",
      title: "Indefinite articles & plurals",
      estMinutes: 9,
      pages: [
        {
          type: "intro",
          heading: "'A / an' has three forms",
          body: [
            "<strong>Un</strong> = a/an, masculine, before most words (un libro, un amico).",
            "<strong>Uno</strong> = a/an, masculine, before s+consonant, z, ps, gn (uno studente, uno zaino).",
            "<strong>Una</strong> = a/an, feminine before consonants (una casa). Drops to <strong>un'</strong> before a vowel (un'amica).",
            "Notice the apostrophe on <em>un'</em> for feminine but NOT on <em>un</em> for masculine. <em>un amico</em> (no apostrophe) vs <em>un'amica</em> (apostrophe).",
          ],
          keyPoint:
            "un (m) / uno (m, s+cons) / una (f) / un' (f, vowel). The apostrophe is only feminine.",
        },
        {
          type: "vocab",
          heading: "A/an in action",
          items: [
            { it: "un caffè", en: "a coffee" },
            { it: "un amico", en: "a friend (m) — no apostrophe!" },
            { it: "uno studente", en: "a student" },
            { it: "uno zaino", en: "a backpack" },
            { it: "una pizza", en: "a pizza" },
            { it: "una macchina", en: "a car" },
            { it: "un'amica", en: "a friend (f) — apostrophe!" },
            { it: "un'idea", en: "an idea (f)" },
          ],
        },
        {
          type: "intro",
          heading: "Making plurals",
          body: [
            "Most masculine -o nouns change to -i: <em>libro → libri, gatto → gatti, treno → treni</em>.",
            "Most feminine -a nouns change to -e: <em>casa → case, pizza → pizze, donna → donne</em>.",
            "Nouns ending in -e (either gender) change to -i: <em>pane → pani, notte → notti</em>.",
            "Some don't change: words ending in accented vowels (caffè → caffè), foreign words (bar → bar), and one-syllable words (re → re).",
          ],
          tip: {
            label: "Plural articles compound",
            body: "il libro → <em>i</em> libri. lo zaino → <em>gli</em> zaini. l'amico → <em>gli</em> amici. la pizza → <em>le</em> pizze. l'idea → <em>le</em> idee.",
          },
        },
        {
          type: "orderWords",
          heading: "Put the sentence together",
          items: [
            { tokens: ["Vorrei", "un", "caffè", "e", "una", "pizza"], en: "I'd like a coffee and a pizza." },
            { tokens: ["Gli", "amici", "di", "Marco", "sono", "italiani"], en: "Marco's friends are Italian." },
            { tokens: ["Lo", "studente", "ha", "uno", "zaino", "pesante"], en: "The student has a heavy backpack." },
            { tokens: ["Le", "donne", "leggono", "i", "libri"], en: "The women read the books." },
          ],
        },
        {
          type: "checkpoint",
          heading: "Lesson check",
          questions: [
            {
              q: "Translate: 'a friend (female)'",
              options: ["un amica", "una amica", "un'amica", "uno amica"],
              correct: 2,
            },
            {
              q: "Translate: 'a friend (male)'",
              options: ["un amico", "un'amico", "uno amico", "una amico"],
              correct: 0,
            },
            {
              q: "Plural of 'la casa'?",
              options: ["i case", "le casi", "le case", "gli case"],
              correct: 2,
            },
            {
              q: "Plural of 'lo zaino'?",
              options: ["i zaini", "gli zaini", "le zaini", "l'zaini"],
              correct: 1,
            },
            {
              q: "The article for 'amico' (singular) is…",
              options: ["il", "lo", "la", "l'"],
              correct: 3,
            },
          ],
        },
      ],
    },
  ],
  checkpoint: {
    passingPct: 80,
    questions: [
      {
        q: "Which is the correct article for 'studente'?",
        options: ["il", "lo", "la", "l'"],
        correct: 1,
      },
      {
        q: "What's the plural of 'l'amico'?",
        options: ["gli amici", "le amiche", "i amici", "l'amici"],
        correct: 0,
      },
      {
        q: "Translate: 'a backpack'",
        options: ["un zaino", "uno zaino", "una zaino", "un'zaino"],
        correct: 1,
      },
      {
        q: "Which is feminine despite the ending?",
        options: ["il libro", "il problema", "la mano", "il treno"],
        correct: 2,
      },
      {
        q: "Translate: 'an idea'",
        options: ["un idea", "una idea", "un'idea", "uno idea"],
        correct: 2,
      },
      {
        q: "Plural of 'la pizza' is…",
        options: ["le pizze", "i pizze", "le pizzi", "gli pizze"],
        correct: 0,
      },
      {
        q: "Which article belongs with 'amica'?",
        options: ["il", "lo", "la", "l'"],
        correct: 3,
      },
      {
        q: "Which is masculine despite ending in -a?",
        options: ["la casa", "il problema", "la pizza", "la donna"],
        correct: 1,
      },
      {
        q: "Plural of 'lo zaino'?",
        options: ["i zaini", "le zaini", "gli zaini", "l'zaini"],
        correct: 2,
      },
      {
        q: "Which sentence uses articles correctly?",
        options: [
          "Lo amico ha la zaino.",
          "L'amico ha lo zaino.",
          "Il amico ha il zaino.",
          "L'amico ha il zaino.",
        ],
        correct: 1,
      },
    ],
  },
};
