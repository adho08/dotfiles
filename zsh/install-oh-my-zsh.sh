#!/bin/bash

# Specify dotfiles directory
DOTFILES_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

ZSH_CUSTOM="$HOME/.oh-my-zsh/custom"
ZSH_THEMES="$HOME/.oh-my-zsh/themes"

# Install Oh My Zsh if not already installed
if [ ! -d "$HOME/.oh-my-zsh" ]; then
	sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
fi

# Install minimal theme
if [ ! -d "$HOME/.oh-my-zsh/custom/themes/minimal" ]; then
	git clone https://github.com/subnixr/minimal.git "$ZSH_CUSTOM/themes/minimal"
	ln -s "$ZSH_CUSTOM}/themes/minimal/minimal.zsh" "$ZSH_CUSTOM/themes/minimal.zsh-theme"
	ln -sf "$DOTFILES_DIR/zsh/oh-my-zsh/themes" "$ZSH_THEMES"
fi

# Link your custom zsh configurations
echo "Linking custom zsh files..."
if [ -d "$DOTFILES_DIR/zsh/oh-my-zsh/custom" ]; then
    # Create custom directory if it doesn't exist
    mkdir -p "$ZSH_CUSTOM"
    
    # Link custom files
    find "$DOTFILES_DIR/zsh/oh-my-zsh/custom" -name "*.zsh" -exec ln -sf {} "$ZSH_CUSTOM/" \;
fi

echo "Oh My Zsh setup complete!"
