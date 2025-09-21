#!/bin/bash

# Create config directory if it doesn't exist
mkdir -p "$HOME/.config"

# Specify dotfiles directory
DOTFILES_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# nvim
ln -sf "$DOTFILES_DIR/nvim" "$HOME/.config"

# tmux
ln -sf "$DOTFILES_DIR/tmux/tmux.conf" "$HOME/.config/tmux/"
ln -sf "$DOTFILES_DIR/tmux/tmux.status-bar.conf" "$HOME/.config/tmux/"
./tmux/install-tmux.sh

# zsh
ln -sf "$DOTFILES_DIR/zsh/.zshrc" "$HOME/.zshrc"

# git
ln -sf "$DOTFILES_DIR/git/gitconfig" "$HOME/.gitconfig"

echo "Dotfiles installed!"

# install oh-my-zsh
./zsh/install-oh-my-zsh.sh
