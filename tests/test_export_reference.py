"""Exercise reference export against a disposable committed source repository."""

import importlib.util
import json
import subprocess
import tempfile
import unittest
from pathlib import Path

spec = importlib.util.spec_from_file_location("exporter", Path(__file__).parents[1] / "scripts/export-reference.py")
exporter = importlib.util.module_from_spec(spec)
spec.loader.exec_module(exporter)


class ExportTests(unittest.TestCase):
    def test_committed_content_only_and_no_overwrite(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp) / "source"
            root.mkdir()
            def git(*args):
                return subprocess.check_output(["git", *args], cwd=root)
            git("init", "-q")
            for path in exporter.REFERENCES.values():
                folder = root / path[0]
                folder.mkdir(parents=True, exist_ok=True)
                (folder / "example.txt").write_text("committed")
            git("add", ".")
            git("-c", "user.name=Test", "-c", "user.email=test@example.invalid", "commit", "-qm", "fixture")
            old_root = exporter.ROOT
            exporter.ROOT = root
            try:
                for stack, (source, target) in exporter.REFERENCES.items():
                    (root / source / "example.txt").write_text("uncommitted")
                    (root / source / ".env").write_text("PRIVATE=value")
                    destination = Path(tmp) / stack
                    exporter.export_reference(stack, destination)
                    self.assertEqual((destination / target / "example.txt").read_text(), "committed")
                    self.assertFalse((destination / target / ".env").exists())
                    self.assertEqual(json.loads((destination / "template-source.json").read_text())["commit"], git("rev-parse", "HEAD").decode().strip())
                    with self.assertRaises(ValueError):
                        exporter.export_reference(stack, destination)
                git("add", "website/.env")
                git("-c", "user.name=Test", "-c", "user.email=test@example.invalid", "commit", "-qm", "bad fixture")
                rejected = Path(tmp) / "rejected"
                with self.assertRaises(ValueError):
                    exporter.export_reference("nextjs", rejected)
                self.assertFalse(rejected.exists())
            finally:
                exporter.ROOT = old_root
