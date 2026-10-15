#!/usr/bin/env python3
"""Notify IndexNow of changed canonical blog URLs from a newline-delimited file."""

import json
import os
import sys
import urllib.error
import urllib.request
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse

SITE = "https://remusdbd.github.io"
KEY = "c9aead0153988467bc2d2b74365c4418"
KEY_LOCATION = f"{SITE}/{KEY}.txt"


class CanonicalParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.url = None

    def handle_starttag(self, tag, attrs):
        if tag.lower() != "link":
            return
        attrs = dict(attrs)
        rel = {part.lower() for part in attrs.get("rel", "").split()}
        href = attrs.get("href", "").strip()
        if "canonical" in rel and href:
            self.url = href


def canonical_from_file(path_string):
    path = Path(path_string)
    if not path.is_file() or path.suffix.lower() != ".html":
        return None
    if path.parts[0] != "blog":
        return None
    parser = CanonicalParser()
    parser.feed(path.read_text(encoding="utf-8"))
    url = parser.url
    if not url:
        print(f"Skipping {path}: canonical link not found")
        return None
    parsed = urlparse(url)
    if parsed.scheme != "https" or parsed.netloc != "remusdbd.github.io":
        print(f"Skipping {path}: off-site canonical URL")
        return None
    if not (parsed.path == "/blog/" or parsed.path.startswith("/blog/")):
        print(f"Skipping {path}: URL is outside the blog")
        return None
    return url


def main():
    key = os.environ.get("INDEXNOW_KEY", KEY).strip()
    key_location = os.environ.get("INDEXNOW_KEY_LOCATION", f"{SITE}/{key}.txt")
    changed_file = os.environ.get("CHANGED_FILES_FILE", "")
    if not changed_file or not Path(changed_file).is_file():
        print("No changed-files list supplied; no IndexNow notification needed.")
        return

    urls = sorted({
        url for line in Path(changed_file).read_text(encoding="utf-8").splitlines()
        if (url := canonical_from_file(line.strip()))
    })
    if not urls:
        print("No changed blog canonical URLs to notify.")
        return

    payload = {
        "host": "remusdbd.github.io",
        "key": key,
        "keyLocation": key_location,
        "urlList": urls,
    }
    request = urllib.request.Request(
        "https://api.indexnow.org/IndexNow",
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json; charset=utf-8"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            print(f"IndexNow accepted request: HTTP {response.status} for {len(urls)} URL(s).")
    except urllib.error.HTTPError as exc:
        # 200/202/204 are success; IndexNow may return 400/403 if the key
        # verification file is not deployed or the payload is invalid.
        if exc.code in (200, 202, 204):
            print(f"IndexNow accepted request: HTTP {exc.code} for {len(urls)} URL(s).")
            return
        print(f"IndexNow request failed: HTTP {exc.code}: {exc.read().decode('utf-8', 'replace')}", file=sys.stderr)
        raise SystemExit(1)
    except (urllib.error.URLError, TimeoutError) as exc:
        print(f"IndexNow request failed: {exc}", file=sys.stderr)
        raise SystemExit(1)


if __name__ == "__main__":
    main()
