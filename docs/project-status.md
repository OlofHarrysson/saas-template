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
The 10 October Next.js npm audit reported zero vulnerabilities.

Documentation now separates shared working guidance from each app's setup and
commands. Next.js-only harness instructions are scoped explicitly; Astro and
Python READMEs remain usable after export. Auth setup includes the required
database schema. React Doctor uses current CLI flags and one shared skill file.

## Latest initialization trial — source commit `17d8278`

A separate agent created `/Users/olof/git/saas-template-docs-trial` as a local-only
Pocket List example (local commit `7985d5b`). Its 15 Markdown documents distinguish
planned product behavior from the retained starter. Independent review confirmed
all 57 local links/anchors resolve, no template maintenance history or obsolete
stack paths were inherited, and application source matches the export.

Fresh installation, lint, production build, seven browser checks, one intercepted
analytics check and 12 visual checks passed. The credentialed auth check was
skipped as requested. No blocking setup defect was found. A final review repeated
the documentation, lint, build and seven browser checks successfully. At Olof's
request, the trial and five older throwaway snapshots were then removed, including
their raw logs and screenshots. The [project log](project-log.md) preserves the
findings and validation summaries. No test servers remain running.

## Sitemap migration verification — reference commit `c3e3e07`

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

Use the reviewed setup on the next real project and bring back concrete friction.
No additional documentation or setup tooling is needed from this trial.
A separate shared sitemap tool is an idea for later scoping; no package
or Astro migration is underway. Identify a concrete failing scenario before
adding another generator to maintain.

The [catalogue](application-references.md) owns reference choices and commands;
the [log](project-log.md) preserves earlier validation and decisions.
