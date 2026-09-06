# Design

## Starting direction

The starter uses daisyUI's built-in dark theme, Inter, clear primary actions,
and responsive layouts. These are working defaults; set the product's visual
direction when its audience and purpose are known.

- Intended tone and audience needs: `TBD` in the [vision](docs/project-vision.md).
- Selected visual references: `TBD`. For each retained reference, state which
  qualities matter and whether fidelity is exact, directional, or inspiration.
- Product-specific constraints: `TBD`.

## Styling ownership

- [globals.css](website/src/app/globals.css) owns Tailwind/daisyUI configuration
  and reusable styling tokens. Use semantic theme colors first.
- [Root layout](website/src/app/layout.tsx) selects the theme and font.
- Production components own their markup, variants, and interaction.
- The local style guide renders those components and theme values. Do not
  maintain independent copies of production components for review.

## Review workflow

1. Establish the user task, content hierarchy, and relevant existing behavior.
2. Read the current component and use references when visual direction needs
   clarification. Keep exploratory intent in the task until it is accepted.
3. Implement one representative page or state using real or deterministic content.
4. Run the [visual harness](docs/design-harness.md), inspect desktop/mobile
   screenshots and diagnostics, and exercise meaningful interactions.
5. Fix the largest discrepancies first. Passing technical checks does not
   settle composition, copy, or visual taste.
6. Record accepted reusable direction here. Update stories only when their
   outcome changes, and put historical rationale in the project log.

Keep fixtures and checks proportional to the product. Named states and real-page
captures are the starting evidence; new measurement or catalog tooling needs a
repeated review problem to solve.
