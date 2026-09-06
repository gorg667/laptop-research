# Research: Silicon landscape + key Windows/Linux laptops as of Sep 2026

## THE DEFINING MARKET CONDITION: 2025–2026 global memory (DRAM/NAND) shortage
Sources: CNET (Feb 13 2026), Tom's Hardware RAM index (Sep 3 2026), Notebookcheck (Apr 19 2026), Wikipedia "2025–present global memory supply shortage", Ars Technica Framework 13 Pro review (Jul 27 2026).
- Cause: AI server demand (HBM, DDR5 server) sucking up fab capacity. Micron exiting consumer (Crucial) shipments.
- DRAM contract prices up ~170% across 2025; +80–90% in first 6 weeks of 2026; TrendForce projected another +50–60% in Q2 2026. DDR5 kits that were $100–200 became 3–4x.
- OEM impact: Dell/Lenovo announced 15–20%+ PC price hikes in 2026; HP warned of H2-2026 increases. Apple +$200 (Air) / +$300 (Pro) on June 25 2026. Framework raising component prices all year; LPCAMM2 supplier DOUBLED prices (32GB LPCAMM2 = $800 at Framework; ~$700 aftermarket).
- Not expected to end in 2026 or 2027 (CNET).
- **Guide implication:** RAM is THE constrained resource. Advice: buy the RAM you need up front; upgradable-RAM laptops lost some of their price advantage because SO-DIMMs/LPCAMM2 are expensive too; refurb/older-gen with 32GB is a strong play; 8GB machines (MacBook Neo) are a trap for dev work; expect prices to rise, not fall, over the next 12 months — "wait for a sale" is less reliable than usual.

## Intel — Core Ultra Series 3 "Panther Lake" (launched CES Jan 2026, Intel 18A)
Source: Ars Technica review Feb 2 2026 (Core Ultra X9 388H in Asus Zenbook Duo UX8407); Club386; Notebookcheck.
- Unified lineup: ALL Series 3 chips share same CPU/GPU/NPU architectures; all Copilot+ capable. Ends the Lunar Lake (200V) vs Arrow Lake (200H) split.
- Naming: Core Ultra X9 388H, X7 358H (top tier with Arc B390 12-Xe-core GPU); Core Ultra 5 338H (Arc B370, 10 cores); Core Ultra 5 325 etc. (small 4-core "Intel Graphics" tile). "X" prefix = big GPU tile.
- CPU: SC ~10% faster than Lunar Lake / Ryzen AI 9 HX 370 / Snapdragon X Elite. Still well behind Apple M4/M5 in single-core. MT at 55W ≈ 2x Lunar Lake 258V, 10–40% faster than HX 370. At ~25–30W: retains ~95% SC and 75–85% MT perf — very efficient.
- GPU: Arc B390 ≈ 2x Lunar Lake Arc 140V, ≈ 2x Radeon 890M; ~5x in RT-heavy Cyberpunk. Strix Halo (Radeon 8060S) is still ~70–75% faster than B390 (at higher power). B390 REQUIRES LPDDR5X-9600 soldered (no SO-DIMM) — pricing/availability issue during RAM crisis.
- Efficiency: Only Apple beats it in perf/W in Handbrake. Estimated ~13h on 72Wh in PCMark Modern Office — slight step down from Lunar Lake, but far better than Arrow Lake/Meteor Lake.
- Caveat: Intel supply constraints reported. Linux: kernel ≥6.19 needed; 7.0+ recommended (per Framework).
- Verdict: "Intel's best laptop CPU in a very long time." Safe recommendation for Windows/Linux buyers.

## AMD — Ryzen AI 400 "Gorgon Point" (CES Jan 2026, Q1 2026 ship)
Sources: Tom's Hardware Jan 5 2026, Notebookcheck Jan 26 2026, Ars Technica ("reheats last year's chips"), ultrabookreview list.
- Essentially a clock-bumped Strix Point (Zen 5 / Zen 5c, RDNA 3.5, XDNA 2 NPU now 60 TOPS). Up to 12 cores (Ryzen AI 9 HX 470/475). Notebookcheck: "only minor improvements." AMD claims +29% multitasking (marketing).
- Ryzen AI 300 (HX 370, 365, Ryzen AI 7 350, Ryzen AI 5 340) still widely sold and ~5–10% slower — strong value if discounted.
- Strix Halo (Ryzen AI Max+ 395 / Max 390, Radeon 8060S/8050S, up to 128GB LPDDR5X-8000 unified, 256GB/s) — the "PC answer to M-series Max": in HP ZBook Ultra G1a, Asus ROG Flow Z13, Framework Desktop; laptops rare & pricey. Excellent for local LLMs (large unified memory).
- Linux: AMD historically best-in-class open driver support; Ryzen AI 300/400 fine on modern kernels.
- Verdict: Still competitive CPU-wise; behind Panther Lake in iGPU and roughly matched/behind in efficiency. Great when discounted. Best for Linux users who want zero fuss.

## Qualcomm — Snapdragon X2 Elite / X2 Elite Extreme (laptops shipping ~Q1–Q2 2026)
Sources: Tom's Hardware Asus Zenbook A16 review (Apr 7 2026), XDA (Apr 24 2026), Thurrott HP OmniBook Ultra 14 X2 (Aug 4 2026), thedeskbrief roundup (Aug 16 2026), Phoronix (Linux perf disappointing on X Elite, end-2025).
- Up to 18 cores (3rd-gen Oryon). "Powerful enough Asus ships a 130W charger." Battery life is the headline: HP OmniBook Ultra 14 X2 ~11h real-world uptime (Thurrott); PCMag crowned an OmniBook Snapdragon as battery champion (>18h in video rundown).
- Reviewer consensus: Windows-on-Arm is "finally what it should be" for mainstream apps; still check niche dev tools. x86 emulation (Prism) good but not perfect; Docker Desktop works (Arm64 containers); some drivers/VPN/anti-cheat still missing.
- Linux on Snapdragon X: STILL immature — Phoronix: performance on Linux "disappointing" at end of 2025; X2 Elite support upstream is early. **Not for Linux users in 2026.**
- Key laptops: Lenovo Yoga Slim 7x Gen 11 (thedeskbrief "best overall"), Asus Zenbook A16 (X2 Elite Extreme, 16" OLED), HP OmniBook Ultra 14 (choice of Panther Lake or X2), Surface Laptop 8 (verify), Dell XPS 14 Arm (verify).
- Verdict: The battery-life king on Windows. Good for web/JS/Python/Go/Rust dev on Windows with WSL2 (Arm64 Ubuntu works). Avoid if: Linux native, x86-only toolchains (some embedded/EDA), heavy VMs of x86 guests, Android emulator edge cases (actually fine — Arm-native), or gaming.

## Nvidia — N1X / N1 (RTX Spark) — Announced Computex (May 31 2026)
Sources: Nvidia newsroom May 31 2026 ("RTX Spark... world's first Windows PCs purpose-built for personal agents, 1 petaflop AI"), Tom's Hardware leaks, Notebookcheck (limited 2026 availability), Tom's Guide.
- Arm-based SoC (up to 20 cores, N1 12/10-core), Blackwell-class iGPU ("RTX 5070-class" headlines), Windows-on-Arm. Repeatedly delayed (software issues); "limited 2026 availability"; laptops expected late 2026 → practically not buyable as of Sep 2026 for most students.
- **Guide stance:** Exciting; do not wait for it unless you must have Nvidia GPU + Arm efficiency; first-gen platform risk (drivers, WoA maturity). Revisit in 2027.

## Apple M5 family — see research/01. M6 (2nm) base MBP expected fall 2026; OLED "MacBook Ultra" late 2026/early 2027.

---

## Key laptops (Windows/Linux side) with data points

### Framework Laptop 13 Pro (announced Apr 2026, reviews Jul 27 2026)
Sources: Ars Technica, Tom's Hardware, PCMag ("A MacBook rival you can repair"), Notebookcheck.
- Panther Lake (Core Ultra 5 325 base / X7 358H / limited X9 388H). LPCAMM2 LPDDR5X (upgradeable!) up to 64GB; 30W sustained (Best Performance) / 25W (Balanced).
- 74Wh battery (from 61). **~18h PCMark Modern Office @200 nits** — finally fixes Framework's battery weakness. Board in old 61Wh chassis: ~15h45m.
- New: haptic trackpad, machined 6063 aluminum, graphite finish, 13.5" 3:2 2880x1920 IPS 120Hz TOUCH, 700 nits, 1800:1. Still 4 expansion card slots only.
- Linux: Ubuntu 24.04 preinstall option; Ubuntu 26.04 LTS & Fedora 44 official; Arch/NixOS/CachyOS/Bazzite community. BIOS via LVFS. Kernel ≥6.19 required.
- Price: $1,499 prebuilt base; ~$2,099 (X7/32GB/1TB); review unit ~ $3,000. Components: 16GB LPCAMM2 $239, 32GB $800, 64GB $1,600. X7 mainboard $899.
- Original Framework 13 (Ryzen AI 300, DDR5 SO-DIMM) still sold, cheaper; ~8.5h (61Wh) / 11h (74Wh) battery.
- Verdict: The Linux/repairability pick. Expensive due to RAM crisis. "Right laptop, wrong time."

### Lenovo ThinkPad X1 Carbon Gen 14 Aura Edition (Panther Lake, 2026)
Sources: PCMag ME (Jul 13 2026), Thurrott ("Panther Lake perfection", Jul 15 2026), Notebookcheck (Jul 29 2026: "excellent business laptop but pay attention to the display"), ultrabookreview (Aug 28 2026).
- Starts $2,139; $2,374 as tested. Reddit: Gen 13 was selling ~$1,400 on sales — Lenovo discounts are huge & frequent; NEVER pay list.
- Excellent battery, best-in-class keyboard, optional 5G. Display config matters (some panels weak — check for the 2.8K OLED or the high-brightness IPS).
- Verdict: Best Windows business ultraportable keyboard; Linux-friendly (Lenovo certifies Ubuntu/Fedora on ThinkPads).

### Asus Zenbook S14 (2026, UX5406AA/Panther Lake) & S16 (Gorgon Point)
Sources: Notebookcheck (Jul 18 2026: "Brighter OLED but slow Panther Lake iGPU" — the S14 uses a lower-tier PTL without B390), CGMagazine (MSRP $2,399 CAD?), ultrabookreview (Aug 21 2026).
- Ceraluminum chassis, ~1.2kg, 14" 3K OLED 120Hz brighter than last gen; excellent battery. List $1,899 (US) — Notebookcheck calls that reasonable in 2026 context.
- Caveat: Not all Panther Lake are equal — S14 lacks Arc B390 — check exact SKU.

### HP OmniBook Ultra 14 (2026) — Panther Lake OR Snapdragon X2 options; CNET's favorite Windows laptop (Aug 2026). X2 version ~11h real-world uptime.
### HP OmniBook 5 14 (Snapdragon X Plus, OLED) — $879.99 list; often <$700; Wired's best budget pick; PCMag battery champion.
### Lenovo Yoga Slim 7x Gen 11 (Snapdragon X2 Elite up to 18-core, OLED) — thedeskbrief best X2 overall.
### Asus Zenbook A16 (X2 Elite Extreme) — Tom's HW/XDA positive; ~10h battery per user; pricey.
### Lenovo ThinkBook 16 Gen 7 — $799 PCMag budget pick.
### Acer Aspire 16 AI — $700 CNET budget.
### Lenovo Legion 5i Gen 10 — $1,499 CNET gaming pick.
### MSI Prestige 16 AI Evo, HP ZBook Power 16 G11 A, ThinkPad E14 Gen 5 — PCMag programmer picks (May 2026).

### Apple MacBook Neo (A18 Pro, March 2026) — budget king with a giant caveat
Sources: PCMag (Jun 25 2026), RTINGS (Apr 10 2026 & best-under-$700 Aug 28 2026), Tom's Hardware, TechPowerUp, Matthew Moniz.
- $599 launch (students $499); post-June-hike PCMag lists "starts at $699" — students likely $599 (RTINGS Aug 28: "eligible students can get the base model for $599").
- A18 Pro (iPhone 16 Pro chip). **8GB LPDDR5X, hard-capped by InFO-PoP packaging — no 16GB option exists.** 256GB or 512GB.
- 13" display, only ~72% DCI-P3, dimmer; 2 USB-C ports (not Thunderbolt — verify; USB 3), headphone jack. No 12MP Center Stage cam. ~11–12h battery. Fanless. Fun colors.
- SC performance beats M1 Air; MT weaker; RTINGS: "can't handle demanding tasks or heavy multitasking."
- **Guide stance:** Phenomenal for a humanities student. For CS: viable ONLY as a "lecture + SSH to server + light VS Code" machine; 8GB will hurt with Docker, IDEs (IntelliJ/Android Studio), browsers with many tabs. Best budget Mac experience but recommend refurb M2/M3/M4 Air 16GB over it for CS if budget can stretch to ~$750–900.
