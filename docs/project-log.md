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
