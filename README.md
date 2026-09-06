# SaaS template

A Next.js/React frontend and optional FastAPI backend for building and testing
small products. Authentication, analytics, and API scaffolding are included;
keep unused modules until a real implementation conflict requires a change.

## Start here

- [Project vision](docs/project-vision.md): the problem, audience, MVP, and risks.
- [Project status](docs/project-status.md): current outcome, milestone, and next checkpoint.
- [User stories](docs/user-stories.md): observable behavior and acceptance evidence.
- [Frontend setup](website/README.md) and [Python setup](website/backend/README.md).
- [Testing](docs/testing.md): the red–green loop and verification commands.
- [Design](DESIGN.md) and [visual harness](docs/design-harness.md): visual intent and rendered review.

[AGENTS.md](AGENTS.md) owns the complete documentation map and contributor
instructions. Read relevant current documents first; search the
[project log](docs/project-log.md) when historical context is needed.

## Starting a product

Fill the useful parts of the vision, replace the template status and example
stories with the first product outcome, and update the compact context in
`AGENTS.md`. Leave unknowns explicit. Keep audience in the vision and near-term
milestones in project status until either needs more space.

The visual harness uses the app's existing components and Playwright. It adds
no separate component framework. Start with the included page captures and
route-state fixture, then add evidence when real product behavior needs it.
