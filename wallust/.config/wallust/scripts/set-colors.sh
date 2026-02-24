#!/bin/bash

# If no parameter is passed
[ -z "$1" ] && exit 0

THEME_DIR="$HOME/.config/wallust/themes"
SCRIPT_DIR="$(dirname "$0")"
WALLUST="/home/adrianh/.cargo/bin/wallust"

# Check if it's a custom theme or built-in
if compgen -G "$THEME_DIR/$1.*" >/dev/null; then
	"$WALLUST" cs "$THEME_DIR/$1".* -s
else
	"$WALLUST" theme "$1" -s
fi

"$SCRIPT_DIR/update.sh"
