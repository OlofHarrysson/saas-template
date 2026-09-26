# Astro reference

Small static website with TypeScript, Tailwind 4, daisyUI's dark theme and optional
PostHog pageviews. Node 22.19+ is required.

```sh
npm ci
npm run check
npm run build
npm test
```

Use Devrun for interactive `npm run dev` sessions. Playwright owns its finite
test server. The npm scripts opt out of Astro’s automatic agent background mode
so Devrun and Playwright retain process ownership. Install its browser with `npx playwright install chromium` if needed.
Tests intercept analytics locally with a fake key; no events reach PostHog.

Copy `.env.template` to `.env` when configuring a deployment. Analytics requires
a production build, a public project key and `PUBLIC_ANALYTICS_ENABLED=true`.
Development and default preview builds stay quiet. `?analytics=off` suppresses
initialization for that page load; it is not a persistent consent system.
Only automatic pageviews are enabled. Recording and autocapture are disabled.
Consent requirements and product events must be decided in the new project.

Validate enabled, missing-key and development boundaries separately:

```sh
REFERENCE_ANALYTICS_MODE=enabled npm test
REFERENCE_ANALYTICS_MODE=no-key npm test
REFERENCE_ANALYTICS_MODE=dev npm test
```

## Source and deliberate adaptations

Derived from `OlofHarrysson/ai-girlfriend-content` commit
`1bd917bcce16ec7e0de7bc4d2087796114d72eb9`: `apps/site/astro.config.mjs`,
`src/styles/global.css`, `src/scripts/instrumentation-client.ts`, and
`tests/design/analytics.spec.ts` under that app. Retains the Tailwind Vite plugin,
CSS plugin setup and guarded PostHog dynamic import. Replaces the product's theme,
domain, deployment metadata and reading/newsletter events with neutral defaults.
No CMS, content, secrets, admin routes or deployment account is copied.

Astro was advanced from the source's 7.2.4 to patched 7.2.8 because of
[GHSA-26w7-cxv4-gfx2](https://github.com/advisories/GHSA-26w7-cxv4-gfx2).
This is now a maintained reference, not an automatically synced copy of the product.
The package lock owns exact versions. See the parent template catalogue for
verification dates and limitations.
