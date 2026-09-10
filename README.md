# The Definitive Laptop Guide for CS Students & Software Engineers (September 2026 Edition)

A ~43,000-word, independent, in-depth guide to choosing a laptop for computer science study, software engineering work, and everyday daily-driver use — plus an interactive web version with a 33-laptop comparison tool, a 5-question pick finder, and full-text search.

**No sponsors. No affiliate links.** Written from a September 2026 vantage point and fact-checked through **September 10, 2026** (v1.1): Apple M5 family and the newly announced M6, Intel Panther Lake and Wildcat Lake, AMD Ryzen AI 400 / Strix Halo, Snapdragon X2, Nvidia RTX Spark (N1X), the 2025–26 memory shortage and its price effects.

## Read it

| Format | Where |
|---|---|
| **Web version** — chapter nav, in-page TOC, dark/light, search, **compare 33 laptops side by side**, **pick finder** with shareable results | **https://gorg667.github.io/laptop-research/** |
| **Single Markdown file** (whole guide, with TOC) | [`GUIDE.md`](./GUIDE.md) |
| **Chapter files** (source of truth) | [`guide/`](./guide/) |
| Structured laptop data (JSON) | [`web/data/laptops.json`](./web/data/laptops.json) |
| Research notes & sources | [`research/`](./research/) |

## What's inside

1. **Fundamentals (Ch. 1–12):** methodology · what dev workloads actually stress (spoiler: RAM) · macOS vs Windows/WSL2 vs Linux · the five-vendor silicon landscape · memory & storage in a shortage year · display · keyboard/trackpad/AV · battery & charging · ports & docking · thermals & noise · build/repair/warranty/Linux compatibility · do you need a dGPU?
2. **Picks (Ch. 13–14):** by budget tier (<$700 → $2,200+) and by persona (frugal freshman, ML track, game dev, Linux purist, mobile dev, working SWE, systems/infra, EE/CE, nomad, gamer-coder, desktop replacement, parent buying).
3. **Around the purchase (Ch. 15–21):** student discounts & refurb strategy · day-one setup per OS · accessories & ergonomics · mistakes & myths · FAQ · glossary · sources & changelog.

### TL;DR (September 2026)

- **Safest answer:** MacBook Air 13"/15" M5 with **24 GB** ($1,499 / $1,699; edu −$100). The M6 Air isn't due until early 2027 — buy the M5.
- **Best value:** Apple Certified Refurbished **M4 Air 16 GB** (~$850–950), or a used **ThinkPad T14 Gen 3/4 AMD with 32 GB** (~$500).
- **Windows:** ThinkPad X1 Carbon Gen 13/14 · Dell XPS 14 (2026) · HP OmniBook Ultra 14 · Surface Laptop 8 — **never at list price**.
- **Linux:** Framework Laptop 13 Pro · ThinkPad T14s Gen 7 AMD. Avoid Snapdragon.
- **GPU:** Asus ROG Zephyrus G14 (2026) RTX 5070, 32 GB. For ML, VRAM ≥ 12 GB or use the cloud.
- **Never 8 GB** — including the $699 MacBook Neo, Dell XPS 13 (2026), and Framework Laptop 12 base models.
- **Wait** only for the base 14" MacBook Pro (M6 version reported for late 2026). Don't wait for RTX Spark laptops.

## Run the web version locally

```bash
./scripts/build.sh                      # guide/*.md → GUIDE.md + web/content/ + sitemap; runs validate.py
cd web && python3 -m http.server 8080   # open http://localhost:8080
```

No build tooling, no framework, no CDN dependency: `web/` is plain HTML/CSS/JS plus a vendored copy of [marked](https://github.com/markedjs/marked).

## Quality checks

```bash
python3 scripts/validate.py   # data schema, chapter cross-refs, manifest sync, GUIDE.md TOC anchors, finder scenarios
python3 scripts/qa.py         # headless browser: console errors + horizontal overflow at 1400/1000/420 px, screenshots → .tmp/shots/
                              # (needs: pip install playwright && playwright install chromium)
```

## Update / redeploy

```bash
# edit guide/*.md and/or web/data/laptops.json, add a changelog line in guide/21-*.md, then:
./scripts/build.sh && git add -A && git commit -m "..." && git push
./scripts/deploy-pages.sh     # rebuilds and force-pushes the static bundle to the gh-pages branch
```

GitHub Pages is served from the **`gh-pages`** branch (Settings → Pages → Deploy from a branch → `gh-pages` / root). An Actions-based alternative lives in [`ci-templates/pages.yml`](./ci-templates/pages.yml) — copy it to `.github/workflows/` to deploy automatically on every push to `main`.

## Repo layout

```
guide/            chapter sources (numbered; 13a–e = budget tiers, 14a–b = personas)
GUIDE.md          generated single-file guide (do not edit by hand)
web/              static site
  index.html      shell (a11y, SEO meta, JSON-LD)
  css/style.css   responsive layout, dark/light themes, print
  js/app.js       hash router, markdown rendering, in-page TOC, keyboard shortcuts
  js/tools.js     comparison tool (filters, table/cards, side-by-side) + pick finder
  js/search.js    client-side full-text search
  js/vendor/      marked.min.js
  data/laptops.json   structured data for 33 machines (editorial 1–5 ratings)
  content/        chapters + manifest.json synced from guide/ by build.sh
  404.html, robots.txt, sitemap.xml
research/         raw research notes with sources (Sep 2026)
scripts/          build.sh, deploy-pages.sh, validate.py, qa.py
ci-templates/     optional GitHub Actions workflow
PROGRESS.md       agent working log / reasoning trail (repo-specific state; read first when resuming)
CLAUDE.md         general rules for AI agents working in an ephemeral sandbox (push after every step)
IMPROVEMENTS.md   prioritised backlog of future work
```

## Keyboard shortcuts (web)

`/` search · `[` / `]` previous / next chapter · `t` toggle theme

## Contributing

Corrections and updates are welcome — open an issue or PR. Every chapter page has a "suggest an edit" link. When changing a recommendation, update the chapter, `web/data/laptops.json` if the machine is in the comparison set, and the changelog in Chapter 21; run `./scripts/build.sh` (which validates) before committing.

## License

Text: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Code: [MIT](./LICENSE). `web/js/vendor/marked.min.js` is MIT © Christopher Jeffrey.
