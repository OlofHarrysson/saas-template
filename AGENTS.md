# Repository Guidelines

## Purpose & Template Intent

This repo is a reusable starter for fast project setup, not a single fixed product. Default behavior is retention-first: keep boilerplate modules in place (for example auth, analytics, and API scaffolding) unless removal is explicitly requested or a concrete implementation conflict requires it. The Python side is dual-purpose: it can run as a FastAPI backend, but it is also used for short scripts, exploratory analysis, and data preparation.

## Project Structure & Module Organization

- `website/src/app`: Next.js App Router pages (`(marketing)` and `(app)` route groups).
- `website/src/components`: reusable UI components.
- `website/src/lib`: shared app logic (auth, analytics, SEO, utilities).
- `website/public`: static files (icons, images, sitemap files).
- `website/backend/src/mycode`: Python codebase (API modules and utilities; also a good home for project scripts).
- `website/api/index.py`: Vercel Python entrypoint mounting FastAPI at `/python-api`.
- `website/template.env` and `website/backend/env.template`: environment variable templates.

## Tech Stack

- Frontend: Next.js 15, React 19, TypeScript (strict), Tailwind CSS, daisyUI.
- Auth/data integrations: Auth.js v5 (beta), Neon adapter, Resend, PostHog.
- Backend/runtime: Python 3.12, FastAPI, Uvicorn.
- Tooling: `uv` for Python env/deps, Ruff + pre-commit hooks, ESLint for Next.js/TypeScript.
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

- Runtime split: `/api/*` routes are Next.js (TypeScript) and `/python-api/*` routes are FastAPI (Python via Vercel).
- Command policy: avoid running long-lived commands unless explicitly requested; run short commands directly.
- Dependency updates: use package manager commands (`npm`, `uv`) instead of manually editing dependency files.
- Ambiguous phrasing can come from speech-to-text; ask one focused clarification only when needed to unblock.

## Frontend Conventions

- Prefer daisyUI components before custom Tailwind implementations when both are viable.
- Build mobile-first responsive layouts and validate desktop behavior.
- Use Lucide icons instead of inline SVGs.
- Keep frontend organization shallow (one level of grouping); avoid deep nesting.
- Use semantic theme pairs such as `primary`/`primary-foreground` backed by CSS variables.
- Use Zustand for shared global client state when global state is needed.

## Backend Conventions

- Use `pathlib` instead of `os.path`.
- Use modern Python type hints (`list[int]`, `dict[str, str]`, `X | None`).
- Prefer namespace imports over direct symbol imports when practical (`import functools` then `functools.cache`).
