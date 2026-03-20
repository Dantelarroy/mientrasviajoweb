# Spec-Driven Responsive Hardening (No Desktop Regression)

## Goal
Make the site truly responsive on iPhone while preserving desktop/tablet look and behavior.

## Non-Negotiable Constraint
- Desktop and tablet must keep the same visual composition (no unintended typography/layout drift).
- Mobile fixes must be scoped to `@media (max-width: 767px)` whenever possible.

## Root-Cause Analysis
1. Mixed styling sources (utility classes + global CSS + inline styles) created conflicting behavior.
2. Hero and display typography had weak line-break constraints for narrow viewports.
3. Some interaction zones were not mobile-first (touch targets, sticky overlap).
4. Asset naming and image delivery were inconsistent for mobile constraints.

## Spec (Acceptance Criteria)
1. `documentElement.scrollWidth === innerWidth` on iPhone viewport.
2. Hero image is fully visible on iPhone (no crop) and remains current desktop style on larger screens.
3. Hero title does not split awkwardly (no orphan “I” line).
4. Gallery uses optimized `next/image` with correct `sizes`, keeps loop/swipe behavior.
5. FAQ items have real answers and touch targets >= 44px.
6. Sticky CTA does not overlap end-of-page content on iPhone safe area.
7. Footer links are easily tappable.
8. Year is current (dynamic) in footer.

## Implemented
- Hero image:
  - desktop: `object-fit: cover`
  - mobile: `object-fit: contain`, `height: auto`
- Hero title:
  - protected line break (`VOL&nbsp;I`)
  - mobile scale and width constraints to avoid ugly wraps
- Gallery:
  - migrated to `next/image`
  - sanitized asset paths (no spaces)
  - responsive `sizes` and lazy loading
- FAQ:
  - replaced placeholder “Próximamente” answers with useful content
  - touch target sizing improved
- CTA / Footer:
  - sticky CTA safe-area spacing
  - bottom body padding on mobile to avoid overlap
  - footer link tap area improved
- Metadata/UX:
  - iOS app-capable meta tags present
- Footer year:
  - dynamic current year

## Validation
- `npm run build`: pass
- Production deploy: pass (`https://mientrasviajo.com`)

## Deployment Reference
- Latest production deployment URL:
  - `https://web-pbvf1oji0-dantelarroys-projects.vercel.app`
