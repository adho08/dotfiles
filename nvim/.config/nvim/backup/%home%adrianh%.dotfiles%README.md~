Goated System Configuration

# Dotfiles Installation Guide

My personal dotfiles for a customized Linux environment featuring Hyprland, Neovim, Tmux, Zsh, and more.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Installation Options](#installation-options)
- [Package Details](#package-details)
- [Post-Installation](#post-installation)
- [Troubleshooting](#troubleshooting)
- [Uninstallation](#uninstallation)

## 🔧 Prerequisites

### Supported Systems

- **Arch Linux** (and derivatives)
- **Debian/Ubuntu** (and derivatives)
- **Fedora** (and derivatives)
- **openSUSE**
- **macOS** (via Homebrew)

### Required Tools

The installation script will automatically install these if missing:

- `git`
- `stow` (for symlink management)
- `curl`

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/dotfiles.git ~/.dotfiles
cd ~/.dotfiles
```

### 2. Run the Installation Script

**Install everything:**

```bash
./install.sh
```

**Install specific packages:**

```bash
./install.sh nvim tmux zsh
```

**Copy files instead of symlinking:**

```bash
./install.sh --copy
```

### 3. Follow Post-Installation Steps

See [Post-Installation](#post-installation) section below.

## 📦 Installation Options

### Full Installation

Installs all configurations and dependencies:

```bash
./install.sh
```

This will:

- Detect your package manager
- Update package lists
- Install all required packages
- Create symlinks for all configurations

### Selective Installation

Install only specific packages:

```bash
./install.sh nvim tmux zsh
```

Available packages:

- `nvim` - Neovim configuration
- `tmux` - Tmux configuration and TPM
- `git` - Git configuration
- `zsh` - Zsh with Oh My Zsh and Antigen
- `waybar` - Waybar configuration
- `wallust` - Wallust color scheme generator
- `rofi` - Rofi application launcher
- `zathura` - Zathura PDF viewer
- `hypr` - Hyprland window manager

### Copy Mode (For Other Users)

If you want to use these dotfiles as a starting point without symlinks:

```bash
./install.sh --copy
```

This copies files instead of creating symlinks, allowing you to modify configs without affecting the repo.

### Help

```bash
./install.sh --help
```

## 📚 Package Details

### Neovim

**What's included:**

- LazyVim configuration
- Custom keybindings
- LSP, completion, and debugging setup
- Multiple colorschemes

**Post-install:**

- Plugins auto-install on first launch
- Run `:checkhealth` to verify setup

### Tmux

**What's included:**

- Custom keybindings with prefix `Ctrl+Space`
- TPM (Tmux Plugin Manager)
- Status bar configuration

**Post-install:**

- Launch tmux: `tmux`
- Press `<prefix> + I` to install plugins

### Zsh

**What's included:**

- Antigen plugin manager
- Oh My Zsh integration
- Minimal theme
- Auto-suggestions, syntax highlighting, fzf integration

**Post-install:**

- Restart terminal or run: `exec zsh`
- Plugins auto-install on first launch

### Hyprland

**What's included:**

- Hyprland compositor configuration
- Hyprlock (lock screen)
- Keyd (keyboard remapping)
- Integration with Waybar, Rofi, and Wallust

**Dependencies installed:**

- `alacritty` - Terminal emulator
- `dolphin` - File manager
- `grimblast` - Screenshot tool
- `wireplumber` - Audio manager
- `playerctl` - Media control

**Post-install:**

- Press `Super + m` to select a wallpaper theme
- Install **JetBrains Mono Nerd Font** for proper icons

### Wallust

**Installation methods (Arch):**

1. Via AUR helper (yay/paru) - automatic
2. Manual AUR build - requires `base-devel`

**Installation methods (other distros):**

- Pre-built binary download

**Note:** The script will prompt you to choose installation method.

### Rofi

**What's included:**

- Custom launchers and applets
- Theme selector
- Integration with system controls

**Dependencies:**

- Network management tools
- Bluetooth tools
- Power management
- Audio controls

## 🎯 Post-Installation

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

### 2. Restart Your Shell

```bash
exec zsh
```

### 3. Tmux Plugin Installation

1. Launch tmux: `tmux`
2. Press `Ctrl+Space` then `I` (capital i)
3. Wait for plugins to install

### 4. Hyprland First Launch

1. Log out and select Hyprland from your display manager
2. Press `Super + m` to choose a theme/wallpaper
3. Wallust will generate color schemes for all programs

### 5. Verify Installation

Check that everything is working:

```bash
# Check Neovim
nvim --version

# Check Tmux
tmux -V

# Check Zsh
zsh --version

# Check Hyprland (if installed)
hyprctl version
```

## 🔍 Troubleshooting

### Stow Conflicts

If you get stow conflicts:

```bash
# Remove existing configs (backup first!)
rm ~/.config/nvim
rm ~/.config/tmux
# ... etc

# Re-run install
./install.sh
```

### Package Installation Failures

Some packages might not be available in your distribution's repositories:

- Check error messages for package names
- Install manually if needed
- Some packages (like `hyprsunset`) are Arch-specific

### Wallust Not Installing

**Arch users:**

- Install an AUR helper: `yay` or `paru`
- Or allow manual AUR build when prompted

**Other distros:**

- Accept binary download when prompted
- Or install via cargo: `cargo install wallust`

### Zsh Not Default Shell

```bash
chsh -s $(which zsh)
```

Then log out and log back in.

### Antigen Plugins Not Loading

```bash
# Clear antigen cache
rm -rf ~/.antigen

# Restart zsh
exec zsh
```

## 🗑️ Uninstallation

### Remove Symlinks

```bash
cd ~/.dotfiles

# Unstow specific packages
stow -D nvim tmux zsh

# Or unstow all
stow -D nvim tmux git zsh waybar wallust rofi zathura hypr
```

### Remove Repository

```bash
rm -rf ~/.dotfiles
```

### Remove Installed Packages

Manually remove packages if desired:

```bash
# Arch
sudo pacman -Rns neovim tmux zsh hyprland

# Debian/Ubuntu
sudo apt remove neovim tmux zsh

# Fedora
sudo dnf remove neovim tmux zsh
```

## 🤝 Contributing

Feel free to fork and customize these dotfiles for your own use!

If you find bugs or have improvements:

1. Open an issue
2. Submit a pull request

## 📝 License

MIT License - feel free to use and modify as you wish.

## 🙏 Credits

- [Oh My Zsh](https://ohmyz.sh/)
- [Antigen](https://github.com/zsh-users/antigen)
- [LazyVim](https://www.lazyvim.org/)
- [TPM](https://github.com/tmux-plugins/tpm)
- [Hyprland](https://hyprland.org/)
- [Wallust](https://github.com/explosion-mental/wallust)

---

**Enjoy your customized setup! 🎉**

## TODOs

[ ] TODO#1: Install all requirements for rofi, hyprland, ...
[ ] TODO#2: Test all programs without colour files.
[ ] TODO#3: Write Usage guide for wallust (place wallpapers into ~/Pictures/Wallpapers/)
[ ] TODO#4: Make install script make receive individual program names for separated installation
