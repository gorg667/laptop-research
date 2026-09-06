# Chapter 21 — Sources, Caveats, and Changelog

## 21.1 Primary sources consulted (2026)

**Apple lineup and pricing**
- MacRumors — MacBook Pro roundup (updated Sep 2026): M5/M5 Pro/M5 Max specs, June 25 2026 price increase, M6 and OLED "MacBook Ultra" rumors, refurb availability.
- PCMag — Apple MacBook Air 13-Inch (2026, M5) review (Jun 25 2026), with editor's note on the $200 price increase; MacBook Neo review (Jun 25 2026).
- RTINGS — MacBook Air 13 (M5, 2026) review (Aug 28 2026); MacBook Neo (A18 Pro) review (Apr 10 2026); Best Laptops Under $700 (Aug 28 2026).
- AppleInsider — M5 MacBook Air review (Mar 30 2026). Mashable — M5 Air review. Apple — MacBook Air/Pro/Neo tech specs.
- Tom's Hardware / TechPowerUp — MacBook Neo announcement, 8 GB InFO-PoP cap (Mar 2026). Matthew Moniz — Neo review (Mar 11 2026).
- MacRumors — Back to School 2026 promotion (Jul 16, extended Aug 11 to Sep 24 2026). Macworld — Back to School 2026 (Aug 26 2026).
- Gizmodo (Jul 20 2026), refurb.me (Aug 14 2026), RedFlagDeals — refurbished M4 Air pricing.

**Silicon**
- Ars Technica — "Intel Panther Lake Core Ultra review: Intel's best laptop CPU in a very long time" (Feb 2 2026).
- Club386 — Core Ultra Series 3 / X9 388H benchmarks (Jan 26 2026). Ultrabookreview — complete Panther Lake laptop list.
- Tom's Hardware (Jan 5 2026), Notebookcheck (Jan 26 2026), Ars Technica, Wccftech — AMD Ryzen AI 400 "Gorgon Point" analysis. Ultrabookreview — Gorgon Point laptop list.
- Tom's Hardware — Asus Zenbook A16 (Snapdragon X2 Elite Extreme) review (Apr 7 2026). XDA (Apr 24 2026), MakeUseOf (May 11 2026), Thurrott — HP OmniBook Ultra 14 X2 review (Aug 4 2026). thedeskbrief — Snapdragon X2 laptop roundup (Aug 16 2026). Phoronix — Snapdragon X Elite Linux performance (end-2025).
- Nvidia newsroom (May 31 2026) — RTX Spark / N1X announcement; Tom's Hardware, Notebookcheck (Apr 25 2026), Tom's Guide (May 29 2026) — N1X delays and availability.

**Memory shortage**
- CNET (Feb 13 2026), Tom's Hardware RAM price index (Sep 2026), Notebookcheck (Apr 19 2026), Insight, Wikipedia "2025–present global memory supply shortage," Ars Technica Framework 13 Pro review (LPCAMM2 pricing).

**Windows / Linux laptops**
- Ars Technica — Framework Laptop 13 Pro review (Jul 27 2026); Tom's Hardware and PCMag Framework 13 Pro reviews (Jul 27 2026); Framework — Laptop 13 Pro product/Linux pages.
- PCMag ME (Jul 13 2026), Thurrott (Jul 15 2026), Notebookcheck (Jul 29 2026), Ultrabookreview (Aug 28 2026) — ThinkPad X1 Carbon Gen 14 Aura Edition.
- Notebookcheck — ThinkPad T14s Gen 7 AMD review (Jul 6 2026). StorageReview — ThinkPad P14s Gen 7 (Aug 4 2026). r/linuxhardware — P14s Gen 6 AMD Ubuntu report.
- Tom's Hardware (Feb 17 2026), Notebookcheck (Feb 8 2026), TweakTown (Jun 24 2026) — Dell XPS 14 (2026).
- Notebookcheck (Jul 18 2026), Ultrabookreview (Aug 21 2026), CGMagazine — Asus Zenbook S14 (2026).
- The Guardian (Jul 14 2026), PCMag, Mashable, Notebookcheck — Surface Laptop 8th Edition / Surface Pro 12.
- CNET — Best Laptops 2026 (Aug 11 2026). Wirecutter — Best Laptops (Sep 2026), Best Cheap Laptops (Aug 27 2026). Wired — Best Cheap Laptops (Aug 17 2026). PCMag — Best Laptops for Programmers (May 4 2026), Best Budget Laptops (Jun 18 2026).

**Gaming / GPU**
- PC Gamer — Best Gaming Laptops (Jul 15 2026). Tom's Hardware — Lenovo LOQ Essentials 15 Gen 11 review (Aug 4 2026). LaptopMedia — LOQ 15 review (Jun 27 2026). Notebookcheck — ROG Zephyrus G14 2026 series (Mar 4 2026). PCMag deals (Aug 10 2026).

## 21.2 Caveats

- **Prices** are US MSRP or observed US sale prices in late August–early September 2026, in USD, before tax. They will change; in 2026 they have mostly changed upward.
- **Rumors** (M6 MacBook Pro, OLED MacBook, N1X timing) are labeled as such and sourced to MacRumors/Notebookcheck/Tom's reporting; they may not materialize.
- **Performance figures** are indexed approximations from published reviews, not original benchmarks, and vary ±20% with the specific laptop's power limits.
- **Linux compatibility** statements reflect kernel 6.19–7.x and mid-2026 distro releases; older distros may lag.
- **Regional availability** differs; some SKUs (e.g., Zephyrus G14 with RTX 5070 Ti) exist in some markets only.
- **No affiliate relationships, sponsorships, or review units.** Nothing here was paid for.

## 21.3 Changelog

- **2026-09-06 — v1.0.** Initial publication. Written from a September 2026 vantage point covering Apple M5 family, Intel Core Ultra Series 3, AMD Ryzen AI 300/400 and Strix Halo, Qualcomm Snapdragon X2, Nvidia N1X (announced), the 2025–26 memory shortage and its price effects, Apple's June 2026 price increase, and the Back to School 2026 promotion ending September 24.

## 21.4 How to update this guide

The chapter files live in `guide/` and are numbered; `scripts/build.sh` concatenates them into `GUIDE.md` and syncs the web version. Structured laptop data for the web comparison table lives in `web/data/laptops.json`. When a chip generation or price changes, update the affected chapter, the JSON, and add a changelog line above.
