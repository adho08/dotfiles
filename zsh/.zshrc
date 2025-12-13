#!/bin/zsh
export PATH="$HOME/.local/bin:$PATH:$HOME/.cargo/bin"
export EDITOR='nvim'
export BROWSER='org.mozilla.firefox.desktop'
export AUTHOR="Adrian Hossner"

# ---------- fzf ---------- 
# Set up fzf key bindings and fuzzy completion
source <(fzf --zsh)

# ---------- aliases ---------- 

alias c='xclip -sel clip'
alias clr=clear
alias list=ls
alias inv='nvim $(fzf --tmux -m --preview="(bat --color=always {})")'
alias avante='nvim -c "lua vim.defer_fn(function()require(\"avante.api\").zen_mode()end, 100)"'
alias icd='cd $(fzf --tmux -m --preview="(bat --color=always {})")'
# alias conf='cd ~/.config'

# ---------- oh-my-zsh ---------- 
export ZSH="$HOME/.oh-my-zsh"
ZSH_THEME="minimal"
plugins=(git eza)

source $ZSH/themes/minimal.zsh-theme
source $ZSH/oh-my-zsh.sh

# eza
alias ls='eza --icons'
alias ll='eza -l --icons'
alias la='eza -la --icons'
alias tree='eza --icons -T'


# ---------- additional stuff ---------- 
# count words in a pdf
conf ()
{
    cd ~/.config/$1
}

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


export PATH=$PATH:/home/adrianh/.spicetify
