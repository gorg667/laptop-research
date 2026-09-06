# Chapter 4 — Silicon: The 2026 Laptop Chip Landscape Explained

For the first time in laptop history there are five credible processor vendors and two instruction sets in play. This chapter explains each family — what's inside, how it performs, how efficient it is, what it's good and bad at for developers — and then gives you a decoder ring for the model numbers.

## 4.1 How to think about a laptop chip

Three numbers explain most of what you'll experience:

- **Performance per watt** determines battery life, fan noise, and how much of the chip's peak speed you actually get in a thin laptop. It's the most important number and the one never printed on the box.
- **Single-thread performance** determines how responsive everything feels.
- **Memory bandwidth and capacity** determine how much you can have open and how fast the GPU (integrated or not) can work.

Everything else — core counts, boost clocks, TOPS — is downstream of these or is marketing.

A subtle but crucial point: **the same chip performs differently in different laptops.** OEMs set the power limits (Intel calls them PL1/PL2; AMD, STAPM/PPT; Apple doesn't let you touch them). A Core Ultra X7 358H at 55 W in a thick 16" laptop is a very different beast from the same chip at 25 W in a 13" ultraportable — Ars Technica measured roughly a 2× multi-core gap between "performance" and "whisper" modes on one machine. So when comparing laptops, compare *review results for that laptop*, not chip names.

## 4.2 Apple M5 family (and where M4 fits)

**What it is.** Apple's fifth-generation Mac silicon, on TSMC's third-generation 3 nm process. The base **M5** (October 2025 in the 14" MacBook Pro; March 2026 in the MacBook Air) has a 10-core CPU — four "super" (performance) cores and six efficiency cores — and an 8- or 10-core GPU with a Neural Accelerator in every GPU core, plus a 16-core Neural Engine. Unified memory is 16, 24, or 32 GB at 153 GB/s.

**M5 Pro and M5 Max** (March 2026, MacBook Pro 14"/16") use a new two-die "Fusion Architecture." M5 Pro: 15-core CPU/16-core GPU or 18-core CPU/20-core GPU, 24–64 GB at 307 GB/s. M5 Max: 18-core CPU with 32- or 40-core GPU, 36–128 GB at 460–614 GB/s. Apple now labels the big cores "super cores" and the small ones "performance cores," which is confusing; functionally they're P-cores and very-good E-cores.

**Performance.** Single-core: the M5 is the fastest laptop CPU core in the world in September 2026 — Geekbench 6 ~4,260 vs. roughly 3,000–3,300 for the best Intel/AMD/Qualcomm parts. (Interestingly, the base M5 matches the M5 Max in single-core; you pay for more cores, GPU, and bandwidth, not faster cores.) Multi-core: M5 ~17,900 (Geekbench 6) puts the *fanless Air* in the neighborhood of a 55 W Intel Panther Lake H-series; M5 Max ~29,200 beats every laptop chip and most desktops. Apple quotes 15–20% multi-thread gains over M4, and specifically calls out compiling as a workload with up to 20% gains.

**Efficiency.** Best in class, by a comfortable margin; Ars Technica's Panther Lake review — otherwise very positive about Intel — concluded "I doubt anyone at Apple is looking at Panther Lake and regretting the decision to bring chip designs in-house." Practical outcome: the MacBook Air has no fan and doesn't need one; the MacBook Pro's fans are inaudible outside sustained heavy loads; PCMag's video rundown on the M5 Air was ~18 hours.

**GPU.** The M5's 10-core GPU is roughly on par with Intel's Arc B390 and ahead of AMD's Radeon 890M; it handles Metal-based games and creative apps well, and the Neural Accelerators make it very good at on-device ML inference (Apple claims up to 3.5× M4's AI performance). The M5 Max's 40-core GPU is in laptop-RTX-5070-Ti territory in raw compute, with far more memory available to it. CUDA does not exist here — PyTorch uses the MPS backend, which is mature for inference and fine for training small/medium models.

**Developer notes.**
- Rosetta 2 remains for the few x86 Mac apps; virtually all developer tooling is Arm-native.
- Docker/OrbStack/Colima run Arm Linux VMs; `linux/arm64` images everywhere; x86-only images run slow under emulation.
- Memory bandwidth (153 → 614 GB/s across the range) is the spec that matters for local LLMs. An M5 Max with 128 GB is the most capable *laptop* for running large models locally that exists, period. A 32 GB M5 Air can run 7–14B-parameter models comfortably.
- Xcode compile times are excellent; Android emulator is native Arm and fast.

**Generational advice.** M4 (2024–25) is ~15% behind M5 and is the refurbished bargain of the year. M3 is fine. M2 is still a good machine with 16 GB. M1 (2020) is showing its age in single-core but still perfectly usable; buy only with 16 GB and only cheap. **Avoid 8 GB configs of any generation.** Rumored: base 14" MacBook Pro moves to **M6 (2 nm)** in fall 2026; no M6 Pro/Max — Apple reportedly skips to M7 Pro/Max in 2027. If you're eyeing the base M5 MBP in September–October 2026, wait.

## 4.3 Intel Core Ultra Series 3 "Panther Lake"

**What it is.** Intel's first product on its in-house **18A** process, launched at CES in January 2026 and in laptops from Q1. It unifies what was previously a confusing split: the efficient-but-CPU-weak Lunar Lake (Core Ultra 200V) and the CPU-strong-but-GPU-weak Arrow Lake (200H/200U). Every Series 3 chip shares the same core architectures, the same Xe3 GPU architecture, and an NPU that clears Copilot+ requirements.

**The lineup, decoded.** Model numbers look like **Core Ultra X9 388H**, **Core Ultra X7 358H**, **Core Ultra 5 338H**, **Core Ultra 5 325**, etc.
- **"X" prefix** = the big 12-Xe-core **Arc B390** graphics tile (10-core **Arc B370** on the Core Ultra 5 338H). This is the tile made by TSMC; it *requires* soldered LPDDR5X-9600 memory.
- **No X** = the small 4-Xe-core (or 2-core) "Intel Graphics" tile made by Intel. Fine for desktop work, roughly Lunar-Lake-class or below for games.
- **H suffix** = higher power (25–55 W typical); no suffix/U = lower power.
- **First digit after the tier (3xx)** = generation 3. Higher second/third digits = more cores/higher clocks.
- Core counts go up to 16 (4 P-cores + 8 E-cores + 4 low-power E-cores) on the 388H/358H.

**Performance.** Single-core ~10% ahead of Lunar Lake, Ryzen AI 9 HX 370, and Snapdragon X Elite — but still well behind Apple M4/M5. Multi-core at 55 W: about **2× Lunar Lake** and **10–40% ahead of the Ryzen AI 9 HX 370** depending on workload. At a laptop-realistic 25–30 W: still ~95% of the single-core and 75–85% of the multi-core performance, which is what makes it good in thin machines.

**GPU.** The Arc B390 is the best integrated GPU on x86 as of September 2026: ~2× Lunar Lake's Arc 140V, ~2× AMD's Radeon 890M, and far ahead in ray-traced workloads. Only AMD's much larger Strix Halo (Radeon 8060S) beats it, at higher power. Practical translation: 1080p gaming at medium settings in most titles, and enough for Unity/Godot game dev and light Blender work without a dGPU.

**Efficiency.** Excellent — only Apple is better in perf/W. Ars Technica estimated ~13 hours (PCMark Modern Office) on a 72 Wh battery; Framework's 13 Pro measured ~18 hours on 74 Wh at 200 nits. Slightly behind Lunar Lake in pure battery life, far ahead in performance, which is the right trade.

**Developer notes.**
- x86-64: everything just works. Windows, Linux, WSL2, Docker, every toolchain, every VM.
- Linux: needs kernel **6.19+** (7.0+ recommended) for full support — so Ubuntu 26.04 LTS / Fedora 44 or later, or a rolling distro. Older LTS releases with HWE kernels may lag for a few months.
- Thunderbolt 4 integrated; some machines offer Thunderbolt 5.
- The B390 requirement for soldered LPDDR5X means X-series machines don't have SO-DIMM slots (Framework uses LPCAMM2 to keep upgradeability).

**Caveats.** Supply constraints were reported through mid-2026; some configurations are hard to find. Not all "Panther Lake" laptops have the good GPU — check for the "X" (e.g., the Asus Zenbook S14 2026 ships a non-X part and reviewers called its iGPU slow).

**Where Series 2 still makes sense.** Lunar Lake (Core Ultra 7 258V, 268V) laptops from 2024–25 are heavily discounted, have superb battery life, integrated 16/32 GB memory, and an 8-core CPU that's fine for students. Arrow Lake H (Core Ultra 7 255H, 9 285H) machines have strong CPUs and weaker GPUs; good value in discounted workstations and gaming laptops.

## 4.4 AMD Ryzen AI 300 "Strix Point" and Ryzen AI 400 "Gorgon Point" (+ Strix Halo)

**What it is.** Ryzen AI 300 launched in mid-2024: Zen 5 and Zen 5c cores (up to 12), RDNA 3.5 graphics (Radeon 890M/880M), an XDNA 2 NPU (50 TOPS), on TSMC 4 nm. **Ryzen AI 400 (Gorgon Point)**, announced at CES 2026, is a **clock-speed and memory-speed refresh of the same silicon** — Notebookcheck's verdict was "only minor improvements"; Ars Technica called it a refresh-in-name-only. The NPU is now rated at 60 TOPS. Model numbers: **Ryzen AI 9 HX 475 / 470**, **Ryzen AI 7 450**, **Ryzen AI 5 440**, with PRO variants (450 PRO etc.) in business laptops. Ryzen AI 300 parts (HX 370, 365, 350, 340) remain widely available and are 5–10% slower.

**Strix Halo — Ryzen AI Max+ 395 / Max 390 / Max 385** is a different, much larger chip: up to 16 Zen 5 cores, a 40-CU Radeon 8060S iGPU (roughly laptop-RTX-4060/4070 class), and up to **128 GB of unified LPDDR5X-8000 at 256 GB/s**. It's AMD's answer to the M-series Max: found in the HP ZBook Ultra G1a, Asus ROG Flow Z13, and a few others. AMD refreshed it under the Ryzen AI 400 banner too.

**Performance.** Ryzen AI 9 HX 370/470: single-core roughly matching Lunar Lake and Snapdragon X Elite, ~10% behind Panther Lake, ~25% behind M5. Multi-core: competitive with Panther Lake at low power, 10–40% behind at high power. Strix Halo: multi-core in M5 Pro territory; GPU ~70% faster than Arc B390.

**Efficiency.** Good, not great: a step behind Panther Lake and Snapdragon, two behind Apple. Ryzen AI laptops typically do 8–12 hours in real mixed use.

**Developer notes.**
- x86-64, zero compatibility concerns.
- **Best-in-class Linux support**: AMD's open-source graphics and platform drivers are upstream and mature. A Ryzen AI ThinkPad or Framework is the most boring — in the good sense — Linux laptop you can buy.
- Strix Halo + 64–128 GB is the only x86 laptop platform that competes with Macs for running large local LLMs; llama.cpp works via ROCm or Vulkan.
- SO-DIMM DDR5 is supported on many Ryzen AI 300/400 laptops (unlike Panther Lake X-series and all Apple/Snapdragon) — the *upgradeable RAM* option, though 2026 SO-DIMM prices blunt that advantage.

**Where it fits in 2026.** Value. Discounted Ryzen AI 300 ThinkPads, Zenbooks, and Frameworks are excellent buys. Strix Halo is the specialist pick for local-ML people who won't buy a Mac. Gorgon Point isn't worth a premium over Strix Point.

## 4.5 Qualcomm Snapdragon X2 Elite / X2 Elite Extreme / X2 Plus

**What it is.** Qualcomm's second-generation Windows PC chip (third-gen Oryon CPU cores), shipping in laptops from roughly Q1–Q2 2026. Up to 18 cores on the X2 Elite Extreme; 12-core X2 Elite; 10-core X2 Plus. Integrated Adreno GPU (much improved; Microsoft cited ~50–58% graphics gains gen-over-gen in the Surface Laptop 8), Hexagon NPU (80 TOPS class), LPDDR5X memory (16–64 GB, soldered). Arm64 instruction set.

**Performance.** The X2 Elite Extreme is fast — Asus ships the Zenbook A16 with a 130 W charger because the chip can actually use the power. Single-core is in the Panther Lake / Ryzen AI ballpark; multi-core on the 18-core part is strong. Reviewers' consensus (Tom's Hardware, XDA, MakeUseOf): "Intel is sometimes as fast, but it's never as efficient."

**Efficiency.** The reason to buy it. Snapdragon X2 laptops post the best battery numbers on Windows: HP's OmniBook Ultra 14 (X2) averaged ~11 hours of *actual mixed uptime* in Thurrott's review; PCMag's video-rundown champion is a Snapdragon OmniBook at well over 18 hours. Standby drain is Mac-like.

**Developer notes.**
- **Windows on Arm compatibility** — see Chapter 3 §3.7. Modern web/backend/mobile/data tooling is native and excellent. WSL2 runs Arm64 Linux distros. Docker Desktop runs Arm containers natively. The Android emulator is native and fast. x86 apps run via Prism emulation at decent speed.
- **Hard limits:** no fast x86 VMs; some kernel drivers/VPNs/anti-cheat missing; x86-only SDKs/toolchains (embedded, FPGA, EDA, legacy enterprise) don't run or run slowly.
- **Linux: not ready.** Don't buy a Snapdragon laptop for Linux in 2026.
- No discrete GPU pairings. Gaming is emulated-x86 + Adreno — casual only.

**Where it fits.** The Windows equivalent of a MacBook Air: long battery, cool, quiet, thin. Excellent for students and engineers on modern stacks who live in VS Code, a browser, WSL2, and Teams. Wrong for EE/CE, embedded, game dev, Linux users, and anyone with legacy tooling.

## 4.6 Nvidia N1X / N1 ("RTX Spark" PCs)

**What it is.** Nvidia's long-rumored Arm SoC for Windows laptops, announced at Computex on May 31, 2026, with Microsoft. Up to 20 Arm cores (N1X), 12 or 10 on the N1, with a Blackwell-architecture integrated GPU that headlines have compared to a mobile RTX 5070, and "1 petaflop" of AI performance marketing. It was delayed repeatedly through 2025–26 due to software readiness; Notebookcheck reported "limited 2026 availability," with real volume expected in 2027.

**Why it matters.** It's the first credible way to get a *big Nvidia GPU* — with CUDA — in an efficient Arm laptop. For ML students that's a tantalizing combination. It also gives Windows on Arm a second vendor and a gaming story.

**Why you shouldn't wait for it (probably).** First-generation platform; drivers, Windows-on-Arm gaming compatibility, and Linux support (Nvidia has said Linux is a target; time will tell) are unproven; pricing looks premium; availability through the end of 2026 is thin. If you need a laptop for the fall 2026 semester, buy one of the proven platforms and revisit N1X in 2027.

## 4.7 The comparison table

Rough, September 2026, based on published reviews; "relative" columns are indexed to the base M5 = 100. Your specific laptop's cooling will move these ±20%.

| Chip | ISA | Single-core (rel.) | Multi-core (rel.) | iGPU (rel.) | Efficiency | Max RAM | RAM upgradeable? | Linux | Best for |
|---|---|---|---|---|---|---|---|---|---|
| Apple M5 | Arm64 | 100 | 100 | 100 | ★★★★★ | 32 GB | No | Asahi only (not daily) | Everything except CUDA/Windows-only |
| Apple M5 Pro | Arm64 | 100 | ~150–165 | ~180 | ★★★★★ | 64 GB | No | — | Pro work, big builds, local ML |
| Apple M5 Max | Arm64 | 100 | ~165 | ~300–400 | ★★★★☆ | 128 GB | No | — | Local LLMs, video, max everything |
| Apple M4 (2024–25) | Arm64 | ~88 | ~85 | ~85 | ★★★★★ | 32 GB | No | — | Refurb value |
| Intel Core Ultra X9 388H / X7 358H | x86-64 | ~75 | ~90–110 (55 W) / ~70–85 (28 W) | ~95 | ★★★★☆ | 64+ GB (LPDDR5X / LPCAMM2) | LPCAMM2 only (Framework) | ★★★★☆ (kernel 6.19+) | Windows/Linux flagship |
| Intel Core Ultra 5 338H / 325 | x86-64 | ~70 | ~70–90 | ~50–80 | ★★★★☆ | 64 GB | Sometimes SO-DIMM | ★★★★☆ | Mainstream Windows/Linux |
| Intel Core Ultra 7 258V (Lunar Lake) | x86-64 | ~70 | ~50 | ~50 | ★★★★☆ | 32 GB (on-package) | No | ★★★★★ | Discounted ultraportables |
| AMD Ryzen AI 9 HX 370/470 | x86-64 | ~70 | ~80–95 | ~50 | ★★★☆☆ | 128 GB (SO-DIMM) / 64 GB (soldered) | Often SO-DIMM | ★★★★★ | Linux, value, upgradeable |
| AMD Ryzen AI 7 350/450 | x86-64 | ~68 | ~65–75 | ~40 | ★★★☆☆ | 64–96 GB | Often | ★★★★★ | Value |
| AMD Ryzen AI Max+ 395 (Strix Halo) | x86-64 | ~70 | ~130–150 | ~170 | ★★★☆☆ | 128 GB unified | No | ★★★★☆ | Local LLMs on x86, GPU work w/o dGPU |
| Snapdragon X2 Elite Extreme (18c) | Arm64 | ~75 | ~100–120 | ~70 | ★★★★★ | 64 GB | No | ★☆☆☆☆ | Windows battery life |
| Snapdragon X2 Elite (12c) / X2 Plus (10c) | Arm64 | ~72 | ~70–90 | ~55 | ★★★★★ | 64 GB | No | ★☆☆☆☆ | Windows ultraportables |
| Snapdragon X Elite / X Plus (2024) | Arm64 | ~62 | ~55–70 | ~35 | ★★★★★ | 64 GB | No | ★★☆☆☆ | Discounted battery champions |
| Nvidia N1X | Arm64 | unknown | unknown | very high | unknown | 128 GB? | No | unknown | Wait and see |

## 4.8 Decoder ring: model-number cheat sheet

- **Apple:** M{gen} < M{gen} Pro < M{gen} Max < (Ultra, desktop only). Higher gen beats lower tier for single-core (M5 > M4 Pro in single-core; M4 Pro > M5 in multi-core).
- **Intel Series 3:** Core Ultra {5|7|9|X7|X9} 3{xx}{H|U}. X = big Arc GPU. Higher number = more/faster cores. H = more power. Series 2: 2xxV = Lunar Lake (efficient, 8 cores, on-package RAM); 2xxH = Arrow Lake H (fast CPU, weak GPU); 2xxU = low-power Arrow Lake.
- **AMD:** Ryzen AI {5|7|9} [HX] {3|4}{xx}. 3xx = Strix Point (2024–25); 4xx = Gorgon Point (2026, same thing faster). HX = 12-core top parts. "Ryzen AI Max/Max+ 3x5/4x5" = Strix Halo (big iGPU, unified memory). Non-AI "Ryzen 7 250 / Ryzen 9 270" = older Zen 4 (Hawk Point) rebrands common in budget gaming laptops — fine, but not Zen 5.
- **Qualcomm:** Snapdragon X2 Elite Extreme (18c) > X2 Elite (12c) > X2 Plus (10c). 2024 gen: X Elite (12c) > X Plus (10c/8c).
- **Nvidia GPUs (laptop):** RTX 5050 (8 GB) < 5060 (8 GB) < 5070 (8 GB) < 5070 Ti (12 GB) < 5080 (16 GB) < 5090 (24 GB). **Laptop GPU wattage (TGP) varies 60–175 W by model and changes performance by up to 40%** — always check the specific laptop's TGP. VRAM, not the model number, is what limits ML.

## 4.9 Bottom line by buyer

- **Want the fastest, most efficient, quietest chip and don't need Windows/CUDA:** Apple M5 (Air) or M5 Pro (Pro).
- **Want Windows or Linux, no compromises, x86 compatibility:** Intel Core Ultra Series 3 with an X-series chip.
- **Want Linux with zero fuss and/or upgradeable RAM at the best price:** AMD Ryzen AI 300/400.
- **Want maximum battery life on Windows and your tooling is modern:** Snapdragon X2.
- **Want to run 70B-parameter models locally:** M5 Max 128 GB or a Strix Halo 128 GB machine.
- **Want an Nvidia GPU:** any x86 laptop with an RTX 50-series dGPU; or wait for N1X in 2027.
