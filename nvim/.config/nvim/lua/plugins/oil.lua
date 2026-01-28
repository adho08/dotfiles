return {
	{
		"benomahony/oil-git.nvim",
		dependencies = { "stevearc/oil.nvim" },
		-- No opts or config needed! Works automatically
	},
	{
		"JezerM/oil-lsp-diagnostics.nvim",
		dependencies = { "stevearc/oil.nvim" },
		opts = {},
	},
	{
		"stevearc/oil.nvim",
		---@module 'oil'
		---@type oil.SetupOpts
		opts = {},
		-- Optional dependencies
		-- dependencies = { "nvim-mini/mini.icons", "refractalize/oil-git-status.nvim" },
		dependencies = { "nvim-tree/nvim-web-devicons", "refractalize/oil-git-status.nvim" },
		-- Lazy loading is not recommended because it is very tricky to make it work correctly in all situations.
		lazy = false,
		config = function()
			require("oil").setup({
				win_options = {
					signcolumn = "yes:2",
				},
				keymaps = {
					["<C-l>"] = false,
					["<C-r>"] = "actions.refresh",
				},
				view_options = {
					show_hidden = true,
				},

				vim.keymap.set("n", "<leader>pv", "<cmd> Oil <CR>"),
			})
		end,
	},
}
