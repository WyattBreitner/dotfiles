import Datetime from "./widgets/Datetime"
import SystemTray from "./widgets/SystemTray"
import Workspaces from "./widgets/Workspaces"
import theme from "lib/theme"

const { start, center, end } = theme.bar.layout
const { transparent } = theme.bar

export type BarWidget = keyof typeof widgets

const widgets = {
	datetime: Datetime,
	workspaces: Workspaces,
	systemtray: SystemTray,
	expander: () => Widget.Box({ expand: true })
}

export default (monitor: number = 0) => Widget.Window({
	monitor,
	class_name: "bar",
	name: `bar-${monitor}`,
	exclusivity: "exclusive",
	anchor: ["top", "left", "right"],
	child: Widget.CenterBox({
		css: "min-width: 2px; min-height: 2px;",
		startWidget: Widget.Box({
			hexpand: true,
			children: start.bind().as(s => s.map(w => widgets[w]())),
		}),
		centerWidget: Widget.Box({
			hexpand: true,
			children: center.bind().as(c => c.map(w => widgets[w]())),

		}),
		endWidget: Widget.Box({
			hexpand: true,
			children: end.bind().as(e => e.map(w => widgets[w]())),
		}),
	}),
	setup: self => self.hook(transparent, () => {
		self.toggleClassName("transparent", transparent.value)
	})
})
