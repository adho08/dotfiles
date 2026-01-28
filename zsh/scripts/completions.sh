# Ensure compinit is loaded
autoload -Uz compinit
compinit -i

conf ()
{
    cd ~/.config/"$1" || exit
}

_conf() {
    _alternative \
        'config-dirs:config directory:(~/.config/*(/:t))'
}

compdef _conf conf
