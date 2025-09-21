#!/bin/bash

# Create config directory if it doesn't exist
mkdir -p "$HOME/.config"

# Specify dotfiles directory
DOTFILES_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# nvim
ln -sf "$DOTFILES_DIR/nvim" "$HOME/.config/nvim"

# tmux
mkdir -p "$HOME/.config/tmux"
ln -sf "$DOTFILES_DIR/tmux/tmux.conf" "$HOME/.config/tmux/.tmux.conf"

# zsh
ln -sf "$DOTFILES_DIR/zsh/.zshrc" "$HOME/.zshrc"

# git
ln -sf "$DOTFILES_DIR/git/gitconfig" "$HOME/.gitconfig"

echo "Dotfiles installed!"

# install oh-my-zsh
./zsh/install-oh-my-zsh.sh
