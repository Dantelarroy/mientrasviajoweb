# Spec-Driven Plan: Dynamic Open Graph via `@vercel/og`

## Goal
Replace static `og-image.jpg` metadata with a dynamic image generated at request time from `/api/og`.

## Constraints
- Original assets in `public/assets` are reused elsewhere and must remain untouched.
- Create copies in `/public` for OG backgrounds.
- Keep desktop/mobile site UI unchanged; this is metadata/API-only behavior.

## Input Mapping (copied assets)
- `public/og-manana.jpg` ← `public/assets/WhatsApp Image 2026-03-18 at 12.00.11 AM (3).jpeg`
- `public/og-yoga.jpg` ← `public/assets/WhatsApp Image 2026-03-18 at 12.00.11 AM (2).jpeg`
- `public/og-bodega.jpg` ← `public/assets/WhatsApp Image 2026-03-18 at 12.00.11 AM (1).jpeg`
- `public/og-noche.jpg` ← `public/assets/WhatsApp Image 2026-03-18 at 12.00.11 AM (1).jpeg`

## Runtime Rules
1. Time windows by server hour:
   - 07–11 → “podrías estar desayunando con mates ☀️” + `og-manana.jpg`
   - 12–17 → “podrías estar en clase de yoga en la naturaleza 🧘” + `og-yoga.jpg`
   - 18–21 → “podrías estar brindando en la bodega 🍷” + `og-bodega.jpg`
   - 22–06 → “podrías estar riendo bajo las estrellas 🌙” + `og-noche.jpg`
2. Top line:
   - `En X días, a esta hora`, where `X = ceil((2026-05-15 - now)/days)` and clamped at 0.
3. Canvas:
   - 1200×630
   - White bottom bar with:
     - left: `Escapada Vol I · 15 Mayo`
     - right: green `#25D366` pill `Reservar 🍃`
4. Caching:
   - `Cache-Control: public, max-age=0, must-revalidate`

## Metadata Wiring
- `app/layout.tsx`
  - `openGraph.images[0].url = https://www.mientrasviajo.com/api/og`
  - `twitter.images[0] = https://www.mientrasviajo.com/api/og`

## Acceptance Criteria
- `/api/og` returns a valid image response (1200×630).
- OG/Twitter tags point to `/api/og` in production HTML.
- Background copies exist in `/public`.
- Production deploy is active at `https://mientrasviajo.com`.
