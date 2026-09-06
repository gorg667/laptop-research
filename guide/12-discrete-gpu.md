# Chapter 12 — Do You Need a Discrete GPU?

Short answer: **probably not.** Longer answer: it depends on exactly three things — whether you do game development, whether you need CUDA locally, and whether you game. This chapter lays out who needs one, what it costs you if you don't, and how to pick one if you do.

## 12.1 What integrated graphics can do in 2026

The iGPUs in current chips are not the Intel HD Graphics of 2015:

- **Apple M5 (10-core GPU):** drives two 6K displays; plays modern Metal games at 1080p–1440p medium (Cyberpunk, Resident Evil, Baldur's Gate 3 via native ports; many Windows games via CrossOver/Game Porting Toolkit); runs Blender, Unity, Godot; accelerates PyTorch via MPS; hardware ray tracing. Roughly an RTX 3050-laptop-class experience.
- **Intel Arc B390 (Panther Lake X-series):** ~2× the previous generation; 1080p medium-high in most games; XeSS upscaling; handles Unity/Godot/Blender. The best x86 iGPU, roughly GTX 1650 Ti–RTX 3050 class.
- **AMD Radeon 890M (Ryzen AI 300/400):** 1080p low-medium; solid for esports; fine for Godot/Unity 2D.
- **AMD Radeon 8060S (Strix Halo):** an actual RTX 4060/4070-laptop-class GPU sharing up to 128 GB of memory. Runs Unreal, local LLMs, and 1440p gaming. The exception that proves iGPUs can do dGPU work.
- **Qualcomm Adreno X2:** improved ~50%+ but still the weakest of the group and limited by Windows-on-Arm game compatibility. Casual only.

For everything a typical CS student or software engineer does — IDEs, browsers, containers, VMs, two or three monitors, video calls, most coursework including graphics fundamentals in OpenGL/WebGPU/Vulkan — **integrated graphics are more than sufficient.**

## 12.2 Who actually needs a dGPU

### Yes, you need one
1. **Game development in Unreal Engine 5.** The editor with Lumen/Nanite wants an RTX-class GPU and 32 GB RAM. Unity HDRP projects, likewise. Godot, Unity URP/2D, and most indie work: no.
2. **CUDA-specific coursework or research.** If a course syllabus says "CUDA" or "nvcc," or your research lab's code is CUDA-only and you need to iterate locally, you need Nvidia. (Check whether the university provides GPU cluster access — most do — and whether cloud credits are available; often local CUDA is a convenience, not a requirement.)
3. **Local ML training beyond toy models** where you refuse to use cloud/Colab/lab resources. Even then, laptop GPUs with 8 GB VRAM are marginal; 12–16 GB is where it becomes useful.
4. **3D graphics, VFX, CAD, and simulation-heavy work** (Blender production renders, Houdini, SolidWorks with large assemblies, ANSYS) if these are core to your program.
5. **Gaming at high settings as a real priority.** Not a dev need, but a legitimate one for a daily driver.

### No, you don't
- Web, mobile, backend, systems, data engineering, security, DevOps, most ML *coursework* (small models on CPU/iGPU or in the cloud), databases, compilers, algorithms, theory. That's 85–90% of CS students and software engineers.

### Maybe — consider alternatives first
- **Occasional GPU needs**: cloud GPUs (Colab free/Pro, Kaggle, Lambda, RunPod, Vast.ai at $0.20–2/hour), university clusters, a desktop at home with a real GPU that you SSH into (the best answer for many — a $1,200 desktop with an RTX 5070 Ti 16 GB beats any laptop GPU and doesn't drain your battery), or an eGPU over Thunderbolt (works on Windows/Linux x86; not on Apple Silicon; ~70–85% of the GPU's desktop performance).
- **Local LLM tinkering**: a unified-memory Mac (32–128 GB) or Strix Halo machine often serves better than an 8 GB dGPU — the model has to *fit* first.

## 12.3 What a dGPU costs you

| Cost | Typical impact |
|---|---|
| **Price** | +$300–1,200 over an equivalent iGPU machine. |
| **Weight** | +0.4–1.0 kg. A 14" gaming laptop is ~1.6–1.8 kg; a 16" is 2.1–2.7 kg. |
| **Battery** | Even with the dGPU idle (hybrid mode), gaming laptops get 4–7 h light use vs. 10–14 h for efficient ultraportables; 1–2 h when the dGPU is active. |
| **Noise & heat** | Fans are audible in normal use on most; loud under load. Hot palm rests on thin designs. |
| **Thickness / aesthetics** | Vents, RGB, "gamer" styling on many (though Zephyrus, Blade, and Legion Slim are tasteful). |
| **Complexity** | Hybrid graphics (Optimus/MUX) driver quirks, especially on Linux; external display routing. |
| **Charger** | 200–330 W brick; often proprietary; USB-C charging is slow/partial. |
| **RAM budget** | In 2026, dollars spent on a GPU are dollars not spent on RAM. |

For a student walking to class, these costs are paid *every day*, while the dGPU benefit is realized a few hours a week. That's the core argument against gaming laptops as daily drivers.

## 12.4 If you do need one: how to choose

### VRAM first
| GPU (laptop, RTX 50-series) | VRAM | ML/AI usefulness | Gaming |
|---|---|---|---|
| RTX 5050 | 8 GB | Toy models; small fine-tunes with quantization | 1080p high |
| RTX 5060 | 8 GB | Same; faster | 1080p–1440p high |
| RTX 5070 | 8 GB | Same; faster still — **VRAM-limited** | 1440p high |
| **RTX 5070 Ti** | **12 GB** | **The useful floor for local training/inference** | 1440p ultra |
| RTX 5080 | 16 GB | Comfortable for mid-size models, SDXL, 13B LLMs | 4K |
| RTX 5090 | 24 GB | Workstation-class; 30B LLMs at 4-bit | 4K ultra |
| RTX PRO 1000/2000/3000/4000 Blackwell | 8–16 GB | Workstation drivers (ISV certs); same silicon classes | — |

**For ML, an RTX 5070 Ti (12 GB) is the smallest GPU worth buying over an iGPU + cloud.** For pure gaming, a 5060 or 5070 is the value sweet spot.

### TGP (total graphics power) second
The same GPU name ships at 60–175 W depending on the laptop, with up to ~40% performance difference. Thin 14" machines (Zephyrus G14, Blade 14) run 5070/5070 Ti at ~100–120 W; 16" machines run 140–175 W. Check the spec sheet for "TGP" or "Max-Q"/"Dynamic Boost" figures and reviews that measure actual clocks.

### MUX switch / Advanced Optimus
Lets the display connect directly to the dGPU (better gaming performance, fewer stutters) or the iGPU (battery life) without a reboot. Any 2025–26 gaming laptop worth buying has Advanced Optimus or a manual MUX. Check.

### Nvidia vs. AMD dGPU
For ML: Nvidia (CUDA). Full stop. AMD's ROCm on laptop Radeon dGPUs is not a reliable workflow in 2026. For gaming and Linux simplicity: AMD dGPUs (rare in 2026 laptops) are easier on Linux; Nvidia is fine with the open modules but more fiddly.

### Form factor
- **14" premium (1.5–1.8 kg):** Asus ROG Zephyrus G14 (RTX 5060/5070/5070 Ti, 3K OLED 120 Hz, Ryzen), Razer Blade 14, Lenovo Legion Slim 5 14 / Yoga Pro 7 with dGPU. The "gaming laptop you can bring to class" tier. Compromised TGP and hot under load; excellent otherwise.
- **16" balanced (2.0–2.4 kg):** Lenovo Legion Pro 5 / 7i, Asus ROG Zephyrus G16 / Strix G16, HP Omen 16, MSI Stealth/Vector, Razer Blade 16. Full TGP, better cooling, big batteries (90–99 Wh).
- **Workstation (2.0–2.6 kg):** ThinkPad P1 Gen 8 / P16s / P16v, Dell Pro Max 16, HP ZBook Power/Fury — RTX PRO GPUs, ISV certs, better keyboards and Linux support, business warranty, less RGB. Often better for *engineers* than gaming brands.
- **Budget 15–16" (2.2–2.5 kg):** Lenovo LOQ 15, Asus TUF A15/A16, HP Victus, Acer Nitro, MSI Thin/Katana. RTX 5050/5060, plastic, 1080p/1200p 144–165 Hz IPS, SO-DIMM RAM, mediocre battery. ~$900–1,300. Fine for "I need a GPU and this is the budget."

## 12.5 Recommended dGPU machines (September 2026)

- **Best 14" all-rounder:** **Asus ROG Zephyrus G14 (2026)** — RTX 5060 or 5070, 3K OLED 120 Hz, ~1.6 kg, USB-C charging supported (100 W) plus barrel; regularly discounted to $1,600–1,900 from $2,000–2,300. Get 32 GB.
- **Best 16" for engineers:** **Lenovo Legion Pro 5i / 7i Gen 10** (RTX 5070/5070 Ti, excellent keyboard, 99 Wh, tasteful) ~$1,500–2,200; or **ThinkPad P1 Gen 8** / **HP ZBook Power 16 G11** if you want workstation support and Linux certification.
- **Best budget:** **Lenovo LOQ 15 (RTX 5060, Ryzen 7 250 or Core i7)** — ~$1,000–1,200 on sale; upgradeable RAM and two M.2 slots; PC Gamer's value pick.
- **Best premium:** **Razer Blade 16** (RTX 5080/5090, OLED 240 Hz) $2,400–4,000+ — the MacBook Pro of gaming laptops, with Razer's warranty reputation as the caveat.
- **The unified-memory alternative:** **HP ZBook Ultra G1a** or **Asus ROG Flow Z13** (Ryzen AI Max+ 395, up to 128 GB) — if your GPU need is "run big models" rather than CUDA.
- **The Apple alternative:** **MacBook Pro 14/16 with M5 Max (32/40-core GPU, 36–128 GB)** — for ML via MPS/MLX, local LLMs, Metal-based graphics, and Blender; not for CUDA or Unreal.

## 12.6 The desktop + laptop strategy

For many students in ML or game dev tracks, the best answer is *two machines*: a light, efficient, long-battery laptop for class and daily life (MacBook Air, X1 Carbon, Framework) plus a desktop at home with a real GPU (RTX 5070 Ti 16 GB desktop card ~$750; whole build ~$1,400–1,800), reachable via SSH/VS Code Remote/Tailscale from anywhere. Total cost is similar to one high-end gaming laptop; you get far more GPU, a better daily laptop, upgradeability, and no 2.5 kg backpack. Consider it seriously before buying a gaming laptop as your only computer.
