# Chapter 10 — Thermals, Noise, and Sustained Performance

A laptop's chip is only half the performance story. The other half is how much heat the chassis can remove, and how loudly. This chapter explains why a "faster" laptop can be slower in practice, what to look for in reviews, and how fan noise affects a developer's life more than benchmarks suggest.

## 10.1 Power limits: the hidden spec

Every laptop chip has configurable power limits set by the manufacturer:

- **Intel:** PL1 (sustained) and PL2 (short boost). A Core Ultra X7 358H might run at PL1 = 25 W / PL2 = 55 W in a thin Zenbook, or 45 W / 65 W in a thick workstation. Ars Technica measured the *same chip* delivering roughly **2× the multi-core performance** in a laptop's "performance" mode (55 W sustained) vs. its "whisper" mode (~30 W).
- **AMD:** STAPM / PPT limits, similar concept. A Ryzen AI 9 HX 370 ranges from 28 W to 54 W+ depending on the laptop.
- **Qualcomm:** TDP tiers by OEM; X2 Elite Extreme can pull 80 W+ in performance mode (hence 130 W chargers).
- **Apple:** fixed by Apple per model. The M5 in the fanless Air runs at ~20 W sustained; the same M5 in the fan-cooled MacBook Pro sustains higher, giving the Pro a ~5–15% edge in long multi-core loads. M5 Pro/Max add "High Power Mode" for sustained heavy work at the cost of fan noise.

**Why it matters for developers:** compile times, test-suite runs, Docker builds, and ML training are *sustained* loads. A 10-minute build reveals the PL1, not the PL2. Reviews that only run a 10-second Geekbench hide this. Look for **Cinebench multi-core loop** results, **Notebookcheck's "sustained load" charts**, or a **Handbrake/Blender** timing.

## 10.2 The throttling curve

A typical thin laptop under sustained load:
1. First 10–30 seconds: full boost (PL2), fans ramping.
2. 30 s–2 min: temperature hits the limit (usually 95–100 °C on Intel/AMD, ~100 °C on Apple), power drops toward PL1, clocks fall.
3. Steady state: PL1 power, whatever clocks that allows, fans at whatever speed the OEM's curve dictates (loud and cool, or quiet and hot — OEMs choose differently).

Apple Silicon and Snapdragon have gentle curves because they start efficient. Fanless machines (MacBook Air, MacBook Neo, some Snapdragon and Lunar Lake designs) have no step 3 fan noise but can throttle harder — the M5 Air loses perhaps 10–20% in a 20-minute all-core compile vs. the fan-cooled Pro; it remains faster than most fan-cooled Windows ultraportables in that scenario, which is the remarkable part.

## 10.3 Fan noise — the daily-life spec

Benchmarks don't capture how annoying a laptop is to sit next to. Noise, in dB(A) at ~15 cm as Notebookcheck measures:

| dB(A) | Perception | Where you'll hear it |
|---|---|---|
| < 25 | Inaudible / fanless | MacBook Air (no fan); MacBook Pro idle; Snapdragon ultraportables idle |
| 25–30 | Barely audible in a quiet room | Premium Windows ultraportables at light load; MacBook Pro in light load |
| 30–35 | Noticeable in a quiet room, fine in an office | Most ultraportables under moderate load (Zoom + IDE) |
| 35–40 | Clearly audible; distracting in a library | Thin laptops in sustained load; gaming laptops in quiet mode |
| 40–45 | Loud | Gaming laptops in balanced mode; thin-and-light under full load |
| 45–55+ | Hair-dryer | Gaming laptops in performance/turbo mode |

**Things that trigger fans on Windows/AMD/Intel laptops but not on Apple/Snapdragon:** video calls (encoding + background blur), a browser tab with WebGL or autoplay video, IDE indexing after a git pull, Windows Search/Defender scans, Electron apps redrawing. Developers spend a lot of time in exactly these states, which is why "fan noise at *medium* load" is the number to look for, not idle or max.

**Coil whine** — a high-pitched electrical whine from voltage regulators under certain loads — affects some units of some models (historically XPS, some Zenbooks, some MacBook Pros). It's unit-to-unit variable; if yours whines, exchange it within the return window.

## 10.4 Surface temperatures

Where you touch it matters more than the CPU temperature.
- **Palm rests / WASD area:** should stay under ~35 °C in normal use. Gaming laptops and thin machines with the SoC under the keyboard can hit 40–45 °C — uncomfortable for long typing.
- **Bottom:** on-lap use. Thin machines under load reach 45–50 °C on the bottom; that's the "hot lap" complaint. Apple's Airs get warm-not-hot; MacBook Pros are cool; Zenbook S with Ceraluminum is designed to stay cool to the touch.
- **Notebookcheck publishes heat maps** for every review. Look at the "load" map, palm-rest region.

## 10.5 Sustained performance by platform (September 2026)

- **Apple M5 Air (fanless):** excellent for bursts; ~10–20% below the M5 Pro-chassis in 20+ minute all-core loads. Silent, always. Best for people who value quiet over the last 10%.
- **Apple M5 / M5 Pro / M5 Max MacBook Pro:** sustains nearly full performance indefinitely; fans audible (~35–40 dB) only in long heavy loads; High Power Mode on Pro/Max trades noise for the last few percent. The best sustained-performance-per-decibel machines available.
- **Snapdragon X2:** fanless or near-silent designs in the Plus/Elite tier; the Elite Extreme in performance mode runs fans audibly but stays efficient. Sustains well.
- **Intel Panther Lake:** depends heavily on OEM power limits. Framework 13 Pro (30 W sustained) is quiet and moderate; Asus Zenbook Duo (55 W) is fast and louder; X1 Carbon Gen 14 is tuned for quiet. Read the specific review.
- **AMD Ryzen AI 300/400:** good sustained performance in 15–16" business machines (T16, P16s) with generous cooling; thin 14" designs run 28–35 W and get audible. AMD machines tend to run fans more aggressively in Zoom-type loads than Intel Panther Lake or Apple.
- **Gaming laptops:** sustain the most raw performance (CPU 80–150 W + GPU 100–175 W) and are the loudest. Use "quiet"/"silent" modes for daily work; they still spin up. Not library-friendly.

## 10.6 Docked vs. mobile performance modes

On Windows, the default "Balanced" power plan on battery cuts sustained power limits dramatically (often 50%+). Switch to "Best Performance" when you need a fast build on battery, at the cost of runtime. Linux: `power-profiles-daemon` (`powerprofilesctl set performance`) or TLP does the same. macOS: no configuration needed — same speed on battery — except the optional Low Power Mode (which caps performance to extend battery) and High Power Mode on Pro/Max.

Vendor utilities (Lenovo Vantage/Legion Space, MyAsus/Armoury Crate, Dell Power Manager, HP Omen Gaming Hub, Framework's nothing — it uses OS controls) expose "Quiet / Balanced / Performance" fan-and-power presets. Most developers live in Balanced and only touch Performance for long builds.

## 10.7 Long-term thermal health

- **Dust.** Fans and heatsinks accumulate dust over 1–2 years; noise rises, sustained performance falls. Machines with easily removable bottom covers (ThinkPad, Framework, most gaming laptops) can be cleaned with compressed air. Sealed machines (Apple) rarely need it, partly because they move less air.
- **Thermal paste/pads** degrade slowly; liquid metal (Asus ROG, some MSI) lasts longer. Repasting is a 3–5 year consideration for enthusiasts; irrelevant to most.
- **Laptop stands** that lift the rear improve intake on bottom-vented machines by a few degrees and noticeably reduce fan noise on some designs. Cheap, worth it.
- **Don't block vents:** beds, couches, and laps with blankets cause throttling and long-term heat stress. A lap desk or hard surface matters more than people think.

## 10.8 What to look for in a review

1. **Sustained multi-core score** (Cinebench R23/2024 loop, ~10 minutes) vs. the single-run score — the gap is the throttle.
2. **Noise at medium load** and **at maximum** in dB(A).
3. **Palm-rest and bottom temperatures under load.**
4. **Battery vs. plugged-in performance delta** (Windows/Linux only).
5. **Fan behavior in light/idle** — does it spin up randomly? (A common complaint on some AMD and older Intel designs.)

## 10.9 Recommendations

- **For silence above all:** MacBook Air M5, or a fanless Snapdragon X2 Plus/Elite design.
- **For sustained heavy compile/test/ML work with acceptable noise:** MacBook Pro 14/16 (any M5 tier), ThinkPad P14s/P16s or T16 (AMD or Panther Lake), Framework 13 Pro (moderate power, quiet), or a 16" workstation.
- **For raw sustained throughput and you don't care about noise:** a gaming or workstation laptop (Legion Pro, ROG Zephyrus G16/Strix, ZBook, Precision, ThinkPad P1/P16).
- **Avoid:** thin 14" machines with high-TDP H-series chips and small fans (loud, hot, and throttled — the worst of both worlds).
