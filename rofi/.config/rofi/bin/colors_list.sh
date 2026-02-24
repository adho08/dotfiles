#!/bin/bash

THEMES_DIR="$HOME/.config/wallust/themes/"
THEME="$HOME/.config/rofi/layouts/type-2.rasi"
PROMPT="Select Theme"

# Get built-in themes
builtin_themes=$(/home/adrianh/.cargo/bin/wallust theme list |
	sed -n 's/^- //p' |
	sed '/^random$/d;/^list$/d')

# Get themes without extension for display
custom_themes=$(find "$THEMES_DIR" -type f -exec basename {} \; | sed 's/\.[^.]*$//')

# Combine and show in rofi
themes=$(printf "%s\n%s\n" "$builtin_themes" "$custom_themes")

rofi_cmd() {
	rofi -dmenu \
		-p "$PROMPT" \
		-theme "$THEME" \
		-i
}

run_rofi() {
	printf "%s\n" "$themes" | rofi_cmd
}

selected=$(run_rofi)
[[ -z "$selected" ]] && exit 0

"$HOME/.config/wallust/scripts/set-colors.sh" "$selected" >/dev/null 2>&1 &
