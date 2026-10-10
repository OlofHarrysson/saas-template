# Next.js reference

This template is designed for fast MVP shipping. Treat it as a starting point, not a fixed product.
Default behavior: keep optional boilerplate in place and ignore unused parts unless removal is explicitly requested.

## What Is Included

- Next.js 16 + React 19 + TypeScript (strict)
- Tailwind CSS 4 + daisyUI 5 CSS-first theme setup
- Biome for frontend linting
- Playwright smoke tests for core public flows
- Development-only style guide, component fixtures, and desktop/mobile visual captures
- Auth.js v5 (beta) with Google OAuth + Resend magic-link login
- Neon adapter for Auth.js session/user storage
- PostHog client + server utilities with proxy rewrites
- SEO helper and built-in Next.js sitemap/robots routes
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
      sitemap.ts                   # Explicit public-page list for /sitemap.xml
      robots.ts                    # Crawl rules and sitemap URL for /robots.txt
    components/                    # UI components (navbar, footer, auth forms)
    lib/
      auth/                        # Auth.js config + server/client auth helpers
      posthog/                     # Server-side PostHog client wrapper
      navigation.ts                # Marketing/app nav definitions
      seo.ts                       # Metadata helper
    instrumentation-client.ts      # Client-side PostHog init
  public/                          # Static assets
  api/index.py                     # Vercel Python entrypoint, mounts FastAPI at /python-api
  backend/
    src/mycode/api/                # FastAPI app and local server bootstrap
    src/mycode/models.py           # Shared Pydantic models and type definitions
    src/mycode/constants.py        # Code-controlled defaults and invariant values
    src/mycode/settings.py         # Typed env settings and .env.template generator
    src/mycode/cache.py            # Lazy joblib cache construction
    src/mycode/utils/              # Logger, argument parsing, and script template
    Makefile                       # Python workflow commands
    pyproject.toml                 # Python deps and tool config
  .env.template                    # Frontend env template
  backend/.env.template            # Backend env template
  next.config.ts                   # PostHog proxy rewrites
  vercel.json                      # /python-api rewrite -> /api/index.py
```

## First Setup

Run these steps from `website/`.

1. Copy `.env.template` to `.env.local`. Set `AUTH_SECRET` to a fresh random value
   generated locally with `openssl rand -base64 32`. No provider account is needed
   for this value. Leave provider/database keys blank for public-page checks;
   real sign-in requires the [auth setup](#auth-and-app-behavior) below.
2. Update core product config in `src/app/site-config.ts`, including `domain`
   (hostname only, without `https://` or a trailing slash).
3. Review the public-page list in `src/app/sitemap.ts` and the crawl rules in
   `src/app/robots.ts`. Next.js serves both through the normal build and runtime.
4. Replace landing page placeholder copy in `src/app/(marketing)/page.tsx`.
5. Update navigation in `src/lib/navigation.ts` and the placeholder brand text
   in `src/components/Navbar.tsx`. Adapt dashboard/settings when building the app.

## Local Development

Run from `website/` after first setup:

```bash
npm ci
npm run dev
```

`next dev` uses `.next`, while `next build` writes to `.next-build` so local production builds do not interfere with a running dev server.

Use Terminal Manager for persistent local services on Olof's machine. The
optional [Python workspace](backend/README.md) owns its setup and API commands;
frontend installation does not require Python.

## Local Checks

Run from `website/` after installing dependencies:

```bash
npm run playwright:install  # Install the test browser once
npm run lint
npm run test:e2e            # Builds and tests with a temporary production server
npm run test:reference      # Checks a PostHog pageview with intercepted requests
npm run design:capture     # Captures desktop/mobile views with a temporary dev server
```

The test commands own and stop their servers. Default checks do not require live
provider credentials; the separate `npm run test:e2e:dev` authentication check
requires a configured development server and Neon/Auth.js credentials.

For visual review, inspect the PNG/JSON files under `test-results/design/` or run
`npm run design:report` to open the HTML report. In a running development server,
open `/internal/style-guide`. Internal review routes are unavailable in production.

## Auth and App Behavior

For real sign-in, provision a Neon database, set `DATABASE_URL`, and apply the
[Auth.js Neon adapter schema](https://authjs.dev/getting-started/adapters/neon#schema).
This reference does not create the auth tables automatically. Set `AUTH_URL` to
the actual app origin, including the local port. Configure Google credentials
and its `/api/auth/callback/google` redirect URL, and/or `AUTH_RESEND_KEY` and
`AUTH_RESEND_FROM` for the providers the product will use. Review enabled providers
in `auth.config.ts`; the starter displays both.

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

The development harness needs the same auth tables and writes a test user/session.
Use a development database. For `npm run test:e2e:dev`, start the configured dev
server on port 3007 first; this command does not start or stop it.

## Analytics and SEO

- Client PostHog bootstrap: `src/instrumentation-client.ts`
- Server PostHog helper: `src/lib/posthog/posthog-server.ts`
- Proxy rewrites for PostHog: `next.config.ts` (`/improve-now/*`)
- A non-empty `NEXT_PUBLIC_POSTHOG_KEY` initializes the client in development too.
  Keep it blank for local checks. The reference test supplies a fake key and
  intercepts its requests; Astro has different analytics gating.
- SEO metadata utility: `src/lib/seo.ts`
- `src/app/sitemap.ts` serves `/sitemap.xml`; `src/app/robots.ts` serves `/robots.txt`.
  Both use `siteConfig.domain`, matching the SEO metadata origin. Add or remove
  public pages in the sitemap's explicit list as the product changes. Private,
  login, API and internal routes are omitted from that list; omission is not access
  control. No separate generator command or checked-in sitemap output is needed.

For founder browser testing, visit any page with `?analytics=off` once in each browser. PostHog stores the opt-out choice in a cookie shared across subdomains using the same consent name. New apex domains and browsers need their own visit; clearing cookies resets the choice.

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
