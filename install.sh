#!/bin/bash

set -e  # Exit on error

# Specify dotfiles directory
DOTFILES_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# --------------- Detect OS & Package Manager ---------------
detect_package_manager() {
    if command -v apt &> /dev/null; then
        PKG_MANAGER="apt"
        INSTALL_CMD="sudo apt install -y"
        UPDATE_CMD="sudo apt update"
    elif command -v dnf &> /dev/null; then
        PKG_MANAGER="dnf"
        INSTALL_CMD="sudo dnf install -y"
        UPDATE_CMD="sudo dnf check-update || true"
    elif command -v pacman &> /dev/null; then
        PKG_MANAGER="pacman"
        INSTALL_CMD="sudo pacman -S --noconfirm"
        UPDATE_CMD="sudo pacman -Sy"
    elif command -v zypper &> /dev/null; then
        PKG_MANAGER="zypper"
        INSTALL_CMD="sudo zypper install -y"
        UPDATE_CMD="sudo zypper refresh"
    elif command -v brew &> /dev/null; then
        PKG_MANAGER="brew"
        INSTALL_CMD="brew install"
        UPDATE_CMD="brew update"
    else
        echo "Error: No supported package manager found"
        exit 1
    fi
    
    echo "Detected package manager: $PKG_MANAGER"
}

# --------------- Install package function ---------------
install_package() {
    local package=$1
    
    if ! command -v "$package" &> /dev/null; then
        echo "Installing $package..."
        $INSTALL_CMD "$package"
    else
        echo "$package already installed"
    fi
}

# --------------- Main Installation ---------------
detect_package_manager

echo "Installing dotfiles from $DOTFILES_DIR"
cd "$DOTFILES_DIR"

# Update package lists
echo "Updating package lists..."
$UPDATE_CMD

# Install dependencies
echo "Installing dependencies..."
install_package stow
install_package git
install_package curl
install_package zsh
install_package tmux
install_package waybar
install_package wallust 
install_package rofi
install_package zathuar

# --------------- Stow packages ---------------
echo "Stowing dotfiles..."
stow nvim
stow tmux
stow git
stow zsh
stow waybar 
stow wallust
stow rofi
stow zathura
stow hypr

# --------------- nvim ---------------
echo "Setting up nvim..."

# --------------- tmux ---------------
echo "Setting up tmux..."

# Install TPM
if [ ! -d ~/.config/tmux/plugins/tpm ]; then
  git clone https://github.com/tmux-plugins/tpm ~/.config/tmux/plugins/tpm
    echo "TPM installed"
fi

# --------------- zsh ---------------
echo "Setting up zsh..."

# Install antigen
mkdir -p "$HOME/.config/zsh/scripts"
if [ ! -f "$HOME/.config/zsh/scripts/antigen.zsh" ]; then
  curl -L git.io/antigen > "$HOME/.config/zsh/scripts/antigen.zsh"
  echo "Antigen installed"
fi
# Install minimal theme (for antigen to find)
if [ ! -d "${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/minimal" ]; then
  git clone https://github.com/subnixr/minimal \
    "${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/minimal"
  echo "Minimal theme installed"
fi
# Set zsh as default shell
if [ "$SHELL" != "$(which zsh)" ]; then
    echo "Setting zsh as default shell..."
    chsh -s "$(which zsh)"
fi

# --------------- git ---------------
echo "Setting up git..."

# --------------- waybar ---------------
echo "Setting up waybar..."

# --------------- wallust ---------------
echo "Setting up wallust..."

# --------------- rofi ---------------
echo "Setting up rofi..."
# TODO: install all requirements for rofi bin if not already installed

# --------------- zathura ---------------
echo "Setting up zathura..."

# --------------- hypr ---------------
echo "Setting up hypr..."
# TODO: install all requirements for hyprland conf if not already installed

echo ""
echo "Dotfiles installed!"
echo ""
echo "Next steps:"
echo "1. Restart your terminal or run: exec zsh"
echo "2. In tmux, press <prefix> + I to install plugins"
