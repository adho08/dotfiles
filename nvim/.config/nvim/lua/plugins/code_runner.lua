return {
	"CRAG666/code_runner.nvim",
	config = function()
		require("code_runner").setup({
			filetype = {
				java = "cd $dir && javac $fileName && java $fileNameWithoutExt",
				python = "python3 -u",
				c = "cd $dir && gcc $fileName -o $fileNameWithoutExt && $dir/$fileNameWithoutExt",
				cpp = "cd $dir && g++ $fileName -o $fileNameWithoutExt && $dir/$fileNameWithoutExt",
			},
			mode = "toggleterm",
		})
	end,
	keys = {
		{ "<leader>rr", ":RunCode<CR>", { noremap = true, silent = false } },
		{ "<leader>rf", ":RunFile<CR>", { noremap = true, silent = false } },
		{ "<leader>rft", ":RunFile tab<CR>", { noremap = true, silent = false } },
		{ "<leader>rp", ":RunProject<CR>", { noremap = true, silent = false } },
		{ "<leader>rc", ":RunClose<CR>", { noremap = true, silent = false } },
		{ "<leader>crf", ":CRFiletype<CR>", { noremap = true, silent = false } },
		{ "<leader>crp", ":CRProjects<CR>", { noremap = true, silent = false } },
		{ "<leader>rf", ":RunCode<CR>", desc = "Run Code" },
	},
}
