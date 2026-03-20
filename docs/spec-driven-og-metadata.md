# Spec-Driven Plan: Open Graph Metadata (MientrasViajo)

## Objective
Ensure social previews (WhatsApp, Twitter/X, Open Graph consumers) show the intended campaign card for `www.mientrasviajo.com`.

## Constraints
- Do not break existing uses of the original asset in `/public/assets`.
- Keep website runtime behavior unchanged (metadata-only change).

## Requirements
1. Create OG image at `/public/og-image.jpg` by copying:
   - `/public/assets/WhatsApp Image 2026-03-18 at 12.00.11 AM (1).jpeg`
2. Update `app/layout.tsx` metadata:
   - `title`: `Escapada Vol I — Mientras Viajo`
   - `description`: `Viaje para mujeres, reconectar y disfrutar 🍃 | 15–17 de Mayo`
   - `openGraph.images[0].url`: `https://www.mientrasviajo.com/og-image.jpg`
   - `openGraph.images[0].width`: `1200`
   - `openGraph.images[0].height`: `630`
   - `twitter.images[0]`: `https://www.mientrasviajo.com/og-image.jpg`
3. Build and deploy to production.
4. Verify resulting HTML metadata and run OG check workflow.

## Execution Plan
1. Copy asset to `public/og-image.jpg`.
2. Patch metadata object in `app/layout.tsx`.
3. Run `npm run build`.
4. Deploy via `npx vercel --prod --yes`.
5. Validate:
   - page source includes updated OG/Twitter tags.
   - check via OG tooling URL flow.

## Acceptance Criteria
- `/public/og-image.jpg` exists and source asset remains in `/public/assets`.
- Production source contains:
  - `og:image=https://www.mientrasviajo.com/og-image.jpg`
  - `twitter:image=https://www.mientrasviajo.com/og-image.jpg`
  - updated title/description values.
- Deployment aliased to `https://mientrasviajo.com`.
