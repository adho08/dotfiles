#!/usr/bin/env bash

# Count tiled containers in the focused workspace
TILED_COUNT=$(i3-msg -t get_tree | jq '
  recurse(.nodes[]?)
  | select(.focused == true)
  | .workspace
  | recurse(.nodes[]?)
  | select(.floating != "user_on")
' | wc -l)

if [ "$TILED_COUNT" -gt 0 ]; then
    # Make all windows floating
    i3-msg '[workspace=__focused__] floating enable'
else
    # Return all windows to tiling
    i3-msg '[workspace=__focused__] floating disable'
fi

