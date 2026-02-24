return {
	"folke/zen-mode.nvim",
	opts = {
		window = {
			width = 0.85,
		},
		options = {
			relativenumber = false,
		},

		-- Keybinds
		vim.keymap.set("n", "Zm", ":ZenMode<CR>"),
	},
}
