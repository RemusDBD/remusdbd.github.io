#!/usr/bin/env python3
"""Rebuild sitemap.xml with canonical URLs from every published blog page."""

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse
import xml.etree.ElementTree as ET

SITE = "https://remusdbd.github.io"
BLOG_DIR = Path("blog")
SITEMAP_PATH = Path("sitemap.xml")
NS = "http://www.sitemaps.org/schemas/sitemap/0.9"
ET.register_namespace("", NS)


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


def canonical_url(path: Path):
    parser = CanonicalParser()
    parser.feed(path.read_text(encoding="utf-8"))
    url = parser.url
    if not url:
        print(f"Skipping {path}: canonical link not found")
        return None
    parsed = urlparse(url)
    if parsed.scheme != "https" or parsed.netloc != "remusdbd.github.io":
        print(f"Skipping {path}: canonical URL is not on this site: {url}")
        return None
    if parsed.path != "/blog/" and not parsed.path.startswith("/blog/"):
        print(f"Skipping {path}: canonical URL is outside /blog/: {url}")
        return None
    return url


def _bootstrap_hero_media() -> bool:
    """Decode staged hero media when a staging trigger is present.

    The one-shot helper lives in scripts/materialize_hero_media.py and is
    removed again by itself once it has published the real media files.
    """
    try:
        from materialize_hero_media import bootstrap_hero_media
    except Exception:
        return False
    try:
        return bool(bootstrap_hero_media())
    except Exception as exc:
        print(f"hero media bootstrap skipped: {exc}")
        return False


def main():
    if _bootstrap_hero_media():
        return

    if not SITEMAP_PATH.exists():
        raise SystemExit("sitemap.xml is missing; refusing to create a partial site map.")

    tree = ET.parse(SITEMAP_PATH)
    root = tree.getroot()
    loc_tag = f"{{{NS}}}loc"
    url_tag = f"{{{NS}}}url"

    # Keep all existing non-blog URLs and their metadata. Blog entries are
    # replaced from the live HTML files so stale post URLs disappear.
    for entry in list(root.findall(url_tag)):
        loc = entry.findtext(loc_tag, default="").strip()
        path = urlparse(loc).path
        if path == "/blog" or path == "/blog/" or path.startswith("/blog/"):
            root.remove(entry)

    # Recurse so future posts work even if they are nested in subdirectories.
    candidates = sorted(BLOG_DIR.rglob("index.html"))


    urls = sorted({url for path in candidates if (url := canonical_url(path))})
    for url in urls:
        entry = ET.SubElement(root, url_tag)
        ET.SubElement(entry, loc_tag).text = url

    ET.indent(tree, space="  ")
    tree.write(SITEMAP_PATH, encoding="UTF-8", xml_declaration=True)
    print(f"Updated {SITEMAP_PATH}: {len(urls)} blog URLs; preserved existing non-blog URLs.")


if __name__ == "__main__":
    main()
