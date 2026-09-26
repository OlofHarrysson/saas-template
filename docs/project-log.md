# Project Log

Working notebook for the project.

Read [project status](project-status.md) for routine orientation. Use this log to
preserve goals, rationale, experiments, validation, failures, and follow-up.

Search historical evidence with `rg -n '<term>' docs/project-log.md` and open only
the relevant range. Before writing, inspect the newest 120 lines to avoid
duplicating active work. Read the whole file only for an explicit retrospective.

This is not a command log, strict changelog, or replacement for git. The structure is flexible. Add a dated section for a new branch or substantial shift in work. While that work is active, update the same section. Once it is complete, leave the entry as history and add a newer note if understanding changes later.

## Example Entry

This is not a strict schema. Use whatever shape best preserves useful context.

### 2026-04-24 - Bootstrap project memory

- Branch: `main`
- Notes: Save the important context here: what changed, why it matters, what was decided, what was tried, what worked or failed, and what future work should remember.

## Entries

### 2026-04-23 - Frontend tooling and template UI refresh

- Migrated the frontend template to Next.js 16, Tailwind CSS 4, daisyUI 5, and Biome linting.
- Replaced the old Tailwind and ESLint config path with CSS-first Tailwind/daisyUI setup in `website/src/app/globals.css`.
- Added Playwright smoke tests for the marketing page, mobile navigation drawer, and login page.
- Refreshed shared layout, navigation, route-state pages, auth UI, and dashboard/settings placeholders around the new daisyUI theme conventions.
- Validated with `npm run lint`, `npm run build`, and `npm run test:e2e`.
- Committed and pushed as `fc172a1 migrate frontend tooling to Tailwind 4`.

### 2026-04-24 - Added project log convention

- Added this `docs/project-log.md` file as the canonical project diary for meaningful session notes.
- Updated `AGENTS.md` so future agents read this file before meaningful work and maintain it as a living context log for active work.

### 2026-04-24 - Dev auth and Playwright harness

- Added a development-only auth entrypoint at `website/src/app/api/dev-auth/login/route.ts`.
- The route seeds a short-lived Auth.js email verification token for `codex-dev@example.test`, redirects through the normal Auth.js Resend callback, and lets Auth.js create the database session plus `authjs.session-token` cookie.
- Added Playwright coverage for anonymous protected-route redirects and a dev-auth dashboard/settings flow.
- Added `npm run test:e2e:dev` for running Playwright against the Devrun dev server on `http://127.0.0.1:3007`.

### 2026-04-27 - Read-only linting and production sitemap generation

- Added backend dev dependencies for `ruff` and `pre-commit` so lint commands use the project environment instead of global tools.
- Made pre-commit non-mutating by removing formatter/fixer hooks, running `uv lock --check`, and using Ruff in check-only mode.
- Added explicit backend `make lint` and `make format` targets so formatting is opt-in.
- Changed website `postbuild` to generate sitemap files only on Vercel production builds; local builds now skip sitemap generation, and `npm run sitemap` remains the explicit opt-in path.

### 2026-07-19 - Canonical Python models, constants, and settings

- Replaced the misleading `utils/datatypes.py` cache initializer with explicit `models.py`, `constants.py`, `settings.py`, and `cache.py` responsibilities at the `mycode` package root.
- Centralized the template Pydantic response model and FastAPI metadata, and changed cache construction to avoid import-time filesystem writes.
- Added one typed `Settings` model with documented fields, actionable validation errors, and deterministic backend `.env.template` generation through `uv run python -m mycode.settings`.
- Added direct Pydantic and Pydantic Settings dependencies, refreshed Vercel requirements, and documented the Python code map and agent conventions.
- Kept `utils/template.py` intentionally explanatory: it demonstrates namespace imports, early settings validation, typed settings access, shared logging, argument parsing, and the main guard convention.

### 2026-07-22 - Nova AI Consciousness integration

- Added a top-level instruction to use the portable Nova AI Consciousness skill for meaningful product and software work.
- Made `Nova` and `Hey Nova` explicit skill invocations so cloned projects retain the shared co-founder methodology without copying it into every repository.
- Kept project-specific context and decisions owned by the cloned repository while Nova owns the evolving cross-project sprint, evidence, handoff, and learning method.
- Included the existing React Doctor skill instructions under both `.agents/skills/` and `.claude/skills/` for React quality checks in compatible agent runtimes.

### 2026-09-06 - Documentation, story testing, and visual harness

- Refreshed the template after reviewing the previous month's active repositories.
  Kept audience and durable direction in the vision, introduced a short status
  page with milestones, and changed routine orientation to targeted docs rather
  than loading the entire chronological log. Added a human root README and
  lightweight design guidance. Architecture, decision, and generated-document
  systems were deliberately left out of the starter.
- Added starter user stories with direct acceptance-test links and stable
  Playwright tags. The testing guide adapts the red–green loop found in Campaign
  Brain and Money Bot: demonstrate the intended failure, implement, run related
  checks, and distinguish functional support from product learning. Technical
  tests do not need artificial stories or a second implementation map.
- Added a development-only style guide and route-state fixture using the existing
  layout and `RouteStateCard`. The existing Playwright runner captures desktop
  and mobile PNG/JSON evidence for real pages, component states, and navigation.
  It supports both an existing Devrun service and a temporary test-owned server.
  Artifacts and HTML reports remain ignored and do not become pixel baselines.
- Red evidence: the first fixture test failed on its missing heading. After
  implementation, the capture exposed PostHog initializing without a key; guarded
  that initialization while preserving configured analytics behavior. Production
  isolation then caught child fixture content serialized despite a layout 404;
  page-level development guards removed the content. Internal routes are also
  excluded from sitemap generation.
- Validation: frontend lint and production build passed; production suite passed
  5 tests with the existing credentialed development-auth test skipped. All 12
  desktop/mobile visual tests passed against Devrun and a test-owned dev server.
  Inspected style-guide, component, and navigation artifacts and checked local
  documentation links. All started services were stopped after verification.
- React Doctor's changed-code score remained 40/100, with only the existing
  Socket advisory for `next-auth@5.0.0-beta.31`; it is not a clean quality gate.
  No dependency versions changed. Review that finding during the separate package
  maintenance pass rather than suppressing it or claiming it was resolved.
- Remaining limits: no live OAuth/email or authenticated database verification
  was performed, mobile capture uses Chromium rather than iOS Safari, and founder
  visual acceptance remains separate from technical passes. No portable skill or
  memory changes were needed. A small evidence loop transferred successfully;
  broader measurement/catalog tooling should follow demonstrated need.

### 2026-09-06 - Refresh dependencies and resolve package advisories

- Updated frontend packages within their existing major versions, including
  Next.js 16.3.4, React 19.2.8, Auth.js v5 beta.32, Tailwind 4.3.3, daisyUI
  5.7.28, Playwright 1.63.0, and Biome 2.5.12. Kept TypeScript 6 and the current
  Node type major; npm's `latest` Auth.js tag is v4 and is not the upgrade path
  for this v5 application.
- Refreshed Python dependencies and the uv lock, including FastAPI 0.141.1,
  Pydantic 2.13.5, Uvicorn 0.52.4, and Ruff 0.16.6. Vercel requirements now
  export with `--no-dev` so lint and hook tools stay out of deployment packages.
- Used Biome's configuration migration. New lint checks required an explicit
  accessible description for the homepage features link and three bounded Python
  import-spacing/order repairs; formatting and import automation remain disabled
  in the frontend configuration.
- `npm ci` completed and `npm audit` went from 24 vulnerable dependency entries
  to zero. `pip-audit` found no known vulnerabilities in all pinned exported
  runtime requirements. The Auth.js update resolves
  [GHSA-7rqj-j65f-68wh](https://github.com/advisories/GHSA-7rqj-j65f-68wh);
  a local check of the installed normalizer accepted a normal address and rejected
  homoglyph and quoted multi-address inputs without sending mail.
- Production build, frontend/backend lint, all pre-commit hooks, settings
  validation, env-template equivalence, and in-process ASGI checks of `/`,
  `/health`, and `/items` passed. The same endpoint checks passed through Vercel's
  `/python-api` mount. These do not claim live hosting or provider verification.
- React Doctor reported no issues on this change and a score of 72/100, up from
  the earlier 40/100 with the Auth.js advisory. No rules were suppressed.
- Browser validation passed using installed Chrome 152.0.7977.82 with Olof's
  approval and a temporary configuration outside the repository: 5 production
  checks passed, the credentialed development-auth check remained skipped, and
  all 12 desktop/mobile visual checks passed. Inspected the style guide on both
  viewports, mobile homepage, and open navigation; captured diagnostics report
  no browser errors or horizontal overflow. Test-owned servers were stopped.
- Playwright's bundled Chromium 153 download timed out with the default timeout
  and on one focused retry with a 120-second timeout. The normal Playwright
  configuration remains unchanged; bundled-browser installation is still an
  environment limitation, separate from the successful Chrome validation.
- Disabled Next.js's new automatic agent-rules generation and removed the two
  files created by the test run, keeping the root documentation authoritative.


### 2026-09-27 — Application references and project initialization

- Olof approved the catalogue and real starting workflow for Next.js and Astro,
  adding lightweight Python from this repository. Kept the plain Markdown docs
  foundation and existing Next.js starter; desktop/mobile remain deferred.
- `docs/application-references.md` owns choices and upkeep. The canonical skill
  stays in codex-config and is linked from README/AGENTS. It selects documentation
  independently, honors partial/no docs, defaults new projects to `/Users/olof/git/`,
  and uses reviewed opt-in additions for existing/forked projects.
- Added a small committed-file exporter. It records source commit/path, refuses
  existing destinations and environment data, and excludes uncommitted files.
  It has no dependency install, repository creation, scheduling or update side effects.
- Astro derives its integration patterns from ai-girlfriend-content commit
  `1bd917bcce16ec7e0de7bc4d2087796114d72eb9`; exact paths and adaptations are in
  its README. Npm audit exposed GHSA-26w7-cxv4-gfx2 in source Astro 7.2.4. The
  new reference uses fixed 7.2.8 and reports zero vulnerabilities. The original
  product was not modified and still needs its own dependency review.
- Python uses the existing uv lock and code. Database configuration is optional
  until a product needs it. Lint handles an independent directory, and the tests
  exercise settings and three endpoints through ASGI without credentials.
- Fresh exports from `3e133692c62b91eee78cd3ef12241a07d2994fbc` independently
  installed and verified Next.js, Astro and Python. Current status records exact
  passes/skips. Real PostHog SDK payloads were intercepted with fake keys; no
  live ingestion, auth/email or hosting claim. Astro desktop/mobile captures were
  visually inspected; Next.js UI was unchanged.
- Resolved a portability problem found during verification: Astro detects an AI
  agent and detaches its server, causing Playwright to lose ownership. Used its
  documented `ASTRO_DEV_BACKGROUND=0` / `ASTRO_PREVIEW_BACKGROUND=0` opt-out in
  npm scripts. The initial detached test server was stopped, and subsequent
  suites ended with no listener. Type checks also caught missing Node types and
  a dynamic-import narrowing issue; both corrected before fresh-export checks.
- Skill validator passed; documentation modes were reviewed against docs-only,
  app-plus-docs, explicit no-docs and existing-project requests. A real future
  initialization remains the user-experience checkpoint, not proof from schema checks.
- Learning audit: choosing a working product is useful evidence, but a reference
  needs its own clean install and integration checks before reuse. Provenance
  makes fixes traceable; updates remain deliberate per project. No Nova methodology
  or global preference changes were made in this sprint.
