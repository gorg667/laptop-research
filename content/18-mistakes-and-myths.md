# Chapter 18 — Common Mistakes and Persistent Myths

Every semester the same errors repeat. Here they are, with the corrections.

## 18.1 The mistakes

**1. Buying 8 GB of RAM because "I'm just a student."**
The most common and most expensive mistake, because it can't be fixed. You'll hit it the first time you open IntelliJ and Docker together. Sixteen is the floor. (Chapters 2, 5.)

**2. Paying list price for a Windows laptop.**
Lenovo, Dell, and HP list prices are anchors. The X1 Carbon "starts at $2,139" and routinely sells for $1,400. Check the OEM's sale page, the student store, the outlet, Best Buy open-box, and a price tracker before paying. (Chapter 15.)

**3. Buying a gaming laptop as an only machine because "it's the most powerful."**
It is — for two hours on battery, at 2.5 kg, with fans audible in the library. Unless you need the GPU (Chapter 12), you're paying daily costs for a weekend benefit. A light laptop plus a desktop or cloud GPU is usually better and no more expensive.

**4. Choosing the OS *after* choosing the laptop.**
Check program requirements (Xcode? Visual Studio? Vivado? LockDown Browser?) first. A Mac can't dual-boot Windows; a Snapdragon can't run Linux well; a Linux laptop can't run most proctoring software. (Chapter 3.)

**5. Trusting core counts, GHz, or TOPS.**
A "12-core" AMD, a "16-core" Intel, and a "10-core" Apple are not comparable. NPU TOPS are irrelevant for developers. Compare *measured* results for the *specific laptop*. (Chapter 4.)

**6. Ignoring the display SKU.**
The same ThinkPad ships with a 300-nit 45%-NTSC panel or a 500-nit 100%-sRGB panel for $80 difference. Reviews test one; you might get the other. Read the spec sheet for nits and gamut. (Chapter 6.)

**7. Buying a "4K" 14-inch laptop.**
No visible text benefit over 2.8K; 15–30% battery penalty. (Chapter 6.)

**8. Buying storage from Apple instead of an external SSD — or not buying enough.**
512 GB internal + a $120 2 TB external beats $600 for 2 TB internal. But 256 GB is too small for anyone; don't go below 512 on a soldered machine. (Chapter 5.)

**9. Keeping projects on `/mnt/c/` in WSL2.**
Cross-filesystem I/O is 5–20× slower. Put code in the Linux home directory. This single mistake makes people think Windows is slow for development. (Chapter 16.)

**10. Skipping accidental-damage coverage on a machine you can't replace.**
Drops and spills are the #1 student laptop death. AppleCare+ or Lenovo/Dell ADP at purchase is cheap insurance. (Chapter 11.)

**11. Buying a Snapdragon laptop for Linux.**
It will not be a good experience in 2026. (Chapters 3, 4.)

**12. Buying the base M5 MacBook Pro 14" in September–October 2026 at full price.**
The M6 chip was announced in August (Mac mini) and the 14" MacBook Pro is reported to get it in late 2026. Buy refurb or wait. (Chapter 13.)

**13. Never trying the keyboard.**
Ten minutes in a store prevents four years of resentment. (Chapter 7.)

**14. Buying an OLED without checking PWM sensitivity.**
Many people are fine; some get headaches. Check Notebookcheck's PWM measurement, or test one. (Chapter 6.)

**15. Assuming "upgradeable RAM" saves money in 2026.**
SO-DIMMs and LPCAMM2 modules cost 3–4× their 2024 price. Upgradeability is for longevity, not for cheaping out at purchase. (Chapter 5.)

**16. Forgetting the monitor.**
$2,000 on a laptop and $0 on a display is upside-down. (Chapter 17.)

**17. Not setting up backups and disk encryption on day one.**
Both take ten minutes. Both save you once, catastrophically. (Chapter 16.)

**18. Charging to 100% and leaving it plugged in for two years.**
Set a charge limit when docked. Your battery will thank you in year three. (Chapter 8.)

**19. Buying from a brand with poor support in your region without a backup plan.**
Asus/Acer/MSI make good hardware and have mail-in-only, slow service. Fine if you have a spare or can wait three weeks; not fine before finals.

**20. Waiting for the perfect next thing.**
There's always an M6 MacBook, an RTX Spark laptop, an OLED redesign around the corner. If you need a laptop for this semester, the 2026 machines are excellent. Buy and use it. (The one exception where waiting is rational — the base M5 MacBook Pro — is called out explicitly in Chapter 13.)

## 18.2 The myths

**"Macs are for designers; real programmers use Linux/Windows."**
macOS is Unix. A large share of professional software engineers — and most at startups and big-tech web/mobile shops — use Macs. Linux is what production runs on and is superb for systems work. Windows + WSL2 is a real Linux kernel. All three are legitimate; pick by requirements and preference. (Chapter 3.)

**"You need an i7/i9 / Ryzen 9 / M-Pro for programming."**
You need RAM and a good keyboard. Any 2025–2026 mid-tier chip compiles fast enough. The delta from a mid-tier to top-tier CPU is 5–15%; the delta from 16 to 32 GB when you're swapping is 200%+. (Chapters 2, 4.)

**"8 GB on a Mac is like 16 GB on Windows."**
It was a defensible claim in 2020. In 2026, Apple itself made 16 GB the floor on every Mac except the Neo — and the Neo's 8 GB is a packaging limit. Memory compression and fast swap help; they don't make Docker + IntelliJ + Chrome fit. (Chapter 2.)

**"You need a discrete GPU for computer science."**
Not for 85–90% of students and engineers. Integrated GPUs in 2026 drive three 4K monitors, accelerate IDEs, run Godot/Unity, and handle graphics coursework. GPUs are for game dev, CUDA, and gaming. (Chapter 12.)

**"More cores is always better."**
Compile jobs scale to ~10–12 cores and then hit serial bottlenecks. Single-core speed matters more for IDE responsiveness. And cross-vendor core counts aren't comparable. (Chapter 2.)

**"OLED will burn in within a year."**
Modern laptop OLEDs with pixel shift, dark mode, and auto-hiding taskbars show little to no burn-in after 2–3 years of normal use. The risk is real for static, bright, all-day use — and PWM is the more common actual complaint. (Chapter 6.)

**"Windows on Arm can't run anything."**
In 2026, VS Code, Visual Studio, JetBrains, Docker Desktop, WSL2, Office, Adobe CC, Node, Python, Go, Rust, .NET, Java, Chrome, and most desktop apps are native; the rest emulate well. The gaps are drivers, anti-cheat, x86-only SDKs, and x86 VMs. (Chapter 3.)

**"Linux doesn't work on laptops."**
On the *right* laptops (Framework, ThinkPad, Dell Developer Edition, System76) it works better than Windows. On the *wrong* laptop it's a weekend of forum posts. The difference is which laptop. (Chapter 11.)

**"Apple's battery life claims are marketing."**
Apple's *video* numbers are marketing like everyone's; but MacBooks are the one product line where independent reviewers consistently measure 12–18+ hours in real tests. The claims are inflated the same way the results are excellent. (Chapter 8.)

**"Thunderbolt is a Mac thing."**
Thunderbolt 4/USB4 is on every premium Intel/AMD Windows laptop and Framework; Snapdragon has USB4. Docks are cross-platform. (Chapter 9.)

**"You should buy the best you can afford to future-proof."**
Future-proof RAM (can't change), storage on soldered machines (can't change), and build quality (determines survival). Do *not* future-proof CPU or GPU tier — they're rarely the bottleneck, and the money is better spent on RAM, a monitor, or kept. (Chapter 1.)

**"Refurbished means used and unreliable."**
Apple Certified Refurbished units get a new battery, new outer shell, full testing, and the same 1-year warranty as new; Lenovo/Dell Outlet units carry full warranty. Failure rates are indistinguishable from new. In 2026 they're the best value in the market. (Chapter 15.)

**"The NPU / 'AI PC' matters for developers."**
It's used for webcam effects and Copilot features. ML training and inference use the GPU. Don't pay for TOPS. (Chapter 4.)

**"Wait for [next chip] — it'll be way better."**
Year-over-year laptop chip improvements are 10–20%. The 2026 lineup — M5, Panther Lake, Snapdragon X2 — is excellent. The exception is timing around known imminent refreshes of the *exact model* you want (e.g., base MBP 14 → M6). Otherwise, buy when you need it.
