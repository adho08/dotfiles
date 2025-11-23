return {
    {
	"neovim/nvim-lspconfig",
	config = function()

	    vim.lsp.enable('lua_ls')
	    vim.lsp.enable('vtsls')
	    vim.lsp.enable('pyright')
	    vim.lsp.enable('texlab')

	    -- key mappings
	    vim.keymap.set('n', 'gD', vim.lsp.buf.definition, opts)  -- go to definition
	    vim.keymap.set('n', 'gd', vim.lsp.buf.declaration, opts) -- go to declaration
	    vim.keymap.set('n', 'B', vim.lsp.buf.hover, opts)        -- hover info
	    vim.keymap.set('n', 'gi', vim.lsp.buf.implementation, opts) -- go to implementation
	    vim.keymap.set('n', '<leader>rn', vim.lsp.buf.rename, opts) -- rename symbol
	    vim.keymap.set('n', '<leader>ca', vim.lsp.buf.code_action, opts) -- code actions
	    vim.keymap.set('n', 'gr', vim.lsp.buf.references, opts)  -- find references
	    vim.keymap.set('n', '[d', vim.diagnostic.goto_prev, opts) -- previous diagnostic
	    vim.keymap.set('n', ']d', vim.diagnostic.goto_next, opts) -- next diagnostic
	    vim.keymap.set('n', '<leader>e', vim.diagnostic.open_float, opts) -- show diagnostics
	end
    },
    {
	"williamboman/mason.nvim",
	config = function()
	    require("mason").setup()
	end
    },
    {
	"williamboman/mason-lspconfig.nvim",
	config = function()
	    require("mason-lspconfig").setup({
		ensure_installed = { "lua_ls", "vtsls", "pyright", "texlab" },
		automatic_enable = true
	    })
	end
    }
}
