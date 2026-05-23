import type { Unit } from "../types";

export const UNIT_GREETINGS: Unit = {
  slug: "greetings",
  stage: 1,
  order: 2,
  icon: "👋",
  title: "Greetings & politeness",
  tagline: "Ciao, salve, buongiorno — and the all-important difference between tu and Lei.",
  badge: "tourist",
  lessons: [
    {
      slug: "greetings-hello-goodbye",
      title: "Hello, goodbye, and everything in between",
      estMinutes: 8,
      pages: [
        {
          type: "intro",
          heading: "Italian has time-based greetings",
          body: [
            "Italians swap greetings by time of day. Use <strong>buongiorno</strong> in the morning and early afternoon, <strong>buon pomeriggio</strong> from roughly 3pm, <strong>buonasera</strong> from late afternoon onward.",
            "<strong>Ciao</strong> works as both hello and goodbye — but it's casual. With strangers, shopkeepers, or anyone older than you, default to <strong>salve</strong> or one of the time-based greetings.",
            "<strong>Arrivederci</strong> is the standard goodbye. <strong>Buonanotte</strong> is reserved for when you're heading to bed.",
          ],
          tip: {
            label: "Bar etiquette",
            body: "Walk into a Roman bar at 9am, you say <em>buongiorno</em>. Walk out, you say <em>grazie, arrivederci</em>. Saying <em>ciao</em> to the barista you don't know reads as too familiar.",
          },
        },
        {
          type: "vocab",
          heading: "Core greetings",
          items: [
            { it: "ciao", en: "hi / bye (casual)", note: "Only with people you know or peers." },
            { it: "salve", en: "hello (neutral)", note: "Safe for strangers — between ciao and buongiorno." },
            { it: "buongiorno", en: "good morning / good day", note: "Morning until ~3pm." },
            { it: "buon pomeriggio", en: "good afternoon", note: "Less common than buongiorno." },
            { it: "buonasera", en: "good evening", note: "From late afternoon onward." },
            { it: "buonanotte", en: "good night", note: "Only when you (or they) are going to sleep." },
            { it: "arrivederci", en: "goodbye", note: "Standard, polite, all-purpose." },
            { it: "a presto", en: "see you soon" },
            { it: "a domani", en: "see you tomorrow" },
          ],
        },
        {
          type: "dialogue",
          heading: "At a Roman bar at 8 am",
          setup: "You walk into a neighborhood bar in Monti for your morning coffee.",
          lines: [
            { speaker: "You", it: "Buongiorno!", en: "Good morning!" },
            { speaker: "Barista", it: "Buongiorno, signore. Mi dica.", en: "Good morning, sir. What can I get you?" },
            { speaker: "You", it: "Un caffè, per favore.", en: "A coffee, please." },
            { speaker: "Barista", it: "Subito.", en: "Right away." },
            { speaker: "You", it: "Grazie. Arrivederci!", en: "Thanks. Goodbye!" },
            { speaker: "Barista", it: "Grazie a Lei, buona giornata!", en: "Thank you, have a good day!" },
          ],
        },
        {
          type: "multipleChoice",
          heading: "Pick the right greeting",
          questions: [
            {
              q: "You enter a bakery at 10am where you've never been. The shopkeeper looks 60. What do you say?",
              options: ["Ciao!", "Buongiorno!", "Buonasera!", "Buonanotte!"],
              correct: 1,
              fb: "Buongiorno is the safest formal greeting before late afternoon.",
            },
            {
              q: "Your Italian friend opens the door for dinner at 8pm. What do you say?",
              options: ["Buongiorno!", "Buonasera!", "Buonanotte!", "Arrivederci!"],
              correct: 1,
              fb: "Buonasera covers evening greetings — used when meeting, not leaving.",
            },
            {
              q: "You're leaving a shop. The standard polite goodbye is…",
              options: ["Ciao", "Buongiorno", "Arrivederci", "Salve"],
              correct: 2,
              fb: "Arrivederci is universal — polite and works any time of day.",
            },
          ],
        },
      ],
    },
    {
      slug: "greetings-tu-vs-lei",
      title: "Tu vs Lei: when to switch",
      estMinutes: 9,
      pages: [
        {
          type: "intro",
          heading: "Italian has two 'you's",
          body: [
            "<strong>Tu</strong> is informal — for friends, family, kids, and anyone roughly your age in a casual setting.",
            "<strong>Lei</strong> (always capitalized when it means polite 'you') is formal — for shopkeepers, strangers, professionals, anyone notably older. <strong>Lei</strong> grammatically behaves like 'she' — verbs conjugate in the third person singular.",
            "When in doubt, start with Lei. The other person will often say <em>diamoci del tu</em> (\"let's use tu\") when it's time to switch.",
          ],
          keyPoint:
            "Lei = polite you. Conjugates like she/he: Lei è (you are), Lei ha (you have), Lei vuole (you want).",
        },
        {
          type: "conjugation",
          heading: "How are you? — three ways",
          verb: "stare",
          meaning: "to be / to feel",
          intro: "The verb 'stare' is used for asking how someone is doing.",
          tenses: [
            {
              name: "Asking how someone is",
              forms: [
                { person: "(tu) Come stai?", form: "stai", en: "How are you? (informal)" },
                { person: "(Lei) Come sta?", form: "sta", en: "How are you? (formal)" },
                { person: "(voi) Come state?", form: "state", en: "How are you all?" },
              ],
            },
            {
              name: "Common replies",
              forms: [
                { person: "Bene, grazie.", form: "bene", en: "Well, thanks." },
                { person: "Molto bene.", form: "molto bene", en: "Very well." },
                { person: "Così così.", form: "così così", en: "So-so." },
                { person: "Non c'è male.", form: "non c'è male", en: "Not bad." },
                { person: "Stanco/a.", form: "stanco/a", en: "Tired. (m/f)" },
              ],
            },
          ],
        },
        {
          type: "dialogue",
          heading: "Two introductions — same content, different register",
          setup: "Compare what you'd say to a peer vs to a hotel receptionist.",
          lines: [
            { speaker: "To a peer (tu)", it: "Ciao! Come stai? Come ti chiami?", en: "Hi! How are you? What's your name?" },
            { speaker: "Reply", it: "Sto bene, grazie. Mi chiamo Anna. E tu?", en: "I'm well, thanks. I'm Anna. And you?" },
            { speaker: "To a receptionist (Lei)", it: "Buongiorno! Come sta? Come si chiama?", en: "Good morning! How are you? What's your name?" },
            { speaker: "Reply", it: "Bene, grazie. Mi chiamo Anna. Lei?", en: "Well, thanks. I'm Anna. And you?" },
          ],
        },
        {
          type: "fillBlank",
          heading: "Fill in the right form",
          intro: "Pick tu or Lei based on the context.",
          items: [
            {
              template: "Buongiorno, signora! Come ___?",
              answer: "sta",
              en: "Good morning, ma'am! How are you?",
              options: ["sei", "stai", "sta", "siete"],
            },
            {
              template: "Ehi Marco, come ___?",
              answer: "stai",
              en: "Hey Marco, how are you?",
              options: ["stai", "sta", "siete", "state"],
            },
            {
              template: "Mi scusi, ___ è italiano?",
              answer: "Lei",
              en: "Excuse me, are you Italian? (formal)",
              options: ["tu", "Lei", "voi", "io"],
            },
            {
              template: "Bene grazie, e ___?",
              answer: "tu",
              en: "Well thanks, and you? (to a friend)",
              options: ["tu", "Lei", "io", "voi"],
            },
          ],
        },
      ],
    },
    {
      slug: "greetings-please-thanks",
      title: "Please, thanks, and small phrases that buy goodwill",
      estMinutes: 7,
      pages: [
        {
          type: "vocab",
          heading: "The pocket phrasebook",
          intro: "These eight phrases will carry you through almost any short interaction.",
          items: [
            { it: "per favore", en: "please", note: "Goes at the end: 'un caffè, per favore.'" },
            { it: "per piacere", en: "please", note: "Slightly warmer alternative to per favore." },
            { it: "grazie", en: "thank you" },
            { it: "grazie mille", en: "thanks a lot", note: "Literally 'thanks a thousand.'" },
            { it: "prego", en: "you're welcome / go ahead / please", note: "Multi-use response word." },
            { it: "scusa", en: "sorry / excuse me (informal)" },
            { it: "mi scusi", en: "excuse me (formal)", note: "Use when stopping a stranger." },
            { it: "permesso", en: "may I pass / coming through", note: "When squeezing past someone." },
          ],
        },
        {
          type: "tip",
          heading: "Prego is the Swiss Army knife",
          body: "<strong>Prego</strong> means \"you're welcome\" but also \"please, after you,\" \"please, come in,\" \"how can I help you?\" and even \"please go on speaking.\" A waiter saying <em>prego?</em> with a rising tone means \"are you ready to order?\"",
          example: { it: "— Grazie! — Prego.", en: "— Thanks! — You're welcome." },
        },
        {
          type: "orderWords",
          heading: "Build the sentence",
          intro: "Drag (or tap) the words into the correct order.",
          items: [
            { tokens: ["Un", "caffè", "per", "favore"], en: "A coffee, please." },
            { tokens: ["Mi", "scusi", "dov'è", "il", "bagno"], en: "Excuse me, where is the bathroom?" },
            { tokens: ["Grazie", "mille", "molto", "gentile"], en: "Thanks a lot, very kind." },
            { tokens: ["Buongiorno", "come", "sta"], en: "Good morning, how are you? (formal)" },
          ],
        },
        {
          type: "translate",
          heading: "Translate it",
          direction: "en-to-it",
          prompt: "Excuse me sir, a coffee please. Thank you.",
          reference: "Mi scusi signore, un caffè per favore. Grazie.",
          hint: "Use the formal 'mi scusi' since you're addressing a stranger.",
        },
        {
          type: "checkpoint",
          heading: "Lesson check",
          questions: [
            {
              q: "Which is the formal version of 'excuse me'?",
              options: ["scusa", "mi scusi", "permesso", "prego"],
              correct: 1,
            },
            {
              q: "Someone says 'grazie' to you. What do you reply?",
              options: ["scusa", "prego", "ciao", "salve"],
              correct: 1,
            },
            {
              q: "Translate: 'A coffee, please.'",
              options: [
                "Un caffè, mi scusi.",
                "Caffè uno per favore.",
                "Un caffè, per favore.",
                "Per favore caffè.",
              ],
              correct: 2,
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
        q: "You walk into a shop at 11am. What's the safest greeting to the older shopkeeper?",
        options: ["Ciao!", "Buongiorno!", "Buonanotte!", "Ehi!"],
        correct: 1,
      },
      {
        q: "You meet a friend at a dinner party at 8pm. What do you say?",
        options: ["Buongiorno!", "Buonanotte!", "Buonasera!", "Arrivederci!"],
        correct: 2,
      },
      {
        q: "Which is the formal 'you' in Italian?",
        options: ["tu", "voi", "Lei", "noi"],
        correct: 2,
      },
      {
        q: "How do you ask 'How are you?' formally?",
        options: ["Come stai?", "Come sta?", "Come state?", "Come siete?"],
        correct: 1,
      },
      {
        q: "Translate: 'Thank you very much.'",
        options: ["Per favore", "Prego", "Grazie mille", "Scusa"],
        correct: 2,
      },
      {
        q: "What does 'prego' NOT mean?",
        options: ["you're welcome", "please, after you", "I'm sorry", "how can I help?"],
        correct: 2,
      },
      {
        q: "Saying 'ciao' to a 70-year-old shopkeeper you've never met is…",
        options: ["Perfectly normal", "Slightly too familiar", "A grave insult", "Required"],
        correct: 1,
      },
      {
        q: "Choose the right greeting for someone going to bed:",
        options: ["Buongiorno", "Buonasera", "Buonanotte", "Arrivederci"],
        correct: 2,
      },
      {
        q: "You want to squeeze past someone on a crowded bus. You say:",
        options: ["Scusa!", "Mi scusi!", "Permesso!", "Prego!"],
        correct: 2,
      },
      {
        q: "'Bene, grazie. E Lei?' is appropriate when…",
        options: [
          "talking to your best friend",
          "talking to your sister",
          "talking to a hotel receptionist",
          "talking to a child",
        ],
        correct: 2,
      },
    ],
  },
};
