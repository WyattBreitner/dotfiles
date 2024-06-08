return {

	{
		"williamboman/mason.nvim",
		lazy = true,
		opts = function(_, opts)
			opts.ensure_installed = opts.ensure_installed or {}
			table.insert(opts.ensure_installed, "stylua")
		end,
	},

	{
		"stevearc/conform.nvim",
		event = { "BufWritePre" },
		dependencies = { "mason.nvim" },
		opts = {
			formatters_by_ft = {
				lua = { "stylua" },
			},
			format_on_save = { timeout_ms = 500, lsp_fallback = true },
		},
	}

}
