# SaaS template

A shared documentation foundation and runnable application references for Next.js,
Astro and Python. Choose documentation and application independently.

## Start here

- [Application references](docs/application-references.md): choose, export, verify and maintain a starting point.
- [Initialize Project skill](/Users/olof/git/codex-config/skills/custom/initialize-project/SKILL.md): canonical setup workflow, maintained in codex-config.
- [Project status](docs/project-status.md): current outcome, milestone, and next checkpoint.
- App setup: [Next.js](website/README.md), [Astro](references/astro/README.md),
  or [Python](website/backend/README.md).

[AGENTS.md](AGENTS.md) owns the complete documentation map and contributor
instructions. Read relevant current documents first; search the
[project log](docs/project-log.md) when historical context is needed.

## Starting a product

Ask Codex to use `$initialize-project`, for example: “Start an Astro website with
the usual documentation,” “Start a Python project,” or “Documentation only.”
New repositories go directly under `/Users/olof/git/`. Partial/no documentation
is supported; adding tooling to existing/forked projects is opt-in.

The [catalogue](docs/application-references.md) provides the reproducible export
command, which records the source revision and excludes uncommitted local data.

Fill the useful parts of the vision, replace the template status and example
stories with the first product outcome, and update the compact context in
`AGENTS.md`. Start a new project log with the initialization evidence; keep this
template's maintenance history here. Include only relevant language and design
guides, adapting paths and links to the chosen stack. Leave unknowns explicit.
Keep audience in the vision and near-term milestones in project status.

The Next.js visual harness uses the app's existing components and Playwright. It adds
no separate component framework. Start with the included page captures and
route-state fixture, then add evidence when real product behavior needs it.
