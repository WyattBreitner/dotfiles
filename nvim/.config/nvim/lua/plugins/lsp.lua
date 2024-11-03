return {

	{
		"neovim/nvim-lspconfig",
		dependencies = {
			{ "williamboman/mason.nvim" },
			{ "williamboman/mason-lspconfig.nvim", dependencies = { "williamboman/mason.nvim" } },
		},
		config = function()
			require("mason").setup()
			require("mason-lspconfig").setup {
				ensure_installed = { "lua_ls", "ruff", "pylsp", "pyright", "cssls", "jsonls", "ts_ls", "eslint" }
			}
			local lspconfig = require("lspconfig")

			local capabilities = vim.tbl_deep_extend(
				"force",
				vim.lsp.protocol.make_client_capabilities(),
				require("cmp_nvim_lsp").default_capabilities() or {}
			)

			lspconfig.lua_ls.setup {
				capabilities = capabilities,
				settings = {
					Lua = {
						diagnostics = {
							globals = { 'vim' }
						}
					}
				}

			}

			lspconfig.ruff.setup { capabilities = capabilities }
			lspconfig.pylsp.setup { capabilities = capabilities,
				setting = { pylsp = { plugins = { rope_autoimports = { enabled = true } } } } }
			lspconfig.pyright.setup { capabilities = capabilities }

			lspconfig.cssls.setup { capabilities = capabilities }

			lspconfig.jsonls.setup {}

			lspconfig.ts_ls.setup { capabilities = capabilities }

			lspconfig.eslint.setup { capabilities = capabilities }


			local opts = { noremap = true, silent = true }
			vim.keymap.set('n', '<space>e', vim.diagnostic.open_float, opts)
		end
	},

	{
		"williamboman/mason.nvim",
		opts = { ensure_installed = {} },
		config = function(_, opts)
			require("mason").setup(opts)
		end
	}


}
