return {
	"cvigilv/esqueleto.nvim",
	config = function()
		require("esqueleto").setup({
			patterns = { "LICENSE", "cpp", "tex", "sh" },
			wildcards = {
				expand = true,
				lookup = {
					["author"] = os.getenv("AUTHOR"),
				},
			},
		})
	end,
}
