return {
	"kevinhwang91/nvim-ufo",
	dependencies = { "kevinhwang91/promise-async" },

	config = function()
		-----------------------------------------------------------
		-- Custom fold virtual text handler (your function)
		-----------------------------------------------------------
		local handler = function(virtText, lnum, endLnum, width, truncate)
			local newVirtText = {}
			local suffix = (" 󰁂 %d "):format(endLnum - lnum)
			local sufWidth = vim.fn.strdisplaywidth(suffix)
			local targetWidth = width - sufWidth
			local curWidth = 0

			for _, chunk in ipairs(virtText) do
				local chunkText = chunk[1]
				local chunkWidth = vim.fn.strdisplaywidth(chunkText)

				if targetWidth > curWidth + chunkWidth then
					table.insert(newVirtText, chunk)
				else
					chunkText = truncate(chunkText, targetWidth - curWidth)
					local hlGroup = chunk[2]
					table.insert(newVirtText, { chunkText, hlGroup })
					chunkWidth = vim.fn.strdisplaywidth(chunkText)

					-- Padding if truncate() returns shorter text
					if curWidth + chunkWidth < targetWidth then
						suffix = suffix .. string.rep(" ", targetWidth - curWidth - chunkWidth)
					end
					break
				end

				curWidth = curWidth + chunkWidth
			end

			table.insert(newVirtText, { suffix, "MoreMsg" })
			return newVirtText
		end

		-----------------------------------------------------------
		-- Recommended UFO options + your handler
		-----------------------------------------------------------
		require("ufo").setup({
			fold_virt_text_handler = handler,
			provider_selector = function()
				return { "treesitter", "indent" }
			end,
		})

		-----------------------------------------------------------
		-- Good defaults for folding
		-----------------------------------------------------------
		-- vim.o.foldcolumn = "1"
		vim.o.foldlevel = 99
		vim.o.foldlevelstart = 99
		vim.o.foldenable = true

		-----------------------------------------------------------
		-- Optional useful keymaps
		-----------------------------------------------------------
		vim.keymap.set("n", "zR", require("ufo").openAllFolds)
		vim.keymap.set("n", "zM", require("ufo").closeAllFolds)
	end,
}
