# Spec-Driven Corrections v2

## Scope
Apply only requested corrections:
1. Replace typography system
2. Rebuild Moments carousel behavior with Embla
3. Restore hero image original color (remove filters/blue overlay)
4. Replace circular logo CSS/text with `/assets/logo.png` usage
5. Force CTA final button contrast styles

## Files to touch
- `app/layout.tsx`
- `app/globals.css`
- `app/page.tsx`
- `app/components/Galeria.tsx` (new)

## Asset aliases needed
- `/public/assets/sunset_copas.jpeg`
- `/public/assets/moodboard.jpeg`
- `/public/assets/polaroid_yoga.jpeg`
- `/public/assets/collage_viaje.jpeg`

## Validation
- `npm run build`
- Verify carousel drag/autoplay and hero color rendering
