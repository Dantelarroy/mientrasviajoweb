# Spec: Responsive UX Modernization — Escapada Vol I

**Date:** 2026-03-18
**Scope:** CSS & component polish — no content, color, or design-system changes
**Goal:** Fix responsive breaks, lift touch accessibility, and modernize visual details

---

## Audit Summary

| Category | Issues Found | Priority |
|----------|-------------|----------|
| Responsive breaks | 3 | High |
| Touch / Accessibility | 2 | High |
| Visual polish | 6 | Medium |
| Micro-interactions | 3 | Low |

---

## Issues & Fixes

### R1 — `white-space: nowrap` on `.hero-title` causes overflow on ≤ 360 px
**Where:** `globals.css` → `.hero-title`
**Problem:** At very small viewport widths (Galaxy Fold, etc.) the heading "ESCAPADA VOL I" overflows the container because it's forced to a single line.
**Fix:** Remove `white-space: nowrap`, apply `text-wrap: balance` so the heading wraps naturally and stays optically centered.

---

### R2 — Mobile hero banner: keep `object-fit: contain` + `height: auto` ✅ INTENTIONAL
**Where:** `globals.css` → `@media (max-width: 767px)` → `.hero-banner-image`
**Decision:** The banner image is a 4:1 panoramic with centered text "LO MÁGICO DE VIAJAR, ESTA EN LO MAS REAL". Using `object-fit: cover` with any taller aspect ratio crops the side panels and changes the compositional intent. The original `contain + height: auto` correctly shows all 4 photo panels + the phrase. On mobile the image renders as a ~94px tall horizontal strip — which is the right treatment for this panoramic format. **No change applied.**

---

### R3 — Gallery heading misaligned with page container system
**Where:** `globals.css` → `.galeria-heading` + `Galeria.tsx`
**Problem:** `.galeria-heading` uses hardcoded `padding-inline: 2rem` on all breakpoints, while the rest of the page uses the fluid `container` class (`min(1200px, calc(100vw - clamp(2.5rem, 10vw, 8rem)))`). This causes the "Momentos" heading to visually drift left or right relative to section titles in adjacent sections.
**Fix:** Replace the custom `galeria-heading` width/padding rules with the same `.container` width calculation, and use the existing `.container` class in `Galeria.tsx`.

---

### A1 — Gallery indicator dots: 8 px visible area fails WCAG 2.5.5 touch target
**Where:** `globals.css` → `.galeria-dot`
**Problem:** Dots are 8 × 8 px — well below the 44 × 44 px minimum touch target. Users on mobile will accidentally tap wrong dots or miss entirely.
**Fix:** Increase visible size to 10 px, wrap tap area with transparent padding via `box-sizing` trick so the interactive area reaches 32 px (acceptable compromise for decorative dots).

---

### A2 — FAQ item border `0.5px` renders inconsistently on non-retina displays
**Where:** `globals.css` → `.faq-item`
**Problem:** Sub-pixel borders snap to either 0 or 1 px depending on device pixel ratio and browser, creating invisible or overly thick borders on certain screens.
**Fix:** Set border to `1px solid var(--color-border)` for guaranteed consistency.

---

### U1 — Gallery images have no `border-radius` — raw crop edges
**Where:** `globals.css` → `.galeria-image`, `.embla__slide`
**Problem:** Images are displayed with hard 90° corners while all other cards (polaroids, FAQ items, CTAs) use rounded corners. The gallery stands out as visually inconsistent.
**Fix:** Add `border-radius: 12px` to `.galeria-image` and `overflow: hidden` to `.embla__slide` so the crop follows the rounding.

---

### U2 — FAQ question rows have no hover/focus visual feedback
**Where:** `globals.css` → `.faq-question`
**Problem:** On desktop, hovering over a FAQ question gives no indication it is interactive beyond the cursor change. Users may not know items are clickable.
**Fix:** Add a subtle `background` tint on `.faq-question:hover` and a visible `focus-visible` ring.

---

### U3 — Timeline items have no visual connector — reading flow interrupted
**Where:** `globals.css` → `.timeline`, `.timeline-dot`
**Problem:** The three timeline cards are visually isolated. While the dashed left border on each card partially suggests connection, there is no spine linking the dots to each other, so the "journey" metaphor is weak.
**Fix:** Add a pseudo-element connector line on `.timeline` at the dot column, visible behind the dot circles, creating a vertical spine.

---

### U4 — No `scroll-behavior: smooth` for anchor link (`#reservar`)
**Where:** `globals.css` → `html`
**Problem:** The hero CTA (`<a href="#reservar">`) jumps instantly to the section. Smooth scroll gives better spatial context.
**Fix:** Add `scroll-behavior: smooth` to `html` (already guarded by the `prefers-reduced-motion` reset that disables it when needed).

---

### U5 — `.hero-date` font-size is a fixed `2.1rem` with no fluid scaling between mobile and desktop
**Where:** `globals.css` → `.hero-date`
**Problem:** At tablet widths (768–980 px) the date size snaps from the mobile override to the full 2.1rem without easing, creating a layout step.
**Fix:** Apply `clamp(1.5rem, 5vw, 2.1rem)` for smooth scaling across all breakpoints.

---

### U6 — `.polaroid` `transition` includes `transform` but misses `will-change`
**Where:** `globals.css` → `.polaroid`
**Problem:** Hover triggers a CSS transform. Without `will-change: transform`, the first hover interaction may cause a compositor layer promotion stutter on mid-range devices.
**Fix:** Add `will-change: transform` to `.polaroid`.

---

## Files to Change

| File | Changes |
|------|---------|
| `app/globals.css` | R1, R2, A1, A2, U1, U2, U3, U4, U5, U6 |
| `app/components/Galeria.tsx` | R3 — swap heading div class |

---

## Non-Goals (explicitly excluded)

- Color changes
- Font family / weight changes
- Content / copy edits
- Layout restructuring
- New features (dark mode, i18n, form)
- Removal of existing functionality
