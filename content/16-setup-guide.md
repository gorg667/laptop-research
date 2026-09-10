# Chapter 16 — Day-One Setup: A Developer's Environment on Each OS

You have the laptop. This chapter gets you from "out of the box" to "productive dev machine" in an afternoon, per platform, with the choices most developers converge on. It is opinionated; adjust to taste.

## 16.1 Universal first steps (any OS)

1. **Update everything** — OS, firmware, drivers. Reboot twice.
2. **Enable full-disk encryption**: FileVault (macOS), BitLocker or Device Encryption (Windows), LUKS at install (Linux). A stolen laptop should be a hardware loss, not a data breach.
3. **Set a charge limit** if you'll be docked a lot (Chapter 8 §8.6).
4. **Sign in to a password manager** (Bitwarden, 1Password) and set up 2FA with an authenticator or a hardware key.
5. **Configure backups** *before* you have anything to lose: Time Machine to an external SSD or NAS (macOS); File History / Backblaze / a scheduled `robocopy`-to-external (Windows); Borg/Restic/Timeshift + rsync (Linux). Code lives in Git; everything else needs a backup.
6. **Install a browser you'll develop in** (Chrome/Chromium for DevTools parity; Firefox Developer Edition as a second) and uBlock Origin.
7. **Install Git and set your identity**: `git config --global user.name`, `user.email`, `init.defaultBranch main`, `pull.rebase true`; generate an SSH key (`ssh-keygen -t ed25519`) and add it to GitHub/GitLab; consider signing commits.
8. **Pick an editor/IDE**: VS Code (or Cursor/Zed) for general work; JetBrains (free for students via the GitHub Student Pack) for Java/Kotlin/Python-heavy work; Neovim if you're that person.
9. **Install a terminal you like** and a shell with completion: zsh + Oh My Zsh / zinit + Starship prompt, or fish. Learn `tmux` eventually.
10. **Dotfiles in a Git repo** (or chezmoi / yadm / Nix home-manager) from day one. Your third machine will thank you.

## 16.2 macOS

```bash
# 1. Command-line tools + Homebrew
xcode-select --install
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. Core tooling
brew install git gh wget curl jq ripgrep fd fzf bat eza tmux neovim starship \
             python@3.13 uv node pnpm go rustup openjdk@21 \
             docker colima kubectl helm awscli
brew install --cask visual-studio-code iterm2 warp rectangle raycast \
                    orbstack  # or docker-desktop; OrbStack is lighter & better on battery
```

- **Docker:** **OrbStack** (paid for commercial, free for personal/student) is faster and dramatically better on battery than Docker Desktop; **Colima** is the free CLI alternative. All run Arm Linux VMs; use `--platform linux/amd64` only when forced.
- **Window management:** Rectangle (free) or the built-in tiling in macOS 15+; **Raycast** replaces Spotlight and adds clipboard history, window switching, snippets.
- **Terminal:** iTerm2, Warp, Ghostty, or Kitty. Set the shell to zsh (default) with Starship.
- **Xcode** from the App Store if you'll touch iOS; it's 15–30 GB — install on Wi-Fi.
- **Java/Kotlin:** `brew install --cask temurin@21` or use SDKMAN!/`asdf`/`mise` for version management. **Android Studio** via cask; the Arm emulator images are fast.
- **Python:** `uv` (fast, replaces pip/venv/pyenv) or `pyenv` + `venv`. Avoid system Python for projects.
- **Node:** `fnm` or `mise` for versions; `pnpm` for speed.
- **Keyboard:** System Settings → Keyboard → Keyboard Shortcuts → Modifier Keys to swap Caps Lock → Escape/Control if you like; enable "Use F1, F2 as standard function keys" if you live in an IDE.
- **Quality of life:** Stats or iStat Menus (system monitor), AlDente (charge limit), Karabiner-Elements (advanced key remaps), Maccy (clipboard), Shottr/CleanShot (screenshots), Ice (menu bar), AppCleaner.
- **Settings to flip:** enable three-finger drag (Accessibility → Pointer Control → Trackpad Options); turn off "Correct spelling automatically" in Keyboard for terminals; Finder → show path bar, status bar, all extensions; `defaults write com.apple.finder AppleShowAllFiles YES`; tap-to-click; Night Shift.

## 16.3 Windows 11

```powershell
# Run in an elevated PowerShell
wsl --install -d Ubuntu-24.04           # WSL2 + Ubuntu (reboot after)
winget install --id Git.Git Microsoft.PowerShell Microsoft.WindowsTerminal `
  Microsoft.VisualStudioCode Microsoft.PowerToys 7zip.7zip `
  Docker.DockerDesktop JetBrains.Toolbox Python.Python.3.13 OpenJS.NodeJS.LTS `
  Google.Chrome Bitwarden.Bitwarden Obsidian.Obsidian
```

- **WSL2 is your Linux.** After install: `sudo apt update && sudo apt upgrade`, then treat Ubuntu as your primary dev environment. **Keep projects in `~/` inside WSL (`\\wsl$\Ubuntu\home\you`), never in `/mnt/c/`** — cross-filesystem I/O is 5–20× slower and is the #1 WSL2 performance complaint. VS Code's **WSL extension** opens WSL folders natively; JetBrains IDEs support WSL projects; Windows Terminal defaults to your distro.
- **Docker:** Docker Desktop with the WSL2 backend (free for students/personal; paid for large companies) or **Podman Desktop / Rancher Desktop** (free). Or just install `docker.io`/`podman` inside WSL and skip the desktop app.
- **systemd in WSL:** enabled by default on new installs (check `/etc/wsl.conf` has `[boot] systemd=true`).
- **GPU in WSL:** CUDA (Nvidia) and DirectML work inside WSL2 out of the box with current drivers — useful for the ML folks.
- **Debloat:** Settings → Personalization → Start (turn off recommendations), Privacy & security (turn off advertising ID, tailored experiences), Notifications (off for tips). Consider **O&O ShutUp10++** or **Win11Debloat** with care. Uninstall preinstalled OEM/McAfee bloat. Set Edge aside if you prefer another browser (Windows will nag; ignore it).
- **PowerToys:** FancyZones (window tiling), PowerToys Run (launcher), Keyboard Manager (remap Copilot key → right Ctrl; Caps → Esc), Color Picker, Always On Top.
- **Terminal:** Windows Terminal with PowerShell 7 + Oh My Posh or Starship; or just live in the WSL tab.
- **Windows dev without WSL:** Visual Studio 2022 Community (C#/.NET/C++ Windows targets), Rider, Unity Hub, Unreal via Epic Launcher.
- **Power:** set "Best performance" for plugged-in, "Balanced" on battery; enable hibernate; disable wake timers if the laptop wakes in your bag. Vendor app (Lenovo Vantage / MyAsus / Dell Power Manager / HP) for charge limits and fan modes.
- **Snapdragon-specific:** prefer Arm64 installers (VS Code, Git, Node, Python, JetBrains, Docker all have them); WSL distros are Arm64 automatically; check `winget` package architecture; if something is x86-only, Prism handles it — but verify drivers/VPN first.

## 16.4 Linux

**Distro choice for a laptop dev machine, 2026:**
- **Fedora Workstation (44+)**: newest kernels/drivers (essential for Panther Lake), GNOME, sensible defaults, `dnf`, Flatpak. The default recommendation for Framework/ThinkPad.
- **Ubuntu 26.04 LTS**: widest third-party support, most tutorials, Framework/Lenovo/Dell certification; Snap is the trade-off (swap for Flatpak if you dislike it).
- **Pop!_OS 24.04 (COSMIC)**: System76's; excellent Nvidia handling; tiling built in.
- **Arch / EndeavourOS / CachyOS**: rolling; newest everything; you maintain it. Great on Framework.
- **NixOS**: declarative, reproducible; steep learning curve; Framework has community support.
- **Bazzite / Fedora Atomic (Silverblue/Kinoite)**: immutable base + containers (`distrobox`/`toolbox`) for dev — very robust; different workflow.
- **Debian 13**: stable, boring, older kernel — fine on 2024 hardware, too old for Panther Lake without backports.

```bash
# Fedora example
sudo dnf install -y git gh curl wget jq ripgrep fd-find fzf bat eza tmux neovim \
    python3 python3-pip nodejs golang rust cargo java-21-openjdk-devel \
    podman podman-compose distrobox gcc gcc-c++ make cmake clang lldb gdb
flatpak install flathub com.visualstudio.code  # or the RPM repo
# Docker (if you want docker rather than podman):
sudo dnf install -y docker && sudo systemctl enable --now docker && sudo usermod -aG docker $USER
```

- **Firmware:** `fwupdmgr refresh && fwupdmgr update` — LVFS covers Framework, Lenovo, Dell, HP, Logitech.
- **Power:** `power-profiles-daemon` (default on GNOME/KDE) or **TLP** (`sudo dnf install tlp` — better on ThinkPads; don't run both). Set charge thresholds: `/sys/class/power_supply/BAT0/charge_control_end_threshold` or via TLP/GNOME extension on ThinkPad/Framework.
- **Desktop:** GNOME (polished, Wayland-first) or KDE Plasma 6 (configurable, excellent fractional scaling). Tilers: Hyprland, Sway, Niri, or GNOME with Pop Shell/Forge.
- **Fingerprint:** `fprintd-enroll`. **Fonts:** install Nerd Fonts (JetBrains Mono, Fira Code) for terminal icons.
- **Version managers:** `mise` (formerly rtx) handles Node/Python/Go/Java/Ruby in one tool; or `asdf`, `pyenv`, `fnm`, SDKMAN!.
- **Containers as dev environments:** `distrobox create --image ubuntu:24.04` gives you an Ubuntu userland on Fedora for that one tool that only ships `.deb`.
- **Nvidia (if applicable):** Fedora → RPM Fusion `akmod-nvidia` (open kernel modules default on 560+); Ubuntu → `ubuntu-drivers install`; Pop!_OS → preinstalled. Use `nvidia-smi` to verify; `envycontrol` or `supergfxctl` for hybrid mode switching.
- **Windows for the exceptions:** a KVM/QEMU VM via GNOME Boxes or virt-manager (Windows 11 needs TPM emulation — Boxes handles it); or a dual-boot partition for games/proctoring.

## 16.5 Cross-platform essentials

- **Containers everywhere:** learn `docker compose` / `podman-compose` and **dev containers** (VS Code Dev Containers / `devcontainer.json`) — a reproducible environment that runs the same on any laptop and in Codespaces.
- **Remote development:** VS Code Remote-SSH, JetBrains Gateway, or plain `ssh` + `tmux` + Neovim to a university server, a home desktop (via **Tailscale**), or a cloud VM. A light laptop + remote horsepower is a legitimate, even superior, architecture.
- **Notes:** Obsidian (Markdown, local, cross-platform), Notion, or Apple Notes.
- **Version everything:** dotfiles repo; `brew bundle dump` / `winget export` / `dnf history` to reproduce installs.
- **Learn your OS's keyboard-driven window and app switching** — it's worth more than any hardware spec.

## 16.6 A note on AI coding tools

GitHub Copilot (free for students), Cursor, Claude Code, Codex, JetBrains AI, Gemini Code Assist — all run in the cloud; they need bandwidth, not hardware. Local models (Ollama, LM Studio, llama.cpp) *do* need hardware: on a 16 GB machine you can run 7–8B models slowly; 32 GB unified (Mac) runs 14B comfortably and 30B-class at 4-bit; 64–128 GB unified runs 70B. If local AI is a priority, that's a memory decision (Chapter 5), not a CPU one.
