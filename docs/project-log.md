# Project Log

Working notebook for the project.

Read [project status](project-status.md) for routine orientation. Use this log to
preserve goals, rationale, experiments, validation, failures, and follow-up.

Search historical evidence with `rg -n '<term>' docs/project-log.md` and open only
the relevant range. Before writing, inspect the newest 120 lines to avoid
duplicating active work. Read the whole file only for an explicit retrospective.

This is not a command log, strict changelog, or replacement for git. The structure is flexible. Add a dated section for a new branch or substantial shift in work. While that work is active, update the same section. Once it is complete, leave the entry as history and add a newer note if understanding changes later.

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


### 2026-09-27 — Explicit stack choices and dependency review

- New websites wait for Olof's Next.js/Astro choice unless already agreed.
  Recorded Electron with Tailwind, daisyUI and a design harness for Mac desktop
  and menu bar apps. A tested Electron export remains deferred. Python/uv can
  stand alone for APIs, scripts and custom ML/data work or accompany another app;
  external AI API calls alone do not require a Python service.
- Updated the canonical initialize-project skill and its template entry points.
  Skill structure validation and whitespace checks passed. Reviewed unspecified
  web, already-selected stack, desktop, standalone/paired Python, docs-only and
  existing-project scenarios against the instructions. No new runtime scaffolding.
- Rechecked npm audits for Next.js and Astro references: zero reported
  vulnerabilities. Exported the Python runtime lock and ran pip-audit: no known
  vulnerabilities. Healthy reference versions were retained.
- Reviewed the original ai-girlfriend-content Astro source separately; its
  dependency fix and validation are recorded in that repository's project log.

### 2026-10-10 — Instruction cleanup and independent setup trial

- Kept the export fix small: app READMEs own usable setup/check commands without
  depending on optional root docs. Initialization removes links to omitted docs,
  routes coding preferences to the selected language guides, and keeps personal
  instructions in global personalization. Renamed active Devrun prose to Terminal
  Manager; historical entries retain their original wording.
- An independent subagent followed the initialization skill to create Focus Notes
  from committed `0629d2e` in `.dogfood/focus-notes/`, excluded locally through
  `.git/info/exclude`. It adapted product context, stories and a proposed first
  milestone without claiming that notes, privacy or real login were implemented.
  No remote was created. The ignored local report is
  `.dogfood/focus-notes/docs/project-log.md`; raw logs and audit detail are in its
  `evidence/` directory. Trial code and dependencies are not template files.
- Installation, lint, builds, five smoke tests and the intercepted analytics test
  passed; credentialed auth remained skipped. Blank AUTH_SECRET caused two login
  captures to fail even though smoke assertions passed. A generated local secret
  resolved those errors and all 12 visual checks passed. Desktop/mobile captures
  were inspected and test servers stopped. No real provider credentials were used.
- Clarified the setup working directory, local secret generation, optional Python
  env setup and sitemap regeneration next to the relevant setup steps. Included
  the reference analytics check in the standalone app README.
- Browser download timed out through Playwright's built-in retries; a cached
  headless browser supported the actual tests. Fresh-machine browser installation
  remains unverified. The trial also reported React Doctor's deprecated `--diff`
  option; its successful scan does not establish a new-project score baseline.
- Npm reported eight affected package entries (one critical, six high, one low),
  including current Next.js advisories. These include transitive propagation,
  not eight independent flaws or proof of exploitability. Packages remain unchanged;
  dependency maintenance is the next checkpoint before deployment.
- Export isolation and all three references' exported README links passed;
  initialization-skill validation, active template links and whitespace checks
  passed. No live auth, email, analytics ingestion, hosting or founder acceptance
  was established by the local trial.

### 2026-10-10 — Update vulnerable Next.js dependencies

- Updated Next.js 16.3.4 → 16.4.0, PostHog JS 1.427.2 → 1.438.7 and PostCSS
  8.5.28 → 8.5.29 through npm. Refreshed affected transitive packages including
  Sharp 0.35.5, DOMPurify 3.4.16 and source-map-js 1.2.2. React, Auth.js,
  TypeScript and Playwright stayed on their existing versions; no app code changed.
- Current registry/official advisory review confirmed the Next.js patch path.
  Npm audit moved from eight affected entries (one critical) to four high entries,
  all from `next-sitemap → fast-glob → micromatch → braces`. The braces advisory
  GHSA-vfj7-8cjw-p6xm has no patched release. Npm's force option proposes an older
  next-sitemap 4.0.9; retained current 4.2.3 without overrides or suppression.
  Inspection found its glob call in static-export sitemap processing, a mode this
  template does not enable. This bounds observed use; it does not make the package patched.
- Fresh export of `753824f` at `.dogfood/dependency-check/`: npm ci, lint,
  production builds, five smoke tests, one intercepted analytics test, all 12
  visual checks and explicit sitemap generation passed. Credentialed auth skipped.
  Inspected desktop homepage/mobile login captures; all 13 diagnostics were clean.
  Sitemap XML parsed and excluded internal review routes. No test-port listeners remained.
- React Doctor scanned matching clean source snapshots (55 files each): 54/100
  before and after, same ten existing findings. Scanning the working checkout's
  generated builds/Python environment produced unrelated noise, so that score was
  not used for the comparison. No diagnostics were suppressed or unrelated code changed.
- Audit JSON, command logs and comparison scans are retained under ignored
  `.dogfood/dependency-check/evidence/`; screenshot artifacts stay in the export.
  Used a new local auth secret and cached browser. No live credentials, providers,
  hosting, Python or Astro runtime were exercised or changed.

### 2026-10-10 — Built-in sitemap and robots routes

- Replaced next-sitemap with Next.js metadata routes: `src/app/sitemap.ts` lists
  four public pages and `src/app/robots.ts` permits crawling and advertises the
  sitemap. Both use siteConfig.domain, matching SEO metadata. New public pages
  must be added explicitly; no automatic route scanner or invented lastmod values.
- Removed next-sitemap, its configuration, Vercel-only postbuild wrapper, npm
  generator commands and checked-in robots/XML output. Npm removed 22 packages;
  both the working install and fresh export audit report zero vulnerabilities.
- Added US-005 and two real endpoint checks. Red runs against the previous export
  failed as intended: sitemapindex versus urlset, and robots' apex domain versus
  siteConfig's www domain. After implementation, all seven production tests
  passed (one credentialed auth skip), plus the intercepted analytics check.
- Fresh export of `c3e3e07` under `.dogfood/native-sitemap/` independently passed
  npm ci, lint, build and the two crawl-metadata checks. Test-owned servers stopped.
  React Doctor on the source snapshot stayed at 54/100 with ten existing findings.
  UI was unchanged; visual captures were not repeated. No live provider or deployment test.
- Updated setup documentation to use one domain setting and explain the explicit
  page list. Current project status is compact; earlier results remain in this log.
- Olof raised a possible small shared sitemap tool for Next.js/Astro. This remains
  an idea, not an implemented or published package. Astro's official sitemap
  integration already discovers statically generated routes, while dynamic SSR
  URLs need explicit input. A useful prototype needs a concrete failure case and
  agreed URL-discovery scope before taking on framework adapters.
  Reference: https://docs.astro.build/en/guides/integrations-guide/sitemap/

### 2026-10-10 — Documentation ownership and setup review

- Reviewed all 19 tracked Markdown entries against app configs, source and test
  commands; inspected historical log structure and recent entries selectively.
  Kept the existing document layout and language guides. Root README is a shorter
  entry point; AGENTS owns the full map, app READMEs own setup/check commands, and
  shared testing/design docs describe the applicable workflow for each stack.
- Removed repeated Next.js editing rules, the old Tier 1 Memory label, speculative
  named desktop/mobile sources (including Nova), the log's sample historical entry,
  and design-harness expansion suggestions. Preserved completed history. New
  projects are told to start their own log and adapt only relevant guides.
- Added the missing Auth.js Neon schema prerequisite and actual-origin/port setup,
  checked against the official adapter docs and local auth implementation. Clarified
  that Next.js analytics initializes in development when a key is present. Astro
  now has setup/adaptation pointers; Python has self-contained credential-free
  check commands. No schema, provider or application behavior changed.
- Updated React Doctor from deprecated --diff to --scope changed with an explicit
  base, narrowed invocation to React work, and documented comparable scan inputs.
  Claude's skill entry is a relative symlink to the canonical .agents skill.
  Replaced the PR template's generic self-review checkbox with change/validation prompts.
- Validation: all 82 local Markdown links and heading anchors resolve, all three
  application READMEs stay within their exported app for local links, both skill
  entry paths pass quick_validate, the alias resolves, and git diff --check passes.
  Confirmed current React Doctor flags using its CLI help. No runtime tests were
  repeated for this documentation-only pass. Live auth and deployment remain
  unverified; existing dated runtime evidence remains separate in project status.

### 2026-10-10 — Fresh documentation initialization trial

- At Olof's request, repeated setup with a separate agent and the current
  initialize-project skill. Created `/Users/olof/git/saas-template-docs-trial`
  from committed `17d8278`, with Pocket List as a hypothetical reading-list brief.
  This is one disposable local repository, committed as `7985d5b`, with no remote.
  Live authentication was explicitly excluded; no reading-list features were built.
- Adapted 15 Markdown documents, including short project instructions, vision,
  status, planned stories, conventions, testing, design, a new log and handoff.
  Kept starter test IDs distinct from product stories, omitted Astro/export
  maintenance instructions, and kept placeholder branding and capability explicit.
- Fresh npm ci and lint passed with zero audit findings. Production build and
  seven browser checks passed, with one intended auth skip; the intercepted
  analytics check and all 12 visual checks passed. The agent inspected desktop
  homepage/mobile navigation captures. Cached Chromium was used; fresh browser
  download and optional Python installation were not tested.
- Parent review independently checked all 57 local links/anchors and read the
  project context, scope, stories, testing, design, handoff and actual result logs.
  Compared all 94 exported app files to source: 93 match byte-for-byte; only the
  app README introduction was adapted to identify the disposable scaffold.
  Confirmed a clean local working tree, no remote, only env templates tracked,
  and no remaining listeners on test ports 3001/3198.
- No blocking setup or documentation defect was found; no source code or skill
  change was needed. Trial evidence remains in its own docs/project-log.md and
  ignored evidence/ directory. This validates the tested Next.js initialization
  path locally, not every stack, live integration or a complete product.

### 2026-10-10 — Final review and throwaway cleanup

- Reviewed Pocket List once more before removal: all 15 Markdown documents / 57
  local links and anchors passed; repeated lint and production build passed;
  seven browser checks passed and credentialed auth remained intentionally skipped.
  Rechecked prior analytics/visual result logs and confirmed no new blocking issue.
- Reviewed provenance, Git state and relevant notes across all six trial folders.
  The ten staged sitemap changes in dependency-scan-after already matched the
  source template; no unique implementation fix remained to recover.
- With Olof's authorization, removed `/Users/olof/git/saas-template-docs-trial`
  and `.dogfood/{focus-notes,dependency-baseline,dependency-check,
  dependency-scan-after,native-sitemap}`, then removed the empty `.dogfood/`
  directory and its local Git exclusion. Verified all six paths are absent and
  no listeners remain on test ports 3001/3198.
- Findings and validation summaries remain in this log. Raw logs, generated
  captures, local trial commits, dependencies and throwaway secrets in those
  directories were deleted; earlier references to those artifacts are historical.
  No application code or global configuration changed during cleanup.

### 2026-10-10 — Product identity on domains and subdomains

- Added homepage-only WebSite JSON-LD to both web references, using each product's
  name and exact configured hostname. Next.js keeps its existing site-config.ts;
  Astro now has src/site-config.ts, which also supplies astro.config.mjs `site`.
  Application-name and Open Graph site-name use the same identity. No package added.
- Next.js homepage/about now set their own canonical metadata; its SEO helper
  uses each page's canonical path for Open Graph URLs and respects page-specific
  title/description. Existing privacy/terms canonical paths remain. The root layout
  has no inherited homepage canonical. Astro derives canonical/social URLs from
  the page path and production site, excluding query parameters.
- Kept JSON-LD serialized and escaped for inline HTML. React's string script
  children preserve valid JSON without a dangerous-HTML prop or lint suppression.
  Docs explain production host configuration, optional www, independent product
  naming, and Google's control over final search appearance. Added US-006.
- Red: new tests failed against missing canonical/site metadata (two Next.js,
  four Astro viewport cases). Green: Next.js lint/build plus nine browser checks
  passed, one credentialed-auth skip; Astro check/build and eight browser checks
  passed. Assertions follow Next.js and Astro's emitted trailing-slash conventions.
  React Doctor changed-source scan reported no new findings; export isolation and
  all 85 local doc links/anchors passed.
- Fresh exports of `7067eb3` independently installed and built with
  `mytool.example.com` and a name containing closing-script/HTML-like characters.
  Four Next.js identity/crawl checks and eight Astro checks passed. Direct parsing
  of both built homepage HTML files confirmed one valid escaped WebSite node with
  the exact configured name and subdomain. A first Next.js test fixture omitted
  AUTH_URL and logged UntrustedHost; following the documented env-template setup
  with the local test origin removed those errors on the final passing run.
- Removed both temporary exports after review and confirmed ports 3001/3197 stopped.
  Command logs are temporary `/tmp/saas-identity-*.log` artifacts; this entry retains
  the durable findings. Live providers, deployment, Google indexing/site-name choice,
  and a fresh browser download were not tested. Default visible layout is unchanged.
- Sources: https://developers.google.com/search/docs/appearance/site-names,
  https://nextjs.org/docs/app/guides/json-ld,
  https://react.dev/reference/react-dom/components/script,
  https://docs.astro.build/en/reference/configuration-reference/#site,
  https://docs.astro.build/en/reference/api-reference/#astrosite.

### 2026-10-10 — Content selection in the design workflow

- DESIGN.md points to global personalization for portable UI preferences; each
  product keeps its own visual direction, content decisions and review evidence.
- The workflow now selects content before arranging it and reviews the rendered
  page against the original user task, including removing unsupported additions
  while preserving useful content, direct actions and necessary feedback.
- Validation: checked changed documentation links and consistency with global
  personalization and the frontend-design workflow; git diff --check passed.
  Documentation-only change; no application behavior or runtime tests changed.
