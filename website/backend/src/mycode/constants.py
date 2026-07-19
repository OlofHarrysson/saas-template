"""Stable, code-controlled values shared across Python modules."""

from pathlib import Path


BACKEND_ROOT = Path(__file__).resolve().parents[2]
ENV_FILE = BACKEND_ROOT / ".env"
ENV_TEMPLATE_FILE = BACKEND_ROOT / ".env.template"
DEFAULT_CACHE_DIR = BACKEND_ROOT / "data" / "cache"

API_TITLE = "Template API"
API_VERSION = "1.0.0"
LOCAL_CORS_ORIGINS = ("http://localhost:3000",)
