#!/bin/zsh
export PATH="$HOME/.local/bin:$PATH:$HOME/.cargo/bin"
export EDITOR='nvim'
export BROWSER='org.mozilla.firefox.desktop'
export AUTHOR="Adrian Hossner"
export ZSH_CUSTOM="$HOME/.config/zsh/custom/"
export ZSH_SCRIPTS="$HOME/.config/zsh/scripts"


# ---------- aliases ---------- 
alias c='wl-copy'
alias clr=clear
alias list=ls
alias inv='nvim $(fzf --tmux -m --preview="(bat --color=always {})")'
alias avante='nvim -c "lua vim.defer_fn(function()require(\"avante.api\").zen_mode()end, 100)"'
alias icd='cd $(fzf --tmux -m --preview="(bat --color=always {})")'
alias dot='cd ~/.dotfiles'

# ---------- antigen ---------- 
source ~/.config/zsh/scripts/antigen.zsh
antigen use oh-my-zsh

antigen bundle git

antigen bundle zsh-users/zsh-autosuggestions
antigen bundle zsh-users/zsh-syntax-highlighting
antigen bundle zsh-users/zsh-history-substring-search
antigen bundle joshskidmore/zsh-fzf-history-search
antigen bundle Aloxaf/fzf-tab

antigen theme subnixr/minimal

antigen apply

# ---------- theme ---------- 
source "$ZSH_SCRIPTS"/minimal.zsh-theme

# ---------- eza ---------- 
alias ls='eza --icons'
alias ll='eza -l --icons'
alias la='eza -la --icons'
alias tree='eza --icons -T'

# ---------- completion ---------- 
source "$ZSH_SCRIPTS"/completions.sh
bindkey '^Y' forward-word

# ---------- fzf ---------- 
# Set up fzf key bindings and fuzzy completion
source <(fzf --zsh)
export FZF_CTRL_R_OPTS="
  --bind=tab:down
  --bind=btab:up
"

# ---------- additional stuff ---------- 
conf ()
{
    cd ~/.config/$1
}

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

# ---------- spicetify ---------- 
# export PATH=$PATH:/home/adrianh/.spicetify

# ---------- scripts ---------- 
