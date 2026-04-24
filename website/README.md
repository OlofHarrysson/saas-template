# SaaS Boilerplate (AI Operator README)

This template is designed for fast MVP shipping. Treat it as a starting point, not a fixed product.
Default behavior: keep optional boilerplate in place and ignore unused parts unless removal is explicitly requested.

## What Is Included

- Next.js 16 + React 19 + TypeScript (strict)
- Tailwind CSS 4 + daisyUI 5 CSS-first theme setup
- Biome for frontend linting
- Playwright smoke tests for core public flows
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
  .env.template                    # Frontend env template
  backend/.env.template            # Backend env template
  next.config.ts                   # PostHog proxy rewrites
  next-sitemap.config.js           # Sitemap config
  vercel.json                      # /python-api rewrite -> /api/index.py
```

## First Setup

1. Create env files.
   - `cp .env.template .env.local`
   - `cp backend/.env.template backend/.env`
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

`next dev` uses `.next`, while `next build` writes to `.next-build` so local production builds do not interfere with a running dev server.

Backend (FastAPI on `localhost:8080`):

```bash
cd website/backend
uv sync
make start_api
```

Validation:

```bash
cd website && npm run lint
cd website && npm run playwright:install
cd website && npm run test:e2e
cd website/backend && make run_precommit
```

Dev-server authenticated browser checks:

```bash
cd website
npm run dev
npm run test:e2e:dev
```

If you already have a dev server running and want the smoke tests to reuse it, set `PLAYWRIGHT_BASE_URL` first:

```bash
cd website
PLAYWRIGHT_BASE_URL=http://127.0.0.1:3007 npm run test:e2e
```

## Auth and App Behavior

- Auth route: `src/app/api/auth/[...nextauth]/route.ts`
- Auth config: `src/lib/auth/auth.config.ts`
- Session helper: `src/lib/auth/server.ts`
- Protected page pattern: `src/app/(app)/p/dashboard/page.tsx` uses `requireAuth()`
- Enabled providers: Google OAuth and Resend email links
- Session strategy: database sessions via Neon adapter
- Local dev auth harness: `src/app/api/dev-auth/login/route.ts`
  - Only responds when `NODE_ENV === "development"`
  - Creates a short-lived Auth.js email verification token for `codex-dev@example.test`
  - Redirects through Auth.js so the normal `authjs.session-token` cookie is set
  - Use `GET /api/dev-auth/login?redirect=/p/dashboard` to enter the authenticated app locally

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
- `src/app/(app)/p/settings/page.tsx` contains placeholder account settings.
- `src/components/InlineSurvey.tsx` has an empty `SURVEY_ID`.

## AI Editing Guidance

- Prefer smallest reversible edits.
- Leave unused scaffolding untouched by default; ignore it unless the task requires it.
- Do not remove template sections unless explicitly asked, or unless they block the requested change.
- Example: do not delete the authentication system only because the current feature does not use auth yet.
- Start productization in this order:
  1. `src/app/site-config.ts`
  2. `src/app/(marketing)/page.tsx`
  3. `src/lib/navigation.ts`
  4. `src/components/Navbar.tsx`
  5. `src/app/(app)/p/dashboard/page.tsx`
- After edits, verify `/, /login, /p/dashboard` and run lint.
