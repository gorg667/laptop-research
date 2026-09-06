# Chapter 20 — Glossary

**Adaptive refresh / VRR / ProMotion** — A display that changes refresh rate (e.g., 30–120 Hz) to match content, saving power when static.

**Arm64 / AArch64** — The instruction set used by Apple Silicon, Snapdragon X, and Nvidia N1X. Software must be compiled for it or run through translation (Rosetta 2, Prism).

**Arc B390 / B370** — Intel's integrated GPU tiles in Core Ultra Series 3 "X" chips (12 / 10 Xe3 cores). The best x86 iGPU in 2026.

**Asahi Linux** — Community project running Linux natively on Apple Silicon; mature on M1/M2, incomplete on M3+.

**Battery cycle** — One full discharge-and-recharge equivalent. Batteries are rated to ~80% capacity after 500–1,000 cycles.

**BitLocker / FileVault / LUKS** — Full-disk encryption on Windows / macOS / Linux.

**Burn-in** — Permanent image retention on OLED from static content over long periods.

**CAMM2 / LPCAMM2** — Compression Attached Memory Module: a replaceable memory module standard; LPCAMM2 uses low-power LPDDR5X. Used in Framework 13 Pro and a few others.

**Copilot+ PC** — Microsoft's branding for Windows laptops with an NPU ≥ 40 TOPS. Irrelevant to developers.

**CUDA** — Nvidia's GPU compute platform; required by much ML research code. Nvidia GPUs only.

**dGPU / iGPU** — Discrete (separate chip, own VRAM) vs. integrated (inside the CPU package, shares system memory) graphics.

**DisplayLink** — USB-based display technology using software compression; adds monitors beyond a laptop's native limit.

**DisplayPort Alt Mode** — USB-C carrying a DisplayPort video signal.

**Docker / Podman / OrbStack / Colima** — Container runtimes. On macOS/Windows they run a Linux VM under the hood; on Linux they talk to the kernel directly.

**E-core / P-core / efficiency core / performance (super) core** — Small, efficient CPU cores vs. large, fast ones in a hybrid CPU. Scheduler decides placement.

**eGPU** — External GPU over Thunderbolt. Works on x86 Windows/Linux; not on Apple Silicon.

**Gorgon Point** — Codename for AMD Ryzen AI 400 (2026), a clock-bumped Strix Point.

**GaN charger** — Gallium-nitride power adapter; smaller and cooler than silicon for the same wattage.

**HDR / XDR** — High dynamic range display capability. Apple's mini-LED "XDR" panels reach 1,000 nits sustained / 1,600 peak.

**Hybrid graphics / Optimus / MUX switch** — Systems that route the display through the iGPU (battery) or dGPU (performance). A MUX switch or Advanced Optimus lets you choose.

**LPDDR5X** — Low-power DDR5 memory, almost always soldered. Faster and more efficient than SO-DIMM DDR5.

**Lunar Lake / Arrow Lake / Panther Lake** — Intel codenames: Core Ultra 200V (2024, efficient), Core Ultra 200H/U (2025, fast CPU), Core Ultra Series 3 (2026, unified best-of-both).

**M.2 2280 / 2230** — SSD form factors (22 mm wide × 80 or 30 mm long). 2280 is standard; 2230 is the short version in thin machines.

**MagSafe 3** — Apple's magnetic breakaway charging connector on MacBook Air/Pro.

**Memory bandwidth** — How fast the CPU/GPU can read/write memory (GB/s). Critical for iGPUs and LLM inference. M5 153, M5 Pro 307, M5 Max 614, Strix Halo 256, typical PC ~136.

**Mini-LED** — LCD with a backlight of thousands of local-dimming zones; near-OLED contrast without burn-in. MacBook Pro.

**Modern Standby (S0ix) / S3 sleep** — Windows' connected-standby mode vs. traditional deep sleep. S0ix historically drained batteries in bags; much improved by 2026.

**MPS / MLX / Metal** — Apple's GPU compute paths for PyTorch (MPS), Apple's own ML framework (MLX), and the graphics API (Metal).

**N1X / N1 / RTX Spark** — Nvidia's Arm laptop SoC with a Blackwell iGPU, announced May 2026, limited availability in 2026.

**Nano-texture** — Apple's etched-glass anti-glare finish ($150 option).

**NPU** — Neural processing unit; low-power AI accelerator. Used for webcam effects and Copilot features; not for developer ML work.

**PD (USB Power Delivery) / EPR** — USB-C charging standard; PD 3.0 up to 100 W, PD 3.1 EPR up to 240 W.

**PL1 / PL2 / TDP / TGP** — Power limits. PL1 sustained, PL2 boost (Intel). TDP = CPU thermal design power; TGP = GPU total graphics power.

**Prism** — Microsoft's x86 → Arm translation layer on Windows on Arm.

**PWM (pulse-width modulation)** — Dimming by rapidly flickering the display; can cause eye strain at low frequencies. Common on OLED.

**Rosetta 2** — Apple's x86 → Arm translation layer.

**Snapdragon X / X2 Elite / Plus** — Qualcomm's Windows PC chips (2024 / 2026). Arm64; excellent battery; Linux support immature.

**SO-DIMM** — Small-outline DIMM; the replaceable laptop memory module format for DDR5.

**Strix Point / Strix Halo** — AMD Ryzen AI 300 (2024) / Ryzen AI Max (big iGPU, unified memory up to 128 GB).

**Thunderbolt 4 / 5** — Intel's high-speed USB-C standard: 40 Gb/s (TB4) / 80–120 Gb/s (TB5). Guarantees PCIe tunneling, display support, and dock compatibility.

**TOPS** — Trillions of operations per second; NPU marketing metric.

**Unified memory** — One memory pool shared by CPU and GPU (Apple M-series, Strix Halo). Lets the GPU use far more memory than a dGPU's VRAM.

**USB4** — The USB-IF's standard built on Thunderbolt 3; 20 or 40 Gb/s. On AMD and Snapdragon laptops.

**VRAM** — A discrete GPU's dedicated memory. The limiting factor for local ML on laptops (8 GB = tight; 12–16 GB = useful).

**Wh (watt-hour)** — Battery capacity. 100 Wh is the airline carry-on limit.

**WSL2** — Windows Subsystem for Linux 2: a real Linux kernel in a lightweight VM on Windows, with deep integration. The Windows developer's Linux.

**Xe3 / RDNA 3.5 / Adreno X2** — GPU architectures in Intel Panther Lake / AMD Ryzen AI 300–400 / Snapdragon X2.

**Zen 5 / Zen 5c** — AMD's 2024–26 CPU core designs; "c" is the compact, lower-clock variant.
