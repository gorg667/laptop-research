# Chapter 11 — Build Quality, Repairability, Warranty, Longevity, and Linux Compatibility

You're buying a machine that will be dropped in a backpack a thousand times, opened and closed ten thousand times, and expected to work on the morning of a final. This chapter is about the boring things that determine whether it does.

## 11.1 Build quality: what to look for

- **Materials.** Machined aluminum (MacBook, Framework 13 Pro, ThinkPad X1 Carbon's carbon-fiber/magnesium hybrid, Surface, XPS, Zenbook S "Ceraluminum") resists flex and survives drops better than plastic. Good plastic/magnesium (ThinkPad T-series, Legion) is fine and lighter; cheap plastic (budget consumer lines) creaks, flexes, and cracks at hinges.
- **Hinge.** Should open one-handed, hold any angle without wobble, and survive 20,000+ cycles. Notorious failures: some older HP Envy/Pavilion, Dell Inspiron, and Asus Vivobook hinges that rip out of the plastic. Business lines and Apple are reliable.
- **Lid rigidity and screen protection.** Press the back of the lid — ripples on the screen mean a thin lid that may crack the panel in a backpack. Aluminum and carbon-fiber lids protect better.
- **MIL-STD-810H testing** (ThinkPad, Latitude, EliteBook, some Framework/Asus): drop, vibration, humidity, dust, temperature. Not a guarantee, but a signal of design intent.
- **Keyboard spill resistance**: ThinkPads drain spills through channels; most others don't.
- **Long-term reliability signal:** business lines (ThinkPad T/X/P, Dell Pro/Latitude/Precision, HP EliteBook/ZBook) are built for 3–5 year corporate lifecycles with on-site service; consumer lines are built for a 2–3 year retail cycle. Apple sits with the business lines in durability.

## 11.2 Repairability and upgradeability

iFixit scores (out of 10) and what they mean for you:

| Machine | Repairability | Notes |
|---|---|---|
| **Framework Laptop 13 / 13 Pro** | 10/10 | Everything is a module with a QR code. Mainboard, screen, battery ($89), keyboard, ports, Wi-Fi, SSD, RAM (SO-DIMM on Ryzen; LPCAMM2 on Pro) — all user-replaceable with one screwdriver. Upgrade the CPU by swapping the mainboard. Unique in the industry. |
| **ThinkPad T14/T16/P14s/P16s** | 7–9/10 | Bottom cover off in 6 screws; SSD, Wi-Fi, battery, often RAM (T16/P16s SO-DIMM; T14s soldered), keyboard replaceable. Service manuals and parts published. |
| **ThinkPad X1 Carbon** | 6–7/10 | Battery, SSD, Wi-Fi replaceable; RAM soldered. |
| **Dell Pro / Latitude / Precision** | 7–8/10 | Similar to ThinkPad T; Dell publishes service manuals. |
| **HP EliteBook / ZBook** | 6–8/10 | Good; HP's manuals are public. |
| **Gaming laptops (Legion, LOQ, ROG, TUF)** | 6–8/10 | SO-DIMM RAM, 1–2 M.2 slots, replaceable battery, big bottom cover. Easy. |
| **Dell XPS 14/16 (2024–26)** | 4–6/10 | SSD replaceable; RAM soldered; battery replaceable with effort. |
| **Surface Laptop 7/8** | 6–7/10 | Microsoft improved dramatically: SSD door, replaceable battery, published guides. |
| **Asus Zenbook S14/S16** | 4–5/10 | SSD replaceable; everything else soldered. |
| **MacBook Air / Pro** | 3–5/10 | RAM/SSD soldered. Battery replacement is a glued but documented procedure (Apple Self Service Repair program supplies parts and tools; independent shops do it for ~$150–250). Screen and keyboard are expensive replacements. Apple's saving grace: exceptional reliability and a 7-year OS support window. |
| **MacBook Neo** | 3/10 | Same as above; 8 GB forever. |

**What "upgradeable" gets you in practice:** SSD swap (cheap capacity increase), Wi-Fi card swap (Linux compatibility fix), RAM increase (if SO-DIMM/LPCAMM2), battery renewal at year 3 (massive quality-of-life extension). On a Framework, a new mainboard in year 4 is a new laptop for ~$450–900 while keeping the screen, keyboard, and chassis.

## 11.3 Warranty and support

- **Apple:** 1 year limited + 90 days phone; **AppleCare+** ($99–$399/yr or $199–$499 for 3 yr depending on model; ~10% off for students) adds accidental damage coverage ($99 screen / $299 other, per incident) and extends to 3 years. Apple Stores and authorized providers make in-person service easy. In the EU/UK, statutory 2-year (or 6-year in UK/Ireland) consumer rights apply regardless.
- **Lenovo:** 1 year depot standard; **Premier Support** (on-site next-business-day, direct-to-tech phone line) and **Accidental Damage Protection** are cheap add-ons at purchase (often $50–150 for 3 years total on ThinkPads via sales) and are excellent value. Lenovo's Legion/consumer lines have weaker support.
- **Dell:** similar model — ProSupport and Accidental Damage add-ons; on-site service is a Dell strength.
- **HP:** Care Packs; business lines get good support; consumer lines are variable.
- **Framework:** 1 year (2 in EU); but you can fix nearly anything yourself with parts from their store, which is a different kind of warranty.
- **Microsoft:** 1 year; Microsoft Complete adds accidental damage; store-based service where MS Stores exist (few now) or mail-in.
- **Asus / Acer / MSI:** 1 year, mail-in, historically the weakest service experience among major brands. Fine while it works; painful when it doesn't. Budget a spare-machine plan or a third-party accidental damage policy if you go this route.
- **Third-party / retailer protection** (Best Buy Geek Squad, Amazon/Asurion, SquareTrade, credit-card extended warranty): sometimes better value than OEM plans; check terms. Many premium credit cards add a year of warranty automatically.

**Student rule of thumb:** if you can't afford to replace the laptop tomorrow, buy accidental damage coverage — drops and spills are the most common laptop death for students. Lenovo/Dell ADP at purchase or AppleCare+ are both worth it; on an $800 machine, weigh a $150 plan against just having a backup plan.

## 11.4 Software longevity

- **macOS**: roughly 7 years of OS updates from the model's release (M1 Macs from 2020 are still fully supported in 2026); plus 2 more years of security updates. Best in the industry.
- **Windows 11**: supports hardware indefinitely as long as it meets requirements (TPM 2.0, 8th-gen Intel+/Zen 2+). Any 2026 laptop is safe through the 2030s. Windows 10's end-of-support (Oct 2025) taught everyone to check.
- **Windows on Arm**: Snapdragon X-series is supported; whether Windows 13 or 14 keeps every SKU is unknown — a small risk on a new platform.
- **Linux**: as long as the kernel supports the hardware, which is essentially forever for x86 and mature Arm platforms. A 2015 ThinkPad runs the latest Fedora fine.
- **ChromeOS**: 10 years of updates for devices from 2021 onward.
- **Firmware/BIOS updates**: Lenovo, Dell, HP, Framework, and Apple deliver them for years; on Linux, LVFS/fwupd covers Lenovo, Dell, HP, Framework, and others. Asus/Acer/MSI updates are Windows-only utilities and taper off within 2–3 years.

## 11.5 Resale value

Matters if you upgrade every 2–3 years. Rough 3-year residuals: **MacBooks 40–55%**, **ThinkPad X1 / Surface / XPS 25–35%**, **Framework 30–40%** (strong community demand; also you can sell the parts), **gaming laptops 25–35%**, **budget consumer 10–20%**. A $1,299 MacBook Air that sells for $600 in 2029 cost you ~$230/year; a $900 consumer Windows laptop that sells for $150 cost ~$250/year. Total cost of ownership often favors Apple more than sticker price suggests.

## 11.6 Linux compatibility — the practical checklist

If you'll run Linux (native or dual-boot), check the following *for the exact model and configuration* before buying:

1. **Official certification or vendor support.** Lenovo's Linux-certified list (Ubuntu/Fedora/RHEL for most ThinkPads and many ThinkStations), Dell's Ubuntu-certified list and Developer Edition line, HP's Ubuntu-certified EliteBook/ZBook models, Framework (Ubuntu/Fedora official; Arch/NixOS/Bazzite/CachyOS community), System76/Tuxedo/Slimbook/Star Labs (Linux-first). Certified = every component works, including sleep, fingerprint, brightness, function keys, audio.
2. **CPU/GPU generation vs. kernel.** Panther Lake needs kernel 6.19+ (Ubuntu 26.04 / Fedora 44); Ryzen AI 300/400 is fine on 6.10+; Lunar/Arrow Lake fine on 6.11+. Rolling distros (Arch, Fedora) get there first; Ubuntu LTS gets HWE kernels every 6 months.
3. **Wi-Fi/BT chipset.** Intel best; Qualcomm good; MediaTek MT79xx acceptable on modern kernels; Realtek risky. Replaceable on most PC laptops (M.2 2230 card; ~$20 for an Intel AX210/BE200) — an easy fix if you get a bad one. Not replaceable on Snapdragon/Apple.
4. **Webcam.** Intel IPU6/IPU7 MIPI cameras (some 2023–26 Dell/Lenovo Intel models) needed out-of-tree drivers until recently; USB-attached webcams (most machines, all Framework) just work. Check "camera" in the model's Arch Wiki or linux-hardware.org entry.
5. **Fingerprint reader.** Goodix/Synaptics/ELAN — `fprintd` supports many; check the specific device ID. Framework's works out of the box.
6. **Suspend.** S3 (deep) vs. s2idle — ThinkPads and Frameworks generally offer working S3 or a well-behaved s2idle; some consumer machines drain in s2idle.
7. **Audio.** Cirrus Logic amplifiers on some 2023–25 Lenovo/Dell/HP machines needed firmware fixes; resolved in modern kernels for most. Speaker DSP tuning often missing (sounds worse than Windows) — EasyEffects profiles exist for popular models.
8. **Hybrid graphics (Nvidia dGPU).** Works in 2026 with the open kernel modules and Wayland, but adds complexity (PRIME offload, power management, external display routing). Prefer iGPU-only or AMD dGPU for a quiet life.
9. **Secure Boot.** Fedora/Ubuntu/openSUSE boot with Secure Boot enabled (signed shim); Arch and Nvidia modules need MOK enrollment or disabling Secure Boot. Dual-boot with BitLocker-encrypted Windows: suspend BitLocker before changing boot settings.
10. **Snapdragon: don't.** (Chapter 3 §3.7.)

**Linux-friendliest 2026 laptops, in order:** Framework 13 Pro / 13 (Intel or AMD) → ThinkPad T14s Gen 7 AMD / T14 Gen 6 / P14s Gen 7 → ThinkPad X1 Carbon Gen 14 → Dell XPS 14 (2026, Intel; Dell has shipped Ubuntu on XPS for years) / Dell Pro 14 Premium → HP EliteBook Ultra / ZBook → System76 Lemur/Darter, Tuxedo InfinityBook, Slimbook → Asus Zenbook S14/S16 (works, community-supported, occasional quirks) → gaming laptops (work, more effort with hybrid graphics).

## 11.7 A four-year plan

To actually get four good years out of a laptop:
- Year 0: buy 32 GB (or 24 on Mac) if at all possible; buy accidental-damage coverage if you can't self-insure; set a charge limit when docked.
- Year 1: nothing. Enjoy.
- Year 2: clean fans (if accessible); check battery health (macOS: System Information → Power; Windows: `powercfg /batteryreport`; Linux: `upower -i`). Re-evaluate storage; add external SSD if needed.
- Year 3: consider battery replacement if under 80% (Framework/ThinkPad: DIY; Apple: service). Reinstall the OS if things feel cruddy.
- Year 4: on a Framework, consider a mainboard swap. Otherwise plan the successor; sell while the machine still has value.
