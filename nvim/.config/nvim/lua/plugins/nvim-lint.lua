return {
	"mfussenegger/nvim-lint",
	config = function()
		require("lint").linters_by_ft = {
			-- C/C++
			c = { "cpplint" },
			cpp = { "cpplint" },

			-- Python
			python = { "ruff" },

			-- Lua
			lua = { "luacheck" },

			-- Text files
			latex = { "chktex" },
			txt = { "vale" },
			markdown = { "vale" },

			-- Shell
			sh = { "shellcheck" },
			bash = { "shellcheck" },
			zsh = { "zsh" },

			-- Config files
			yaml = { "yamllint" },

			-- Web
			css = { "stylelint" },
			javascript = { "eslint" },
			typescript = { "eslint" },

			-- Java
			java = { "checkstyle" },

			-- Rust (use clippy via LSP instead)
			-- rust = {},  -- clippy is better through rust-analyzer LSP
		}

		vim.api.nvim_create_autocmd({ "BufWritePost", "BufEnter", "InsertLeave" }, {
			callback = function()
				-- try_lint without arguments runs the linters defined in `linters_by_ft` for the current filetype
				require("lint").try_lint()
			end,
		})
	end,
}
