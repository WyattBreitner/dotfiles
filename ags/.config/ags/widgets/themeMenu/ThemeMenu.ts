import { getThemes, loadTheme } from "lib/theme"


function themeItem(themeName: string) {
	return Widget.Box({
		hexpand: true,
		child: Widget.Button({
			on_clicked: () => {
				loadTheme(themeName)
				App.toggleWindow("themeMenu")
			},
			child: Widget.Label({
				label: themeName
			})
		})
	})
}

export default () => Widget.Window({
	monitor: 0,
	name: "themeMenu",
	visible: false,
	exclusivity: "exclusive",
	child: Widget.Box({
		hexpand: true,
		children: getThemes().map(t => themeItem(t))
	})
})
