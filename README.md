# The Definitive Laptop Guide for CS Students & Software Engineers (September 2026 Edition)

A ~40,000-word, independent, in-depth guide to choosing a laptop for computer science study, software engineering work, and everyday daily-driver use — plus an interactive web version.

**No sponsors. No affiliate links.** Written from a September 2026 vantage point (Apple M5, Intel Panther Lake, AMD Ryzen AI 400, Snapdragon X2, Nvidia N1X; the 2025–26 memory shortage and its price effects).

## Read it

| Format | Where |
|---|---|
| **Single Markdown file** (whole guide, with TOC) | [`GUIDE.md`](./GUIDE.md) |
| **Chapter files** (source of truth) | [`guide/`](./guide/) |
| **Web version** (chapter nav, dark/light, **interactive comparison of 31 laptops**, **5-question pick finder**) | `https://gorg667.github.io/laptop-research/` — see *Enable GitHub Pages* below |
| Research notes & sources | [`research/`](./research/) |

## What's inside

1. **Fundamentals (Ch. 1–12):** methodology · what dev workloads actually stress (spoiler: RAM) · macOS vs Windows/WSL2 vs Linux · the five-vendor silicon landscape · memory & storage in a shortage year · display · keyboard/trackpad/AV · battery & charging · ports & docking · thermals & noise · build/repair/warranty/Linux compatibility · do you need a dGPU?
2. **Picks (Ch. 13–14):** by budget tier (<$700 → $2,200+) and by persona (frugal freshman, ML track, game dev, Linux purist, mobile dev, working SWE, systems/infra, EE/CE, nomad, gamer-coder, desktop replacement, parent buying).
3. **Around the purchase (Ch. 15–21):** student discounts & refurb strategy · day-one setup per OS · accessories & ergonomics · mistakes & myths · FAQ · glossary · sources & changelog.

## Enable GitHub Pages (one-time, repo owner)

The web build is already pushed to the **`gh-pages`** branch. To publish it:

1. Go to **Settings → Pages** in this repo.
2. Under *Build and deployment*, set **Source: Deploy from a branch**, **Branch: `gh-pages`**, folder **`/ (root)`**. Save.
3. The site appears at `https://gorg667.github.io/laptop-research/` within a minute.

(An Actions-based workflow is also provided in [`ci-templates/pages.yml`](./ci-templates/pages.yml) — copy it to `.github/workflows/` if you prefer automatic deploys on push; the automation token used to write this repo cannot create workflow files itself.)

## Run the web version locally

```bash
./scripts/build.sh            # guide/*.md → GUIDE.md + web/content/
cd web && python3 -m http.server 8080   # then open http://localhost:8080
```

## Update / redeploy

```bash
# edit guide/*.md and/or web/data/laptops.json, then:
./scripts/build.sh && git add -A && git commit -m "..." && git push
./scripts/deploy-pages.sh     # rebuilds and force-pushes the static bundle to gh-pages
```

## Repo layout

```
guide/            chapter sources (numbered; 13a–e = budget tiers, 14a–b = personas)
GUIDE.md          generated single-file guide
web/              static site: index.html, css/, js/ (app.js router, tools.js compare+finder), data/laptops.json, content/ (synced chapters)
research/         raw research notes with sources (Sep 2026)
scripts/          build.sh, deploy-pages.sh
ci-templates/     optional GitHub Actions workflow
PROGRESS.md       agent working log / reasoning trail
```

## License

Text: CC BY 4.0. Code: MIT.
