#!/bin/bash

if [ -z "$1" ]; then
	echo "Usage: $0 /path/to/wallpaper.jpg"
	exit 1
fi

WALLPAPER="$1"
SCRIPT_DIR="$(dirname "$0")"

# Set wallpaper
"$SCRIPT_DIR/set-wallpaper.sh" "$1"

# Run wallust for all your apps (waybar, rofi, vimiv, etc.)
# Absolute Path needed (when launched from rofi)
/home/adrianh/.cargo/bin/wallust pywal -s -i "$WALLPAPER"

# Run pywal for Firefox/pywalfox
wal -s -i "$WALLPAPER" >/dev/null 2>&1

# Reload all programs (managed by wallust)
"$SCRIPT_DIR/update.sh" "$1"
