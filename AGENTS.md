# Repository Guidelines

## Purpose & Template Intent
This repo is a reusable starter for fast project setup, not a single fixed product. Keep what is useful for the current project and delete what is not. The Python side is dual-purpose: it can run as a FastAPI backend, but it is also used for short scripts, exploratory analysis, and data preparation.

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
- Naming: `PascalCase` for React components/classes, `camelCase` for TS functions/vars, `snake_case` for Python modules/functions.

## Validation & Version Control (Solo)
- Default to lightweight validation: manual flow checks plus targeted linting.
- For API changes, at minimum verify `/`, `/health`, and changed endpoints.
- Use short, imperative commit messages (`fix auth callback`, `add survey block`).
- PR checklist requirements are optional unless collaborating externally.
