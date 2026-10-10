---
name: react-doctor
description: Check React changes for new static-analysis findings, or run a requested React code-quality audit. Use after React implementation changes; documentation-only edits do not need a scan.
---

# React Doctor

Run from the React application's directory (`website/` in this repository).
For uncommitted changes on the current branch:

```bash
npx -y react-doctor@latest . --verbose --scope changed --base HEAD --include-untracked
```

For committed work, choose the commit before the change as `--base`. The changed
scope reports new issues relative to that revision; fix regressions introduced
by the work before committing. Check the reported files and skipped diagnostics
before treating an empty result as a pass.

For a requested full audit, use `--scope full`. Compare scores only across the
same source scope and tool version. Generated build output, Python environments,
and unrelated work can distort a whole-checkout scan; use clean source snapshots
when needed. A partial or changed-scope score is not a full-project baseline.
Report existing findings separately from regressions; keep unrelated cleanup
within the agreed scope. Do not suppress rules just to improve the score.
