# Testing

## Red–green loop

1. For user-facing behavior, write or refine the relevant
   [story](user-stories.md) and its observable acceptance criteria.
2. Add the smallest deterministic test that demonstrates the missing behavior.
   Run it and confirm the failure is the intended assertion, not missing setup,
   a broken server, or unavailable credentials.
3. Implement the smallest change that makes that test pass.
4. Refactor when useful while keeping it green. Never weaken an assertion just
   to make a failing result disappear.
5. Run related tests, then the wider checks justified by the change.
6. Inspect the actual experience when visual or interactive behavior matters.
   Reconcile story support, project status, and significant log evidence.

For a regression, reproduce the bug before fixing it. Existing behavior can
receive characterization tests without pretending a new red stage occurred.
Documentation-only edits need link/consistency checks, not invented tests.
If a red check is impractical, record why and what evidence was used instead.

Use the same sequence for backend, CLI, and data behavior. Choose tests at the
narrowest responsible boundary; ordinary technical contracts do not need a
story ID or a browser. Add a backend test suite when behavior requires it,
rather than copying frontend test machinery into Python.

## Frontend commands

Run from `website/` after [setup](../website/README.md#first-setup):

```bash
npm run lint
npm run test:e2e
npm run test:e2e -- --grep @US-001
npm run design:capture
npm run design:report
```

`test:e2e` builds and starts a temporary production server. `design:capture`
starts a temporary development server to exercise the development-only review
routes. Both use the existing Playwright runner, own and stop their temporary
server, and can use `PLAYWRIGHT_BASE_URL` to inspect an already-running server.
The visual suite must point to a development server. The production-isolation
test is skipped when an external server is selected, since its mode is unknown.

Use Devrun for persistent local services on Olof's machine. To capture the
registered template service after starting it through Devrun:

```bash
PLAYWRIGHT_BASE_URL=http://127.0.0.1:3007 npm run design:capture
```

Use the service's actual port if it differs. Tests do not stop a server supplied
through `PLAYWRIGHT_BASE_URL`.

The existing authenticated test is a separate, credentialed boundary check:

```bash
npm run test:e2e:dev
```

It targets the template's development server on port 3007 and creates a test
database session. Default smoke and design checks do not submit login forms or
send email. The visual suite supplies an anonymous session fixture so captures
do not depend on a provider or database. That fixture is not auth verification.

## Python checks

Run from `website/backend/`:

```bash
uv sync
make lint
```

For API changes, verify `/`, `/health`, and the changed endpoints, alongside
focused tests for the changed behavior. Pure tests should use fixtures or fakes
without credentials; real integrations are separate boundary checks. The starter
currently has no Python behavioral test suite.

## Evidence and closeout

Keep story IDs on meaningful behavior tests and test links in the story itself;
there is no second implementation-map document to maintain. Use `--grep` to
select a Playwright story and normal test-runner selectors for technical tests.

Report passes, failures, skips, and unverified boundaries separately. A local
build is not a hosted deployment check, a fixture is not a real-provider check,
and a screenshot is not founder acceptance. The [design harness](design-harness.md)
owns the visual artifact recipe.
