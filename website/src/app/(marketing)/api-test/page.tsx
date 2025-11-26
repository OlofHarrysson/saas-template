"use client";

import { useState } from "react";

// Local dev: run uvicorn separately on port 8000
// Production: uses /python-api/* via Vercel rewrites
const PYTHON_API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "/python-api";

export default function ApiTestPage() {
  const [pythonResult, setPythonResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function testPythonApi() {
    setLoading(true);
    const res = await fetch(`${PYTHON_API_URL}/health`);
    const data = await res.json();
    setPythonResult(JSON.stringify(data, null, 2));
    setLoading(false);
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">API Test Page</h1>

      <p className="text-sm text-base-content/60 mb-4">
        API URL: {PYTHON_API_URL}
      </p>

      <div className="space-y-4">
        <div>
          <button
            onClick={testPythonApi}
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? "Loading..." : "Test Python API (/health)"}
          </button>
        </div>

        {pythonResult && (
          <pre className="bg-base-200 p-4 rounded-lg overflow-auto">
            {pythonResult}
          </pre>
        )}
      </div>
    </div>
  );
}

