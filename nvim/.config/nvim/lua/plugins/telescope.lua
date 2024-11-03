return {

	"nvim-telescope/telescope.nvim",
	tag = "0.1.6",
	dependencies = { { "nvim-lua/plenary.nvim" }, { 'nvim-telescope/telescope-fzf-native.nvim', build = 'cmake -S. -Bbuild -DCMAKE_BUILD_TYPE=Release && cmake --build build --config Release && cmake --install build --prefix build' }, },

	config = function()
		local telescope = require('telescope')

		telescope.setup {

			pickers = {

				find_files = {

					hidden = true

				}

			}
		}
	end,

	keys = {
		{ "<leader>ff", "<cmd>Telescope find_files<cr>", desc = "Find Files" },
	}
}
