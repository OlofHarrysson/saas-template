# Coding conventions

Shared coding preferences for this template and projects initialized from it.
Read this page and the relevant language guide before changing code:

- [Python](coding-conventions-python.md)
- [TypeScript and frontend](coding-conventions-typescript.md)

These are working defaults. Adapt reference-specific paths and framework rules
to the selected application when initializing a project. Add a language guide
when that language is introduced, and link it here and in `AGENTS.md`.

## Shared preferences

- Write the simplest code that works, then refactor when needed.
- Optimize for rapid iteration and quick feedback loops.
- Fail fast when assumptions are wrong; avoid unnecessary defensive layers unless
  explicitly requested.
- Prefer clear core logic over abstraction-heavy designs.
- Do not proactively prune unused boilerplate. Leave it in place unless removal
  is requested or it blocks the implementation.
- Use package manager commands (`npm`, `uv`) for dependency updates instead of
  manually editing dependency files.

The [testing guide](testing.md) owns validation workflows and commands.
[DESIGN.md](../DESIGN.md) owns visual direction and review. Application READMEs
own setup, stack details and file maps; keep those out of language conventions.
