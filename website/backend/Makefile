SHELL := /bin/bash
API_FILES := $(wildcard ../api)

install_dependencies:
	uv sync
	uv run pre-commit install --hook-type pre-push --hook-type post-checkout --hook-type pre-commit

run_precommit:
	uv run pre-commit run --all-files

lint:
	uv run ruff check --no-cache . $(API_FILES)

format:
	uv run ruff format . $(API_FILES)

start_api:
	uv run python src/mycode/api/start_server.py

export_api_requirements:
	uv export --format requirements-txt --no-hashes --no-install-project --no-dev > ../api/requirements.txt
