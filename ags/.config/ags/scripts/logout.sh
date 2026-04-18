#!/bin/bash

if [[ "$DESKTOP_SESSION" == 'sway' ]]; then
	swaymsg exit
elif [[ "$DESKTOP_SESSION" == 'mango' ]]; then
	mmsg -q
elif [[ "$DESKTOP_SESSION" == 'hyprland' ]]; then
	hyprctl dispatch exit
elif [[ "$DESKTOP_SESSION" == 'openbox' ]]; then
	openbox --exit
elif [[ "$DESKTOP_SESSION" == 'bspwm' ]]; then
	bspc quit
elif [[ "$DESKTOP_SESSION" == 'i3' ]]; then
	i3-msg exit
elif [[ "$DESKTOP_SESSION" == 'plasma' ]]; then
	qdbus org.kde.ksmserver /KSMServer logout 0 0 0
else
	notify-send "Logout" "Could not identify environment"
fi
