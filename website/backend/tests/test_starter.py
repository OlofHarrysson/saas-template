"""Check the exported workspace without credentials or external services."""

import asyncio
import json
import unittest
import unittest.mock

from mycode import settings
from mycode.api import app


class StarterTests(unittest.TestCase):
    def test_settings_need_no_credentials(self):
        with unittest.mock.patch.dict("os.environ", {}, clear=True):
            config = settings.Settings(_env_file=None)
        self.assertIsNone(config.database_url)

    def test_template_endpoints(self):
        async def get(path):
            responses = []

            async def receive():
                return {"type": "http.request", "body": b"", "more_body": False}

            async def send(message):
                responses.append(message)

            await app.app({"type": "http", "method": "GET", "path": path,
                           "query_string": b"", "headers": [], "scheme": "http",
                           "server": ("localhost", 8080)}, receive, send)
            self.assertEqual(responses[0]["status"], 200)
            return json.loads(b"".join(r.get("body", b"") for r in responses))

        self.assertEqual(asyncio.run(get("/")), {"message": "Template API is running"})
        self.assertEqual(asyncio.run(get("/health")), {"status": "healthy"})
        self.assertEqual(asyncio.run(get("/items")), {"count": 3})


if __name__ == "__main__":
    unittest.main()
