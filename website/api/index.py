import sys
from pathlib import Path

# Add backend src to path so imports work
sys.path.insert(0, str(Path(__file__).parent.parent / "backend" / "src"))

from mycode.api.app import app

# Vercel expects `app` to be exposed at module level

