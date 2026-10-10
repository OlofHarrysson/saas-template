# Design

Global UI and collaboration preferences live in
[personalization](/Users/olof/git/codex-config/personalization/AGENTS.md).
Keep this file focused on the product's visual direction, content decisions and
review evidence rather than copying those preferences into each project.

## Starting direction

The web references use daisyUI's built-in dark theme and responsive layouts;
Next.js also loads Inter. These are working defaults; set the product's visual
direction when its audience and purpose are known.

- Intended tone and audience needs: `TBD` in the [vision](docs/project-vision.md).
- Selected visual references: `TBD`. For each retained reference, state which
  qualities matter and whether fidelity is exact, directional, or inspiration.
- Product-specific constraints: `TBD`.

## Styling ownership

- Next.js: [globals.css](website/src/app/globals.css) owns Tailwind/daisyUI
  configuration and reusable tokens; [root layout](website/src/app/layout.tsx)
  selects the theme and font.
- Astro: [global.css](references/astro/src/styles/global.css) owns styling;
  [Layout.astro](references/astro/src/layouts/Layout.astro) owns the page shell.
- Use semantic theme colors first.
- Production components own their markup, variants, and interaction.
- The Next.js style guide renders those components and theme values. Do not
  maintain independent copies of production components for review.

## Review workflow

1. Establish the user task and relevant existing behavior. Decide which content
   and controls serve that task, and what to omit, before arranging the hierarchy.
2. Read the current component and use references when visual direction needs
   clarification. Keep exploratory intent in the task until it is accepted.
3. Implement one representative page or state using real or deterministic content.
4. For Next.js, run the [visual harness](docs/design-harness.md); for Astro, use
   its [browser checks](references/astro/README.md#checks) and inspect the rendered
   pages. Review desktop/mobile layouts and exercise meaningful interactions.
5. Review the rendered page against the original user task, not just the design
   spec. Remove unsupported additions while preserving useful content, direct
   actions and necessary feedback; then fix the largest visual discrepancies.
   Passing technical checks does not settle composition, copy, or visual taste.
6. Record accepted reusable direction here. Update stories only when their
   outcome changes, and put historical rationale in the project log.

Keep fixtures and checks proportional to the product. Named states and real-page
captures are the starting evidence; new measurement or catalog tooling needs a
repeated review problem to solve.
