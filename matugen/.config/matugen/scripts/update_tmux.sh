#!/bin/bash

if tmux list-sessions &>/dev/null 2>&1; then
	# Or reload each session individually:
	for session in $(tmux list-sessions -F '#S'); do
		tmux source-file -t "$session" ~/.config/tmux/tmux.conf >/dev/null 2>&1
	done
fi
