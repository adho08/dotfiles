return {
	"stevearc/conform.nvim",
	opts = {
		formatters_by_ft = {
			lua = { "stylua" },
			cpp = { "clang-format" },
			python = { "black", "isort" },
			rust = { "rustfmt" },
			javascript = { "eslint-d", "prettier" },
			typescript = { "eslint-d", "prettier" },
			shell = { "shfmt" },
			yaml = { "yamlfmt" },
			latex = { "latexindent" },
			r = { "air" },
		},
		format_on_save = {
			timeout_ms = 400,
			lsp_format = "fallback",
			quiet = false, -- Show error messages
		},
	},
}
