# Project status

21 October 2026.

## Astro footer and visual direction

The Astro reference now includes a shared footer and configurable Made by Olof
wordmark with portrait. Component usage lives in its README. Design guidance
chooses the product direction before page styling. Astro check/build and eight
existing browser tests passed (two analytics-mode skips); desktop/mobile footer
captures were inspected. Next.js remains unchanged.

## Browser analytics exclusion

Both web references now persist `?analytics=off` in the shared
`olof_analytics_consent` parent-domain cookie before automatic capture. Setup
preserves other URL parameters and fragments. Next.js reference browser tests
passed (2); Astro enabled-analytics desktop/mobile tests passed (10). Fresh
exports of `36eaf6e` passed the same checks: Next.js with a clean npm install,
Astro with the existing dependency installation. Export isolation also passed.
Application READMEs own setup, cookie scope and reset instructions.

## Current outcome

The template provides independently selectable documentation and Next.js, Astro
and Python application references. The catalogue and initializer own selection,
exports and adaptation; new projects receive their own context and milestones.
Coding conventions live outside the compact `AGENTS.md`; app READMEs own setup.

Both web references use one product name, description and hostname for site
identity, including homepage `WebSite` structured data and page-specific canonical
and Open Graph URLs. Root domains and product subdomains use the same setup.
Next.js also shares that hostname with its built-in sitemap and robots routes.
Astro's reference still has no sitemap generator. No new package was introduced.

## Latest verification — reference commit `7067eb3`

- New identity checks failed against the old output, then passed after implementation.
  Next.js lint, production build and nine browser checks passed; credentialed auth
  remained skipped. Astro type checks, build and eight desktop/mobile checks passed.
- Fresh committed exports passed checks with `mytool.example.com` and a product
  name containing HTML-like characters: four Next.js identity/crawl checks and
  eight Astro checks. Parsed structured data retained the name and exact subdomain;
  inner-page canonicals retained their own paths without tracking parameters.
- React Doctor's changed-source scan reported no new findings. Export isolation
  and 85 local documentation links/anchors passed. Temporary exports were removed
  after review; test servers stopped.

## Previous setup review

The documentation initialization trial from `17d8278` produced 15 adapted Markdown
files with 57 valid local links. Fresh install, lint, build, browser, intercepted
analytics and visual checks passed. Final review found no blocking setup defect;
all six throwaway folders were removed at Olof's request. Detailed decisions,
older runtime checks and validation limits remain in the [project log](project-log.md).

## Evidence limits

These are local build/browser checks with cached Chromium and no live provider
credentials. Search-engine indexing and Google's final displayed site name are
unverified. Fresh-machine browser download, live authentication, email, analytics
ingestion and hosting remain unverified. The setup trials established working
scaffolds, not product functionality or usefulness.

## Next checkpoint

Use the reviewed setup on the next real project and configure its production
identity before publishing. Bring back concrete friction. The separate shared
sitemap-tool idea remains deferred until there is a concrete failing scenario.

The [catalogue](application-references.md) owns reference choices and commands;
the [log](project-log.md) preserves earlier validation and decisions.
