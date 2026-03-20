# Spec-Driven Plan: SEO + LLM SEO Hardening (Mientras Viajo)

## Objective
Improve the organic search readiness and machine-readability of `https://www.mientrasviajo.com` without changing the visual design or interaction model of the landing page.

## Scope
- In scope:
  - Technical SEO
  - On-page SEO
  - Structured data
  - Crawlability and indexability
  - Trust and entity signals for LLMs / AI overviews / answer engines
- Out of scope:
  - Visual redesign
  - New visual sections that alter the current layout language
  - Performance refactors unrelated to SEO

## Audit Date
- 2026-03-18

## Sources Used
- Local code review in this repository
- Local crawl of `http://localhost:3001`
- Production header and HTML validation for `https://www.mientrasviajo.com`

## Current State

### What already exists
1. The site is live on HTTPS and returns `200`.
2. The homepage has:
   - a valid `<title>`
   - a valid meta description
   - a canonical URL
   - Open Graph tags
   - Twitter Card tags
   - one clear `h1`
   - descriptive image `alt` text on most key images
3. The page is indexable at the HTML level and is not blocked by `noindex`.
4. The page already has basic content sections that can support richer SEO without changing the design:
   - hero
   - experience
   - gallery
   - itinerary
   - FAQ
   - CTA

### Confirmed gaps
1. `robots.txt` is missing in production.
2. `sitemap.xml` is missing in production.
3. There is no JSON-LD structured data in the rendered HTML.
4. There are no explicit schemas for:
   - `Organization`
   - `WebSite`
   - `Event`
   - `FAQPage`
5. The meta description is present but short and weak for search intent capture.
6. The current metadata targets branding, but not enough query coverage around retreat intent:
   - escapada para mujeres
   - retiro de fin de semana
   - experiencia creativa / art & wine
   - escapada en naturaleza
7. The page has very few crawlable internal URLs, so there is almost no topical depth.
8. The site lacks machine-readable trust assets for LLMs:
   - no entity definition block
   - no organizer/about page
   - no cancellation/policies page
   - no facts page
   - no `llms.txt`
9. Security/SEO-adjacent headers are incomplete in production:
   - no `Content-Security-Policy`
   - no `X-Frame-Options`
   - no `Referrer-Policy`

### Crawl findings
- Local SEO crawler summary:
  - total pages crawled: `1`
  - issues found: `6`
  - medium: canonical issue on localhost, non-HTTPS localhost, missing CSP, missing X-Frame-Options
  - low: missing Referrer-Policy, short meta description
- Production validation clarifies:
  - HTTPS is correctly enabled
  - HSTS is enabled in production
  - `robots.txt` and `sitemap.xml` still return `404`
  - structured data is still absent in production

## Diagnosis

### SEO status
The homepage is not broken, but it is underdeveloped as a search asset. It has the minimum metadata to render correctly in browsers and social previews, but it lacks the crawl, schema, and content depth signals needed to compete for non-branded discovery.

### LLM SEO status
The biggest weakness is not classic HTML markup. It is the absence of clear entity packaging. Today the site does not expose a machine-readable model of:
- who organizes the experience
- what the experience is
- when it happens
- where it happens
- who it is for
- what is included
- how booking works
- what the cancellation rules are

That makes the site harder to quote, summarize, cite, or trust in AI-generated answers.

## What Must Improve

### Priority 0: Crawlability and indexing
1. Add `app/robots.ts` with:
   - allow rules for the public site
   - sitemap reference
2. Add `app/sitemap.ts` for the homepage and any new informational URLs created in this plan.
3. Keep canonical handling stable and environment-safe.
4. Preserve HTTPS production behavior and avoid staging URLs leaking into canonicals.

### Priority 1: Structured data
1. Add JSON-LD to the homepage for:
   - `Organization`
   - `WebSite`
   - `Event`
   - `FAQPage`
2. Ensure `Event` includes, when known:
   - name
   - description
   - start date
   - end date
   - organizer
   - image
   - url
   - audience
   - offers or reservation model
   - location or location type
3. Ensure `FAQPage` mirrors the visible FAQ content exactly.
4. If exact location is intentionally private, use a truthful high-level location strategy rather than fake precision.

### Priority 2: Search intent alignment
1. Expand title and description strategy to cover both brand and intent.
2. Keep the current emotional tone, but make the metadata more searchable.
3. Add clearer textual signals in existing copy for:
   - weekend retreat / escapada
   - women-only or women-centered experience
   - nature / rural house / pool
   - creativity / art & wine
   - gastronomy
4. Avoid keyword stuffing. This should be a copy refinement, not a redesign.

### Priority 3: Entity and trust pages
Create a small set of crawlable support pages with plain, factual content and no major design changes:
1. `/sobre-mientras-viajo`
   - who is behind the brand
   - purpose
   - organizer identity
   - contact references
2. `/faq`
   - expanded FAQ version of the current accordion
3. `/politica-de-cancelacion`
   - clear policy language
4. `/reservas`
   - how booking works
   - what happens after WhatsApp contact
5. Optional: `/escapada-vol-1`
   - a canonical event-detail page if the brand will host multiple editions later

These pages are useful for both Google and LLMs because they turn implicit knowledge into directly retrievable facts.

### Priority 4: LLM SEO layer
1. Add `/llms.txt` with:
   - short brand summary
   - key URLs
   - canonical preferred source URLs
   - concise facts about the event and company
2. Add an internal “facts” section in copy or a dedicated page that states:
   - event name
   - dates
   - intended audience
   - included experiences
   - booking channel
   - contact profile links
3. Add consistent entity naming across:
   - title
   - metadata
   - schema
   - footer
   - about page
4. Keep the event naming stable:
   - `Escapada Vol I`
   - `Mientras Viajo`
5. Make sure external references point back to the canonical domain:
   - Instagram bio link
   - future press mentions
   - partner pages

### Priority 5: Header hardening
Add production-safe headers in `next.config.ts`:
1. `Content-Security-Policy`
2. `X-Frame-Options`
3. `Referrer-Policy`
4. `Permissions-Policy`

This is not the main SEO lever, but it improves site quality and removes crawler warnings.

## Recommended Implementation Order

### Phase 1: Technical baseline
1. Add `app/robots.ts`
2. Add `app/sitemap.ts`
3. Add security headers in `next.config.ts`
4. Verify production responses:
   - `/robots.txt`
   - `/sitemap.xml`

### Phase 2: Schema and metadata
1. Refine `app/layout.tsx` metadata
2. Add homepage JSON-LD in `app/page.tsx`
3. Include:
   - `Organization`
   - `WebSite`
   - `Event`
   - `FAQPage`
4. Re-validate rendered HTML and rich results eligibility

### Phase 3: Searchable support pages
1. Create factual pages with existing visual system:
   - about
   - FAQ
   - cancellation policy
   - booking info
2. Link them from footer and sitemap
3. Keep copy concise, explicit, and citation-friendly

### Phase 4: LLM SEO packaging
1. Add `/llms.txt`
2. Add “brand facts” or “event facts” content block
3. Normalize entity wording across the full site
4. Review for consistency between visible text and schema

## Suggested File-Level Plan
1. `app/layout.tsx`
   - improve title/description strategy
   - add broader metadata consistency
2. `app/page.tsx`
   - inject JSON-LD
   - refine copy for intent coverage
3. `app/robots.ts`
   - new
4. `app/sitemap.ts`
   - new
5. `app/llms.txt/route.ts` or `public/llms.txt`
   - new
6. `next.config.ts`
   - add response headers
7. New routes:
   - `app/sobre-mientras-viajo/page.tsx`
   - `app/faq/page.tsx`
   - `app/politica-de-cancelacion/page.tsx`
   - `app/reservas/page.tsx`

## Copy Guidance
- Keep the tone warm and human.
- Add facts, not fluff.
- Prefer direct answers that work well in snippets and LLM extraction.
- Avoid vague phrases when a concrete fact can be stated.

### Examples of fact patterns to add
- “Escapada Vol I es una experiencia de fin de semana para mujeres organizada por Mientras Viajo.”
- “La edición actual se realiza del 15 al 17 de mayo.”
- “La reserva se gestiona por WhatsApp.”
- “La experiencia incluye alojamiento, desayunos, pileta, Art & Wine y una experiencia gastronómica.”

## Acceptance Criteria
1. Production serves:
   - `/robots.txt` with `200`
   - `/sitemap.xml` with `200`
2. Homepage source contains valid JSON-LD for:
   - `Organization`
   - `WebSite`
   - `Event`
   - `FAQPage`
3. Homepage metadata is rewritten for both brand and intent, not just branding.
4. Footer and sitemap expose at least 3 support URLs beyond the homepage.
5. Production headers include:
   - `Content-Security-Policy`
   - `X-Frame-Options`
   - `Referrer-Policy`
6. The site has a machine-readable source for LLM retrieval:
   - `llms.txt` or equivalent public facts endpoint
7. No visual redesign is required to complete any of the above.

## Risks
1. Event schema can become misleading if dates, location, or availability change and content is not updated.
2. If location privacy matters, schema should stay accurate without exposing sensitive detail.
3. If new support pages are too thin, they will add little SEO value. They must be factual and useful.
4. Dynamic metadata copy should not become unstable or misleading over time.

## Final Recommendation
Do not treat this as a “meta tags only” task. The homepage already has the basics. The real opportunity is to turn the brand and event into a well-defined entity set that search engines and LLMs can reliably parse, trust, and cite.
