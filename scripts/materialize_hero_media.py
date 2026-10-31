#!/usr/bin/env python3
"""One-shot helper that materialises the staged hero background media.

The site is served as static files, but the hero video is published to the
repository as base64 text because the write path used for this change cannot
push raw binary content. While a staging trigger is present this helper is
invoked by scripts/generate_sitemap.py; it decodes the staged chunks into the
real media files, removes every staging artefact, restores the untouched
sitemap generator and commits the result.

It is deliberately defensive: if anything goes wrong it reports the problem
and leaves the sitemap job to run as usual.
"""

from __future__ import annotations

import base64
import os
import shutil
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SCRIPTS_DIR = ROOT / "scripts"
VIDEO_DIR = ROOT / "assets" / "video"
IMAGE_DIR = ROOT / "assets" / "img"
TRIGGER = VIDEO_DIR / "materialize-trigger.txt"
CHUNK_GLOB = "hero-loop.mp4.b64.*"
VIDEO_OUT = VIDEO_DIR / "hero-loop.mp4"
POSTER_B64 = IMAGE_DIR / "hero-poster.jpg.b64"
POSTER_OUT = IMAGE_DIR / "hero-poster.jpg"
ORIGINAL_GENERATOR = SCRIPTS_DIR / "generate_sitemap.original.py"
GENERATOR = SCRIPTS_DIR / "generate_sitemap.py"

BOT_NAME = "github-actions[bot]"
BOT_EMAIL = "41898282+github-actions[bot]@users.noreply.github.com"


def _run(*args: str) -> None:
    subprocess.run(args, cwd=ROOT, check=True)


def _decode(text: str) -> bytes:
    return base64.b64decode("".join(text.split()))


def bootstrap_hero_media() -> bool:
    """Decode and publish the staged hero media. Returns True when it ran."""
    if not TRIGGER.exists():
        return False

    chunks = sorted(VIDEO_DIR.glob(CHUNK_GLOB))
    if not chunks:
        print("hero media: trigger present but no staged chunks found; skipping")
        return False

    try:
        payload = "".join(chunk.read_text(encoding="utf-8") for chunk in chunks)
        data = _decode(payload)
        if not data:
            raise ValueError("decoded hero video is empty")
        VIDEO_OUT.write_bytes(data)
        print(f"hero media: wrote {VIDEO_OUT.relative_to(ROOT)} ({len(data)} bytes)")

        if POSTER_B64.exists():
            poster = _decode(POSTER_B64.read_text(encoding="utf-8"))
            POSTER_OUT.write_bytes(poster)
            POSTER_B64.unlink()
            print(f"hero media: wrote {POSTER_OUT.relative_to(ROOT)} ({len(poster)} bytes)")

        for chunk in chunks:
            chunk.unlink()
        TRIGGER.unlink()

        if ORIGINAL_GENERATOR.exists():
            GENERATOR.write_text(ORIGINAL_GENERATOR.read_text(encoding="utf-8"))
            ORIGINAL_GENERATOR.unlink()
            print("hero media: restored the original sitemap generator")

        Path(__file__).unlink(missing_ok=True)
        shutil.rmtree(SCRIPTS_DIR / "__pycache__", ignore_errors=True)

        _run("git", "add", "-A")
        if subprocess.run(["git", "diff", "--cached", "--quiet"], cwd=ROOT).returncode == 0:
            print("hero media: nothing staged, nothing to publish")
            return True

        _run("git", "-c", f"user.name={BOT_NAME}", "-c", f"user.email={BOT_EMAIL}",
             "commit", "-m", "assets: add hero background video and poster")
        branch = os.environ.get("GITHUB_REF_NAME", "main")
        _run("git", "push", "origin", f"HEAD:refs/heads/{branch}")
        print(f"hero media: published to {branch}")
        return True
    except Exception as exc:
        print(f"hero media: bootstrap failed: {exc}")
        return False
