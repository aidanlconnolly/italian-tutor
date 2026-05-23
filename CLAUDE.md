# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A personal Italian-learning web app for an A2–B1 English speaker. Single-user, no auth. Two loops: **Read** (paste Italian text → tap unknown words → save with their source sentence) and **Review** (FSRS-scheduled flashcards built from those saves). Live at `https://italian-tutor-rho.vercel.app` (push to `main` on `aidanlconnolly/italian-tutor` auto-deploys via Vercel).

## Stack

- **Next.js 16.2** (App Router) — `create-next-app` shipped v16 despite the plan saying "15". App Router model is unchanged for our needs, but `AGENTS.md` warns that some APIs/conventions differ from training data. Consult `node_modules/next/dist/docs/` rather than memory for any version-sensitive API.
- React 19, TypeScript strict, Tailwind v4 (config lives in `app/globals.css` via `@theme` — no `tailwind.config.ts`).
- **Turso (libSQL) + Drizzle ORM** for persistence. Edge-compatible.
- **`ts-fsrs`** for spaced-repetition scheduling.
- **Anthropic SDK** (`claude-haiku-4-5`) for word lookups via tool-use structured output.
- Web Speech API for Italian pronunciation.

## Common commands

```bash
# All node commands need this PATH prefix (homebrew node isn't on $PATH)
PATH=/opt/homebrew/bin:$PATH npm run dev         # Turbopack dev server, port 5600 via .claude/launch.json
PATH=/opt/homebrew/bin:$PATH npm run build       # production build (catches TS errors)
PATH=/opt/homebrew/bin:$PATH npm run lint        # ESLint (strict; no `any`, no setState-in-effect)

# DB ops (env vars must be sourced)
set -a && source .env.local && set +a
PATH=/opt/homebrew/bin:$PATH npx drizzle-kit push   # apply schema diff to Turso
PATH=/opt/homebrew/bin:$PATH npx drizzle-kit studio # GUI to browse DB

# Turso CLI (installed at ~/.turso/turso)
export PATH="$HOME/.turso:$PATH"
turso db shell italian-tutor                         # interactive SQL
turso db tokens create italian-tutor                 # rotate auth token
```

There are no tests in this project.

## Architecture (the parts that span multiple files)

### Data flow: tap → Claude → DB → UI

A word tap in `<Reader>` opens `<WordPopover>`, which calls the `lookupWord` Server Action (`lib/actions/lookup.ts`). That action runs a **two-tier cache** before ever hitting Claude:

1. **Surface hit** — scan `words` for any row whose `lemma === surface` *or* whose `surface_seen` JSON array contains `surface`. Match → return immediately.
2. **Lemma hit** — Claude returns the canonical `lemma`; if a row already exists with that lemma, append the new surface to its `surface_seen` and return.
3. **Cold miss** — insert a new `words` row.

This is the heart of the cost-control story: one Claude call per *new lemma encountered, ever.* Don't reintroduce per-tap calls without a very good reason.

### Lemma-only deck (enforced at the DB)

`cards.word_id` has a **UNIQUE constraint**. Saving any form of a lemma already in the deck is a no-op that preserves the original `source_sentence`. `<TappableWord>`'s green-underline state is driven by `savedSurfaces: Set<string>` in `<Reader>`, seeded from `getSavedSurfaces()` (server-loaded on page mount) and augmented in-place when the popover signals a save. So the underline jumps to other inflected forms of a just-saved lemma immediately.

### FSRS serialization shim

`ts-fsrs` uses `Date` objects; SQLite stores text/integers. `lib/srs.ts` is the only file that knows about `Card` (with Dates) vs `FsrsCardState` (the ISO-string JSON we persist). `cards.fsrs_due` is denormalized to an `integer` column for cheap `WHERE due <= now` queries. The four-button rating (1=Again, 4=Easy) maps to `Grade` (a subset of `Rating` excluding `Manual`).

### Server Actions over API routes

All backend lives in `lib/actions/*.ts`, each with `"use server"` at the top. No `app/api/*` route handlers exist or are needed in v1 — Server Actions cover lookup, save, deck queries, FSRS rating, and dashboard stats. If you add streaming (e.g. Claude SSE), that's the case where a route handler becomes justified.

### Lazy DB client

`lib/db/client.ts` uses a `Proxy` to defer `TURSO_DATABASE_URL` validation until first use. This is deliberate — Next.js's build-time route discovery imports server files even when `dynamic = "force-dynamic"` is set, and a throw at module load would break `next build` on Vercel before env vars resolve.

### Popover state via remount key

`<WordPopover>` is keyed on `${surface}|${sentence}` from `<Reader>`. Tapping a new word remounts the popover, so we don't need a state-reset effect (and don't trigger the `react-hooks/set-state-in-effect` lint rule).

## Critical conventions

- **All Italian text gets `.normalize("NFC")`** before storage or tokenization. Diacritics (`à è é ì ò ù`) must round-trip.
- **Definitions are English**, examples stay Italian (with English translations alongside). The tool schema in `lib/anthropic.ts` enforces this contract — change it carefully.
- **Server Components by default.** Add `"use client"` only when you need state, refs, or browser APIs.
- **No `any`** — use `unknown` and narrow.
- **Tokenizer regex** (`lib/italian.ts`): `\p{L}+'(?=\p{L})|\p{L}+'?` — elides `l'amico` into two tokens, keeps `po'` as one. Don't simplify without testing both cases.

## Environment variables

All three are required in `.env.local` (committed via `.env.local.example`) and in Vercel Project Settings → Environment Variables → production. All three are already configured for production.

- `ANTHROPIC_API_KEY`
- `TURSO_DATABASE_URL` — `libsql://italian-tutor-aidanlconnolly.turso.io`
- `TURSO_AUTH_TOKEN`

## Token-conscious workflow (per the user)

- Output diffs / changed sections, not whole-file rewrites.
- Prefer editing existing files over creating new ones.
- Ask before adding dependencies.
