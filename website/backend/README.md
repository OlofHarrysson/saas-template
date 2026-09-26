# Python Backend

FastAPI backend and reusable Python workspace for API endpoints, scripts, data preparation, and exploratory work.

## Code Map

```text
src/mycode/
  models.py            Reusable Pydantic models and shared type definitions
  constants.py         Code-controlled defaults, hyperparameters, paths, and invariants
  settings.py          Typed environment settings and .env.template generation
  cache.py             Lazy joblib cache construction
  api/app.py           FastAPI application and endpoints
  api/start_server.py  Local API server entrypoint
  utils/                Logger, argument parsing, and script template
```

Use `models.py` and `constants.py` as the canonical shared locations instead of redefining equivalent schemas or configuration beside individual features. Keep environment reads in `settings.py` and resource initialization in the module that owns the resource.

## Setup

```bash
# Run inside the directory containing pyproject.toml.
uv sync
cp .env.template .env
```

No credentials are required for the example script or sample API. Integrations
are optional in `.env.template`; make a setting required when the product
actually depends on it. This directory can be exported independently as `python/`.

```bash
uv run python -m mycode.utils.template --message "Hello" --repeat_count 1
```

FastAPI is included but starting a server is optional. For scripts and analysis,
use the same uv environment without running an API.

## Environment Settings

Add or change environment variables in `src/mycode/settings.py`. Each field contains the variable name, type, required status, and human-readable explanation used by both runtime validation and the generated template.

Regenerate the template after changing `Settings`:

```bash
uv run python -m mycode.settings
```

Application and script code should load configuration through:

```python
from mycode import settings

app_settings = settings.get_settings()
```

Missing or invalid required values raise an actionable error before the API or script continues. The `.env` file itself is optional when deployment supplies the required variables directly.

## Commands

```bash
make start_api                 # Run FastAPI on localhost:8080
make lint                      # Run read-only Ruff lint checks
make format                    # Format backend Python code
make run_precommit             # Run all configured hooks
make export_api_requirements   # Refresh Vercel's Python requirements
```

The exported Vercel requirements contain runtime dependencies only. Ruff and
pre-commit remain in the local development group.

`export_api_requirements` needs the full Next.js starter's sibling `api/`
directory. Hook commands need a Git repository and its own pre-commit config;
neither is required for a standalone Python workspace.
