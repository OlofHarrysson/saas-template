# Application references

Use this catalogue with the canonical
[initialize-project skill](/Users/olof/git/codex-config/skills/custom/initialize-project/SKILL.md).
The skill owns project setup decisions and documentation adaptation. This repository
owns runnable application references. Documentation remains plain Markdown in `docs/`.

## Choose a starting point

| Reference | Maintained source | Included | Choose when |
| --- | --- | --- | --- |
| `nextjs` | [`website/`](../website/README.md) | Existing React/Next.js app, Tailwind/daisyUI, PostHog proxy, auth and optional Python/Vercel plumbing | An interactive web application benefits from the existing full starter |
| `astro` | [`references/astro/`](../references/astro/README.md) | Small static site, Tailwind/daisyUI and optional PostHog pageviews | A content or marketing website needs a small starting point |
| `python` | [`website/backend/`](../website/backend/README.md) | Existing uv workspace, typed settings/models, script helpers, cache and optional FastAPI | Scripts, analysis or a Python service, independently of JavaScript |

The Next.js reference intentionally preserves its existing optional backend; it
does not install or start Python during npm setup. For Astro plus Python, export
Python separately and place its `python/` folder alongside `website/` after review.
No duplicate Python reference is maintained.

Documentation is included/adapted by default, can be selected partially, or omitted
when explicitly requested. Application setup is a separate choice; documentation-only
projects need no export or dependencies. Existing/forked projects receive only opted-in
pieces and keep their own instructions and structure.

## Export committed application code

Run from this repository with Python 3.12+ (stdlib only):

```sh
python3 scripts/export-reference.py astro /Users/olof/git/my-project
# Or: nextjs / python. A destination must not already exist.
```

Exports `website/` for Next.js/Astro and `python/` for Python, plus
`template-source.json` containing the exact template commit and source path.
No Git history, planning docs, package installation, GitHub repository or Codex task
is created. The skill adds the selected documentation and initializes Git afterward.
App READMEs are setup references; honor an explicit request to omit those too.

The default is committed `HEAD`. Use `--revision <commit>` for a chosen checkpoint.
Uncommitted changes are never exported. Commit and validate reference changes before
using them; do not assume a dirty source checkout is what the exporter will copy.
The exporter rejects existing destinations and committed environment data. Never use
it as an overwrite/updater. For a fork, export to a temporary directory, inspect the
diff, and apply only the requested files. Never copy product credentials or deployment IDs.

After export, adapt names, commands and AGENTS.md to the selected stack. Do not copy
this repository's Next.js-specific instructions into an Astro, Python or docs-only
project. Create real project repositories directly under `/Users/olof/git/`.

## Validate before calling a reference ready

- Next.js: `npm ci`, `npm run lint`, `npm run test:e2e`, `npm run test:reference`
  from the exported `website/`. The latter builds with a fake key and checks an
  actual PostHog pageview payload through the proxy path, intercepted locally.
- Astro: the [reference README](../references/astro/README.md) owns check/build,
  desktop/mobile render and analytics gating tests. No live analytics credentials.
- Python: `uv sync --locked`, `uv run python -m unittest discover -s tests`,
  `make lint`, and the example command in its README, from exported `python/`.
  No database or running server is needed for scripts.
- Export isolation: `python3 -m unittest discover -s tests` from this repository.

Verification for this first catalogue is recorded in [project status](project-status.md)
and [the log](project-log.md). A local check does not validate live authentication,
email, PostHog ingestion, hosting, or a new product's usefulness.

## Keep references useful

When a product reveals a reusable fix, apply the general part to its reference,
update the lockfile through its package manager if needed, and repeat its checks
from a fresh export. Record the date, commit and evidence in the project log.
Check official compatibility/security information when upgrading; avoid copying
the newest product checkout without review. Existing projects keep their own code.
Use their `template-source.json` to identify potentially affected copies; compare
and review each fix before applying it. There is no automatic propagation.

## Later references

Desktop: assess Rocket or Thread Launcher when a desktop project needs a start.
Mobile: assess Glow Radar and Nova's Expo apps when needed; their dependency
versions and native integrations differ. Neither is certified by this sprint.
New stacks are added on real demand, not as empty template folders.
