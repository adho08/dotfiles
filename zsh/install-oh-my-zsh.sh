#!/bin/bash

# Install Oh My Zsh if not already installed
if [ ! -d "$HOME/.oh-my-zsh" ]; then
    sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
fi

# Install minimal theme
if [ ! -d "$HOME/.oh-my-zsh/custom/themes/minimal" ]; then
    git clone https://github.com/subnixr/minimal.git $HOME/.oh-my-zsh/custom/themes/minimal
fi

# Link other custom configurations
if [ -d "$HOME/.dotfiles/zsh/oh-my-zsh/custom" ]; then
    # Link custom files (excluding themes directory to avoid conflicts)
    find $HOME/.dotfiles/zsh/oh-my-zsh/custom -name "*.zsh" -exec ln -sf {} $HOME/.oh-my-zsh/custom/ \;
fi
