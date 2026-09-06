"""Build command-line interfaces from typed Python function signatures."""

from collections.abc import Callable
from typing import Any

import jsonargparse


def parse_args(func: Callable[..., Any]) -> jsonargparse.Namespace:
    parser = jsonargparse.ArgumentParser()
    parser.add_function_arguments(func)
    return parser.parse_args()
