# Spec-Driven Plan: Escapada Vol I Landing

## Goal
Implement the landing in Next.js using the provided design system spec as the source of truth, with a light scrapbook aesthetic and conversion-focused structure.

## Constraints
- Theme must be light (no dark version)
- Hero title must be below the banner image (user correction)
- Use clean asset names under `/public/assets`
- Use Embla for carousel
- Use Framer Motion for reveal/accordion/sticky CTA transitions
- Respect `prefers-reduced-motion`

## Token System
- CSS variables in `app/globals.css` using the provided palette
- Font families:
  - Display: Playfair Display
  - Handwritten: Caveat
  - Impact: Bebas Neue (fallback Anton)
  - Body: Plus Jakarta Sans

## Section Architecture (1-8)
1. Hero (light, title below image, blue highlight band)
2. Moodboard (single centered collage image on coral background)
3. Experiencia (2-column desktop, stacked mobile)
4. Galería (Embla carousel with polaroid cards + dots)
5. Itinerario (vertical timeline of 3 days)
6. FAQ (animated accordion)
7. CTA final (coral block + WhatsApp reserve button)
8. Footer (brand + social links)

## Components
- `app/components/Carousel.tsx`
- `app/components/FaqAccordion.tsx`
- `app/components/CTASticky.tsx`

## Decorative Assets
- `public/assets/torn-paper-top.svg`
- `public/assets/torn-paper-bottom.svg`

## Data & Links
- Keep current copy from markdown/spec
- WhatsApp links remain with placeholder `XXXXXXXXXX` until real number is provided

## Validation
- `npm run lint`
- `npm run build`
