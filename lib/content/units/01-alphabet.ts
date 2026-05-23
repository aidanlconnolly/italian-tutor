import type { Unit } from "../types";

export const UNIT_ALPHABET: Unit = {
  slug: "alphabet",
  stage: 1,
  order: 1,
  icon: "🔤",
  title: "Alphabet & sounds",
  tagline: "Letters, doubled consonants, c/g + e/i, stress. The 20-minute pronunciation foundation.",
  badge: "core",
  lessons: [
    {
      slug: "alphabet-letters",
      title: "The Italian alphabet",
      estMinutes: 8,
      pages: [
        {
          type: "intro",
          heading: "21 letters and a borrowed five",
          body: [
            "Italian uses the same Latin alphabet as English, but only 21 letters are native: <strong>a b c d e f g h i l m n o p q r s t u v z</strong>. The other five — <strong>j k w x y</strong> — show up only in loanwords (jazz, kiwi, yogurt).",
            "Good news: Italian spelling is wildly consistent. Once you learn the sounds of each letter, you can read almost any word out loud on sight — including words you don't know.",
            "The five vowels — <strong>a, e, i, o, u</strong> — are always pronounced clearly, never reduced to a vague \"uh\" the way English does.",
          ],
          tip: {
            label: "The promise",
            body: "If you can pronounce the five vowels and a handful of two-letter combos (gli, gn, sc, ch, gh), you can read Italian. We'll get you there in this unit.",
          },
        },
        {
          type: "vocab",
          heading: "The five vowels",
          intro: "Hold each one steady. They never glide like English vowels.",
          items: [
            { it: "a", en: "like 'a' in 'father'", note: "casa, pasta, mamma" },
            { it: "e", en: "like 'e' in 'bet' (or 'ay' in 'say')", note: "bene, sera, caffè" },
            { it: "i", en: "like 'ee' in 'see'", note: "vino, sì, pizza" },
            { it: "o", en: "like 'o' in 'or' (or 'go')", note: "no, sono, dove" },
            { it: "u", en: "like 'oo' in 'food'", note: "uno, tu, fumo" },
          ],
        },
        {
          type: "tip",
          heading: "There's no 'h' sound — almost ever",
          body: "The letter <strong>h</strong> in Italian is silent. <em>Ho</em> (\"I have\") sounds exactly like <em>o</em>. Its job is to change the sound of the letter <em>before</em> it (we'll see <em>ch</em> and <em>gh</em> soon), not to make its own sound.",
          example: { it: "Ho un cane.", en: "I have a dog. (sounds like 'O oon kah-neh')" },
        },
        {
          type: "multipleChoice",
          heading: "Quick check",
          questions: [
            {
              q: "How is the 'i' in 'vino' pronounced?",
              options: ["Like 'i' in 'sit'", "Like 'ee' in 'see'", "Like 'eye'", "Silent"],
              correct: 1,
              fb: "Italian 'i' is always 'ee'. 'Vino' = VEE-no.",
            },
            {
              q: "How do you pronounce 'Ho' (I have)?",
              options: ["HO with a strong H", "Like 'oh'", "Like 'who'", "Like 'huh'"],
              correct: 1,
              fb: "The H is silent. 'Ho' sounds identical to 'o'.",
            },
            {
              q: "Which letter is NOT native to the Italian alphabet?",
              options: ["z", "q", "k", "v"],
              correct: 2,
              fb: "K only appears in loanwords like 'kiwi' or 'karaoke'.",
            },
          ],
        },
      ],
    },
    {
      slug: "alphabet-tricky-combos",
      title: "Tricky letter combinations",
      estMinutes: 10,
      pages: [
        {
          type: "intro",
          heading: "c and g change with the next vowel",
          body: [
            "This is the single most important pronunciation rule in Italian. The letters <strong>c</strong> and <strong>g</strong> have two sounds each, decided by what follows them:",
            "Before <strong>a / o / u</strong> they're hard, like English 'k' and 'g'. Before <strong>e / i</strong> they're soft, like English 'ch' and 'j'.",
            "To force the opposite sound, Italian inserts an <strong>h</strong>: <em>chi</em> = 'kee', <em>ghi</em> = 'gee' (hard g).",
          ],
          keyPoint:
            "c/g + a/o/u = hard (k, g). c/g + e/i = soft (ch, j). Add h to flip it back.",
        },
        {
          type: "vocab",
          heading: "Hear the difference",
          items: [
            { it: "casa", en: "house", note: "KAH-zah — hard c before a" },
            { it: "cena", en: "dinner", note: "CHEH-nah — soft c before e" },
            { it: "cinque", en: "five", note: "CHEEN-kweh — soft c-i, hard c-q-u" },
            { it: "chiesa", en: "church", note: "kee-EH-zah — ch keeps it hard before e" },
            { it: "gatto", en: "cat", note: "GAHT-toh — hard g before a" },
            { it: "gelato", en: "ice cream", note: "jeh-LAH-toh — soft g before e" },
            { it: "spaghetti", en: "spaghetti", note: "spah-GHET-tee — gh keeps it hard before e" },
            { it: "giro", en: "tour", note: "JEE-roh — soft g before i" },
          ],
        },
        {
          type: "tip",
          heading: "gli, gn, sc — the three combos to memorize",
          body: "<strong>gli</strong> sounds like the 'lli' in million (figli, gli, famiglia). <strong>gn</strong> sounds like the 'ny' in canyon (gnocchi, signora, bagno). <strong>sc</strong> before e/i sounds like English 'sh' (sciopero, pesce, prosciutto); before a/o/u it's a regular 'sk' (scuola, scopo).",
          example: { it: "Pesce con gli gnocchi.", en: "Fish with gnocchi. (PEH-sheh kohn lyee NYOK-kee)" },
        },
        {
          type: "listen",
          heading: "Pick what you heard",
          items: [
            { it: "cena", en: "dinner", options: ["cena", "scena", "kena", "chena"], correct: 0 },
            { it: "chiesa", en: "church", options: ["cesa", "chiesa", "ghiesa", "scesa"], correct: 1 },
            { it: "gnocchi", en: "gnocchi", options: ["nocchi", "gnocchi", "gnochi", "niocchi"], correct: 1 },
            { it: "pesce", en: "fish", options: ["peshe", "pesche", "pesce", "pesque"], correct: 2 },
          ],
        },
        {
          type: "multipleChoice",
          heading: "Sound it out",
          questions: [
            {
              q: "How is 'gelato' pronounced?",
              options: ["GEH-lah-toh (hard g)", "jeh-LAH-toh (soft g)", "JEL-ah-toh", "GAY-lay-toh"],
              correct: 1,
              fb: "g before e is soft, like English 'j'. The stress falls on the second syllable.",
            },
            {
              q: "Why is there an 'h' in 'spaghetti'?",
              options: [
                "It's silent decoration",
                "To make the g hard before e",
                "It's a loanword from German",
                "It's a typo",
              ],
              correct: 1,
              fb: "Without the h, 'spagetti' would be pronounced 'spa-JET-ti'. The h forces the hard g sound.",
            },
            {
              q: "How does 'gli' sound?",
              options: [
                "Like 'glee' in English",
                "Like 'gee'",
                "Like 'lyee' (closest to 'lli' in million)",
                "Like a hard 'gl'",
              ],
              correct: 2,
              fb: "It's a single sound — closest to the 'lli' in 'million' or 'yi' in 'million' said quickly.",
            },
          ],
        },
      ],
    },
    {
      slug: "alphabet-doubled-stress",
      title: "Doubled consonants & stress",
      estMinutes: 7,
      pages: [
        {
          type: "intro",
          heading: "Doubled letters are LOUD doubled",
          body: [
            "When Italian writes a consonant twice, you really do hold it twice as long. This isn't decorative — it changes meanings.",
            "<em>Pena</em> (sorrow) vs <em>penna</em> (pen). <em>Casa</em> (house) vs <em>cassa</em> (cash register). <em>Sono</em> (I am) vs <em>sonno</em> (sleep).",
            "Pause briefly on the doubled letter, almost like you're stretching the consonant. With <em>tt</em>, <em>pp</em>, <em>cc</em> it's a tiny stop. With <em>nn</em>, <em>mm</em>, <em>ll</em> it's a longer hold.",
          ],
          tip: {
            label: "Why it matters in Rome",
            body: "Saying <em>ano</em> instead of <em>anno</em> swaps \"year\" for an unfortunate anatomical word. Same with <em>papa</em> (Pope) vs <em>pappa</em> (baby food). Pay attention to the doubles.",
          },
        },
        {
          type: "vocab",
          heading: "Minimal pairs",
          intro: "Listen carefully to each — same letters but for one being doubled.",
          items: [
            { it: "pena", en: "sorrow / penalty" },
            { it: "penna", en: "pen" },
            { it: "casa", en: "house" },
            { it: "cassa", en: "cash register / cashier" },
            { it: "sono", en: "I am / they are" },
            { it: "sonno", en: "sleep / sleepiness" },
            { it: "papa", en: "Pope" },
            { it: "pappa", en: "baby food / mush" },
          ],
        },
        {
          type: "intro",
          heading: "Where does the stress fall?",
          body: [
            "Most Italian words stress the <strong>second-to-last syllable</strong>: <em>aMI-co</em>, <em>geLA-to</em>, <em>caMICia</em>, <em>roMA-no</em>.",
            "Some are stressed earlier — these you mostly memorize. Common ones: <em>TA-vola</em>, <em>SA-bato</em>, <em>MU-sica</em>, <em>POR-tico</em>.",
            "Words with a written accent on the final vowel stress that vowel: <em>cit-TÀ</em>, <em>caf-FÈ</em>, <em>per-CHÉ</em>, <em>cosÌ</em>.",
          ],
          keyPoint:
            "Default to stressing the second-to-last syllable. If there's a written accent (à è é ì ò ù), stress that vowel.",
        },
        {
          type: "multipleChoice",
          heading: "Final check",
          questions: [
            {
              q: "Which word means \"pen\"?",
              options: ["pena", "penna", "pano", "panna"],
              correct: 1,
              fb: "penna with the double n. Pena means sorrow; panna means cream.",
            },
            {
              q: "Where is the stress in 'caffè'?",
              options: [
                "On the first 'a' (CAF-feh)",
                "On the final 'è' (caf-FEH)",
                "Equal stress",
                "On the doubled 'f'",
              ],
              correct: 1,
              fb: "The grave accent on è tells you that's the stressed vowel.",
            },
            {
              q: "Where is the stress in 'amico'?",
              options: ["A-mi-co", "a-MI-co", "a-mi-CO", "AM-ico"],
              correct: 1,
              fb: "Second-to-last syllable rule. aMIco — the default Italian stress pattern.",
            },
            {
              q: "The doubled letter in 'pizza' means…",
              options: [
                "Both z's are pronounced separately",
                "The z is held twice as long — almost two beats",
                "The first z is silent",
                "Nothing — it's spelling",
              ],
              correct: 1,
              fb: "Italian doubles are real. 'PEET-tsa' — you hold the t/z sound.",
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
        q: "Italian 'i' is always pronounced like…",
        options: ["'i' in 'sit'", "'ee' in 'see'", "'eye'", "'uh'"],
        correct: 1,
      },
      {
        q: "How is 'gelato' pronounced?",
        options: ["GEH-lah-toh", "jeh-LAH-toh", "GAY-la-toh", "geh-LAH-toh"],
        correct: 1,
      },
      {
        q: "Why does 'spaghetti' have an 'h'?",
        options: [
          "Silent decoration",
          "To make the g hard before e",
          "Borrowed from German",
          "Marks the stressed syllable",
        ],
        correct: 1,
      },
      {
        q: "What does 'penna' mean?",
        options: ["sorrow", "pen", "feather only", "punishment"],
        correct: 1,
      },
      {
        q: "Where does 'amico' get its stress?",
        options: ["A-mi-co", "a-MI-co", "a-mi-CO", "Equal"],
        correct: 1,
      },
      {
        q: "How does 'gli' sound (as in figli)?",
        options: ["glee", "gee", "lyee (like 'lli' in million)", "hard gl"],
        correct: 2,
      },
      {
        q: "The letter 'h' in 'ho' (I have)…",
        options: ["Sounds like English h", "Is silent", "Sounds like a soft k", "Lengthens the o"],
        correct: 1,
      },
      {
        q: "Caffè is stressed on…",
        options: ["the first a", "the first f", "the final è", "equally"],
        correct: 2,
      },
      {
        q: "Which means 'fish'?",
        options: ["pesche", "pesce", "peshche", "pesque"],
        correct: 1,
      },
      {
        q: "'sc' before e or i sounds like…",
        options: ["sk", "sh", "ss", "sch"],
        correct: 1,
      },
    ],
  },
};
