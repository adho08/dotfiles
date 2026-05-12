#!/bin/bash

# For screensharing
dbus-update-activation-environment --systemd WAYLAND_DISPLAY XDG_CURRENT_DESKTOP=wlroots

# Keep clipboard content after app closes
wl-clip-persist --clipboard regular --reconnect-tries 0 &

# Watch clipboard and store history
wl-paste --type text --watch cliphist store &

# Status bar
waybar -c "$HOME"/.config/waybar/mango/mango.jsonc &

# Bluelight filter
wl-gammarelay &

# Run the wallpaper engine
awww-daemon &

# Run ELement in background for notifications
element-desktop --hidden &

# ags manages notifications
killall swaync &

# Run ags in background
ags run "$HOME"/.config/ags/app.tsx &
