## 15.8 The spec-sheet decoder: a one-page checklist for any listing

Everything in this guide compresses to the checklist below. Print it, or open it on your phone in the store. Work top to bottom; a **Red** line is a dealbreaker for CS/SWE use, an **Amber** line is a real cost you should price in, **Green** is what you want.

### Step 1 — Memory (decides everything)

| Listing says | Read it as | Verdict |
|---|---|---|
| 8 GB | Cannot run IDE + Docker + browser together; never upgradable on Macs/thin PCs | **Red** — unless it's a Framework 12 you will upgrade, or a thin client to a server |
| 16 GB | The floor; fine for coursework, tight with Android Studio or Compose stacks | **Amber** — OK for students on a budget |
| 24 GB (Mac) / 32 GB (PC) | Comfortable for everything through a degree and most professional work | **Green** — the target |
| 48–128 GB | Specialist (Unreal, local LLMs, VM labs) | Only if you know why |
| "up to 32 GB" | The *listing* may be the 8 GB one. Find the exact SKU. | Check |
| "DDR5 SO-DIMM" / "LPCAMM2" | Upgradeable — but 2026 modules cost 3–4× 2024 prices | Longevity feature, not a discount |
| "LPDDR5X" with no slot mention | Soldered. What you buy is final. | Configure at purchase |

### Step 2 — Processor (find the family, ignore the marketing)

| Listing says | Family | Verdict for dev work |
|---|---|---|
| Apple M5 / M5 Pro / M5 Max | Current Apple | Green (Pro/Max only for specific loads) |
| Apple M4 / M3 | 1–2 gen old Apple | Green if 16 GB+ and priced as refurb |
| Apple M1 / M2 | Older Apple | Amber — only with 16 GB and under ~$550 |
| Apple A18 Pro (MacBook Neo) | Phone-class, 8 GB cap | Red for CS |
| Intel Core i5/i7/i9 (any Intel Mac) | Intel Mac | **Red** — dropped by macOS 27 |
| **Intel Core Ultra** X7/X9 3xxH | Panther Lake with big Arc GPU | Green |
| Intel Core Ultra 5/7 3xxH/U (no X) | Panther Lake, small GPU | Green for dev, weak for games |
| **Intel Core 3/5/7 3xx (no "Ultra")** | **Wildcat Lake — budget** | Amber: fine under $800, don't pay $1,000 |
| Intel Core Ultra 2xxV | Lunar Lake (2024–25) | Green on clearance; superb battery, 8 cores |
| Intel Core Ultra 2xxH | Arrow Lake H | Green in discounted workstations/gaming; weak iGPU |
| Intel Core i5/i7 12xx–14xx (PC) | 2022–24 generations | Amber used; Red new at full price |
| Intel N-series, Celeron, Pentium | Netbook class | Red |
| AMD Ryzen AI 9 HX 370/470, AI 7 350/450, AI 5 340/440 | Strix / Gorgon Point | Green; best Linux support |
| AMD Ryzen AI Max / Max+ 385/390/395 | Strix Halo (unified memory) | Specialist (local LLMs) |
| AMD Ryzen 7 250 / Ryzen 9 270 (no "AI") | Hawk Point (Zen 4) rebrand | Amber — fine in budget gaming laptops, not Zen 5 |
| AMD Ryzen 5/7 7xxx/8xxx U/HS | 2023–24 Zen 4 | Green used; check RAM |
| Snapdragon X2 Elite / Plus | Arm, Windows only | Green for web/backend/mobile; **Red for Linux, EE/CE, x86 VMs** |
| Snapdragon X Elite / Plus (2024) | Previous-gen Arm | Amber — good battery, M1-class speed |
| Nvidia RTX Spark / N1X | Arm + CUDA, first-gen | Wait for reviews (2027) |

### Step 3 — Storage

- **256 GB** → Amber on a PC with an M.2 slot (upgrade yourself), **Red** on a Mac unless the price is a steal and you'll live off an external SSD.
- **512 GB** → the floor. **1 TB** → comfortable for mobile/ML/games.
- **"eMMC"** or **"UFS"** → Red. Must be NVMe.
- **M.2 2230** (short) → upgradeable but high-capacity drives cost more; **2280** → standard.

### Step 4 — Display

- **Resolution:** 1920×1200 minimum at 14"; 2.5K–3K ideal; 4K on ≤ 16" is battery waste.
- **Aspect ratio:** 16:10 or 3:2. **16:9 → Amber** (you lose vertical lines of code).
- **Brightness:** ≥ 400 nits; 500+ for cafés; 300 → Amber; "250 nits" or unstated → Red.
- **Panel:** IPS or mini-LED = safe. **OLED** = beautiful; check PWM if you're flicker-sensitive; burn-in risk with static IDE layouts is low but non-zero.
- **"45% NTSC" / "62% sRGB"** → Red (washed-out budget panel). Want ≥ 100% sRGB.
- **Refresh:** 60 Hz is fine for code; 90–120 Hz is nicer; don't pay for 240 Hz.
- **Touch** → optional; adds glare and weight on a clamshell.

### Step 5 — Ports & wireless

- At least **one 40 Gb/s USB-C** (Thunderbolt 4/5 or USB4) for a dock. **"USB-C 3.2 Gen 1 (5 Gb/s) only" → Amber**; "USB 2.0 Type-C" → Red.
- **Headphone jack** — the 2026 XPS 13 dropped it; decide if you care.
- **USB-A + HDMI** on the machine: valuable for EE/CE and presentations, otherwise a $30 hub solves it.
- **Wi-Fi 6E minimum; Wi-Fi 7** on anything new in 2026. Check the Wi-Fi card vendor for Linux (Intel/Qualcomm fine; MediaTek needs recent kernels).
- **Ethernet** — only the ThinkPad T/P series and gaming laptops still have it.

### Step 6 — Battery & weight

- **Wh, not "hours":** 50–58 Wh in a 13–14" is normal; 70+ is excellent; **< 45 Wh → Amber**.
- **Real mixed use ≈ 55–65% of the vendor's video claim** on x86; Apple and Snapdragon get closer to 75%.
- **Weight:** ≤ 1.3 kg = effortless; 1.4–1.7 kg = fine daily; > 2 kg = desk machine.
- **Charging:** USB-C PD ≥ 65 W. Barrel-only charging on a thin laptop → Amber.

### Step 7 — Build, warranty, repair

- Metal or magnesium chassis; MIL-STD 810 is a plus, not a guarantee.
- **Keyboard:** try it. Look for a full-height arrow cluster, a real Esc, Fn/Ctrl in the position you expect, no number pad squeezing the layout on a 15–16".
- **Webcam:** 1080p minimum in 2026; a privacy shutter is nice.
- **Warranty:** 1 year is standard; accidental-damage coverage at purchase if you can't afford to replace it (Chapter 11).
- **Repair:** iFixit score or a service manual; user-replaceable SSD and battery are the two that matter.
- **Used machines:** battery cycle count (< 500 good), no BIOS/Activation/MDM lock, all ports tested, screen checked for burn-in/dead pixels, every key pressed.

### Step 8 — Price sanity

- **Windows list price is fiction.** Check the OEM sale page, student store, outlet, Best Buy open-box, and a price tracker before believing "$2,139."
- **Apple:** education pricing (−$100 Air / −$200 Pro) plus any current promo; Certified Refurbished ≈ 15% off with a full warranty.
- In the 2026 shortage, a **fair price on the right configuration today beats a hypothetical sale in December** (§15.1).

### The 30-second version

> **16 GB minimum (24–32 preferred) · not Wildcat Lake / N-series / A18 Pro at $900+ · 512 GB NVMe · 16:10, ≥ 1200p, ≥ 400 nits · one TB4/USB4 port · ≥ 50 Wh · a keyboard you've touched · never list price on Windows · never an Intel Mac.**
