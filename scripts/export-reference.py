"""Export a committed application reference without local data or Git history."""

import argparse
import io
import json
import subprocess
import tarfile
from pathlib import Path, PurePosixPath

ROOT = Path(__file__).resolve().parents[1]
REFERENCES = {
    "nextjs": ("website", "website"),
    "astro": ("references/astro", "website"),
    "python": ("website/backend", "python"),
}


def export_reference(stack: str, destination: Path, revision: str = "HEAD") -> None:
    """Require a new destination; copy regular committed files and provenance."""
    if destination.exists():
        raise ValueError("Destination already exists; export to a new folder, then review any merge.")
    source, target = REFERENCES[stack]
    commit = subprocess.check_output(
        ["git", "rev-parse", "--verify", f"{revision}^{{commit}}"], cwd=ROOT, text=True
    ).strip()
    archive = subprocess.check_output(["git", "archive", commit, source], cwd=ROOT)
    files = []
    with tarfile.open(fileobj=io.BytesIO(archive)) as bundle:
        for member in bundle:
            if member.isdir():
                continue
            path = PurePosixPath(member.name)
            if not member.isfile() or ".." in path.parts or path.is_absolute():
                raise ValueError(f"Unsupported archive entry: {path}")
            relative = path.relative_to(source)
            if any(part.startswith(".env") and part not in {".env.template", ".env.example"} for part in relative.parts):
                raise ValueError(f"Refusing environment data: {relative}")
            if any(part in {"node_modules", ".venv", ".git", ".vercel"} for part in relative.parts):
                raise ValueError(f"Refusing generated/private directory: {relative}")
            files.append((Path(target, *relative.parts), bundle.extractfile(member).read(), member.mode))
    if not files:
        raise ValueError("Reference is empty")
    destination.mkdir(parents=True, exist_ok=False)
    for path, content, mode in files:
        output = destination / path
        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_bytes(content)
        output.chmod(mode & 0o777)
    (destination / "template-source.json").write_text(json.dumps({
        "reference": stack, "repository": "OlofHarrysson/saas-template",
        "commit": commit, "sourcePath": source, "destinationPath": target,
    }, indent=2) + "\n")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("stack", choices=REFERENCES)
    parser.add_argument("destination", type=Path)
    parser.add_argument("--revision", default="HEAD", help="Committed revision; uncommitted changes are never copied")
    args = parser.parse_args()
    try:
        export_reference(args.stack, args.destination.expanduser().absolute(), args.revision)
    except (ValueError, subprocess.CalledProcessError) as error:
        parser.exit(1, f"Export failed: {error}\n")
