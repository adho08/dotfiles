vim.opt.number = true
vim.opt.relativenumber = true
vim.cmd.shiftwidth = 4
vim.opt.swapfile = true
vim.g.mapleader = " "
vim.g.maplocalleader = ","
vim.opt.shiftwidth = 4
vim.opt.winborder = "rounded" -- Or 'single', 'double', 'solid', 'none'

-- Global background for ALL floating windows
vim.api.nvim_set_hl(0, "NormalFloat", {
	bg = "#1e1e2e", -- your solid or semi-transparent color
	blend = 15, -- 0 = opaque, ~20 = light transparency
})

-- Global borders for ALL floating windows
vim.api.nvim_set_hl(0, "FloatBorder", {
	fg = "#585b70",
	bg = "#1e1e2e",
	blend = 15,
})
