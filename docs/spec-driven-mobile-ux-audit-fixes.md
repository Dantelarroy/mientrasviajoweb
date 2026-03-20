# Spec-Driven Plan: Mobile UX/UI Audit Fixes (iPhone 390px)

## Objective
Adapt the current site for iPhone viewport quality and conversion flow without breaking the existing desktop visual language.

## Inputs
- Audit list with 19 mobile issues (critical/high/medium/improvement).
- Existing production site at `www.mientrasviajo.com`.

## Constraints
- Preserve brand/look and current section order.
- Keep carousel loop/swipe behavior.
- Avoid introducing risky legal/product claims.
- Do not break desktop behavior while fixing mobile.

## Priority Plan

### Phase 1 (Critical)
1. Remove URL references with spaces in image paths.
2. Migrate gallery images to `next/image` with `sizes` and lazy loading.
3. Add mobile-appropriate `sizes` to hero image.
4. Fix truncated copy typo in experience paragraph.
5. Ensure hero header image is fully visible on iPhone (no crop).

### Phase 2 (High)
1. Ensure itinerary remains mobile readable (single-column timeline retained).
2. Increase carousel control touch target (`>=44x44`) and keep swipe-first UX.
3. Improve FAQ tap targets (`min-height >=56px`).
4. Replace FAQ placeholder answers with useful real-world guidance.

### Phase 3 (Medium/Quality)
1. Add blur placeholders to key above-the-fold imagery (hero/moodboard/experience).
2. Improve footer link tap area and spacing.
3. Prevent sticky FAB overlap with content (mobile bottom padding + safe area).
4. Add iOS web-app meta tags.
5. Strengthen alt text quality for gallery images.

### Phase 4 (Improvement)
1. Add conversion tracking hooks for WhatsApp CTA clicks.
2. Keep Open Graph metadata validated and consistent.

## Implemented Changes

### Files Changed
- `app/components/Galeria.tsx`
- `app/components/MoodboardSection.tsx`
- `app/components/CTASticky.tsx`
- `app/components/TrackedLink.tsx` (new)
- `app/lib/analytics.ts` (new)
- `app/page.tsx`
- `app/layout.tsx`
- `app/globals.css`
- `public/assets/WhatsApp_Image_2026-03-18_at_12_00_12_AM.jpeg` (new, sanitized filename)

### What Was Fixed
1. **No-space gallery path**
   - Added sanitized image path and removed space-based references in code.
2. **Gallery optimization**
   - Replaced gallery `<img>` usage with `next/image`.
   - Added accurate width/height metadata and `sizes`.
   - Kept Embla loop, autoplay, swipe, and dots behavior.
3. **Hero optimization**
   - Added `sizes="100vw"` and blur placeholder to hero image.
   - Added mobile-only behavior (`<768px`) so hero image renders complete (`object-fit: contain`, `height: auto`) while desktop keeps cover style.
4. **Text correction**
   - Fixed `espectacula` → `espectaculares.`.
5. **FAQ usability + content**
   - Replaced generic “Próximamente” text with concrete non-legal informative answers.
   - Ensured larger touch targets.
6. **Mobile touch ergonomics**
   - Carousel arrows now have `min-width/min-height: 44px`.
   - FAQ rows enforce `min-height: 56px`.
   - Footer links have larger tap area.
7. **FAB overlap prevention**
   - Mobile `body` bottom padding + iOS safe-area aware sticky button offset.
8. **iOS meta**
   - Added:
     - `apple-mobile-web-app-capable`
     - `apple-mobile-web-app-status-bar-style`
9. **Tracking**
   - Added WhatsApp conversion event tracking (`gtag` + `dataLayer` fallback).
   - Wired into final CTA, footer WhatsApp link, and sticky CTA.
10. **Alt text quality**
   - Gallery images now have unique descriptive alt strings.

## Validation
- `npm run build`: ✅ passed
- Production deploy: ✅ aliased to `https://mientrasviajo.com`
- Playwright runtime validation: attempted; blocked by local Chrome session lock in this environment.

## Notes
- Some audit items were already solved before this pass (e.g., timeline no longer 3 columns on mobile).
- OG image ratio `1200x630` is still optional/pending if you want a dedicated social card asset.
