# Breath-esque Qutebrowser theme by Wakellor957
# Edit however you like ^^

# type: ignore
c: object

import webcolors

white = webcolors.name_to_hex("white")
black = webcolors.name_to_hex("black")

bg_color = '#000000'

# Height (in pixels or as percentage of the window) of the completion.
# Type: PercOrInt
c.completion.height = '33%'

# Where to show the downloaded files.
# Type: VerticalPosition
# Valid values:
#   - top
#   - bottom
c.downloads.position = 'bottom'

# Scaling factor for favicons in the tab bar. The tab size is unchanged,
# so big favicons also require extra `tabs.padding`.
# Type: Float
c.tabs.favicons.scale = 1.1

# Padding (in pixels) around text for tabs.
# Type: Padding
c.tabs.padding = {'bottom': 4, 'left': 7, 'right': 7, 'top': 4}

# Background color of the completion widget for odd rows.
# Type: QssColor
c.colors.completion.odd.bg = '#292f34'

# Background color of the completion widget for even rows.
# Type: QssColor
c.colors.completion.even.bg = '#212529'

# Foreground color of completion widget category headers.
# Type: QtColor
c.colors.completion.category.fg = '#e7fff8'

# Background color of the completion widget category headers.
# Type: QssColor
c.colors.completion.category.bg = '#006a6a'

# Top border color of the completion widget category headers.
# Type: QssColor
c.colors.completion.category.border.top = '#006a6a'

# Bottom border color of the completion widget category headers.
# Type: QssColor
c.colors.completion.category.border.bottom = bg_color

# Background color of the selected completion item.
# Type: QssColor
c.colors.completion.item.selected.bg = '#e7fff8'

# Top border color of the selected completion item.
# Type: QssColor
c.colors.completion.item.selected.border.top = bg_color

# Bottom border color of the selected completion item.
# Type: QssColor
c.colors.completion.item.selected.border.bottom = bg_color

# Background color for the download bar.
# Type: QssColor
c.colors.downloads.bar.bg = bg_color

# Background color for the download text inside the download bar.
# Type: QssColor
for state in ["start", "stop", "error"]:
    getattr(c.colors.downloads, state).bg = bg_color

# Background color for prompts.
# Type: QssColor
c.colors.prompts.bg = '#444444'

# Foreground color of the statusbar in all modes.
# Type: QssColor
for mode in ["normal", "insert", "command", "caret", "passthrough", "private"]:
    setattr(c.colors.statusbar, f"{mode}.fg", '#f0f0f0')

# Background color of the statusbar in all modes.
# Type: QssColor
for mode in ["normal", "insert", "command", "caret", "passthrough", "private"]:
    setattr(c.colors.statusbar, f"{mode}.bg", bg_color)


tab_bg_unsel = bg_color
tab_fg_unsel = white
tab_bg_sel = "#523D64"
tab_fg_sel = white

# Background color of the tabbar in command mode.
# Type: QssColor
c.colors.tabs.bar.bg = bg_color

# Foreground color of unselected odd tabs.
# Type: QtColor
c.colors.tabs.odd.fg = tab_fg_unsel

# Background color of unselected odd tabs.
# Type: QtColor
c.colors.tabs.odd.bg = bg_color

# Foreground color of unselected even tabs.
# Type: QtColor
c.colors.tabs.even.fg = tab_fg_unsel

# Background color of unselected even tabs.
# Type: QtColor
c.colors.tabs.even.bg = bg_color

# Background color of selected odd tabs.
# Type: QtColor
c.colors.tabs.selected.odd.bg = tab_bg_sel

# Foreground color of selected odd tabs.
# Type: QtColor
c.colors.tabs.selected.odd.fg = tab_fg_sel

# Background color of selected even tabs.
# Type: QtColor
c.colors.tabs.selected.even.bg = tab_bg_sel

# Foregroudn color of selected even tabs.
# Type: QtColor
c.colors.tabs.selected.even.fg = tab_fg_sel

# Appearance of hint widgets (f/F)
c.colors.hints.fg = '#e7fff8'
c.colors.hints.bg = bg_color

c.hints.border = '1px solid #268BD2'
c.colors.hints.match.fg = '#268BD2'
c.hints.padding = {'top': 2, 'bottom': 2, 'left': 5, 'right': 5}
c.hints.radius = 4 # Rounded corners

