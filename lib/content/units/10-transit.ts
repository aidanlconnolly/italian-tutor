import type { Unit } from "../types";

export const UNIT_TRANSIT: Unit = {
  slug: "transit",
  stage: 3,
  order: 10,
  icon: "🚇",
  title: "Getting around",
  tagline: "Metro, autobus, treno, taxi — buy a ticket, validate it, know where you're going.",
  badge: "tourist",
  lessons: [
    {
      slug: "transit-vocab",
      title: "Trains, buses, tickets",
      estMinutes: 9,
      pages: [
        {
          type: "intro",
          heading: "Rome runs on three things you need to name",
          body: [
            "The <strong>metro</strong> has just two main lines that matter for tourists: <em>A</em> (orange, runs east-west — Termini ↔ Spagna ↔ Ottaviano/Vaticano) and <em>B</em> (blue, runs north-south — Colosseo ↔ Termini ↔ Tiburtina).",
            "The <strong>autobus</strong> (city bus) is slower but goes everywhere the metro doesn't. The famous tourist lines: <em>40</em> (Termini → Vaticano), <em>64</em> (Termini → San Pietro, pickpocket-famous), <em>H</em> (Termini → Trastevere).",
            "The <strong>treno</strong> (train) is what gets you to other cities. Long-distance: <em>Frecciarossa</em>, <em>Italo</em>. Regional: <em>regionale</em>. Cheap but slow. Airport: <em>Leonardo Express</em>.",
          ],
          keyPoint:
            "Metro = 2 main lines. Bus = slower but vast network. Treno = intercity, regional, airport.",
        },
        {
          type: "vocab",
          heading: "Core transit vocab",
          items: [
            { it: "il biglietto", en: "the ticket" },
            { it: "la fermata", en: "the stop" },
            { it: "la stazione", en: "the station" },
            { it: "il binario", en: "the platform / track" },
            { it: "la metro / la metropolitana", en: "the metro / subway" },
            { it: "l'autobus / il bus", en: "the city bus" },
            { it: "il treno", en: "the train" },
            { it: "il taxi", en: "the taxi" },
            { it: "andata", en: "one-way" },
            { it: "andata e ritorno", en: "round-trip" },
            { it: "il controllore", en: "the ticket inspector" },
            { it: "la multa", en: "the fine / penalty" },
          ],
        },
        {
          type: "tip",
          heading: "Validate or pay €50+",
          body: "Most Rome transit tickets must be <strong>validated</strong> (<em>convalidare</em>) before or just after boarding — there's a small green or yellow machine at metro turnstiles and inside buses. No timestamp = fine. The Leonardo Express airport ticket has a separate yellow machine at the platform entrance.",
          example: { it: "Devo convalidare il biglietto?", en: "Do I need to validate the ticket?" },
        },
        {
          type: "vocab",
          heading: "Ticket types & prices (€, as of 2025)",
          items: [
            { it: "biglietto BIT (100 min)", en: "single use, valid 100 min on bus/metro, €1.50" },
            { it: "biglietto 24 ore", en: "unlimited 24h, €7" },
            { it: "biglietto 48 ore", en: "unlimited 48h, €12.50" },
            { it: "biglietto 72 ore", en: "unlimited 72h, €18" },
            { it: "CIS (settimanale)", en: "weekly, €24" },
            { it: "Leonardo Express", en: "Fiumicino airport ↔ Termini, €14" },
            { it: "Roma Pass", en: "tourist combo: transit + 2 museum entries, €33 (48h) / €56 (72h)" },
          ],
        },
        {
          type: "multipleChoice",
          heading: "Quick check",
          questions: [
            {
              q: "What does 'convalidare' mean?",
              options: ["to buy", "to validate / stamp", "to refund", "to lose"],
              correct: 1,
            },
            {
              q: "Metro line A connects…",
              options: [
                "Colosseo ↔ Termini",
                "Termini ↔ Spagna ↔ Vaticano",
                "Trastevere ↔ Tiburtina",
                "Just the airport",
              ],
              correct: 1,
            },
            {
              q: "A single BIT ticket is valid for…",
              options: ["60 min", "100 min", "24 hours", "one ride only"],
              correct: 1,
              fb: "100 minutes — one metro ride + unlimited bus transfers in that window.",
            },
            {
              q: "Round-trip in Italian =",
              options: ["solo andata", "andata e ritorno", "doppio biglietto", "ritorno e andata"],
              correct: 1,
            },
          ],
        },
      ],
    },
    {
      slug: "transit-buying",
      title: "Buying a ticket",
      estMinutes: 9,
      pages: [
        {
          type: "intro",
          heading: "Three places to buy a transit ticket",
          body: [
            "1. <strong>Tabaccheria</strong> (corner tobacco shop, marked with a black T). Cheapest, fastest. Just say <em>«Un biglietto della metro, per favore.»</em>",
            "2. <strong>Macchinetta automatica</strong> at every metro station — touch screen, English available, takes card and cash.",
            "3. <strong>App</strong>: ATAC's MyCicero or Tap&Go (contactless tap your card directly at the metro turnstile or bus reader, €1.50 deducted automatically). This is the easiest for visitors.",
          ],
          keyPoint:
            "Tabaccheria > vending machine > app. All accept cards. Validate before riding.",
        },
        {
          type: "dialogue",
          heading: "At the tabaccheria",
          setup: "You walk into a tobacco shop to buy transit tickets.",
          lines: [
            { speaker: "You", it: "Buongiorno. Vorrei due biglietti della metro, per favore.", en: "Hello. I'd like two metro tickets, please." },
            { speaker: "Tabaccaio", it: "Singoli o giornalieri?", en: "Single or day passes?" },
            { speaker: "You", it: "Singoli, grazie. Si possono usare anche sull'autobus?", en: "Single, thanks. Can they be used on the bus too?" },
            { speaker: "Tabaccaio", it: "Sì, certo. Cento minuti, validi su metro e bus.", en: "Yes, of course. 100 minutes, valid on metro and bus." },
            { speaker: "You", it: "Perfetto. Quanto fa?", en: "Perfect. How much?" },
            { speaker: "Tabaccaio", it: "Tre euro in tutto.", en: "Three euros total." },
            { speaker: "You", it: "Ecco. Devo convalidare prima di salire?", en: "Here you go. Do I have to validate before boarding?" },
            { speaker: "Tabaccaio", it: "Sì, sempre. C'è una macchinetta gialla.", en: "Yes, always. There's a yellow machine." },
          ],
        },
        {
          type: "fillBlank",
          heading: "Fill the request",
          items: [
            {
              template: "___ un biglietto per il Leonardo Express, per favore.",
              answer: "Vorrei",
              en: "I'd like a Leonardo Express ticket, please.",
              options: ["Voglio", "Vorrei", "Mi serve", "Faccio"],
            },
            {
              template: "Posso pagare con la ___?",
              answer: "carta",
              en: "Can I pay by card?",
              options: ["carta", "contante", "moneta", "monete"],
            },
            {
              template: "Il biglietto giornaliero ___ sette euro.",
              answer: "costa",
              en: "The daily ticket costs seven euros.",
              options: ["fa", "costa", "ha", "è"],
            },
            {
              template: "Devo ___ il biglietto prima di salire.",
              answer: "convalidare",
              en: "I have to validate the ticket before boarding.",
              options: ["comprare", "convalidare", "pagare", "controllare"],
            },
            {
              template: "Per il Vaticano, prendo la linea ___ della metro.",
              answer: "A",
              en: "For the Vatican, I take metro line A.",
              options: ["A", "B", "C", "1"],
            },
          ],
        },
        {
          type: "orderWords",
          heading: "Build the ticket request",
          items: [
            { tokens: ["Vorrei", "un", "biglietto", "andata", "e", "ritorno"], en: "I'd like a round-trip ticket." },
            { tokens: ["A", "che", "ora", "parte", "il", "prossimo", "treno", "?"], en: "What time does the next train leave?" },
            { tokens: ["Quanto", "costa", "un", "biglietto", "giornaliero", "?"], en: "How much does a day ticket cost?" },
            { tokens: ["Posso", "pagare", "con", "la", "carta", "di", "credito", "?"], en: "Can I pay with a credit card?" },
          ],
        },
      ],
    },
    {
      slug: "transit-onboard",
      title: "On board — asking, hearing, getting off",
      estMinutes: 10,
      pages: [
        {
          type: "intro",
          heading: "What you'll hear on the metro and bus",
          body: [
            "Every announcement follows the same pattern: <em>«Prossima fermata: [nome].»</em> = Next stop: [name]. So tune your ear for <em>prossima fermata</em>.",
            "On the metro, the closing-door warning is: <em>«Chiudo le porte. Allontanarsi dalla linea gialla.»</em> = I'm closing the doors. Step back from the yellow line.",
            "If you miss a stop: <em>«Mi scusi, è la fermata per…?»</em> Or to ask a stranger: <em>«Quante fermate mancano per…?»</em> = How many stops are left until…?",
          ],
          keyPoint:
            "Prossima fermata = next stop. Quante fermate mancano per X? = how many stops to X?",
        },
        {
          type: "vocab",
          heading: "Phrases you'll hear or need to say",
          items: [
            { it: "prossima fermata", en: "next stop" },
            { it: "capolinea", en: "end of the line / terminal" },
            { it: "in arrivo", en: "arriving" },
            { it: "in partenza", en: "departing" },
            { it: "uscita", en: "exit" },
            { it: "ingresso", en: "entrance" },
            { it: "salire", en: "to get on / board" },
            { it: "scendere", en: "to get off" },
            { it: "cambiare", en: "to change / transfer" },
            { it: "il deposito bagagli", en: "the luggage storage" },
            { it: "in ritardo", en: "late / delayed" },
            { it: "in orario", en: "on time" },
          ],
        },
        {
          type: "dialogue",
          heading: "Asking a fellow passenger",
          setup: "You're on bus 64 and need to get off at Largo di Torre Argentina.",
          lines: [
            { speaker: "You", it: "Mi scusi, sa quale è la fermata per Largo Argentina?", en: "Excuse me, do you know which stop is for Largo Argentina?" },
            { speaker: "Signora", it: "Sì, è tra due fermate. Le dico io quando scendere.", en: "Yes, it's in two stops. I'll tell you when to get off." },
            { speaker: "You", it: "Grazie mille! È la prima volta che prendo questo autobus.", en: "Thank you so much! It's my first time on this bus." },
            { speaker: "Signora", it: "Sta attento allo zaino. Su questo autobus ci sono molti borseggiatori.", en: "Watch your backpack. On this bus there are lots of pickpockets." },
            { speaker: "You", it: "Ah, grazie del consiglio.", en: "Ah, thanks for the tip." },
            { speaker: "Signora", it: "Ecco, prossima fermata è la sua! Scenda con calma.", en: "There, the next stop is yours! Get off calmly." },
          ],
        },
        {
          type: "listen",
          heading: "What did the announcement say?",
          intro: "Listen to each one, then pick the closest meaning.",
          items: [
            { it: "Prossima fermata: Termini.", en: "Next stop: Termini.", options: ["Final stop: Termini", "Termini is closed", "Next stop: Termini", "Train delayed"], correct: 2 },
            { it: "Treno in arrivo al binario tre.", en: "Train arriving at platform 3.", options: ["Train arriving at platform 3", "Train leaving from platform 3", "Train cancelled at platform 3", "Track 3 is closed"], correct: 0 },
            { it: "Chiudo le porte.", en: "I'm closing the doors.", options: ["The doors are broken", "Open the doors", "I'm closing the doors", "Doors held open"], correct: 2 },
            { it: "Allontanarsi dalla linea gialla.", en: "Step back from the yellow line.", options: ["Step back from the yellow line", "Cross the yellow line", "Wait at the yellow line", "Look for the yellow line"], correct: 0 },
          ],
        },
        {
          type: "translate",
          heading: "Translate it",
          direction: "en-to-it",
          prompt: "Excuse me, how many stops until the Colosseum?",
          reference: "Mi scusi, quante fermate mancano per il Colosseo?",
          hint: "'How many stops are left until…' = quante fermate mancano per…",
        },
        {
          type: "tip",
          heading: "Taxi tip: always confirm the fare upfront",
          body: "Roman taxis use a meter (<em>tassametro</em>), but for fixed-fare routes (e.g., airport ↔ Aurelian walls = €50 flat) always confirm: <em>«Quanto viene per [destination]?»</em> before you get in. Official taxis are white with a meter and a TAXI sign on the roof. Avoid anyone who offers you a ride inside the terminal — those are scams.",
        },
      ],
    },
  ],
  checkpoint: {
    passingPct: 80,
    questions: [
      {
        q: "'I'd like a single ticket' =",
        options: [
          "Voglio un biglietto solo.",
          "Vorrei un biglietto singolo / di sola andata.",
          "Vorrei due biglietti.",
          "Mi piace un biglietto.",
        ],
        correct: 1,
      },
      {
        q: "What's a 'tabaccheria'?",
        options: [
          "A corner shop where you can buy transit tickets",
          "The metro station office",
          "A taxi stand",
          "The bus depot",
        ],
        correct: 0,
      },
      {
        q: "'Next stop' =",
        options: ["prossima fermata", "capolinea", "ultima fermata", "fermata di arrivo"],
        correct: 0,
      },
      {
        q: "Without validating, you can get…",
        options: [
          "a discount",
          "a fine (multa)",
          "extra travel time",
          "a free transfer",
        ],
        correct: 1,
      },
      {
        q: "'How much does it cost?' =",
        options: ["Quanto costa?", "Quanto fa?", "Both — interchangeable", "Quanti euro?"],
        correct: 2,
      },
      {
        q: "Metro line for the Vatican area =",
        options: ["A", "B", "C", "neither — only buses go there"],
        correct: 0,
      },
      {
        q: "'To get off' (the bus) =",
        options: ["salire", "scendere", "cambiare", "fermare"],
        correct: 1,
      },
      {
        q: "'Round-trip' =",
        options: ["doppio biglietto", "andata e ritorno", "ritorno solo", "viaggio doppio"],
        correct: 1,
      },
      {
        q: "Translate: 'Where is the nearest metro stop?'",
        options: [
          "Dove la metro?",
          "Dov'è la fermata della metro più vicina?",
          "Dove sta la metro?",
          "La metro vicina dov'è?",
        ],
        correct: 1,
      },
      {
        q: "What's the Leonardo Express?",
        options: [
          "A bus to the Vatican",
          "The direct train Fiumicino airport ↔ Termini",
          "A Roma Pass option",
          "The night bus",
        ],
        correct: 1,
      },
    ],
  },
};
