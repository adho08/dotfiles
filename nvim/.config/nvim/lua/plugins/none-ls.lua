return {
	{
		"nvimtools/none-ls.nvim",
		dependencies = {
			"nvim-lua/plenary.nvim",
		},
		opts = function(_, opts)
			local null_ls = require("null-ls")
			local latexindent = {
				method = null_ls.methods.FORMATTING,
				filetypes = { "tex" },
				generator = null_ls.generator({
					command = "latexindent",
					args = { "-", "-g", "/dev/null" },
					to_stdin = true,
					from_stderr = false,
					ignore_stderr = true,
					on_output = function(output)
						return output
					end,
				}),
			}

			-- Format keybind
			vim.keymap.set("n", "<leader>=", vim.lsp.buf.format, opts)

			null_ls.setup({
				log_level = "off",
				debug = false,
				sources = {
					-- latex
					latexindent,

					-- Lua
					null_ls.builtins.formatting.stylua,

					-- yaml, bash
					null_ls.builtins.formatting.yamlfmt,

					-- Python
					-- null_ls.builtins.formatting.black,
					-- null_ls.builtins.formatting.isort,
					-- null_ls.builtins.diagnostics.pylint,

					-- JavaScript/TypeScript
					-- null_ls.builtins.diagnostics.eslint_d,

					-- C/C++
					null_ls.builtins.formatting.clang_format,

					-- TypeScript/JavaScript, css, scss, ...
					null_ls.builtins.formatting.prettier,

					-- Shell
					-- null_ls.builtins.formatting.shfmt,
					-- null_ls.builtins.diagnostics.shellcheck,
				},
				on_attach = function(client, bufnr)
					if client.supports_method("textDocument/formatting") then
						vim.api.nvim_clear_autocmds({
							group = augroup,
							buffer = bufnr,
						})
						vim.api.nvim_create_autocmd("BufWritePre", {
							group = augroup,
							buffer = bufnr,
							callback = function()
								vim.lsp.buf.format({ bufnr = bufnr })
							end,
						})
					end
				end,
			})
		end,
	},
	{
		"jay-babu/mason-null-ls.nvim",
		dependencies = {
			"williamboman/mason.nvim",
			"nvimtools/none-ls.nvim",
		},
		config = function()
			require("mason-null-ls").setup({
				ensure_installed = {
					"stylua",
					"black",
					"isort",
					"pylint",
					"prettier",
					"clang_format",
					"shfmt",
					"shellcheck",
					"latexindent",
					"yamlfmt",
				},
				automatic_installation = true,
			})
		end,
	},
}
