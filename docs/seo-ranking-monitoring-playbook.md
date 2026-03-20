# SEO Ranking Monitoring Playbook (Mientras Viajo)

## Objective
Track the real post-deploy evolution of `https://mientrasviajo.com` across:
- technical SEO readiness
- public indexation
- branded visibility
- non-branded search visibility
- LLM retrievability signals

This playbook is designed to work with the MCPs available in this workspace plus Google Search Console for real ranking data.

## What Each Source Tells You

### 1. SEO Crawler MCP
Use this for:
- technical SEO health
- crawlability
- internal link structure
- metadata issues
- canonical issues
- page depth and discoverability

It does **not** tell you:
- exact Google ranking
- impressions
- CTR
- keyword positions

### 2. Web Search
Use this for:
- checking whether pages appear publicly
- testing branded discoverability
- checking whether intent queries return your site

It does **not** tell you reliably:
- exact ranking position over time
- localization-sensitive ranking
- personalized or device-specific ranking

### 3. Google Search Console
Use this for:
- real impressions
- real clicks
- average position
- query-level performance
- page-level performance

This is the source of truth for actual positioning.

## Monitoring Cadence

### Day 0
Immediately after deploy:
- validate production SEO
- check that indexation files exist
- verify public HTML signals

### Day 2-3
First visibility check:
- see if homepage starts appearing for branded queries
- check whether `site:` returns URLs

### Day 7
Second visibility check:
- compare branded and non-branded appearance
- check if support pages start appearing

### Day 14
Early trend check:
- use Search Console if available
- compare which queries and URLs have impressions

### Weekly after that
- run technical crawl
- review Search Console
- compare query movement

## MCP Workflow

### A. Technical status
Run:
1. `seo_crawler.run_seo_audit(url="https://mientrasviajo.com")`
2. `seo_crawler.analyze_seo(crawlPath=...)`
3. `seo_crawler.query_seo_data(...)` for:
   - `canonical-issues`
   - `title-length`
   - `meta-description-length`
   - `missing-h1`
   - `duplicate-titles`
   - `broken-internal-links`

### B. Public indexation status
Run web searches for:
1. `site:mientrasviajo.com`
2. `site:www.mientrasviajo.com`
3. `"Mientras Viajo"`
4. `"Escapada Vol I" "Mientras Viajo"`

Interpretation:
- no results: likely not indexed yet or too weak
- homepage only: partial indexation
- homepage + internal pages: basic indexation is working

### C. Non-branded visibility
Run web searches for:
1. `"escapada para mujeres"`
2. `"escapada de fin de semana para mujeres"`
3. `"retiro para mujeres fin de semana"`
4. `"art and wine mujeres escapada"`
5. `"escapada naturaleza mujeres españa"`

Then test combined forms:
1. `"escapada para mujeres" "Mientras Viajo"`
2. `"escapada de fin de semana para mujeres" "Mientras Viajo"`
3. `"art & wine" "Mientras Viajo"`

Interpretation:
- appears only with brand included: branded recognition exists, but non-branded SEO is still weak
- appears without brand: query-level ranking is starting

### D. LLM SEO checks
Validate:
1. `https://mientrasviajo.com/llms.txt`
2. homepage source contains:
   - `Organization`
   - `WebSite`
   - `Event`
   - `FAQPage`
3. support pages exist and are crawlable:
   - `/sobre-mientras-viajo`
   - `/faq`
   - `/politica-de-cancelacion`
   - `/reservas`

Interpretation:
- if these exist, the site is much easier for answer engines and LLMs to interpret
- this still does not guarantee citations, but it improves retrievability

## Recommended Query Set

### Brand queries
- `Mientras Viajo`
- `Escapada Vol I`
- `Escapada Vol I Mientras Viajo`
- `mientrasviajo.com`

### Intent queries
- `escapada para mujeres`
- `escapada de fin de semana para mujeres`
- `retiro fin de semana mujeres`
- `escapada naturaleza mujeres`
- `art & wine mujeres`
- `viaje para mujeres fin de semana`

### Mixed queries
- `escapada para mujeres mientras viajo`
- `escapada vol i mujeres`
- `art and wine mientras viajo`
- `mientras viajo reservas`

## Search Console Setup

### Required setup
1. Add the property:
   - `https://mientrasviajo.com/`
2. Submit:
   - `https://mientrasviajo.com/sitemap.xml`
3. Verify indexing for:
   - `/`
   - `/faq`
   - `/sobre-mientras-viajo`
   - `/politica-de-cancelacion`
   - `/reservas`

### Reports to check
1. `Performance > Search results`
2. `Pages`
3. `Queries`
4. `Indexing > Pages`
5. `Sitemaps`

### Metrics to monitor
1. total impressions
2. total clicks
3. average CTR
4. average position
5. top queries
6. top pages

## What Good Progress Looks Like

### Stage 1
Within a few days:
- `site:mientrasviajo.com` starts returning pages
- homepage appears for brand queries

### Stage 2
Within 1-3 weeks:
- support pages get indexed
- impressions appear in Search Console
- branded CTR starts showing up

### Stage 3
Within 2-8 weeks:
- long-tail non-branded queries start generating impressions
- `faq` and `reservas` may capture informational intent
- event page/home starts gaining semantic relevance

## What To Compare: Before vs After

### Before deploy
- pages crawlable: `1`
- missing `robots.txt`
- missing `sitemap.xml`
- missing JSON-LD
- weak entity definition
- weak LLM retrievability

### After deploy
- pages crawlable: `5`
- `robots.txt`: live
- `sitemap.xml`: live
- `llms.txt`: live
- JSON-LD: live
- support pages: live
- stronger brand + event entity packaging

## Simple Weekly Scorecard

Use this template every week:

```text
Date:
Indexed pages visible via site: query:
Brand query visibility:
Non-branded query visibility:
Search Console impressions:
Search Console clicks:
Top query:
Top landing page:
Technical issues remaining:
Next action:
```

## Immediate Next Checks

### This week
1. Confirm Search Console property and sitemap submission
2. Re-check `site:mientrasviajo.com` after 48-72 hours
3. Re-run `seo_crawler` after any SEO change

### Next SEO iteration
If you want stronger non-branded positioning, the next work should be:
1. fix canonical consistency between apex and `www`
2. tighten homepage title length
3. expand support-page copy around search intent
4. add one image or visual asset to support pages
5. create a dedicated event-detail page if future editions will exist

## Key Limitation
Without Search Console, you can estimate visibility.
With Search Console, you can measure positioning.

Use MCPs to verify readiness and public presence.
Use Search Console to verify actual ranking.
