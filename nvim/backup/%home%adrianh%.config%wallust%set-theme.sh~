#!/bin/bash

echo "$1"

# Make the templates
/home/adrianh/.cargo/bin/wallust cs "$1" -s

# Update all programs
if command -v spicetify &> /dev/null && pgrep -x spotify >/dev/null; then
    spicetify apply >/dev/null 2>&1
else
    spicetify apply >/dev/null 2>&1
    killall spotify >/dev/null 2>&1
fi
pywalfox update
killall -SIGUSR2 waybar >/dev/null 2>&1
hyprctl reload >/dev/null 2>&1

if tmux list-sessions &> /dev/null 2>&1; then
    # Or reload each session individually:
    for session in $(tmux list-sessions -F '#S'); do
        tmux source-file -t "$session" ~/.config/tmux/tmux.conf >/dev/null 2>&1
    done
fi

printf "\nAll programs updated\n"
