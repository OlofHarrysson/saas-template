"""Construct the shared disk cache without import-time filesystem writes."""

import functools

import joblib

from mycode import constants


@functools.cache
def get_memory() -> joblib.Memory:
    """Create the cache directory and return the shared joblib cache."""
    constants.DEFAULT_CACHE_DIR.mkdir(parents=True, exist_ok=True)
    return joblib.Memory(location=constants.DEFAULT_CACHE_DIR, verbose=0)
