# Spec-Driven Plan: OG Single Background + Cleanup

## Objective
Use a single OG background image (the existing `WhatsApp Image 2026-03-18 at 12.00.11 AM (1)`) for all dynamic cases, while preserving dynamic phrase + countdown behavior.

## Constraints
- Keep the original asset in `public/assets` untouched.
- Work from a copy in `public/og-image.jpg`.
- Remove unused OG background copies to avoid confusion.

## Source of Truth
- Required background image:
  - `public/assets/WhatsApp Image 2026-03-18 at 12.00.11 AM (1).jpeg`
- Copy used by OG API:
  - `public/og-image.jpg`

## Rules
1. `/api/og` must always use `public/og-image.jpg` as background.
2. Dynamic behavior remains:
   - phrase changes by server hour.
   - `En X días, a esta hora` countdown text.
3. Keep strong readability:
   - dark overlay
   - large/high-weight text.
4. Clean up old files no longer used:
   - `public/og-manana.jpg`
   - `public/og-yoga.jpg`
   - `public/og-bodega.jpg`
   - `public/og-noche.jpg`

## Implementation Summary
- Refactored `app/api/og/route.tsx`:
  - replaced hour-to-image mapping with fixed `OG_BACKGROUND_PATH = "/og-image.jpg"`.
  - retained hour-to-phrase mapping and countdown logic.
- Deleted unused `og-*.jpg` files from `/public`.

## Acceptance Criteria
- Only `public/og-image.jpg` remains as OG background source.
- `GET /api/og` renders using the fixed background and dynamic text.
- Site metadata still points to `https://www.mientrasviajo.com/api/og`.
