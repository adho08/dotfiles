#!/bin/bash

WALLPAPER_DIR="$HOME/Pictures/Wallpapers"
THEME_DIR="$HOME/.config/wallust/themes"

# Create theme directory if it doesn't exist
mkdir -p "$THEME_DIR"

# Process each wallpaper
for wallpaper in "$WALLPAPER_DIR"/*; do
    # Skip if not a file
    [ -f "$wallpaper" ] || continue
    
    # Get filename without extension
    theme_name=$(basename "$wallpaper" | sed 's/\.[^.]*$//')
    
    echo "Processing: $theme_name"
    
    # Generate colors with wallust
    wallust pywal -s -i "$wallpaper"
    
    # Copy the generated colors to themes directory
    cp "$HOME/.cache/wallust/colors.json" "$THEME_DIR/${theme_name}.json"
    
    echo "Saved theme: ${theme_name}.json"
done

echo "Done! Themes saved to $THEME_DIR"
