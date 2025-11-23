#!/bin/zsh

export PATH="$HOME/.local/bin:$PATH"
EDITOR='nvim'
BROWSER='org.mozilla.firefox.desktop'

# ---------- fzf ---------- 
# Set up fzf key bindings and fuzzy completion
source <(fzf --zsh)

# ---------- aliases ---------- 

alias c='xclip -sel clip'
alias clr=clear
alias list=ls
alias inv='nvim $(fzf --tmux -m --preview="(bat --color=always {})")'
alias icd='cd $(fzf --tmux -m --preview="(bat --color=always {})")'
alias conf='cd ~/.config'

# ---------- oh-my-zsh ---------- 
export ZSH="$HOME/.oh-my-zsh"
ZSH_THEME="minimal"
plugins=(git)

source $ZSH/themes/minimal.zsh-theme
source $ZSH/oh-my-zsh.sh


# ---------- additional stuff ---------- 
# count words in a pdf
cwpdf ()
{
    str=$1
    parts=("${(@s:.:)str}")   # split on '.'
	if [[ $parts[-1] == pdf ]]; then
	    pdftotext "$1" - | wc -w	
	else
	    pdftotext "$1".pdf - | wc -w
	fi
    }

# ---------- zoxide ---------- 
eval "$(zoxide init zsh)"

