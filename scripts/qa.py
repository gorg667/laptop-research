#!/usr/bin/env python3
"""Headless QA for the web app: loads key routes at desktop + mobile widths,
captures console errors / page errors, checks for horizontal overflow, and
writes screenshots to .tmp/shots/. Requires: pip install playwright && playwright install chromium.

Usage: python3 scripts/qa.py [base_url]   (default http://localhost:8080/)
Exit code 1 if any JS error or overflow was found."""
import asyncio, pathlib, sys
from playwright.async_api import async_playwright

ROUTES = ["#/", "#/compare", "#/compare?sel=mba-m5-13,x1c-g14,fw13pro&no8=1", "#/finder",
          "#/finder?budget=3&os=any&gpu=no&mobility=daily&persona=sophomore",
          "#/search/thinkpad%2032%20gb", "#/ch/04-silicon.md", "#/ch/13a-picks-tier1.md#avoid-in-this-tier", "#/about", "#/nope"]

async def main():
    base = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8080/"
    out = pathlib.Path(".tmp/shots"); out.mkdir(parents=True, exist_ok=True)
    bad = 0
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for w in (1400, 1000, 420):
            pg = await b.new_page(viewport={"width": w, "height": 900})
            errs = []
            pg.on("console", lambda m: errs.append(f"{m.type}: {m.text}") if m.type in ("error", "warning") else None)
            pg.on("pageerror", lambda e: errs.append(f"pageerror: {e}"))
            for r in ROUTES:
                await pg.goto(base + r); await pg.wait_for_timeout(700)
                sw = await pg.evaluate("document.documentElement.scrollWidth")
                if sw > w + 1:
                    errs.append(f"overflow {sw}px > {w}px on {r}"); bad += 1
                name = (r.replace('#/', '').replace('/', '_').replace('.md', '').replace('?', '_').replace('#', '_') or 'home')[:60]
                await pg.screenshot(path=str(out / f"{name}_{w}.png"))
            print(f"[{w}px] {'OK' if not errs else 'ISSUES'}: {errs}")
            bad += len([e for e in errs if not e.startswith('overflow')])
        await b.close()
    sys.exit(1 if bad else 0)

asyncio.run(main())
