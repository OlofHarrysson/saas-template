# SaaS Boilerplate (AI Operator README)

This template is designed for fast MVP shipping. Treat it as a starting point, not a fixed product.
Default behavior: keep optional boilerplate in place and ignore unused parts unless removal is explicitly requested.

## What Is Included

- Next.js 15 + React 19 + TypeScript (strict)
- Tailwind CSS + daisyUI theme setup
- Auth.js v5 (beta) with Google OAuth + Resend magic-link login
- Neon adapter for Auth.js session/user storage
- PostHog client + server utilities with proxy rewrites
- SEO helper and sitemap generation
- FastAPI backend (Python 3.12) for API endpoints and scripts
- Vercel Python routing via `/python-api/*`

## Project Map

```text
website/
  src/
    app/
      (marketing)/                 # Public pages: landing, login, about, terms, privacy
      (app)/                       # Authenticated app area (dashboard)
      api/auth/[...nextauth]/      # Auth.js route handlers
      layout.tsx                   # Root layout + SessionProvider
      site-config.ts               # Global app metadata/config
    components/                    # UI components (navbar, footer, auth forms)
    lib/
      auth/                        # Auth.js config + server/client auth helpers
      posthog/                     # Server-side PostHog client wrapper
      navigation.ts                # Marketing/app nav definitions
      seo.ts                       # Metadata helper
    instrumentation-client.ts      # Client-side PostHog init
  public/                          # Static assets + sitemap output
  api/index.py                     # Vercel Python entrypoint, mounts FastAPI at /python-api
  backend/
    src/mycode/api/                # FastAPI app, models, local server bootstrap
    src/mycode/utils/              # Logger, arg parsing, script template, cache helper
    Makefile                       # Python workflow commands
    pyproject.toml                 # Python deps and tool config
  template.env                     # Frontend env template
  backend/env.template             # Backend env template
  next.config.ts                   # PostHog proxy rewrites
  next-sitemap.config.js           # Sitemap config
  vercel.json                      # /python-api rewrite -> /api/index.py
```

## First Setup

1. Create env files.
   - `cp template.env .env.local`
   - `cp backend/env.template backend/.env`
2. Update core product config in `src/app/site-config.ts`.
3. Set the real domain in `next-sitemap.config.js`.
4. Replace landing page placeholder copy in `src/app/(marketing)/page.tsx`.
5. Replace placeholder brand text in `src/components/Navbar.tsx`.

## Local Development

Frontend:

```bash
cd website
npm install
npm run dev
```

Backend (FastAPI on `localhost:8080`):

```bash
cd website/backend
uv sync
make start_api
```

Validation:

```bash
cd website && npm run lint
cd website/backend && make run_precommit
```

## Auth and App Behavior

- Auth route: `src/app/api/auth/[...nextauth]/route.ts`
- Auth config: `src/lib/auth/auth.config.ts`
- Session helper: `src/lib/auth/server.ts`
- Protected page pattern: `src/app/(app)/p/dashboard/page.tsx` uses `requireAuth()`
- Enabled providers: Google OAuth and Resend email links
- Session strategy: database sessions via Neon adapter

## Analytics and SEO

- Client PostHog bootstrap: `src/instrumentation-client.ts`
- Server PostHog helper: `src/lib/posthog/posthog-server.ts`
- Proxy rewrites for PostHog: `next.config.ts` (`/improve-now/*`)
- SEO metadata utility: `src/lib/seo.ts`
- Sitemap generation runs in `postbuild` (`npm run build`)

## Python API Shape

Local FastAPI app (`backend/src/mycode/api/app.py`) exposes:

- `GET /`
- `GET /health`
- `GET /items`

On Vercel, the same app is served under `/python-api/*` through:

- `vercel.json` rewrite
- `api/index.py` mount

## Known Template Placeholders

- `src/app/site-config.ts` has placeholder app metadata/domain/email values.
- `src/app/(marketing)/page.tsx` contains placeholder sections and text.
- `src/lib/navigation.ts` includes `/p/settings`, but that page is not scaffolded yet.
- `src/components/InlineSurvey.tsx` has an empty `SURVEY_ID`.

## AI Editing Guidance

- Prefer smallest reversible edits.
- Leave unused scaffolding untouched by default; ignore it unless the task requires it.
- Do not remove template sections unless explicitly asked, or unless they block the requested change.
- Start productization in this order:
  1. `src/app/site-config.ts`
  2. `src/app/(marketing)/page.tsx`
  3. `src/lib/navigation.ts`
  4. `src/components/Navbar.tsx`
  5. `src/app/(app)/p/dashboard/page.tsx`
- After edits, verify `/, /login, /p/dashboard` and run lint.
