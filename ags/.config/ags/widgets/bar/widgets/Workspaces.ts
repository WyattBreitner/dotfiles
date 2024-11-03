import { range } from "lib/utils"
import BarButton from "../BarButton"
import theme from "lib/theme"

const { number } = theme.bar.workspaces

const hyprland = await Service.import("hyprland")

export default () => BarButton({
	class_name: "workspaces",
	child: Widget.Box({
		children: range(number.value || 20).map(i => Widget.Label({
			attribute: i,
			vpack: "center",
			label: `${i}`,
			setup: self => self.hook(hyprland, () => {
				self.toggleClassName("active", hyprland.active.workspace.id === i)
				self.toggleClassName("occupied", (hyprland.getWorkspace(i)?.windows || 0) > 0)
			})
		}))
	})
})

