return {
	{
		"nvim-telescope/telescope.nvim",
		tag = "0.1.8",
		dependencies = { "nvim-lua/plenary.nvim", "nvim-telescope/telescope-fzf-native.nvim", "BurntSushi/ripgrep" },
		config = function()
			local builtin = require("telescope.builtin")

			-- Use vim.api.nvim_set_keymap for a more direct approach
			vim.keymap.set("n", "<leader>ff", builtin.find_files, {})
			vim.keymap.set("n", "<leader>fg", builtin.live_grep, {})
			vim.keymap.set("n", "<leader>p", builtin.git_files, {})

			vim.keymap.set("n", "<leader>s", builtin.colorscheme, { noremap = true, silent = true })
		end,
	},
	-- {
	-- 	"nvim-telescope/telescope-ui-select.nvim",
	-- 	config = function()
	-- 		require("telescope").setup({
	-- 			extensions = {
	-- 				["ui-select"] = {
	-- 					require("telescope.themes").get_dropdown({}),
	-- 				},
	-- 			},
	-- 		})
	-- 		require("telescope").load_extension("ui-select")
	-- 	end,
	-- },
}
