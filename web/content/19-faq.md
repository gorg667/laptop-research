# Chapter 19 — Frequently Asked Questions

**Q: Just tell me what to buy.**
MacBook Air 13" or 15" M5 with 24 GB ($1,499 / $1,699; less with education pricing). If that's too much: Apple Certified Refurbished M4 Air with 16 GB (~$850–950). If you need Windows: ThinkPad X1 Carbon Gen 13/14 or T14s Gen 6/7 with 32 GB, on sale. If you run Linux: Framework 13 Pro or ThinkPad T14s AMD. If you need a GPU: Asus ROG Zephyrus G14 (2026) with 32 GB.

**Q: Is 16 GB really enough?**
For most students, yes, for most of the degree. It gets tight with Android Studio + emulator, Docker Compose stacks + IDE + browser, or ML coursework. If the 24/32 GB step is within reach, take it — you can't add it later.

**Q: Is the MacBook Neo good for CS?**
It's an excellent $599–699 laptop with an 8 GB hard cap. It handles Python/JS/Java in VS Code and a browser. It struggles with Docker + a heavy IDE, Android Studio, or ML notebooks. If your heavy work happens on a university server or cloud dev box, it's fine. Otherwise stretch to a refurb M4 Air 16 GB.

**Q: MacBook Air or MacBook Pro?**
Air, unless you specifically want the mini-LED 120 Hz display, six speakers, HDMI/SD ports, or sustained multi-core for long builds (M5 Pro). The base M5 Pro-chassis machine is $700 more than an Air with the same chip. And the base 14" MBP is rumored to get an M6 this fall — wait or buy refurb.

**Q: 13" or 15" Air?**
15" if it's your primary screen and you don't walk much; 13" if you carry it all day and dock at a desk. Same chip, same ports; the 15" has six speakers and a bigger battery, and weighs 270 g more.

**Q: Should I wait for the M6 / Nvidia N1X / OLED MacBook?**
Wait for M6 only if you specifically want the base 14" MacBook Pro (expected fall 2026). Don't wait for N1X (limited 2026 availability, first-gen platform) or the OLED MacBook (late 2026–2027 and premium-priced) unless you have no deadline.

**Q: Can I run Windows on a Mac for that one course?**
Windows 11 Arm runs in Parallels/VMware Fusion/UTM well for Office, Visual Studio (Arm build), and light tools. It cannot run x86-only engineering software (Vivado, Altium, SolidWorks) acceptably. Bootcamp is gone. If a Windows-only tool is central to your program, buy a Windows laptop.

**Q: Can I run Linux on a Mac?**
Asahi Linux runs natively on M1/M2 with good hardware support; M3/M4/M5 support is incomplete in 2026. For daily use, run Linux in a VM (UTM, Parallels) or in containers (OrbStack/Docker). Buy a Framework or ThinkPad if Linux is your main OS.

**Q: Is Windows on Arm (Snapdragon) OK for CS?**
Yes for web, backend, Python, data, mobile (Android), and most modern tooling — it's native and fast, with the best Windows battery life. No for EE/CE toolchains, x86 VMs, most games with anti-cheat, some VPN/drivers, and Linux. See Chapter 3 §3.7.

**Q: Intel or AMD?**
In 2026, Intel Core Ultra Series 3 (Panther Lake) is the stronger platform — better iGPU, better efficiency, unified lineup. AMD Ryzen AI 300/400 is competitive, often cheaper, more likely to have upgradeable RAM, and has the smoothest Linux support. Either is fine; buy the better *laptop*.

**Q: Do I need Thunderbolt?**
You need at least one 40 Gb/s USB-C port (TB4 or USB4) for a dock and fast storage. Two is better. Everything recommended in this guide has it, except the MacBook Neo.

**Q: How much storage?**
512 GB minimum; 1 TB if you do mobile, ML, or games. On PCs with an M.2 slot, buy base and upgrade yourself. On Macs, buy 512 GB or 1 TB and use an external SSD.

**Q: OLED or IPS?**
OLED if you love contrast, use dark mode, work indoors, and aren't PWM-sensitive. IPS (or mini-LED on the MacBook Pro) if you want matte, brightness, zero burn-in worry, and no flicker. For code, a good IPS is arguably ideal; a good OLED is more beautiful.

**Q: Touchscreen?**
Nice on a 2-in-1 for notes; unnecessary on a clamshell. Adds glare, weight, and cost. Most developers never use it.

**Q: What about a 2-in-1 / convertible?**
Fine if you take handwritten notes (Surface Pro 12, Yoga 9i, Spectre x360, ThinkPad X1 2-in-1). Otherwise a clamshell is lighter, cheaper, and has a better keyboard. Don't buy a tablet (iPad Pro) as your only CS machine — no real terminal, no Docker, no IDEs.

**Q: Chromebook for CS?**
A Chromebook Plus with 8–12 GB runs VS Code, Python, Node, Java, and Git in its Linux container. Workable for intro courses, limiting by second year. A used ThinkPad with Linux at the same price is far better.

**Q: How long will a 2026 laptop last?**
Physically: 4–6 years for business-class and Apple; 2–4 for budget consumer. Software: macOS ~7 years; Windows indefinitely; Linux forever. Battery: 3–4 years to 80%. Buy 24–32 GB and it'll be *useful* for the whole span.

**Q: Should I buy AppleCare+ / extended warranty?**
If you can't afford to replace the laptop tomorrow: yes, get accidental-damage coverage (AppleCare+, Lenovo ADP, Dell ADP). If you can: consider self-insuring. Skip big-box extended warranties on Apple products.

**Q: Is refurbished safe?**
Apple Certified Refurbished and OEM outlets (Lenovo/Dell): yes, effectively new with full warranty. Back Market / Amazon Renewed: yes with grading and 1-year warranty. Random eBay: inspect carefully, use buyer protection.

**Q: Do I need a gaming laptop for game development?**
For Godot and Unity 2D/URP, no. For Unreal 5 and Unity HDRP, yes (RTX 5060+ with 32 GB) — or a light laptop plus a desktop with a real GPU.

**Q: Do I need a GPU for machine learning?**
For coursework: no — CPU, iGPU, Colab, or the lab cluster. For serious local training: an RTX 5070 Ti (12 GB) or better, or a 32–128 GB unified-memory Mac/Strix Halo for inference-heavy work. 8 GB VRAM GPUs are not worth buying for ML.

**Q: My department says "Windows, Intel i5, 8 GB, 256 GB." Should I follow it?**
Treat it as a compatibility floor, not advice. Buy 16–32 GB and 512 GB+. Confirm any *specific software* requirement (that's the part that matters).

**Q: Best laptop for a bootcamp / self-taught developer on a budget?**
Same as the frugal freshman: refurb M4 Air 16 GB, or a used ThinkPad T14 AMD with 32 GB. Web development is not demanding; RAM and a good keyboard are what you need.

**Q: I'm switching from Windows to Mac (or vice versa). Hard?**
A week of muscle-memory relearning (Cmd vs. Ctrl, window management, Finder vs. Explorer). Development tooling is nearly identical — VS Code, Git, Docker, and every language work the same. Install Rectangle/Raycast on Mac or PowerToys on Windows and you're home.

**Q: How do I check if a laptop runs Linux well?**
linux-hardware.org (probe database), the Arch Wiki laptop page for the model, Lenovo's/Dell's/HP's Linux certification lists, Framework's official support page, and r/linuxhardware. If nobody has written about it, assume you're the pioneer.

**Q: Why is everything more expensive than last year?**
The 2025–2026 global DRAM/NAND shortage driven by AI data-center demand. Apple raised prices $200–300 in June 2026; PC OEMs 15–20%. Refurbished and previous-generation stock is where the value is.

**Q: Where are the affiliate links?**
There aren't any. This guide has no sponsor. Buy wherever is cheapest with a good return policy.
