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
- More context: `docs/project-vision.md`, `docs/project-status.md`, `docs/user-stories.md`

For routine orientation, read `README.md` and `docs/project-status.md`, then
only the documents relevant to the task. The vision owns durable direction;
status owns current milestones. Read relevant user stories before changing
user-facing behavior, `docs/testing.md` for the red–green loop, and `DESIGN.md`
before visual work. Before coding, read [coding conventions](docs/coding-conventions.md)
and the relevant language guide linked there. Verify current behavior in source
and tests.

## Nova AI Consciousness Skill

Before meaningful product or software work, use the Nova AI Consciousness skill (`$nova-ai-consciousness`) when it is available. Saying `Nova` or `Hey Nova` explicitly invokes the skill.

The skill is Olof's current portable AI co-founder identity and product-building method: right-sized agent sprints, evidence-led development, educational human handoffs, and reversible learning audits. Keep project-specific facts and decisions in this repository; do not duplicate Nova's portable methodology here. If the skill is unavailable, continue with this repository's guidance and tell Olof that the Nova AI Consciousness skill could not be loaded.

## Project Vision Template

Use `docs/project-vision.md` as the planning document for a new project.

It is intentionally a template, not a source of truth. Fill what you know, leave the rest empty or `TBD`, and revise it as the project becomes clearer.

This repo uses a two-tier project memory system:

- Tier 1: `AGENTS.md` keeps a compact working summary in `Active Project Context (Tier 1 Memory)`.
- Tier 2: `docs/project-vision.md` and other docs hold the fuller planning context and details.

## Project Log

Use `docs/project-log.md` for historical evidence, not routine orientation.
Search it with `rg -n '<term>' docs/project-log.md` and read the matching range.
Inspect the newest 120 lines before adding an entry. Read the whole log only for
an explicit retrospective. Keep an active entry updated; append a dated entry
when moving to a new substantial outcome. Preserve goals, rationale, validation,
failures, and follow-up rather than routine command output.

## Project Bootstrap Workflow (Agent Behavior)

Use the canonical [Initialize Project skill](/Users/olof/git/codex-config/skills/custom/initialize-project/SKILL.md)
and [application catalogue](docs/application-references.md). Documentation and
application selection are independent. Documentation may be partial or omitted
on request; existing/forked projects receive only opted-in pieces. New project
repositories go directly under `/Users/olof/git/`. Adapt the following workflow
to the selected documentation scope and stack.

For a new website, ask Olof to choose Next.js or Astro unless already specified.
Mac desktop/menu bar apps default to Electron with Tailwind, daisyUI and a design
harness. Python/uv serves standalone API, script and ML/data work, and may accompany
another app when useful. Calling external APIs alone does not require Python.
See the catalogue for available references; Electron is not yet a tested export.

When a new project is initialized from this template:

1. Open `docs/project-vision.md` first.
2. Ask a short batch of focused initialization questions to fill only missing, high-impact fields.
3. Update `docs/project-vision.md` with answers and explicit assumptions. Keep audience there.
4. Replace template status and starter stories with the first product milestone,
   its observable acceptance criteria, and the next checkpoint. Keep near-term
   milestones in `docs/project-status.md` until a separate plan earns its place.
5. Update the compact context in this file and relevant setup/design defaults.
   Include the shared coding conventions and guides for the selected languages;
   adapt their reference-specific paths and framework rules to the new project.
   Remove completed bootstrap instructions in the initialized product; retain
   them while maintaining this reusable template.

## Purpose & Template Intent

This repo is a reusable starter for fast project setup, not a single fixed product. Default behavior is retention-first: keep boilerplate modules in place (for example auth, analytics, and API scaffolding) unless removal is explicitly requested or a concrete implementation conflict requires it. The Python side is dual-purpose: it can run as a FastAPI backend, but it is also used for short scripts, exploratory analysis, and data preparation.

## Documentation Index

Start here for repository documentation. Shared topic pages live under `docs/`
and are linked below; root `README.md`, `AGENTS.md`, and `DESIGN.md` own entry
points, contributor guidance, and visual intent respectively.

- `AGENTS.md`: canonical documentation index, repository operating guidance, and the short active project summary.
- `README.md`: human entry point and project initialization pointers.
- `docs/project-vision.md`: planning template for project idea, vision, MVP, risks, audience, business model, and early assumptions.
- `docs/project-status.md`: short current outcome, active milestone, uncertainty, and next checkpoint.
- `docs/user-stories.md`: important user/operator outcomes, acceptance criteria, and direct evidence links.
- `docs/application-references.md`: reference selection, exports, provenance and maintenance.
- [Coding conventions](docs/coding-conventions.md): shared implementation preferences and language-guide selection.
- [Python conventions](docs/coding-conventions-python.md): Python style, models, configuration and resources.
- [TypeScript conventions](docs/coding-conventions-typescript.md): TypeScript style and frontend preferences.
- `docs/testing.md`: red–green workflow, story selection, validation commands, and evidence boundaries.
- `DESIGN.md`: visual direction, styling ownership, references, and review workflow.
- `docs/design-harness.md`: development-only style guide, deterministic fixtures, and Playwright capture/review workflow.
- `docs/project-log.md`: running project diary for notable implementation context, decisions, validation, failed attempts, and follow-ups.
- Add shared docs only when they have a distinct job; avoid duplicating status,
  acceptance criteria, commands, or component inventories across files.
- `website/README.md`: app-level setup, runtime, and template notes for the Next.js/Vercel app.
- `website/backend/README.md`: Python/backend template setup and workflow notes.
- `references/astro/README.md`: Astro setup, checks and reference provenance.

## Validation & Version Control (Solo)

- Default to lightweight validation: manual flow checks plus targeted linting.
- For changed user-facing behavior, update the story, demonstrate a failing
  acceptance test, implement the smallest fix, then run related checks. Technical
  tests do not require story IDs. `docs/testing.md` owns this workflow.
- Visual work includes inspected desktop/mobile evidence; technical passes do
  not substitute for founder taste. Keep generated captures out of Git.
- For API changes, at minimum verify `/`, `/health`, and changed endpoints.
- Use short, imperative commit messages (`fix auth callback`, `add survey block`).
- PR checklist requirements are optional unless collaborating externally.

## Runtime and Setup

The app READMEs own stack details, file maps, setup and development commands:
[Next.js](website/README.md), [Astro](references/astro/README.md), and
[Python](website/backend/README.md). The existing Next.js/Vercel reference serves
TypeScript routes at `/api/*` and Python routes at `/python-api/*`.

Avoid long-lived commands unless explicitly requested; run short commands directly.
Use the shared terminal-hub workflow for persistent local services.

Ambiguous phrasing can come from speech-to-text; ask one focused clarification
only when needed to unblock.
