# Project Log

Working notebook for the project.

Read this before meaningful work. Use it to preserve the context future contributors need: goals, decisions, rationale, experiments, validation results, blockers, dead ends, and follow-up.

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
