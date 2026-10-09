# TypeScript and frontend conventions

Read the [shared conventions](coding-conventions.md) first. Framework-specific
preferences below apply when the selected application uses that framework.

## TypeScript

- Keep TypeScript strict mode enabled.
- Use `camelCase` for functions and variables, and `PascalCase` for classes
  and React components.
- Keep frontend organization shallow (one level of grouping); avoid deep nesting.

## React

- Use Zustand for shared global client state when global state is needed.
- Use Lucide icons instead of inline SVGs.

## Tailwind and daisyUI

- Prefer daisyUI components before custom Tailwind implementations when both
  are viable.
- Default to the built-in daisyUI `dark` theme unless a project-specific theme
  decision is documented.
- Build mobile-first responsive layouts and validate desktop behavior.
- Keep Tailwind/daisyUI configuration in the app's main stylesheet:
  `website/src/app/globals.css` for the Next.js reference and
  `references/astro/src/styles/global.css` for the Astro reference.
- Use daisyUI theme values for semantic UI colors and component-system values,
  Tailwind `@theme` for extra reusable utility tokens, and app-specific CSS
  variables only for domain/layout-specific values.
- Prefer daisyUI semantic colors (`base-*`, `primary`, `secondary`, `accent`,
  `*-content`) over custom parallel token systems.
- The Next.js stylesheet demonstrates `font-display` and `shadow-glow` utility
  tokens, plus the app-specific `--app-navbar-height` layout token.

## Tooling

The Next.js reference uses Biome for frontend linting. Formatting and import
organization are intentionally disabled unless the project explicitly opts in.
The Astro reference uses `astro check`; it does not currently configure Biome.
Use the selected application's configuration and README for commands:
[Next.js](../website/README.md) or [Astro](../references/astro/README.md).
