# Project status

10 October 2026.

## Current outcome

Agent guidance now points to separate shared, Python and TypeScript coding
conventions. Initialization keeps optional documentation links consistent, and
application READMEs contain the setup/check commands needed for standalone exports.

The documentation foundation now supports independent Next.js, Astro and Python
application selection through the canonical initialization skill. The catalogue
and committed-file exporter record each new project's reference revision. Partial
or no documentation and opt-in additions to existing/forked projects are supported
by the skill. New repositories default directly to `/Users/olof/git/`.

The existing Next.js app remains intact. Astro has a small maintained reference;
Python reuses the existing backend without requiring database credentials.
Desktop/mobile references and automatic updates to existing projects are deferred.

Website initialization asks Olof to choose Next.js or Astro unless already agreed.
Mac desktop/menu bar apps default to Electron with Tailwind, daisyUI and a design
harness. Python/uv supports standalone APIs, scripts and ML/data work, or can be
paired with another app when useful; external API calls alone do not require it.

## Setup trial — reference commit `0629d2e`, 10 October 2026

- An independent subagent initialized Focus Notes in the locally ignored
  `.dogfood/focus-notes/` folder, adapted project documentation and basic identity,
  and preserved the full starter without implementing notes functionality.
- Fresh npm install, lint, production builds, five smoke tests and one intercepted
  analytics test passed. The credentialed auth test remained skipped.
- Blank `AUTH_SECRET` caused two login capture failures despite green smoke tests.
  Generating a local secret resolved the errors; all 12 visual tests then passed.
  Desktop/mobile captures were inspected. The README now explains the local
  secret, optional Python setup and explicit local sitemap regeneration.
- Browser installation timed out; tests used an existing cached headless browser.
  Installation on a machine without that cache remains unverified.
- Current npm audit reports eight affected package entries (one critical, six
  high, one low), including Next.js. Dependencies were not changed in this trial;
  review and resolve advisories before deploying a new project from this reference.
- All test servers stopped. No live providers or deployment were exercised.
  Export isolation, standalone README links and initialization-skill validation passed.

## Earlier verification — reference commit `3e13369`, 27 September 2026

- Fresh Next.js export: clean npm install/audit, lint, production build, five
  public-flow/isolation checks and one intercepted PostHog pageview test passed.
  One credentialed authentication test was skipped. Unconfigured auth session
  requests report the expected missing trusted-host configuration; live login
  still needs the new project's Auth.js environment settings.
- Astro: check/build and 16 desktop/mobile browser checks passed across disabled,
  enabled, missing-key and development modes. Screenshots were inspected. A fresh
  export independently installed and repeated disabled/enabled checks. Audit: zero
  reported vulnerabilities after advancing Astro to patched 7.2.8.
- Fresh Python export: locked uv install, two tests (settings and three ASGI
  endpoints), Ruff and the example CLI passed without credentials.
- Export isolation test and skill structure validation passed. Exported source
  records match `3e133692c62b91eee78cd3ef12241a07d2994fbc`.
- All test-owned servers stopped. No deployment or live analytics/provider tests.

## Next checkpoint

Resolve the Next.js dependency audit, then use `$initialize-project` for a real
new project and review its chosen scope. The throwaway trial validates local
setup and documentation adaptation, not real authentication or product usefulness.
The catalogue is [here](application-references.md); [the log](project-log.md) records
source provenance, resolved issues and evidence limits. The [vision](project-vision.md)
remains a template for the next product.
