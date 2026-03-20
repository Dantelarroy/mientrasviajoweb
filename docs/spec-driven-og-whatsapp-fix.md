# Spec-Driven Fix: WhatsApp Showing Static OG Instead of Dynamic

## Problem
WhatsApp preview showed the plain static image without countdown/phrase, even though `/api/og` rendered correctly.

## Root Cause
- Metadata exposed **two `og:image` entries**:
  1. dynamic `/api/og`
  2. static `/og-image.jpg`
- Some crawlers/clients can pick a later image or cached prior result.

## Fix Strategy
1. Keep only one OG image entry: dynamic endpoint.
2. Add version query param to force crawler recache:
   - `/api/og?v=2`
3. Align Twitter image with same dynamic URL.

## Acceptance Criteria
- HTML has a single `og:image` pointing to `https://www.mientrasviajo.com/api/og?v=2`.
- WhatsApp crawler receives no static fallback OG image in metadata.
- `/api/og?v=2` returns rendered image with countdown + phrase.
