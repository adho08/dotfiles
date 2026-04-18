return {
	{
		"williamboman/mason.nvim",
		build = ":MasonUpdate",
		config = true,
	},
	{
		"williamboman/mason-lspconfig.nvim",
		dependencies = "williamboman/mason.nvim",
		opts = {
			ensure_installed = {
				"ltex_plus",
				"lua_ls",
				"pyright",
				"texlab",
				"bashls",
				"clangd",
				"cssls",
				"rust_analyzer",
				"air",
				"ts_ls",
				"emmet_ls",
				"tinymist",
			},
		},
	},
	{
		"neovim/nvim-lspconfig",
		dependencies = "williamboman/mason-lspconfig.nvim",
		config = function()
			-- LSP settings
			local servers = {
				lua_ls = {
					settings = {
						Lua = {
							diagnostics = { globals = { "vim" } },
						},
					},
				},
				texlab = {
					settings = {
						texlab = {
							chktex = { onEdit = true, onOpenAndSave = true },
							build = {
								executable = "",
								onSave = false,
							},
						},
					},
				},
				emmet_ls = {
					filetypes = { "html", "typescriptreact", "javascriptreact", "css", "scss", "sass" },
				},
				tinymist = {
					settings = {
						exportPdf = "onType",
						semanticTokens = "disable",
						filetypes = { "typst" },
					},
				},
				ltex_plus = {
					settings = {
						ltex = {
							language = "de-CH", -- or "de-DE", "fr", etc.
							enabled = { "latex", "tex", "bib", "markdown", "text", "typst" },
							hiddenFalsePositives = {},
							checkFrequency = "save",
						},
					},
				},
			}

			-- Enable servers
			for name, config in pairs(servers) do
				vim.lsp.config(name, config)
				vim.lsp.enable(name)
			end

			-- Enable servers without custom config
			for _, name in ipairs({
				"hyprls",
				"pyright",
				"bashls",
				"clangd",
				"cssls",
				"rust_analyzer",
				"air",
				"ts_ls",
			}) do
				vim.lsp.enable(name)
			end

			-- Keymaps on LSP attach
			vim.api.nvim_create_autocmd("LspAttach", {
				callback = function(args)
					local client = vim.lsp.get_client_by_id(args.data.client_id)

					if client.name == "clangd" then
						client.server_capabilities.signatureHelpProvider = false
					end

					local map = function(mode, lhs, rhs)
						vim.keymap.set(mode, lhs, rhs, { buffer = args.buf, silent = true })
					end

					map("n", "gd", vim.lsp.buf.definition)
					map("n", "gD", vim.lsp.buf.declaration)
					map("n", "B", vim.lsp.buf.hover)
					map("n", "gi", vim.lsp.buf.implementation)
					map("n", "<leader>rn", vim.lsp.buf.rename)
					map("n", "<leader>ca", vim.lsp.buf.code_action)
					map("n", "gr", vim.lsp.buf.references)
					map("n", "[d", vim.diagnostic.goto_prev)
					map("n", "]d", vim.diagnostic.goto_next)
					map("n", "<leader>e", vim.diagnostic.open_float)
				end,
			})
		end,
	},
}
