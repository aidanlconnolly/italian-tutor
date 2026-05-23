import type { Unit } from "../types";

export const UNIT_ESSERE_AVERE: Unit = {
  slug: "essere-avere",
  stage: 1,
  order: 5,
  icon: "🧱",
  title: "Essere, avere & present tense",
  tagline: "The two pillar verbs plus regular -are / -ere / -ire. The grammar that unlocks first sentences.",
  badge: "core",
  lessons: [
    {
      slug: "essere-avere-pillars",
      title: "Essere and avere — the pillars",
      estMinutes: 10,
      pages: [
        {
          type: "intro",
          heading: "Two verbs hold up the language",
          body: [
            "<strong>Essere</strong> = to be. <strong>Avere</strong> = to have. They're irregular, used constantly, and unavoidable. Memorize them now and the rest of Italian gets dramatically easier.",
            "Italian doesn't usually need the subject pronoun — the verb ending tells you who's acting. <em>Sono americano</em> = \"(I) am American.\" The <em>-o</em> ending is already 'I'.",
            "Use the subject pronoun (<em>io, tu, lui/lei, noi, voi, loro</em>) only for emphasis or contrast: <em>Io sono americano, ma lui è italiano</em>.",
          ],
          keyPoint:
            "Subject pronouns are usually dropped. The verb ending already says who.",
        },
        {
          type: "conjugation",
          heading: "Essere — to be",
          verb: "essere",
          meaning: "to be",
          tenses: [
            {
              name: "Present",
              forms: [
                { person: "io", form: "sono", en: "I am" },
                { person: "tu", form: "sei", en: "you are (informal)" },
                { person: "lui/lei/Lei", form: "è", en: "he/she is / you are (formal)" },
                { person: "noi", form: "siamo", en: "we are" },
                { person: "voi", form: "siete", en: "you all are" },
                { person: "loro", form: "sono", en: "they are" },
              ],
            },
          ],
        },
        {
          type: "conjugation",
          heading: "Avere — to have",
          verb: "avere",
          meaning: "to have",
          intro: "Notice the silent h's — they're spelling-only.",
          tenses: [
            {
              name: "Present",
              forms: [
                { person: "io", form: "ho", en: "I have (sounds like 'o')" },
                { person: "tu", form: "hai", en: "you have (sounds like 'ai')" },
                { person: "lui/lei/Lei", form: "ha", en: "he/she has (sounds like 'ah')" },
                { person: "noi", form: "abbiamo", en: "we have" },
                { person: "voi", form: "avete", en: "you all have" },
                { person: "loro", form: "hanno", en: "they have" },
              ],
            },
          ],
        },
        {
          type: "tip",
          heading: "Avere covers age, hunger, and being right",
          body: "Italian uses <em>avere</em> where English uses <em>be</em>. <em>Ho 30 anni</em> = \"I'm 30 (I have 30 years).\" <em>Ho fame</em> = \"I'm hungry.\" <em>Ho sete</em> = \"I'm thirsty.\" <em>Ho freddo / caldo</em> = \"I'm cold / hot.\" <em>Hai ragione</em> = \"You're right.\"",
          example: { it: "Ho 35 anni e ho fame.", en: "I'm 35 and I'm hungry." },
        },
        {
          type: "fillBlank",
          heading: "Essere or avere?",
          items: [
            {
              template: "Io ___ americano.",
              answer: "sono",
              en: "I am American.",
              options: ["sono", "ho", "siamo", "abbiamo"],
            },
            {
              template: "Marco ___ trent'anni.",
              answer: "ha",
              en: "Marco is 30 years old.",
              options: ["è", "ha", "sta", "abita"],
            },
            {
              template: "Voi ___ italiani?",
              answer: "siete",
              en: "Are you all Italian?",
              options: ["siete", "avete", "siamo", "abbiamo"],
            },
            {
              template: "Loro ___ fame.",
              answer: "hanno",
              en: "They are hungry.",
              options: ["sono", "siete", "hanno", "abbiamo"],
            },
            {
              template: "Tu ___ stanco?",
              answer: "sei",
              en: "Are you tired?",
              options: ["sei", "stai", "hai", "ha"],
            },
            {
              template: "Noi ___ una macchina rossa.",
              answer: "abbiamo",
              en: "We have a red car.",
              options: ["siamo", "abbiamo", "siete", "avete"],
            },
          ],
        },
      ],
    },
    {
      slug: "essere-avere-are-verbs",
      title: "Regular -are verbs",
      estMinutes: 8,
      pages: [
        {
          type: "intro",
          heading: "Most Italian verbs end in -are",
          body: [
            "Verbs in Italian come in three families based on the infinitive ending: <strong>-are</strong> (parlare, mangiare), <strong>-ere</strong> (leggere, vivere), <strong>-ire</strong> (dormire, partire).",
            "-are is the biggest family. To conjugate a regular -are verb in the present, drop the -are and add: <strong>-o, -i, -a, -iamo, -ate, -ano</strong>.",
            "Example: <em>parlare</em> (to speak) → parl<strong>o</strong>, parl<strong>i</strong>, parl<strong>a</strong>, parl<strong>iamo</strong>, parl<strong>ate</strong>, parl<strong>ano</strong>.",
          ],
        },
        {
          type: "conjugation",
          heading: "Parlare — to speak",
          verb: "parlare",
          meaning: "to speak",
          tenses: [
            {
              name: "Present",
              forms: [
                { person: "io", form: "parlo", en: "I speak" },
                { person: "tu", form: "parli", en: "you speak" },
                { person: "lui/lei", form: "parla", en: "he/she speaks" },
                { person: "noi", form: "parliamo", en: "we speak" },
                { person: "voi", form: "parlate", en: "you all speak" },
                { person: "loro", form: "parlano", en: "they speak" },
              ],
            },
          ],
        },
        {
          type: "vocab",
          heading: "Useful -are verbs",
          items: [
            { it: "parlare", en: "to speak" },
            { it: "mangiare", en: "to eat" },
            { it: "abitare", en: "to live (somewhere)" },
            { it: "lavorare", en: "to work" },
            { it: "comprare", en: "to buy" },
            { it: "guardare", en: "to look / watch" },
            { it: "ascoltare", en: "to listen" },
            { it: "viaggiare", en: "to travel" },
            { it: "pagare", en: "to pay" },
            { it: "trovare", en: "to find" },
          ],
        },
        {
          type: "translate",
          heading: "Translate it",
          direction: "en-to-it",
          prompt: "I live in Rome and I work in a restaurant.",
          reference: "Abito a Roma e lavoro in un ristorante.",
          hint: "Notice: 'I' is dropped; -o ending says it's first person.",
        },
        {
          type: "fillBlank",
          heading: "Conjugate the -are verb",
          items: [
            {
              template: "Loro ___ italiano. (parlare)",
              answer: "parlano",
              en: "They speak Italian.",
              options: ["parla", "parlate", "parlano", "parlano"],
            },
            {
              template: "Tu ___ una pizza. (mangiare)",
              answer: "mangi",
              en: "You eat a pizza.",
              options: ["mangia", "mangi", "mangio", "mangiate"],
            },
            {
              template: "Noi ___ a Trastevere. (abitare)",
              answer: "abitiamo",
              en: "We live in Trastevere.",
              options: ["abita", "abitano", "abitate", "abitiamo"],
            },
            {
              template: "Voi ___ con la carta. (pagare)",
              answer: "pagate",
              en: "You all pay by card.",
              options: ["paghiamo", "pagano", "pagate", "pago"],
            },
          ],
        },
      ],
    },
    {
      slug: "essere-avere-ere-ire",
      title: "-ere and -ire verbs",
      estMinutes: 9,
      pages: [
        {
          type: "intro",
          heading: "Two more families, very similar endings",
          body: [
            "<strong>-ere</strong> verbs end in: <strong>-o, -i, -e, -iamo, -ete, -ono</strong>. Example: <em>leggere</em> (to read) → leggo, leggi, legge, leggiamo, leggete, leggono.",
            "<strong>-ire</strong> verbs end in: <strong>-o, -i, -e, -iamo, -ite, -ono</strong>. Example: <em>dormire</em> (to sleep) → dormo, dormi, dorme, dormiamo, dormite, dormono.",
            "Notice the only difference between -ere and -ire endings is the <em>voi</em> form: <em>-ete</em> vs <em>-ite</em>. Otherwise they conjugate the same.",
          ],
        },
        {
          type: "conjugation",
          heading: "Compare the three families",
          verb: "parlare / leggere / dormire",
          meaning: "speak / read / sleep",
          tenses: [
            {
              name: "Side-by-side present tense",
              forms: [
                { person: "io", form: "parlo / leggo / dormo", en: "I…" },
                { person: "tu", form: "parli / leggi / dormi", en: "you…" },
                { person: "lui/lei", form: "parla / legge / dorme", en: "he/she…" },
                { person: "noi", form: "parliamo / leggiamo / dormiamo", en: "we…" },
                { person: "voi", form: "parlate / leggete / dormite", en: "you all…" },
                { person: "loro", form: "parlano / leggono / dormono", en: "they…" },
              ],
            },
          ],
        },
        {
          type: "vocab",
          heading: "Useful -ere and -ire verbs",
          items: [
            { it: "leggere", en: "to read" },
            { it: "scrivere", en: "to write" },
            { it: "prendere", en: "to take" },
            { it: "vedere", en: "to see" },
            { it: "vivere", en: "to live (be alive / reside)" },
            { it: "mettere", en: "to put" },
            { it: "dormire", en: "to sleep" },
            { it: "aprire", en: "to open" },
            { it: "partire", en: "to leave" },
            { it: "sentire", en: "to hear / feel" },
          ],
        },
        {
          type: "tip",
          heading: "-isc- verbs: a sub-family of -ire",
          body: "Some -ire verbs add <strong>-isc-</strong> between the stem and ending in io/tu/lui/loro forms. <em>Capire</em> (to understand) → cap<strong>isc</strong>o, cap<strong>isc</strong>i, cap<strong>isc</strong>e, capiamo, capite, cap<strong>isc</strong>ono. You'll meet them in stage 2; for now just recognize the pattern. Common ones: capire, finire, preferire, pulire.",
          example: { it: "Non capisco l'italiano.", en: "I don't understand Italian." },
        },
        {
          type: "dialogue",
          heading: "First conversation",
          setup: "Two people meeting at a hostel.",
          lines: [
            { speaker: "Anna", it: "Ciao, come ti chiami?", en: "Hi, what's your name?" },
            { speaker: "You", it: "Mi chiamo Marco. E tu?", en: "I'm Marco. And you?" },
            { speaker: "Anna", it: "Anna. Da dove vieni?", en: "Anna. Where are you from?" },
            { speaker: "You", it: "Sono americano. Abito a Boston, ma viaggio in Italia per due settimane.", en: "I'm American. I live in Boston, but I'm traveling in Italy for two weeks." },
            { speaker: "Anna", it: "Parli bene l'italiano!", en: "You speak Italian well!" },
            { speaker: "You", it: "Grazie. Studio da poco. Tu di dove sei?", en: "Thanks. I've been studying for a short time. Where are you from?" },
            { speaker: "Anna", it: "Sono di Napoli, ma adesso vivo a Roma.", en: "I'm from Naples, but now I live in Rome." },
          ],
        },
        {
          type: "translate",
          heading: "Big translation challenge",
          direction: "en-to-it",
          prompt: "I'm American, I live in New York, and I'm traveling to Italy for two weeks.",
          reference:
            "Sono americano, abito a New York, e viaggio in Italia per due settimane.",
          hint: "Drop the subject pronouns. Use 'a' before city names. -are verbs: viaggiare → viaggio.",
        },
      ],
    },
  ],
  checkpoint: {
    passingPct: 80,
    questions: [
      {
        q: "Translate: 'I have a problem.'",
        options: ["Sono un problema.", "Ho un problema.", "Sono problema.", "Avere un problema."],
        correct: 1,
      },
      {
        q: "Conjugate 'essere' for 'noi':",
        options: ["sono", "sei", "siamo", "siete"],
        correct: 2,
      },
      {
        q: "Conjugate 'avere' for 'loro':",
        options: ["abbiamo", "avete", "hanno", "ha"],
        correct: 2,
      },
      {
        q: "Italian uses 'avere' for…",
        options: [
          "all states of being",
          "age and hunger",
          "only physical possession",
          "only abstract things",
        ],
        correct: 1,
      },
      {
        q: "Translate: 'They speak Italian.'",
        options: ["Loro parla italiano.", "Loro parlano italiano.", "Loro parli italiano.", "Loro parlate italiano."],
        correct: 1,
      },
      {
        q: "Which is the -voi- ending for -are verbs?",
        options: ["-ano", "-ete", "-ate", "-ite"],
        correct: 2,
      },
      {
        q: "Conjugate 'dormire' for 'lui':",
        options: ["dormo", "dormi", "dorme", "dorme"],
        correct: 2,
      },
      {
        q: "What's the difference between -ere and -ire endings?",
        options: [
          "Nothing",
          "Only the noi form",
          "Only the voi form (-ete vs -ite)",
          "Several forms",
        ],
        correct: 2,
      },
      {
        q: "Translate: 'We live in Rome.'",
        options: [
          "Noi vivo a Roma.",
          "Viviamo in Roma.",
          "Viviamo a Roma.",
          "Abito a Roma.",
        ],
        correct: 2,
      },
      {
        q: "Translate: 'I'm 30 years old.'",
        options: [
          "Sono trenta.",
          "Sono trent'anni.",
          "Ho trenta anni.",
          "Ho trent'anni.",
        ],
        correct: 3,
      },
    ],
  },
};
