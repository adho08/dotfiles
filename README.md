# Dotfiles Installation Guide

My personal goated dotfiles for a customised Linux environment featuring Hyprland, Neovim, Tmux, Zsh, and more.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Screenshots](#screenshots)
- [Quick Start](#quick-start)
- [Post-Installation](#post-installation)

## Prerequisites

### Supported Systems

This system has been developed in Manjaro Linux. So the dotfiles have not been tested on non-arch-based distros.

- **Arch Linux** (and derivatives)
- **Debian/Ubuntu** (and derivatives)
- **Fedora** (and derivatives)
- **openSUSE**
- **macOS** (via Homebrew but program availability very limited)

## Screenshots

### Desktop

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/dotfiles.git ~/.dotfiles
cd ~/.dotfiles
```

### 2. Run the Installation Script

**See help for options:**

```bash
./install.sh --help
```

## Post-Installation

### 1. Font Installation

Install JetBrains Mono Nerd Font for proper icon display:

**Arch:**

```bash
sudo pacman -S ttf-jetbrains-mono-nerd
```

**Manual installation:**

1. Download from [Nerd Fonts](https://www.nerdfonts.com/font-downloads)
2. Extract to `~/.local/share/fonts/`
3. Run `fc-cache -fv`

### 2. Hyprland First Launch

The configuration files are designed to work with [Wallust](https://codeberg.org/explosion-mental/wallust) colour pallet generation. Wallust should be run before using the programs.

1. Log out and select Hyprland from your display manager
2. Put Wallpapers inside ~/Pictures/Wallpapers/
3. Press `Super + m` and choose the right rofi applet to choose a theme/wallpaper
4. Wallust will generate color schemes for all programs

## Contributing

Feel free to fork and customize these dotfiles for your own use!

If you find bugs or have improvements:

1. Open an issue
2. Submit a pull request

## License

MIT License - feel free to use and modify as you wish.

---

**Enjoy your new goated customised setup!**
