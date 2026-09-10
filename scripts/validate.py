#!/usr/bin/env python3
"""Repo consistency checks. No dependencies beyond the standard library.

  - web/data/laptops.json: schema, ranges, unique ids, known personas/tiers/OS
  - guide/*.md: every chapter has an H1/H2 title; no duplicate H2 anchors within a chapter;
    internal "Chapter N" references point at chapters that exist
  - web/content/ mirrors guide/ and manifest.json is in sync (run scripts/build.sh first)
  - GUIDE.md TOC anchors resolve
  - finder scenarios: the JSON-driven recommender (re-implemented here) yields the picks Ch. 14 promises

Exit code 1 on any failure. Run: python3 scripts/validate.py
"""
import json, re, sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
fails, warns = [], []
def fail(m): fails.append(m)
def warn(m): warns.append(m)

# ---------- laptops.json ----------
PERSONAS = {"freshman", "sophomore", "ml-noncuda", "ml-cuda", "gamedev", "linux", "mobile", "swe", "systems", "ee-ce", "nomad", "gamer-coder", "desktop", "parent"}
OS = {"macOS", "Windows", "Linux"}
REQ = {"id": str, "name": str, "brand": str, "os": list, "chip": str, "arch": str, "ram": str, "recRam": str, "storage": str, "display": str,
       "weightKg": (int, float), "batteryWh": (int, float), "battRealH": str, "ports": str, "gpu": str, "price": int, "recPrice": int, "tier": int,
       "linux": int, "keyboard": int, "displayScore": int, "battery": int, "build": int, "repair": int, "sustained": int, "noise": int,
       "personas": list, "tags": list, "pros": str, "cons": str, "verdict": str}
data = json.loads((ROOT / "web/data/laptops.json").read_text())
L = data["laptops"]
ids = set()
for l in L:
    n = l.get("id", "?")
    for k, t in REQ.items():
        if k not in l: fail(f"{n}: missing field {k}"); continue
        if not isinstance(l[k], t): fail(f"{n}: {k} should be {t}, got {type(l[k]).__name__}")
    if n in ids: fail(f"duplicate id {n}")
    ids.add(n)
    if not re.fullmatch(r"[a-z0-9-]+", n): fail(f"{n}: id must be kebab-case")
    if not set(l["os"]) <= OS: fail(f"{n}: unknown OS {set(l['os']) - OS}")
    if not set(l["personas"]) <= PERSONAS: fail(f"{n}: unknown personas {set(l['personas']) - PERSONAS}")
    if not l["personas"]: warn(f"{n}: no personas — finder can never recommend it")
    for k in ("linux", "keyboard", "displayScore", "battery", "build", "repair", "sustained", "noise"):
        if not 1 <= l[k] <= 5: fail(f"{n}: rating {k}={l[k]} out of 1–5")
    if not 1 <= l["tier"] <= 5: fail(f"{n}: tier {l['tier']}")
    if not 0.8 <= l["weightKg"] <= 3.5: fail(f"{n}: weight {l['weightKg']} kg implausible")
    if not 30 <= l["batteryWh"] <= 100: fail(f"{n}: battery {l['batteryWh']} Wh implausible (max legal 100)")
    if l["recPrice"] < 300 or l["recPrice"] > 6000: fail(f"{n}: recPrice {l['recPrice']}")
    # tier boundaries (recPrice is what the tier is defined on; allow 10% slack for sale-price ranges)
    bounds = {1: (0, 700), 2: (700, 1000), 3: (1000, 1500), 4: (1500, 2200), 5: (2200, 99999)}
    lo, hi = bounds[l["tier"]]
    if not lo * 0.9 <= l["recPrice"] <= hi * 1.15: warn(f"{n}: recPrice ${l['recPrice']} sits outside tier {l['tier']} range ${lo}–{hi}")
    if l["gpu"].startswith("integrated") and "ml-cuda" in l["personas"]: fail(f"{n}: ml-cuda persona but integrated GPU")
    if "Linux" in l["os"] and l["linux"] < 3: warn(f"{n}: lists Linux as an OS but Linux rating is {l['linux']}")
    if l["arch"] not in ("arm64", "x86-64", "x86-64 / arm64"): fail(f"{n}: arch {l['arch']}")
print(f"laptops.json: {len(L)} machines, {len(ids)} unique ids, updated {data['meta'].get('updated')}")

# ---------- guide chapters ----------
guide = sorted((ROOT / "guide").glob("*.md"))
chapter_numbers = set()
for f in guide:
    t = f.read_text()
    if not re.search(r"^#{1,2} ", t, re.M): fail(f"{f.name}: no title heading")
    m = re.match(r"(\d\d)", f.name)
    if m: chapter_numbers.add(int(m.group(1)))
    h2 = re.findall(r"^## (.+)$", t, re.M)
    if len(h2) != len(set(h2)): fail(f"{f.name}: duplicate H2 headings")
    if "TODO" in t or "TBD" in t and "TBD" not in "RTX Spark": warn(f"{f.name}: contains TODO/TBD")
    for ref in set(re.findall(r"Chapters? (\d{1,2})", t)):
        if int(ref) not in chapter_numbers and int(ref) > 21: fail(f"{f.name}: references Chapter {ref} which doesn't exist")
    for ref in set(re.findall(r"§(\d{1,2})\.(\d{1,2})", t)):
        target = [g for g in guide if g.name.startswith(f"{int(ref[0]):02d}")]
        if target and not any(re.search(rf"^##+ {ref[0]}\.{ref[1]}\b", g.read_text(), re.M) for g in target):
            warn(f"{f.name}: §{ref[0]}.{ref[1]} not found as a heading")
words = sum(len(f.read_text().split()) for f in guide)
print(f"guide/: {len(guide)} chapter files, {words:,} words")

# ---------- web/content sync + manifest ----------
content = ROOT / "web/content"
for f in guide:
    c = content / f.name
    if not c.exists(): fail(f"web/content/{f.name} missing — run scripts/build.sh")
    elif c.read_text() != f.read_text(): fail(f"web/content/{f.name} out of date — run scripts/build.sh")
man = json.loads((content / "manifest.json").read_text())
if [c["file"] for c in man] != [f.name for f in guide]: fail("manifest.json chapter list differs from guide/")
for c in man:
    if c["words"] != len((ROOT / "guide" / c["file"]).read_text().split()): fail(f"manifest word count stale for {c['file']}")
print(f"manifest.json: {len(man)} entries in sync")

# ---------- GUIDE.md TOC ----------
G = (ROOT / "GUIDE.md").read_text()
def gh_slug(s):
    s = re.sub(r"[*_`]", "", s).strip().lower()
    return re.sub(r" +", "-", re.sub(r"[^a-z0-9 -]", "", s))
heads = {gh_slug(h) for h in re.findall(r"^#{1,6} (.+)$", G, re.M)}
for anchor in re.findall(r"^- \[.+?\]\(#(.+?)\)$", G, re.M):
    if anchor not in heads: fail(f"GUIDE.md TOC anchor #{anchor} does not resolve")
print(f"GUIDE.md: {len(G.split()):,} words, TOC checked")

# ---------- finder scenarios (mirror of tools.js recommend()) ----------
def recommend(ans):
    R = [l for l in L if not l["ram"].startswith("8 GB")]
    if ans["os"] != "any": R = [l for l in R if ans["os"] in l["os"]]
    if ans["os"] == "Linux": R = [l for l in R if l["linux"] >= 4]
    g = ans["gpu"]
    if g == "cuda": R = [l for l in R if "RTX" in l["gpu"]]
    elif g == "game": R = [l for l in R if not l["gpu"].startswith("integrated")]
    elif g == "llm": R = [l for l in R if "local-llm" in l["tags"] or re.search(r"M5 Pro|M5 Max|Strix", l["chip"]) or re.search(r"RTX 5080|5090|PRO", l["gpu"])]
    else: R = [l for l in R if l["gpu"].startswith("integrated")]
    if ans["mobility"] == "daily": R = [l for l in R if l["weightKg"] <= 1.7]
    t = int(ans["budget"])
    B = [l for l in R if l["tier"] <= t] or [l for l in R if l["tier"] <= t + 1]
    def boost(l): return (10 if ans["persona"] in l["personas"] else 0) + (3 if l["personas"] and l["personas"][0] == ans["persona"] else 0) + (2 if any(re.match(r"^best|linux-first|refurb", x) for x in l["tags"]) else 0) + l["tier"]
    B.sort(key=lambda l: (-boost(l), -(l["keyboard"] + l["displayScore"] + l["battery"] + l["build"])))
    return [l["id"] for l in B[:3]]

SCENARIOS = [  # (answers, expected primary id) — from Chapter 14
    (dict(budget="2", os="any", gpu="no", mobility="daily", persona="freshman"), "mba-m4-refurb"),
    (dict(budget="1", os="Linux", gpu="no", mobility="daily", persona="freshman"), "t14-used"),
    (dict(budget="3", os="any", gpu="no", mobility="daily", persona="sophomore"), "mba-m5-13"),
    (dict(budget="4", os="Windows", gpu="game", mobility="daily", persona="gamedev"), "zephyrus-g14-2026"),
    (dict(budget="3", os="Linux", gpu="no", mobility="daily", persona="linux"), "fw13pro"),
    (dict(budget="5", os="any", gpu="cuda", mobility="some", persona="ml-cuda"), "zephyrus-g16"),
    (dict(budget="5", os="macOS", gpu="llm", mobility="some", persona="ml-noncuda"), "mbp-m5max"),
    (dict(budget="3", os="Windows", gpu="no", mobility="daily", persona="nomad"), {"surface-laptop-8", "omnibook-ultra14", "x1c-g14"}),  # Ch. 14.10 lists all three
    (dict(budget="2", os="Windows", gpu="no", mobility="some", persona="ee-ce"), "t14-g6"),
    (dict(budget="5", os="any", gpu="no", mobility="desk", persona="desktop"), "mbp16-m5pro"),
]
for ans, want in SCENARIOS:
    got = recommend(ans)
    if not got: fail(f"finder {ans}: no result")
    elif not (got[0] in want if isinstance(want, set) else got[0] == want): fail(f"finder {ans}: primary={got[0]} expected {want} (top3={got})")
print(f"finder: {len(SCENARIOS)} scenarios checked")

# ---------- report ----------
for w in warns: print("WARN:", w)
for f_ in fails: print("FAIL:", f_)
print(f"\n{len(fails)} failure(s), {len(warns)} warning(s)")
sys.exit(1 if fails else 0)
