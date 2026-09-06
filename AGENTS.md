# Repository Guidelines

## Active Project Context (Tier 1 Memory)

Keep this section short and high signal.

This is the first-pass memory for the current project: only the minimum context needed to understand what we are building and how to prioritize. Skip anything low-value, unstable, or obvious. For deeper planning context, read `docs/project-vision.md` and other project docs.

- Project: `TBD`
- What we are building: `TBD`
- Current focus: `TBD`
- Biggest current risk / unknown: `TBD`
- Who this is for: `TBD`
- Key constraint or important context: `TBD`
- More context: `docs/project-vision.md`, `docs/project-status.md`, `docs/user-stories.md`

For routine orientation, read `README.md` and `docs/project-status.md`, then
only the documents relevant to the task. The vision owns durable direction;
status owns current milestones. Read relevant user stories before changing
user-facing behavior, `docs/testing.md` for the red–green loop, and `DESIGN.md`
before visual work. Verify current behavior in source and tests.

## Nova AI Consciousness Skill

Before meaningful product or software work, use the Nova AI Consciousness skill (`$nova-ai-consciousness`) when it is available. Saying `Nova` or `Hey Nova` explicitly invokes the skill.

The skill is Olof's current portable AI co-founder identity and product-building method: right-sized agent sprints, evidence-led development, educational human handoffs, and reversible learning audits. Keep project-specific facts and decisions in this repository; do not duplicate Nova's portable methodology here. If the skill is unavailable, continue with this repository's guidance and tell Olof that the Nova AI Consciousness skill could not be loaded.

## Project Vision Template

Use `docs/project-vision.md` as the planning document for a new project.

It is intentionally a template, not a source of truth. Fill what you know, leave the rest empty or `TBD`, and revise it as the project becomes clearer.

This repo uses a two-tier project memory system:

- Tier 1: `AGENTS.md` keeps a compact working summary in `Active Project Context (Tier 1 Memory)`.
- Tier 2: `docs/project-vision.md` and other docs hold the fuller planning context and details.

## Project Log

Use `docs/project-log.md` for historical evidence, not routine orientation.
Search it with `rg -n '<term>' docs/project-log.md` and read the matching range.
Inspect the newest 120 lines before adding an entry. Read the whole log only for
an explicit retrospective. Keep an active entry updated; append a dated entry
when moving to a new substantial outcome. Preserve goals, rationale, validation,
failures, and follow-up rather than routine command output.

## Project Bootstrap Workflow (Agent Behavior)

When a new project is initialized from this template:

1. Open `docs/project-vision.md` first.
2. Ask a short batch of focused initialization questions to fill only missing, high-impact fields.
3. Update `docs/project-vision.md` with answers and explicit assumptions. Keep audience there.
4. Replace template status and starter stories with the first product milestone,
   its observable acceptance criteria, and the next checkpoint. Keep near-term
   milestones in `docs/project-status.md` until a separate plan earns its place.
5. Update the compact context in this file and relevant setup/design defaults.
   Remove completed bootstrap instructions in the initialized product; retain
   them while maintaining this reusable template.

## Purpose & Template Intent

This repo is a reusable starter for fast project setup, not a single fixed product. Default behavior is retention-first: keep boilerplate modules in place (for example auth, analytics, and API scaffolding) unless removal is explicitly requested or a concrete implementation conflict requires it. The Python side is dual-purpose: it can run as a FastAPI backend, but it is also used for short scripts, exploratory analysis, and data preparation.

## Documentation Index

Start here for repository documentation. Shared topic pages live under `docs/`
and are linked below; root `README.md`, `AGENTS.md`, and `DESIGN.md` own entry
points, contributor guidance, and visual intent respectively.

- `AGENTS.md`: canonical documentation index, repository operating guidance, and the short active project summary.
- `README.md`: human entry point and project initialization pointers.
- `docs/project-vision.md`: planning template for project idea, vision, MVP, risks, audience, business model, and early assumptions.
- `docs/project-status.md`: short current outcome, active milestone, uncertainty, and next checkpoint.
- `docs/user-stories.md`: important user/operator outcomes, acceptance criteria, and direct evidence links.
- `docs/testing.md`: red–green workflow, story selection, validation commands, and evidence boundaries.
- `DESIGN.md`: visual direction, styling ownership, references, and review workflow.
- `docs/design-harness.md`: development-only style guide, deterministic fixtures, and Playwright capture/review workflow.
- `docs/project-log.md`: running project diary for notable implementation context, decisions, validation, failed attempts, and follow-ups.
- Add shared docs only when they have a distinct job; avoid duplicating status,
  acceptance criteria, commands, or component inventories across files.
- `website/README.md`: app-level setup, runtime, and template notes for the Next.js/Vercel app.
- `website/backend/README.md`: Python/backend template setup and workflow notes.

## Project Structure & Module Organization

- `website/src/app`: Next.js App Router pages (`(marketing)` and `(app)` route groups).
- `website/src/app/globals.css`: Tailwind CSS 4 import plus daisyUI 5 theme/config; use this as the primary styling config entrypoint.
- `website/src/components`: reusable UI components.
- `website/src/lib`: shared app logic (auth, analytics, SEO, utilities).
- `website/public`: static files (icons, images, sitemap files).
- `website/backend/src/mycode`: Python codebase for API modules, scripts, shared models, settings, constants, and infrastructure helpers.
- `website/backend/src/mycode/models.py`: canonical home for reusable Pydantic models and shared type definitions.
- `website/backend/src/mycode/constants.py`: stable, code-controlled defaults and invariant values.
- `website/backend/src/mycode/settings.py`: typed environment configuration and the `.env.template` generator.
- `website/backend/src/mycode/cache.py`: lazy construction of the shared joblib disk cache.
- `website/api/index.py`: Vercel Python entrypoint mounting FastAPI at `/python-api`.
- `website/.env.template` and `website/backend/.env.template`: environment variable templates.

## Tech Stack

- Frontend: Next.js 16, React 19, TypeScript (strict), Tailwind CSS 4, daisyUI 5.
- Auth/data integrations: Auth.js v5 (beta), Neon adapter, Resend, PostHog.
- Backend/runtime: Python 3.12, FastAPI, Uvicorn.
- Tooling: `uv` for Python env/deps, Ruff + pre-commit hooks, Biome for frontend JS/TS linting.
- Deployment target: Vercel (Next.js + Python function routing).

## Build and Development Commands

- `cd website && npm run dev`: run frontend locally.
- `cd website && npm run build`: production build (sitemap generation runs automatically only on Vercel production builds).
- `cd website && npm run lint`: lint frontend.
- `cd website && npm run test:e2e`: production smoke and route-isolation checks.
- `cd website && npm run design:capture`: desktop/mobile rendered evidence from a development server.
- `cd website/backend && uv sync`: install/sync Python dependencies.
- `cd website/backend && make start_api`: run FastAPI service on `localhost:8080`.
- `cd website/backend && uv run python path/to/script.py`: run ad hoc Python scripts.

## Coding Philosophy & Style

- Write the simplest code that works, then refactor when needed.
- Optimize for rapid iteration and quick feedback loops.
- Fail fast when assumptions are wrong; avoid unnecessary defensive layers unless explicitly requested.
- Prefer clear core logic over abstraction-heavy designs.
- Do not proactively prune unused boilerplate. If a module is not needed now, leave it unless it blocks the requested task.
- Naming: `PascalCase` for React components/classes, `camelCase` for TS functions/vars, `snake_case` for Python modules/functions.

## Validation & Version Control (Solo)

- Default to lightweight validation: manual flow checks plus targeted linting.
- For changed user-facing behavior, update the story, demonstrate a failing
  acceptance test, implement the smallest fix, then run related checks. Technical
  tests do not require story IDs. `docs/testing.md` owns this workflow.
- Visual work includes inspected desktop/mobile evidence; technical passes do
  not substitute for founder taste. Keep generated captures out of Git.
- For API changes, at minimum verify `/`, `/health`, and changed endpoints.
- Use short, imperative commit messages (`fix auth callback`, `add survey block`).
- PR checklist requirements are optional unless collaborating externally.

## Additional Conventions

- Documentation lives in the root `docs/` folder.
- Runtime split: `/api/*` routes are Next.js (TypeScript) and `/python-api/*` routes are FastAPI (Python via Vercel).
- Command policy: avoid running long-lived commands unless explicitly requested; run short commands directly.
- Dependency updates: use package manager commands (`npm`, `uv`) instead of manually editing dependency files.
- Ambiguous phrasing can come from speech-to-text; ask one focused clarification only when needed to unblock.

## Frontend Conventions

- Prefer daisyUI components before custom Tailwind implementations when both are viable.
- Keep Tailwind/daisyUI styling config in `website/src/app/globals.css`.
- Default to the built-in daisyUI `dark` theme unless a project-specific theme decision is documented.
- Build mobile-first responsive layouts and validate desktop behavior.
- Use Biome for frontend linting; formatting and import-organizing are intentionally disabled unless the project explicitly opts in.
- Use Lucide icons instead of inline SVGs.
- Keep frontend organization shallow (one level of grouping); avoid deep nesting.
- Token hierarchy: use daisyUI theme values for semantic UI colors and component-system values, Tailwind `@theme` for extra reusable utility tokens, and app-specific CSS variables only for domain/layout-specific values.
- Prefer daisyUI semantic theme colors (`base-*`, `primary`, `secondary`, `accent`, `*-content`) over custom parallel token systems.
- Current examples in `globals.css`: Tailwind utility tokens like `font-display`/`shadow-glow`, and app-specific layout tokens like `--app-navbar-height`.
- Use Zustand for shared global client state when global state is needed.

## Backend Conventions

- Use `pathlib` instead of `os.path`.
- Use modern Python type hints (`list[int]`, `dict[str, str]`, `X | None`).
- Prefer namespace imports over direct symbol imports when practical (`import functools` then `functools.cache`).
- Put reusable Pydantic models and shared type definitions in `mycode/models.py`; import them instead of redefining equivalent local schemas.
- Put code-controlled defaults, hyperparameters, paths, and invariant values in `mycode/constants.py`. Constants must not read environment variables or perform I/O.
- Access environment-controlled values through the single `mycode.settings.Settings` model and `get_settings()`, not scattered `os.environ` or `dotenv` calls.
- Define every settings field with an explicit environment-variable alias and useful description. Regenerate `website/backend/.env.template` with `uv run python -m mycode.settings` after changing the model.
- Keep resource construction and side effects out of constants and models; for example, cache directory creation belongs in `mycode/cache.py`.
- Start non-trivial Python modules with a concise module docstring that explains the file's intended responsibility.
