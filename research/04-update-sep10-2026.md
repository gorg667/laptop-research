# Research: What changed between Sep 6 and Sep 10, 2026 (v1.1 update pass)

Purpose: fact-check pass for guide v1.1. Sources fetched Sep 10, 2026.

## 1. Apple M6 is REAL and SHIPPING (Mac mini) — guide said "rumor"
Source: Apple Newsroom press release, Aug 25 2026 ("Apple unveils a more powerful Mac mini featuring the all-new M6 and M5 Pro"); AppleInsider M6 vs M4 Mac mini comparison (Aug 25 2026).
- **M6** (2 nm): **12-core CPU** = 2 "super" cores + 4 performance cores + 6 efficiency cores (new 3-tier layout). 12-core GPU with Neural Accelerators. **Dual 16-core Neural Engine**. Memory 16/24/32 GB; bandwidth **up to 170 GB/s** (153 GB/s on 16 GB config).
- Apple claims vs M4: +40% CPU (single-threaded emphasis; "world's fastest single-threaded performance"), 1.2x multi-threaded, 2x graphics, 4x AI. AppleInsider extrapolation: GB single ~4,590 (M4 3,277), multi ~18,400 (M4 15,359). Note Geekbench 7 is now current.
- Mac mini M6 $899 ($799 edu), ships **Sep 22 2026**. Mac mini M5 Pro $1,699. Both Wi-Fi 7 / BT 6 / 2.5GbE. Mac Studio also updated Aug 2026.
- **Implication for guide:** M6 exists → "M6 base 14" MBP" is much more concrete: MacRumors "Late 2026" (Bloomberg). No M6 Pro/Max; Apple skips to M7 Pro/Max (late 2027–early 2028). OLED "MacBook Ultra" late 2026/early 2027 uses M5 Pro/Max. **MacBook Air M6 expected early 2027** (MacRumors). MacBook Neo 2 with A19 Pro and *more memory* coming (date unknown).
- Apple Sept 9 2026 "Surprise and shine" event: iPhone 18 Pro, iPhone Duo (foldable), AirPods 5, Watch S12/Ultra 4. **No Macs.** macOS 27 "Golden Gate" release dates announced (this fall).

## 2. macOS 27 Golden Gate — developer-relevant facts
Sources: MacRumors Jun 10 2026, 9to5Mac Jun 8 & Sep 1 2026, everymac Sep 2026, Apple dev release notes.
- Drops ALL Intel Macs (last four: MBP 16" 2019, MBP 13" 2020 4-port, iMac 27" 2020, Mac Pro 2019).
- **macOS 27 is the LAST release to support Rosetta 2** for general apps; auto-uninstalls Rosetta on upgrade from Tahoe if present (reinstall on demand). macOS 28 (2027) removes it. Apple told Mac App Store devs (Sep 1 2026) they can drop Intel builds.
- Implication: buying a used Intel Mac in 2026 is now a hard no; x86-only Mac dev tools have ~1 year of life.

## 3. Memory shortage — still worsening (HP earnings Aug 26–27 2026)
Source: PCMag Aug 27 2026 "Not again: HP says more price hikes are coming."
- HP CFO: "We expect to continue to increase pricing as input costs rise." Memory+storage estimated **35% of BOM** in 2026 (from 15–18%). Cheaper inventory exhausted; H2 costs higher. IDC/HP: PC shipments down "high teens" % in H2 2026. HP PC revenue +18% YoY while units −16% → they're upselling.
- exceldisc (Aug 26 2026): DRAM contract prices +89% in Q2 2026 after ~+95% in Q1.
- Guide stance holds: buy now if config is right; refurb/prior-gen = value.

## 4. Budget tier shake-up: $699 class
- **Dell XPS 13 (2026)** — PCMag Editors' Choice budget Windows ultraportable. $699.99: Intel **Core 5 320 "Wildcat Lake"** (2P+4LPE, 6 threads), **8 GB** single-channel DDR5, 512 GB, 13.4" 2560x1600 **120 Hz touch** matte, all-aluminum, 2.2 lb (~1.0 kg), 1080p IR cam, Wi-Fi 7/BT6, 65 W tiny charger, **20+ h** PCMag video. Cons: **8 GB base** (failed Cinebench/Photoshop), **no headphone jack**, 2x USB-C 10 Gbps only (no TB4 on Wildcat SKU), dim-ish matte screen. **16 GB = $899** (max). Panther Lake Core Ultra SKUs w/ up to 32 GB/1 TB + TB4 "later." Edu $100 off through Nov 2 2026.
- **Framework Laptop 12 (2026 refresh, Wildcat Lake)** — PCMag Sep 2026. $699 prebuilt (Core 3 304, **8 GB**, Fedora; Windows +$100), $549 DIY. Core 5 320 16 GB = $1,099 (backlit kbd + fingerprint only on Core 5/7). Wi-Fi 7, TB4 on rear cards, +70% battery vs gen 1. Ships October. 80% of FW12 owners run Linux.
- **Intel "Wildcat Lake" = Core Series 3 (NOT Core Ultra)**: Core 3 304, Core 5 3xx, Core 7 350. 15 W base/35 W turbo, 2P + 4 LPE cores, no HT, 1–2 Xe cores. PCMag tested Core 7 350 (IdeaPad 3 Gen 11, ~$800): "trades blows with A18 Pro (MacBook Neo)"; behind Ryzen AI 7 350, Arrow Lake, Snapdragon X Plus. Verdict: fine for basics, don't pay near $1,000. → New decoder-ring entry needed; naming trap "Core 5 320" vs "Core Ultra 5 325".
- MacBook Neo now **$699 retail / $599 edu** (confirmed PCMag).

## 5. Nvidia RTX Spark (N1X) — now has real products, still no prices
Sources: PC Guide IFA 2026 roundup (Sep 4), thedeskbrief tracker (Sep 2), Nvidia newsroom.
- Platform = 20-core Nvidia Grace Arm CPU + Blackwell GPU **6,144 CUDA cores**, up to **128 GB unified LPDDR5X**, "1 PFLOP FP4". No lower "N1" SKU announced by any OEM.
- Announced laptops: **Asus ProArt P16** (16" 4K/3K 120 Hz OLED, 99.9 Wh, 1.77 kg, 3x USB4, HDMI 2.1, SD Express, up to 2 TB), **ProArt P14** (14" 2880x1800 120 Hz OLED, 90 Wh, 1.48 kg, up to 128 GB, 1 TB max), **Lenovo Yoga Pro 9n** (15.3" 2.5K OLED 165 Hz, 92.5 Wh, 1.65 kg, up to 128 GB/4 TB, 2x USB4 + 2x USB-A + HDMI + SD), **Yoga 9n 2-in-1** (16", 99.9 Wh, 1.94 kg, ≤64 GB), **Dell XPS 16 Creator Edition** (tandem OLED, ≤128 GB), **HP OmniBook Ultra 16 / X 14** (specs TBD), **Surface Laptop Ultra** (15" mini-LED 2000 nits, ≤128 GB), **MSI Prestige N16 Flip AI+** (2-in-1, 99.9 Wh). Acer/Gigabyte later. Mini PCs: Asus ProArt GR1X, Acer SFF.
- Availability: "fall 2026"; Notebookcheck: launch October, volume early 2027. **No prices from any OEM as of Sep 10.** Hands-ons (PC Gamer Gamescom, Tom's Guide 6 units) — games run 60+ fps w/ DLSS by eye, no controlled benchmarks. Nvidia: "not intended to replace x86 gaming PCs." Anti-cheat: EA Javelin native.
- Linux status: Nvidia stated target; nothing shipping. Guide stance unchanged: don't wait for fall 2026 semester; interesting for ML students in 2027 (CUDA + 128 GB unified is unique).

## 6. IFA 2026 (Sep 4–8) other laptops
- Acer Swift Air 16, Swift Blade 14 (PCMag Sep 2). Lenovo Yoga refreshes. Asus ProArt. Little new for mainstream CS picks; Panther Lake lineups stable.

## 7. Items to fix in guide
- [ ] Ch 4 §4.2: M6 announced (Mac mini), details; still "expected" for MBP 14". Update table row for M6 (est.). Add Wildcat Lake to §4.3 and decoder ring §4.8.
- [ ] Ch 0 TL;DR + Ch 13d + Ch 18 #12 + Ch 19: M6 language from "rumor" → "announced chip, MBP timing still unconfirmed (late 2026 per Bloomberg)".
- [ ] Ch 3 §3.3: macOS 27 drops Intel; Rosetta ends after macOS 27; never buy Intel Mac.
- [ ] Ch 13a Tier 1: add Dell XPS 13 (2026) $699 (8 GB warning; $899 for 16 GB) and Framework 12 refresh; Neo price $699/$599 edu already right.
- [ ] Ch 5 §5.1 + Ch 15 §15.1: HP Aug 27 statement — more hikes coming; 35% BOM.
- [ ] Ch 4 §4.6 / Ch 12: RTX Spark product list, no prices, Oct launch.
- [ ] Ch 21: sources + changelog v1.1.
- [ ] laptops.json: add xps13-2026 (tier 1, 8gb-warning), fw12-2026; note updated date.
- [ ] README/index: "September 2026 edition (updated Sep 10)".
