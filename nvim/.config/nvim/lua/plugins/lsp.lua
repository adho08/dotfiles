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
				"lua_ls",
				"vtsls",
				"pyright",
				"texlab",
				"bashls",
				"clangd",
				"cssls",
				"rust_analyzer",
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
							build = { onSave = true },
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
			for _, name in ipairs({ "hyprls", "vtsls", "pyright", "bashls", "clangd", "cssls", "rust_analyzer" }) do
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
