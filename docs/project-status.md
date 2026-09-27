# Project status

27 September 2026.

## Current outcome

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

## Verification — reference commit `3e13369`

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

Use `$initialize-project` for a real new project and review its chosen scope.
The catalogue is [here](application-references.md); [the log](project-log.md) records
source provenance, resolved issues and evidence limits. The [vision](project-vision.md)
remains a template for the next product.
