#!/bin/bash

SCRIPT_DIR=$(dirname "$0")

set_wallpaper() {
	if [[ "$DESKTOP_SESSION" == 'hyprland' ]]; then
		hyprctl hyprpaper wallpaper ",$1" &
	elif [[ "$DESKTOP_SESSION" == 'mango' ]]; then
		swaybg -i "$1" -m fill &
	elif [[ "$DESKTOP_SESSION" == 'sway' ]]; then
		swaybg -i "$1" -m fill &
	fi
	echo "$1" >"$SCRIPT_DIR/../cache/wallpaper.txt"
}

if [ $# -eq 0 ]; then
	read -r wallpaper_img_path <"$SCRIPT_DIR"/../cache/wallpaper.txt
	set_wallpaper "$wallpaper_img_path"
	exit 0
fi

set_wallpaper "$1"
