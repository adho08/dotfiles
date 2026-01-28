#!/bin/bash

if [ -z "$1" ]; then
    echo "Usage: $0 /path/to/wallpaper.jpg"
    exit 1
fi

WALLPAPER="$1"

# Run pywal for Firefox/pywalfox
wal -s -i "$WALLPAPER" >/dev/null 2>&1

# Set wallpaper in hyprland/sway
if [[ "$DESKTOP_SESSION" == 'hyprland' ]]; then
    hyprctl hyprpaper wallpaper ",$WALLPAPER"
elif [[ "$DESKTOP_SESSION" == 'sway' ]]; then
    swaybg -i "$WALLPAPER" -m fill &
fi

# Run wallust for all your apps (waybar, rofi, vimiv, etc.)
# Absolute Path needed (when launched from rofi)
/home/adrianh/.cargo/bin/wallust pywal -s -i "$WALLPAPER" 

# Reload apps
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
