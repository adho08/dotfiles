return {
	"lervag/vimtex",
	lazy = false, -- we don't want to lazy load VimTeX
	-- tag = "v2.15", -- uncomment to pin to a specific release
	config = function()
		if IN_WINDOWS or IN_WSL then
			-- Use a custom script for viewing PDFs
			vim.g.vimtex_view_method = "general"
			vim.g.vimtex_view_general_viewer = "/home/adhos/.local/bin/openpdf.sh"
		elseif IN_LINUX then
			vim.g.vimtex_view_method = "zathura"
		end
		vim.g.vimtex_quickfix_enabled = 0

		-- Make sure latexmk generates synctex data
		vim.g.vimtex_compiler_latexmk = {
			out_dir = "build",
			callback = 1,
			continuous = 1,
			executable = "latexmk",
			options = {
				"-pdf",
				"-shell-escape",
				"-verbose",
				"-file-line-error",
				"-synctex=1",
				"-interaction=nonstopmode",
			},
		}

		if IN_LINUX then
			vim.keymap.set("n", "<leader>z", function()
				local file = vim.fn.expand("%:p")
				local line = vim.fn.line(".")
				local tex_dir = vim.fn.expand("%:p:h") -- directory of .tex file
				local tex_name = vim.fn.expand("%:t:r") -- .tex filename without extension

				-- Adjust this path to match your build directory structure
				local pdf_file = tex_dir .. "/build/" .. tex_name .. ".pdf"

				if vim.fn.filereadable(pdf_file) == 1 then
					vim.fn.system(string.format("zathura --synctex-forward %d:1:%s %s &", line, file, pdf_file))
				else
					print("PDF file not found: " .. pdf_file)
					print("Expected: " .. pdf_file) -- Debug: shows where it's looking
				end
			end, { desc = "Sync with Zathura" })
		end
	end,
}
