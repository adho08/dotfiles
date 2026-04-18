#!/bin/bash

if [[ "$DESKTOP_SESSION" == 'sway' ]]; then
	swaylock_custom
elif [[ "$DESKTOP_SESSION" == 'hyprland' ]]; then
	hyprlock
else
	notify-send "Lock" "Could not identify environment"
fi
