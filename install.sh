#!/bin/bash

# Default values
SYMLINK=true
SELECTED_PACKAGES=()
HELP_STR="
Usage: ./install.sh [OPTIONS] [PACKAGES...]

Options:
  --copy         Copy files instead of symlinking
  --help         Show this help

Packages:
  nvim tmux git zsh waybar wallust rofi zathura hypr

Examples:
  ./install.sh                    # Install everything
  ./install.sh nvim tmux          # Install only nvim and tmux
  ./install.sh --copy nvim zsh    # Copy only nvim and zsh configs
"

# Parse flags
while [[ $# -gt 0 ]]; do
	case $1 in
	--copy)
		SYMLINK=false
		shift
		;;
	--help | -h)
		echo "$HELP_STR"
		exit 0
		;;
	-*)
		echo "Unknown option: $1"
		exit 1
		;;
	*)
		# It's a package name
		SELECTED_PACKAGES+=("$1")
		shift
		;;
	esac
done

# Specify dotfiles directory
DOTFILES_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

DISTRO=$(grep '^ID=' /etc/os-release | cut -d= -f2 | tr -d '"')

# All available packages
ALL_PACKAGES=(nvim tmux git zsh waybar wallust rofi zathura hypr)

# If no packages specified, use all
if [ ${#SELECTED_PACKAGES[@]} -eq 0 ]; then
	SELECTED_PACKAGES=("${ALL_PACKAGES[@]}")
	INSTALL_ALL=true
else
	INSTALL_ALL=false
fi

# --------------- Detect OS & Package Manager ---------------
detect_package_manager() {
	if command -v apt &>/dev/null; then
		PKG_MANAGER="apt"
		INSTALL_CMD="sudo apt install -y"
		UPDATE_CMD="sudo apt update"
	elif command -v dnf &>/dev/null; then
		PKG_MANAGER="dnf"
		INSTALL_CMD="sudo dnf install -y"
		UPDATE_CMD="sudo dnf check-update || true"
	elif command -v pacman &>/dev/null; then
		PKG_MANAGER="pacman"
		INSTALL_CMD="sudo pacman -S --noconfirm"
		UPDATE_CMD="sudo pacman -Sy"
	elif command -v zypper &>/dev/null; then
		PKG_MANAGER="zypper"
		INSTALL_CMD="sudo zypper install -y"
		UPDATE_CMD="sudo zypper refresh"
	elif command -v brew &>/dev/null; then
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

	if ! command -v "$package" &>/dev/null; then
		echo "Installing $package..."

		if $INSTALL_CMD "$package" 2>&1; then
			echo "$package installed"
		else
			echo "Failed to install $package (might not be available in repos)"
			return 1
		fi
	else
		echo "$package already installed"
	fi
}

install_repo() {
	local name=$1
	local url=$2
	local destination=$3

	if [ ! -d "$destination" ]; then
		echo "Installing $name to $destination..."
		git clone "$url" "$destination"
		echo "$name installed"
	else
		echo "$name already installed"
	fi
}

# Check if package is selected
is_selected() {
	local package=$1
	for selected in "${SELECTED_PACKAGES[@]}"; do
		if [ "$selected" = "$package" ]; then
			return 0
		fi
	done
	return 1
}

# --------------- Main Installation ---------------
detect_package_manager

echo "Installing dotfiles from $DOTFILES_DIR"
cd "$DOTFILES_DIR" || exit

# Update package lists only if installing all
if [ "$INSTALL_ALL" = true ]; then
	echo "Updating package lists..."
	$UPDATE_CMD

	# Install core dependencies
	echo "Installing core dependencies..."
	install_package stow
	install_package git
	install_package curl
fi

# --------------- Install dependencies ---------------
if is_selected "nvim"; then
	install_package neovim
fi

if is_selected "tmux"; then
	install_package tmux
fi

if is_selected "zsh"; then
	install_package zsh
fi

if is_selected "waybar"; then
	install_package waybar
fi

if is_selected "wallust"; then
	if ! command -v wallust &>/dev/null; then
		case $PKG_MANAGER in
		pacman)
			# Detect AUR helper
			if command -v yay &>/dev/null; then
				AUR_HELPER="yay"
			elif command -v paru &>/dev/null; then
				AUR_HELPER="paru"
			else
				AUR_HELPER=""
			fi

			if [ -n "$AUR_HELPER" ]; then
				echo ""
				read -p "wallust not found. Install from AUR with $AUR_HELPER? (y/n): " -n 1 -r
				echo
				if [[ $REPLY =~ ^[Yy]$ ]]; then
					$AUR_HELPER -S wallust --noconfirm
					echo "✓ wallust installed"
				fi
			else
				echo ""
				read -p "wallust not found. Build from AUR manually? (y/n): " -n 1 -r
				echo
				if [[ $REPLY =~ ^[Yy]$ ]]; then
					install_package base-devel
					cd /tmp || exit
					install_repo "wallust" "https://aur.archlinux.org/wallust.git" "/tmp/wallust"
					cd wallust || exit
					makepkg -si --noconfirm
					cd "$DOTFILES_DIR" || exit
					rm -rf /tmp/wallust
					echo "wallust installed"
				fi
			fi
			;;
		apt | dnf | zypper)
			echo ""
			read -p "wallust not found. Download pre-built binary? (y/n): " -n 1 -r
			echo
			if [[ $REPLY =~ ^[Yy]$ ]]; then
				echo "Downloading wallust..."
				curl -L https://github.com/explosion-mental/wallust/releases/latest/download/wallust-linux-x86_64 -o /tmp/wallust
				sudo install -Dm755 /tmp/wallust /usr/local/bin/wallust
				rm /tmp/wallust
				echo "✓ wallust installed"
			fi
			;;
		brew)
			echo "wallust not available via brew"
			echo "Install manually: cargo install wallust"
			;;
		esac
	else
		echo "wallust already installed"
	fi
fi

if is_selected "rofi"; then
	install_package rofi
fi

if is_selected "zathura"; then
	install_package zathura
fi

if is_selected "hypr"; then
	install_package hyprland
fi

# --------------- Stow/Copy selected packages ---------------
if [ "$SYMLINK" = false ]; then
	echo "Copying dotfiles..."
	for package in "${SELECTED_PACKAGES[@]}"; do
		if [ -d "$package" ]; then
			echo "Copying $package..."
			mkdir -p ~/.config
			cp -r "$package"/.config/* ~/.config/ 2>/dev/null || true
			cp -r "$package"/.[!.]* ~/ 2>/dev/null || true
		else
			echo "Warning: $package directory not found, skipping..."
		fi
	done
else
	echo "Stowing dotfiles..."
	for package in "${SELECTED_PACKAGES[@]}"; do
		if [ -d "$package" ]; then
			echo "Stowing $package..."
			stow -R "$package"
		else
			echo "Warning: $package directory not found, skipping..."
		fi
	done
fi

# --------------- nvim ---------------
if is_selected "nvim"; then
	echo "Setting up nvim..."
	echo "Nvim config ready (plugins will install on first launch)"
fi

# --------------- tmux ---------------
if is_selected "tmux"; then
	echo "Setting up tmux..."

	install_repo "TPM" "https://github.com/tmux-plugins/tpm" "$HOME/.config/tmux/plugins/tpm"

	echo "Tmux config ready"
fi

# --------------- zsh ---------------
if is_selected "zsh"; then
	echo "Setting up zsh..."

	# Set zsh as default shell
	if [ "$SHELL" != "$(which zsh)" ]; then
		echo "Setting zsh as default shell..."
		chsh -s "$(which zsh)"
	fi
	# Download antigen
	if [ ! -f "$HOME/.config/zsh/scripts/antigen.zsh" ]; then
		echo "Downloading antigen..."
		mkdir -p "$HOME/.config/zsh/scripts"
		curl -L git.io/antigen >"$HOME/.config/zsh/scripts/antigen.zsh"
	fi

	echo "Zsh config ready"
fi

# --------------- git ---------------
if is_selected "git"; then
	echo "Setting up git..."
	echo "Git config ready"
fi

# --------------- waybar ---------------
if is_selected "waybar"; then
	echo "Setting up waybar..."
	echo "Waybar config ready"
fi

# --------------- wallust ---------------
if is_selected "wallust"; then
	echo "Setting up wallust..."
	echo "Wallust config ready"
fi

# --------------- rofi ---------------
if is_selected "rofi"; then
	echo "Setting up rofi..."

	install_package brightnessctl
	install_package acpi
	install_package power-profiles-daemon
	install_package networkmanager
	install_package iproute2
	install_package gawk
	install_package mpc
	install_package alsa-utils
	install_package libnotify
	install_package sway
	install_package swaybg
	install_package gammastep

	case $PKG_MANAGER in
	pacman)
		install_package bluez-utils
		;;
	apt | dnf | zypper)
		install_package bluez
		;;
	brew)
		install_package bluez
		;;
	esac

	echo "Rofi config ready"
fi

# --------------- zathura ---------------
if is_selected "zathura"; then
	echo "Setting up zathura..."
	echo "Zathura config ready"
fi

# --------------- hyprland ---------------
if is_selected "hypr"; then
	echo "Setting up hyprland..."

	install_package hyprsunset
	install_package hyprlock
	install_package alacritty
	install_package dolphin
	install_package keyd
	install_package grimblast
	install_package wireplumber
	install_package playerctl

	# Setup keyd
	if [ -f "$DOTFILES_DIR/keyd/etc/keyd/default.conf" ]; then
		echo "Setting up keyd..."
		sudo mkdir -p /etc/keyd
		sudo cp "$DOTFILES_DIR"/keyd/etc/keyd/default.conf /etc/keyd/
		sudo systemctl enable --now keyd >/dev/null 2>&1
		echo "Keyd configured"
	fi

	echo "Hyprland config ready"
fi

# --------------- Additional info ---------------
echo ""
echo "=========================================="
echo "✓ Dotfiles installation complete!"
echo "=========================================="
echo ""
echo "Installed packages: ${SELECTED_PACKAGES[*]}"
echo ""
if is_selected "zsh" && is_selected "tmux" && is_selected "hypr"; then
	echo "Next steps:"
fi
if is_selected "zsh"; then
	echo "  • Restart your terminal or run: exec zsh"
fi
if is_selected "tmux"; then
	echo "  • In tmux, press <prefix> + I to install plugins"
fi
if is_selected "hypr"; then
	echo "  • Press Super + m to choose a theme"
	echo "  • Install JetBrains Mono Nerd Font"
fi
echo ""
echo ""
