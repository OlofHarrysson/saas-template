"""Template for scripts that load settings, parse arguments, and run main."""

# Import module namespaces so function origins remain clear at each call site.
from mycode import settings
from mycode.utils import argument_parsing

# Use the shared configured logger instead of creating local loggers or using print.
from mycode.utils.logger import logger


def main(message: str = "Hello World!", repeat_count: int = 1) -> None:
    """Log an example message to demonstrate typed CLI argument parsing."""
    # Load settings once near startup so missing or invalid configuration fails early.
    app_settings = settings.get_settings()

    # Access configuration through the typed settings object without logging secrets.
    logger.info("Database configuration loaded: %s", bool(app_settings.database_url))

    # Function names, type hints, and defaults become typed command-line arguments.
    logger.info("Example inputs: message=%r, repeat_count=%d", message, repeat_count)


if __name__ == "__main__":
    # Example: python -m mycode.utils.template --message "Hi" --repeat_count 3
    # Derive CLI arguments from main's typed signature, including type conversion.
    args = argument_parsing.parse_args(main)
    main(**args)
