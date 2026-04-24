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
- More context: `docs/project-vision.md`, `docs/project-log.md`

## Project Vision Template

Use `docs/project-vision.md` as the planning document for a new project.

It is intentionally a template, not a source of truth. Fill what you know, leave the rest empty or `TBD`, and revise it as the project becomes clearer.

This repo uses a two-tier project memory system:

- Tier 1: `AGENTS.md` keeps a compact working summary in `Active Project Context (Tier 1 Memory)`.
- Tier 2: `docs/project-vision.md` and other docs hold the fuller planning context and details.

## Project Log

Before starting meaningful work, read `docs/project-log.md` to understand recent context.

Use it as the running project diary for goals, decision rationale, tradeoffs, validation results, blockers, and follow-up. Add new dated sections at the bottom, but keep the currently active entry updated while that branch or feature is still in progress.

## Project Bootstrap Workflow (Agent Behavior)

When a new project is initialized from this template:

1. Open `docs/project-vision.md` first.
2. Ask a short batch of focused initialization questions to fill only missing, high-impact fields.
3. Update `docs/project-vision.md` with the answers and clearly labeled assumptions.
4. At the end of bootstrapping, update this AGENTS.md file and any docs. Make sure to remove unneeded "bootstrapping" instructions to finalize the bootstrapping phase.

## Purpose & Template Intent

This repo is a reusable starter for fast project setup, not a single fixed product. Default behavior is retention-first: keep boilerplate modules in place (for example auth, analytics, and API scaffolding) unless removal is explicitly requested or a concrete implementation conflict requires it. The Python side is dual-purpose: it can run as a FastAPI backend, but it is also used for short scripts, exploratory analysis, and data preparation.

## Documentation Index

Start here for repository documentation. Any new shared docs page should be added as a separate `docs/*.md` file and linked from the `Documentation Index` section in `AGENTS.md`.

- `AGENTS.md`: canonical documentation index, repository operating guidance, and the short active project summary.
- `docs/project-vision.md`: planning template for project idea, vision, MVP, risks, audience, business model, and early assumptions.
- `docs/project-log.md`: running project diary for notable implementation context, decisions, validation, failed attempts, and follow-ups.
- `docs/*.md`: shared project documentation pages such as architecture notes, decisions, workflows, and runbooks.
- `website/README.md`: app-level setup, runtime, and template notes for the Next.js/Vercel app.
- `website/backend/README.md`: Python/backend template setup and workflow notes.

## Project Structure & Module Organization

- `website/src/app`: Next.js App Router pages (`(marketing)` and `(app)` route groups).
- `website/src/app/globals.css`: Tailwind CSS 4 import plus daisyUI 5 theme/config; use this as the primary styling config entrypoint.
- `website/src/components`: reusable UI components.
- `website/src/lib`: shared app logic (auth, analytics, SEO, utilities).
- `website/public`: static files (icons, images, sitemap files).
- `website/backend/src/mycode`: Python codebase (API modules and utilities; also a good home for project scripts).
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
- `cd website && npm run build`: production build (includes sitemap generation).
- `cd website && npm run lint`: lint frontend.
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
