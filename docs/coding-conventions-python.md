# Python coding conventions

Read the [shared conventions](coding-conventions.md) first. These preferences
apply to APIs, scripts, exploratory analysis and data preparation alike.

## Style

- Use `snake_case` for modules and functions, and `PascalCase` for classes.
- Use `pathlib` instead of `os.path`.
- Use modern type hints (`list[int]`, `dict[str, str]`, `X | None`).
- Prefer namespace imports over direct symbol imports when practical
  (`import functools` then `functools.cache`).
- Start non-trivial modules with a concise docstring explaining their responsibility.

## Models, configuration and resources

The Python reference uses the `mycode` package. Adapt that package name when
initializing a product, while preserving these responsibilities:

- Put reusable Pydantic models and shared type definitions in `mycode/models.py`;
  import them instead of redefining equivalent local schemas.
- Put code-controlled defaults, hyperparameters, paths and invariant values in
  `mycode/constants.py`. Constants must not read environment variables or perform I/O.
- Access environment-controlled values through the single
  `mycode.settings.Settings` model and `get_settings()`, not scattered
  `os.environ` or `dotenv` calls.
- Give every settings field an explicit environment-variable alias and useful
  description. Regenerate `.env.template` with `uv run python -m mycode.settings`
  from the Python project directory after changing the model.
- Keep resource construction and side effects out of constants and models;
  for example, cache directory creation belongs in `mycode/cache.py`.

## Tooling

Use the project's `pyproject.toml`, uv environment and Ruff configuration.
The [Python README](../website/backend/README.md) owns setup and commands.
In this template, the Python project directory is `website/backend/`; a
standalone Python export places it at `python/`.
