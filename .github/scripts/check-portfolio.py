"""Check static site links and anchors on the main portfolio entry points."""

import argparse
from functools import cache
from html.parser import HTMLParser
from pathlib import Path
import sys
from urllib.parse import unquote, urljoin, urlsplit


SITE = "https://grizzlyse.com"
PAGES = (
    "/", "/portfolio/", "/projects/", "/lab.html", "/solutions.html",
    "/range/", "/range/machine.html", "/csmath/", "/spanish/", "/russian/", "/zone/",
    "/dashboard/", "/dashboard/display.html", "/dashboard/public/display.html", "/MTMAdash/",
    "/stationdemokratiya/", "/stationdemokratiya/station-demokratiya.html", "/incident.html",
)


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.references = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get("id"):
            self.ids.add(attrs["id"])
        for attr in ("href", "src"):
            if attrs.get(attr):
                self.references.append(attrs[attr])


@cache
def parse(path):
    page = Page()
    page.feed(path.read_text(encoding="utf-8"))
    page.close()
    return page


def as_file(root, path):
    candidate = root / unquote(path).lstrip("/")
    return candidate / "index.html" if candidate.is_dir() else candidate


def main(root, built=False):
    pages = PAGES + (("/aft-forge/",) if built else ())
    errors = []
    checked = 0
    for route in pages:
        source = as_file(root, route)
        if not source.is_file():
            errors.append(f"{route}: page missing")
            continue
        for reference in parse(source).references:
            url = urlsplit(urljoin(SITE + route, reference))
            if url.scheme not in ("http", "https") or url.netloc != "grizzlyse.com":
                continue
            checked += 1
            target = as_file(root, url.path)
            fragment = unquote(url.fragment)
            if not target.is_file():
                errors.append(f"{route}: {reference} → missing file")
            elif target.suffix == ".html" and fragment and not fragment.startswith("/"):
                # Fragments starting with '/' are app-router paths, not DOM IDs.
                if fragment not in parse(target).ids:
                    errors.append(f"{route}: {reference} → missing anchor")
    if errors:
        print("\n".join(errors), file=sys.stderr)
        return 1
    print(f"Verified {checked} local links and assets across {len(pages)} pages.")
    return 0


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("site_root", type=Path)
    parser.add_argument("--built", action="store_true", help="also check the compiled AFT Forge entry point")
    args = parser.parse_args()
    sys.exit(main(args.site_root, args.built))
