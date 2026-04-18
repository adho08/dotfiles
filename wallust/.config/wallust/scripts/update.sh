#!/bin/bash

# Update all programs
if command -v spicetify &>/dev/null && pgrep -x spotify >/dev/null; then
	spicetify apply >/dev/null 2>&1
else
	spicetify apply >/dev/null 2>&1
	killall spotify >/dev/null 2>&1
fi
pywalfox update
killall -SIGUSR2 waybar >/dev/null 2>&1
hyprctl reload >/dev/null 2>&1

if tmux list-sessions &>/dev/null 2>&1; then
	# Or reload each session individually:
	for session in $(tmux list-sessions -F '#S'); do
		tmux source-file -t "$session" ~/.config/tmux/tmux.conf >/dev/null 2>&1
	done
fi

# TODO: make qutebrowser update without launching
# qutebrowser --target window ':config-source'

printf "\nAll programs updated\n"
