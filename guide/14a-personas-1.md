# Chapter 14 — The Picks, by Persona

Budget tiers tell you what you *can* buy. Personas tell you what you *should* buy. Find yourself below; each persona gets a primary pick, an alternative, a configuration, and the reasoning.

## 14.1 The Frugal Freshman
*"I got into CS. I have $600–900 total. I don't know what I'll specialize in."*

- **Primary:** **Refurbished MacBook Air M4, 16 GB / 256 GB** (~$850) + a $40 USB-C hub. If macOS is a non-starter: **used ThinkPad T14 Gen 3/4 AMD with 32 GB** (~$450–600) running Windows 11 or Fedora.
- **Why:** Both will comfortably handle every first- and second-year course (Python, Java, C, data structures, discrete math, web). The Air's battery and silence matter in lecture halls; the ThinkPad's ports and RAM matter in labs. Both hold up for four years.
- **Don't:** buy a MacBook Neo (8 GB) or a $600 new Windows laptop with 8 GB, however shiny. Don't buy a gaming laptop "in case."
- **Stretch ($1,000–1,100):** refurb M4 Air 16/512 or 24/512; or a ThinkPad T14 Gen 6 AMD 32 GB on sale.

## 14.2 The Sophomore Who Knows They'll Do Everything
*"I'll take OS, networks, mobile, databases, ML electives, and hackathons. I want one machine that never says no."*

- **Primary:** **MacBook Air 15" M5, 24 GB / 512 GB** ($1,699; edu ~$1,599 + $100 gift card). 
- **Alternative:** **ThinkPad X1 Carbon Gen 13/14, 32 GB** (~$1,400 on sale) for Windows/Linux; **Framework 13 Pro** if repairability appeals.
- **Config note:** 24 GB is the point. Android Studio + emulator + backend + browser fits. Two external displays. If iOS is likely: Mac, no question.
- **Why not the MacBook Pro:** $700 more buys display and speakers, not capability you'll use before graduation.

## 14.3 The ML / AI-Track Student
*"PyTorch, Jupyter, fine-tuning, maybe a research lab. Do I need a GPU?"*

- **Reality check:** coursework models train fine on a CPU or any modern iGPU; real training happens on the lab cluster, Colab, or a cloud GPU. What you need locally is **RAM** (datasets, notebooks, many environments) and enough GPU/unified memory to *iterate* on inference and small fine-tunes.
- **Primary (no local CUDA needed):** **MacBook Air 15" M5, 32 GB / 1 TB** ($2,099) or **MacBook Pro 14" M5 Pro, 48 GB** (~$3,000 — if funded). PyTorch MPS and MLX are mature; 32–48 GB unified runs 7–30B-parameter models locally; silent and long-lasting for reading papers.
- **Primary (CUDA required — e.g., the course says so):** **Asus ROG Zephyrus G16 with RTX 5070 Ti (12 GB) or 5080 (16 GB), 32 GB** ($2,200–3,000), or **Lenovo Legion Pro 7i** with the same GPUs. **Do not** buy an 8 GB-VRAM GPU (5050/5060/5070) for ML — it's the VRAM, not the compute, that walls you.
- **The smart alternative:** a light laptop (Air or X1 Carbon) **plus** a desktop with an RTX 5070 Ti 16 GB (~$1,500 build), reachable via SSH/Tailscale. More GPU, better laptop, same money.
- **x86 unified-memory option:** HP ZBook Ultra G1a (Strix Halo, 128 GB) for people who want big local models without a Mac and without CUDA.

## 14.4 The Game Developer
*"Unity/Unreal/Godot, graphics programming, maybe a studio internship."*

- **Godot / Unity 2D–URP / graphics fundamentals (OpenGL/Vulkan/WebGPU):** any Tier 3 machine — **MacBook Air M5 24 GB** (Unity and Godot run natively on Apple Silicon; Metal for graphics courses) or **X1 Carbon / Framework 13 Pro** with the Arc B390.
- **Unreal Engine 5 / Unity HDRP / anything DirectX-first:** **Asus ROG Zephyrus G14 (2026) RTX 5070, 32 GB** ($1,800–2,100) as the portable pick; **Legion Pro 5i/7i RTX 5070 Ti, 32 GB** ($1,700–2,200) as the desk-first pick; **Razer Blade 16 / Zephyrus G16 RTX 5080** if funded.
- **Config:** 32 GB minimum (Unreal + VS + a game build); 1 TB minimum (engines and projects are enormous); a MUX switch; Windows 11 Pro.
- **Why not a Mac for Unreal:** it runs, but Windows + Nvidia is the industry's primary target, and studio internships will hand you a Windows box.

## 14.5 The Linux Purist
*"I've run Arch for three years. I want hardware that just works and that I can fix."*

- **Primary:** **Framework Laptop 13 Pro (Core Ultra X7 358H, 16–32 GB LPCAMM2)** — official Ubuntu/Fedora, community Arch/NixOS/Bazzite/CachyOS, LVFS firmware, 18 h battery, 700-nit matte 3:2 panel, 10/10 repairability. Or the **Framework 13 (Ryzen AI 300) DIY** for cheaper 32 GB via SO-DIMMs.
- **Alternative:** **ThinkPad T14s Gen 7 AMD (Ryzen AI 7 PRO 450, 32–64 GB)** or **X1 Carbon Gen 14** — Lenovo Linux-certified; the T14 Gen 6 AMD if you want SO-DIMM RAM and Ethernet. **System76 Lemur Pro / Darter Pro** and **Tuxedo InfinityBook** for vendor-supported Linux with Coreboot options.
- **Avoid:** Snapdragon anything; Nvidia hybrid graphics unless you enjoy it; MediaTek Wi-Fi on older kernels; anything without a linux-hardware.org entry.
- **Kernel note:** Panther Lake needs 6.19+ (7.0+ recommended) → Fedora 44 / Ubuntu 26.04 / Arch. Ryzen AI 300/400 is fine on anything from mid-2025 onward.

## 14.6 The Mobile Developer
*"iOS and/or Android, Flutter/React Native, maybe both platforms."*

- **iOS at all → Mac.** **MacBook Air 15" M5 24 GB / 1 TB** ($1,899) for students; **MacBook Pro 14" M5 Pro 48 GB** for professionals building both platforms with multiple simulators.
- **Android only, Windows/Linux:** **ThinkPad T14s Gen 7 AMD 64 GB** or **X1 Carbon 32 GB** (x86; the emulator uses hardware virtualization — fine). Snapdragon X2 laptops run the Arm Android emulator natively and fast, but check that your team's toolchain (Gradle plugins, native SDKs) is Arm-clean.
- **Config:** 24–32 GB minimum (emulator/simulator + IDE + backend); 1 TB (Xcode + Android SDK + system images ≈ 60–80 GB alone).
