# Visual harness

The app's production components, a development-only style guide, and Playwright
provide a small rendered-review loop. [DESIGN.md](../DESIGN.md) owns visual intent;
this guide owns how to inspect the implementation.

## Manual review

In a running development server, open `/internal/style-guide`. It renders the
shared navigation/footer and theme primitives, and links to a deterministic
route-state fixture in empty and error states. The fixture uses the production
`RouteStateCard` component. Both internal routes return 404 in production and
the sitemap excludes `/internal/*`.

The homepage and login page are reviewed at their actual routes. The mobile
navigation is exercised in real page context rather than copied into a fixture.

## Capture and inspect

From `website/`:

```bash
npm run design:capture
npm run design:report
```

The capture command runs the desktop (1440 × 900) and mobile (390 × 844)
profiles. Both use Chromium; the mobile profile does not prove iOS Safari
behavior. [Testing](testing.md) explains temporary servers and using Devrun.

Each meaningful state writes a named PNG and JSON pair in its test directory
under `website/test-results/design/` and attaches them to the HTML report in
`website/playwright-report/design/`. The JSON records time, route, viewport,
captured region, browser issues, and horizontal overflow. These folders are
ignored and cleared by the runner on the next corresponding run. Inspect the
report's result and timestamp before treating an artifact as current evidence.
Captures disable animations and hide the Next.js development toolbar; browser
errors still fail the run.

Screenshot assertions protect semantics, visible recovery actions, responsive
fit, and browser health. The images are review artifacts, not approved pixel
baselines. Passing captures do not establish visual quality.

## Add evidence when behavior needs it

- Add a real-page capture when layout or neighboring content matters.
- Add a fixture only when states are otherwise difficult to reproduce.
- Render the real component with deterministic content. Do not duplicate its
  implementation or add decorative fixture chrome that changes its layout.
- Guard each fixture page before rendering or loading its data with the same
  development-only check as the existing pages. A parent layout alone does not
  prevent child data from appearing in a Next.js response. Extend the production
  isolation test when adding a route.
- Give screenshots meaningful state names, pair each with a semantic assertion,
  and use `@US-...` tags when the test supports an important user outcome.
- Reuse the artifact helper in
  [tests/design/fixtures.ts](../website/tests/design/fixtures.ts).
- Inspect desktop and mobile evidence after a change. Test another browser or
  physical device when its behavior matters to the product.

The test suite owns the current capture inventory; avoid a second coverage table.

## Evolution

This starting point adapts the component-fixture and PNG/JSON evidence pattern
developed in Guilty Pleasure AI. Its source repository, `ai-girlfriend-content`,
has a broader system documented in `docs/design-harness.md` and
`docs/component-visual-testing.md`; it is a reference, not a runtime dependency.

Extend this harness after repeated product work exposes a gap. A searchable
catalog may help when components become hard to find; geometry reports may help
when screenshots repeatedly leave a layout question unresolved. Neither is
required for the current capture/review loop. Keep reports advisory and reserve
test failures for accepted behavioral contracts and execution errors.
