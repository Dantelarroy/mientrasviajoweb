# Spec-Driven Plan: LLM Entity Hardening (Mientras Viajo)

## Objective
Reduce ambiguous or speculative answers about `Mientras Viajo` in GPT-style systems by strengthening the public entity definition of the brand and making the canonical source unmistakable.

## Evidence
Observed failure pattern in an external GPT conversation:
- the model did not resolve `Mientras Viajo` as a clearly defined brand/entity
- it answered with speculative framing such as:
  - "mas bien una marca/comunidad"
  - "no siempre funciona como agencia formal"
  - "por lo que se ve en redes"
  - "depende mucho del grupo"
- the answer mixed generic travel-community archetypes with weak brand recognition

## Diagnosis
This is not just a ranking problem.
It is an entity-resolution problem.

The model likely lacked enough public, repeated, structured signals to confidently answer:
- what `Mientras Viajo` is
- which website is official
- what experience is currently offered
- where canonical facts live
- how booking works
- whether FAQs and policies exist

## Requirements
1. Make the canonical source explicit on-page.
2. Re-state “official website / official source” in visible copy, not only metadata.
3. Add high-confidence brand facts on the homepage.
4. Add explicit “source of truth” wording to the about page.
5. Enforce one canonical hostname with a redirect, not only canonical tags.
6. Keep titles and metadata concise enough to stay crawler-friendly.

## Implementation Plan
1. Shorten the homepage title to reduce title-length warnings.
2. Add a visible “facts” strip on the homepage:
   - official website
   - dates
   - booking channel
   - official Instagram
3. Add a visible official-source note on the homepage linking to:
   - about
   - reservations
   - FAQ
4. Expand `/sobre-mientras-viajo` with a “hechos clave” section.
5. Add host-level canonical consistency:
   - redirect `mientrasviajo.com` -> `www.mientrasviajo.com`

## Acceptance Criteria
1. The homepage explicitly states it is the official source for dates, reservations and conditions.
2. The about page explicitly states that the web is the canonical source of truth.
3. The site returns a real redirect from apex to `www`.
4. The homepage title falls below the current crawler warning threshold.
5. The site becomes easier to resolve as a defined entity even before external mentions grow.

## Notes
This does not guarantee that GPT immediately changes its answers.
It improves the probability that:
- crawlers index the right source
- answer engines resolve the right entity
- future model outputs rely less on archetype guessing and more on explicit brand facts
