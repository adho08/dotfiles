# config and c are internal objects managed by qutebrowser
# type: ignore
config: object
c: object

# Load settings made via :set / :bind in qutebrowser
config.load_autoconfig()

### Keybindings ###
config.bind(",t", "spawn --userscript qute-theme-picker")  # pick a theme

config.bind("D", "tab-only")  # keep only current tab
config.bind("d", "tab-clone")  # duplicate current tab


config.unbind("<Ctrl-Shift-t>")
config.bind("<Ctrl-Shift-t>", "open -t ")  # open new empty tab
config.unbind("<Ctrl-t>")
config.bind("<Ctrl-t>", "open -t ;; cmd-set-text -s :open ")  # open new ready empty tab

config.bind("<Ctrl-Shift-r>", "config-source")  # source this config file
config.bind("<Ctrl-Shift-f>", "fullscreen")  # toggle fullscreen
config.bind(
    "<Ctrl-f>",
    "config-cycle statusbar.show always never ;; config-cycle tabs.show always never",
)

config.bind("K", "tab-prev")  # go left/upper tab
config.bind("<Alt-k>", "tab-prev")  # go left/upper tab
config.bind("<Alt-h>", "tab-prev")  # go left/upper tab

config.bind("J", "tab-next")  # go right/lower tab
config.bind("<Alt-j>", "tab-next")  # go right/lower tab
config.bind("<Alt-l>", "tab-next")  # go right/lower tab

config.bind("xo", "cmd-set-text -s :open ")
config.bind("xt", "cmd-set-text -s :open -t ")
config.bind("<Ctrl-l>", "cmd-set-text -s :open {url}")
config.bind("m", "quickmark-save")  # save quickmark
config.bind("go", "quickmark-load")  # open quickmark

# watching video has their own keybinds
# go into passthrough mode when watching youtube/netflix video
with config.pattern("*://*.leo.org/*") as p:
    p.input.mode_override = "passthrough"
with config.pattern("*://*.youtube.com/watch*") as p:
    p.input.mode_override = "passthrough"
with config.pattern("*://*.netflix.com/watch*") as p:
    p.input.mode_override = "passthrough"

# specify custom keybinds in passthrough mode
config.bind("J", "tab-prev", mode="passthrough")
config.bind("<Alt-j>", "tab-next", mode="passthrough")
config.bind("<Alt-l>", "tab-next", mode="passthrough")
config.bind("K", "tab-next", mode="passthrough")
config.bind("<Alt-k>", "tab-prev", mode="passthrough")
config.bind("<Alt-h>", "tab-prev", mode="passthrough")
config.bind("<Ctrl-w>", "tab-close", mode="passthrough")
config.bind("<Ctrl-t>", "open -t ;; cmd-set-text -s :open ", mode="passthrough")
config.bind("<Ctrl-Shift-t>", "open -t ", mode="passthrough")
config.bind("<Ctrl-Shift-r>", "config-source", mode="passthrough")
config.bind("<Ctrl-Shift-f>", "fullscreen", mode="passthrough")
config.bind(
    "<Ctrl-f>",
    "config-cycle statusbar.show always never ;; config-cycle tabs.show always never",
    mode="passthrough",
)
config.bind("xo", "cmd-set-text -s :open ", mode="passthrough")
config.bind("xt", "cmd-set-text -s :open -t ", mode="passthrough")

### Appearance ###
# Fonts
c.fonts.default_family = "Fira Code"
c.fonts.default_size = "11pt"

# Tabs
c.url.start_pages = "about:blank"
c.url.default_page = "about:blank"
c.tabs.position = "left"
c.tabs.show = "multiple"
c.tabs.favicons.show = "pinned"

# Hints
# c.colors.hints.bg = "#f9e2af"
# c.colors.hints.fg = "#11111b"
# c.colors.hints.match.fg = "#f38ba8"

# Webpage dark mode
# c.colors.webpage.preferred_color_scheme = "dark"
# c.colors.webpage.darkmode.enabled = True

# Colorscheme
config.source("./themes/wallust.py")

### Behaviour ###
c.url.searchengines = {
    "DEFAULT": "https://duckduckgo.com/?q={}",
    "yt": "https://www.youtube.com/results?search_query={}",
    "mp": "https://www.google.com/maps/place/{}",
    "gh": "https://github.com/search?q={}&type=repositories",
    "wal": "https://wiki.archlinux.org/title/{}",
    "reddit": "https://www.reddit.com/search/?q={}",
    "wiki": "https://en.wikipedia.org/wiki/{}",
    "leo": "https://dict.leo.org/franz%C3%B6sisch-deutsch/{}",
}

c.colors.webpage.darkmode.enabled = False 
c.colors.webpage.preferred_color_scheme = "dark"
c.colors.webpage.darkmode.policy.images = "never"  # Don't invert images
c.colors.webpage.darkmode.policy.page = "smart"  # smart, always, never
c.colors.webpage.darkmode.contrast = 0.0  # -1.0 to 1.0
c.colors.webpage.darkmode.algorithm = "lightness-cielab"  # or "brightness-rgb"
config.bind(",d", "config-cycle colors.webpage.darkmode.enabled True False")
