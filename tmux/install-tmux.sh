#!/bin/bash

# Install Tmux Plugin Manager if not already installed
echo "Installing Tmux Plugin Manager ..."
if [ ! -d "$HOME/.config/tmux/plugins/tpm" ]; then
	git clone https://github.com/tmux-plugins/tpm ~/.config/tmux/plugins/tpm
fi

echo "Tmux setup complete!"

