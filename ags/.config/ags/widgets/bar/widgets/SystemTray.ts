import { TrayItem } from "types/service/systemtray";
import BarButton from "../BarButton";
import Gdk from "types/@girs/gdk-3.0/gdk-3.0";

const systemtray = await Service.import("systemtray")

const SysTrayItem = (item: TrayItem) => BarButton({
	className: "tray-item",
	child: Widget.Icon({ icon: item.bind("icon") }),
	tooltipMarkup: item.bind("tooltip_markup"),
	setup: self => {
		const { menu } = item
		if (!menu) {
			return
		}

		const id = menu.connect("popped-up", () => {
			self.toggleClassName("active")
			menu.connect("notify::visible", () => {
				self.toggleClassName("active", menu.visible)
			})
			menu.disconnect(id!)
		})

		self.connect("destroy", () => menu.disconnect(id))
	},
	onPrimaryClick: btn => item.menu?.popup_at_widget(
		btn, Gdk.Gravity.SOUTH, Gdk.Gravity.NORTH, null
	),
	onSecondaryClick: btn => item.menu?.popup_at_widget(
		btn, Gdk.Gravity.SOUTH, Gdk.Gravity.NORTH, null
	)
})

export default () => Widget.Box()
	.bind("children", systemtray, "items", i => i
		.map(SysTrayItem))
