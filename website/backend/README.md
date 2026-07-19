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
cd website/backend
uv sync
cp .env.template .env
```

`DATABASE_URL` is currently required. Optional integrations remain documented in `.env.template` and can be made required in `Settings` when a project depends on them.

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
