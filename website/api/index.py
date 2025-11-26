import sys
from pathlib import Path

from fastapi import FastAPI

# Add backend src to path so imports work
sys.path.insert(0, str(Path(__file__).parent.parent / "backend" / "src"))

from mycode.api.app import app as api_router

# Create wrapper app and mount the API at /python-api
app = FastAPI()
app.mount("/python-api", api_router)

