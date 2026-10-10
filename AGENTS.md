# Repository Guidelines

## Active Project Context

- This repository is Olof's reusable SaaS template: a documentation foundation
  plus maintained Next.js, Astro and Python application references.
- Keep project setup fast and the references reusable. Preserve optional
  boilerplate unless removal is requested or an implementation conflict requires it.
- `docs/project-vision.md` and `docs/user-stories.md` contain starter material;
  adapt it to the new product rather than treating it as established requirements.
- `docs/project-status.md` owns current maintenance status and verification limits.

## Reading Path

Start with `README.md` and `docs/project-status.md`, then read only what the task needs:

- Before coding: [shared coding conventions](docs/coding-conventions.md) and the
  relevant language guide.
- Before changing user-facing behavior: the relevant [user stories](docs/user-stories.md)
  and [testing guide](docs/testing.md).
- Before visual work: [DESIGN.md](DESIGN.md) and the [design harness](docs/design-harness.md).
- For setup, commands and file maps: the selected application's README below.

Verify current behavior in source and tests; previous validation is historical evidence.

## Template Boundaries and Initialization

Use the [Initialize Project skill](/Users/olof/git/codex-config/skills/custom/initialize-project/SKILL.md)
and [application catalogue](docs/application-references.md) for setup decisions,
stack selection, exports and documentation adaptation. Documentation and application
selection are independent; existing projects receive only opted-in pieces.

The references have separate responsibilities. Next.js includes optional auth,
analytics and Python/Vercel plumbing; Astro is a smaller website reference;
Python supports APIs, scripts and data work independently. Apply only the chosen
stack's instructions when initializing a project. Replace this template context
with the product's context and adapt the selected coding guides and documentation links.

## Working in This Repository

- Follow `docs/testing.md` for validation appropriate to the change; it owns the
  red–green workflow, commands and evidence requirements.
- Use the shared terminal-hub workflow for persistent local services. Run short
  checks directly; do not leave a dev server running without an explicit handoff.
- Use short, imperative commit messages. Checkpoint work on the existing branch;
  create branches or pull requests only when requested.
- Keep shared documentation under `docs/`, give each topic one owner and link it
  in the index below. Keep portable collaboration preferences in global personalization.

Search `docs/project-log.md` for relevant history rather than reading it routinely.
Before recording a meaningful outcome, inspect its newest 120 lines; update the
active entry or append a dated entry with decisions, validation, failures and follow-up.

## Documentation Index

- [AGENTS.md](AGENTS.md): short project context, repository guidance and this index.
- [README.md](README.md): human entry point and initialization pointers.
- [Project vision](docs/project-vision.md): planning template for purpose, audience, MVP and risks.
- [Project status](docs/project-status.md): current outcome, milestone, uncertainty and next checkpoint.
- [User stories](docs/user-stories.md): user/operator outcomes, acceptance criteria and evidence.
- [Application references](docs/application-references.md): stack selection, exports, provenance and maintenance.
- [Coding conventions](docs/coding-conventions.md): shared implementation preferences and language-guide selection.
- [Python conventions](docs/coding-conventions-python.md): Python style, models, configuration and resources.
- [TypeScript conventions](docs/coding-conventions-typescript.md): TypeScript style and frontend preferences.
- [Testing](docs/testing.md): validation workflow, commands and evidence boundaries.
- [Design](DESIGN.md): visual direction, styling ownership and review workflow.
- [Design harness](docs/design-harness.md): development-only fixtures and rendered capture/review workflow.
- [Project log](docs/project-log.md): historical decisions, validation, failures and follow-up.
- [Next.js README](website/README.md): app setup, stack, file map and runtime routing.
- [Python README](website/backend/README.md): Python workspace setup and commands.
- [Astro README](references/astro/README.md): Astro setup, checks and reference provenance.
