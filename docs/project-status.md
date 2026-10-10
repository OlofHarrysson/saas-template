# Project status

10 October 2026.

## Current outcome

The template provides independently selectable documentation and Next.js, Astro
and Python application references. The catalogue and initializer own selection,
exports and adaptation; new projects receive their own context and milestones.
Coding conventions live outside the compact `AGENTS.md`.

The Next.js reference uses Next.js 16.4.0 and built-in `sitemap.ts` / `robots.ts`
routes. SEO metadata and crawl metadata share `siteConfig.domain`. The sitemap
contains an explicit list of public pages; update that list when pages change.
The external generator, post-build step and checked-in sitemap output are removed.
Current Next.js npm audit reports zero vulnerabilities.

## Latest verification — reference commit `c3e3e07`

- The two new crawl-metadata tests first failed against the old output: the
  sitemap was an index and robots used a different domain from the SEO config.
  Both pass with the built-in routes and the configured public-page list.
- Production build, seven smoke/crawl/isolation checks and one intercepted
  analytics check passed with the change. Credentialed auth remained skipped.
- A fresh committed export independently passed npm ci, lint, production build,
  both crawl-metadata checks and npm audit (zero findings).
- React Doctor stayed at 54/100 with the same ten existing findings on clean
  source snapshots. No rules were suppressed. Test servers stopped.
- No visual UI changed in this pass. The preceding dependency update passed all
  12 visual checks with inspected desktop/mobile evidence. Astro and Python's
  previous full export checks are recorded in the [project log](project-log.md).

## Evidence limits

Checks used a generated local auth secret, fake/intercepted analytics and an
existing cached browser. Fresh-machine browser download, live authentication,
email, analytics ingestion and hosting remain unverified. The throwaway Focus
Notes initialization established a working scaffold, not notes functionality,
privacy guarantees or product usefulness.

## Next checkpoint

Use the initializer on a real product and validate the integrations it actually
needs. A separate shared sitemap tool is an idea for later scoping; no package
or Astro migration is underway. Identify a concrete failing scenario before
adding another generator to maintain.

The [catalogue](application-references.md) owns reference choices and commands;
the [log](project-log.md) preserves earlier validation and decisions.
