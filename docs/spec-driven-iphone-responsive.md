# Spec-Driven Plan: Responsive iPhone Hardening

## Scope
- Target viewport: iPhone class widths (`390px`, `375px`, `430px`).
- Keep visual direction and content unchanged.
- Fix only responsiveness/usability issues for mobile, without redesigning desktop.

## Current Findings
1. Mixed inline styles in `Galeria.tsx` made breakpoint tuning harder and inconsistent.
2. CTA controls in gallery consumed vertical space on small screens with low value vs swipe.
3. Hero typography and spacing needed tighter mobile scaling to avoid visual crowding.
4. Primary CTA in final coral block could wrap poorly on narrow widths.
5. Sticky WhatsApp button needed safe-area-aware bottom spacing on iPhone.
6. FAQ and timeline touch readability could be improved with smaller, explicit mobile spacing rules.

## Specs (Acceptance Criteria)
1. No horizontal overflow on iPhone (`documentElement.scrollWidth === innerWidth`).
2. Gallery remains swipeable with loop/autoplay, and no visual clipping on mobile.
3. Hero text hierarchy remains readable; hero image height does not dominate the fold.
4. Final CTA button text remains visible and centered, without overflow.
5. Sticky CTA avoids collision with iOS bottom safe area.
6. FAQ/timeline remain legible and touch-friendly at `<768px`.

## Implementation Plan
1. Normalize gallery styling into CSS classes (`galeria-*`) and preserve Embla behavior.
2. Add mobile-first typography/spacing rules for hero, section titles, body copy.
3. Add mobile-only simplifications:
   - Hide prev/next gallery arrows under `768px`.
   - Tighten timeline/FAQ spacing and sizes.
4. Harden CTA behavior on narrow viewports:
   - Allow balanced wrapping where needed.
   - Ensure sticky CTA safe-area offset.
5. Validate with build + runtime checks.

## Applied Changes
- `app/components/Galeria.tsx`
  - Replaced inline layout styles with semantic classes.
  - Kept Embla loop/autoplay behavior.
  - Added active dot state via `data-active`.
- `app/page.tsx`
  - Introduced `hero-brand`, `hero-content`, `hero-date`, `hero-cta`, `cta-main-btn` hooks for responsive control.
- `app/globals.css`
  - Added iPhone-focused rules for:
    - Hero image height and typography.
    - Gallery heading/track/dots/controls.
    - Timeline and FAQ sizing.
    - CTA button wrapping/width.
    - Sticky CTA safe-area padding.
  - Preserved desktop behavior and existing brand tokens.

## Validation Checklist
- [x] `npm run build` passes.
- [x] No horizontal overflow on iPhone-width viewport checks.
- [x] Carousel remains loop/swipe/autoplay capable.
- [x] Final CTA remains readable on narrow widths.
- [x] Sticky CTA positioned above iOS safe area.
