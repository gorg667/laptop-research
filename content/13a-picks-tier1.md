# Chapter 13 — The Picks, by Budget

This is the chapter most people skip to. Each pick has a short review: what it is, what it costs (US, September 2026, before student discounts unless noted), the configuration to buy, and honest pros and cons. Prices are volatile this year — treat them as ±10%.

Tiers are by *what you'll actually pay for a sensible configuration*, not by manufacturer list price. Windows laptops are quoted at realistic sale prices, because paying list on a ThinkPad or Zenbook is a mistake (Chapter 15).

A recurring theme: **at every tier, the best value is often a refurbished or previous-generation machine.** The 2026 memory crisis inflated new prices without making 2024–25 hardware any worse.

---

## Tier 1 — Under $700: "I need a computer for CS and this is what I have"

Honesty first: **new laptops under $700 with 16 GB of RAM and a good screen are scarce in September 2026.** The memory crisis hit this tier hardest. Your realistic options are (a) a used/refurbished business laptop, (b) a Snapdragon X Plus machine on sale, (c) accepting a compromise. All three are covered.

### 🥇 Pick: Used/refurbished ThinkPad T14 Gen 3/4 (AMD) or T14s Gen 3/4 — $350–600
- **What:** 2022–2023 business laptops with Ryzen 6000/7000 (Zen 3+/Zen 4) or 12th/13th-gen Intel, 14" 16:10 1920×1200 IPS (300–400 nits on the good panels), 16–32 GB RAM (T14: one soldered + one SO-DIMM slot; T14s: soldered), 512 GB–1 TB replaceable SSD, 52 Wh battery, excellent keyboard, TrackPoint, USB-A ×2, HDMI, 2× USB-C (USB4 on AMD Gen 4), fingerprint, MIL-STD, spill-resistant.
- **Where:** eBay (business liquidators), Lenovo Outlet, Back Market, local corporate refresh sales. Look for "Grade A" with ≥85% battery health, or budget $60 for a new battery.
- **Config:** AMD Ryzen 7 PRO 6850U/7840U, **32 GB** (many corporate units shipped with 32), 512 GB+, 400-nit low-power panel if you can find it.
- **Pros:** Best keyboard in this price class by a mile; 32 GB for $500 is unbeatable in 2026; Linux runs perfectly (Lenovo-certified; Ryzen 6000/7000 fully supported); repairable; docking stations everywhere; boring in the best way.
- **Cons:** Used. Battery may be tired. 2–4 years old — still fast enough, but not M5/Panther-Lake fast. Speakers are mediocre. Webcam 1080p on later units, 720p on some.
- **Who:** Budget students who want Windows or Linux, EE/CE students who need ports, anyone who values a keyboard. Frankly, the best laptop-per-dollar for a CS student in 2026.

### 🥈 Pick: HP OmniBook 5 14 (Snapdragon X Plus, OLED) — $600–750 on sale (list $879.99)
- **What:** 14" 1920×1200 OLED, Snapdragon X Plus (8-core), 16 GB LPDDR5X, 512 GB, ~59 Wh, 1.4 kg, two USB-C (one USB4), USB-A, HDMI, 1080p webcam with shutter.
- **Pros:** PCMag's battery champion (>18 h video; realistically 10–12 h mixed); OLED at this price; fanless-quiet; genuinely good keyboard for a consumer machine; Wired's best budget pick.
- **Cons:** Windows on Arm (Chapter 3 §3.7 — fine for web/Python/JS/Java/Go/Rust, not for x86-only toolchains or Linux); X Plus is a 2024 chip — slower than X2, roughly M1-class; 16 GB max at this price; OLED PWM (check if sensitive); HP consumer support.
- **Who:** Students on modern stacks who want new, long battery, and OLED under $700. Not for Linux, EE, or game dev.

### 🥉 Pick: MacBook Neo (A18 Pro, 8 GB) — $599 education / $699 retail (512 GB: +$100)
- **What:** 13" Liquid Retina (72% P3, ~500 nits), A18 Pro (6-core CPU, 5-core GPU), **8 GB RAM (hard cap)**, 256/512 GB, two USB-C (USB 3, one external display), headphone jack, 720p-class camera (no Center Stage), fanless, ~11–12 h, fun colors, Apple build quality.
- **Pros:** Real macOS with Homebrew, Xcode (yes, it runs), Terminal; single-core faster than an M1 Air; silent; excellent trackpad; 7 years of updates; the best-built laptop under $700 ever made. RTINGS and PCMag both call it the best budget laptop, period.
- **Cons:** **8 GB.** RTINGS: "can't handle demanding tasks or heavy multitasking." Docker + IntelliJ + browser = swap city. No 16 GB option exists or will exist. One external display. Display gamut and camera are the cost-cutting points.
- **Who:** A CS student whose program is Python/JS/Java in VS Code, who uses university servers or a cloud dev box for heavy work, and who wants macOS. Or a *second* machine for lectures alongside a desktop. **Not** for Android/iOS dev, Docker-heavy work, or ML courses. If you can stretch to ~$850 for a refurb M4 Air with 16 GB, do that instead — it's the single most important $150–250 in this guide.

### The new $699 class: Dell XPS 13 (2026) and Framework Laptop 12 — read the RAM line first
Two well-built laptops arrived in summer 2026 to fight the MacBook Neo at exactly $699, and both make the same trade the Neo does: **8 GB of RAM in the base model.**

- **Dell XPS 13 (2026)** — $699.99 (edu −$100 through Nov 2, 2026). Intel **Core 5 320 "Wildcat Lake"** (2 P + 4 LPE cores — a budget chip, *not* Core Ultra; Chapter 4 §4.3), **8 GB** single-channel DDR5, 512 GB, 13.4" **2560×1600 120 Hz touch** matte IPS, all-aluminum, **~1.0 kg**, 1080p IR camera, Wi-Fi 7, tiny 65 W charger, **20+ h** in PCMag's video test. PCMag Editors' Choice for budget Windows ultraportables. Compromises: **no headphone jack**, only two 10 Gb/s USB-C ports (no Thunderbolt on this SKU), the screen runs dim at 50%, and 8 GB made it fail PCMag's Cinebench and Photoshop runs. **The 16 GB version is $899** — and at $899 it's competing with a refurb M4 Air and a 32 GB used ThinkPad, both of which are much faster. Panther Lake (Core Ultra) versions with up to 32 GB and Thunderbolt 4 are promised "later" and will cost $1,000+. **Verdict for CS:** a lovely lecture-notes machine; buy only the 16 GB, and only if you specifically want a 1 kg Windows laptop.
- **Framework Laptop 12 (2026 refresh)** — $699 prebuilt (Core 3 304, 8 GB, Fedora; +$100 for Windows) / **$1,099 for Core 5 320 with 16 GB** / $549 DIY; ships October 2026. 12.2" 1920×1200 touch convertible, Wildcat Lake, Wi-Fi 7, Thunderbolt 4 on the rear expansion slots, backlit keyboard and fingerprint reader only on Core 5/7 models, ~70% better battery than gen 1. Fully repairable; **user-upgradeable DDR5 SO-DIMM** — so you *can* buy 8 GB and add a stick, though 2026 SO-DIMM prices blunt that. 80% of Framework 12 owners run Linux and Framework leans into it. **Verdict for CS:** the best *Linux* laptop under $700 if you value repairability, and the only 8 GB machine here that isn't a dead end. Slow chip; plastic; small screen.

### Also consider
- **Lenovo IdeaPad Slim 5 / Slim 5i 14 (Ryzen AI 5 340 or Core Ultra 5 225U, 16 GB, OLED)** — $600–750 on sale. Decent all-rounder, mediocre keyboard, plastic.
- **Acer Swift Go 14 / Swift 14 AI (Ryzen AI 300, 16 GB, OLED)** — $650–800 on sale. Good screen, so-so build, Acer support.
- **Asus Vivobook S 14 (Ryzen AI 300 or Core Ultra, 16 GB, OLED)** — $650–800. Similar story.
- **Chromebook Plus (Acer Chromebook Plus 514/516, Lenovo Chromebook Plus 14 with MediaTek Kompanio Ultra)** — $350–550. Linux container (Crostini) runs VS Code, Python, Node, Java, Docker (with effort). 8–12 GB. Workable for intro CS; limiting by second year. 10 years of updates.
- **Dell 14 (Ryzen AI 5 / Core Ultra 5, 16 GB)** — $600–750. Dell's renamed Inspiron. Adequate; check for the 1200p IPS rather than the 1080p.

### Avoid in this tier
- Anything with **8 GB RAM** — including the base MacBook Neo, XPS 13, and Framework 12 — except for the narrow "thin client to a server" use case above, or the Framework 12 where you will add a SO-DIMM.
- **Intel "Core 5/7 3xx" (Wildcat Lake) at $900+.** It's a $600–800 chip. Above that, Ryzen AI 300, Lunar Lake, or a refurb Mac is a different class of machine for the same money.
- **Intel Core i3/i5 "N" series, Celeron, Pentium**, and any 12th-gen-or-older Intel U-series in a *new* machine.
- **1366×768 or 1920×1080 16:9 TN panels.** **eMMC storage.**
- **"Gaming" laptops under $700** — the same compromises plus a GTX-class GPU and a 45-minute battery.
