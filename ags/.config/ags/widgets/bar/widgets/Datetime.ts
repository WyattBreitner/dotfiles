import { clock } from "lib/variables"
import BarButton from "../BarButton"
import theme from "lib/theme"

const {
	format
} = theme.bar.datetime

export default () => BarButton({
	class_name: "time",
	on_clicked: () => { App.ToggleWindow("centerMenu") },
	child: Widget.Label({
		justification: "center",
		label: Utils.derive([clock, format], (c, f) => c.format(f) || "").bind()
	})
})
