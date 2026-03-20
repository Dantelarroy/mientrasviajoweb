# Spec-Driven Plan: Invisible SEO + LLM SEO Hardening (Mientras Viajo)

## Objective
Improve SEO and LLM SEO for `Mientras Viajo` without changing the visible experience of the main landing page.

The homepage must keep its current visual composition and conversion flow. All reinforcement should happen through:
- technical SEO
- structured data
- canonical behavior
- machine-readable public text
- support/entity pages outside the main landing experience

## Problem Statement
Current evidence suggests that GPT-style systems do not resolve `Mientras Viajo` as a strong, well-defined entity. The brand is still vulnerable to vague or speculative answers.

This is not only a ranking issue.
It is also an entity-definition issue.

The solution should avoid visible front-page changes while still strengthening the brand’s public semantic footprint.

## Constraints
- Do not modify the main landing page visually.
- Do not add visible informational blocks to the homepage hero, FAQ, or CTA sections.
- Do not alter the conversion-oriented structure of the homepage.
- Prefer changes that are either:
  - invisible to normal users, or
  - isolated to secondary URLs

## In Scope
- metadata refinement
- JSON-LD refinement
- canonical and redirect consistency
- `robots.txt`
- `sitemap.xml`
- `llms.txt`
- support/entity pages in separate routes
- low-visibility footer/link strategy if needed

## Out of Scope
- visual redesign
- visible homepage facts modules
- changing homepage hierarchy to accommodate SEO blocks
- new promotional sections on the landing page

## Guiding Principle
The homepage remains the commercial surface.
The entity-definition layer lives underneath it.

## Strategy

### Layer 1: Invisible technical layer
Strengthen all non-visual SEO signals:
1. Canonical hostname consistency
   - choose one public hostname
   - redirect the other with `308` / `301`
2. Keep `robots.txt` live
3. Keep `sitemap.xml` live
4. Keep `llms.txt` live
5. Maintain production-safe security headers
6. Keep metadata aligned with canonical URLs

### Layer 2: Invisible semantic layer
Strengthen machine understanding without UI changes:
1. Improve JSON-LD on the homepage
   - `Organization`
   - `WebSite`
   - `Event`
   - `FAQPage`
2. Ensure schema fields are explicit and stable:
   - brand name
   - event name
   - dates
   - booking method
   - official social profile
   - organizer
3. Keep names consistent across metadata and schema

### Layer 3: Secondary factual URLs
Create separate routes that search engines and LLMs can crawl without changing the homepage:
1. `/sobre-mientras-viajo`
2. `/faq`
3. `/reservas`
4. `/politica-de-cancelacion`
5. Optional dedicated entity/facts route:
   - `/brand`
   - `/official`
   - `/hechos`

These pages should contain explicit, citation-friendly facts such as:
- what `Mientras Viajo` is
- what `Escapada Vol I` is
- who it is for
- what it includes
- how booking works
- where official information lives

### Layer 4: LLM-specific source of truth
Use `llms.txt` as the public machine-readable summary of:
- official brand name
- official URLs
- event facts
- booking method
- citation preferences

This should be treated as a compact, authoritative reference for answer engines.

## Execution Plan

### Phase 1: Preserve homepage, improve invisible layer
1. Keep homepage visuals unchanged
2. Audit and refine:
   - `metadata`
   - JSON-LD
   - canonicals
   - redirects
   - `robots.txt`
   - `sitemap.xml`
   - `llms.txt`

### Phase 2: Build factual routes off the main path
1. Create or improve support pages
2. Make their copy more explicit and factual
3. Avoid homepage-level visual promotion if not desired
4. Include those URLs in sitemap

### Phase 3: Add an optional low-visibility entity page
Create one dedicated source page that clearly states:
- `Mientras Viajo` is the official organizer
- `Escapada Vol I` is the current event
- official reservation channel is WhatsApp
- official Instagram handle
- official FAQ and policy URLs

This page can exist with minimal navigation exposure.

### Phase 4: Monitor public understanding
After deployment:
1. Re-run SEO crawler
2. Check `site:` visibility
3. Re-test branded questions in public search and LLMs
4. Compare whether answers become less speculative

## Recommended Information Architecture

### Homepage
- no visible new SEO blocks
- keep current conversion experience
- schema and metadata only

### Footer
Option A:
- keep existing discreet support links

Option B:
- reduce visibility further and rely on sitemap + direct routes

### Support URLs
- factual and explicit
- warm tone is fine
- avoid vague lifestyle language where a fact can be stated

## File-Level Plan

### Keep as invisible/technical
1. `app/layout.tsx`
   - metadata
2. `app/page.tsx`
   - JSON-LD only
3. `next.config.ts`
   - headers
4. `proxy.ts`
   - canonical host redirect
5. `app/robots.ts`
6. `app/sitemap.ts`
7. `app/llms.txt/route.ts`

### Keep as secondary semantic layer
1. `app/sobre-mientras-viajo/page.tsx`
2. `app/faq/page.tsx`
3. `app/reservas/page.tsx`
4. `app/politica-de-cancelacion/page.tsx`

### Optional new file
1. `app/official/page.tsx`
   - compact official facts page

## Acceptance Criteria
1. The homepage remains visually unchanged.
2. Technical SEO remains improved:
   - `robots.txt` live
   - `sitemap.xml` live
   - `llms.txt` live
   - canonical redirect active
3. The homepage still contains strong schema without any visible SEO block additions.
4. Secondary routes contain explicit facts that define the entity clearly.
5. Search engines and LLMs have a public source of truth outside the homepage.
6. No homepage conversion components are disrupted.

## Success Definition
Success is not “the homepage looks different”.
Success is:
- the brand becomes easier to resolve as a defined entity
- the site remains visually intact
- the semantic and technical layer gets stronger
- GPT-style systems have less room to guess

## Recommended Next Implementation
If this plan is executed, the next best step is:
1. keep the homepage untouched
2. strengthen only schema/metadata/llms
3. create one dedicated official facts route
4. monitor whether future AI answers become more precise
