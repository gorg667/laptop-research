# IMPROVEMENTS.md — Backlog of potential future work

Ideas that came up during the v1.0 → v1.1 passes but were not done. Roughly ordered by
value-for-effort within each section. Nothing here is required; the guide and site are complete
as shipped. Tick items off (or delete them) as they land, and add a changelog line in
`guide/21-sources-and-changelog.md`.

## A. Content — keep it true

The guide is a snapshot of September 2026. Its main enemy is time.

- [ ] **Scheduled fact-check cadence.** Re-run the "what changed" pass (like `research/04-update-sep10-2026.md`)
      after each of: Apple October/November Mac announcements (M6 MacBook Pro), RTX Spark laptop pricing
      (Oct 2026), Black Friday (late Nov), CES 2027 (early Jan), spring 2027 MacBook Air M6.
      Each pass: update affected chapters + `laptops.json` + changelog + `meta.updated`.
- [ ] **M6 MacBook Pro 14" on launch:** replace the "wait" advice in Ch. 0/13d/18/19 with a real pick;
      move the M5 14" to "refurb value"; update `mbp14-m5` entry and add `mbp14-m6`.
- [ ] **RTX Spark entries** in `laptops.json` once at least one OEM publishes a price (ProArt P14 and
      Yoga Pro 9n are the developer-relevant ones). Add a `platform: "rtx-spark"` tag and a Ch. 12 verdict
      after the first independent reviews (battery, sustained perf, WoA compatibility).
- [ ] **Independent M6 benchmarks** (Geekbench 7 / Cinebench) when Mac mini units ship Sep 22 → replace the
      "Apple claim, unverified" row in the Ch. 4 comparison table.
- [ ] **Price drift tracker:** a tiny `research/prices.csv` (date, id, price, source) so `recPrice` changes
      are auditable and the changelog can say "X fell 12% since Sep".
- [ ] **Regional editions.** Ch. 15 §15.6 has a few lines on EU/UK/CA/IN/AU. A short appendix per region
      (VAT-inclusive pricing, edu-store availability, refurb channels, warranty law like EU 2-year) would
      make the guide far more useful outside the US.
- [ ] **Per-persona printable one-pagers.** Each of the 14 personas in Ch. 14 as a single printable card:
      primary/alternative pick, non-negotiable spec, 5 things to check. Could be generated from
      `laptops.json` + a small YAML so they never drift from the data.
- [ ] **A "used market" chapter.** Tier 1 leans on used ThinkPads; a dedicated chapter on buying used
      (grading, cycle counts, BIOS locks, what generations are still worth it, how to test in 10 minutes)
      would serve the most budget-constrained readers.
- [ ] **Accessibility section.** Screen-reader quality per OS, high-contrast/large-text behaviour,
      keyboard-only navigation, one-handed use — currently absent.
- [ ] **Sustainability / longevity numbers.** Repair-score sources (iFixit), firmware-update-lifetime
      commitments per OEM, battery-replacement cost table.
- [ ] **Worked examples.** Two or three "here is a real Best Buy / Lenovo listing, let's decode it with §15.8"
      walkthroughs with screenshots (own screenshots, not vendor images).
- [ ] **Cite-as-you-go footnotes.** Ch. 21 lists sources by cluster; inline superscript references would let
      readers verify specific claims (e.g., "PCMag measured 20 h" → link).
- [ ] **Glossary cross-links.** Auto-link first occurrences of glossary terms in each chapter to Ch. 20
      (build step: regex over `guide/*.md` using the glossary's bold terms).
- [ ] Trim overlap: Ch. 2 §2.2 and Ch. 5 §5.2 both have "how much RAM" tables; consider making Ch. 5 the
      canonical one and Ch. 2 a pointer.

## B. Data (`web/data/laptops.json`)

- [ ] **Schema file** (`web/data/schema.json`, JSON Schema draft 2020-12) so editors get validation; have
      `scripts/validate.py` use it if `jsonschema` is available, fall back to the hand-rolled checks.
- [ ] **More machines**, prioritised by reader demand: Lenovo Yoga Slim 7i/7 (Panther Lake), Asus Zenbook A14
      (Snapdragon, 1 kg), HP OmniBook X 14, Acer Swift 14 AI, System76 Lemur Pro, Tuxedo InfinityBook,
      MacBook Air M4 15" refurb, Surface Laptop 8 15", Legion 5i Gen 10 (the CNET pick) as its own entry,
      Framework 13 (Panther Lake non-Pro) if it exists.
- [ ] **Split `ram` into structured fields** (`ramBaseGB`, `ramMaxGB`, `ramUpgradeable`, `ramType`) — the
      compare filter currently regex-matches `"8 GB"` at the start of a string.
- [ ] Same for `display` (`sizeIn`, `resW`, `resH`, `panel`, `nits`, `hz`) so the compare tool can filter on
      brightness/refresh and sort by PPI.
- [ ] **`sources[]` per laptop** (review URLs with dates) shown as a "Reviewed by" line on the card.
- [ ] **`lastVerified` per laptop** so stale entries can be flagged in the UI ("price checked 45 days ago").
- [ ] **Config variants** (`configs[]` with price/ram/storage) instead of a single `recPrice` — lets the
      finder answer "what does 32 GB cost on this one?"

## C. Web app

- [ ] **Finder v2:** more questions (screen size preference, OLED tolerance/PWM sensitivity, keyboard
      priority, new-vs-refurb tolerance), weighted scoring instead of hard filters, and an "explain this
      recommendation" panel listing the rules that fired.
- [ ] **Compare: pin & share image.** Render the side-by-side table to a PNG (canvas) for sharing.
- [ ] **Compare: "vs" deep links** like `#/compare?vs=mba-m5-13,x1c-g14` that open straight to the table.
- [ ] **Persist theme + last chapter + scroll position** (localStorage) and offer "Continue reading" on home.
- [ ] **Service worker** for offline reading (everything is static; a cache-first SW is ~40 lines).
      Bump a version string in `build.sh` to invalidate.
- [ ] **Search improvements:** fuzzy matching / stemming (e.g. "thinkpads" → "thinkpad"), search within
      `laptops.json` too (chip names, tags), keyboard navigation of results, `?q=` on the home URL.
- [ ] **Chapter progress / estimated remaining time** in the TOC column; "mark as read" checkmarks in nav.
- [ ] **Footnote/sidenote rendering** if the guide adopts footnotes (Tufte-style margin notes in the TOC gutter).
- [ ] **Static pre-rendering for SEO.** Hash routes aren't indexed as separate pages. A build step could
      emit `web/ch/<slug>/index.html` with the rendered chapter (using `marked` in Node) plus the SPA
      bootstrap, and `404.html` already maps clean paths to hash routes. Update `sitemap.xml` accordingly.
- [ ] **Lighthouse pass:** font loading (system fonts already), image lazy-loading if images are added,
      CSS containment for the big compare grid, `prefers-contrast` support.
- [ ] **i18n scaffold** (at least the UI strings) if a translation is ever contributed.
- [ ] **Print stylesheet for the whole guide**: a `#/print` route that concatenates all chapters for
      "Save as PDF", with page breaks between chapters and the TOC first.
- [ ] Minor: `.md` topbar link should point to the raw file on gh-pages *and* offer "copy as Markdown"
      for the current chapter; add `rel="me"`/author meta; favicon `.ico` fallback for old browsers.

## D. Tooling / repo

- [ ] **Enable CI** by copying `ci-templates/validate.yml` and `pages.yml` into `.github/workflows/`
      (requires a token with `workflow` scope — the automation token used so far cannot).
- [ ] **`scripts/check-links.py`:** verify external URLs in `guide/` and `research/` return 2xx (rate-limited,
      cached) — run monthly, not on every push.
- [ ] **`scripts/new-chapter.sh`** / `scripts/add-laptop.py` helpers that scaffold entries with all required
      fields so validation passes first time.
- [ ] **Word-count and reading-time badges** in README generated by `build.sh`.
- [ ] **Release tagging:** `git tag v1.1` on each changelog entry; GitHub Release with `GUIDE.md` and a PDF
      attached (pandoc or the print route + headless Chrome).
- [ ] **PDF/EPUB build** (`pandoc GUIDE.md -o guide.pdf` with a small LaTeX template; EPUB for e-readers).
- [ ] **Dependabot-style check** for the vendored `marked.min.js` (pin version in a `VENDOR.md` with the
      URL and checksum; a script to refresh it).
- [ ] **Pre-commit hook** (`.githooks/pre-commit` → `scripts/validate.py`) with `git config core.hooksPath`.
- [ ] Consolidate `PROGRESS.md`: it is an append-only agent log and has grown long. Consider moving the
      historical session log to `docs/agent-log.md` and keeping only "current state + next steps" at the top.

## E. Known rough edges (small, safe to fix any time)

- `guide/14b-personas-2.md` has no H1 (it's a continuation of Ch. 14), so its `title` in the manifest is
  "14.7 The Working Software Engineer…" — the nav uses the `short` override so users don't see it, but the
  GUIDE.md TOC entry reads oddly. Same pattern for `13b–13e` and `15b`. Option: give continuation files a
  leading HTML comment with a `title:` the build script reads.
- `tools.js` card badges classify tags by regex (`/best|value|refurb/` → green); a `badgeClass` field in the
  data would be cleaner.
- Tier boundaries in `validate.py` allow ±10–15% slack; the Framework 13 (Ryzen) DIY entry had to be moved
  to Tier 3 to satisfy it — double-check the prose in 13b/13c agrees.
- The side-by-side table marks "best" per row only when values differ; ties show no highlight — intended,
  but document it in the caption.
- `qa.py` waits a fixed 700 ms per route; on slow CI runners consider waiting for `#app h1` instead.
