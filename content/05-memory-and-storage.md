# Chapter 5 — Memory and Storage: Buying Decisions in a Shortage Year

Chapter 2 explained *why* RAM is the dominant spec for developers. This chapter is about the *buying decisions*: how much, soldered vs. upgradeable, what the 2026 shortage does to the math, and how to handle storage on machines where it can't be changed.

## 5.1 The 2026 memory shortage, in practical terms

What happened: AI data-center demand for HBM and server DDR5 consumed fab capacity; DRAM contract prices roughly tripled over 2025, jumped again in early 2026 (+80–90% in the first six weeks), and are forecast to stay high through 2027. Micron is winding down its consumer (Crucial) brand. NAND is affected too, less severely.

What it did to laptops, concretely:
- Apple: +$200 on MacBook Air, +$300 on MacBook Pro (June 25, 2026). RAM upgrade tiers stayed at $200 per step (16→24→32 GB) — meaning, perversely, the *relative* cost of extra RAM on a Mac is now lower than the base-price increase.
- Dell, Lenovo, HP: 15–20%+ list-price increases across 2026, with more warned for H2. On its August 26, 2026 earnings call HP's CFO said the company "expect[s] to continue to increase pricing as input costs rise," that memory and storage now account for roughly **35% of a PC's bill of materials** (up from 15–18%), and that the cheaper inventory that cushioned H1 pricing is used up. DRAM contract prices rose ~95% in Q1 and ~89% in Q2 2026. IDC and HP both expect PC unit shipments to fall by "high teens" percentages in H2 2026 — OEMs are shipping fewer, pricier machines and "reconfiguring" products (HP's word) — trimming base RAM and storage tiers and pushing more 8 GB SKUs at the low end — rather than absorbing costs.
- Framework: repeated component price increases; its LPCAMM2 supplier doubled prices mid-year. A 32 GB LPCAMM2 module is $800 on Framework's store; 64 GB is $1,600.
- Aftermarket DDR5 SO-DIMMs: 3–4× their 2024 prices. A 2×16 GB DDR5-5600 kit that was $80–100 is now $250–350.

Implications:
1. **Configure the RAM you'll need at purchase.** It costs more than it used to, but far less than regret.
2. **"Upgradeable RAM" is a feature, not a discount, in 2026.** You'll pay shortage prices for the upgrade stick too. The feature's value is in *repairability and longevity*, and in being able to add RAM in 2028 when (hopefully) prices normalize.
3. **Older-generation and refurbished machines that already have 32 GB are unusually attractive.** Their RAM was priced in 2024–25.
4. **8 GB machines are cheaper for a reason.** Don't.

## 5.2 How much RAM — the decision table

| You are… | Buy | Reasoning |
|---|---|---|
| A student on a tight budget doing coursework in Python/Java/C/JS, VS Code, the occasional Docker container or VM | **16 GB** | Enough. Will feel tight by senior year if you take mobile or ML courses. |
| A student who wants the machine to last all four years without thought, or takes Android/iOS/ML/game-dev electives | **24 GB** (Mac) / **32 GB** (PC) | The sweet spot. On Macs 24 GB is a real config; on PCs the step is usually 16→32. |
| A working software engineer | **32 GB** | IDE + containers + browser + Slack + Zoom + a VM is routinely 20+ GB. |
| Android or iOS developer | **32 GB** | Emulator/Simulator + Android Studio/Xcode + backend + browser. |
| Data scientist / ML student running things locally | **32–64 GB** | In-memory datasets and model weights. Unified-memory Macs make 48–64 GB unusually useful here. |
| Game developer in Unreal | **32 GB minimum, 64 GB nice** | Unreal Editor + a game build + Visual Studio. |
| Running local LLMs seriously | **64–128 GB unified** (M5 Pro/Max, Strix Halo) | The model has to fit. 70B models at 4-bit need ~40 GB; 32 GB machines cap out around 14–30B. |
| Anyone tempted by 8 GB | **Don't.** | See Chapter 2. |

## 5.3 Soldered vs. upgradeable memory in 2026

**Soldered (LPDDR5X):** Apple (all), Snapdragon (all), Intel Panther Lake X-series and Lunar Lake (all), most thin ultraportables regardless of chip. Faster (higher clocks, lower power), more compact, and enables the big integrated GPUs (Arc B390 requires LPDDR5X-9600). Irreplaceable.

**SO-DIMM (DDR5):** Many AMD Ryzen AI 300/400 laptops, most gaming laptops, many 15–16" business laptops (ThinkPad T16/P16s, Dell Pro/Precision), budget machines. Two slots, typically supports 64–96 GB. Slower and less efficient than LPDDR5X; often a small hit to iGPU performance. Replaceable in ten minutes.

**LPCAMM2:** The new compression-attached low-power module. Currently only in the Framework Laptop 13 Pro and a handful of Lenovo/Dell models. Best of both — LPDDR5X speed and efficiency with replaceability — but very expensive and rare in 2026. Expect it to spread.

**Mixed (soldered + one SO-DIMM slot):** Common in mid-range Windows laptops (e.g., 8 GB soldered + 1 slot). Works, but the unmatched portion runs single-channel — a performance hit, especially for the iGPU. Prefer full dual-channel configs.

**How to tell:** the manufacturer's PSREF (Lenovo), spec sheet (Dell/HP list "onboard" vs. "SO-DIMM"), iFixit teardowns, or Notebookcheck's review, which always states upgradeability. If a spec sheet says "LPDDR5X," it is soldered (except Framework 13 Pro).

## 5.4 Memory speed and channels: does it matter?

For CPU-bound developer work: barely. LPDDR5X-7500 vs. -8533 vs. -9600 is a 1–3% difference in compile times.

For integrated GPUs: yes. iGPUs are bandwidth-starved; going from single-channel to dual-channel can be a 30–50% GPU uplift, and faster LPDDR5X helps the Arc B390 and Radeon 890M meaningfully. If you'll game or do GPU work on an iGPU, make sure the config is dual-channel.

For local LLM inference: bandwidth is *the* number once the model fits (Chapter 2 §2.2).

## 5.5 Storage: capacity

A real developer's disk after a year:

| Item | Typical size |
|---|---|
| OS + system + updates | 40–60 GB |
| Xcode + iOS simulators (Mac) | 20–40 GB |
| Android Studio + SDK + system images | 20–40 GB |
| Docker images/volumes/build cache | 20–80 GB (grows silently; prune it) |
| Python envs with PyTorch/TensorFlow (×3–5) | 15–40 GB |
| node_modules across projects | 10–30 GB |
| JetBrains IDE(s) + caches | 5–15 GB |
| A Linux VM or two | 40–100 GB |
| Local datasets / models | 10–100+ GB |
| Personal: photos, music, media, downloads | 50–200 GB |
| A couple of games | 100–300 GB |
| **Total** | **~350–1,000 GB** |

**256 GB** fills in a semester. **512 GB** is the floor and comfortable if you don't game or run VMs. **1 TB** is right for engineers, mobile devs, ML students, and anyone who games. **2 TB** is for video/ML/games hoarders.

## 5.6 Storage: upgradeable or not

- **Apple:** soldered. Buy what you need. Apple's price for 512 GB → 1 TB is $200; → 2 TB is $600. Painful but final.
- **Snapdragon laptops:** usually a replaceable M.2 2230 or 2280 SSD (Surface Laptop uses a removable 2230 module behind a door).
- **Windows/Linux x86 laptops:** almost always an M.2 slot; check whether it's **2280** (standard, cheap high-capacity drives) or **2230** (short, used in thin machines; 1–2 TB drives exist but cost more). Some 16" machines have two slots.
- **Framework:** 2280 slot, plus optional storage expansion cards (250 GB / 1 TB) in the modular ports.

If a PC laptop has an M.2 slot, buying the base storage config and upgrading yourself is often *the* place to save money — a 2 TB PCIe 4.0 NVMe drive from a reputable brand (Samsung, WD, SK hynix, Kioxia) costs a fraction of the OEM upgrade price even with NAND inflation. Clone or reinstall; it's a 30-minute job.

## 5.7 External storage as a strategy

For Mac buyers facing $200–600 storage upgrades, and for anyone with a small internal drive:

- A **USB4 / Thunderbolt 4 NVMe enclosure + 2 TB drive** delivers ~3,000 MB/s and costs far less than Apple's internal upgrade. Fine for project archives, media, VM images, datasets, Docker volumes, and Steam libraries. Not for the OS or your active IDE workspace.
- A **USB 3.2 Gen 2 portable SSD** (~1,000 MB/s; Samsung T7/T9, SanDisk Extreme, Crucial X9/X10) is the budget version and more than fast enough for backups and media.
- **Cloud**: university Google Drive/OneDrive (often 1 TB+ for students) for documents and photos; GitHub/GitLab for code; Hugging Face for models. Keep the laptop lean.

## 5.8 SSD health and swap on RAM-starved machines

1. **A RAM-starved machine writes a lot to swap**, and SSDs have finite write endurance (TBW). Early 8 GB M1 Macs made headlines for high swap writes. Modern drives handle it in practice, but it's one more reason not to buy 8 GB.
2. **Keep 15–20% of the SSD free.** Full SSDs slow down and macOS gets unhappy under ~10% free. If you're routinely below that, you bought too little storage.

## 5.9 Configuration recommendations by platform

- **MacBook Air M5:** 16/512 (base, $1,299) if budget-constrained; **24/512 ($1,499) is the value-optimal pick**; 24/1 TB ($1,699) for engineers/mobile devs; 32/1 TB for ML/data people who insist on the Air.
- **MacBook Pro 14 M5 / M5 Pro:** the Pro starts at 1 TB now; 24 GB is standard on M5 Pro. Go 32 GB on M5 or 48 GB on M5 Pro only for specific reasons.
- **Refurb M4 Air:** 16/256 (~$850) is the bargain; add an external SSD. 16/512 or 24/512 if available at a good price.
- **Windows/Linux ultraportable (soldered):** 32 GB if the step from 16 is ≤ $250; otherwise 16 GB and accept it. 512 GB internal; upgrade the M.2 yourself later if there's a slot.
- **Windows/Linux with SO-DIMM (ThinkPad T/P, gaming laptops):** take the OEM's 32 GB unless the gap exceeds the current aftermarket cost of a 32 GB kit. Check the kit is dual-channel.
- **Framework 13 Pro:** the 16 GB LPCAMM2 ($239) is the sane starting point; 32 GB ($800) only if you must. Framework 13 (non-Pro, Ryzen AI) with DDR5 SO-DIMMs is the cheaper route to 32 GB.
