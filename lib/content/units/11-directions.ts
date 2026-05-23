import type { Unit } from "../types";

export const UNIT_DIRECTIONS: Unit = {
  slug: "directions",
  stage: 3,
  order: 11,
  icon: "🧭",
  title: "Asking for directions",
  tagline: "Scusi, dov'è… destra, sinistra, sempre dritto. The single most-used skill in Rome.",
  badge: "tourist",
  lessons: [
    {
      slug: "directions-words",
      title: "Left, right, straight — and the prepositions in between",
      estMinutes: 8,
      pages: [
        {
          type: "intro",
          heading: "Six words and you can navigate",
          body: [
            "<strong>Destra</strong> (right) and <strong>sinistra</strong> (left) are feminine — they go with <em>a</em>: <em>a destra</em>, <em>a sinistra</em>.",
            "<strong>Dritto</strong> = straight ahead. <strong>Sempre dritto</strong> = keep going straight. <strong>Avanti</strong> = forward. <strong>Indietro</strong> = back / backwards.",
            "Prepositions of place: <strong>vicino a</strong> (near), <strong>lontano da</strong> (far from), <strong>davanti a</strong> (in front of), <strong>dietro a</strong> (behind), <strong>di fronte a</strong> (across from), <strong>accanto a</strong> (next to), <strong>tra / fra</strong> (between).",
          ],
          keyPoint:
            "A destra / a sinistra / sempre dritto. Vicino a / lontano da. Davanti a / dietro a / di fronte a.",
        },
        {
          type: "vocab",
          heading: "Direction & location vocabulary",
          items: [
            { it: "a destra", en: "(on/to the) right" },
            { it: "a sinistra", en: "(on/to the) left" },
            { it: "sempre dritto", en: "straight ahead" },
            { it: "avanti", en: "forward / ahead" },
            { it: "indietro", en: "back / backwards" },
            { it: "vicino (a)", en: "near (to)" },
            { it: "lontano (da)", en: "far (from)" },
            { it: "davanti (a)", en: "in front (of)" },
            { it: "dietro (a)", en: "behind" },
            { it: "di fronte (a)", en: "across from / opposite" },
            { it: "accanto (a)", en: "next to" },
            { it: "tra / fra", en: "between / among" },
            { it: "all'angolo", en: "at the corner" },
            { it: "in fondo (a)", en: "at the end (of)" },
            { it: "al centro (di)", en: "in the middle (of)" },
            { it: "sopra / sotto", en: "above / below" },
          ],
        },
        {
          type: "tip",
          heading: "Sempre = always — but also 'keep…'",
          body: "<em>Sempre dritto</em> literally translates to \"always straight\" — meaning <strong>keep going straight</strong>. You'll also hear <em>sempre a destra</em> = keep right, <em>sempre indietro</em> = keep going back. Italians use <em>sempre</em> to mean \"continuously\" or \"keep doing it.\"",
        },
        {
          type: "fillBlank",
          heading: "Where is it?",
          items: [
            {
              template: "La farmacia è ___ all'hotel.",
              answer: "accanto",
              en: "The pharmacy is next to the hotel.",
              options: ["dietro", "accanto", "lontano", "sotto"],
            },
            {
              template: "Il Colosseo è ___ Foro Romano.",
              answer: "vicino al",
              en: "The Colosseum is near the Roman Forum.",
              options: ["vicino al", "lontano dal", "dietro al", "sotto al"],
            },
            {
              template: "Il bar è ___ alla chiesa.",
              answer: "di fronte",
              en: "The bar is across from the church.",
              options: ["dietro", "di fronte", "sotto", "tra"],
            },
            {
              template: "Devi girare a ___ al semaforo.",
              answer: "destra",
              en: "You have to turn right at the traffic light.",
              options: ["sinistra", "destra", "dritto", "indietro"],
            },
            {
              template: "La piazza è ___ alla strada.",
              answer: "in fondo",
              en: "The square is at the end of the street.",
              options: ["in fondo", "davanti", "vicino", "accanto"],
            },
          ],
        },
      ],
    },
    {
      slug: "directions-verbs",
      title: "Turn, cross, take — the action verbs",
      estMinutes: 9,
      pages: [
        {
          type: "intro",
          heading: "Five verbs do most of the work",
          body: [
            "<strong>Girare</strong> = to turn. <em>Gira a destra</em> = turn right. <em>Giri a sinistra</em> (formal) = turn left.",
            "<strong>Andare</strong> = to go. <em>Vada sempre dritto</em> = (you) keep going straight (formal). Irregular: vado, vai, va, andiamo, andate, vanno.",
            "<strong>Attraversare</strong> = to cross. <em>Attraversi la strada</em> = cross the street.",
            "<strong>Prendere</strong> = to take. <em>Prenda la prima strada a destra</em> = take the first street on the right.",
            "<strong>Continuare</strong> = to keep going. <em>Continui per cento metri</em> = continue for 100 meters.",
          ],
          keyPoint:
            "Formal commands (Lei) use the -i ending for -are verbs (giri, attraversi, prenda…) — different from informal 'tu' commands.",
        },
        {
          type: "conjugation",
          heading: "Formal commands (Lei) — for directions",
          verb: "girare / andare / prendere / continuare",
          meaning: "turn / go / take / continue (formal)",
          intro: "When a stranger gives you directions, they use formal 'Lei' commands. These are the forms you'll HEAR most often.",
          tenses: [
            {
              name: "Formal imperative",
              forms: [
                { person: "girare", form: "giri", en: "turn (formal command)" },
                { person: "andare", form: "vada", en: "go (formal command)" },
                { person: "prendere", form: "prenda", en: "take (formal command)" },
                { person: "continuare", form: "continui", en: "continue (formal command)" },
                { person: "attraversare", form: "attraversi", en: "cross (formal command)" },
                { person: "scusare", form: "(mi) scusi", en: "excuse me (the formal version of 'scusa')" },
              ],
            },
          ],
        },
        {
          type: "dialogue",
          heading: "Asking for the Trevi Fountain",
          setup: "You stop a passerby near Piazza Venezia.",
          lines: [
            { speaker: "You", it: "Mi scusi, signore. Sa dov'è la Fontana di Trevi?", en: "Excuse me, sir. Do you know where the Trevi Fountain is?" },
            { speaker: "Signore", it: "Sì, certo. Vada sempre dritto per due strade.", en: "Yes, of course. Keep going straight for two streets." },
            { speaker: "You", it: "Due strade. Poi?", en: "Two streets. Then?" },
            { speaker: "Signore", it: "Poi giri a destra. Vede quella chiesa? Subito dopo la chiesa, gira a sinistra.", en: "Then turn right. You see that church? Right after the church, turn left." },
            { speaker: "You", it: "Va bene. E quanto è lontano?", en: "Okay. And how far is it?" },
            { speaker: "Signore", it: "Cinque minuti a piedi. Sentirà il rumore dell'acqua prima di vederla.", en: "Five minutes on foot. You'll hear the sound of the water before you see it." },
            { speaker: "You", it: "Grazie mille, è gentilissimo!", en: "Thank you very much, you're very kind!" },
          ],
        },
        {
          type: "orderWords",
          heading: "Reconstruct the directions",
          items: [
            { tokens: ["Vada", "sempre", "dritto", "per", "cento", "metri"], en: "Keep going straight for 100 meters." },
            { tokens: ["Giri", "a", "destra", "al", "semaforo"], en: "Turn right at the traffic light." },
            { tokens: ["Prenda", "la", "seconda", "a", "sinistra"], en: "Take the second (street) on the left." },
            { tokens: ["Attraversi", "la", "piazza", "e", "vada", "dritto"], en: "Cross the square and keep going straight." },
            { tokens: ["È", "di", "fronte", "alla", "stazione"], en: "It's across from the station." },
          ],
        },
        {
          type: "multipleChoice",
          heading: "Spot the formal command",
          questions: [
            {
              q: "Which is the FORMAL command for 'turn'?",
              options: ["gira", "giri", "girare", "girate"],
              correct: 1,
            },
            {
              q: "Which is the FORMAL command for 'take'?",
              options: ["prendi", "prendere", "prenda", "prendete"],
              correct: 2,
            },
            {
              q: "Which means 'keep going straight'?",
              options: ["Sempre destra", "Sempre dritto", "Indietro sempre", "Avanti destra"],
              correct: 1,
            },
            {
              q: "'In front of the church' =",
              options: [
                "dietro la chiesa",
                "accanto alla chiesa",
                "davanti alla chiesa",
                "sotto la chiesa",
              ],
              correct: 2,
            },
          ],
        },
      ],
    },
    {
      slug: "directions-real-world",
      title: "Putting it all together",
      estMinutes: 9,
      pages: [
        {
          type: "intro",
          heading: "Reading directions in the wild",
          body: [
            "You'll see signs everywhere using these compact phrases:",
            "<em>Centro storico ➜</em> (Historic center this way)",
            "<em>Uscita / Ingresso</em> (Exit / Entrance)",
            "<em>Tutte le direzioni</em> (All directions — on highway signs)",
            "<em>Senso unico</em> (One way)",
            "<em>Zona pedonale</em> (Pedestrian zone)",
            "<em>Vietato l'ingresso</em> (Entry forbidden)",
          ],
        },
        {
          type: "vocab",
          heading: "Street vocabulary",
          items: [
            { it: "la strada / la via", en: "the road / the street (via = used in street names: Via del Corso)" },
            { it: "la piazza", en: "the square" },
            { it: "il vicolo", en: "the alley / narrow lane" },
            { it: "il viale", en: "the avenue (wide tree-lined street)" },
            { it: "il ponte", en: "the bridge" },
            { it: "il semaforo", en: "the traffic light" },
            { it: "il marciapiede", en: "the sidewalk" },
            { it: "le strisce pedonali", en: "the crosswalk" },
            { it: "il segnale", en: "the (traffic) sign" },
            { it: "l'incrocio", en: "the intersection" },
            { it: "la rotonda", en: "the roundabout" },
            { it: "la curva", en: "the curve" },
          ],
        },
        {
          type: "dialogue",
          heading: "Lost near Termini at night",
          setup: "It's 11pm and you're trying to find your hotel.",
          lines: [
            { speaker: "You", it: "Scusi, mi sono perso. Cerco Via Cavour, numero quaranta.", en: "Excuse me, I'm lost. I'm looking for Via Cavour, number forty." },
            { speaker: "Passante", it: "Via Cavour è proprio qui dietro. Vede quel ponte sopra le rotaie?", en: "Via Cavour is right here behind. You see that bridge over the tracks?" },
            { speaker: "You", it: "Sì, lo vedo.", en: "Yes, I see it." },
            { speaker: "Passante", it: "Attraversi il ponte, poi prenda la prima strada a sinistra. Quella è Via Cavour. Il numero quaranta dovrebbe essere a duecento metri.", en: "Cross the bridge, then take the first street on the left. That's Via Cavour. Number forty should be about 200 meters in." },
            { speaker: "You", it: "Ottimo. È sicuro a quest'ora?", en: "Great. Is it safe at this hour?" },
            { speaker: "Passante", it: "Tranquillo. Vede tanta gente in giro. Ma faccia attenzione al portafoglio.", en: "Don't worry. You see lots of people around. But watch your wallet." },
            { speaker: "You", it: "Grazie davvero!", en: "Thank you really!" },
          ],
        },
        {
          type: "fillBlank",
          heading: "Fill the direction",
          items: [
            {
              template: "Attraversi le ___ pedonali al semaforo.",
              answer: "strisce",
              en: "Cross at the crosswalk at the traffic light.",
              options: ["strisce", "vie", "case", "porte"],
            },
            {
              template: "Mi sono ___ . Sa dov'è il mio hotel?",
              answer: "perso",
              en: "I'm lost. Do you know where my hotel is?",
              options: ["perso", "stanco", "lontano", "perduto"],
            },
            {
              template: "All'___ , giri a destra.",
              answer: "incrocio",
              en: "At the intersection, turn right.",
              options: ["angolo", "incrocio", "fondo", "centro"],
            },
            {
              template: "Il museo è in fondo al ___ .",
              answer: "viale",
              en: "The museum is at the end of the avenue.",
              options: ["vicolo", "viale", "ponte", "marciapiede"],
            },
          ],
        },
        {
          type: "translate",
          heading: "Translate it",
          direction: "en-to-it",
          prompt: "Excuse me, I'm lost. Is the Pantheon far from here?",
          reference: "Mi scusi, mi sono perso. Il Pantheon è lontano da qui?",
          hint: "'Mi sono perso' (m) / 'mi sono persa' (f) for 'I'm lost'. 'Da qui' = from here.",
        },
        {
          type: "tip",
          heading: "If their directions overwhelm you, ask them to draw",
          body: "Italians love to gesture but their directions can be a torrent of words. If you're lost: <em>«Mi può scrivere il nome della via su un foglietto?»</em> = Can you write the street name on a small piece of paper? Or <em>«Me lo può mostrare sulla mia mappa?»</em> = Can you show me on my map?",
        },
      ],
    },
  ],
  checkpoint: {
    passingPct: 80,
    questions: [
      {
        q: "'To the right' =",
        options: ["a sinistra", "a destra", "dritto", "dietro"],
        correct: 1,
      },
      {
        q: "'Keep going straight' =",
        options: ["sempre dritto", "sempre destra", "sempre indietro", "sempre avanti"],
        correct: 0,
      },
      {
        q: "'Across from the church' =",
        options: [
          "dietro la chiesa",
          "vicino alla chiesa",
          "di fronte alla chiesa",
          "sotto la chiesa",
        ],
        correct: 2,
      },
      {
        q: "Formal command 'turn' =",
        options: ["gira", "giri", "girare", "girate"],
        correct: 1,
      },
      {
        q: "'Excuse me, I'm lost.' (male speaker) =",
        options: [
          "Scusa, mi sono perso.",
          "Mi scusi, sono persa.",
          "Mi scusi, mi sono perso.",
          "Mi scusi, sono lontano.",
        ],
        correct: 2,
      },
      {
        q: "'At the corner' =",
        options: ["all'angolo", "all'incrocio", "al fondo", "al centro"],
        correct: 0,
      },
      {
        q: "'Take the second street on the left' (formal) =",
        options: [
          "Prendi la seconda a sinistra.",
          "Prenda la seconda strada a sinistra.",
          "Prendere la seconda a sinistra.",
          "Prendete la seconda strada.",
        ],
        correct: 1,
      },
      {
        q: "'Near the station' =",
        options: [
          "lontano dalla stazione",
          "vicino alla stazione",
          "dietro alla stazione",
          "sotto la stazione",
        ],
        correct: 1,
      },
      {
        q: "Translate: 'How far is it on foot?'",
        options: [
          "Quanto è lontano in piedi?",
          "Quanto è lontano a piedi?",
          "Quanti minuti per andare?",
          "Quanto cammino?",
        ],
        correct: 1,
      },
      {
        q: "'Zona pedonale' means…",
        options: ["bike lane", "bus only", "pedestrian zone", "one-way street"],
        correct: 2,
      },
    ],
  },
};
