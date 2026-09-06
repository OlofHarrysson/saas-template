# User stories

Keep a small set of important user or operator outcomes. These starter stories
describe the included template; replace or adapt them when a product is chosen.
They are not evidence of market demand or a complete backlog.

## Working convention

- Give each story a stable `US-...` ID, an actor, an outcome, and observable
  acceptance criteria. Link its focused tests and useful visual/manual evidence.
- For new behavior, follow the [red–green loop](testing.md#redgreen-loop).
  Playwright tags such as `@US-001` let a contributor run one story directly.
- Test technical contracts directly; parsers and helpers do not need fictional
  user stories. A story may span several tests, and not every test needs a tag.
- Separate **support** (what works) from **learning** (whether people value it).
  Passing tests establish behavior, not demand, usability, or visual approval.
- Revise current promises here. Keep previous outcomes and rationale in the
  [project log](project-log.md).

## US-001 — Find the next step

As a visitor, I can find the product's main action and navigate on a phone so
that I can understand the offer and reach sign-in.

Acceptance:

- The homepage offers a sign-in action and a working features anchor.
- Mobile navigation opens, exposes the expected destinations, and closes.
- The login page displays the configured sign-in choices.

Support: implemented in the starter; [smoke tests](../website/tests/e2e/smoke.spec.ts).
Learning: placeholder copy does not establish that a real audience understands
or wants the product.

## US-002 — Enter a protected workspace

As a user, I must sign in before reaching private pages and can navigate the
workspace after authentication.

Acceptance:

- An anonymous dashboard request redirects to sign-in.
- In development, the existing test login establishes a session and allows
  dashboard-to-settings navigation through the normal session path.

Support: [anonymous routing](../website/tests/e2e/routes.spec.ts) and
[development-auth tests](../website/tests/e2e/authenticated.spec.ts).
Development authentication requires configured Neon/Auth.js credentials and is
skipped in the default production smoke suite. It writes a test session; it is
not proof that live Google OAuth or email delivery works.
Learning: real provider operation and product onboarding require separate
end-to-end evidence for the initialized product.

## US-003 — Review a change as it renders

As a maintainer, I can inspect production components and representative pages
at desktop and mobile sizes so that I can judge a change from rendered evidence.

Acceptance:

- A development-only style guide shows the app's theme and real shared layout.
- A deterministic fixture renders the existing route-state component in empty
  and error states with a visible recovery action.
- One capture command produces named PNG/JSON pairs and an HTML report for
  both viewports, including the real homepage, login page, and navigation.
- Checks reject unintended horizontal overflow and browser errors. Visual
  balance remains a review judgment, not a pixel-comparison score.
- Internal review routes return 404 in production builds.

Support: implemented; [visual tests](../website/tests/design/visual.spec.ts) and
[production isolation](../website/tests/e2e/design-isolation.spec.ts).
Learning: desktop/mobile artifacts have been inspected locally. Founder taste
and usefulness across new projects remain unverified. Add further fixtures only
when real component behavior needs them.
