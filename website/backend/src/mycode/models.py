"""Reusable Pydantic models and shared type definitions."""

from pydantic import BaseModel


class MockResponse(BaseModel):
    """Response model for the template items endpoint."""

    count: int
