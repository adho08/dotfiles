return {
	"stevearc/conform.nvim",
	opts = {
		formatters_by_ft = {
			lua = { "stylua" },
			cpp = { "clang-format" },
			python = { "black", "isort" },
			rust = { "rustfmt" },
			javascript = { "eslint_d", "prettier", stop_after_first = true },
			shell = { "shfmt" },
			yaml = { "yamlfmt" },
			latex = { "latexindent" },
		},
		format_on_save = {
			timeout_ms = 400,
			lsp_format = "fallback",
			quiet = false, -- Show error messages
		},
	},
}
