"""Check the exported portfolio and bundled trial evidence with Python's standard library."""
from collections import Counter
from hashlib import sha256
from html.parser import HTMLParser
import json
from pathlib import Path
from urllib.parse import urlsplit
from zipfile import ZipFile

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "out"
VOID = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}


class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids, self.links, self.assets, self.scripts, self.projects = [], [], [], [], []
        self.h1_count = 0
        self.archive_collapsed = None
        self.stack = []
        self.project_title = None

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if "id" in attrs:
            self.ids.append(attrs["id"])
        if tag == "h1":
            self.h1_count += 1
        if tag == "a" and attrs.get("href"):
            self.links.append(attrs["href"])
        for key in ("href", "src", "poster"):
            if attrs.get(key):
                self.assets.append(attrs[key])
        if tag == "details" and "archive-search" in attrs.get("class", "").split():
            self.archive_collapsed = "open" not in attrs
        if tag == "h3" and any("stack-item" in a.get("class", "").split() for _, a in self.stack):
            self.project_title = []
        if tag not in VOID:
            self.stack.append((tag, attrs))

    def handle_endtag(self, tag):
        if tag == "h3" and self.project_title is not None:
            self.projects.append("".join(self.project_title).strip())
            self.project_title = None
        for index in range(len(self.stack) - 1, -1, -1):
            if self.stack[index][0] == tag:
                del self.stack[index:]
                break

    def handle_data(self, data):
        if self.stack and self.stack[-1][0] == "script":
            self.scripts.append(data)
        if self.project_title is not None:
            self.project_title.append(data)


results = []
for name in ("index.html", "career-summary.html", "evidence/driftlab-10000.html"):
    file = OUT / name
    text = file.read_text(encoding="utf-8")
    assert not any(ord(c) < 32 and c not in "\r\n\t" for c in text), name
    page = Page()
    page.feed(text)
    missing = []
    for asset in page.assets:
        url = urlsplit(asset)
        if url.scheme or url.netloc or not url.path:
            continue
        target = OUT / url.path.lstrip("/") if url.path.startswith("/") else file.parent / url.path
        if target.is_dir():
            target /= "index.html"
        if not target.exists():
            missing.append(asset)
    result = {
        "file": name,
        "duplicate_ids": [key for key, count in Counter(page.ids).items() if count > 1],
        "broken_fragments": [link for link in page.links if link.startswith("#") and link[1:] not in page.ids],
        "missing_local_assets": missing,
        "h1_count": page.h1_count,
    }
    if name == "index.html":
        (ROOT / "qa" / "home-script.js").write_text("\n".join(page.scripts), encoding="utf-8")
        result.update(project_order=page.projects, archive_collapsed=page.archive_collapsed)
        assert len(page.projects) == 7 and page.archive_collapsed is True
    assert not result["duplicate_ids"] and not result["broken_fragments"] and not missing and page.h1_count == 1, result
    results.append(result)

with ZipFile(OUT / "evidence" / "driftlab-10000-evidence.zip") as evidence:
    trials = evidence.read("driftlab-10000/outputs/no_drift_10000/trials.jsonl")
    records = [json.loads(line) for line in trials.splitlines()]
    assert len(records) == 10000
    assert [record["seed"] for record in records] == list(range(1040, 11040))
    assert not any(record["any_alert"] or any(record["alert_flags"].values()) for record in records)
results.append({"evidence_records": len(records), "trials_sha256": sha256(trials).hexdigest(), "any_alert_count": 0})
report = json.dumps(results, indent=2)
(ROOT / "qa" / "static-checks.json").write_text(report + "\n", encoding="utf-8")
print(report)
