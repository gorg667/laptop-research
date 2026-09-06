## 14.7 The Working Software Engineer (Web / Backend / Cloud)
*"Monorepo, Docker Compose, Kubernetes, three IDEs, forty tabs, Slack, Zoom. Employer may or may not pay."*

- **Primary:** **MacBook Pro 14" M5 Pro, 48 GB / 1 TB** (~$3,000) if the company pays — the industry default for a reason: sustained performance, silence, best display, three monitors. If self-funded: **MacBook Air 15" M5, 32 GB / 1 TB** ($2,099) covers 95% of the same work.
- **Windows shop:** **Dell XPS 14 (2026) X7, 32 GB** or **ThinkPad X1 Carbon Gen 14, 32–64 GB** with WSL2 — keep code inside the WSL filesystem. **Surface Laptop 8 15" X2 Elite, 32 GB** if your stack is Arm-clean and you want 15+ h.
- **Linux shop:** **ThinkPad P14s Gen 7 AMD, 64 GB** or **Framework 13 Pro**. Native Docker, no VM tax.
- **Config priorities:** 32 GB minimum → 1 TB → Thunderbolt dock → 27" 4K monitor. GPU irrelevant.

## 14.8 The Systems / Infra / Security Engineer
*"Kernel modules, eBPF, Wireshark, VMs of everything, Ghidra, a homelab."*

- **Primary:** **ThinkPad T14 Gen 6 AMD / T16 Gen 4 AMD with 64–96 GB SO-DIMM** (~$1,300–1,800 on sale) running Fedora or Debian — real Linux kernel, upgradeable RAM for many VMs, Ethernet port, USB-A for hardware, MIL-STD build. Or **Framework 13 Pro / 16** for the same on a repairable platform.
- **Alternative:** **MacBook Pro 14" M5 Pro 48 GB** — excellent for VMs via UTM/Parallels (Arm Linux guests fly), Docker via OrbStack, and reverse engineering with Ghidra/Binary Ninja — but no x86 VMs at speed and no native kernel work. Many security professionals use Macs with a Linux box nearby.
- **Avoid:** Snapdragon (x86 VMs, driver gaps); 16 GB.

## 14.9 The EE / CE / Embedded Student (CS-adjacent)
*"Vivado, Quartus, KiCad, STM32Cube, Arduino, logic analyzers, a lot of USB."*

- **Primary:** **ThinkPad T14 Gen 6 (AMD or Intel), 32 GB, Windows 11 Pro** (~$1,000–1,200 on sale) — USB-A ×2, HDMI, Ethernet-ready, robust, x86 for every vendor toolchain. **ThinkPad P14s Gen 7** if you also run simulation.
- **Alternative:** **Framework 13 Pro** with USB-A + HDMI + Ethernet expansion cards (Linux for KiCad/PlatformIO; Windows partition for Vivado/Altium).
- **Avoid:** Macs (Vivado/Quartus/Altium are Windows/Linux-x86 only; VMs on Arm can't run them well); Snapdragon (same problem); port-starved ultrabooks.

## 14.10 The Digital Nomad / Commuter
*"Trains, cafés, airports. Battery and weight above all. I dock rarely."*

- **Primary:** **MacBook Air 13" M5, 24 GB** ($1,499) — 1.24 kg, 12–14 h, silent, charges from a 30 W phone brick in a pinch.
- **Windows:** **HP OmniBook Ultra 14 (Snapdragon X2)** or **Surface Laptop 8 13.8" (X2)** — 11–15 h real, Mac-like standby; or **ThinkPad X1 Carbon Gen 14** at 1.0 kg with a real keyboard and optional 5G.
- **Kit:** 65 W GaN charger, USB-C→HDMI adapter, one 100 W cable, a slim sleeve. Nano-texture or matte panel for cafés.

## 14.11 The Gamer Who Codes (or Coder Who Games)
*"I want to play current AAA titles at good settings and also do my CS degree on the same machine."*

- **Primary:** **Asus ROG Zephyrus G14 (2026) RTX 5070, 32 GB** — the one gaming laptop light and quiet enough to carry to lectures. 
- **Desk-first:** **Lenovo Legion Pro 5i/7i Gen 10 RTX 5070 Ti, 32 GB** — more performance per dollar, 99 Wh, superb keyboard, 2.5 kg.
- **Budget:** **Lenovo LOQ 15 RTX 5060, upgrade to 32 GB yourself** (~$1,100–1,300 all-in).
- **The Mac option:** MacBook Pro 14" M5 (10-core GPU) plays a growing native Mac library plus CrossOver/GPTK titles at 1080p–1440p; it is *not* a substitute for an RTX laptop if you play competitive or Windows-exclusive titles.
- **Honest alternative:** MacBook Air + a $1,200 gaming desktop. Better at both jobs.

## 14.12 The Desktop-Replacement Engineer
*"It sits on a desk 95% of the time. I want the biggest screen and the most power; weight is irrelevant."*

- **Primary:** **MacBook Pro 16" M5 Pro 48 GB** ($3,599) or **M5 Max** for GPU/LLM work — the 16" mini-LED and speakers are unmatched; 100 Wh.
- **Windows/Linux:** **ThinkPad P1 Gen 8 / P16** or **Dell Pro Max 16** with RTX PRO; **Legion Pro 7i** for consumer-priced power; **Framework 16** for modularity.
- **Then:** two 27" 4K monitors and a Thunderbolt dock. At this point ask whether a **desktop + light laptop** would serve better — usually yes.

## 14.13 The Parent Buying for a Student
*"My kid is starting CS. What do I get them that they won't outgrow and won't break?"*

- **Buy:** **MacBook Air 13" or 15" M5, 24 GB / 512 GB** with education pricing (~$1,399 / $1,599 after edu discount, plus the $100 gift card through Sep 24, 2026) and **AppleCare+** (student-discounted). It will last all four years, survive the backpack, and sell for ~half its price afterward. If the budget is ~$900: **Apple Certified Refurbished M4 Air 16 GB** with AppleCare+.
- **If the program requires Windows** (ask the department): **ThinkPad T14s Gen 6/7 or X1 Carbon, 32 GB**, with Lenovo's 3-year Premier Support + Accidental Damage Protection (cheap at purchase).
- **Skip:** the MacBook Neo (8 GB will frustrate a CS student by second year); anything from a big-box store's "back to school" endcap with 8 GB; gaming laptops unless the student specifically needs one.

## 14.14 Quick persona → pick table

| Persona | First choice | Runner-up | Non-negotiable spec |
|---|---|---|---|
| Frugal freshman | Refurb M4 Air 16 GB | Used ThinkPad T14 AMD 32 GB | 16 GB |
| Do-everything sophomore | Air 15" M5 24 GB | X1 Carbon 32 GB | 24–32 GB |
| ML track (no CUDA) | Air 15" M5 32 GB / MBP M5 Pro 48 GB | ZBook Ultra G1a 128 GB | Memory |
| ML track (CUDA) | Zephyrus G16 5070 Ti/5080 | Legion Pro 7i | ≥12 GB VRAM |
| Game dev (Unreal) | Zephyrus G14 5070 32 GB | Legion Pro 5i 5070 Ti | dGPU + 32 GB |
| Linux purist | Framework 13 Pro | ThinkPad T14s Gen 7 AMD | Intel/AMD, not Snapdragon |
| Mobile dev | Air 15" M5 24 GB / MBP M5 Pro | T14s Gen 7 AMD 64 GB (Android only) | macOS if iOS; 24+ GB |
| Working SWE | MBP 14" M5 Pro 48 GB | XPS 14 / X1 Carbon 32 GB | 32 GB, dock, monitor |
| Systems/infra/security | ThinkPad T14/T16 AMD 64 GB (Linux) | MBP M5 Pro + Linux box | x86 + RAM |
| EE/CE/embedded | ThinkPad T14 Gen 6 32 GB (Windows) | Framework 13 Pro | x86, USB-A, HDMI |
| Nomad/commuter | Air 13" M5 24 GB | OmniBook Ultra 14 X2 / X1 Carbon | Efficiency |
| Gamer-coder | Zephyrus G14 5070 32 GB | Legion Pro 5i | MUX, 32 GB |
| Desktop replacement | MBP 16" M5 Pro/Max | ThinkPad P1 Gen 8 | Screen + dock |
| Parent buying | Air M5 24 GB + AppleCare+ | ThinkPad T14s + Premier/ADP | 24–32 GB, warranty |
